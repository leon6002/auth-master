"use client";

import { useActions, useUIState } from "ai/rsc";

import type { AI } from "@/lib/chat/actions";

import useAttractionDetail from "@/lib/hooks/use-attraction-detail";
import { AttractionSkeleton } from "./attraction-skeleton";
import AttractionCard from "./attraction-card";

export function Attraction({
  props: { scenicId, toolCallId, model },
}: {
  props: { scenicId: string; toolCallId: string; model: string };
}) {
  const [, setMessages] = useUIState<typeof AI>();
  const { submitUserMessage } = useActions();
  console.log("components/attractions/attractions.tsx:19 start useAttractions");
  const { attraction, isLoading, error } = useAttractionDetail(
    scenicId,
    toolCallId,
  );
  if (isLoading || error || !attraction) {
    return <AttractionSkeleton error={error} />;
  }
  const glocaiton = attraction.glocation.split(",").map((x) => parseFloat(x));
  const blocaiton = attraction.blocation.split(",").map((x) => parseFloat(x));

  const bookNotice = attraction.bookNotice as BookNoticeItem[];
  const formattedNotice = extractAndFormatBookNotice(bookNotice);

  return (
    <AttractionCard
      cityName={attraction.cityName}
      scenicName={attraction.scenicName}
      scenicAddress={attraction.scenicAddress}
      openTime={formattedNotice?.openTime || undefined}
      ticketSpecial={formattedNotice?.specialPeople || undefined}
      scenicDescription={attraction.scenicDescription}
      trafficBus={attraction.trafficBus}
      defaultPic={attraction.defaultPic}
      glocation={glocaiton}
      blocation={blocaiton}
    />
  );
}

interface BookNoticeItem {
  name: string;
  value: string;
  key: string;
}

function extractAndFormatBookNotice(bookNotice: BookNoticeItem[]) {
  const openTimeItem = bookNotice.find((item) => item.key === "openTime");
  const specialPeopleItem = bookNotice.find(
    (item) => item.key === "specialPeople",
  );

  if (!openTimeItem || !specialPeopleItem) {
    return null;
  }

  const formattedOpenTime = formatOpenTime(openTimeItem.value);
  const formattedSpecialPeople = formatSpecialPeople(specialPeopleItem.value);

  return {
    openTime: formattedOpenTime,
    specialPeople: formattedSpecialPeople,
  };
}

function formatOpenTime(openTimeStr: string) {
  const timeRanges = openTimeStr.split(";");
  return timeRanges.map((range) => {
    const [dateRange, timeRange] = range.split(" ");
    return `${dateRange} ${timeRange}开放`;
  });
}

function formatSpecialPeople(specialPeopleStr: string) {
  return specialPeopleStr.split("\n").filter((line) => line.trim() !== "");
}

// 示例用法
