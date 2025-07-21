import { cn } from "@/lib/utils"

function Skeleton({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("animate-pulse-soft rounded-md bg-neutral-200", className)}
      {...props}
    />
  )
}

export { Skeleton }