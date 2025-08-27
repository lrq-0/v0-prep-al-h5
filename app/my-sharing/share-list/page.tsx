"use client"

import { useState } from "react"
import { ArrowLeft, Search, Filter, Copy } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { useToast } from "@/components/ui/use-toast"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { DateRangePicker } from "@/components/date-range-picker"

export default function ShareList() {
  const { toast } = useToast()
  const [searchType, setSearchType] = useState("date")

  // 模拟分享列表数据
  const sharedUsers = [
    {
      id: 1,
      userId: "U10086428",
      name: "李小明",
      avatar: "/images/user-avatar.png",
      registerDate: "2025-04-15",
      memberLevel: "普通会员",
      totalSpent: 299,
    },
    {
      id: 2,
      userId: "U10012345",
      name: "王小红",
      avatar: "/images/user-avatar.png",
      registerDate: "2025-04-12",
      memberLevel: "高级会员",
      totalSpent: 899,
    },
    {
      id: 3,
      userId: "U10056789",
      name: "张小华",
      avatar: "/images/user-avatar.png",
      registerDate: "2025-04-10",
      memberLevel: "VIP会员",
      totalSpent: 1299,
    },
    {
      id: 4,
      userId: "U10090123",
      name: "刘小军",
      avatar: "/images/user-avatar.png",
      registerDate: "2025-04-08",
      memberLevel: "普通会员",
      totalSpent: 199,
    },
    {
      id: 5,
      userId: "U10045678",
      name: "赵小燕",
      avatar: "/images/user-avatar.png",
      registerDate: "2025-04-05",
      memberLevel: "高级会员",
      totalSpent: 699,
    },
    {
      id: 6,
      userId: "U10023456",
      name: "孙小梅",
      avatar: "/images/user-avatar.png",
      registerDate: "2025-04-01",
      memberLevel: "普通会员",
      totalSpent: 99,
    },
    {
      id: 7,
      userId: "U10078901",
      name: "周小伟",
      avatar: "/images/user-avatar.png",
      registerDate: "2025-03-28",
      memberLevel: "VIP会员",
      totalSpent: 1599,
    },
    {
      id: 8,
      userId: "U10034567",
      name: "吴小芳",
      avatar: "/images/user-avatar.png",
      registerDate: "2025-03-25",
      memberLevel: "普通会员",
      totalSpent: 299,
    },
  ]

  // 获取会员等级样式
  const getMemberLevelStyle = (level) => {
    switch (level) {
      case "VIP会员":
        return "bg-amber-900/30 text-amber-400 border border-amber-500/30"
      case "高级会员":
        return "bg-blue-900/30 text-blue-400 border border-blue-500/30"
      default:
        return "bg-gray-800 text-gray-400 border border-gray-700"
    }
  }

  // 复制ID到剪贴板
  const copyToClipboard = (id) => {
    navigator.clipboard.writeText(id)
    toast({
      description: "ID已复制到剪贴板",
      duration: 2000,
    })
  }

  return (
    <div className="min-h-screen bg-black text-white">
      {/* 顶部导航栏 */}
      <div className="sticky top-0 left-0 right-0 h-14 flex items-center px-4 bg-gray-900/80 backdrop-blur-md border-b border-gray-800 z-10">
        <Link href="/my-sharing" className="flex items-center text-gray-300">
          <ArrowLeft className="h-5 w-5 mr-2" />
          <span>返回</span>
        </Link>
        <h1 className="flex-1 text-center text-lg font-semibold text-white">分享列表</h1>
      </div>

      <div className="p-4 pb-16">
        {/* 搜索和筛选 */}
        <div className="mb-4">
          <Select value={searchType} onValueChange={setSearchType}>
            <SelectTrigger className="w-full bg-gray-900 border-gray-700 text-white mb-3">
              <SelectValue placeholder="搜索方式" />
            </SelectTrigger>
            <SelectContent className="bg-gray-900 border-gray-700 text-white">
              <SelectItem value="date">按注册时间搜索</SelectItem>
              <SelectItem value="userId">按用户ID搜索</SelectItem>
            </SelectContent>
          </Select>

          {searchType === "date" ? (
            <div className="mb-3">
              <DateRangePicker />
            </div>
          ) : (
            <div className="relative mb-3">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 h-4 w-4" />
              <Input
                placeholder="输入用户ID码..."
                className="pl-9 bg-gray-900 border-gray-700 text-white placeholder:text-gray-500 focus-visible:ring-blue-500"
              />
            </div>
          )}

          <div className="flex items-center gap-3">
            <Button variant="outline" size="sm" className="border-gray-700 w-full">
              <Filter className="h-4 w-4 mr-2 text-gray-400" />
              筛选
            </Button>
            <Button size="sm" className="bg-blue-600 hover:bg-blue-700 w-full">
              搜索
            </Button>
          </div>
        </div>

        {/* 统计信息 */}
        <Card className="p-3 bg-gray-900 border-gray-800 mb-4">
          <div className="grid grid-cols-3 gap-3">
            <div className="text-center">
              <div className="text-lg font-bold text-white">{sharedUsers.length}</div>
              <div className="text-xs text-gray-400">总用户数</div>
            </div>
            <div className="text-center">
              <div className="text-lg font-bold text-white">
                {sharedUsers.filter((user) => user.memberLevel !== "普通会员").length}
              </div>
              <div className="text-xs text-gray-400">付费用户</div>
            </div>
            <div className="text-center">
              <div className="text-lg font-bold text-blue-400">
                ¥{sharedUsers.reduce((sum, user) => sum + user.totalSpent, 0).toFixed(2)}
              </div>
              <div className="text-xs text-gray-400">总消费</div>
            </div>
          </div>
        </Card>

        {/* 用户列表 */}
        <div className="space-y-3">
          {sharedUsers.map((user) => (
            <Card key={user.id} className="p-3 bg-gray-900 border-gray-800">
              <div className="flex items-center">
                <div className="relative w-12 h-12 mr-3 rounded-full overflow-hidden">
                  <Image src={user.avatar || "/placeholder.svg"} alt={user.name} fill className="object-cover" />
                </div>
                <div className="flex-1">
                  <div className="flex justify-between items-center mb-1">
                    <h3 className="font-medium text-white">{user.name}</h3>
                    <span className={`text-xs px-2 py-0.5 rounded-full ${getMemberLevelStyle(user.memberLevel)}`}>
                      {user.memberLevel}
                    </span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="text-gray-400">注册时间: {user.registerDate}</span>
                    <span className="text-blue-400">消费: ¥{user.totalSpent.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between items-center mt-1">
                    <div className="flex items-center">
                      <span className="text-xs text-gray-500">ID: </span>
                      <span className="text-xs text-gray-400 ml-1">{user.userId}</span>
                    </div>
                    <button
                      className="text-xs text-blue-400 bg-blue-900/20 px-2 py-0.5 rounded flex items-center"
                      onClick={() => copyToClipboard(user.userId)}
                    >
                      <Copy className="h-3 w-3 mr-1" />
                      复制ID
                    </button>
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
