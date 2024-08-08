"use client";

import { cn, sleep } from "@/lib/utils";
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
import {
  agentFromIndex,
  agentIndex,
  AVALIABLE_AGENTS,
  AVALIABLE_MODELS,
  DEFAULT_AGENT_PATH,
  DEFAULT_AGENT_VALUE,
  DEFAUTL_MODEL_VALUE,
  modelFromIndex,
  modelIndex,
} from "@/routes";
import AgentSelector from "./AgentSelector";

export interface ChatProps extends React.ComponentProps<"div"> {
  initialMessages?: Message[];
  id?: string;
  session?: Session;
  missingKeys: string[];
}

export function Chat({ id, className, session, missingKeys }: ChatProps) {
  const router = useRouter();
  const path = usePathname();
  const searchParams = useSearchParams();

  const [input, setInput] = useState("");
  const [messages] = useUIState();
  // console.log("messages is: ", messages);
  const [aiState] = useAIState();

  const [model, setModel] = useState("");
  const [agent, setAgent] = useState("");

  useEffect(() => {
    const prevModel = modelFromIndex(
      parseInt(searchParams.get("model") || "0"),
    );
    if (!model) {
      setModel(prevModel || AVALIABLE_MODELS[0]);
    }
    const prevAgent = agentFromIndex(
      parseInt(searchParams.get("agent") || "0"),
    );
    if (!agent) {
      setAgent(prevAgent || AVALIABLE_AGENTS[0]);
    }

    console.log(`${prevModel} -> ${model}`);
    console.log(`${prevAgent} -> ${agent}`);
  }, [searchParams]);

  const handleModelChange = (value: string) => {
    console.log("path is: ", path);
    setModel(value);
    console.log("mode new value is:", value);
    console.log(
      `handleModelChange pushing to ${path}?agent=${agentIndex(agent)}&model=${modelIndex(value)}`,
    );
    router.push(
      `${path}?agent=${agentIndex(agent)}&model=${modelIndex(value)}`,
    );
    router.refresh();
  };

  const handleAgentChange = (value: string) => {
    setAgent(value);
    console.log(
      `handleAgentChange pushing to ${path}?agent=${agentIndex(value)}&model=${modelIndex(model)}`,
    );
    router.push(
      `${path}?agent=${agentIndex(value)}&model=${modelIndex(model)}`,
    );
  };

  const [_, setNewChatId] = useLocalStorage("newChatId", id);

  useEffect(() => {
    const messagesLength = aiState.messages?.length;
    console.log("components/chat.tsx:45", messagesLength, aiState.messages);
    const chatId: string = aiState.chatId;
    if (messagesLength === 2 || messagesLength === 3) {
      console.log("start refreshing route: ", chatId);
      setTimeout(() => {
        console.log("start refreshing route: ", chatId);
        console.log(`${agent} - ${model}`);
        router.push(
          `${DEFAULT_AGENT_PATH}/chat/${chatId}?&agent=${agentIndex(agent)}&model=${modelIndex(model)}`,
        );
        router.refresh();
      }, 500);
      // router.refresh();
    }
  }, [aiState.messages, aiState.chatId, router, searchParams, agent, model]);

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
