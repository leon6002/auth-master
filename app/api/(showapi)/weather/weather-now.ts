import { showapi_res, WeatherNowData } from "@/lib/types";

interface Weather15DayProps {
  area: string;
  areaCode: string;
}

export const WeatherNow = async ({ area, areaCode }: Weather15DayProps) => {
  try {
    const accessToken = process.env.SHOWAPI_ACCESS_TOKEN || "";
    const tokenHeader = process.env.SHOWAPI_TOKEN_HEADER || "";
    const apiUrl = `https://116afb0c487e1514113b35f0395f895f.xapi.showapi.com/3-2`;

    const params = new URLSearchParams({
      area,
      areaCode,
      needIndex: "1",
      needAlarm: "1",
    });
    console.log("getWeatherNow started, params is: ", params.toString());
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
    console.log("当前天气数据返回： ", JSON.stringify(data));
    if (data.showapi_res_code !== 0) {
      console.error("showapi get weathernow failed, data is: ");
      console.log(data);
      throw new Error(
        `Error request showapi, request id:${data.showapi_res_code}, error message: ${data.showapi_res_error}.  `,
      );
    }
    const weatherNowData = data.showapi_res_body as WeatherNowData;
    return weatherNowData;
  } catch (error) {
    console.error("showapi get weathernow failed", error);
    return null;
  }
};
