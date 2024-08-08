"use client";

import { useState, useEffect } from "react";
import { Attraction } from "@/lib/types";

function useAttractions(cityName: string, toolCallId: string) {
  const [attractions, setAttractions] = useState<Attraction[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAttractions = async () => {
      try {
        const response = await fetch("/api/attractions", {
          method: "POST",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
          body: new URLSearchParams({ cityName, toolCallId }).toString(), // 传递城市参数
        });

        if (response.ok) {
          const data = await response.json();
          if (data.ret_code !== 0) {
            throw new Error(data.showapi_res_error);
          }
          console.log(data.result);
          setAttractions(data.result);
        } else {
          setError("查询景点信息出错");
        }
      } catch (error) {
        setError("网络请求出错");
      } finally {
        setIsLoading(false);
      }
    };

    fetchAttractions();
  }, [cityName, toolCallId]);

  return { attractions, isLoading, error };
}

export default useAttractions;
