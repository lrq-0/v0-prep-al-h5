"use client"

import { useRouter } from "next/navigation"
import Image from "next/image"
import { Clock, BookOpen, Briefcase as Certificate, Trophy, Calendar, ShoppingBag, Search } from "lucide-react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { useState, useEffect } from "react"

interface ExamsProps {
  initialSection?: string
}

export function Exams({ initialSection }: ExamsProps) {
  const router = useRouter()
  const [searchQuery, setSearchQuery] = useState("")
  const [activeSection, setActiveSection] = useState(initialSection || "featured")

  useEffect(() => {
    if (initialSection) {
      setActiveSection(initialSection)
    }
  }, [initialSection])

  // Add state for section collapse controls
  const [collapsedSections, setCollapsedSections] = useState({
    featured: false,
    mock: false,
    certificate: false,
    competition: false,
  })

  // Add toggle function for collapsing sections
  const toggleSection = (section) => {
    setCollapsedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }))
  }

  // 模拟考试数据 - 电商自媒体相关
  const mockExams = [
    {
      id: 1,
      title: "电商运营能力评估",
      description: "测试您的电商平台运营和店铺管理能力",
      image: "/ecommerce-assessment.jpg", // Updated from placeholder to proper e-commerce assessment image
      count: "5套试卷",
      type: "mock",
      featured: true,
    },
    {
      id: 2,
      title: "短视频创作技能测评",
      description: "评估您的短视频策划、拍摄和剪辑能力",
      image: "/video-creation-skills.png",
      count: "6套试卷",
      type: "mock",
    },
    {
      id: 3,
      title: "自媒体运营能力测试",
      description: "测试您的内容创作和账号运营能力",
      image: "/social-media-management.png",
      count: "4套试卷",
      type: "mock",
    },
  ]

  // 证书考试数据 - 电商自媒体相关
  const certificateExams = [
    {
      id: 1,
      title: "电商运营专业认证",
      description: "国内权威的电商运营能力认证",
      image: "/ecommerce-certification.png",
      date: "2025-06-15",
      deadline: "2025-05-30",
      price: 1299,
      type: "certificate",
      featured: true,
      tags: ["热门", "官方认证"],
      purchased: false,
      certIssueTime: "考后15个工作日",
      examFormat: "线上理论+实操考核，共180分钟",
    },
    {
      id: 2,
      title: "短视频创作师认证",
      description: "专业短视频内容创作能力认证",
      image: "/video-creator-certification.png",
      date: "2025-07-20",
      deadline: "2025-06-30",
      price: 1500,
      type: "certificate",
      tags: ["行业认可"],
      purchased: true,
      certIssueTime: "考后30个工作日",
      examFormat: "线下实操考核，180分钟",
    },
    {
      id: 3,
      title: "自媒体运营专家认证",
      description: "自媒体账号运营与变现能力认证",
      image: "/social-media-expert.png",
      date: "2025-05-10",
      deadline: "2025-04-20",
      price: 1800,
      type: "certificate",
      purchased: false,
      certIssueTime: "考后20个工作日",
      examFormat: "线上笔试+面试，共120分钟",
    },
    {
      id: 4,
      title: "直播带货主播认证",
      description: "专业直播带货技能认证",
      image: "/livestream-host-certification.png",
      date: "2025-08-15",
      deadline: "2025-07-30",
      price: 2000,
      type: "certificate",
      purchased: false,
      certIssueTime: "考后25个工作日",
      examFormat: "线上笔试+直播演示，共150分钟",
    },
    {
      id: 5,
      title: "内容营销策划师认证",
      description: "内容营销策划与执行能力认证",
      image: "/content-marketing-certification.png",
      date: "2025-09-20",
      deadline: "2025-08-31",
      price: 1600,
      type: "certificate",
      purchased: false,
      certIssueTime: "考后10个工作日",
      examFormat: "案例分析+策划方案，共240分钟",
    },
  ]

  // 赛事报名数据 - 电商自媒体相关
  const competitions = [
    {
      id: 1,
      title: "全国短视频创作大赛",
      description: "展示短视频创作才华，赢取品牌合作机会",
      image: "/video-creation-competition.png",
      deadline: "2025-05-30",
      date: "2025-06-15",
      price: 500,
      type: "competition",
      featured: true,
      tags: ["国家级", "奖金丰厚"],
      purchased: false,
    },
    {
      id: 2,
      title: "电商创业创新大赛",
      description: "发掘电商创业创新项目和人才",
      image: "/ecommerce-innovation-contest.png",
      deadline: "2025-06-15",
      date: "2025-07-10",
      price: 0,
      type: "competition",
      tags: ["免费参赛"],
      purchased: true,
    },
    {
      id: 3,
      title: "直播带货达人挑战赛",
      description: "测试直播带货技能和销售能力",
      image: "/livestream-selling-challenge.png",
      deadline: "2025-04-30",
      date: "2025-05-15",
      price: 300,
      type: "competition",
      purchased: false,
    },
  ]

  // 根据搜索查询过滤考试
  const filteredMockExams = mockExams.filter((exam) => exam.title.toLowerCase().includes(searchQuery.toLowerCase()))
  const filteredCertificateExams = certificateExams.filter((exam) =>
    exam.title.toLowerCase().includes(searchQuery.toLowerCase()),
  )
  const filteredCompetitions = competitions.filter((exam) =>
    exam.title.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const handleMockExamClick = (examId) => {
    router.push(`/exams/${examId}/intro?returnUrl=${encodeURIComponent("/?tab=exams&section=mock")}`)
  }

  const handleCertificateExamClick = (examId) => {
    router.push(`/exams/${examId}/certificate?returnUrl=${encodeURIComponent("/?tab=exams&section=certificate")}`)
  }

  const handleCompetitionClick = (competitionId) => {
    router.push(
      `/competitions/${competitionId}/intro?returnUrl=${encodeURIComponent("/?tab=exams&section=competition")}`,
    )
  }

  // 获取考试类型标签和颜色
  const getExamTypeInfo = (type) => {
    switch (type) {
      case "mock":
        return {
          icon: <ShoppingBag className="h-4 w-4 mr-1" />,
          label: "技能评估",
          color: "bg-blue-900 text-blue-100",
        }
      case "certificate":
        return {
          icon: <Certificate className="h-4 w-4 mr-1" />,
          label: "专业认证",
          color: "bg-pink-900 text-pink-100",
        }
      case "competition":
        return { icon: <Trophy className="h-4 w-4 mr-1" />, label: "创作大赛", color: "bg-blue-900 text-blue-100" }
      default:
        return { icon: <BookOpen className="h-4 w-4 mr-1" />, label: "未知类型", color: "bg-gray-700 text-gray-100" }
    }
  }

  // Modify function to render the exam card to show "已报考" for purchased exams
  const renderExamCard = (exam) => {
    const typeInfo = getExamTypeInfo(exam.type)
    const handleClick =
      exam.type === "mock"
        ? () => handleMockExamClick(exam.id)
        : exam.type === "certificate"
          ? () => handleCertificateExamClick(exam.id)
          : () => handleCompetitionClick(exam.id)

    // Check if the exam has a purchased status
    const isPurchased = exam.purchased === true

    return (
      <Card
        key={`${exam.type}-${exam.id}`}
        className="overflow-hidden cursor-pointer hover:shadow-md transition-shadow bg-card border-border"
        onClick={handleClick}
      >
        <div className="relative">
          <div className="relative h-48 w-full">
            <Image src={exam.image || "/placeholder.svg"} alt={exam.title} fill className="object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
          </div>

          {/* 标签和价格 */}
          <div className="absolute top-2 left-2">
            <Badge className={typeInfo.color}>
              {typeInfo.icon}
              {typeInfo.label}
            </Badge>
          </div>

          {isPurchased && (
            <div className="absolute top-2 right-2">
              <Badge variant="secondary" className="bg-green-900 text-green-100 border-green-700">
                已报考
              </Badge>
            </div>
          )}

          {!isPurchased && exam.featured && (
            <div className="absolute top-2 right-2">
              <Badge variant="secondary" className="bg-yellow-900 text-yellow-100 border-yellow-700">
                推荐
              </Badge>
            </div>
          )}

          {/* 标题和描述 */}
          <div className="absolute bottom-0 left-0 right-0 p-4">
            <h3 className="font-medium text-white text-lg line-clamp-2">{exam.title}</h3>
            <p className="text-xs text-white/80 mt-1 line-clamp-1">{exam.description}</p>
          </div>
        </div>

        <div className="p-4 bg-card">
          {/* 模拟考试信息 */}
          {exam.type === "mock" && (
            <div className="flex items-center text-sm text-muted-foreground">
              <BookOpen className="h-4 w-4 mr-1 text-blue-600" />
              <span>{exam.count}</span>
            </div>
          )}

          {/* 证书考试和竞赛信息 */}
          {(exam.type === "certificate" || exam.type === "competition") && (
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center text-sm text-muted-foreground">
                  <Calendar className="h-4 w-4 mr-1 text-blue-600" />
                  <span>考试日期: {exam.date}</span>
                </div>
                {isPurchased ? (
                  <div className="text-sm font-medium text-green-400">已报考</div>
                ) : exam.price > 0 ? (
                  <div className="text-sm font-medium text-blue-600">¥{exam.price}</div>
                ) : (
                  <div className="text-sm font-medium text-green-400">免费</div>
                )}
              </div>
              <div className="flex items-center text-sm text-muted-foreground">
                <Clock className="h-4 w-4 mr-1 text-blue-600" />
                <span>报名截止: {exam.deadline}</span>
              </div>

              {/* 标签 */}
              {exam.tags && exam.tags.length > 0 && (
                <div className="flex flex-wrap gap-1 mt-2">
                  {exam.tags.map((tag, index) => (
                    <Badge key={index} variant="outline" className="text-xs py-0 border-border text-muted-foreground">
                      {tag}
                    </Badge>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* 操作按钮 */}
          <div className="mt-3">
            <Button
              variant="outline"
              className="w-full text-sm bg-muted border-border text-foreground hover:bg-primary hover:text-primary-foreground"
              onClick={(e) => {
                e.stopPropagation()
                handleClick()
              }}
            >
              {exam.type === "mock" ? "开始评估" : exam.type === "certificate" ? "查看详情" : "了解赛事"}
            </Button>
          </div>
        </div>
      </Card>
    )
  }

  // Update the featured exams render function with collapsible feature
  const renderFeaturedExams = () => {
    const featuredExams = [...mockExams, ...certificateExams, ...competitions].filter((exam) => exam.featured)

    return (
      <div className="mb-8">
        <h2
          className="text-xl font-semibold text-foreground mb-4 flex items-center justify-between cursor-pointer"
          onClick={() => toggleSection("featured")}
        >
          <span>推荐认证</span>
          <span className="text-sm">{collapsedSections.featured ? "展开 ▼" : "收起 ▲"}</span>
        </h2>
        {!collapsedSections.featured && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {featuredExams.map(renderExamCard)}
          </div>
        )}
      </div>
    )
  }

  const sidebarItems = [
    {
      id: "featured",
      label: "推荐认证",
      icon: <Trophy className="h-5 w-5" />,
      count: [...mockExams, ...certificateExams, ...competitions].filter((exam) => exam.featured).length,
    },
    {
      id: "mock",
      label: "技能评估",
      icon: <ShoppingBag className="h-5 w-5" />,
      count: mockExams.length,
    },
    {
      id: "certificate",
      label: "专业认证",
      icon: <Certificate className="h-5 w-5" />,
      count: certificateExams.length,
    },
    {
      id: "competition",
      label: "创作大赛",
      icon: <Trophy className="h-5 w-5" />,
      count: competitions.length,
    },
  ]

  const renderActiveContent = () => {
    let examsToShow = []

    switch (activeSection) {
      case "featured":
        examsToShow = [...mockExams, ...certificateExams, ...competitions].filter((exam) => exam.featured)
        break
      case "mock":
        examsToShow = filteredMockExams
        break
      case "certificate":
        examsToShow = filteredCertificateExams
        break
      case "competition":
        examsToShow = filteredCompetitions
        break
      default:
        examsToShow = []
    }

    return <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">{examsToShow.map(renderExamCard)}</div>
  }

  return (
    <div className="flex h-screen bg-background text-foreground">
      <div className="w-64 bg-card border-r border-border flex flex-col">
        {/* Sidebar header */}
        <div className="p-4 border-b border-border">
          <h2 className="text-lg font-semibold text-foreground">考测中心</h2>
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
        {/* Header */}
        <div className="p-4 border-b border-border">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-xl font-semibold text-foreground">
              {sidebarItems.find((item) => item.id === activeSection)?.label}
            </h1>
            <div className="relative w-80">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="搜索认证、考试或赛事..."
                className="w-full pl-10 pr-4 py-2 bg-muted border border-border rounded-lg text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>

          <div className="text-sm text-muted-foreground">
            共 {sidebarItems.find((item) => item.id === activeSection)?.count} 项
          </div>
        </div>

        {/* Content area */}
        <div className="flex-1 p-4 overflow-y-auto">{renderActiveContent()}</div>
      </div>
    </div>
  )
}
