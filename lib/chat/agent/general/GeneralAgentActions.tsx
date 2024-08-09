"use server";
import {
  createAI,
  createStreamableUI,
  getMutableAIState,
  getAIState,
  streamUI,
  createStreamableValue,
} from "ai/rsc";

import { createOpenAI, openai } from "@ai-sdk/openai";

import { BotMessage } from "@/components/stocks";

import {
  formatNumber,
  runAsyncFnWithoutBlocking,
  sleep,
  nanoid,
  getFormattedDate,
} from "@/lib/utils";
import { saveChat } from "@/app/actions";
import { SpinnerMessage, UserMessage } from "@/components/stocks/message";
import { Chat, Message } from "@/lib/types";
import { auth } from "@/auth";
import { AI } from "../../actions";
import { format } from "date-fns";

export const GeneralAgent = async (content: string, model: string) => {
  const aiState = getMutableAIState<typeof AI>();

  aiState.update({
    ...aiState.get(),
    messages: [
      ...aiState.get().messages,
      {
        id: nanoid(),
        role: "user",
        content,
      },
    ],
  });

  let textStream: undefined | ReturnType<typeof createStreamableValue<string>>;
  let textNode: undefined | React.ReactNode;
  const openai = createOpenAI({
    baseURL: process.env.OPENAI_BASE_URL,
    apiKey: process.env.OPENAI_API_KEY,
  });
  const today = format(new Date(), "yyyy-MM-dd HH:mm:ss");
  const result = await streamUI({
    model: openai(model),
    initial: <SpinnerMessage />,
    system: `\
    you are a helpful assistant, current time is ${today}
    `,
    messages: [
      ...aiState.get().messages.map((message: any) => ({
        role: message.role,
        content: message.content,
        name: message.name,
      })),
    ],
    text: ({ content, done, delta }) => {
      if (!textStream) {
        textStream = createStreamableValue("");
        textNode = <BotMessage content={textStream.value} />;
      }

      if (done) {
        console.log("lib/chat/actions.tsx:168 text streaming done");
        textStream.done();
        //todo delete below if ok
        aiState.done({
          ...aiState.get(),
          messages: [
            ...aiState.get().messages,
            {
              id: nanoid(),
              role: "assistant",
              content,
            },
          ],
        });
        console.log("lib/chat/actions.tsx:181 aiState.done");
      } else {
        // console.log("lib/chat/actions.tsx:183 text stream updating");
        textStream.update(delta);
      }

      return textNode;
    },
  });

  return {
    id: nanoid(),
    display: result.value,
  };
};

export const getUIStateFromAIState = (aiState: Chat) => {
  return aiState.messages
    .filter((message) => message.role !== "system")
    .map((message, index) => {
      const id = `${aiState.chatId}-${index}`;
      return {
        id: id,
        display:
          message.role === "user" ? (
            <UserMessage>{message.content as string}</UserMessage>
          ) : message.role === "assistant" &&
            typeof message.content === "string" ? (
            <>
              <BotMessage content={message.content} />
              <div>gpt-4</div>
            </>
          ) : null,
      };
    });
};
