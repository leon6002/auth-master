import { Separator } from "@/components/ui/separator";
import { UIState } from "@/lib/chat/actions";
import { Session } from "@/lib/types";
import Link from "next/link";
import { ExclamationTriangleIcon } from "@radix-ui/react-icons";

export interface ChatList {
  messages: UIState;
  session?: Session;
  isShared: boolean;
}

export function ChatList({ messages, session, isShared }: ChatList) {
  // console.log("chatlist page trigged");
  if (!messages.length) {
    return null;
  }

  return (
    <div className="relative mx-auto max-w-2xl px-4">
      {!isShared && !session ? (
        <>
          <div className="group relative mb-4 flex items-start md:-ml-12">
            <div className="flex size-[25px] shrink-0 select-none items-center justify-center rounded-md border bg-background shadow-sm">
              <ExclamationTriangleIcon />
            </div>
            <div className="ml-4 flex-1 space-y-2 overflow-hidden px-1">
              <p className="leading-normal text-muted-foreground">
                请{" "}
                <Link href="/auth/login" className="underline">
                  登录
                </Link>{" "}
                {/* or{" "}
                <Link href="/signup" className="underline">
                  sign up
                </Link>{" "} */}
                以保存和查看您的聊天记录！
              </p>
            </div>
          </div>
          <Separator className="my-4" />
        </>
      ) : null}

      {messages.map((message, index) => (
        <div key={message.id}>
          {message.display}
          {index < messages.length - 1 && message.display !== null && (
            <Separator className="my-4" />
          )}
        </div>
      ))}
    </div>
  );
}
