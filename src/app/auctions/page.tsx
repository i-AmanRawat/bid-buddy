import { eq } from "drizzle-orm";

import { auth } from "@/auth";
import { database } from "@/db/index";
import { items } from "@/db/schema";
import AuctionCard from "@/components/auction-card";
import EmptyState from "@/components/empty-state";

export default async function HomePage() {
  const session = await auth();

  if (!session || !session.user) {
    throw new Error("Unauthorized");
  }

  const allItems = await database?.query.items.findMany({
    where: eq(items.userId, session.user.id!),
  });
  // const allItems: any[] = [];
  const hasItem = allItems.length > 0;

  return (
    <main className="space-y-12">
      <h1 className="text-4xl font-bold">Your listed bids</h1>
      {hasItem ? (
        <div className="grid grid-cols-4 gap-8">
          {allItems?.map((item) => (
            <AuctionCard key={item.id} item={item} />
          ))}
        </div>
      ) : (
        <EmptyState
          imageUrl="add_data.svg"
          heading="Zero Auctions to Display!!"
          subHeading="You have zero items in the auction."
          link="Create Auction"
          redirect="/"
        />
      )}
    </main>
  );
}
