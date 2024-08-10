"use server";
import { NextRequest, NextResponse } from "next/server";
import { SearchResult } from "@/lib/types";
import { saveApiResponse, SearchCachedApiResponse } from "@/actions/chat";
import { nanoid } from "@/lib/utils";
// import { getToolCallResult, saveToolCallResult } from "@/app/actions";

export const POST = async (req: NextRequest): Promise<NextResponse> => {
  const apiName = "searchImage";

  try {
    const body = await req.formData();
    const query = body.get("query") as string;
    if (!query) {
      throw new Error("query is required");
    }
    const cachedResult = await SearchCachedApiResponse(
      apiName,
      JSON.stringify({ query }),
    );
    if (cachedResult) {
      console.log("search image hit cache, returning cached result");
      return NextResponse.json(cachedResult);
    }
    const apiUrl = `${process.env.DUCK_DUCK_GO_BASE_URL}/searchImages`;
    const params = new URLSearchParams({
      q: query,
      max_results: "6",
    });

    const fullUrl = `${apiUrl}?${params.toString()}`;

    const response = await fetch(fullUrl, {
      method: "GET",
      headers: {
        // GET 请求不需要设置 Content-Type
      },
    });
    const data = (await response.json()) as SearchResult;
    console.log();
    await saveApiResponse(
      nanoid(),
      apiName,
      JSON.stringify({ query }),
      JSON.stringify(data.results),
    );
    return NextResponse.json(data.results);
  } catch (error: any) {
    console.error("duckduckgo查询景点图片失败");
    console.error(error);
    const res = {
      data: {},
      status: 400,
      msg: `查询景点图片失败`,
    };
    return NextResponse.json(res);
  }
};
