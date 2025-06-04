import { InferInsertModel } from "drizzle-orm";
import { int, integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const usersTable = sqliteTable("users_table", {
  id: text("id")
    .notNull()
    .primaryKey()
    .$default(() => crypto.randomUUID()),
  name: text("name").notNull(),
  password: text("password").notNull(),
  role: text("role").notNull(),
  createdAt: integer({ mode: "timestamp" })
    .notNull()
    .$default(() => new Date()),
  updatedAt: integer({ mode: "timestamp" })
    .notNull()
    .$default(() => new Date())
    .$onUpdateFn(() => new Date()),
});

export const productsTable = sqliteTable("products_table", {
  id: text("id")
    .notNull()
    .primaryKey()
    .$default(() => crypto.randomUUID()),
  title: text("title").notNull(),
  description: text("description").notNull(),
  imageUrl: text("imageUrl").notNull(),
  price: int("price").notNull(),
  createdAt: integer({ mode: "timestamp" })
    .notNull()
    .$default(() => new Date()),
  updatedAt: integer({ mode: "timestamp" })
    .notNull()
    .$default(() => new Date())
    .$onUpdateFn(() => new Date()),
});

export type User = InferInsertModel<typeof usersTable>;
export type Product = InferInsertModel<typeof productsTable>;
