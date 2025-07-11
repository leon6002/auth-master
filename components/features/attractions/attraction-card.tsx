"use client";
import { nanoid } from "@/lib/utils";
import useSearchImage from "@/lib/hooks/use-search-image";
import { ImageGallery } from "./image-gallery";
import ImageGallerySkeleton from "./image-gallery-skeleton";
import { Coordinates } from "@/lib/types";
import { AttractionSkeleton } from "./attraction-skeleton";
import MapSearch from "../maps/map-search";
import {
  MapPin,
  Clock,
  Ticket,
  Bus,
  Info,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import Image from "next/image";
import { useState } from "react";

interface AttractionCardProps {
  cityName: string;
  scenicName: string;
  scenicAddress: string;
  openTime?: string[];
  ticketSpecial?: string[];
  scenicDescription: string;
  trafficBus: string;
  defaultPic: string;
  glocation: Coordinates;
  recommand: string;
}

export default function AttractionCard({
  cityName,
  scenicName,
  scenicAddress,
  openTime,
  ticketSpecial,
  scenicDescription,
  trafficBus,
  defaultPic,
  glocation,
  recommand,
}: AttractionCardProps) {
  const [isTicketExpanded, setIsTicketExpanded] = useState(false);
  const { images, isLoading, error } = useSearchImage(
    `${cityName}${scenicName}`,
  );

  // 解析HTML内容的函数
  const parseDescription = (htmlContent: string) => {
    // 提取段落内容
    const paragraphs = htmlContent.match(/<p[^>]*>(.*?)<\/p>/g) || [];
    const elements: JSX.Element[] = [];

    paragraphs.forEach((paragraph, index) => {
      // 检查是否包含图片
      const imgMatch = paragraph.match(/<img[^>]+src="([^"]+)"[^>]*>/);
      if (imgMatch) {
        const imgSrc = imgMatch[1];
        elements.push(
          <div
            key={`img-${index}`}
            className="my-6 overflow-hidden rounded-lg shadow-md"
          >
            <Image
              src={imgSrc}
              alt={`${scenicName}景点图片`}
              width={800}
              height={400}
              className="h-auto w-full object-cover"
            />
          </div>,
        );
      } else {
        // 提取纯文本内容
        const textContent = paragraph.replace(/<[^>]+>/g, "").trim();
        if (textContent) {
          // 检查是否是特殊标题（用【】包围的内容）
          const titleMatch = textContent.match(/^【([^】]+)】(.*)$/);
          if (titleMatch) {
            const [, title, content] = titleMatch;
            elements.push(
              <div key={`section-${index}`} className="mb-4">
                <h4 className="mb-2 flex items-center gap-2 text-lg font-semibold text-blue-600 dark:text-blue-400">
                  <div className="h-6 w-1 rounded-full bg-blue-500"></div>
                  {title}
                </h4>
                <p className="pl-3 leading-relaxed text-gray-700 dark:text-gray-300">
                  {content}
                </p>
              </div>,
            );
          } else {
            elements.push(
              <p
                key={`para-${index}`}
                className="mb-4 leading-relaxed text-gray-700 dark:text-gray-300"
              >
                {textContent}
              </p>,
            );
          }
        }
      }
    });

    return elements;
  };

  if (isLoading) return <AttractionSkeleton message="景点信息加载中..." />;

  return (
    <div className="mx-auto w-full max-w-4xl overflow-hidden rounded-2xl bg-white shadow-xl dark:bg-gray-900">
      {/* 头部区域 */}
      <div className="relative bg-gradient-to-r from-blue-600 to-purple-600 p-6 text-white">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="relative z-10">
          <h1 className="mb-2 text-2xl font-bold">{scenicName}</h1>
          <div className="flex items-center gap-2 text-blue-100">
            <MapPin size={16} />
            <span className="text-sm">{scenicAddress}</span>
          </div>
          {recommand && (
            <div className="mt-3 inline-block rounded-full bg-white/20 px-3 py-1 text-xs backdrop-blur-sm">
              ⭐ {recommand}
            </div>
          )}
        </div>
      </div>

      {/* 图片画廊 */}
      <div className="p-6">
        {isLoading && <ImageGallerySkeleton message="努力查询景点图片中..." />}
        {error && <ImageGallerySkeleton message="查询图片相关景点失败..." />}
        {images.length > 0 && (
          <ImageGallery
            images={images}
            title={`${cityName} ${scenicName}`}
            subtitle={`${recommand}`}
          />
        )}
      </div>

      {/* 信息卡片区域 */}
      <div className="space-y-6 p-6">
        {/* 景点介绍 */}
        <div className="rounded-xl bg-gradient-to-r from-blue-50 to-indigo-50 p-6 dark:from-gray-800 dark:to-gray-700">
          <div className="mb-6 flex items-center gap-3">
            <div className="rounded-lg bg-blue-500 p-2">
              <Info size={20} className="text-white" />
            </div>
            <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
              景点介绍
            </h2>
          </div>
          <div className="space-y-4">{parseDescription(scenicDescription)}</div>
        </div>

        {/* 信息网格 */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {/* 营业时间 */}
          {openTime && (
            <div className="rounded-xl bg-gradient-to-r from-green-50 to-emerald-50 p-6 dark:from-gray-800 dark:to-gray-700">
              <div className="mb-4 flex items-center gap-3">
                <div className="rounded-lg bg-green-500 p-2">
                  <Clock size={20} className="text-white" />
                </div>
                <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100">
                  营业时间
                </h3>
              </div>
              <div className="space-y-2">
                {openTime.map((time) => (
                  <div
                    key={nanoid()}
                    className="flex items-center gap-2 text-gray-700 dark:text-gray-300"
                  >
                    <div className="h-2 w-2 rounded-full bg-green-500"></div>
                    <span>{time}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 门票信息 */}
          {ticketSpecial && (
            <div className="rounded-xl bg-gradient-to-r from-orange-50 to-amber-50 p-6 dark:from-gray-800 dark:to-gray-700">
              <div className="mb-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="rounded-lg bg-orange-500 p-2">
                    <Ticket size={20} className="text-white" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100">
                    门票信息
                  </h3>
                </div>
                {ticketSpecial.length > 3 && (
                  <button
                    onClick={() => setIsTicketExpanded(!isTicketExpanded)}
                    className="flex items-center gap-1 rounded-lg bg-orange-100 px-3 py-1 text-xs font-medium text-orange-700 transition-colors hover:bg-orange-200 dark:bg-orange-900/30 dark:text-orange-300 dark:hover:bg-orange-900/50"
                  >
                    {isTicketExpanded ? (
                      <>
                        收起 <ChevronUp size={14} />
                      </>
                    ) : (
                      <>
                        展开全部 <ChevronDown size={14} />
                      </>
                    )}
                  </button>
                )}
              </div>
              <div className="space-y-2">
                {(isTicketExpanded
                  ? ticketSpecial
                  : ticketSpecial.slice(0, 3)
                ).map((item) => (
                  <div
                    key={nanoid()}
                    className="flex items-start gap-2 text-gray-700 dark:text-gray-300"
                  >
                    <div className="mt-2 h-2 w-2 flex-shrink-0 rounded-full bg-orange-500"></div>
                    <span className="leading-relaxed">{item}</span>
                  </div>
                ))}
                {!isTicketExpanded && ticketSpecial.length > 3 && (
                  <div className="pt-2 text-center">
                    <span className="text-xs text-gray-500 dark:text-gray-400">
                      还有 {ticketSpecial.length - 3} 条门票信息
                    </span>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* 交通信息 */}
        <div className="rounded-xl bg-gradient-to-r from-purple-50 to-pink-50 p-6 dark:from-gray-800 dark:to-gray-700">
          <div className="mb-4 flex items-center gap-3">
            <div className="rounded-lg bg-purple-500 p-2">
              <Bus size={20} className="text-white" />
            </div>
            <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100">
              交通指南
            </h3>
          </div>
          <div className="mb-4 leading-relaxed text-gray-700 dark:text-gray-300">
            {trafficBus}
          </div>
          <div className="overflow-hidden rounded-lg shadow-lg">
            <div className="h-[400px]">
              <MapSearch gLngLat={glocation} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
