"use client";
import { useRouter } from "next/navigation";
import React from "react";
import { Button, buttonVariants } from "@/components/ui/button";
import { IconPlus } from "@/components/ui/icons";
import { DEFAULT_AGENT_PATH } from "@/routes";
import Link from "next/link";

import { cn } from "@/lib/utils";

const NewChatButton = () => {
  const router = useRouter();
  return (
    <Button
      variant={"outline"}
      onClick={() => router.push(DEFAULT_AGENT_PATH)}
      className={cn(
        "h-10 w-full justify-start bg-zinc-50 px-4 shadow-none transition-colors hover:bg-zinc-200/40 dark:bg-zinc-900 dark:hover:bg-zinc-300/10",
      )}
    >
      <IconPlus className="-translate-x-2 stroke-2" />
      New Chat
    </Button>
  );
};

export default NewChatButton;
