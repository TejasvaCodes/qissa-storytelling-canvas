import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { Pool } from "pg";

let pool: Pool | undefined;

function getPool() {
  if (!process.env["DATABASE_URL"]) {
    throw new Error("DATABASE_URL is not configured on the server.");
  }
  if (!pool) {
    pool = new Pool({
      connectionString: process.env["DATABASE_URL"],
      max: 5,
      ssl: process.env["NODE_ENV"] === "production" ? { rejectUnauthorized: false } : undefined,
    });
  }
  return pool;
}

const customOrderSchema = z.object({
  name: z.string().trim().min(2).max(120),
  email: z.string().trim().email().max(254),
  whatsapp: z.string().trim().min(7).max(30),
  piece: z.string().max(120),
  size: z.string().max(120),
  colour: z.string().max(120),
  details: z.string().trim().min(2).max(5000),
  notes: z.string().max(5000),
});

const bulkOrderSchema = z.object({
  contactName: z.string().trim().min(2).max(120),
  businessName: z.string().max(200),
  email: z.string().trim().email().max(254),
  whatsapp: z.string().trim().min(7).max(30),
  category: z.string().trim().min(1).max(200),
  quantity: z.string().trim().min(1).max(100),
  budget: z.string().trim().min(1).max(100),
  timeline: z.string().trim().min(1).max(100),
  destination: z.string().trim().min(2).max(200),
  requirements: z.string().max(5000),
});

export const saveCustomOrderEnquiry = createServerFn({ method: "POST" })
  .validator(customOrderSchema)
  .handler(async ({ data }) => {
    const db = getPool();
    await db.query(`
      CREATE TABLE IF NOT EXISTS custom_order_enquiries (
        id BIGSERIAL PRIMARY KEY,
        name VARCHAR(120) NOT NULL,
        email VARCHAR(254) NOT NULL,
        whatsapp VARCHAR(30) NOT NULL,
        piece VARCHAR(120) NOT NULL DEFAULT '',
        size VARCHAR(120) NOT NULL DEFAULT '',
        colour VARCHAR(120) NOT NULL DEFAULT '',
        details TEXT NOT NULL,
        notes TEXT NOT NULL DEFAULT '',
        created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
      )
    `);
    const result = await db.query(
      `INSERT INTO custom_order_enquiries
        (name, email, whatsapp, piece, size, colour, details, notes)
       VALUES ($1,$2,$3,$4,$5,$6,$7,$8) RETURNING id`,
      [data.name, data.email, data.whatsapp, data.piece, data.size, data.colour, data.details, data.notes],
    );
    return { enquiryId: result.rows[0].id as string | number };
  });

export const saveBulkOrderEnquiry = createServerFn({ method: "POST" })
  .validator(bulkOrderSchema)
  .handler(async ({ data }) => {
    const db = getPool();
    await db.query(`
      CREATE TABLE IF NOT EXISTS bulk_order_enquiries (
        id BIGSERIAL PRIMARY KEY,
        contact_name VARCHAR(120) NOT NULL,
        business_name VARCHAR(200) NOT NULL DEFAULT '',
        email VARCHAR(254) NOT NULL,
        whatsapp VARCHAR(30) NOT NULL,
        category VARCHAR(200) NOT NULL,
        quantity VARCHAR(100) NOT NULL,
        budget VARCHAR(100) NOT NULL,
        timeline VARCHAR(100) NOT NULL,
        destination VARCHAR(200) NOT NULL,
        requirements TEXT NOT NULL DEFAULT '',
        created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
      )
    `);
    const result = await db.query(
      `INSERT INTO bulk_order_enquiries
        (contact_name, business_name, email, whatsapp, category, quantity, budget, timeline, destination, requirements)
       VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10) RETURNING id`,
      [data.contactName, data.businessName, data.email, data.whatsapp, data.category, data.quantity, data.budget, data.timeline, data.destination, data.requirements],
    );
    return { enquiryId: result.rows[0].id as string | number };
  });
