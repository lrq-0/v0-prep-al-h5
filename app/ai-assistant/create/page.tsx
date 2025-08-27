"use client"

import type React from "react"

import { useState } from "react"
import { ArrowLeft, Upload, Info, Save, Plus } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Slider } from "@/components/ui/slider"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Card } from "@/components/ui/card"

export default function CreateAiAssistant() {
  const router = useRouter()

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
  const [knowledgeFiles, setKnowledgeFiles] = useState<File[]>([])
  const [isSubmitting, setIsSubmitting] = useState(false)

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
      const newFiles = Array.from(e.target.files)
      setKnowledgeFiles((prev) => [...prev, ...newFiles])
    }
  }

  // 移除知识库文件
  const removeKnowledgeFile = (index: number) => {
    setKnowledgeFiles((prev) => prev.filter((_, i) => i !== index))
  }

  // 提交表单
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      // 这里应该是实际的API调用，现在只是模拟
      await new Promise((resolve) => setTimeout(resolve, 1500))

      // 成功后跳转回AI助手页面
      router.push("/")
    } catch (error) {
      console.error("Error creating AI assistant:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-black text-white">
      {/* 顶部导航栏 */}
      <div className="sticky top-0 left-0 right-0 h-14 flex items-center px-4 bg-gray-900/80 backdrop-blur-md border-b border-gray-800 z-10">
        <Link href="/" className="flex items-center text-gray-300">
          <ArrowLeft className="h-5 w-5 mr-2" />
          <span>返回</span>
        </Link>
        <h1 className="flex-1 text-center text-lg font-semibold text-white">创建AI助手</h1>
      </div>

      <form onSubmit={handleSubmit} className="p-4 pb-24">
        {/* 头像上传 */}
        <div className="mb-6 flex flex-col items-center">
          <div className="relative w-24 h-24 mb-3">
            {avatar ? (
              <Image
                src={avatar || "/placeholder.svg"}
                alt="AI助手头像"
                fill
                className="object-cover rounded-full border-2 border-blue-500/30"
              />
            ) : (
              <div className="w-full h-full rounded-full bg-gray-800 border-2 border-blue-500/30 flex items-center justify-center">
                <Upload className="h-8 w-8 text-gray-500" />
              </div>
            )}
            <label
              htmlFor="avatar-upload"
              className="absolute -bottom-1 -right-1 bg-blue-600 rounded-full p-2 cursor-pointer"
            >
              <Plus className="h-4 w-4 text-white" />
            </label>
            <input id="avatar-upload" type="file" accept="image/*" className="hidden" onChange={handleAvatarChange} />
          </div>
          <p className="text-sm text-gray-400">上传助手头像</p>
        </div>

        {/* 聊天模型选择 */}
        <div className="mb-6">
          <div className="flex justify-between items-center mb-2">
            <Label htmlFor="model" className="text-white">
              聊天模型
            </Label>
          </div>
          <Select value={model} onValueChange={setModel}>
            <SelectTrigger className="bg-gray-900 border-gray-700 text-white">
              <SelectValue placeholder="选择聊天模型" />
            </SelectTrigger>
            <SelectContent className="bg-gray-900 border-gray-700 text-white">
              <SelectItem value="deepseek">DeepSeek</SelectItem>
              <SelectItem value="chatgpt">ChatGPT</SelectItem>
              <SelectItem value="doubao">豆包</SelectItem>
              <SelectItem value="kimi">Kimi</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* 角色名称 */}
        <div className="mb-6">
          <div className="flex justify-between items-center mb-2">
            <Label htmlFor="name" className="text-white">
              角色名称
            </Label>
            <span className="text-xs text-gray-400">{name.length}/20</span>
          </div>
          <Input
            id="name"
            placeholder="例如：英语口语陪练"
            className="bg-gray-900 border-gray-700 text-white placeholder:text-gray-500 focus-visible:ring-blue-500"
            value={name}
            onChange={(e) => setName(e.target.value.slice(0, 20))}
            required
          />
        </div>

        {/* 角色简介 */}
        <div className="mb-6">
          <div className="flex justify-between items-center mb-2">
            <Label htmlFor="description" className="text-white">
              角色简介
            </Label>
            <span className="text-xs text-gray-400">{description.length}/100</span>
          </div>
          <Textarea
            id="description"
            placeholder="简短介绍这个AI助手的功能和特点..."
            className="bg-gray-900 border-gray-700 text-white placeholder:text-gray-500 focus-visible:ring-blue-500 min-h-[80px]"
            value={description}
            onChange={(e) => setDescription(e.target.value.slice(0, 100))}
            required
          />
        </div>

        {/* 对话开场白 */}
        <div className="mb-6">
          <div className="flex justify-between items-center mb-2">
            <Label htmlFor="greeting" className="text-white">
              对话开场白
            </Label>
            <span className="text-xs text-gray-400">{greeting.length}/200</span>
          </div>
          <Textarea
            id="greeting"
            placeholder="AI助手的第一句话，例如：'你好！我是你的英语口语陪练助手，有什么我可以帮助你的吗？'"
            className="bg-gray-900 border-gray-700 text-white placeholder:text-gray-500 focus-visible:ring-blue-500 min-h-[80px]"
            value={greeting}
            onChange={(e) => setGreeting(e.target.value.slice(0, 200))}
            required
          />
        </div>

        {/* 角色定义 */}
        <div className="mb-6">
          <div className="flex justify-between items-center mb-2">
            <div className="flex items-center">
              <Label htmlFor="definition" className="text-white mr-1">
                角色定义
              </Label>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger>
                    <Info className="h-4 w-4 text-gray-400" />
                  </TooltipTrigger>
                  <TooltipContent className="bg-gray-800 text-white border-gray-700">
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
            className="bg-gray-900 border-gray-700 text-white placeholder:text-gray-500 focus-visible:ring-blue-500 min-h-[150px]"
            value={definition}
            onChange={(e) => setDefinition(e.target.value)}
            required
          />
        </div>

        {/* 知识库文件上传 */}
        <div className="mb-6">
          <div className="flex justify-between items-center mb-2">
            <Label className="text-white">知识库文档</Label>
          </div>
          <div className="p-4 border-2 border-dashed border-gray-700 rounded-lg text-center mb-3">
            <Upload className="h-8 w-8 text-gray-500 mx-auto mb-2" />
            <p className="text-sm text-gray-400 mb-2">上传文档以增强AI助手的专业知识</p>
            <p className="text-xs text-gray-500 mb-3">支持PDF、DOCX、TXT等格式，单个文件不超过10MB</p>
            <Input
              type="file"
              className="hidden"
              id="knowledge-upload"
              onChange={handleKnowledgeFileChange}
              accept=".pdf,.docx,.txt,.md"
              multiple
            />
            <Label htmlFor="knowledge-upload">
              <Button variant="outline" className="border-blue-500/30 text-blue-400 hover:bg-blue-500/20" asChild>
                <span>选择文件</span>
              </Button>
            </Label>
          </div>

          {/* 已上传文件列表 */}
          {knowledgeFiles.length > 0 && (
            <div className="space-y-2 mb-3">
              {knowledgeFiles.map((file, index) => (
                <Card key={index} className="p-2 bg-gray-900 border-gray-800 flex justify-between items-center">
                  <div className="flex items-center">
                    <div className="w-8 h-8 rounded-md bg-blue-500/20 flex items-center justify-center mr-2">
                      <Upload className="h-4 w-4 text-blue-400" />
                    </div>
                    <div className="overflow-hidden">
                      <p className="text-sm text-white truncate">{file.name}</p>
                      <p className="text-xs text-gray-400">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
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
        </div>

        {/* 支持用户文件上传 */}
        <div className="mb-6">
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <Label htmlFor="allow-file-upload" className="text-white mr-1">
                支持用户文件上传
              </Label>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger>
                    <Info className="h-4 w-4 text-gray-400" />
                  </TooltipTrigger>
                  <TooltipContent className="bg-gray-800 text-white border-gray-700">
                    <p className="text-xs max-w-[200px]">开启后，用户可以在对话中上传文件供AI助手分析</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
            <Switch id="allow-file-upload" checked={allowFileUpload} onCheckedChange={setAllowFileUpload} />
          </div>
        </div>

        {/* 温度值滑块 */}
        <div className="mb-6">
          <div className="flex justify-between items-center mb-2">
            <div className="flex items-center">
              <Label className="text-white mr-1">温度值</Label>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger>
                    <Info className="h-4 w-4 text-gray-400" />
                  </TooltipTrigger>
                  <TooltipContent className="bg-gray-800 text-white border-gray-700">
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
            <div className="flex justify-between text-xs text-gray-400">
              <span>理性</span>
              <span>感性</span>
            </div>
          </div>
        </div>

        {/* 多样性滑块 */}
        <div className="mb-6">
          <div className="flex justify-between items-center mb-2">
            <div className="flex items-center">
              <Label className="text-white mr-1">多样性</Label>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger>
                    <Info className="h-4 w-4 text-gray-400" />
                  </TooltipTrigger>
                  <TooltipContent className="bg-gray-800 text-white border-gray-700">
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
            <div className="flex justify-between text-xs text-gray-400">
              <span>深度</span>
              <span>广度</span>
            </div>
          </div>
        </div>
      </form>

      {/* 底部保存按钮 */}
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-gray-900/95 backdrop-blur-md border-t border-gray-800">
        <Button
          type="submit"
          className="w-full bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400"
          onClick={handleSubmit}
          disabled={isSubmitting}
        >
          <Save className="h-4 w-4 mr-2" />
          {isSubmitting ? "保存中..." : "保存AI助手"}
        </Button>
      </div>
    </div>
  )
}
