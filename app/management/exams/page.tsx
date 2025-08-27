"use client"

import { useState, useEffect } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import {
  Search,
  Plus,
  FileText,
  Award,
  Trophy,
  Check,
  DollarSign,
  ArrowLeft,
  Download,
  Upload,
  FileSpreadsheet,
  ImageIcon,
  X,
  Info,
  Users,
  PenLine,
  Share2,
  Trash2,
  ChevronDown,
} from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

export default function ExamsManagement() {
  const [activeTab, setActiveTab] = useState("my-exams")
  const [searchQuery, setSearchQuery] = useState("")
  const [filter, setFilter] = useState("all")
  const [marketExams, setMarketExams] = useState([])
  const [myExams, setMyExams] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [selectedExam, setSelectedExam] = useState(null)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [salesPrice, setSalesPrice] = useState("")
  const [isExportDialogOpen, setIsExportDialogOpen] = useState(false)
  const [isImportDialogOpen, setIsImportDialogOpen] = useState(false)
  const [exportOptions, setExportOptions] = useState({
    includePhotos: true,
    photoNaming: "name_id",
    photoSize: "1inch",
  })
  const [importFile, setImportFile] = useState(null)

  // 添加折叠状态管理
  const [collapsedSections, setCollapsedSections] = useState({
    featured: false,
    mock: false,
    certificate: false,
    competition: false,
  })

  // 添加折叠切换函数
  const toggleSection = (section) => {
    setCollapsedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }))
  }

  // 模拟数据加载
  useEffect(() => {
    // 模拟API请求延迟
    const timer = setTimeout(() => {
      setMarketExams([
        {
          id: "m1",
          title: "工信部人工智能提示词工程师（高级）证书考试",
          type: "certificate",
          price: 299,
          agentPrice: 199,
          suggestedPrice: 299,
          priceDescription: "包含证书申请费用和电子版证书，纸质证书需另付邮费。",
          image: "/images/certificate-1.png",
          description: "国家认可的AI提示词工程师专业资格认证考试，通过后获得工信部颁发的专业资格证书。",
          popularity: 4.8,
          added: false,
          requiresPhoto: true,
          registrationTemplate: true,
          featured: true,
        },
        {
          id: "m2",
          title: "Python编程能力评估",
          type: "mock",
          price: 0,
          agentPrice: 0,
          suggestedPrice: 0,
          image: "/images/exam-1.png",
          description: "全面评估Python编程基础知识和实际应用能力，包含选择题和编程题。",
          popularity: 4.5,
          added: true,
          requiresPhoto: false,
          registrationTemplate: false,
          featured: false,
        },
        {
          id: "m3",
          title: "全国大学生人工智能创新大赛",
          type: "competition",
          price: 50,
          agentPrice: 30,
          suggestedPrice: 50,
          priceDescription: "包含参赛资格和电子证书，获奖者可获得实物奖品。",
          image: "/images/exam-2.png",
          description: "面向全国高校学生的AI创新能力竞赛，优胜者可获得奖金和实习机会。",
          popularity: 4.9,
          added: false,
          requiresPhoto: true,
          registrationTemplate: true,
          featured: true,
        },
        {
          id: "m4",
          title: "数据分析师认证考试",
          type: "certificate",
          price: 199,
          agentPrice: 129,
          suggestedPrice: 199,
          priceDescription: "包含在线考试和电子证书，可选纸质证书服务。",
          image: "/images/certificate-2.png",
          description: "专业数据分析能力认证，涵盖数据处理、统计分析和数据可视化等核心技能。",
          popularity: 4.6,
          added: true,
          requiresPhoto: true,
          registrationTemplate: true,
          featured: false,
        },
        {
          id: "m5",
          title: "Web前端开发模拟测试",
          type: "mock",
          price: 0,
          agentPrice: 0,
          suggestedPrice: 0,
          image: "/images/exam-3.png",
          description: "模拟前端开发工作中的实际场景，测试HTML、CSS和JavaScript技能。",
          popularity: 4.3,
          added: false,
          requiresPhoto: false,
          registrationTemplate: false,
          featured: false,
        },
        {
          id: "m6",
          title: "区块链技术应用大赛",
          type: "competition",
          price: 100,
          agentPrice: 70,
          suggestedPrice: 100,
          priceDescription: "包含参赛资格、技术指导和获奖证书。",
          image: "/images/exam-4.png",
          description: "探索区块链技术创新应用的竞赛，参赛者需提交基于区块链的创新项目。",
          popularity: 4.7,
          added: false,
          requiresPhoto: true,
          registrationTemplate: true,
          featured: false,
        },
      ])

      setMyExams([
        {
          id: "e1",
          title: "Python编程能力评估",
          type: "mock",
          price: 0,
          image: "/images/exam-1.png",
          status: "active",
          students: 128,
          created: "2023-10-15",
          shared: true,
          creator: "self", // 添加创建者信息
          requiresPhoto: false,
          registrationTemplate: false,
          pendingReview: 0,
          featured: true,
        },
        {
          id: "e2",
          title: "数据分析师认证考试",
          type: "certificate",
          price: 199,
          image: "/images/certificate-2.png",
          status: "active",
          students: 56,
          created: "2023-11-02",
          shared: false,
          creator: "self", // 添加创建者信息
          requiresPhoto: true,
          registrationTemplate: true,
          pendingReview: 23,
          featured: false,
        },
        {
          id: "e3",
          title: "AI基础知识测试",
          type: "mock",
          price: 0,
          image: "/images/exam-3.png",
          status: "draft",
          students: 0,
          created: "2023-12-05",
          shared: false,
          creator: "self", // 添加创建者信息
          requiresPhoto: false,
          registrationTemplate: false,
          pendingReview: 0,
          featured: false,
        },
        {
          id: "e4",
          title: "全国大学生人工智能创新大赛",
          type: "competition",
          price: 50,
          image: "/images/exam-2.png",
          status: "active",
          students: 42,
          created: "2023-11-20",
          shared: false,
          creator: "market", // 从市场添加的考试
          requiresPhoto: true,
          registrationTemplate: true,
          pendingReview: 15,
          featured: false,
        },
      ])

      setIsLoading(false)
    }, 1000)

    return () => clearTimeout(timer)
  }, [])

  // 过滤考试列表
  const filteredMarketExams = marketExams.filter((exam) => {
    const matchesSearch = exam.title.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesFilter = filter === "all" || exam.type === filter
    return matchesSearch && matchesFilter
  })

  // 按类型分组考试
  const groupedMyExams = {
    featured: myExams.filter((exam) => exam.featured),
    mock: myExams.filter((exam) => exam.type === "mock"),
    certificate: myExams.filter((exam) => exam.type === "certificate"),
    competition: myExams.filter((exam) => exam.type === "competition"),
  }

  // 添加或移除考试
  const toggleExamAddition = (exam) => {
    if (exam.added) {
      // 如果已添加，则移除
      setMarketExams(marketExams.map((e) => (e.id === exam.id ? { ...e, added: false } : e)))
    } else {
      // 如果未添加，则打开对话框
      setSelectedExam(exam)
      setSalesPrice(exam.suggestedPrice || "")
      setIsDialogOpen(true)
    }
  }

  // 确认添加考试
  const confirmAddExam = () => {
    if (!salesPrice || isNaN(Number.parseFloat(salesPrice)) || Number.parseFloat(salesPrice) <= 0) {
      alert("请输入有效的销售价格")
      return
    }

    setMarketExams(marketExams.map((exam) => (exam.id === selectedExam.id ? { ...exam, added: true } : exam)))
    setIsDialogOpen(false)
    setSelectedExam(null)
  }

  // 打开导出对话框
  const openExportDialog = (exam) => {
    setSelectedExam(exam)
    setIsExportDialogOpen(true)
  }

  // 打开导入对话框
  const openImportDialog = (exam) => {
    setSelectedExam(exam)
    setIsImportDialogOpen(true)
  }

  // 处理导出
  const handleExport = () => {
    // 模拟导出过程
    setTimeout(() => {
      alert("导出成功！文件已下载到您的设备。")
      setIsExportDialogOpen(false)
      setSelectedExam(null)
    }, 1000)
  }

  // 处理导入文件选择
  const handleImportFileChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      setImportFile(file)
    }
  }

  // 处理导入
  const handleImport = () => {
    if (!importFile) {
      alert("请选择要导入的文件")
      return
    }

    // 模拟导入过程
    setTimeout(() => {
      alert("导入成功！")
      setIsImportDialogOpen(false)
      setSelectedExam(null)
      setImportFile(null)
    }, 1000)
  }

  // 获取考试类型标签
  const getTypeLabel = (type) => {
    switch (type) {
      case "mock":
        return "模拟考试"
      case "certificate":
        return "证书考试"
      case "competition":
        return "竞赛活动"
      default:
        return "未知类型"
    }
  }

  // 获取考试类型颜色
  const getTypeColor = (type) => {
    switch (type) {
      case "mock":
        return "bg-blue-100 text-blue-800"
      case "certificate":
        return "bg-green-100 text-green-800"
      case "competition":
        return "bg-purple-100 text-purple-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  // 获取状态标签
  const getStatusLabel = (status) => {
    switch (status) {
      case "active":
        return "已上线"
      case "draft":
        return "草稿"
      default:
        return "未知状态"
    }
  }

  // 获取状态颜色
  const getStatusColor = (status) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800"
      case "draft":
        return "bg-amber-100 text-amber-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  // 渲染考试分组
  const renderExamGroup = (title, exams, type) => {
    if (exams.length === 0) return null

    return (
      <div className="mb-6">
        <h2
          className="text-xl font-semibold text-white mb-4 flex items-center justify-between cursor-pointer"
          onClick={() => toggleSection(type)}
        >
          <div className="flex items-center">
            <span className="w-1 h-6 bg-blue-500 rounded mr-2"></span>
            {title}
          </div>
          <ChevronDown
            className={`h-5 w-5 text-gray-400 transition-transform ${
              collapsedSections[type] ? "" : "transform rotate-180"
            }`}
          />
        </h2>

        {!collapsedSections[type] && (
          <div className="space-y-4">
            {exams.map((exam) => (
              <Card key={exam.id} className="bg-gray-800 border-gray-700">
                <div className="flex flex-col md:flex-row">
                  <div className="relative h-32 md:w-48">
                    <Image
                      src={exam.image || "/placeholder.svg"}
                      alt={exam.title}
                      fill
                      style={{ objectFit: "cover" }}
                    />
                    <div className="absolute top-2 left-2">
                      <Badge className={`${getTypeColor(exam.type)}`}>{getTypeLabel(exam.type)}</Badge>
                    </div>
                  </div>
                  <div className="p-4 flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center flex-wrap gap-2">
                        <h3 className="font-semibold text-lg text-white">{exam.title}</h3>
                        {exam.creator === "self" ? (
                          <Badge variant="outline" className="bg-blue-900 text-blue-300 border-blue-700">
                            Prep AI创建
                          </Badge>
                        ) : (
                          <Badge variant="outline" className="bg-purple-900 text-purple-300 border-purple-700">
                            市场添加
                          </Badge>
                        )}
                        {exam.shared && (
                          <Badge variant="outline" className="bg-green-900 text-green-300 border-green-700">
                            已发布
                          </Badge>
                        )}

                        {/* 显示待审核数量 */}
                        {exam.pendingReview > 0 && (
                          <Badge className="bg-red-900 text-red-200">待审核: {exam.pendingReview}</Badge>
                        )}
                      </div>
                      <Badge className={`${getStatusColor(exam.status)}`}>{getStatusLabel(exam.status)}</Badge>
                    </div>
                    <div className="flex flex-wrap gap-x-4 gap-y-2 text-sm text-gray-300 mb-2">
                      <div>创建时间: {exam.created}</div>
                      <div>学员数: {exam.students}</div>
                      <div>价格: {exam.price > 0 ? `¥${exam.price}` : "免费"}</div>
                      <div>分享到市场: {exam.shared ? "是" : "否"}</div>
                    </div>

                    {/* 显示是否需要报名表和照片 */}
                    {(exam.registrationTemplate || exam.requiresPhoto) && (
                      <div className="flex flex-wrap gap-2 mt-2">
                        {exam.registrationTemplate && (
                          <Badge variant="outline" className="bg-blue-900 text-blue-300 border-blue-700">
                            <FileSpreadsheet className="h-3 w-3 mr-1" />
                            报名表
                          </Badge>
                        )}
                        {exam.requiresPhoto && (
                          <Badge variant="outline" className="bg-green-900 text-green-300 border-green-700">
                            <ImageIcon className="h-3 w-3 mr-1" />
                            证件照
                          </Badge>
                        )}
                      </div>
                    )}
                  </div>
                  <div className="p-4 flex items-center justify-center">
                    <div className="flex gap-2">
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Link href={`/management/exams/edit/${exam.id}`}>
                              <Button variant="ghost" size="icon" className="h-9 w-9 rounded-full">
                                <PenLine className="h-5 w-5" />
                              </Button>
                            </Link>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>编辑考试</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>

                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Link href={`/management/exams/students/${exam.id}`}>
                              <Button variant="ghost" size="icon" className="h-9 w-9 rounded-full">
                                <Users className="h-5 w-5" />
                              </Button>
                            </Link>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>管理审核</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>

                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button variant="ghost" size="icon" className="h-9 w-9 rounded-full">
                              <Upload className="h-5 w-5" />
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>上架主页</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>

                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button variant="ghost" size="icon" className="h-9 w-9 rounded-full">
                              <Share2 className="h-5 w-5" />
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>分享到市场</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>

                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-9 w-9 rounded-full text-red-400 hover:text-red-300 hover:bg-red-900/20"
                            >
                              <Trash2 className="h-5 w-5" />
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>删除</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>
    )
  }

  return (
    <div className="container mx-auto p-4 max-w-6xl bg-gray-900 text-gray-100 min-h-screen">
      {/* 顶部导航栏 */}
      <div className="sticky top-0 left-0 right-0 h-14 flex items-center px-4 bg-gray-900/80 backdrop-blur-md border-b border-gray-800 z-20 mb-6">
        <Link href="/management" className="flex items-center text-gray-300">
          <ArrowLeft className="h-5 w-5 mr-2" />
          <span>返回</span>
        </Link>
        <h1 className="flex-1 text-center text-lg font-semibold text-white">考测设置</h1>
      </div>

      {/* 主要内容区域 */}
      <Tabs defaultValue="my-exams" value={activeTab} onValueChange={setActiveTab} className="w-full">
        {/* 将TabsList移到Tabs内部 */}
        <div className="sticky top-14 z-20 bg-gray-900/80 backdrop-blur-md border-b border-gray-800 py-2">
          <TabsList className="grid w-full grid-cols-2 bg-gray-800">
            <TabsTrigger
              value="my-exams"
              className="text-gray-200 data-[state=active]:bg-primary data-[state=active]:text-white"
            >
              我的考测
            </TabsTrigger>
            <TabsTrigger
              value="market"
              className="text-gray-200 data-[state=active]:bg-primary data-[state=active]:text-white"
            >
              考测市场
            </TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="market">
          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <Card key={i} className="animate-pulse bg-gray-800 border-gray-700">
                  <div className="h-40 bg-gray-700 rounded-t-lg"></div>
                  <CardHeader>
                    <div className="h-6 bg-gray-700 rounded w-3/4 mb-2"></div>
                    <div className="h-4 bg-gray-700 rounded w-1/4"></div>
                  </CardHeader>
                  <CardContent>
                    <div className="h-4 bg-gray-700 rounded w-full mb-2"></div>
                    <div className="h-4 bg-gray-700 rounded w-5/6"></div>
                  </CardContent>
                  <CardFooter>
                    <div className="h-9 bg-gray-700 rounded w-full"></div>
                  </CardFooter>
                </Card>
              ))}
            </div>
          ) : (
            <div className="flex">
              {/* Left side - Filter options */}
              <div className="w-48 pr-4 border-r border-gray-700 mr-4">
                <div className="space-y-2">
                  <Button
                    variant={filter === "all" ? "default" : "secondary"}
                    onClick={() => setFilter("all")}
                    className="w-full justify-start"
                  >
                    全部
                  </Button>
                  <Button
                    variant={filter === "mock" ? "default" : "secondary"}
                    onClick={() => setFilter("mock")}
                    className="w-full justify-start"
                  >
                    <FileText className="mr-1 h-4 w-4" />
                    模拟考试
                  </Button>
                  <Button
                    variant={filter === "certificate" ? "default" : "secondary"}
                    onClick={() => setFilter("certificate")}
                    className="w-full justify-start"
                  >
                    <Award className="mr-1 h-4 w-4" />
                    证书考试
                  </Button>
                  <Button
                    variant={filter === "competition" ? "default" : "secondary"}
                    onClick={() => setFilter("competition")}
                    className="w-full justify-start"
                  >
                    <Trophy className="mr-1 h-4 w-4" />
                    竞赛活动
                  </Button>
                </div>

                <div className="mt-6">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                    <Input
                      placeholder="搜索考试名称..."
                      className="pl-10 bg-gray-800 border-gray-700 text-white"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>
                </div>
              </div>

              {/* Right side - Exam cards */}
              <div className="flex-1">
                {filteredMarketExams.length === 0 ? (
                  <div className="text-center py-12">
                    <p className="text-gray-400">没有找到匹配的考试</p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredMarketExams.map((exam) => (
                      <Card key={exam.id} className="overflow-hidden bg-gray-800 border-gray-700">
                        <div className="relative h-40 w-full">
                          <Image
                            src={exam.image || "/placeholder.svg"}
                            alt={exam.title}
                            fill
                            style={{ objectFit: "cover" }}
                          />
                          <div className="absolute top-2 left-2">
                            <Badge className={`${getTypeColor(exam.type)}`}>{getTypeLabel(exam.type)}</Badge>
                          </div>
                        </div>
                        <CardHeader>
                          <CardTitle className="line-clamp-1 text-white">{exam.title}</CardTitle>
                          <CardDescription className="flex items-center text-gray-300">
                            <span className="text-yellow-500 mr-1">★</span>
                            {exam.popularity} 热度
                          </CardDescription>
                        </CardHeader>
                        <CardContent>
                          <p className="text-sm text-gray-300 line-clamp-2">{exam.description}</p>

                          {/* 显示是否需要报名表和照片 */}
                          {(exam.registrationTemplate || exam.requiresPhoto) && (
                            <div className="flex flex-wrap gap-2 mt-3">
                              {exam.registrationTemplate && (
                                <Badge variant="outline" className="bg-blue-900 text-blue-300 border-blue-700">
                                  <FileSpreadsheet className="h-3 w-3 mr-1" />
                                  报名表
                                </Badge>
                              )}
                              {exam.requiresPhoto && (
                                <Badge variant="outline" className="bg-green-900 text-green-300 border-green-700">
                                  <ImageIcon className="h-3 w-3 mr-1" />
                                  证件照
                                </Badge>
                              )}
                            </div>
                          )}

                          {/* 代理价格 - 更加醒目 */}
                          {exam.agentPrice > 0 ? (
                            <div className="mt-3 p-2 bg-amber-900/30 border border-amber-800 rounded-md">
                              <p className="text-center font-medium text-amber-300">代理价: ¥{exam.agentPrice}</p>
                            </div>
                          ) : (
                            <div className="mt-3 p-2 bg-green-900/30 border border-green-800 rounded-md">
                              <p className="text-center font-medium text-green-300">免费</p>
                            </div>
                          )}
                        </CardContent>
                        <CardFooter>
                          <Button
                            variant={exam.added ? "outline" : "default"}
                            className="w-full"
                            onClick={() => toggleExamAddition(exam)}
                          >
                            {exam.added ? (
                              <>
                                <Check className="mr-2 h-4 w-4" />
                                已添加
                              </>
                            ) : (
                              <>
                                <Plus className="mr-2 h-4 w-4" />
                                添加到我的考测
                              </>
                            )}
                          </Button>
                        </CardFooter>
                      </Card>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}
        </TabsContent>

        {/* 我的考测 */}
        <TabsContent value="my-exams">
          {isLoading ? (
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <Card key={i} className="animate-pulse bg-gray-800 border-gray-700">
                  <div className="flex flex-col md:flex-row">
                    <div className="h-32 w-full md:w-48 bg-gray-700 rounded-t-lg md:rounded-l-lg md:rounded-t-none"></div>
                    <div className="p-4 flex-1">
                      <div className="h-6 bg-gray-700 rounded w-3/4 mb-2"></div>
                      <div className="h-4 bg-gray-700 rounded w-1/4 mb-4"></div>
                      <div className="h-4 bg-gray-700 rounded w-full"></div>
                    </div>
                    <div className="p-4 flex flex-col justify-center gap-2">
                      <div className="h-9 bg-gray-700 rounded w-24"></div>
                      <div className="h-9 bg-gray-700 rounded w-24"></div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          ) : (
            <>
              <div className="flex justify-end mb-6">
                <Link href="/management/exams/create">
                  <Button>
                    <Plus className="mr-2 h-4 w-4" />
                    创建考试
                  </Button>
                </Link>
              </div>

              {myExams.length === 0 ? (
                <div className="text-center py-12">
                  <p className="text-gray-400">没有找到考试</p>
                  <Link href="/management/exams/create">
                    <Button className="mt-4">
                      <Plus className="mr-2 h-4 w-4" />
                      创建考试
                    </Button>
                  </Link>
                </div>
              ) : (
                <div>
                  {/* 分组显示考试 */}
                  {renderExamGroup("推荐考试", groupedMyExams.featured, "featured")}
                  {renderExamGroup("模拟考试", groupedMyExams.mock, "mock")}
                  {renderExamGroup("证书考试", groupedMyExams.certificate, "certificate")}
                  {renderExamGroup("赛事活动", groupedMyExams.competition, "competition")}
                </div>
              )}
            </>
          )}
        </TabsContent>
      </Tabs>

      {/* 添加考试对话框 */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-md bg-gray-800 border-gray-700 text-white">
          <DialogHeader>
            <DialogTitle>添加考试到我的考测</DialogTitle>
            <DialogDescription className="text-gray-300">设置此考试在您系统中的销售价格</DialogDescription>
          </DialogHeader>
          {selectedExam && (
            <div className="space-y-4 py-4">
              <div className="flex items-center space-x-2">
                <div className="flex-shrink-0 h-16 w-16 relative">
                  <Image
                    src={selectedExam.image || "/placeholder.svg"}
                    alt={selectedExam.title}
                    fill
                    style={{ objectFit: "cover" }}
                    className="rounded-md"
                  />
                </div>
                <div>
                  <h3 className="font-medium text-white">{selectedExam.title}</h3>
                  <p className="text-sm text-gray-300">代理价: ¥{selectedExam.agentPrice}</p>
                </div>
              </div>

              <div className="bg-blue-900 p-3 rounded-md">
                <p className="text-sm font-medium text-blue-200">建议市场价: ¥{selectedExam.suggestedPrice}</p>
                {selectedExam.priceDescription && (
                  <p className="text-xs text-blue-300 mt-1">{selectedExam.priceDescription}</p>
                )}
              </div>

              <div>
                <Label htmlFor="sales-price" className="text-gray-200">
                  销售价格（元）
                </Label>
                <div className="relative mt-1">
                  <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
                  <Input
                    id="sales-price"
                    type="number"
                    min="0.01"
                    step="0.01"
                    className="pl-10 bg-gray-700 border-gray-600 text-white"
                    placeholder="输入销售价格"
                    value={salesPrice}
                    onChange={(e) => setSalesPrice(e.target.value)}
                  />
                </div>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDialogOpen(false)} className="border-gray-600">
              取消
            </Button>
            <Button onClick={confirmAddExam}>添加</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* 导出数据对话框 */}
      <Dialog open={isExportDialogOpen} onOpenChange={setIsExportDialogOpen}>
        <DialogContent className="sm:max-w-md bg-gray-800 border-gray-700 text-white">
          <DialogHeader>
            <DialogTitle>导出报名数据</DialogTitle>
            <DialogDescription className="text-gray-300">选择导出选项</DialogDescription>
          </DialogHeader>
          {selectedExam && (
            <div className="space-y-4 py-4">
              <div className="flex items-center space-x-2">
                <div className="flex-shrink-0 h-16 w-16 relative">
                  <Image
                    src={selectedExam.image || "/placeholder.svg"}
                    alt={selectedExam.title}
                    fill
                    style={{ objectFit: "cover" }}
                    className="rounded-md"
                  />
                </div>
                <div>
                  <h3 className="font-medium text-white">{selectedExam.title}</h3>
                  <p className="text-sm text-gray-300">
                    {selectedExam.students} 名学员 | {selectedExam.pendingReview} 名待审核
                  </p>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label htmlFor="include-photos" className="text-gray-200">
                    包含证件照
                  </Label>
                  <input
                    type="checkbox"
                    id="include-photos"
                    checked={exportOptions.includePhotos}
                    onChange={(e) => setExportOptions({ ...exportOptions, includePhotos: e.target.checked })}
                    className="h-4 w-4"
                  />
                </div>

                {exportOptions.includePhotos && (
                  <>
                    <div>
                      <Label htmlFor="photo-naming" className="text-gray-200">
                        照片命名方式
                      </Label>
                      <Select
                        value={exportOptions.photoNaming}
                        onValueChange={(value) => setExportOptions({ ...exportOptions, photoNaming: value })}
                      >
                        <SelectTrigger id="photo-naming" className="bg-gray-700 border-gray-600 text-white">
                          <SelectValue placeholder="选择命名方式" />
                        </SelectTrigger>
                        <SelectContent className="bg-gray-800 border-gray-700 text-white">
                          <SelectItem value="name_id">姓名_证件号</SelectItem>
                          <SelectItem value="id_name">证件号_姓名</SelectItem>
                          <SelectItem value="name">仅姓名</SelectItem>
                          <SelectItem value="id">仅证件号</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label htmlFor="photo-size" className="text-gray-200">
                        照片尺寸
                      </Label>
                      <Select
                        value={exportOptions.photoSize}
                        onValueChange={(value) => setExportOptions({ ...exportOptions, photoSize: value })}
                      >
                        <SelectTrigger id="photo-size" className="bg-gray-700 border-gray-600 text-white">
                          <SelectValue placeholder="选择照片尺寸" />
                        </SelectTrigger>
                        <SelectContent className="bg-gray-800 border-gray-700 text-white">
                          <SelectItem value="1inch">1寸（295x413像素）</SelectItem>
                          <SelectItem value="2inch">2寸（413x579像素）</SelectItem>
                          <SelectItem value="original">原始尺寸</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </>
                )}

                <div>
                  <Label className="text-gray-200">导出内容</Label>
                  <div className="mt-2 space-y-2 border border-gray-700 rounded-md p-3">
                    <div className="flex items-center space-x-2">
                      <input type="checkbox" id="export-all" checked={true} className="h-4 w-4" />
                      <Label htmlFor="export-all" className="text-gray-200">
                        所有学员信息
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <input type="checkbox" id="export-passed" checked={false} className="h-4 w-4" />
                      <Label htmlFor="export-passed" className="text-gray-200">
                        仅已审核通过学员
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <input type="checkbox" id="export-certificate" checked={false} className="h-4 w-4" />
                      <Label htmlFor="export-certificate" className="text-gray-200">
                        仅已发证书学员
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <input type="checkbox" id="export-pending" checked={false} className="h-4 w-4" />
                      <Label htmlFor="export-pending" className="text-gray-200">
                        仅待审核学员
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <input type="checkbox" id="export-failed" checked={false} className="h-4 w-4" />
                      <Label htmlFor="export-failed" className="text-gray-200">
                        仅未通过学员
                      </Label>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsExportDialogOpen(false)} className="border-gray-600">
              取消
            </Button>
            <Button onClick={handleExport}>
              <Download className="mr-2 h-4 w-4" />
              导出数据
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* 导入证书对话框 */}
      <Dialog open={isImportDialogOpen} onOpenChange={setIsImportDialogOpen}>
        <DialogContent className="sm:max-w-md bg-gray-800 border-gray-700 text-white">
          <DialogHeader>
            <DialogTitle>导入证书</DialogTitle>
            <DialogDescription className="text-gray-300">批量导入学员电子证书</DialogDescription>
          </DialogHeader>
          {selectedExam && (
            <div className="space-y-4 py-4">
              <div className="flex items-center space-x-2">
                <div className="flex-shrink-0 h-16 w-16 relative">
                  <Image
                    src={selectedExam.image || "/placeholder.svg"}
                    alt={selectedExam.title}
                    fill
                    style={{ objectFit: "cover" }}
                    className="rounded-md"
                  />
                </div>
                <div>
                  <h3 className="font-medium text-white">{selectedExam.title}</h3>
                  <p className="text-sm text-gray-300">{selectedExam.students} 名学员</p>
                </div>
              </div>

              <div className="border-2 border-dashed border-gray-600 rounded-lg p-6 text-center">
                <Upload className="mx-auto h-8 w-8 text-gray-400" />
                <p className="mt-2 text-sm text-gray-300">拖放文件到此处，或</p>
                <label className="mt-2 inline-block">
                  <span className="rounded-md bg-gray-700 px-2.5 py-1 text-sm font-semibold text-white shadow-sm hover:bg-gray-600 cursor-pointer">
                    浏览文件
                  </span>
                  <input type="file" className="sr-only" accept=".zip,.pdf" onChange={handleImportFileChange} />
                </label>
                <p className="mt-2 text-xs text-gray-400">支持ZIP压缩包或PDF文件</p>
              </div>

              {importFile && (
                <div className="bg-green-900 p-4 rounded-md flex items-center justify-between">
                  <div className="flex items-center">
                    <FileText className="h-5 w-5 text-green-400 mr-2" />
                    <div>
                      <p className="text-sm font-medium text-green-200">{importFile.name}</p>
                      <p className="text-xs text-green-300">{Math.round(importFile.size / 1024)} KB</p>
                    </div>
                  </div>
                  <Button variant="ghost" size="sm" onClick={() => setImportFile(null)}>
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              )}

              <div className="bg-blue-900 p-3 rounded-md">
                <p className="text-sm text-blue-200">
                  <Info className="h-4 w-4 inline mr-1" />
                  导入的证书将自动与学员信息匹配，并发送通知给学员。
                </p>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsImportDialogOpen(false)} className="border-gray-600">
              取消
            </Button>
            <Button onClick={handleImport} disabled={!importFile}>
              <Upload className="mr-2 h-4 w-4" />
              导入证书
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
