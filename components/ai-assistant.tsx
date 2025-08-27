"use client"

import { useState } from "react"
import Image from "next/image"
import {
  Search,
  Plus,
  MessageSquare,
  ImageIcon,
  Video,
  User,
  Sparkles,
  BookOpen,
  ShoppingBag,
  Mic,
  PenTool,
  TrendingUp,
  Star,
  GripVertical,
  MoreVertical,
} from "lucide-react"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { useRouter } from "next/navigation"

export function AiAssistant() {
  const [searchQuery, setSearchQuery] = useState("")
  const [activeSection, setActiveSection] = useState("chatModels") // Added state for active sidebar section
  const router = useRouter()

  const sidebarItems = [
    {
      id: "chatModels",
      name: "对话模型",
      icon: <MessageSquare className="h-5 w-5" />,
      count: 4,
    },
    {
      id: "mediaModels",
      name: "创意生成模型",
      icon: (
        <div className="flex">
          <PenTool className="h-4 w-4 mr-1" />
          <ImageIcon className="h-4 w-4" />
        </div>
      ),
      count: 3,
    },
    {
      id: "digitalHuman",
      name: "数字人平台",
      icon: <User className="h-5 w-5" />,
      count: 1,
    },
    {
      id: "aiAssistants",
      name: "AI助手",
      icon: <Sparkles className="h-5 w-5" />,
      count: 5,
    },
    {
      id: "myAssistants",
      name: "我的助手",
      icon: <Star className="h-5 w-5" />,
      count: 3,
    },
  ]

  // 控制各模块的折叠状态
  const [collapsedSections, setCollapsedSections] = useState({
    chatModels: false,
    mediaModels: false,
    digitalHuman: false,
    aiAssistants: false,
    myAssistants: false,
  })

  // 切换折叠状态
  const toggleSection = (section) => {
    setCollapsedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }))
  }

  // AI大模型 - 对话模型
  const chatModels = [
    {
      id: 1,
      name: "DeepSeek",
      icon: "/deepseek-ai-logo.png",
      description: "强大的中文大语言模型",
      type: "market",
      order: 1,
    },
    {
      id: 2,
      name: "ChatGPT",
      icon: "/chatgpt-inspired-abstract.png",
      description: "OpenAI旗下对话模型",
      type: "market",
      order: 2,
    },
    {
      id: 3,
      name: "豆包",
      icon: "/doubao-ai-logo.png",
      description: "字节跳动推出的AI助手",
      type: "market",
      order: 3,
    },
    {
      id: 4,
      name: "Kimi",
      icon: "/kimi-ai-logo.png",
      description: "专注于中文理解的AI模型",
      type: "market",
      order: 4,
    },
  ]

  // AI大模型 - 创意生成模型
  const mediaModels = [
    {
      id: 1,
      name: "创意文案生成器",
      icon: "/ai-copywriting.png",
      description: "AI文案创作与优化",
      type: "文案",
      order: 1,
    },
    {
      id: 2,
      name: "商品图生成器",
      icon: "/generic-product-display.png",
      description: "AI商品图片生成与编辑",
      type: "图像",
      order: 2,
    },
    {
      id: 3,
      name: "短视频脚本助手",
      icon: "/video-script-assistant.png",
      description: "AI短视频脚本创作",
      type: "脚本",
      order: 3,
    },
  ]

  // 数字人平台
  const digitalHumanPlatform = {
    id: 1,
    name: "数字主播工作室",
    icon: "/digital-human-livestream.png",
    description: "专业数字人直播带货平台",
    type: "market",
    order: 1,
  }

  // AI助手分类
  const aiAssistants = [
    {
      id: 1,
      name: "电商文案助手",
      icon: <PenTool className="h-5 w-5 text-purple-400" />,
      description: "生成吸引人的商品描述和推广文案",
      type: "personal",
      order: 1,
    },
    {
      id: 2,
      name: "短视频策划师",
      icon: <Video className="h-5 w-5 text-pink-400" />,
      description: "提供短视频创意和内容规划",
      type: "personal",
      order: 2,
    },
    {
      id: 3,
      name: "直播话术教练",
      icon: <Mic className="h-5 w-5 text-purple-400" />,
      description: "提供直播互动和销售话术建议",
      type: "personal",
      order: 3,
    },
    {
      id: 4,
      name: "选品分析师",
      icon: <ShoppingBag className="h-5 w-5 text-green-400" />,
      description: "分析产品市场潜力和销售策略",
      type: "personal",
      order: 4,
    },
    {
      id: 5,
      name: "流量增长顾问",
      icon: <TrendingUp className="h-5 w-5 text-amber-400" />,
      description: "提供账号增长和流量获取策略",
      type: "personal",
      order: 5,
    },
  ]

  // 我的助手 - 用户自己创建的AI助手
  const myAssistants = [
    {
      id: 1,
      name: "淘宝店铺运营助手",
      icon: "/taobao-store-management.png",
      description: "提供淘宝店铺运营和优化建议",
      lastUsed: "今天",
      type: "personal",
      isShared: true,
      order: 1,
    },
    {
      id: 2,
      name: "抖音内容创作助手",
      icon: "/tiktok-content-creation.png",
      description: "帮助策划和创作抖音短视频内容",
      lastUsed: "昨天",
      type: "personal",
      isShared: false,
      order: 2,
    },
    {
      id: 3,
      name: "小红书爆款笔记助手",
      icon: "/placeholder-8cnxz.png",
      description: "帮助创作小红书爆款笔记",
      lastUsed: "3天前",
      type: "market",
      isShared: false,
      order: 3,
    },
  ]

  // 根据搜索过滤
  const filterBySearch = (item) => {
    if (!searchQuery) return true
    return (
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase())
    )
  }

  const filteredChatModels = chatModels.filter(filterBySearch)
  const filteredMediaModels = mediaModels.filter(filterBySearch)
  const filteredAiAssistants = aiAssistants.filter(filterBySearch)
  const filteredMyAssistants = myAssistants.filter(filterBySearch)
  const filteredDigitalHuman = searchQuery
    ? digitalHumanPlatform.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      digitalHumanPlatform.description.toLowerCase().includes(searchQuery.toLowerCase())
    : true

  // 获取图标组件
  const getIconComponent = (iconName, className = "h-5 w-5") => {
    const icons = {
      "message-square": <MessageSquare className={className} />,
      image: <ImageIcon className={className} />,
      video: <Video className={className} />,
      user: <User className={className} />,
      sparkles: <Sparkles className={className} />,
      "book-open": <BookOpen className={className} />,
    }
    return icons[iconName] || <MessageSquare className={className} />
  }

  const renderContent = () => {
    switch (activeSection) {
      case "chatModels":
        return (
          <div className="space-y-2">
            {filteredChatModels.length > 0 ? (
              filteredChatModels.map((model) => (
                <Card
                  key={model.id}
                  className="flex items-center p-3 bg-gray-900 border border-gray-800 rounded-lg cursor-pointer hover:bg-gray-800 transition-colors"
                  onClick={() =>
                    router.push(
                      `/ai-chat/${model.id === 1 ? "deepseek" : model.id === 2 ? "chatgpt" : model.id === 3 ? "doubao" : "kimi"}`,
                    )
                  }
                >
                  <div className="flex-shrink-0 mr-3">
                    <GripVertical className="h-5 w-5 text-gray-500 cursor-grab" />
                  </div>
                  <div className="relative w-10 h-10 rounded-full overflow-hidden mr-3 flex-shrink-0">
                    <Image src={model.icon || "/placeholder.svg"} alt={model.name} fill className="object-cover" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center mb-1">
                      <h3 className="text-white font-medium truncate">{model.name}</h3>
                    </div>
                    <p className="text-sm text-gray-400 truncate">{model.description}</p>
                  </div>
                </Card>
              ))
            ) : (
              <div className="text-center py-4 text-gray-500">没有找到匹配的对话模型</div>
            )}
          </div>
        )

      case "mediaModels":
        return (
          <div className="space-y-2">
            {filteredMediaModels.length > 0 ? (
              filteredMediaModels.map((model) => (
                <Card
                  key={model.id}
                  className="flex items-center p-3 bg-gray-900 border border-gray-800 rounded-lg cursor-pointer hover:bg-gray-800 transition-colors"
                  onClick={() =>
                    router.push(
                      `/ai-chat/${model.id === 1 ? "copywriter" : model.id === 2 ? "image-gen" : "script-gen"}`,
                    )
                  }
                >
                  <div className="flex-shrink-0 mr-3">
                    <GripVertical className="h-5 w-5 text-gray-500 cursor-grab" />
                  </div>
                  <div className="relative w-10 h-10 rounded-full overflow-hidden mr-3 flex-shrink-0">
                    <Image src={model.icon || "/placeholder.svg"} alt={model.name} fill className="object-cover" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center mb-1">
                      <h3 className="text-white font-medium truncate">{model.name}</h3>
                    </div>
                    <p className="text-sm text-gray-400 truncate">{model.description}</p>
                  </div>
                </Card>
              ))
            ) : (
              <div className="text-center py-4 text-gray-500">没有找到匹配的创意生成模型</div>
            )}
          </div>
        )

      case "digitalHuman":
        return filteredDigitalHuman ? (
          <div className="space-y-2">
            <Card className="flex items-center p-3 bg-gray-900 border border-gray-800 rounded-lg cursor-pointer hover:bg-gray-800 transition-colors">
              <div className="flex-shrink-0 mr-3">
                <GripVertical className="h-5 w-5 text-gray-500 cursor-grab" />
              </div>
              <div className="relative w-10 h-10 rounded-full overflow-hidden mr-3 flex-shrink-0">
                <Image
                  src={digitalHumanPlatform.icon || "/placeholder.svg"}
                  alt={digitalHumanPlatform.name}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center mb-1">
                  <h3 className="text-white font-medium truncate">{digitalHumanPlatform.name}</h3>
                </div>
                <p className="text-sm text-gray-400 truncate">{digitalHumanPlatform.description}</p>
              </div>
            </Card>
          </div>
        ) : (
          <div className="text-center py-4 text-gray-500">没有找到匹配的数字人平台</div>
        )

      case "aiAssistants":
        return (
          <div className="space-y-2">
            {filteredAiAssistants.length > 0 ? (
              filteredAiAssistants.map((assistant) => (
                <Card
                  key={assistant.id}
                  className="flex items-center p-3 bg-gray-900 border border-gray-800 rounded-lg cursor-pointer hover:bg-gray-800 transition-colors"
                  onClick={() =>
                    router.push(
                      `/ai-chat/${assistant.id === 1 ? "copywriter" : assistant.id === 2 ? "video-planner" : assistant.id === 3 ? "livestream-coach" : assistant.id === 4 ? "product-analyst" : "growth-advisor"}`,
                    )
                  }
                >
                  <div className="flex-shrink-0 mr-3">
                    <GripVertical className="h-5 w-5 text-gray-500 cursor-grab" />
                  </div>
                  <div className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center mr-3 flex-shrink-0">
                    {assistant.icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center mb-1">
                      <h3 className="text-white font-medium truncate">{assistant.name}</h3>
                    </div>
                    <p className="text-sm text-gray-400 truncate">{assistant.description}</p>
                  </div>
                </Card>
              ))
            ) : (
              <div className="text-center py-4 text-gray-500">没有找到匹配的AI助手</div>
            )}
          </div>
        )

      case "myAssistants":
        return (
          <div className="space-y-2">
            {filteredMyAssistants.length > 0 ? (
              filteredMyAssistants.map((assistant) => (
                <Card
                  key={assistant.id}
                  className="flex items-center p-3 bg-gray-900 border border-gray-800 rounded-lg cursor-pointer hover:bg-gray-800 transition-colors"
                  onClick={() =>
                    router.push(
                      `/ai-chat/${assistant.id === 1 ? "taobao-assistant" : assistant.id === 2 ? "tiktok-creator" : "xiaohongshu-writer"}`,
                    )
                  }
                >
                  <div className="flex-shrink-0 mr-3">
                    <GripVertical className="h-5 w-5 text-gray-500 cursor-grab" />
                  </div>
                  <div className="relative w-10 h-10 rounded-full overflow-hidden mr-3 flex-shrink-0">
                    <Image
                      src={assistant.icon || "/placeholder.svg"}
                      alt={assistant.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center mb-1">
                      <h3 className="text-white font-medium truncate mr-2">{assistant.name}</h3>
                      <div className="flex flex-wrap gap-1">
                        <Badge variant="outline" className="text-xs py-0 border-gray-700 text-gray-300">
                          {assistant.type === "personal" ? "个人" : "市场"}
                        </Badge>
                        {assistant.isShared && (
                          <Badge className="bg-blue-900/30 text-blue-400 border border-blue-500/30 text-xs py-0">
                            已分享
                          </Badge>
                        )}
                      </div>
                    </div>
                    <p className="text-sm text-gray-400 truncate">{assistant.description}</p>
                  </div>
                  <div className="flex items-center gap-1 ml-2 flex-shrink-0">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 rounded-full bg-gray-800 hover:bg-gray-700"
                        >
                          <MoreVertical className="h-4 w-4 text-gray-400" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent className="bg-gray-900 border-gray-700 text-white">
                        <DropdownMenuItem className="cursor-pointer">
                          <MessageSquare className="h-4 w-4 mr-2 text-green-400" />
                          开始对话
                        </DropdownMenuItem>
                        <DropdownMenuItem className="cursor-pointer">
                          <Star className="h-4 w-4 mr-2 text-yellow-400" />
                          添加到收藏
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </Card>
              ))
            ) : (
              <div className="text-center py-4 text-gray-500">没有找到匹配的个人助手</div>
            )}
          </div>
        )

      default:
        return null
    }
  }

  return (
    <div className="flex h-screen bg-black text-white">
      {" "}
      {/* Changed to horizontal flex layout */}
      <div className="w-64 bg-gray-900 border-r border-gray-800 flex flex-col">
        {/* Sidebar header */}
        <div className="p-4 border-b border-gray-800">
          <Link href="/ai-assistant/create">
            <button className="w-full flex items-center justify-center bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
              <Plus className="h-4 w-4 mr-2" />
              <span className="text-sm">创建AI助手</span>
            </button>
          </Link>
        </div>

        {/* Sidebar navigation */}
        <div className="flex-1 p-2">
          {sidebarItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveSection(item.id)}
              className={`w-full flex items-center justify-between p-3 rounded-lg mb-1 transition-colors ${
                activeSection === item.id
                  ? "bg-blue-600 text-white"
                  : "text-gray-300 hover:bg-gray-800 hover:text-white"
              }`}
            >
              <div className="flex items-center">
                <div className="mr-3 text-current">{item.icon}</div>
                <span className="text-sm font-medium">{item.name}</span>
              </div>
              <Badge
                className={`text-xs ${
                  activeSection === item.id ? "bg-blue-700 text-white" : "bg-gray-800 text-gray-300"
                }`}
              >
                {item.count}
              </Badge>
            </button>
          ))}
        </div>
      </div>
      <div className="flex-1 flex flex-col">
        {/* Top search bar */}
        <div className="p-4 border-b border-gray-800">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 h-4 w-4" />
            <Input
              placeholder="搜索AI助手..."
              className="pl-9 bg-gray-900 border-gray-700 text-white placeholder:text-gray-500 focus-visible:ring-blue-500"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        {/* Content area */}
        <div className="flex-1 p-4 overflow-y-auto">
          <div className="mb-4">
            <h2 className="text-xl font-semibold text-white">
              {sidebarItems.find((item) => item.id === activeSection)?.name}
            </h2>
          </div>
          {renderContent()}
        </div>
      </div>
    </div>
  )
}
