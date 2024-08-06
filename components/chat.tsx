"use client";

import { cn, sleep } from "@/lib/utils";
import { ChatList } from "@/components/chat-list";
import { ChatPanel } from "@/components/chat-panel";
import { EmptyScreen } from "@/components/empty-screen";
import { useLocalStorage } from "@/lib/hooks/use-local-storage";
import { useEffect, useState } from "react";
import { useUIState, useAIState } from "ai/rsc";
import { Message, Session } from "@/lib/types";
import { usePathname, useRouter } from "next/navigation";
import { useScrollAnchor } from "@/lib/hooks/use-scroll-anchor";
import { toast } from "sonner";
import { DEFAULT_AGENT_PATH } from "@/routes";

export interface ChatProps extends React.ComponentProps<"div"> {
  initialMessages?: Message[];
  id?: string;
  session?: Session;
  missingKeys: string[];
}

export function Chat({ id, className, session, missingKeys }: ChatProps) {
  const router = useRouter();
  const path = usePathname();
  const [input, setInput] = useState("");
  const [messages] = useUIState();
  // console.log("messages is: ", messages);
  const [aiState] = useAIState();

  const [_, setNewChatId] = useLocalStorage("newChatId", id);

  useEffect(() => {
    if (session?.user) {
      if (!path.includes("chat") && messages.length === 1) {
        console.log(
          "components/chat.tsx:36 on agent page, refirecting to /agent/chat/[id] page",
        );
        //replaceState will only update the uri, but not load the page of the uri
        window.history.replaceState({}, "", `${DEFAULT_AGENT_PATH}/chat/${id}`);
      }
    }
  }, [id, path, session?.user, messages]);

  useEffect(() => {
    const messagesLength = aiState.messages?.length;
    console.log("components/chat.tsx:45", messagesLength, aiState.messages);
    const path: string = aiState.chatId;
    if (messagesLength === 2 || messagesLength === 3) {
      console.log("start refreshing route: ", path);
      setTimeout(() => {
        console.log("start refreshing route: ", path);
        router.push(`${DEFAULT_AGENT_PATH}/chat/${path}`);
        router.refresh();
      }, 500);
      // router.refresh();
    }
  }, [aiState.messages, aiState.chatId, router]);

  useEffect(() => {
    setNewChatId(id);
  });

  useEffect(() => {
    missingKeys.map((key) => {
      toast.error(`Missing ${key} environment variable!`);
    });
  }, [missingKeys]);

  const { messagesRef, scrollRef, visibilityRef, isAtBottom, scrollToBottom } =
    useScrollAnchor();

  return (
    <div
      className="group w-full overflow-auto pl-0 peer-[[data-state=open]]:lg:pl-[250px] peer-[[data-state=open]]:xl:pl-[300px]"
      ref={scrollRef}
    >
      <div
        className={cn("pb-[200px] pt-4 md:pt-10", className)}
        ref={messagesRef}
      >
        {messages.length ? (
          <ChatList messages={messages} isShared={false} session={session} />
        ) : (
          <EmptyScreen />
        )}
        <div className="h-px w-full" ref={visibilityRef} />
      </div>
      <ChatPanel
        id={id}
        input={input}
        setInput={setInput}
        isAtBottom={isAtBottom}
        scrollToBottom={scrollToBottom}
      />
    </div>
  );
}
