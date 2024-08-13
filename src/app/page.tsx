import { revalidatePath } from "next/cache";

import { database } from "@/db/index";
import { bids as bidsSchema } from "@/db/schema";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default async function HomePage() {
  const bids = await database?.query.bids.findMany();

  return (
    <main className="container mx-auto py-12">
      <form
        action={async (formData: FormData) => {
          "use server";
          await database?.insert(bidsSchema).values({});
          revalidatePath("/"); //to revalidate the / path as we just added a new bid in the db
        }}
        className=""
      >
        <Input name="bid" type="text" placeholder="bid" />
        <Button className="" type="submit">
          Place Bid
        </Button>
      </form>{" "}
      {bids?.map((bid) => (
        <div className="" key={bid.id}>
          {bid.id}
        </div>
      ))}
    </main>
  );
}
