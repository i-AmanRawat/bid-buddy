import Image from "next/image";
import { formatDistance } from "date-fns";

import EmptyState from "@/components/empty-state";
import { getImageUrl } from "@/utils/files";
import { formatToRupee } from "@/utils/currency";
import { Button } from "@/components/ui/button";
import { createBidAction } from "./actions";
import { getBidsForItem } from "@/data-access/bids";
import { getItems } from "@/data-access/items";
import { auth } from "@/auth";

function formatTimestamp(timestamp: Date) {
  return formatDistance(timestamp, new Date(), {
    addSuffix: true,
  });
}

export default async function ItemPage({
  params,
}: {
  params: { itemId: string };
}) {
  const { itemId } = params;

  const item = await getItems(parseInt(itemId));

  const session = await auth();

  if (!item) {
    return (
      <main className="space-y-12">
        <div className="text-4xl font-bold">Auction not found</div>
        <EmptyState
          imageUrl="empty.svg"
          heading="Invalid auction ID!!"
          subHeading="The item you are trying to view is invalid. Please go back and search for a different auction item."
          link="Browse Auctions"
          redirect="/"
        />
      </main>
    );
  }

  const allBids = await getBidsForItem(parseInt(itemId));
  const hasBids = allBids.length > 0;
  const canPlaceBid = session && item.userId !== session?.user.id;

  return (
    <main className="space-y-8">
      <section className="auction-details flex gap-8">
        <div className="left-div flex flex-col gap-6">
          <div className="text-4xl font-bold">
            <span className="font-normal">Auction for</span> {item.name}
          </div>
          <Image
            src={getImageUrl(item.fileKey)}
            width={400}
            height={400}
            alt="auction item image"
            className="rounded-xl"
          />
          <div className="text-xl space-y-4">
            <div className="">
              {" "}
              Starting price ₹
              <span className="font-bold">
                {formatToRupee(item.startingPrice)}
              </span>
            </div>
            <div className="">
              {" "}
              Current bid price ₹
              <span className="font-bold">
                {formatToRupee(item.currentBid)}
              </span>
            </div>
            <div className="">
              {" "}
              Bid Interval ₹
              <span className="font-bold">
                {formatToRupee(item.bidInterval)}
              </span>
            </div>
          </div>
        </div>

        <div className="right-div flex-1 space-y-4">
          <div className="flex justify-between">
            <h2 className="text-2xl font-bold">Current Bids</h2>
            {canPlaceBid && (
              <form
                action={createBidAction.bind(null, item.id)}
                className="flex justify-center items-center space-y-6"
              >
                <Button>Place bid</Button>
              </form>
            )}
          </div>

          {hasBids ? (
            <ul className="space-y-4">
              {allBids.map((bid) => (
                <li className="bg-gray-100 p-8 rounded-xl" key={bid.id}>
                  <div className="flex gap-4">
                    <div className="">
                      <span className="font-bold">
                        ₹{formatToRupee(bid.bidAmount)}
                      </span>{" "}
                      by <span className="font-bold">{bid.users.name}</span>
                    </div>
                    <div className="">
                      {formatTimestamp(bid.bidTime as Date)}
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <div className="p-12 gap-8 rounded-xl bg-gray-100">
              <EmptyState
                imageUrl="no_data.svg"
                heading="No bids yet!"
                subHeading="Be the first to start bidding."
              />
              {canPlaceBid && (
                <form
                  action={createBidAction.bind(null, item.id)}
                  className="flex justify-center items-center space-y-6"
                >
                  <Button>Place bid</Button>
                </form>
              )}
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
