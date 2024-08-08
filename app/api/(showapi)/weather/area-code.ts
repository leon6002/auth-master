import { AreaCodeResponseData, showapi_res } from "@/lib/types";
import { NextResponse } from "next/server";

export const AreaCode = async (city: string) => {
  try {
    const accessToken = process.env.SHOWAPI_ACCESS_TOKEN || "";
    const tokenHeader = process.env.SHOWAPI_TOKEN_HEADER || "";
    const apiUrl = `https://116afb0c487e1514113b35f0395f895f.xapi.showapi.com/3-3`;

    const params = new URLSearchParams({
      area: city,
    });
    console.log("area code search started, param is: ", params.toString());
    // 发起 POST 请求
    const response = await fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        [tokenHeader]: accessToken,
      },
      body: params.toString(),
    });

    const data: showapi_res = await response.json();
    console.log("areacode result is: ", JSON.stringify(data));
    if (data.showapi_res_code !== 0) {
      throw new Error(
        `Error request showapi, request id:${data.showapi_res_code}, error message: ${data.showapi_res_error}.  `,
      );
    }
    return data.showapi_res_body as AreaCodeResponseData;
  } catch (error) {
    console.error("showapi获取景点列表出错", error);
    return null;
  }
};
