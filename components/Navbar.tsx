import Link from "next/link";
import MaxWidthWrapper from "./MaxWidthWrapper";
import { buttonVariants } from "./ui/button";
import { ArrowRight } from "lucide-react";
import UserAccountNav from "./UserAccountNav";
import MobileNav from "./MobileNav";
import { auth } from "@/auth";
import Image from "next/image";

const Navbar = async () => {
  const session = await auth();
  const user = session?.user;

  return (
    <nav className="sticky inset-x-0 top-0 z-30 h-14 w-full border-b border-gray-200/0 bg-white/20 backdrop-blur-lg transition-all dark:border-zinc-700/0">
      <MaxWidthWrapper>
        <div className="flex h-14 items-center justify-between border-b border-zinc-200/0 dark:border-zinc-700/0">
          <Link
            href="/"
            className="z-40 flex items-center font-semibold text-white"
          >
            <Image width={50} height={50} src="/logo.png" alt="logo" />
            {/* <span className="text-slate-200">谷流仓AI</span> */}
          </Link>

          <MobileNav isAuth={!!user} />

          <div className="hidden items-center space-x-4 sm:flex">
            {!user ? (
              <>
                <Link
                  href="/agent"
                  className={buttonVariants({
                    variant: "ghost",
                    size: "lg",
                    className: "text-white/50",
                  })}
                >
                  开始
                  <ArrowRight className="ml-1.5 h-5 w-5" />
                </Link>
              </>
            ) : (
              <>
                <Link
                  href="/agent"
                  className={buttonVariants({
                    variant: "link",
                    size: "icon",
                    className: "text-white/50",
                  })}
                >
                  开始
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
