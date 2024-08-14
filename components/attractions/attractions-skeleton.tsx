import { Skeleton } from "../ui/skeleton";

export const AttractionsSkeleton = ({ message }: { message?: string }) => {
  const ids = [1, 2, 3];
  return (
    <div className="flex space-x-3">
      {ids.map((id) => (
        <Skeleton
          key={id}
          className="flex h-[220px] w-[180px] flex-col items-start justify-start gap-y-2 rounded-xl p-2 text-center"
        >
          <Skeleton className="flex h-[80px] w-[160px] flex-col items-center justify-center rounded-md">
            {message && (
              <p className="text-sm text-muted-foreground">{message}</p>
            )}
          </Skeleton>
          <Skeleton className="h-[20px] w-[50px] rounded-md" />
          <Skeleton className="h-[18px] w-[30px] rounded-md" />
          <Skeleton className="h-[16px] w-[120px] rounded-md" />
          <Skeleton className="h-[16px] w-[140px] rounded-md" />
        </Skeleton>
      ))}
    </div>
  );
};
