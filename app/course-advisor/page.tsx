"use client"

import { useState, useRef, useEffect } from "react"
import { ArrowLeft, Send, Mic, MicOff } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"

export default function CourseAdvisor() {
  const [messages, setMessages] = useState([
    {
      id: 1,
      role: "assistant",
      content: "你好！我是你的课程顾问小助手，有任何关于课程的问题都可以问我哦！",
      time: "刚刚",
    },
  ])
  const [inputValue, setInputValue] = useState("")
  const [isRecording, setIsRecording] = useState(false)
  const messagesEndRef = useRef(null)

  // 自动滚动到最新消息
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  // 发送消息
  const sendMessage = () => {
    if (!inputValue.trim()) return

    // 添加用户消息
    const userMessage = {
      id: messages.length + 1,
      role: "user",
      content: inputValue,
      time: "刚刚",
    }
    setMessages((prev) => [...prev, userMessage])
    setInputValue("")

    // 模拟AI回复
    setTimeout(() => {
      const aiResponses = [
        "我们的高考英语词汇精讲课程售价299元，包含24节课时，由王老师主讲，专注于高考核心词汇的讲解和记忆方法。",
        "数学解题技巧与方法课程是免费的，共18节课时，由李老师主讲，主要教授高考数学常见题型的解题思路和技巧。",
        "物理实验与解析课程售价279元，包含16节课时，由张老师主讲，重点讲解高考物理实验题和解题方法。",
        "我们的VIP会员可以享受所有课程8折优惠，并且可以免费参加每周的在线答疑直播。",
        "购买课程后，您将获得永久观看权限，以及课程配套资料的下载权限。",
      ]

      const randomResponse = aiResponses[Math.floor(Math.random() * aiResponses.length)]

      const assistantMessage = {
        id: messages.length + 2,
        role: "assistant",
        content: randomResponse,
        time: "刚刚",
      }
      setMessages((prev) => [...prev, assistantMessage])
    }, 1000)
  }

  // 处理输入变化
  const handleInputChange = (e) => {
    setInputValue(e.target.value)
  }

  // 处理按键事件
  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      sendMessage()
    }
  }

  // 切换录音状态
  const toggleRecording = () => {
    setIsRecording(!isRecording)

    // 如果开始录音，模拟3秒后自动结束并发送语音转文字的消息
    if (!isRecording) {
      setTimeout(() => {
        setIsRecording(false)
        const voiceMessages = [
          "高考英语课程多少钱？",
          "数学课程有哪些内容？",
          "购买课程后能看多久？",
          "有没有优惠活动？",
        ]
        const randomMessage = voiceMessages[Math.floor(Math.random() * voiceMessages.length)]
        setInputValue(randomMessage)
      }, 3000)
    }
  }

  return (
    <div className="min-h-screen bg-black text-white flex flex-col">
      {/* 顶部导航栏 */}
      <div className="sticky top-0 left-0 right-0 h-14 flex items-center px-4 bg-gray-900/80 backdrop-blur-md border-b border-gray-800 z-10">
        <Link href="/" className="flex items-center text-gray-300">
          <ArrowLeft className="h-5 w-5 mr-2" />
          <span>返回</span>
        </Link>
        <h1 className="flex-1 text-center text-lg font-semibold text-white">课程顾问</h1>
      </div>

      {/* 数字人头像区域 */}
      <div className="bg-gradient-to-b from-gray-900 to-black p-4 flex items-center">
        <div className="relative w-16 h-16 mr-4">
          <Image
            src="/images/ai-assistant-1.png"
            alt="AI课程顾问"
            fill
            className="object-cover rounded-full border-2 border-blue-500/30"
          />
          <div className="absolute bottom-0 right-0 w-4 h-4 bg-green-500 rounded-full border-2 border-black"></div>
        </div>
        <div>
          <h2 className="text-lg font-medium text-white">AI课程顾问</h2>
          <p className="text-sm text-gray-400">在线 | 随时为您解答课程问题</p>
        </div>
      </div>

      {/* 聊天区域 */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div key={message.id} className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}>
            <div
              className={`max-w-[80%] rounded-lg p-3 ${
                message.role === "user"
                  ? "bg-blue-600 text-white rounded-tr-none"
                  : "bg-gray-800 text-white rounded-tl-none"
              }`}
            >
              <div className="mb-1 flex items-center">
                {message.role === "assistant" && (
                  <Avatar className="h-5 w-5 mr-2">
                    <AvatarFallback className="bg-blue-500 text-[10px]">AI</AvatarFallback>
                  </Avatar>
                )}
                <span className="text-xs text-gray-300">{message.role === "user" ? "我" : "AI课程顾问"}</span>
              </div>
              <p className="text-sm">{message.content}</p>
              <div className="text-right mt-1">
                <span className="text-xs text-gray-400">{message.time}</span>
              </div>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* 输入区域 */}
      <div className="p-3 border-t border-gray-800 bg-gray-900">
        <div className="flex items-center">
          <Button
            variant="ghost"
            size="icon"
            className={`rounded-full ${isRecording ? "text-red-400 animate-pulse" : "text-gray-400"}`}
            onClick={toggleRecording}
          >
            {isRecording ? <MicOff className="h-5 w-5" /> : <Mic className="h-5 w-5" />}
          </Button>
          <Input
            value={inputValue}
            onChange={handleInputChange}
            onKeyPress={handleKeyPress}
            placeholder={isRecording ? "正在录音..." : "输入问题..."}
            className="mx-2 bg-gray-800 border-gray-700 text-white placeholder:text-gray-500 focus-visible:ring-blue-500"
            disabled={isRecording}
          />
          <Button
            variant="ghost"
            size="icon"
            className="rounded-full text-blue-400"
            onClick={sendMessage}
            disabled={!inputValue.trim() && !isRecording}
          >
            <Send className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </div>
  )
}
