import { Skeleton } from "@/components/ui/skeleton"
import { Card } from "@/components/ui/card"

export default function Loading() {
  return (
    <div className="min-h-screen bg-black text-white p-4">
      {/* 顶部导航栏占位 */}
      <div className="h-14 mb-4"></div>

      {/* 搜索框占位 */}
      <div className="mb-4">
        <Skeleton className="h-10 w-full bg-gray-800 mb-3" />
        <Skeleton className="h-10 w-full bg-gray-800 mb-3" />
        <div className="flex items-center gap-3">
          <Skeleton className="h-9 w-full bg-gray-800" />
          <Skeleton className="h-9 w-full bg-gray-800" />
        </div>
      </div>

      {/* 统计信息占位 */}
      <Card className="p-3 bg-gray-900 border-gray-800 mb-4">
        <div className="grid grid-cols-3 gap-2">
          {[...Array(7)].map((_, i) => (
            <div key={i} className="text-center">
              <Skeleton className="h-5 w-16 bg-gray-800 mx-auto mb-1" />
              <Skeleton className="h-3 w-12 bg-gray-800 mx-auto" />
            </div>
          ))}
        </div>
      </Card>

      {/* 标签页和交易列表占位 */}
      <div className="flex">
        <div className="w-1/4 pr-2">
          <Skeleton className="h-40 w-full bg-gray-800 rounded-md" />
        </div>

        <div className="w-3/4 pl-2">
          {/* 交易卡片占位 */}
          {[...Array(5)].map((_, i) => (
            <Card key={i} className="p-3 bg-gray-900 border-gray-800 mb-3">
              <div className="flex flex-col md:flex-row">
                <div className="flex-1 border-b md:border-b-0 md:border-r border-gray-800 pr-0 md:pr-3 pb-3 md:pb-0">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <div className="flex items-center">
                        <Skeleton className="h-4 w-12 bg-gray-800 rounded-full mr-2" />
                        <Skeleton className="h-4 w-24 bg-gray-800" />
                      </div>
                      <Skeleton className="h-3 w-20 bg-gray-800 mt-1" />
                    </div>
                    <Skeleton className="h-5 w-16 bg-gray-800" />
                  </div>

                  <div className="grid grid-cols-2 gap-2 mb-2">
                    <Skeleton className="h-3 w-full bg-gray-800" />
                    <Skeleton className="h-3 w-full bg-gray-800" />
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <Skeleton className="h-3 w-full bg-gray-800" />
                    <Skeleton className="h-3 w-full bg-gray-800" />
                  </div>
                </div>

                <div className="flex-1 pt-3 md:pt-0 md:pl-3">
                  <Skeleton className="h-3 w-full bg-gray-800 mb-2" />
                  <Skeleton className="h-3 w-full bg-gray-800 mb-2" />
                  <Skeleton className="h-3 w-full bg-gray-800 mt-2" />
                  <div className="flex justify-end mt-2">
                    <Skeleton className="h-3 w-20 bg-gray-800" />
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}
