"use client"

import { useState } from "react"
import { ArrowLeft, Search, Download, Copy } from "lucide-react"
import Link from "next/link"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { DateRangePicker } from "@/components/date-range-picker"
import { useToast } from "@/components/ui/use-toast"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function IncomeDetails() {
  const { toast } = useToast()
  const [searchType, setSearchType] = useState("date")
  const [selectedTab, setSelectedTab] = useState("all")

  // 模拟资金明细数据
  const transactions = [
    {
      id: "T202504230001",
      type: "vip",
      productName: "年度会员",
      amount: 398,
      commission: 59.7,
      deduction: 60,
      netAmount: 338,
      userId: "U123456",
      userName: "王小明",
      paymentTime: "2025-04-23 15:30",
      agentId: "A789012",
      agentName: "李代理",
      agentCommission: 39.8,
      level2AgentId: "",
      level2AgentName: "",
      level2AgentCommission: 19.9,
      balance: 5678.9,
      refund: false,
    },
    {
      id: "T202504220002",
      type: "course",
      productName: "高考英语词汇精讲",
      amount: 299,
      commission: 0,
      deduction: 0,
      netAmount: 299,
      userId: "U789012",
      userName: "张小红",
      paymentTime: "2025-04-22 10:15",
      agentId: "A789012",
      agentName: "李代理",
      agentCommission: 29.9,
      level2AgentId: "",
      level2AgentName: "",
      level2AgentCommission: 0,
      balance: 5379.9,
      refund: false,
    },
    {
      id: "T202504210003",
      type: "vip",
      productName: "月度会员",
      amount: 69.9,
      commission: 0,
      deduction: 5,
      netAmount: 64.9,
      userId: "U345678",
      userName: "刘小华",
      paymentTime: "2025-04-21 14:25",
      agentId: "",
      agentName: "",
      agentCommission: 0,
      level2AgentId: "",
      level2AgentName: "",
      level2AgentCommission: 0,
      balance: 5080.9,
      refund: false,
    },
    {
      id: "T202504200004",
      type: "exam",
      productName: "高考模拟考试",
      amount: 199,
      commission: 29.85,
      deduction: 0,
      netAmount: 199,
      userId: "U901234",
      userName: "赵小燕",
      paymentTime: "2025-04-20 09:45",
      agentId: "A123456",
      agentName: "王代理",
      agentCommission: 19.9,
      level2AgentId: "",
      level2AgentName: "",
      level2AgentCommission: 0,
      balance: 5011.0,
      refund: false,
    },
    {
      id: "T202504190005",
      type: "course",
      productName: "数学解题技巧",
      amount: 199,
      commission: 0,
      deduction: 0,
      netAmount: 199,
      userId: "U567890",
      userName: "孙小梅",
      paymentTime: "2025-04-19 16:20",
      agentId: "A123456",
      agentName: "王代理",
      agentCommission: 19.9,
      level2AgentId: "",
      level2AgentName: "",
      level2AgentCommission: 0,
      balance: 4812.0,
      refund: false,
    },
    {
      id: "T202504180006",
      type: "vip",
      productName: "终身会员",
      amount: 888,
      commission: 0,
      deduction: 120,
      netAmount: 768,
      userId: "U234567",
      userName: "周小伟",
      paymentTime: "2025-04-18 11:30",
      agentId: "",
      agentName: "",
      agentCommission: 0,
      level2AgentId: "",
      level2AgentName: "",
      level2AgentCommission: 0,
      balance: 4613.0,
      refund: false,
    },
    {
      id: "T202504170007",
      type: "agent",
      productName: "初级代理商",
      amount: 3650,
      commission: 0,
      deduction: 0,
      netAmount: 3650,
      userId: "U678901",
      userName: "吴小芳",
      paymentTime: "2025-04-17 13:15",
      agentId: "A456789",
      agentName: "张代理",
      agentCommission: 365,
      level2AgentId: "",
      level2AgentName: "",
      level2AgentCommission: 0,
      balance: 3845.0,
      refund: false,
    },
    {
      id: "T202504160008",
      type: "course",
      productName: "语文阅读理解",
      amount: 249,
      commission: 0,
      deduction: 0,
      netAmount: 249,
      userId: "U890123",
      userName: "陈小军",
      paymentTime: "2025-04-16 10:45",
      agentId: "A456789",
      agentName: "张代理",
      agentCommission: 24.9,
      level2AgentId: "",
      level2AgentName: "",
      level2AgentCommission: 0,
      balance: 195.0,
      refund: false,
    },
    {
      id: "T202504150009",
      type: "course",
      productName: "物理实验与解析",
      amount: 199,
      commission: 0,
      deduction: 0,
      netAmount: -199,
      userId: "U789012",
      userName: "张小红",
      paymentTime: "2025-04-15 09:30",
      agentId: "A789012",
      agentName: "李代理",
      agentCommission: -19.9,
      level2AgentId: "",
      level2AgentName: "",
      level2AgentCommission: 0,
      balance: 0,
      refund: true,
    },
  ]

  // 按类型过滤交易
  const filteredTransactions = () => {
    switch (selectedTab) {
      case "vip":
        return transactions.filter((tx) => tx.type === "vip")
      case "course":
        return transactions.filter((tx) => tx.type === "course")
      case "exam":
        return transactions.filter((tx) => tx.type === "exam")
      case "agent":
        return transactions.filter((tx) => tx.type === "agent")
      default:
        return transactions
    }
  }

  // 获取交易类型样式
  const getTransactionTypeStyle = (type) => {
    switch (type) {
      case "vip":
        return "bg-amber-900/30 text-amber-400 border border-amber-500/30"
      case "course":
        return "bg-blue-900/30 text-blue-400 border border-blue-500/30"
      case "exam":
        return "bg-green-900/30 text-green-400 border border-green-500/30"
      case "agent":
        return "bg-purple-900/30 text-purple-400 border border-purple-500/30"
      default:
        return "bg-gray-800 text-gray-400 border border-gray-700"
    }
  }

  // 获取交易类型名称
  const getTransactionTypeName = (type) => {
    switch (type) {
      case "vip":
        return "会员"
      case "course":
        return "课程"
      case "exam":
        return "考试"
      case "agent":
        return "代理"
      default:
        return "其他"
    }
  }

  // 复制ID
  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text)
    toast({
      description: "ID已复制到剪贴板",
      duration: 2000,
    })
  }

  // 计算统计数据
  const calculateStats = (transactions) => {
    const stats = {
      totalOrders: transactions.length,
      totalIncome: transactions.reduce((sum, tx) => sum + (tx.refund ? 0 : tx.amount), 0),
      netIncome: transactions.reduce((sum, tx) => sum + (tx.refund ? -tx.netAmount : tx.netAmount), 0),
      totalRefunds: transactions.filter((tx) => tx.refund).length,
      totalRefundAmount: transactions.filter((tx) => tx.refund).reduce((sum, tx) => sum + tx.amount, 0),
      totalCommission: transactions.reduce(
        (sum, tx) => sum + (tx.refund ? -tx.agentCommission : tx.agentCommission),
        0,
      ),
      totalDeduction: transactions.reduce((sum, tx) => sum + (tx.refund ? -tx.deduction : tx.deduction), 0),
    }
    return stats
  }

  // 获取当前分类的统计数据
  const currentStats = calculateStats(filteredTransactions())

  // 修改交易卡片渲染函数，按照新的布局设计
  const renderTransactionCard = (tx) => (
    <Card key={tx.id} className="p-3 bg-gray-900 border-gray-800 mb-3">
      <div className="flex flex-col">
        {/* 顶部：产品信息和金额 */}
        <div className="flex justify-between items-start mb-3">
          <div className="flex items-center">
            <span className={`text-xs px-2 py-0.5 rounded-full mr-2 ${getTransactionTypeStyle(tx.type)}`}>
              {getTransactionTypeName(tx.type)}
            </span>
            <h3 className="font-medium text-white text-sm">{tx.productName}</h3>
            {tx.refund && (
              <span className="ml-2 text-xs px-2 py-0.5 rounded-full bg-red-900/30 text-red-400 border border-red-500/30">
                已退款
              </span>
            )}
          </div>
          <div className={`text-lg font-medium ${tx.refund ? "text-red-400" : "text-green-400"}`}>
            {tx.refund ? "-" : "+"}¥{tx.amount.toFixed(2)}
          </div>
        </div>

        {/* 中部：用户信息和时间 */}
        <div className="flex justify-between items-center mb-3 text-xs">
          <div>
            <div className="flex items-center">
              <span className="text-gray-500 mr-1">用户ID:</span>
              <span className="text-gray-300">{tx.userId}</span>
              <button className="ml-1 text-blue-400" onClick={() => copyToClipboard(tx.userId)}>
                <Copy className="h-3 w-3" />
              </button>
            </div>
            <div className="mt-1">
              <span className="text-gray-500 mr-1">用户:</span>
              <span className="text-gray-300">{tx.userName}</span>
            </div>
          </div>
          <div className="text-right">
            <div className="text-gray-400">{tx.paymentTime}</div>
          </div>
        </div>

        {/* 分割线 */}
        <div className="border-t border-gray-800 my-2"></div>

        {/* 底部：佣金和余额信息 */}
        <div className="space-y-2">
          {/* 一级代理分佣 */}
          {tx.agentId && (
            <div className="flex justify-between items-center text-xs">
              <div className="flex items-center">
                <span className="text-gray-500">一级代理分佣:</span>
                <span className="text-gray-300 ml-1">{tx.agentName}</span>
                <span className="text-gray-500 ml-1">({tx.agentId})</span>
                <button className="ml-1 text-blue-400" onClick={() => copyToClipboard(tx.agentId)}>
                  <Copy className="h-3 w-3" />
                </button>
              </div>
              <div className="text-amber-400">
                {tx.refund ? "+" : "-"}¥{tx.agentCommission.toFixed(2)}
              </div>
            </div>
          )}

          {/* 二级代理分佣 */}
          {tx.level2AgentId && tx.level2AgentId !== "" && (
            <div className="flex justify-between items-center text-xs">
              <div className="flex items-center">
                <span className="text-gray-500">二级代理分佣:</span>
                <span className="text-gray-300 ml-1">{tx.level2AgentName}</span>
                <span className="text-gray-500 ml-1">({tx.level2AgentId})</span>
                <button className="ml-1 text-blue-400" onClick={() => copyToClipboard(tx.level2AgentId)}>
                  <Copy className="h-3 w-3" />
                </button>
              </div>
              <div className="text-amber-400">
                {tx.refund ? "+" : "-"}¥{tx.level2AgentCommission.toFixed(2)}
              </div>
            </div>
          )}

          {/* 系统成本 */}
          {tx.deduction > 0 && (
            <div className="flex justify-between items-center text-xs">
              <div className="text-gray-500">系统成本:</div>
              <div className="text-red-400">
                {tx.refund ? "+" : "-"}¥{tx.deduction.toFixed(2)}
              </div>
            </div>
          )}

          {/* 净收入 */}
          <div className="flex justify-between items-center text-xs">
            <div className="text-gray-500">净收入:</div>
            <div className={tx.refund ? "text-red-400" : "text-green-400"}>
              {tx.refund ? "-" : "+"}¥{tx.netAmount.toFixed(2)}
            </div>
          </div>

          {/* 余额 */}
          <div className="flex justify-between items-center text-xs">
            <div className="text-gray-500">账户余额:</div>
            <div className="text-white font-medium">¥{tx.balance.toFixed(2)}</div>
          </div>
        </div>
      </div>
    </Card>
  )

  // 渲染分类统计信息
  const renderCategoryStats = () => {
    switch (selectedTab) {
      case "vip":
        return (
          <Card className="p-4 bg-gray-900 border-gray-800 mb-4">
            <div className="grid grid-cols-12 gap-3">
              {/* 左侧：总收入和净收入 */}
              <div className="col-span-12 md:col-span-4 border-b md:border-b-0 md:border-r border-gray-800 pb-3 md:pb-0 md:pr-3">
                <div className="mb-3">
                  <div className="text-sm text-gray-400 mb-1">会员收入</div>
                  <div className="text-2xl font-bold text-amber-400">¥{currentStats.totalIncome.toFixed(2)}</div>
                </div>
                <div>
                  <div className="text-sm text-gray-400 mb-1">会员净收入</div>
                  <div className="text-2xl font-bold text-green-400">¥{currentStats.netIncome.toFixed(2)}</div>
                </div>
              </div>

              {/* 中间：订单统计 */}
              <div className="col-span-12 md:col-span-4 grid grid-cols-3 gap-2 text-center border-b md:border-b-0 md:border-r border-gray-800 py-3 md:py-0 md:pr-3">
                <div>
                  <div className="text-xl font-bold text-white">{currentStats.totalOrders}</div>
                  <div className="text-xs text-gray-400">订单数</div>
                </div>
                <div>
                  <div className="text-xl font-bold text-red-400">{currentStats.totalRefunds}</div>
                  <div className="text-xs text-gray-400">退单量</div>
                </div>
                <div>
                  <div className="text-xl font-bold text-green-400">
                    {currentStats.totalOrders - currentStats.totalRefunds}
                  </div>
                  <div className="text-xs text-gray-400">有效单</div>
                </div>
              </div>

              {/* 右侧：退单金额、分佣金额、系统成本 */}
              <div className="col-span-12 md:col-span-4 grid grid-cols-3 gap-2 text-center pt-3 md:pt-0">
                <div>
                  <div className="text-xl font-bold text-red-400">¥{currentStats.totalRefundAmount.toFixed(2)}</div>
                  <div className="text-xs text-gray-400">退单额</div>
                </div>
                <div>
                  <div className="text-xl font-bold text-amber-400">¥{currentStats.totalCommission.toFixed(2)}</div>
                  <div className="text-xs text-gray-400">分佣额</div>
                </div>
                <div>
                  <div className="text-xl font-bold text-red-400">¥{currentStats.totalDeduction.toFixed(2)}</div>
                  <div className="text-xs text-gray-400">系统成本</div>
                </div>
              </div>
            </div>
          </Card>
        )
      case "course":
        return (
          <Card className="p-4 bg-gray-900 border-gray-800 mb-4">
            <div className="grid grid-cols-12 gap-3">
              {/* 左侧：总收入和净收入 */}
              <div className="col-span-12 md:col-span-4 border-b md:border-b-0 md:border-r border-gray-800 pb-3 md:pb-0 md:pr-3">
                <div className="mb-3">
                  <div className="text-sm text-gray-400 mb-1">课程收入</div>
                  <div className="text-2xl font-bold text-blue-400">¥{currentStats.totalIncome.toFixed(2)}</div>
                </div>
                <div>
                  <div className="text-sm text-gray-400 mb-1">课程净收入</div>
                  <div className="text-2xl font-bold text-green-400">¥{currentStats.netIncome.toFixed(2)}</div>
                </div>
              </div>

              {/* 中间：订单统计 */}
              <div className="col-span-12 md:col-span-4 grid grid-cols-3 gap-2 text-center border-b md:border-b-0 md:border-r border-gray-800 py-3 md:py-0 md:pr-3">
                <div>
                  <div className="text-xl font-bold text-white">{currentStats.totalOrders}</div>
                  <div className="text-xs text-gray-400">订单数</div>
                </div>
                <div>
                  <div className="text-xl font-bold text-red-400">{currentStats.totalRefunds}</div>
                  <div className="text-xs text-gray-400">退单量</div>
                </div>
                <div>
                  <div className="text-xl font-bold text-green-400">
                    {currentStats.totalOrders - currentStats.totalRefunds}
                  </div>
                  <div className="text-xs text-gray-400">有效单</div>
                </div>
              </div>

              {/* 右侧：退单金额、分佣金额 */}
              <div className="col-span-12 md:col-span-4 grid grid-cols-3 gap-2 text-center pt-3 md:pt-0">
                <div>
                  <div className="text-xl font-bold text-red-400">¥{currentStats.totalRefundAmount.toFixed(2)}</div>
                  <div className="text-xs text-gray-400">退单额</div>
                </div>
                <div>
                  <div className="text-xl font-bold text-amber-400">¥{currentStats.totalCommission.toFixed(2)}</div>
                  <div className="text-xs text-gray-400">分佣额</div>
                </div>
                <div>
                  <div className="text-xl font-bold text-white">-</div>
                  <div className="text-xs text-gray-400">系统成本</div>
                </div>
              </div>
            </div>
          </Card>
        )
      case "exam":
        return (
          <Card className="p-4 bg-gray-900 border-gray-800 mb-4">
            <div className="grid grid-cols-12 gap-3">
              {/* 左侧：总收入和净收入 */}
              <div className="col-span-12 md:col-span-4 border-b md:border-b-0 md:border-r border-gray-800 pb-3 md:pb-0 md:pr-3">
                <div className="mb-3">
                  <div className="text-sm text-gray-400 mb-1">考试收入</div>
                  <div className="text-2xl font-bold text-green-400">¥{currentStats.totalIncome.toFixed(2)}</div>
                </div>
                <div>
                  <div className="text-sm text-gray-400 mb-1">考试净收入</div>
                  <div className="text-2xl font-bold text-green-400">¥{currentStats.netIncome.toFixed(2)}</div>
                </div>
              </div>

              {/* 中间：订单统计 */}
              <div className="col-span-12 md:col-span-4 grid grid-cols-3 gap-2 text-center border-b md:border-b-0 md:border-r border-gray-800 py-3 md:py-0 md:pr-3">
                <div>
                  <div className="text-xl font-bold text-white">{currentStats.totalOrders}</div>
                  <div className="text-xs text-gray-400">订单数</div>
                </div>
                <div>
                  <div className="text-xl font-bold text-red-400">{currentStats.totalRefunds}</div>
                  <div className="text-xs text-gray-400">退单量</div>
                </div>
                <div>
                  <div className="text-xl font-bold text-green-400">
                    {currentStats.totalOrders - currentStats.totalRefunds}
                  </div>
                  <div className="text-xs text-gray-400">有效单</div>
                </div>
              </div>

              {/* 右侧：退单金额、分佣金额 */}
              <div className="col-span-12 md:col-span-4 grid grid-cols-3 gap-2 text-center pt-3 md:pt-0">
                <div>
                  <div className="text-xl font-bold text-red-400">¥{currentStats.totalRefundAmount.toFixed(2)}</div>
                  <div className="text-xs text-gray-400">退单额</div>
                </div>
                <div>
                  <div className="text-xl font-bold text-amber-400">¥{currentStats.totalCommission.toFixed(2)}</div>
                  <div className="text-xs text-gray-400">分佣额</div>
                </div>
                <div>
                  <div className="text-xl font-bold text-white">-</div>
                  <div className="text-xs text-gray-400">系统成本</div>
                </div>
              </div>
            </div>
          </Card>
        )
      case "agent":
        return (
          <Card className="p-4 bg-gray-900 border-gray-800 mb-4">
            <div className="grid grid-cols-12 gap-3">
              {/* 左侧：总收入和净收入 */}
              <div className="col-span-12 md:col-span-4 border-b md:border-b-0 md:border-r border-gray-800 pb-3 md:pb-0 md:pr-3">
                <div className="mb-3">
                  <div className="text-sm text-gray-400 mb-1">代理收入</div>
                  <div className="text-2xl font-bold text-purple-400">¥{currentStats.totalIncome.toFixed(2)}</div>
                </div>
                <div>
                  <div className="text-sm text-gray-400 mb-1">代理净收入</div>
                  <div className="text-2xl font-bold text-green-400">¥{currentStats.netIncome.toFixed(2)}</div>
                </div>
              </div>

              {/* 中间：订单统计 */}
              <div className="col-span-12 md:col-span-4 grid grid-cols-3 gap-2 text-center border-b md:border-b-0 md:border-r border-gray-800 py-3 md:py-0 md:pr-3">
                <div>
                  <div className="text-xl font-bold text-white">{currentStats.totalOrders}</div>
                  <div className="text-xs text-gray-400">订单数</div>
                </div>
                <div>
                  <div className="text-xl font-bold text-red-400">{currentStats.totalRefunds}</div>
                  <div className="text-xs text-gray-400">退单量</div>
                </div>
                <div>
                  <div className="text-xl font-bold text-green-400">
                    {currentStats.totalOrders - currentStats.totalRefunds}
                  </div>
                  <div className="text-xs text-gray-400">有效单</div>
                </div>
              </div>

              {/* 右侧：退单金额、分佣金额 */}
              <div className="col-span-12 md:col-span-4 grid grid-cols-3 gap-2 text-center pt-3 md:pt-0">
                <div>
                  <div className="text-xl font-bold text-red-400">¥{currentStats.totalRefundAmount.toFixed(2)}</div>
                  <div className="text-xs text-gray-400">退单额</div>
                </div>
                <div>
                  <div className="text-xl font-bold text-amber-400">¥{currentStats.totalCommission.toFixed(2)}</div>
                  <div className="text-xs text-gray-400">分佣额</div>
                </div>
                <div>
                  <div className="text-xl font-bold text-white">-</div>
                  <div className="text-xs text-gray-400">系统成本</div>
                </div>
              </div>
            </div>
          </Card>
        )
      default:
        return null
    }
  }

  // 所有交易的统计数据
  const allStats = calculateStats(transactions)

  return (
    <div className="min-h-screen bg-black text-white">
      {/* 顶部导航栏 */}
      <div className="sticky top-0 left-0 right-0 h-14 flex items-center px-4 bg-gray-900/80 backdrop-blur-md border-b border-gray-800 z-10">
        <Link href="/management" className="flex items-center text-gray-300">
          <ArrowLeft className="h-5 w-5 mr-2" />
          <span>返回</span>
        </Link>
        <h1 className="flex-1 text-center text-lg font-semibold text-white">资金明细</h1>
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
              <DateRangePicker />
            </div>
          ) : (
            <div className="flex mb-3">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 h-4 w-4" />
                <Input
                  placeholder="输入用户ID码..."
                  className="pl-9 bg-gray-900 border-gray-700 text-white placeholder:text-gray-500 focus-visible:ring-blue-500"
                />
              </div>
              <Button className="ml-2 bg-blue-600 hover:bg-blue-700">搜索</Button>
            </div>
          )}
        </div>

        {/* 总体统计信息 */}
        <Card className="p-4 bg-gray-900 border-gray-800 mb-4">
          <div className="grid grid-cols-12 gap-3">
            {/* 左侧：总收入和净收入（更醒目） */}
            <div className="col-span-12 md:col-span-4 border-b md:border-b-0 md:border-r border-gray-800 pb-3 md:pb-0 md:pr-3">
              <div className="mb-3">
                <div className="text-sm text-gray-400 mb-1">总收入</div>
                <div className="text-2xl font-bold text-blue-400">¥{allStats.totalIncome.toFixed(2)}</div>
              </div>
              <div>
                <div className="text-sm text-gray-400 mb-1">净收入</div>
                <div className="text-2xl font-bold text-green-400">¥{allStats.netIncome.toFixed(2)}</div>
              </div>
            </div>

            {/* 中间：订单统计 */}
            <div className="col-span-12 md:col-span-4 grid grid-cols-3 gap-2 text-center border-b md:border-b-0 md:border-r border-gray-800 py-3 md:py-0 md:pr-3">
              <div>
                <div className="text-xl font-bold text-white">{allStats.totalOrders}</div>
                <div className="text-xs text-gray-400">总订单</div>
              </div>
              <div>
                <div className="text-xl font-bold text-red-400">{allStats.totalRefunds}</div>
                <div className="text-xs text-gray-400">退单</div>
              </div>
              <div>
                <div className="text-xl font-bold text-green-400">{allStats.totalOrders - allStats.totalRefunds}</div>
                <div className="text-xs text-gray-400">有效单</div>
              </div>
            </div>

            {/* 右侧：退单金额、分佣金额、系统成本 */}
            <div className="col-span-12 md:col-span-4 grid grid-cols-3 gap-2 text-center pt-3 md:pt-0">
              <div>
                <div className="text-xl font-bold text-red-400">¥{allStats.totalRefundAmount.toFixed(2)}</div>
                <div className="text-xs text-gray-400">退单额</div>
              </div>
              <div>
                <div className="text-xl font-bold text-amber-400">¥{allStats.totalCommission.toFixed(2)}</div>
                <div className="text-xs text-gray-400">分佣额</div>
              </div>
              <div>
                <div className="text-xl font-bold text-red-400">¥{allStats.totalDeduction.toFixed(2)}</div>
                <div className="text-xs text-gray-400">系统成本</div>
              </div>
            </div>
          </div>
        </Card>

        {/* 交易类型标签页 - 完全重构为不使用TabsContent */}
        <div className="flex flex-col md:flex-row">
          <div className="w-full md:w-1/4 md:pr-2 mb-3 md:mb-0">
            <div className="w-full">
              <div className="flex md:flex-col h-auto bg-gray-900 border border-gray-800 rounded-md overflow-x-auto md:overflow-visible">
                <button
                  onClick={() => setSelectedTab("all")}
                  className={`text-center md:text-left px-3 py-3 flex-1 md:flex-auto whitespace-nowrap ${
                    selectedTab === "all" ? "text-blue-400" : "text-gray-300"
                  }`}
                >
                  全部
                </button>
                <button
                  onClick={() => setSelectedTab("vip")}
                  className={`text-center md:text-left px-3 py-3 flex-1 md:flex-auto whitespace-nowrap ${
                    selectedTab === "vip" ? "text-amber-400" : "text-gray-300"
                  }`}
                >
                  会员
                </button>
                <button
                  onClick={() => setSelectedTab("course")}
                  className={`text-center md:text-left px-3 py-3 flex-1 md:flex-auto whitespace-nowrap ${
                    selectedTab === "course" ? "text-blue-400" : "text-gray-300"
                  }`}
                >
                  课程
                </button>
                <button
                  onClick={() => setSelectedTab("exam")}
                  className={`text-center md:text-left px-3 py-3 flex-1 md:flex-auto whitespace-nowrap ${
                    selectedTab === "exam" ? "text-green-400" : "text-gray-300"
                  }`}
                >
                  考试
                </button>
                <button
                  onClick={() => setSelectedTab("agent")}
                  className={`text-center md:text-left px-3 py-3 flex-1 md:flex-auto whitespace-nowrap ${
                    selectedTab === "agent" ? "text-purple-400" : "text-gray-300"
                  }`}
                >
                  代理
                </button>
              </div>
            </div>
          </div>

          <div className="w-full md:w-3/4 md:pl-2">
            {/* 分类统计信息 */}
            {selectedTab !== "all" && renderCategoryStats()}

            {/* 交易列表 */}
            <div className="mt-0">
              <div className="space-y-0">{filteredTransactions().map(renderTransactionCard)}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
