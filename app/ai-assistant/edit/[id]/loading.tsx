import { Skeleton } from "@/components/ui/skeleton"
import { ArrowLeft } from "lucide-react"

export default function EditAiAssistantLoading() {
  return (
    <div className="min-h-screen bg-black text-white">
      {/* 顶部导航栏 */}
      <div className="sticky top-0 left-0 right-0 h-14 flex items-center px-4 bg-gray-900/80 backdrop-blur-md border-b border-gray-800 z-10">
        <div className="flex items-center text-gray-300">
          <ArrowLeft className="h-5 w-5 mr-2" />
          <span>返回</span>
        </div>
        <h1 className="flex-1 text-center text-lg font-semibold text-white">编辑AI助手</h1>
      </div>

      <div className="p-4 pb-24">
        {/* 标签栏骨架 */}
        <div className="grid grid-cols-4 gap-2 mb-6">
          {Array(4)
            .fill(0)
            .map((_, i) => (
              <Skeleton key={i} className="h-10 bg-gray-800" />
            ))}
        </div>

        {/* 内容骨架 */}
        <div className="space-y-6">
          {/* 头像骨架 */}
          <div className="flex flex-col items-center">
            <Skeleton className="w-24 h-24 rounded-full bg-gray-800 mb-3" />
            <Skeleton className="w-20 h-4 bg-gray-800" />
          </div>

          {/* 表单项骨架 */}
          {Array(5)
            .fill(0)
            .map((_, i) => (
              <div key={i}>
                <Skeleton className="w-24 h-4 bg-gray-800 mb-2" />
                <Skeleton className="w-full h-10 bg-gray-800" />
              </div>
            ))}

          {/* 文本区域骨架 */}
          <div>
            <Skeleton className="w-24 h-4 bg-gray-800 mb-2" />
            <Skeleton className="w-full h-32 bg-gray-800" />
          </div>
        </div>
      </div>

      {/* 底部按钮骨架 */}
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-gray-900/95 backdrop-blur-md border-t border-gray-800">
        <Skeleton className="w-full h-10 bg-gray-800" />
      </div>
    </div>
  )
}
