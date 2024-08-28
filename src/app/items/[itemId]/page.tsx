import Image from "next/image";
import { eq } from "drizzle-orm";
import { formatDistance } from "date-fns";

import { database } from "@/db/index";
import { items } from "@/db/schema";
import EmptyState from "@/components/empty-state";
import { getImageUrl } from "@/utils/files";
import { formatToRupee } from "@/utils/currency";

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

  const item = await database?.query.items.findFirst({
    where: eq(items.id, parseInt(itemId)),
  });

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

  // const bids = [
  //   { id: 1, userName: "max", amount: "10", timestamp: Date.now() },
  //   { id: 2, userName: "john", amount: "9000", timestamp: Date.now() },
  //   { id: 3, userName: "andrew", amount: "99", timestamp: Date.now() },
  //   { id: 4, userName: "josh", amount: "55", timestamp: Date.now() },
  // ];
  const bids: any = [];
  const hasBids = bids.length > 0;

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
              Bid Interval ₹
              <span className="font-bold">
                {formatToRupee(item.bidInterval)}
              </span>
            </div>
          </div>
        </div>

        <div className="right-div flex-1 space-y-4">
          <h2 className="text-2xl font-bold">Current Bids</h2>

          {hasBids ? (
            <ul className="space-y-4">
              {bids.map((bid: any) => (
                <li className="bg-gray-100 p-8 rounded-xl" key={bid.id}>
                  <div className="flex gap-4">
                    <div className="">
                      <span className="font-bold">
                        ₹{formatToRupee(bid.amount)}
                      </span>{" "}
                      by <span className="font-bold">{bid.userName}</span>
                    </div>
                    <div className="">{formatTimestamp(bid.timestamp)}</div>
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
                link="Place bid"
                redirect="/"
              />
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
