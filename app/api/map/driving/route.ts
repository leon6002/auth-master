"use server";

import { DrivingResponseData } from "@/types/api-map-types";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest): Promise<NextResponse> => {
  //todo need auth check here
  try {
    const body = await req.formData();
    const origin = body.get("origin") as string; // "116.434307,39.90909"
    const destination = body.get("destination") as string; //"116.434446,39.90816",

    const apiUrl = `https://restapi.amap.com/v3/direction/driving`;

    const params = new URLSearchParams({
      key: process.env.GAODE_WEB_API_KEY || "",
      origin: origin,
      destination: destination,
      extensions: "base",
    });

    const fullUrl = `${apiUrl}?${params.toString()}`;

    const response = await fetch(fullUrl, {
      method: "GET",
    });

    const data: DrivingResponseData = await response.json();
    console.log(data);

    if (data.status !== "1") {
      throw new Error(`获取路线规划出错：${JSON.stringify(data)}`);
    }
    return NextResponse.json(data.route);
  } catch (error) {
    return NextResponse.json({ error: `获取路线规划出错` }, { status: 500 });
  }
};
