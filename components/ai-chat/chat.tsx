"use client";

import { cn } from "@/lib/utils";
import { ChatList } from "./chat-list";
import { ChatPanel } from "./chat-panel";
import { EmptyScreen } from "./empty-screen";
import { ComponentDisplay } from "./component-display";
import { useEffect, useState } from "react";
import { useUIState, useAIState } from "ai/rsc";
import { Message, Session } from "@/lib/types";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useScrollAnchor } from "@/lib/hooks/use-scroll-anchor";
import { toast } from "sonner";

// 泛型本地存储 Hook
function useLocalStorageState<T>(
  key: string,
  initialValue: T,
): [T, (value: T) => void] {
  // 从本地存储获取初始值
  const getInitialValue = (): T => {
    try {
      const storedValue = localStorage.getItem(key);
      return storedValue ? JSON.parse(storedValue) : initialValue;
    } catch (error) {
      console.error(`Failed to load ${key} from localStorage:`, error);
      return initialValue;
    }
  };

  const [value, setValue] = useState<T>(getInitialValue);

  // 同步值到本地存储
  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error(`Failed to save ${key} to localStorage:`, error);
    }
  }, [key, value]);

  return [value, setValue];
}

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

  // 使用本地存储 Hook 初始化模型和代理
  const [model, setModel] = useLocalStorageState<string>(
    "model",
    "qwen-max-latest",
  );
  const [agent, setAgent] = useLocalStorageState<string>("agent", "");

  // 类型安全的事件处理函数
  const handleModelChange = (value: string): void => {
    setModel(value);
    console.log("model new value is:", value);
  };

  const handleAgentChange = (value: string): void => {
    setAgent(value);
  };

  const [_, setNewChatId] = useState<string | undefined>(id);

  // 导航逻辑 - 优化以避免频繁触发
  useEffect(() => {
    if (session?.user) {
      if (!path.includes("chat") && messages.length === 1) {
        // 只在第一条消息时修改URL，避免每次消息都触发
        window.history.replaceState({}, "", `/agent/chat/${id}`);
      }
    }
  }, [id, path, session?.user, messages.length]);

  // 移除自动刷新逻辑以改善用户体验

  // 更新聊天 ID
  useEffect(() => {
    setNewChatId(id);
  }, [id]);

  // 环境变量缺失提示
  useEffect(() => {
    missingKeys.forEach((key) => {
      toast.error(`Missing ${key} environment variable!`);
    });
  }, [missingKeys]);

  // 滚动锚点管理
  const { messagesRef, scrollRef, visibilityRef, isAtBottom, scrollToBottom } =
    useScrollAnchor();

  return (
    <div className="group flex h-full w-full pl-0 transition-all duration-300 ease-in-out peer-[[data-state=open]]:lg:pl-[250px] peer-[[data-state=open]]:xl:pl-[300px]">
      {/* 左侧聊天区域 - 占1/3宽度 */}
      <div className="flex w-1/3 flex-col border-r border-border">
        <div className="flex-1 overflow-y-scroll" ref={scrollRef}>
          <div
            className={cn("px-4 pb-[200px] pt-4 md:pt-10", className)}
            ref={messagesRef}
          >
            {messages.length ? (
              <ChatList
                messages={messages}
                isShared={false}
                session={session}
              />
            ) : (
              <EmptyScreen />
            )}
            <div className="h-px w-full" ref={visibilityRef} />
          </div>
        </div>

        <div className="border-t">
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
      </div>

      {/* 右侧组件展示区域 - 占2/3宽度 */}
      <div className="flex-1 overflow-y-auto bg-gray-50/50 dark:bg-gray-900/50">
        <ComponentDisplay messages={messages} />
      </div>
    </div>
  );
}
