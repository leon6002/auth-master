import Navbar from "@/components/Navbar";
import Providers from "@/components/Providers";
import { cn, constructMetadata } from "@/lib/utils";
// import { Inter } from "next/font/google";
import "./globals.css";

import "react-loading-skeleton/dist/skeleton.css";
import "simplebar-react/dist/simplebar.min.css";

import { Toaster } from "@/components/ui/toaster";
import { APILoader } from "@/components/react-amap-api-loader";

// const inter = Inter({ subsets: ["latin"] });

export const metadata = constructMetadata();

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="light">
      <body
        className={cn(
          "grainy h-full min-h-screen bg-zinc-900 font-sans antialiased dark:bg-none",
          // inter.className,
        )}
      >
        <Providers
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          <APILoader version="2.0.5" akey={process.env.GAODE_WEB_JS_KEY}>
            <Toaster />
            <Navbar />
            {children}
          </APILoader>
        </Providers>
      </body>
    </html>
  );
}
