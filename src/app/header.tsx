import Image from "next/image";

import SignIn from "@/components/signin-button";
import SignOut from "@/components/signout-button";
import { auth } from "@/auth";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default async function Header() {
  const session = await auth();

  return (
    <div className="bg-gray-200 py-3">
      <div className="container flex justify-between items-center">
        <div className="flex items-center gap-12">
          <Link href="/" className="flex items-center gap-1">
            <Image
              src="/logo2.avif"
              className="mix-blend-multiply"
              width={50}
              height={50}
              alt="logo"
            />
            <span className="font-medium">BidBuddy.com</span>
          </Link>
          <div className="">
            <Button variant="link">
              <Link href="/items/create" className="text-base font-medium">
                Create Auction
              </Link>
            </Button>
            <Button variant="link">
              <Link href="/" className="text-base font-medium">
                All Auctions
              </Link>
            </Button>
            <Button variant="link">
              <Link href="/auctions" className="text-base font-medium">
                My Auctions
              </Link>
            </Button>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="">{session?.user?.name}</div>
          <div className="">{session ? <SignOut /> : <SignIn />}</div>
        </div>
      </div>
    </div>
  );
}
