"use client"

import { useRouter } from "next/navigation"
import Image from "next/image"
import { Clock, BookOpen, BadgeIcon as Certificate, Trophy, Calendar, ShoppingBag } from "lucide-react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { useState } from "react"

export function Exams() {
  const router = useRouter()
  const [searchQuery, setSearchQuery] = useState("")

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
      image: "/placeholder-fe69z.png",
      count: "5套试卷",
      type: "mock",
      featured: true,
    },
    {
      id: 2,
      title: "短视频创作技能测评",
      description: "评估您的短视频策划、拍摄和剪辑能力",
      image: "/placeholder.svg?height=200&width=300&query=video+creation+skills",
      count: "6套试卷",
      type: "mock",
    },
    {
      id: 3,
      title: "自媒体运营能力测试",
      description: "测试您的内容创作和账号运营能力",
      image: "/placeholder.svg?height=200&width=300&query=social+media+management",
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
      image: "/placeholder.svg?height=200&width=300&query=ecommerce+certification",
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
      image: "/placeholder.svg?height=200&width=300&query=video+creator+certification",
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
      image: "/placeholder.svg?height=200&width=300&query=social+media+expert",
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
      image: "/placeholder.svg?height=200&width=300&query=livestream+host+certification",
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
      image: "/placeholder.svg?height=200&width=300&query=content+marketing+certification",
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
      image: "/placeholder.svg?height=200&width=300&query=video+creation+competition",
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
      image: "/placeholder.svg?height=200&width=300&query=ecommerce+innovation+contest",
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
      image: "/placeholder.svg?height=200&width=300&query=livestream+selling+challenge",
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

  // 修改handleMockExamClick函数，直接跳转到考试介绍页面而不是分类页面
  const handleMockExamClick = (examId) => {
    router.push(`/exams/${examId}/intro`)
  }

  // Modify the handleCertificateExamClick function to direct to certificate page
  const handleCertificateExamClick = (examId) => {
    router.push(`/exams/${examId}/certificate`)
  }

  // 修改handleCompetitionClick函数，确保直接跳转到赛事介绍页面
  const handleCompetitionClick = (competitionId) => {
    router.push(`/competitions/${competitionId}/intro`)
  }

  // 获取考试类型标签和颜色
  const getExamTypeInfo = (type) => {
    switch (type) {
      case "mock":
        return {
          icon: <ShoppingBag className="h-4 w-4 mr-1" />,
          label: "技能评估",
          color: "bg-purple-900 text-purple-100",
        }
      case "certificate":
        return {
          icon: <Certificate className="h-4 w-4 mr-1" />,
          label: "专业认证",
          color: "bg-pink-900 text-pink-100",
        }
      case "competition":
        return { icon: <Trophy className="h-4 w-4 mr-1" />, label: "创作大赛", color: "bg-purple-900 text-purple-100" }
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
        className="overflow-hidden cursor-pointer hover:shadow-md transition-shadow bg-gray-900 border-gray-800"
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
            <p className="text-xs text-gray-300 mt-1 line-clamp-1">{exam.description}</p>
          </div>
        </div>

        <div className="p-4 bg-gray-900">
          {/* 模拟考试信息 */}
          {exam.type === "mock" && (
            <div className="flex items-center text-sm text-gray-300">
              <BookOpen className="h-4 w-4 mr-1 text-purple-400" />
              <span>{exam.count}</span>
            </div>
          )}

          {/* 证书考试和竞赛信息 */}
          {(exam.type === "certificate" || exam.type === "competition") && (
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center text-sm text-gray-300">
                  <Calendar className="h-4 w-4 mr-1 text-purple-400" />
                  <span>考试日期: {exam.date}</span>
                </div>
                {isPurchased ? (
                  <div className="text-sm font-medium text-green-400">已报考</div>
                ) : exam.price > 0 ? (
                  <div className="text-sm font-medium text-purple-400">¥{exam.price}</div>
                ) : (
                  <div className="text-sm font-medium text-green-400">免费</div>
                )}
              </div>
              <div className="flex items-center text-sm text-gray-300">
                <Clock className="h-4 w-4 mr-1 text-pink-400" />
                <span>报名截止: {exam.deadline}</span>
              </div>

              {/* 标签 */}
              {exam.tags && exam.tags.length > 0 && (
                <div className="flex flex-wrap gap-1 mt-2">
                  {exam.tags.map((tag, index) => (
                    <Badge key={index} variant="outline" className="text-xs py-0 border-gray-700 text-gray-300">
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
              className="w-full text-sm bg-gray-800 border-gray-700 text-white hover:bg-purple-900 hover:text-white"
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
          className="text-xl font-semibold text-white mb-4 flex items-center justify-between cursor-pointer"
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

  return (
    <div className="p-4 bg-black min-h-screen">
      {/* 搜索框 */}
      <div className="mb-6">
        <input
          type="text"
          placeholder="搜索认证、考试或赛事..."
          className="w-full p-3 rounded-lg bg-gray-900 text-white border border-gray-800 focus:outline-none focus:ring-2 focus:ring-purple-500"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      {/* 推荐考试 */}
      {renderFeaturedExams()}

      {/* 模拟考试 */}
      <div className="mb-8">
        <h2
          className="text-xl font-semibold text-white mb-4 flex items-center justify-between cursor-pointer"
          onClick={() => toggleSection("mock")}
        >
          <span>技能评估</span>
          <span className="text-sm">{collapsedSections.mock ? "展开 ▼" : "收起 ▲"}</span>
        </h2>
        {!collapsedSections.mock && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredMockExams.map(renderExamCard)}
          </div>
        )}
      </div>

      {/* 证书考试 */}
      <div className="mb-8">
        <h2
          className="text-xl font-semibold text-white mb-4 flex items-center justify-between cursor-pointer"
          onClick={() => toggleSection("certificate")}
        >
          <span>专业认证</span>
          <span className="text-sm">{collapsedSections.certificate ? "展开 ▼" : "收起 ▲"}</span>
        </h2>
        {!collapsedSections.certificate && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredCertificateExams.map(renderExamCard)}
          </div>
        )}
      </div>

      {/* 竞赛活动 */}
      <div className="mb-8">
        <h2
          className="text-xl font-semibold text-white mb-4 flex items-center justify-between cursor-pointer"
          onClick={() => toggleSection("competition")}
        >
          <span>创作大赛</span>
          <span className="text-sm">{collapsedSections.competition ? "展开 ▼" : "收起 ▲"}</span>
        </h2>
        {!collapsedSections.competition && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredCompetitions.map(renderExamCard)}
          </div>
        )}
      </div>
    </div>
  )
}
