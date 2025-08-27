"use client"

import { useState, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import {
  CheckCircle,
  ChevronRight,
  Gift,
  BookOpen,
  Zap,
  Share2,
  Home,
  MessageSquare,
  Crown,
  Calendar,
  Users,
} from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import confetti from "canvas-confetti"

export default function PaymentSuccess() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [progress, setProgress] = useState(0)

  // 获取URL参数
  const planType = searchParams.get("plan") || "lifetime"
  const planName = searchParams.get("name") || "永久会员 + AI副业课"
  const amount = searchParams.get("amount") || "888"
  const isAgent = searchParams.get("agent") === "true"
  const agentLevel = searchParams.get("agentLevel") || ""

  // 模拟加载进度
  useEffect(() => {
    const timer = setTimeout(() => {
      setProgress(100)
    }, 1000)

    // 触发庆祝效果
    const runConfetti = () => {
      const duration = 3000
      const end = Date.now() + duration

      const colors = ["#4F46E5", "#3B82F6", "#60A5FA", "#93C5FD"]
      ;(function frame() {
        confetti({
          particleCount: 2,
          angle: 60,
          spread: 55,
          origin: { x: 0 },
          colors: colors,
        })

        confetti({
          particleCount: 2,
          angle: 120,
          spread: 55,
          origin: { x: 1 },
          colors: colors,
        })

        if (Date.now() < end) {
          requestAnimationFrame(frame)
        }
      })()
    }

    runConfetti()

    return () => clearTimeout(timer)
  }, [])

  // 下一步引导选项
  const nextSteps = [
    {
      id: "explore",
      title: "探索VIP功能",
      description: "了解如何使用您的VIP会员特权",
      icon: <Crown className="h-5 w-5 text-amber-400" />,
      link: "/vip-guide",
      color: "bg-amber-900/20 border-amber-500/30",
    },
    {
      id: "ai",
      title: "使用AI助手",
      description: "立即体验无限次AI助手对话",
      icon: <MessageSquare className="h-5 w-5 text-blue-400" />,
      link: "/ai-chat",
      color: "bg-blue-900/20 border-blue-500/30",
    },
    {
      id: "knowledge",
      title: "浏览知识库",
      description: "访问VIP专属知识库内容",
      icon: <BookOpen className="h-5 w-5 text-purple-400" />,
      link: "/knowledge-base",
      color: "bg-purple-900/20 border-purple-500/30",
    },
    {
      id: "calendar",
      title: "查看学习计划",
      description: "获取个性化学习路径和计划",
      icon: <Calendar className="h-5 w-5 text-green-400" />,
      link: "/learning-path",
      color: "bg-green-900/20 border-green-500/30",
    },
  ]

  // 代理商特有的下一步选项
  const agentNextSteps = [
    {
      id: "agent-dashboard",
      title: "代理商后台",
      description: "管理您的代理商账户和团队",
      icon: <Users className="h-5 w-5 text-pink-400" />,
      link: "/agent-dashboard",
      color: "bg-pink-900/20 border-pink-500/30",
    },
    {
      id: "invite",
      title: "邀请用户",
      description: "分享您的专属邀请码获取佣金",
      icon: <Share2 className="h-5 w-5 text-indigo-400" />,
      link: "/invite",
      color: "bg-indigo-900/20 border-indigo-500/30",
    },
  ]

  // 根据是否是代理商显示不同的下一步选项
  const displayNextSteps = isAgent ? [...nextSteps, ...agentNextSteps] : nextSteps

  return (
    <div className="min-h-screen bg-black text-white">
      {/* 顶部导航栏 */}
      <div className="sticky top-0 left-0 right-0 h-14 flex items-center px-4 bg-gray-900/80 backdrop-blur-md border-b border-gray-800 z-10">
        <Link href="/" className="flex items-center text-gray-300">
          <Home className="h-5 w-5 mr-2" />
          <span>返回首页</span>
        </Link>
      </div>

      <div className="p-4 pb-24 max-w-md mx-auto">
        {/* 支付成功动画和信息 */}
        <div className="flex flex-col items-center justify-center py-8">
          <div className="relative w-20 h-20 mb-4">
            <div className="absolute inset-0 rounded-full bg-green-500/10 animate-ping"></div>
            <div className="relative flex items-center justify-center w-20 h-20 rounded-full bg-green-900/30 border border-green-500/50">
              <CheckCircle className="h-10 w-10 text-green-500" />
            </div>
          </div>
          <h1 className="text-2xl font-bold text-white mb-2">支付成功</h1>
          <p className="text-gray-400 text-center mb-4">您已成功开通{isAgent ? "会员和代理商" : "会员"}服务</p>
          <Progress value={progress} className="w-full max-w-xs h-1.5 mb-2" />
          <p className="text-sm text-gray-500">正在为您准备VIP服务...</p>
        </div>

        {/* 订单信息 */}
        <Card className="border-gray-800 bg-gray-900 p-4 mb-6">
          <h2 className="font-medium text-white mb-3">订单信息</h2>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-400">订单编号</span>
              <span className="text-white">P{Date.now().toString().slice(-8)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">支付时间</span>
              <span className="text-white">{new Date().toLocaleString("zh-CN")}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">会员方案</span>
              <span className="text-white">{planName}</span>
            </div>
            {isAgent && agentLevel && (
              <div className="flex justify-between">
                <span className="text-gray-400">代理商级别</span>
                <span className="text-white">{agentLevel}</span>
              </div>
            )}
            <div className="flex justify-between">
              <span className="text-gray-400">支付金额</span>
              <span className="text-white">¥{amount}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">支付方式</span>
              <span className="text-white">微信支付</span>
            </div>
            <div className="border-t border-gray-800 my-2 pt-2"></div>
            <div className="flex justify-between font-medium">
              <span className="text-white">会员状态</span>
              <Badge className="bg-green-500/20 text-green-400 border-green-500/30">已激活</Badge>
            </div>
          </div>
        </Card>

        {/* 会员权益 */}
        <Card className="border-gray-800 bg-gray-900 p-4 mb-6">
          <h2 className="font-medium text-white mb-3">您已获得的权益</h2>
          <div className="space-y-3">
            <div className="flex items-center">
              <div className="w-8 h-8 rounded-full bg-blue-900/30 flex items-center justify-center mr-3 border border-blue-500/30">
                <Zap className="h-4 w-4 text-blue-400" />
              </div>
              <div>
                <h3 className="text-sm font-medium text-white">AI助手无限使用</h3>
                <p className="text-xs text-gray-400">随时随地解答您的问题</p>
              </div>
            </div>
            <div className="flex items-center">
              <div className="w-8 h-8 rounded-full bg-purple-900/30 flex items-center justify-center mr-3 border border-purple-500/30">
                <BookOpen className="h-4 w-4 text-purple-400" />
              </div>
              <div>
                <h3 className="text-sm font-medium text-white">知识库完整访问权限</h3>
                <p className="text-xs text-gray-400">
                  {planType === "lifetime" ? "永久访问全部知识库内容" : "访问专属知识库内容"}
                </p>
              </div>
            </div>
            {planType === "lifetime" && (
              <div className="flex items-center">
                <div className="w-8 h-8 rounded-full bg-amber-900/30 flex items-center justify-center mr-3 border border-amber-500/30">
                  <Gift className="h-4 w-4 text-amber-400" />
                </div>
                <div>
                  <h3 className="text-sm font-medium text-white">AI副业课程</h3>
                  <p className="text-xs text-gray-400">34节AI副业实现课程已添加到您的账户</p>
                </div>
              </div>
            )}
            {isAgent && (
              <div className="flex items-center">
                <div className="w-8 h-8 rounded-full bg-green-900/30 flex items-center justify-center mr-3 border border-green-500/30">
                  <Users className="h-4 w-4 text-green-400" />
                </div>
                <div>
                  <h3 className="text-sm font-medium text-white">代理商权限</h3>
                  <p className="text-xs text-gray-400">您已获得{agentLevel}的分润权限和专属功能</p>
                </div>
              </div>
            )}
          </div>
        </Card>

        {/* 下一步引导 */}
        <h2 className="text-xl font-semibold mb-4">下一步</h2>
        <div className="space-y-3 mb-6">
          {displayNextSteps.map((step) => (
            <Link href={step.link} key={step.id}>
              <Card className="border-gray-800 bg-gray-900 p-4 hover:bg-gray-800/80 transition-colors cursor-pointer">
                <div className="flex items-center">
                  <div className={`w-10 h-10 rounded-full ${step.color} flex items-center justify-center mr-3`}>
                    {step.icon}
                  </div>
                  <div className="flex-1">
                    <h3 className="font-medium text-white">{step.title}</h3>
                    <p className="text-xs text-gray-400">{step.description}</p>
                  </div>
                  <ChevronRight className="h-5 w-5 text-gray-500" />
                </div>
              </Card>
            </Link>
          ))}
        </div>

        {/* 分享邀请 */}
        <Card className="border-gray-800 bg-gradient-to-r from-blue-900/30 to-purple-900/30 p-4 mb-6">
          <div className="flex items-center">
            <div className="flex-1">
              <h3 className="font-medium text-white mb-1">邀请好友一起加入</h3>
              <p className="text-sm text-gray-300">分享给好友，双方都可获得额外7天会员</p>
            </div>
            <Button className="bg-white text-gray-900 hover:bg-gray-200">
              <Share2 className="h-4 w-4 mr-2" />
              立即分享
            </Button>
          </div>
        </Card>

        {/* 底部按钮 */}
        <div className="fixed bottom-0 left-0 right-0 p-4 bg-gray-900/80 backdrop-blur-md border-t border-gray-800">
          <div className="max-w-md mx-auto">
            <Button
              className="w-full bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 h-12"
              onClick={() => router.push("/")}
            >
              返回首页
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
