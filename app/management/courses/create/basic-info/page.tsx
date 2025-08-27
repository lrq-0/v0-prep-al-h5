"use client"

import type React from "react"

import { useState } from "react"
import { ArrowLeft, Sparkles, Loader2 } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import Image from "next/image"
import { Progress } from "@/components/ui/progress"

export default function CourseBasicInfo() {
  const router = useRouter()

  // 状态管理
  const [courseTitle, setCourseTitle] = useState("")
  const [coursePrice, setCoursePrice] = useState("")
  const [courseOriginalPrice, setCourseOriginalPrice] = useState("")
  const [courseLessons, setCourseLessons] = useState("")
  const [courseCategory, setCourseCategory] = useState("")
  const [customCategory, setCustomCategory] = useState("")
  const [showCustomCategory, setShowCustomCategory] = useState(false)
  const [courseDescription, setCourseDescription] = useState("")
  const [courseImage, setCourseImage] = useState<string | null>(null)
  const [isFeatured, setIsFeatured] = useState(false)
  const [isPublished, setIsPublished] = useState(false)
  const [isGeneratingIntro, setIsGeneratingIntro] = useState(false)

  // 预设课程分类
  const courseCategories = [
    { value: "chinese", label: "语文" },
    { value: "math", label: "数学" },
    { value: "english", label: "英语" },
    { value: "physics", label: "物理" },
    { value: "chemistry", label: "化学" },
    { value: "biology", label: "生物" },
    { value: "history", label: "历史" },
    { value: "geography", label: "地理" },
    { value: "politics", label: "政治" },
    { value: "it", label: "信息技术" },
    { value: "custom", label: "自定义分类..." },
  ]

  // 处理课程分类选择
  const handleCategoryChange = (value: string) => {
    setCourseCategory(value)
    setShowCustomCategory(value === "custom")
  }

  // 处理课程封面上传
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0]
      const reader = new FileReader()
      reader.onload = (e) => {
        if (e.target?.result) {
          setCourseImage(e.target.result as string)
        }
      }
      reader.readAsDataURL(file)
    }
  }

  // AI生成课程简介
  const generateCourseIntro = () => {
    if (!courseTitle || !courseCategory) {
      alert("请先填写课程标题和选择分类")
      return
    }

    setIsGeneratingIntro(true)

    // 模拟AI生成过程
    setTimeout(() => {
      const categoryText = showCustomCategory
        ? customCategory
        : courseCategories.find((c) => c.value === courseCategory)?.label || ""

      const generatedIntro = `这是一门精心打造的${categoryText}课程。本课程《${courseTitle}》专为希望提升${categoryText}能力的学员设计，通过系统化的教学内容和丰富的实践案例，帮助学员掌握${categoryText}的核心知识点和解题技巧。课程内容涵盖基础概念讲解、重点难点分析、经典例题剖析和实战演练，适合各个水平的学习者。学完本课程，您将能够独立解决${categoryText}领域的常见问题，提升学习效率和应试能力。`

      setCourseDescription(generatedIntro)
      setIsGeneratingIntro(false)
    }, 1500)
  }

  // 保存并前往下一步
  const handleSaveAndNext = () => {
    // 这里应该有保存数据的逻辑
    // 保存成功后跳转到下一步
    router.push("/management/courses/create/instructor")
  }

  // 检查表单是否填写完整
  const isFormComplete = () => {
    return courseTitle && courseCategory && coursePrice && courseDescription
  }

  return (
    <div className="min-h-screen bg-black text-white">
      {/* 顶部导航栏 */}
      <div className="sticky top-0 left-0 right-0 h-14 flex items-center px-4 bg-gray-900/80 backdrop-blur-md border-b border-gray-800 z-10">
        <Link href="/management/courses" className="flex items-center text-gray-300">
          <ArrowLeft className="h-5 w-5 mr-2" />
          <span>返回</span>
        </Link>
        <h1 className="flex-1 text-center text-lg font-semibold text-white">创建课程 - 基本信息</h1>
      </div>

      <div className="p-4 pb-24">
        {/* 进度指示器 */}
        <div className="mb-6">
          <div className="flex justify-between mb-2">
            <div className="text-sm text-blue-400">基本信息</div>
            <div className="text-sm text-gray-500">讲师信息</div>
            <div className="text-sm text-gray-500">课程章节</div>
            <div className="text-sm text-gray-500">AI助理</div>
          </div>
          <Progress value={25} className="h-2 bg-gray-700" indicatorClassName="bg-blue-500" />
        </div>

        {/* 基本信息表单 */}
        <Card className="p-4 bg-gray-900 border-gray-800 mb-6">
          <h2 className="text-lg font-semibold text-white mb-4">基本信息</h2>

          <div className="grid gap-4">
            <div>
              <Label htmlFor="course-title" className="text-white mb-2 block">
                课程标题 <span className="text-red-500">*</span>
              </Label>
              <Input
                id="course-title"
                value={courseTitle}
                onChange={(e) => setCourseTitle(e.target.value)}
                placeholder="请输入课程标题"
                className="bg-gray-800 border-gray-700 text-white"
                required
              />
            </div>

            <div>
              <Label htmlFor="course-category" className="text-white mb-2 block">
                所属分类 <span className="text-red-500">*</span>
              </Label>
              <Select value={courseCategory} onValueChange={handleCategoryChange}>
                <SelectTrigger className="bg-gray-800 border-gray-700 text-white">
                  <SelectValue placeholder="选择课程分类" />
                </SelectTrigger>
                <SelectContent className="bg-gray-900 border-gray-700 text-white">
                  {courseCategories.map((category) => (
                    <SelectItem key={category.value} value={category.value}>
                      {category.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {showCustomCategory && (
                <div className="mt-2">
                  <Input
                    value={customCategory}
                    onChange={(e) => setCustomCategory(e.target.value)}
                    placeholder="请输入自定义分类名称"
                    className="bg-gray-800 border-gray-700 text-white"
                  />
                </div>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="course-price" className="text-white mb-2 block">
                  课程价格 <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="course-price"
                  value={coursePrice}
                  onChange={(e) => setCoursePrice(e.target.value)}
                  placeholder="请输入价格，免费课程填0"
                  className="bg-gray-800 border-gray-700 text-white"
                  required
                />
              </div>

              <div>
                <Label htmlFor="course-original-price" className="text-white mb-2 block">
                  原价（可选）
                </Label>
                <Input
                  id="course-original-price"
                  value={courseOriginalPrice}
                  onChange={(e) => setCourseOriginalPrice(e.target.value)}
                  placeholder="课程原价，用于显示折扣"
                  className="bg-gray-800 border-gray-700 text-white"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="course-lessons" className="text-white mb-2 block">
                课程节数 <span className="text-red-500">*</span>
              </Label>
              <Input
                id="course-lessons"
                value={courseLessons}
                onChange={(e) => setCourseLessons(e.target.value)}
                placeholder="例如：24节课"
                className="bg-gray-800 border-gray-700 text-white"
                required
              />
            </div>

            <div>
              <div className="flex justify-between items-center mb-2">
                <Label htmlFor="course-description" className="text-white">
                  课程简介 <span className="text-red-500">*</span>
                </Label>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={generateCourseIntro}
                  disabled={isGeneratingIntro || !courseTitle || !courseCategory}
                  className="h-8 border-blue-500/30 text-blue-400 hover:bg-blue-500/20"
                >
                  {isGeneratingIntro ? (
                    <>
                      <Loader2 className="h-3.5 w-3.5 mr-1.5 animate-spin" />
                      生成中...
                    </>
                  ) : (
                    <>
                      <Sparkles className="h-3.5 w-3.5 mr-1.5" />
                      AI生成简介
                    </>
                  )}
                </Button>
              </div>
              <Textarea
                id="course-description"
                value={courseDescription}
                onChange={(e) => setCourseDescription(e.target.value)}
                placeholder="请输入课程简介，将显示在课程详情页"
                className="bg-gray-800 border-gray-700 text-white min-h-[100px]"
                required
              />
            </div>
          </div>
        </Card>

        {/* 课程封面 */}
        <Card className="p-4 bg-gray-900 border-gray-800 mb-6">
          <h2 className="text-lg font-semibold text-white mb-4">课程封面</h2>

          <div className="grid gap-4">
            <div className="flex items-center">
              <div className="relative w-32 h-24 mr-4">
                {courseImage ? (
                  <Image
                    src={courseImage || "/placeholder.svg"}
                    alt="课程封面"
                    fill
                    className="object-cover rounded-md"
                  />
                ) : (
                  <div className="w-full h-full rounded-md bg-gray-800 border-2 border-dashed border-gray-600 flex items-center justify-center">
                    <span className="text-gray-500 text-xs">上传封面</span>
                  </div>
                )}
              </div>
              <div>
                <Input type="file" className="hidden" id="course-image" accept="image/*" onChange={handleImageUpload} />
                <Label htmlFor="course-image">
                  <Button
                    variant="outline"
                    className="border-blue-500/30 text-blue-400 hover:bg-blue-500/20 mb-2"
                    asChild
                  >
                    <span>上传封面图片</span>
                  </Button>
                </Label>
                <p className="text-xs text-gray-500">建议尺寸: 1280×720px，格式：JPG/PNG</p>
              </div>
            </div>
          </div>
        </Card>

        {/* 提示信息 */}
        <div className="bg-blue-900/20 border border-blue-500/30 rounded-lg p-4 mb-6">
          <h3 className="text-blue-400 font-medium mb-2">填写提示</h3>
          <ul className="text-sm text-gray-300 space-y-2">
            <li>• 课程标题应简洁明了，能够清晰传达课程内容</li>
            <li>• 课程简介是学员了解课程的重要途径，建议详细描述课程内容和学习收获</li>
            <li>• 合理定价能够提高课程的吸引力，可以参考同类课程的价格区间</li>
            <li>• 高质量的课程封面能够提高点击率，建议使用清晰、专业的图片</li>
          </ul>
        </div>
      </div>

      {/* 底部保存按钮 */}
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-gray-900/95 backdrop-blur-md border-t border-gray-800">
        <Button
          className="w-full bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400"
          onClick={handleSaveAndNext}
          disabled={!isFormComplete()}
        >
          下一步：添加讲师信息
        </Button>
      </div>
    </div>
  )
}
