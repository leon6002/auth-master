import "server-only";

import { createAI, getAIState } from "ai/rsc";

import { nanoid } from "@/lib/utils";
import { saveChat } from "@/app/actions";
import { Chat, Message } from "@/lib/types";
import { auth } from "@/auth";
import {
  StockAgent,
  ConfirmPurchase,
} from "@/lib/chat/agent/stock/StockAgentActions";
import { GeneralAgent } from "@/lib/chat/agent/general/GeneralAgentActions";
import { TravelAgentActions } from "./agent/travel/TravelAgentActions";
import { BotCard, Events, Purchase, Stock, Stocks } from "@/components/stocks";
import { BotMessage, UserMessage } from "@/components/stocks/message";
import { Attractions } from "@/components/attractions";
import { Weather } from "@/components/weather";

async function submitUserMessage(
  content: string,
  model?: string,
  agent?: string,
) {
  "use server";
  console.log(`submitUserMessage params: model: ${model}, agent: ${agent}`);
  const modelList = ["llama3.1:8b", "gpt-4o", "gpt-4o-mini"];
  if (!model || !modelList.includes(model)) {
    model = modelList[0];
  }
  switch (agent) {
    case "stock":
      return StockAgent(content, model);
    case "travel":
      return TravelAgentActions(content, model);
    default:
      return GeneralAgent(content, model);
  }
}

export type AIState = {
  chatId: string;
  messages: Message[];
};

export type UIState = {
  id: string;
  display: React.ReactNode;
}[];

export const AI = createAI<AIState, UIState>({
  actions: {
    submitUserMessage,
    ConfirmPurchase,
  },
  initialUIState: [],
  initialAIState: { chatId: nanoid(), messages: [] },
  onGetUIState: async () => {
    "use server";
    console.log("lib/chat/actions.tsx 519 onGetUIState is running");
    const session = await auth();

    if (!session || !session.user) {
      return;
    }
    const aiState = getAIState() as Chat;

    const uiState = getUIStateFromAIState(aiState);
    console.log(
      "lib/chat/actions.tsx:67 returning uiState, length is: ",
      aiState.messages?.length,
    );
    return uiState;
  },
  onSetAIState: async ({ state }) => {
    "use server";
    console.log("lib/chat/actions.tsx 534 onSetAIState is running");

    const session = await auth();
    if (!session || !session.user) {
      return;
    }
    console.log(
      "lib/chat/actions.tsx 540 onSetAIState is getting messages from state",
    );
    const { chatId, messages } = state;
    console.log(
      "lib/chat/actions.tsx 540 onSetAIState get messages from state success",
    );

    const createdAt = new Date();
    const userId = session.user.id as string;
    const path = `/agent/chat/${chatId}`;

    const firstMessageContent = messages[0].content as string;
    const title = firstMessageContent.substring(0, 100);

    const chat: Chat = {
      id: chatId,
      title,
      userId,
      createdAt,
      messages,
      path,
    };
    console.log("lib/chat/actions.tsx:563 onSetAIState saveChat start");
    // const aiState = getMutableAIState<typeof AI>();
    // aiState.update()
    await saveChat(chat);

    console.log("lib/chat/actions.tsx:565 onSetAIState saveChat success");
    // const aiState = getMutableAIState<typeof AI>();
  },
});

export const getUIStateFromAIState = (aiState: Chat) => {
  console.log("lib/chat/actions.tsx:562 getUIStateFromAIState");
  console.log(" aiState is: ", JSON.stringify(aiState));
  return aiState.messages
    .filter((message) => message.role !== "system")
    .map((message, index) => {
      const id = `${aiState.chatId}-${index}`;
      return {
        id: id,
        display:
          message.role === "tool" ? (
            message.content.map((tool) => {
              console.log("569 tool.toolName: ", tool.toolName);
              return displayToolContent(
                tool.toolName,
                tool.result,
                tool.toolCallId,
              );
            })
          ) : message.role === "user" ? (
            <UserMessage>{message.content as string}</UserMessage>
          ) : message.role === "assistant" &&
            typeof message.content === "string" ? (
            <BotMessage content={message.content} />
          ) : null,
      };
    });
};

const displayToolContent = (
  toolName: string,
  result: any,
  toolCallId: string,
) => {
  switch (toolName) {
    case "listAttractions":
      return (
        <BotCard>
          <Attractions props={{ cityName: result, toolCallId }} />
        </BotCard>
      );
    case "getWeather":
      return (
        <BotCard>
          <Weather
            props={{
              cityName: result as string,
              toolCallId: toolCallId,
            }}
          />
        </BotCard>
      );
    case "listStocks":
      return (
        <BotCard>
          <Stocks props={result} />
        </BotCard>
      );
    case "showStockPrice":
      return (
        <BotCard>
          <Stock props={result} />
        </BotCard>
      );
    case "showStockPurchase":
      return (
        <BotCard>
          <Purchase props={result} />
        </BotCard>
      );
    case "getEvents":
      return (
        <BotCard>
          <Events props={result} />
        </BotCard>
      );
    default:
      return null;
  }
};
