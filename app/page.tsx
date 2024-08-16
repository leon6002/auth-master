"use client";
import { useEffect } from "react";
import VideoBanner from "@/components/video-banner";
import IntroPage from "@/components/intro-page";

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

  return (
    <>
      <main className="-mt-14 min-h-screen w-screen">
        <VideoBanner />
        <IntroPage />
        <div className="h-[100vh] w-full"></div>
      </main>
    </>
  );
}
