"use client"

import { useState } from "react"
import {
  ArrowLeft,
  Settings,
  BookOpen,
  FileText,
  DollarSign,
  Users,
  Tag,
  Shield,
  ChevronRight,
  TrendingUp,
  BarChart3,
  UserPlus,
  MessageSquare,
  Library,
  Bell,
} from "lucide-react"
import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function ManagementCenter() {
  const [activeTab, setActiveTab] = useState("management")

  // 管理菜单项
  const managementMenus = [
    {
      id: "system",
      title: "系统配置",
      icon: <Settings className="h-5 w-5 text-blue-400" />,
      link: "/management/system",
    },
    {
      id: "knowledge",
      title: "知识库设定",
      icon: <Library className="h-5 w-5 text-emerald-400" />,
      link: "/management/knowledge",
      badge: null,
    },
    {
      id: "messages",
      title: "消息发送设置",
      icon: <Bell className="h-5 w-5 text-amber-400" />,
      link: "/management/messages",
      badge: 3, // 未读消息数量
    },
    {
      id: "courses",
      title: "课程设置",
      icon: <BookOpen className="h-5 w-5 text-green-400" />,
      link: "/management/courses",
    },
    {
      id: "exams",
      title: "考测设置",
      icon: <FileText className="h-5 w-5 text-yellow-400" />,
      link: "/management/exams",
    },
    {
      id: "ai",
      title: "AI助手设置",
      icon: <MessageSquare className="h-5 w-5 text-purple-400" />,
      link: "/management/ai-assistants",
    },
    {
      id: "pricing",
      title: "价格设置",
      icon: <DollarSign className="h-5 w-5 text-red-400" />,
      link: "/management/pricing",
    },
    {
      id: "upgrades",
      title: "指定升级",
      icon: <TrendingUp className="h-5 w-5 text-teal-400" />,
      link: "/management/upgrades",
    },
    {
      id: "agents",
      title: "代理设定",
      icon: <UserPlus className="h-5 w-5 text-cyan-400" />,
      link: "/management/agents/groups",
    },
    {
      id: "students",
      title: "会员列表",
      icon: <Users className="h-5 w-5 text-indigo-400" />,
      link: "/management/students",
    },
    {
      id: "coupons",
      title: "优惠券管理",
      icon: <Tag className="h-5 w-5 text-pink-400" />,
      link: "/management/coupons",
    },
    {
      id: "admins",
      title: "管理员设定",
      icon: <Shield className="h-5 w-5 text-gray-400" />,
      link: "/management/admins",
    },
  ]

  // 数据看板数据
  const dashboardData = {
    totalUsers: 12568,
    paidUsers: 3254,
    newUsersToday: 156,
    newUsersYesterday: 142,
    paymentsToday: 48,
    paymentsYesterday: 52,
    totalPayments: 4862,
    totalRevenue: 1256890,
    todayRevenue: 12568,
    yesterdayRevenue: 10892,
  }

  // 数据看板快捷入口
  const dashboardShortcuts = [
    {
      id: "members",
      title: "会员列表",
      icon: <Users className="h-5 w-5 text-indigo-400" />,
      link: "/management/students",
      description: "查看所有会员信息",
    },
    {
      id: "income",
      title: "资金明细",
      icon: <DollarSign className="h-5 w-5 text-green-400" />,
      link: "/management/income/details",
      description: "查看所有交易记录",
    },
  ]

  // 格式化数字
  const formatNumber = (num: number) => {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
  }

  return (
    <div className="min-h-screen bg-black text-white">
      {/* 顶部导航栏 */}
      <div className="sticky top-0 left-0 right-0 h-14 flex items-center px-4 bg-gray-900/80 backdrop-blur-md border-b border-gray-800 z-10">
        <Link href="/" className="flex items-center text-gray-300">
          <ArrowLeft className="h-5 w-5 mr-2" />
          <span>返回</span>
        </Link>
        <h1 className="flex-1 text-center text-lg font-semibold text-white">代理后台</h1>
      </div>

      <Tabs defaultValue="management" value={activeTab} onValueChange={setActiveTab} className="w-full">
        <div className="fixed bottom-0 left-0 right-0 z-10 bg-gray-900 border-t border-gray-800 shadow-lg p-4">
          <TabsList className="grid w-full grid-cols-2 bg-gray-900">
            <TabsTrigger value="management" className="data-[state=active]:text-blue-400">
              <Settings className="h-4 w-4 mr-2" />
              管理设置
            </TabsTrigger>
            <TabsTrigger value="dashboard" className="data-[state=active]:text-blue-400">
              <BarChart3 className="h-4 w-4 mr-2" />
              数据看板
            </TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="dashboard" className="p-4 pb-16">
          {/* 快捷入口 */}
          <div className="grid grid-cols-2 gap-3 mb-6">
            {dashboardShortcuts.map((shortcut) => (
              <Link href={shortcut.link} key={shortcut.id}>
                <Card className="p-3 bg-gray-900 border-gray-800 h-full">
                  <div className="flex items-center">
                    <div className="w-10 h-10 rounded-lg flex items-center justify-center bg-gray-800 mr-3">
                      {shortcut.icon}
                    </div>
                    <div>
                      <h3 className="font-medium text-white">{shortcut.title}</h3>
                      <p className="text-xs text-gray-400">{shortcut.description}</p>
                    </div>
                  </div>
                </Card>
              </Link>
            ))}
          </div>

          {/* 数据概览卡片 */}
          <div className="grid grid-cols-2 gap-3 mb-6">
            <Card className="p-3 bg-gray-900 border-gray-800">
              <div className="text-xs text-gray-400 mb-1">用户总数</div>
              <div className="text-xl font-bold text-white">{formatNumber(dashboardData.totalUsers)}</div>
            </Card>
            <Card className="p-3 bg-gray-900 border-gray-800">
              <div className="text-xs text-gray-400 mb-1">付费会员总数</div>
              <div className="text-xl font-bold text-blue-400">{formatNumber(dashboardData.paidUsers)}</div>
            </Card>
            <Card className="p-3 bg-gray-900 border-gray-800">
              <div className="text-xs text-gray-400 mb-1">今日新增</div>
              <div className="text-xl font-bold text-green-400">{formatNumber(dashboardData.newUsersToday)}</div>
            </Card>
            <Card className="p-3 bg-gray-900 border-gray-800">
              <div className="text-xs text-gray-400 mb-1">昨日新增</div>
              <div className="text-xl font-bold text-white">{formatNumber(dashboardData.newUsersYesterday)}</div>
            </Card>
            <Card className="p-3 bg-gray-900 border-gray-800">
              <div className="text-xs text-gray-400 mb-1">今日付款</div>
              <div className="text-xl font-bold text-green-400">{formatNumber(dashboardData.paymentsToday)}</div>
            </Card>
            <Card className="p-3 bg-gray-900 border-gray-800">
              <div className="text-xs text-gray-400 mb-1">昨日付款</div>
              <div className="text-xl font-bold text-white">{formatNumber(dashboardData.paymentsYesterday)}</div>
            </Card>
          </div>

          {/* 收入数据 */}
          <div className="grid grid-cols-2 gap-3 mb-6">
            <Card className="p-3 bg-gray-900 border-gray-800">
              <div className="text-xs text-gray-400 mb-1">今日收入(元)</div>
              <div className="text-xl font-bold text-green-400">{formatNumber(dashboardData.todayRevenue)}</div>
            </Card>
            <Card className="p-3 bg-gray-900 border-gray-800">
              <div className="text-xs text-gray-400 mb-1">昨日收入(元)</div>
              <div className="text-xl font-bold text-white">{formatNumber(dashboardData.yesterdayRevenue)}</div>
            </Card>
          </div>

          {/* 累计数据 */}
          <div className="grid grid-cols-2 gap-3 mb-6">
            <Card className="p-3 bg-gray-900 border-gray-800">
              <div className="text-xs text-gray-400 mb-1">累计付款笔数</div>
              <div className="text-xl font-bold text-amber-400">{formatNumber(dashboardData.totalPayments)}</div>
            </Card>
            <Card className="p-3 bg-gray-900 border-gray-800">
              <div className="text-xs text-gray-400 mb-1">累计收入(元)</div>
              <div className="text-xl font-bold text-red-400">{formatNumber(dashboardData.totalRevenue)}</div>
            </Card>
          </div>

          {/* 三大收入模块 */}
          <div className="space-y-6">
            {/* 课程收入 */}
            <Card className="bg-gray-900 border-gray-800">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-lg font-semibold text-white">课程收入</CardTitle>
                <Link href="/management/income/courses" className="text-xs text-blue-400">
                  查看详情
                </Link>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <div className="text-sm text-gray-300">今日收入</div>
                    <div className="font-medium text-green-400">¥{formatNumber(8650)}</div>
                  </div>
                  <div className="flex justify-between items-center">
                    <div className="text-sm text-gray-300">本周收入</div>
                    <div className="font-medium text-white">¥{formatNumber(42680)}</div>
                  </div>
                  <div className="flex justify-between items-center">
                    <div className="text-sm text-gray-300">本月收入</div>
                    <div className="font-medium text-white">¥{formatNumber(156890)}</div>
                  </div>
                  <div className="w-full h-2 bg-gray-800 rounded-full overflow-hidden mt-3">
                    <div className="h-full bg-blue-500 rounded-full" style={{ width: "65%" }}></div>
                  </div>
                  <div className="flex justify-between text-xs text-gray-400">
                    <span>月目标完成率: 65%</span>
                    <span>目标: ¥{formatNumber(240000)}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* 考试收入 */}
            <Card className="bg-gray-900 border-gray-800">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-lg font-semibold text-white">考试收入</CardTitle>
                <Link href="/management/income/exams" className="text-xs text-blue-400">
                  查看详情
                </Link>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <div className="text-sm text-gray-300">今日收入</div>
                    <div className="font-medium text-green-400">¥{formatNumber(3280)}</div>
                  </div>
                  <div className="flex justify-between items-center">
                    <div className="text-sm text-gray-300">本周收入</div>
                    <div className="font-medium text-white">¥{formatNumber(18450)}</div>
                  </div>
                  <div className="flex justify-between items-center">
                    <div className="text-sm text-gray-300">本月收入</div>
                    <div className="font-medium text-white">¥{formatNumber(72340)}</div>
                  </div>
                  <div className="w-full h-2 bg-gray-800 rounded-full overflow-hidden mt-3">
                    <div className="h-full bg-yellow-500 rounded-full" style={{ width: "48%" }}></div>
                  </div>
                  <div className="flex justify-between text-xs text-gray-400">
                    <span>月目标完成率: 48%</span>
                    <span>目标: ¥{formatNumber(150000)}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* 会员收入 */}
            <Card className="bg-gray-900 border-gray-800">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-lg font-semibold text-white">会员收入</CardTitle>
                <Link href="/management/income/memberships" className="text-xs text-blue-400">
                  查看详情
                </Link>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <div className="text-sm text-gray-300">今日收入</div>
                    <div className="font-medium text-green-400">¥{formatNumber(5980)}</div>
                  </div>
                  <div className="flex justify-between items-center">
                    <div className="text-sm text-gray-300">本周收入</div>
                    <div className="font-medium text-white">¥{formatNumber(29450)}</div>
                  </div>
                  <div className="flex justify-between items-center">
                    <div className="text-sm text-gray-300">本月收入</div>
                    <div className="font-medium text-white">¥{formatNumber(98760)}</div>
                  </div>
                  <div className="w-full h-2 bg-gray-800 rounded-full overflow-hidden mt-3">
                    <div className="h-full bg-purple-500 rounded-full" style={{ width: "82%" }}></div>
                  </div>
                  <div className="flex justify-between text-xs text-gray-400">
                    <span>月目标完成率: 82%</span>
                    <span>目标: ¥{formatNumber(120000)}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* 付费转化率 */}
          <Card className="p-4 bg-gray-900 border-gray-800 mb-6 mt-6">
            <h3 className="font-medium text-white mb-3">付费转化率</h3>
            <div className="w-full h-2 bg-gray-800 rounded-full overflow-hidden mb-2">
              <div
                className="h-full bg-blue-500"
                style={{ width: `${(dashboardData.paidUsers / dashboardData.totalUsers) * 100}%` }}
              ></div>
            </div>
            <div className="flex justify-between text-xs text-gray-400">
              <span>总转化率: {((dashboardData.paidUsers / dashboardData.totalUsers) * 100).toFixed(2)}%</span>
              <span>
                {dashboardData.paidUsers}/{dashboardData.totalUsers}
              </span>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="management" className="p-4 pb-16">
          <div className="grid gap-3">
            {managementMenus.map((menu) => (
              <Link href={menu.link} key={menu.id}>
                <Card className="p-4 bg-gray-900 border-gray-800 flex items-center">
                  <div className="w-10 h-10 rounded-lg flex items-center justify-center bg-gray-800 mr-3">
                    {menu.icon}
                  </div>
                  <div className="flex-1">
                    <h3 className="font-medium text-white">{menu.title}</h3>
                  </div>
                  <div className="flex items-center">
                    {menu.badge && (
                      <div className="bg-red-500 text-white text-xs font-medium rounded-full w-5 h-5 flex items-center justify-center mr-2">
                        {menu.badge}
                      </div>
                    )}
                    <ChevronRight className="h-5 w-5 text-gray-500" />
                  </div>
                </Card>
              </Link>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
