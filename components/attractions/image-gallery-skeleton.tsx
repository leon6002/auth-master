import React from "react";
import { Skeleton } from "@/components/ui/skeleton";

const ImageGallerySkeleton = ({ message }: { message?: string }) => {
  return (
    <div className="flex flex-col space-y-3">
      <Skeleton className="h-[155px] w-[285px] rounded-xl" />
      <div className="space-y-2">
        {message}
        <Skeleton className="h-4 w-[290px]" />
        <Skeleton className="h-4 w-[250px]" />
      </div>
    </div>
  );
};

export default ImageGallerySkeleton;
