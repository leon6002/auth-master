import * as React from "react";

import { shareChat } from "@/app/actions";
import { Button } from "@/components/ui/button";
import { PromptForm } from "./prompt-form";
import { ButtonScrollToBottom } from "@/components/common/buttons/button-scroll-to-bottom";
import { IconShare } from "@/components/ui/icons";
import { ChatShareDialog } from "./chat-share-dialog";
import { useAIState, useActions, useUIState } from "ai/rsc";
import type { AI } from "@/lib/chat/actions";
import { nanoid } from "nanoid";
import { UserMessage } from "@/components/features/stocks/message";
import AgentSelector from "./agent-selector";
import { agentIndex, EXAMPLE_MSGS } from "@/routes";

export interface ChatPanelProps {
  id?: string;
  title?: string;
  input: string;
  setInput: (value: string) => void;
  isAtBottom: boolean;
  scrollToBottom: () => void;
  model: string;
  agent: string;
  handleModelChange: (value: string) => void;
  handleAgentChange: (value: string) => void;
}

export function ChatPanel({
  id,
  title,
  input,
  setInput,
  isAtBottom,
  scrollToBottom,
  model,
  agent,
  handleModelChange,
  handleAgentChange,
}: ChatPanelProps) {
  const [aiState] = useAIState();
  const [messages, setMessages] = useUIState<typeof AI>();
  const { submitUserMessage } = useActions();
  const [shareDialogOpen, setShareDialogOpen] = React.useState(false);
  const [isOpen, setIsOpen] = React.useState(false);

  const exampleMessages = EXAMPLE_MSGS[agentIndex(agent)];

  return (
    <div className="w-full bg-background">
      <ButtonScrollToBottom
        isAtBottom={isAtBottom}
        scrollToBottom={scrollToBottom}
      />

      <div className="px-2">
        <div className="mb-4 grid grid-cols-1 gap-2">
          {messages.length === 0 &&
            exampleMessages.slice(0, 2).map((example, index) => (
              <div
                key={example.heading}
                className="cursor-pointer rounded-lg border bg-white p-3 text-xs hover:bg-zinc-50 dark:bg-zinc-950 dark:hover:bg-zinc-900"
                onClick={async () => {
                  setMessages((currentMessages) => [
                    ...currentMessages,
                    {
                      id: nanoid(),
                      display: <UserMessage>{example.message}</UserMessage>,
                    },
                  ]);

                  const responseMessage = await submitUserMessage(
                    example.message,
                    model,
                    agent,
                  );

                  setMessages((currentMessages) => [
                    ...currentMessages,
                    responseMessage,
                  ]);
                }}
              >
                <div className="font-semibold">{example.heading}</div>
                <div className="text-zinc-600">{example.subheading}</div>
              </div>
            ))}
        </div>

        {messages?.length >= 2 ? (
          <div className="flex h-8 items-center justify-center">
            <div className="flex space-x-2">
              {id && title ? (
                <>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setShareDialogOpen(true)}
                  >
                    <IconShare className="mr-1 h-3 w-3" />
                    Share
                  </Button>
                  <ChatShareDialog
                    open={shareDialogOpen}
                    onOpenChange={setShareDialogOpen}
                    onCopy={() => setShareDialogOpen(false)}
                    shareChat={shareChat}
                    chat={{
                      id,
                      title,
                      messages: aiState.messages,
                    }}
                  />
                </>
              ) : null}
            </div>
          </div>
        ) : null}

        <div className="space-y-3 border-t bg-background px-2 py-3">
          <AgentSelector
            model={model}
            handleModelChange={handleModelChange}
            agent={agent}
            handleAgentChange={handleAgentChange}
          />

          <PromptForm
            input={input}
            setInput={setInput}
            model={model}
            agent={agent}
          />
        </div>
      </div>
    </div>
  );
}
