import React from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

interface WeatherBoxProps {
  date: string;
  weekday: string;
  dayWeatherCode: string;
  dayWeatherPic: string;
  nightWeatherCode: string;
  nightWeatherPic: string;
  hightTemp: string;
  lowTemp: string;
  dayWindDirection: string;
  dayWindPower: string;
  isWeekEnd: boolean;
}

const WeatherBox = ({
  date,
  weekday,
  dayWeatherCode,
  dayWeatherPic,
  nightWeatherCode,
  nightWeatherPic,
  hightTemp,
  lowTemp,
  dayWindDirection,
  dayWindPower,
  isWeekEnd,
}: WeatherBoxProps) => {
  return (
    <div className="group/weatherbox flex min-w-[65px] cursor-pointer flex-col items-center justify-center gap-y-2 rounded-lg bg-white/15 p-2 text-white backdrop-blur-sm transition-all duration-200 hover:scale-105 hover:bg-white/25">
      {/* 日期信息 */}
      <div
        className={cn(
          "flex flex-col items-center text-center text-xs font-medium",
          isWeekEnd && "text-emerald-300",
        )}
      >
        <span className="text-white/90">{weekday}</span>
        <span className="text-[10px] text-white/70">{date}</span>
      </div>

      {/* 白天天气图标 */}
      <div className="flex flex-col items-center">
        <Image
          src={dayWeatherPic}
          alt="day-weather"
          width={20}
          height={20}
          className="drop-shadow-sm transition-all duration-300 group-hover/weatherbox:scale-110"
        />
      </div>

      {/* 温度信息 */}
      <div className="flex flex-col items-center text-center">
        <span
          className={cn(
            "text-sm font-semibold",
            parseInt(hightTemp) >= 35
              ? "text-red-300"
              : parseInt(hightTemp) >= 30
                ? "text-orange-300"
                : parseInt(hightTemp) <= 0
                  ? "text-blue-300"
                  : "text-white",
          )}
        >
          {hightTemp}°
        </span>
        <div className="my-1 h-px w-4 bg-white/30"></div>
        <span
          className={cn(
            "text-xs font-medium text-white/80",
            parseInt(lowTemp) <= 0 && "text-blue-300",
          )}
        >
          {lowTemp}°
        </span>
      </div>

      {/* 夜间天气图标 */}
      <div className="flex flex-col items-center">
        <Image
          src={nightWeatherPic}
          alt="night-weather"
          width={16}
          height={16}
          className="opacity-80 drop-shadow-sm transition-all duration-300 group-hover/weatherbox:scale-110"
        />
      </div>

      {/* 风向风力 */}
      <div className="flex flex-col items-center text-center text-[10px] text-white/70">
        <span className="font-medium">
          {dayWindDirection.replace("持续", "")}
        </span>
        <span>{dayWindPower}</span>
      </div>
    </div>
  );
};

export default WeatherBox;
