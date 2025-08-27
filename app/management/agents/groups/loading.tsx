import { Skeleton } from "@/components/ui/skeleton"

export default function Loading() {
  return (
    <div className="bg-gray-900 text-white min-h-screen p-6">
      <Skeleton className="h-8 w-64 mb-6 bg-gray-800" />

      <div className="flex justify-between items-center mb-6">
        <Skeleton className="h-10 w-64 bg-gray-800" />
        <Skeleton className="h-10 w-40 bg-gray-800" />
      </div>

      <div className="bg-gray-800 rounded-lg overflow-hidden shadow-xl p-4">
        <div className="space-y-4">
          <div className="flex items-center justify-between border-b border-gray-700 pb-4">
            <Skeleton className="h-6 w-16 bg-gray-700" />
            <Skeleton className="h-6 w-32 bg-gray-700" />
            <Skeleton className="h-6 w-48 bg-gray-700" />
            <Skeleton className="h-6 w-24 bg-gray-700" />
            <Skeleton className="h-6 w-24 bg-gray-700" />
            <Skeleton className="h-6 w-20 bg-gray-700" />
          </div>

          {Array(5)
            .fill(0)
            .map((_, i) => (
              <div key={i} className="flex items-center justify-between border-b border-gray-700 py-4">
                <Skeleton className="h-6 w-8 bg-gray-700" />
                <Skeleton className="h-6 w-28 bg-gray-700" />
                <Skeleton className="h-6 w-40 bg-gray-700" />
                <Skeleton className="h-6 w-16 bg-gray-700" />
                <Skeleton className="h-6 w-20 bg-gray-700" />
                <div className="flex space-x-2">
                  <Skeleton className="h-8 w-8 rounded-md bg-gray-700" />
                  <Skeleton className="h-8 w-8 rounded-md bg-gray-700" />
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  )
}
