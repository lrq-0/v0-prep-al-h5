"use client"

import { useState } from "react"
import { ArrowLeft, Bot, MessageCircle, Sparkles, Loader2 } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Alert, AlertDescription } from "@/components/ui/alert"

export default function CreateCourseAI() {
  const router = useRouter()

  // 状态管理
  const [selectedCourse, setSelectedCourse] = useState("")
  const [aiAssistantName, setAiAssistantName] = useState("")
  const [aiAssistantPrompt, setAiAssistantPrompt] = useState("")
  const [isGeneratingPrompt, setIsGeneratingPrompt] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)

  // 获取URL中的课程ID参数
  const searchParams = new URLSearchParams(typeof window !== 'undefined' ? window.location.search : '');
  const courseId = searchParams.get('id');
  
  // 如果有课程ID，则加载对应的AI助理数据
  useState(() => {
    if (courseId) {
      // 这里应该有API请求获取AI助理数据
      // 模拟加载AI助理数据
      setTimeout(() => {
        setSelectedCourse(courseId);
        setAiAssistantName("高考英语词汇助手");
        setAiAssistantPrompt(`你是"高考英语词汇助手"，这门课程的AI助手。

你的主要职责是帮助学生解答关于本课程的问题，特别是与课程内容相关的疑问。

课程简介：
这是一门系统化的高考英语词汇精讲学习课程，通过专业的教学内容和丰富的实践案例，帮助学员掌握核心知识点和解题技巧。

你应该：
1. 回答学生关于课程内容的问题
2. 解释课程中的难点概念
3. 提供学习建议和方法
4. 推荐相关的学习资源
5. 解答课程购买、学习方式等问题

你可以补充的销售政策信息：
- 课程优惠政策：新用户首次购买可享受9折优惠
- 退款政策：购买后7天内未学习可申请全额退款

请用友好、专业的语气回答问题，避免过于销售化的语言。`);
      }, 500);
    }
  }, [courseId]);

  // 模拟课程数据
  const courses = [
    { id: "1", title: "高考英语词汇精讲" },
    { id: "2", title: "数学解题技巧与方法" },
    { id: "3", title: "物理实验与解析" },
    { id: "4", title: "语文阅读理解专项训练" },
  ]

  // 生成AI助理提示词
  const generateAIPrompt = () => {
    if (!selectedCourse) {
      alert("请先选择课程")
      return
    }

    setIsGeneratingPrompt(true)

    // 模拟AI生成过程
    setTimeout(() => {
      const course = courses.find(c => c.id === selectedCourse)
      const courseName = course ? course.title : "课程"
      
      const generatedPrompt = `你是"${aiAssistantName || courseName + "助手"}"，这门课程的AI助手。

你的主要职责是帮助学生解答关于本课程的问题，特别是与课程内容相关的疑问。

课程简介：
这是一门系统化的${courseName}学习课程，通过专业的教学内容和丰富的实践案例，帮助学员掌握核心知识点和解题技巧。

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
      if (!aiAssistantName && course) {
        setAiAssistantName(course.title + "助手")
      }
      setIsGeneratingPrompt(false)
    }, 1500)
  }

  // 保存AI助理
  const handleSaveAI = () => {
    if (!selectedCourse || !aiAssistantName || !aiAssistantPrompt) {
      alert("请填写所有必填项")
      return
    }

    setIsSaving(true)

    // 模拟API请求
    setTimeout(() => {
      setIsSaving(false)
      setShowSuccess(true)

      // 3秒后跳转到课程列表
      setTimeout(() => {
        router.push("/management/courses")
      }, 2000)
    }, 1000)
  }

  // 检查表单是否填写完整
  const isFormComplete = () => {
    return selectedCourse && aiAssistantName && aiAssistantPrompt
  }

  return (
    <div className="min-h-screen bg-black text-white">
      {/* 顶部导航栏 */}
      <div className="sticky top-0 left-0 right-0 h-14 flex items-center px-4 bg-gray-900/80 backdrop-blur-md border-b border-gray-800 z-10">
        <Link href="/management/courses" className="flex items-center text-gray-300">
          <ArrowLeft className="h-5 w-5 mr-2" />
          <span>返回</span>
        </Link>
        <h1 className="flex-1 text-center text-lg font-semibold text-white">{courseId ? "修改AI助理" : "创建课程AI助理"}</h1>
      </div>

      {/* 成功提示 */}
      {showSuccess && (
        <div className="fixed top-16 left-4 right-4 z-50">
          <Alert className="bg-green-900/60 border-green-500 backdrop-blur-sm">
            <Bot className="h-4 w-4 text-green-400 mr-2" />
            <AlertDescription className="text-green-400">AI助理创建成功！正在返回课程设置页面...</AlertDescription>
          </Alert>
        </div>
      )}

      <div className="p-4 pb-24">
        {/* 选择课程 */}
        <Card className="p-4 bg-gray-900 border-gray-800 mb-6">
          <h2 className="text-lg font-semibold text-white mb-4">选择课程</h2>

          <div className="grid gap-4">
            <div>
              <Label htmlFor="select-course" className="text-white mb-2 block">
                选择要创建AI助理的课程 <span className="text-red-500">*</span>
              </Label>
              <Select value={selectedCourse} onValueChange={setSelectedCourse}>
                <SelectTrigger id="select-course" className="bg-gray-800 border-gray-700 text-white">
                  <SelectValue placeholder="选择课程" />
                </SelectTrigger>
                <SelectContent className="bg-gray-900 border-gray-700 text-white">
                  {courses.map((course) => (
                    <SelectItem key={course.id} value={course.id}>
                      {course.title}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </Card>

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
                  disabled={isGeneratingPrompt || !selectedCourse}
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
            </div>\
