import { Skeleton } from "../ui/skeleton";

export const WeatherSkeleton = ({ message }: { message?: string }) => {
  return (
    <div>
      <Skeleton className="flex h-[400px] w-[580px] flex-col items-center justify-center bg-sky-200">
        {message && <p className="text-sm text-muted-foreground">{message}</p>}
      </Skeleton>
    </div>
  );
};
