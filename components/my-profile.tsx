"use client"

import { useState } from "react"
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
  // 模拟用户数据
  const [user, setUser] = useState({
    name: "超级管理员",
    avatar: "/abstract-user-icon.png",
    role: "super_admin",
    vipLevel: 3,
    vipExpiry: "2025-12-31",
  })

  // 判断是否为代理商
  const isAgent = user.role === "agent" || user.role === "super_admin"
  // 判断是否为超级管理员
  const isSuperAdmin = user.role === "super_admin"

  // 菜单项
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

  // 如果是代理商或超级管理员，添加"管理中心"
  if (isAgent) {
    menuItems.splice(3, 0, {
      icon: <Settings className="w-5 h-5 text-blue-400" />,
      title: "管理中心",
      link: "/management",
      badge: "代理商",
      badgeColor: "bg-blue-500",
    })
  }

  // 如果是超级管理员，添加"超级管理员"
  if (isSuperAdmin) {
    menuItems.splice(4, 0, {
      icon: <ShieldCheck className="w-5 h-5 text-blue-400" />,
      title: "超级管理员",
      link: "/super-admin",
      badge: "系统",
      badgeColor: "bg-blue-500",
    })
  }

  // 切换用户角色（用于测试）
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
    <div className="bg-gray-900 min-h-screen pb-20">
      {/* 用户信息卡片 */}
      <div className="bg-gradient-to-r from-gray-800 to-gray-700 p-6 rounded-b-3xl shadow-lg">
        <div className="flex items-center">
          <div className="relative">
            <Image
              src={user.avatar || "/abstract-user-icon.png"}
              alt="User Avatar"
              width={70}
              height={70}
              className="rounded-full border-2 border-gray-600"
            />
            {user.vipLevel > 0 && (
              <div className="absolute -bottom-1 -right-1 bg-gradient-to-r from-amber-500 to-yellow-300 text-black text-xs font-bold px-2 py-0.5 rounded-full">
                VIP{user.vipLevel}
              </div>
            )}
          </div>
          <div className="ml-4">
            <h2 className="text-xl font-bold text-white">{user.name}</h2>
            <p className="text-gray-300 text-sm">
              {user.vipLevel > 0 ? `会员有效期至: ${user.vipExpiry}` : "免费用户"}
            </p>
            <p className="text-gray-400 text-xs mt-1">
              角色: {user.role === "super_admin" ? "超级管理员" : user.role === "agent" ? "系统代理商" : "普通用户"}
            </p>
          </div>
        </div>
      </div>

      {/* 会员升级Banner */}
      <div className="px-4 pt-4">
        <Link href="/vip-upgrade" className="block">
          <div className="bg-gradient-to-r from-blue-600 to-blue-800 rounded-xl p-4 shadow-lg relative overflow-hidden">
            <div className="absolute top-0 right-0 w-24 h-24 bg-blue-500 rounded-full -mt-10 -mr-10 opacity-20"></div>
            <div className="absolute bottom-0 left-0 w-16 h-16 bg-blue-500 rounded-full -mb-8 -ml-8 opacity-20"></div>

            <div className="flex items-center">
              <div className="bg-blue-700/50 p-2 rounded-full mr-3">
                <Crown className="h-6 w-6 text-yellow-300" />
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-bold text-white">点击升级会员</h3>
                <p className="text-blue-200 text-sm">解锁全部AI模型与无限使用次数</p>
              </div>
              <ChevronRight className="h-5 w-5 text-blue-200" />
            </div>

            <div className="mt-3 grid grid-cols-3 gap-2">
              <div className="bg-blue-700/30 rounded-lg p-2 text-center">
                <p className="text-xs text-blue-200">无限次数</p>
              </div>
              <div className="bg-blue-700/30 rounded-lg p-2 text-center">
                <p className="text-xs text-blue-200">全部模型</p>
              </div>
              <div className="bg-blue-700/30 rounded-lg p-2 text-center">
                <p className="text-xs text-blue-200">专属服务</p>
              </div>
            </div>
          </div>
        </Link>
      </div>

      {/* 菜单列表 */}
      <div className="p-4">
        <div className="bg-gray-800 rounded-xl overflow-hidden">
          {menuItems.map((item, index) => (
            <Link href={item.link} key={index}>
              <div
                className={`flex items-center justify-between p-4 ${
                  index !== menuItems.length - 1 ? "border-b border-gray-700" : ""
                }`}
              >
                <div className="flex items-center">
                  {item.icon}
                  <span className="ml-3 text-white">{item.title}</span>
                  {item.badge && (
                    <span className={`ml-2 ${item.badgeColor} text-white text-xs px-2 py-0.5 rounded-full`}>
                      {item.badge}
                    </span>
                  )}
                </div>
                <ChevronRight className="w-5 h-5 text-gray-400" />
              </div>
            </Link>
          ))}
        </div>

        {/* 测试功能：切换用户角色 */}
        <button
          className="mt-6 w-full bg-gray-800 hover:bg-gray-700 text-white py-3 rounded-xl flex items-center justify-center"
          onClick={switchRole}
        >
          <Settings className="w-5 h-5 mr-2" />
          切换用户角色（测试用）
        </button>

        {/* 退出登录按钮 */}
        <button className="mt-3 w-full bg-gray-800 hover:bg-gray-700 text-white py-3 rounded-xl flex items-center justify-center">
          <LogOut className="w-5 h-5 mr-2" />
          退出登录
        </button>
      </div>
    </div>
  )
}
