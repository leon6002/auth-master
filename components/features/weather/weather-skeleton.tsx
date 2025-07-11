import { Skeleton } from "@/components/ui/skeleton";
import { Card } from "@/components/ui/card";

export const WeatherSkeleton = ({ message }: { message?: string }) => {
  return (
    <div className="group/weather mx-auto w-full max-w-2xl">
      <Card className="relative overflow-hidden border-0 bg-gradient-to-br from-blue-400 via-sky-400 to-cyan-300 shadow-2xl">
        {/* 背景装饰 */}
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="absolute right-0 top-0 h-32 w-32 -translate-y-16 translate-x-16 rounded-full bg-white/10"></div>
        <div className="absolute bottom-0 left-0 h-24 w-24 -translate-x-12 translate-y-12 rounded-full bg-white/5"></div>

        <div className="relative z-10 p-4 text-white">
          {/* 头部信息骨架 */}
          <div className="mb-4 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Skeleton className="h-4 w-4 bg-white/20" />
              <Skeleton className="h-4 w-24 bg-white/20" />
            </div>
            <div className="flex items-center gap-1">
              <Skeleton className="h-3 w-3 bg-white/20" />
              <Skeleton className="h-3 w-32 bg-white/20" />
            </div>
          </div>

          {/* 主要天气信息骨架 */}
          <div className="mb-4 flex items-center justify-between">
            <div className="flex-1">
              <Skeleton className="mb-1 h-6 w-20 bg-white/20" />
              <div className="flex items-baseline gap-2">
                <Skeleton className="h-12 w-16 bg-white/20" />
                <Skeleton className="h-6 w-8 bg-white/20" />
              </div>
              <Skeleton className="mt-1 h-4 w-16 bg-white/20" />
              <Skeleton className="mt-1 h-3 w-24 bg-white/20" />
            </div>
            <div className="ml-4 flex-shrink-0">
              <Skeleton className="h-15 w-15 rounded-full bg-white/20" />
            </div>
          </div>

          {/* 详细信息卡片骨架 */}
          <div className="mb-4 grid grid-cols-3 gap-2">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="rounded-lg bg-white/15 p-2 text-center backdrop-blur-sm"
              >
                <Skeleton className="mx-auto mb-1 h-4 w-4 bg-white/20" />
                <Skeleton className="mx-auto mb-1 h-3 w-8 bg-white/20" />
                <Skeleton className="mx-auto h-3 w-6 bg-white/20" />
              </div>
            ))}
          </div>

          {/* 未来天气预报骨架 */}
          <div className="mb-4">
            <Skeleton className="mb-3 h-4 w-16 bg-white/20" />
            <div className="flex items-center gap-2">
              <Skeleton className="h-7 w-7 rounded-full bg-white/20" />
              <div className="flex flex-1 gap-2">
                {[1, 2, 3, 4].map((i) => (
                  <div
                    key={i}
                    className="flex min-w-[65px] flex-col items-center gap-y-2 rounded-lg bg-white/15 p-2 backdrop-blur-sm"
                  >
                    <div className="flex flex-col items-center text-center">
                      <Skeleton className="h-3 w-8 bg-white/20" />
                      <Skeleton className="h-2 w-6 bg-white/20" />
                    </div>
                    <Skeleton className="h-5 w-5 bg-white/20" />
                    <div className="flex flex-col items-center">
                      <Skeleton className="h-3 w-6 bg-white/20" />
                      <Skeleton className="my-1 h-px w-4 bg-white/20" />
                      <Skeleton className="h-3 w-6 bg-white/20" />
                    </div>
                    <Skeleton className="h-4 w-4 bg-white/20" />
                    <div className="flex flex-col items-center">
                      <Skeleton className="h-2 w-6 bg-white/20" />
                      <Skeleton className="h-2 w-4 bg-white/20" />
                    </div>
                  </div>
                ))}
              </div>
              <Skeleton className="h-7 w-7 rounded-full bg-white/20" />
            </div>
          </div>

          {/* 旅行建议骨架 */}
          <div className="rounded-lg bg-white/10 p-3 backdrop-blur-sm">
            <div className="mb-2 flex items-center gap-2">
              <Skeleton className="h-3 w-3 bg-white/20" />
              <Skeleton className="h-3 w-16 bg-white/20" />
            </div>
            <Skeleton className="mb-1 h-3 w-20 bg-white/20" />
            <div className="space-y-1">
              <Skeleton className="h-3 w-full bg-white/20" />
              <Skeleton className="h-3 w-4/5 bg-white/20" />
            </div>
          </div>

          {/* 加载消息 */}
          {message && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="rounded-lg bg-white/20 px-4 py-2 backdrop-blur-sm">
                <p className="text-sm font-medium text-white">{message}</p>
              </div>
            </div>
          )}
        </div>
      </Card>
    </div>
  );
};
