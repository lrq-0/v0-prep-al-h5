"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { ArrowLeft, Calendar, Clock, Edit, FileText, Plus, Search, Tag, Ticket, Users } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

// 模拟数据
const coupons = [
  {
    id: 1,
    name: "新用户专享优惠",
    amount: 50,
    total: 1000,
    claimed: 358,
    used: 120,
    validPeriod: "7天",
    startDate: "2023-10-01",
    endDate: "2023-12-31",
    condition: "满200元可用",
    status: "进行中",
    createdAt: "2023-09-15",
  },
  {
    id: 2,
    name: "双十一全场优惠",
    amount: 100,
    total: 500,
    claimed: 500,
    used: 320,
    validPeriod: "3天",
    startDate: "2023-11-11",
    endDate: "2023-11-13",
    condition: "满300元可用",
    status: "已结束",
    createdAt: "2023-10-20",
  },
  {
    id: 3,
    name: "年终课程特惠",
    amount: 200,
    total: 300,
    claimed: 150,
    used: 80,
    validPeriod: "30天",
    startDate: "2023-12-20",
    endDate: "2024-01-20",
    condition: "满500元可用",
    status: "进行中",
    createdAt: "2023-12-10",
  },
  {
    id: 4,
    name: "春季会员优惠",
    amount: 80,
    total: 800,
    claimed: 0,
    used: 0,
    validPeriod: "15天",
    startDate: "2024-03-01",
    endDate: "2024-03-31",
    condition: "满300元可用",
    status: "未开始",
    createdAt: "2024-02-15",
  },
]

export default function CouponsPage() {
  const router = useRouter()
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")

  // 过滤优惠券
  const filteredCoupons = coupons.filter((coupon) => {
    const matchesSearch = coupon.name.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || coupon.status === statusFilter
    return matchesSearch && matchesStatus
  })

  // 获取状态对应的颜色
  const getStatusColor = (status: string) => {
    switch (status) {
      case "未开始":
        return "bg-blue-100 text-blue-800"
      case "进行中":
        return "bg-green-100 text-green-800"
      case "已结束":
        return "bg-gray-100 text-gray-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="container mx-auto px-4 py-6 pb-24">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center">
          <Button variant="ghost" size="icon" onClick={() => router.push("/management")} className="mr-2">
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-2xl font-bold">优惠券管理</h1>
        </div>
        <Button onClick={() => router.push("/management/coupons/create")} className="bg-primary">
          <Plus className="mr-2 h-4 w-4" /> 新创建优惠券活动
        </Button>
      </div>

      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            placeholder="搜索优惠券名称"
            className="pl-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-full md:w-[180px] text-gray-700">
            <SelectValue placeholder="活动状态" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">全部状态</SelectItem>
            <SelectItem value="未开始">未开始</SelectItem>
            <SelectItem value="进行中">进行中</SelectItem>
            <SelectItem value="已结束">已结束</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCoupons.map((coupon) => (
          <Card key={coupon.id} className="overflow-hidden border border-gray-200">
            <CardContent className="p-0">
              <div className="bg-primary/10 p-4 relative">
                <div className="absolute right-4 top-4">
                  <Badge className={getStatusColor(coupon.status)}>{coupon.status}</Badge>
                </div>
                <h3 className="font-medium text-lg mb-1 text-gray-900">{coupon.name}</h3>
                <div className="text-3xl font-bold text-primary">¥{coupon.amount}</div>
                <p className="text-sm text-gray-700 mt-1">{coupon.condition}</p>
              </div>

              <div className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center text-sm text-gray-700">
                    <Ticket className="h-4 w-4 mr-1 text-gray-600" />
                    <span>发行量: {coupon.total}</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-700">
                    <Users className="h-4 w-4 mr-1 text-gray-600" />
                    <span>已领: {coupon.claimed}</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-700">
                    <Tag className="h-4 w-4 mr-1 text-gray-600" />
                    <span>已用: {coupon.used}</span>
                  </div>
                </div>

                <div className="flex items-center text-sm text-gray-700 mb-2">
                  <Calendar className="h-4 w-4 mr-1 text-gray-600" />
                  <span>
                    活动时间: {coupon.startDate} 至 {coupon.endDate}
                  </span>
                </div>

                <div className="flex items-center text-sm text-gray-700 mb-2">
                  <Clock className="h-4 w-4 mr-1 text-gray-600" />
                  <span>有效期: {coupon.validPeriod}</span>
                </div>

                <div className="flex items-center text-sm text-gray-700 mb-4">
                  <FileText className="h-4 w-4 mr-1 text-gray-600" />
                  <span>创建时间: {coupon.createdAt}</span>
                </div>

                <div className="flex justify-between">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => router.push(`/management/coupons/records/${coupon.id}`)}
                  >
                    领取记录
                  </Button>
                  {coupon.status === "未开始" && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => router.push(`/management/coupons/edit/${coupon.id}`)}
                    >
                      <Edit className="h-4 w-4 mr-1" /> 编辑
                    </Button>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredCoupons.length === 0 && (
        <div className="text-center py-12">
          <Ticket className="h-12 w-12 mx-auto text-gray-300" />
          <h3 className="mt-4 text-lg font-medium text-gray-800">没有找到优惠券</h3>
          <p className="mt-1 text-gray-600">尝试调整搜索条件或创建新的优惠券活动</p>
        </div>
      )}
    </div>
  )
}
