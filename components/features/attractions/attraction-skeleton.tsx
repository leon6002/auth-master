import { Skeleton } from "@/components/ui/skeleton";

export const AttractionSkeleton = ({ message }: { message?: string }) => {
  return (
    <div className="mx-auto w-full max-w-4xl overflow-hidden rounded-2xl bg-white shadow-xl dark:bg-gray-900">
      {/* 头部区域骨架 */}
      <div className="relative bg-gradient-to-r from-blue-600 to-purple-600 p-6 text-white">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="relative z-10">
          <Skeleton className="mb-2 h-8 w-64 bg-white/20" />
          <div className="flex items-center gap-2">
            <Skeleton className="h-4 w-4 bg-white/20" />
            <Skeleton className="h-4 w-48 bg-white/20" />
          </div>
          <Skeleton className="mt-3 h-6 w-32 rounded-full bg-white/20" />
        </div>
        {message && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="rounded-lg bg-white/20 px-4 py-2 backdrop-blur-sm">
              <p className="text-sm font-medium text-white">{message}</p>
            </div>
          </div>
        )}
      </div>

      {/* 图片画廊骨架 */}
      <div className="p-6">
        <Skeleton className="h-64 w-full rounded-lg" />
      </div>

      {/* 信息卡片区域骨架 */}
      <div className="space-y-6 p-6">
        {/* 景点介绍骨架 */}
        <div className="rounded-xl bg-gradient-to-r from-blue-50 to-indigo-50 p-6 dark:from-gray-800 dark:to-gray-700">
          <div className="mb-6 flex items-center gap-3">
            <Skeleton className="h-10 w-10 rounded-lg" />
            <Skeleton className="h-6 w-24" />
          </div>
          <div className="space-y-3">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-5/6" />
            <Skeleton className="h-4 w-4/5" />
            <Skeleton className="h-4 w-3/4" />
          </div>
        </div>

        {/* 信息网格骨架 */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {/* 营业时间骨架 */}
          <div className="rounded-xl bg-gradient-to-r from-green-50 to-emerald-50 p-6 dark:from-gray-800 dark:to-gray-700">
            <div className="mb-4 flex items-center gap-3">
              <Skeleton className="h-10 w-10 rounded-lg" />
              <Skeleton className="h-6 w-20" />
            </div>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Skeleton className="h-2 w-2 rounded-full" />
                <Skeleton className="h-4 w-32" />
              </div>
              <div className="flex items-center gap-2">
                <Skeleton className="h-2 w-2 rounded-full" />
                <Skeleton className="h-4 w-28" />
              </div>
            </div>
          </div>

          {/* 门票信息骨架 */}
          <div className="rounded-xl bg-gradient-to-r from-orange-50 to-amber-50 p-6 dark:from-gray-800 dark:to-gray-700">
            <div className="mb-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Skeleton className="h-10 w-10 rounded-lg" />
                <Skeleton className="h-6 w-20" />
              </div>
              <Skeleton className="h-6 w-16 rounded-lg" />
            </div>
            <div className="space-y-2">
              <div className="flex items-start gap-2">
                <Skeleton className="mt-2 h-2 w-2 rounded-full" />
                <Skeleton className="h-4 w-full" />
              </div>
              <div className="flex items-start gap-2">
                <Skeleton className="mt-2 h-2 w-2 rounded-full" />
                <Skeleton className="h-4 w-4/5" />
              </div>
              <div className="flex items-start gap-2">
                <Skeleton className="mt-2 h-2 w-2 rounded-full" />
                <Skeleton className="h-4 w-3/4" />
              </div>
            </div>
          </div>
        </div>

        {/* 交通信息骨架 */}
        <div className="rounded-xl bg-gradient-to-r from-purple-50 to-pink-50 p-6 dark:from-gray-800 dark:to-gray-700">
          <div className="mb-4 flex items-center gap-3">
            <Skeleton className="h-10 w-10 rounded-lg" />
            <Skeleton className="h-6 w-20" />
          </div>
          <div className="mb-4 space-y-3">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-4/5" />
          </div>
          <Skeleton className="h-[400px] w-full rounded-lg" />
        </div>
      </div>
    </div>
  );
};
