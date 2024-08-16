import { database } from "@/db/index";

export default async function HomePage() {
  const allItems = await database?.query.items.findMany();

  return (
    <main className="container mx-auto py-12 space-y-8">
      <h1 className="text-4xl font-bold">Items for Sale</h1>
      <div className="grid grid-cols-4 gap-8">
        {allItems?.map((item) => (
          <div className="border p-8 rounded-xl" key={item.id}>
            {item.name}
            Starting Price : ₹{item.startingPrice / 100}
          </div>
        ))}
      </div>
    </main>
  );
}
