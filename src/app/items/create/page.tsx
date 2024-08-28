"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  CreateItemAction,
  CreateUploadUrlAction,
} from "@/app/items/create/action";

export default function CreateBidPage() {
  return (
    <main className="space-y-8">
      <h1 className="text-4xl font-bold">Post an Item to Sell</h1>
      <form
        onSubmit={async (e) => {
          e.preventDefault();
          const form = e.currentTarget as HTMLFormElement;
          const formData = new FormData(form);
          const file = formData.get("file") as File;

          const uploadUrl = await CreateUploadUrlAction(file.name, file.type);
          await fetch(uploadUrl, {
            method: "PUT",
            headers: {
              "Content-Type": file.type,
            },
            body: file,
          });

          const name = formData.get("name") as string;
          const startingPrice = parseInt(
            formData.get("startingPrice") as string
          );
          const startingPriceInCents = Math.floor(startingPrice * 100);
          await CreateItemAction({
            name,
            fileName: file.name,
            startingPrice: startingPriceInCents,
          });
        }}
        className="flex flex-col border p-8 rounded-xl space-y-4 max-w-lg"
      >
        <Input
          required
          name="name"
          type="text"
          placeholder="Name your item"
          className=" max-w-md"
        />
        <Input
          required
          name="startingPrice"
          className=" max-w-md"
          type="number"
          step="0.01"
          placeholder="What to start your auction at"
        />
        <Input type="file" name="file" />
        <Button className="self-end" type="submit">
          Post Item
        </Button>
      </form>
    </main>
  );
}
