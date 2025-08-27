"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { ArrowLeft, Download, Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"
import { Badge } from "@/components/ui/badge"

// 模拟数据
const couponRecords = [
  {
    id: 1,
    couponName: "新用户专享优惠",
    userId: "user_12345",
    userName: "张三",
    phone: "138****1234",
    status: "已使用",
    claimedAt: "2023-10-15 14:30:25",
    usedAt: "2023-10-18 09:45:12",
    orderNo: "ORD20231018094512",
  },
  {
    id: 2,
    couponName: "新用户专享优惠",
    userId: "user_23456",
    userName: "李四",
    phone: "139****5678",
    status: "已领取",
    claimedAt: "2023-10-16 10:22:18",
    usedAt: null,
    orderNo: null,
  },
  {
    id: 3,
    couponName: "新用户专享优惠",
    userId: "user_34567",
    userName: "王五",
    phone: "137****9012",
    status: "已过期",
    claimedAt: "2023-10-10 16:05:33",
    usedAt: null,
    orderNo: null,
  },
  {
    id: 4,
    couponName: "新用户专享优惠",
    userId: "user_45678",
    userName: "赵六",
    phone: "136****3456",
    status: "已使用",
    claimedAt: "2023-10-12 08:15:42",
    usedAt: "2023-10-14 11:30:05",
    orderNo: "ORD20231014113005",
  },
  {
    id: 5,
    couponName: "新用户专享优惠",
    userId: "user_56789",
    userName: "钱七",
    phone: "135****7890",
    status: "已领取",
    claimedAt: "2023-10-17 19:22:51",
    usedAt: null,
    orderNo: null,
  },
]

export default function CouponRecordsPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 10

  // 获取优惠券信息
  const couponInfo = {
    id: Number.parseInt(params.id),
    name: "新用户专享优惠",
    amount: 50,
    total: 1000,
    claimed: 358,
    used: 120,
  }

  // 过滤记录
  const filteredRecords = couponRecords.filter((record) => {
    const matchesSearch =
      record.userName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      record.userId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      record.phone.includes(searchTerm)
    const matchesStatus = statusFilter === "all" || record.status === statusFilter
    return matchesSearch && matchesStatus
  })

  // 分页
  const totalPages = Math.ceil(filteredRecords.length / itemsPerPage)
  const paginatedRecords = filteredRecords.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)

  // 获取状态对应的颜色
  const getStatusColor = (status: string) => {
    switch (status) {
      case "已使用":
        return "bg-green-100 text-green-800"
      case "已领取":
        return "bg-blue-100 text-blue-800"
      case "已过期":
        return "bg-gray-100 text-gray-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="flex items-center mb-6">
        <Button variant="ghost" size="icon" onClick={() => router.push("/management/coupons")} className="mr-2">
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <h1 className="text-2xl font-bold">优惠券领取记录</h1>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-sm border mb-6">
        <h2 className="text-lg font-medium mb-4 text-gray-900">优惠券信息</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <p className="text-sm text-gray-600">优惠券名称</p>
            <p className="font-medium text-gray-800">{couponInfo.name}</p>
          </div>
          <div>
            <p className="text-sm text-gray-600">优惠券金额</p>
            <p className="font-medium text-primary">¥{couponInfo.amount}</p>
          </div>
          <div>
            <p className="text-sm text-gray-600">发行量</p>
            <p className="font-medium text-gray-800">{couponInfo.total}</p>
          </div>
          <div>
            <p className="text-sm text-gray-600">已领取</p>
            <p className="font-medium text-gray-800">{couponInfo.claimed}</p>
          </div>
          <div>
            <p className="text-sm text-gray-600">已使用</p>
            <p className="font-medium text-gray-800">{couponInfo.used}</p>
          </div>
          <div>
            <p className="text-sm text-gray-600">使用率</p>
            <p className="font-medium text-gray-800">
              {couponInfo.claimed > 0 ? ((couponInfo.used / couponInfo.claimed) * 100).toFixed(2) : 0}%
            </p>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
        <div className="p-4 border-b">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="搜索用户名/ID/手机号"
                className="pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full md:w-[180px]">
                <SelectValue placeholder="使用状态" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">全部状态</SelectItem>
                <SelectItem value="已领取">已领取</SelectItem>
                <SelectItem value="已使用">已使用</SelectItem>
                <SelectItem value="已过期">已过期</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" className="md:w-auto">
              <Download className="h-4 w-4 mr-2" />
              导出记录
            </Button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="text-gray-800">用户ID</TableHead>
                <TableHead className="text-gray-800">用户名</TableHead>
                <TableHead className="text-gray-800">手机号</TableHead>
                <TableHead className="text-gray-800">状态</TableHead>
                <TableHead className="text-gray-800">领取时间</TableHead>
                <TableHead className="text-gray-800">使用时间</TableHead>
                <TableHead className="text-gray-800">订单号</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {paginatedRecords.length > 0 ? (
                paginatedRecords.map((record) => (
                  <TableRow key={record.id}>
                    <TableCell className="font-medium text-gray-800">{record.userId}</TableCell>
                    <TableCell className="text-gray-700">{record.userName}</TableCell>
                    <TableCell className="text-gray-700">{record.phone}</TableCell>
                    <TableCell>
                      <Badge className={getStatusColor(record.status)}>{record.status}</Badge>
                    </TableCell>
                    <TableCell className="text-gray-700">{record.claimedAt}</TableCell>
                    <TableCell className="text-gray-700">{record.usedAt || "-"}</TableCell>
                    <TableCell className="text-gray-700">{record.orderNo || "-"}</TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={7} className="text-center py-6 text-gray-600">
                    没有找到匹配的记录
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>

        {totalPages > 1 && (
          <div className="p-4 border-t">
            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious
                    onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                    className={currentPage === 1 ? "pointer-events-none opacity-50" : ""}
                  />
                </PaginationItem>

                {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                  let pageNumber
                  if (totalPages <= 5) {
                    pageNumber = i + 1
                  } else if (currentPage <= 3) {
                    pageNumber = i + 1
                  } else if (currentPage >= totalPages - 2) {
                    pageNumber = totalPages - 4 + i
                  } else {
                    pageNumber = currentPage - 2 + i
                  }

                  return (
                    <PaginationItem key={i}>
                      <PaginationLink onClick={() => setCurrentPage(pageNumber)} isActive={currentPage === pageNumber}>
                        {pageNumber}
                      </PaginationLink>
                    </PaginationItem>
                  )
                })}

                {totalPages > 5 && currentPage < totalPages - 2 && (
                  <PaginationItem>
                    <PaginationEllipsis />
                  </PaginationItem>
                )}

                <PaginationItem>
                  <PaginationNext
                    onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                    className={currentPage === totalPages ? "pointer-events-none opacity-50" : ""}
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </div>
        )}
      </div>
    </div>
  )
}
