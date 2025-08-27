"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import {
  ArrowLeft,
  Search,
  ShoppingCart,
  Plus,
  Star,
  Download,
  Filter,
  CheckCircle2,
  Briefcase,
  Code,
  Globe,
  Heart,
  Music,
  ShoppingBag,
  Info,
  AlertCircle,
  Check,
  X,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Skeleton } from "@/components/ui/skeleton"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"

export default function AiAssistantMarket() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState("")
  const [activeTab, setActiveTab] = useState("all")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [isFilterOpen, setIsFilterOpen] = useState(false)
  const [showSuccessMessage, setShowSuccessMessage] = useState(false)
  const [successMessageText, setSuccessMessageText] = useState("")
  const [isDetailsDialogOpen, setIsDetailsDialogOpen] = useState(false)
  const [selectedAssistant, setSelectedAssistant] = useState(null)
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [assistantToAdd, setAssistantToAdd] = useState(null)
  const [targetCategory, setTargetCategory] = useState(null)

  // 过滤器
  const [filters, setFilters] = useState({
    price: "all", // all, free, paid
    rating: "all", // all, 4plus, 4.5plus
    type: "all", // all, assistant, model
  })

  // 分类数据
  const [categories, setCategories] = useState([
    { id: 1, name: "对话模型", icon: "message-square", color: "blue" },
    { id: 2, name: "绘图和视频模型", icon: "image", color: "purple" },
    { id: 3, name: "数字人平台", icon: "user", color: "green" },
    { id: 4, name: "AI助手", icon: "sparkles", color: "yellow" },
    { id: 5, name: "教育辅导", icon: "book-open", color: "cyan" },
    { id: 6, name: "职业发展", icon: "briefcase", color: "pink" },
  ])

  // AI助手市场数据
  const [marketAssistants, setMarketAssistants] = useState([
    {
      id: 1,
      name: "高级英语教师",
      description: "专业英语教学助手，提供语法指导、口语练习和写作建议",
      avatar: "/images/ai-assistant-1.png",
      categoryId: 5,
      type: "assistant",
      price: 0,
      rating: 4.8,
      downloads: 1256,
      features: ["语法指导", "口语练习", "写作建议", "阅读理解"],
      createdBy: "教育科技团队",
      updatedAt: "2023-12-05T14:22:00Z",
      isAdded: false,
    },
    {
      id: 2,
      name: "数学解题专家",
      description: "解答高等数学难题，提供详细的解题步骤和思路分析",
      avatar: "/images/ai-assistant-2.png",
      categoryId: 5,
      type: "assistant",
      price: 29.9,
      rating: 4.7,
      downloads: 876,
      features: ["代数问题", "微积分", "概率统计", "几何问题"],
      createdBy: "数学教研组",
      updatedAt: "2023-11-15T09:45:00Z",
      isAdded: false,
    },
    {
      id: 3,
      name: "职业规划顾问",
      description: "提供职业发展建议和求职面试指导，帮助制定职业规划",
      avatar: "/images/ai-assistant-3.png",
      categoryId: 6,
      type: "assistant",
      price: 19.9,
      rating: 4.6,
      downloads: 654,
      features: ["简历优化", "面试技巧", "职业规划", "行业分析"],
      createdBy: "职业发展研究院",
      updatedAt: "2023-10-20T11:30:00Z",
      isAdded: true,
    },
    {
      id: 4,
      name: "心理健康顾问",
      description: "提供情绪管理和心理健康建议，帮助缓解压力和焦虑",
      avatar: "/images/ai-assistant-4.png",
      categoryId: 4,
      type: "assistant",
      price: 39.9,
      rating: 4.9,
      downloads: 1089,
      features: ["情绪管理", "压力缓解", "心理咨询", "冥想引导"],
      createdBy: "心理健康研究中心",
      updatedAt: "2023-12-01T16:15:00Z",
      isAdded: false,
    },
    {
      id: 5,
      name: "DeepSeek",
      description: "强大的中文大语言模型，支持自然语言对话和知识问答",
      avatar: "/images/ai-assistant-1.png",
      categoryId: 1,
      type: "model",
      price: 0,
      rating: 4.8,
      downloads: 2356,
      features: ["中文优化", "知识问答", "代码生成", "文本创作"],
      createdBy: "DeepSeek AI",
      updatedAt: "2023-11-10T10:00:00Z",
      isAdded: true,
    },
    {
      id: 6,
      name: "即梦",
      description: "AI图像生成与编辑工具，支持多种风格和高清图像生成",
      avatar: "/images/ai-assistant-5.png",
      categoryId: 2,
      type: "model",
      price: 49.9,
      rating: 4.7,
      downloads: 1432,
      features: ["多风格生成", "图像编辑", "高清输出", "批量处理"],
      createdBy: "即梦科技",
      updatedAt: "2023-12-15T13:25:00Z",
      isAdded: false,
    },
    {
      id: 7,
      name: "可灵",
      description: "AI视频生成与编辑工具，支持多种场景和特效",
      avatar: "/images/ai-assistant-6.png",
      categoryId: 2,
      type: "model",
      price: 69.9,
      rating: 4.5,
      downloads: 876,
      features: ["视频生成", "场景转换", "特效添加", "音频合成"],
      createdBy: "可灵影像",
      updatedAt: "2023-12-20T09:15:00Z",
      isAdded: false,
    },
    {
      id: 8,
      name: "硅基智能",
      description: "专业数字人开发平台，支持定制化数字人形象和交互",
      avatar: "/images/ai-assistant-2.png",
      categoryId: 3,
      type: "model",
      price: 99.9,
      rating: 4.6,
      downloads: 543,
      features: ["形象定制", "语音合成", "表情动作", "场景互动"],
      createdBy: "硅基科技",
      updatedAt: "2023-11-25T14:40:00Z",
      isAdded: true,
    },
    {
      id: 9,
      name: "编程助手",
      description: "帮助解决编程问题和代码优化，支持多种编程语言",
      avatar: "/images/ai-assistant-3.png",
      categoryId: 4,
      type: "assistant",
      price: 29.9,
      rating: 4.7,
      downloads: 987,
      features: ["代码补全", "错误检测", "性能优化", "多语言支持"],
      createdBy: "编程技术团队",
      updatedAt: "2023-11-05T11:20:00Z",
      isAdded: false,
    },
    {
      id: 10,
      name: "旅行规划师",
      description: "定制个性化旅行计划，推荐景点美食和行程安排",
      avatar: "/images/ai-assistant-4.png",
      categoryId: 4,
      type: "assistant",
      price: 19.9,
      rating: 4.5,
      downloads: 765,
      features: ["行程规划", "景点推荐", "美食指南", "预算控制"],
      createdBy: "旅行体验团队",
      updatedAt: "2023-10-15T15:30:00Z",
      isAdded: false,
    },
  ])

  // 模拟加载数据
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1000)
    return () => clearTimeout(timer)
  }, [])

  // 显示成功消息
  const showSuccess = (message) => {
    setSuccessMessageText(message)
    setShowSuccessMessage(true)
    setTimeout(() => setShowSuccessMessage(false), 3000)
  }

  // 格式化日期
  const formatDate = (dateString) => {
    if (!dateString) return "无"
    const date = new Date(dateString)
    return new Intl.DateTimeFormat("zh-CN", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    }).format(date)
  }

  // 过滤助手
  const getFilteredAssistants = () => {
    return marketAssistants.filter((assistant) => {
      // 搜索关键词匹配
      const matchesSearch =
        assistant.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        assistant.description.toLowerCase().includes(searchQuery.toLowerCase())

      // 分类匹配
      const matchesCategory = selectedCategory === "all" || assistant.categoryId === Number.parseInt(selectedCategory)

      // 标签页匹配
      const matchesTab =
        activeTab === "all" ||
        (activeTab === "models" && assistant.type === "model") ||
        (activeTab === "assistants" && assistant.type === "assistant") ||
        (activeTab === "added" && assistant.isAdded)

      // 价格过滤
      const matchesPrice =
        filters.price === "all" ||
        (filters.price === "free" && assistant.price === 0) ||
        (filters.price === "paid" && assistant.price > 0)

      // 评分过滤
      const matchesRating =
        filters.rating === "all" ||
        (filters.rating === "4plus" && assistant.rating >= 4.0) ||
        (filters.rating === "4.5plus" && assistant.rating >= 4.5)

      // 类型过滤
      const matchesType =
        filters.type === "all" ||
        (filters.type === "assistant" && assistant.type === "assistant") ||
        (filters.type === "model" && assistant.type === "model")

      return matchesSearch && matchesCategory && matchesTab && matchesPrice && matchesRating && matchesType
    })
  }

  const filteredAssistants = getFilteredAssistants()

  // 查看助手详情
  const handleViewDetails = (assistant) => {
    setSelectedAssistant(assistant)
    setIsDetailsDialogOpen(true)
  }

  // 添加助手
  const handleAddAssistant = (assistant) => {
    if (assistant.isAdded) {
      showSuccess(`${assistant.name} 已经添加过了`)
      return
    }

    setAssistantToAdd(assistant)
    setTargetCategory(assistant.categoryId)
    setIsAddDialogOpen(true)
  }

  // 确认添加助手
  const confirmAddAssistant = () => {
    if (!assistantToAdd) return

    // 更新助手状态
    const updatedAssistants = marketAssistants.map((assistant) => {
      if (assistant.id === assistantToAdd.id) {
        return { ...assistant, isAdded: true }
      }
      return assistant
    })

    setMarketAssistants(updatedAssistants)
    setIsAddDialogOpen(false)
    setAssistantToAdd(null)
    setTargetCategory(null)
    showSuccess(`${assistantToAdd.name} 已成功添加到您的AI助手列表`)
  }

  // 重置过滤器
  const resetFilters = () => {
    setSearchQuery("")
    setSelectedCategory("all")
    setActiveTab("all")
    setFilters({
      price: "all",
      rating: "all",
      type: "all",
    })
    showSuccess("已重置所有筛选条件")
  }

  // 获取图标组件
  const getIconComponent = (iconName, className = "h-5 w-5") => {
    const icons = {
      "message-square": <MessageSquareIconComponent className={className} />,
      image: <ImageIconIconComponent className={className} />,
      video: <VideoIconComponent className={className} />,
      user: <UserIcon className={className} />,
      sparkles: <SparklesIconComponent className={className} />,
      "book-open": <BookOpenIconComponent className={className} />,
      briefcase: <Briefcase className={className} />,
      code: <Code className={className} />,
      globe: <Globe className={className} />,
      heart: <Heart className={className} />,
      music: <Music className={className} />,
      "shopping-bag": <ShoppingBag className={className} />,
      star: <Star className={className} />,
    }
    return icons[iconName] || <MessageSquareIconComponent className={className} />
  }

  // 获取颜色样式
  const getColorClass = (colorName) => {
    const colorClasses = {
      blue: "text-blue-400 border-blue-500/30 bg-blue-500/10",
      green: "text-green-400 border-green-500/30 bg-green-500/10",
      purple: "text-purple-400 border-purple-500/30 bg-purple-500/10",
      yellow: "text-yellow-400 border-yellow-500/30 bg-yellow-500/10",
      pink: "text-pink-400 border-pink-500/30 bg-pink-500/10",
      cyan: "text-cyan-400 border-cyan-500/30 bg-cyan-500/10",
      red: "text-red-400 border-red-500/30 bg-red-500/10",
      orange: "text-orange-400 border-orange-500/30 bg-orange-500/10",
    }
    return colorClasses[colorName] || "text-gray-400 border-gray-500/30 bg-gray-500/10"
  }

  return (
    <div className="min-h-screen bg-black text-white pb-20">
      {/* 顶部导航栏 */}
      <div className="sticky top-0 left-0 right-0 h-14 flex items-center px-4 bg-gray-900/80 backdrop-blur-md border-b border-gray-800 z-10">
        <Link href="/management/ai-assistants" className="flex items-center text-gray-300">
          <ArrowLeft className="h-5 w-5 mr-2" />
          <span>返回</span>
        </Link>
        <h1 className="flex-1 text-center text-lg font-semibold text-white">AI助手市场</h1>
      </div>

      {/* 成功消息提示 */}
      {showSuccessMessage && (
        <div className="fixed top-16 left-1/2 transform -translate-x-1/2 z-50 bg-green-900/90 text-white px-4 py-2 rounded-md flex items-center shadow-lg border border-green-700">
          <CheckCircle2 className="h-5 w-5 mr-2 text-green-400" />
          <span>{successMessageText}</span>
        </div>
      )}

      <div className="p-4">
        {/* 顶部操作栏 */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 mb-6">
          <div className="flex-1 max-w-md">
            <div className="p-4 bg-blue-900/20 border border-blue-500/30 rounded-lg">
              <h2 className="text-lg font-semibold text-white mb-2">AI助手市场</h2>
              <p className="text-sm text-gray-300">
                浏览和添加各种专业AI助手和模型，丰富您的平台功能。您可以根据分类、价格和评分筛选，找到最适合您需求的AI助手。
              </p>
            </div>
          </div>
          <div className="flex gap-2">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 h-4 w-4" />
              <Input
                placeholder="搜索AI助手..."
                className="pl-9 bg-gray-900 border-gray-700 text-white placeholder:text-gray-500 focus-visible:ring-blue-500"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Button
              variant="outline"
              className={`border-blue-500/30 text-blue-400 hover:bg-blue-500/20 ${isFilterOpen ? "bg-blue-500/20" : ""}`}
              onClick={() => setIsFilterOpen(!isFilterOpen)}
            >
              <Filter className="h-4 w-4 mr-1" />
              筛选
            </Button>
          </div>
        </div>

        {/* 高级筛选区 */}
        {isFilterOpen && (
          <div className="mb-6 p-4 bg-gray-900 border border-gray-800 rounded-lg">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-medium text-white">高级筛选</h3>
              <Button variant="ghost" size="sm" onClick={resetFilters}>
                <X className="h-4 w-4 mr-1" />
                重置筛选
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <Label className="text-sm text-gray-400 mb-1 block">价格</Label>
                <Select value={filters.price} onValueChange={(value) => setFilters({ ...filters, price: value })}>
                  <SelectTrigger className="bg-gray-800 border-gray-700 text-white">
                    <SelectValue placeholder="选择价格范围" />
                  </SelectTrigger>
                  <SelectContent className="bg-gray-900 border-gray-700 text-white">
                    <SelectItem value="all">全部价格</SelectItem>
                    <SelectItem value="free">免费</SelectItem>
                    <SelectItem value="paid">付费</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label className="text-sm text-gray-400 mb-1 block">评分</Label>
                <Select value={filters.rating} onValueChange={(value) => setFilters({ ...filters, rating: value })}>
                  <SelectTrigger className="bg-gray-800 border-gray-700 text-white">
                    <SelectValue placeholder="选择评分" />
                  </SelectTrigger>
                  <SelectContent className="bg-gray-900 border-gray-700 text-white">
                    <SelectItem value="all">全部评分</SelectItem>
                    <SelectItem value="4plus">4.0分以上</SelectItem>
                    <SelectItem value="4.5plus">4.5分以上</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label className="text-sm text-gray-400 mb-1 block">类型</Label>
                <Select value={filters.type} onValueChange={(value) => setFilters({ ...filters, type: value })}>
                  <SelectTrigger className="bg-gray-800 border-gray-700 text-white">
                    <SelectValue placeholder="选择类型" />
                  </SelectTrigger>
                  <SelectContent className="bg-gray-900 border-gray-700 text-white">
                    <SelectItem value="all">全部类型</SelectItem>
                    <SelectItem value="assistant">AI助手</SelectItem>
                    <SelectItem value="model">AI模型</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        )}

        {/* 分类选择 */}
        <div className="mb-4">
          <div className="flex items-center mb-2">
            <ShoppingCart className="h-5 w-5 text-blue-400 mr-2" />
            <h2 className="text-lg font-semibold">分类浏览</h2>
          </div>

          <div className="flex flex-wrap gap-2 items-center">
            <Button
              variant={selectedCategory === "all" ? "default" : "outline"}
              className={
                selectedCategory === "all"
                  ? "bg-blue-600 hover:bg-blue-500"
                  : "border-gray-700 text-gray-300 hover:border-gray-600"
              }
              onClick={() => setSelectedCategory("all")}
            >
              全部分类
            </Button>

            {categories.map((category) => (
              <Button
                key={category.id}
                variant={selectedCategory === category.id.toString() ? "default" : "outline"}
                className={
                  selectedCategory === category.id.toString()
                    ? "bg-blue-600 hover:bg-blue-500"
                    : `border-gray-700 hover:border-${category.color}-500/50 ${getColorClass(category.color)}`
                }
                onClick={() => setSelectedCategory(category.id.toString())}
              >
                {getIconComponent(category.icon, "h-4 w-4 mr-1")}
                {category.name}
              </Button>
            ))}
          </div>
        </div>

        {/* 标签页 */}
        <div className="mb-6">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="bg-gray-800 border border-gray-700 w-full">
              <TabsTrigger value="all" className="data-[state=active]:bg-blue-600 flex-1">
                全部
              </TabsTrigger>
              <TabsTrigger value="models" className="data-[state=active]:bg-blue-600 flex-1">
                AI模型
              </TabsTrigger>
              <TabsTrigger value="assistants" className="data-[state=active]:bg-blue-600 flex-1">
                AI助手
              </TabsTrigger>
              <TabsTrigger value="added" className="data-[state=active]:bg-blue-600 flex-1">
                已添加
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>

        {/* AI助手列表 */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center">
              <h2 className="text-lg font-semibold">AI助手列表</h2>
              <span className="ml-2 text-sm text-gray-400">({filteredAssistants.length}个)</span>
            </div>
          </div>

          {isLoading ? (
            // 加载状态
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {Array(8)
                .fill(0)
                .map((_, i) => (
                  <Card key={i} className="bg-gray-900 border-gray-800">
                    <CardContent className="p-5">
                      <div className="flex justify-center mb-4">
                        <Skeleton className="h-20 w-20 rounded-full" />
                      </div>
                      <Skeleton className="h-6 w-3/4 mx-auto mb-2" />
                      <Skeleton className="h-4 w-full mb-1" />
                      <Skeleton className="h-4 w-5/6 mb-4" />
                      <div className="flex justify-center gap-2 mb-4">
                        <Skeleton className="h-6 w-16 rounded-full" />
                        <Skeleton className="h-6 w-16 rounded-full" />
                      </div>
                      <div className="flex justify-center gap-2">
                        <Skeleton className="h-9 w-24 rounded-md" />
                        <Skeleton className="h-9 w-24 rounded-md" />
                      </div>
                    </CardContent>
                  </Card>
                ))}
            </div>
          ) : filteredAssistants.length === 0 ? (
            // 无数据状态
            <div className="text-center py-12 bg-gray-900 rounded-lg border border-gray-800">
              <AlertCircle className="h-12 w-12 text-yellow-500/70 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-white mb-2">没有找到匹配的AI助手</h3>
              <p className="text-gray-400 mb-4">尝试调整筛选条件或搜索关键词</p>
              <Button
                variant="outline"
                className="border-blue-500/30 text-blue-400 hover:bg-blue-500/20"
                onClick={resetFilters}
              >
                <X className="h-4 w-4 mr-2" />
                重置筛选条件
              </Button>
            </div>
          ) : (
            // 数据渲染
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {filteredAssistants.map((assistant) => (
                <Card key={assistant.id} className="bg-gray-900 border-gray-800 hover:border-gray-700 transition-all">
                  <CardContent className="p-5">
                    <div className="mb-4 flex flex-col items-center">
                      <div className="relative w-20 h-20 rounded-full overflow-hidden border-4 border-gray-800 mb-3">
                        <Image
                          src={assistant.avatar || "/placeholder.svg"}
                          alt={assistant.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <h3 className="font-medium text-white text-lg text-center">{assistant.name}</h3>
                    </div>

                    <p className="text-sm text-gray-400 mb-3 line-clamp-2 h-10 text-center">{assistant.description}</p>

                    <div className="flex flex-wrap gap-1 justify-center mb-3">
                      <Badge variant="outline" className="text-xs py-0 border-gray-700 text-gray-300">
                        {assistant.type === "assistant" ? "AI助手" : "AI模型"}
                      </Badge>
                      <Badge
                        className={`text-xs py-0 border ${getColorClass(
                          categories.find((c) => c.id === assistant.categoryId)?.color || "blue",
                        )}`}
                      >
                        {categories.find((c) => c.id === assistant.categoryId)?.name || "其他"}
                      </Badge>
                      {assistant.isAdded && (
                        <Badge className="bg-green-900/30 text-green-400 border border-green-500/30 text-xs py-0">
                          已添加
                        </Badge>
                      )}
                    </div>

                    <div className="flex items-center justify-between text-xs text-gray-500 mb-4">
                      <div className="flex items-center">
                        <Star className="h-3 w-3 mr-1 text-yellow-400" />
                        <span>{assistant.rating.toFixed(1)}</span>
                      </div>
                      <div className="flex items-center">
                        <Download className="h-3 w-3 mr-1" />
                        <span>{assistant.downloads}</span>
                      </div>
                      <div>
                        {assistant.price === 0 ? (
                          <span className="text-green-400">免费</span>
                        ) : (
                          <span className="text-blue-400">¥{assistant.price}</span>
                        )}
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        className="flex-1 border-blue-500/30 text-blue-400 hover:bg-blue-500/20"
                        onClick={() => handleViewDetails(assistant)}
                      >
                        <Info className="h-4 w-4 mr-1" />
                        详情
                      </Button>
                      <Button
                        className={`flex-1 ${
                          assistant.isAdded ? "bg-gray-700 hover:bg-gray-600" : "bg-blue-600 hover:bg-blue-500"
                        }`}
                        onClick={() => handleAddAssistant(assistant)}
                      >
                        {assistant.isAdded ? (
                          <>
                            <Check className="h-4 w-4 mr-1" />
                            已添加
                          </>
                        ) : (
                          <>
                            <Plus className="h-4 w-4 mr-1" />
                            添加
                          </>
                        )}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* 助手详情对话框 */}
      <Dialog open={isDetailsDialogOpen} onOpenChange={setIsDetailsDialogOpen}>
        <DialogContent className="bg-gray-900 border-gray-800 text-white max-w-md">
          <DialogHeader>
            <DialogTitle>AI助手详情</DialogTitle>
          </DialogHeader>
          {selectedAssistant && (
            <div className="space-y-4">
              <div className="flex items-center">
                <div className="relative w-16 h-16 mr-4 rounded-full overflow-hidden">
                  <Image
                    src={selectedAssistant.avatar || "/placeholder.svg"}
                    alt={selectedAssistant.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <h3 className="text-lg font-medium text-white">{selectedAssistant.name}</h3>
                  <p className="text-sm text-gray-400">{selectedAssistant.description}</p>
                </div>
              </div>

              <div className="flex flex-wrap gap-2">
                <Badge variant="outline" className="text-xs py-0 border-gray-700 text-gray-300">
                  {selectedAssistant.type === "assistant" ? "AI助手" : "AI模型"}
                </Badge>
                <Badge
                  className={`text-xs py-0 border ${getColorClass(
                    categories.find((c) => c.id === selectedAssistant.categoryId)?.color || "blue",
                  )}`}
                >
                  {categories.find((c) => c.id === selectedAssistant.categoryId)?.name || "其他"}
                </Badge>
                {selectedAssistant.isAdded && (
                  <Badge className="bg-green-900/30 text-green-400 border border-green-500/30 text-xs py-0">
                    已添加
                  </Badge>
                )}
              </div>

              <div className="grid grid-cols-2 gap-2 text-sm">
                <div className="bg-gray-800 p-2 rounded-md">
                  <p className="text-gray-400">价格</p>
                  <p className="text-white">
                    {selectedAssistant.price === 0 ? (
                      <span className="text-green-400">免费</span>
                    ) : (
                      <span className="text-blue-400">¥{selectedAssistant.price}</span>
                    )}
                  </p>
                </div>
                <div className="bg-gray-800 p-2 rounded-md">
                  <p className="text-gray-400">评分</p>
                  <p className="text-white">
                    <span className="text-yellow-400">{selectedAssistant.rating.toFixed(1)}</span> / 5.0
                  </p>
                </div>
                <div className="bg-gray-800 p-2 rounded-md">
                  <p className="text-gray-400">下载次数</p>
                  <p className="text-white">{selectedAssistant.downloads}</p>
                </div>
                <div className="bg-gray-800 p-2 rounded-md">
                  <p className="text-gray-400">更新日期</p>
                  <p className="text-white">{formatDate(selectedAssistant.updatedAt)}</p>
                </div>
              </div>

              <div>
                <h4 className="text-sm font-medium text-gray-300 mb-2">功能特点</h4>
                <div className="flex flex-wrap gap-2">
                  {selectedAssistant.features.map((feature, index) => (
                    <Badge key={index} variant="outline" className="bg-gray-800 border-gray-700">
                      {feature}
                    </Badge>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="text-sm font-medium text-gray-300 mb-2">开发者</h4>
                <p className="text-sm text-gray-400">{selectedAssistant.createdBy}</p>
              </div>

              <div className="pt-2">
                <Button
                  className={`w-full ${
                    selectedAssistant.isAdded ? "bg-gray-700 hover:bg-gray-600" : "bg-blue-600 hover:bg-blue-500"
                  }`}
                  onClick={() => {
                    setIsDetailsDialogOpen(false)
                    handleAddAssistant(selectedAssistant)
                  }}
                >
                  {selectedAssistant.isAdded ? (
                    <>
                      <Check className="h-4 w-4 mr-1" />
                      已添加
                    </>
                  ) : (
                    <>
                      <Plus className="h-4 w-4 mr-1" />
                      添加到我的AI助手
                    </>
                  )}
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* 添加助手对话框 */}
      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent className="bg-gray-900 border-gray-800 text-white">
          <DialogHeader>
            <DialogTitle>添加AI助手</DialogTitle>
            <DialogDescription className="text-gray-400">将AI助手添加到您的平台</DialogDescription>
          </DialogHeader>

          {assistantToAdd && (
            <div className="space-y-4 py-2">
              <div className="p-4 bg-gray-800 rounded-lg">
                <div className="flex items-center mb-3">
                  <div className="relative w-12 h-12 rounded-full overflow-hidden mr-3">
                    <Image
                      src={assistantToAdd.avatar || "/placeholder.svg"}
                      alt={assistantToAdd.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <h3 className="font-medium text-white">{assistantToAdd.name}</h3>
                    <p className="text-sm text-gray-400">{assistantToAdd.description}</p>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2 mb-2">
                  <Badge variant="outline" className="text-xs py-0 border-gray-700 text-gray-300">
                    {assistantToAdd.type === "assistant" ? "AI助手" : "AI模型"}
                  </Badge>
                  <Badge
                    className={`text-xs py-0 border ${getColorClass(
                      categories.find((c) => c.id === assistantToAdd.categoryId)?.color || "blue",
                    )}`}
                  >
                    {categories.find((c) => c.id === assistantToAdd.categoryId)?.name || "其他"}
                  </Badge>
                </div>

                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div className="flex items-center">
                    <span className="text-gray-400 mr-1">价格:</span>
                    {assistantToAdd.price === 0 ? (
                      <span className="text-green-400">免费</span>
                    ) : (
                      <span className="text-blue-400">¥{assistantToAdd.price}</span>
                    )}
                  </div>
                  <div className="flex items-center">
                    <span className="text-gray-400 mr-1">评分:</span>
                    <Star className="h-3 w-3 text-yellow-400 mr-1" />
                    <span>{assistantToAdd.rating.toFixed(1)}</span>
                  </div>
                </div>
              </div>

              <div>
                <Label htmlFor="target-category" className="text-white mb-2 block">
                  选择分类 <span className="text-red-400">*</span>
                </Label>
                <Select
                  value={targetCategory?.toString() || ""}
                  onValueChange={(value) => setTargetCategory(Number.parseInt(value))}
                >
                  <SelectTrigger id="target-category" className="bg-gray-800 border-gray-700 text-white">
                    <SelectValue placeholder="选择分类" />
                  </SelectTrigger>
                  <SelectContent className="bg-gray-900 border-gray-700 text-white">
                    {categories.map((category) => (
                      <SelectItem key={category.id} value={category.id.toString()}>
                        <div className="flex items-center">
                          {getIconComponent(category.icon, "h-4 w-4 mr-2")}
                          <span>{category.name}</span>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox id="publish-homepage" defaultChecked />
                <Label htmlFor="publish-homepage" className="text-sm text-gray-300">
                  发布到主页
                </Label>
              </div>

              <Alert className="bg-blue-900/20 border-blue-800">
                <Info className="h-4 w-4 text-blue-400" />
                <AlertDescription className="text-blue-300">
                  添加后，此AI助手将显示在您的AI助手列表中，标记为"市场"来源。
                </AlertDescription>
              </Alert>
            </div>
          )}

          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsAddDialogOpen(false)}
              className="border-gray-700 text-gray-300"
            >
              取消
            </Button>
            <Button onClick={confirmAddAssistant} className="bg-blue-600 hover:bg-blue-500">
              确认添加
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

// 图标组件
const MessageSquareIconComponent = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
  </svg>
)

const ImageIconIconComponent = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
    <circle cx="8.5" cy="8.5" r="1.5"></circle>
    <polyline points="21 15 16 10 5 21"></polyline>
  </svg>
)

const VideoIconComponent = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <polygon points="23 7 16 12 23 17 23 7"></polygon>
    <rect x="1" y="5" width="15" height="14" rx="2" ry="2"></rect>
  </svg>
)

const UserIcon = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
    <circle cx="12" cy="7" r="4"></circle>
  </svg>
)

const SparklesIconComponent = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"></path>
  </svg>
)

const BookOpenIconComponent = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path>
    <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path>
  </svg>
)

const Briefcase = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect>
    <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path>
  </svg>
)

const Code = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <polyline points="16 18 22 12 16 6"></polyline>
    <polyline points="8 6 2 12 8 18"></polyline>
  </svg>
)

const Globe = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <circle cx="12" cy="12" r="10"></circle>
    <line x1="2" y1="12" x2="22" y2="12"></line>
    <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
  </svg>
)

const Heart = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
  </svg>
)

const Music = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M9 18V5l12-2v13"></path>
    <circle cx="6" cy="18" r="3"></circle>
    <circle cx="18" cy="16" r="3"></circle>
  </svg>
)

const ShoppingBag = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path>
    <line x1="3" y1="6" x2="21" y2="6"></line>
    <path d="M16 10a4 4 0 0 1-8 0"></path>
  </svg>
)
