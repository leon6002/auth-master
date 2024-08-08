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
import { cn, formatDateAndCheckDay, isDateBeforeToday } from "@/lib/utils";
import { WeatherSkeleton } from "./weather-skeleton";

interface WeatherProps {
  cityName: string;
  toolCallId: string;
}

export function WeatherNew({
  props: { cityName, toolCallId },
}: {
  props: WeatherProps;
}) {
  const [, setMessages] = useUIState<typeof AI>();
  const { weather, error, isLoading } = useWeather(cityName, toolCallId);
  if (error) {
    console.error(error);
    return <WeatherSkeleton />;
  }
  if (!weather || isLoading) {
    return <WeatherSkeleton />;
  }

  const { area, prov, district, dayList } = weather;
  const formattedDayList = dayList.reduce((acc: any[], day) => {
    if (acc.length >= 10 || isDateBeforeToday(day.daytime)) {
      return acc;
    }
    const { isToday, dayOfWeek, formattedDate, isWeekEnd } =
      formatDateAndCheckDay(day.daytime);
    acc.push({
      ...day,
      dayOfWeek: isToday ? "今天" : dayOfWeek,
      formattedDate,
      isWeekEnd,
    });
    return acc;
  }, []);
  if (area !== cityName) {
  }

  return (
    <div className="size-full overflow-scroll rounded-lg">
      <Card className="bg-img-sunny max-h-[250px] w-auto rounded-md from-sky-200 to-sky-100 bg-cover">
        <div className="from-sky-200 to-sky-100">
          <div className="flex flex-col items-center justify-center">
            <p className="py-2 text-center text-2xl font-semibold text-white [text-shadow:_0_1px_0_rgb(0_0_0_/_40%)]">
              {district === area ? "" : district} {area}
            </p>
            <p className="flex gap-x-1 py-2 text-center text-xs font-light text-muted-foreground">
              <div>
                {prov}省{district}市
              </div>
              <div className="text-center text-xs text-muted-foreground">
                10日天气预报
              </div>
            </p>
          </div>
        </div>

        {/* <Separator className="my-1" /> */}
        <div className="flex">
          <Table className="bg-transparent">
            {/* <TableCaption className="text-center text-muted-foreground text-xs">
            end
          </TableCaption> */}
            <TableHeader>
              <TableRow className="text-center">
                <TableHead className="w-[100px] text-center text-white">
                  时间(日间)
                </TableHead>
                <TableHead className="text-center">天气</TableHead>
                <TableHead className="text-center">最高气温</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {formattedDayList.map((day) => (
                <TableRow
                  key={day.daytime}
                  className={cn(
                    "group relative cursor-pointer bg-gradient-to-l",
                    day.day_weather_code === "00"
                      ? "from-sky-500/50 to-sky-400/50"
                      : day.day_weather_code === "01"
                        ? "from-sky-400/50 to-sky-300/50"
                        : day.day_weather_code === "02"
                          ? "from-sky-200/50 to-sky-100/50"
                          : "from-slate-400/50 to-slate-300/50",
                  )}
                >
                  <TableCell className="text-center text-xs font-light">
                    <div
                      className={cn(
                        "flex h-auto items-center justify-center gap-x-2 font-mono font-semibold text-white",
                        day.isWeekEnd && "text-blue-500",
                      )}
                    >
                      <p>{day.dayOfWeek}</p>
                      <p className="text-[1px] opacity-0 transition-all duration-300 group-hover:text-[10px] group-hover:opacity-100">
                        {day.formattedDate}
                      </p>
                    </div>
                  </TableCell>
                  <TableCell className="flex items-center justify-center">
                    <Image
                      src={day.day_weather_pic}
                      alt="day-weather"
                      width={18}
                      height={18}
                      className="transition-all duration-300 group-hover:scale-125"
                    />
                    <span>{day.day_weather}</span>
                  </TableCell>
                  <TableCell className="px-4 text-center font-sans text-xs font-light">
                    {day.night_air_temperature}℃ ~ {day.day_air_temperature}℃
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <Table className="bg-transparent">
            {/* <TableCaption className="text-center text-muted-foreground text-xs">
            end
          </TableCaption> */}
            <TableHeader>
              <TableRow className="text-center">
                <TableHead className="w-[100px] text-center">
                  时间(夜间)
                </TableHead>
                <TableHead className="text-center">天气</TableHead>
                <TableHead className="text-center">最高气温</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {formattedDayList.map((day) => (
                <TableRow
                  key={day.daytime}
                  className={cn(
                    "group relative cursor-pointer bg-gradient-to-l",
                    day.night_weather_code === "00"
                      ? "from-sky-500 to-sky-400"
                      : day.night_weather_code === "01"
                        ? "from-sky-400 to-sky-300"
                        : day.night_weather_code === "02"
                          ? "from-sky-200 to-sky-100"
                          : "from-slate-400 to-slate-300",
                  )}
                >
                  <TableCell className="text-center text-xs font-light">
                    <div
                      className={cn(
                        "flex h-auto items-center justify-center gap-x-2 font-mono font-semibold text-white",
                        day.isWeekEnd && "text-blue-500",
                      )}
                    >
                      <p>{day.dayOfWeek}</p>
                      <p className="text-[1px] opacity-0 transition-all duration-300 group-hover:text-[10px] group-hover:opacity-100">
                        {day.formattedDate}
                      </p>
                    </div>
                  </TableCell>
                  <TableCell className="flex items-center justify-center">
                    <Image
                      src={day.night_weather_pic}
                      alt="night-weather"
                      width={18}
                      height={18}
                      className="transition-all duration-300 group-hover:scale-125"
                    />
                    <span>{day.night_weather}</span>
                  </TableCell>
                  <TableCell className="px-4 text-center font-sans text-xs font-light">
                    {day.night_air_temperature}℃
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </Card>
    </div>
  );
}
