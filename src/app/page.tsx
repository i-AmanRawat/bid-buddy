import { database } from "@/db/index";
import AuctionCard from "@/components/auction-card";
import EmptyState from "@/components/empty-state";

export default async function HomePage() {
  const allItems = await database?.query.items.findMany();
  const hasItem = allItems.length > 0;
  // const hasItem = false;

  return (
    <main className="space-y-8">
      <h1 className="text-4xl font-bold">Items for Sale</h1>
      {hasItem ? (
        <div className="grid grid-cols-4 gap-8">
          {allItems?.map((item) => (
            <AuctionCard key={item.id} item={item} />
          ))}
        </div>
      ) : (
        <EmptyState
          imageUrl="no_data.svg"
          heading="No Auction ongoing!!"
          subHeading="Meanwhile you can add your own item for the auction."
          link="Create your auction"
          redirect="/items/create"
        />
      )}
    </main>
  );
}
