"use client";

import * as React from "react";

import { useSidebar } from "@/lib/hooks/use-sidebar";
import { cn } from "@/lib/utils";
import { ArrowLeftCircle, ArrowRightCircle } from "lucide-react";

export interface SidebarProps extends React.ComponentProps<"div"> {}

export function Sidebar({ className, children }: SidebarProps) {
  const { isSidebarOpen, isLoading, toggleSidebar } = useSidebar();

  return (
    <div
      data-state={isSidebarOpen && !isLoading ? "open" : "closed"}
      className={cn(
        className,
        "grainy h-full flex-col dark:bg-zinc-950 dark:bg-none",
      )}
    >
      <div className="absolute h-screen w-full">
        <div
          className="absolute -right-8 top-1/2 cursor-pointer text-muted-foreground"
          onClick={toggleSidebar}
        >
          {isSidebarOpen ? (
            <ArrowLeftCircle size={25} />
          ) : (
            <ArrowRightCircle size={25} />
          )}
        </div>
      </div>
      {children}
    </div>
  );
}
