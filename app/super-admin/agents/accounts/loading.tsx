import { Loader2 } from "lucide-react"

export default function Loading() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900">
      <div className="flex flex-col items-center">
        <Loader2 className="h-12 w-12 text-blue-500 animate-spin" />
        <h2 className="mt-4 text-xl font-semibold text-white">加载中...</h2>
        <p className="mt-2 text-gray-400">正在加载代理商账户管理页面</p>
      </div>
    </div>
  )
}
