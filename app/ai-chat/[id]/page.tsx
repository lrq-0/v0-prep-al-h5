"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import Image from "next/image"
import { Send, ArrowLeft, MoreVertical, Download, Trash2, Share } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar } from "@/components/ui/avatar"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Separator } from "@/components/ui/separator"
import { cn } from "@/lib/utils"

// 课程助手聊天页面
export default function AIChatPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [message, setMessage] = useState("")
  const [chatHistory, setChatHistory] = useState<any[]>([])
  const chatContainerRef = useRef<HTMLDivElement>(null)

  // 课程数据
  const courses = {
    "1": {
      id: "1",
      title: "AOPA无人机驾驶员资格考证班",
      image: "/images/tech-banner-1.png",
      assistantName: "无人机考证助手",
      assistantAvatar: "/images/ai-assistant-1.png",
      welcomeMessage:
        "你好！我是无人机考证助手，可以回答你关于AOPA无人机驾驶员资格考试的任何问题。你可以询问考试内容、备考技巧、证书申请流程等。有什么我能帮到你的吗？",
    },
    "2": {
      id: "2",
      title: "Python数据分析与可视化",
      image: "/images/tech-banner-2.png",
      assistantName: "Python学习助手",
      assistantAvatar: "/images/ai-assistant-2.png",
      welcomeMessage:
        "你好！我是Python学习助手，可以帮助你解决Python数据分析与可视化课程中遇到的问题。你可以询问代码错误、数据处理方法、可视化技巧等。有什么我能帮到你的吗？",
    },
  }

  // 获取当前课程
  const course = courses[params.id as keyof typeof courses] || courses["1"]

  // 初始化聊天历史
  useEffect(() => {
    setChatHistory([
      {
        role: "assistant",
        content: course.welcomeMessage,
        timestamp: new Date().toISOString(),
      },
    ])
  }, [course.id])

  // 自动滚动到底部
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight
    }
  }, [chatHistory])

  // 发送消息
  const sendMessage = () => {
    if (!message.trim()) return

    // 添加用户消息到聊天历史
    const userMessage = {
      role: "user",
      content: message,
      timestamp: new Date().toISOString(),
    }

    setChatHistory([...chatHistory, userMessage])
    setMessage("")

    // 模拟AI回复
    setTimeout(() => {
      let response

      if (course.id === "1") {
        // 无人机课程的回复
        if (message.toLowerCase().includes("考试") || message.toLowerCase().includes("题目")) {
          response =
            "AOPA无人机驾驶员资格考试包括理论考试和实操考核两部分。理论考试主要测试无人机基础知识、法规、飞行原理和安全操作等内容，共50道题，考试时间为60分钟，及格分数为80分。实操考核则测试实际操作技能，包括起飞、降落、悬停和紧急处置等。"
        } else if (message.toLowerCase().includes("证书") || message.toLowerCase().includes("执照")) {
          response =
            "AOPA无人机驾驶员证书是由中国航空器拥有者及驾驶员协会(AOPA)颁发的官方认证，有效期为2年。证书分为多个级别，包括基础级、娱乐级、驾驶员级和教员级。获得证书后，你将能够合法地在中国境内操作相应类别和重量的无人机。"
        } else if (message.toLowerCase().includes("备考") || message.toLowerCase().includes("技巧")) {
          response =
            "备考AOPA无人机驾驶员资格考试，建议：1) 系统学习课程内容，特别是法规和安全操作部分；2) 多做模拟题，熟悉题型和考点；3) 参加实操训练，掌握基本飞行技能；4) 了解最新的无人机法规变化；5) 考前一周进行针对性复习，重点关注易错点。"
        } else {
          response =
            "作为无人机考证助手，我可以提供AOPA考试相关的各种信息，包括考试内容、证书申请、法规要求等。你还想了解哪些具体内容呢？"
        }
      } else {
        // Python课程的回复
        response =
          "作为Python学习助手，我可以帮助你解决Python数据分析与可视化课程中的问题。请详细描述你遇到的具体问题，我会尽力提供解答。"
      }

      const assistantMessage = {
        role: "assistant",
        content: response,
        timestamp: new Date().toISOString(),
      }

      setChatHistory((prev) => [...prev, assistantMessage])
    }, 1000)
  }

  // 处理回车键发送
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      sendMessage()
    }
  }

  const handleBack = () => {
    const returnUrl = searchParams.get("returnUrl")
    if (returnUrl) {
      // 如果有返回URL参数，使用该URL
      router.push(returnUrl)
    } else {
      // 否则返回到主页
      router.push("/")
    }
  }

  // 格式化时间
  const formatTime = (timestamp: string) => {
    const date = new Date(timestamp)
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
  }

  return (
    <div className="flex flex-col h-screen bg-background text-foreground">
      {/* 头部 */}
      <header className="border-b border-border bg-card py-3 px-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Button
              variant="ghost"
              size="icon"
              onClick={handleBack}
              className="mr-2 text-muted-foreground hover:text-foreground hover:bg-muted"
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <div className="flex items-center">
              <Avatar className="h-8 w-8 mr-2">
                <Image
                  src={course.assistantAvatar || "/placeholder.svg"}
                  alt={course.assistantName}
                  width={32}
                  height={32}
                />
              </Avatar>
              <div>
                <h1 className="text-sm font-medium text-foreground">{course.assistantName}</h1>
                <p className="text-xs text-muted-foreground">课程助手</p>
              </div>
            </div>
          </div>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="text-muted-foreground hover:text-foreground hover:bg-muted"
              >
                <MoreVertical className="h-5 w-5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="bg-card border-border text-foreground">
              <DropdownMenuItem className="flex items-center cursor-pointer hover:bg-muted">
                <Download className="h-4 w-4 mr-2" />
                <span>导出聊天记录</span>
              </DropdownMenuItem>
              <DropdownMenuItem className="flex items-center cursor-pointer hover:bg-muted">
                <Trash2 className="h-4 w-4 mr-2" />
                <span>清空聊天</span>
              </DropdownMenuItem>
              <Separator className="bg-border" />
              <DropdownMenuItem className="flex items-center cursor-pointer hover:bg-muted">
                <Share className="h-4 w-4 mr-2" />
                <span>分享助手</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </header>

      {/* 聊天内容 */}
      <div ref={chatContainerRef} className="flex-1 overflow-y-auto p-4 space-y-4">
        {chatHistory.map((chat, index) => (
          <div key={index} className={cn("flex", chat.role === "user" ? "justify-end" : "justify-start")}>
            <div
              className={cn(
                "max-w-[80%] rounded-lg p-3",
                chat.role === "user" ? "bg-blue-600 text-white" : "bg-muted text-foreground",
              )}
            >
              <div className="flex flex-col">
                <div className="whitespace-pre-wrap">{chat.content}</div>
                <div className="text-xs opacity-70 mt-1 text-right">{formatTime(chat.timestamp)}</div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* 输入框 */}
      <div className="border-t border-border bg-card p-4">
        <div className="flex items-center">
          <Input
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="输入问题..."
            className="flex-1 bg-background border-border focus-visible:ring-blue-500 text-foreground placeholder:text-muted-foreground"
          />
          <Button
            onClick={sendMessage}
            disabled={!message.trim()}
            className="ml-2 bg-blue-600 hover:bg-blue-700"
            size="icon"
          >
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  )
}
