"use server";

import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { Knock } from "@knocklabs/node";

import { auth } from "@/auth";
import { database } from "@/db";
import { bids, items } from "@/db/schema";
import { env } from "@/env";

const knock = new Knock(env.KNOCKS_SECRET_KEY);

export async function createBidAction(itemId: number) {
  const session = await auth();

  if (!session || !session.user || !session.user.id) {
    throw new Error("You must be logged in to place a bid!");
  }

  const userId = session.user.id;

  const item = await database?.query.items.findFirst({
    where: eq(items.id, itemId),
  });

  if (!item) throw new Error("Item not found!");

  // let latestBidValue = 0;
  // if (item.currentBid < item.startingPrice) {
  //   latestBidValue = item.startingPrice + item.bidInterval;
  // } else {
  //   latestBidValue = item.currentBid + item.bidInterval;
  // }

  const latestBidValue = item.currentBid + item.bidInterval;

  await database?.insert(bids).values({
    itemId: item.id,
    bidAmount: latestBidValue,
    userId: session.user.id,
  });

  await database?.update(items).set({
    currentBid: latestBidValue,
  });

  const currentBids = await database.query.bids.findMany({
    where: eq(bids.itemId, itemId),
    with: {
      users: true,
    },
  });

  const recipients: {
    id: string;
    name: string;
    email: string;
  }[] = [];

  for (const bid of currentBids) {
    if (
      bid.userId !== userId &&
      !recipients.find((recipient) => recipient.id === bid.userId)
    ) {
      recipients.push({
        id: bid.userId + "",
        name: bid.users.name ?? "Anonymous",
        email: bid.users.email as string,
      });
    }
  }

  if (recipients.length > 0) {
    await knock.users.identify(userId, {
      name: session.user.name ?? "Anonymous",
      email: session.user.email as string,
      // avatar: user.avatar_url,
    });

    await knock.workflows.trigger("user-placed-bid", {
      // actor: {
      //   id: userId,
      //   name: session.user.name ?? "Anonymous",
      //   email: session.user.email,
      //   collection: "users",
      // },
      actor: userId,
      recipients,
      data: {
        itemId,
        bidAmount: latestBidValue,
        itemName: item.name,
      },
    });
  }

  revalidatePath(`/items/${itemId}`);
}
