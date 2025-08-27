"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { ArrowLeft, Save, Check, Loader2, Bot, ArrowRight } from "lucide-react"
import NextLink from "next/link"
import { useRouter } from "next/navigation"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Progress } from "@/components/ui/progress"

export default function CreateCourse() {
  const router = useRouter()

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
  const [teacherDescription, setTeacherDescription] = useState("")
  const [courseImage, setCourseImage] = useState<string | null>(null)
  const [isFeatured, setIsFeatured] = useState(false)
  const [isPublished, setIsPublished] = useState(false)
  const [courseContent, setCourseContent] = useState("")
  const [isPreviewMode, setIsPreviewMode] = useState(false)
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  // AI市场分享状态
  const [shareToAIMarket, setShareToAIMarket] = useState(false)
  const [commissionRate, setCommissionRate] = useState(30)

  // 直播课程特有状态
  const [liveSessions, setLiveSessions] = useState([
    {
      id: 1,
      title: "第1讲：课程介绍",
      dateTime: "",
      meetingPlatform: "tecent",
      meetingId: "",
      meetingPassword: "",
    },
  ])

  // 录播课程章节管理
  const [sections, setSections] = useState([
    {
      id: 1,
      title: "第一章节",
      lessons: [{ id: 101, title: "第1讲：课程介绍", duration: "45分钟", file: null, free: true }],
    },
  ])

  const [isSaving, setIsSaving] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)

  // AI生成功能状态
  const [isGeneratingIntro, setIsGeneratingIntro] = useState(false)
  const [isGeneratingDetail, setIsGeneratingDetail] = useState(false)
  const [isGeneratingAssistant, setIsGeneratingAssistant] = useState(false)
  const [isAIAssistantDialogOpen, setIsAIAssistantDialogOpen] = useState(false)
  const [aiAssistantPrompt, setAiAssistantPrompt] = useState("")
  const [aiAssistantName, setAiAssistantName] = useState("")
  const [aiAssistantCreated, setAiAssistantCreated] = useState(false)

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

  // 新增状态
  const [currentStep, setCurrentStep] = useState(1)
  const [progress, setProgress] = useState(25)

  // 模拟课程数据状态
  const [courseData, setCourseData] = useState({
    basicInfo: {
      completed: false,
      title: "",
      category: "",
      price: "",
      description: "",
    },
    instructor: {
      completed: false,
      name: "",
      description: "",
    },
    chapters: {
      completed: false,
      sections: [],
    },
    aiAssistant: {
      completed: false,
      created: false,
    },
  })

  // 更新进度条
  useEffect(() => {
    setProgress(currentStep * 25)
  }, [currentStep])

  // 处理保存课程
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

  // 处理下一步
  const handleNextStep = () => {
    // 模拟保存当前步骤数据
    const updatedCourseData = { ...courseData }

    // 标记当前步骤为已完成
    switch (currentStep) {
      case 1:
        updatedCourseData.basicInfo.completed = true
        break
      case 2:
        updatedCourseData.instructor.completed = true
        break
      case 3:
        updatedCourseData.chapters.completed = true
        break
      case 4:
        updatedCourseData.aiAssistant.completed = true
        break
    }

    setCourseData(updatedCourseData)

    // 如果不是最后一步，前进到下一步
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1)
    } else {
      // 最后一步，保存整个课程
      handleSaveCourse()
    }
  }

  // 处理上一步
  const handlePrevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  // 处理课程分类选择
  const handleCategoryChange = (value: string) => {
    setCourseCategory(value)
    setShowCustomCategory(value === "custom")
  }

  // 处理讲师选择
  const handleTeacherChange = (value: string) => {
    if (value === "new") {
      setCourseInstructor("")
      setTeacherDescription("")
    } else {
      const selectedTeacher = existingTeachers.find((teacher) => teacher.name === value)
      if (selectedTeacher) {
        setCourseInstructor(selectedTeacher.name)
        setTeacherDescription(selectedTeacher.description)
      }
    }
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

  // 添加新章节
  const addSection = () => {
    const newSectionId = sections.length + 1
    const newSection = {
      id: Date.now(),
      title: `第${newSectionId}章节`,
      lessons: [],
    }
    setSections([...sections, newSection])
  }

  // 更新章节标题
  const updateSectionTitle = (sectionId: number, title: string) => {
    setSections(sections.map((section) => (section.id === sectionId ? { ...section, title } : section)))
  }

  // 删除章节
  const deleteSection = (sectionId: number) => {
    setSections(sections.filter((section) => section.id !== sectionId))
  }

  // 添加课时
  const addLesson = (sectionId: number) => {
    const section = sections.find((s) => s.id === sectionId)
    if (!section) return

    const newLessonNumber = section.lessons.length + 1
    const newLesson = {
      id: Date.now(),
      title: `第${newLessonNumber}讲：添加课程目录`,
      duration: "0分钟",
      file: null,
      free: false,
    }

    setSections(
      sections.map((section) =>
        section.id === sectionId ? { ...section, lessons: [...section.lessons, newLesson] } : section,
      ),
    )
  }

  // 更新课时信息
  const updateLesson = (sectionId: number, lessonId: number, field: string, value: any) => {
    setSections(
      sections.map((section) =>
        section.id === sectionId
          ? {
              ...section,
              lessons: section.lessons.map((lesson) =>
                lesson.id === lessonId ? { ...lesson, [field]: value } : lesson,
              ),
            }
          : section,
      ),
    )
  }

  // 删除课时
  const deleteLesson = (sectionId: number, lessonId: number) => {
    setSections(
      sections.map((section) =>
        section.id === sectionId
          ? {
              ...section,
              lessons: section.lessons.filter((lesson) => lesson.id !== lessonId),
            }
          : section,
      ),
    )
  }

  // 添加直播课时
  const addLiveSession = () => {
    const newSessionNumber = liveSessions.length + 1
    const newSession = {
      id: Date.now(),
      title: `第${newSessionNumber}讲：添加直播目录`,
      dateTime: "",
      meetingPlatform: "tecent",
      meetingId: "",
      meetingPassword: "",
    }
    setLiveSessions([...liveSessions, newSession])
  }

  // 更新直播课时
  const updateLiveSession = (sessionId: number, field: string, value: any) => {
    setLiveSessions(
      liveSessions.map((session) => (session.id === sessionId ? { ...session, [field]: value } : session)),
    )
  }

  // 删除直播课时
  const deleteLiveSession = (sessionId: number) => {
    setLiveSessions(liveSessions.filter((session) => session.id !== sessionId))
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

${teacherDescription}

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

  // 创建课程AI助理
  const openAIAssistantDialog = () => {
    if (!courseTitle || !courseDescription) {
      alert("请先填写课程标题和课程简介")
      return
    }

    // 预填充AI助理名称
    setAiAssistantName(`${courseTitle}助手`)

    // 预填充AI助理提示词
    const categoryText = showCustomCategory
      ? customCategory
      : courseCategories.find((c) => c.value === courseCategory)?.label || ""

    const promptTemplate = `你是"${courseTitle}"课程的AI助手，由${courseInstructor}创建。
你的主要职责是帮助学生解答关于${categoryText}学习中的问题，特别是与本课程内容相关的疑问。

课程简介：
${courseDescription}

讲师介绍：
${teacherDescription}

你应该：
1. 回答学生关于课程内容的问题
2. 解释课程中的难点概念
3. 提供学习建议和方法
4. 推荐相关的学习资源
5. 解答课程购买、学习方式等问题

你可以补充的销售政策信息：
- 课程价格：${coursePrice}${courseOriginalPrice ? `（原价${courseOriginalPrice}）` : ""}
- 课程时长：${courseLessons}
- 适合人群：对${categoryText}感兴趣的学习者
- 优惠政策：新用户首次购买可享受9折优惠
- 退款政策：购买后7天内未学习可申请全额退款

请用友好、专业的语气回答问题，避免过于销售化的语言。`

    setAiAssistantPrompt(promptTemplate)
    setIsAIAssistantDialogOpen(true)
  }

  // 创建AI助理
  const createAIAssistant = () => {
    if (!aiAssistantName || !aiAssistantPrompt) {
      alert("请填写AI助理名称和提示词")
      return
    }

    setIsGeneratingAssistant(true)

    // 模拟AI助理创建过程
    setTimeout(() => {
      setIsGeneratingAssistant(false)
      setAiAssistantCreated(true)
      setIsAIAssistantDialogOpen(false)

      // 显示成功提示
      alert("课程AI助理创建成功！")
    }, 2000)
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

  // Markdown 格式化按钮处理函数
  const handleBold = () => insertMarkdown("**$1**", 0)
  const handleItalic = () => insertMarkdown("*$1*", 0)
  const handleBulletList = () => insertMarkdown("\n- $1", 0)
  const handleNumberedList = () => insertMarkdown("\n1. $1", 0)
  const handleLink = () => insertMarkdown("[$1](url)", 0)
  const handleImage = () => insertMarkdown("![alt text](image-url)", 0)

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

  // 渲染步骤指示器
  const renderStepIndicator = () => {
    return (
      <div className="mb-6">
        <div className="flex justify-between mb-2">
          <div className={`text-sm ${currentStep >= 1 ? "text-blue-400" : "text-gray-500"}`}>基本信息</div>
          <div className={`text-sm ${currentStep >= 2 ? "text-blue-400" : "text-gray-500"}`}>讲师信息</div>
          <div className={`text-sm ${currentStep >= 3 ? "text-blue-400" : "text-gray-500"}`}>课程章节</div>
          <div className={`text-sm ${currentStep >= 4 ? "text-blue-400" : "text-gray-500"}`}>AI助理</div>
        </div>
        <Progress value={progress} className="h-2 bg-gray-700" indicatorClassName="bg-blue-500" />
      </div>
    )
  }

  // 渲染当前步骤内容
  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <Card className="p-6 bg-gray-900 border-gray-800">
            <h2 className="text-xl font-semibold text-white mb-6">课程基本信息</h2>
            <p className="text-gray-400 mb-8">
              这里将显示课程基本信息表单，包括课程标题、分类、价格、描述等。
              <br />
              <br />
              在实际实现中，这里会包含完整的表单组件，用于收集课程的基础信息。
              <br />
              <br />
              用户填写完这些信息后，可以点击"下一步"按钮继续。
            </p>
            <div className="bg-blue-900/20 border border-blue-500/30 rounded-lg p-4 mb-4">
              <p className="text-blue-300 text-sm">
                提示：课程标题和描述是吸引学员的第一印象，请确保它们简洁明了地传达课程价值。
              </p>
            </div>
          </Card>
        )
      case 2:
        return (
          <Card className="p-6 bg-gray-900 border-gray-800">
            <h2 className="text-xl font-semibold text-white mb-6">讲师信息</h2>
            <p className="text-gray-400 mb-8">
              这里将显示讲师信息表单，包括讲师姓名、简介、专业背景等。
              <br />
              <br />
              在实际实现中，这里会包含讲师选择或新增讲师的表单组件。
              <br />
              <br />
              用户可以选择现有讲师或添加新讲师，填写完成后点击"下一步"继续。
            </p>
            <div className="bg-blue-900/20 border border-blue-500/30 rounded-lg p-4 mb-4">
              <p className="text-blue-300 text-sm">
                提示：详细的讲师背景介绍可以增加课程的专业可信度，建议包含讲师的教育背景、工作经验和专业成就。
              </p>
            </div>
          </Card>
        )
      case 3:
        return (
          <Card className="p-6 bg-gray-900 border-gray-800">
            <h2 className="text-xl font-semibold text-white mb-6">课程章节</h2>
            <p className="text-gray-400 mb-8">
              这里将显示课程章节管理界面，用于添加和组织课程内容。
              <br />
              <br />
              在实际实现中，这里会包含章节和课时的添加、编辑、排序功能。
              <br />
              <br />
              用户可以创建章节结构，上传视频内容，设置免费试看等，完成后点击"下一步"继续。
            </p>
            <div className="bg-blue-900/20 border border-blue-500/30 rounded-lg p-4 mb-4">
              <p className="text-blue-300 text-sm">
                提示：良好的课程结构能帮助学员更好地理解和吸收知识，建议将内容按照难度递进或逻辑关系组织。
              </p>
            </div>
          </Card>
        )
      case 4:
        return (
          <Card className="p-6 bg-gray-900 border-gray-800">
            <h2 className="text-xl font-semibold text-white mb-6">课程AI助理</h2>
            <p className="text-gray-400 mb-8">
              这里将显示课程AI助理创建界面，用于设置课程专属的AI助手。
              <br />
              <br />
              在实际实现中，这里会包含AI助理名称、提示词设置等功能。
              <br />
              <br />
              用户可以创建和配置AI助理，帮助学员解答关于课程的问题，完成后点击"保存课程"完成整个创建流程。
            </p>
            <div className="bg-blue-900/20 border border-blue-500/30 rounded-lg p-4 mb-4">
              <p className="text-blue-300 text-sm">
                提示：AI助理可以大大提升学员的学习体验，建议提供详细的课程内容和常见问题给AI助理，使其能够准确回答学员疑问。
              </p>
            </div>
          </Card>
        )
      default:
        return null
    }
  }

  return (
    <div className="min-h-screen bg-black text-white">
      {/* 顶部导航栏 */}
      <div className="sticky top-0 left-0 right-0 h-14 flex items-center px-4 bg-gray-900/80 backdrop-blur-md border-b border-gray-800 z-10">
        <NextLink href="/management/courses" className="flex items-center text-gray-300">
          <ArrowLeft className="h-5 w-5 mr-2" />
          <span>返回</span>
        </NextLink>
        <h1 className="flex-1 text-center text-lg font-semibold text-white">创建课程</h1>
      </div>

      {/* 成功提示 */}
      {showSuccess && (
        <div className="fixed top-16 left-4 right-4 z-50">
          <Alert className="bg-green-900/60 border-green-500 backdrop-blur-sm">
            <Check className="h-4 w-4 text-green-400 mr-2" />
            <AlertDescription className="text-green-400">课程创建成功！正在跳转到课程列表...</AlertDescription>
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

        {/* 步骤指示器 */}
        {renderStepIndicator()}

        {/* 当前步骤内容 */}
        {renderStepContent()}
      </div>

      {/* 底部导航按钮 */}
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-gray-900/95 backdrop-blur-md border-t border-gray-800">
        <div className="flex justify-between">
          <Button
            variant="outline"
            onClick={handlePrevStep}
            disabled={currentStep === 1}
            className="w-1/3 border-gray-700 text-white"
          >
            上一步
          </Button>

          <Button
            className="w-2/3 ml-3 bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400"
            onClick={handleNextStep}
          >
            {currentStep < 4 ? (
              <>
                下一步
                <ArrowRight className="h-4 w-4 ml-2" />
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

      {/* AI助理创建对话框 */}
      <Dialog open={isAIAssistantDialogOpen} onOpenChange={setIsAIAssistantDialogOpen}>
        <DialogContent className="bg-gray-900 border-gray-700 text-white max-w-3xl">
          <DialogHeader>
            <DialogTitle>创建课程AI助理</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
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
              <Label htmlFor="ai-assistant-prompt" className="text-white mb-2 block">
                AI助理提示词 <span className="text-red-500">*</span>
              </Label>
              <Textarea
                id="ai-assistant-prompt"
                value={aiAssistantPrompt}
                onChange={(e) => setAiAssistantPrompt(e.target.value)}
                placeholder="请输入AI助理提示词，用于指导AI助理的行为和回答方式"
                className="bg-gray-800 border-gray-700 text-white min-h-[300px]"
              />
              <p className="text-xs text-gray-400 mt-1">
                提示词将决定AI助理的行为和回答方式，您可以添加课程销售政策、优惠信息等内容。
              </p>
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsAIAssistantDialogOpen(false)}
              className="border-gray-700 text-gray-300"
            >
              取消
            </Button>
            <Button
              onClick={createAIAssistant}
              disabled={isGeneratingAssistant}
              className="bg-blue-600 hover:bg-blue-500"
            >
              {isGeneratingAssistant ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  创建中...
                </>
              ) : (
                <>
                  <Bot className="h-4 w-4 mr-2" />
                  创建AI助理
                </>
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
