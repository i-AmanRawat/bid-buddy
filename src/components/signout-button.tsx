import { redirect } from "next/navigation";

import { signOut } from "@/auth";

import { Button } from "@/components/ui/button";

export default function SignOut() {
  return (
    <form
      action={async () => {
        "use server";
        await signOut();
        redirect("/");
      }}
    >
      <Button type="submit">Sign Out</Button>
    </form>
  );
}
