"use client";

import { useActions, useUIState } from "ai/rsc";

import type { AI } from "@/lib/chat/actions";
import useAttractions from "@/lib/hooks/use-attractions";
import Image from "next/image";
import { FaLocationDot } from "react-icons/fa6";
import { MdAccessTime } from "react-icons/md";
import { AttractionsSkeleton } from "./attractions-skeleton";
import { AVALIABLE_AGENTS } from "@/routes";

export function Attractions({
  props: { cityName, toolCallId, model },
}: {
  props: { cityName: string; toolCallId: string; model: string };
}) {
  // console.log(
  //   `components/attractions/attractions.tsx:18 Attractions receiving props: ${cityName}, ${toolCallId}, ${model}`,
  // );
  const [, setMessages] = useUIState<typeof AI>();
  const { submitUserMessage } = useActions();
  console.log("components/attractions/attractions.tsx:21 start useAttractions");
  const { attractions, isLoading, error } = useAttractions(
    cityName,
    toolCallId,
  );
  if (isLoading) return <AttractionsSkeleton message="景点加载中..." />;
  if (error) return <AttractionsSkeleton message="数据获取失败" />;

  return (
    <div>
      <div className="mb-2 flex max-w-screen-sm flex-col gap-2 overflow-scroll pb-4 text-sm sm:flex-row">
        {attractions.map((attraction) => (
          <button
            key={attraction.scenicId}
            className="flex cursor-pointer flex-col gap-2 rounded-lg bg-secondary p-2 text-left hover:bg-primary/10 dark:bg-zinc-800 sm:w-52"
            onClick={async () => {
              console.log(
                `submitUserMessage from listAttraction, ${model}, ${attraction.scenicId}}`,
              );
              const response = await submitUserMessage(
                `View attraction detail with scenicId: ${attraction.scenicId}`,
                model,
                AVALIABLE_AGENTS[1],
              );
              setMessages((currentMessages) => [...currentMessages, response]);
            }}
          >
            <div
              className={`flex w-[180px] flex-row justify-center rounded-md bg-primary-foreground text-xl text-red-600 dark:bg-white/10`}
            >
              <Image
                src={attraction.newPicUrl}
                alt={attraction.scenicName}
                className="rounded-md object-cover"
                width={300}
                height={200}
              />
            </div>
            <div className="flex w-full flex-col gap-y-2">
              <div className="bold uppercase text-primary">
                {attraction.scenicName}
              </div>
              <div className="flex items-center gap-1 pl-1 text-base text-primary/60">
                ¥{attraction.salePrice}
              </div>
              <div className="flex items-center gap-1 pl-1 text-xs text-zinc-500">
                <FaLocationDot size={16} />
                <p
                  className="line-clamp-1 w-full flex-1 text-ellipsis leading-5"
                  title={attraction.address}
                >
                  {attraction.address}
                </p>
              </div>
              <div className="flex items-center gap-1 pl-1 text-xs text-zinc-500">
                <MdAccessTime size={16} />
                {attraction.bizTime}
              </div>
            </div>
          </button>
        ))}
      </div>
      <div className="p-1 text-center text-xs text-zinc-500">
        注意：景区价格可能有所浮动，以景区实际公告为准
      </div>
    </div>
  );
}
