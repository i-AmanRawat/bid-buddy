"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef, useState } from "react";
import { signIn, signOut, useSession } from "next-auth/react";
import {
  NotificationFeedPopover,
  NotificationIconButton,
  NotificationCell,
} from "@knocklabs/react";

import { Button } from "@/components/ui/button";
import { formatToRupee } from "@/utils/currency";
// import NotificationFeed from "./NotificationFeed";

export default function Header() {
  const [isVisible, setIsVisible] = useState(false);
  const notifButtonRef = useRef(null);

  const session = useSession();
  const userId = session?.data?.user?.id;

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
              <Link href="/" className="text-base font-medium">
                All Auctions
              </Link>
            </Button>
            {userId && (
              <>
                <Button variant="link">
                  <Link href="/items/create" className="text-base font-medium">
                    Create Auction
                  </Link>
                </Button>
                <Button variant="link">
                  <Link href="/auctions" className="text-base font-medium">
                    My Auctions
                  </Link>
                </Button>
              </>
            )}
          </div>
        </div>

        <div className="flex items-center gap-4">
          {session.data?.user.image && (
            <div className="">
              <Image
                src={session.data?.user.image}
                width={40}
                height={40}
                className="rounded-full"
                alt="user avatar"
              />
            </div>
          )}
          <div className="">{session?.data?.user?.name}</div>
          {/* <NotificationFeed /> */}
          <div>
            <NotificationIconButton
              ref={notifButtonRef}
              onClick={(e) => setIsVisible(!isVisible)}
            />
            <NotificationFeedPopover
              buttonRef={notifButtonRef}
              isVisible={isVisible}
              onClose={() => setIsVisible(false)}
              renderItem={({ item, ...props }) => (
                <NotificationCell {...props} item={item}>
                  <div className="rounded-xl">
                    <Link
                      onClick={() => {
                        setIsVisible(false);
                      }}
                      // href={`/items/${item.id}`}
                      href={`/items/create`}
                      // href={`/items/${item.item.data.itemId}`}
                    >
                      someone out bidded you on{" "}
                      <span className="font-bold">{item.id}</span> by ₹{" "}
                      {/* {formatToRupee(item.data.bidAmount)} */}
                    </Link>
                  </div>
                  ;
                </NotificationCell>
              )}
            />
          </div>

          <div className="">
            {userId ? (
              <Button
                onClick={() => {
                  signOut({
                    callbackUrl: "/",
                  });
                }}
              >
                Sign Out
              </Button>
            ) : (
              <Button
                onClick={() => {
                  signIn();
                }}
              >
                Sign In
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

/*
 <div>
            <NotificationIconButton
              ref={notifButtonRef}
              onClick={(e) => setIsVisible(!isVisible)}
            />
            <NotificationFeedPopover
              buttonRef={notifButtonRef}
              isVisible={isVisible}
              onClose={() => setIsVisible(false)}
              renderItem={({ item, ...props }) => (
                <NotificationCell {...props} item={item}>
                  <div className="rounded-xl">
                    <Link
                      onClick={() => {
                        setIsVisible(false);
                      }}
                      // href={`/items/${item.id}`}
                      href={`/items/create`}
                      // href={`/items/${item.item.data.itemId}`}
                    >
                      someone out bidded you on{" "}
                      <span className="font-bold">{item.id}</span> by ₹{" "}
                      {formatToRupee(item.data.bidAmount)}
                    </Link>
                  </div>
                  ;
                </NotificationCell>
              )}
            />
          </div>

*/
