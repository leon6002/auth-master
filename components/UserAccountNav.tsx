import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Button } from "./ui/button";
import { Avatar, AvatarFallback } from "./ui/avatar";
import Image from "next/image";
import { Icons } from "./Icons";
import Link from "next/link";
import { Gem } from "lucide-react";
import { signOut } from "@/auth";
// import { LogoutLink } from '@kinde-oss/kinde-auth-nextjs/server'

interface UserAccountNavProps {
  email: string | undefined;
  name: string;
  imageUrl: string;
}

const UserAccountNav = async ({
  email,
  imageUrl,
  name,
}: UserAccountNavProps) => {
  // const subscriptionPlan = await getUserSubscriptionPlan();
  const subscriptionPlan = {
    isSubscribed: false,
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild className="overflow-visible">
        <Button className="aspect-square h-8 w-8 rounded-full bg-slate-400 dark:bg-slate-900">
          <Avatar className="relative h-8 w-8">
            {imageUrl ? (
              <div className="relative aspect-square h-full w-full">
                <Image
                  fill
                  src={imageUrl}
                  alt="profile picture"
                  referrerPolicy="no-referrer"
                />
              </div>
            ) : (
              <AvatarFallback>
                <span className="sr-only">{name}</span>
                <Icons.user className="h-4 w-4 text-zinc-900" />
              </AvatarFallback>
            )}
          </Avatar>
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        className="bg-neutral-50/90 dark:bg-neutral-950"
        align="end"
      >
        <div className="flex items-center justify-start gap-2 p-2">
          <div className="flex flex-col space-y-0.5 leading-none">
            {name && <p className="text-sm font-medium text-primary">{name}</p>}
            {email && (
              <p className="w-[200px] truncate text-xs text-primary">{email}</p>
            )}
          </div>
        </div>

        <DropdownMenuSeparator />

        <DropdownMenuItem asChild>
          <Link href="/agent" className="cursor-pointer pl-5">
            对话
          </Link>
        </DropdownMenuItem>

        <DropdownMenuItem asChild>
          {subscriptionPlan?.isSubscribed ? (
            <Link href="/dashboard/billing">Manage Subscription</Link>
          ) : (
            <Link href="/pricing" className="cursor-pointer pl-5">
              升级 <Gem className="ml-1.5 h-4 w-4 text-blue-600" />
            </Link>
          )}
        </DropdownMenuItem>

        <DropdownMenuSeparator />

        <DropdownMenuItem className="cursor-pointer">
          <form
            action={async () => {
              "use server";
              await signOut();
            }}
          >
            <Button variant={"ghost"} className="flex" type="submit">
              登出
            </Button>
          </form>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserAccountNav;
