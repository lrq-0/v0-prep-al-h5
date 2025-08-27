"use client"

import { ArrowLeft, Settings, ImageIcon as Image, Phone, AlertTriangle, PenTool } from "lucide-react"
import Link from "next/link"
import { Card } from "@/components/ui/card"

export default function SystemConfiguration() {
  // 系统配置子菜单项
  const configMenus = [
    {
      id: "basic",
      title: "基础设置",
      description: "皮肤颜色、网站品牌名称、SEO设置",
      icon: <Settings className="h-5 w-5 text-blue-400" />,
      link: "/management/system/basic",
    },
    {
      id: "banner",
      title: "Banner图设置",
      description: "首页轮播Banner图片配置",
      icon: <Image className="h-5 w-5 text-green-400" />,
      link: "/management/system/banner",
    },
    {
      id: "contact",
      title: "联系方式设置",
      description: "客服二维码、电话、邮箱",
      icon: <Phone className="h-5 w-5 text-purple-400" />,
      link: "/management/system/contact",
    },
    {
      id: "upgrade",
      title: "升级提示设置",
      description: "余额不足充值提示对话框",
      icon: <AlertTriangle className="h-5 w-5 text-yellow-400" />,
      link: "/management/system/upgrade",
    },
    {
      id: "promotion-poster",
      title: "推广中心海报图设置",
      description: "代理商推广海报图片配置",
      icon: <PenTool className="h-5 w-5 text-cyan-400" />,
      link: "/management/system/promotion-poster",
    },
  ]

  return (
    <div className="min-h-screen bg-black text-white">
      {/* 顶部导航栏 */}
      <div className="sticky top-0 left-0 right-0 h-14 flex items-center px-4 bg-gray-900/80 backdrop-blur-md border-b border-gray-800 z-10">
        <Link href="/management" className="flex items-center text-gray-300">
          <ArrowLeft className="h-5 w-5 mr-2" />
          <span>返回</span>
        </Link>
        <h1 className="flex-1 text-center text-lg font-semibold text-white">系统配置</h1>
      </div>

      <div className="p-4 pb-16">
        {/* 功能介绍 */}
        <div className="p-4 bg-blue-900/20 border border-blue-500/30 rounded-lg mb-6">
          <h2 className="text-lg font-semibold text-white mb-2">系统配置</h2>
          <p className="text-sm text-gray-300">
            在这里可以设置网站的基本信息，包括网站外观、品牌、Banner图、联系方式、用户协议等。这些设置将影响用户在访问您的网站时的整体体验。
          </p>
        </div>

        {/* 配置菜单列表 */}
        <div className="grid gap-4">
          {configMenus.map((menu) => (
            <Link href={menu.link} key={menu.id}>
              <Card className="p-4 bg-gray-900 border-gray-800 hover:bg-gray-800 transition-colors cursor-pointer">
                <div className="flex items-start">
                  <div className="w-10 h-10 rounded-lg flex items-center justify-center bg-gray-800 mr-3">
                    {menu.icon}
                  </div>
                  <div>
                    <h3 className="font-medium text-white mb-1">{menu.title}</h3>
                    <p className="text-sm text-gray-400">{menu.description}</p>
                  </div>
                </div>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
