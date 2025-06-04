import { eq } from "drizzle-orm";
import { User, usersTable } from "../db/schema";
import { db } from "../lib/db";

export class Users {
  static async insert(values: User) {
    await db.insert(usersTable).values(values);
  }

  static async getAll() {
    return await db.select().from(usersTable);
  }

  static async get(id: string) {
    return await db
      .select()
      .from(usersTable)
      .where(eq(usersTable.id, id))
      .get();
  }
}
