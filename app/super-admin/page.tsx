"use client"

import { useState } from "react"
import Link from "next/link"
import {
  BarChart3,
  BookOpen,
  ClipboardCheck,
  FileText,
  Globe,
  LayoutDashboard,
  Settings,
  Shield,
  Users,
  Wallet,
  Bot,
  BookCheck,
  Server,
  LineChart,
  AlertTriangle,
  BadgeCheck,
  Sun,
  Moon,
} from "lucide-react"
import { Card } from "@/components/ui/card"

export default function SuperAdminPage() {
  const [activeTab, setActiveTab] = useState("dashboard")
  const [isDarkMode, setIsDarkMode] = useState(true)

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode)
  }

  const themeClasses = {
    container: isDarkMode ? "bg-gray-900 text-white" : "bg-gray-50 text-gray-900",
    card: isDarkMode ? "bg-gray-800" : "bg-white border border-gray-200",
    cardSecondary: isDarkMode ? "bg-gray-700 border-gray-600" : "bg-gray-50 border border-gray-200",
    cardTertiary: isDarkMode ? "bg-gray-800" : "bg-white",
    button: isDarkMode ? "hover:bg-gray-700" : "hover:bg-gray-100",
    activeButton: isDarkMode ? "bg-gray-700" : "bg-gray-200",
    text: isDarkMode ? "text-white" : "text-gray-900",
    textSecondary: isDarkMode ? "text-gray-300" : "text-gray-600",
  }

  const menuItems = [
    {
      id: "dashboard",
      label: "仪表盘",
      icon: <LayoutDashboard className="w-5 h-5" />,
      color: "bg-blue-100 text-blue-700",
    },
    {
      id: "content",
      label: "内容管理",
      icon: <FileText className="w-5 h-5" />,
      color: "bg-purple-100 text-purple-700",
    },
    {
      id: "agents",
      label: "代理商管理",
      icon: <Globe className="w-5 h-5" />,
      color: "bg-green-100 text-green-700",
    },
    {
      id: "users",
      label: "用户管理",
      icon: <Users className="w-5 h-5" />,
      color: "bg-amber-100 text-amber-700",
    },
    {
      id: "system",
      label: "系统管理",
      icon: <Server className="w-5 h-5" />,
      color: "bg-red-100 text-red-700",
    },
    {
      id: "analytics",
      label: "数据分析",
      icon: <LineChart className="w-5 h-5" />,
      color: "bg-indigo-100 text-indigo-700",
    },
    {
      id: "settings",
      label: "系统设置",
      icon: <Settings className="w-5 h-5" />,
      color: "bg-gray-100 text-gray-700",
    },
  ]

  const subMenus = {
    content: [
      {
        id: "courses",
        label: "课程管理",
        icon: <BookOpen className="w-4 h-4" />,
        href: "/super-admin/content/courses",
      },
      {
        id: "exams",
        label: "考试管理",
        icon: <ClipboardCheck className="w-4 h-4" />,
        href: "/super-admin/content/exams",
      },
      {
        id: "ai-assistants",
        label: "AI助手管理",
        icon: <Bot className="w-4 h-4" />,
        href: "/super-admin/content/ai-assistants",
      },
      {
        id: "knowledge",
        label: "知识库管理",
        icon: <BookCheck className="w-4 h-4" />,
        href: "/super-admin/content/knowledge",
      },
    ],
    agents: [
      {
        id: "accounts",
        label: "代理商账户",
        icon: <Shield className="w-4 h-4" />,
        href: "/super-admin/agents/accounts",
      },
      { id: "data", label: "代理商数据", icon: <BarChart3 className="w-4 h-4" />, href: "/super-admin/agents/data" },
      { id: "finance", label: "代理商财务", icon: <Wallet className="w-4 h-4" />, href: "/super-admin/agents/finance" },
    ],
    users: [
      { id: "members", label: "会员管理", icon: <Users className="w-4 h-4" />, href: "/super-admin/users/members" },
      { id: "refunds", label: "退费管理", icon: <Wallet className="w-4 h-4" />, href: "/super-admin/users/refunds" },
    ],
    system: [
      { id: "config", label: "系统配置", icon: <Settings className="w-4 h-4" />, href: "/super-admin/system/config" },
      {
        id: "monitor",
        label: "性能监控",
        icon: <AlertTriangle className="w-4 h-4" />,
        href: "/super-admin/system/monitor",
      },
      {
        id: "security",
        label: "安全管理",
        icon: <BadgeCheck className="w-4 h-4" />,
        href: "/super-admin/system/security",
      },
    ],
    analytics: [
      {
        id: "business",
        label: "业务分析",
        icon: <BarChart3 className="w-4 h-4" />,
        href: "/super-admin/analytics/business",
      },
      {
        id: "finance",
        label: "财务分析",
        icon: <Wallet className="w-4 h-4" />,
        href: "/super-admin/analytics/finance",
      },
      {
        id: "reports",
        label: "报表中心",
        icon: <FileText className="w-4 h-4" />,
        href: "/super-admin/analytics/reports",
      },
    ],
  }

  return (
    <div className={`container mx-auto p-4 min-h-screen ${themeClasses.container}`}>
      <div className="flex items-center justify-between mb-6">
        <h1 className={`text-2xl font-bold flex items-center ${themeClasses.text}`}>
          <Shield className="mr-2 h-6 w-6" />
          超级管理员控制台
        </h1>
        <button
          onClick={toggleTheme}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
            isDarkMode ? "bg-gray-800 hover:bg-gray-700" : "bg-white hover:bg-gray-100 border border-gray-200"
          }`}
        >
          {isDarkMode ? (
            <>
              <Sun className="w-4 h-4" />
              <span className="text-sm">Light</span>
            </>
          ) : (
            <>
              <Moon className="w-4 h-4" />
              <span className="text-sm">Dark</span>
            </>
          )}
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {/* 左侧导航 */}
        <div className="md:col-span-1">
          <div className={`bg-gray-800 rounded-lg p-4 ${themeClasses.card}`}>
            <div className="space-y-2">
              {menuItems.map((item) => (
                <button
                  key={item.id}
                  className={`flex items-center w-full p-3 rounded-lg transition-colors ${
                    activeTab === item.id ? themeClasses.activeButton : themeClasses.button
                  }`}
                  onClick={() => setActiveTab(item.id)}
                >
                  <div className={`p-2 rounded-md mr-3 ${item.color}`}>{item.icon}</div>
                  <span className={`font-medium ${themeClasses.text}`}>{item.label}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* 右侧内容 */}
        <div className="md:col-span-3">
          <div className={`bg-gray-800 rounded-lg p-6 ${themeClasses.card}`}>
            {activeTab === "dashboard" && (
              <div>
                <h2 className={`text-xl font-bold mb-4 ${themeClasses.text}`}>系统概览</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                  <Card className="bg-blue-900 border-blue-700 p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-blue-300 text-sm">总代理商</p>
                        <h3 className="text-2xl font-bold">128</h3>
                      </div>
                      <Globe className="h-8 w-8 text-blue-400" />
                    </div>
                  </Card>
                  <Card className="bg-purple-900 border-purple-700 p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-purple-300 text-sm">总会员数</p>
                        <h3 className="text-2xl font-bold">24,583</h3>
                      </div>
                      <Users className="h-8 w-8 text-purple-400" />
                    </div>
                  </Card>
                  <Card className="bg-green-900 border-green-700 p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-green-300 text-sm">本月收入</p>
                        <h3 className="text-2xl font-bold">¥286,392</h3>
                      </div>
                      <Wallet className="h-8 w-8 text-green-400" />
                    </div>
                  </Card>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Card className={`p-4 ${themeClasses.cardSecondary}`}>
                    <h3 className={`font-medium mb-3 flex items-center ${themeClasses.textSecondary}`}>
                      <AlertTriangle className="w-4 h-4 mr-2 text-amber-400" />
                      待处理事项
                    </h3>
                    <ul className="space-y-3">
                      <li className={`p-3 rounded-md ${themeClasses.cardTertiary}`}>
                        <div className="flex justify-between items-center">
                          <span className={themeClasses.text}>待审核课程</span>
                          <span className="bg-amber-800 text-amber-200 px-2 py-1 rounded text-xs">12 个</span>
                        </div>
                      </li>
                      <li className={`p-3 rounded-md ${themeClasses.cardTertiary}`}>
                        <div className="flex justify-between items-center">
                          <span className={themeClasses.text}>待审核AI助手</span>
                          <span className="bg-amber-800 text-amber-200 px-2 py-1 rounded text-xs">8 个</span>
                        </div>
                      </li>
                      <li className={`p-3 rounded-md ${themeClasses.cardTertiary}`}>
                        <div className="flex justify-between items-center">
                          <span className={themeClasses.text}>待处理退费申请</span>
                          <span className="bg-amber-800 text-amber-200 px-2 py-1 rounded text-xs">5 个</span>
                        </div>
                      </li>
                    </ul>
                  </Card>

                  <Card className={`p-4 ${themeClasses.cardSecondary}`}>
                    <h3 className={`font-medium mb-3 flex items-center ${themeClasses.textSecondary}`}>
                      <BarChart3 className="w-4 h-4 mr-2 text-blue-400" />
                      系统状态
                    </h3>
                    <ul className="space-y-3">
                      <li className={`p-3 rounded-md ${themeClasses.cardTertiary}`}>
                        <div className="flex justify-between items-center">
                          <span className={themeClasses.text}>服务器负载</span>
                          <span className="bg-green-800 text-green-200 px-2 py-1 rounded text-xs">正常</span>
                        </div>
                      </li>
                      <li className={`p-3 rounded-md ${themeClasses.cardTertiary}`}>
                        <div className="flex justify-between items-center">
                          <span className={themeClasses.text}>数据库状态</span>
                          <span className="bg-green-800 text-green-200 px-2 py-1 rounded text-xs">正常</span>
                        </div>
                      </li>
                      <li className={`p-3 rounded-md ${themeClasses.cardTertiary}`}>
                        <div className="flex justify-between items-center">
                          <span className={themeClasses.text}>AI模型服务</span>
                          <span className="bg-green-800 text-green-200 px-2 py-1 rounded text-xs">正常</span>
                        </div>
                      </li>
                    </ul>
                  </Card>
                </div>
              </div>
            )}

            {activeTab !== "dashboard" && subMenus[activeTab] && (
              <div>
                <h2 className={`text-xl font-bold mb-4 ${themeClasses.text}`}>
                  {menuItems.find((item) => item.id === activeTab)?.label}
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                  {subMenus[activeTab].map((subItem) => (
                    <Link href={subItem.href} key={subItem.id}>
                      <Card
                        className={`p-4 transition-colors cursor-pointer ${themeClasses.cardSecondary} ${themeClasses.button}`}
                      >
                        <div className="flex items-center">
                          <div className={`p-2 rounded-md mr-3 ${themeClasses.cardTertiary}`}>{subItem.icon}</div>
                          <span className={`font-medium ${themeClasses.text}`}>{subItem.label}</span>
                        </div>
                      </Card>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
