"use client";
import { StarFilledIcon } from "@radix-ui/react-icons";
import React, { useLayoutEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Button } from "./ui/button";
import Link from "next/link";

const IntroPage = () => {
  const attractionsSideBar = useRef(null);
  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const timeline = gsap.timeline({
      scrollTrigger: {
        trigger: attractionsSideBar.current,
        scrub: true,
        start: "0px bottom",
        end: "+=800px",
      },
    });

    timeline.from(attractionsSideBar.current, {
      transform: `perspective(1200px) translateY(200px)`,
    });
    //   .to(introImage.current, { height: "0px" }, 0);
  }, []);
  return (
    <section className="relative grid h-screen min-h-screen w-screen grid-cols-1 bg-[url('/landing-section/bg-section-1.png')] bg-cover bg-bottom bg-no-repeat md:!grid-cols-2 md:!grid-rows-1">
      <div className="absolute left-0 top-0 h-full w-full bg-white opacity-55"></div>
      <div className="relative z-10 row-span-4 h-full md:order-2">
        <div className="sticky top-2 h-full w-full overflow-hidden">
          <ul
            ref={attractionsSideBar}
            className="perspective-1200 rotate-x-0 flex h-full w-max -translate-y-[800px] flex-row items-center gap-4 md:h-max md:w-full md:flex-col"
          >
            <li>
              <a
                className="group relative z-0 flex h-[219px] w-[370px] max-w-[80vw] shrink-0 flex-col overflow-hidden rounded-2xl border-[0.5px] border-black/20 shadow-[0px_2px_5px_0px_rgba(0,0,0,0.25)]"
                target="_blank"
                href="/"
              >
                <div className="absolute -z-10 h-full w-full transition-all duration-500 group-hover:scale-105">
                  <Image
                    className="absolute inset-0 object-cover"
                    src="/test1.jpeg"
                    alt="attractions"
                    fill={true}
                  />
                </div>
                <div className="mt-auto flex h-[126px] w-full items-center">
                  <div className="flex h-full flex-1 flex-col justify-center px-4 pt-7">
                    <h3 className="text-3xl font-bold text-slate-50">
                      Louvre Museum
                    </h3>
                    <div className="mx-0.5 my-1 flex items-center gap-3">
                      <div className="flex items-center justify-start">
                        <StarFilledIcon className="size-7" />
                        <StarFilledIcon className="size-7" />
                        <StarFilledIcon className="size-7" />
                        <StarFilledIcon className="size-7" />
                        <StarFilledIcon className="size-7" />
                      </div>
                      <p className="font-semibold text-slate-50">
                        4.7 · (95713)
                      </p>
                    </div>
                  </div>
                </div>
              </a>
            </li>
            <li>
              <a
                className="group relative z-0 flex h-[219px] w-[370px] max-w-[80vw] shrink-0 flex-col overflow-hidden rounded-2xl border-[0.5px] border-black/20 shadow-[0px_2px_5px_0px_rgba(0,0,0,0.25)]"
                target="_blank"
                href="/"
              >
                <div className="absolute -z-10 h-full w-full transition-all duration-500 group-hover:scale-105">
                  <Image
                    className="absolute inset-0 object-cover"
                    src="/test1.jpeg"
                    alt="attractions"
                    fill={true}
                  />
                </div>
                <div className="mt-auto flex h-[126px] w-full items-center">
                  <div className="flex h-full flex-1 flex-col justify-center px-4 pt-7">
                    <h3 className="text-3xl font-bold text-slate-50">
                      Louvre Museum
                    </h3>
                    <div className="mx-0.5 my-1 flex items-center gap-3">
                      <div className="flex items-center justify-start">
                        <StarFilledIcon className="size-7" />
                        <StarFilledIcon className="size-7" />
                        <StarFilledIcon className="size-7" />
                        <StarFilledIcon className="size-7" />
                        <StarFilledIcon className="size-7" />
                      </div>
                      <p className="font-semibold text-slate-50">
                        4.7 · (95713)
                      </p>
                    </div>
                  </div>
                </div>
              </a>
            </li>
            <li>
              <a
                className="group relative z-0 flex h-[219px] w-[370px] max-w-[80vw] shrink-0 flex-col overflow-hidden rounded-2xl border-[0.5px] border-black/20 shadow-[0px_2px_5px_0px_rgba(0,0,0,0.25)]"
                target="_blank"
                href="/"
              >
                <div className="absolute -z-10 h-full w-full transition-all duration-500 group-hover:scale-105">
                  <Image
                    className="absolute inset-0 object-cover"
                    src="/test1.jpeg"
                    alt="attractions"
                    fill={true}
                  />
                </div>
                <div className="mt-auto flex h-[126px] w-full items-center">
                  <div className="flex h-full flex-1 flex-col justify-center px-4 pt-7">
                    <h3 className="text-3xl font-bold text-slate-50">
                      Louvre Museum
                    </h3>
                    <div className="mx-0.5 my-1 flex items-center gap-3">
                      <div className="flex items-center justify-start">
                        <StarFilledIcon className="size-7" />
                        <StarFilledIcon className="size-7" />
                        <StarFilledIcon className="size-7" />
                        <StarFilledIcon className="size-7" />
                        <StarFilledIcon className="size-7" />
                      </div>
                      <p className="font-semibold text-slate-50">
                        4.7 · (95713)
                      </p>
                    </div>
                  </div>
                </div>
              </a>
            </li>
            <li>
              <a
                className="group relative z-0 flex h-[219px] w-[370px] max-w-[80vw] shrink-0 flex-col overflow-hidden rounded-2xl border-[0.5px] border-black/20 shadow-[0px_2px_5px_0px_rgba(0,0,0,0.25)]"
                target="_blank"
                href="/"
              >
                <div className="absolute -z-10 h-full w-full transition-all duration-500 group-hover:scale-105">
                  <Image
                    className="absolute inset-0 object-cover"
                    src="/test1.jpeg"
                    alt="attractions"
                    fill={true}
                  />
                </div>
                <div className="mt-auto flex h-[126px] w-full items-center">
                  <div className="flex h-full flex-1 flex-col justify-center px-4 pt-7">
                    <h3 className="text-3xl font-bold text-slate-50">
                      Louvre Museum
                    </h3>
                    <div className="mx-0.5 my-1 flex items-center gap-3">
                      <div className="flex items-center justify-start">
                        <StarFilledIcon className="size-7" />
                        <StarFilledIcon className="size-7" />
                        <StarFilledIcon className="size-7" />
                        <StarFilledIcon className="size-7" />
                        <StarFilledIcon className="size-7" />
                      </div>
                      <p className="font-semibold text-slate-50">
                        4.7 · (95713)
                      </p>
                    </div>
                  </div>
                </div>
              </a>
            </li>
            <li>
              <a
                className="group relative z-0 flex h-[219px] w-[370px] max-w-[80vw] shrink-0 flex-col overflow-hidden rounded-2xl border-[0.5px] border-black/20 shadow-[0px_2px_5px_0px_rgba(0,0,0,0.25)]"
                target="_blank"
                href="/"
              >
                <div className="absolute -z-10 h-full w-full transition-all duration-500 group-hover:scale-105">
                  <Image
                    className="absolute inset-0 object-cover"
                    src="/test1.jpeg"
                    alt="attractions"
                    fill={true}
                  />
                </div>
                <div className="mt-auto flex h-[126px] w-full items-center">
                  <div className="flex h-full flex-1 flex-col justify-center px-4 pt-7">
                    <h3 className="text-3xl font-bold text-slate-50">
                      Louvre Museum
                    </h3>
                    <div className="mx-0.5 my-1 flex items-center gap-3">
                      <div className="flex items-center justify-start">
                        <StarFilledIcon className="size-7" />
                        <StarFilledIcon className="size-7" />
                        <StarFilledIcon className="size-7" />
                        <StarFilledIcon className="size-7" />
                        <StarFilledIcon className="size-7" />
                      </div>
                      <p className="font-semibold text-slate-50">
                        4.7 · (95713)
                      </p>
                    </div>
                  </div>
                </div>
              </a>
            </li>
            <li>
              <a
                className="group relative z-0 flex h-[219px] w-[370px] max-w-[80vw] shrink-0 flex-col overflow-hidden rounded-2xl border-[0.5px] border-black/20 shadow-[0px_2px_5px_0px_rgba(0,0,0,0.25)]"
                target="_blank"
                href="/"
              >
                <div className="absolute -z-10 h-full w-full transition-all duration-500 group-hover:scale-105">
                  <Image
                    className="absolute inset-0 object-cover"
                    src="/test1.jpeg"
                    alt="attractions"
                    fill={true}
                  />
                </div>
                <div className="mt-auto flex h-[126px] w-full items-center">
                  <div className="flex h-full flex-1 flex-col justify-center px-4 pt-7">
                    <h3 className="text-3xl font-bold text-slate-50">
                      Louvre Museum
                    </h3>
                    <div className="mx-0.5 my-1 flex items-center gap-3">
                      <div className="flex items-center justify-start">
                        <StarFilledIcon className="size-7" />
                        <StarFilledIcon className="size-7" />
                        <StarFilledIcon className="size-7" />
                        <StarFilledIcon className="size-7" />
                        <StarFilledIcon className="size-7" />
                      </div>
                      <p className="font-semibold text-slate-50">
                        4.7 · (95713)
                      </p>
                    </div>
                  </div>
                </div>
              </a>
            </li>
            <li>
              <a
                className="group relative z-0 flex h-[219px] w-[370px] max-w-[80vw] shrink-0 flex-col overflow-hidden rounded-2xl border-[0.5px] border-black/20 shadow-[0px_2px_5px_0px_rgba(0,0,0,0.25)]"
                target="_blank"
                href="/"
              >
                <div className="absolute -z-10 h-full w-full transition-all duration-500 group-hover:scale-105">
                  <Image
                    className="absolute inset-0 object-cover"
                    src="/test1.jpeg"
                    alt="attractions"
                    fill={true}
                  />
                </div>
                <div className="mt-auto flex h-[126px] w-full items-center">
                  <div className="flex h-full flex-1 flex-col justify-center px-4 pt-7">
                    <h3 className="text-3xl font-bold text-slate-50">
                      Louvre Museum
                    </h3>
                    <div className="mx-0.5 my-1 flex items-center gap-3">
                      <div className="flex items-center justify-start">
                        <StarFilledIcon className="size-7" />
                        <StarFilledIcon className="size-7" />
                        <StarFilledIcon className="size-7" />
                        <StarFilledIcon className="size-7" />
                        <StarFilledIcon className="size-7" />
                      </div>
                      <p className="font-semibold text-slate-50">
                        4.7 · (95713)
                      </p>
                    </div>
                  </div>
                </div>
              </a>
            </li>
            <li>
              <a
                className="group relative z-0 flex h-[219px] w-[370px] max-w-[80vw] shrink-0 flex-col overflow-hidden rounded-2xl border-[0.5px] border-black/20 shadow-[0px_2px_5px_0px_rgba(0,0,0,0.25)]"
                target="_blank"
                href="/"
              >
                <div className="absolute -z-10 h-full w-full transition-all duration-500 group-hover:scale-105">
                  <Image
                    className="absolute inset-0 object-cover"
                    src="/test1.jpeg"
                    alt="attractions"
                    fill={true}
                  />
                </div>
                <div className="mt-auto flex h-[126px] w-full items-center">
                  <div className="flex h-full flex-1 flex-col justify-center px-4 pt-7">
                    <h3 className="text-3xl font-bold text-slate-50">
                      Louvre Museum
                    </h3>
                    <div className="mx-0.5 my-1 flex items-center gap-3">
                      <div className="flex items-center justify-start">
                        <StarFilledIcon className="size-7" />
                        <StarFilledIcon className="size-7" />
                        <StarFilledIcon className="size-7" />
                        <StarFilledIcon className="size-7" />
                        <StarFilledIcon className="size-7" />
                      </div>
                      <p className="font-semibold text-slate-50">
                        4.7 · (95713)
                      </p>
                    </div>
                  </div>
                </div>
              </a>
            </li>
            <li>
              <a
                className="group relative z-0 flex h-[219px] w-[370px] max-w-[80vw] shrink-0 flex-col overflow-hidden rounded-2xl border-[0.5px] border-black/20 shadow-[0px_2px_5px_0px_rgba(0,0,0,0.25)]"
                target="_blank"
                href="/"
              >
                <div className="absolute -z-10 h-full w-full transition-all duration-500 group-hover:scale-105">
                  <Image
                    className="absolute inset-0 object-cover"
                    src="/test1.jpeg"
                    alt="attractions"
                    fill={true}
                  />
                </div>
                <div className="mt-auto flex h-[126px] w-full items-center">
                  <div className="flex h-full flex-1 flex-col justify-center px-4 pt-7">
                    <h3 className="text-3xl font-bold text-slate-50">
                      Louvre Museum
                    </h3>
                    <div className="mx-0.5 my-1 flex items-center gap-3">
                      <div className="flex items-center justify-start">
                        <StarFilledIcon className="size-7" />
                        <StarFilledIcon className="size-7" />
                        <StarFilledIcon className="size-7" />
                        <StarFilledIcon className="size-7" />
                        <StarFilledIcon className="size-7" />
                      </div>
                      <p className="font-semibold text-slate-50">
                        4.7 · (95713)
                      </p>
                    </div>
                  </div>
                </div>
              </a>
            </li>
            <li>
              <a
                className="group relative z-0 flex h-[219px] w-[370px] max-w-[80vw] shrink-0 flex-col overflow-hidden rounded-2xl border-[0.5px] border-black/20 shadow-[0px_2px_5px_0px_rgba(0,0,0,0.25)]"
                target="_blank"
                href="/"
              >
                <div className="absolute -z-10 h-full w-full transition-all duration-500 group-hover:scale-105">
                  <Image
                    className="absolute inset-0 object-cover"
                    src="/test1.jpeg"
                    alt="attractions"
                    fill={true}
                  />
                </div>
                <div className="mt-auto flex h-[126px] w-full items-center">
                  <div className="flex h-full flex-1 flex-col justify-center px-4 pt-7">
                    <h3 className="text-3xl font-bold text-slate-50">
                      Louvre Museum
                    </h3>
                    <div className="mx-0.5 my-1 flex items-center gap-3">
                      <div className="flex items-center justify-start">
                        <StarFilledIcon className="size-7" />
                        <StarFilledIcon className="size-7" />
                        <StarFilledIcon className="size-7" />
                        <StarFilledIcon className="size-7" />
                        <StarFilledIcon className="size-7" />
                      </div>
                      <p className="font-semibold text-slate-50">
                        4.7 · (95713)
                      </p>
                    </div>
                  </div>
                </div>
              </a>
            </li>
            <li>
              <a
                className="group relative z-0 flex h-[219px] w-[370px] max-w-[80vw] shrink-0 flex-col overflow-hidden rounded-2xl border-[0.5px] border-black/20 shadow-[0px_2px_5px_0px_rgba(0,0,0,0.25)]"
                target="_blank"
                href="/"
              >
                <div className="absolute -z-10 h-full w-full transition-all duration-500 group-hover:scale-105">
                  <Image
                    className="absolute inset-0 object-cover"
                    src="/test1.jpeg"
                    alt="attractions"
                    fill={true}
                  />
                </div>
                <div className="mt-auto flex h-[126px] w-full items-center">
                  <div className="flex h-full flex-1 flex-col justify-center px-4 pt-7">
                    <h3 className="text-3xl font-bold text-slate-50">
                      Louvre Museum
                    </h3>
                    <div className="mx-0.5 my-1 flex items-center gap-3">
                      <div className="flex items-center justify-start">
                        <StarFilledIcon className="size-7" />
                        <StarFilledIcon className="size-7" />
                        <StarFilledIcon className="size-7" />
                        <StarFilledIcon className="size-7" />
                        <StarFilledIcon className="size-7" />
                      </div>
                      <p className="font-semibold text-slate-50">
                        4.7 · (95713)
                      </p>
                    </div>
                  </div>
                </div>
              </a>
            </li>
            <li>
              <a
                className="group relative z-0 flex h-[219px] w-[370px] max-w-[80vw] shrink-0 flex-col overflow-hidden rounded-2xl border-[0.5px] border-black/20 shadow-[0px_2px_5px_0px_rgba(0,0,0,0.25)]"
                target="_blank"
                href="/"
              >
                <div className="absolute -z-10 h-full w-full transition-all duration-500 group-hover:scale-105">
                  <Image
                    className="absolute inset-0 object-cover"
                    src="/test1.jpeg"
                    alt="attractions"
                    fill={true}
                  />
                </div>
                <div className="mt-auto flex h-[126px] w-full items-center">
                  <div className="flex h-full flex-1 flex-col justify-center px-4 pt-7">
                    <h3 className="text-3xl font-bold text-slate-50">
                      Louvre Museum
                    </h3>
                    <div className="mx-0.5 my-1 flex items-center gap-3">
                      <div className="flex items-center justify-start">
                        <StarFilledIcon className="size-7" />
                        <StarFilledIcon className="size-7" />
                        <StarFilledIcon className="size-7" />
                        <StarFilledIcon className="size-7" />
                        <StarFilledIcon className="size-7" />
                      </div>
                      <p className="font-semibold text-slate-50">
                        4.7 · (95713)
                      </p>
                    </div>
                  </div>
                </div>
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="relative z-10 row-span-5 h-full p-2 md:order-1">
        <div className="sticky top-2 flex h-full w-full items-center justify-center overflow-hidden p-2 md:h-[600px]">
          <div className="h-auto w-full p-2 md:p-4">
            <div className="w-full">
              <h1 className="text-3xl font-bold leading-tight md:text-5xl">
                旅行，
              </h1>
              <span className="index-module_type__E-SaG mt-2 inline-block text-3xl font-bold md:text-5xl">
                从一次对话开始。
              </span>
              <h2 className="my-6 text-base font-semibold text-gray-500 md:text-lg">
                旅行规划，从未如此简单！和 AI 聊聊天，你的专属行程瞬间搞定。
                <br />
                告别繁琐攻略，轻松享受完美旅行！
              </h2>
              <div className="flex gap-4">
                <Button asChild>
                  <Link href={"/agent"}>开始对话</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default IntroPage;
