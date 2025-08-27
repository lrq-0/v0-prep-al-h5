"use client"

import { useState } from "react"
import { ArrowLeft, CreditCard, BookOpen, FileText, Users, Plus, Search, Edit, Trash2 } from "lucide-react"
import Link from "next/link"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import Image from "next/image"

export default function PricingManagement() {
  const [activeTab, setActiveTab] = useState("membership")
  const [searchQuery, setSearchQuery] = useState("")
  const [filterType, setFilterType] = useState("all")
  const [showDeleteAlert, setShowDeleteAlert] = useState(false)
  const [itemToDelete, setItemToDelete] = useState(null)

  // 处理删除确认
  const handleDeleteConfirm = () => {
    // 这里添加删除逻辑
    console.log("删除项目:", itemToDelete)
    setShowDeleteAlert(false)
    setItemToDelete(null)
  }

  // 打开删除确认对话框
  const openDeleteDialog = (item) => {
    setItemToDelete(item)
    setShowDeleteAlert(true)
  }

  return (
    <div className="min-h-screen bg-black text-white">
      {/* 顶部导航栏 */}
      <div className="sticky top-0 left-0 right-0 h-14 flex items-center px-4 bg-gray-900/80 backdrop-blur-md border-b border-gray-800 z-10">
        <Link href="/management" className="flex items-center text-gray-300">
          <ArrowLeft className="h-5 w-5 mr-2" />
          <span>返回</span>
        </Link>
        <h1 className="flex-1 text-center text-lg font-semibold text-white">价格设置</h1>
      </div>

      <div className="p-4 pb-24">
        {/* 功能介绍 */}
        <div className="p-4 bg-blue-900/20 border border-blue-500/30 rounded-lg mb-6">
          <h2 className="text-lg font-semibold text-white mb-2">价格设置</h2>
          <p className="text-sm text-gray-300">
            在这里可以设置各类产品的价格和配置，包括会员、课程、考试和代理加盟等。您可以为不同产品设置价格、原价、产品组合和其他相关配置。
          </p>
        </div>

        {/* 主要内容区域 */}
        <Tabs defaultValue="membership" value={activeTab} onValueChange={setActiveTab} className="w-full">
          {/* 内容区域 */}
          <div className="mb-20">
            {/* 会员价格配置 */}
            <TabsContent value="membership">
              <MembershipPricing />
            </TabsContent>

            {/* 课程价格配置 */}
            <TabsContent value="courses">
              <CoursePricing />
            </TabsContent>

            {/* 考试价格配置 */}
            <TabsContent value="exams">
              <ExamPricing />
            </TabsContent>

            {/* 代理加盟配置 */}
            <TabsContent value="agents">
              <AgentPricing />
            </TabsContent>
          </div>

          {/* 底部固定菜单栏 */}
          <div className="fixed bottom-0 left-0 right-0 bg-gray-900 border-t border-gray-800 z-20">
            <TabsList className="w-full grid grid-cols-4 bg-gray-900 rounded-none h-14">
              <TabsTrigger
                value="membership"
                className="data-[state=active]:text-blue-400 flex flex-col items-center py-2 text-xs"
              >
                <CreditCard className="h-5 w-5 mb-1" />
                会员价格
              </TabsTrigger>
              <TabsTrigger
                value="courses"
                className="data-[state=active]:text-blue-400 flex flex-col items-center py-2 text-xs"
              >
                <BookOpen className="h-5 w-5 mb-1" />
                课程价格
              </TabsTrigger>
              <TabsTrigger
                value="exams"
                className="data-[state=active]:text-blue-400 flex flex-col items-center py-2 text-xs"
              >
                <FileText className="h-5 w-5 mb-1" />
                考试价格
              </TabsTrigger>
              <TabsTrigger
                value="agents"
                className="data-[state=active]:text-blue-400 flex flex-col items-center py-2 text-xs"
              >
                <Users className="h-5 w-5 mb-1" />
                代理加盟
              </TabsTrigger>
            </TabsList>
          </div>
        </Tabs>

        {/* 底部固定菜单栏 */}
      </div>

      {/* 删除确认对话框 */}
      <AlertDialog open={showDeleteAlert} onOpenChange={setShowDeleteAlert}>
        <AlertDialogContent className="bg-gray-900 border-gray-700 text-white">
          <AlertDialogHeader>
            <AlertDialogTitle>确认删除</AlertDialogTitle>
            <AlertDialogDescription className="text-gray-400">
              您确定要删除此项目吗？此操作无法撤销，删除后相关数据将无法恢复。
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="bg-gray-800 text-white border-gray-700 hover:bg-gray-700">
              取消
            </AlertDialogCancel>
            <AlertDialogAction className="bg-red-600 hover:bg-red-500" onClick={handleDeleteConfirm}>
              确认删除
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}

// 会员价格配置组件
function MembershipPricing() {
  const [searchQuery, setSearchQuery] = useState("")
  const [filterType, setFilterType] = useState("all")
  const [showCreateDialog, setShowCreateDialog] = useState(false)
  const [showEditDialog, setShowEditDialog] = useState(false)
  const [selectedMembership, setSelectedMembership] = useState(null)
  const [showDeleteAlert, setShowDeleteAlert] = useState(false)

  // 模拟会员数据
  const memberships = [
    {
      id: 1,
      name: "月度会员",
      type: "month",
      price: 39.9,
      originalPrice: 59.9,
      count: null,
      products: ["高考英语词汇精讲", "Python编程能力评估"],
      order: 1,
      description: "每月自动续费，享受全平台课程折扣和AI助手无限使用权限",
    },
    {
      id: 2,
      name: "年度会员",
      type: "year",
      price: 299,
      originalPrice: 599,
      count: null,
      products: ["高考英语词汇精讲", "数学解题技巧与方法", "Python编程能力评估"],
      order: 2,
      description: "一次付费，全年使用，享受全平台课程折扣和AI助手无限使用权限",
    },
    {
      id: 3,
      name: "终身会员",
      type: "lifetime",
      price: 999,
      originalPrice: 1999,
      count: null,
      products: ["全部课程", "全部考试", "全部知识库"],
      order: 3,
      description: "一次付费，终身使用，享受全平台所有资源和特权",
    },
    {
      id: 4,
      name: "AI助手次卡",
      type: "count",
      price: 19.9,
      originalPrice: 29.9,
      count: 20,
      products: [],
      order: 4,
      description: "购买后获得20次AI助手使用次数，用完为止",
    },
  ]

  // 过滤会员
  const filteredMemberships = memberships.filter((membership) => {
    const matchesSearch = membership.name.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesType = filterType === "all" || membership.type === filterType
    return matchesSearch && matchesType
  })

  // 打开编辑对话框
  const openEditDialog = (membership) => {
    setSelectedMembership(membership)
    setShowEditDialog(true)
  }

  return (
    <div>
      {/* 搜索和筛选 */}
      <div className="flex items-center justify-between mb-6">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 h-4 w-4" />
          <Input
            placeholder="搜索会员名称..."
            className="pl-9 bg-gray-900 border-gray-700 text-white placeholder:text-gray-500 focus-visible:ring-blue-500"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="flex gap-2 ml-2">
          <Select value={filterType} onValueChange={setFilterType}>
            <SelectTrigger className="w-[150px] bg-gray-900 border-gray-700 text-white">
              <SelectValue placeholder="筛选类型" />
            </SelectTrigger>
            <SelectContent className="bg-gray-900 border-gray-700 text-white">
              <SelectItem value="all">全部类型</SelectItem>
              <SelectItem value="count">次卡</SelectItem>
              <SelectItem value="month">月卡</SelectItem>
              <SelectItem value="year">年卡</SelectItem>
              <SelectItem value="lifetime">终身会员</SelectItem>
            </SelectContent>
          </Select>
          <Button className="bg-blue-600 hover:bg-blue-500" onClick={() => setShowCreateDialog(true)}>
            <Plus className="h-4 w-4 mr-1" />
            创建会员
          </Button>
        </div>
      </div>

      {/* 会员列表 */}
      <div className="space-y-4">
        {filteredMemberships.length === 0 ? (
          <div className="text-center py-12 bg-gray-900 rounded-lg">
            <p className="text-gray-500">没有找到匹配的会员配置</p>
          </div>
        ) : (
          filteredMemberships.map((membership) => (
            <Card key={membership.id} className="p-4 bg-gray-900 border-gray-800">
              <div className="flex flex-col md:flex-row md:items-center justify-between">
                <div className="flex-1">
                  <div className="flex items-center mb-2">
                    <h3 className="text-lg font-semibold text-white mr-2">{membership.name}</h3>
                    <Badge
                      className={
                        membership.type === "count"
                          ? "bg-blue-900/30 text-blue-400 border border-blue-500/30"
                          : membership.type === "month"
                            ? "bg-green-900/30 text-green-400 border border-green-500/30"
                            : membership.type === "year"
                              ? "bg-purple-900/30 text-purple-400 border border-purple-500/30"
                              : "bg-amber-900/30 text-amber-400 border border-amber-500/30"
                      }
                    >
                      {membership.type === "count"
                        ? "次卡"
                        : membership.type === "month"
                          ? "月卡"
                          : membership.type === "year"
                            ? "年卡"
                            : "终身会员"}
                    </Badge>
                  </div>
                  <div className="flex items-center mb-2">
                    <span className="text-red-400 font-medium text-lg mr-2">¥{membership.price}</span>
                    <span className="text-gray-500 line-through text-sm">¥{membership.originalPrice}</span>
                    {membership.type === "count" && (
                      <span className="ml-2 text-gray-400 text-sm">{membership.count}次</span>
                    )}
                  </div>
                  <p className="text-sm text-gray-400 mb-2">{membership.description}</p>
                  {membership.products.length > 0 && (
                    <div className="mb-2">
                      <p className="text-xs text-gray-500 mb-1">包含产品:</p>
                      <div className="flex flex-wrap gap-1">
                        {membership.products.map((product, index) => (
                          <Badge key={index} variant="outline" className="bg-gray-800 text-gray-300 border-gray-700">
                            {product}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
                <div className="flex gap-2 mt-4 md:mt-0">
                  <Button
                    variant="outline"
                    size="sm"
                    className="border-blue-500/30 text-blue-400 hover:bg-blue-500/20"
                    onClick={() => openEditDialog(membership)}
                  >
                    <Edit className="h-4 w-4 mr-1" />
                    编辑
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="border-red-500/30 text-red-400 hover:bg-red-500/20"
                    onClick={() => {
                      setSelectedMembership(membership)
                      setShowDeleteAlert(true)
                    }}
                  >
                    <Trash2 className="h-4 w-4 mr-1" />
                    删除
                  </Button>
                </div>
              </div>
            </Card>
          ))
        )}
      </div>

      {/* 创建会员对话框 */}
      {showCreateDialog && (
        <MembershipFormDialog
          isOpen={showCreateDialog}
          onClose={() => setShowCreateDialog(false)}
          title="创建会员"
          membership={null}
        />
      )}

      {/* 编辑会员对话框 */}
      {showEditDialog && selectedMembership && (
        <MembershipFormDialog
          isOpen={showEditDialog}
          onClose={() => setShowEditDialog(false)}
          title="编辑会员"
          membership={selectedMembership}
        />
      )}
    </div>
  )
}

// 会员表单对话框组件
function MembershipFormDialog({ isOpen, onClose, title, membership }) {
  // 表单状态
  const [formData, setFormData] = useState(
    membership || {
      name: "",
      type: "month",
      price: "",
      originalPrice: "",
      count: "",
      products: [],
      order: 1,
      description: "",
    },
  )

  // 可选产品列表
  const availableProducts = [
    { id: 1, name: "高考英语词汇精讲", type: "course" },
    { id: 2, name: "数学解题技巧与方法", type: "course" },
    { id: 3, name: "Python编程能力评估", type: "exam" },
    { id: 4, name: "数据分析师认证考试", type: "exam" },
    { id: 5, name: "高考备考指南", type: "document" },
    { id: 6, name: "编程学习路线", type: "document" },
  ]

  // 处理表单提交
  const handleSubmit = () => {
    console.log("提交表单数据:", formData)
    onClose()
  }

  // 处理表单字段变化
  const handleChange = (field, value) => {
    setFormData({ ...formData, [field]: value })
  }

  // 处理产品选择
  const handleProductSelect = (productId) => {
    const product = availableProducts.find((p) => p.id === productId)
    if (product && !formData.products.includes(product.name)) {
      setFormData({ ...formData, products: [...formData.products, product.name] })
    }
  }

  // 移除已选产品
  const removeProduct = (productName) => {
    setFormData({ ...formData, products: formData.products.filter((p) => p !== productName) })
  }

  return (
    <div className={`fixed inset-0 z-50 flex items-center justify-center ${isOpen ? "" : "hidden"}`}>
      <div className="absolute inset-0 bg-black bg-opacity-70" onClick={onClose}></div>
      <div className="relative bg-gray-900 border border-gray-800 rounded-lg w-full max-w-2xl max-h-[90vh] overflow-auto">
        <div className="sticky top-0 bg-gray-900 p-4 border-b border-gray-800 flex justify-between items-center">
          <h2 className="text-lg font-semibold text-white">{title}</h2>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <Trash2 className="h-5 w-5 text-gray-400" />
          </Button>
        </div>

        <div className="p-4 space-y-4">
          {/* 会员名称 */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">会员名称</label>
            <Input
              value={formData.name}
              onChange={(e) => handleChange("name", e.target.value)}
              placeholder="输入会员名称"
              className="bg-gray-800 border-gray-700 text-white"
            />
          </div>

          {/* 会员类型 */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">会员类型</label>
            <Select value={formData.type} onValueChange={(value) => handleChange("type", value)}>
              <SelectTrigger className="bg-gray-800 border-gray-700 text-white">
                <SelectValue placeholder="选择会员类型" />
              </SelectTrigger>
              <SelectContent className="bg-gray-900 border-gray-700 text-white">
                <SelectItem value="count">次卡</SelectItem>
                <SelectItem value="month">月卡</SelectItem>
                <SelectItem value="year">年卡</SelectItem>
                <SelectItem value="lifetime">终身会员</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* 价格和原价 */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">价格 (¥)</label>
              <Input
                type="number"
                value={formData.price}
                onChange={(e) => handleChange("price", Number.parseFloat(e.target.value))}
                placeholder="输入价格"
                className="bg-gray-800 border-gray-700 text-white"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">原价 (¥)</label>
              <Input
                type="number"
                value={formData.originalPrice}
                onChange={(e) => handleChange("originalPrice", Number.parseFloat(e.target.value))}
                placeholder="输入原价"
                className="bg-gray-800 border-gray-700 text-white"
              />
            </div>
          </div>

          {/* 次数 (仅次卡) */}
          {formData.type === "count" && (
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">使用次数</label>
              <Input
                type="number"
                value={formData.count}
                onChange={(e) => handleChange("count", Number.parseInt(e.target.value))}
                placeholder="输入使用次数"
                className="bg-gray-800 border-gray-700 text-white"
              />
            </div>
          )}

          {/* 排序 */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">排序</label>
            <Input
              type="number"
              value={formData.order}
              onChange={(e) => handleChange("order", Number.parseInt(e.target.value))}
              placeholder="输入排序数字"
              className="bg-gray-800 border-gray-700 text-white"
            />
            <p className="text-xs text-gray-500 mt-1">数字越小排序越靠前</p>
          </div>

          {/* 产品配置 */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">添加产品配置</label>
            <Select onValueChange={(value) => handleProductSelect(Number.parseInt(value))}>
              <SelectTrigger className="bg-gray-800 border-gray-700 text-white">
                <SelectValue placeholder="选择要添加的产品" />
              </SelectTrigger>
              <SelectContent className="bg-gray-900 border-gray-700 text-white">
                <SelectItem value="0" disabled>
                  选择产品
                </SelectItem>
                {availableProducts.map((product) => (
                  <SelectItem key={product.id} value={product.id.toString()}>
                    {product.name} ({product.type === "course" ? "课程" : product.type === "exam" ? "考试" : "文档"})
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {/* 已选产品列表 */}
            {formData.products.length > 0 && (
              <div className="mt-2">
                <p className="text-xs text-gray-400 mb-1">已选产品:</p>
                <div className="flex flex-wrap gap-2">
                  {formData.products.map((product, index) => (
                    <Badge
                      key={index}
                      variant="outline"
                      className="bg-gray-800 text-gray-300 border-gray-700 flex items-center"
                    >
                      {product}
                      <button className="ml-1 text-gray-400 hover:text-gray-200" onClick={() => removeProduct(product)}>
                        ×
                      </button>
                    </Badge>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* 产品描述 */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">产品描述</label>
            <textarea
              value={formData.description}
              onChange={(e) => handleChange("description", e.target.value)}
              placeholder="输入产品描述"
              className="w-full h-24 px-3 py-2 bg-gray-800 border border-gray-700 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        <div className="sticky bottom-0 bg-gray-900 p-4 border-t border-gray-800 flex justify-end gap-2">
          <Button variant="outline" className="border-gray-700 text-gray-300" onClick={onClose}>
            取消
          </Button>
          <Button className="bg-blue-600 hover:bg-blue-500" onClick={handleSubmit}>
            确认
          </Button>
        </div>
      </div>
    </div>
  )
}

// 课程价格配置组件
function CoursePricing() {
  const [searchQuery, setSearchQuery] = useState("")
  const [filterType, setFilterType] = useState("all")
  const [showEditDialog, setShowEditDialog] = useState(false)
  const [selectedCourse, setSelectedCourse] = useState(null)
  const [showDeleteAlert, setShowDeleteAlert] = useState(false)

  // 模拟课程数据
  const courses = [
    {
      id: 1,
      name: "高考英语词汇精讲",
      type: "recorded",
      price: 299,
      originalPrice: 399,
      validDays: 365,
      image: "/images/course-1.png",
      products: ["月度会员", "年度会员"],
      description: "系统讲解高考英语核心词汇，包含记忆方法和实战应用",
    },
    {
      id: 2,
      name: "数学解题技巧与方法",
      type: "recorded",
      price: 199,
      originalPrice: 299,
      validDays: 180,
      image: "/images/course-2.png",
      products: ["年度会员"],
      description: "掌握数学解题的核心技巧和方法，提高解题效率和准确率",
    },
    {
      id: 3,
      name: "高考英语冲刺班",
      type: "live",
      price: 399,
      originalPrice: 599,
      liveAccess: true,
      replayAccess: true,
      image: "/images/course-1.png",
      products: ["年度会员"],
      description: "高考前冲刺直播课程，针对性讲解高考重点和难点",
    },
    {
      id: 4,
      name: "数学难点突破讲解",
      type: "live",
      price: 299,
      originalPrice: 399,
      liveAccess: true,
      replayAccess: false,
      image: "/images/course-2.png",
      products: [],
      description: "针对数学难点进行专项突破，直播互动答疑",
    },
  ]

  // 过滤课程
  const filteredCourses = courses.filter((course) => {
    const matchesSearch = course.name.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesType = filterType === "all" || course.type === filterType
    return matchesSearch && matchesType
  })

  // 打开编辑对话框
  const openEditDialog = (course) => {
    setSelectedCourse(course)
    setShowEditDialog(true)
  }

  return (
    <div>
      {/* 搜索和筛选 */}
      <div className="flex items-center justify-between mb-6">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 h-4 w-4" />
          <Input
            placeholder="搜索课程名称..."
            className="pl-9 bg-gray-900 border-gray-700 text-white placeholder:text-gray-500 focus-visible:ring-blue-500"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="flex gap-2 ml-2">
          <Select value={filterType} onValueChange={setFilterType}>
            <SelectTrigger className="w-[150px] bg-gray-900 border-gray-700 text-white">
              <SelectValue placeholder="筛选类型" />
            </SelectTrigger>
            <SelectContent className="bg-gray-900 border-gray-700 text-white">
              <SelectItem value="all">全部类型</SelectItem>
              <SelectItem value="recorded">录播课程</SelectItem>
              <SelectItem value="live">直播课程</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* 课程列表 */}
      <div className="space-y-4">
        {filteredCourses.length === 0 ? (
          <div className="text-center py-12 bg-gray-900 rounded-lg">
            <p className="text-gray-500">没有找到匹配的课程</p>
          </div>
        ) : (
          filteredCourses.map((course) => (
            <Card key={course.id} className="p-4 bg-gray-900 border-gray-800">
              <div className="flex">
                <div className="relative w-24 h-24 mr-4 rounded-md overflow-hidden">
                  <Image src={course.image || "/placeholder.svg"} alt={course.name} fill className="object-cover" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center mb-2">
                    <h3 className="text-lg font-semibold text-white mr-2">{course.name}</h3>
                    <Badge
                      className={
                        course.type === "recorded"
                          ? "bg-blue-900/30 text-blue-400 border border-blue-500/30"
                          : "bg-purple-900/30 text-purple-400 border border-purple-500/30"
                      }
                    >
                      {course.type === "recorded" ? "录播课程" : "直播课程"}
                    </Badge>
                  </div>
                  <div className="flex items-center mb-2">
                    <span className="text-red-400 font-medium text-lg mr-2">¥{course.price}</span>
                    <span className="text-gray-500 line-through text-sm">¥{course.originalPrice}</span>
                    {course.type === "recorded" ? (
                      <span className="ml-2 text-gray-400 text-sm">有效期: {course.validDays}天</span>
                    ) : (
                      <div className="ml-2 flex gap-2">
                        <Badge
                          variant="outline"
                          className={
                            course.liveAccess
                              ? "bg-green-900/20 text-green-400 border-green-500/30"
                              : "bg-gray-800 text-gray-400 border-gray-700"
                          }
                        >
                          直播
                        </Badge>
                        <Badge
                          variant="outline"
                          className={
                            course.replayAccess
                              ? "bg-amber-900/20 text-amber-400 border-amber-500/30"
                              : "bg-gray-800 text-gray-400 border-gray-700"
                          }
                        >
                          回放
                        </Badge>
                      </div>
                    )}
                  </div>
                  <p className="text-sm text-gray-400 mb-2">{course.description}</p>
                  {course.products.length > 0 && (
                    <div className="mb-2">
                      <p className="text-xs text-gray-500 mb-1">包含产品:</p>
                      <div className="flex flex-wrap gap-1">
                        {course.products.map((product, index) => (
                          <Badge key={index} variant="outline" className="bg-gray-800 text-gray-300 border-gray-700">
                            {product}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
                <div className="flex gap-2 ml-4">
                  <Button
                    variant="outline"
                    size="sm"
                    className="border-blue-500/30 text-blue-400 hover:bg-blue-500/20"
                    onClick={() => openEditDialog(course)}
                  >
                    <Edit className="h-4 w-4 mr-1" />
                    编辑配置
                  </Button>
                </div>
              </div>
            </Card>
          ))
        )}
      </div>

      {/* 编辑课程对话框 */}
      {showEditDialog && selectedCourse && (
        <CourseFormDialog
          isOpen={showEditDialog}
          onClose={() => setShowEditDialog(false)}
          title="编辑课程配置"
          course={selectedCourse}
        />
      )}
    </div>
  )
}

// 课程表单对话框组件
function CourseFormDialog({ isOpen, onClose, title, course }) {
  // 表单状态
  const [formData, setFormData] = useState(course)

  // 可选产品列表
  const availableProducts = [
    { id: 1, name: "月度会员", type: "membership" },
    { id: 2, name: "年度会员", type: "membership" },
    { id: 3, name: "终身会员", type: "membership" },
    { id: 4, name: "Python编程能力评估", type: "exam" },
    { id: 5, name: "数据分析师认证考试", type: "exam" },
    { id: 6, name: "高考备考指南", type: "document" },
    { id: 7, name: "编程学习路线", type: "document" },
  ]

  // 处理表单提交
  const handleSubmit = () => {
    console.log("提交表单数据:", formData)
    onClose()
  }

  // 处理表单字段变化
  const handleChange = (field, value) => {
    setFormData({ ...formData, [field]: value })
  }

  // 处理产品选择
  const handleProductSelect = (productId) => {
    const product = availableProducts.find((p) => p.id === productId)
    if (product && !formData.products.includes(product.name)) {
      setFormData({ ...formData, products: [...formData.products, product.name] })
    }
  }

  // 移除已选产品
  const removeProduct = (productName) => {
    setFormData({ ...formData, products: formData.products.filter((p) => p !== productName) })
  }

  return (
    <div className={`fixed inset-0 z-50 flex items-center justify-center ${isOpen ? "" : "hidden"}`}>
      <div className="absolute inset-0 bg-black bg-opacity-70" onClick={onClose}></div>
      <div className="relative bg-gray-900 border border-gray-800 rounded-lg w-full max-w-2xl max-h-[90vh] overflow-auto">
        <div className="sticky top-0 bg-gray-900 p-4 border-b border-gray-800 flex justify-between items-center">
          <h2 className="text-lg font-semibold text-white">{title}</h2>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <Trash2 className="h-5 w-5 text-gray-400" />
          </Button>
        </div>

        <div className="p-4 space-y-4">
          {/* 课程信息 */}
          <div className="flex items-center mb-4">
            <div className="relative w-16 h-16 mr-3 rounded-md overflow-hidden">
              <Image src={formData.image || "/placeholder.svg"} alt={formData.name} fill className="object-cover" />
            </div>
            <div>
              <h3 className="font-medium text-white">{formData.name}</h3>
              <Badge
                className={
                  formData.type === "recorded"
                    ? "bg-blue-900/30 text-blue-400 border border-blue-500/30 mt-1"
                    : "bg-purple-900/30 text-purple-400 border border-purple-500/30 mt-1"
                }
              >
                {formData.type === "recorded" ? "录播课程" : "直播课程"}
              </Badge>
            </div>
          </div>

          {/* 价格和原价 */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">价格 (¥)</label>
              <Input
                type="number"
                value={formData.price}
                onChange={(e) => handleChange("price", Number.parseFloat(e.target.value))}
                placeholder="输入价格"
                className="bg-gray-800 border-gray-700 text-white"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">原价 (¥)</label>
              <Input
                type="number"
                value={formData.originalPrice}
                onChange={(e) => handleChange("originalPrice", Number.parseFloat(e.target.value))}
                placeholder="输入原价"
                className="bg-gray-800 border-gray-700 text-white"
              />
            </div>
          </div>

          {/* 录播课特有字段 */}
          {formData.type === "recorded" && (
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">可用天数</label>
              <Input
                type="number"
                value={formData.validDays}
                onChange={(e) => handleChange("validDays", Number.parseInt(e.target.value))}
                placeholder="输入可用天数"
                className="bg-gray-800 border-gray-700 text-white"
              />
              <p className="text-xs text-gray-500 mt-1">购买后可观看的有效期，单位为天</p>
            </div>
          )}

          {/* 直播课特有字段 */}
          {formData.type === "live" && (
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <label className="text-sm font-medium text-gray-300">开通直播观看权限</label>
                  <p className="text-xs text-gray-500">允许用户观看直播课程</p>
                </div>
                <div className="flex h-6 items-center">
                  <input
                    type="checkbox"
                    checked={formData.liveAccess}
                    onChange={(e) => handleChange("liveAccess", e.target.checked)}
                    className="h-4 w-4 rounded border-gray-700 bg-gray-800"
                  />
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <label className="text-sm font-medium text-gray-300">开通直播回放功能</label>
                  <p className="text-xs text-gray-500">允许用户观看直播回放</p>
                </div>
                <div className="flex h-6 items-center">
                  <input
                    type="checkbox"
                    checked={formData.replayAccess}
                    onChange={(e) => handleChange("replayAccess", e.target.checked)}
                    className="h-4 w-4 rounded border-gray-700 bg-gray-800"
                  />
                </div>
              </div>
            </div>
          )}

          {/* 产品配置 */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">添加产品配置</label>
            <Select onValueChange={(value) => handleProductSelect(Number.parseInt(value))}>
              <SelectTrigger className="bg-gray-800 border-gray-700 text-white">
                <SelectValue placeholder="选择要添加的产品" />
              </SelectTrigger>
              <SelectContent className="bg-gray-900 border-gray-700 text-white">
                <SelectItem value="0" disabled>
                  选择产品
                </SelectItem>
                {availableProducts.map((product) => (
                  <SelectItem key={product.id} value={product.id.toString()}>
                    {product.name} ({product.type === "membership" ? "会员" : product.type === "exam" ? "考试" : "文档"}
                    )
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {/* 已选产品列表 */}
            {formData.products.length > 0 && (
              <div className="mt-2">
                <p className="text-xs text-gray-400 mb-1">已选产品:</p>
                <div className="flex flex-wrap gap-2">
                  {formData.products.map((product, index) => (
                    <Badge
                      key={index}
                      variant="outline"
                      className="bg-gray-800 text-gray-300 border-gray-700 flex items-center"
                    >
                      {product}
                      <button className="ml-1 text-gray-400 hover:text-gray-200" onClick={() => removeProduct(product)}>
                        ×
                      </button>
                    </Badge>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* 产品描述 */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">产品描述</label>
            <textarea
              value={formData.description}
              onChange={(e) => handleChange("description", e.target.value)}
              placeholder="输入产品描述"
              className="w-full h-24 px-3 py-2 bg-gray-800 border border-gray-700 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        <div className="sticky bottom-0 bg-gray-900 p-4 border-t border-gray-800 flex justify-end gap-2">
          <Button variant="outline" className="border-gray-700 text-gray-300" onClick={onClose}>
            取消
          </Button>
          <Button className="bg-blue-600 hover:bg-blue-500" onClick={handleSubmit}>
            确认
          </Button>
        </div>
      </div>
    </div>
  )
}

// 考试价格配置组件
function ExamPricing() {
  const [searchQuery, setSearchQuery] = useState("")
  const [showEditDialog, setShowEditDialog] = useState(false)
  const [selectedExam, setSelectedExam] = useState(null)
  const [showDeleteAlert, setShowDeleteAlert] = useState(false)

  // 模拟考试数据
  const exams = [
    {
      id: 1,
      name: "Python编程能力评估",
      price: 99,
      originalPrice: 199,
      examEnabled: true,
      image: "/images/exam-1.png",
      products: ["月度会员", "年度会员"],
      description: "全面评估Python编程基础知识和实际应用能力",
    },
    {
      id: 2,
      name: "数据分析师认证考试",
      price: 199,
      originalPrice: 299,
      examEnabled: true,
      image: "/images/certificate-2.png",
      products: ["年度会员"],
      description: "专业数据分析能力认证，涵盖数据处理、统计分析和数据可视化等核心技能",
    },
    {
      id: 3,
      name: "工信部人工智能提示词工程师（高级）证书考试",
      price: 299,
      originalPrice: 399,
      examEnabled: true,
      image: "/images/certificate-1.png",
      products: [],
      description: "国家认可的AI提示词工程师专业资格认证考试",
    },
    {
      id: 4,
      name: "Web前端开发模拟测试",
      price: 0,
      originalPrice: 99,
      examEnabled: false,
      image: "/images/exam-3.png",
      products: ["年度会员"],
      description: "模拟前端开发工作中的实际场景，测试 HTML、CSS 和 JavaScript 技能",
    },
  ]

  // 过滤考试
  const filteredExams = exams.filter((exam) => {
    return exam.name.toLowerCase().includes(searchQuery.toLowerCase())
  })

  // 打开编辑对话框
  const openEditDialog = (exam) => {
    setSelectedExam(exam)
    setShowEditDialog(true)
  }

  return (
    <div>
      {/* 搜索 */}
      <div className="flex items-center justify-between mb-6">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 h-4 w-4" />
          <Input
            placeholder="搜索考试名称..."
            className="pl-9 bg-gray-900 border-gray-700 text-white placeholder:text-gray-500 focus-visible:ring-blue-500"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      {/* 考试列表 */}
      <div className="space-y-4">
        {filteredExams.length === 0 ? (
          <div className="text-center py-12 bg-gray-900 rounded-lg">
            <p className="text-gray-500">没有找到匹配的考试</p>
          </div>
        ) : (
          filteredExams.map((exam) => (
            <Card key={exam.id} className="p-4 bg-gray-900 border-gray-800">
              <div className="flex">
                <div className="relative w-24 h-24 mr-4 rounded-md overflow-hidden">
                  <Image src={exam.image || "/placeholder.svg"} alt={exam.name} fill className="object-cover" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center mb-2">
                    <h3 className="text-lg font-semibold text-white mr-2">{exam.name}</h3>
                    <Badge
                      className={
                        exam.examEnabled
                          ? "bg-green-900/30 text-green-400 border border-green-500/30"
                          : "bg-gray-800 text-gray-400 border border-gray-700"
                      }
                    >
                      {exam.examEnabled ? "已启用" : "未启用"}
                    </Badge>
                  </div>
                  <div className="flex items-center mb-2">
                    <span className="text-red-400 font-medium text-lg mr-2">
                      {exam.price > 0 ? `¥${exam.price}` : "免费"}
                    </span>
                    {exam.originalPrice > 0 && (
                      <span className="text-gray-500 line-through text-sm">¥{exam.originalPrice}</span>
                    )}
                  </div>
                  <p className="text-sm text-gray-400 mb-2">{exam.description}</p>
                  {exam.products.length > 0 && (
                    <div className="mb-2">
                      <p className="text-xs text-gray-500 mb-1">包含产品:</p>
                      <div className="flex flex-wrap gap-1">
                        {exam.products.map((product, index) => (
                          <Badge key={index} variant="outline" className="bg-gray-800 text-gray-300 border-gray-700">
                            {product}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
                <div className="flex gap-2 ml-4">
                  <Button
                    variant="outline"
                    size="sm"
                    className="border-blue-500/30 text-blue-400 hover:bg-blue-500/20"
                    onClick={() => openEditDialog(exam)}
                  >
                    <Edit className="h-4 w-4 mr-1" />
                    编辑配置
                  </Button>
                </div>
              </div>
            </Card>
          ))
        )}
      </div>

      {/* 编辑考试对话框 */}
      {showEditDialog && selectedExam && (
        <ExamFormDialog
          isOpen={showEditDialog}
          onClose={() => setShowEditDialog(false)}
          title="编辑考试配置"
          exam={selectedExam}
        />
      )}
    </div>
  )
}

// 考试表单对话框组件
function ExamFormDialog({ isOpen, onClose, title, exam }) {
  // 表单状态
  const [formData, setFormData] = useState(exam)

  // 可选产品列表
  const availableProducts = [
    { id: 1, name: "月度会员", type: "membership" },
    { id: 2, name: "年度会员", type: "membership" },
    { id: 3, name: "终身会员", type: "membership" },
    { id: 4, name: "高考英语词汇精讲", type: "course" },
    { id: 5, name: "数学解题技巧与方法", type: "course" },
    { id: 6, name: "高考备考指南", type: "document" },
    { id: 7, name: "编程学习路线", type: "document" },
  ]

  // 处理表单提交
  const handleSubmit = () => {
    console.log("提交表单数据:", formData)
    onClose()
  }

  // 处理表单字段变化
  const handleChange = (field, value) => {
    setFormData({ ...formData, [field]: value })
  }

  // 处理产品选择
  const handleProductSelect = (productId) => {
    const product = availableProducts.find((p) => p.id === productId)
    if (product && !formData.products.includes(product.name)) {
      setFormData({ ...formData, products: [...formData.products, product.name] })
    }
  }

  // 移除已选产品
  const removeProduct = (productName) => {
    setFormData({ ...formData, products: formData.products.filter((p) => p !== productName) })
  }

  return (
    <div className={`fixed inset-0 z-50 flex items-center justify-center ${isOpen ? "" : "hidden"}`}>
      <div className="absolute inset-0 bg-black bg-opacity-70" onClick={onClose}></div>
      <div className="relative bg-gray-900 border border-gray-800 rounded-lg w-full max-w-2xl max-h-[90vh] overflow-auto">
        <div className="sticky top-0 bg-gray-900 p-4 border-b border-gray-800 flex justify-between items-center">
          <h2 className="text-lg font-semibold text-white">{title}</h2>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <Trash2 className="h-5 w-5 text-gray-400" />
          </Button>
        </div>

        <div className="p-4 space-y-4">
          {/* 考试信息 */}
          <div className="flex items-center mb-4">
            <div className="relative w-16 h-16 mr-3 rounded-md overflow-hidden">
              <Image src={formData.image || "/placeholder.svg"} alt={formData.name} fill className="object-cover" />
            </div>
            <div>
              <h3 className="font-medium text-white">{formData.name}</h3>
            </div>
          </div>

          {/* 价格和原价 */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">价格 (¥)</label>
              <Input
                type="number"
                value={formData.price}
                onChange={(e) => handleChange("price", Number.parseFloat(e.target.value))}
                placeholder="输入价格"
                className="bg-gray-800 border-gray-700 text-white"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">原价 (¥)</label>
              <Input
                type="number"
                value={formData.originalPrice}
                onChange={(e) => handleChange("originalPrice", Number.parseFloat(e.target.value))}
                placeholder="输入原价"
                className="bg-gray-800 border-gray-700 text-white"
              />
            </div>
          </div>

          {/* 考试功能 */}
          <div className="flex items-center justify-between">
            <div>
              <label className="text-sm font-medium text-gray-300">开通考试功能</label>
              <p className="text-xs text-gray-500">允许用户参加此考试</p>
            </div>
            <div className="flex h-6 items-center">
              <input
                type="checkbox"
                checked={formData.examEnabled}
                onChange={(e) => handleChange("examEnabled", e.target.checked)}
                className="h-4 w-4 rounded border-gray-700 bg-gray-800"
              />
            </div>
          </div>

          {/* 产品配置 */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">添加产品配置</label>
            <Select onValueChange={(value) => handleProductSelect(Number.parseInt(value))}>
              <SelectTrigger className="bg-gray-800 border-gray-700 text-white">
                <SelectValue placeholder="选择要添加的产品" />
              </SelectTrigger>
              <SelectContent className="bg-gray-900 border-gray-700 text-white">
                <SelectItem value="0" disabled>
                  选择产品
                </SelectItem>
                {availableProducts.map((product) => (
                  <SelectItem key={product.id} value={product.id.toString()}>
                    {product.name} (
                    {product.type === "membership" ? "会员" : product.type === "course" ? "课程" : "文档"})
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {/* 已选产品列表 */}
            {formData.products.length > 0 && (
              <div className="mt-2">
                <p className="text-xs text-gray-400 mb-1">已选产品:</p>
                <div className="flex flex-wrap gap-2">
                  {formData.products.map((product, index) => (
                    <Badge
                      key={index}
                      variant="outline"
                      className="bg-gray-800 text-gray-300 border-gray-700 flex items-center"
                    >
                      {product}
                      <button className="ml-1 text-gray-400 hover:text-gray-200" onClick={() => removeProduct(product)}>
                        ×
                      </button>
                    </Badge>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* 产品描述 */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">产品描述</label>
            <textarea
              value={formData.description}
              onChange={(e) => handleChange("description", e.target.value)}
              placeholder="输入产品描述"
              className="w-full h-24 px-3 py-2 bg-gray-800 border border-gray-700 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        <div className="sticky bottom-0 bg-gray-900 p-4 border-t border-gray-800 flex justify-end gap-2">
          <Button variant="outline" className="border-gray-700 text-gray-300" onClick={onClose}>
            取消
          </Button>
          <Button className="bg-blue-600 hover:bg-blue-500" onClick={handleSubmit}>
            确认
          </Button>
        </div>
      </div>
    </div>
  )
}

// 代理加盟配置组件
function AgentPricing() {
  const [searchQuery, setSearchQuery] = useState("")
  const [showCreateDialog, setShowCreateDialog] = useState(false)
  const [showEditDialog, setShowEditDialog] = useState(false)
  const [selectedAgent, setSelectedAgent] = useState(null)
  const [showDeleteAlert, setShowDeleteAlert] = useState(false)

  // 模拟代理数据
  const agents = [
    {
      id: 1,
      name: "初级代理",
      price: 999,
      originalPrice: 1999,
      products: ["月度会员", "Python编程能力评估"],
      group: "初级代理",
      description: "适合个人创业者，提供基础的平台功能和服务",
    },
    {
      id: 2,
      name: "中级代理",
      price: 2999,
      originalPrice: 4999,
      products: ["月度会员", "年度会员", "高考英语词汇精讲", "Python编程能力评估"],
      group: "中级代理",
      description: "适合小型教育机构，提供更多的平台功能和服务",
    },
    {
      id: 3,
      name: "高级代理",
      price: 9999,
      originalPrice: 19999,
      products: ["全部会员", "全部课程", "全部考试", "全部知识库"],
      group: "高级代理",
      description: "适合大型教育机构，提供全部平台功能和服务，包含定制化支持",
    },
  ]

  // 过滤代理
  const filteredAgents = agents.filter((agent) => {
    return agent.name.toLowerCase().includes(searchQuery.toLowerCase())
  })

  // 打开编辑对话框
  const openEditDialog = (agent) => {
    setSelectedAgent(agent)
    setShowEditDialog(true)
  }

  return (
    <div>
      {/* 搜索和新建 */}
      <div className="flex items-center justify-between mb-6">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 h-4 w-4" />
          <Input
            placeholder="搜索代理名称..."
            className="pl-9 bg-gray-900 border-gray-700 text-white placeholder:text-gray-500 focus-visible:ring-blue-500"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="flex gap-2 ml-2">
          <Button className="bg-blue-600 hover:bg-blue-500" onClick={() => setShowCreateDialog(true)}>
            <Plus className="h-4 w-4 mr-1" />
            新增代理
          </Button>
        </div>
      </div>

      {/* 代理列表 */}
      <div className="space-y-4">
        {filteredAgents.length === 0 ? (
          <div className="text-center py-12 bg-gray-900 rounded-lg">
            <p className="text-gray-500">没有找到匹配的代理配置</p>
          </div>
        ) : (
          filteredAgents.map((agent) => (
            <Card key={agent.id} className="p-4 bg-gray-900 border-gray-800">
              <div className="flex flex-col md:flex-row md:items-center justify-between">
                <div className="flex-1">
                  <div className="flex items-center mb-2">
                    <h3 className="text-lg font-semibold text-white mr-2">{agent.name}</h3>
                    <Badge className="bg-purple-900/30 text-purple-400 border border-purple-500/30">
                      {agent.group}
                    </Badge>
                  </div>
                  <div className="flex items-center mb-2">
                    <span className="text-red-400 font-medium text-lg mr-2">¥{agent.price}</span>
                    <span className="text-gray-500 line-through text-sm">¥{agent.originalPrice}</span>
                  </div>
                  <p className="text-sm text-gray-400 mb-2">{agent.description}</p>
                  {agent.products.length > 0 && (
                    <div className="mb-2">
                      <p className="text-xs text-gray-500 mb-1">包含产品:</p>
                      <div className="flex flex-wrap gap-1">
                        {agent.products.map((product, index) => (
                          <Badge key={index} variant="outline" className="bg-gray-800 text-gray-300 border-gray-700">
                            {product}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
                <div className="flex gap-2 mt-4 md:mt-0">
                  <Button
                    variant="outline"
                    size="sm"
                    className="border-blue-500/30 text-blue-400 hover:bg-blue-500/20"
                    onClick={() => openEditDialog(agent)}
                  >
                    <Edit className="h-4 w-4 mr-1" />
                    编辑
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="border-red-500/30 text-red-400 hover:bg-red-500/20"
                    onClick={() => {
                      setSelectedAgent(agent)
                      setShowDeleteAlert(true)
                    }}
                  >
                    <Trash2 className="h-4 w-4 mr-1" />
                    删除
                  </Button>
                </div>
              </div>
            </Card>
          ))
        )}
      </div>

      {/* 创建代理对话框 */}
      {showCreateDialog && (
        <AgentFormDialog
          isOpen={showCreateDialog}
          onClose={() => setShowCreateDialog(false)}
          title="新增代理"
          agent={null}
        />
      )}

      {/* 编辑代理对话框 */}
      {showEditDialog && selectedAgent && (
        <AgentFormDialog
          isOpen={showEditDialog}
          onClose={() => setShowEditDialog(false)}
          title="编辑代理"
          agent={selectedAgent}
        />
      )}
    </div>
  )
}

// 代理表单对话框组件
function AgentFormDialog({ isOpen, onClose, title, agent }) {
  // 表单状态
  const [formData, setFormData] = useState(
    agent || {
      name: "",
      price: "",
      originalPrice: "",
      products: [],
      group: "",
      description: "",
    },
  )

  // 可选产品列表
  const availableProducts = [
    { id: 1, name: "月度会员", type: "membership" },
    { id: 2, name: "年度会员", type: "membership" },
    { id: 3, name: "终身会员", type: "membership" },
    { id: 4, name: "全部会员", type: "membership" },
    { id: 5, name: "高考英语词汇精讲", type: "course" },
    { id: 6, name: "数学解题技巧与方法", type: "course" },
    { id: 7, name: "全部课程", type: "course" },
    { id: 8, name: "Python编程能力评估", type: "exam" },
    { id: 9, name: "数据分析师认证考试", type: "exam" },
    { id: 10, name: "全部考试", type: "exam" },
    { id: 11, name: "高考备考指南", type: "document" },
    { id: 12, name: "编程学习路线", type: "document" },
    { id: 13, name: "全部知识库", type: "document" },
  ]

  // 代理分组
  const agentGroups = ["初级代理", "中级代理", "高级代理", "VIP代理", "定制代理"]

  // 处理表单提交
  const handleSubmit = () => {
    console.log("提交表单数据:", formData)
    onClose()
  }

  // 处理表单字段变化
  const handleChange = (field, value) => {
    setFormData({ ...formData, [field]: value })
  }

  // 处理产品选择
  const handleProductSelect = (productId) => {
    const product = availableProducts.find((p) => p.id === productId)
    if (product && !formData.products.includes(product.name)) {
      setFormData({ ...formData, products: [...formData.products, product.name] })
    }
  }

  // 移除已选产品
  const removeProduct = (productName) => {
    setFormData({ ...formData, products: formData.products.filter((p) => p !== productName) })
  }

  return (
    <div className={`fixed inset-0 z-50 flex items-center justify-center ${isOpen ? "" : "hidden"}`}>
      <div className="absolute inset-0 bg-black bg-opacity-70" onClick={onClose}></div>
      <div className="relative bg-gray-900 border border-gray-800 rounded-lg w-full max-w-2xl max-h-[90vh] overflow-auto">
        <div className="sticky top-0 bg-gray-900 p-4 border-b border-gray-800 flex justify-between items-center">
          <h2 className="text-lg font-semibold text-white">{title}</h2>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <Trash2 className="h-5 w-5 text-gray-400" />
          </Button>
        </div>

        <div className="p-4 space-y-4">
          {/* 代理名称 */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">代理名称</label>
            <Input
              value={formData.name}
              onChange={(e) => handleChange("name", e.target.value)}
              placeholder="输入代理名称"
              className="bg-gray-800 border-gray-700 text-white"
            />
          </div>

          {/* 价格和原价 */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">价格 (¥)</label>
              <Input
                type="number"
                value={formData.price}
                onChange={(e) => handleChange("price", Number.parseFloat(e.target.value))}
                placeholder="输入价格"
                className="bg-gray-800 border-gray-700 text-white"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">原价 (¥)</label>
              <Input
                type="number"
                value={formData.originalPrice}
                onChange={(e) => handleChange("originalPrice", Number.parseFloat(e.target.value))}
                placeholder="输入原价"
                className="bg-gray-800 border-gray-700 text-white"
              />
            </div>
          </div>

          {/* 绑定分组 */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">绑定分组</label>
            <Select value={formData.group} onValueChange={(value) => handleChange("group", value)}>
              <SelectTrigger className="bg-gray-800 border-gray-700 text-white">
                <SelectValue placeholder="选择代理分组" />
              </SelectTrigger>
              <SelectContent className="bg-gray-900 border-gray-700 text-white">
                {agentGroups.map((group) => (
                  <SelectItem key={group} value={group}>
                    {group}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* 产品配置 */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">添加产品配置</label>
            <Select onValueChange={(value) => handleProductSelect(Number.parseInt(value))}>
              <SelectTrigger className="bg-gray-800 border-gray-700 text-white">
                <SelectValue placeholder="选择要添加的产品" />
              </SelectTrigger>
              <SelectContent className="bg-gray-900 border-gray-700 text-white">
                <SelectItem value="0" disabled>
                  选择产品
                </SelectItem>
                {availableProducts.map((product) => (
                  <SelectItem key={product.id} value={product.id.toString()}>
                    {product.name} (
                    {product.type === "membership"
                      ? "会员"
                      : product.type === "course"
                        ? "课程"
                        : product.type === "exam"
                          ? "考试"
                          : "文档"}
                    )
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {/* 已选产品列表 */}
            {formData.products.length > 0 && (
              <div className="mt-2">
                <p className="text-xs text-gray-400 mb-1">已选产品:</p>
                <div className="flex flex-wrap gap-2">
                  {formData.products.map((product, index) => (
                    <Badge
                      key={index}
                      variant="outline"
                      className="bg-gray-800 text-gray-300 border-gray-700 flex items-center"
                    >
                      {product}
                      <button className="ml-1 text-gray-400 hover:text-gray-200" onClick={() => removeProduct(product)}>
                        ×
                      </button>
                    </Badge>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* 代理描述 */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">代理描述</label>
            <textarea
              value={formData.description}
              onChange={(e) => handleChange("description", e.target.value)}
              placeholder="输入代理描述"
              className="w-full h-24 px-3 py-2 bg-gray-800 border border-gray-700 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        <div className="sticky bottom-0 bg-gray-900 p-4 border-t border-gray-800 flex justify-end gap-2">
          <Button variant="outline" className="border-gray-700 text-gray-300" onClick={onClose}>
            取消
          </Button>
          <Button className="bg-blue-600 hover:bg-blue-500" onClick={handleSubmit}>
            确认
          </Button>
        </div>
      </div>
    </div>
  )
}
