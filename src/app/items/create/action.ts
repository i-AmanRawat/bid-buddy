"use server";

import { redirect } from "next/navigation";

import { database } from "@/db";
import { items } from "@/db/schema";
import { auth } from "@/auth";

export async function CreateItemAction(formData: FormData) {
  const session = await auth();

  if (!session) {
    throw new Error("Unauthorized");
  }
  // without user/userid its not possible to create a item hence elimination
  const user = session.user;
  if (!user || !user.id) {
    throw new Error("Unauthorized");
  }

  await database?.insert(items).values({
    name: formData.get("name") as string,
    startingPrice: Number(formData.get("startingPrice")),
    userId: user.id,
    // userId: user.id!, //non-null assertion operator: to tell ts user.id is not null or undefined one more thing i can do is check for user.id is undefined if yes throw error
  });
  redirect("/"); //to revalidate the / path as we just added a new bid in the db
}
