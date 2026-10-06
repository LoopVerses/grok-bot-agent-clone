import { integer, pgTable, serial, text, timestamp } from "drizzle-orm/pg-core";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  name: text("name"),
  email: text("email").notNull().unique(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  credit: integer("credit").default(5).notNull(),
});


export type User = typeof users.$inferSelect;
export type NewUser = typeof users.$inferInsert;