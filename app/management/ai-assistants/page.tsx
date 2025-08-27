"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { useRouter } from "next/navigation"
import {
  ArrowLeft,
  Plus,
  Search,
  Edit,
  Trash2,
  MoreVertical,
  MessageSquare,
  FolderPlus,
  GripVertical,
  Eye,
  EyeOff,
  ShoppingCart,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  ImageIcon,
  Video,
  User,
  Sparkles,
  BookOpen,
  Globe,
  AlertCircle,
  MoveVertical,
} from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Checkbox } from "@/components/ui/checkbox"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function AiAssistantsManagement() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState("")
  const [newCategoryName, setNewCategoryName] = useState("")
  const [isAddCategoryOpen, setIsAddCategoryOpen] = useState(false)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [assistantToDelete, setAssistantToDelete] = useState(null)
  const [isCategoryDeleteDialogOpen, setIsCategoryDeleteDialogOpen] = useState(false)
  const [categoryToDelete, setCategoryToDelete] = useState(null)
  const [isEditCategoryNameDialogOpen, setIsEditCategoryNameDialogOpen] = useState(false)
  const [categoryToEditName, setCategoryToEditName] = useState(null)
  const [showSuccessMessage, setShowSuccessMessage] = useState(false)
  const [successMessageText, setSuccessMessageText] = useState("")
  const [isEditNameDialogOpen, setIsEditNameDialogOpen] = useState(false)
  const [assistantToEditName, setAssistantToEditName] = useState(null)
  const [isMoveDialogOpen, setIsMoveDialogOpen] = useState(false)
  const [assistantToMove, setAssistantToMove] = useState(null)
  const [targetCategoryId, setTargetCategoryId] = useState(null)
  const [draggedItem, setDraggedItem] = useState(null)
  const [dragOverItem, setDragOverItem] = useState(null)
  const [draggedCategory, setDraggedCategory] = useState(null)
  const [dragOverCategory, setDragOverCategory] = useState(null)

  // 控制各模块的折叠状态
  const [collapsedSections, setCollapsedSections] = useState({})

  // 切换折叠状态
  const toggleSection = (section) => {
    setCollapsedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }))
  }

  // 分类数据
  const [categories, setCategories] = useState([
    {
      id: 1,
      name: "对话模型",
      order: 1,
      assistantCount: 4,
      color: "blue",
      isSystem: true,
      icon: "message-square",
      isPublished: true,
    },
    {
      id: 2,
      name: "绘图和视频模型",
      order: 2,
      assistantCount: 2,
      color: "purple",
      isSystem: true,
      icon: "image",
      isPublished: true,
    },
    {
      id: 3,
      name: "数字人平台",
      order: 3,
      assistantCount: 1,
      color: "green",
      isSystem: true,
      icon: "user",
      isPublished: true,
    },
    {
      id: 4,
      name: "AI助手",
      order: 4,
      assistantCount: 6,
      color: "yellow",
      isSystem: true,
      icon: "sparkles",
      isPublished: true,
    },
    {
      id: 5,
      name: "学习辅导",
      order: 5,
      assistantCount: 3,
      color: "cyan",
      isSystem: false,
      icon: "book-open",
      isPublished: true,
    },
    {
      id: 6,
      name: "职业发展",
      order: 6,
      assistantCount: 2,
      color: "pink",
      isSystem: false,
      icon: "briefcase",
      isPublished: false,
    },
  ])

  // AI助手数据
  const [assistants, setAssistants] = useState([
    {
      id: 1,
      name: "DeepSeek",
      description: "强大的中文大语言模型，支持自然语言对话和知识问答",
      avatar: "/images/ai-assistant-1.png",
      categoryId: 1,
      isPublished: true,
      isPublishedToMarket: false,
      type: "market",
      order: 1,
      source: "market",
      usageCount: 156,
      lastUsed: "2023-12-05T14:22:00Z",
      model: "deepseek",
      createdAt: "2023-10-15T08:30:00Z",
      featured: true,
      rating: 4.8,
      totalUsers: 42,
    },
    {
      id: 2,
      name: "ChatGPT",
      description: "OpenAI旗下对话模型，支持多种语言的自然对话",
      avatar: "/images/ai-assistant-2.png",
      categoryId: 1,
      isPublished: true,
      isPublishedToMarket: false,
      type: "market",
      order: 2,
      source: "market", // 市场添加
      usageCount: 87,
      lastUsed: "2023-12-10T09:45:00Z",
      model: "chatgpt",
      createdAt: "2023-10-20T14:45:00Z",
      featured: false,
      rating: 4.5,
      totalUsers: 23,
    },
    {
      id: 3,
      name: "豆包",
      description: "字节跳动推出的AI助手，擅长中文创作和对话",
      avatar: "/images/ai-assistant-3.png",
      categoryId: 1,
      isPublished: true,
      isPublishedToMarket: false,
      type: "market",
      order: 3,
      source: "market", // 市场添加
      usageCount: 203,
      lastUsed: "2023-12-15T11:30:00Z",
      model: "doubao",
      createdAt: "2023-11-05T16:20:00Z",
      featured: true,
      rating: 4.7,
      totalUsers: 78,
    },
    {
      id: 4,
      name: "Kimi",
      description: "专注于中文理解的AI模型，提供精准的知识问答",
      avatar: "/images/ai-assistant-4.png",
      categoryId: 1,
      isPublished: true,
      isPublishedToMarket: false,
      type: "market",
      order: 4,
      source: "market", // 市场添加
      usageCount: 112,
      lastUsed: "2023-12-20T16:15:00Z",
      model: "kimi",
      createdAt: "2023-11-15T09:10:00Z",
      featured: false,
      rating: 4.6,
      totalUsers: 35,
    },
    {
      id: 5,
      name: "即梦",
      description: "AI图像生成与编辑工具，支持多种风格和高清图像生成",
      avatar: "/images/ai-assistant-5.png",
      categoryId: 2,
      isPublished: true,
      isPublishedToMarket: false,
      type: "market",
      order: 1,
      source: "market", // 市场添加
      usageCount: 78,
      lastUsed: "2023-12-18T13:25:00Z",
      model: "deepseek",
      createdAt: "2023-11-25T11:30:00Z",
      featured: false,
      rating: 4.4,
      totalUsers: 27,
    },
    {
      id: 6,
      name: "可灵",
      description: "AI视频生成与编辑工具，支持多种场景和特效",
      avatar: "/images/ai-assistant-6.png",
      categoryId: 2,
      isPublished: true,
      isPublishedToMarket: false,
      type: "market",
      order: 2,
      source: "market", // 市场添加
      usageCount: 145,
      lastUsed: "2023-12-22T10:15:00Z",
      model: "chatgpt",
      createdAt: "2023-12-01T15:40:00Z",
      featured: true,
      rating: 4.8,
      totalUsers: 56,
    },
    {
      id: 7,
      name: "硅基智能",
      description: "专业数字人开发平台，支持定制化数字人形象和交互",
      avatar: "/images/ai-assistant-2.png",
      categoryId: 3,
      isPublished: true,
      isPublishedToMarket: false,
      type: "market",
      order: 1,
      source: "market",
      usageCount: 67,
      lastUsed: "2023-12-16T09:20:00Z",
      model: "kimi",
      createdAt: "2023-11-30T13:15:00Z",
      featured: false,
      rating: 4.3,
      totalUsers: 19,
    },
    {
      id: 8,
      name: "课程顾问",
      description: "为您推荐合适的课程，提供学习建议",
      avatar: "/images/ai-assistant-3.png",
      categoryId: 4,
      isPublished: true,
      isPublishedToMarket: true,
      type: "personal",
      order: 1,
      source: "created",
      usageCount: 109,
      lastUsed: "2023-12-21T17:40:00Z",
      model: "deepseek",
      createdAt: "2023-12-05T09:30:00Z",
      featured: true,
      rating: 4.9,
      totalUsers: 48,
    },
    {
      id: 9,
      name: "客服助手",
      description: "解答平台使用问题，提供技术支持",
      avatar: "/images/ai-assistant-4.png",
      categoryId: 4,
      isPublished: true,
      isPublishedToMarket: false,
      type: "personal",
      order: 2,
      source: "created",
      usageCount: 156,
      lastUsed: "2023-12-22T14:35:00Z",
      model: "deepseek",
      createdAt: "2023-12-10T10:15:00Z",
      featured: false,
      rating: 4.7,
      totalUsers: 62,
    },
    {
      id: 10,
      name: "班主任",
      description: "学习规划与时间管理，督促学习进度",
      avatar: "/images/ai-assistant-5.png",
      categoryId: 4,
      isPublished: true,
      isPublishedToMarket: false,
      type: "personal",
      order: 3,
      source: "created",
      usageCount: 89,
      lastUsed: "2023-12-20T11:20:00Z",
      model: "chatgpt",
      createdAt: "2023-12-08T16:45:00Z",
      featured: false,
      rating: 4.6,
      totalUsers: 37,
    },
    {
      id: 11,
      name: "数学老师",
      description: "数学题目解析与辅导，提供详细解题步骤",
      avatar: "/images/ai-assistant-6.png",
      categoryId: 4,
      isPublished: true,
      isPublishedToMarket: true,
      type: "personal",
      order: 4,
      source: "created",
      usageCount: 132,
      lastUsed: "2023-12-21T09:50:00Z",
      model: "deepseek",
      createdAt: "2023-12-12T14:20:00Z",
      featured: true,
      rating: 4.8,
      totalUsers: 53,
    },
    {
      id: 12,
      name: "物理老师",
      description: "物理概念与实验讲解，帮助理解物理原理",
      avatar: "/images/ai-assistant-1.png",
      categoryId: 4,
      isPublished: true,
      isPublishedToMarket: false,
      type: "personal",
      order: 5,
      source: "created",
      usageCount: 76,
      lastUsed: "2023-12-19T15:30:00Z",
      model: "chatgpt",
      createdAt: "2023-12-14T11:10:00Z",
      featured: false,
      rating: 4.5,
      totalUsers: 29,
    },
    {
      id: 13,
      name: "英语老师",
      description: "英语学习与口语练习，提供语法指导",
      avatar: "/images/ai-assistant-2.png",
      categoryId: 4,
      isPublished: true,
      isPublishedToMarket: false,
      type: "personal",
      order: 6,
      source: "created",
      usageCount: 118,
      lastUsed: "2023-12-22T13:40:00Z",
      model: "deepseek",
      createdAt: "2023-12-15T10:25:00Z",
      featured: true,
      rating: 4.7,
      totalUsers: 45,
    },
    {
      id: 14,
      name: "高考英语助手",
      description: "专注高考英语词汇和写作，提供个性化学习计划和练习",
      avatar: "/images/ai-assistant-3.png",
      categoryId: 5,
      isPublished: true,
      isPublishedToMarket: true,
      type: "personal",
      order: 1,
      source: "created",
      usageCount: 156,
      lastUsed: "2023-12-05T14:22:00Z",
      model: "deepseek",
      createdAt: "2023-10-15T08:30:00Z",
      featured: true,
      rating: 4.8,
      totalUsers: 42,
    },
    {
      id: 15,
      name: "数学解题专家",
      description: "解答高等数学难题，提供详细的解题步骤和思路分析",
      avatar: "/images/ai-assistant-4.png",
      categoryId: 5,
      isPublished: false,
      isPublishedToMarket: false,
      type: "personal",
      order: 2,
      source: "created",
      usageCount: 87,
      lastUsed: "2023-12-10T09:45:00Z",
      model: "chatgpt",
      createdAt: "2023-10-20T14:45:00Z",
      featured: false,
      rating: 4.5,
      totalUsers: 23,
    },
    {
      id: 16,
      name: "物理实验助手",
      description: "物理实验指导与数据分析，帮助完成实验报告",
      avatar: "/images/ai-assistant-5.png",
      categoryId: 5,
      isPublished: true,
      isPublishedToMarket: false,
      type: "market",
      order: 3,
      source: "market",
      usageCount: 65,
      lastUsed: "2023-12-18T11:30:00Z",
      model: "doubao",
      createdAt: "2023-11-10T09:15:00Z",
      featured: false,
      rating: 4.4,
      totalUsers: 19,
    },
    {
      id: 17,
      name: "职业规划顾问",
      description: "提供职业发展建议和求职面试指导，帮助制定职业规划",
      avatar: "/images/ai-assistant-6.png",
      categoryId: 6,
      isPublished: true,
      isPublishedToMarket: false,
      type: "personal",
      order: 1,
      source: "created",
      usageCount: 203,
      lastUsed: "2023-12-15T11:30:00Z",
      model: "doubao",
      createdAt: "2023-11-05T16:20:00Z",
      featured: true,
      rating: 4.7,
      totalUsers: 78,
    },
    {
      id: 18,
      name: "会计税务顾问",
      description: "专业会计和税务咨询，解答财务问题和税收规划",
      avatar: "/images/ai-assistant-1.png",
      categoryId: 6,
      isPublished: true,
      isPublishedToMarket: false,
      type: "market",
      order: 2,
      source: "market",
      usageCount: 67,
      lastUsed: "2023-12-16T09:20:00Z",
      model: "kimi",
      createdAt: "2023-11-30T13:15:00Z",
      featured: false,
      rating: 4.3,
      totalUsers: 19,
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

  // 更新分类中的助手数量
  useEffect(() => {
    const updatedCategories = categories.map((category) => {
      const count = assistants.filter((assistant) => assistant.categoryId === category.id).length
      return { ...category, assistantCount: count }
    })
    setCategories(updatedCategories)
  }, [assistants])

  // 过滤助手
  const filteredAssistants = assistants.filter((assistant) => {
    return (
      assistant.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      assistant.description.toLowerCase().includes(searchQuery.toLowerCase())
    )
  })

  // 按顺序排序分类
  const sortedCategories = [...categories].sort((a, b) => a.order - b.order)

  // 获取分类颜色样式
  const getCategoryColorClass = (colorName) => {
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

  // 添加新分类
  const handleAddCategory = () => {
    if (newCategoryName.trim()) {
      const newId = Math.max(...categories.map((c) => c.id), 0) + 1
      const newCategory = {
        id: newId,
        name: newCategoryName.trim(),
        description: "",
        order: categories.length + 1,
        assistantCount: 0,
        color: "blue",
        icon: "folder",
        isSystem: false,
        isPublished: true,
      }
      setCategories([...categories, newCategory])
      setNewCategoryName("")
      setIsAddCategoryOpen(false)
      showSuccess("分类创建成功")

      // 添加新的折叠状态
      setCollapsedSections((prev) => ({
        ...prev,
        [`category_${newId}`]: false,
      }))
    }
  }

  // 打开删除助手确认对话框
  const openDeleteAssistantDialog = (assistant) => {
    setAssistantToDelete(assistant)
    setIsDeleteDialogOpen(true)
  }

  // 删除助手
  const handleDeleteAssistant = () => {
    if (!assistantToDelete) return

    setAssistants(assistants.filter((assistant) => assistant.id !== assistantToDelete.id))
    setIsDeleteDialogOpen(false)
    setAssistantToDelete(null)
    showSuccess("AI助手删除成功")
  }

  // 打开删除分类确认对话框
  const openDeleteCategoryDialog = (category) => {
    setCategoryToDelete(category)
    setIsCategoryDeleteDialogOpen(true)
  }

  // 删除分类
  const handleDeleteCategory = () => {
    if (!categoryToDelete) return

    // 系统分类不能删除
    if (categoryToDelete.isSystem) {
      showSuccess("系统分类不能被删除")
      setIsCategoryDeleteDialogOpen(false)
      setCategoryToDelete(null)
      return
    }

    // 将该分类下的助手移动到未分类
    const updatedAssistants = assistants.map((assistant) => {
      if (assistant.categoryId === categoryToDelete.id) {
        return { ...assistant, categoryId: null }
      }
      return assistant
    })

    // 删除分类
    const updatedCategories = categories.filter((category) => category.id !== categoryToDelete.id)

    // 重新排序
    const reorderedCategories = updatedCategories.map((category, index) => ({
      ...category,
      order: index + 1,
    }))

    setAssistants(updatedAssistants)
    setCategories(reorderedCategories)
    setIsCategoryDeleteDialogOpen(false)
    setCategoryToDelete(null)
    showSuccess("分类删除成功")
  }

  // 打开编辑分类名称对话框
  const openEditCategoryNameDialog = (category) => {
    setCategoryToEditName({ ...category })
    setIsEditCategoryNameDialogOpen(true)
  }

  // 保存编辑的分类名称
  const handleSaveEditCategoryName = () => {
    if (!categoryToEditName) return

    const updatedCategories = categories.map((category) => {
      if (category.id === categoryToEditName.id) {
        return { ...category, name: categoryToEditName.name }
      }
      return category
    })

    setCategories(updatedCategories)
    setIsEditCategoryNameDialogOpen(false)
    setCategoryToEditName(null)
    showSuccess("分类名称修改成功")
  }

  // 切换助手发布状态
  const handleTogglePublish = (assistantId) => {
    const updatedAssistants = assistants.map((assistant) => {
      if (assistant.id === assistantId) {
        const newStatus = !assistant.isPublished
        showSuccess(`AI助手${newStatus ? "发布" : "取消发布"}成功`)
        return { ...assistant, isPublished: newStatus }
      }
      return assistant
    })
    setAssistants(updatedAssistants)
  }

  // 切换分类发布状态
  const handleToggleCategoryPublish = (categoryId) => {
    const updatedCategories = categories.map((category) => {
      if (category.id === categoryId) {
        const newStatus = !category.isPublished
        showSuccess(`分类${newStatus ? "发布" : "取消发布"}成功`)
        return { ...category, isPublished: newStatus }
      }
      return category
    })
    setCategories(updatedCategories)
  }

  // 发布到市场
  const handlePublishToMarket = (assistantId) => {
    const updatedAssistants = assistants.map((assistant) => {
      if (assistant.id === assistantId) {
        const newStatus = !assistant.isPublishedToMarket
        showSuccess(`AI助手${newStatus ? "已发布到" : "已从"}市场${newStatus ? "" : "移除"}`)
        return { ...assistant, isPublishedToMarket: newStatus }
      }
      return assistant
    })
    setAssistants(updatedAssistants)
  }

  // 打开编辑名称对话框
  const openEditNameDialog = (assistant) => {
    setAssistantToEditName({ ...assistant })
    setIsEditNameDialogOpen(true)
  }

  // 保存编辑的名称
  const handleSaveEditName = () => {
    if (!assistantToEditName) return

    const updatedAssistants = assistants.map((assistant) => {
      if (assistant.id === assistantToEditName.id) {
        return { ...assistant, name: assistantToEditName.name }
      }
      return assistant
    })

    setAssistants(updatedAssistants)
    setIsEditNameDialogOpen(false)
    setAssistantToEditName(null)
    showSuccess("AI助手名称修改成功")
  }

  // 打开移动助手对话框
  const openMoveDialog = (assistant) => {
    setAssistantToMove(assistant)
    setTargetCategoryId(assistant.categoryId)
    setIsMoveDialogOpen(true)
  }

  // 移动助手到其他分类
  const handleMoveAssistant = () => {
    if (!assistantToMove || !targetCategoryId) return

    // 获取目标分类中的最大顺序
    const maxOrder = Math.max(0, ...assistants.filter((a) => a.categoryId === targetCategoryId).map((a) => a.order))

    const updatedAssistants = assistants.map((assistant) => {
      if (assistant.id === assistantToMove.id) {
        return {
          ...assistant,
          categoryId: targetCategoryId,
          order: maxOrder + 1, // 放在目标分类的最后
        }
      }
      return assistant
    })

    setAssistants(updatedAssistants)
    setIsMoveDialogOpen(false)
    setAssistantToMove(null)
    setTargetCategoryId(null)
    showSuccess("AI助手移动成功")
  }

  // 开始拖拽助手
  const handleDragStart = (e, assistant) => {
    setDraggedItem(assistant)
  }

  // 拖拽助手经过其他助手
  const handleDragOver = (e, assistant) => {
    e.preventDefault()
    if (draggedItem && draggedItem.id !== assistant.id) {
      setDragOverItem(assistant)
    }
  }

  // 放下助手
  const handleDrop = (e, assistant) => {
    e.preventDefault()
    if (draggedItem && dragOverItem && draggedItem.id !== dragOverItem.id) {
      // 如果是同一分类内的排序
      if (draggedItem.categoryId === dragOverItem.categoryId) {
        const updatedAssistants = assistants.map((a) => {
          // 调整被拖拽项的顺序
          if (a.id === draggedItem.id) {
            return { ...a, order: dragOverItem.order }
          }

          // 如果是向下拖拽，调整中间项的顺序
          if (
            draggedItem.order < dragOverItem.order &&
            a.categoryId === draggedItem.categoryId &&
            a.order > draggedItem.order &&
            a.order <= dragOverItem.order
          ) {
            return { ...a, order: a.order - 1 }
          }

          // 如果是向上拖拽，调整中间项的顺序
          if (
            draggedItem.order > dragOverItem.order &&
            a.categoryId === draggedItem.categoryId &&
            a.order < draggedItem.order &&
            a.order >= dragOverItem.order
          ) {
            return { ...a, order: a.order + 1 }
          }

          return a
        })

        setAssistants(updatedAssistants)
        showSuccess("AI助手排序已更新")
      }
    }

    setDraggedItem(null)
    setDragOverItem(null)
  }

  // 开始拖拽分类
  const handleCategoryDragStart = (e, category) => {
    setDraggedCategory(category)
  }

  // 拖拽分类经过其他分类
  const handleCategoryDragOver = (e, category) => {
    e.preventDefault()
    if (draggedCategory && draggedCategory.id !== category.id) {
      setDragOverCategory(category)
    }
  }

  // 放下分类
  const handleCategoryDrop = (e, category) => {
    e.preventDefault()
    if (draggedCategory && dragOverCategory && draggedCategory.id !== dragOverCategory.id) {
      const updatedCategories = categories.map((c) => {
        // 调整被拖拽项的顺序
        if (c.id === draggedCategory.id) {
          return { ...c, order: dragOverCategory.order }
        }

        // 如果是向下拖拽，调整中间项的顺序
        if (
          draggedCategory.order < dragOverCategory.order &&
          c.order > draggedCategory.order &&
          c.order <= dragOverCategory.order
        ) {
          return { ...c, order: c.order - 1 }
        }

        // 如果是向上拖拽，调整中间项的顺序
        if (
          draggedCategory.order > dragOverCategory.order &&
          c.order < draggedCategory.order &&
          c.order >= dragOverCategory.order
        ) {
          return { ...c, order: c.order + 1 }
        }

        return c
      })

      setCategories(updatedCategories)
      showSuccess("分类排序已更新")
    }

    setDraggedCategory(null)
    setDragOverCategory(null)
  }

  // 获取图标组件
  const getIconComponent = (iconName, className = "h-5 w-5") => {
    const icons = {
      "message-square": <MessageSquare className={className} />,
      image: <ImageIcon className={className} />,
      video: <Video className={className} />,
      user: <User className={className} />,
      sparkles: <Sparkles className={className} />,
      "book-open": <BookOpen className={className} />,
      globe: <Globe className={className} />,
    }
    return icons[iconName] || <MessageSquare className={className} />
  }

  return (
    <div className="min-h-screen bg-black text-white pb-20">
      {/* 顶部导航栏 */}
      <div className="sticky top-0 left-0 right-0 h-14 flex items-center px-4 bg-gray-900/80 backdrop-blur-md border-b border-gray-800 z-10">
        <Link href="/management" className="flex items-center text-gray-300">
          <ArrowLeft className="h-5 w-5 mr-2" />
          <span>返回</span>
        </Link>
        <h1 className="flex-1 text-center text-lg font-semibold text-white">AI助手设置</h1>
      </div>

      {/* 成功消息提示 */}
      {showSuccessMessage && (
        <div className="fixed top-16 left-1/2 transform -translate-x-1/2 z-50 bg-green-900/90 text-white px-4 py-2 rounded-md flex items-center shadow-lg border border-green-700">
          <CheckCircle2 className="h-5 w-5 mr-2 text-green-400" />
          <span>{successMessageText}</span>
        </div>
      )}

      <div className="p-4">
        {/* 顶部搜索框和创建按钮 */}
        <div className="flex items-center gap-3 mb-6">
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
            className="border-blue-500/30 text-blue-400 hover:bg-blue-500/20"
            onClick={() => setIsAddCategoryOpen(true)}
          >
            <FolderPlus className="h-5 w-5 mr-1" />
            新建分组
          </Button>
          <Link href="/ai-assistant/create">
            <Button className="bg-blue-600 hover:bg-blue-500">
              <Plus className="h-5 w-5 mr-1" />
              创建AI助手
            </Button>
          </Link>
        </div>

        {/* 分类和助手列表 */}
        {sortedCategories.map((category) => {
          const categoryAssistants = assistants
            .filter((a) => a.categoryId === category.id)
            .sort((a, b) => a.order - b.order)

          if (categoryAssistants.length === 0) return null

          const sectionKey = `category_${category.id}`
          const isCollapsed = collapsedSections[sectionKey]

          return (
            <div className="mb-6" key={category.id}>
              <div
                className="flex items-center justify-between mb-3 p-2 bg-gray-900 rounded-lg border border-gray-800"
                draggable
                onDragStart={(e) => handleCategoryDragStart(e, category)}
                onDragOver={(e) => handleCategoryDragOver(e, category)}
                onDrop={(e) => handleCategoryDrop(e, category)}
              >
                <div className="flex items-center">
                  <GripVertical className="h-5 w-5 text-gray-500 mr-2 cursor-grab" />
                  <h2 className="text-lg font-semibold text-white flex items-center">
                    {getIconComponent(category.icon, "h-5 w-5 text-blue-400 mr-2")}
                    {category.name}
                    <Badge className="ml-2 bg-gray-800 text-gray-300">{category.assistantCount}</Badge>
                  </h2>
                </div>
                <div className="flex items-center">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 rounded-full bg-gray-800 hover:bg-gray-700 mr-2"
                    onClick={() => openEditCategoryNameDialog(category)}
                  >
                    <Edit className="h-4 w-4 text-blue-400" />
                  </Button>
                  <div className="flex items-center mr-2">
                    <Badge
                      className={
                        category.isPublished
                          ? "bg-green-900/30 text-green-400 border border-green-500/30"
                          : "bg-gray-800 text-gray-400 border border-gray-700"
                      }
                    >
                      {category.isPublished ? "已发布" : "未发布"}
                    </Badge>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="p-0 h-6 text-gray-400 hover:text-white hover:bg-transparent"
                    onClick={() => toggleSection(sectionKey)}
                  >
                    {isCollapsed ? <ChevronDown size={18} /> : <ChevronUp size={18} />}
                  </Button>
                </div>
              </div>

              {!isCollapsed && (
                <>
                  <div className="space-y-2">
                    {categoryAssistants.map((assistant) => (
                      <div
                        key={assistant.id}
                        className={`flex items-center p-3 bg-gray-900 border border-gray-800 rounded-lg ${
                          dragOverItem?.id === assistant.id ? "border-blue-500" : ""
                        }`}
                        draggable
                        onDragStart={(e) => handleDragStart(e, assistant)}
                        onDragOver={(e) => handleDragOver(e, assistant)}
                        onDrop={(e) => handleDrop(e, assistant)}
                      >
                        <div className="flex-shrink-0 mr-3">
                          <GripVertical className="h-5 w-5 text-gray-500 cursor-grab" />
                        </div>
                        <div className="relative w-10 h-10 rounded-full overflow-hidden mr-3 flex-shrink-0">
                          <Image
                            src={assistant.avatar || "/placeholder.svg"}
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
                              {assistant.isPublishedToMarket && (
                                <Badge className="bg-purple-900/30 text-purple-400 border border-purple-500/30 text-xs py-0">
                                  已分享
                                </Badge>
                              )}
                              {assistant.isPublished && (
                                <Badge className="bg-green-900/30 text-green-400 border border-green-500/30 text-xs py-0">
                                  主页
                                </Badge>
                              )}
                            </div>
                          </div>
                          <p className="text-sm text-gray-400 truncate">{assistant.description}</p>
                        </div>
                        <div className="flex items-center gap-1 ml-2 flex-shrink-0">
                          <TooltipProvider>
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  className="h-8 w-8 rounded-full bg-gray-800 hover:bg-gray-700"
                                  onClick={() => window.open(`/ai-chat/${assistant.id}`, "_blank")}
                                >
                                  <MessageSquare className="h-4 w-4 text-green-400" />
                                </Button>
                              </TooltipTrigger>
                              <TooltipContent className="bg-gray-800 text-white border-gray-700">
                                <p>开始对话</p>
                              </TooltipContent>
                            </Tooltip>
                          </TooltipProvider>

                          <TooltipProvider>
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  className="h-8 w-8 rounded-full bg-gray-800 hover:bg-gray-700"
                                  onClick={() => {
                                    if (assistant.source === "market") {
                                      openEditNameDialog(assistant)
                                    } else {
                                      router.push(`/ai-assistant/edit/${assistant.id}`)
                                    }
                                  }}
                                >
                                  <Edit className="h-4 w-4 text-blue-400" />
                                </Button>
                              </TooltipTrigger>
                              <TooltipContent className="bg-gray-800 text-white border-gray-700">
                                <p>编辑</p>
                              </TooltipContent>
                            </Tooltip>
                          </TooltipProvider>

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
                              <DropdownMenuItem
                                className="cursor-pointer"
                                onClick={() => handleTogglePublish(assistant.id)}
                              >
                                {assistant.isPublished ? (
                                  <>
                                    <EyeOff className="h-4 w-4 mr-2 text-gray-400" />
                                    取消发布到主页
                                  </>
                                ) : (
                                  <>
                                    <Eye className="h-4 w-4 mr-2 text-green-400" />
                                    发布到主页
                                  </>
                                )}
                              </DropdownMenuItem>

                              <DropdownMenuItem className="cursor-pointer" onClick={() => openMoveDialog(assistant)}>
                                <MoveVertical className="h-4 w-4 mr-2 text-blue-400" />
                                移动到其他分类
                              </DropdownMenuItem>

                              {assistant.source === "created" && (
                                <DropdownMenuItem
                                  className="cursor-pointer"
                                  onClick={() => handlePublishToMarket(assistant.id)}
                                >
                                  {assistant.isPublishedToMarket ? (
                                    <>
                                      <ShoppingCart className="h-4 w-4 mr-2 text-gray-400" />
                                      从市场移除
                                    </>
                                  ) : (
                                    <>
                                      <ShoppingCart className="h-4 w-4 mr-2 text-purple-400" />
                                      分享到市场
                                    </>
                                  )}
                                </DropdownMenuItem>
                              )}

                              <DropdownMenuSeparator className="bg-gray-800" />

                              <DropdownMenuItem
                                className="text-red-400 cursor-pointer"
                                onClick={() => openDeleteAssistantDialog(assistant)}
                              >
                                <Trash2 className="h-4 w-4 mr-2" />
                                删除
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="flex justify-end mt-2 gap-2">
                    {!category.isSystem && (
                      <Button
                        variant="outline"
                        size="sm"
                        className="border-red-500/30 text-red-400 hover:bg-red-500/20"
                        onClick={() => openDeleteCategoryDialog(category)}
                      >
                        <Trash2 className="h-4 w-4 mr-1" />
                        删除分类
                      </Button>
                    )}
                    <Button
                      variant="outline"
                      size="sm"
                      className={
                        category.isPublished
                          ? "border-gray-500/30 text-gray-400 hover:bg-gray-500/20"
                          : "border-green-500/30 text-green-400 hover:bg-green-500/20"
                      }
                      onClick={() => handleToggleCategoryPublish(category.id)}
                    >
                      {category.isPublished ? (
                        <>
                          <EyeOff className="h-4 w-4 mr-1" />
                          取消发布
                        </>
                      ) : (
                        <>
                          <Eye className="h-4 w-4 mr-1" />
                          发布
                        </>
                      )}
                    </Button>
                  </div>
                </>
              )}
            </div>
          )
        })}
      </div>

      {/* 添加分类对话框 */}
      <Dialog open={isAddCategoryOpen} onOpenChange={setIsAddCategoryOpen}>
        <DialogContent className="bg-gray-900 border-gray-800 text-white">
          <DialogHeader>
            <DialogTitle>新建分组</DialogTitle>
            <DialogDescription className="text-gray-400">创建新的AI助手分组，便于管理和展示</DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <div>
              <Label htmlFor="category-name" className="text-white mb-2 block">
                分组名称 <span className="text-red-400">*</span>
              </Label>
              <Input
                id="category-name"
                placeholder="输入分组名称"
                className="bg-gray-800 border-gray-700 text-white"
                value={newCategoryName}
                onChange={(e) => setNewCategoryName(e.target.value)}
              />
            </div>
            <div className="flex items-center space-x-2 mt-4">
              <Checkbox id="publish-homepage" defaultChecked />
              <Label htmlFor="publish-homepage" className="text-sm text-gray-300">
                发布到主页"AI助手"页面
              </Label>
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsAddCategoryOpen(false)}
              className="border-gray-700 text-gray-300"
            >
              取消
            </Button>
            <Button onClick={handleAddCategory} className="bg-blue-600 hover:bg-blue-500">
              确认添加
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* 编辑名称对话框 */}
      <Dialog open={isEditNameDialogOpen} onOpenChange={setIsEditNameDialogOpen}>
        <DialogContent className="bg-gray-900 border-gray-800 text-white">
          <DialogHeader>
            <DialogTitle>编辑AI助手名称</DialogTitle>
            <DialogDescription className="text-gray-400">修改来自市场的AI助手名称</DialogDescription>
          </DialogHeader>
          {assistantToEditName && (
            <div className="py-4">
              <Label htmlFor="assistant-name" className="text-white mb-2 block">
                AI助手名称
              </Label>
              <Input
                id="assistant-name"
                placeholder="输入AI助手名称"
                className="bg-gray-800 border-gray-700 text-white"
                value={assistantToEditName.name}
                onChange={(e) => setAssistantToEditName({ ...assistantToEditName, name: e.target.value })}
              />
            </div>
          )}
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsEditNameDialogOpen(false)}
              className="border-gray-700 text-gray-300"
            >
              取消
            </Button>
            <Button onClick={handleSaveEditName} className="bg-blue-600 hover:bg-blue-500">
              保存
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* 移动助手对话框 */}
      <Dialog open={isMoveDialogOpen} onOpenChange={setIsMoveDialogOpen}>
        <DialogContent className="bg-gray-900 border-gray-800 text-white">
          <DialogHeader>
            <DialogTitle>移动AI助手</DialogTitle>
            <DialogDescription className="text-gray-400">选择要将AI助手移动到的分类</DialogDescription>
          </DialogHeader>
          {assistantToMove && (
            <div className="py-4">
              <Label htmlFor="target-category" className="text-white mb-2 block">
                目标分类
              </Label>
              <Select
                value={targetCategoryId?.toString() || ""}
                onValueChange={(value) => setTargetCategoryId(Number(value))}
              >
                <SelectTrigger id="target-category" className="bg-gray-800 border-gray-700 text-white">
                  <SelectValue placeholder="选择分类" />
                </SelectTrigger>
                <SelectContent className="bg-gray-900 border-gray-700 text-white">
                  {categories.map((category) => (
                    <SelectItem key={category.id} value={category.id.toString()}>
                      {category.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsMoveDialogOpen(false)}
              className="border-gray-700 text-gray-300"
            >
              取消
            </Button>
            <Button onClick={handleMoveAssistant} className="bg-blue-600 hover:bg-blue-500">
              移动
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* 删除助手确认对话框 */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent className="bg-gray-900 border-gray-800 text-white">
          <DialogHeader>
            <DialogTitle>删除AI助手</DialogTitle>
            <DialogDescription className="text-gray-400">
              确定要删除"{assistantToDelete?.name}"吗？此操作无法撤销。
            </DialogDescription>
          </DialogHeader>
          <Alert className="bg-red-900/20 border-red-800 mt-2">
            <AlertCircle className="h-4 w-4 text-red-400" />
            <AlertDescription className="text-red-300">
              删除后，该AI助手的所有数据将被永久删除，包括对话历史和设置。
            </AlertDescription>
          </Alert>
          <DialogFooter className="mt-4">
            <Button
              variant="outline"
              onClick={() => setIsDeleteDialogOpen(false)}
              className="border-gray-700 text-gray-300"
            >
              取消
            </Button>
            <Button onClick={handleDeleteAssistant} className="bg-red-600 hover:bg-red-500">
              确认删除
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* 删除分类确认对话框 */}
      <Dialog open={isCategoryDeleteDialogOpen} onOpenChange={setIsCategoryDeleteDialogOpen}>
        <DialogContent className="bg-gray-900 border-gray-800 text-white">
          <DialogHeader>
            <DialogTitle>删除分类</DialogTitle>
            <DialogDescription className="text-gray-400">
              确定要删除"{categoryToDelete?.name}"分类吗？
            </DialogDescription>
          </DialogHeader>
          <Alert className="bg-yellow-900/20 border-yellow-800 mt-2">
            <AlertCircle className="h-4 w-4 text-yellow-400" />
            <AlertDescription className="text-yellow-300">
              删除分类后，该分类下的所有AI助手将被移动到未分类状态。
            </AlertDescription>
          </Alert>
          <DialogFooter className="mt-4">
            <Button
              variant="outline"
              onClick={() => setIsCategoryDeleteDialogOpen(false)}
              className="border-gray-700 text-gray-300"
            >
              取消
            </Button>
            <Button onClick={handleDeleteCategory} className="bg-red-600 hover:bg-red-500">
              确认删除
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* 编辑分类名称对话框 */}
      <Dialog open={isEditCategoryNameDialogOpen} onOpenChange={setIsEditCategoryNameDialogOpen}>
        <DialogContent className="bg-gray-900 border-gray-800 text-white">
          <DialogHeader>
            <DialogTitle>编辑分类名称</DialogTitle>
            <DialogDescription className="text-gray-400">修改分类的名称</DialogDescription>
          </DialogHeader>
          {categoryToEditName && (
            <div className="py-4">
              <Label htmlFor="category-name-edit" className="text-white mb-2 block">
                分类名称
              </Label>
              <Input
                id="category-name-edit"
                placeholder="输入分类名称"
                className="bg-gray-800 border-gray-700 text-white"
                value={categoryToEditName.name}
                onChange={(e) => setCategoryToEditName({ ...categoryToEditName, name: e.target.value })}
              />
            </div>
          )}
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsEditCategoryNameDialogOpen(false)}
              className="border-gray-700 text-gray-300"
            >
              取消
            </Button>
            <Button onClick={handleSaveEditCategoryName} className="bg-blue-600 hover:bg-blue-500">
              保存
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
