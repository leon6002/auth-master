"use client";

import { useState, useEffect } from "react";
import { ImageResult } from "@/lib/types";

function useSearchImage(query: string) {
  const [images, setImages] = useState<ImageResult[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const searchImages = async () => {
      try {
        setIsLoading(true);
        const response = await fetch("/api/search", {
          method: "POST",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
          body: new URLSearchParams({ query }).toString(), // 传递城市参数
        });

        if (response.ok) {
          const data = await response.json();
          console.log(data);
          setImages(data);
        } else {
          setError("查询图片出错");
        }
      } catch (error) {
        setError("网络请求出错");
      } finally {
        setIsLoading(false);
      }
    };

    searchImages();
  }, [query]);

  return { images, isLoading, error };
}

export default useSearchImage;
