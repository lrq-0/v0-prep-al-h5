"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { ArrowLeft, Upload, Info, Save, Plus, Trash2, AlertCircle } from "lucide-react"
import Image from "next/image"
import { useRouter, useParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Slider } from "@/components/ui/slider"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Card } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Checkbox } from "@/components/ui/checkbox"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

// 模拟AI助手数据
const mockAssistants = [
  {
    id: "1",
    avatar: "/images/ai-assistant-1.png",
    model: "deepseek",
    name: "高考英语助手",
    description: "专注高考英语词汇和写作",
    greeting: "你好！我是你的高考英语助手，有什么我可以帮助你的吗？",
    definition:
      "这是一个专注于高考英语的AI助手，能够提供词汇解释、语法指导、写作建议和口语练习。助手应该使用友好、鼓励的语气，避免过于学术化的表达，适合高中生理解的语言。\n\n在回答问题时，应该优先考虑高考的实际需求，提供符合高考要求的答案。对于写作，应该按照高考评分标准给出建议，包括内容、组织、语言和准确性等方面。\n\n助手应该能够识别常见的高考英语题型，如完形填空、阅读理解、短文改错等，并提供针对性的解题思路。",
    allowFileUpload: true,
    temperature: [70],
    diversity: [60],
    knowledgeFiles: [
      { name: "高考英语词汇表.pdf", size: 2.5 * 1024 * 1024 },
      { name: "高考英语写作模板.docx", size: 1.2 * 1024 * 1024 },
    ],
    isPublished: true,
    categoryId: 1,
    type: "personal",
    visibility: "public",
    pricing: {
      type: "free",
      price: 0,
      subscriptionRequired: false,
    },
    permissions: {
      allowCopy: true,
      allowShare: true,
      allowDownload: false,
    },
    statistics: {
      conversations: 156,
      users: 42,
      averageRating: 4.7,
    },
    createdAt: "2023-09-15T08:30:00Z",
    updatedAt: "2023-12-05T14:22:00Z",
  },
  {
    id: "2",
    avatar: "/images/ai-assistant-2.png",
    model: "chatgpt",
    name: "数学解题专家",
    description: "解答高等数学难题",
    greeting: "你好！我是你的数学解题专家，有什么数学问题需要解答吗？",
    definition:
      "这是一个专注于高等数学的AI助手，能够解答微积分、线性代数、概率论等领域的问题。助手应该使用清晰、准确的数学语言，同时能够用通俗的方式解释复杂的数学概念。\n\n在解答问题时，应该先给出解题思路，然后是详细的解题步骤，最后是答案和验证。对于概念性问题，应该给出定义、性质和应用场景。\n\n助手应该能够识别常见的数学符号和公式，并能够用文字形式清晰表达。对于需要图形辅助的问题，应该能够用文字描述图形特征。",
    allowFileUpload: true,
    temperature: [40],
    diversity: [50],
    knowledgeFiles: [
      { name: "高等数学教材.pdf", size: 5.7 * 1024 * 1024 },
      { name: "线性代数公式集.pdf", size: 1.8 * 1024 * 1024 },
    ],
    isPublished: false,
    categoryId: 1,
    type: "personal",
    visibility: "private",
    pricing: {
      type: "paid",
      price: 29.9,
      subscriptionRequired: false,
    },
    permissions: {
      allowCopy: true,
      allowShare: false,
      allowDownload: false,
    },
    statistics: {
      conversations: 87,
      users: 23,
      averageRating: 4.5,
    },
    createdAt: "2023-10-20T10:15:00Z",
    updatedAt: "2023-12-10T09:45:00Z",
  },
  {
    id: "3",
    avatar: "/images/ai-assistant-3.png",
    model: "doubao",
    name: "职业规划顾问",
    description: "提供职业发展建议和求职面试指导",
    greeting: "你好！我是你的职业规划顾问，很高兴能帮助你规划职业发展道路。",
    definition:
      "这是一个专注于职业规划和求职指导的AI助手，能够提供职业发展建议、简历优化、面试技巧和行业分析。助手应该使用专业但友好的语气，避免过于生硬或过于随意的表达。\n\n在回答问题时，应该考虑用户的背景、技能和兴趣，提供个性化的建议。对于简历和求职信，应该按照行业标准给出修改建议，包括内容、格式和表达方式。\n\n助手应该了解各行各业的基本情况，包括薪资水平、发展前景和入行要求等。对于面试问题，应该能够提供针对性的回答思路和技巧。",
    allowFileUpload: true,
    temperature: [60],
    diversity: [70],
    knowledgeFiles: [
      { name: "简历模板集.zip", size: 3.2 * 1024 * 1024 },
      { name: "面试常见问题与回答.docx", size: 1.5 * 1024 * 1024 },
    ],
    isPublished: true,
    categoryId: 2,
    type: "personal",
    visibility: "public",
    pricing: {
      type: "subscription",
      price: 0,
      subscriptionRequired: true,
    },
    permissions: {
      allowCopy: true,
      allowShare: true,
      allowDownload: true,
    },
    statistics: {
      conversations: 203,
      users: 78,
      averageRating: 4.8,
    },
    createdAt: "2023-08-05T15:20:00Z",
    updatedAt: "2023-12-15T11:30:00Z",
  },
  {
    id: "4",
    avatar: "/images/ai-assistant-4.png",
    model: "kimi",
    name: "心理健康顾问",
    description: "提供情绪管理和心理健康建议",
    greeting: "你好！我是你的心理健康顾问，很高兴能陪伴你一起面对生活中的挑战。",
    definition:
      "这是一个专注于心理健康和情绪管理的AI助手，能够提供情绪疏导、压力管理、人际关系和自我成长等方面的建议。助手应该使用温暖、理解和支持的语气，避免评判或指责的表达。\n\n在回答问题时，应该首先表达理解和共情，然后提供实用的建议和技巧。对于负面情绪，应该帮助用户识别、接受和管理，而不是简单地劝导或安慰。\n\n助手应该了解基本的心理学原理和常见的心理健康问题，但不应该尝试诊断或治疗心理疾病。对于可能需要专业帮助的情况，应该建议用户寻求专业心理咨询或医疗支持。",
    allowFileUpload: false,
    temperature: [80],
    diversity: [70],
    knowledgeFiles: [
      { name: "情绪管理技巧.pdf", size: 2.1 * 1024 * 1024 },
      { name: "压力应对策略.docx", size: 1.3 * 1024 * 1024 },
    ],
    isPublished: false,
    categoryId: 3,
    type: "market",
    visibility: "private",
    pricing: {
      type: "free",
      price: 0,
      subscriptionRequired: false,
    },
    permissions: {
      allowCopy: false,
      allowShare: false,
      allowDownload: false,
    },
    statistics: {
      conversations: 112,
      users: 35,
      averageRating: 4.6,
    },
    createdAt: "2023-11-10T12:40:00Z",
    updatedAt: "2023-12-20T16:15:00Z",
  },
]

// 模拟分类数据
const mockCategories = [
  { id: 1, name: "学习辅导" },
  { id: 2, name: "职业发展" },
  { id: 3, name: "生活服务" },
]

export default function EditAiAssistant() {
  const router = useRouter()
  const params = useParams()
  const assistantId = params.id as string

  // 表单状态
  const [avatar, setAvatar] = useState<string | null>(null)
  const [model, setModel] = useState("deepseek")
  const [name, setName] = useState("")
  const [description, setDescription] = useState("")
  const [greeting, setGreeting] = useState("")
  const [definition, setDefinition] = useState("")
  const [allowFileUpload, setAllowFileUpload] = useState(false)
  const [temperature, setTemperature] = useState([50])
  const [diversity, setDiversity] = useState([50])
  const [knowledgeFiles, setKnowledgeFiles] = useState<any[]>([])
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [activeTab, setActiveTab] = useState("basic")
  const [isPublished, setIsPublished] = useState(false)
  const [categoryId, setCategoryId] = useState<number | null>(null)
  const [visibility, setVisibility] = useState("public")
  const [pricingType, setPricingType] = useState("free")
  const [price, setPrice] = useState("0")
  const [subscriptionRequired, setSubscriptionRequired] = useState(false)
  const [permissions, setPermissions] = useState({
    allowCopy: true,
    allowShare: true,
    allowDownload: false,
  })
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [isUnsavedChangesDialogOpen, setIsUnsavedChangesDialogOpen] = useState(false)
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false)
  const [nextAction, setNextAction] = useState<string | null>(null)

  // 加载AI助手数据
  useEffect(() => {
    // 模拟API调用
    const loadAssistantData = () => {
      const assistant = mockAssistants.find((a) => a.id === assistantId)
      if (assistant) {
        setAvatar(assistant.avatar)
        setModel(assistant.model)
        setName(assistant.name)
        setDescription(assistant.description)
        setGreeting(assistant.greeting)
        setDefinition(assistant.definition)
        setAllowFileUpload(assistant.allowFileUpload)
        setTemperature(assistant.temperature)
        setDiversity(assistant.diversity)
        setKnowledgeFiles(assistant.knowledgeFiles)
        setIsPublished(assistant.isPublished)
        setCategoryId(assistant.categoryId)
        setVisibility(assistant.visibility)
        setPricingType(assistant.pricing.type)
        setPrice(assistant.pricing.price.toString())
        setSubscriptionRequired(assistant.pricing.subscriptionRequired)
        setPermissions(assistant.permissions)

        // 初始化后，标记为没有未保存的更改
        setHasUnsavedChanges(false)
      }
    }

    loadAssistantData()
  }, [assistantId])

  // 监听表单变化
  useEffect(() => {
    // 表单已加载后，任何变化都标记为未保存
    const isInitialLoad = !name && !description
    if (!isInitialLoad) {
      setHasUnsavedChanges(true)
    }
  }, [
    avatar,
    model,
    name,
    description,
    greeting,
    definition,
    allowFileUpload,
    temperature,
    diversity,
    knowledgeFiles,
    isPublished,
    categoryId,
    visibility,
    pricingType,
    price,
    subscriptionRequired,
    permissions,
  ])

  // 处理头像上传
  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0]
      const reader = new FileReader()
      reader.onload = (e) => {
        if (e.target?.result) {
          setAvatar(e.target.result as string)
        }
      }
      reader.readAsDataURL(file)
    }
  }

  // 处理知识库文件上传
  const handleKnowledgeFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files).map((file) => ({
        name: file.name,
        size: file.size,
        file,
      }))
      setKnowledgeFiles((prev) => [...prev, ...newFiles])
    }
  }

  // 移除知识库文件
  const removeKnowledgeFile = (index: number) => {
    setKnowledgeFiles((prev) => prev.filter((_, i) => i !== index))
  }

  // 处理权限变更
  const handlePermissionChange = (permission: keyof typeof permissions) => {
    setPermissions((prev) => ({
      ...prev,
      [permission]: !prev[permission],
    }))
  }

  // 提交表单
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      // 这里应该是实际的API调用，现在只是模拟
      await new Promise((resolve) => setTimeout(resolve, 1500))

      // 保存成功后，标记为没有未保存的更改
      setHasUnsavedChanges(false)

      // 显示成功消息或跳转
      router.push("/management/ai-assistants")
    } catch (error) {
      console.error("Error updating AI assistant:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  // 处理删除
  const handleDelete = async () => {
    setIsSubmitting(true)

    try {
      // 这里应该是实际的API调用，现在只是模拟
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // 删除成功后跳转
      router.push("/management/ai-assistants")
    } catch (error) {
      console.error("Error deleting AI assistant:", error)
    } finally {
      setIsSubmitting(false)
      setIsDeleteDialogOpen(false)
    }
  }

  // 处理导航
  const handleNavigation = (destination: string) => {
    if (hasUnsavedChanges) {
      setNextAction(destination)
      setIsUnsavedChangesDialogOpen(true)
    } else {
      if (destination === "back") {
        router.push("/management/ai-assistants")
      } else {
        router.push(destination)
      }
    }
  }

  // 确认放弃更改
  const confirmDiscardChanges = () => {
    setIsUnsavedChangesDialogOpen(false)
    if (nextAction === "back") {
      router.push("/management/ai-assistants")
    } else if (nextAction) {
      router.push(nextAction)
    }
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* 顶部导航栏 */}
      <div className="sticky top-0 left-0 right-0 h-14 flex items-center px-4 bg-card/80 backdrop-blur-md border-b border-border z-10">
        <button
          onClick={() => handleNavigation("back")}
          className="flex items-center text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="h-5 w-5 mr-2" />
          <span>返回</span>
        </button>
        <h1 className="flex-1 text-center text-lg font-semibold text-foreground">编辑AI助手</h1>
      </div>

      {/* 主要内容区 */}
      <div className="p-4 pb-24">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid grid-cols-4 mb-6 bg-muted">
            <TabsTrigger value="basic" className="data-[state=active]:bg-background">
              基本信息
            </TabsTrigger>
            <TabsTrigger value="advanced" className="data-[state=active]:bg-background">
              高级设置
            </TabsTrigger>
            <TabsTrigger value="knowledge" className="data-[state=active]:bg-background">
              知识库
            </TabsTrigger>
            <TabsTrigger value="publish" className="data-[state=active]:bg-background">
              发布设置
            </TabsTrigger>
          </TabsList>

          {/* 基本信息 */}
          <TabsContent value="basic" className="space-y-6">
            {/* 头像上传 */}
            <div className="flex flex-col items-center">
              <div className="relative w-24 h-24 mb-3">
                {avatar ? (
                  <Image
                    src={avatar || "/placeholder.svg"}
                    alt="AI助手头像"
                    fill
                    className="object-cover rounded-full border-2 border-blue-500/30"
                  />
                ) : (
                  <div className="w-full h-full rounded-full bg-muted border-2 border-blue-500/30 flex items-center justify-center">
                    <Upload className="h-8 w-8 text-muted-foreground" />
                  </div>
                )}
                <label
                  htmlFor="avatar-upload"
                  className="absolute -bottom-1 -right-1 bg-blue-600 rounded-full p-2 cursor-pointer"
                >
                  <Plus className="h-4 w-4 text-white" />
                </label>
                <input
                  id="avatar-upload"
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleAvatarChange}
                />
              </div>
              <p className="text-sm text-muted-foreground">上传助手头像</p>
            </div>

            {/* 聊天模型选择 */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <Label htmlFor="model" className="text-foreground">
                  聊天模型
                </Label>
              </div>
              <Select value={model} onValueChange={setModel}>
                <SelectTrigger className="bg-background border-border text-foreground">
                  <SelectValue placeholder="选择聊天模型" />
                </SelectTrigger>
                <SelectContent className="bg-card border-border text-foreground">
                  <SelectItem value="deepseek">DeepSeek</SelectItem>
                  <SelectItem value="chatgpt">ChatGPT</SelectItem>
                  <SelectItem value="doubao">豆包</SelectItem>
                  <SelectItem value="kimi">Kimi</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* 角色名称 */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <Label htmlFor="name" className="text-foreground">
                  角色名称
                </Label>
                <span className="text-xs text-muted-foreground">{name.length}/20</span>
              </div>
              <Input
                id="name"
                placeholder="例如：英语口语陪练"
                className="bg-background border-border text-foreground placeholder:text-muted-foreground focus-visible:ring-blue-500"
                value={name}
                onChange={(e) => setName(e.target.value.slice(0, 20))}
                required
              />
            </div>

            {/* 角色简介 */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <Label htmlFor="description" className="text-foreground">
                  角色简介
                </Label>
                <span className="text-xs text-muted-foreground">{description.length}/100</span>
              </div>
              <Textarea
                id="description"
                placeholder="简短介绍这个AI助手的功能和特点..."
                className="bg-background border-border text-foreground placeholder:text-muted-foreground focus-visible:ring-blue-500 min-h-[80px]"
                value={description}
                onChange={(e) => setDescription(e.target.value.slice(0, 100))}
                required
              />
            </div>

            {/* 对话开场白 */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <Label htmlFor="greeting" className="text-foreground">
                  对话开场白
                </Label>
                <span className="text-xs text-muted-foreground">{greeting.length}/200</span>
              </div>
              <Textarea
                id="greeting"
                placeholder="AI助手的第一句话，例如：'你好！我是你的英语口语陪练助手，有什么我可以帮助你的吗？'"
                className="bg-background border-border text-foreground placeholder:text-muted-foreground focus-visible:ring-blue-500 min-h-[80px]"
                value={greeting}
                onChange={(e) => setGreeting(e.target.value.slice(0, 200))}
                required
              />
            </div>

            {/* 角色定义 */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <div className="flex items-center">
                  <Label htmlFor="definition" className="text-foreground mr-1">
                    角色定义
                  </Label>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger>
                        <Info className="h-4 w-4 text-muted-foreground" />
                      </TooltipTrigger>
                      <TooltipContent className="bg-card text-foreground border-border">
                        <p className="text-xs max-w-[200px]">
                          详细定义AI助手的行为、知识范围和回答风格，这将指导AI如何回应用户的问题
                        </p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
              </div>
              <Textarea
                id="definition"
                placeholder="详细描述这个AI助手的应用对话标准、专业领域、回答风格等..."
                className="bg-background border-border text-foreground placeholder:text-muted-foreground focus-visible:ring-blue-500 min-h-[150px]"
                value={definition}
                onChange={(e) => setDefinition(e.target.value)}
                required
              />
            </div>
          </TabsContent>

          {/* 高级设置 */}
          <TabsContent value="advanced" className="space-y-6">
            {/* 支持用户文件上传 */}
            <div>
              <div className="flex justify-between items-center">
                <div className="flex items-center">
                  <Label htmlFor="allow-file-upload" className="text-foreground mr-1">
                    支持用户文件上传
                  </Label>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger>
                        <Info className="h-4 w-4 text-muted-foreground" />
                      </TooltipTrigger>
                      <TooltipContent className="bg-card text-foreground border-border">
                        <p className="text-xs max-w-[200px]">开启后，用户可以在对话中上传文件供AI助手分析</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
                <Switch id="allow-file-upload" checked={allowFileUpload} onCheckedChange={setAllowFileUpload} />
              </div>
            </div>

            {/* 温度值滑块 */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <div className="flex items-center">
                  <Label className="text-foreground mr-1">温度值</Label>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger>
                        <Info className="h-4 w-4 text-muted-foreground" />
                      </TooltipTrigger>
                      <TooltipContent className="bg-card text-foreground border-border">
                        <p className="text-xs max-w-[200px]">
                          控制AI回答的创造性和随机性，较低的值使回答更加确定和一致，较高的值使回答更加多样和创造性
                        </p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
                <span className="text-sm text-blue-400">{temperature[0]}%</span>
              </div>
              <div className="px-1">
                <Slider value={temperature} onValueChange={setTemperature} max={100} step={1} className="mb-1" />
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>理性</span>
                  <span>感性</span>
                </div>
              </div>
            </div>

            {/* 多样性滑块 */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <div className="flex items-center">
                  <Label className="text-foreground mr-1">多样性</Label>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger>
                        <Info className="h-4 w-4 text-muted-foreground" />
                      </TooltipTrigger>
                      <TooltipContent className="bg-card text-foreground border-border">
                        <p className="text-xs max-w-[200px]">
                          控制AI回答的广度和深度，较低的值使回答更加专注和深入，较高的值使回答更加广泛和多样
                        </p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
                <span className="text-sm text-blue-400">{diversity[0]}%</span>
              </div>
              <div className="px-1">
                <Slider value={diversity} onValueChange={setDiversity} max={100} step={1} className="mb-1" />
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>深度</span>
                  <span>广度</span>
                </div>
              </div>
            </div>

            {/* 分类选择 */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <Label htmlFor="category" className="text-foreground">
                  所属分类
                </Label>
              </div>
              <Select
                value={categoryId?.toString() || ""}
                onValueChange={(value) => setCategoryId(Number(value) || null)}
              >
                <SelectTrigger className="bg-background border-border text-foreground">
                  <SelectValue placeholder="选择分类" />
                </SelectTrigger>
                <SelectContent className="bg-card border-border text-foreground">
                  {mockCategories.map((category) => (
                    <SelectItem key={category.id} value={category.id.toString()}>
                      {category.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* 权限设置 */}
            <div>
              <h3 className="text-foreground font-medium mb-3">权限设置</h3>
              <div className="space-y-3">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="allow-copy"
                    checked={permissions.allowCopy}
                    onCheckedChange={() => handlePermissionChange("allowCopy")}
                  />
                  <Label htmlFor="allow-copy" className="text-foreground">
                    允许用户复制对话内容
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="allow-share"
                    checked={permissions.allowShare}
                    onCheckedChange={() => handlePermissionChange("allowShare")}
                  />
                  <Label htmlFor="allow-share" className="text-foreground">
                    允许用户分享对话
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="allow-download"
                    checked={permissions.allowDownload}
                    onCheckedChange={() => handlePermissionChange("allowDownload")}
                  />
                  <Label htmlFor="allow-download" className="text-foreground">
                    允许用户下载对话记录
                  </Label>
                </div>
              </div>
            </div>
          </TabsContent>

          {/* 知识库 */}
          <TabsContent value="knowledge" className="space-y-6">
            {/* 知识库文件上传 */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <Label className="text-foreground">知识库文档</Label>
              </div>
              <div className="p-4 border-2 border-dashed border-border rounded-lg text-center mb-3">
                <Upload className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
                <p className="text-sm text-muted-foreground mb-2">上传文档以增强AI助手的专业知识</p>
                <p className="text-xs text-muted-foreground mb-3">支持PDF、DOCX、TXT等格式，单个文件不超过10MB</p>
                <Input
                  type="file"
                  className="hidden"
                  id="knowledge-upload"
                  onChange={handleKnowledgeFileChange}
                  accept=".pdf,.docx,.txt,.md"
                  multiple
                />
                <Label htmlFor="knowledge-upload">
                  <Button
                    variant="outline"
                    className="border-blue-500/30 text-blue-400 hover:bg-blue-500/20 bg-transparent"
                    asChild
                  >
                    <span>选择文件</span>
                  </Button>
                </Label>
              </div>

              {/* 已上传文件列表 */}
              {knowledgeFiles.length > 0 && (
                <div className="space-y-2 mb-3">
                  {knowledgeFiles.map((file, index) => (
                    <Card key={index} className="p-2 bg-card border-border flex justify-between items-center">
                      <div className="flex items-center">
                        <div className="w-8 h-8 rounded-md bg-blue-500/20 flex items-center justify-center mr-2">
                          <Upload className="h-4 w-4 text-blue-400" />
                        </div>
                        <div className="overflow-hidden">
                          <p className="text-sm text-foreground truncate">{file.name}</p>
                          <p className="text-xs text-muted-foreground">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
                        </div>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-red-400 hover:text-red-300 hover:bg-transparent"
                        onClick={() => removeKnowledgeFile(index)}
                      >
                        删除
                      </Button>
                    </Card>
                  ))}
                </div>
              )}

              <Alert className="bg-card border-yellow-500/30 text-yellow-400">
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>知识库提示</AlertTitle>
                <AlertDescription className="text-muted-foreground text-sm">
                  上传的文档将被用于增强AI助手的专业知识。文档内容越丰富、越相关，AI助手的回答质量就越高。
                </AlertDescription>
              </Alert>
            </div>
          </TabsContent>

          {/* 发布设置 */}
          <TabsContent value="publish" className="space-y-6">
            {/* 发布状态 */}
            <div>
              <div className="flex justify-between items-center">
                <div className="flex items-center">
                  <Label htmlFor="is-published" className="text-foreground mr-1">
                    发布状态
                  </Label>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger>
                        <Info className="h-4 w-4 text-muted-foreground" />
                      </TooltipTrigger>
                      <TooltipContent className="bg-card text-foreground border-border">
                        <p className="text-xs max-w-[200px]">发布后，该AI助手将在AI助手市场中可见，用户可以使用它</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
                <Switch id="is-published" checked={isPublished} onCheckedChange={setIsPublished} />
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                {isPublished ? "当前状态：已发布" : "当前状态：未发布（仅自己可见）"}
              </p>
            </div>

            {/* 可见性设置 */}
            <div>
              <Label className="text-foreground mb-2 block">可见性</Label>
              <RadioGroup value={visibility} onValueChange={setVisibility} className="space-y-2">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="public" id="public" className="border-border" />
                  <Label htmlFor="public" className="text-foreground">
                    公开 - 所有用户可见
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="private" id="private" className="border-border" />
                  <Label htmlFor="private" className="text-foreground">
                    私有 - 仅自己和指定用户可见
                  </Label>
                </div>
              </RadioGroup>
            </div>

            {/* 价格设置 */}
            <div>
              <Label className="text-foreground mb-2 block">价格设置</Label>
              <RadioGroup value={pricingType} onValueChange={setPricingType} className="space-y-2">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="free" id="free" className="border-border" />
                  <Label htmlFor="free" className="text-foreground">
                    免费
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="paid" id="paid" className="border-border" />
                  <Label htmlFor="paid" className="text-foreground">
                    付费
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="subscription" id="subscription" className="border-border" />
                  <Label htmlFor="subscription" className="text-foreground">
                    会员专享
                  </Label>
                </div>
              </RadioGroup>

              {pricingType === "paid" && (
                <div className="mt-3">
                  <Label htmlFor="price" className="text-foreground mb-2 block">
                    设置价格 (元)
                  </Label>
                  <Input
                    id="price"
                    type="number"
                    min="0"
                    step="0.1"
                    className="bg-background border-border text-foreground w-32"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                  />
                </div>
              )}

              {pricingType === "subscription" && (
                <div className="mt-3 flex items-center space-x-2">
                  <Checkbox
                    id="subscription-required"
                    checked={subscriptionRequired}
                    onCheckedChange={(checked) => setSubscriptionRequired(checked === true)}
                  />
                  <Label htmlFor="subscription-required" className="text-foreground">
                    仅限会员使用
                  </Label>
                </div>
              )}
            </div>

            {/* 删除助手 */}
            <div className="pt-4 border-t border-border">
              <h3 className="text-red-400 font-medium mb-2">危险操作</h3>
              <Button
                variant="destructive"
                className="bg-red-900/30 hover:bg-red-900/50 text-red-400 border border-red-500/30"
                onClick={() => setIsDeleteDialogOpen(true)}
              >
                <Trash2 className="h-4 w-4 mr-2" />
                删除此AI助手
              </Button>
              <p className="text-xs text-muted-foreground mt-2">
                删除后，该AI助手将永久消失，无法恢复。所有相关的对话记录也将被删除。
              </p>
            </div>
          </TabsContent>
        </Tabs>
      </div>

      {/* 底部保存按钮 */}
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-card/95 backdrop-blur-md border-t border-border">
        <Button
          type="submit"
          className="w-full bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400"
          onClick={handleSubmit}
          disabled={isSubmitting}
        >
          <Save className="h-4 w-4 mr-2" />
          {isSubmitting ? "保存中..." : "保存更改"}
        </Button>
      </div>

      {/* 删除确认对话框 */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent className="bg-card border-border text-foreground">
          <DialogHeader>
            <DialogTitle className="text-red-400">删除AI助手</DialogTitle>
            <DialogDescription className="text-muted-foreground">
              您确定要删除此AI助手吗？此操作无法撤销，所有相关的对话记录也将被删除。
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsDeleteDialogOpen(false)}
              className="border-border text-muted-foreground"
            >
              取消
            </Button>
            <Button
              variant="destructive"
              onClick={handleDelete}
              disabled={isSubmitting}
              className="bg-red-600 hover:bg-red-500"
            >
              {isSubmitting ? "删除中..." : "确认删除"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* 未保存更改提示对话框 */}
      <Dialog open={isUnsavedChangesDialogOpen} onOpenChange={setIsUnsavedChangesDialogOpen}>
        <DialogContent className="bg-card border-border text-foreground">
          <DialogHeader>
            <DialogTitle>未保存的更改</DialogTitle>
            <DialogDescription className="text-muted-foreground">
              您有未保存的更改，离开此页面将丢失这些更改。是否继续？
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsUnsavedChangesDialogOpen(false)}
              className="border-border text-muted-foreground"
            >
              取消
            </Button>
            <Button onClick={confirmDiscardChanges} className="bg-blue-600 hover:bg-blue-500">
              放弃更改
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
