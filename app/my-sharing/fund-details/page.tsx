"use client"

import { useState } from "react"
import { ArrowLeft, Search, Download, Filter } from "lucide-react"
import Link from "next/link"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { DateRangePicker } from "@/components/date-range-picker"

export default function FundDetails() {
  const [searchType, setSearchType] = useState("date")
  const [dateRange, setDateRange] = useState({ from: null, to: null })

  // 模拟资金明细数据
  const transactions = [
    {
      id: 1,
      type: "commission",
      amount: 59.7,
      balance: 1256.78,
      sourceId: "U123456",
      description: "用户购买「高考英语词汇精讲」课程佣金",
      date: "2025-04-23 15:30",
    },
    {
      id: 2,
      type: "commission",
      amount: 41.85,
      balance: 1197.08,
      sourceId: "U789012",
      description: "用户购买「物理实验与解析」课程佣金",
      date: "2025-04-22 10:15",
    },
    {
      id: 3,
      type: "withdraw",
      amount: -200,
      balance: 1155.23,
      sourceId: "W123456",
      description: "提现至微信钱包",
      date: "2025-04-20 14:25",
    },
    {
      id: 4,
      type: "commission",
      amount: 89.85,
      balance: 1355.23,
      sourceId: "U345678",
      description: "用户购买「高考冲刺班」课程佣金",
      date: "2025-04-18 09:45",
    },
    {
      id: 5,
      type: "commission",
      amount: 29.85,
      balance: 1265.38,
      sourceId: "U901234",
      description: "用户购买「数学解题技巧」课程佣金",
      date: "2025-04-15 16:20",
    },
    {
      id: 6,
      type: "withdraw",
      amount: -500,
      balance: 1235.53,
      sourceId: "W234567",
      description: "提现至支付宝",
      date: "2025-04-10 11:30",
    },
    {
      id: 7,
      type: "commission",
      amount: 149.85,
      balance: 1735.53,
      sourceId: "U567890",
      description: "用户购买「VIP会员」佣金",
      date: "2025-04-05 13:15",
    },
    {
      id: 8,
      type: "commission",
      amount: 74.85,
      balance: 1585.68,
      sourceId: "U678901",
      description: "用户购买「语文阅读理解」课程佣金",
      date: "2025-04-01 10:45",
    },
  ]

  // 按类型过滤交易
  const commissions = transactions.filter((tx) => tx.type === "commission")
  const withdrawals = transactions.filter((tx) => tx.type === "withdraw")

  // 渲染交易卡片
  const renderTransactionCard = (tx) => (
    <Card key={tx.id} className="p-3 bg-gray-900 border-gray-800 mb-3">
      <div className="flex justify-between items-start mb-2">
        <div>
          <h3 className="font-medium text-white text-sm">{tx.description}</h3>
          <div className="text-xs text-gray-400 mt-1">{tx.date}</div>
        </div>
        <div className={`text-base font-medium ${tx.type === "commission" ? "text-green-400" : "text-red-400"}`}>
          {tx.type === "commission" ? "+" : ""}
          {tx.amount.toFixed(2)}
        </div>
      </div>
      <div className="flex justify-between items-center text-xs">
        <div className="text-gray-500">ID: {tx.sourceId}</div>
        <div className="text-gray-400">余额: {tx.balance.toFixed(2)}</div>
      </div>
    </Card>
  )

  return (
    <div className="min-h-screen bg-black text-white">
      {/* 顶部导航栏 */}
      <div className="sticky top-0 left-0 right-0 h-14 flex items-center px-4 bg-gray-900/80 backdrop-blur-md border-b border-gray-800 z-10">
        <Link href="/my-sharing" className="flex items-center text-gray-300">
          <ArrowLeft className="h-5 w-5 mr-2" />
          <span>返回</span>
        </Link>
        <h1 className="flex-1 text-center text-lg font-semibold text-white">佣金明细</h1>
        <button className="text-gray-300">
          <Download className="h-5 w-5" />
        </button>
      </div>

      <div className="p-4 pb-16">
        {/* 搜索和筛选 */}
        <div className="mb-4">
          <Select value={searchType} onValueChange={setSearchType}>
            <SelectTrigger className="w-full bg-gray-900 border-gray-700 text-white mb-3">
              <SelectValue placeholder="搜索方式" />
            </SelectTrigger>
            <SelectContent className="bg-gray-900 border-gray-700 text-white">
              <SelectItem value="date">按付款时间搜索</SelectItem>
              <SelectItem value="userId">按用户ID搜索</SelectItem>
            </SelectContent>
          </Select>

          {searchType === "date" ? (
            <div className="mb-3">
              <DateRangePicker dateRange={dateRange} setDateRange={setDateRange} />
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

        {/* 交易类型标签页 */}
        <Tabs defaultValue="all" className="w-full">
          <TabsList className="w-full grid grid-cols-3 bg-gray-900 border-b border-gray-800 rounded-none h-12 mb-4">
            <TabsTrigger value="all" className="data-[state=active]:text-blue-400">
              全部
            </TabsTrigger>
            <TabsTrigger value="commission" className="data-[state=active]:text-blue-400">
              佣金收入
            </TabsTrigger>
            <TabsTrigger value="withdraw" className="data-[state=active]:text-blue-400">
              提现记录
            </TabsTrigger>
          </TabsList>

          <TabsContent value="all">
            <div className="space-y-0">{transactions.map(renderTransactionCard)}</div>
          </TabsContent>

          <TabsContent value="commission">
            <div className="space-y-0">{commissions.map(renderTransactionCard)}</div>
          </TabsContent>

          <TabsContent value="withdraw">
            <div className="space-y-0">{withdrawals.map(renderTransactionCard)}</div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
