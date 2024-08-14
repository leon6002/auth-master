"use server";

import { LocationTipRes } from "@/types/api-map-types";
import { NextRequest, NextResponse } from "next/server";


async function getLocationSuggestions(
  keywords: string,
): Promise<LocationTipRes | { error: string }> {
  try {
    const apiUrl = `https://restapi.amap.com/v3/assistant/inputtips`;

    const params = new URLSearchParams({
      key: process.env.GAODE_WEB_API_KEY || "",
      keywords: keywords,
    });

    const fullUrl = `${apiUrl}?${params.toString()}`;

    const response = await fetch(fullUrl, {
      method: "GET",
    });

    const data: LocationTipRes = await response.json();
    if (data.status !== "1") {
      throw new Error(`获取地点建议出错：${JSON.stringify(data)}`);
    }
    return data;
  } catch (error) {
    return { error: `获取地点建议出错：` };
  }
}

export const POST = async (req: NextRequest): Promise<NextResponse> => {
  //todo need auth check here
  try {
    const body = await req.formData();
    const keywords = body.get("keywords") as string;
    console.log(`received location request: ${keywords}`);
    const data = await getLocationSuggestions(keywords);

    if (!data || "error" in data) {
      console.log(JSON.stringify(data))
      return NextResponse.json({ error: "获取地点建议出错" }, { status: 500 });
    } else {
      return NextResponse.json(data);
    }
  } catch (error) {
    return NextResponse.json({ error: `获取地点建议出错：` }, { status: 500 });
  }
};
