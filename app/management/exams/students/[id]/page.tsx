"use client"

import { Switch } from "@/components/ui/switch"

import { Textarea } from "@/components/ui/textarea"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Checkbox } from "@/components/ui/checkbox"
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import {
  ArrowLeft,
  Search,
  Download,
  Check,
  X,
  Mail,
  MoreHorizontal,
  Award,
  AlertTriangle,
  CheckSquare,
  XSquare,
  Trash,
  Info,
  Eye,
} from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function StudentsManagement({ params }) {
  const router = useRouter()
  const { id } = params

  const [isLoading, setIsLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState("")
  const [reviewStatus, setReviewStatus] = useState("all")
  const [certificateStatus, setCertificateStatus] = useState("all")
  const [selectedStudents, setSelectedStudents] = useState([])
  const [students, setStudents] = useState([])
  const [examInfo, setExamInfo] = useState(null)
  const [selectedStudent, setSelectedStudent] = useState(null)
  const [isReviewDialogOpen, setIsReviewDialogOpen] = useState(false)
  const [isRejectDialogOpen, setIsRejectDialogOpen] = useState(false)
  const [isExportDialogOpen, setIsExportDialogOpen] = useState(false)
  const [isStudentInfoDialogOpen, setIsStudentInfoDialogOpen] = useState(false)
  const [rejectReason, setRejectReason] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [selectAll, setSelectAll] = useState(false)
  const [activeTab, setActiveTab] = useState("all")
  const [exportOptions, setExportOptions] = useState({
    includePhotos: true,
    photoNaming: "name_id",
    photoSize: "1inch",
    includeAll: true,
    includePassed: false,
    includeCertificate: false,
    includePending: false,
    includeFailed: false,
  })

  // 模拟数据加载
  useEffect(() => {
    const loadData = async () => {
      // 模拟API请求延迟
      await new Promise((resolve) => setTimeout(resolve, 1500))

      // 考试信息
      if (id === "e2") {
        setExamInfo({
          id: "e2",
          title: "数据分析师认证考试",
          type: "certificate",
          image: "/images/certificate-2.png",
          stats: {
            total: 56,
            pending: 23,
            passed: 21,
            failed: 12,
            certificate: 18,
          },
        })
      } else if (id === "e4") {
        setExamInfo({
          id: "e4",
          title: "全国大学生人工智能创新大赛",
          type: "competition",
          image: "/images/exam-2.png",
          stats: {
            total: 42,
            pending: 15,
            passed: 19,
            failed: 8,
            certificate: 12,
          },
        })
      } else {
        router.push("/management/exams")
        return
      }

      // 生成模拟学生数据
      const mockStudents = []
      const statusOptions = ["pending", "passed", "failed"]
      const certificateOptions = [true, false]
      const namePrefix = ["张", "李", "王", "赵", "陈", "黄", "周", "吴", "刘", "孙"]
      const nameSuffix = [
        "伟",
        "芳",
        "娜",
        "强",
        "军",
        "杰",
        "磊",
        "静",
        "敏",
        "艳",
        "超",
        "明",
        "亮",
        "飞",
        "华",
        "燕",
        "涛",
        "霞",
      ]

      for (let i = 1; i <= 60; i++) {
        const firstName = namePrefix[Math.floor(Math.random() * namePrefix.length)]
        const lastName = nameSuffix[Math.floor(Math.random() * nameSuffix.length)]
        const fullName = firstName + lastName

        // 随机生成手机号码
        const phone = `1${Math.floor(Math.random() * 9) + 1}${Array(9)
          .fill(0)
          .map(() => Math.floor(Math.random() * 10))
          .join("")}`

        // 随机生成证件号码
        const idNumber = `${Math.floor(Math.random() * 899999) + 100000}${Math.floor(Math.random() * 8999) + 1000}${Math.floor(Math.random() * 89) + 10}${Math.floor(Math.random() * 899) + 100}${Math.floor(Math.random() * 9)}`

        // 随机分数
        const score = Math.floor(Math.random() * 41) + 60

        // 随机状态
        const status = i <= 15 ? "pending" : statusOptions[Math.floor(Math.random() * statusOptions.length)]

        // 如果通过，随机决定是否有证书
        const hasCertificate =
          status === "passed" ? certificateOptions[Math.floor(Math.random() * certificateOptions.length)] : false

        mockStudents.push({
          id: `s${i}`,
          name: fullName,
          idType: "身份证",
          idNumber: idNumber,
          phone: phone,
          organization: Math.random() > 0.5 ? "北京大学" : Math.random() > 0.5 ? "清华大学" : "复旦大学",
          email: `${fullName}${Math.floor(Math.random() * 999)}@example.com`,
          score: score,
          submitTime: `2024-${Math.floor(Math.random() * 2) + 3}-${Math.floor(Math.random() * 28) + 1} ${Math.floor(Math.random() * 24)}:${Math.floor(Math.random() * 60)}`,
          status: status,
          reviewTime:
            status !== "pending"
              ? `2024-${Math.floor(Math.random() * 2) + 4}-${Math.floor(Math.random() * 28) + 1}`
              : null,
          hasCertificate: hasCertificate,
          certificateTime: hasCertificate
            ? `2024-${Math.floor(Math.random() * 2) + 4}-${Math.floor(Math.random() * 28) + 1}`
            : null,
          hasPhoto: Math.random() > 0.3,
        })
      }

      setStudents(mockStudents)
      setIsLoading(false)
    }

    loadData()
  }, [id, router])

  // 筛选学生列表
  const filteredStudents = students.filter((student) => {
    const matchesSearch =
      student.name.includes(searchQuery) ||
      student.idNumber.includes(searchQuery) ||
      student.phone.includes(searchQuery) ||
      student.email.includes(searchQuery) ||
      student.organization.includes(searchQuery)

    const matchesReviewStatus = reviewStatus === "all" || student.status === reviewStatus
    const matchesCertificateStatus =
      certificateStatus === "all" ||
      (certificateStatus === "has" && student.hasCertificate) ||
      (certificateStatus === "no" && !student.hasCertificate)

    const matchesTab =
      activeTab === "all" ||
      (activeTab === "pending" && student.status === "pending") ||
      (activeTab === "passed" && student.status === "passed") ||
      (activeTab === "failed" && student.status === "failed") ||
      (activeTab === "certificate" && student.hasCertificate)

    return matchesSearch && matchesReviewStatus && matchesCertificateStatus && matchesTab
  })

  // 处理学生选择
  const handleSelectStudent = (studentId) => {
    if (selectedStudents.includes(studentId)) {
      setSelectedStudents(selectedStudents.filter((id) => id !== studentId))
    } else {
      setSelectedStudents([...selectedStudents, studentId])
    }
  }

  // 处理全选
  const handleSelectAll = () => {
    if (selectAll) {
      setSelectedStudents([])
    } else {
      setSelectedStudents(filteredStudents.map((student) => student.id))
    }
    setSelectAll(!selectAll)
  }

  // 处理批量审核
  const handleBatchReview = () => {
    if (selectedStudents.length === 0) {
      alert("请至少选择一名学员")
      return
    }
    setIsReviewDialogOpen(true)
  }

  // 处理批量拒绝
  const handleBatchReject = () => {
    if (selectedStudents.length === 0) {
      alert("请至少选择一名学员")
      return
    }
    setIsRejectDialogOpen(true)
  }

  // 提交批量审核
  const submitBatchReview = () => {
    setIsSubmitting(true)

    // 模拟API请求
    setTimeout(() => {
      const updatedStudents = students.map((student) => {
        if (selectedStudents.includes(student.id)) {
          return {
            ...student,
            status: "passed",
            reviewTime: new Date().toISOString().slice(0, 10),
          }
        }
        return student
      })

      setStudents(updatedStudents)
      setSelectedStudents([])
      setSelectAll(false)
      setIsSubmitting(false)
      setIsReviewDialogOpen(false)

      alert(`已批量通过${selectedStudents.length}名学员的审核`)
    }, 1500)
  }

  // 提交批量拒绝
  const submitBatchReject = () => {
    if (!rejectReason) {
      alert("请输入拒绝原因")
      return
    }

    setIsSubmitting(true)

    // 模拟API请求
    setTimeout(() => {
      const updatedStudents = students.map((student) => {
        if (selectedStudents.includes(student.id)) {
          return {
            ...student,
            status: "failed",
            reviewTime: new Date().toISOString().slice(0, 10),
          }
        }
        return student
      })

      setStudents(updatedStudents)
      setSelectedStudents([])
      setSelectAll(false)
      setIsSubmitting(false)
      setIsRejectDialogOpen(false)
      setRejectReason("")

      alert(`已批量拒绝${selectedStudents.length}名学员`)
    }, 1500)
  }

  // 处理导出数据
  const handleExport = () => {
    setIsExportDialogOpen(true)
  }

  // 提交导出请求
  const submitExport = () => {
    setIsSubmitting(true)

    // 模拟API请求
    setTimeout(() => {
      setIsSubmitting(false)
      setIsExportDialogOpen(false)
      alert("导出成功！文件已下载到您的设备。")
    }, 1500)
  }

  // 查看学生详情
  const viewStudentDetails = (student) => {
    setSelectedStudent(student)
    setIsStudentInfoDialogOpen(true)
  }

  // 获取状态标签显示
  const getStatusBadge = (status) => {
    switch (status) {
      case "pending":
        return (
          <Badge variant="outline" className="bg-amber-900 text-amber-300 border-amber-700">
            待审核
          </Badge>
        )
      case "passed":
        return (
          <Badge variant="outline" className="bg-green-900 text-green-300 border-green-700">
            已通过
          </Badge>
        )
      case "failed":
        return (
          <Badge variant="outline" className="bg-red-900 text-red-300 border-red-700">
            未通过
          </Badge>
        )
      default:
        return (
          <Badge variant="outline" className="bg-gray-900 text-gray-300 border-gray-700">
            未知
          </Badge>
        )
    }
  }

  // 一键审核通过
  const handleOneClickApprove = () => {
    if (selectedStudents.length === 0) {
      alert("请至少选择一名学员")
      return
    }

    // 显示确认对话框
    if (confirm(`确定要一键通过这 ${selectedStudents.length} 名学员的审核吗？`)) {
      setIsSubmitting(true)

      // 模拟API请求
      setTimeout(() => {
        const updatedStudents = students.map((student) => {
          if (selectedStudents.includes(student.id)) {
            return {
              ...student,
              status: "passed",
              reviewTime: new Date().toISOString().slice(0, 10),
            }
          }
          return student
        })

        setStudents(updatedStudents)
        setSelectedStudents([])
        setSelectAll(false)
        setIsSubmitting(false)

        alert(`已成功通过${selectedStudents.length}名学员的审核`)
      }, 1000)
    }
  }

  return (
    <div className="container mx-auto p-4 bg-gray-900 text-gray-100 min-h-screen">
      {/* 顶部导航栏 */}
      <div className="sticky top-0 left-0 right-0 h-14 flex items-center px-4 bg-gray-900/80 backdrop-blur-md border-b border-gray-800 z-10 mb-6">
        <Link href="/management/exams" className="flex items-center text-gray-300">
          <ArrowLeft className="h-5 w-5 mr-2" />
          <span>返回</span>
        </Link>
        <h1 className="flex-1 text-center text-lg font-semibold text-white">考生管理</h1>
      </div>

      {isLoading ? (
        <div className="space-y-6">
          <div className="animate-pulse bg-gray-800 h-32 rounded-lg"></div>
          <div className="animate-pulse bg-gray-800 h-12 rounded-lg"></div>
          <div className="animate-pulse bg-gray-800 h-64 rounded-lg"></div>
        </div>
      ) : (
        <>
          {/* 考试信息卡片 */}
          <Card className="mb-6 bg-gray-800 border-gray-700">
            <div className="flex flex-col md:flex-row">
              <div className="relative h-40 md:w-48">
                <Image
                  src={examInfo?.image || "/placeholder.svg"}
                  alt={examInfo?.title}
                  fill
                  style={{ objectFit: "cover" }}
                  className="rounded-t-lg md:rounded-l-lg md:rounded-t-none"
                />
              </div>
              <div className="p-6 flex-1">
                <h2 className="text-xl font-bold text-white mb-2">{examInfo?.title}</h2>
                <Badge
                  className={
                    examInfo?.type === "certificate" ? "bg-green-900 text-green-300" : "bg-purple-900 text-purple-300"
                  }
                >
                  {examInfo?.type === "certificate" ? "证书考试" : "竞赛活动"}
                </Badge>

                <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 mt-4">
                  <div className="text-center">
                    <div className="text-xl font-semibold text-white">{examInfo?.stats.total}</div>
                    <div className="text-xs text-gray-400">总学员数</div>
                  </div>
                  <div className="text-center">
                    <div className="text-xl font-semibold text-amber-400">{examInfo?.stats.pending}</div>
                    <div className="text-xs text-gray-400">待审核</div>
                  </div>
                  <div className="text-center">
                    <div className="text-xl font-semibold text-green-400">{examInfo?.stats.passed}</div>
                    <div className="text-xs text-gray-400">已通过</div>
                  </div>
                  <div className="text-center">
                    <div className="text-xl font-semibold text-red-400">{examInfo?.stats.failed}</div>
                    <div className="text-xs text-gray-400">未通过</div>
                  </div>
                  <div className="text-center">
                    <div className="text-xl font-semibold text-blue-400">{examInfo?.stats.certificate}</div>
                    <div className="text-xs text-gray-400">已发证书</div>
                  </div>
                </div>
              </div>
            </div>
          </Card>

          {/* 搜索和操作按钮 */}
          <div className="flex flex-wrap justify-between items-center gap-4 mb-4">
            <div className="relative flex-1 min-w-[200px]">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
              <Input
                placeholder="搜索姓名、证件号、手机号..."
                className="pl-10 bg-gray-800 border-gray-700 text-white"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            <div className="flex flex-wrap gap-2">
              {selectedStudents.length > 0 && (
                <>
                  <Button variant="secondary" className="border-gray-700 text-white" onClick={handleBatchReview}>
                    <CheckSquare className="mr-2 h-4 w-4" />
                    批量通过 ({selectedStudents.length})
                  </Button>
                  <Button variant="secondary" className="border-gray-700 text-white" onClick={handleBatchReject}>
                    <XSquare className="mr-2 h-4 w-4" />
                    批量拒绝
                  </Button>
                  <Button
                    variant="primary"
                    className="bg-green-600 hover:bg-green-500 text-white"
                    onClick={handleOneClickApprove}
                  >
                    <Check className="mr-2 h-4 w-4" />
                    一键审核通过
                  </Button>
                </>
              )}
              <Button variant="secondary" className="border-gray-700 text-white" onClick={handleExport}>
                <Download className="mr-2 h-4 w-4" />
                导出数据
              </Button>
            </div>
          </div>

          {/* 标签页筛选 */}
          <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-6">
            <TabsList className="bg-gray-800 p-1">
              <TabsTrigger value="all" className="data-[state=active]:bg-gray-700">
                全部 ({students.length})
              </TabsTrigger>
              <TabsTrigger value="pending" className="data-[state=active]:bg-gray-700">
                待审核 ({students.filter((s) => s.status === "pending").length})
              </TabsTrigger>
              <TabsTrigger value="passed" className="data-[state=active]:bg-gray-700">
                已通过 ({students.filter((s) => s.status === "passed").length})
              </TabsTrigger>
              <TabsTrigger value="failed" className="data-[state=active]:bg-gray-700">
                未通过 ({students.filter((s) => s.status === "failed").length})
              </TabsTrigger>
              <TabsTrigger value="certificate" className="data-[state=active]:bg-gray-700">
                已发证书 ({students.filter((s) => s.hasCertificate).length})
              </TabsTrigger>
            </TabsList>
          </Tabs>

          {/* 学员列表 */}
          <Card className="bg-gray-800 border-gray-700 overflow-hidden">
            <CardHeader className="p-4 border-b border-gray-700">
              <CardTitle className="text-lg font-medium text-white">考生列表</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow className="hover:bg-gray-800 border-gray-700">
                      <TableHead className="w-10 text-gray-300">
                        <Checkbox checked={selectAll} onCheckedChange={handleSelectAll} />
                      </TableHead>
                      <TableHead className="text-gray-300">学员信息</TableHead>
                      <TableHead className="text-gray-300">分数</TableHead>
                      <TableHead className="text-gray-300">提交时间</TableHead>
                      <TableHead className="text-gray-300">状态</TableHead>
                      <TableHead className="text-gray-300">审核时间</TableHead>
                      <TableHead className="text-gray-300">证书</TableHead>
                      <TableHead className="text-gray-300">操作</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredStudents.length === 0 ? (
                      <TableRow className="hover:bg-gray-800 border-gray-700">
                        <TableCell colSpan={8} className="text-center py-8 text-gray-400">
                          没有找到匹配的学员记录
                        </TableCell>
                      </TableRow>
                    ) : (
                      filteredStudents.map((student) => (
                        <TableRow key={student.id} className="hover:bg-gray-750 border-gray-700">
                          <TableCell>
                            <Checkbox
                              checked={selectedStudents.includes(student.id)}
                              onCheckedChange={() => handleSelectStudent(student.id)}
                            />
                          </TableCell>
                          <TableCell>
                            <div className="flex flex-col">
                              <div className="text-white">{student.name}</div>
                              <div className="text-xs text-gray-400 flex flex-col sm:flex-row gap-1">
                                <span>{student.organization}</span>
                                {student.hasPhoto && (
                                  <Badge
                                    variant="outline"
                                    className="text-xs bg-blue-900 text-blue-300 border-blue-700 py-0 h-4"
                                  >
                                    有照片
                                  </Badge>
                                )}
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>
                            <span
                              className={
                                student.score >= 80
                                  ? "text-green-400"
                                  : student.score >= 60
                                    ? "text-amber-400"
                                    : "text-red-400"
                              }
                            >
                              {student.score}
                            </span>
                          </TableCell>
                          <TableCell>
                            <div className="text-sm text-gray-300">{student.submitTime}</div>
                          </TableCell>
                          <TableCell>{getStatusBadge(student.status)}</TableCell>
                          <TableCell>
                            <div className="text-sm text-gray-300">{student.reviewTime || "-"}</div>
                          </TableCell>
                          <TableCell>
                            {student.hasCertificate ? (
                              <Badge variant="outline" className="bg-cyan-900 text-cyan-300 border-cyan-700">
                                <Check className="mr-1 h-3 w-3" />
                                已发放
                              </Badge>
                            ) : (
                              <span className="text-gray-400 text-sm">未发放</span>
                            )}
                          </TableCell>
                          <TableCell>
                            <div className="flex gap-2">
                              <Button variant="ghost" size="icon" onClick={() => viewStudentDetails(student)}>
                                <Eye className="h-4 w-4" />
                              </Button>
                              <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                  <Button variant="ghost" size="icon">
                                    <MoreHorizontal className="h-4 w-4" />
                                  </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end" className="bg-gray-800 border-gray-700 text-gray-200">
                                  {student.status === "pending" && (
                                    <>
                                      <DropdownMenuItem className="cursor-pointer hover:bg-gray-700">
                                        <Check className="mr-2 h-4 w-4" />
                                        <span>通过审核</span>
                                      </DropdownMenuItem>
                                      <DropdownMenuItem className="cursor-pointer hover:bg-gray-700">
                                        <X className="mr-2 h-4 w-4" />
                                        <span>拒绝审核</span>
                                      </DropdownMenuItem>
                                    </>
                                  )}
                                  {student.status === "passed" && !student.hasCertificate && (
                                    <DropdownMenuItem className="cursor-pointer hover:bg-gray-700">
                                      <Award className="mr-2 h-4 w-4" />
                                      <span>发放证书</span>
                                    </DropdownMenuItem>
                                  )}
                                  <DropdownMenuItem className="cursor-pointer hover:bg-gray-700">
                                    <Mail className="mr-2 h-4 w-4" />
                                    <span>发送邮件</span>
                                  </DropdownMenuItem>
                                  <DropdownMenuItem className="cursor-pointer hover:bg-gray-700 text-red-400">
                                    <Trash className="mr-2 h-4 w-4" />
                                    <span>删除记录</span>
                                  </DropdownMenuItem>
                                </DropdownMenuContent>
                              </DropdownMenu>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))
                    )}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </>
      )}

      {/* 批量审核对话框 */}
      <Dialog open={isReviewDialogOpen} onOpenChange={setIsReviewDialogOpen}>
        <DialogContent className="bg-gray-800 border-gray-700 text-white">
          <DialogHeader>
            <DialogTitle>批量通过审核</DialogTitle>
          </DialogHeader>
          <div className="py-4">
            <p className="text-gray-300">
              您确定要批量通过以下 <span className="font-semibold">{selectedStudents.length}</span> 名学员的审核吗？
            </p>

            <div className="mt-4 p-3 bg-blue-900/50 rounded-md border border-blue-800">
              <div className="flex items-start">
                <Info className="h-5 w-5 text-blue-400 mr-2 mt-0.5 flex-shrink-0" />
                <div className="text-sm text-blue-300">
                  通过后学员将收到审核通过的通知，但不会自动发放证书。您可以稍后在学员列表中选择需要发放证书的学员进行操作。
                </div>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsReviewDialogOpen(false)} className="border-gray-600">
              取消
            </Button>
            <Button onClick={submitBatchReview} disabled={isSubmitting}>
              {isSubmitting ? (
                <>
                  <div className="animate-spin mr-2 h-4 w-4 border-2 border-current border-t-transparent rounded-full"></div>
                  处理中...
                </>
              ) : (
                <>
                  <Check className="mr-2 h-4 w-4" />
                  确认通过
                </>
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* 批量拒绝对话框 */}
      <Dialog open={isRejectDialogOpen} onOpenChange={setIsRejectDialogOpen}>
        <DialogContent className="bg-gray-800 border-gray-700 text-white">
          <DialogHeader>
            <DialogTitle>批量拒绝审核</DialogTitle>
          </DialogHeader>
          <div className="py-4">
            <p className="text-gray-300 mb-4">
              您确定要批量拒绝以下 <span className="font-semibold">{selectedStudents.length}</span> 名学员的审核吗？
            </p>

            <div className="space-y-3">
              <Label htmlFor="reject-reason" className="text-gray-200">
                拒绝原因
              </Label>
              <Textarea
                id="reject-reason"
                placeholder="请输入拒绝原因，该信息将发送给学员"
                value={rejectReason}
                onChange={(e) => setRejectReason(e.target.value)}
                rows={3}
                className="bg-gray-700 border-gray-600 text-white"
              />
            </div>

            <div className="mt-4 p-3 bg-red-900/50 rounded-md border border-red-800">
              <div className="flex items-start">
                <AlertTriangle className="h-5 w-5 text-red-400 mr-2 mt-0.5 flex-shrink-0" />
                <div className="text-sm text-red-300">
                  拒绝后学员将收到审核未通过的通知，包含您填写的拒绝原因。学员可以根据原因进行调整后重新提交。
                </div>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsRejectDialogOpen(false)} className="border-gray-600">
              取消
            </Button>
            <Button variant="destructive" onClick={submitBatchReject} disabled={isSubmitting}>
              {isSubmitting ? (
                <>
                  <div className="animate-spin mr-2 h-4 w-4 border-2 border-current border-t-transparent rounded-full"></div>
                  处理中...
                </>
              ) : (
                <>
                  <X className="mr-2 h-4 w-4" />
                  确认拒绝
                </>
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* 导出数据对话框 */}
      <Dialog open={isExportDialogOpen} onOpenChange={setIsExportDialogOpen}>
        <DialogContent className="bg-gray-800 border-gray-700 text-white">
          <DialogHeader>
            <DialogTitle>导出考生数据</DialogTitle>
          </DialogHeader>
          <div className="py-4 space-y-5">
            <div className="space-y-2">
              <Label className="text-gray-200">导出内容选择</Label>
              <div className="grid gap-2 border border-gray-700 rounded-md p-3">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="export-all"
                    checked={exportOptions.includeAll}
                    onCheckedChange={(checked) => setExportOptions({ ...exportOptions, includeAll: !!checked })}
                  />
                  <Label htmlFor="export-all" className="text-gray-200">
                    所有学员信息
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="export-passed"
                    checked={exportOptions.includePassed}
                    onCheckedChange={(checked) => setExportOptions({ ...exportOptions, includePassed: !!checked })}
                  />
                  <Label htmlFor="export-passed" className="text-gray-200">
                    仅已审核通过学员
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="export-certificate"
                    checked={exportOptions.includeCertificate}
                    onCheckedChange={(checked) => setExportOptions({ ...exportOptions, includeCertificate: !!checked })}
                  />
                  <Label htmlFor="export-certificate" className="text-gray-200">
                    仅已发证书学员
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="export-pending"
                    checked={exportOptions.includePending}
                    onCheckedChange={(checked) => setExportOptions({ ...exportOptions, includePending: !!checked })}
                  />
                  <Label htmlFor="export-pending" className="text-gray-200">
                    仅待审核学员
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="export-failed"
                    checked={exportOptions.includeFailed}
                    onCheckedChange={(checked) => setExportOptions({ ...exportOptions, includeFailed: !!checked })}
                  />
                  <Label htmlFor="export-failed" className="text-gray-200">
                    仅未通过学员
                  </Label>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <Label htmlFor="include-photos" className="text-gray-200">
                包含证件照
              </Label>
              <Switch
                id="include-photos"
                checked={exportOptions.includePhotos}
                onCheckedChange={(checked) => setExportOptions({ ...exportOptions, includePhotos: checked })}
              />
            </div>

            {exportOptions.includePhotos && (
              <div className="space-y-2">
                <div className="space-y-2">
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
                <div className="space-y-2">
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
              </div>
            )}

            <div className="p-3 bg-blue-900/50 rounded-md border border-blue-800">
              <div className="flex items-start">
                <Info className="h-5 w-5 text-blue-400 mr-2 mt-0.5 flex-shrink-0" />
                <div className="text-sm text-blue-300">
                  导出文件将包含学员的基本信息、考试成绩、审核状态和证书信息。如选择包含证件照，将一并导出学员上传的证件照片。
                </div>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsExportDialogOpen(false)} className="border-gray-600">
              取消
            </Button>
            <Button onClick={submitExport} disabled={isSubmitting}>
              {isSubmitting ? (
                <>
                  <div className="animate-spin mr-2 h-4 w-4 border-2 border-current border-t-transparent rounded-full"></div>
                  导出中...
                </>
              ) : (
                <>
                  <Download className="mr-2 h-4 w-4" />
                  确认导出
                </>
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* 学员详情对话框 */}
      <Dialog open={isStudentInfoDialogOpen} onOpenChange={setIsStudentInfoDialogOpen}>
        <DialogContent className="bg-gray-800 border-gray-700 text-white">
          <DialogHeader>
            <DialogTitle>学员详细信息</DialogTitle>
          </DialogHeader>
          {selectedStudent && (
            <div className="py-4 space-y-4">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="text-lg font-medium text-white">{selectedStudent.name}</h3>
                  <p className="text-sm text-gray-400">{selectedStudent.organization}</p>
                </div>
                {getStatusBadge(selectedStudent.status)}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <Label className="text-xs text-gray-400">证件类型</Label>
                  <p className="text-gray-200">{selectedStudent.idType}</p>
                </div>
                <div className="space-y-1">
                  <Label className="text-xs text-gray-400">证件号码</Label>
                  <p className="text-gray-200">{selectedStudent.idNumber}</p>
                </div>
                <div className="space-y-1">
                  <Label className="text-xs text-gray-400">手机号码</Label>
                  <p className="text-gray-200">{selectedStudent.phone}</p>
                </div>
                <div className="space-y-1">
                  <Label className="text-xs text-gray-400">电子邮箱</Label>
                  <p className="text-gray-200">{selectedStudent.email}</p>
                </div>
                <div className="space-y-1">
                  <Label className="text-xs text-gray-400">分数</Label>
                  <p
                    className={
                      selectedStudent.score >= 80
                        ? "text-green-400"
                        : selectedStudent.score >= 60
                          ? "text-amber-400"
                          : "text-red-400"
                    }
                  >
                    {selectedStudent.score}
                  </p>
                </div>
                <div className="space-y-1">
                  <Label className="text-xs text-gray-400">提交时间</Label>
                  <p className="text-gray-200">{selectedStudent.submitTime}</p>
                </div>
                <div className="space-y-1">
                  <Label className="text-xs text-gray-400">审核时间</Label>
                  <p className="text-gray-200">{selectedStudent.reviewTime || "-"}</p>
                </div>
                <div className="space-y-1">
                  <Label className="text-xs text-gray-400">证书状态</Label>
                  <p className="text-gray-200">
                    {selectedStudent.hasCertificate ? `已发放 (${selectedStudent.certificateTime})` : "未发放"}
                  </p>
                </div>
              </div>

              {selectedStudent.hasPhoto && (
                <div className="border border-gray-700 rounded-md p-3">
                  <Label className="text-xs text-gray-400 mb-2 block">证件照</Label>
                  <div className="flex justify-center">
                    <div className="relative h-48 w-36 bg-gray-700 rounded-md overflow-hidden">
                      <Image src="/one-inch-id-photo.png" alt="证件照" fill style={{ objectFit: "cover" }} />
                    </div>
                  </div>
                </div>
              )}

              {selectedStudent.status === "pending" && (
                <div className="flex space-x-2 justify-end">
                  <Button variant="default" className="bg-green-600 hover:bg-green-700">
                    <Check className="mr-2 h-4 w-4" />
                    通过审核
                  </Button>
                  <Button variant="outline" className="border-red-800 text-red-300 hover:bg-red-900/30">
                    <X className="mr-2 h-4 w-4" />
                    拒绝审核
                  </Button>
                </div>
              )}

              {selectedStudent.status === "passed" && !selectedStudent.hasCertificate && (
                <div className="flex justify-end">
                  <Button variant="default" className="bg-blue-600 hover:bg-blue-700">
                    <Award className="mr-2 h-4 w-4" />
                    发放证书
                  </Button>
                </div>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
