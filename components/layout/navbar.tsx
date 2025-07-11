import Link from "next/link";
import MaxWidthWrapper from "@/components/common/max-width-wrapper";
import { buttonVariants } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import UserAccountNav from "./user-account-nav";
import MobileNav from "./mobile-nav";
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
          </Link>

          <MobileNav isAuth={!!user} />

          <div className="hidden items-center space-x-4 sm:flex">
            {!user ? (
              <>
                <Link
                  href="/auth/login"
                  className={buttonVariants({
                    variant: "link",
                    size: "lg",
                    className: "",
                  })}
                >
                  登录
                  <ArrowRight className="ml-1.5 h-5 w-5" />
                </Link>
              </>
            ) : (
              <>
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
