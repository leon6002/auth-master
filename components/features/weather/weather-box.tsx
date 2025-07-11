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
    <div className="group/weatherbox mx-1 flex h-auto max-w-[50px] cursor-pointer flex-col items-center justify-center gap-y-2 text-nowrap rounded-md bg-sky-300/30 px-1 py-2 text-white hover:bg-sky-300/50">
      <div
        className={cn(
          "flex w-full flex-col text-center text-xs",
          isWeekEnd && "text-green-300/80",
        )}
      >
        <span>{weekday}</span>
        <span>{date}</span>
      </div>
      <div>
        <Image
          src={dayWeatherPic}
          alt="day-weather"
          width={18}
          height={18}
          className="transition-all duration-300 group-hover/weatherbox:scale-125"
        />
      </div>
      <div className="flex flex-col items-stretch justify-center gap-y-2 text-center font-serif text-sm text-white">
        <span
          className={cn(parseInt(hightTemp) >= 30 && "font-bold text-red-600")}
        >
          {hightTemp}°
        </span>
        <span
          className={cn(parseInt(lowTemp) >= 30 && "font-bold text-red-600")}
        >
          {lowTemp}°
        </span>
      </div>
      <div>
        <Image
          src={nightWeatherPic}
          alt="day-weather"
          width={18}
          height={18}
          className="text-white transition-all duration-300 group-hover/weatherbox:scale-125"
        />
      </div>
      <div className="flex flex-col text-center font-mono text-xs font-light">
        <span>{dayWindDirection.replace("持续", "")}</span>
        <span>{dayWindPower}</span>
      </div>
    </div>
  );
};

export default WeatherBox;
