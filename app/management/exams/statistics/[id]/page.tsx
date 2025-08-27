"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ArrowLeft, Download, Users, Award, Clock, BarChart3, PieChart, LineChart } from "lucide-react"
import Link from "next/link"
import { BadgeIcon as Certificate } from "lucide-react"

export default function ExamStatistics({ params }) {
  const { id } = params
  const [isLoading, setIsLoading] = useState(true)
  const [examData, setExamData] = useState(null)
  const [timeRange, setTimeRange] = useState("month")

  // 模拟加载考试数据
  useEffect(() => {
    // 模拟API请求延迟
    const timer = setTimeout(() => {
      // 根据ID加载不同的模拟数据
      if (id === "e1") {
        setExamData({
          title: "Python编程能力评估",
          type: "mock",
          totalParticipants: 128,
          completionRate: 87,
          passRate: 72,
          averageScore: 76.5,
          averageTime: 65,
          certificatesIssued: 0,
          monthlyData: {
            participants: [12, 18, 24, 32, 42, 0, 0, 0, 0, 0, 0, 0],
            scores: [72, 75, 78, 76, 79, 0, 0, 0, 0, 0, 0, 0],
            time: [68, 66, 64, 65, 62, 0, 0, 0, 0, 0, 0, 0],
          },
          questionStats: [
            { id: 1, correct: 85, incorrect: 43 },
            { id: 2, correct: 110, incorrect: 18 },
            { id: 3, correct: 65, incorrect: 63 },
            { id: 4, correct: 92, incorrect: 36 },
            { id: 5, correct: 78, incorrect: 50 },
          ],
        })
      } else if (id === "e2") {
        setExamData({
          title: "数据分析师认证考试",
          type: "certificate",
          totalParticipants: 56,
          completionRate: 92,
          passRate: 68,
          averageScore: 74.2,
          averageTime: 95,
          certificatesIssued: 38,
          monthlyData: {
            participants: [8, 12, 15, 21, 0, 0, 0, 0, 0, 0, 0, 0],
            scores: [73, 75, 72, 76, 0, 0, 0, 0, 0, 0, 0, 0],
            time: [98, 96, 94, 92, 0, 0, 0, 0, 0, 0, 0, 0],
          },
          questionStats: [
            { id: 1, correct: 42, incorrect: 14 },
            { id: 2, correct: 38, incorrect: 18 },
            { id: 3, correct: 45, incorrect: 11 },
            { id: 4, correct: 32, incorrect: 24 },
            { id: 5, correct: 36, incorrect: 20 },
          ],
        })
      } else {
        setExamData({
          title: "AI基础知识测试",
          type: "mock",
          totalParticipants: 0,
          completionRate: 0,
          passRate: 0,
          averageScore: 0,
          averageTime: 0,
          certificatesIssued: 0,
          monthlyData: {
            participants: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            scores: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            time: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
          },
          questionStats: [],
        })
      }

      setIsLoading(false)
    }, 1000)

    return () => clearTimeout(timer)
  }, [id])

  // 获取月份标签
  const getMonthLabels = () => {
    const months = ["1月", "2月", "3月", "4月", "5月", "6月", "7月", "8月", "9月", "10月", "11月", "12月"]
    const currentMonth = new Date().getMonth()

    // 返回最近5个月的标签
    return months.slice(currentMonth - 4, currentMonth + 1)
  }

  if (isLoading) {
    return (
      <div className="container mx-auto p-4 max-w-6xl">
        <div className="animate-pulse space-y-6">
          <div className="h-8 bg-gray-200 rounded w-1/4"></div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="h-32 bg-gray-200 rounded"></div>
            ))}
          </div>
          <div className="h-64 bg-gray-200 rounded"></div>
          <div className="h-64 bg-gray-200 rounded"></div>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto p-4 max-w-6xl">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center">
          <Link href="/management/exams">
            <Button variant="ghost" size="sm">
              <ArrowLeft className="mr-2 h-4 w-4" />
              返回
            </Button>
          </Link>
          <h1 className="text-2xl font-bold ml-2">{examData.title} - 数据统计</h1>
        </div>
        <Button variant="outline" size="sm">
          <Download className="mr-2 h-4 w-4" />
          导出数据
        </Button>
      </div>

      {/* 时间范围选择 */}
      <div className="flex justify-end mb-6">
        <Select value={timeRange} onValueChange={setTimeRange}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="选择时间范围" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="week">最近一周</SelectItem>
            <SelectItem value="month">最近一个月</SelectItem>
            <SelectItem value="quarter">最近三个月</SelectItem>
            <SelectItem value="year">最近一年</SelectItem>
            <SelectItem value="all">全部时间</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* 概览卡片 */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">参与人数</CardTitle>
            <Users className="h-4 w-4 text-gray-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{examData.totalParticipants}</div>
            <p className="text-xs text-gray-500">完成率: {examData.completionRate}%</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">通过率</CardTitle>
            <Award className="h-4 w-4 text-gray-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{examData.passRate}%</div>
            <p className="text-xs text-gray-500">平均分: {examData.averageScore}分</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">平均用时</CardTitle>
            <Clock className="h-4 w-4 text-gray-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{examData.averageTime}分钟</div>
            <p className="text-xs text-gray-500">最短: {Math.max(examData.averageTime - 15, 0)}分钟</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">证书发放</CardTitle>
            <Certificate className="h-4 w-4 text-gray-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{examData.certificatesIssued}</div>
            <p className="text-xs text-gray-500">
              发放率:{" "}
              {examData.totalParticipants > 0
                ? Math.round((examData.certificatesIssued / examData.totalParticipants) * 100)
                : 0}
              %
            </p>
          </CardContent>
        </Card>
      </div>

      {/* 图表区域 */}
      <Tabs defaultValue="participants" className="w-full">
        <TabsList className="grid w-full grid-cols-3 mb-6">
          <TabsTrigger value="participants" className="flex items-center">
            <BarChart3 className="mr-2 h-4 w-4" />
            参与人数趋势
          </TabsTrigger>
          <TabsTrigger value="scores" className="flex items-center">
            <LineChart className="mr-2 h-4 w-4" />
            分数分布
          </TabsTrigger>
          <TabsTrigger value="questions" className="flex items-center">
            <PieChart className="mr-2 h-4 w-4" />
            题目分析
          </TabsTrigger>
        </TabsList>

        {/* 参与人数趋势 */}
        <TabsContent value="participants">
          <Card>
            <CardHeader>
              <CardTitle>参与人数趋势</CardTitle>
              <CardDescription>显示不同时间段的考试参与人数变化</CardDescription>
            </CardHeader>
            <CardContent className="h-80">
              {examData.totalParticipants > 0 ? (
                <div className="h-full w-full flex flex-col">
                  <div className="flex-1 relative">
                    {/* 模拟柱状图 */}
                    <div className="absolute inset-0 flex items-end justify-around">
                      {getMonthLabels().map((month, index) => {
                        const value = examData.monthlyData.participants[index]
                        const height =
                          value > 0
                            ? (value / Math.max(...examData.monthlyData.participants.filter((v) => v > 0))) * 100
                            : 0

                        return (
                          <div key={index} className="flex flex-col items-center w-1/6">
                            <div
                              className="w-16 bg-blue-500 rounded-t-md transition-all duration-500"
                              style={{ height: `${height}%` }}
                            ></div>
                            <div className="text-xs mt-2">{value}</div>
                          </div>
                        )
                      })}
                    </div>
                  </div>
                  <div className="h-8 flex justify-around items-center border-t">
                    {getMonthLabels().map((month, index) => (
                      <div key={index} className="text-xs text-gray-500">
                        {month}
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="h-full flex items-center justify-center">
                  <p className="text-gray-500">暂无数据</p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* 分数分布 */}
        <TabsContent value="scores">
          <Card>
            <CardHeader>
              <CardTitle>分数分布</CardTitle>
              <CardDescription>显示考试分数的分布情况</CardDescription>
            </CardHeader>
            <CardContent className="h-80">
              {examData.totalParticipants > 0 ? (
                <div className="h-full w-full flex flex-col">
                  <div className="flex-1 relative">
                    {/* 模拟折线图 */}
                    <div className="absolute inset-0 flex items-end">
                      <svg className="w-full h-full" viewBox="0 0 500 300" preserveAspectRatio="none">
                        <polyline
                          points={`
                            0,${300 - (examData.monthlyData.scores[0] / 100) * 300}
                            100,${300 - (examData.monthlyData.scores[1] / 100) * 300}
                            200,${300 - (examData.monthlyData.scores[2] / 100) * 300}
                            300,${300 - (examData.monthlyData.scores[3] / 100) * 300}
                            400,${300 - (examData.monthlyData.scores[4] / 100) * 300}
                          `}
                          fill="none"
                          stroke="#10b981"
                          strokeWidth="3"
                        />
                        <g>
                          <circle cx="0" cy={300 - (examData.monthlyData.scores[0] / 100) * 300} r="4" fill="#10b981" />
                          <circle
                            cx="100"
                            cy={300 - (examData.monthlyData.scores[1] / 100) * 300}
                            r="4"
                            fill="#10b981"
                          />
                          <circle
                            cx="200"
                            cy={300 - (examData.monthlyData.scores[2] / 100) * 300}
                            r="4"
                            fill="#10b981"
                          />
                          <circle
                            cx="300"
                            cy={300 - (examData.monthlyData.scores[3] / 100) * 300}
                            r="4"
                            fill="#10b981"
                          />
                          <circle
                            cx="400"
                            cy={300 - (examData.monthlyData.scores[4] / 100) * 300}
                            r="4"
                            fill="#10b981"
                          />
                        </g>
                      </svg>
                    </div>
                  </div>
                  <div className="h-8 flex justify-around items-center border-t">
                    {getMonthLabels().map((month, index) => (
                      <div key={index} className="text-xs text-gray-500">
                        <div>{month}</div>
                        <div className="font-medium">{examData.monthlyData.scores[index] || "-"}</div>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="h-full flex items-center justify-center">
                  <p className="text-gray-500">暂无数据</p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* 题目分析 */}
        <TabsContent value="questions">
          <Card>
            <CardHeader>
              <CardTitle>题目分析</CardTitle>
              <CardDescription>显示各题目的正确率和错误率</CardDescription>
            </CardHeader>
            <CardContent>
              {examData.questionStats.length > 0 ? (
                <div className="space-y-6">
                  {examData.questionStats.map((question, index) => {
                    const total = question.correct + question.incorrect
                    const correctPercentage = Math.round((question.correct / total) * 100)
                    const incorrectPercentage = 100 - correctPercentage

                    return (
                      <div key={index} className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>题目 {question.id}</span>
                          <span>{correctPercentage}% 正确</span>
                        </div>
                        <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-green-500 rounded-full"
                            style={{ width: `${correctPercentage}%` }}
                          ></div>
                        </div>
                        <div className="flex justify-between text-xs text-gray-500">
                          <span>正确: {question.correct}人</span>
                          <span>错误: {question.incorrect}人</span>
                        </div>
                      </div>
                    )
                  })}
                </div>
              ) : (
                <div className="h-60 flex items-center justify-center">
                  <p className="text-gray-500">暂无数据</p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
