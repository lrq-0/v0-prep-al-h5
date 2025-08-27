import { Skeleton } from "@/components/ui/skeleton"

export default function PromotionPosterLoading() {
  return (
    <div className="min-h-screen bg-black text-white">
      {/* 顶部导航栏 */}
      <div className="sticky top-0 left-0 right-0 h-14 flex items-center px-4 bg-gray-900/80 backdrop-blur-md border-b border-gray-800 z-10">
        <div className="flex items-center text-gray-300">
          <Skeleton className="h-5 w-5 mr-2 bg-gray-700" />
          <Skeleton className="h-4 w-12 bg-gray-700" />
        </div>
        <div className="flex-1 text-center">
          <Skeleton className="h-5 w-40 mx-auto bg-gray-700" />
        </div>
      </div>

      <div className="p-4 pb-24">
        {/* 海报设置说明 */}
        <div className="p-4 bg-gray-900 border border-gray-800 rounded-lg mb-6">
          <div className="flex items-center mb-2">
            <Skeleton className="h-7 w-40 bg-gray-700" />
          </div>
          <Skeleton className="h-4 w-full bg-gray-700 mb-2" />
          <Skeleton className="h-4 w-4/5 bg-gray-700" />

          {/* 上传新海报 */}
          <div className="p-4 border-2 border-dashed border-gray-700 rounded-lg text-center my-6">
            <Skeleton className="h-8 w-8 bg-gray-700 mx-auto mb-2 rounded-full" />
            <Skeleton className="h-4 w-40 bg-gray-700 mx-auto mb-2" />
            <Skeleton className="h-9 w-28 bg-gray-700 mx-auto rounded-md" />
          </div>

          {/* 骨架加载占位 */}
          {[1, 2].map((i) => (
            <div key={i} className="p-4 bg-gray-800 border border-gray-700 rounded-lg mb-6">
              <div className="flex justify-between items-start mb-4">
                <Skeleton className="h-5 w-32 bg-gray-700" />
                <div className="flex space-x-2">
                  <Skeleton className="h-8 w-8 bg-gray-700 rounded-md" />
                  <Skeleton className="h-8 w-8 bg-gray-700 rounded-md" />
                </div>
              </div>

              <div className="flex gap-6">
                <Skeleton className="h-72 w-40 bg-gray-700 rounded-md" />
                <div className="flex-1 space-y-4">
                  <div className="flex items-center justify-between">
                    <Skeleton className="h-4 w-20 bg-gray-700" />
                    <Skeleton className="h-6 w-12 bg-gray-700 rounded-full" />
                  </div>
                  <Skeleton className="h-10 w-full bg-gray-700 rounded-md" />
                  <Skeleton className="h-10 w-full bg-gray-700 rounded-md" />
                  <Skeleton className="h-20 w-full bg-gray-700 rounded-md" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 底部按钮 */}
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-gray-900/95 backdrop-blur-md border-t border-gray-800">
        <Skeleton className="h-10 w-full bg-gray-700 rounded-md" />
      </div>
    </div>
  )
}
