"use client"

import type React from "react"

import { useState, useRef } from "react"
import {
  ArrowLeft,
  Save,
  Check,
  X,
  User,
  Trash2,
  Sparkles,
  Loader2,
  ChevronRight,
  ChevronLeft,
  Upload,
} from "lucide-react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription } from "@/components/ui/alert"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription,
} from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import Image from "next/image"

export default function CreateCourseWizard() {
  const router = useRouter()
  const fileInputRef = useRef<HTMLInputElement>(null)

  // 状态管理
  const [courseType, setCourseType] = useState("recorded")
  const [currentStep, setCurrentStep] = useState(0)
  const [exitDialogOpen, setExitDialogOpen] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)

  // 步骤1: 课程分组
  const [selectedCategory, setSelectedCategory] = useState("")
  const [newCategoryName, setNewCategoryName] = useState("")
  const [isCreatingCategory, setIsCreatingCategory] = useState(false)

  // 步骤2: 讲师信息
  const [teacherOption, setTeacherOption] = useState("select") // "select" or "create"
  const [selectedTeacher, setSelectedTeacher] = useState("")
  const [teacherName, setTeacherName] = useState("")
  const [teacherDescription, setTeacherDescription] = useState("")
  const [teacherEducation, setTeacherEducation] = useState("")
  const [teacherExperience, setTeacherExperience] = useState("")
  const [teacherAwards, setTeacherAwards] = useState("")
  const [teacherGender, setTeacherGender] = useState("")
  const [teacherImage, setTeacherImage] = useState<string | null>(null)
  const [isGeneratingTeacherBio, setIsGeneratingTeacherBio] = useState(false)

  // 步骤3: 课程介绍
  const [courseTitle, setCourseTitle] = useState("")
  const [coursePrice, setCoursePrice] = useState("")
  const [courseOriginalPrice, setCourseOriginalPrice] = useState("")
  const [courseLessons, setCourseLessons] = useState("")
  const [courseCategory, setCourseCategory] = useState("")
  const [newCourseCategoryName, setNewCourseCategoryName] = useState("")
  const [isCreatingCourseCategory, setIsCreatingCourseCategory] = useState(false)
  const [courseBriefIntro, setCourseBriefIntro] = useState("")
  const [courseDetailedDescription, setCourseDetailedDescription] = useState("")
  const [courseImage, setCourseImage] = useState<string | null>(null)
  const [isGeneratingBriefIntro, setIsGeneratingBriefIntro] = useState(false)
  const [isGeneratingDetailedDesc, setIsGeneratingDetailedDesc] = useState(false)

  // 步骤4: 上传课程
  const [sections, setSections] = useState([
    {
      id: 1,
      title: "第一章节",
      lessons: [{ id: 101, title: "第1讲：课程介绍", duration: "45分钟", file: null, free: true }],
    },
  ])

  // 步骤5: AI助理设置
  const [aiAssistantName, setAiAssistantName] = useState("")
  const [aiAssistantPrompt, setAiAssistantPrompt] = useState("")
  const [createAssistant, setCreateAssistant] = useState(true)
  const [isGeneratingPrompt, setIsGeneratingPrompt] = useState(false)

  // 定义步骤
  const steps = [
    {
      id: "course-category",
      title: "课程分组",
      description: "选择或创建课程分组",
    },
    {
      id: "teacher-info",
      title: "讲师信息",
      description: "添加课程讲师信息",
    },
    {
      id: "course-intro",
      title: "课程介绍",
      description: "设置课程的基本信息",
    },
    {
      id: "upload-course",
      title: "上传课程",
      description: "上传课程章节和视频",
    },
    {
      id: "ai-assistant",
      title: "AI助理",
      description: "设置课程AI助理",
    },
  ]
  const currentStepData = steps[currentStep]

  // 预设数据
  const categories = [
    { id: 1, name: "直播课堂" },
    { id: 2, name: "精选课程" },
    { id: 3, name: "热门课程" },
  ]

  const courseCategories = [
    { id: 1, name: "编程开发" },
    { id: 2, name: "语言学习" },
    { id: 3, name: "职业技能" },
    { id: 4, name: "考试认证" },
  ]

  // 修改 existingTeachers 数据，确保包含完整的讲师信息
  const existingTeachers = [
    {
      id: 1,
      name: "王老师",
      gender: "male",
      description: "北京大学数学系博士，有10年高中数学教学经验，善于用生动的例子讲解复杂的数学概念。",
      education: "北京大学数学系博士",
      experience: "10年高中数学教学经验",
      awards: "全国优秀教师称号、数学教育创新奖",
      image: "/diverse-classroom-teacher.png",
    },
    {
      id: 2,
      name: "李老师",
      gender: "female",
      description: "清华大学英语系硕士，英语专业八级，曾获全国优秀教师称号，教学风格活泼生动。",
      education: "清华大学英语系硕士",
      experience: "8年英语教学经验",
      awards: "全国优秀教师称号",
      image: "/female-teacher.png",
    },
  ]

  // 修改 handleTeacherChange 函数，确保选择讲师时加载所有信息
  const handleTeacherChange = (value: string) => {
    setSelectedTeacher(value)
    const teacher = existingTeachers.find((t) => t.id.toString() === value)
    if (teacher) {
      setTeacherName(teacher.name)
      setTeacherGender(teacher.gender || "")
      setTeacherDescription(teacher.description || "")
      setTeacherEducation(teacher.education || "")
      setTeacherExperience(teacher.experience || "")
      setTeacherAwards(teacher.awards || "")
      setTeacherImage(teacher.image || null)
    }
  }

  // 处理讲师选项变更
  const handleTeacherOptionChange = (value: string) => {
    setTeacherOption(value)
    if (value === "create") {
      // 清空讲师信息，准备创建新讲师
      setSelectedTeacher("")
      setTeacherName("")
      setTeacherGender("")
      setTeacherDescription("")
      setTeacherEducation("")
      setTeacherExperience("")
      setTeacherAwards("")
      setTeacherImage(null)
    }
  }

  // AI生成讲师简介
  const generateTeacherBio = () => {
    if (!teacherName || !teacherEducation) {
      alert("请先填写讲师姓名和教育背景")
      return
    }

    setIsGeneratingTeacherBio(true)

    // 模拟AI生成过程
    setTimeout(() => {
      const genderText = teacherGender === "male" ? "他" : teacherGender === "female" ? "她" : "他/她"

      const generatedBio = `${teacherName}，${teacherEducation}，拥有丰富的教学经验。${genderText}的教学风格生动活泼，善于用通俗易懂的语言讲解复杂的知识点，深受学生喜爱。${teacherExperience ? `${teacherExperience}，` : ""}${teacherAwards ? `曾获得${teacherAwards}，` : ""}在教学过程中注重培养学生的思维能力和学习兴趣，帮助无数学生取得了优异的成绩。`

      setTeacherDescription(generatedBio)
      setIsGeneratingTeacherBio(false)
    }, 1500)
  }

  // AI生成课程简介
  const generateBriefIntro = () => {
    if (!courseTitle) {
      alert("请先填写课程标题")
      return
    }

    setIsGeneratingBriefIntro(true)

    // 模拟AI生成过程
    setTimeout(() => {
      const generatedIntro = `系统掌握${courseTitle}核心知识，快速提升实战能力。`
      setCourseBriefIntro(generatedIntro)
      setIsGeneratingBriefIntro(false)
    }, 1500)
  }

  // AI生成课程详细描述
  const generateDetailedDescription = () => {
    if (!courseTitle) {
      alert("请先填写课程标题")
      return
    }

    setIsGeneratingDetailedDesc(true)

    // 模拟AI生成过程
    setTimeout(() => {
      const generatedDesc = `# ${courseTitle}

## 课程介绍

本课程专为希望系统学习${courseTitle}的学员设计，无论您是初学者还是希望提升技能的从业者，都能从中获益。

## 您将学到什么

- 掌握${courseTitle}的核心概念和基础理论
- 学习实用技巧和方法，提高解决问题的能力
- 通过实战案例，将理论知识应用到实际场景
- 获取行业最新动态和发展趋势

## 适合人群

- 对${courseTitle}感兴趣的初学者
- 希望提升专业技能的在职人员
- 需要系统学习相关知识的学生

## 课程特色

1. **系统全面**：从基础到高级，循序渐进
2. **实用性强**：注重实战应用，理论结合实践
3. **案例丰富**：大量真实案例分析，加深理解
4. **更新及时**：紧跟行业发展，内容持续更新

加入我们的课程，开启您的${courseTitle}学习之旅！`

      setCourseDetailedDescription(generatedDesc)
      setIsGeneratingDetailedDesc(false)
    }, 2000)
  }

  // AI生成AI助理提示词
  const generateAIPrompt = () => {
    if (!courseTitle) {
      alert("请先填写课程标题")
      return
    }

    setIsGeneratingPrompt(true)

    // 模拟AI生成过程
    setTimeout(() => {
      const courseName = courseTitle || "课程"

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
      if (!aiAssistantName && courseTitle) {
        setAiAssistantName(courseTitle + "助手")
      }
      setIsGeneratingPrompt(false)
    }, 1500)
  }

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

  // 处理返回按钮点击
  const handleBackClick = () => {
    setExitDialogOpen(true)
  }

  // 步骤前进后退
  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1)
    } else {
      handleSaveCourse()
    }
  }

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
    }
  }

  // 处理图片上传
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>, setImage: (image: string | null) => void) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0]
      const reader = new FileReader()
      reader.onload = (e) => {
        if (e.target?.result) {
          setImage(e.target.result as string)
        }
      }
      reader.readAsDataURL(file)
    }
  }

  // 处理视频文件上传
  const handleVideoUpload = (sectionId: number, lessonId: number) => {
    if (fileInputRef.current) {
      fileInputRef.current.click()
      fileInputRef.current.onchange = (e: Event) => {
        const target = e.target as HTMLInputElement
        if (target.files && target.files[0]) {
          const file = target.files[0]
          updateLesson(sectionId, lessonId, "file", { name: file.name, size: file.size })
        }
      }
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

  // 处理课程分类选择
  const handleCategoryChange = (value: string) => {
    setCourseCategory(value)
    if (value === "new") {
      setIsCreatingCourseCategory(true)
      setNewCourseCategoryName("")
    } else {
      setIsCreatingCourseCategory(false)
    }
  }

  // 检查当前步骤是否完成
  const isStepComplete = () => {
    switch (currentStep) {
      case 0: // 课程分组
        return selectedCategory !== "" || (isCreatingCategory && newCategoryName !== "")
      case 1: // 讲师信息
        if (teacherOption === "select") {
          return selectedTeacher !== ""
        } else {
          return teacherName !== "" && teacherDescription !== "" && teacherEducation !== "" && teacherImage !== null
        }
      case 2: // 课程介绍
        return (
          courseTitle !== "" &&
          coursePrice !== "" &&
          courseBriefIntro !== "" &&
          courseDetailedDescription !== "" &&
          (courseCategory !== "" || (isCreatingCourseCategory && newCourseCategoryName !== ""))
        )
      case 3: // 上传课程
        return sections.length > 0 && sections.some((section) => section.lessons.length > 0)
      case 4: // AI助理设置
        return !createAssistant || (aiAssistantName !== "" && aiAssistantPrompt !== "")
      default:
        return false
    }
  }

  // 渲染步骤指示器
  const renderStepIndicator = () => {
    return (
      <div className="mb-8">
        <div className="flex justify-between items-center">
          {steps.map((step, index) => (
            <div key={step.id} className="flex flex-col items-center">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  index < currentStep ? "bg-green-600" : index === currentStep ? "bg-purple-600" : "bg-gray-700"
                }`}
              >
                {index < currentStep ? "✓" : index + 1}
              </div>
              <span className={`text-xs mt-2 ${index === currentStep ? "text-purple-400" : "text-gray-400"}`}>
                {step.title}
              </span>
            </div>
          ))}
        </div>
        <div className="relative mt-2">
          <div className="absolute top-0 left-0 h-1 bg-gray-700 w-full"></div>
          <div
            className="absolute top-0 left-0 h-1 bg-purple-600"
            style={{ width: `${(currentStep / (steps.length - 1)) * 100}%` }}
          ></div>
        </div>
      </div>
    )
  }

  // 渲染步骤1：课程分组
  const renderStep1 = () => (
    <div className="space-y-6">
      <div>
        <Label htmlFor="course-category" className="text-gray-200">
          选择课程分组 <span className="text-red-500">*</span>
        </Label>
        <Select
          value={selectedCategory}
          onValueChange={(value) => {
            setSelectedCategory(value)
            if (value === "new") {
              setIsCreatingCategory(true)
            } else {
              setIsCreatingCategory(false)
            }
          }}
        >
          <SelectTrigger className="bg-gray-700 border-gray-600 text-white">
            <SelectValue placeholder="选择课程分组" />
          </SelectTrigger>
          <SelectContent className="bg-gray-800 border-gray-700 text-white">
            {categories.map((category) => (
              <SelectItem key={category.id} value={category.id.toString()}>
                {category.name}
              </SelectItem>
            ))}
            <SelectItem value="new">创建新分组...</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {isCreatingCategory && (
        <div>
          <Label htmlFor="new-category-name" className="text-gray-200">
            新分组名称 <span className="text-red-500">*</span>
          </Label>
          <Input
            id="new-category-name"
            value={newCategoryName}
            onChange={(e) => setNewCategoryName(e.target.value)}
            placeholder="请输入新分组名称"
            className="bg-gray-700 border-gray-600 text-white"
          />
        </div>
      )}

      <div className="bg-blue-900/20 border border-blue-500/30 rounded-lg p-4">
        <p className="text-blue-300 text-sm">提示：课程分组可以帮助您更好地组织和管理课程，方便学员浏览和查找。</p>
      </div>
    </div>
  )

  // 渲染步骤2：讲师信息
  const renderStep2 = () => (
    <div className="space-y-6">
      <RadioGroup value={teacherOption} onValueChange={handleTeacherOptionChange} className="space-y-4">
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="select" id="select-teacher" />
          <Label htmlFor="select-teacher" className="text-white font-medium cursor-pointer">
            选择讲师
          </Label>
        </div>
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="create" id="create-teacher" />
          <Label htmlFor="create-teacher" className="text-white font-medium cursor-pointer">
            创建新讲师
          </Label>
        </div>
      </RadioGroup>

      {teacherOption === "select" && (
        <div className="mt-4 space-y-6">
          <div>
            <Label htmlFor="teacher-select" className="text-gray-200">
              选择讲师 <span className="text-red-500">*</span>
            </Label>
            <Select value={selectedTeacher} onValueChange={handleTeacherChange}>
              <SelectTrigger className="bg-gray-700 border-gray-600 text-white">
                <SelectValue placeholder="请选择讲师" />
              </SelectTrigger>
              <SelectContent className="bg-gray-800 border-gray-700 text-white">
                {existingTeachers.map((teacher) => (
                  <SelectItem key={teacher.id} value={teacher.id.toString()}>
                    {teacher.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {selectedTeacher && (
            <div className="space-y-6 mt-4">
              <div className="flex items-start">
                <div className="relative w-24 h-24 mr-4 flex-shrink-0">
                  {teacherImage ? (
                    <Image
                      src={teacherImage || "/placeholder.svg"}
                      alt={teacherName}
                      fill
                      className="object-cover rounded-full"
                    />
                  ) : (
                    <div className="w-full h-full rounded-full bg-gray-700 border-2 border-dashed border-gray-600 flex items-center justify-center">
                      <User className="h-8 w-8 text-gray-500" />
                    </div>
                  )}
                </div>
                <div>
                  <h3 className="text-lg font-medium text-white">{teacherName}</h3>
                  <p className="text-sm text-gray-300 mt-1">{teacherDescription}</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h4 className="text-sm font-medium text-gray-300 mb-1">教育背景</h4>
                  <p className="text-sm text-white bg-gray-700 p-2 rounded-md">{teacherEducation || "暂无信息"}</p>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-gray-300 mb-1">教学经验</h4>
                  <p className="text-sm text-white bg-gray-700 p-2 rounded-md">{teacherExperience || "暂无信息"}</p>
                </div>
              </div>

              <div>
                <h4 className="text-sm font-medium text-gray-300 mb-1">获奖及证书</h4>
                <p className="text-sm text-white bg-gray-700 p-2 rounded-md">{teacherAwards || "暂无信息"}</p>
              </div>
            </div>
          )}
        </div>
      )}

      {teacherOption === "create" && (
        <div className="space-y-6 mt-4">
          <div>
            <Label htmlFor="teacher-name" className="text-gray-200">
              讲师姓名 <span className="text-red-500">*</span>
            </Label>
            <Input
              id="teacher-name"
              value={teacherName}
              onChange={(e) => setTeacherName(e.target.value)}
              placeholder="请输入讲师姓名"
              className="bg-gray-700 border-gray-600 text-white"
              required
            />
          </div>

          <div>
            <Label className="text-gray-200">
              讲师头像 <span className="text-red-500">*</span>
            </Label>
            <div className="flex items-center">
              <div className="relative w-24 h-24 mr-4">
                {teacherImage ? (
                  <Image
                    src={teacherImage || "/placeholder.svg"}
                    alt="讲师头像"
                    fill
                    className="object-cover rounded-full"
                  />
                ) : (
                  <div className="w-full h-full rounded-full bg-gray-700 border-2 border-dashed border-gray-600 flex items-center justify-center">
                    <User className="h-8 w-8 text-gray-500" />
                  </div>
                )}
              </div>
              <div>
                <Input
                  type="file"
                  className="hidden"
                  id="teacher-image"
                  accept="image/*"
                  onChange={(e) => handleImageUpload(e, setTeacherImage)}
                />
                <Label htmlFor="teacher-image">
                  <Button variant="outline" className="border-gray-600 text-gray-200 hover:bg-gray-700 mb-2" asChild>
                    <span>上传头像</span>
                  </Button>
                </Label>
                <p className="text-xs text-gray-500">建议尺寸: 400×400px，格式：JPG/PNG</p>
              </div>
            </div>
          </div>

          <div>
            <Label htmlFor="teacher-gender" className="text-gray-200">
              讲师性别
            </Label>
            <Select value={teacherGender} onValueChange={setTeacherGender}>
              <SelectTrigger className="bg-gray-700 border-gray-600 text-white">
                <SelectValue placeholder="选择性别" />
              </SelectTrigger>
              <SelectContent className="bg-gray-800 border-gray-700 text-white">
                <SelectItem value="male">男</SelectItem>
                <SelectItem value="female">女</SelectItem>
                <SelectItem value="other">其他</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-4">
            <h4 className="text-md font-medium text-white">讲师资质</h4>

            <div>
              <Label htmlFor="teacher-education" className="text-gray-200">
                教育背景 <span className="text-red-500">*</span>
              </Label>
              <Input
                id="teacher-education"
                value={teacherEducation}
                onChange={(e) => setTeacherEducation(e.target.value)}
                placeholder="例如：北京大学数学系博士"
                className="bg-gray-700 border-gray-600 text-white"
                required
              />
            </div>

            <div>
              <Label htmlFor="teacher-experience" className="text-gray-200">
                教学经验
              </Label>
              <Input
                id="teacher-experience"
                value={teacherExperience}
                onChange={(e) => setTeacherExperience(e.target.value)}
                placeholder="例如：10年高中数学教学经验"
                className="bg-gray-700 border-gray-600 text-white"
              />
            </div>

            <div>
              <Label htmlFor="teacher-awards" className="text-gray-200">
                获奖及证书情况
              </Label>
              <Input
                id="teacher-awards"
                value={teacherAwards}
                onChange={(e) => setTeacherAwards(e.target.value)}
                placeholder="例如：全国优秀教师称号、教学能力证书"
                className="bg-gray-700 border-gray-600 text-white"
              />
            </div>
          </div>

          <div>
            <div className="flex justify-between items-center mb-2">
              <Label htmlFor="teacher-description" className="text-gray-200">
                讲师简介 <span className="text-red-500">*</span>
              </Label>
              <Button
                variant="outline"
                size="sm"
                onClick={generateTeacherBio}
                disabled={isGeneratingTeacherBio || !teacherName || !teacherEducation}
                className="h-8 border-gray-600 text-gray-200 hover:bg-gray-700"
              >
                {isGeneratingTeacherBio ? (
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
              id="teacher-description"
              value={teacherDescription}
              onChange={(e) => setTeacherDescription(e.target.value)}
              placeholder="请输入讲师简介，包括教学经验、专业背景等"
              className="bg-gray-700 border-gray-600 text-white min-h-[100px]"
              required
            />
          </div>
        </div>
      )}

      <div className="bg-blue-900/20 border border-blue-500/30 rounded-lg p-4">
        <p className="text-blue-300 text-sm">
          提示：详细的讲师背景介绍可以增加课程的专业可信度，建议包含讲师的教育背景、工作经验和专业成就。
        </p>
      </div>
    </div>
  )

  // 渲染步骤3：课程介绍
  const renderStep3 = () => (
    <div className="space-y-6">
      <div>
        <Label htmlFor="course-title" className="text-gray-200">
          课程标题 <span className="text-red-500">*</span>
        </Label>
        <Input
          id="course-title"
          value={courseTitle}
          onChange={(e) => setCourseTitle(e.target.value)}
          placeholder="请输入课程标题"
          className="bg-gray-700 border-gray-600 text-white"
        />
      </div>

      <div>
        <Label htmlFor="course-category-select" className="text-gray-200">
          选择课程分类 <span className="text-red-500">*</span>
        </Label>
        <Select value={courseCategory} onValueChange={handleCategoryChange}>
          <SelectTrigger id="course-category-select" className="bg-gray-700 border-gray-600 text-white">
            <SelectValue placeholder="选择课程分类" />
          </SelectTrigger>
          <SelectContent className="bg-gray-800 border-gray-700 text-white">
            {courseCategories.map((category) => (
              <SelectItem key={category.id} value={category.id.toString()}>
                {category.name}
              </SelectItem>
            ))}
            <SelectItem value="new">创建新分类...</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {isCreatingCourseCategory && (
        <div>
          <Label htmlFor="new-course-category-name" className="text-gray-200">
            新分类名称 <span className="text-red-500">*</span>
          </Label>
          <Input
            id="new-course-category-name"
            value={newCourseCategoryName}
            onChange={(e) => setNewCourseCategoryName(e.target.value)}
            placeholder="请输入新分类名称"
            className="bg-gray-700 border-gray-600 text-white"
          />
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="course-price" className="text-gray-200">
            课程价格 <span className="text-red-500">*</span>
          </Label>
          <Input
            id="course-price"
            value={coursePrice}
            onChange={(e) => setCoursePrice(e.target.value)}
            placeholder="请输入价格，免费课程填0"
            className="bg-gray-700 border-gray-600 text-white"
          />
        </div>

        <div>
          <Label htmlFor="course-original-price" className="text-gray-200">
            原价（可选）
          </Label>
          <Input
            id="course-original-price"
            value={courseOriginalPrice}
            onChange={(e) => setCourseOriginalPrice(e.target.value)}
            placeholder="课程原价，用于显示折扣"
            className="bg-gray-700 border-gray-600 text-white"
          />
        </div>
      </div>

      <div>
        <Label htmlFor="course-lessons" className="text-gray-200">
          课程节数 <span className="text-red-500">*</span>
        </Label>
        <Input
          id="course-lessons"
          value={courseLessons}
          onChange={(e) => setCourseLessons(e.target.value)}
          placeholder="例如：24节课"
          className="bg-gray-700 border-gray-600 text-white"
        />
      </div>

      <div>
        <div className="flex justify-between items-center mb-2">
          <Label htmlFor="course-brief-intro" className="text-gray-200">
            课程简介 <span className="text-red-500">*</span> <span className="text-xs text-gray-400">(不超过30字)</span>
          </Label>
          <Button
            variant="outline"
            size="sm"
            onClick={generateBriefIntro}
            disabled={isGeneratingBriefIntro || !courseTitle}
            className="h-8 border-gray-600 text-gray-200 hover:bg-gray-700"
          >
            {isGeneratingBriefIntro ? (
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
        <Input
          id="course-brief-intro"
          value={courseBriefIntro}
          onChange={(e) => {
            if (e.target.value.length <= 30) {
              setCourseBriefIntro(e.target.value)
            }
          }}
          placeholder="一句话介绍课程特点，不超过30字"
          className="bg-gray-700 border-gray-600 text-white"
          maxLength={30}
        />
        <div className="text-right text-xs text-gray-400 mt-1">{courseBriefIntro.length}/30</div>
      </div>

      <div>
        <div className="flex justify-between items-center mb-2">
          <Label htmlFor="course-detailed-description" className="text-gray-200">
            详细描述 <span className="text-red-500">*</span>
          </Label>
          <Button
            variant="outline"
            size="sm"
            onClick={generateDetailedDescription}
            disabled={isGeneratingDetailedDesc || !courseTitle}
            className="h-8 border-gray-600 text-gray-200 hover:bg-gray-700"
          >
            {isGeneratingDetailedDesc ? (
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
        <Textarea
          id="course-detailed-description"
          value={courseDetailedDescription}
          onChange={(e) => setCourseDetailedDescription(e.target.value)}
          placeholder="请输入课程详细描述，支持Markdown格式"
          className="bg-gray-700 border-gray-600 text-white min-h-[200px] font-mono"
        />
        <p className="text-xs text-gray-400 mt-1">支持Markdown格式，可以使用#、##等标记标题，*斜体*，**粗体**等</p>
      </div>

      <div>
        <Label className="text-gray-200">课程封面</Label>
        <div className="flex items-center">
          <div className="relative w-32 h-24 mr-4">
            {courseImage ? (
              <Image src={courseImage || "/placeholder.svg"} alt="课程封面" fill className="object-cover rounded-md" />
            ) : (
              <div className="w-full h-full rounded-md bg-gray-700 border-2 border-dashed border-gray-600 flex items-center justify-center">
                <span className="text-gray-500 text-xs">上传封面</span>
              </div>
            )}
          </div>
          <div>
            <Input
              type="file"
              className="hidden"
              id="course-image"
              accept="image/*"
              onChange={(e) => handleImageUpload(e, setCourseImage)}
            />
            <Label htmlFor="course-image">
              <Button variant="outline" className="border-gray-600 text-gray-200 hover:bg-gray-700 mb-2" asChild>
                <span>上传封面图片</span>
              </Button>
            </Label>
            <p className="text-xs text-gray-500">建议尺寸: 1280×720px，格式：JPG/PNG</p>
          </div>
        </div>
      </div>

      <div className="bg-blue-900/20 border border-blue-500/30 rounded-lg p-4">
        <p className="text-blue-300 text-sm">
          提示：课程标题和描述是吸引学员的第一印象，请确保它们简洁明了地传达课程价值。
        </p>
      </div>
    </div>
  )

  // 渲染步骤4：上传课程
  const renderStep4 = () => (
    <div className="space-y-6">
      <div className="space-y-4">
        {sections.map((section) => (
          <div key={section.id} className="bg-gray-700 border border-gray-600 rounded-lg p-4">
            <div className="flex justify-between items-center mb-4">
              <Input
                value={section.title}
                onChange={(e) => updateSectionTitle(section.id, e.target.value)}
                className="bg-gray-800 border-gray-600 text-white w-64"
              />
              <Button
                variant="ghost"
                size="sm"
                className="h-8 w-8 p-0 text-red-400 hover:text-red-300"
                onClick={() => deleteSection(section.id)}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>

            <div className="space-y-3">
              {section.lessons.map((lesson) => (
                <div key={lesson.id} className="bg-gray-800 border border-gray-600 rounded-lg p-3">
                  <div className="flex justify-between items-center mb-2">
                    <Input
                      value={lesson.title}
                      onChange={(e) => updateLesson(section.id, lesson.id, "title", e.target.value)}
                      className="bg-gray-700 border-gray-600 text-white w-64"
                    />
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-8 w-8 p-0 text-red-400 hover:text-red-300"
                      onClick={() => deleteLesson(section.id, lesson.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div>
                      <Label htmlFor={`lesson-duration-${lesson.id}`} className="text-gray-400 text-xs mb-1 block">
                        课时时长
                      </Label>
                      <Input
                        id={`lesson-duration-${lesson.id}`}
                        value={lesson.duration}
                        onChange={(e) => updateLesson(section.id, lesson.id, "duration", e.target.value)}
                        placeholder="例如：45分钟"
                        className="bg-gray-700 border-gray-600 text-white"
                      />
                    </div>

                    <div>
                      <Label className="text-gray-400 text-xs mb-1 block">免费试看</Label>
                      <div className="flex items-center">
                        <Switch
                          checked={lesson.free}
                          onCheckedChange={(checked) => updateLesson(section.id, lesson.id, "free", checked)}
                        />
                        <span className="ml-2 text-white text-sm">{lesson.free ? "是" : "否"}</span>
                      </div>
                    </div>
                  </div>

                  <div className="mt-3">
                    <Label htmlFor={`lesson-file-${lesson.id}`} className="text-gray-400 text-xs mb-1 block">
                      课时视频
                    </Label>
                    {lesson.file ? (
                      <div className="flex justify-between items-center p-2 bg-gray-700 border border-gray-600 rounded-md">
                        <span className="text-sm text-white truncate">{lesson.file.name}</span>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-6 w-6 p-0 text-red-400"
                          onClick={() => updateLesson(section.id, lesson.id, "file", null)}
                        >
                          <X className="h-3 w-3" />
                        </Button>
                      </div>
                    ) : (
                      <Button
                        variant="outline"
                        className="w-full border-gray-600 text-gray-400"
                        onClick={() => handleVideoUpload(section.id, lesson.id)}
                      >
                        <Upload className="h-4 w-4 mr-2" />
                        上传视频文件
                      </Button>
                    )}
                  </div>
                </div>
              ))}

              <Button
                variant="outline"
                className="border-gray-600 text-gray-200 hover:bg-gray-700 w-full"
                onClick={() => addLesson(section.id)}
              >
                添加课时
              </Button>
            </div>
          </div>
        ))}

        <Button
          variant="outline"
          className="border-gray-600 text-gray-200 hover:bg-gray-700 w-full"
          onClick={addSection}
        >
          添加章节
        </Button>
      </div>

      <div className="bg-blue-900/20 border border-blue-500/30 rounded-lg p-4">
        <p className="text-blue-300 text-sm">
          提示：良好的课程结构能帮助学员更好地理解和吸收知识，建议将内容按照难度递进或逻辑关系组织。
        </p>
      </div>

      {/* 隐藏的文件输入框 */}
      <input type="file" ref={fileInputRef} className="hidden" accept="video/*" />
    </div>
  )

  // 渲染步骤5：AI助理设置
  const renderStep5 = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-lg font-medium text-white">创建课程AI助理</h3>
          <p className="text-sm text-gray-400 mt-1">AI助理可以帮助学员解答关于课程的问题，提升学习体验</p>
        </div>
        <Switch checked={createAssistant} onCheckedChange={setCreateAssistant} />
      </div>

      {createAssistant && (
        <>
          <div>
            <Label htmlFor="ai-assistant-name" className="text-gray-200">
              AI助理名称 <span className="text-red-500">*</span>
            </Label>
            <Input
              id="ai-assistant-name"
              value={aiAssistantName}
              onChange={(e) => setAiAssistantName(e.target.value)}
              placeholder="请输入AI助理名称"
              className="bg-gray-700 border-gray-600 text-white"
            />
          </div>

          <div>
            <div className="flex justify-between items-center mb-2">
              <Label htmlFor="ai-assistant-prompt" className="text-gray-200">
                AI助理提示词 <span className="text-red-500">*</span>
              </Label>
              <Button
                variant="outline"
                size="sm"
                onClick={generateAIPrompt}
                disabled={isGeneratingPrompt || !courseTitle}
                className="h-8 border-gray-600 text-gray-200 hover:bg-gray-700"
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
              className="bg-gray-700 border-gray-600 text-white min-h-[200px]"
            />
            <p className="text-xs text-gray-400 mt-1">
              提示词将决定AI助理的行为和回答方式，您可以添加课程销售政策、优惠信息等内容。
            </p>
          </div>

          <div className="bg-gray-700 border border-gray-600 rounded-lg p-4">
            <h3 className="font-medium text-white mb-2">AI助理预览</h3>
            <div className="flex items-start mb-4">
              <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center mr-3 flex-shrink-0">
                <span className="text-white font-medium">AI</span>
              </div>
              <div>
                <h4 className="font-medium text-white">{aiAssistantName || "课程助手"}</h4>
                <p className="text-sm text-gray-300 mt-1">
                  您好！我是本课程的AI助理，有任何关于课程内容的问题，都可以随时向我提问。
                </p>
              </div>
            </div>
          </div>
        </>
      )}

      <div className="bg-blue-900/20 border border-blue-500/30 rounded-lg p-4">
        <p className="text-blue-300 text-sm">
          提示：AI助理可以大大提升学员的学习体验，帮助解答常见问题，提供学习建议，减轻您的客服负担。
        </p>
      </div>
    </div>
  )

  // 渲染当前步骤内容
  const renderStepContent = () => {
    switch (currentStep) {
      case 0:
        return renderStep1()
      case 1:
        return renderStep2()
      case 2:
        return renderStep3()
      case 3:
        return renderStep4()
      case 4:
        return renderStep5()
      default:
        return null
    }
  }

  const handleConfirmExit = () => {
    router.push("/management/courses")
  }

  return (
    <div className="container mx-auto p-4 bg-gray-900 text-white min-h-screen">
      <div className="mb-6 flex items-center">
        <Button variant="ghost" size="sm" onClick={handleBackClick} className="text-gray-300">
          <ArrowLeft className="mr-2 h-4 w-4" />
          返回
        </Button>
        <h1 className="text-2xl font-bold ml-2">创建课程</h1>
      </div>

      {/* 课程类型选择 */}
      <Tabs defaultValue="recorded" value={courseType} onValueChange={setCourseType} className="w-full mb-6">
        <TabsList className="w-full grid grid-cols-2 bg-gray-800 rounded-lg h-12">
          <TabsTrigger
            value="recorded"
            className="rounded-l-lg data-[state=active]:bg-purple-600 data-[state=active]:text-white"
          >
            录播课程
          </TabsTrigger>
          <TabsTrigger
            value="live"
            className="rounded-r-lg data-[state=active]:bg-purple-600 data-[state=active]:text-white"
          >
            直播课程
          </TabsTrigger>
        </TabsList>
      </Tabs>

      {/* 步骤指示器 */}
      {renderStepIndicator()}

      {/* 当前步骤内容 */}
      <Card className="bg-gray-800 border-gray-700 shadow-lg">
        <CardHeader className="border-b border-gray-700">
          <CardTitle>{currentStepData.title}</CardTitle>
          <p className="text-sm text-gray-400">{currentStepData.description}</p>
        </CardHeader>
        <CardContent className="pt-6">{renderStepContent()}</CardContent>
      </Card>

      {/* 成功提示 */}
      {showSuccess && (
        <Alert className="mt-4 bg-green-900/60 border-green-500 backdrop-blur-sm">
          <Check className="h-4 w-4 text-green-400 mr-2" />
          <AlertDescription className="text-green-400">课程创建成功！正在跳转到课程列表...</AlertDescription>
        </Alert>
      )}

      {/* 导航按钮 */}
      <div className="mt-6 flex justify-between">
        <Button
          variant="outline"
          onClick={handlePrevious}
          disabled={currentStep === 0}
          className="border-gray-700 text-white hover:bg-gray-700"
        >
          <ChevronLeft className="mr-2 h-4 w-4" /> 上一步
        </Button>

        <div className="flex space-x-2">
          <Button variant="outline" onClick={handleBackClick} className="border-gray-700 text-white hover:bg-gray-700">
            取消
          </Button>

          {currentStep < steps.length - 1 ? (
            <Button
              onClick={handleNext}
              className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700"
            >
              下一步 <ChevronRight className="ml-2 h-4 w-4" />
            </Button>
          ) : (
            <Button
              onClick={handleSaveCourse}
              disabled={isSaving}
              className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700"
            >
              {isSaving ? (
                <>
                  <div className="animate-spin mr-2 h-4 w-4 border-2 border-current border-t-transparent rounded-full"></div>
                  保存中...
                </>
              ) : (
                <>
                  <Save className="mr-2 h-4 w-4" /> 完成创建
                </>
              )}
            </Button>
          )}
        </div>
      </div>

      {/* 退出确认对话框 */}
      <Dialog open={exitDialogOpen} onOpenChange={setExitDialogOpen}>
        <DialogContent className="sm:max-w-md bg-gray-800 border-gray-700 text-white">
          <DialogHeader>
            <DialogTitle>保存草稿</DialogTitle>
            <DialogDescription className="text-gray-300">
              您的设置已保存至草稿箱，可下次继续完成创建。
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="mt-4">
            <Button variant="outline" onClick={() => setExitDialogOpen(false)} className="border-gray-600">
              继续编辑
            </Button>
            <Button onClick={handleConfirmExit}>返回列表</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
