"use server";
import { getToolCallResult, saveToolCallResult } from "@/actions/chat";
import { AttractionDetailData } from "@/lib/types";
import { Attraction } from "@/types/api-types";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest): Promise<NextResponse> => {
  //todo need auth check here
  try {
    const body = await req.formData();
    const scenicId = body.get("scenicId") as string; // 获取城市名称
    const toolCallId = body.get("toolCallId") as string;

    console.log(
      `attraction detail toolcall request received: ${toolCallId} - ${scenicId}`,
    );

    const accessToken = process.env.SHOWAPI_ACCESS_TOKEN || "";
    const tokenHeader = process.env.SHOWAPI_TOKEN_HEADER || "";
    const apiUrl = `https://116afb0c487e1514113b35f0395f895f.xapi.showapi.com/12-2`;

    const params = new URLSearchParams({
      scenicId,
    });

    const toolCallResult = await getToolCallResult(toolCallId);
    if (toolCallResult) {
      console.log(`AttractionDetail toolcall hit record: ${toolCallId}`);
      return NextResponse.json(toolCallResult as Attraction[]);
    }
    // 发起 POST 请求
    const response = await fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        [tokenHeader]: accessToken,
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
      "AttractionDetail",
      JSON.stringify({ scenicId }),
      JSON.stringify(data.showapi_res_body),
    );
    return NextResponse.json(data.showapi_res_body as AttractionDetailData[]);
  } catch (error) {
    console.error("showapi获取景点列表出错", error);
    return NextResponse.json({ error: "获取景点列表出错" }, { status: 500 });
  }
};
