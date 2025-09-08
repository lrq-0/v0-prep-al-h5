"use client"

import { useState, useEffect } from "react"
import { Search, BookOpen, MessageSquare, Star, Users, Grid3X3, List, Filter } from "lucide-react"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export function AiMarket({ initialSection }: { initialSection?: string }) {
  const router = useRouter()
  const [activeSection, setActiveSection] = useState(initialSection || "courses")
  const [activeCourseCategory, setActiveCourseCategory] = useState("all")
  const [activeAiCategory, setActiveAiCategory] = useState("all")
  const [searchQuery, setSearchQuery] = useState("")
  const [sortBy, setSortBy] = useState("")
  const [viewMode, setViewMode] = useState("list")

  const sidebarItems = [
    {
      id: "courses",
      label: "课程市场",
      icon: <BookOpen className="h-5 w-5" />,
      count: 8,
    },
    {
      id: "assistants",
      label: "AI助手市场",
      icon: <MessageSquare className="h-5 w-5" />,
      count: 8,
    },
  ]

  const courseCategories = [
    { id: "all", name: "全部分类" },
    { id: "language", name: "语言" },
    { id: "literature", name: "文学素养" },
    { id: "science", name: "科学素养" },
    { id: "family", name: "家庭教育" },
    { id: "career", name: "职场创业" },
    { id: "women", name: "女性时尚" },
    { id: "psychology", name: "情感心理" },
    { id: "interests", name: "兴趣特长" },
    { id: "health", name: "健康养生" },
    { id: "classics", name: "国学经典" },
  ]

  const aiCategories = [
    { id: "all", name: "全部分类" },
    { id: "study", name: "学习辅导" },
    { id: "writing", name: "写作助手" },
    { id: "career", name: "职业发展" },
    { id: "life", name: "生活服务" },
    { id: "entertainment", name: "娱乐休闲" },
    { id: "health", name: "健康医疗" },
    { id: "finance", name: "金融理财" },
    { id: "tech", name: "科技数码" },
    { id: "creation", name: "创意设计" },
    { id: "social", name: "社交沟通" },
  ]

  const courses = [
    {
      id: 1,
      title: "幼儿英语启蒙课程",
      instructor: "李老师",
      price: "¥199",
      originalPrice: "¥299",
      rating: 4.8,
      reviews: 256,
      image: "/images/course-1.png",
      category: "language",
      level: "入门",
      description: "专为2-6岁幼儿设计的英语启蒙课程，通过游戏、歌曲和互动活动培养孩子的英语兴趣和语感。",
    },
    {
      id: 2,
      title: "小学数学思维训练",
      instructor: "王老师",
      price: "¥249",
      originalPrice: "¥349",
      rating: 4.7,
      reviews: 189,
      image: "/images/course-2.png",
      category: "science",
      level: "基础",
      description: "针对小学生设计的数学思维训练课程，培养逻辑思维能力和解题技巧，打下坚实的数学基础。",
    },
    {
      id: 3,
      title: "中学物理实验课程",
      instructor: "张老师",
      price: "¥299",
      originalPrice: "¥399",
      rating: 4.9,
      reviews: 324,
      image: "/images/course-3.png",
      category: "science",
      level: "进阶",
      description: "通过实验演示和互动讲解，帮助中学生理解物理概念和原理，提高实验操作能力。",
    },
    {
      id: 4,
      title: "高中化学竞赛辅导",
      instructor: "刘老师",
      price: "¥399",
      originalPrice: "¥499",
      rating: 4.6,
      reviews: 178,
      image: "/images/course-4.png",
      category: "science",
      level: "高级",
      description: "针对高中化学竞赛的专业辅导课程，涵盖竞赛重点知识和解题技巧，提高竞赛成绩。",
    },
    {
      id: 5,
      title: "大学英语四六级冲刺",
      instructor: "赵老师",
      price: "¥349",
      originalPrice: "¥449",
      rating: 4.5,
      reviews: 215,
      image: "/images/course-1.png",
      category: "language",
      level: "进阶",
      description: "针对大学英语四六级考试的冲刺课程，覆盖听力、阅读、写作和翻译等考试内容，提高通过率。",
    },
    {
      id: 6,
      title: "成人职场英语口语",
      instructor: "孙老师",
      price: "¥299",
      originalPrice: "¥399",
      rating: 4.7,
      reviews: 267,
      image: "/images/course-2.png",
      category: "language",
      level: "实用",
      description: "专为职场人士设计的英语口语课程，涵盖商务会议、谈判、演讲等场景的实用表达。",
    },
    {
      id: 7,
      title: "亲子沟通与家庭教育",
      instructor: "周老师",
      price: "¥259",
      originalPrice: "¥359",
      rating: 4.8,
      reviews: 312,
      image: "/images/course-3.png",
      category: "family",
      level: "入门",
      description: "帮助父母建立有效的亲子沟通方式，解决家庭教育中的常见问题，促进孩子健康成长。",
    },
    {
      id: 8,
      title: "职场晋升与领导力培养",
      instructor: "吴老师",
      price: "¥399",
      originalPrice: "¥499",
      rating: 4.6,
      reviews: 198,
      image: "/images/course-4.png",
      category: "career",
      level: "进阶",
      description: "针对职场中层管理者的领导力培训课程，提升团队管理、沟通协调和决策能力。",
    },
  ]

  const aiAssistants = [
    {
      id: 1,
      name: "英语口语教练",
      creator: "语言学习工作室",
      addedCount: 3562,
      rating: 4.8,
      reviews: 356,
      image: "/images/ai-assistant-1.png",
      category: "study",
      isVerified: true,
      description: "帮助提升英语口语流利度和发音准确性",
    },
    {
      id: 2,
      name: "数学解题专家",
      creator: "数学爱好者",
      addedCount: 2891,
      rating: 4.7,
      reviews: 289,
      image: "/images/ai-assistant-2.png",
      category: "study",
      isVerified: false,
      description: "解答各类数学难题，提供详细解题思路",
    },
    {
      id: 3,
      name: "物理实验助手",
      creator: "科学教育团队",
      addedCount: 1845,
      rating: 4.9,
      reviews: 412,
      image: "/images/ai-assistant-3.png",
      category: "study",
      isVerified: true,
      description: "指导物理实验操作，解释实验原理",
    },
    {
      id: 4,
      name: "职业规划顾问",
      creator: "职场导师",
      addedCount: 2156,
      rating: 4.6,
      reviews: 178,
      image: "/images/ai-assistant-4.png",
      category: "career",
      isVerified: true,
      description: "提供职业发展建议和求职面试指导",
    },
    {
      id: 5,
      name: "心理健康顾问",
      creator: "心理咨询师",
      addedCount: 3254,
      rating: 4.8,
      reviews: 325,
      image: "/images/ai-assistant-5.png",
      category: "health",
      isVerified: true,
      description: "提供情绪管理和心理健康建议",
    },
    {
      id: 6,
      name: "创意写作助手",
      creator: "文学爱好者",
      addedCount: 1562,
      rating: 4.5,
      reviews: 156,
      image: "/images/ai-assistant-6.png",
      category: "writing",
      isVerified: false,
      description: "激发写作灵感，提供写作技巧指导",
    },
    {
      id: 7,
      name: "旅行规划师",
      creator: "旅行达人",
      addedCount: 2845,
      rating: 4.7,
      reviews: 287,
      image: "/images/ai-assistant-1.png",
      category: "life",
      isVerified: true,
      description: "定制个性化旅行计划，推荐景点美食",
    },
    {
      id: 8,
      name: "健身教练",
      creator: "健身专家",
      addedCount: 3156,
      rating: 4.6,
      reviews: 315,
      image: "/images/ai-assistant-2.png",
      category: "health",
      isVerified: true,
      description: "提供个性化健身计划和饮食建议",
    },
  ]

  const aiAppsData = [
    {
      id: 1,
      name: "智能写作助手",
      description: "帮助改进写作，提供语法和风格建议",
      icon: "/writing-assistant.png",
      category: "写作",
      rating: 4.8,
      downloads: 12500,
    },
    {
      id: 2,
      name: "数学解题器",
      description: "解析数学问题并提供详细解题步骤",
      icon: "/math-solver.png",
      category: "教育",
      rating: 4.6,
      downloads: 9800,
    },
    {
      id: 3,
      name: "语言翻译器",
      description: "支持多种语言之间的实时翻译",
      icon: "/placeholder-39t1v.png",
      category: "语言",
      rating: 4.7,
      downloads: 15200,
    },
    {
      id: 4,
      name: "代码助手",
      description: "提供代码建议和问题解决方案",
      icon: "/code-assistant.png",
      category: "编程",
      rating: 4.9,
      downloads: 18300,
    },
  ]

  const sortItems = (items, type) => {
    const sortedItems = [...items]

    switch (sortBy) {
      case "popular":
        return sortedItems.sort((a, b) => {
          const aUsers = type === "courses" ? a.reviews * 3 : a.addedCount
          const bUsers = type === "courses" ? b.reviews * 3 : b.addedCount
          return bUsers - aUsers
        })
      case "rating":
        return sortedItems.sort((a, b) => {
          return b.rating - a.rating
        })
      default:
        return sortedItems
    }
  }

  const filteredCourses = courses.filter((course) => {
    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      const titleMatch = course.title.toLowerCase().includes(query)
      const instructorMatch = course.instructor.toLowerCase().includes(query)
      const descriptionMatch = course.description.toLowerCase().includes(query)
      const categoryMatch = course.category.toLowerCase().includes(query)

      if (!titleMatch && !instructorMatch && !descriptionMatch && !categoryMatch) {
        return false
      }
    }

    if (activeCourseCategory === "all") {
      return true
    }

    return course.category === activeCourseCategory
  })

  const sortedCourses = sortItems(filteredCourses, "courses")

  const filteredAiAssistants = aiAssistants.filter((assistant) => {
    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      const nameMatch = assistant.name.toLowerCase().includes(query)
      const creatorMatch = assistant.creator.toLowerCase().includes(query)
      const descriptionMatch = assistant.description.toLowerCase().includes(query)
      const categoryMatch = assistant.category.toLowerCase().includes(query)

      if (!nameMatch && !creatorMatch && !descriptionMatch && !categoryMatch) {
        return false
      }
    }

    if (activeAiCategory === "all") {
      return true
    }

    return assistant.category === activeAiCategory
  })

  const sortedAiAssistants = sortItems(filteredAiAssistants, "assistants")

  const filteredAiApps = aiAppsData.filter(
    (app) =>
      app.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      app.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      app.category.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const openCourseAssistant = (courseId) => {
    router.push(`/ai-chat/course-assistant?courseId=${courseId}&returnUrl=/#courses`)
  }

  const viewCourseDetail = (courseId) => {
    const returnUrl = encodeURIComponent(`/?tab=ai-market&section=${activeSection}`)
    router.push(`/courses/${courseId}?returnUrl=${returnUrl}`)
  }

  const viewAssistantDetail = (assistantId) => {
    console.log("[v0] AI Market - Current activeSection:", activeSection)
    console.log(
      "[v0] AI Market - Navigating to assistant detail with return URL:",
      `/?tab=ai-market&section=${activeSection}`,
    )
    const returnUrl = encodeURIComponent(`/?tab=ai-market&section=${activeSection}`)
    router.push(`/courses/1?returnUrl=${returnUrl}`)
  }

  const renderCourseCard = (course) => {
    if (viewMode === "grid") {
      return (
        <Card className="p-4 bg-card border-border hover:bg-card/80 transition-colors" key={course.id}>
          <div className="space-y-3">
            <div className="flex items-start justify-between gap-2">
              <h3 className="text-sm font-semibold text-blue-600 leading-tight flex-1">{course.title}</h3>
              <Badge className="bg-card text-foreground border-border text-[10px] px-1.5 py-0.5 shrink-0">
                <BookOpen className="h-2.5 w-2.5 mr-0.5" />
                {tagTranslations[course.category] || course.category}
              </Badge>
            </div>

            <p className="text-[11px] text-foreground">讲师：{course.instructor}</p>

            <p className="text-[11px] text-foreground line-clamp-2">{course.description}</p>

            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs text-muted-foreground">
                <div className="flex items-center">
                  <Users className="h-3 w-3 mr-1" />
                  <span>{course.reviews * 3}</span>
                </div>
                <div className="flex items-center">
                  <BookOpen className="h-3 w-3 mr-1" />
                  <span>{Math.floor(Math.random() * 500) + 100}</span>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-3 w-3 ${
                          i < Math.floor(course.rating) ? "text-yellow-400 fill-yellow-400" : "text-muted-foreground"
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-xs text-foreground ml-1">{course.rating}</span>
                </div>

                <Button
                  className="bg-blue-600 text-white px-3 py-1 text-xs hover:bg-blue-700"
                  onClick={() => viewCourseDetail(course.id)}
                >
                  查看详情
                </Button>
              </div>
            </div>
          </div>
        </Card>
      )
    }

    return (
      <Card className="p-6 bg-card border-border mb-4 hover:bg-card/80 transition-colors" key={course.id}>
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <div className="flex items-center mb-2">
              <h3 className="text-lg font-medium text-blue-600 mr-3">{course.title.toUpperCase()}</h3>
              <Badge className="bg-card text-foreground border-border">
                <BookOpen className="h-3 w-3 mr-1" />
                {tagTranslations[course.category] || course.category}
              </Badge>
            </div>

            <p className="text-sm text-foreground mb-3">讲师：{course.instructor}</p>

            <p className="text-sm text-foreground mb-4 line-clamp-2">{course.description}</p>

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-6 text-sm text-muted-foreground">
                <div className="flex items-center">
                  <Users className="h-4 w-4 mr-1" />
                  <span>{course.reviews * 3} 用户</span>
                </div>
                <div className="flex items-center">
                  <BookOpen className="h-4 w-4 mr-1" />
                  <span>{Math.floor(Math.random() * 500) + 100} 闪卡</span>
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <div className="flex items-center">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-4 w-4 ${
                          i < Math.floor(course.rating) ? "text-yellow-400 fill-yellow-400" : "text-muted-foreground"
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-sm text-foreground ml-2">{course.rating}</span>
                </div>

                <Button
                  className="bg-blue-600 text-white px-6 py-2 text-sm hover:bg-blue-700"
                  onClick={() => viewCourseDetail(course.id)}
                >
                  查看详情
                </Button>
              </div>
            </div>
          </div>
        </div>
      </Card>
    )
  }

  const renderAiAssistantCard = (assistant) => {
    if (viewMode === "grid") {
      return (
        <Card key={assistant.id} className="p-4 bg-card border-border hover:bg-card/80 transition-colors">
          <div className="space-y-3">
            <div className="flex items-start justify-between gap-2">
              <h3 className="text-sm font-semibold text-blue-600 leading-tight flex-1">{assistant.name}</h3>
              {assistant.isVerified && (
                <Badge className="bg-blue-600 text-white border-blue-600 text-[10px] px-1.5 py-0.5 shrink-0">
                  认证
                </Badge>
              )}
            </div>

            <p className="text-[11px] text-foreground">创建者：{assistant.creator}</p>

            <p className="text-[11px] text-foreground line-clamp-2">{assistant.description}</p>

            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs text-muted-foreground">
                <div className="flex items-center">
                  <Users className="h-3 w-3 mr-1" />
                  <span>{assistant.addedCount}</span>
                </div>
                <div className="flex items-center">
                  <MessageSquare className="h-3 w-3 mr-1" />
                  <span>{Math.floor(Math.random() * 500) + 100}</span>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-3 w-3 ${
                          i < Math.floor(assistant.rating) ? "text-yellow-400 fill-yellow-400" : "text-muted-foreground"
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-xs text-foreground ml-1">{assistant.rating}</span>
                </div>

                <Button
                  className="bg-blue-600 text-white px-3 py-1 text-xs hover:bg-blue-700"
                  onClick={() => viewAssistantDetail(assistant.id)}
                >
                  查看详情
                </Button>
              </div>
            </div>
          </div>
        </Card>
      )
    }

    return (
      <Card key={assistant.id} className="p-6 bg-card border-border mb-4 hover:bg-card/80 transition-colors">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <div className="flex items-center mb-2">
              <h3 className="text-lg font-medium text-blue-600 mr-3">{assistant.name.toUpperCase()}</h3>
              {assistant.isVerified && <Badge className="bg-blue-600 text-white border-blue-600">已认证</Badge>}
            </div>

            <p className="text-sm text-foreground mb-3">创建者：{assistant.creator}</p>

            <p className="text-sm text-foreground mb-4">{assistant.description}</p>

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-6 text-sm text-muted-foreground">
                <div className="flex items-center">
                  <Users className="h-4 w-4 mr-1" />
                  <span>{assistant.addedCount} 用户</span>
                </div>
                <div className="flex items-center">
                  <MessageSquare className="h-4 w-4 mr-1" />
                  <span>{Math.floor(Math.random() * 500) + 100} 对话</span>
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <div className="flex items-center">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-4 w-4 ${
                          i < Math.floor(assistant.rating) ? "text-yellow-400 fill-yellow-400" : "text-muted-foreground"
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-sm text-foreground ml-2">{assistant.rating}</span>
                </div>

                <Button
                  className="bg-blue-600 text-white px-6 py-2 text-sm hover:bg-blue-700"
                  onClick={() => viewAssistantDetail(assistant.id)}
                >
                  查看详情
                </Button>
              </div>
            </div>
          </div>
        </div>
      </Card>
    )
  }

  const tagTranslations = {
    language: "语言",
    literature: "文学素养",
    science: "科学素养",
    family: "家庭教育",
    career: "职场创业",
    women: "女性时尚",
    psychology: "情感心理",
    interests: "兴趣特长",
    health: "健康养生",
    classics: "国学经典",
    study: "学习辅导",
    writing: "写作助手",
    life: "生活服务",
    entertainment: "娱乐休闲",
    finance: "金融理财",
    tech: "科技数码",
    creation: "创意设计",
    social: "社交沟通",
  }

  useEffect(() => {
    console.log("[v0] AI Market - Received initialSection:", initialSection)
    console.log("[v0] AI Market - Current activeSection:", activeSection)
    if (initialSection) {
      setActiveSection(initialSection)
      console.log("[v0] AI Market - Set activeSection to:", initialSection)
    }
  }, [initialSection])

  return (
    <div className="flex h-screen bg-background text-foreground">
      <div className="w-64 bg-card border-r border-border flex flex-col">
        {/* Sidebar header */}
        <div className="p-4 border-b border-border">
          <h2 className="text-lg font-semibold text-foreground">AI市场</h2>
        </div>

        {/* Sidebar navigation */}
        <div className="flex-1 p-4">
          <div className="space-y-2">
            {sidebarItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveSection(item.id)}
                className={`w-full flex items-center justify-between p-3 rounded-lg text-left transition-colors ${
                  activeSection === item.id
                    ? "bg-blue-600 text-white"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                }`}
              >
                <div className="flex items-center">
                  {item.icon}
                  <span className="ml-3 font-medium">{item.label}</span>
                </div>
                <Badge
                  variant="secondary"
                  className={`text-xs ${
                    activeSection === item.id ? "bg-blue-700 text-white" : "bg-muted text-muted-foreground"
                  }`}
                >
                  {item.count}
                </Badge>
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="flex-1 flex flex-col">
        {/* Header with filters */}
        <div className="p-4 border-b border-border">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-xl font-semibold text-foreground">
              {sidebarItems.find((item) => item.id === activeSection)?.label}
            </h1>
            <div className="relative w-80">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder={activeSection === "courses" ? "搜索课程名称、关键词或作者" : "搜索AI助手名称或功能"}
                className="pl-10 h-10 bg-muted border-border text-foreground placeholder:text-muted-foreground focus-visible:ring-blue-500 focus-visible:border-blue-500"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="text-sm text-muted-foreground">
              共 {activeSection === "courses" ? sortedCourses.length : sortedAiAssistants.length} 项
            </div>
          </div>

          {/* Filters and view controls */}
          <div className="flex items-center justify-between mt-4">
            <div className="flex items-center space-x-4">
              <Select
                value={activeSection === "courses" ? activeCourseCategory : activeAiCategory}
                onValueChange={(value) => {
                  if (activeSection === "courses") {
                    setActiveCourseCategory(value)
                  } else {
                    setActiveAiCategory(value)
                  }
                }}
              >
                <SelectTrigger className="w-48 bg-muted border-border text-foreground">
                  <div className="flex items-center">
                    <Filter className="h-4 w-4 mr-2 text-muted-foreground" />
                    <SelectValue placeholder="全部分类" />
                  </div>
                </SelectTrigger>
                <SelectContent className="bg-card border-border">
                  {activeSection === "courses"
                    ? courseCategories.map((category) => (
                        <SelectItem key={category.id} value={category.id} className="text-foreground hover:bg-muted">
                          {category.name.toUpperCase()}
                        </SelectItem>
                      ))
                    : aiCategories.map((category) => (
                        <SelectItem key={category.id} value={category.id} className="text-foreground hover:bg-muted">
                          {category.name.toUpperCase()}
                        </SelectItem>
                      ))}
                </SelectContent>
              </Select>

              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-48 bg-muted border-border text-foreground">
                  <SelectValue placeholder="排序方式" />
                </SelectTrigger>
                <SelectContent className="bg-card border-border">
                  <SelectItem value="popular" className="text-foreground hover:bg-muted">
                    最受欢迎
                  </SelectItem>
                  <SelectItem value="rating" className="text-foreground hover:bg-muted">
                    评分最高
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-center space-x-2">
              <Button
                variant={viewMode === "list" ? "default" : "outline"}
                size="icon"
                onClick={() => setViewMode("list")}
                className={`bg-muted border-border hover:bg-muted/80 ${
                  viewMode === "list" ? "border-blue-600 border-2" : ""
                }`}
              >
                <List className="h-4 w-4 text-foreground" />
              </Button>
              <Button
                variant={viewMode === "grid" ? "default" : "outline"}
                size="icon"
                onClick={() => setViewMode("grid")}
                className={`bg-muted border-border hover:bg-muted/80 ${
                  viewMode === "grid" ? "border-blue-600 border-2" : ""
                }`}
              >
                <Grid3X3 className="h-4 w-4 text-foreground" />
              </Button>
            </div>
          </div>
        </div>

        {/* Content area */}
        <div className="flex-1 p-4 overflow-y-auto">
          <div className={viewMode === "grid" ? "grid grid-cols-4 gap-4" : "space-y-0"}>
            {activeSection === "courses" ? (
              <>
                {sortedCourses.length > 0 ? (
                  sortedCourses.map(renderCourseCard)
                ) : (
                  <div className="text-center py-12 text-muted-foreground col-span-4">暂无相关课程</div>
                )}
              </>
            ) : (
              <>
                {sortedAiAssistants.length > 0 ? (
                  sortedAiAssistants.map(renderAiAssistantCard)
                ) : (
                  <div className="text-center py-12 text-muted-foreground col-span-4">暂无相关AI助手</div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
