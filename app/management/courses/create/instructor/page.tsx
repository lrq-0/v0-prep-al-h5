"use client"

import type React from "react"

import { useState } from "react"
import { ArrowLeft, User } from "lucide-react"
import { useRouter } from "next/navigation"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Progress } from "@/components/ui/progress"
import Image from "next/image"

export default function CourseInstructor() {
  const router = useRouter()

  // 状态管理
  const [courseInstructor, setCourseInstructor] = useState("")
  const [teacherDescription, setTeacherDescription] = useState("")
  const [selectedTeacher, setSelectedTeacher] = useState("")
  const [instructorImage, setInstructorImage] = useState<string | null>(null)

  // 预设讲师数据
  const existingTeachers = [
    {
      id: 1,
      name: "王老师",
      description: "北京大学数学系博士，有10年高中数学教学经验，善于用生动的例子讲解复杂的数学概念。",
      image: "/diverse-classroom-teacher.png",
    },
    {
      id: 2,
      name: "李老师",
      description: "清华大学英语系硕士，英语专业八级，曾获全国优秀教师称号，教学风格活泼生动。",
      image: "/female-teacher.png",
    },
    {
      id: 3,
      name: "张老师",
      description: "复旦大学物理系教授，从事物理教学20年，擅长实验教学和理论讲解相结合的教学方法。",
      image: "/placeholder.svg?key=4gkmh",
    },
    {
      id: 4,
      name: "刘老师",
      description: "中国人民大学中文系毕业，语文教学专家，对文学作品有独到见解，教学经验丰富。",
      image: "/placeholder.svg?key=py4xc",
    },
    { value: "new", name: "添加新讲师", description: "" },
  ]

  // 处理讲师选择
  const handleTeacherChange = (value: string) => {
    setSelectedTeacher(value)

    if (value === "new") {
      setCourseInstructor("")
      setTeacherDescription("")
      setInstructorImage(null)
    } else {
      const selectedTeacher = existingTeachers.find((teacher) => teacher.name === value)
      if (selectedTeacher) {
        setCourseInstructor(selectedTeacher.name)
        setTeacherDescription(selectedTeacher.description)
        setInstructorImage(selectedTeacher.image || null)
      }
    }
  }

  // 处理讲师头像上传
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0]
      const reader = new FileReader()
      reader.onload = (e) => {
        if (e.target?.result) {
          setInstructorImage(e.target.result as string)
        }
      }
      reader.readAsDataURL(file)
    }
  }

  // 保存并前往下一步
  const handleSaveAndNext = () => {
    // 这里应该有保存数据的逻辑
    // 保存成功后跳转到下一步
    router.push("/management/courses/create/chapters")
  }

  // 返回上一步
  const handleBack = () => {
    router.push("/management/courses/create/basic-info")
  }

  // 检查表单是否填写完整
  const isFormComplete = () => {
    return courseInstructor && teacherDescription
  }

  return (
    <div className="min-h-screen bg-black text-white">
      {/* 顶部导航栏 */}
      <div className="sticky top-0 left-0 right-0 h-14 flex items-center px-4 bg-gray-900/80 backdrop-blur-md border-b border-gray-800 z-10">
        <button onClick={handleBack} className="flex items-center text-gray-300">
          <ArrowLeft className="h-5 w-5 mr-2" />
          <span>返回</span>
        </button>
        <h1 className="flex-1 text-center text-lg font-semibold text-white">创建课程 - 讲师信息</h1>
      </div>

      <div className="p-4 pb-24">
        {/* 进度指示器 */}
        <div className="mb-6">
          <div className="flex justify-between mb-2">
            <div className="text-sm text-gray-400">基本信息</div>
            <div className="text-sm text-blue-400">讲师信息</div>
            <div className="text-sm text-gray-500">课程章节</div>
            <div className="text-sm text-gray-500">AI助理</div>
          </div>
          <Progress value={50} className="h-2 bg-gray-700" indicatorClassName="bg-blue-500" />
        </div>

        {/* 讲师信息表单 */}
        <Card className="p-4 bg-gray-900 border-gray-800 mb-6">
          <h2 className="text-lg font-semibold text-white mb-4">讲师信息</h2>

          <div className="grid gap-4">
            <div>
              <Label htmlFor="teacher-select" className="text-white mb-2 block">
                选择讲师 <span className="text-red-500">*</span>
              </Label>
              <div className="flex items-center space-x-2">
                <User className="h-4 w-4 text-gray-400" />
                <Select value={selectedTeacher} onValueChange={handleTeacherChange}>
                  <SelectTrigger className="bg-gray-800 border-gray-700 text-white">
                    <SelectValue placeholder="选择或添加讲师" />
                  </SelectTrigger>
                  <SelectContent className="bg-gray-800 border-gray-700 text-white">
                    {existingTeachers.map((teacher) => (
                      <SelectItem key={teacher.name} value={teacher.name}>
                        {teacher.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            {selectedTeacher === "new" && (
              <div>
                <Label htmlFor="course-instructor" className="text-white mb-2 block">
                  讲师名称 <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="course-instructor"
                  value={courseInstructor}
                  onChange={(e) => setCourseInstructor(e.target.value)}
                  placeholder="请输入讲师名称"
                  className="bg-gray-800 border-gray-700 text-white"
                  required
                />
              </div>
            )}

            <div>
              <Label htmlFor="teacher-description" className="text-white mb-2 block">
                师资简介 <span className="text-red-500">*</span>
              </Label>
              <Textarea
                id="teacher-description"
                value={teacherDescription}
                onChange={(e) => setTeacherDescription(e.target.value)}
                placeholder="请输入讲师简介，包括教学经验、专业背景等"
                className="bg-gray-800 border-gray-700 text-white min-h-[100px]"
                required
              />
            </div>

            <div>
              <Label className="text-white mb-2 block">讲师头像</Label>
              <div className="flex items-center">
                <div className="relative w-24 h-24 mr-4">
                  {instructorImage ? (
                    <Image
                      src={instructorImage || "/placeholder.svg"}
                      alt="讲师头像"
                      fill
                      className="object-cover rounded-full"
                    />
                  ) : (
                    <div className="w-full h-full rounded-full bg-gray-800 border-2 border-dashed border-gray-600 flex items-center justify-center">
                      <User className="h-8 w-8 text-gray-500" />
                    </div>
                  )}
                </div>
                <div>
                  <Input
                    type="file"
                    className="hidden"
                    id="instructor-image"
                    accept="image/*"
                    onChange={handleImageUpload}
                  />
                  <Label htmlFor="instructor-image">
                    <Button
                      variant="outline"
                      className="border-blue-500/30 text-blue-400 hover:bg-blue-500/20 mb-2"
                      asChild
                    >
                      <span>上传头像</span>
                    </Button>
                  </Label>
                  <p className="text-xs text-gray-500">建议尺寸: 400×400px，格式：JPG/PNG</p>
                </div>
              </div>
            </div>
          </div>
        </Card>

        {/* 讲师资质 */}
        <Card className="p-4 bg-gray-900 border-gray-800 mb-6">
          <h2 className="text-lg font-semibold text-white mb-4">讲师资质（可选）</h2>

          <div className="grid gap-4">
            <div>
              <Label htmlFor="teacher-education" className="text-white mb-2 block">
                教育背景
              </Label>
              <Input
                id="teacher-education"
                placeholder="例如：北京大学数学系博士"
                className="bg-gray-800 border-gray-700 text-white"
              />
            </div>

            <div>
              <Label htmlFor="teacher-experience" className="text-white mb-2 block">
                教学经验
              </Label>
              <Input
                id="teacher-experience"
                placeholder="例如：10年高中数学教学经验"
                className="bg-gray-800 border-gray-700 text-white"
              />
            </div>

            <div>
              <Label htmlFor="teacher-awards" className="text-white mb-2 block">
                获奖情况
              </Label>
              <Input
                id="teacher-awards"
                placeholder="例如：全国优秀教师称号"
                className="bg-gray-800 border-gray-700 text-white"
              />
            </div>
          </div>
        </Card>

        {/* 提示信息 */}
        <div className="bg-blue-900/20 border border-blue-500/30 rounded-lg p-4 mb-6">
          <h3 className="text-blue-400 font-medium mb-2">填写提示</h3>
          <ul className="text-sm text-gray-300 space-y-2">
            <li>• 详细的讲师背景介绍可以增加课程的专业可信度</li>
            <li>• 建议包含讲师的教育背景、工作经验和专业成就</li>
            <li>• 讲师头像应清晰、专业，能够给学员留下良好印象</li>
            <li>• 如果是团队授课，可以添加多位讲师信息</li>
          </ul>
        </div>
      </div>

      {/* 底部导航按钮 */}
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-gray-900/95 backdrop-blur-md border-t border-gray-800">
        <div className="flex justify-between">
          <Button variant="outline" onClick={handleBack} className="w-1/3 border-gray-700 text-white">
            上一步
          </Button>

          <Button
            className="w-2/3 ml-3 bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400"
            onClick={handleSaveAndNext}
            disabled={!isFormComplete()}
          >
            下一步：添加课程章节
          </Button>
        </div>
      </div>
    </div>
  )
}
