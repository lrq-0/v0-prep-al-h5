"use client"

import { useState } from "react"
import {
  ArrowLeft,
  PlusCircle,
  BookOpen,
  Edit,
  ArrowUpDown,
  Trash2,
  ChevronDown,
  Clock,
  Users,
  Play,
  Home,
  Share2,
  GripVertical,
  ShoppingBag,
} from "lucide-react"
import Link from "next/link"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import Image from "next/image"
import { Switch } from "@/components/ui/switch"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { useRouter } from "next/navigation"

export default function CourseSettings() {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState("recorded")
  const [sortDialogOpen, setSortDialogOpen] = useState(false)
  const [currentCourseId, setCurrentCourseId] = useState<number | null>(null)
  const [sortValue, setSortValue] = useState("")
  const [categoryDialogOpen, setCategoryDialogOpen] = useState(false)
  const [newCategoryName, setNewCategoryName] = useState("")
  const [categoryToDelete, setCategoryToDelete] = useState<number | null>(null)
  const [categoryDeleteDialogOpen, setCategoryDeleteDialogOpen] = useState(false)
  const [categorySortDialogOpen, setCategorySortDialogOpen] = useState(false)
  const [currentCategoryId, setCurrentCategoryId] = useState<number | null>(null)
  const [categorySortValue, setCategorySortValue] = useState("")

  // 课程分类状态
  const [categories, setCategories] = useState([
    { id: 1, name: "直播课堂", visible: true, sortOrder: 1, collapsed: false },
    { id: 2, name: "精选课程", visible: true, sortOrder: 2, collapsed: false },
    { id: 3, name: "热门课程", visible: true, sortOrder: 3, collapsed: false },
  ])

  // 模拟录播课程数据
  const recordedCourses = [
    {
      id: 1,
      title: "高考英语词汇精讲",
      instructor: "王老师",
      price: "¥299",
      originalPrice: "¥399",
      status: "已上架",
      salesCount: 1289,
      duration: "24课时",
      image: "/images/course-1.png",
      featured: true,
      createdAt: "2025-03-15",
      sortOrder: 1,
      purchased: false,
      categoryId: 2,
      inMarket: true,
      onHomepage: true,
    },
    {
      id: 2,
      title: "数学解题技巧与方法",
      instructor: "李老师",
      price: "免费",
      originalPrice: "",
      status: "已上架",
      salesCount: 956,
      duration: "18课时",
      image: "/images/course-2.png",
      featured: true,
      createdAt: "2025-03-10",
      sortOrder: 2,
      purchased: false,
      categoryId: 2,
      inMarket: false,
      onHomepage: true,
    },
    {
      id: 3,
      title: "物理实验与解析",
      instructor: "张老师",
      price: "¥279",
      originalPrice: "¥379",
      status: "已上架",
      salesCount: 782,
      duration: "16课时",
      image: "/images/course-3.png",
      featured: false,
      createdAt: "2025-02-28",
      sortOrder: 3,
      purchased: false,
      categoryId: 3,
      inMarket: true,
      onHomepage: false,
    },
    {
      id: 4,
      title: "语文阅读理解专项训练",
      instructor: "刘老师",
      price: "免费",
      originalPrice: "",
      status: "草稿",
      salesCount: 0,
      duration: "20课时",
      image: "/images/course-4.png",
      featured: false,
      createdAt: "2025-02-20",
      sortOrder: 4,
      purchased: false,
      categoryId: 3,
      inMarket: false,
      onHomepage: false,
    },
  ]

  // 模拟直播课程数据
  const liveCourses = [
    {
      id: 1,
      title: "高考英语冲刺班",
      instructor: "王老师",
      price: "¥99",
      status: "进行中",
      viewersCount: 256,
      startTime: "今天 19:30",
      image: "/images/course-1.png",
      featured: true,
      sortOrder: 1,
      purchased: false,
      categoryId: 1,
      inMarket: true,
      onHomepage: true,
    },
    {
      id: 2,
      title: "数学难点突破讲解",
      instructor: "李老师",
      price: "免费",
      status: "已结束",
      viewersCount: 1024,
      startTime: "2025-04-22 19:30",
      image: "/images/course-2.png",
      featured: true,
      sortOrder: 2,
      purchased: false,
      categoryId: 1,
      inMarket: false,
      onHomepage: true,
    },
    {
      id: 3,
      title: "物理实验专题",
      instructor: "张老师",
      price: "¥59",
      status: "未开始",
      viewersCount: 0,
      startTime: "2025-04-24 21:00",
      image: "/images/course-3.png",
      featured: false,
      sortOrder: 3,
      purchased: false,
      categoryId: 1,
      inMarket: true,
      onHomepage: false,
    },
  ]

  // 处理排序对话框
  const handleOpenSortDialog = (courseId: number) => {
    setCurrentCourseId(courseId)
    const course =
      activeTab === "recorded"
        ? recordedCourses.find((c) => c.id === courseId)
        : liveCourses.find((c) => c.id === courseId)

    setSortValue(course?.sortOrder?.toString() || "")
    setSortDialogOpen(true)
  }

  const handleSaveSort = () => {
    // 这里应该有保存排序的逻辑
    console.log(`设置课程 ID ${currentCourseId} 的排序为 ${sortValue}`)
    setSortDialogOpen(false)
  }

  // 处理下架课程
  const handleUnpublishCourse = (courseId: number) => {
    console.log(`下架课程 ID ${courseId}`)
    // 这里应该有下架课程的逻辑
  }

  // 处理删除课程
  const handleDeleteCourse = (courseId: number) => {
    console.log(`删除课程 ID ${courseId}`)
    // 这里应该有删除课程的逻辑
  }

  // 切换折叠状态
  const toggleCategoryCollapse = (categoryId: number) => {
    setCategories(
      categories.map((category) =>
        category.id === categoryId ? { ...category, collapsed: !category.collapsed } : category,
      ),
    )
  }

  // 切换分类可见性
  const toggleCategoryVisibility = (categoryId: number) => {
    setCategories(
      categories.map((category) =>
        category.id === categoryId ? { ...category, visible: !category.visible } : category,
      ),
    )
  }

  // 创建新分类
  const handleCreateCategory = () => {
    if (!newCategoryName.trim()) return

    const newCategory = {
      id: Math.max(...categories.map((c) => c.id)) + 1,
      name: newCategoryName,
      visible: true,
      sortOrder: categories.length + 1,
      collapsed: false,
    }

    setCategories([...categories, newCategory])
    setNewCategoryName("")
    setCategoryDialogOpen(false)
  }

  // 删除分类
  const handleDeleteCategory = () => {
    if (categoryToDelete === null) return

    setCategories(categories.filter((category) => category.id !== categoryToDelete))
    setCategoryToDelete(null)
    setCategoryDeleteDialogOpen(false)
  }

  // 打开分类排序对话框
  const handleOpenCategorySortDialog = (categoryId: number) => {
    setCurrentCategoryId(categoryId)
    const category = categories.find((c) => c.id === categoryId)
    setCategorySortValue(category?.sortOrder?.toString() || "")
    setCategorySortDialogOpen(true)
  }

  // 保存分类排序
  const handleSaveCategorySort = () => {
    if (currentCategoryId === null) return

    setCategories(
      categories.map((category) =>
        category.id === currentCategoryId
          ? { ...category, sortOrder: Number.parseInt(categorySortValue) || category.sortOrder }
          : category,
      ),
    )
    setCategorySortDialogOpen(false)
  }

  // 切换课程上架到主页状态
  const toggleCourseHomepage = (courseId: number, isLive = false) => {
    if (isLive) {
      // 处理直播课程
      const updatedCourses = liveCourses.map((course) =>
        course.id === courseId ? { ...course, onHomepage: !course.onHomepage } : course,
      )
      // 这里应该有更新API的逻辑
      console.log(`切换直播课程 ID ${courseId} 的主页显示状态`)
    } else {
      // 处理录播课程
      const updatedCourses = recordedCourses.map((course) =>
        course.id === courseId ? { ...course, onHomepage: !course.onHomepage } : course,
      )
      // 这里应该有更新API的逻辑
      console.log(`切换录播课程 ID ${courseId} 的主页显示状态`)
    }
  }

  // 切换课程分享到市场状态
  const toggleCourseMarket = (courseId: number, isLive = false) => {
    if (isLive) {
      // 处理直播课程
      const updatedCourses = liveCourses.map((course) =>
        course.id === courseId ? { ...course, inMarket: !course.inMarket } : course,
      )
      // 这里应该有更新API的逻辑
      console.log(`切换直播课程 ID ${courseId} 的市场分享状态`)
    } else {
      // 处理录播课程
      const updatedCourses = recordedCourses.map((course) =>
        course.id === courseId ? { ...course, inMarket: !course.inMarket } : course,
      )
      // 这里应该有更新API的逻辑
      console.log(`切换录播课程 ID ${courseId} 的市场分享状态`)
    }
  }

  // 修改 renderCourseCard 函数，使其适合列表视图
  const renderCourseCard = (course, isFullWidth = false) => (
    <Card
      key={course.id}
      className="overflow-hidden bg-gray-900 border-gray-800 hover:bg-gray-800/80 transition-colors"
    >
      <div className="flex flex-col md:flex-row">
        <div className="relative w-full md:w-64 aspect-video md:aspect-[4/3]">
          <Image src={course.image || "/placeholder.svg"} alt={course.title} fill className="object-cover" />
          <div className="absolute top-2 right-2 bg-black/50 backdrop-blur-sm rounded-full p-1">
            <Play className="h-3 w-3 text-blue-400 fill-blue-400" />
          </div>
          {course.featured && (
            <div className="absolute top-0 left-0 bg-blue-600 text-white text-xs px-2 py-0.5">精选</div>
          )}
          {course.inMarket && (
            <div className="absolute bottom-2 left-2 bg-purple-600/80 backdrop-blur-sm text-white text-xs px-2 py-0.5 rounded-full flex items-center">
              <ShoppingBag className="h-3 w-3 mr-1" />
              市场
            </div>
          )}
        </div>
        <div className="flex-1 p-4 bg-gray-800">
          <div className="flex justify-between mb-2">
            <h3 className="font-medium text-white text-lg line-clamp-1">{course.title}</h3>
            <span
              className={`text-xs px-2 py-0.5 rounded-full ${
                course.status === "已上架"
                  ? "bg-green-900/30 text-green-400 border border-green-500/30"
                  : "bg-gray-800 text-gray-400 border border-gray-700"
              }`}
            >
              {course.status}
            </span>
          </div>
          <p className="text-sm text-gray-400 mb-3">{course.instructor}</p>

          <div className="flex items-center justify-between text-xs text-gray-400 mb-3">
            <div className="flex items-center">
              <Clock className="h-3 w-3 mr-1" />
              {course.duration}
            </div>
            <div className="flex items-center">
              <Users className="h-3 w-3 mr-1" />
              {course.salesCount}人已学
            </div>
          </div>

          <div className="flex justify-between items-center">
            <div className="text-red-400 font-medium text-base">{course.price}</div>
            <div className="flex space-x-1">
              {/* 编辑课程按钮 */}
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-7 w-7 rounded-full bg-blue-900/20 hover:bg-blue-800/30"
                      onClick={() => router.push(`/management/courses/edit-wizard/${course.id}`)}
                    >
                      <Edit className="h-3.5 w-3.5 text-blue-400" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent className="bg-gray-800 border-gray-700 text-white">
                    <p>编辑课程</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>

              {/* 上架到主页按钮 */}
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="ghost"
                      size="icon"
                      className={`h-7 w-7 rounded-full ${
                        course.onHomepage
                          ? "bg-green-900/20 hover:bg-green-800/30"
                          : "bg-gray-800/80 hover:bg-gray-700/80"
                      }`}
                      onClick={() => toggleCourseHomepage(course.id)}
                    >
                      <Home className={`h-3.5 w-3.5 ${course.onHomepage ? "text-green-400" : "text-gray-500"}`} />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent className="bg-gray-800 border-gray-700 text-white">
                    <p>{course.onHomepage ? "从主页下架" : "上架到主页"}</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>

              {/* 分享到市场按钮 */}
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="ghost"
                      size="icon"
                      className={`h-7 w-7 rounded-full ${
                        course.inMarket
                          ? "bg-purple-900/20 hover:bg-purple-800/30"
                          : "bg-gray-800/80 hover:bg-gray-700/80"
                      }`}
                      onClick={() => toggleCourseMarket(course.id)}
                    >
                      <Share2 className={`h-3.5 w-3.5 ${course.inMarket ? "text-purple-400" : "text-gray-500"}`} />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent className="bg-gray-800 border-gray-700 text-white">
                    <p>{course.inMarket ? "从市场下架" : "分享到市场"}</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>

              {/* 删除课程按钮 */}
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-7 w-7 rounded-full bg-red-900/20 hover:bg-red-800/30"
                        >
                          <Trash2 className="h-3.5 w-3.5 text-red-400" />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent className="bg-gray-800 border-gray-700 text-white">
                        <p>删除课程</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </AlertDialogTrigger>
                <AlertDialogContent className="bg-gray-900 border-gray-700">
                  <AlertDialogHeader>
                    <AlertDialogTitle className="text-white">确认删除课程</AlertDialogTitle>
                    <AlertDialogDescription className="text-gray-400">
                      您确定要删除课程 "{course.title}" 吗？此操作无法撤销，已购买的学员将无法继续访问此课程。
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel className="bg-gray-800 text-white border-gray-700 hover:bg-gray-700">
                      取消
                    </AlertDialogCancel>
                    <AlertDialogAction
                      className="bg-red-600 hover:bg-red-500"
                      onClick={() => handleDeleteCourse(course.id)}
                    >
                      删除
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </div>
          </div>
        </div>
      </div>
    </Card>
  )

  // 修改 renderLiveCourseCard 函数，使其适合列表视图
  const renderLiveCourseCard = (course) => (
    <Card
      key={course.id}
      className={`overflow-hidden bg-gray-900 border-gray-800 ${
        course.status === "进行中" ? "border-l-4 border-l-red-500" : ""
      } hover:bg-gray-800/80 transition-colors`}
    >
      <div className="flex flex-col md:flex-row">
        <div className="relative w-full md:w-64 aspect-video md:aspect-[4/3]">
          <Image src={course.image || "/placeholder.svg"} alt={course.title} fill className="object-cover" />
          {course.status === "进行中" && (
            <div className="absolute top-2 left-2 bg-red-500 text-white text-xs px-2 py-0.5 rounded-full flex items-center">
              <span className="w-2 h-2 bg-white rounded-full mr-1 animate-pulse"></span>
              直播中
            </div>
          )}
          {course.status === "已结束" && (
            <div className="absolute top-2 left-2 bg-gray-700/70 backdrop-blur-sm text-white text-xs px-2 py-0.5 rounded-full">
              回放
            </div>
          )}
          {course.status === "未开始" && (
            <div className="absolute top-2 left-2 bg-blue-500 text-white text-xs px-2 py-0.5 rounded-full">预告</div>
          )}
          {course.featured && (
            <div className="absolute top-0 right-0 bg-blue-600 text-white text-xs px-2 py-0.5">精选</div>
          )}
          {course.inMarket && (
            <div className="absolute bottom-2 left-2 bg-purple-600/80 backdrop-blur-sm text-white text-xs px-2 py-0.5 rounded-full flex items-center">
              <ShoppingBag className="h-3 w-3 mr-1" />
              市场
            </div>
          )}
        </div>
        <div className="flex-1 p-4 bg-gray-800">
          <h3 className="font-medium text-white text-lg mb-2 line-clamp-1">{course.title}</h3>
          <p className="text-sm text-gray-400 mb-3">{course.instructor}</p>

          <div className="flex items-center justify-between text-xs text-gray-400 mb-3">
            <div className="flex items-center">
              <Clock className="h-3 w-3 mr-1" />
              {course.startTime}
            </div>
            <div className="flex items-center">
              <Users className="h-3 w-3 mr-1" />
              {course.viewersCount}人观看
            </div>
          </div>

          <div className="flex justify-between items-center">
            <div className="text-red-400 font-medium text-base">{course.price}</div>
            <div className="flex space-x-1">
              {/* 编辑课程按钮 */}
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-7 w-7 rounded-full bg-blue-900/20 hover:bg-blue-800/30"
                      onClick={() => router.push(`/management/courses/edit-wizard/${course.id}`)}
                    >
                      <Edit className="h-3.5 w-3.5 text-blue-400" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent className="bg-gray-800 border-gray-700 text-white">
                    <p>编辑课程</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>

              {/* 上架到主页按钮 */}
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="ghost"
                      size="icon"
                      className={`h-7 w-7 rounded-full ${
                        course.onHomepage
                          ? "bg-green-900/20 hover:bg-green-800/30"
                          : "bg-gray-800/80 hover:bg-gray-700/80"
                      }`}
                      onClick={() => toggleCourseHomepage(course.id, true)}
                    >
                      <Home className={`h-3.5 w-3.5 ${course.onHomepage ? "text-green-400" : "text-gray-500"}`} />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent className="bg-gray-800 border-gray-700 text-white">
                    <p>{course.onHomepage ? "从主页下架" : "上架到主页"}</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>

              {/* 分享到市场按钮 */}
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="ghost"
                      size="icon"
                      className={`h-7 w-7 rounded-full ${
                        course.inMarket
                          ? "bg-purple-900/20 hover:bg-purple-800/30"
                          : "bg-gray-800/80 hover:bg-gray-700/80"
                      }`}
                      onClick={() => toggleCourseMarket(course.id, true)}
                    >
                      <Share2 className={`h-3.5 w-3.5 ${course.inMarket ? "text-purple-400" : "text-gray-500"}`} />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent className="bg-gray-800 border-gray-700 text-white">
                    <p>{course.inMarket ? "从市场下架" : "分享到市场"}</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>

              {/* 删除课程按钮 */}
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-7 w-7 rounded-full bg-red-900/20 hover:bg-red-800/30"
                        >
                          <Trash2 className="h-3.5 w-3.5 text-red-400" />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent className="bg-gray-800 border-gray-700 text-white">
                        <p>删除课程</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </AlertDialogTrigger>
                <AlertDialogContent className="bg-gray-900 border-gray-700">
                  <AlertDialogHeader>
                    <AlertDialogTitle className="text-white">确认删除课程</AlertDialogTitle>
                    <AlertDialogDescription className="text-gray-400">
                      您确定要删除课程 "{course.title}" 吗？此操作无法撤销，已购买的学员将无法继续访问此课程。
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel className="bg-gray-800 text-white border-gray-700 hover:bg-gray-700">
                      取消
                    </AlertDialogCancel>
                    <AlertDialogAction
                      className="bg-red-600 hover:bg-red-500"
                      onClick={() => handleDeleteCourse(course.id)}
                    >
                      删除
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </div>
          </div>
        </div>
      </div>
    </Card>
  )

  // 修改 renderCategory 函数，使课程以列表形式显示
  const renderCategory = (category) => {
    // 获取该分类下的课程
    const categoryLiveCourses = liveCourses.filter((course) => course.categoryId === category.id)
    const categoryRecordedCourses = recordedCourses.filter((course) => course.categoryId === category.id)

    // 合并该分类下的所有课程
    const categoryCourses = [...categoryLiveCourses, ...categoryRecordedCourses]

    if (categoryCourses.length === 0) return null

    return (
      <div key={category.id} className="bg-gray-800 border border-gray-700 rounded-lg overflow-hidden mb-6">
        <div className="flex items-center justify-between p-4 border-b border-gray-700">
          <div className="flex items-center space-x-3">
            <button className="text-gray-400 hover:text-white" onClick={() => toggleCategoryCollapse(category.id)}>
              <ChevronDown
                className={`h-5 w-5 transition-transform ${category.collapsed ? "" : "transform rotate-180"}`}
              />
            </button>
            <div className="flex items-center">
              <GripVertical className="h-4 w-4 text-gray-600 mr-2 cursor-move" />
              <input
                type="text"
                value={category.name}
                className="bg-transparent border-0 border-b border-dashed border-gray-600 text-white font-medium focus:outline-none focus:border-blue-500"
                onChange={(e) => {
                  setCategories(categories.map((c) => (c.id === category.id ? { ...c, name: e.target.value } : c)))
                }}
              />
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <Switch checked={category.visible} onCheckedChange={(checked) => toggleCategoryVisibility(category.id)} />
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="outline"
                    size="icon"
                    className="h-8 w-8 border-gray-700"
                    onClick={() => handleOpenCategorySortDialog(category.id)}
                  >
                    <ArrowUpDown className="h-4 w-4 text-gray-400" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent className="bg-gray-800 border-gray-700 text-white">
                  <p>设置分类排序</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="outline"
                    size="icon"
                    className="h-8 w-8 border-gray-700"
                    onClick={() => {
                      setCategoryToDelete(category.id)
                      setCategoryDeleteDialogOpen(true)
                    }}
                  >
                    <Trash2 className="h-4 w-4 text-red-400" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent className="bg-gray-800 border-gray-700 text-white">
                  <p>删除分类</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        </div>

        {category.visible && !category.collapsed && (
          <div className="p-4 space-y-4">
            {categoryCourses.length > 0 ? (
              <div className="space-y-4">
                {categoryCourses.map((course) =>
                  course.categoryId === 1 ? renderLiveCourseCard(course) : renderCourseCard(course),
                )}
              </div>
            ) : (
              <div className="text-center py-12">
                <div className="mb-3 text-gray-500">
                  <BookOpen className="h-12 w-12 mx-auto opacity-30" />
                </div>
                <p className="text-gray-500">该分类下暂无课程</p>
              </div>
            )}
          </div>
        )}
      </div>
    )
  }

  // 按排序顺序排列分类
  const sortedCategories = [...categories].sort((a, b) => a.sortOrder - b.sortOrder)

  return (
    <div className="min-h-screen bg-black text-white">
      {/* 顶部导航栏 */}
      <div className="sticky top-0 left-0 right-0 h-14 flex items-center px-4 bg-gray-900/80 backdrop-blur-md border-b border-gray-800 z-10">
        <Link href="/management" className="flex items-center text-gray-300">
          <ArrowLeft className="h-5 w-5 mr-2" />
          <span>返回</span>
        </Link>
        <h1 className="flex-1 text-center text-lg font-semibold text-white">课程设置</h1>
      </div>

      <div className="p-4 pb-16">
        {/* 功能介绍 */}
        <div className="p-4 bg-blue-900/20 border border-blue-500/30 rounded-lg mb-6">
          <h2 className="text-lg font-semibold text-white mb-2">课程管理</h2>
          <p className="text-sm text-gray-300">
            在这里可以创建和管理课程分类与课程，设置课程详情、定价、上下架状态，以及在首页的展示位置排序。
          </p>
          <p className="text-sm text-gray-300 mt-1">
            <span className="text-blue-400">提示：</span>{" "}
            可以通过拖动课程调整排序，或者修改分类名称、开关分类展示、调整分类顺序。
          </p>
        </div>

        {/* 功能快捷键 */}
        <div className="flex justify-end mb-6">
          <Button
            variant="default"
            className="bg-blue-600 hover:bg-blue-500"
            onClick={() => router.push("/management/courses/create-wizard")}
          >
            <PlusCircle className="h-4 w-4 mr-2" />
            新建课程
          </Button>
        </div>

        {/* 课程分类列表 */}
        <div className="space-y-6">{sortedCategories.map(renderCategory)}</div>
      </div>

      {/* 排序对话框 */}
      <Dialog open={sortDialogOpen} onOpenChange={setSortDialogOpen}>
        <DialogContent className="bg-gray-900 border-gray-700 text-white">
          <DialogHeader>
            <DialogTitle>设置课程排序</DialogTitle>
          </DialogHeader>
          <div className="py-4">
            <Label htmlFor="sort-order" className="text-white mb-2 block">
              排序序号 <span className="text-red-500">*</span>
            </Label>
            <Input
              id="sort-order"
              type="number"
              min="1"
              value={sortValue}
              onChange={(e) => setSortValue(e.target.value)}
              placeholder="请输入排序序号，数字越小排序越靠前"
              className="bg-gray-800 border-gray-700 text-white"
            />
            <p className="text-xs text-gray-400 mt-2">
              排序序号决定课程在首页的显示顺序，序号为1的课程将显示在最前面。
            </p>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setSortDialogOpen(false)}
              className="border-gray-700 text-gray-300"
            >
              取消
            </Button>
            <Button onClick={handleSaveSort} className="bg-blue-600 hover:bg-blue-500">
              保存
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* 新建分类对话框 */}
      <Dialog open={categoryDialogOpen} onOpenChange={setCategoryDialogOpen}>
        <DialogContent className="bg-gray-900 border-gray-700 text-white">
          <DialogHeader>
            <DialogTitle>新建课程分组</DialogTitle>
          </DialogHeader>
          <div className="py-4">
            <Label htmlFor="category-name" className="text-white mb-2 block">
              分类名称 <span className="text-red-500">*</span>
            </Label>
            <Input
              id="category-name"
              value={newCategoryName}
              onChange={(e) => setNewCategoryName(e.target.value)}
              placeholder="请输入分类名称"
              className="bg-gray-800 border-gray-700 text-white"
            />
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setCategoryDialogOpen(false)}
              className="border-gray-700 text-gray-300"
            >
              取消
            </Button>
            <Button onClick={handleCreateCategory} className="bg-blue-600 hover:bg-blue-500">
              创建
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* 删除分类对话框 */}
      <AlertDialog open={categoryDeleteDialogOpen} onOpenChange={setCategoryDeleteDialogOpen}>
        <AlertDialogContent className="bg-gray-900 border-gray-700">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-white">确认删除分类</AlertDialogTitle>
            <AlertDialogDescription className="text-gray-400">
              您确定要删除此分类吗？删除分类不会删除其中的课程，但课程将不再属于此分类。
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="bg-gray-800 text-white border-gray-700 hover:bg-gray-700">
              取消
            </AlertDialogCancel>
            <Button onClick={handleDeleteCategory} className="bg-red-600 hover:bg-red-500">
              删除
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* 分类排序对话框 */}
      <Dialog open={categorySortDialogOpen} onOpenChange={setCategorySortDialogOpen}>
        <DialogContent className="bg-gray-900 border-gray-700 text-white">
          <DialogHeader>
            <DialogTitle>设置分类排序</DialogTitle>
          </DialogHeader>
          <div className="py-4">
            <Label htmlFor="category-sort-order" className="text-white mb-2 block">
              排序序号 <span className="text-red-500">*</span>
            </Label>
            <Input
              id="category-sort-order"
              type="number"
              min="1"
              value={categorySortValue}
              onChange={(e) => setCategorySortValue(e.target.value)}
              placeholder="请输入排序序号，数字越小排序越靠前"
              className="bg-gray-800 border-gray-700 text-white"
            />
            <p className="text-xs text-gray-400 mt-2">
              排序序号决定分类在页面中的显示顺序，序号为1的分类将显示在最前面。
            </p>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setCategorySortDialogOpen(false)}
              className="border-gray-700 text-gray-300"
            >
              取消
            </Button>
            <Button onClick={handleSaveCategorySort} className="bg-blue-600 hover:bg-blue-500">
              保存
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
