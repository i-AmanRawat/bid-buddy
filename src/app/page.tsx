import { revalidatePath } from "next/cache";

import { auth } from "@/auth";
import { database } from "@/db/index";
import { bids as bidsSchema, items } from "@/db/schema";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import SignIn from "@/components/signin-button";
import SignOut from "@/components/signout-button";

export default async function HomePage() {
  const session = await auth();
  const allItems = await database?.query.items.findMany();

  // without user/userid its not possible to create a item hence elimination
  const user = session?.user;
  if (!session) return null;
  if (!user) return null;

  return (
    <main className="container mx-auto py-12">
      {session ? <SignOut /> : <SignIn />}
      <form
        action={async (formData: FormData) => {
          "use server";
          await database?.insert(items).values({
            name: formData.get("name") as string,
            userId: user.id!, //non-null assertion operator: to tell ts user.id is not null or undefined
          });
          revalidatePath("/"); //to revalidate the / path as we just added a new bid in the db
        }}
        className=""
      >
        <Input name="name" type="text" placeholder="Name your item " />
        <Button className="" type="submit">
          Post Item
        </Button>
      </form>{" "}
      {allItems?.map((item) => (
        <div className="" key={item.id}>
          {item.name}
        </div>
      ))}
    </main>
  );
}
