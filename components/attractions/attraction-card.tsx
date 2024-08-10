/**
 * v0 by Vercel.
 * @see https://v0.dev/t/sdJLloHuD9l
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */

"use client";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { nanoid } from "@/lib/utils";
import Image from "next/image";

import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import useSearchImage from "@/lib/hooks/use-search-image";
import { ImageGallery } from "./image-gallery";
import ImageGallerySkeleton from "./image-gallery-skeleton";
import { useEffect } from "react";

interface AttractionCardProps {
  cityName: string;
  scenicName: string;
  scenicAddress: string;
  openTime?: string[];
  ticketSpecial?: string[];
  scenicDescription: string;
  trafficBus: string;
  defaultPic: string;
  glocation: number[];
  blocation: number[];
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
  blocation,
}: AttractionCardProps) {
  const { images, isLoading, error } = useSearchImage(
    `${cityName}${scenicName}`,
  );
  if (isLoading) return <ImageGallerySkeleton />;

  return (
    <Card className="w-full max-w-2xl">
      <CardHeader>
        <CardTitle>{scenicName}</CardTitle>
        <CardDescription>{scenicAddress}</CardDescription>
      </CardHeader>
      <CardContent className="grid gap-6">
        <div className="grid gap-4">
          {isLoading && (
            <ImageGallerySkeleton message="努力查询景点图片中..." />
          )}
          {error && <ImageGallerySkeleton message="查询图片相关景点失败..." />}
          {images.length > 0 && (
            <ImageGallery
              images={images}
              title={`${cityName} ${scenicName}`}
              subtitle={`${scenicAddress}`}
            />
          )}
        </div>

        <section className="mx-auto w-full max-w-3xl py-2 md:py-6">
          <div className="space-y-6">
            {/* <h2 className="text-center text-3xl font-bold tracking-tighter md:text-4xl">
              Frequently Asked Questions
            </h2> */}
            <Accordion type="single" collapsible>
              <AccordionItem value="faq-1">
                <AccordionTrigger className="flex w-full items-center justify-between rounded-lg bg-white px-4 py-3 text-left shadow-sm hover:bg-gray-100 focus:outline-none focus-visible:ring focus-visible:ring-gray-300 dark:bg-gray-950 dark:text-gray-50 dark:hover:bg-gray-800 dark:focus-visible:ring-gray-700">
                  <span className="text-base font-medium">景点介绍</span>
                  {/* <ChevronDownIcon className="h-5 w-5 transition-transform duration-300 [&[data-state=open]]:rotate-180" /> */}
                </AccordionTrigger>
                <AccordionContent className="px-4 py-3 text-gray-500 dark:text-gray-400">
                  <div className="prose overflow-hidden pl-4">
                    {scenicDescription}
                  </div>
                </AccordionContent>
              </AccordionItem>
              {openTime && (
                <AccordionItem value="faq-2">
                  <AccordionTrigger className="flex w-full items-center justify-between rounded-lg bg-white px-4 py-3 text-left shadow-sm hover:bg-gray-100 focus:outline-none focus-visible:ring focus-visible:ring-gray-300 dark:bg-gray-950 dark:text-gray-50 dark:hover:bg-gray-800 dark:focus-visible:ring-gray-700">
                    <span className="text-base font-medium">查看营业时间</span>
                  </AccordionTrigger>
                  <AccordionContent className="px-4 py-3 text-gray-500 dark:text-gray-400">
                    <div className="grid gap-2 pl-5">
                      <div className="text-sm font-light">
                        {openTime.map((time) => (
                          <p key={nanoid()}>{time}</p>
                        ))}
                      </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              )}
              {ticketSpecial && (
                <AccordionItem value="faq-3">
                  <AccordionTrigger className="flex w-full items-center justify-between rounded-lg bg-white px-4 py-3 text-left shadow-sm hover:bg-gray-100 focus:outline-none focus-visible:ring focus-visible:ring-gray-300 dark:bg-gray-950 dark:text-gray-50 dark:hover:bg-gray-800 dark:focus-visible:ring-gray-700">
                    <span className="text-base font-medium">门票信息</span>
                  </AccordionTrigger>
                  <AccordionContent className="px-4 py-3 text-gray-500 dark:text-gray-400">
                    <div className="pl-4">
                      {ticketSpecial.map((item) => (
                        <>
                          <span className="text-sm font-medium">{item}</span>
                          <br />
                        </>
                      ))}
                    </div>
                  </AccordionContent>
                </AccordionItem>
              )}

              <AccordionItem value="faq-4">
                <AccordionTrigger className="flex w-full items-center justify-between rounded-lg bg-white px-4 py-3 text-left shadow-sm hover:bg-gray-100 focus:outline-none focus-visible:ring focus-visible:ring-gray-300 dark:bg-gray-950 dark:text-gray-50 dark:hover:bg-gray-800 dark:focus-visible:ring-gray-700">
                  <span className="text-base font-medium">景区交通</span>
                </AccordionTrigger>
                <AccordionContent className="px-4 py-3 text-gray-500 dark:text-gray-400">
                  <div className="grid gap-4 md:grid-cols-2"></div>
                  <div className="grid gap-2 pl-4">
                    <div>{trafficBus}</div>
                  </div>
                  <div className="grid gap-2 pl-4">
                    <div className="text-sm font-bold">地图：</div>
                    <div>
                      <Image
                        src={defaultPic}
                        alt="Yosemite National Park Map"
                        className="w-full rounded-lg"
                        width="400"
                        height="300"
                        style={{ aspectRatio: "400/300", objectFit: "cover" }}
                      />
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </section>
      </CardContent>
    </Card>
  );
}
