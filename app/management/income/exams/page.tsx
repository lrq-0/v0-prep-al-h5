"use client"

import { useState } from "react"
import { ArrowLeft, Download, Search, Filter } from "lucide-react"
import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { DatePickerWithRange } from "@/components/date-range-picker"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function ExamIncomePage() {
  const [dateRange, setDateRange] = useState({ from: new Date(2024, 3, 1), to: new Date() })
  const [searchQuery, setSearchQuery] = useState("")
  const [examType, setExamType] = useState("all")

  // 模拟收入数据
  const incomeData = {
    totalIncome: 72340,
    todayIncome: 3280,
    weekIncome: 18450,
    monthIncome: 72340,
    targetCompletion: 48,
    target: 150000,
  }

  // 模拟交易记录
  const transactions = [
    {
      id: "t1",
      date: "2024-04-25",
      time: "15:42:18",
      exam: "数据分析师认证考试",
      type: "证书考试",
      student: "李小明",
      amount: 199,
      paymentMethod: "微信支付",
      status: "已完成",
    },
    {
      id: "t2",
      date: "2024-04-25",
      time: "13:25:42",
      exam: "Python编程能力评估",
      type: "模拟考试",
      student: "王小红",
      amount: 99,
      paymentMethod: "支付宝",
      status: "已完成",
    },
    {
      id: "t3",
      date: "2024-04-25",
      time: "11:18:36",
      exam: "全国大学生人工智能创新大赛",
      type: "竞赛活动",
      student: "张小华",
      amount: 50,
      paymentMethod: "微信支付",
      status: "已完成",
    },
    {
      id: "t4",
      date: "2024-04-24",
      time: "19:35:12",
      exam: "工信部人工智能提示词工程师（高级）证书考试",
      type: "证书考试",
      student: "刘小军",
      amount: 299,
      paymentMethod: "银行卡",
      status: "已完成",
    },
    {
      id: "t5",
      date: "2024-04-24",
      time: "17:22:08",
      exam: "Web前端开发模拟测试",
      type: "模拟考试",
      student: "赵小燕",
      amount: 99,
      paymentMethod: "微信支付",
      status: "已完成",
    },
    {
      id: "t6",
      date: "2024-04-24",
      time: "15:10:55",
      exam: "区块链技术应用大赛",
      type: "竞赛活动",
      student: "孙小亮",
      amount: 100,
      paymentMethod: "支付宝",
      status: "已完成",
    },
    {
      id: "t7",
      date: "2024-04-23",
      time: "21:05:33",
      exam: "数据分析师认证考试",
      type: "证书考试",
      student: "周小强",
      amount: 199,
      paymentMethod: "微信支付",
      status: "已完成",
    },
    {
      id: "t8",
      date: "2024-04-23",
      time: "16:48:27",
      exam: "Python编程能力评估",
      type: "模拟考试",
      student: "吴小敏",
      amount: 99,
      paymentMethod: "支付宝",
      status: "已完成",
    },
  ]

  // 过滤交易记录
  const filteredTransactions = transactions.filter((transaction) => {
    const matchesSearch =
      transaction.exam.toLowerCase().includes(searchQuery.toLowerCase()) ||
      transaction.student.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesType =
      examType === "all" ||
      transaction.type.includes(examType === "mock" ? "模拟" : examType === "certificate" ? "证书" : "竞赛")

    // 日期过滤
    const transactionDate = new Date(transaction.date)
    const isInDateRange =
      (!dateRange.from || transactionDate >= dateRange.from) && (!dateRange.to || transactionDate <= dateRange.to)

    return matchesSearch && matchesType && isInDateRange
  })

  // 计算过滤后的总收入
  const filteredTotalIncome = filteredTransactions.reduce((sum, transaction) => sum + transaction.amount, 0)

  // 格式化数字
  const formatNumber = (num) => {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
  }

  return (
    <div className="min-h-screen bg-black text-white">
      {/* 顶部导航栏 */}
      <div className="sticky top-0 left-0 right-0 h-14 flex items-center px-4 bg-gray-900/80 backdrop-blur-md border-b border-gray-800 z-10">
        <Link href="/management" className="flex items-center text-gray-300">
          <ArrowLeft className="h-5 w-5 mr-2" />
          <span>返回</span>
        </Link>
        <h1 className="flex-1 text-center text-lg font-semibold text-white">考试收入</h1>
      </div>

      <div className="p-4 pb-16">
        {/* 收入概览 */}
        <Card className="bg-gray-900 border-gray-800 mb-6">
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-white">收入概览</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div className="space-y-1">
                <div className="text-sm text-gray-400">今日收入</div>
                <div className="text-xl font-bold text-green-400">¥{formatNumber(incomeData.todayIncome)}</div>
              </div>
              <div className="space-y-1">
                <div className="text-sm text-gray-400">本周收入</div>
                <div className="text-xl font-bold text-white">¥{formatNumber(incomeData.weekIncome)}</div>
              </div>
              <div className="space-y-1">
                <div className="text-sm text-gray-400">本月收入</div>
                <div className="text-xl font-bold text-white">¥{formatNumber(incomeData.monthIncome)}</div>
              </div>
              <div className="space-y-1">
                <div className="text-sm text-gray-400">筛选收入</div>
                <div className="text-xl font-bold text-blue-400">¥{formatNumber(filteredTotalIncome)}</div>
              </div>
            </div>

            <div className="w-full h-2 bg-gray-800 rounded-full overflow-hidden mt-3">
              <div
                className="h-full bg-yellow-500 rounded-full"
                style={{ width: `${incomeData.targetCompletion}%` }}
              ></div>
            </div>
            <div className="flex justify-between text-xs text-gray-400 mt-1">
              <span>月目标完成率: {incomeData.targetCompletion}%</span>
              <span>目标: ¥{formatNumber(incomeData.target)}</span>
            </div>
          </CardContent>
        </Card>

        {/* 筛选工具 */}
        <div className="space-y-4 mb-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
              <Input
                placeholder="搜索考试名称或学员..."
                className="pl-10 bg-gray-800 border-gray-700 text-white"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="flex gap-2">
              <Select value={examType} onValueChange={setExamType}>
                <SelectTrigger className="w-[140px] bg-gray-800 border-gray-700 text-white">
                  <SelectValue placeholder="考试类型" />
                </SelectTrigger>
                <SelectContent className="bg-gray-800 border-gray-700 text-white">
                  <SelectItem value="all">全部类型</SelectItem>
                  <SelectItem value="mock">模拟考试</SelectItem>
                  <SelectItem value="certificate">证书考试</SelectItem>
                  <SelectItem value="competition">竞赛活动</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="outline" className="border-gray-700 text-gray-300">
                <Filter className="h-4 w-4 mr-2" />
                筛选
              </Button>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <div className="flex items-center">
              <Label className="text-gray-300 mr-2">日期范围</Label>
              <DatePickerWithRange dateRange={dateRange} setDateRange={setDateRange} />
            </div>
            <Button variant="secondary" className="ml-auto">
              <Download className="h-4 w-4 mr-2" />
              导出数据
            </Button>
          </div>
        </div>

        {/* 交易记录表格 */}
        <Card className="bg-gray-900 border-gray-800">
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-white">交易记录</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="hover:bg-gray-800 border-gray-700">
                    <TableHead className="text-gray-300">日期</TableHead>
                    <TableHead className="text-gray-300">考试名称</TableHead>
                    <TableHead className="text-gray-300">类型</TableHead>
                    <TableHead className="text-gray-300">学员</TableHead>
                    <TableHead className="text-gray-300">金额</TableHead>
                    <TableHead className="text-gray-300">支付方式</TableHead>
                    <TableHead className="text-gray-300">状态</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredTransactions.length === 0 ? (
                    <TableRow className="hover:bg-gray-800 border-gray-700">
                      <TableCell colSpan={7} className="text-center py-8 text-gray-400">
                        没有找到匹配的交易记录
                      </TableCell>
                    </TableRow>
                  ) : (
                    filteredTransactions.map((transaction) => (
                      <TableRow key={transaction.id} className="hover:bg-gray-750 border-gray-700">
                        <TableCell>
                          <div className="text-white">{transaction.date}</div>
                          <div className="text-xs text-gray-400">{transaction.time}</div>
                        </TableCell>
                        <TableCell className="font-medium text-white">{transaction.exam}</TableCell>
                        <TableCell>
                          <Badge
                            variant="outline"
                            className={
                              transaction.type.includes("模拟")
                                ? "bg-blue-900 text-blue-300 border-blue-700"
                                : transaction.type.includes("证书")
                                  ? "bg-green-900 text-green-300 border-green-700"
                                  : "bg-purple-900 text-purple-300 border-purple-700"
                            }
                          >
                            {transaction.type}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-gray-300">{transaction.student}</TableCell>
                        <TableCell className="font-medium text-green-400">¥{transaction.amount}</TableCell>
                        <TableCell className="text-gray-300">{transaction.paymentMethod}</TableCell>
                        <TableCell>
                          <Badge variant="outline" className="bg-green-900 text-green-300 border-green-700">
                            {transaction.status}
                          </Badge>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
