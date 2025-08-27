import { ArrowLeft } from "lucide-react"
import Link from "next/link"
import { Skeleton } from "@/components/ui/skeleton"
import { Card } from "@/components/ui/card"

export default function AdminsLoading() {
  return (
    <div className="min-h-screen bg-gray-100">
      {/* 顶部导航栏 */}
      <div className="sticky top-0 left-0 right-0 h-14 flex items-center px-4 bg-white shadow-sm z-10">
        <Link href="/management" className="flex items-center text-gray-700">
          <ArrowLeft className="h-5 w-5 mr-2" />
          <span>返回</span>
        </Link>
        <h1 className="flex-1 text-center text-lg font-semibold text-gray-900">管理员设定</h1>
      </div>

      <div className="p-4 pb-16">
        {/* 功能说明骨架 */}
        <Card className="p-4 mb-6">
          <div className="flex">
            <Skeleton className="h-5 w-5 mr-2 flex-shrink-0" />
            <div className="w-full">
              <Skeleton className="h-5 w-40 mb-2" />
              <Skeleton className="h-4 w-full mb-2" />
              <Skeleton className="h-4 w-full" />
            </div>
          </div>
        </Card>

        {/* 搜索和添加骨架 */}
        <div className="flex flex-col sm:flex-row gap-3 mb-4">
          <Skeleton className="h-10 w-full" />
          <Skeleton className="h-10 w-40" />
        </div>

        {/* 标签页骨架 */}
        <Skeleton className="h-10 w-full mb-6" />

        {/* 权限图示骨架 */}
        <Card className="mb-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4">
            <div className="flex">
              <Skeleton className="w-9 h-9 rounded-lg mr-3" />
              <div className="w-full">
                <Skeleton className="h-5 w-32 mb-2" />
                <Skeleton className="h-4 w-full mb-2" />
                <Skeleton className="h-4 w-full" />
              </div>
            </div>
            <div className="flex">
              <Skeleton className="w-9 h-9 rounded-lg mr-3" />
              <div className="w-full">
                <Skeleton className="h-5 w-32 mb-2" />
                <Skeleton className="h-4 w-full mb-2" />
                <Skeleton className="h-4 w-full" />
              </div>
            </div>
          </div>
        </Card>

        {/* 管理员列表骨架 */}
        <Card>
          <div className="p-4">
            <Skeleton className="h-10 w-full mb-4" />
            {[...Array(4)].map((_, i) => (
              <div key={i} className="py-4 border-b last:border-0">
                <Skeleton className="h-5 w-40 mb-2" />
                <div className="flex justify-between">
                  <Skeleton className="h-4 w-24" />
                  <Skeleton className="h-4 w-20" />
                  <Skeleton className="h-4 w-16" />
                  <Skeleton className="h-4 w-32" />
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  )
}
