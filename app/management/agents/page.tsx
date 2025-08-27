"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import {
  Search,
  Filter,
  Download,
  Settings,
  FileText,
  CheckCircle2,
  ArrowUpDown,
  FileSpreadsheet,
  HelpCircle,
  UserPlus,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Separator } from "@/components/ui/separator"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Checkbox } from "@/components/ui/checkbox"
import { Table, TableHead, TableHeader, TableRow, TableBody, TableCell } from "@/components/ui/table"

export default function AgentsManagement() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState("")
  const [activeTab, setActiveTab] = useState("all")
  const [sortOption, setSortOption] = useState("performance")
  const [isFilterOpen, setIsFilterOpen] = useState(false)
  const [isHelpOpen, setIsHelpOpen] = useState(false)
  const [isSettingsOpen, setIsSettingsOpen] = useState(false)
  const [isAddAgentOpen, setIsAddAgentOpen] = useState(false)
  const [isAgentDetailOpen, setIsAgentDetailOpen] = useState(false)
  const [selectedAgent, setSelectedAgent] = useState(null)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [agentToDelete, setAgentToDelete] = useState(null)
  const [isCommissionSettingOpen, setIsCommissionSettingOpen] = useState(false)
  const [isShareLinkOpen, setIsShareLinkOpen] = useState(false)
  const [isSendMessageOpen, setIsSendMessageOpen] = useState(false)
  const [selectedAgents, setSelectedAgents] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage, setItemsPerPage] = useState(10)
  const [showSuccessMessage, setShowSuccessMessage] = useState(false)
  const [successMessageText, setSuccessMessageText] = useState("")
  const [filters, setFilters] = useState({
    status: "all", // all, active, inactive, pending
    level: "all", // all, level1, level2, level3
    performance: "all", // all, excellent, good, average, poor
    joinDate: "all", // all, today, week, month, year
  })
  const [settings, setSettings] = useState({
    defaultSortOption: "performance",
    defaultItemsPerPage: 10,
    enableAutoApproval: false,
    requireVerification: true,
    minimumWithdrawalAmount: 100,
    withdrawalProcessingDays: 3,
    defaultCommissionRates: {
      level1: 15,
      level2: 10,
      level3: 5,
    },
  })
  const [newAgent, setNewAgent] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    level: "level1",
    notes: "",
  })
  const [messageContent, setMessageContent] = useState("")
  const [commissionSettings, setCommissionSettings] = useState({
    courseCommission: 15,
    examCommission: 10,
    membershipCommission: 20,
    secondaryAgentCommission: 5,
    minimumWithdrawal: 100,
    processingDays: 3,
  })

  // 代理数据
  const [agents, setAgents] = useState([
    {
      id: 1,
      name: "张明",
      avatar: "/images/user-avatar.png",
      email: "zhangming@example.com",
      phone: "13812345678",
      company: "明亮教育科技",
      status: "active",
      level: "level3",
      joinDate: "2023-01-15T10:30:00Z",
      lastActive: "2023-12-28T15:45:00Z",
      totalRevenue: 25680,
      totalCommission: 3852,
      pendingCommission: 580,
      withdrawnCommission: 3272,
      studentsCount: 48,
      conversionRate: 32,
      performance: "excellent",
      commissionRates: {
        course: 15,
        exam: 10,
        membership: 20,
      },
      notes: "资深教育行业从业者，业绩优秀",
      verificationStatus: "verified",
      referralCode: "ZHANG001",
      referralLink: "https://prepal.com/ref/ZHANG001",
      subAgents: 3,
    },
    {
      id: 2,
      name: "李华",
      avatar: "/images/user-avatar.png",
      email: "lihua@example.com",
      phone: "13987654321",
      company: "华创教育咨询",
      status: "active",
      level: "level2",
      joinDate: "2023-02-20T14:15:00Z",
      lastActive: "2023-12-26T09:20:00Z",
      totalRevenue: 12450,
      totalCommission: 1245,
      pendingCommission: 245,
      withdrawnCommission: 1000,
      studentsCount: 23,
      conversionRate: 28,
      performance: "good",
      commissionRates: {
        course: 10,
        exam: 8,
        membership: 15,
      },
      notes: "专注于职业教育领域",
      verificationStatus: "verified",
      referralCode: "LI002",
      referralLink: "https://prepal.com/ref/LI002",
      subAgents: 1,
    },
    {
      id: 3,
      name: "王芳",
      avatar: "/images/user-avatar.png",
      email: "wangfang@example.com",
      phone: "13567891234",
      company: "芳华教育",
      status: "inactive",
      level: "level1",
      joinDate: "2023-03-05T11:45:00Z",
      lastActive: "2023-09-15T16:30:00Z",
      totalRevenue: 3200,
      totalCommission: 320,
      pendingCommission: 0,
      withdrawnCommission: 320,
      studentsCount: 8,
      conversionRate: 15,
      performance: "average",
      commissionRates: {
        course: 10,
        exam: 8,
        membership: 12,
      },
      notes: "近期活跃度较低",
      verificationStatus: "verified",
      referralCode: "WANG003",
      referralLink: "https://prepal.com/ref/WANG003",
      subAgents: 0,
    },
    {
      id: 4,
      name: "赵伟",
      avatar: "/images/user-avatar.png",
      email: "zhaowei@example.com",
      phone: "13698765432",
      company: "伟业培训中心",
      status: "active",
      level: "level3",
      joinDate: "2023-01-10T09:00:00Z",
      lastActive: "2023-12-27T20:15:00Z",
      totalRevenue: 31500,
      totalCommission: 4725,
      pendingCommission: 725,
      withdrawnCommission: 4000,
      studentsCount: 56,
      conversionRate: 35,
      performance: "excellent",
      commissionRates: {
        course: 15,
        exam: 10,
        membership: 20,
      },
      notes: "我们的顶级代理商，业绩持续增长",
      verificationStatus: "verified",
      referralCode: "ZHAO004",
      referralLink: "https://prepal.com/ref/ZHAO004",
      subAgents: 5,
    },
    {
      id: 5,
      name: "刘洋",
      avatar: "/images/user-avatar.png",
      email: "liuyang@example.com",
      phone: "13512345678",
      company: "",
      status: "pending",
      level: "level1",
      joinDate: "2023-12-15T13:20:00Z",
      lastActive: "2023-12-15T13:20:00Z",
      totalRevenue: 0,
      totalCommission: 0,
      pendingCommission: 0,
      withdrawnCommission: 0,
      studentsCount: 0,
      conversionRate: 0,
      performance: "new",
      commissionRates: {
        course: 10,
        exam: 8,
        membership: 12,
      },
      notes: "新申请的代理商，等待审核",
      verificationStatus: "pending",
      referralCode: "LIU005",
      referralLink: "https://prepal.com/ref/LIU005",
      subAgents: 0,
    },
    {
      id: 6,
      name: "陈静",
      avatar: "/images/user-avatar.png",
      email: "chenjing@example.com",
      phone: "13898765432",
      company: "静雅教育",
      status: "active",
      level: "level2",
      joinDate: "2023-04-10T15:30:00Z",
      lastActive: "2023-12-25T14:20:00Z",
      totalRevenue: 18750,
      totalCommission: 1875,
      pendingCommission: 375,
      withdrawnCommission: 1500,
      studentsCount: 32,
      conversionRate: 30,
      performance: "good",
      commissionRates: {
        course: 10,
        exam: 8,
        membership: 15,
      },
      notes: "专注于青少年教育市场",
      verificationStatus: "verified",
      referralCode: "CHEN006",
      referralLink: "https://prepal.com/ref/CHEN006",
      subAgents: 2,
    },
    {
      id: 7,
      name: "杨帆",
      avatar: "/images/user-avatar.png",
      email: "yangfan@example.com",
      phone: "13712345678",
      company: "帆扬教育",
      status: "active",
      level: "level1",
      joinDate: "2023-06-20T10:15:00Z",
      lastActive: "2023-12-20T11:30:00Z",
      totalRevenue: 5800,
      totalCommission: 580,
      pendingCommission: 180,
      withdrawnCommission: 400,
      studentsCount: 12,
      conversionRate: 22,
      performance: "average",
      commissionRates: {
        course: 10,
        exam: 8,
        membership: 12,
      },
      notes: "新兴代理商，有潜力",
      verificationStatus: "verified",
      referralCode: "YANG007",
      referralLink: "https://prepal.com/ref/YANG007",
      subAgents: 0,
    },
    {
      id: 8,
      name: "周娜",
      avatar: "/images/user-avatar.png",
      email: "zhouna@example.com",
      phone: "13687654321",
      company: "娜塔教育",
      status: "active",
      level: "level2",
      joinDate: "2023-05-12T08:45:00Z",
      lastActive: "2023-12-29T18:00:00Z",
      totalRevenue: 15200,
      totalCommission: 1520,
      pendingCommission: 320,
      withdrawnCommission: 1200,
      studentsCount: 28,
      conversionRate: 29,
      performance: "good",
      commissionRates: {
        course: 10,
        exam: 8,
        membership: 15,
      },
      notes: "擅长线上推广",
      verificationStatus: "verified",
      referralCode: "ZHOU008",
      referralLink: "https://prepal.com/ref/ZHOU008",
      subAgents: 1,
    },
    {
      id: 9,
      name: "吴刚",
      avatar: "/images/user-avatar.png",
      email: "wugang@example.com",
      phone: "13923456789",
      company: "刚强教育",
      status: "inactive",
      level: "level1",
      joinDate: "2023-07-01T16:00:00Z",
      lastActive: "2023-10-05T12:45:00Z",
      totalRevenue: 2100,
      totalCommission: 210,
      pendingCommission: 0,
      withdrawnCommission: 210,
      studentsCount: 5,
      conversionRate: 10,
      performance: "poor",
      commissionRates: {
        course: 10,
        exam: 8,
        membership: 12,
      },
      notes: "需要进一步指导",
      verificationStatus: "verified",
      referralCode: "WU009",
      referralLink: "https://prepal.com/ref/WU009",
      subAgents: 0,
    },
    {
      id: 10,
      name: "郑秀兰",
      avatar: "/images/user-avatar.png",
      email: "zhengxiulan@example.com",
      phone: "13798765432",
      company: "秀兰教育",
      status: "active",
      level: "level3",
      joinDate: "2023-02-28T09:30:00Z",
      lastActive: "2023-12-22T17:10:00Z",
      totalRevenue: 28900,
      totalCommission: 4335,
      pendingCommission: 635,
      withdrawnCommission: 3700,
      studentsCount: 52,
      conversionRate: 33,
      performance: "excellent",
      commissionRates: {
        course: 15,
        exam: 10,
        membership: 20,
      },
      notes: "业绩稳定，客户满意度高",
      verificationStatus: "verified",
      referralCode: "ZHENG010",
      referralLink: "https://prepal.com/ref/ZHENG010",
      subAgents: 4,
    },
  ])

  useEffect(() => {
    // 模拟数据加载
    setTimeout(() => {
      setIsLoading(false)
    }, 500)
  }, [])

  // 格式化日期
  const formatDate = (dateString) => {
    const date = new Date(dateString)
    const year = date.getFullYear()
    const month = String(date.getMonth() + 1).padStart(2, "0")
    const day = String(date.getDate()).padStart(2, "0")
    return `${year}-${month}-${day}`
  }

  // 筛选代理
  const filteredAgents = agents.filter((agent) => {
    const statusFilter = filters.status === "all" || agent.status === filters.status
    const levelFilter = filters.level === "all" || agent.level === filters.level
    const performanceFilter = filters.performance === "all" || agent.performance === filters.performance
    const joinDateFilter =
      filters.joinDate === "all" ||
      (filters.joinDate === "today" && formatDate(agent.joinDate) === formatDate(new Date())) ||
      (filters.joinDate === "week" && isWithinLastWeek(agent.joinDate)) ||
      (filters.joinDate === "month" && isWithinLastMonth(agent.joinDate)) ||
      (filters.joinDate === "year" && isWithinLastYear(agent.joinDate))

    const searchFilter =
      agent.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      agent.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      agent.phone.toLowerCase().includes(searchQuery.toLowerCase()) ||
      agent.company.toLowerCase().includes(searchQuery.toLowerCase())

    return statusFilter && levelFilter && performanceFilter && joinDateFilter && searchFilter
  })

  // 判断日期是否在最近一周内
  const isWithinLastWeek = (dateString) => {
    const date = new Date(dateString)
    const today = new Date()
    const lastWeek = new Date(today.setDate(today.getDate() - 7))
    return date >= lastWeek && date <= new Date()
  }

  // 判断日期是否在最近一月内
  const isWithinLastMonth = (dateString) => {
    const date = new Date(dateString)
    const today = new Date()
    const lastMonth = new Date(today.setMonth(today.getMonth() - 1))
    return date >= lastMonth && date <= new Date()
  }

  // 判断日期是否在最近一年内
  const isWithinLastYear = (dateString) => {
    const date = new Date(dateString)
    const today = new Date()
    const lastYear = new Date(today.setFullYear(today.getFullYear() - 1))
    return date >= lastYear && date <= new Date()
  }

  // 排序代理
  const sortedAgents = [...filteredAgents].sort((a, b) => {
    if (sortOption === "name") {
      return a.name.localeCompare(b.name)
    } else if (sortOption === "joinDate") {
      return new Date(a.joinDate).getTime() - new Date(b.joinDate).getTime()
    } else if (sortOption === "performance") {
      const performanceOrder = { excellent: 4, good: 3, average: 2, poor: 1, new: 0 }
      return performanceOrder[b.performance] - performanceOrder[a.performance]
    } else if (sortOption === "revenue") {
      return b.totalRevenue - a.totalRevenue
    } else if (sortOption === "commission") {
      return b.totalCommission - a.totalCommission
    }
    return 0
  })

  // 分页代理
  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const paginatedAgents = sortedAgents.slice(startIndex, endIndex)

  // 处理搜索
  const handleSearch = (e) => {
    setSearchQuery(e.target.value)
    setCurrentPage(1) // Reset to the first page when searching
  }

  // 处理标签切换
  const handleTabChange = (tab) => {
    setActiveTab(tab)
    setCurrentPage(1) // Reset to the first page when changing tabs
  }

  // 处理排序选项更改
  const handleSortOptionChange = (option) => {
    setSortOption(option)
    setCurrentPage(1) // Reset to the first page when sorting
  }

  // 处理筛选器更改
  const handleFilterChange = (filterType, value) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      [filterType]: value,
    }))
    setCurrentPage(1) // Reset to the first page when filtering
  }

  // 处理每页显示数量更改
  const handleItemsPerPageChange = (e) => {
    const newItemsPerPage = Number.parseInt(e.target.value, 10)
    setItemsPerPage(newItemsPerPage)
    setCurrentPage(1) // Reset to the first page when items per page changes
  }

  // 处理设置更改
  const handleSettingsChange = (settingType, value) => {
    setSettings((prevSettings) => ({
      ...prevSettings,
      [settingType]: value,
    }))
  }

  // 处理添加代理
  const handleAddAgent = () => {
    // 在这里处理添加代理的逻辑
    console.log("添加代理", newAgent)
    // 添加成功后显示成功消息
    setSuccessMessageText("代理添加成功！")
    setShowSuccessMessage(true)
    // 关闭对话框
    setIsAddAgentOpen(false)
    // 清空表单
    setNewAgent({
      name: "",
      email: "",
      phone: "",
      company: "",
      level: "level1",
      notes: "",
    })
    // 自动关闭成功消息
    setTimeout(() => {
      setShowSuccessMessage(false)
    }, 3000)
  }

  // 处理删除代理
  const handleDeleteAgent = () => {
    if (agentToDelete) {
      // 在这里处理删除代理的逻辑
      console.log("删除代理", agentToDelete)
      // 删除成功后显示成功消息
      setSuccessMessageText("代理删除成功！")
      setShowSuccessMessage(true)
      // 关闭对话框
      setIsDeleteDialogOpen(false)
      // 清空要删除的代理
      setAgentToDelete(null)
      // 自动关闭成功消息
      setTimeout(() => {
        setShowSuccessMessage(false)
      }, 3000)
    }
  }

  // 处理批量删除代理
  const handleBatchDeleteAgents = () => {
    if (selectedAgents.length > 0) {
      // 在这里处理批量删除代理的逻辑
      console.log("批量删除代理", selectedAgents)
      // 删除成功后显示成功消息
      setSuccessMessageText("代理批量删除成功！")
      setShowSuccessMessage(true)
      // 清空选中的代理
      setSelectedAgents([])
      // 自动关闭成功消息
      setTimeout(() => {
        setShowSuccessMessage(false)
      }, 3000)
    }
  }

  // 处理发送消息
  const handleSendMessage = () => {
    if (selectedAgents.length > 0) {
      // 在这里处理发送消息的逻辑
      console.log("发送消息给", selectedAgents, "消息内容：", messageContent)
      // 发送成功后显示成功消息
      setSuccessMessageText("消息发送成功！")
      setShowSuccessMessage(true)
      // 关闭对话框
      setIsSendMessageOpen(false)
      // 清空选中的代理
      setSelectedAgents([])
      // 清空消息内容
      setMessageContent("")
      // 自动关闭成功消息
      setTimeout(() => {
        setShowSuccessMessage(false)
      }, 3000)
    }
  }

  // 处理佣金设置更改
  const handleCommissionSettingChange = (settingType, value) => {
    setCommissionSettings((prevSettings) => ({
      ...prevSettings,
      [settingType]: value,
    }))
  }

  // 保存佣金设置
  const handleSaveCommissionSettings = () => {
    // 在这里处理保存佣金设置的逻辑
    console.log("保存佣金设置", commissionSettings)
    // 保存成功后显示成功消息
    setSuccessMessageText("佣金设置保存成功！")
    setShowSuccessMessage(true)
    // 关闭对话框
    setIsCommissionSettingOpen(false)
    // 自动关闭成功消息
    setTimeout(() => {
      setShowSuccessMessage(false)
    }, 3000)
  }

  // Update the handleSelectAllAgents function to accept a boolean value
  const handleSelectAllAgents = (checked) => {
    if (checked) {
      setSelectedAgents(paginatedAgents.map((agent) => agent.id))
    } else {
      setSelectedAgents([])
    }
  }

  // 单选
  const handleSelectAgent = (agentId) => {
    if (selectedAgents.includes(agentId)) {
      setSelectedAgents(selectedAgents.filter((id) => id !== agentId))
    } else {
      setSelectedAgents([...selectedAgents, agentId])
    }
  }

  // 检查是否全选
  const isAllSelected = paginatedAgents.every((agent) => selectedAgents.includes(agent.id))

  return (
    <>
      <div className="md:flex md:items-center md:justify-between space-y-4 md:space-y-0">
        <div className="flex-1 space-y-1">
          <h2 className="text-2xl font-semibold tracking-tight">代理管理</h2>
          <p className="text-sm text-muted-foreground">管理您的代理，查看他们的表现和设置。</p>
        </div>
        <div className="flex items-center space-x-2.5">
          <Button variant="outline" size="sm" onClick={() => setIsHelpOpen(true)}>
            <HelpCircle className="mr-2 h-4 w-4" />
            帮助
          </Button>
          <Button size="sm" onClick={() => setIsAddAgentOpen(true)}>
            <UserPlus className="mr-2 h-4 w-4" />
            添加代理
          </Button>
        </div>
      </div>

      <Separator className="my-4" />

      <div className="md:flex md:items-center md:justify-between space-y-4 md:space-y-0">
        <div className="flex items-center">
          <Input
            type="text"
            placeholder="搜索代理..."
            className="md:w-[300px]"
            value={searchQuery}
            onChange={handleSearch}
          />
          <Button variant="ghost" size="sm" className="ml-2">
            <Search className="mr-2 h-4 w-4" />
            搜索
          </Button>
        </div>
        <div className="flex items-center space-x-2">
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" size="sm">
                <Filter className="mr-2 h-4 w-4" />
                筛选
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-80">
              <div className="space-y-4">
                <div className="space-y-2">
                  <h4 className="text-sm font-medium">状态</h4>
                  <Select value={filters.status} onValueChange={(value) => handleFilterChange("status", value)}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="所有" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">所有</SelectItem>
                      <SelectItem value="active">激活</SelectItem>
                      <SelectItem value="inactive">未激活</SelectItem>
                      <SelectItem value="pending">待审核</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <h4 className="text-sm font-medium">等级</h4>
                  <Select value={filters.level} onValueChange={(value) => handleFilterChange("level", value)}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="所有" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">所有</SelectItem>
                      <SelectItem value="level1">等级 1</SelectItem>
                      <SelectItem value="level2">等级 2</SelectItem>
                      <SelectItem value="level3">等级 3</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <h4 className="text-sm font-medium">表现</h4>
                  <Select
                    value={filters.performance}
                    onValueChange={(value) => handleFilterChange("performance", value)}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="所有" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">所有</SelectItem>
                      <SelectItem value="excellent">优秀</SelectItem>
                      <SelectItem value="good">良好</SelectItem>
                      <SelectItem value="average">一般</SelectItem>
                      <SelectItem value="poor">差</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <h4 className="text-sm font-medium">加入日期</h4>
                  <Select value={filters.joinDate} onValueChange={(value) => handleFilterChange("joinDate", value)}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="所有" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">所有</SelectItem>
                      <SelectItem value="today">今天</SelectItem>
                      <SelectItem value="week">最近一周</SelectItem>
                      <SelectItem value="month">最近一月</SelectItem>
                      <SelectItem value="year">最近一年</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </PopoverContent>
          </Popover>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm">
                <Download className="mr-2 h-4 w-4" />
                导出
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>
                <FileSpreadsheet className="mr-2 h-4 w-4" />
                导出为 CSV
              </DropdownMenuItem>
              <DropdownMenuItem>
                <FileText className="mr-2 h-4 w-4" />
                导出为 PDF
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <Button variant="outline" size="sm" onClick={() => setIsSettingsOpen(true)}>
            <Settings className="mr-2 h-4 w-4" />
            设置
          </Button>
        </div>
      </div>

      <Tabs defaultValue="all" className="mt-4">
        <TabsList>
          <TabsTrigger value="all" onClick={() => handleTabChange("all")}>
            全部
          </TabsTrigger>
          <TabsTrigger value="active" onClick={() => handleTabChange("active")}>
            激活
          </TabsTrigger>
          <TabsTrigger value="inactive" onClick={() => handleTabChange("inactive")}>
            未激活
          </TabsTrigger>
          <TabsTrigger value="pending" onClick={() => handleTabChange("pending")}>
            待审核
          </TabsTrigger>
        </TabsList>
      </Tabs>

      {showSuccessMessage && (
        <Alert className="mt-4" variant="success">
          <CheckCircle2 className="h-4 w-4" />
          <AlertDescription>{successMessageText}</AlertDescription>
        </Alert>
      )}

      <Card className="mt-4">
        <CardContent>
          <div className="overflow-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[50px]">
                    <Checkbox
                      checked={isAllSelected && paginatedAgents.length > 0}
                      // Remove the indeterminate prop and handle the visual state differently
                      className={
                        selectedAgents.length > 0 && !isAllSelected ? "data-[state=checked]:bg-primary/50" : ""
                      }
                      onCheckedChange={handleSelectAllAgents}
                    />
                  </TableHead>
                  <TableHead>名称</TableHead>
                  <TableHead>邮箱</TableHead>
                  <TableHead>电话</TableHead>
                  <TableHead>公司</TableHead>
                  <TableHead>等级</TableHead>
                  <TableHead>
                    加入日期
                    <Button variant="ghost" size="sm" onClick={() => handleSortOptionChange("joinDate")}>
                      <ArrowUpDown className="h-4 w-4" />
                    </Button>
                  </TableHead>
                  <TableHead>
                    表现
                    <Button variant="ghost" size="sm" onClick={() => handleSortOptionChange("performance")}>
                      <ArrowUpDown className="h-4 w-4" />
                    </Button>
                  </TableHead>
                  <TableHead>
                    总收入
                    <Button variant="ghost" size="sm" onClick={() => handleSortOptionChange("revenue")}>
                      <ArrowUpDown className="h-4 w-4" />
                    </Button>
                  </TableHead>
                  <TableHead>
                    总佣金
                    <Button variant="ghost" size="sm" onClick={() => handleSortOptionChange("commission")}>
                      <ArrowUpDown className="h-4 w-4" />
                    </Button>
                  </TableHead>
                  <TableHead className="text-right">操作</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {paginatedAgents.map((agent) => (
                  <TableRow key={agent.id}>
                    <TableCell className="w-[50px]">
                      <Checkbox
                        checked={selectedAgents.includes(agent.id)}
                        onCheckedChange={() => handleSelectAgent(agent.id)}
                      />
                    </TableCell>
                    <TableCell>{agent.name}</TableCell>
                    <TableCell>{agent.email}</TableCell>
                    <TableCell>{agent.phone}</TableCell>
                    <TableCell>{agent.company}</TableCell>
                    <TableCell>{agent.level}</TableCell>
                    <TableCell>{formatDate(agent.joinDate)}</TableCell>
                    <TableCell>{agent.performance}</TableCell>
                    <TableCell>{agent.totalRevenue}</TableCell>
                    <TableCell>{agent.totalCommission}</TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm">
                            <Settings className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem
                            onClick={() => {
                              setSelectedAgent(agent)
                              setIsAgentDetailOpen(true)
                            }}
                          >
                            查看详情
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() => {
                              setAgentToDelete(agent)
                              setIsDeleteDialogOpen(true)
                            }}
                          >
                            删除
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() => {
                              setSelectedAgents([agent.id])
                              setIsShareLinkOpen(true)
                            }}
                          >
                            分享链接
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() => {
                              setSelectedAgents([agent.id])
                              setIsSendMessageOpen(true)
                            }}
                          >
                            发送消息
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
          <div className="flex items-center justify-between mt-4">
            <div className="flex items-center space-x-2">
              <p className="text-sm text-muted-foreground">每页显示</p>
              <Select
                value={String(itemsPerPage)}
                onValueChange={(value) => handleItemsPerPageChange({ target: { value } })}
              >
                <SelectTrigger>
                  <SelectValue placeholder={String(itemsPerPage)} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="10">10</SelectItem>
                  <SelectItem value="20">20</SelectItem>
                  <SelectItem value="50">50</SelectItem>
                  <SelectItem value="100">100</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-center space-x-2">
              <Button
                variant="outline"
                size="sm"
                disabled={currentPage === 1}
                onClick={() => setCurrentPage(currentPage - 1)}
              >
                上一页
              </Button>
              <p className="text-sm text-muted-foreground">
                第 {currentPage} 页，共 {Math.ceil(sortedAgents.length / itemsPerPage)} 页
              </p>
              <Button
                variant="outline"
                size="sm"
                disabled={currentPage === Math.ceil(sortedAgents.length / itemsPerPage)}
                onClick={() => setCurrentPage(currentPage + 1)}
              >
                下一页
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* 添加代理对话框 */}
      {isAddAgentOpen && (
        <div className="fixed inset-0 z-50 overflow-auto bg-black/50">
          <div className="relative w-auto mx-auto max-w-2xl mt-20">
            <Card>
              <CardContent className="p-8">
                <h2 className="text-2xl font-semibold tracking-tight mb-4">添加代理</h2>
                <div className="grid gap-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed"
                        htmlFor="name"
                      >
                        名称
                      </label>
                      <Input
                        type="text"
                        id="name"
                        placeholder="代理名称"
                        value={newAgent.name}
                        onChange={(e) => setNewAgent({ ...newAgent, name: e.target.value })}
                      />
                    </div>
                    <div>
                      <label
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed"
                        htmlFor="email"
                      >
                        邮箱
                      </label>
                      <Input
                        type="email"
                        id="email"
                        placeholder="代理邮箱"
                        value={newAgent.email}
                        onChange={(e) => setNewAgent({ ...newAgent, email: e.target.value })}
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed"
                        htmlFor="phone"
                      >
                        电话
                      </label>
                      <Input
                        type="tel"
                        id="phone"
                        placeholder="代理电话"
                        value={newAgent.phone}
                        onChange={(e) => setNewAgent({ ...newAgent, phone: e.target.value })}
                      />
                    </div>
                    <div>
                      <label
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed"
                        htmlFor="company"
                      >
                        公司
                      </label>
                      <Input
                        type="text"
                        id="company"
                        placeholder="代理公司"
                        value={newAgent.company}
                        onChange={(e) => setNewAgent({ ...newAgent, company: e.target.value })}
                      />
                    </div>
                  </div>
                  <div>
                    <label
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed"
                      htmlFor="level"
                    >
                      等级
                    </label>
                    <Select
                      value={newAgent.level}
                      onValueChange={(value) => setNewAgent({ ...newAgent, level: value })}
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="选择等级" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="level1">等级 1</SelectItem>
                        <SelectItem value="level2">等级 2</SelectItem>
                        <SelectItem value="level3">等级 3</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <label
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed"
                      htmlFor="notes"
                    >
                      备注
                    </label>
                    <Input
                      type="text"
                      id="notes"
                      placeholder="备注"
                      value={newAgent.notes}
                      onChange={(e) => setNewAgent({ ...newAgent, notes: e.target.value })}
                    />
                  </div>
                </div>
                <div className="flex justify-end mt-6">
                  <Button variant="secondary" className="mr-2" onClick={() => setIsAddAgentOpen(false)}>
                    取消
                  </Button>
                  <Button onClick={handleAddAgent}>添加</Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      )}

      {/* 删除代理对话框 */}
      {isDeleteDialogOpen && (
        <div className="fixed inset-0 z-50 overflow-auto bg-black/50">
          <div className="relative w-auto mx-auto max-w-md mt-20">
            <Card>
              <CardContent className="p-8">
                <h2 className="text-2xl font-semibold tracking-tight mb-4">删除代理</h2>
                <p className="text-sm text-muted-foreground mb-4">确定要删除代理 {agentToDelete?.name} 吗？</p>
                <div className="flex justify-end mt-6">
                  <Button variant="secondary" className="mr-2" onClick={() => setIsDeleteDialogOpen(false)}>
                    取消
                  </Button>
                  <Button variant="destructive" onClick={handleDeleteAgent}>
                    删除
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      )}

      {/* 批量删除代理对话框 */}
      {selectedAgents.length > 0 && (
        <div className="fixed inset-0 z-50 overflow-auto bg-black/50">
          <div className="relative w-auto mx-auto max-w-md mt-20">
            <Card>
              <CardContent className="p-8">
                <h2 className="text-2xl font-semibold tracking-tight mb-4">批量删除代理</h2>
                <p className="text-sm text-muted-foreground mb-4">
                  确定要删除选中的 {selectedAgents.length} 个代理吗？
                </p>
                <div className="flex justify-end mt-6">
                  <Button variant="secondary" className="mr-2" onClick={() => setSelectedAgents([])}>
                    取消
                  </Button>
                  <Button variant="destructive" onClick={handleBatchDeleteAgents}>
                    删除
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      )}

      {/* 分享链接对话框 */}
      {isShareLinkOpen && (
        <div className="fixed inset-0 z-50 overflow-auto bg-black/50">
          <div className="relative w-auto mx-auto max-w-md mt-20">
            <Card>
              <CardContent className="p-8">
                <h2 className="text-2xl font-semibold tracking-tight mb-4">分享链接</h2>
                <p className="text-sm text-muted-foreground mb-4">
                  分享以下链接给代理{" "}
                  {selectedAgents.length === 1
                    ? agents.find((agent) => agent.id === selectedAgents[0])?.name
                    : "选中的代理"}
                  ：
                </p>
                <Input
                  type="text"
                  value={
                    selectedAgents.length === 1
                      ? agents.find((agent) => agent.id === selectedAgents[0])?.referralLink
                      : "请选择单个代理"
                  }
                  readOnly
                />
                <div className="flex justify-end mt-6">
                  <Button variant="secondary" className="mr-2" onClick={() => setIsShareLinkOpen(false)}>
                    取消
                  </Button>
                  <Button>复制链接</Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      )}

      {/* 发送消息对话框 */}
      {isSendMessageOpen && (
        <div className="fixed inset-0 z-50 overflow-auto bg-black/50">
          <div className="relative w-auto mx-auto max-w-md mt-20">
            <Card>
              <CardContent className="p-8">
                <h2 className="text-2xl font-semibold tracking-tight mb-4">发送消息</h2>
                <p className="text-sm text-muted-foreground mb-4">发送消息给选中的 {selectedAgents.length} 个代理：</p>
                <Input
                  type="text"
                  placeholder="消息内容"
                  value={messageContent}
                  onChange={(e) => setMessageContent(e.target.value)}
                />
                <div className="flex justify-end mt-6">
                  <Button variant="secondary" className="mr-2" onClick={() => setIsSendMessageOpen(false)}>
                    取消
                  </Button>
                  <Button onClick={handleSendMessage}>发送</Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      )}

      {/* 佣金设置对话框 */}
      {isCommissionSettingOpen && (
        <div className="fixed inset-0 z-50 overflow-auto bg-black/50">
          <div className="relative w-auto mx-auto max-w-2xl mt-20">
            <Card>
              <CardContent className="p-8">
                <h2 className="text-2xl font-semibold tracking-tight mb-4">佣金设置</h2>
                <div className="grid gap-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed"
                        htmlFor="courseCommission"
                      >
                        课程佣金
                      </label>
                      <Input
                        type="number"
                        id="courseCommission"
                        placeholder="课程佣金"
                        value={commissionSettings.courseCommission}
                        onChange={(e) => handleCommissionSettingChange("courseCommission", Number(e.target.value))}
                      />
                    </div>
                    <div>
                      <label
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed"
                        htmlFor="examCommission"
                      >
                        考试佣金
                      </label>
                      <Input
                        type="number"
                        id="examCommission"
                        placeholder="考试佣金"
                        value={commissionSettings.examCommission}
                        onChange={(e) => handleCommissionSettingChange("examCommission", Number(e.target.value))}
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed"
                        htmlFor="membershipCommission"
                      >
                        会员佣金
                      </label>
                      <Input
                        type="number"
                        id="membershipCommission"
                        placeholder="会员佣金"
                        value={commissionSettings.membershipCommission}
                        onChange={(e) => handleCommissionSettingChange("membershipCommission", Number(e.target.value))}
                      />
                    </div>
                    <div>
                      <label
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed"
                        htmlFor="secondaryAgentCommission"
                      >
                        二级代理佣金
                      </label>
                      <Input
                        type="number"
                        id="secondaryAgentCommission"
                        placeholder="二级代理佣金"
                        value={commissionSettings.secondaryAgentCommission}
                        onChange={(e) =>
                          handleCommissionSettingChange("secondaryAgentCommission", Number(e.target.value))
                        }
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed"
                        htmlFor="minimumWithdrawal"
                      >
                        最低提现金额
                      </label>
                      <Input
                        type="number"
                        id="minimumWithdrawal"
                        placeholder="最低提现金额"
                        value={commissionSettings.minimumWithdrawal}
                        onChange={(e) => handleCommissionSettingChange("minimumWithdrawal", Number(e.target.value))}
                      />
                    </div>
                    <div>
                      <label
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed"
                        htmlFor="processingDays"
                      >
                        处理天数
                      </label>
                      <Input
                        type="number"
                        id="processingDays"
                        placeholder="处理天数"
                        value={commissionSettings.processingDays}
                        onChange={(e) => handleCommissionSettingChange("processingDays", Number(e.target.value))}
                      />
                    </div>
                  </div>
                </div>
                <div className="flex justify-end mt-6">
                  <Button variant="secondary" className="mr-2" onClick={() => setIsCommissionSettingOpen(false)}>
                    取消
                  </Button>
                  <Button onClick={handleSaveCommissionSettings}>保存</Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      )}

      {/* 设置对话框 */}
      {isSettingsOpen && (
        <div className="fixed inset-0 z-50 overflow-auto bg-black/50">
          <div className="relative w-auto mx-auto max-w-2xl mt-20">
            <Card>
              <CardContent className="p-8">
                <h2 className="text-2xl font-semibold tracking-tight mb-4">设置</h2>
                <div className="grid gap-4">
                  <div className="space-y-2">
                    <label
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed"
                      htmlFor="defaultSortOption"
                    >
                      默认排序选项
                    </label>
                    <Select
                      value={settings.defaultSortOption}
                      onValueChange={(value) => handleSettingsChange("defaultSortOption", value)}
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="选择排序选项" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="performance">表现</SelectItem>
                        <SelectItem value="name">名称</SelectItem>
                        <SelectItem value="joinDate">加入日期</SelectItem>
                        <SelectItem value="revenue">总收入</SelectItem>
                        <SelectItem value="commission">总佣金</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <label
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed"
                      htmlFor="defaultItemsPerPage"
                    >
                      默认每页显示数量
                    </label>
                    <Select
                      value={String(settings.defaultItemsPerPage)}
                      onValueChange={(value) => handleSettingsChange("defaultItemsPerPage", Number(value))}
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="选择数量" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="10">10</SelectItem>
                        <SelectItem value="20">20</SelectItem>
                        <SelectItem value="50">50</SelectItem>
                        <SelectItem value="100">100</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="enableAutoApproval"
                      checked={settings.enableAutoApproval}
                      onCheckedChange={(checked) => handleSettingsChange("enableAutoApproval", checked)}
                    />
                    <label
                      htmlFor="enableAutoApproval"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed"
                    >
                      启用自动审核
                    </label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="requireVerification"
                      checked={settings.requireVerification}
                      onCheckedChange={(checked) => handleSettingsChange("requireVerification", checked)}
                    />
                    <label
                      htmlFor="requireVerification"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed"
                    >
                      需要验证
                    </label>
                  </div>
                  <div className="space-y-2">
                    <label
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed"
                      htmlFor="minimumWithdrawalAmount"
                    >
                      最低提现金额
                    </label>
                    <Input
                      type="number"
                      id="minimumWithdrawalAmount"
                      placeholder="最低提现金额"
                      value={settings.minimumWithdrawalAmount}
                      onChange={(e) => handleSettingsChange("minimumWithdrawalAmount", Number(e.target.value))}
                    />
                  </div>
                  <div className="space-y-2">
                    <label
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed"
                      htmlFor="withdrawalProcessingDays"
                    >
                      提现处理天数
                    </label>
                    <Input
                      type="number"
                      id="withdrawalProcessingDays"
                      placeholder="提现处理天数"
                      value={settings.withdrawalProcessingDays}
                      onChange={(e) => handleSettingsChange("withdrawalProcessingDays", Number(e.target.value))}
                    />
                  </div>
                </div>
                <div className="flex justify-end mt-6">
                  <Button variant="secondary" className="mr-2" onClick={() => setIsSettingsOpen(false)}>
                    取消
                  </Button>
                  <Button>保存</Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      )}

      {/* 帮助对话框 */}
      {isHelpOpen && (
        <div className="fixed inset-0 z-50 overflow-auto bg-black/50">
          <div className="relative w-auto mx-auto max-w-2xl mt-20">
            <Card>
              <CardContent className="p-8">
                <h2 className="text-2xl font-semibold tracking-tight mb-4">帮助</h2>
                <p className="text-sm text-muted-foreground mb-4">这里是帮助文档，您可以查看如何使用代理管理功能。</p>
                <div className="space-y-4">
                  <div>
                    <h3 className="text-lg font-semibold">添加代理</h3>
                    <p className="text-sm text-muted-foreground">
                      点击“添加代理”按钮，填写代理信息，即可添加新的代理。
                    </p>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold">删除代理</h3>
                    <p className="text-sm text-muted-foreground">点击代理列表中的“删除”按钮，即可删除该代理。</p>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold">筛选代理</h3>
                    <p className="text-sm text-muted-foreground">点击“筛选”按钮，选择筛选条件，即可筛选代理列表。</p>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold">导出代理</h3>
                    <p className="text-sm text-muted-foreground">点击“导出”按钮，选择导出格式，即可导出代理列表。</p>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold">设置</h3>
                    <p className="text-sm text-muted-foreground">
                      点击“设置”按钮，可以设置默认排序选项、默认每页显示数量等。
                    </p>
                  </div>
                </div>
                <div className="flex justify-end mt-6">
                  <Button onClick={() => setIsHelpOpen(false)}>关闭</Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      )}
    </>
  )
}
