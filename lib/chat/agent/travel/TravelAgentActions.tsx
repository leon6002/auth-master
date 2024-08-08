"use server";
import { getMutableAIState, streamUI, createStreamableValue } from "ai/rsc";

import { createOpenAI } from "@ai-sdk/openai";

import { BotCard, BotMessage } from "@/components/stocks";

import { z } from "zod";
import { nanoid } from "@/lib/utils";
import { SpinnerMessage, UserMessage } from "@/components/stocks/message";
import { Chat } from "@/lib/types";
import { AI } from "../../actions";
import { AttractionsSkeleton } from "@/components/attractions/attractions-skeleton";
import { Attractions } from "@/components/attractions";
import { Weather } from "@/components/weather";
import { WeatherSkeleton } from "@/components/weather/weather-skeleton";
import { format } from "date-fns";
import { AVALIABLE_MODELS } from "@/routes";

export const TravelAgentActions = async (content: string, model: string) => {
  if (!model || model === AVALIABLE_MODELS[0]) {
    model = AVALIABLE_MODELS[1];
  }
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
  console.log("process.env.OPENAI_BASE_URL: ", process.env.OPENAI_BASE_URL);
  const openai = createOpenAI({
    baseURL: process.env.OPENAI_BASE_URL,
    apiKey: process.env.OPENAI_API_KEY,
  });

  const today = format(new Date(), "yyyy-MM-dd HH:mm:ss");

  const result = await streamUI({
    model: openai(model),
    initial: <SpinnerMessage />,
    system: `\
    You are a travel assistant bot specialized in Chinese cities and you can help users plan trips to China,step by step.
    You and the user can discuss stock prices and the user can adjust the amount of stocks they want to buy, or place an order, in the UI.

    Messages inside [] means that it's a UI element or a user event. For example:
    - "[scenicId: 7419]" means that an interface of the tourist attraction(with scenicId 7419)'s brief is shown to the user.
    - "[User has selected the city Hangzhou to do a trip]" means that the user has selected Hangzhou city of China to do trip plan in the UI.

    If the user want to show the tourist attractions in a city of China, call \`list_attractions\` with the given city name, you need to translated the city name into Chinese.
    If the user did not provide a city name , you are free to pick any Chinese trending city and call \`list_attractions\`.

    If the user want to know the weather of a city of China, call \`get_weather\` with the given city name, you need to translated the city name into Chinese.

    Besides that, you can also chat with users and do some recommandations if needed.
    Current time is ${today}.
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
    tools: {
      listAttractions: {
        description: "List three attractions in the given Chinese city.",
        parameters: z.object({
          cityName: z
            .string()
            .describe("The name of the Chinese city in Chinese language"),
        }),
        generate: async function* ({ cityName }) {
          yield (
            <BotCard>
              <AttractionsSkeleton />
            </BotCard>
          );

          const toolCallId = nanoid();

          aiState.done({
            ...aiState.get(),
            messages: [
              ...aiState.get().messages,
              {
                id: nanoid(),
                role: "assistant",
                content: [
                  {
                    type: "tool-call",
                    toolName: "listAttractions",
                    toolCallId,
                    args: { cityName },
                  },
                ],
              },
              {
                id: nanoid(),
                role: "tool",
                content: [
                  {
                    type: "tool-result",
                    toolName: "listAttractions",
                    toolCallId,
                    result: { cityName },
                  },
                ],
              },
            ],
          });

          return (
            <BotCard>
              <Attractions props={{ cityName, toolCallId }} />
            </BotCard>
          );
        },
      },
      getWeather: {
        description: "get the weather of the given Chinese city.",
        parameters: z.object({
          cityName: z
            .string()
            .describe("The name of the Chinese city in Chinese language"),
        }),
        generate: async function* ({ cityName }) {
          yield (
            <BotCard>
              <WeatherSkeleton />
            </BotCard>
          );

          const toolCallId = nanoid();

          aiState.done({
            ...aiState.get(),
            messages: [
              ...aiState.get().messages,
              {
                id: nanoid(),
                role: "assistant",
                content: [
                  {
                    type: "tool-call",
                    toolName: "getWeather",
                    toolCallId,
                    args: { cityName },
                  },
                ],
              },
              {
                id: nanoid(),
                role: "tool",
                content: [
                  {
                    type: "tool-result",
                    toolName: "getWeather",
                    toolCallId,
                    result: cityName,
                  },
                ],
              },
            ],
          });

          return (
            <BotCard>
              <Weather props={{ cityName, toolCallId }} />
            </BotCard>
          );
        },
      },
    },
  });

  console.log("lib/chat/actions.tsx:488, streamUI ready, returning display ");
  console.log("result is: ", result);

  return {
    id: nanoid(),
    display: result.value,
  };
};

export const getUIStateFromAIState = (aiState: Chat) => {
  console.log("lib/chat/actions.tsx:562 getUIStateFromAIState");
  // console.log(" aiState is: ", JSON.stringify(aiState));
  return aiState.messages
    .filter((message) => message.role !== "system")
    .map((message, index) => {
      const id = `${aiState.chatId}-${index}`;
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
          default:
            return null;
        }
      };

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
