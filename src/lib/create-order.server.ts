import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { Pool } from "pg";

const orderItemSchema = z.object({
  id: z.string().min(1),
  name: z.string().min(1),
  colour: z.string().min(1),
  size: z.string().min(1),
  price: z.number().int().nonnegative(),
  qty: z.number().int().min(1).max(9),
});

const customerSchema = z.object({
  name: z.string().trim().min(2).max(120),
  phone: z.string().trim().min(7).max(30),
  email: z.string().trim().email().max(254),
  address: z.string().trim().min(5).max(300),
  city: z.string().trim().min(2).max(100),
  state: z.string().trim().min(2).max(100),
  pincode: z.string().trim().min(4).max(12),
});

const createOrderInput = z.object({
  customer: customerSchema,
  items: z.array(orderItemSchema).min(1).max(50),
  subtotal: z.number().int().nonnegative(),
});

let pool: Pool | undefined;

function getPool() {
  if (!process.env.DATABASE_URL) {
    throw new Error("DATABASE_URL is not configured on the server.");
  }
  if (!pool) {
    pool = new Pool({
      connectionString: process.env.DATABASE_URL,
      max: 5,
      ssl: process.env.NODE_ENV === "production" ? { rejectUnauthorized: false } : undefined,
    });
  }
  return pool;
}

export const createOrder = createServerFn({ method: "POST" })
  .validator(createOrderInput)
  .handler(async ({ data }) => {
    const calculatedSubtotalRupees = data.items.reduce((sum, item) => sum + item.price * item.qty, 0);
    if (calculatedSubtotalRupees !== data.subtotal) {
      throw new Error("Order total validation failed.");
    }

    const subtotalPaise = calculatedSubtotalRupees * 100;
    const db = getPool();
    const client = await db.connect();

    try {
      await client.query("BEGIN");

      const orderResult = await client.query<{ id: string; order_number: string }>(
        `INSERT INTO orders
          (customer_name, phone, email, address, city, state, pincode, subtotal_paise, total_paise)
         VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$8)
         RETURNING id, order_number`,
        [
          data.customer.name,
          data.customer.phone,
          data.customer.email,
          data.customer.address,
          data.customer.city,
          data.customer.state,
          data.customer.pincode,
          subtotalPaise,
        ],
      );

      const order = orderResult.rows[0];
      if (!order) throw new Error("Order could not be created.");

      for (const item of data.items) {
        const unitPricePaise = item.price * 100;
        await client.query(
          `INSERT INTO order_items
            (order_id, product_id, product_name, colour, size, quantity, unit_price_paise, line_total_paise)
           VALUES ($1,$2,$3,$4,$5,$6,$7,$8)`,
          [order.id, item.id, item.name, item.colour, item.size, item.qty, unitPricePaise, unitPricePaise * item.qty],
        );
      }

      await client.query("COMMIT");
      return { orderId: order.id, orderNumber: `QS-${order.order_number}` };
    } catch (error) {
      await client.query("ROLLBACK");
      throw error;
    } finally {
      client.release();
    }
  });
