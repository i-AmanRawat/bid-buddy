"use server";

import { auth } from "@/auth";
import { database } from "@/db";
import { bids, items } from "@/db/schema";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";

export async function createBidAction(itemId: number) {
  const session = await auth();

  if (!session || !session.user || !session.user.id) {
    throw new Error("You must be logged in to place a bid!");
  }

  const item = await database?.query.items.findFirst({
    where: eq(items.id, itemId),
  });

  if (!item) throw new Error("Item not found!");

  let latestBidValue = 0;
  if (item.currentBid < item.startingPrice) {
    latestBidValue = item.startingPrice + item.bidInterval;
  } else {
    latestBidValue = item.currentBid + item.bidInterval;
  }

  await database?.insert(bids).values({
    itemId: item.id,
    bidAmount: latestBidValue,
    userId: session.user.id,
  });

  await database?.update(items).set({
    currentBid: latestBidValue,
  });

  revalidatePath(`/items/${itemId}`);
}
