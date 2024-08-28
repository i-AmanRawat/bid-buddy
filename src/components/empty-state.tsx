import { Button } from "@/components/ui/button";

import Image from "next/image";
import Link from "next/link";

export default function EmptyState({
  imageUrl,
  heading,
  subHeading,
  link,
  redirect,
}: {
  imageUrl: string;
  heading: string;
  subHeading: string;
  link?: string;
  redirect?: string;
}) {
  return (
    <div className="flex flex-col space-y-6 justify-center items-center">
      <Image src={`/${imageUrl}`} width={200} height={200} alt="no such item" />
      <h2 className="text-2xl font-bold">{heading}</h2>
      <p className="text-center">{subHeading}</p>
      {redirect && (
        <Button asChild>
          <Link href={redirect}>{link}</Link>
        </Button>
      )}
    </div>
  );
}
