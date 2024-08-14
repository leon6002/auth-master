"use client";

import { cn } from "@/lib/utils";
import { ChatList } from "@/components/chat-list";
import { ChatPanel } from "@/components/chat-panel";
import { EmptyScreen } from "@/components/empty-screen";
import { useLocalStorage } from "@/lib/hooks/use-local-storage";
import { useEffect, useState } from "react";
import { useUIState, useAIState } from "ai/rsc";
import { Message, Session } from "@/lib/types";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useScrollAnchor } from "@/lib/hooks/use-scroll-anchor";
import { toast } from "sonner";

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
  const [aiState] = useAIState();

  const [model, setModel] = useState("");
  const [agent, setAgent] = useState("");

  const handleModelChange = (value: string) => {
    setModel(value);
    console.log("mode new value is:", value);
  };

  const handleAgentChange = (value: string) => {
    setAgent(value);
    // console.log("agent new value is:", value);
  };

  const [_, setNewChatId] = useLocalStorage("newChatId", id);

  useEffect(() => {
    if (session?.user) {
      if (!path.includes("chat") && messages.length >= 1) {
        window.history.replaceState({}, "", `/agent/chat/${id}`);
      }
    }
  }, [id, path, session?.user, messages]);

  useEffect(() => {
    const storedAgent = localStorage.getItem("agent");
    //load agent
    if (!agent && storedAgent) {
      setAgent(storedAgent);
      // console.log(`agent is updated from localStorage: ${storedAgent}`);
    }
    if (agent && agent !== storedAgent) {
      localStorage.setItem("agent", agent);
    }
  }, [agent]);

  useEffect(() => {
    const storedModel = localStorage.getItem("model");
    //load model
    if (!model && storedModel) {
      setModel(storedModel);
      console.log(`model is updated from localStorage: ${storedModel}`);
    }
    //update local storage if needed
    if (model && model !== storedModel) {
      localStorage.setItem("model", model);
    }
  }, [model]);

  useEffect(() => {
    let timerId;
    const messagesLength = aiState.messages?.length;
    if (messagesLength === 2 || messagesLength === 3) {
      console.log("start refreshing route timer: ");
      if (!timerId) {
        timerId = setTimeout(() => {
          router.refresh();
        }, 500);
      }
    }
  }, [aiState.messages, router]);

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
        model={model}
        handleModelChange={handleModelChange}
        agent={agent}
        handleAgentChange={handleAgentChange}
      />
    </div>
  );
}
