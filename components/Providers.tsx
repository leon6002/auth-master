"use client";

import { trpc } from "@/app/_trpc/client";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { ThemeProviderProps } from "next-themes/dist/types";
import { absoluteUrl } from "@/lib/utils";
import { SidebarProvider } from "@/lib/hooks/use-sidebar";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { httpBatchLink } from "@trpc/client";
import { PropsWithChildren, useState } from "react";
import { TooltipProvider } from "@/components/ui/tooltip";

const Providers = ({ children, ...props }: ThemeProviderProps) => {
  const [queryClient] = useState(() => new QueryClient());
  const [trpcClient] = useState(() =>
    trpc.createClient({
      links: [
        httpBatchLink({
          url: absoluteUrl("/api/trpc"),
        }),
      ],
    }),
  );

  return (
    <trpc.Provider client={trpcClient} queryClient={queryClient}>
      <QueryClientProvider client={queryClient}>
        <NextThemesProvider {...props}>
          <SidebarProvider>
            <TooltipProvider>{children}</TooltipProvider>
          </SidebarProvider>
        </NextThemesProvider>
      </QueryClientProvider>
    </trpc.Provider>
  );
};

export default Providers;
