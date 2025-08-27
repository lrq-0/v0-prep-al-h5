"use client"

import { useState } from "react"
import { ArrowLeft, Plus, Trash2, GripVertical, Clock, Upload, Save, Loader2 } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Alert, AlertDescription } from "@/components/ui/alert"

export default function UploadCourse() {
  const router = useRouter()

  // 状态管理
  const [selectedCourse, setSelectedCourse] = useState("")
  const [isSaving, setIsSaving] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)

  // 获取URL中的课程ID参数
  const searchParams = new URLSearchParams(typeof window !== "undefined" ? window.location.search : "")
  const courseId = searchParams.get("id")

  // 如果有课程ID，则加载对应的课程内容数据
  useState(() => {
    if (courseId) {
      // 这里应该有API请求获取课程内容数据
      // 模拟加载课程内容数据
      setTimeout(() => {
        setSelectedCourse(courseId)
        // 设置预填充的章节和课时
        setSections([
          {
            id: 1,
            title: "第一章：高考英语词汇基础",
            lessons: [
              {
                id: 101,
                title: "第1讲：课程介绍与学习方法",
                duration: "45分钟",
                file: { name: "lesson1.mp4" },
                free: true,
              },
              {
                id: 102,
                title: "第2讲：高频词汇分类记忆法",
                duration: "50分钟",
                file: { name: "lesson2.mp4" },
                free: false,
              },
              {
                id: 103,
                title: "第3讲：词根词缀记忆法",
                duration: "55分钟",
                file: { name: "lesson3.mp4" },
                free: false,
              },
            ],
          },
          {
            id: 2,
            title: "第二章：高考英语核心词汇",
            lessons: [
              {
                id: 201,
                title: "第4讲：学科类核心词汇",
                duration: "60分钟",
                file: { name: "lesson4.mp4" },
                free: false,
              },
              {
                id: 202,
                title: "第5讲：社会生活类核心词汇",
                duration: "55分钟",
                file: { name: "lesson5.mp4" },
                free: false,
              },
            ],
          },
        ])
      }, 500)
    }
  }, [courseId])

  // 录播课程章节管理
  const [sections, setSections] = useState([
    {
      id: 1,
      title: "第一章节",
      lessons: [{ id: 101, title: "第1讲：课程介绍", duration: "45分钟", file: null, free: true }],
    },
  ])

  // 模拟课程数据
  const courses = [
    { id: "1", title: "高考英语词汇精讲" },
    { id: "2", title: "数学解题技巧与方法" },
    { id: "3", title: "物理实验与解析" },
    { id: "4", title: "语文阅读理解专项训练" },
  ]

  // 添加新章节
  const addSection = () => {
    const newSectionId = sections.length + 1
    const newSection = {
      id: Date.now(),
      title: `第${newSectionId}章节`,
      lessons: [],
    }
    setSections([...sections, newSection])
  }

  // 更新章节标题
  const updateSectionTitle = (sectionId: number, title: string) => {
    setSections(sections.map((section) => (section.id === sectionId ? { ...section, title } : section)))
  }

  // 删除章节
  const deleteSection = (sectionId: number) => {
    setSections(sections.filter((section) => section.id !== sectionId))
  }

  // 添加课时
  const addLesson = (sectionId: number) => {
    const section = sections.find((s) => s.id === sectionId)
    if (!section) return

    const newLessonNumber = section.lessons.length + 1
    const newLesson = {
      id: Date.now(),
      title: `第${newLessonNumber}讲：添加课程目录`,
      duration: "0分钟",
      file: null,
      free: false,
    }

    setSections(
      sections.map((section) =>
        section.id === sectionId ? { ...section, lessons: [...section.lessons, newLesson] } : section,
      ),
    )
  }

  // 更新课时信息
  const updateLesson = (sectionId: number, lessonId: number, field: string, value: any) => {
    setSections(
      sections.map((section) =>
        section.id === sectionId
          ? {
              ...section,
              lessons: section.lessons.map((lesson) =>
                lesson.id === lessonId ? { ...lesson, [field]: value } : lesson,
              ),
            }
          : section,
      ),
    )
  }

  // 删除课时
  const deleteLesson = (sectionId: number, lessonId: number) => {
    setSections(
      sections.map((section) =>
        section.id === sectionId
          ? {
              ...section,
              lessons: section.lessons.filter((lesson) => lesson.id !== lessonId),
            }
          : section,
      ),
    )
  }

  // 保存课程
  const handleSaveCourse = () => {
    if (!selectedCourse) {
      alert("请选择课程")
      return
    }

    setIsSaving(true)

    // 模拟API请求
    setTimeout(() => {
      setIsSaving(false)
      setShowSuccess(true)

      // 3秒后跳转到课程列表
      setTimeout(() => {
        router.push("/management/courses")
      }, 2000)
    }, 1000)
  }

  // 检查是否有章节和课时
  const hasContent = () => {
    return selectedCourse && sections.length > 0 && sections.some((section) => section.lessons.length > 0)
  }

  return (
    <div className="min-h-screen bg-black text-white">
      {/* 顶部导航栏 */}
      <div className="sticky top-0 left-0 right-0 h-14 flex items-center px-4 bg-gray-900/80 backdrop-blur-md border-b border-gray-800 z-10">
        <Link href="/management/courses" className="flex items-center text-gray-300">
          <ArrowLeft className="h-5 w-5 mr-2" />
          <span>返回</span>
        </Link>
        <h1 className="flex-1 text-center text-lg font-semibold text-white">{courseId ? "修改课程" : "上传课程"}</h1>
      </div>

      {/* 成功提示 */}
      {showSuccess && (
        <div className="fixed top-16 left-4 right-4 z-50">
          <Alert className="bg-green-900/60 border-green-500 backdrop-blur-sm">
            <Upload className="h-4 w-4 text-green-400 mr-2" />
            <AlertDescription className="text-green-400">课程上传成功！正在返回课程设置页面...</AlertDescription>
          </Alert>
        </div>
      )}

      <div className="p-4 pb-24">
        {/* 选择课程 */}
        <Card className="p-4 bg-gray-900 border-gray-800 mb-6">
          <h2 className="text-lg font-semibold text-white mb-4">选择课程</h2>

          <div className="grid gap-4">
            <div>
              <Label htmlFor="select-course" className="text-white mb-2 block">
                选择要上传内容的课程 <span className="text-red-500">*</span>
              </Label>
              <Select value={selectedCourse} onValueChange={setSelectedCourse}>
                <SelectTrigger id="select-course" className="bg-gray-800 border-gray-700 text-white">
                  <SelectValue placeholder="选择课程" />
                </SelectTrigger>
                <SelectContent className="bg-gray-900 border-gray-700 text-white">
                  {courses.map((course) => (
                    <SelectItem key={course.id} value={course.id}>
                      {course.title}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </Card>

        {/* 章节管理说明 */}
        <Card className="p-4 bg-gray-900 border-gray-800 mb-6">
          <h2 className="text-lg font-semibold text-white mb-2">课程章节管理</h2>
          <p className="text-sm text-gray-400 mb-4">
            在这里添加和管理课程的章节和课时。良好的课程结构能帮助学员更好地理解和吸收知识，建议将内容按照难度递进或逻辑关系组织。
          </p>
        </Card>

        {/* 章节列表 */}
        <div className="space-y-6 mb-6">
          {sections.map((section) => (
            <div key={section.id} className="bg-gray-800 border border-gray-700 rounded-lg p-4">
              <div className="flex justify-between items-center mb-4">
                <div className="flex items-center">
                  <GripVertical className="h-5 w-5 text-gray-500 mr-2 cursor-move" />
                  <Input
                    value={section.title}
                    onChange={(e) => updateSectionTitle(section.id, e.target.value)}
                    className="bg-gray-900 border-gray-700 text-white w-64"
                  />
                </div>
                <div className="flex space-x-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-8 px-2 text-red-400 hover:text-red-300"
                    onClick={() => deleteSection(section.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              <div className="space-y-3">
                {section.lessons.map((lesson) => (
                  <div key={lesson.id} className="bg-gray-900 border border-gray-700 rounded-lg p-3">
                    <div className="flex justify-between items-center mb-2">
                      <div className="flex items-center">
                        <GripVertical className="h-4 w-4 text-gray-500 mr-2 cursor-move" />
                        <Input
                          value={lesson.title}
                          onChange={(e) => updateLesson(section.id, lesson.id, "title", e.target.value)}
                          className="bg-gray-800 border-gray-700 text-white w-64"
                        />
                      </div>
                      <div className="flex space-x-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-8 px-2 text-red-400 hover:text-red-300"
                          onClick={() => deleteLesson(section.id, lesson.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      <div>
                        <Label htmlFor={`lesson-duration-${lesson.id}`} className="text-gray-400 text-xs mb-1 block">
                          课时时长
                        </Label>
                        <div className="flex items-center">
                          <Clock className="h-4 w-4 text-gray-500 mr-2" />
                          <Input
                            id={`lesson-duration-${lesson.id}`}
                            value={lesson.duration}
                            onChange={(e) => updateLesson(section.id, lesson.id, "duration", e.target.value)}
                            placeholder="例如：45分钟"
                            className="bg-gray-800 border-gray-700 text-white"
                          />
                        </div>
                      </div>

                      <div>
                        <Label className="text-gray-400 text-xs mb-1 block">免费试看</Label>
                        <div className="flex items-center">
                          <Switch
                            checked={lesson.free}
                            onCheckedChange={(checked) => updateLesson(section.id, lesson.id, "free", checked)}
                          />
                          <span className="ml-2 text-white text-sm">{lesson.free ? "是" : "否"}</span>
                        </div>
                      </div>
                    </div>

                    <div className="mt-3">
                      <Label htmlFor={`lesson-file-${lesson.id}`} className="text-gray-400 text-xs mb-1 block">
                        课时视频
                      </Label>
                      {lesson.file ? (
                        <div className="flex justify-between items-center p-2 bg-gray-800 border border-gray-700 rounded-md">
                          <span className="text-sm text-white truncate">{lesson.file.name}</span>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-6 w-6 p-0 text-red-400"
                            onClick={() => updateLesson(section.id, lesson.id, "file", null)}
                          >
                            <Trash2 className="h-3 w-3" />
                          </Button>
                        </div>
                      ) : (
                        <Button variant="outline" className="w-full border-gray-700 text-gray-400">
                          <Upload className="h-4 w-4 mr-2" />
                          上传视频文件
                        </Button>
                      )}
                    </div>
                  </div>
                ))}

                <Button
                  variant="outline"
                  className="border-blue-500/30 text-blue-400 hover:bg-blue-500/20 w-full"
                  onClick={() => addLesson(section.id)}
                >
                  <Plus className="h-4 w-4 mr-2" />
                  添加课时
                </Button>
              </div>
            </div>
          ))}

          <Button
            variant="outline"
            className="border-blue-500/30 text-blue-400 hover:bg-blue-500/20 w-full"
            onClick={addSection}
          >
            <Plus className="h-4 w-4 mr-2" />
            添加章节
          </Button>
        </div>

        {/* 提示信息 */}
        <div className="bg-blue-900/20 border border-blue-500/30 rounded-lg p-4 mb-6">
          <h3 className="text-blue-400 font-medium mb-2">章节管理提示</h3>
          <ul className="text-sm text-gray-300 space-y-2">
            <li>• 章节标题应简明扼要，能够概括该章节的主要内容</li>
            <li>• 课时时长建议控制在20-45分钟，过长的视频可能导致学员注意力分散</li>
            <li>• 设置1-2个免费试看课时，可以帮助潜在学员了解课程质量</li>
            <li>• 视频文件支持MP4、MOV格式，建议分辨率为1080p，大小不超过500MB</li>
          </ul>
        </div>
      </div>

      {/* 底部保存按钮 */}
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-gray-900/95 backdrop-blur-md border-t border-gray-800">
        <Button
          className="w-full bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400"
          onClick={handleSaveCourse}
          disabled={!hasContent() || isSaving}
        >
          {isSaving ? (
            <>
              <Loader2 className="h-4 w-4 mr-2 animate-spin" />
              保存中...
            </>
          ) : (
            <>
              <Save className="h-4 w-4 mr-2" />
              保存课程内容
            </>
          )}
        </Button>
      </div>
    </div>
  )
}
