"use client";

import dynamic from "next/dynamic";
import { WeatherSkeleton } from "./weather-skeleton";

export { spinner } from "@/components/spinner";

const Weather = dynamic(() => import("./weather").then((mod) => mod.Weather), {
  ssr: false,
  loading: () => <WeatherSkeleton />,
});

export { Weather };
