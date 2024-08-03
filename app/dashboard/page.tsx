import { auth } from "@/auth";
import Dashboard from "@/components/Dashboard";

import { db } from "@/lib/db";
// import { getUserSubscriptionPlan } from "@/lib/stripe";
// import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { redirect } from "next/navigation";

const Page = async () => {
  // const { getUser } = getKindeServerSession();
  const session = await auth();
  if (!session?.user) return null;

  const user = session.user;

  const dbUser = await db.user.findFirst({
    where: {
      id: user.id,
    },
  });

  if (!dbUser) redirect("/auth-callback?origin=dashboard");

  // const subscriptionPlan = await getUserSubscriptionPlan();
  const subscriptionPlan = {
    isSubscribed: false,
  };

  return <Dashboard subscriptionPlan={subscriptionPlan} />;
};

export default Page;
