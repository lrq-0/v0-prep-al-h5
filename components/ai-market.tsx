"use client"

import { useState } from "react"
import { Search, Grid3X3, List, Star, Users } from "lucide-react"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

export function AiMarket() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("全部")
  const [viewMode, setViewMode] = useState("grid")

  const categories = ["全部", "语言学习", "科学技术", "文学艺术", "家庭教育", "职业发展", "心理健康", "生活健康"]

  const aiAssistants = [
    {
      id: 1,
      name: "英语口语助手",
      description: "专业的英语口语练习伙伴，提供实时发音纠正和对话练习",
      category: "语言学习",
      rating: 4.8,
      users: 12500,
      price: "免费",
      image: "/english-tutor-ai.png",
      tags: ["口语", "发音", "对话"],
      isPopular: true,
    },
    {
      id: 2,
      name: "数学解题专家",
      description: "智能数学解题助手，支持从小学到大学各阶段数学问题",
      category: "科学技术",
      rating: 4.9,
      users: 8900,
      price: "¥29/月",
      image: "/math-tutor-ai.png",
      tags: ["解题", "步骤", "公式"],
      isPopular: false,
    },
    {
      id: 3,
      name: "作文写作导师",
      description: "提供写作指导、语法检查和文章结构优化建议",
      category: "文学艺术",
      rating: 4.7,
      users: 15600,
      price: "¥19/月",
      image: "/writing-tutor-ai.png",
      tags: ["写作", "语法", "修改"],
      isPopular: true,
    },
    {
      id: 4,
      name: "编程学习伙伴",
      description: "代码审查、算法讲解、编程概念解释的智能助手",
      category: "科学技术",
      rating: 4.6,
      users: 7800,
      price: "¥39/月",
      image: "/programming-tutor-ai.png",
      tags: ["编程", "代码", "算法"],
      isPopular: false,
    },
    {
      id: 5,
      name: "历史文化顾问",
      description: "深度解析历史事件、文化背景和人物故事",
      category: "文学艺术",
      rating: 4.5,
      users: 5400,
      price: "免费",
      image: "/history-tutor-ai.png",
      tags: ["历史", "文化", "故事"],
      isPopular: false,
    },
    {
      id: 6,
      name: "心理健康助手",
      description: "情绪管理、压力缓解和心理健康指导",
      category: "心理健康",
      rating: 4.8,
      users: 9200,
      price: "¥25/月",
      image: "/psychology-counselor-ai.png",
      tags: ["情绪", "压力", "健康"],
      isPopular: true,
    },
  ]

  const filteredItems = () => {
    return aiAssistants.filter((assistant) => {
      if (selectedCategory !== "全部" && assistant.category !== selectedCategory) {
        return false
      }
      if (searchQuery && !assistant.name.toLowerCase().includes(searchQuery.toLowerCase())) {
        return false
      }
      return true
    })
  }

  const items = filteredItems()

  return (
    <div className="bg-gray-950 text-white min-h-screen pb-16">
      <div className="flex">
        {/* Left Sidebar */}
        <div className="w-64 bg-gray-900 p-6 min-h-screen">
          <h2 className="text-xl font-bold mb-6">市场分类</h2>
          <div className="space-y-2">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`w-full text-left px-4 py-3 rounded-lg transition-colors ${
                  selectedCategory === category ? "bg-blue-600 text-white" : "text-gray-300 hover:bg-gray-800"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 p-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-2xl font-bold">AI 市场</h1>
            <div className="flex items-center gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="搜索 AI 助手..."
                  className="pl-10 bg-gray-800 border-gray-700 text-white w-80"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <div className="flex items-center gap-2">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setViewMode("grid")}
                  className={viewMode === "grid" ? "bg-blue-600" : ""}
                >
                  <Grid3X3 className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setViewMode("list")}
                  className={viewMode === "list" ? "bg-blue-600" : ""}
                >
                  <List className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>

          {/* Results Count */}
          <p className="text-gray-400 mb-6">找到 {items.length} 个 AI 助手</p>

          {/* Items Grid/List */}
          <div className={viewMode === "grid" ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" : "space-y-4"}>
            {items.map((item) => (
              <Card
                key={item.id}
                className="bg-gray-900 border-gray-800 overflow-hidden hover:bg-gray-800 transition-colors"
              >
                <div className={viewMode === "list" ? "flex" : ""}>
                  <div className={viewMode === "list" ? "w-32 h-32 flex-shrink-0" : "h-48"}>
                    <img
                      src={item.image || "/placeholder.svg"}
                      alt={item.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-4 flex-1">
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="font-semibold text-lg">{item.name}</h3>
                      {item.isPopular && <Badge className="bg-red-600 text-white text-xs">热门</Badge>}
                    </div>
                    <p className="text-gray-400 text-sm mb-3 line-clamp-2">{item.description}</p>

                    <div className="flex flex-wrap gap-1 mb-3">
                      {item.tags?.map((tag) => (
                        <Badge key={tag} variant="secondary" className="text-xs bg-gray-800 text-gray-300">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4 text-sm text-gray-400">
                        <div className="flex items-center gap-1">
                          <Star className="h-4 w-4 text-yellow-400 fill-yellow-400" />
                          <span>{item.rating}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Users className="h-4 w-4" />
                          <span>{item.users?.toLocaleString()}</span>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold text-blue-400">{item.price}</p>
                        <Button size="sm" className="mt-2 bg-blue-600 hover:bg-blue-700">
                          使用
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
