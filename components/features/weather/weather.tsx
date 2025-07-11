"use client";
import { useUIState } from "ai/rsc";
import type { AI } from "@/lib/chat/actions";
import { Card } from "@/components/ui/card";
import useWeather from "@/lib/hooks/use-weather";
import { formatDateAndCheckDay, nanoid } from "@/lib/utils";
import { WeatherSkeleton } from "./weather-skeleton";
import WeatherBox from "./weather-box";
import { ExtendedWeatherDayItem } from "@/lib/types";
import { useRef } from "react";
import {
  ArrowLeft,
  ArrowRight,
  Info,
  MapPin,
  Wind,
  Droplets,
  Eye,
  Thermometer,
  Sun,
  Cloud,
  CloudRain,
} from "lucide-react";
import { Button } from "@/components/ui/button";

interface WeatherProps {
  cityName: string;
  toolCallId: string;
}

// 根据天气状况获取背景渐变
function getWeatherGradient(weather: string, temperature: number) {
  const temp = parseInt(temperature.toString());

  if (weather.includes("晴")) {
    return temp > 25
      ? "from-orange-400 via-yellow-400 to-amber-300"
      : "from-blue-400 via-sky-400 to-cyan-300";
  }
  if (weather.includes("雨")) {
    return "from-gray-600 via-slate-500 to-blue-600";
  }
  if (weather.includes("雪")) {
    return "from-slate-300 via-gray-200 to-blue-200";
  }
  if (weather.includes("云") || weather.includes("阴")) {
    return "from-gray-400 via-slate-400 to-gray-500";
  }
  // 默认渐变
  return "from-blue-400 via-sky-400 to-cyan-300";
}

// 根据天气获取图标
function getWeatherIcon(weather: string) {
  if (weather.includes("晴")) return Sun;
  if (weather.includes("雨")) return CloudRain;
  if (weather.includes("云") || weather.includes("阴")) return Cloud;
  return Sun;
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
    return <WeatherSkeleton message="天气数据加载失败" />;
  }
  if (isLoading) {
    return <WeatherSkeleton message="天气数据加载中..." />;
  }
  if (!weather) return null;
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

  const WeatherIcon = getWeatherIcon(currentWeather.weather);
  const gradientClass = getWeatherGradient(
    currentWeather.weather,
    parseInt(currentWeather.temperature),
  );

  return (
    <div className="group/weather mx-auto w-full max-w-2xl">
      <Card
        className={`relative overflow-hidden bg-gradient-to-br ${gradientClass} border-0 shadow-2xl`}
      >
        {/* 背景装饰 */}
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="absolute right-0 top-0 h-32 w-32 -translate-y-16 translate-x-16 rounded-full bg-white/10"></div>
        <div className="absolute bottom-0 left-0 h-24 w-24 -translate-x-12 translate-y-12 rounded-full bg-white/5"></div>

        <div className="relative z-10 p-4 text-white">
          {/* 头部信息 */}
          <div className="mb-4 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <MapPin size={16} className="text-white/80" />
              <span className="text-sm font-medium text-white/90">
                {cityInfo.c7} {cityInfo.c5}
              </span>
            </div>
            <div className="flex items-center gap-1 text-xs text-white/70">
              <Info size={12} />
              <span>
                {currentWeather.date} {currentWeather.temperature_time}
              </span>
            </div>
          </div>

          {/* 主要天气信息 */}
          <div className="mb-4 flex items-center justify-between">
            <div className="flex-1">
              <h2 className="mb-1 text-xl font-light">{cityInfo.c5}市</h2>
              <div className="flex items-baseline gap-2">
                <span className="text-4xl font-thin">
                  {currentWeather.temperature}
                </span>
                <span className="text-xl font-light">°C</span>
              </div>
              <p className="mt-1 text-base font-medium text-white/90">
                {currentWeather.weather}
              </p>
              <p className="text-sm text-white/80">
                {f1.night_air_temperature}° ~ {f1.day_air_temperature}°
              </p>
            </div>
            <div className="ml-4 flex-shrink-0">
              <WeatherIcon size={60} className="text-white/90 drop-shadow-lg" />
            </div>
          </div>

          {/* 详细信息卡片 */}
          <div className="mb-4 grid grid-cols-3 gap-2">
            <div className="rounded-lg bg-white/15 p-2 text-center backdrop-blur-sm">
              <Wind size={16} className="mx-auto mb-1 text-white/80" />
              <p className="text-xs text-white/70">风向</p>
              <p className="text-xs font-medium">
                {currentWeather.wind_direction.replace("持续", "")}
              </p>
            </div>
            <div className="rounded-lg bg-white/15 p-2 text-center backdrop-blur-sm">
              <Thermometer size={16} className="mx-auto mb-1 text-white/80" />
              <p className="text-xs text-white/70">风力</p>
              <p className="text-xs font-medium">{currentWeather.wind_power}</p>
            </div>
            <div className="rounded-lg bg-white/15 p-2 text-center backdrop-blur-sm">
              <Droplets size={16} className="mx-auto mb-1 text-white/80" />
              <p className="text-xs text-white/70">湿度</p>
              <p className="text-xs font-medium">{currentWeather.sd}</p>
            </div>
          </div>

          {/* 未来天气预报 */}
          <div className="mb-4">
            <h3 className="mb-3 text-base font-medium text-white/90">
              未来天气
            </h3>
            <div className="flex items-center gap-2">
              <Button
                onClick={scrollLeft}
                variant="ghost"
                size="sm"
                className="h-7 w-7 flex-shrink-0 rounded-full border-0 bg-white/10 p-0 text-white hover:bg-white/20"
              >
                <ArrowLeft size={14} />
              </Button>
              <div className="flex-1 overflow-hidden">
                <div
                  ref={scrollRef}
                  className="flex gap-2 transition-transform duration-300 ease-out"
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
                variant="ghost"
                size="sm"
                className="h-7 w-7 flex-shrink-0 rounded-full border-0 bg-white/10 p-0 text-white hover:bg-white/20"
              >
                <ArrowRight size={14} />
              </Button>
            </div>
          </div>

          {/* 旅行建议 */}
          <div className="rounded-lg bg-white/10 p-3 backdrop-blur-sm">
            <div className="mb-2 flex items-center gap-2">
              <Eye size={14} className="text-white/80" />
              <h4 className="text-sm font-medium text-white/90">旅行建议</h4>
            </div>
            <p className="mb-1 text-xs text-white/80">
              <span className="font-medium">{f1.index.travel.title}</span>
            </p>
            <p className="text-xs leading-relaxed text-white/70">
              {f1.index.travel.desc}
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
}
