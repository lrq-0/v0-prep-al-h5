import { Skeleton } from "@/components/ui/skeleton"

export default function Loading() {
  return (
    <div className="container mx-auto px-4 py-6">
      <div className="flex items-center mb-6">
        <Skeleton className="h-10 w-10 mr-2" />
        <Skeleton className="h-8 w-48" />
      </div>

      <Skeleton className="h-[150px] w-full rounded-lg mb-6" />

      <div className="space-y-4">
        <Skeleton className="h-16 w-full rounded-lg" />
        <Skeleton className="h-[400px] w-full rounded-lg" />
      </div>
    </div>
  )
}
