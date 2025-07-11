"use client";
import { SendHorizonal } from "lucide-react";
import React from "react";

const VideoBanner = () => {
  return (
    <>
      <div className="min-w-screen relative z-0 h-[95dvh] min-h-[95dvh] w-screen overflow-hidden">
        <video
          className="absolute left-0 top-0 -z-20 h-full w-full scale-110 object-cover"
          poster="/video-bg-placeholder.jpg"
          src={`${process.env.NEXT_PUBLIC_OSS_HOST}/video/airviewbg.mp4`}
          loop={true}
          autoPlay={true}
          playsInline={true}
          muted={true}
        ></video>
        <div className="absolute left-0 top-0 -z-10 h-full w-full bg-black/20"></div>
        <div className="z-0 flex h-full w-full flex-col items-center justify-center">
          <div className="mx-auto mb-12 w-11/12 self-center text-white">
            <h1 className="text-center text-3xl font-bold leading-8 sm:leading-none md:text-6xl">
              下一个远方，从这里启程
            </h1>
            <h2 className="mt-6 text-balance text-center text-lg leading-6 md:mt-10 md:text-2xl md:leading-normal">
              专属定制
              <span className="highlight highlight-wanderboat-primary ml-1.5 after:opacity-45">
                景点
              </span>
              、
              <span className="highlight highlight-wanderboat-primary mr-0-1.5 after:opacity-45">
                美食
              </span>
              和
              <span className="highlight highlight-wanderboat-primary ml-1.5 after:opacity-45">
                活动
              </span>
              。 你的 24/7 旅行伴侣终于来了。
            </h2>
          </div>
          <a
            className="absolute bottom-24 z-10 flex w-4/5 cursor-pointer items-center justify-between self-center justify-self-center rounded-2xl bg-slate-50 p-1.5 md:mx-auto md:mb-10 md:w-[450px]"
            href="/agent"
          >
            <div className="flex-1 overflow-hidden">
              <span className="index-module_type__E-SaG mx-3 inline-block text-base font-medium text-slate-900 md:text-lg">
                点击这里出发～
              </span>
            </div>
            <button
              className="bg-wanderboat-primary group flex h-8 w-8 items-center justify-center rounded-full transition-all duration-300 before:inset-[-1px] before:rounded-full md:h-9 md:w-9 md:hover:bg-slate-900"
              aria-label="jump-to-chat-page"
            >
              <SendHorizonal />
            </button>
          </a>
        </div>
      </div>
    </>
  );
};

export default VideoBanner;
