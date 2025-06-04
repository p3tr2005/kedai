import { eq, like, sql } from "drizzle-orm";
import { Product, productsTable } from "../db/schema";
import { db } from "../lib/db";

export class Products {
  static async insert(values: Product) {
    await db.insert(productsTable).values(values);
  }

  static async getAll() {
    return await db.select().from(productsTable);
  }

  static async get(id: string) {
    return await db
      .select()
      .from(productsTable)
      .where(eq(productsTable.id, id))
      .get();
  }

  static async getByTitle(title: string) {
    const normalized = `%${title.trim().toLowerCase()}%`;

    return await db
      .select()
      .from(productsTable)
      .where(like(sql`lower(${productsTable.title})`, normalized))
      .get();
  }
}
