'use client';

import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

export default function ProductCardSkeleton() {
  return (
    <Card
      className="bg-white flex h-full flex-col overflow-hidden rounded-2xl border border-neutral-200"
      data-testid="card"
    >
      <div data-testid="skeleton">
        {/* Image Skeleton */}
        <CardHeader className="relative h-48 p-0 sm:h-52 lg:h-56" data-testid="card-header">
          <Skeleton className="h-full w-full rounded-none" />
          {/* Badge Skeleton */}
          <div className="absolute left-3 top-3">
            <Skeleton className="h-6 w-12 rounded-lg" />
          </div>
        </CardHeader>

        {/* Content Skeleton */}
        <CardContent className="flex flex-1 flex-col gap-3 p-4 sm:p-5" data-testid="card-content">
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
            <Skeleton className="h-3 w-3 rounded-full" />
            <Skeleton className="h-3 w-24" />
          </div>

          {/* Actions */}
          <div className="mt-auto flex gap-2 pt-2">
            <Skeleton className="h-10 flex-1 rounded-xl" />
            <Skeleton className="h-10 w-12 rounded-xl" />
          </div>
        </CardContent>
      </div>
    </Card>
  );
}

// Grid of skeleton cards for loading state
export function ProductGridSkeleton({ count = 12 }: { count?: number }) {
  return (
    <div
      className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
      data-testid="product-grid-skeleton"
    >
      {Array.from({ length: count }).map((_, index) => (
        <ProductCardSkeleton key={index} />
      ))}
    </div>
  );
}
