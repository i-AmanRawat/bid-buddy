"use server";

import { redirect } from "next/navigation";

import { database } from "@/db";
import { items } from "@/db/schema";
import { auth } from "@/auth";
import { getSignedUrlForS3Object } from "@/lib/s3";

export async function CreateUploadUrlAction(key: string, type: string) {
  return await getSignedUrlForS3Object(key, type);
}

export async function CreateItemAction({
  fileName,
  name,
  startingPrice,
}: {
  fileName: string;
  name: string;
  startingPrice: number;
}) {
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
    name,
    startingPrice,
    fileKey: fileName,
    userId: user.id,
    // userId: user.id!, //non-null assertion operator: to tell ts user.id is not null or undefined one more thing i can do is check for user.id is undefined if yes throw error
  });
  redirect("/"); //redirect to the all items page
}
