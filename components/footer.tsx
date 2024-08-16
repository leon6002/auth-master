import React from "react";
import { format } from "date-fns";

export function Footer({ className, ...props }: React.ComponentProps<"p">) {
  const currentYear = format(new Date(), "yyyy");
  return (
    <>
      <div className="flex w-full flex-col items-center pt-10">
        <h1 className="mb-4 text-3xl font-bold md:text-5xl">关于我们</h1>
        <p className="w-5/6 text-sm text-slate-900 md:w-5/12 md:text-base">
          我们的目标是打造沉浸式、个性化的AI体验，让它们与用户在现实世界中的活动无缝融合。
        </p>
      </div>
      <div className="mt-4 flex items-center justify-center">
        <span className="text-[10px] text-slate-600 md:text-sm">
          {process.env.NEXT_PUBLIC_RECORD_NUMBER}
        </span>
      </div>
      <div className="mt-4 flex items-center justify-center gap-4 pb-10">
        <div className="text-[10px] md:text-xs">
          © {currentYear} {process.env.NEXT_PUBLIC_COMPANY_NAME}
        </div>
        <a
          className="bottom-link text-[10px] md:text-xs"
          target="_blank"
          href="/terms-of-service"
        >
          Terms of Service
        </a>
        <a
          className="bottom-link text-[10px] md:text-xs"
          target="_blank"
          href="/privacy-policy"
        >
          Privacy Policy
        </a>
      </div>
    </>
  );
}
