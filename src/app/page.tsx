import Image from "next/image";

import { database } from "@/db/index";
import { getImageUrl } from "@/utils/files";

export default async function HomePage() {
  const allItems = await database?.query.items.findMany();

  return (
    <main className="container mx-auto py-12 space-y-8">
      <h1 className="text-4xl font-bold">Items for Sale</h1>
      <div className="grid grid-cols-4 gap-8">
        {allItems?.map((item) => (
          <div className="border p-8 rounded-xl" key={item.id}>
            <Image
              src={getImageUrl(item.fileKey)}
              alt={item.name}
              width={200}
              height={200}
            />
            <h2 className="text-xl font-bold">{item.name}</h2>
            <p className="text-lg">starting price: {item.startingPrice}</p>
          </div>
        ))}
      </div>
    </main>
  );
}
