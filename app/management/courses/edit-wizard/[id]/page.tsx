"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { ArrowLeft, Save, Check, Loader2, ArrowRight, X } from "lucide-react"
import { useRouter, useParams } from "next/navigation"
import { Card } from "@/components/ui/card"
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
import { Progress } from "@/components/ui/progress"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import Image from "next/image"

export default function EditCourseWizard() {
  const router = useRouter()
  const params = useParams()
  const courseId = params.id

  // 状态管理
  const [courseType, setCourseType] = useState("recorded")
  const [currentStep, setCurrentStep] = useState(1)
  const [progress, setProgress] = useState(16.67)
  const [exitDialogOpen, setExitDialogOpen] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  // 步骤1: 课程分组
  const [selectedCategory, setSelectedCategory] = useState("")
  const [newCategoryName, setNewCategoryName] = useState("")
  const [isCreatingCategory, setIsCreatingCategory] = useState(false)

  // 步骤2: 讲师信息
  const [selectedTeacher, setSelectedTeacher] = useState("")
  const [teacherName, setTeacherName] = useState("")
  const [teacherDescription, setTeacherDescription] = useState("")
  const [teacherEducation, setTeacherEducation] = useState("")
  const [teacherExperience, setTeacherExperience] = useState("")
  const [teacherAwards, setTeacherAwards] = useState("")
  const [teacherImage, setTeacherImage] = useState<string | null>(null)
  const [isCreatingTeacher, setIsCreatingTeacher] = useState(false)

  // 步骤3: 课程介绍
  const [courseTitle, setCourseTitle] = useState("")
  const [coursePrice, setCoursePrice] = useState("")
  const [courseOriginalPrice, setCourseOriginalPrice] = useState("")
  const [courseLessons, setCourseLessons] = useState("")
  const [courseDuration, setCourseDuration] = useState("")
  const [courseDescription, setCourseDescription] = useState("")
  const [courseImage, setCourseImage] = useState<string | null>(null)
  const [isFeatured, setIsFeatured] = useState(false)
  const [isPublished, setIsPublished] = useState(false)

  // 步骤4: 课程内容
  const [sections, setSections] = useState([
    {
      id: 1,
      title: "第一章节",
      lessons: [{ id: 101, title: "第1讲：课程介绍", duration: "45分钟", file: null, free: true }],
    },
  ])

  // 步骤5: 直播设置 (仅直播课程)
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

  // 步骤6: AI助理设置
  const [aiAssistantName, setAiAssistantName] = useState("")
  const [aiAssistantPrompt, setAiAssistantPrompt] = useState("")
  const [createAssistant, setCreateAssistant] = useState(true)

  // 预设数据
  const categories = [
    { id: 1, name: "直播课堂" },
    { id: 2, name: "精选课程" },
    { id: 3, name: "热门课程" },
  ]

  const existingTeachers = [
    {
      id: 1,
      name: "王老师",
      description: "北京大学数学系博士，有10年高中数学教学经验，善于用生动的例子讲解复杂的数学概念。",
      image: "/diverse-classroom-teacher.png",
    },
    {
      id: 2,
      name: "李老师",
      description: "清华大学英语系硕士，英语专业八级，曾获全国优秀教师称号，教学风格活泼生动。",
      image: "/female-teacher.png",
    },
    { value: "new", name: "添加新讲师", description: "" },
  ]

  // 模拟课程数据
  const mockCourseData = {
    id: 1,
    title: "高考英语词汇精讲",
    instructor: "王老师",
    price: "299",
    originalPrice: "399",
    status: "已上架",
    salesCount: 1289,
    duration: "24课时",
    image: "/images/course-1.png",
    featured: true,
    createdAt: "2025-03-15",
    sortOrder: 1,
    purchased: false,
    categoryId: 2,
    inMarket: true,
    onHomepage: true,
    description:
      "这是一门由王老师精心打造的英语录播课程。本课程《高考英语词汇精讲》专为希望提升英语能力的学员设计，通过系统化的教学内容和丰富的实践案例，帮助学员掌握英语的核心知识点和解题技巧。",
    type: "recorded",
  }

  // 加载课程数据
  useEffect(() => {
    if (courseId) {
      // 模拟API请求加载课程数据
      setTimeout(() => {
        // 设置课程类型
        setCourseType(mockCourseData.type)

        // 设置课程分组
        setSelectedCategory(mockCourseData.categoryId.toString())

        // 设置讲师信息
        setSelectedTeacher(mockCourseData.instructor)

        // 设置课程介绍
        setCourseTitle(mockCourseData.title)
        setCoursePrice(mockCourseData.price)
        setCourseOriginalPrice(mockCourseData.originalPrice)
        setCourseLessons(mockCourseData.duration)
        setCourseDescription(mockCourseData.description)
        setCourseImage(mockCourseData.image)
        setIsFeatured(mockCourseData.featured)
        setIsPublished(mockCourseData.status === "已上架")

        // 设置课程内容 (这里应该有实际的API请求)

        // 设置AI助理信息 (这里应该有实际的API请求)
        setAiAssistantName(`${mockCourseData.title}助手`)
        setAiAssistantPrompt(
          `你是"${mockCourseData.title}助手"，这门课程的AI助手。\n\n你的主要职责是帮助学生解答关于本课程的问题，特别是与课程内容相关的疑问。`,
        )

        setIsLoading(false)
      }, 1000)
    }
  }, [courseId])

  // 更新进度条
  useEffect(() => {
    const totalSteps = courseType === "recorded" ? 6 : 6
    setProgress((currentStep / totalSteps) * 100)
  }, [currentStep, courseType])

  // 处理下一步
  const handleNextStep = () => {
    if (currentStep < (courseType === "recorded" ? 6 : 6)) {
      setCurrentStep(currentStep + 1)
    } else {
      handleSaveCourse()
    }
  }

  // 处理上一步
  const handlePrevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
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

  // 处理退出
  const handleExit = () => {
    setExitDialogOpen(true)
  }

  // 确认退出
  const confirmExit = () => {
    router.push("/management/courses")
  }

  // 处理课程封面上传
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

  // 处理讲师选择
  const handleTeacherChange = (value: string) => {
    setSelectedTeacher(value)

    if (value === "new") {
      setIsCreatingTeacher(true)
      setTeacherName("")
      setTeacherDescription("")
      setTeacherImage(null)
    } else {
      setIsCreatingTeacher(false)
      const selectedTeacher = existingTeachers.find((teacher) => teacher.name === value)
      if (selectedTeacher) {
        setTeacherName(selectedTeacher.name)
        setTeacherDescription(selectedTeacher.description)
        setTeacherImage(selectedTeacher.image || null)
      }
    }
  }

  // 检查当前步骤是否完成
  const isStepComplete = () => {
    switch (currentStep) {
      case 1: // 课程分组
        return selectedCategory !== "" || (isCreatingCategory && newCategoryName !== "")
      case 2: // 讲师信息
        return selectedTeacher !== "" || (isCreatingTeacher && teacherName !== "" && teacherDescription !== "")
      case 3: // 课程介绍
        return courseTitle !== "" && coursePrice !== "" && courseDescription !== ""
      case 4: // 课程内容
        return sections.length > 0 && sections.some((section) => section.lessons.length > 0)
      case 5: // 直播设置
        if (courseType === "live") {
          return liveSessions.length > 0 && liveSessions.every((session) => session.dateTime !== "")
        }
        return true
      case 6: // AI助理设置
        return !createAssistant || (aiAssistantName !== "" && aiAssistantPrompt !== "")
      default:
        return false
    }
  }

  // 渲染步骤指示器
  const renderStepIndicator = () => {
    const steps = [
      { number: 1, title: "课程分组" },
      { number: 2, title: "讲师信息" },
      { number: 3, title: "课程介绍" },
      { number: 4, title: "课程内容" },
      { number: 5, title: courseType === "live" ? "直播设置" : "课程内容" },
      { number: 6, title: "AI助理" },
    ]

    return (
      <div className="mb-6">
        <div className="flex justify-between mb-2">
          {steps.map((step) => (
            <div
              key={step.number}
              className={`text-sm ${currentStep >= step.number ? "text-blue-400" : "text-gray-500"}`}
            >
              {step.title}
            </div>
          ))}
        </div>
        <Progress value={progress} className="h-2 bg-gray-700" indicatorClassName="bg-blue-500" />
      </div>
    )
  }

  // 渲染步骤1：课程分组
  const renderStep1 = () => (
    <Card className="p-6 bg-gray-900 border-gray-800">
      <h2 className="text-xl font-semibold text-white mb-6">课程分组</h2>

      <div className="space-y-6">
        <div>
          <Label htmlFor="course-category" className="text-white mb-2 block">
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
            <SelectTrigger className="bg-gray-800 border-gray-700 text-white">
              <SelectValue placeholder="选择课程分组" />
            </SelectTrigger>
            <SelectContent className="bg-gray-900 border-gray-700 text-white">
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
            <Label htmlFor="new-category-name" className="text-white mb-2 block">
              新分组名称 <span className="text-red-500">*</span>
            </Label>
            <Input
              id="new-category-name"
              value={newCategoryName}
              onChange={(e) => setNewCategoryName(e.target.value)}
              placeholder="请输入新分组名称"
              className="bg-gray-800 border-gray-700 text-white"
            />
          </div>
        )}

        <div className="bg-blue-900/20 border border-blue-500/30 rounded-lg p-4">
          <p className="text-blue-300 text-sm">提示：课程分组可以帮助您更好地组织和管理课程，方便学员浏览和查找。</p>
        </div>
      </div>
    </Card>
  )

  // 渲染步骤2：讲师信息
  const renderStep2 = () => (
    <Card className="p-6 bg-gray-900 border-gray-800">
      <h2 className="text-xl font-semibold text-white mb-6">讲师信息</h2>

      <div className="space-y-6">
        <div>
          <Label htmlFor="teacher-select" className="text-white mb-2 block">
            选择讲师 <span className="text-red-500">*</span>
          </Label>
          <Select value={selectedTeacher} onValueChange={handleTeacherChange}>
            <SelectTrigger className="bg-gray-800 border-gray-700 text-white">
              <SelectValue placeholder="选择讲师" />
            </SelectTrigger>
            <SelectContent className="bg-gray-900 border-gray-700 text-white">
              {existingTeachers.map((teacher) => (
                <SelectItem key={teacher.name} value={teacher.name}>
                  {teacher.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {isCreatingTeacher && (
          <>
            <div>
              <Label htmlFor="teacher-name" className="text-white mb-2 block">
                讲师姓名 <span className="text-red-500">*</span>
              </Label>
              <Input
                id="teacher-name"
                value={teacherName}
                onChange={(e) => setTeacherName(e.target.value)}
                placeholder="请输入讲师姓名"
                className="bg-gray-800 border-gray-700 text-white"
              />
            </div>

            <div>
              <Label htmlFor="teacher-description" className="text-white mb-2 block">
                讲师简介 <span className="text-red-500">*</span>
              </Label>
              <Textarea
                id="teacher-description"
                value={teacherDescription}
                onChange={(e) => setTeacherDescription(e.target.value)}
                placeholder="请输入讲师简介，包括教学经验、专业背景等"
                className="bg-gray-800 border-gray-700 text-white min-h-[100px]"
              />
            </div>

            <div>
              <Label htmlFor="teacher-education" className="text-white mb-2 block">
                教育背景
              </Label>
              <Input
                id="teacher-education"
                value={teacherEducation}
                onChange={(e) => setTeacherEducation(e.target.value)}
                placeholder="例如：北京大学数学系博士"
                className="bg-gray-800 border-gray-700 text-white"
              />
            </div>

            <div>
              <Label htmlFor="teacher-experience" className="text-white mb-2 block">
                教学经验
              </Label>
              <Input
                id="teacher-experience"
                value={teacherExperience}
                onChange={(e) => setTeacherExperience(e.target.value)}
                placeholder="例如：10年高中数学教学经验"
                className="bg-gray-800 border-gray-700 text-white"
              />
            </div>

            <div>
              <Label htmlFor="teacher-awards" className="text-white mb-2 block">
                获奖情况
              </Label>
              <Input
                id="teacher-awards"
                value={teacherAwards}
                onChange={(e) => setTeacherAwards(e.target.value)}
                placeholder="例如：全国优秀教师称号"
                className="bg-gray-800 border-gray-700 text-white"
              />
            </div>

            <div>
              <Label className="text-white mb-2 block">讲师头像</Label>
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
                    <div className="w-full h-full rounded-full bg-gray-800 border-2 border-dashed border-gray-600 flex items-center justify-center">
                      <span className="text-gray-500 text-xs">上传头像</span>
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
                    <Button
                      variant="outline"
                      className="border-blue-500/30 text-blue-400 hover:bg-blue-500/20 mb-2"
                      asChild
                    >
                      <span>上传头像</span>
                    </Button>
                  </Label>
                  <p className="text-xs text-gray-500">建议尺寸: 400×400px，格式：JPG/PNG</p>
                </div>
              </div>
            </div>
          </>
        )}

        <div className="bg-blue-900/20 border border-blue-500/30 rounded-lg p-4">
          <p className="text-blue-300 text-sm">
            提示：详细的讲师背景介绍可以增加课程的专业可信度，建议包含讲师的教育背景、工作经验和专业成就。
          </p>
        </div>
      </div>
    </Card>
  )

  // 渲染步骤3：课程介绍
  const renderStep3 = () => (
    <Card className="p-6 bg-gray-900 border-gray-800">
      <h2 className="text-xl font-semibold text-white mb-6">课程介绍</h2>

      <div className="space-y-6">
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
          />
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
          />
        </div>

        <div>
          <Label htmlFor="course-description" className="text-white mb-2 block">
            课程简介 <span className="text-red-500">*</span>
          </Label>
          <Textarea
            id="course-description"
            value={courseDescription}
            onChange={(e) => setCourseDescription(e.target.value)}
            placeholder="请输入课程简介，将显示在课程详情页"
            className="bg-gray-800 border-gray-700 text-white min-h-[100px]"
          />
        </div>

        <div>
          <Label className="text-white mb-2 block">课程封面</Label>
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
              <Input
                type="file"
                className="hidden"
                id="course-image"
                accept="image/*"
                onChange={(e) => handleImageUpload(e, setCourseImage)}
              />
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

        <div className="flex items-center space-x-8">
          <div className="flex items-center space-x-2">
            <Switch id="featured" checked={isFeatured} onCheckedChange={setIsFeatured} />
            <Label htmlFor="featured" className="text-white">
              精选课程
            </Label>
          </div>

          <div className="flex items-center space-x-2">
            <Switch id="published" checked={isPublished} onCheckedChange={setIsPublished} />
            <Label htmlFor="published" className="text-white">
              立即上架
            </Label>
          </div>
        </div>

        <div className="bg-blue-900/20 border border-blue-500/30 rounded-lg p-4">
          <p className="text-blue-300 text-sm">
            提示：课程标题和描述是吸引学员的第一印象，请确保它们简洁明了地传达课程价值。
          </p>
        </div>
      </div>
    </Card>
  )

  // 渲染步骤4：课程内容
  const renderStep4 = () => (
    <Card className="p-6 bg-gray-900 border-gray-800">
      <h2 className="text-xl font-semibold text-white mb-6">课程内容</h2>

      <div className="space-y-6">
        <div className="space-y-4">
          {sections.map((section) => (
            <div key={section.id} className="bg-gray-800 border border-gray-700 rounded-lg p-4">
              <div className="flex justify-between items-center mb-4">
                <Input
                  value={section.title}
                  onChange={(e) => updateSectionTitle(section.id, e.target.value)}
                  className="bg-gray-900 border-gray-700 text-white w-64"
                />
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-8 px-2 text-red-400 hover:text-red-300"
                  onClick={() => deleteSection(section.id)}
                >
                  <X className="h-4 w-4 mr-1" />
                  删除章节
                </Button>
              </div>

              <div className="space-y-3">
                {section.lessons.map((lesson) => (
                  <div key={lesson.id} className="bg-gray-900 border border-gray-700 rounded-lg p-3">
                    <div className="flex justify-between items-center mb-2">
                      <Input
                        value={lesson.title}
                        onChange={(e) => updateLesson(section.id, lesson.id, "title", e.target.value)}
                        className="bg-gray-800 border-gray-700 text-white w-64"
                      />
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-8 px-2 text-red-400 hover:text-red-300"
                        onClick={() => deleteLesson(section.id, lesson.id)}
                      >
                        <X className="h-4 w-4 mr-1" />
                        删除课时
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
                          className="bg-gray-800 border-gray-700 text-white"
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
                        <div className="flex justify-between items-center p-2 bg-gray-800 border border-gray-700 rounded-md">
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
                        <Button variant="outline" className="w-full border-gray-700 text-gray-400">
                          上传视频文件
                        </Button>
                      )}
                    </div>
                  </div>
                ))}

                <Button
                  variant="outline"
                  className="border-blue-500/30 text-blue-400 hover:bg-blue-500/20 w-full"
                  onClick={() => addLesson(section.id)}
                >
                  添加课时
                </Button>
              </div>
            </div>
          ))}

          <Button
            variant="outline"
            className="border-blue-500/30 text-blue-400 hover:bg-blue-500/20 w-full"
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
      </div>
    </Card>
  )

  // 渲染步骤5：直播设置
  const renderStep5 = () => (
    <Card className="p-6 bg-gray-900 border-gray-800">
      <h2 className="text-xl font-semibold text-white mb-6">直播设置</h2>

      <div className="space-y-6">
        <div className="space-y-4">
          {liveSessions.map((session) => (
            <div key={session.id} className="bg-gray-800 border border-gray-700 rounded-lg p-4">
              <div className="flex justify-between items-center mb-4">
                <Input
                  value={session.title}
                  onChange={(e) => updateLiveSession(session.id, "title", e.target.value)}
                  className="bg-gray-900 border-gray-700 text-white w-64"
                  placeholder="直播标题"
                />
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-8 px-2 text-red-400 hover:text-red-300"
                  onClick={() => deleteLiveSession(session.id)}
                >
                  <X className="h-4 w-4 mr-1" />
                  删除直播
                </Button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor={`session-datetime-${session.id}`} className="text-white mb-2 block">
                    直播时间 <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id={`session-datetime-${session.id}`}
                    type="datetime-local"
                    value={session.dateTime}
                    onChange={(e) => updateLiveSession(session.id, "dateTime", e.target.value)}
                    className="bg-gray-800 border-gray-700 text-white"
                  />
                </div>

                <div>
                  <Label htmlFor={`session-platform-${session.id}`} className="text-white mb-2 block">
                    直播平台
                  </Label>
                  <Select
                    value={session.meetingPlatform}
                    onValueChange={(value) => updateLiveSession(session.id, "meetingPlatform", value)}
                  >
                    <SelectTrigger
                      id={`session-platform-${session.id}`}
                      className="bg-gray-800 border-gray-700 text-white"
                    >
                      <SelectValue placeholder="选择直播平台" />
                    </SelectTrigger>
                    <SelectContent className="bg-gray-900 border-gray-700 text-white">
                      <SelectItem value="tecent">腾讯会议</SelectItem>
                      <SelectItem value="zoom">Zoom</SelectItem>
                      <SelectItem value="feishu">飞书会议</SelectItem>
                      <SelectItem value="other">其他平台</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                <div>
                  <Label htmlFor={`session-id-${session.id}`} className="text-white mb-2 block">
                    会议ID
                  </Label>
                  <Input
                    id={`session-id-${session.id}`}
                    value={session.meetingId}
                    onChange={(e) => updateLiveSession(session.id, "meetingId", e.target.value)}
                    placeholder="请输入会议ID"
                    className="bg-gray-800 border-gray-700 text-white"
                  />
                </div>

                <div>
                  <Label htmlFor={`session-password-${session.id}`} className="text-white mb-2 block">
                    会议密码
                  </Label>
                  <Input
                    id={`session-password-${session.id}`}
                    value={session.meetingPassword}
                    onChange={(e) => updateLiveSession(session.id, "meetingPassword", e.target.value)}
                    placeholder="请输入会议密码"
                    className="bg-gray-800 border-gray-700 text-white"
                  />
                </div>
              </div>
            </div>
          ))}

          <Button
            variant="outline"
            className="border-blue-500/30 text-blue-400 hover:bg-blue-500/20 w-full"
            onClick={addLiveSession}
          >
            添加直播课时
          </Button>
        </div>

        <div className="bg-blue-900/20 border border-blue-500/30 rounded-lg p-4">
          <p className="text-blue-300 text-sm">
            提示：设置好直播时间后，系统会自动提醒已报名的学员。直播结束后，您可以上传回放视频供学员观看。
          </p>
        </div>
      </div>
    </Card>
  )

  // 渲染步骤6：AI助理设置
  const renderStep6 = () => (
    <Card className="p-6 bg-gray-900 border-gray-800">
      <h2 className="text-xl font-semibold text-white mb-6">AI助理设置</h2>

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
                className="bg-gray-800 border-gray-700 text-white min-h-[200px]"
              />
              <p className="text-xs text-gray-400 mt-1">
                提示词将决定AI助理的行为和回答方式，您可以添加课程销售政策、优惠信息等内容。
              </p>
            </div>

            <div className="bg-gray-800 border border-gray-700 rounded-lg p-4">
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
    </Card>
  )

  // 渲染当前步骤内容
  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return renderStep1()
      case 2:
        return renderStep2()
      case 3:
        return renderStep3()
      case 4:
        return renderStep4()
      case 5:
        return courseType === "live" ? renderStep5() : renderStep4()
      case 6:
        return renderStep6()
      default:
        return null
    }
  }

  // 加载中状态
  if (isLoading) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4 text-blue-500" />
          <p className="text-gray-400">正在加载课程数据...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-black text-white">
      {/* 顶部导航栏 */}
      <div className="sticky top-0 left-0 right-0 h-14 flex items-center px-4 bg-gray-900/80 backdrop-blur-md border-b border-gray-800 z-10">
        <button onClick={handleExit} className="flex items-center text-gray-300">
          <ArrowLeft className="h-5 w-5 mr-2" />
          <span>返回</span>
        </button>
        <h1 className="flex-1 text-center text-lg font-semibold text-white">编辑课程</h1>
      </div>

      {/* 成功提示 */}
      {showSuccess && (
        <div className="fixed top-16 left-4 right-4 z-50">
          <Alert className="bg-green-900/60 border-green-500 backdrop-blur-sm">
            <Check className="h-4 w-4 text-green-400 mr-2" />
            <AlertDescription className="text-green-400">课程更新成功！正在跳转到课程列表...</AlertDescription>
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
            disabled={!isStepComplete()}
          >
            {currentStep < (courseType === "recorded" ? 6 : 6) ? (
              <>
                下一步
                <ArrowRight className="h-4 w-4 ml-2" />
              </>
            ) : (
              <>
                <Save className="h-4 w-4 mr-2" />
                保存修改
              </>
            )}
          </Button>
        </div>
      </div>

      {/* 退出确认对话框 */}
      <Dialog open={exitDialogOpen} onOpenChange={setExitDialogOpen}>
        <DialogContent className="bg-gray-900 border-gray-700 text-white">
          <DialogHeader>
            <DialogTitle>确认退出</DialogTitle>
            <DialogDescription className="text-gray-400">
              您的课程修改进度已保存至草稿箱，可以稍后继续完成修改。确定要退出吗？
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setExitDialogOpen(false)}
              className="border-gray-700 text-gray-300"
            >
              取消
            </Button>
            <Button onClick={confirmExit} className="bg-blue-600 hover:bg-blue-500">
              确认退出
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
