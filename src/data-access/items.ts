import { eq } from "drizzle-orm";

import { database } from "@/db/index";
import { items } from "@/db/schema";

export async function getItems(itemId: number) {
  const item = await database?.query.items.findFirst({
    where: eq(items.id, itemId),
  });
  return item;
}
