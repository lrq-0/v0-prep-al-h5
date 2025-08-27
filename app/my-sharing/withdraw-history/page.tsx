"use client"
import { ArrowLeft, Search, Filter } from "lucide-react"
import Link from "next/link"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function WithdrawHistory() {
  // 模拟提现记录数据
  const withdrawals = [
    {
      id: 1,
      amount: 200,
      method: "微信钱包",
      status: "已到账",
      date: "2025-04-20 14:25",
      transactionId: "W123456",
    },
    {
      id: 2,
      amount: 500,
      method: "支付宝",
      status: "已到账",
      date: "2025-04-10 11:30",
      transactionId: "W234567",
    },
    {
      id: 3,
      amount: 300,
      method: "微信钱包",
      status: "处理中",
      date: "2025-04-24 09:15",
      transactionId: "W345678",
    },
    {
      id: 4,
      amount: 1000,
      method: "银行卡",
      status: "已到账",
      date: "2025-03-15 16:40",
      transactionId: "W456789",
    },
    {
      id: 5,
      amount: 800,
      method: "支付宝",
      status: "已到账",
      date: "2025-03-01 10:20",
      transactionId: "W567890",
    },
    {
      id: 6,
      amount: 450,
      method: "微信钱包",
      status: "提现失败",
      date: "2025-02-18 13:45",
      transactionId: "W678901",
      failReason: "账户异常，请联系客服",
    },
  ]

  // 按状态过滤提现记录
  const inProgressWithdrawals = withdrawals.filter((w) => w.status === "处理中")
  const successWithdrawals = withdrawals.filter((w) => w.status === "已到账")
  const failedWithdrawals = withdrawals.filter((w) => w.status === "提现失败")

  // 渲染提现记录卡片
  const renderWithdrawalCard = (withdrawal) => (
    <Card key={withdrawal.id} className="p-3 bg-gray-900 border-gray-800 mb-3">
      <div className="flex justify-between items-start mb-2">
        <div>
          <h3 className="font-medium text-white text-sm">提现至{withdrawal.method}</h3>
          <div className="text-xs text-gray-400 mt-1">{withdrawal.date}</div>
        </div>
        <div className="text-base font-medium text-red-400">-{withdrawal.amount.toFixed(2)}</div>
      </div>
      <div className="flex justify-between items-center text-xs">
        <div className="text-gray-500">ID: {withdrawal.transactionId}</div>
        <div
          className={`px-2 py-0.5 rounded-full ${
            withdrawal.status === "已到账"
              ? "bg-green-900/30 text-green-400 border border-green-500/30"
              : withdrawal.status === "处理中"
                ? "bg-amber-900/30 text-amber-400 border border-amber-500/30"
                : "bg-red-900/30 text-red-400 border border-red-500/30"
          }`}
        >
          {withdrawal.status}
        </div>
      </div>
      {withdrawal.failReason && (
        <div className="mt-2 text-xs text-red-400 bg-red-900/20 p-2 rounded-md">{withdrawal.failReason}</div>
      )}
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
        <h1 className="flex-1 text-center text-lg font-semibold text-white">提现记录</h1>
      </div>

      <div className="p-4 pb-16">
        {/* 搜索和筛选 */}
        <div className="flex items-center gap-3 mb-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 h-4 w-4" />
            <Input
              placeholder="搜索记录..."
              className="pl-9 bg-gray-900 border-gray-700 text-white placeholder:text-gray-500 focus-visible:ring-blue-500"
            />
          </div>
          <Button variant="outline" size="icon" className="border-gray-700">
            <Filter className="h-4 w-4 text-gray-400" />
          </Button>
        </div>

        {/* 提现记录标签页 */}
        <Tabs defaultValue="all" className="w-full">
          <TabsList className="w-full grid grid-cols-4 bg-gray-900 border-b border-gray-800 rounded-none h-12 mb-4">
            <TabsTrigger value="all" className="data-[state=active]:text-blue-400">
              全部
            </TabsTrigger>
            <TabsTrigger value="inProgress" className="data-[state=active]:text-blue-400">
              进行中
            </TabsTrigger>
            <TabsTrigger value="success" className="data-[state=active]:text-blue-400">
              提现成功
            </TabsTrigger>
            <TabsTrigger value="failed" className="data-[state=active]:text-blue-400">
              提现失败
            </TabsTrigger>
          </TabsList>

          <TabsContent value="all">
            <div className="space-y-0">{withdrawals.map(renderWithdrawalCard)}</div>
          </TabsContent>

          <TabsContent value="inProgress">
            {inProgressWithdrawals.length > 0 ? (
              <div className="space-y-0">{inProgressWithdrawals.map(renderWithdrawalCard)}</div>
            ) : (
              <div className="text-center py-8 text-gray-500">暂无进行中的提现记录</div>
            )}
          </TabsContent>

          <TabsContent value="success">
            {successWithdrawals.length > 0 ? (
              <div className="space-y-0">{successWithdrawals.map(renderWithdrawalCard)}</div>
            ) : (
              <div className="text-center py-8 text-gray-500">暂无成功的提现记录</div>
            )}
          </TabsContent>

          <TabsContent value="failed">
            {failedWithdrawals.length > 0 ? (
              <div className="space-y-0">{failedWithdrawals.map(renderWithdrawalCard)}</div>
            ) : (
              <div className="text-center py-8 text-gray-500">暂无失败的提现记录</div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
