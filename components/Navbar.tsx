import Link from "next/link";
import MaxWidthWrapper from "./MaxWidthWrapper";
import { Button, buttonVariants } from "./ui/button";
// import {
//   LoginLink,
//   RegisterLink,
//   getKindeServerSession,
// } from '@kinde-oss/kinde-auth-nextjs/server'
import { ArrowRight } from "lucide-react";
import UserAccountNav from "./UserAccountNav";
import MobileNav from "./MobileNav";
import { auth } from "@/auth";
import LoginButton from "./auth/login-button";

const Navbar = async () => {
  // const { getUser } = getKindeServerSession();
  const session = await auth();
  if (!session?.user) return null;

  const user = session.user;

  return (
    <nav className="sticky inset-x-0 top-0 z-30 h-14 w-full border-b border-gray-200 bg-white/75 backdrop-blur-lg transition-all dark:border-zinc-700 dark:bg-zinc-950">
      <MaxWidthWrapper>
        <div className="flex h-14 items-center justify-between border-b border-zinc-200 dark:border-zinc-700">
          <Link href="/" className="z-40 flex font-semibold">
            <span>谷流仓AI</span>
          </Link>

          <MobileNav isAuth={!!user} />

          <div className="hidden items-center space-x-4 sm:flex">
            {!user ? (
              <>
                <Link
                  href="/pricing"
                  className={buttonVariants({
                    variant: "ghost",
                    size: "sm",
                  })}
                >
                  Pricing
                </Link>
                <LoginButton mode="redirect">Sign in</LoginButton>
                <Button
                  className={buttonVariants({
                    size: "sm",
                  })}
                >
                  Get started <ArrowRight className="ml-1.5 h-5 w-5" />
                </Button>
              </>
            ) : (
              <>
                <Link
                  href="/dashboard"
                  className={buttonVariants({
                    variant: "ghost",
                    size: "sm",
                  })}
                >
                  Dashboard
                </Link>

                <UserAccountNav
                  name={!user.name ? "Your Account" : `${user.name}`}
                  email={
                    user.email
                      ? user.email.endsWith("@noemail.com")
                        ? ""
                        : user.email
                      : ""
                  }
                  imageUrl={user.image ?? ""}
                />
              </>
            )}
          </div>
        </div>
      </MaxWidthWrapper>
    </nav>
  );
};

export default Navbar;
