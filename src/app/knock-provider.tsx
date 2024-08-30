"use client";

import { KnockFeedProvider, KnockProvider } from "@knocklabs/react";
import { useSession } from "next-auth/react";
import { env } from "process";

import "@knocklabs/react/dist/index.css";

export function KnockProviders({ children }: { children: React.ReactNode }) {
  const session = useSession();

  // if (!session?.data?.user?.id) {
  //   return <div className="">{children}</div>;
  // }

  return (
    <KnockProvider
      apiKey={env.NEXT_PUBLIC_KNOCK_PUBLIC_API_KEY as string}
      userId={session?.data?.user?.id as string}
    >
      <KnockFeedProvider feedId={env.NEXT_PUBLIC_KNOCK_FEED_ID as string}>
        {children}
      </KnockFeedProvider>
    </KnockProvider>
  );
}
