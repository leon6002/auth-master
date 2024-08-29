"use client";
import { useEffect, useRef } from "react";
import VideoBanner from "@/components/video-banner";
import IntroPage from "@/components/intro-page";
import EndPage from "@/components/end-page";
import { Button } from "@/components/ui/button";
import { ArrowDownCircle } from "lucide-react";
import { Footer } from "@/components/footer";

export default function Home() {
  useEffect(() => {
    (async () => {
      const LocomotiveScroll = (await import("locomotive-scroll")).default;
      const locomotiveScroll = new LocomotiveScroll({
        smooth: true,
        smartphone: {
          smooth: true,
        },
        tablet: {
          smooth: true,
          breakpoint: 1024,
        },
      });
    })();
  }, []);
  const scrollRef = useRef<HTMLDivElement | null>(null);

  const handleButtonClick = () => {
    //todo scroll not working
    if (scrollRef.current) {
      const currentScrollTop = scrollRef.current.scrollTop;
      scrollRef.current.scrollTo({
        top: currentScrollTop + 800,
        behavior: "smooth", // 可选：添加平滑滚动效果
      });
    }
  };

  return (
    <main ref={scrollRef} className="-mt-14 min-h-screen w-screen">
      <VideoBanner />
      <div className="relative w-full">
        <div className="absolute left-0 top-1 z-20 flex w-full justify-center">
          <Button
            variant={"ghost"}
            className="animate-pulse cursor-default"
            onClick={handleButtonClick}
          >
            <ArrowDownCircle className="size-8 animate-pulse" />
          </Button>
        </div>
      </div>
      <IntroPage />
      <EndPage />
      <Footer />
    </main>
  );
}
