"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { useRouter } from "next/navigation"
import {
  ArrowLeft,
  Search,
  Settings,
  HelpCircle,
  CheckCircle2,
  Phone,
  Tag,
  BookOpen,
  FileText,
  Users,
  Star,
  Calendar,
  Clock,
  Copy,
  AlertTriangle,
  UserCog,
  Share2,
  Wallet,
  UserPlus,
} from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Skeleton } from "@/components/ui/skeleton"
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"
import { useToast } from "@/components/ui/use-toast"

export default function StudentsManagement() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(true)
  const [activeTab, setActiveTab] = useState("all")
  const [isHelpOpen, setIsHelpOpen] = useState(false)
  const [isSettingsOpen, setIsSettingsOpen] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage, setItemsPerPage] = useState(10)
  const [showSuccessMessage, setShowSuccessMessage] = useState(false)
  const [successMessageText, setSuccessMessageText] = useState("")
  const [searchType, setSearchType] = useState("date")
  const [searchQuery, setSearchQuery] = useState("")
  const [dateRange, setDateRange] = useState({ from: null, to: null })
  const { toast } = useToast()

  // 模拟会员数据
  const studentsData = [
    {
      id: 1,
      userId: "U10086428",
      name: "李小明",
      avatar: "/images/user-avatar.png",
      registerDate: "2025-04-15",
      phone: "13812345678",
      sharerUserId: "U10023456",
      memberLevel: "普通会员",
      memberExpiry: "",
      remainingTimes: 0,
      courseCount: 0,
      examCount: 0,
      shareCount: 0,
      commission: 0,
      group: "客户组",
    },
    {
      id: 2,
      userId: "U10012345",
      name: "王小红",
      avatar: "/images/user-avatar.png",
      registerDate: "2025-04-12",
      phone: "13987654321",
      sharerUserId: "U10023456",
      memberLevel: "年卡会员",
      memberExpiry: "2026-04-12",
      remainingTimes: 0,
      courseCount: 2,
      examCount: 1,
      shareCount: 3,
      commission: 299.5,
      group: "客户组",
    },
    {
      id: 3,
      userId: "U10056789",
      name: "张小华",
      avatar: "/images/user-avatar.png",
      registerDate: "2025-04-10",
      phone: "13567891234",
      sharerUserId: "U10023456",
      memberLevel: "终身会员",
      memberExpiry: "永久",
      remainingTimes: 0,
      courseCount: 5,
      examCount: 3,
      shareCount: 10,
      commission: 899.0,
      group: "初级代理商",
    },
    {
      id: 4,
      userId: "U10090123",
      name: "刘小军",
      avatar: "/images/user-avatar.png",
      registerDate: "2025-04-08",
      phone: "13698765432",
      sharerUserId: "",
      memberLevel: "普通会员",
      memberExpiry: "",
      remainingTimes: 0,
      courseCount: 1,
      examCount: 0,
      shareCount: 0,
      commission: 0,
      group: "客户组",
    },
    {
      id: 5,
      userId: "U10045678",
      name: "赵小燕",
      avatar: "/images/user-avatar.png",
      registerDate: "2025-04-05",
      phone: "13512345678",
      sharerUserId: "U10056789",
      memberLevel: "月卡会员",
      memberExpiry: "2025-05-05",
      remainingTimes: 0,
      courseCount: 2,
      examCount: 1,
      shareCount: 0,
      commission: 0,
      group: "客户组",
    },
    {
      id: 6,
      userId: "U10023456",
      name: "孙小梅",
      avatar: "/images/user-avatar.png",
      registerDate: "2025-04-01",
      phone: "13898765432",
      sharerUserId: "",
      memberLevel: "普通会员",
      memberExpiry: "",
      remainingTimes: 0,
      courseCount: 0,
      examCount: 0,
      shareCount: 5,
      commission: 599.0,
      group: "中级代理商",
    },
    {
      id: 7,
      userId: "U10078901",
      name: "周小伟",
      avatar: "/images/user-avatar.png",
      registerDate: "2025-03-28",
      phone: "13712345678",
      sharerUserId: "U10023456",
      memberLevel: "次卡会员",
      memberExpiry: "",
      remainingTimes: 5,
      courseCount: 1,
      examCount: 0,
      shareCount: 0,
      commission: 0,
      group: "客户组",
    },
    {
      id: 8,
      userId: "U10034567",
      name: "吴小芳",
      avatar: "/images/user-avatar.png",
      registerDate: "2025-03-25",
      phone: "13612345678",
      sharerUserId: "U10056789",
      memberLevel: "普通会员",
      memberExpiry: "",
      remainingTimes: 0,
      courseCount: 1,
      examCount: 0,
      shareCount: 2,
      commission: 199.0,
      group: "高级代理商",
    },
  ]

  // 学员数据
  const [students, setStudents] = useState(studentsData)

  // 模拟加载数据
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1000)
    return () => clearTimeout(timer)
  }, [])

  // 显示成功消息
  const showSuccess = (message) => {
    setSuccessMessageText(message)
    setShowSuccessMessage(true)
    setTimeout(() => setShowSuccessMessage(false), 3000)
  }

  // 获取会员等级样式
  const getMemberLevelStyle = (level) => {
    switch (level) {
      case "终身会员":
        return "bg-amber-900/30 text-amber-400 border border-amber-500/30"
      case "年卡会员":
        return "bg-blue-900/30 text-blue-400 border border-blue-500/30"
      case "月卡会员":
        return "bg-green-900/30 text-green-400 border border-green-500/30"
      case "次卡会员":
        return "bg-purple-900/30 text-purple-400 border border-purple-500/30"
      default:
        return "bg-gray-800 text-gray-400 border border-gray-700"
    }
  }

  // 获取代理商组别样式
  const getGroupStyle = (group) => {
    switch (group) {
      case "高级代理商":
        return "bg-amber-900/30 text-amber-400 border border-amber-500/30"
      case "中级代理商":
        return "bg-blue-900/30 text-blue-400 border border-blue-500/30"
      case "初级代理商":
        return "bg-green-900/30 text-green-400 border border-green-500/30"
      default:
        return "bg-gray-800 text-gray-400 border border-gray-700"
    }
  }

  // 格式化日期
  const formatDate = (dateString) => {
    if (!dateString) return "无"
    if (dateString === "永久") return "永久"
    const date = new Date(dateString)
    return new Intl.DateTimeFormat("zh-CN", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    }).format(date)
  }

  // 复制ID到剪贴板
  const copyToClipboard = (id) => {
    navigator.clipboard.writeText(id)
    toast({
      description: "ID已复制到剪贴板",
      duration: 2000,
    })
  }

  // 更改会员组别
  const changeUserGroup = (userId, newGroup) => {
    setStudents(
      students.map((student) => {
        if (student.userId === userId) {
          return { ...student, group: newGroup }
        }
        return student
      }),
    )
    toast({
      description: `已将用户 ${userId} 移至${newGroup}`,
      duration: 2000,
    })
  }

  // 修改过滤函数，添加代理商类型过滤
  const getFilteredStudentsByType = () => {
    switch (activeTab) {
      case "free":
        return students.filter((student) => student.memberLevel === "普通会员")
      case "paid":
        return students.filter((student) => student.memberLevel !== "普通会员")
      case "junior-agent":
        return students.filter((student) => student.group === "初级代理商")
      case "mid-agent":
        return students.filter((student) => student.group === "中级代理商")
      case "senior-agent":
        return students.filter((student) => student.group === "高级代理商")
      default:
        return students
    }
  }

  const filteredStudents = getFilteredStudentsByType()

  // 分页
  const paginatedStudents = filteredStudents.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)

  const totalPages = Math.ceil(filteredStudents.length / itemsPerPage)

  // 在 getStudentStats 函数中添加代理会员数据计算
  const getStudentStats = () => {
    const totalStudents = students.length
    const paidStudents = students.filter((s) => s.memberLevel !== "普通会员").length
    const agentMembers = students.filter((s) => s.group !== "客户组").length
    const lifetimeMembers = students.filter((s) => s.memberLevel === "终身会员").length
    const annualMembers = students.filter((s) => s.memberLevel === "年卡会员").length
    const monthlyMembers = students.filter((s) => s.memberLevel === "月卡会员").length
    const peruseMembers = students.filter((s) => s.memberLevel === "次卡会员").length

    return {
      totalStudents,
      paidStudents,
      agentMembers,
      lifetimeMembers,
      annualMembers,
      monthlyMembers,
      peruseMembers,
    }
  }

  const stats = getStudentStats()

  return (
    <div className="min-h-screen bg-black text-white pb-20">
      {/* 顶部导航栏 */}
      <div className="sticky top-0 left-0 right-0 h-14 flex items-center px-4 bg-gray-900/80 backdrop-blur-md border-b border-gray-800 z-10">
        <Link href="/management" className="flex items-center text-gray-300">
          <ArrowLeft className="h-5 w-5 mr-2" />
          <span>返回</span>
        </Link>
        <h1 className="flex-1 text-center text-lg font-semibold text-white">会员列表</h1>
        <div className="flex gap-1">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="icon" onClick={() => setIsHelpOpen(true)}>
                  <HelpCircle className="h-5 w-5 text-gray-400" />
                </Button>
              </TooltipTrigger>
              <TooltipContent className="bg-gray-800 text-white border-gray-700">
                <p>帮助</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="icon" onClick={() => setIsSettingsOpen(true)}>
                  <Settings className="h-5 w-5 text-gray-400" />
                </Button>
              </TooltipTrigger>
              <TooltipContent className="bg-gray-800 text-white border-gray-700">
                <p>设置</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </div>

      {/* 成功消息提示 */}
      {showSuccessMessage && (
        <div className="fixed top-16 left-1/2 transform -translate-x-1/2 z-50 bg-green-900/90 text-white px-4 py-2 rounded-md flex items-center shadow-lg border border-green-700">
          <CheckCircle2 className="h-5 w-5 mr-2 text-green-400" />
          <span>{successMessageText}</span>
        </div>
      )}

      <div className="p-4">
        {/* 搜索区域 */}
        <div className="mb-6">
          <Select value={searchType} onValueChange={setSearchType} className="mb-3">
            <SelectTrigger className="w-full bg-gray-900 border-gray-700 text-white">
              <SelectValue placeholder="搜索方式" />
            </SelectTrigger>
            <SelectContent className="bg-gray-900 border-gray-700 text-white">
              <SelectItem value="date">按注册时间搜索</SelectItem>
              <SelectItem value="userId">按用户ID搜索</SelectItem>
            </SelectContent>
          </Select>

          {searchType === "date" ? (
            <div className="mb-3">
              <div className="flex gap-3">
                <div className="flex-1">
                  <Label className="text-sm text-gray-400 mb-1 block">开始日期</Label>
                  <Input
                    type="date"
                    className="bg-gray-900 border-gray-700 text-white"
                    onChange={(e) => setDateRange({ ...dateRange, from: e.target.value })}
                  />
                </div>
                <div className="flex-1">
                  <Label className="text-sm text-gray-400 mb-1 block">结束日期</Label>
                  <Input
                    type="date"
                    className="bg-gray-900 border-gray-700 text-white"
                    onChange={(e) => setDateRange({ ...dateRange, to: e.target.value })}
                  />
                </div>
              </div>
            </div>
          ) : (
            <div className="relative mb-3">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 h-4 w-4" />
              <Input
                placeholder="输入用户ID码..."
                className="pl-9 bg-gray-900 border-gray-700 text-white placeholder:text-gray-500 focus-visible:ring-blue-500"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          )}

          <Button size="sm" className="w-full bg-blue-600 hover:bg-blue-700">
            搜索
          </Button>
        </div>

        {/* 会员统计卡片 */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          <Card className="bg-gray-900 border-gray-800">
            <CardContent className="p-4">
              <div className="flex justify-between items-center mb-2">
                <h3 className="text-sm font-medium text-gray-400">注册会员</h3>
                <Users className="h-5 w-5 text-blue-400" />
              </div>
              <div className="flex items-end justify-between">
                <div>
                  <p className="text-2xl font-bold text-white">{stats.totalStudents}</p>
                  <div className="flex items-center text-xs">
                    <span className="text-green-400 mr-1">+{Math.floor(stats.totalStudents * 0.05)}</span>
                    <span className="text-gray-500">本月</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gray-900 border-gray-800">
            <CardContent className="p-4">
              <div className="flex justify-between items-center mb-2">
                <h3 className="text-sm font-medium text-gray-400">付费会员</h3>
                <Star className="h-5 w-5 text-yellow-400" />
              </div>
              <div className="flex items-end justify-between">
                <div>
                  <p className="text-2xl font-bold text-white">{stats.paidStudents}</p>
                  <div className="flex items-center text-xs">
                    <span className="text-gray-500">
                      付费会员占比: {((stats.paidStudents / stats.totalStudents) * 100).toFixed(1)}%
                    </span>
                  </div>
                </div>
                <div className="text-right text-xs text-gray-500">
                  <div>
                    终身: <span className="text-amber-400">{stats.lifetimeMembers}</span>
                  </div>
                  <div>
                    年卡: <span className="text-blue-400">{stats.annualMembers}</span>
                  </div>
                  <div>
                    月卡: <span className="text-green-400">{stats.monthlyMembers}</span>
                  </div>
                  <div>
                    次卡: <span className="text-purple-400">{stats.peruseMembers}</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gray-900 border-gray-800">
            <CardContent className="p-4">
              <div className="flex justify-between items-center mb-2">
                <h3 className="text-sm font-medium text-gray-400">代理会员</h3>
                <UserPlus className="h-5 w-5 text-cyan-400" />
              </div>
              <div className="flex items-end justify-between">
                <div>
                  <p className="text-2xl font-bold text-white">{stats.agentMembers}</p>
                  <div className="flex items-center text-xs">
                    <span className="text-gray-500">
                      代理会员占比: {((stats.agentMembers / stats.totalStudents) * 100).toFixed(1)}%
                    </span>
                  </div>
                </div>
                <div className="text-right text-xs text-gray-500">
                  <div>
                    高级:{" "}
                    <span className="text-amber-400">{students.filter((s) => s.group === "高级代理商").length}</span>
                  </div>
                  <div>
                    中级:{" "}
                    <span className="text-blue-400">{students.filter((s) => s.group === "中级代理商").length}</span>
                  </div>
                  <div>
                    初级:{" "}
                    <span className="text-green-400">{students.filter((s) => s.group === "初级代理商").length}</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* 会员类型标签页 */}
        {/* 会员列表 - 左右结构设计 */}
        <div className="flex gap-4">
          {/* 左侧菜单 */}
          <div className="w-1/4">
            <Card className="bg-gray-900 border-gray-800">
              <CardContent className="p-0">
                <div className="flex flex-col">
                  <button
                    onClick={() => setActiveTab("all")}
                    className={`text-left px-4 py-3 ${activeTab === "all" ? "bg-gray-800 text-blue-400" : "text-gray-300"}`}
                  >
                    全部
                  </button>
                  <button
                    onClick={() => setActiveTab("paid")}
                    className={`text-left px-4 py-3 ${activeTab === "paid" ? "bg-gray-800 text-yellow-400" : "text-gray-300"}`}
                  >
                    付费会员
                  </button>
                  <button
                    onClick={() => setActiveTab("junior-agent")}
                    className={`text-left px-4 py-3 ${activeTab === "junior-agent" ? "bg-gray-800 text-green-400" : "text-gray-300"}`}
                  >
                    初级代理
                  </button>
                  <button
                    onClick={() => setActiveTab("mid-agent")}
                    className={`text-left px-4 py-3 ${activeTab === "mid-agent" ? "bg-gray-800 text-blue-400" : "text-gray-300"}`}
                  >
                    中级代理
                  </button>
                  <button
                    onClick={() => setActiveTab("senior-agent")}
                    className={`text-left px-4 py-3 ${activeTab === "senior-agent" ? "bg-gray-800 text-amber-400" : "text-gray-300"}`}
                  >
                    高级代理
                  </button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* 右侧内容 */}
          <div className="w-3/4">
            {isLoading ? (
              // 加载状态
              <div className="space-y-4">
                {Array(5)
                  .fill(0)
                  .map((_, i) => (
                    <Card key={i} className="bg-gray-900 border-gray-800">
                      <CardContent className="p-4">
                        <div className="flex items-center">
                          <Skeleton className="h-10 w-10 rounded-full mr-3" />
                          <div className="flex-1">
                            <Skeleton className="h-5 w-32 mb-2" />
                            <Skeleton className="h-4 w-48" />
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
              </div>
            ) : filteredStudents.length === 0 ? (
              // 无数据状态
              <div className="text-center py-12 bg-gray-900 rounded-lg border border-gray-800">
                <AlertTriangle className="h-12 w-12 text-yellow-500/70 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-white mb-2">没有找到匹配的会员</h3>
                <p className="text-gray-400 mb-4">尝试调整筛选条件或搜索关键词</p>
              </div>
            ) : (
              // 数据渲染 - 移动端卡片式布局
              <div className="space-y-3">
                {paginatedStudents.map((student) => (
                  <Card key={student.id} className="bg-gray-900 border-gray-800">
                    <CardContent className="p-3">
                      {/* 会员基本信息 */}
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center">
                          <div className="relative h-10 w-10 rounded-full overflow-hidden mr-3">
                            <Image
                              src={student.avatar || "/placeholder.svg"}
                              alt={student.name}
                              fill
                              className="object-cover"
                            />
                          </div>
                          <div>
                            <div className="font-medium text-white">{student.name}</div>
                            <div className="flex items-center text-xs text-gray-400">
                              <span className="mr-1">ID:</span>
                              <span className="text-blue-400">{student.userId}</span>
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-4 w-4 ml-1 p-0 hover:bg-transparent"
                                onClick={() => copyToClipboard(student.userId)}
                              >
                                <Copy className="h-3 w-3 text-gray-500" />
                              </Button>
                            </div>
                          </div>
                        </div>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8 rounded-full bg-gray-800 hover:bg-gray-700"
                            >
                              <UserCog className="h-4 w-4 text-gray-400" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end" className="bg-gray-900 border-gray-700 text-white">
                            <DropdownMenuItem
                              className="cursor-pointer"
                              onClick={() => changeUserGroup(student.userId, "客户组")}
                            >
                              移至客户组
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              className="cursor-pointer"
                              onClick={() => changeUserGroup(student.userId, "初级代理商")}
                            >
                              移至初级代理商
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              className="cursor-pointer"
                              onClick={() => changeUserGroup(student.userId, "中级代理商")}
                            >
                              移至中级代理商
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              className="cursor-pointer"
                              onClick={() => changeUserGroup(student.userId, "高级代理商")}
                            >
                              移至高级代理商
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>

                      {/* 会员状态和标签 */}
                      <div className="flex flex-wrap gap-2 mb-3">
                        <Badge className={getMemberLevelStyle(student.memberLevel)}>{student.memberLevel}</Badge>
                        <Badge className={getGroupStyle(student.group)}>{student.group}</Badge>
                      </div>

                      {/* 会员详细信息 - 移动端友好布局 */}
                      <div className="grid grid-cols-2 gap-2 text-xs">
                        <div className="space-y-1">
                          <div className="flex items-center text-gray-400">
                            <Phone className="h-3 w-3 mr-1" />
                            {student.phone}
                          </div>
                          <div className="flex items-center text-gray-400">
                            <Calendar className="h-3 w-3 mr-1" />
                            {formatDate(student.registerDate)}
                          </div>
                          {student.memberExpiry && (
                            <div className="flex items-center text-gray-400">
                              <Clock className="h-3 w-3 mr-1" />
                              到期: {student.memberExpiry}
                            </div>
                          )}
                          {student.remainingTimes > 0 && (
                            <div className="flex items-center text-gray-400">
                              <Clock className="h-3 w-3 mr-1" />
                              剩余: {student.remainingTimes}次
                            </div>
                          )}
                        </div>
                        <div className="space-y-1">
                          <div className="flex items-center text-gray-400">
                            <BookOpen className="h-3 w-3 mr-1" />
                            课程: {student.courseCount} 个
                          </div>
                          <div className="flex items-center text-gray-400">
                            <FileText className="h-3 w-3 mr-1" />
                            考试: {student.examCount} 个
                          </div>
                          <div className="flex items-center text-gray-400">
                            <Share2 className="h-3 w-3 mr-1" />
                            分享: {student.shareCount} 个
                          </div>
                          <div className="flex items-center text-gray-400">
                            <Wallet className="h-3 w-3 mr-1" />
                            分佣: ¥{student.commission.toFixed(2)}
                          </div>
                        </div>
                      </div>

                      {/* 分享人信息 */}
                      {student.sharerUserId && (
                        <div className="mt-2 pt-2 border-t border-gray-800">
                          <div className="flex items-center text-xs text-gray-400">
                            <Tag className="h-3 w-3 mr-1" />
                            分享人:
                            <span className="text-blue-400 ml-1">{student.sharerUserId}</span>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-4 w-4 ml-1 p-0 hover:bg-transparent"
                              onClick={() => copyToClipboard(student.sharerUserId)}
                            >
                              <Copy className="h-3 w-3 text-gray-500" />
                            </Button>
                          </div>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                ))}

                {/* 分页 - 移动端优化 */}
                <div className="mt-4 flex flex-col items-center gap-3">
                  <div className="text-sm text-gray-400 text-center">
                    显示 {(currentPage - 1) * itemsPerPage + 1} -{" "}
                    {Math.min(currentPage * itemsPerPage, filteredStudents.length)} 条， 共 {filteredStudents.length} 条
                  </div>

                  <div className="flex items-center gap-2">
                    <Select
                      value={itemsPerPage.toString()}
                      onValueChange={(value) => {
                        setItemsPerPage(Number(value))
                        setCurrentPage(1)
                      }}
                    >
                      <SelectTrigger className="w-[80px] bg-gray-800 border-gray-700 text-white h-8">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="bg-gray-900 border-gray-700 text-white">
                        <SelectItem value="5">5条</SelectItem>
                        <SelectItem value="10">10条</SelectItem>
                        <SelectItem value="20">20条</SelectItem>
                        <SelectItem value="50">50条</SelectItem>
                      </SelectContent>
                    </Select>

                    <Pagination>
                      <PaginationContent>
                        <PaginationItem>
                          <PaginationPrevious
                            href="#"
                            onClick={(e) => {
                              e.preventDefault()
                              if (currentPage > 1) setCurrentPage(currentPage - 1)
                            }}
                            className={currentPage === 1 ? "pointer-events-none opacity-50" : ""}
                          />
                        </PaginationItem>

                        {totalPages <= 5 ? (
                          // 如果总页数小于等于5，显示所有页码
                          Array.from({ length: totalPages }).map((_, i) => (
                            <PaginationItem key={i + 1}>
                              <PaginationLink
                                href="#"
                                onClick={(e) => {
                                  e.preventDefault()
                                  setCurrentPage(i + 1)
                                }}
                                isActive={currentPage === i + 1}
                              >
                                {i + 1}
                              </PaginationLink>
                            </PaginationItem>
                          ))
                        ) : (
                          // 如果总页数大于5，显示当前页附近的页码
                          <>
                            <PaginationItem>
                              <PaginationLink
                                href="#"
                                onClick={(e) => {
                                  e.preventDefault()
                                  setCurrentPage(1)
                                }}
                                isActive={currentPage === 1}
                              >
                                1
                              </PaginationLink>
                            </PaginationItem>

                            {currentPage > 3 && (
                              <PaginationItem>
                                <PaginationEllipsis />
                              </PaginationItem>
                            )}

                            {currentPage > 2 && (
                              <PaginationItem>
                                <PaginationLink
                                  href="#"
                                  onClick={(e) => {
                                    e.preventDefault()
                                    setCurrentPage(currentPage - 1)
                                  }}
                                >
                                  {currentPage - 1}
                                </PaginationLink>
                              </PaginationItem>
                            )}

                            {currentPage !== 1 && currentPage !== totalPages && (
                              <PaginationItem>
                                <PaginationLink
                                  href="#"
                                  onClick={(e) => {
                                    e.preventDefault()
                                    setCurrentPage(currentPage)
                                  }}
                                  isActive
                                >
                                  {currentPage}
                                </PaginationLink>
                              </PaginationItem>
                            )}

                            {currentPage < totalPages - 1 && (
                              <PaginationItem>
                                <PaginationLink
                                  href="#"
                                  onClick={(e) => {
                                    e.preventDefault()
                                    setCurrentPage(currentPage + 1)
                                  }}
                                >
                                  {currentPage + 1}
                                </PaginationLink>
                              </PaginationItem>
                            )}

                            {currentPage < totalPages - 2 && (
                              <PaginationItem>
                                <PaginationEllipsis />
                              </PaginationItem>
                            )}

                            <PaginationItem>
                              <PaginationLink
                                href="#"
                                onClick={(e) => {
                                  e.preventDefault()
                                  setCurrentPage(totalPages)
                                }}
                                isActive={currentPage === totalPages}
                              >
                                {totalPages}
                              </PaginationLink>
                            </PaginationItem>
                          </>
                        )}

                        <PaginationItem>
                          <PaginationNext
                            href="#"
                            onClick={(e) => {
                              e.preventDefault()
                              if (currentPage < totalPages) setCurrentPage(currentPage + 1)
                            }}
                            className={currentPage === totalPages ? "pointer-events-none opacity-50" : ""}
                          />
                        </PaginationItem>
                      </PaginationContent>
                    </Pagination>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* 帮助对话框 */}
      <Dialog open={isHelpOpen} onOpenChange={setIsHelpOpen}>
        <DialogContent className="bg-gray-900 border-gray-800 text-white max-w-md">
          <DialogHeader>
            <DialogTitle>帮助</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <p className="text-gray-400">这里是帮助信息，你可以查看如何使用会员管理功能。</p>
            <ul className="list-disc list-inside text-gray-400">
              <li>如何筛选会员</li>
              <li>如何更改会员组别</li>
              <li>如何复制会员ID</li>
            </ul>
          </div>
          <div className="mt-4 flex justify-end">
            <Button variant="ghost" onClick={() => setIsHelpOpen(false)}>
              关闭
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* 设置对话框 */}
      <Dialog open={isSettingsOpen} onOpenChange={setIsSettingsOpen}>
        <DialogContent className="bg-gray-900 border-gray-800 text-white max-w-md">
          <DialogHeader>
            <DialogTitle>设置</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label htmlFor="defaultItemsPerPage" className="text-sm text-gray-400 mb-1 block">
                默认每页显示数量
              </Label>
              <Select value={itemsPerPage.toString()} onValueChange={(value) => setItemsPerPage(Number(value))}>
                <SelectTrigger className="bg-gray-800 border-gray-700 text-white">
                  <SelectValue placeholder="选择显示数量" />
                </SelectTrigger>
                <SelectContent className="bg-gray-900 border-gray-700 text-white">
                  <SelectItem value="5">5</SelectItem>
                  <SelectItem value="10">10</SelectItem>
                  <SelectItem value="20">20</SelectItem>
                  <SelectItem value="50">50</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="mt-4 flex justify-end gap-2">
            <Button variant="ghost" onClick={() => setIsSettingsOpen(false)}>
              取消
            </Button>
            <Button onClick={() => setIsSettingsOpen(false)}>保存</Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
