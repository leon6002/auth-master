"use client";

import { useState, useEffect } from "react";
import { Attraction, AttractionDetailData } from "@/lib/types";

function useAttractionDetail(scenicId: string, toolCallId: string) {
  const [attraction, setAttraction] = useState<AttractionDetailData>();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAttractionDetail = async () => {
      try {
        setIsLoading(true);
        const response = await fetch("/api/attraction", {
          method: "POST",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
          body: new URLSearchParams({ scenicId, toolCallId }).toString(), // 传递城市参数
        });

        if (response.ok) {
          const data = await response.json();
          if (data.ret_code !== 0) {
            throw new Error(data.showapi_res_error);
          }
          console.log(JSON.stringify(data));
          setAttraction(data);
        } else {
          setError("查询景点信息出错");
        }
      } catch (error) {
        setError("网络请求出错");
      } finally {
        setIsLoading(false);
      }
    };

    fetchAttractionDetail();
  }, [scenicId, toolCallId]);

  return { attraction, isLoading, error };
}

export default useAttractionDetail;
