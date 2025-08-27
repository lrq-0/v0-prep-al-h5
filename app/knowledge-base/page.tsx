"use client"

import { ArrowLeft, Search, ShoppingBag, Smartphone, Video, TrendingUp, PenTool, Clock, Mic } from "lucide-react"
import Link from "next/link"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { useState } from "react"

export default function KnowledgeBase() {
  const [activeCategory, setActiveCategory] = useState("all")
  const [searchQuery, setSearchQuery] = useState("")

  // 模拟电商、短视频、自媒体相关知识库文档数据
  const documents = [
    {
      id: 1,
      title: "电商平台选择与入驻指南",
      category: "电商运营",
      format: "PDF",
      date: "2025-04-10",
      uploadTime: "2025-04-10 14:30",
      size: "3.5MB",
      icon: <ShoppingBag className="h-5 w-5 text-blue-400" />,
    },
    {
      id: 2,
      title: "短视频内容创作完全指南",
      category: "短视频创作",
      format: "PDF",
      date: "2025-04-08",
      uploadTime: "2025-04-08 09:15",
      size: "4.2MB",
      icon: <Video className="h-5 w-5 text-red-400" />,
    },
    {
      id: 3,
      title: "自媒体账号定位与人设打造",
      category: "自媒体运营",
      format: "DOCX",
      date: "2025-04-05",
      uploadTime: "2025-04-05 16:45",
      size: "1.8MB",
      icon: <Smartphone className="h-5 w-5 text-green-400" />,
    },
    {
      id: 4,
      title: "抖音直播间运营实战手册",
      category: "直播带货",
      format: "PDF",
      date: "2025-04-01",
      uploadTime: "2025-04-01 11:20",
      size: "3.1MB",
      icon: <Mic className="h-5 w-5 text-yellow-400" />,
    },
    {
      id: 5,
      title: "电商选品与爆款打造策略",
      category: "电商运营",
      format: "PPT",
      date: "2025-03-28",
      uploadTime: "2025-03-28 15:10",
      size: "5.6MB",
      icon: <ShoppingBag className="h-5 w-5 text-teal-400" />,
    },
    {
      id: 6,
      title: "内容营销策略与执行",
      category: "内容营销",
      format: "XLSX",
      date: "2025-03-25",
      uploadTime: "2025-03-25 10:05",
      size: "1.2MB",
      icon: <PenTool className="h-5 w-5 text-orange-400" />,
    },
    {
      id: 7,
      title: "小红书爆款笔记文案模板",
      category: "自媒体运营",
      format: "DOCX",
      date: "2025-03-20",
      uploadTime: "2025-03-20 13:40",
      size: "3.5MB",
      icon: <PenTool className="h-5 w-5 text-cyan-400" />,
    },
    {
      id: 8,
      title: "淘宝店铺装修与视觉优化",
      category: "电商运营",
      format: "PDF",
      date: "2025-03-15",
      uploadTime: "2025-03-15 09:30",
      size: "2.8MB",
      icon: <ShoppingBag className="h-5 w-5 text-pink-400" />,
    },
    {
      id: 9,
      title: "直通车推广与精准投放",
      category: "电商运营",
      format: "XLSX",
      date: "2025-03-10",
      uploadTime: "2025-03-10 14:25",
      size: "0.8MB",
      icon: <TrendingUp className="h-5 w-5 text-purple-400" />,
    },
    {
      id: 10,
      title: "抖音算法规则解析",
      category: "短视频创作",
      format: "PPT",
      date: "2025-03-05",
      uploadTime: "2025-03-05 16:15",
      size: "4.5MB",
      icon: <Video className="h-5 w-5 text-blue-400" />,
    },
    {
      id: 11,
      title: "视频剪辑与特效制作教程",
      category: "短视频创作",
      format: "PDF",
      date: "2025-03-01",
      uploadTime: "2025-03-01 11:50",
      size: "6.2MB",
      icon: <Video className="h-5 w-5 text-red-400" />,
    },
    {
      id: 12,
      title: "自媒体账号变现全攻略",
      category: "自媒体运营",
      format: "PDF",
      date: "2025-02-25",
      uploadTime: "2025-02-25 10:35",
      size: "2.3MB",
      icon: <TrendingUp className="h-5 w-5 text-green-400" />,
    },
  ]

  // 获取当前分类的文档并按上传时间排序（从最新到最旧）
  const filteredDocuments = (
    activeCategory === "all" ? documents : documents.filter((doc) => doc.category === activeCategory)
  ).sort((a, b) => new Date(b.uploadTime).getTime() - new Date(a.uploadTime).getTime())

  // 搜索过滤
  const searchedDocuments = filteredDocuments.filter((doc) =>
    doc.title.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  // 渲染文档卡片
  const renderDocumentCard = (doc) => (
    <Card key={doc.id} className="p-3 bg-gray-900 border-gray-800">
      <div className="flex items-center">
        <div className="w-10 h-10 rounded-md bg-gray-800 flex items-center justify-center mr-3">{doc.icon}</div>
        <div className="flex-1 min-w-0">
          <h3 className="font-medium text-white text-sm truncate">{doc.title}</h3>
          <div className="flex justify-between text-xs mt-1">
            <span className="text-purple-400">{doc.format}</span>
            <span className="text-gray-400">{doc.size}</span>
          </div>
          <div className="flex items-center text-xs mt-1 text-gray-500">
            <Clock className="h-3 w-3 mr-1" />
            <span>{doc.uploadTime}</span>
          </div>
        </div>
      </div>
    </Card>
  )

  // 电商、短视频、自媒体相关分类
  const categories = [
    { id: "all", name: "全部" },
    { id: "电商运营", name: "电商运营" },
    { id: "短视频创作", name: "短视频创作" },
    { id: "自媒体运营", name: "自媒体运营" },
    { id: "直播带货", name: "直播带货" },
    { id: "内容营销", name: "内容营销" },
  ]

  return (
    <div className="min-h-screen bg-black text-white">
      {/* 顶部导航栏 */}
      <div className="sticky top-0 left-0 right-0 h-14 flex items-center px-4 bg-gray-900/80 backdrop-blur-md border-b border-gray-800 z-10">
        <Link href="/" className="flex items-center text-gray-300">
          <ArrowLeft className="h-5 w-5 mr-2" />
          <span>返回</span>
        </Link>
        <h1 className="flex-1 text-center text-lg font-semibold text-white">创业知识库</h1>
      </div>

      {/* 搜索框 */}
      <div className="p-4 border-b border-gray-800">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 h-4 w-4" />
          <Input
            placeholder="搜索文档..."
            className="pl-9 bg-gray-900 border-gray-700 text-white placeholder:text-gray-500 focus-visible:ring-purple-500"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      {/* 左右布局：分类在左，文档在右 */}
      <div className="flex h-[calc(100vh-116px)]">
        {/* 左侧分类列表 */}
        <div className="w-1/4 min-w-[100px] max-w-[200px] border-r border-gray-800 p-4 overflow-y-auto">
          <h2 className="text-sm font-medium text-gray-400 mb-3">分类</h2>
          <div className="flex flex-col gap-2">
            {categories.map((category) => (
              <button
                key={category.id}
                className={`px-3 py-2 rounded-md text-left text-sm ${
                  activeCategory === category.id
                    ? "bg-purple-600 text-white"
                    : "bg-gray-800 text-gray-300 hover:bg-gray-700"
                }`}
                onClick={() => setActiveCategory(category.id)}
              >
                {category.name}
              </button>
            ))}
          </div>
        </div>

        {/* 右侧文档列表 */}
        <div className="flex-1 p-4 overflow-y-auto">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-white">
              {activeCategory === "all" ? "全部文档" : activeCategory}
            </h2>
            <span className="text-sm text-gray-400">{searchedDocuments.length} 个文件</span>
          </div>

          <div className="grid gap-3 pb-16">{searchedDocuments.map(renderDocumentCard)}</div>
        </div>
      </div>
    </div>
  )
}
