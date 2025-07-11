import { Separator } from "@/components/ui/separator";
import { UIState } from "@/lib/chat/actions";
import { Session } from "@/lib/types";
import Link from "next/link";
import { ExclamationTriangleIcon } from "@radix-ui/react-icons";
import React from "react";

export interface ChatList {
  messages: UIState;
  session?: Session;
  isShared: boolean;
}

// 检查是否是BotCard组件
function isBotCard(element: React.ReactElement): boolean {
  if (!element || !element.type) return false;

  // 检查组件名称
  const componentName =
    typeof element.type === "function" ? element.type.name : "";
  return componentName === "BotCard";
}

// 递归检查元素及其子元素是否包含BotCard
function containsBotCard(element: any): boolean {
  // 如果是数组，检查数组中的每个元素
  if (Array.isArray(element)) {
    return element.some((item) => containsBotCard(item));
  }

  if (!React.isValidElement(element)) return false;

  if (isBotCard(element)) return true;

  // 检查子元素
  if (element.props && element.props.children) {
    const children = React.Children.toArray(element.props.children);
    return children.some((child) => containsBotCard(child));
  }

  return false;
}

// 检查是否是工具消息（包括实时流式渲染和刷新后重建的情况）
function isToolMessage(display: any): boolean {
  // 情况1：刷新后重建 - tool消息被转换为数组
  if (Array.isArray(display)) {
    return true;
  }

  // 情况2：实时流式渲染 - 直接返回BotCard组件
  if (React.isValidElement(display) && isBotCard(display)) {
    return true;
  }

  // 情况3：检查是否是 Suspense 包装的组件（实时流式渲染的情况）
  if (React.isValidElement(display) && typeof display.type === "symbol") {
    // 这很可能是 React.Suspense 包装的工具组件
    return true;
  }

  // 情况4：递归检查是否包含BotCard
  return containsBotCard(display);
}

export function ChatList({ messages, session, isShared }: ChatList) {
  // console.log("chatlist page trigged");
  if (!messages.length) {
    return null;
  }

  // 过滤掉包含功能组件的消息，只显示文本对话
  const textMessages = messages.filter((message) => {
    if (!message.display) return false;

    // 使用新的工具消息检测函数
    const isToolMsg = isToolMessage(message.display);
    console.log(
      `ChatList: 消息 ${message.id}, isToolMessage: ${isToolMsg}, display类型: ${typeof message.display}, 是否数组: ${Array.isArray(message.display)}`,
    );

    if (React.isValidElement(message.display)) {
      let componentName = "unknown";
      if (typeof message.display.type === "function") {
        componentName = message.display.type.name || "anonymous function";
      } else if (typeof message.display.type === "string") {
        componentName = message.display.type;
      } else if (typeof message.display.type === "symbol") {
        componentName = message.display.type.toString();
      }
      console.log(`ChatList: React元素组件名: ${componentName}`);

      // 详细检查 BotCard
      const isBotCardResult = isBotCard(message.display);
      console.log(`ChatList: isBotCard结果: ${isBotCardResult}`);
    }

    console.log(`ChatList: 最终过滤结果 - 显示消息: ${!isToolMsg}`);
    return !isToolMsg;
  });

  return (
    <div className="relative w-full">
      {!isShared && !session ? (
        <>
          <div className="group relative mb-4 flex items-start">
            <div className="flex size-[20px] shrink-0 select-none items-center justify-center rounded-md border bg-background shadow-sm">
              <ExclamationTriangleIcon className="h-3 w-3" />
            </div>
            <div className="ml-2 flex-1 space-y-2 overflow-hidden">
              <p className="text-xs leading-normal text-muted-foreground">
                请{" "}
                <Link href="/auth/login" className="underline">
                  登录
                </Link>{" "}
                以保存聊天记录！
              </p>
            </div>
          </div>
          <Separator className="my-2" />
        </>
      ) : null}

      {textMessages.map((message, index) => (
        <div key={message.id} className="text-sm">
          {message.display}
          {index < textMessages.length - 1 && message.display !== null && (
            <Separator className="my-2" />
          )}
        </div>
      ))}
    </div>
  );
}
