"use client"

import type React from "react"

import { useState, useRef } from "react"
import { ArrowLeft, Save, Sparkles, Loader2, Upload } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Alert, AlertDescription } from "@/components/ui/alert"
import Image from "next/image"
import { Switch } from "@/components/ui/switch"

export default function CreateCourse() {
  const router = useRouter()
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  // 获取URL中的课程ID参数
  const searchParams = new URLSearchParams(typeof window !== "undefined" ? window.location.search : "")
  const courseId = searchParams.get("id")

  // 状态管理
  const [courseType, setCourseType] = useState("recorded")
  const [courseTitle, setCourseTitle] = useState("")
  const [courseInstructor, setCourseInstructor] = useState("")
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
  const [courseContent, setCourseContent] = useState("")
  const [isPreviewMode, setIsPreviewMode] = useState(false)
  const [isGeneratingIntro, setIsGeneratingIntro] = useState(false)
  const [isGeneratingDetail, setIsGeneratingDetail] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)

  // 如果有课程ID，则加载对应的课程数据
  useState(() => {
    if (courseId) {
      // 这里应该有API请求获取课程数据
      // 模拟加载课程数据
      setTimeout(() => {
        setCourseTitle("高考英语词汇精讲")
        setCourseInstructor("王老师")
        setCourseCategory("english")
        setCoursePrice("299")
        setCourseOriginalPrice("399")
        setCourseLessons("24课时")
        setCourseDescription(
          "这是一门由王老师精心打造的英语录播课程。本课程《高考英语词汇精讲》专为希望提升英语能力的学员设计，通过系统化的教学内容和丰富的实践案例，帮助学员掌握英语的核心知识点和解题技巧。课程内容涵盖基础概念讲解、重点难点分析、经典例题剖析和实战演练，适合各个水平的学习者。学完本课程，您将能够独立解决英语领域的常见问题，提升学习效率和应试能力。",
        )
        setIsFeatured(true)
        setIsPublished(true)
        // 设置课程详情内容
        setCourseContent(
          "# 高考英语词汇精讲\n\n## 课程介绍\n\n这是一门由王老师精心打造的英语录播课程。本课程《高考英语词汇精讲》专为希望提升英语能力的学员设计，通过系统化的教学内容和丰富的实践案例，帮助学员掌握英语的核心知识点和解题技巧。课程内容涵盖基础概念讲解、重点难点分析、经典例题剖析和实战演练，适合各个水平的学习者。学完本课程，您将能够独立解决英语领域的常见问题，提升学习效率和应试能力。\n\n## 课程亮点\n\n- **专业系统**：由王老师精心设计的系统化英语学习路径\n- **重点突破**：针对英语学习中的常见难点和考点进行专项讲解\n- **案例丰富**：结合大量实际案例和例题，加深理解和记忆\n- **互动学习**：每节课后配有练习题和答疑环节\n\n## 适合人群\n\n- 英语基础薄弱，需要系统学习的学生\n- 希望提升英语成绩，冲刺高分的考生\n- 对英语有浓厚兴趣，想要深入学习的爱好者\n- 需要在短期内掌握英语核心知识点的自学者",
        )
      }, 500)
    }
  }, [courseId])

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

  // 预设讲师数据
  const existingTeachers = [
    {
      id: 1,
      name: "王老师",
      description: "北京大学数学系博士，有10年高中数学教学经验，善于用生动的例子讲解复杂的数学概念。",
    },
    {
      id: 2,
      name: "李老师",
      description: "清华大学英语系硕士，英语专业八级，曾获全国优秀教师称号，教学风格活泼生动。",
    },
    {
      id: 3,
      name: "张老师",
      description: "复旦大学物理系教授，从事物理教学20年，擅长实验教学和理论讲解相结合的教学方法。",
    },
    {
      id: 4,
      name: "刘老师",
      description: "中国人民大学中文系毕业，语文教学专家，对文学作品有独到见解，教学经验丰富。",
    },
    { value: "new", name: "添加新讲师", description: "" },
  ]

  // 处理课程分类选择
  const handleCategoryChange = (value: string) => {
    setCourseCategory(value)
    // 移除这一行，因为我们现在使用单独的按钮来显示自定义分类输入框
    // setShowCustomCategory(value === "custom")
  }

  // 处理讲师选择
  const handleTeacherChange = (value: string) => {
    setCourseInstructor(value)
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
    if (!courseTitle || !courseInstructor) {
      alert("请先填写课程标题和讲师名称")
      return
    }

    setIsGeneratingIntro(true)

    // 模拟AI生成过程
    setTimeout(() => {
      const courseTypeText = courseType === "recorded" ? "录播" : "直播"
      const categoryText = showCustomCategory
        ? customCategory
        : courseCategories.find((c) => c.value === courseCategory)?.label || ""

      const generatedIntro = `这是一门由${courseInstructor}精心打造的${categoryText}${courseTypeText}课程。本课程《${courseTitle}》专为希望提升${categoryText}能力的学员设计，通过系统化的教学内容和丰富的实践案例，帮助学员掌握${categoryText}的核心知识点和解题技巧。课程内容涵盖基础概念讲解、重点难点分析、经典例题剖析和实战演练，适合各个水平的学习者。学完本课程，您将能够独立解决${categoryText}领域的常见问题，提升学习效率和应试能力。`

      setCourseDescription(generatedIntro)
      setIsGeneratingIntro(false)
    }, 1500)
  }

  // AI生成课程详情
  const generateCourseDetail = () => {
    if (!courseTitle || !courseInstructor || !courseDescription) {
      alert("请先填写课程标题、讲师名称和课程简介")
      return
    }

    setIsGeneratingDetail(true)

    // 模拟AI生成过程
    setTimeout(() => {
      const courseTypeText = courseType === "recorded" ? "录播" : "直播"
      const categoryText = showCustomCategory
        ? customCategory
        : courseCategories.find((c) => c.value === courseCategory)?.label || ""

      const generatedDetail = `# ${courseTitle}

## 课程介绍

${courseDescription}

## 课程亮点

- **专业系统**：由${courseInstructor}精心设计的系统化${categoryText}学习路径
- **重点突破**：针对${categoryText}学习中的常见难点和考点进行专项讲解
- **案例丰富**：结合大量实际案例和例题，加深理解和记忆
- **互动学习**：${courseType === "recorded" ? "每节课后配有练习题和答疑环节" : "直播课程中可实时互动提问，即时解答疑惑"}

## 适合人群

- ${categoryText}基础薄弱，需要系统学习的学生
- 希望提升${categoryText}成绩，冲刺高分的考生
- 对${categoryText}有浓厚兴趣，想要深入学习的爱好者
- 需要在短期内掌握${categoryText}核心知识点的自学者

## 讲师介绍

${courseInstructor}，资深${categoryText}教育专家，拥有丰富的教学经验，教学风格生动活泼，深受学生喜爱。

## 学员反馈

> "这门课程内容非常丰富，讲解清晰，让我对${categoryText}有了全新的理解。" —— 学员小王

> "老师的教学方法很有特点，难点讲解特别到位，学习效果明显。" —— 学员小李

> "课程设计很合理，从基础到进阶，循序渐进，非常适合自学。" —— 学员小张

## 购买须知

- 课程有效期：${courseType === "recorded" ? "购买后365天内可无限次观看" : "仅限直播当天参与，回放保留30天"}
- 学习方式：${courseType === "recorded" ? "可随时暂停、回放，灵活安排学习时间" : "按课程表参加直播，也可观看回放"}
- 配套资料：课程大纲、学习资料、练习题及答案将在课程中提供下载
- 售后服务：专人负责技术支持和学习指导，确保学习体验

欢迎加入我们的课程，开启您的${categoryText}学习之旅！`

      setCourseContent(generatedDetail)
      setIsGeneratingDetail(false)
    }, 2000)
  }

  // 保存课程
  const handleSaveCourse = () => {
    if (!courseTitle || !courseInstructor || !courseDescription) {
      alert("请填写必填项：课程标题、讲师和课程简介")
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

  // Markdown 编辑器功能
  const insertMarkdown = (markdownSyntax: string, selectionOffset = 0) => {
    if (!textareaRef.current) return

    const textarea = textareaRef.current
    const start = textarea.selectionStart
    const end = textarea.selectionEnd
    const selectedText = textarea.value.substring(start, end)

    let newText
    let newCursorPos

    if (selectedText) {
      // 如果有选中文本，将标记应用到选中文本
      newText =
        textarea.value.substring(0, start) + markdownSyntax.replace("$1", selectedText) + textarea.value.substring(end)

      newCursorPos = start + markdownSyntax.indexOf("$1") + selectedText.length + selectionOffset
    } else {
      // 如果没有选中文本，只插入标记
      newText = textarea.value.substring(0, start) + markdownSyntax.replace("$1", "") + textarea.value.substring(end)

      newCursorPos = start + markdownSyntax.indexOf("$1") + selectionOffset
    }

    setCourseContent(newText)

    // 设置新的光标位置
    setTimeout(() => {
      textarea.focus()
      textarea.setSelectionRange(newCursorPos, newCursorPos)
    }, 0)
  }

  // 简单的 Markdown 渲染函数
  const renderMarkdown = (markdown: string) => {
    if (!markdown) return { __html: "" }

    // 转换标题
    let html = markdown
      .replace(/^### (.*$)/gim, "<h3>$1</h3>")
      .replace(/^## (.*$)/gim, "<h2>$1</h2>")
      .replace(/^# (.*$)/gim, "<h1>$1</h1>")

    // 转换粗体和斜体
    html = html.replace(/\*\*(.*?)\*\*/gim, "<strong>$1</strong>").replace(/\*(.*?)\*/gim, "<em>$1</em>")

    // 转换列表
    html = html.replace(/^\s*- (.*$)/gim, "<ul><li>$1</li></ul>").replace(/^\s*\d+\. (.*$)/gim, "<ol><li>$1</li></ol>")

    // 转换链接和图片
    html = html
      .replace(/\[(.*?)\]$$(.*?)$$/gim, '<a href="$2" target="_blank">$1</a>')
      .replace(/!\[(.*?)\]$$(.*?)$$/gim, '<img src="$2" alt="$1" style="max-width:100%;" />')

    // 转换段落
    html = html.replace(/^\s*(\n)?(.+)/gim, (m) =>
      /<(\/)?(h1|h2|h3|ul|ol|li|blockquote|pre|img)/.test(m) ? m : "<p>" + m + "</p>",
    )

    // 修复嵌套标签问题
    html = html
      .replace(/<\/ul>\s?<ul>/g, "")
      .replace(/<\/ol>\s?<ol>/g, "")
      .replace(/<\/p>\s?<p>/g, "<br />")

    return { __html: html }
  }

  return (
    <div className="min-h-screen bg-black text-white">
      {/* 顶部导航栏 */}
      <div className="sticky top-0 left-0 right-0 h-14 flex items-center px-4 bg-gray-900/80 backdrop-blur-md border-b border-gray-800 z-10">
        <Link href="/management/courses" className="flex items-center text-gray-300">
          <ArrowLeft className="h-5 w-5 mr-2" />
          <span>返回</span>
        </Link>
        <h1 className="flex-1 text-center text-lg font-semibold text-white">
          {courseId ? "修改课程介绍" : "创建课程"}
        </h1>
      </div>

      {/* 成功提示 */}
      {showSuccess && (
        <div className="fixed top-16 left-4 right-4 z-50">
          <Alert className="bg-green-900/60 border-green-500 backdrop-blur-sm">
            <Save className="h-4 w-4 text-green-400 mr-2" />
            <AlertDescription className="text-green-400">课程创建成功！正在返回课程设置页面...</AlertDescription>
          </Alert>
        </div>
      )}

      <div className="p-4 pb-24">
        {/* 课程类型选择 */}
        <Tabs defaultValue="recorded" value={courseType} onValueChange={setCourseType} className="w-full mb-6">
          <TabsList className="w-full grid grid-cols-2 bg-gray-900 border-gray-800 rounded-lg h-12">
            <TabsTrigger
              value="recorded"
              className="rounded-l-lg data-[state=active]:bg-blue-600 data-[state=active]:text-white"
            >
              录播课程
            </TabsTrigger>
            <TabsTrigger
              value="live"
              className="rounded-r-lg data-[state=active]:bg-blue-600 data-[state=active]:text-white"
            >
              直播课程
            </TabsTrigger>
          </TabsList>
        </Tabs>

        {/* 基本信息 */}
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
              <Label htmlFor="course-instructor" className="text-white mb-2 block">
                讲师名称 <span className="text-red-500">*</span>
              </Label>
              <Select value={courseInstructor} onValueChange={handleTeacherChange}>
                <SelectTrigger className="bg-gray-800 border-gray-700 text-white">
                  <SelectValue placeholder="选择讲师" />
                </SelectTrigger>
                <SelectContent className="bg-gray-800 border-gray-700 text-white">
                  {existingTeachers.map((teacher) => (
                    <SelectItem key={teacher.name} value={teacher.name}>
                      {teacher.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="course-category" className="text-white mb-2 block">
                创建或选择分类 <span className="text-red-500">*</span>
              </Label>
              <div className="flex space-x-2">
                <div className="flex-1">
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
                </div>
                <Button
                  variant="outline"
                  className="border-blue-500/30 text-blue-400 hover:bg-blue-500/20"
                  onClick={() => setShowCustomCategory(true)}
                >
                  新建
                </Button>
              </div>
              {showCustomCategory && (
                <div className="mt-2">
                  <div className="flex space-x-2">
                    <Input
                      value={customCategory}
                      onChange={(e) => setCustomCategory(e.target.value)}
                      placeholder="请输入新分类名称"
                      className="bg-gray-800 border-gray-700 text-white flex-1"
                    />
                    <Button
                      variant="outline"
                      className="border-gray-700 text-gray-400"
                      onClick={() => {
                        setShowCustomCategory(false)
                        if (customCategory.trim()) {
                          // 这里应该有保存新分类的逻辑
                          console.log(`创建新分类: ${customCategory}`)
                        }
                      }}
                    >
                      确定
                    </Button>
                  </div>
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

            {courseType === "recorded" && (
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
            )}

            <div>
              <div className="flex justify-between items-center mb-2">
                <Label htmlFor="course-description" className="text-white">
                  课程简介 <span className="text-red-500">*</span>
                </Label>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={generateCourseIntro}
                  disabled={isGeneratingIntro}
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
                    <Upload className="h-8 w-8 text-gray-500" />
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

        {/* 详细描述 */}
        <Card className="p-4 bg-gray-900 border-gray-800 mb-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold text-white">详细描述</h2>
            <Button
              variant="outline"
              size="sm"
              onClick={generateCourseDetail}
              disabled={isGeneratingDetail || !courseTitle || !courseInstructor || !courseDescription}
              className="h-8 border-blue-500/30 text-blue-400 hover:bg-blue-500/20"
            >
              {isGeneratingDetail ? (
                <>
                  <Loader2 className="h-3.5 w-3.5 mr-1.5 animate-spin" />
                  生成中...
                </>
              ) : (
                <>
                  <Sparkles className="h-3.5 w-3.5 mr-1.5" />
                  AI生成详情
                </>
              )}
            </Button>
          </div>

          <div className="space-y-4">
            {/* 编辑/预览切换 */}
            <div className="flex space-x-2">
              <Button
                variant={isPreviewMode ? "outline" : "default"}
                size="sm"
                onClick={() => setIsPreviewMode(false)}
                className={!isPreviewMode ? "bg-blue-600 text-white" : "text-gray-400"}
              >
                编辑
              </Button>
              <Button
                variant={isPreviewMode ? "default" : "outline"}
                size="sm"
                onClick={() => setIsPreviewMode(true)}
                className={isPreviewMode ? "bg-blue-600 text-white" : "text-gray-400"}
              >
                预览
              </Button>
            </div>

            {/* 编辑器/预览区域 */}
            {isPreviewMode ? (
              <div
                className="min-h-[300px] p-4 bg-gray-800 rounded-md border border-gray-700 prose prose-invert max-w-none"
                dangerouslySetInnerHTML={renderMarkdown(courseContent)}
              />
            ) : (
              <Textarea
                ref={textareaRef}
                value={courseContent}
                onChange={(e) => setCourseContent(e.target.value)}
                placeholder="在此输入课程详细描述，支持Markdown格式..."
                className="min-h-[300px] bg-gray-800 border-gray-700 text-white font-mono"
              />
            )}

            <p className="text-xs text-gray-500">添加课程详细介绍、课程收获、适合人群等内容</p>
          </div>
        </Card>

        {/* 课程设置 */}
        <Card className="p-4 bg-gray-900 border-gray-800 mb-6">
          <h2 className="text-lg font-semibold text-white mb-4">课程设置</h2>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-white font-medium">精选课程</h3>
                <p className="text-sm text-gray-400">设为精选课程后将在首页精选区域展示</p>
              </div>
              <Switch checked={isFeatured} onCheckedChange={setIsFeatured} />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-white font-medium">立即上架</h3>
                <p className="text-sm text-gray-400">课程创建后立即上架，学员可以购买和学习</p>
              </div>
              <Switch checked={isPublished} onCheckedChange={setIsPublished} />
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
          onClick={handleSaveCourse}
          disabled={isSaving || !courseTitle || !courseInstructor || !courseDescription}
        >
          {isSaving ? (
            <>
              <Loader2 className="h-4 w-4 mr-2 animate-spin" />
              保存中...
            </>
          ) : (
            <>
              <Save className="h-4 w-4 mr-2" />
              保存课程
            </>
          )}
        </Button>
      </div>
    </div>
  )
}
