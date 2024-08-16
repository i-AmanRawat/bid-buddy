import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CreateItemAction } from "@/app/items/create/action";

export default async function CreateBidPage() {
  return (
    <main className="container mx-auto py-12 space-y-8">
      <h1 className="text-4xl font-bold">Post an Item to Sell</h1>
      <form
        action={CreateItemAction}
        className="flex flex-col border p-8 rounded-xl space-y-4 max-w-lg"
      >
        <Input
          required
          name="name"
          type="text"
          placeholder="Name your item"
          className=" max-w-md"
        />
        <Input
          required
          name="startingPrice"
          type="number"
          step="0.01"
          placeholder="What to start your auction at"
          className=" max-w-md"
        />
        <Button className="self-end" type="submit">
          Post Item
        </Button>
      </form>
    </main>
  );
}
