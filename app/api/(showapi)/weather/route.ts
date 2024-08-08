"use server";
import { NextRequest, NextResponse } from "next/server";
import { Weather15Day } from "./weather-15-day";
import { AreaCode } from "./area-code";
import { getToolCallResult, saveToolCallResult } from "@/actions/chat";
import { WeatherNow } from "./weather-now";
import { formatDateAndCheckDay, getFormattedDate } from "@/lib/utils";
// import { getToolCallResult, saveToolCallResult } from "@/app/actions";

export const POST = async (req: NextRequest): Promise<NextResponse> => {
  try {
    const body = await req.formData();
    const cityName = body.get("cityName") as string; // 获取城市名称
    if (!cityName) {
      throw new Error("cityName is required");
    }

    const toolCallId = body.get("toolCallId") as string;
    if (!toolCallId) {
      throw new Error("toolCallId is required");
    }
    console.log("toolCallId is: ", toolCallId);
    const toolCallResult = await getToolCallResult(toolCallId);
    if (toolCallResult) {
      console.log(`toolCallId: ${toolCallId} hit cache`);
      const res = { data: toolCallResult, status: 200, msg: "success" };
      return NextResponse.json(res);
    }
    const result = await AreaCode(cityName);
    const areaList = result?.list;
    if (!areaList || areaList.length === 0) {
      throw new Error("未找到城市");
    }
    areaList.sort((a, b) => {
      return parseInt(a.areaid) - parseInt(b.areaid);
    });
    const firstArea = areaList.at(0);
    if (firstArea == null) {
      throw new Error("未找到城市");
    }
    // current weather api:
    const currentWeather = await WeatherNow({
      area: firstArea.area,
      areaCode: firstArea.areaCode,
    });
    if (currentWeather === null) {
      throw new Error("showapi get weatherNow failed");
    }

    // 15 day weather forecast api:
    const weather = await Weather15Day({
      area: firstArea.area,
      areaCode: firstArea.areaCode,
      areaid: firstArea.areaid,
      district: firstArea.distric,
      prov: firstArea.prov,
    });

    if (weather === null) {
      throw new Error("showapi get Weather15Day failed");
    }

    weather.cityInfo = currentWeather.cityInfo;
    weather.currentWeather = currentWeather.now;
    weather.currentWeather.date = getFormattedDate(new Date());
    weather.f1 = currentWeather.f1;

    await saveToolCallResult(
      toolCallId,
      "getWeather",
      JSON.stringify({ cityName }),
      JSON.stringify(weather),
    );
    const res = { data: weather, status: 200, msg: "success" };
    return NextResponse.json(res);
  } catch (error: any) {
    console.error("showapi获取天气出错");
    const res = {
      data: {},
      status: 400,
      msg: `获取天气数据出错${error.message}`,
    };
    return NextResponse.json(res);
  }
};
