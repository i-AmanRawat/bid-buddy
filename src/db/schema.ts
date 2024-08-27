import {
  boolean,
  timestamp,
  pgTable,
  text,
  primaryKey,
  integer,
  serial,
} from "drizzle-orm/pg-core";
import type { AdapterAccountType } from "next-auth/adapters";

// export const users = pgTable("users", {
//   id: serial("id").primaryKey(),
//   username: varchar("username", { length: 255 }).notNull().unique(),
//   email: varchar("email", { length: 255 }).notNull().unique(),
//   password: text("password").notNull(), // hashed password
//   role: varchar("role", { length: 50 }).default("user"), // 'user' or 'admin'
//   created_at: timestamp("created_at").defaultNow(),
// });

export const bids = pgTable("bb_bids", {
  id: serial("id").primaryKey(),
  // bid_amount: integer("bid_amount").notNull(),
  // user_id: integer("user_id").references(() => users.id),
  // item_id: integer("item_id").references(() => items.id),
  // bid_time: timestamp("bid_time").defaultNow(),
});

export const users = pgTable("bb_user", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  name: text("name"),
  email: text("email").unique(),
  emailVerified: timestamp("emailVerified", { mode: "date" }),
  image: text("image"),
});

export const accounts = pgTable(
  "bb_account",
  {
    userId: text("userId")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    type: text("type").$type<AdapterAccountType>().notNull(),
    provider: text("provider").notNull(),
    providerAccountId: text("providerAccountId").notNull(),
    refresh_token: text("refresh_token"),
    access_token: text("access_token"),
    expires_at: integer("expires_at"),
    token_type: text("token_type"),
    scope: text("scope"),
    id_token: text("id_token"),
    session_state: text("session_state"),
  },
  (account) => ({
    compoundKey: primaryKey({
      columns: [account.provider, account.providerAccountId],
    }),
  })
);

export const sessions = pgTable("bb_session", {
  sessionToken: text("sessionToken").primaryKey(),
  userId: text("userId")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  expires: timestamp("expires", { mode: "date" }).notNull(),
});

export const verificationTokens = pgTable(
  "bb_verificationToken",
  {
    identifier: text("identifier").notNull(),
    token: text("token").notNull(),
    expires: timestamp("expires", { mode: "date" }).notNull(),
  },
  (verificationToken) => ({
    compositePk: primaryKey({
      columns: [verificationToken.identifier, verificationToken.token],
    }),
  })
);

export const items = pgTable("bb_item", {
  id: serial("id").primaryKey(),
  userId: text("userId")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  name: text("name").notNull(),
  startingPrice: integer("startingPrice").notNull().default(0),
  fileKey: text("fileKey").notNull(),
  // title: varchar("title", { length: 255 }).notNull(),
  // description: text("description"),
  // image_url: varchar("image_url", { length: 255 }),
  // starting_bid: integer("starting_bid").notNull(),
  // current_bid: integer("current_bid").default(0),
  // auction_end_time: timestamp("auction_end_time").notNull(),
  // created_at: timestamp("created_at").defaultNow(),
});

// export const authenticators = pgTable(
//   "bb_authenticator",
//   {
//     credentialID: text("credentialID").notNull().unique(),
//     userId: text("userId")
//       .notNull()
//       .references(() => users.id, { onDelete: "cascade" }),
//     providerAccountId: text("providerAccountId").notNull(),
//     credentialPublicKey: text("credentialPublicKey").notNull(),
//     counter: integer("counter").notNull(),
//     credentialDeviceType: text("credentialDeviceType").notNull(),
//     credentialBackedUp: boolean("credentialBackedUp").notNull(),
//     transports: text("transports"),
//   },
//   (authenticator) => ({
//     compositePK: primaryKey({
//       columns: [authenticator.userId, authenticator.credentialID],
//     }),
//   })
// );
