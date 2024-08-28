import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

export default function EmptyState() {
  return (
    <div className="flex flex-col space-y-8 justify-center items-center">
      <Image src="./no_data.svg" width={200} height={200} alt="no auction" />
      <h2 className="text-2xl font-bold">Zero Auctions to Display!</h2>
      <Button asChild>
        <Link href="/items/create">Create Auction</Link>
      </Button>
    </div>
  );
}
