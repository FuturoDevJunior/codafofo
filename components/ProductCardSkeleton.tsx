"use client";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export default function ProductCardSkeleton() {
  return (
    <Card className="overflow-hidden bg-white rounded-2xl border border-neutral-200 flex flex-col h-full">
      {/* Image Skeleton */}
      <CardHeader className="p-0 relative h-48 sm:h-52 lg:h-56">
        <Skeleton className="w-full h-full rounded-none" />
        {/* Badge Skeleton */}
        <div className="absolute top-3 left-3">
          <Skeleton className="w-12 h-6 rounded-lg" />
        </div>
      </CardHeader>

      {/* Content Skeleton */}
      <CardContent className="p-4 sm:p-5 flex flex-col flex-1 gap-3">
        {/* Title and Category */}
        <div className="space-y-2">
          <Skeleton className="h-5 w-3/4" />
          <Skeleton className="h-3 w-1/3" />
        </div>

        {/* Price */}
        <div className="flex items-end gap-2">
          <Skeleton className="h-6 w-20" />
          <Skeleton className="h-4 w-16" />
        </div>

        {/* Availability Info */}
        <div className="flex items-center gap-2">
          <Skeleton className="w-3 h-3 rounded-full" />
          <Skeleton className="h-3 w-24" />
        </div>

        {/* Actions */}
        <div className="mt-auto flex gap-2 pt-2">
          <Skeleton className="flex-1 h-10 rounded-xl" />
          <Skeleton className="w-12 h-10 rounded-xl" />
        </div>
      </CardContent>
    </Card>
  );
}

// Grid of skeleton cards for loading state
export function ProductGridSkeleton({ count = 12 }: { count?: number }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {Array.from({ length: count }).map((_, index) => (
        <ProductCardSkeleton key={index} />
      ))}
    </div>
  );
}