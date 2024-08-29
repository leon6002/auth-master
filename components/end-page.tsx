"use client";
import React, { useLayoutEffect, useRef } from "react";
import Image from "next/image";
import { Button } from "./ui/button";
import Link from "next/link";
import { Sparkles, StarIcon } from "lucide-react";
import { cn, nanoid } from "@/lib/utils";

const EndPage = () => {
  const ImageList = [
    {
      id: nanoid(),
      src: `/travel/guozigou01.png?format,webp`,
      name: "果子沟",
    },
    {
      id: nanoid(),
      src: `/travel/huoyanshan01.png?format,webp`,
      name: "火焰山",
    },
    {
      id: nanoid(),
      src: `/travel/changpinggou01.png?format,webp`,
      name: "长坪沟",
    },
    {
      id: nanoid(),
      src: `/travel/dali_town01.png?format,webp`,
      name: "大理古城",
    },
    {
      id: nanoid(),
      src: `/travel/luguhu01.png?format,webp`,
      name: "泸沽湖",
    },
    {
      id: nanoid(),
      src: `/travel/zhangjiajie01.jpg?format,webp`,
      name: "张家界",
    },
    {
      id: nanoid(),
      src: `/travel/IMG_7897.jpg?format,webp`,
      name: "七彩丹霞",
    },
    {
      id: nanoid(),
      src: `/travel/nalati01.png?format,webp`,
      name: "那拉提大草原",
    },
    {
      id: nanoid(),
      src: `/travel/IMG_7898.jpg?format,webp`,
      name: "黑独山",
    },
    {
      id: nanoid(),
      src: `/travel/IMG_7914.jpg?format,webp`,
      name: "赛里木湖",
    },
    {
      id: nanoid(),
      src: `/travel/IMG_7920.jpg?format,webp`,
      name: "贡嘎雪山",
    },
    {
      id: nanoid(),
      src: `/travel/lanyuegu01.png?format,webp`,
      name: "蓝月谷",
    },
    {
      id: nanoid(),
      src: `/travel/IMG_7922.jpg?format,webp`,
      name: "喀拉峻草原",
    },
    {
      id: nanoid(),
      src: `/travel/namucuo01.png?format,webp`,
      name: "纳木措",
    },
    {
      id: nanoid(),
      src: `/travel/IMG_7924.jpg?format,webp`,
      name: "禾木",
    },
    {
      id: nanoid(),
      src: `/travel/IMG_7925.jpg?format,webp`,
      name: "青海红河谷",
    },
  ];
  return (
    <div className="w-full bg-slate-50 py-24">
      <h1 className="text-center text-3xl font-bold md:text-5xl">
        无数美景待你去探索！
      </h1>
      <div className="flex justify-center py-12">
        <Button asChild>
          <Link href={"/agent"} className="flex gap-x-2">
            <Sparkles size="sm" />
            <span className="font-semibold">立刻开始吧</span>
          </Link>
        </Button>
      </div>
      <div className="relative bg-transparent">
        <div
          className={cn(
            "relative m-auto inline-flex w-full flex-nowrap gap-x-2 overflow-hidden bg-transparent",
          )}
        >
          <div
            className={cn(
              "animate-infinite-scroll flex items-center justify-center gap-x-2 bg-transparent md:justify-start [&_img]:max-w-none [&_li]:mx-8",
            )}
          >
            {ImageList.map((item) => (
              <div key={item.id} className={cn("w-[340px] bg-transparent p-1")}>
                <Image
                  width={340}
                  height={180}
                  src={process.env.NEXT_PUBLIC_OSS_HOST + item.src}
                  alt={item.name}
                  className="rounded-lg"
                />
                <div className="mt-3 text-center text-xs font-bold">
                  {item.name}
                </div>
              </div>
            ))}
          </div>
          <div
            className={cn(
              "animate-infinite-scroll flex items-center justify-center gap-x-2 bg-transparent md:justify-start [&_img]:max-w-none [&_li]:mx-8",
            )}
          >
            {ImageList.map((item) => (
              <div key={item.id} className={cn("w-[340px] bg-transparent p-1")}>
                <Image
                  width={340}
                  height={180}
                  src={process.env.NEXT_PUBLIC_OSS_HOST + item.src}
                  alt={item.name}
                  className="rounded-lg"
                />
                <div className="mt-3 text-center text-xs font-bold">
                  {item.name}
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="absolute left-0 top-0 h-full w-full bg-transparent shadow-[inset_80px_0_40px,inset_-80px_0_40px] shadow-white"></div>
      </div>
    </div>
  );
};

export default EndPage;
