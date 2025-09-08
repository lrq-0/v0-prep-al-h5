"use client"

import { useState } from "react"
import { useTheme } from "next-themes"
import Link from "next/link"
import Image from "next/image"
import {
  Share2,
  BookOpen,
  Award,
  Settings,
  MessageSquare,
  Globe,
  LogOut,
  ChevronRight,
  ShieldCheck,
  Crown,
} from "lucide-react"

export function MyProfile() {
  const { theme, setTheme } = useTheme()

  const [user, setUser] = useState({
    name: "超级管理员",
    avatar: "/abstract-user-icon.png",
    role: "super_admin",
    vipLevel: 3,
    vipExpiry: "2025-12-31",
  })

  const isAgent = user.role === "agent" || user.role === "super_admin"
  const isSuperAdmin = user.role === "super_admin"

  const toggleTheme = () => {
    const newTheme = theme === "dark" ? "light" : "dark"
    setTheme(newTheme)
  }

  const menuItems = [
    {
      icon: <Share2 className="w-5 h-5 text-gray-400" />,
      title: "我的分享",
      link: "/my-sharing",
    },
    {
      icon: <BookOpen className="w-5 h-5 text-gray-400" />,
      title: "已购课程",
      link: "/courses/purchased",
    },
    {
      icon: <Award className="w-5 h-5 text-gray-400" />,
      title: "我的成绩",
      link: "/my-grades",
    },
    {
      icon: <MessageSquare className="w-5 h-5 text-gray-400" />,
      title: "联系方式",
      link: "/contact",
    },
    {
      icon: <Globe className="w-5 h-5 text-gray-400" />,
      title: "语言设置",
      link: "/language",
    },
  ]

  if (isAgent) {
    menuItems.splice(3, 0, {
      icon: <Settings className="w-5 h-5 text-blue-400" />,
      title: "管理中心",
      link: "/management",
      badge: "代理商",
      badgeColor: "bg-blue-500",
    })
  }

  if (isSuperAdmin) {
    menuItems.splice(4, 0, {
      icon: <ShieldCheck className="w-5 h-5 text-blue-400" />,
      title: "超级管理员",
      link: "/super-admin",
      badge: "系统",
      badgeColor: "bg-blue-500",
    })
  }

  const switchRole = () => {
    const newRole = user.role === "super_admin" ? "user" : user.role === "user" ? "agent" : "super_admin"
    const newName = newRole === "super_admin" ? "超级管理员" : newRole === "agent" ? "系统代理商" : "普通用户"

    setUser((prev) => ({
      ...prev,
      role: newRole,
      name: newName,
    }))
  }

  return (
    <div className="min-h-screen pb-20 bg-gray-100 dark:bg-gray-900 transition-colors">
      <div className="p-6 rounded-b-3xl shadow-lg bg-gradient-to-r from-gray-200 to-gray-300 dark:from-gray-800 dark:to-gray-700 transition-colors">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <div className="relative">
              <Image
                src={user.avatar || "/abstract-user-icon.png"}
                alt="User Avatar"
                width={70}
                height={70}
                className="rounded-full border-2 border-gray-400 dark:border-gray-600"
              />
              {user.vipLevel > 0 && (
                <div className="absolute -bottom-1 -right-1 bg-gradient-to-r from-amber-500 to-yellow-300 text-black text-xs font-bold px-2 py-0.5 rounded-full">
                  VIP{user.vipLevel}
                </div>
              )}
            </div>
            <div className="ml-4">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">{user.name}</h2>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                {user.vipLevel > 0 ? `会员有效期至: ${user.vipExpiry}` : "免费用户"}
              </p>
              <p className="text-xs mt-1 text-gray-500 dark:text-gray-400">
                角色: {user.role === "super_admin" ? "超级管理员" : user.role === "agent" ? "系统代理商" : "普通用户"}
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <span className="text-xs font-medium text-gray-600 dark:text-gray-300">LIGHT</span>
            <button
              onClick={toggleTheme}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
                theme === "dark" ? "bg-blue-600" : "bg-gray-400"
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  theme === "dark" ? "translate-x-6" : "translate-x-1"
                }`}
              />
            </button>
            <span className="text-xs font-medium text-gray-600 dark:text-gray-300">DARK</span>
          </div>
        </div>
      </div>

      <div className="px-4 pt-4">
        <Link href="/vip-upgrade" className="block">
          <div className="rounded-xl p-4 shadow-lg relative overflow-hidden bg-gradient-to-r from-blue-500 to-blue-700 dark:from-blue-600 dark:to-blue-800 transition-colors">
            <div className="absolute top-0 right-0 w-24 h-24 rounded-full -mt-10 -mr-10 opacity-20 bg-blue-400 dark:bg-blue-500"></div>
            <div className="absolute bottom-0 left-0 w-16 h-16 rounded-full -mb-8 -ml-8 opacity-20 bg-blue-400 dark:bg-blue-500"></div>

            <div className="flex items-center">
              <div className="p-2 rounded-full mr-3 bg-blue-600/50 dark:bg-blue-700/50">
                <Crown className="h-6 w-6 text-yellow-300" />
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-bold text-white">点击升级会员</h3>
                <p className="text-sm text-blue-100 dark:text-blue-200">解锁全部AI模型与无限使用次数</p>
              </div>
              <ChevronRight className="h-5 w-5 text-blue-100 dark:text-blue-200" />
            </div>

            <div className="mt-3 grid grid-cols-3 gap-2">
              <div className="rounded-lg p-2 text-center bg-blue-600/30 dark:bg-blue-700/30">
                <p className="text-xs text-blue-100 dark:text-blue-200">无限次数</p>
              </div>
              <div className="rounded-lg p-2 text-center bg-blue-600/30 dark:bg-blue-700/30">
                <p className="text-xs text-blue-100 dark:text-blue-200">全部模型</p>
              </div>
              <div className="rounded-lg p-2 text-center bg-blue-600/30 dark:bg-blue-700/30">
                <p className="text-xs text-blue-100 dark:text-blue-200">专属服务</p>
              </div>
            </div>
          </div>
        </Link>
      </div>

      <div className="p-4">
        <div className="rounded-xl overflow-hidden bg-white dark:bg-gray-800 transition-colors">
          {menuItems.map((item, index) => (
            <Link href={item.link} key={index}>
              <div
                className={`flex items-center justify-between p-4 ${
                  index !== menuItems.length - 1 ? "border-b border-gray-200 dark:border-gray-700" : ""
                }`}
              >
                <div className="flex items-center">
                  {item.icon}
                  <span className="ml-3 text-gray-900 dark:text-white">{item.title}</span>
                  {item.badge && (
                    <span className={`ml-2 ${item.badgeColor} text-white text-xs px-2 py-0.5 rounded-full`}>
                      {item.badge}
                    </span>
                  )}
                </div>
                <ChevronRight className="w-5 h-5 text-gray-500 dark:text-gray-400" />
              </div>
            </Link>
          ))}
        </div>

        <button
          className="mt-6 w-full py-3 rounded-xl flex items-center justify-center bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-900 dark:text-white transition-colors"
          onClick={switchRole}
        >
          <Settings className="w-5 h-5 mr-2" />
          切换用户角色（测试用）
        </button>

        <button className="mt-3 w-full py-3 rounded-xl flex items-center justify-center bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-900 dark:text-white transition-colors">
          <LogOut className="w-5 h-5 mr-2" />
          退出登录
        </button>
      </div>
    </div>
  )
}
