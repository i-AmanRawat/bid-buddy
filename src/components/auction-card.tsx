import Image from "next/image";

import { Item } from "@/db/schema";
import { getImageUrl } from "@/utils/files";
import { Button } from "./ui/button";
import Link from "next/link";
import { formatToRupee } from "@/utils/currency";

export default function AuctionCard({
  key,
  item,
}: {
  key: number;
  item: Item;
}) {
  return (
    <div className="border p-8 rounded-xl space-y-2" key={key}>
      <Image
        src={getImageUrl(item.fileKey)}
        alt={item.name}
        width={200}
        height={200}
      />
      <h2 className="text-xl font-bold">{item.name}</h2>
      <p className="text-lg">
        starting price: ₹{formatToRupee(item.startingPrice)}
      </p>
      <Button asChild>
        <Link href={`/items/${item.id}`}>Bid on item</Link>
      </Button>
    </div>
  );
}
