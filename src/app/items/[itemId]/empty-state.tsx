import { Button } from "@/components/ui/button";

import Image from "next/image";
import Link from "next/link";

export default function EmptyState() {
  return (
    <div className="flex flex-col space-y-8 justify-center items-center">
      <Image src="./empty.svg" width={200} height={200} alt="no such item" />
      <h2 className="text-2xl font-bold">Auction not found!</h2>
      <Button asChild>
        <Link href="/">Browse Auctions</Link>
      </Button>
    </div>
  );
}
