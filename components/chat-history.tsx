import * as React from "react";

import { SidebarList } from "@/components/sidebar-list";

import NewChatButton from "./new-chat-button";

interface ChatHistoryProps {
  userId?: string;
}

export async function ChatHistory({ userId }: ChatHistoryProps) {
  console.log(
    "[rendering sidebar ChatHistory](components/chat-history.tsx:16)",
  );

  return (
    <div className="flex h-full flex-col">
      <div className="flex items-center justify-between p-4">
        <h4 className="text-sm font-medium">Chat History</h4>
      </div>
      <div className="mb-2 px-2">
        <NewChatButton />
      </div>
      <React.Suspense
        fallback={
          <div className="flex flex-1 flex-col space-y-4 overflow-auto px-4">
            {Array.from({ length: 10 }).map((_, i) => (
              <div
                key={i}
                className="h-6 w-full shrink-0 animate-pulse rounded-md bg-zinc-200 dark:bg-zinc-800"
              />
            ))}
          </div>
        }
      >
        {/* @ts-ignore */}
        <SidebarList userId={userId} />
      </React.Suspense>
    </div>
  );
}
