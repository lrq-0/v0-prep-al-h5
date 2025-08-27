"use client"

import { useState } from "react"
import Link from "next/link"
import { ArrowLeft, Search, Filter, MoreVertical, Globe, CheckCircle, XCircle } from "lucide-react"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

// 模拟代理商数据
const agentsData = [
  {
    id: 1,
    name: "数据科学学院",
    owner: "张教授",
    email: "zhangprof@datascience.edu",
    phone: "13812345678",
    domain: "datascience.edu",
    status: "active",
    level: "premium",
    registeredDate: "2022-08-15",
    students: 1245,
    courses: 18,
  },
  {
    id: 2,
    name: "商业智慧研究所",
    owner: "李总监",
    email: "li@bizwisdom.com",
    phone: "13987654321",
    domain: "bizwisdom.com",
    status: "active",
    level: "standard",
    registeredDate: "2022-10-22",
    students: 876,
    courses: 12,
  },
  {
    id: 3,
    name: "职场进阶学院",
    owner: "王老师",
    email: "wang@careerboost.cn",
    phone: "13765432198",
    domain: "careerboost.cn",
    status: "pending",
    level: "",
    registeredDate: "2023-04-10",
    students: 0,
    courses: 0,
  },
  {
    id: 4,
    name: "财富学堂",
    owner: "赵顾问",
    email: "zhao@wealthschool.com",
    phone: "13678901234",
    domain: "wealthschool.com",
    status: "suspended",
    level: "premium",
    registeredDate: "2022-05-18",
    students: 932,
    courses: 15,
  },
  {
    id: 5,
    name: "AI研究院",
    owner: "钱博士",
    email: "qian@airesearch.org",
    phone: "13567890123",
    domain: "airesearch.org",
    status: "active",
    level: "premium",
    registeredDate: "2022-03-05",
    students: 1587,
    courses: 24,
  },
]

export default function AgentAccountsPage() {
  const [agents, setAgents] = useState(agentsData)
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")

  // 过滤代理商
  const filteredAgents = agents.filter((agent) => {
    const matchesSearch =
      agent.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      agent.owner.toLowerCase().includes(searchTerm.toLowerCase()) ||
      agent.email.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || agent.status === statusFilter
    return matchesSearch && matchesStatus
  })

  // 获取状态标签
  const getStatusBadge = (status) => {
    switch (status) {
      case "active":
        return <Badge className="bg-green-600">已激活</Badge>
      case "pending":
        return <Badge className="bg-amber-600">待审核</Badge>
      case "suspended":
        return <Badge className="bg-red-600">已暂停</Badge>
      default:
        return <Badge className="bg-gray-600">未知</Badge>
    }
  }

  // 获取等级标签
  const getLevelBadge = (level) => {
    switch (level) {
      case "premium":
        return <Badge className="bg-purple-600">高级版</Badge>
      case "standard":
        return <Badge className="bg-blue-600">标准版</Badge>
      case "basic":
        return <Badge className="bg-gray-600">基础版</Badge>
      default:
        return null
    }
  }

  // 激活代理商
  const activateAgent = (id) => {
    setAgents(agents.map((agent) => (agent.id === id ? { ...agent, status: "active", level: "standard" } : agent)))
  }

  // 暂停代理商
  const suspendAgent = (id) => {
    setAgents(agents.map((agent) => (agent.id === id ? { ...agent, status: "suspended" } : agent)))
  }

  return (
    <div className="container mx-auto p-4 bg-gray-900 min-h-screen text-white">
      <div className="mb-6">
        <Link href="/super-admin" className="text-blue-400 hover:text-blue-300 flex items-center mb-4">
          <ArrowLeft className="mr-2 h-4 w-4" />
          返回超级管理员控制台
        </Link>
        <h1 className="text-2xl font-bold">代理商账户管理</h1>
        <p className="text-gray-400">管理平台上的所有代理商账户</p>
      </div>

      <Card className="bg-gray-800 border-gray-700 p-4 mb-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-grow">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            <Input
              className="pl-10 bg-gray-700 border-gray-600 text-white"
              placeholder="搜索代理商名称、负责人或邮箱..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="bg-gray-700 border-gray-600 text-white">
                <Filter className="mr-2 h-4 w-4" />
                状态:{" "}
                {statusFilter === "all"
                  ? "全部"
                  : statusFilter === "active"
                    ? "已激活"
                    : statusFilter === "pending"
                      ? "待审核"
                      : "已暂停"}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="bg-gray-700 border-gray-600 text-white">
              <DropdownMenuItem onClick={() => setStatusFilter("all")}>全部</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setStatusFilter("active")}>已激活</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setStatusFilter("pending")}>待审核</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setStatusFilter("suspended")}>已暂停</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </Card>

      <div className="space-y-4">
        {filteredAgents.length > 0 ? (
          filteredAgents.map((agent) => (
            <Card key={agent.id} className="bg-gray-800 border-gray-700 p-4">
              <div className="flex flex-col md:flex-row justify-between">
                <div className="mb-4 md:mb-0">
                  <div className="flex items-center mb-2">
                    <h3 className="text-lg font-medium mr-3">{agent.name}</h3>
                    {getStatusBadge(agent.status)}
                    {getLevelBadge(agent.level)}
                  </div>
                  <p className="text-gray-400 mb-2">
                    负责人: {agent.owner} | 邮箱: {agent.email} | 电话: {agent.phone}
                  </p>
                  <div className="flex flex-wrap gap-2 mb-2">
                    {agent.domain && (
                      <Badge variant="outline" className="border-blue-500 text-blue-400 flex items-center">
                        <Globe className="h-3 w-3 mr-1" />
                        {agent.domain}
                      </Badge>
                    )}
                    <Badge variant="outline" className="border-gray-500 text-gray-400">
                      注册日期: {agent.registeredDate}
                    </Badge>
                    {agent.students > 0 && (
                      <Badge variant="outline" className="border-green-500 text-green-400">
                        学员: {agent.students}
                      </Badge>
                    )}
                    {agent.courses > 0 && (
                      <Badge variant="outline" className="border-amber-500 text-amber-400">
                        课程: {agent.courses}
                      </Badge>
                    )}
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  {agent.status === "pending" && (
                    <>
                      <Button
                        size="sm"
                        className="bg-green-600 hover:bg-green-700"
                        onClick={() => activateAgent(agent.id)}
                      >
                        <CheckCircle className="h-4 w-4 mr-1" />
                        激活
                      </Button>
                      <Button size="sm" variant="destructive" onClick={() => suspendAgent(agent.id)}>
                        <XCircle className="h-4 w-4 mr-1" />
                        拒绝
                      </Button>
                    </>
                  )}
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button size="sm" variant="outline" className="bg-gray-700 border-gray-600">
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="bg-gray-700 border-gray-600 text-white">
                      <DropdownMenuItem>查看详情</DropdownMenuItem>
                      <DropdownMenuItem>编辑信息</DropdownMenuItem>
                      <DropdownMenuItem>域名设置</DropdownMenuItem>
                      <DropdownMenuItem>权限配置</DropdownMenuItem>
                      {agent.status === "active" && (
                        <DropdownMenuItem className="text-red-400" onClick={() => suspendAgent(agent.id)}>
                          暂停账户
                        </DropdownMenuItem>
                      )}
                      {agent.status === "suspended" && (
                        <DropdownMenuItem className="text-green-400" onClick={() => activateAgent(agent.id)}>
                          恢复账户
                        </DropdownMenuItem>
                      )}
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
            </Card>
          ))
        ) : (
          <Card className="bg-gray-800 border-gray-700 p-6 text-center">
            <p className="text-gray-400">没有找到符合条件的代理商</p>
          </Card>
        )}
      </div>
    </div>
  )
}
