import { Skeleton } from "@/components/ui/skeleton";

export const AttractionSkeleton = ({ message }: { message?: string }) => {
  return (
    <div>
      <Skeleton className="flex h-[330px] w-[590px] flex-col items-start justify-start gap-y-2 rounded-xl p-2 text-center">
        {message && <p>{message}</p>}
      </Skeleton>
      <div className="my-4 flex gap-x-2">
        <Skeleton className="h-[80px] w-[120px]" />
        <Skeleton className="h-[80px] w-[120px]" />
        <Skeleton className="h-[80px] w-[120px]" />
        <Skeleton className="h-[80px] w-[120px]" />
      </div>
      <div className="flex flex-col gap-y-3 pb-10">
        <Skeleton className="h-[28px] w-[100px]" />
        <Skeleton className="h-[28px] w-[180px]" />
        <Skeleton className="h-[28px] w-[120px]" />
        <Skeleton className="h-[28px] w-[200px]" />
      </div>
    </div>
  );
};
