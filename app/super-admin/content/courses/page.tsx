"use client"

import { useState } from "react"
import Link from "next/link"
import { ArrowLeft, Search, Filter, MoreVertical, CheckCircle, XCircle, AlertTriangle } from "lucide-react"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

// 模拟课程数据
const coursesData = [
  {
    id: 1,
    title: "Python数据分析实战",
    agent: "数据科学学院",
    category: "编程开发",
    status: "approved",
    date: "2023-04-15",
    students: 342,
    rating: 4.8,
  },
  {
    id: 2,
    title: "高级市场营销策略",
    agent: "商业智慧研究所",
    category: "市场营销",
    status: "pending",
    date: "2023-04-18",
    students: 0,
    rating: 0,
  },
  {
    id: 3,
    title: "金融投资入门到精通",
    agent: "财富学堂",
    category: "金融投资",
    status: "approved",
    date: "2023-04-10",
    students: 156,
    rating: 4.5,
  },
  {
    id: 4,
    title: "人工智能与机器学习",
    agent: "AI研究院",
    category: "人工智能",
    status: "rejected",
    date: "2023-04-05",
    students: 0,
    rating: 0,
    rejectReason: "内容与描述不符，需要补充更多实践案例",
  },
  {
    id: 5,
    title: "高效沟通技巧",
    agent: "职场进阶学院",
    category: "职场技能",
    status: "pending",
    date: "2023-04-19",
    students: 0,
    rating: 0,
  },
]

export default function CoursesManagementPage() {
  const [courses, setCourses] = useState(coursesData)
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")

  // 过滤课程
  const filteredCourses = courses.filter((course) => {
    const matchesSearch =
      course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.agent.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || course.status === statusFilter
    return matchesSearch && matchesStatus
  })

  // 获取状态标签
  const getStatusBadge = (status) => {
    switch (status) {
      case "approved":
        return <Badge className="bg-green-600">已审核</Badge>
      case "pending":
        return <Badge className="bg-amber-600">待审核</Badge>
      case "rejected":
        return <Badge className="bg-red-600">已拒绝</Badge>
      default:
        return <Badge className="bg-gray-600">未知</Badge>
    }
  }

  // 审核课程
  const approveCourse = (id) => {
    setCourses(courses.map((course) => (course.id === id ? { ...course, status: "approved" } : course)))
  }

  // 拒绝课程
  const rejectCourse = (id) => {
    // 实际应用中应该有一个弹窗让管理员输入拒绝原因
    setCourses(
      courses.map((course) =>
        course.id === id ? { ...course, status: "rejected", rejectReason: "内容不符合平台规范" } : course,
      ),
    )
  }

  return (
    <div className="container mx-auto p-4 bg-gray-900 min-h-screen text-white">
      <div className="mb-6">
        <Link href="/super-admin" className="text-blue-400 hover:text-blue-300 flex items-center mb-4">
          <ArrowLeft className="mr-2 h-4 w-4" />
          返回超级管理员控制台
        </Link>
        <h1 className="text-2xl font-bold">课程管理</h1>
        <p className="text-gray-400">审核和管理平台上的所有课程</p>
      </div>

      <Card className="bg-gray-800 border-gray-700 p-4 mb-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-grow">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            <Input
              className="pl-10 bg-gray-700 border-gray-600 text-white"
              placeholder="搜索课程名称或代理商..."
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
                  : statusFilter === "approved"
                    ? "已审核"
                    : statusFilter === "pending"
                      ? "待审核"
                      : "已拒绝"}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="bg-gray-700 border-gray-600 text-white">
              <DropdownMenuItem onClick={() => setStatusFilter("all")}>全部</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setStatusFilter("approved")}>已审核</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setStatusFilter("pending")}>待审核</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setStatusFilter("rejected")}>已拒绝</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </Card>

      <div className="space-y-4">
        {filteredCourses.length > 0 ? (
          filteredCourses.map((course) => (
            <Card key={course.id} className="bg-gray-800 border-gray-700 p-4">
              <div className="flex flex-col md:flex-row justify-between">
                <div className="mb-4 md:mb-0">
                  <div className="flex items-center mb-2">
                    <h3 className="text-lg font-medium mr-3">{course.title}</h3>
                    {getStatusBadge(course.status)}
                  </div>
                  <p className="text-gray-400 mb-2">代理商: {course.agent}</p>
                  <div className="flex flex-wrap gap-2 mb-2">
                    <Badge variant="outline" className="border-blue-500 text-blue-400">
                      {course.category}
                    </Badge>
                    <Badge variant="outline" className="border-gray-500 text-gray-400">
                      上传日期: {course.date}
                    </Badge>
                    {course.students > 0 && (
                      <Badge variant="outline" className="border-green-500 text-green-400">
                        学员: {course.students}
                      </Badge>
                    )}
                    {course.rating > 0 && (
                      <Badge variant="outline" className="border-amber-500 text-amber-400">
                        评分: {course.rating}
                      </Badge>
                    )}
                  </div>
                  {course.status === "rejected" && course.rejectReason && (
                    <div className="flex items-start mt-2 text-red-400 text-sm">
                      <AlertTriangle className="h-4 w-4 mr-1 mt-0.5" />
                      <span>拒绝原因: {course.rejectReason}</span>
                    </div>
                  )}
                </div>
                <div className="flex items-center space-x-2">
                  {course.status === "pending" && (
                    <>
                      <Button
                        size="sm"
                        className="bg-green-600 hover:bg-green-700"
                        onClick={() => approveCourse(course.id)}
                      >
                        <CheckCircle className="h-4 w-4 mr-1" />
                        通过
                      </Button>
                      <Button size="sm" variant="destructive" onClick={() => rejectCourse(course.id)}>
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
                      <DropdownMenuItem className="text-red-400">下架课程</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
            </Card>
          ))
        ) : (
          <Card className="bg-gray-800 border-gray-700 p-6 text-center">
            <p className="text-gray-400">没有找到符合条件的课程</p>
          </Card>
        )}
      </div>
    </div>
  )
}
