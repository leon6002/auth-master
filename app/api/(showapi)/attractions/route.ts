"use server";
import { Attraction } from "@/types/api-types";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest): Promise<NextResponse> => {
  //todo need auth check here
  try {
    const body = await req.formData();
    const city = body.get("city") as string; // 获取城市名称

    const appKey = process.env.SHOWAPI_APP_KEY;
    const apiUrl = `https://route.showapi.com/1681-1?appKey=${appKey}`;

    const params = new URLSearchParams({
      key: city,
      page: "",
      pageSize: "",
    });

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
    return NextResponse.json(data.showapi_res_body as Attraction[]);
  } catch (error) {
    console.error("showapi获取景点列表出错", error);
    return NextResponse.json({ error: "获取景点列表出错" }, { status: 500 });
  }
};
