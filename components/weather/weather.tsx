"use client";

import { useActions, useUIState } from "ai/rsc";

import type { AI } from "@/lib/chat/actions";
import Image from "next/image";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import useWeather from "@/lib/hooks/use-weather";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  cn,
  formatDateAndCheckDay,
  isDateBeforeToday,
  nanoid,
} from "@/lib/utils";
import { WeatherSkeleton } from "./weather-skeleton";
import WeatherBox from "./weather-box";
import { ExtendedWeatherDayItem, WeatherDayItem } from "@/lib/types";
import { useRef } from "react";
import { ArrowLeft, ArrowRight, Info } from "lucide-react";
import { Button } from "../ui/button";
import { WeatherSkeletonError } from "./weather-skeleton-error";

interface WeatherProps {
  cityName: string;
  toolCallId: string;
}

export function Weather({
  props: { cityName, toolCallId },
}: {
  props: WeatherProps;
}) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [, setMessages] = useUIState<typeof AI>();
  const { weather, error, isLoading } = useWeather(cityName, toolCallId);
  if (error) {
    console.error(error);
    return <WeatherSkeletonError />;
  }
  if (isLoading || !weather) {
    return <WeatherSkeleton />;
  }
  function getTranslateX(element: any) {
    const style = window.getComputedStyle(element);
    const matrix = new DOMMatrixReadOnly(style.transform);
    return matrix.m41; // m41代表translateX
  }

  const scrollRight = () => {
    if (scrollRef.current) {
      const currentTranslateX = getTranslateX(scrollRef.current);
      const newPosition = Math.max(-300, currentTranslateX - 140);
      scrollRef.current.style.transform = `translateX(${newPosition}px)`;
    }
  };

  const scrollLeft = () => {
    if (scrollRef.current) {
      const currentTranslateX = getTranslateX(scrollRef.current);
      const newPosition = Math.min(0, currentTranslateX + 140);
      scrollRef.current.style.transform = `translateX(${newPosition}px)`;
    }
  };

  const { cityInfo, dayList, currentWeather, f1 } = weather;
  const formattedDayList = dayList.reduce(
    (acc: ExtendedWeatherDayItem[], day) => {
      // if (isDateBeforeToday(day.daytime)) {
      //   return acc;
      // }
      const { isToday, dayOfWeek, formattedDate, isWeekEnd, isYesterday } =
        formatDateAndCheckDay(day.daytime);
      acc.push({
        ...day,
        dayOfWeek: isYesterday ? "昨天" : isToday ? "今天" : dayOfWeek,
        formattedDate,
        isWeekEnd,
        isYesterday,
      });
      return acc;
    },
    [],
  );

  return (
    <div className="group/weather size-full overflow-scroll rounded-lg">
      <Card className="bg-img-sunny max-h-[650px] w-[640px] rounded-md from-sky-200 to-sky-100 bg-cover">
        <div className="flex w-full flex-col items-center justify-center p-2">
          <div className="my-2 h-auto w-full text-xs text-white">
            <div className="flex items-center justify-between p-2">
              <p>
                {cityInfo.c7} {cityInfo.c5}
              </p>
              <div className="flex items-center justify-center gap-x-2 px-2 text-muted">
                <Info size={12} />
                <span>
                  截止{currentWeather.date} {currentWeather.temperature_time}
                  数据
                </span>
              </div>
            </div>
            <div className="flex flex-col items-center justify-center">
              <div className="flex w-auto flex-col items-center justify-center">
                <p className="flex flex-col items-start justify-center pl-[14px]">
                  <span className="text-xl"> {cityInfo.c5}市</span>
                  <span className="text-5xl">
                    {currentWeather.temperature}°
                  </span>
                </p>

                <div className="flex w-full flex-col items-center justify-center gap-y-2 pb-5 pt-2">
                  <p className="text-base font-normal">
                    {f1.night_air_temperature}° ~ {f1.day_air_temperature}°
                  </p>
                  <p className="text-lg font-semibold">
                    {currentWeather.weather}
                  </p>

                  {/* <p>{currentWeather.wind_direction}</p>
                  <p>{currentWeather.wind_power}</p> */}

                  {/* <p>{currentWeather.sd}</p> */}
                  {/* <p>降雨概率：{currentWeather.rain}</p> */}
                </div>
              </div>
            </div>

            <div></div>
          </div>

          <div className="flex w-full items-center justify-center gap-x-2">
            <Button
              onClick={scrollLeft}
              variant={"ghost"}
              className="rounded-full"
            >
              <ArrowLeft size={20} className="text-white" />
            </Button>
            <div className="items-stretchb flex max-w-[80%] overflow-hidden">
              <div
                ref={scrollRef}
                className="flex translate-x-0 transition-all duration-500 ease-in-out"
              >
                {formattedDayList.map((day: ExtendedWeatherDayItem) => (
                  <WeatherBox
                    key={nanoid()}
                    date={day.formattedDate}
                    weekday={day.dayOfWeek}
                    dayWeatherCode={day.day_weather_code}
                    dayWeatherPic={day.day_weather_pic}
                    nightWeatherPic={day.night_weather_pic}
                    nightWeatherCode={day.night_weather_code}
                    hightTemp={day.day_air_temperature}
                    lowTemp={day.night_air_temperature}
                    dayWindDirection={day.day_wind_direction}
                    dayWindPower={day.day_wind_power}
                    isWeekEnd={day.isWeekEnd}
                  />
                ))}
              </div>
            </div>
            <Button
              onClick={scrollRight}
              variant={"ghost"}
              className="rounded-full"
            >
              <ArrowRight size={20} className="text-white" />
            </Button>
          </div>

          <div className="mx-auto h-[140px] max-w-[80%] px-2 py-5 text-sm text-muted">
            <p>旅行：{f1.index.travel.title}</p>
            <p>建议：{f1.index.travel.desc}</p>
          </div>
        </div>
      </Card>
    </div>
  );
}
