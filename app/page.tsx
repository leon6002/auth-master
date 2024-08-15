"use client";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import Link from "next/link";
import { ArrowDownCircle, ArrowRight, SendHorizonal } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import Image from "next/image";
import { DEFAULT_AGENT_PATH } from "@/routes";
import { useEffect } from "react";
import VideoBanner from "@/components/video-banner";
import IntroPage from "@/components/intro-page";

export default function Home() {
  useEffect(() => {
    (async () => {
      const LocomotiveScroll = (await import("locomotive-scroll")).default;
      const locomotiveScroll = new LocomotiveScroll();
    })();
  }, []);

  return (
    <main className="-mt-14 min-h-screen w-screen">
      <VideoBanner />
      <IntroPage />
      <div className="h-[100vh] w-full"></div>
    </main>
  );
}
