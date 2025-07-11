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
      <div className="mb-4 grid grid-cols-1 items-start gap-4 pb-4 text-sm sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {attractions.map((attraction) => (
          <button
            key={attraction.scenicId}
            className="group relative flex cursor-pointer flex-col overflow-hidden rounded-xl border-0 bg-white p-0 text-left shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl dark:bg-gray-800"
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
            <div className="relative aspect-[4/3] w-full overflow-hidden bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-700 dark:to-gray-600">
              <Image
                src={attraction.newPicUrl}
                alt={attraction.scenicName}
                className="object-cover transition-all duration-500 group-hover:scale-110"
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 25vw"
              />
              {/* 渐变遮罩 */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>
              {/* 价格标签 */}
              <div className="absolute right-2 top-2 rounded-full bg-white/90 px-2 py-1 text-xs font-bold text-orange-600 shadow-lg backdrop-blur-sm dark:bg-gray-900/90 dark:text-orange-400">
                ¥{attraction.salePrice}
              </div>
            </div>
            <div className="flex w-full flex-col gap-y-3 p-4">
              {/* 景点名称 */}
              <div
                className="line-clamp-2 text-lg font-bold text-gray-800 dark:text-gray-100"
                title={attraction.scenicName}
              >
                {attraction.scenicName}
              </div>

              {/* 地址信息 */}
              <div className="flex items-start gap-2 text-sm text-gray-600 dark:text-gray-300">
                <FaLocationDot
                  size={14}
                  className="mt-0.5 flex-shrink-0 text-red-500"
                />
                <p
                  className="line-clamp-1 flex-1 leading-5"
                  title={attraction.address}
                >
                  {attraction.address}
                </p>
              </div>

              {/* 营业时间 */}
              <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300">
                <MdAccessTime
                  size={14}
                  className="flex-shrink-0 text-blue-500"
                />
                <span className="line-clamp-1">{attraction.bizTime}</span>
              </div>

              {/* 底部操作区域 */}
              <div className="mt-2 flex items-center justify-between border-t border-gray-100 pt-3 dark:border-gray-700">
                <div className="flex items-baseline gap-1">
                  <span className="text-xs text-gray-500">起价</span>
                  <span className="text-lg font-bold text-orange-600 dark:text-orange-400">
                    ¥{attraction.salePrice}
                  </span>
                </div>
                <div className="rounded-full bg-blue-500 px-3 py-1 text-xs font-medium text-white transition-colors duration-200 group-hover:bg-blue-600">
                  查看详情
                </div>
              </div>
            </div>
          </button>
        ))}
      </div>
      <div className="mt-4 rounded-lg bg-amber-50 p-3 text-center dark:bg-amber-900/20">
        <div className="flex items-center justify-center gap-2 text-xs text-amber-700 dark:text-amber-300">
          <span>💡</span>
          <span>景区价格可能有所浮动，以景区实际公告为准</span>
        </div>
      </div>
    </div>
  );
}
