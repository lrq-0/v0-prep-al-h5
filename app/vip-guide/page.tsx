"use client"

import { useState } from "react"
import { ArrowLeft, Crown, Zap, BookOpen, Calendar, Users, Star } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"

export default function VipGuide() {
  const [activeTab, setActiveTab] = useState("features")

  // VIP功能列表
  const vipFeatures = [
    {
      id: "ai-assistant",
      title: "AI智能助教",
      description: "随时随地解答您的学习问题，提供个性化学习建议",
      icon: <Zap className="h-5 w-5 text-blue-400" />,
      color: "bg-blue-900/20 border-blue-500/30",
      steps: [
        '点击首页的"AI助手"按钮进入对话界面',
        "选择您需要的AI助手类型",
        "输入您的问题或学习需求",
        "AI助手将立即为您提供专业解答",
      ],
    },
    {
      id: "knowledge-base",
      title: "知识库",
      description: "访问海量专业知识库，助力学习和研究",
      icon: <BookOpen className="h-5 w-5 text-purple-400" />,
      color: "bg-purple-900/20 border-purple-500/30",
      steps: [
        '在首页点击"知识库"进入知识库页面',
        "浏览分类或使用搜索功能查找内容",
        "点击感兴趣的知识库文章阅读详情",
        "可以收藏重要内容以便日后查阅",
      ],
    },
    {
      id: "learning-path",
      title: "学习路径",
      description: "获取个性化学习计划和进度跟踪",
      icon: <Calendar className="h-5 w-5 text-green-400" />,
      color: "bg-green-900/20 border-green-500/30",
      steps: [
        '在个人中心点击"学习路径"',
        "选择您感兴趣的学习方向",
        "系统将为您生成个性化学习计划",
        "按照计划学习并跟踪进度",
      ],
    },
    {
      id: "community",
      title: "VIP社区",
      description: "加入专属学习社区，与行业专家互动",
      icon: <Users className="h-5 w-5 text-amber-400" />,
      color: "bg-amber-900/20 border-amber-500/30",
      steps: [
        '在个人中心点击"VIP社区"',
        "浏览社区话题和讨论",
        "参与互动或发起新的讨论",
        "与其他会员和专家交流学习心得",
      ],
    },
  ]

  // 常见问题
  const faqs = [
    {
      question: "如何查看我的会员有效期？",
      answer: '您可以在"我的"-"个人中心"页面查看会员有效期和剩余使用次数。',
    },
    {
      question: "会员到期后我的数据会丢失吗？",
      answer: "不会。即使会员到期，您的所有学习记录和个人数据都会被保留，重新开通会员后可以继续使用。",
    },
    {
      question: "如何取消自动续费？",
      answer: '在"我的"-"设置"-"会员管理"中可以关闭自动续费功能。',
    },
    {
      question: "会员可以在多少设备上同时使用？",
      answer: "一个会员账号可以在最多3台设备上同时登录使用。",
    },
    {
      question: "如何联系客服？",
      answer: '您可以在"我的"-"联系客服"中与在线客服沟通，或拨打客服热线400-888-8888。',
    },
  ]

  return (
    <div className="min-h-screen bg-black text-white">
      {/* 顶部导航栏 */}
      <div className="sticky top-0 left-0 right-0 h-14 flex items-center px-4 bg-gray-900/80 backdrop-blur-md border-b border-gray-800 z-10">
        <Link href="/payment-success" className="flex items-center text-gray-300">
          <ArrowLeft className="h-5 w-5 mr-2" />
          <span>返回</span>
        </Link>
        <h1 className="flex-1 text-center text-lg font-semibold text-white">VIP会员指南</h1>
      </div>

      <div className="p-4 pb-24">
        {/* 欢迎信息 */}
        <div className="bg-gradient-to-r from-blue-900/30 to-purple-900/30 rounded-lg p-6 mb-6 border border-blue-500/20 relative overflow-hidden">
          <div className="absolute right-0 top-0 opacity-10">
            <Crown className="h-32 w-32 text-amber-400" />
          </div>
          <h1 className="text-2xl font-bold text-white mb-2">欢迎，尊贵的VIP会员</h1>
          <p className="text-gray-300 mb-4">感谢您成为我们的VIP会员。本指南将帮助您了解如何充分利用您的会员特权。</p>
          <div className="flex items-center">
            <div className="w-8 h-8 rounded-full bg-amber-900/30 flex items-center justify-center mr-2 border border-amber-500/30">
              <Star className="h-4 w-4 text-amber-400" />
            </div>
            <span className="text-amber-300 text-sm">尊享所有高级功能</span>
          </div>
        </div>

        {/* 功能导航标签 */}
        <Tabs defaultValue="features" className="w-full mb-6" onValueChange={setActiveTab}>
          <TabsList className="w-full grid grid-cols-2 bg-gray-900 border-b border-gray-800 rounded-none h-12 mb-4">
            <TabsTrigger value="features" className="data-[state=active]:text-blue-400">
              VIP功能
            </TabsTrigger>
            <TabsTrigger value="faq" className="data-[state=active]:text-blue-400">
              常见问题
            </TabsTrigger>
          </TabsList>

          <TabsContent value="features">
            <div className="space-y-4">
              {vipFeatures.map((feature) => (
                <Card key={feature.id} className="border-gray-800 bg-gray-900 p-4">
                  <div className="flex items-start mb-3">
                    <div
                      className={`w-10 h-10 rounded-full ${feature.color} flex items-center justify-center mr-3 flex-shrink-0`}
                    >
                      {feature.icon}
                    </div>
                    <div>
                      <h3 className="font-medium text-white">{feature.title}</h3>
                      <p className="text-sm text-gray-400 mt-1">{feature.description}</p>
                    </div>
                  </div>
                  <div className="bg-gray-800/50 rounded-lg p-3 mt-3">
                    <h4 className="text-sm font-medium text-white mb-2">使用方法</h4>
                    <ol className="space-y-2">
                      {feature.steps.map((step, index) => (
                        <li key={index} className="flex items-start text-sm">
                          <span className="w-5 h-5 rounded-full bg-blue-900/30 border border-blue-500/30 flex items-center justify-center text-xs mr-2 flex-shrink-0">
                            {index + 1}
                          </span>
                          <span className="text-gray-300">{step}</span>
                        </li>
                      ))}
                    </ol>
                  </div>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="faq">
            <Card className="border-gray-800 bg-gray-900 p-4">
              <h2 className="font-medium text-white mb-4">常见问题解答</h2>
              <div className="space-y-4">
                {faqs.map((faq, index) => (
                  <div key={index}>
                    <h3 className="font-medium text-white mb-2">{faq.question}</h3>
                    <p className="text-sm text-gray-400">{faq.answer}</p>
                    {index < faqs.length - 1 && <Separator className="my-4 bg-gray-800" />}
                  </div>
                ))}
              </div>
            </Card>
          </TabsContent>
        </Tabs>

        {/* 联系支持 */}
        <Card className="border-gray-800 bg-gray-900 p-4 mb-6">
          <h2 className="font-medium text-white mb-3">需要帮助？</h2>
          <p className="text-sm text-gray-400 mb-4">如果您有任何问题或需要帮助，我们的客服团队随时为您服务。</p>
          <div className="flex space-x-3">
            <Button variant="outline" className="flex-1 border-gray-700 text-gray-300 hover:bg-gray-800">
              在线客服
            </Button>
            <Button className="flex-1 bg-blue-600 hover:bg-blue-500">联系电话</Button>
          </div>
        </Card>

        {/* 底部按钮 */}
        {activeTab === "features" && (
          <div className="fixed bottom-0 left-0 right-0 p-4 bg-gray-900/80 backdrop-blur-md border-t border-gray-800">
            <Button
              className="w-full bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 h-12"
              onClick={() => (window.location.href = "/")}
            >
              开始使用VIP功能
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}
