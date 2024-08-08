"use server";
import { getToolCallResult, saveToolCallResult } from "@/actions/chat";
import { Attraction } from "@/types/api-types";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest): Promise<NextResponse> => {
  //todo need auth check here
  try {
    const body = await req.formData();
    const cityName = body.get("cityName") as string; // 获取城市名称
    const toolCallId = body.get("toolCallId") as string;

    console.log(
      `listAttractions toolcall request received: ${toolCallId} - ${cityName}`,
    );

    const appKey = process.env.SHOWAPI_APP_KEY;
    const apiUrl = `https://route.showapi.com/1681-1?appKey=${appKey}`;

    const params = new URLSearchParams({
      key: cityName,
      page: "",
      pageSize: "",
    });

    const toolCallResult = await getToolCallResult(toolCallId);
    if (toolCallResult) {
      console.log(`listAttractions toolcall hit record: ${toolCallId}`);
      return NextResponse.json(toolCallResult as Attraction[]);
    }

    // 发起 POST 请求
    const response = await fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: params.toString(),
    });

    const data = await response.json();
    console.log(data);

    if (data.showapi_res_code !== 0) {
      throw new Error(data.msg);
    }

    await saveToolCallResult(
      toolCallId,
      "listAttractions",
      JSON.stringify({ cityName }),
      JSON.stringify(data.showapi_res_body),
    );
    return NextResponse.json(data.showapi_res_body as Attraction[]);
  } catch (error) {
    console.error("showapi获取景点列表出错", error);
    return NextResponse.json({ error: "获取景点列表出错" }, { status: 500 });
  }
};
