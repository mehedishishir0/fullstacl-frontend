"use client";

import { Skeleton } from "@/components/ui/skeleton";

export default function PostSkeleton() {
  return (
    <div className="dark:bg-[#112032] bg-white rounded-[15px] shadow-sm overflow-hidden animate-pulse">
      {/* Header */}
      <div className="p-6 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Skeleton className="w-12 h-12 rounded-full" />
          <div className="flex flex-col gap-2 w-full">
            <Skeleton className="w-32 h-5 rounded-md" />
            <div className="flex gap-2">
              <Skeleton className="w-20 h-3 rounded-md" />
              <Skeleton className="w-12 h-3 rounded-md" />
            </div>
          </div>
        </div>
        <Skeleton className="w-6 h-6 rounded-md" />
      </div>

      {/* Text */}
      <div className="px-6 pb-4">
        <Skeleton className="w-full h-4 rounded-md mb-2" />
        <Skeleton className="w-full h-4 rounded-md mb-2" />
        <Skeleton className="w-3/4 h-4 rounded-md" />
      </div>

      {/* Image */}
      <div className="px-6 pb-2">
        <Skeleton className="w-full h-64 rounded-[15px]" />
      </div>

      {/* Actions */}
      <div className="px-6 py-4 flex items-center justify-between">
        <Skeleton className="w-16 h-4 rounded-md" />
        <div className="flex gap-4">
          <Skeleton className="w-20 h-4 rounded-md" />
          <Skeleton className="w-16 h-4 rounded-md" />
        </div>
      </div>
    </div>
  );
}