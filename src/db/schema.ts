import {
  pgTable,
  serial,
  text,
  varchar,
  integer,
  timestamp,
} from "drizzle-orm/pg-core";

// export const users = pgTable("users", {
//   id: serial("id").primaryKey(),
//   username: varchar("username", { length: 255 }).notNull().unique(),
//   email: varchar("email", { length: 255 }).notNull().unique(),
//   password: text("password").notNull(), // hashed password
//   role: varchar("role", { length: 50 }).default("user"), // 'user' or 'admin'
//   created_at: timestamp("created_at").defaultNow(),
// });

// export const items = pgTable("items", {
//   id: serial("id").primaryKey(),
//   title: varchar("title", { length: 255 }).notNull(),
//   description: text("description"),
//   image_url: varchar("image_url", { length: 255 }),
//   starting_bid: integer("starting_bid").notNull(),
//   current_bid: integer("current_bid").default(0),
//   user_id: integer("user_id").references(() => users.id),
//   auction_end_time: timestamp("auction_end_time").notNull(),
//   created_at: timestamp("created_at").defaultNow(),
// });

export const bids = pgTable("bb_bids", {
  id: serial("id").primaryKey(),
  // bid_amount: integer("bid_amount").notNull(),
  // user_id: integer("user_id").references(() => users.id),
  // item_id: integer("item_id").references(() => items.id),
  // bid_time: timestamp("bid_time").defaultNow(),
});
