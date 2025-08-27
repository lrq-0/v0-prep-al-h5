"use client"

import { useState } from "react"
import { ArrowLeft, Bot, Save, MessageCircle, Sparkles, Loader2 } from "lucide-react"
import { useRouter } from "next/navigation"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Progress } from "@/components/ui/progress"
import { Alert, AlertDescription } from "@/components/ui/alert"

export default function CourseAIAssistant() {
  const router = useRouter()

  // 状态管理
  const [aiAssistantName, setAiAssistantName] = useState("课程助手")
  const [aiAssistantPrompt, setAiAssistantPrompt] = useState("")
  const [isGeneratingPrompt, setIsGeneratingPrompt] = useState(false)
  const [createAssistant, setCreateAssistant] = useState(true)
  const [isSaving, setIsSaving] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)

  // 生成AI助理提示词
  const generateAIPrompt = () => {
    setIsGeneratingPrompt(true)

    // 模拟AI生成过程
    setTimeout(() => {
      const generatedPrompt = `你是"${aiAssistantName}"，这门课程的AI助手。

你的主要职责是帮助学生解答关于本课程的问题，特别是与课程内容相关的疑问。

课程简介：
这是一门系统化的学习课程，通过专业的教学内容和丰富的实践案例，帮助学员掌握核心知识点和解题技巧。

你应该：
1. 回答学生关于课程内容的问题
2. 解释课程中的难点概念
3. 提供学习建议和方法
4. 推荐相关的学习资源
5. 解答课程购买、学习方式等问题

你可以补充的销售政策信息：
- 课程优惠政策：新用户首次购买可享受9折优惠
- 退款政策：购买后7天内未学习可申请全额退款

请用友好、专业的语气回答问题，避免过于销售化的语言。`

      setAiAssistantPrompt(generatedPrompt)
      setIsGeneratingPrompt(false)
    }, 1500)
  }

  // 保存课程
  const handleSaveCourse = () => {
    setIsSaving(true)

    // 模拟API请求
    setTimeout(() => {
      setIsSaving(false)
      setShowSuccess(true)

      // 3秒后跳转到课程列表
      setTimeout(() => {
        router.push("/management/courses")
      }, 3000)
    }, 1500)
  }

  // 返回上一步
  const handleBack = () => {
    router.push("/management/courses/create/chapters")
  }

  // 检查表单是否填写完整
  const isFormComplete = () => {
    if (!createAssistant) return true
    return aiAssistantName && aiAssistantPrompt
  }

  return (
    <div className="min-h-screen bg-black text-white">
      {/* 顶部导航栏 */}
      <div className="sticky top-0 left-0 right-0 h-14 flex items-center px-4 bg-gray-900/80 backdrop-blur-md border-b border-gray-800 z-10">
        <button onClick={handleBack} className="flex items-center text-gray-300">
          <ArrowLeft className="h-5 w-5 mr-2" />
          <span>返回</span>
        </button>
        <h1 className="flex-1 text-center text-lg font-semibold text-white">创建课程 - AI助理</h1>
      </div>

      {/* 成功提示 */}
      {showSuccess && (
        <div className="fixed top-16 left-4 right-4 z-50">
          <Alert className="bg-green-900/60 border-green-500 backdrop-blur-sm">
            <MessageCircle className="h-4 w-4 text-green-400 mr-2" />
            <AlertDescription className="text-green-400">课程创建成功！正在跳转到课程列表...</AlertDescription>
          </Alert>
        </div>
      )}

      <div className="p-4 pb-24">
        {/* 进度指示器 */}
        <div className="mb-6">
          <div className="flex justify-between mb-2">
            <div className="text-sm text-gray-400">基本信息</div>
            <div className="text-sm text-gray-400">讲师信息</div>
            <div className="text-sm text-gray-400">课程章节</div>
            <div className="text-sm text-blue-400">AI助理</div>
          </div>
          <Progress value={100} className="h-2 bg-gray-700" indicatorClassName="bg-blue-500" />
        </div>

        {/* AI助理开关 */}
        <Card className="p-4 bg-gray-900 border-gray-800 mb-6">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-lg font-semibold text-white">创建课程AI助理</h2>
              <p className="text-sm text-gray-400 mt-1">AI助理可以帮助学员解答关于课程的问题，提升学习体验</p>
            </div>
            <Switch checked={createAssistant} onCheckedChange={setCreateAssistant} />
          </div>
        </Card>

        {createAssistant && (
          <>
            {/* AI助理设置 */}
            <Card className="p-4 bg-gray-900 border-gray-800 mb-6">
              <h2 className="text-lg font-semibold text-white mb-4">AI助理设置</h2>

              <div className="grid gap-4">
                <div>
                  <Label htmlFor="ai-assistant-name" className="text-white mb-2 block">
                    AI助理名称 <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="ai-assistant-name"
                    value={aiAssistantName}
                    onChange={(e) => setAiAssistantName(e.target.value)}
                    placeholder="请输入AI助理名称"
                    className="bg-gray-800 border-gray-700 text-white"
                  />
                </div>

                <div>
                  <div className="flex justify-between items-center mb-2">
                    <Label htmlFor="ai-assistant-prompt" className="text-white">
                      AI助理提示词 <span className="text-red-500">*</span>
                    </Label>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={generateAIPrompt}
                      disabled={isGeneratingPrompt}
                      className="h-8 border-blue-500/30 text-blue-400 hover:bg-blue-500/20"
                    >
                      {isGeneratingPrompt ? (
                        <>
                          <Loader2 className="h-3.5 w-3.5 mr-1.5 animate-spin" />
                          生成中...
                        </>
                      ) : (
                        <>
                          <Sparkles className="h-3.5 w-3.5 mr-1.5" />
                          AI生成提示词
                        </>
                      )}
                    </Button>
                  </div>
                  <Textarea
                    id="ai-assistant-prompt"
                    value={aiAssistantPrompt}
                    onChange={(e) => setAiAssistantPrompt(e.target.value)}
                    placeholder="请输入AI助理提示词，用于指导AI助理的行为和回答方式"
                    className="bg-gray-800 border-gray-700 text-white min-h-[200px]"
                  />
                  <p className="text-xs text-gray-400 mt-1">
                    提示词将决定AI助理的行为和回答方式，您可以添加课程销售政策、优惠信息等内容。
                  </p>
                </div>
              </div>
            </Card>

            {/* AI助理预览 */}
            <Card className="p-4 bg-gray-900 border-gray-800 mb-6">
              <h2 className="text-lg font-semibold text-white mb-4">AI助理预览</h2>

              <div className="bg-gray-800 border border-gray-700 rounded-lg p-4">
                <div className="flex items-start mb-4">
                  <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center mr-3 flex-shrink-0">
                    <Bot className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <h3 className="font-medium text-white">{aiAssistantName || "课程助手"}</h3>
                    <p className="text-sm text-gray-300 mt-1">
                      您好！我是本课程的AI助理，有任何关于课程内容的问题，都可以随时向我提问。
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="w-10 h-10 rounded-full bg-gray-700 flex items-center justify-center mr-3 flex-shrink-0">
                    <MessageCircle className="h-5 w-5 text-gray-400" />
                  </div>
                  <div className="bg-gray-700 rounded-lg p-3 max-w-[80%]">
                    <p className="text-sm text-gray-300">这门课程适合零基础的学员吗？需要什么预备知识？</p>
                  </div>
                </div>

                <div className="flex items-start mt-4">
                  <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center mr-3 flex-shrink-0">
                    <Bot className="h-5 w-5 text-white" />
                  </div>
                  <div className="bg-blue-900/30 border border-blue-500/20 rounded-lg p-3 max-w-[80%]">
                    <p className="text-sm text-gray-300">
                      是的，这门课程非常适合零基础的学员！课程从基础概念开始讲解，循序渐进，不需要特别的预备知识。老师会用通俗易懂的方式解释复杂概念，并提供大量练习帮助巩固。如果您是完全的新手，建议按照课程顺序学习，不要跳过基础章节。
                    </p>
                  </div>
                </div>
              </div>
            </Card>
          </>
        )}

        {/* 提示信息 */}
        <div className="bg-blue-900/20 border border-blue-500/30 rounded-lg p-4 mb-6">
          <h3 className="text-blue-400 font-medium mb-2">AI助理提示</h3>
          <ul className="text-sm text-gray-300 space-y-2">
            <li>• AI助理可以大大提升学员的学习体验，帮助解答常见问题</li>
            <li>• 提示词越详细，AI助理的回答就越准确和有帮助</li>
            <li>• 建议在提示词中包含课程的核心内容、常见问题及答案</li>
            <li>• 可以设置AI助理回答问题的风格和语气，使其更符合课程风格</li>
          </ul>
        </div>
      </div>

      {/* 底部保存按钮 */}
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-gray-900/95 backdrop-blur-md border-t border-gray-800">
        <div className="flex justify-between">
          <Button variant="outline" onClick={handleBack} className="w-1/3 border-gray-700 text-white">
            上一步
          </Button>

          <Button
            className="w-2/3 ml-3 bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400"
            onClick={handleSaveCourse}
            disabled={!isFormComplete() || isSaving}
          >
            {isSaving ? (
              <>
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                保存中...
              </>
            ) : (
              <>
                <Save className="h-4 w-4 mr-2" />
                完成创建
              </>
            )}
          </Button>
        </div>
      </div>
    </div>
  )
}
