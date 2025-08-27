"use client"

import type React from "react"

import { useState } from "react"
import { ArrowLeft, User, Sparkles, Loader2, Save } from "lucide-react"
import { useRouter } from "next/navigation"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Alert, AlertDescription } from "@/components/ui/alert"
import Image from "next/image"
import Link from "next/link"

export default function CreateTeacher() {
  const router = useRouter()

  // 状态管理
  const [teacherName, setTeacherName] = useState("")
  const [teacherGender, setTeacherGender] = useState("")
  const [teacherDescription, setTeacherDescription] = useState("")
  const [teacherImage, setTeacherImage] = useState<string | null>(null)
  const [teacherEducation, setTeacherEducation] = useState("")
  const [teacherExperience, setTeacherExperience] = useState("")
  const [teacherAwards, setTeacherAwards] = useState("")
  const [isGeneratingBio, setIsGeneratingBio] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)

  // 获取URL中的课程ID参数
  const searchParams = new URLSearchParams(typeof window !== "undefined" ? window.location.search : "")
  const courseId = searchParams.get("id")

  // 如果有课程ID，则加载对应的教师数据
  useState(() => {
    if (courseId) {
      // 这里应该有API请求获取教师数据
      // 模拟加载教师数据
      setTimeout(() => {
        setTeacherName("王老师")
        setTeacherGender("male")
        setTeacherEducation("北京大学数学系博士")
        setTeacherExperience("10年高中数学教学经验")
        setTeacherAwards("全国优秀教师称号")
        setTeacherDescription(
          "王老师，北京大学数学系博士，拥有丰富的教学经验。他的教学风格生动活泼，善于用通俗易懂的语言讲解复杂的知识点，深受学生喜爱。10年高中数学教学经验，曾获得全国优秀教师称号，在教学过程中注重培养学生的思维能力和学习兴趣，帮助无数学生取得了优异的成绩。",
        )
      }, 500)
    }
  }, [courseId])

  // 处理讲师头像上传
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0]
      const reader = new FileReader()
      reader.onload = (e) => {
        if (e.target?.result) {
          setTeacherImage(e.target.result as string)
        }
      }
      reader.readAsDataURL(file)
    }
  }

  // AI生成讲师简介
  const generateTeacherBio = () => {
    if (!teacherName || !teacherEducation) {
      alert("请先填写讲师姓名和教育背景")
      return
    }

    setIsGeneratingBio(true)

    // 模拟AI生成过程
    setTimeout(() => {
      const genderText = teacherGender === "male" ? "他" : teacherGender === "female" ? "她" : "他/她"

      const generatedBio = `${teacherName}，${teacherEducation}，拥有丰富的教学经验。${genderText}的教学风格生动活泼，善于用通俗易懂的语言讲解复杂的知识点，深受学生喜爱。${teacherExperience ? `${teacherExperience}，` : ""}${teacherAwards ? `曾获得${teacherAwards}，` : ""}在教学过程中注重培养学生的思维能力和学习兴趣，帮助无数学生取得了优异的成绩。`

      setTeacherDescription(generatedBio)
      setIsGeneratingBio(false)
    }, 1500)
  }

  // 保存讲师信息
  const handleSaveTeacher = () => {
    if (!teacherName || !teacherDescription) {
      alert("请填写讲师姓名和简介")
      return
    }

    setIsSaving(true)

    // 模拟API请求
    setTimeout(() => {
      setIsSaving(false)
      setShowSuccess(true)

      // 3秒后跳转回课程设置页面
      setTimeout(() => {
        router.push("/management/courses")
      }, 2000)
    }, 1000)
  }

  // 检查表单是否填写完整
  const isFormComplete = () => {
    return teacherName && teacherDescription
  }

  return (
    <div className="min-h-screen bg-black text-white">
      {/* 顶部导航栏 */}
      <div className="sticky top-0 left-0 right-0 h-14 flex items-center px-4 bg-gray-900/80 backdrop-blur-md border-b border-gray-800 z-10">
        <Link href="/management/courses" className="flex items-center text-gray-300">
          <ArrowLeft className="h-5 w-5 mr-2" />
          <span>返回</span>
        </Link>
        <h1 className="flex-1 text-center text-lg font-semibold text-white">{courseId ? "修改讲师" : "创建讲师"}</h1>
      </div>

      {/* 成功提示 */}
      {showSuccess && (
        <div className="fixed top-16 left-4 right-4 z-50">
          <Alert className="bg-green-900/60 border-green-500 backdrop-blur-sm">
            <User className="h-4 w-4 text-green-400 mr-2" />
            <AlertDescription className="text-green-400">讲师创建成功！正在返回课程设置页面...</AlertDescription>
          </Alert>
        </div>
      )}

      <div className="p-4 pb-24">
        {/* 讲师基本信息 */}
        <Card className="p-4 bg-gray-900 border-gray-800 mb-6">
          <h2 className="text-lg font-semibold text-white mb-4">讲师基本信息</h2>

          <div className="grid gap-4">
            <div>
              <Label htmlFor="teacher-name" className="text-white mb-2 block">
                讲师姓名 <span className="text-red-500">*</span>
              </Label>
              <Input
                id="teacher-name"
                value={teacherName}
                onChange={(e) => setTeacherName(e.target.value)}
                placeholder="请输入讲师姓名"
                className="bg-gray-800 border-gray-700 text-white"
                required
              />
            </div>

            <div>
              <Label htmlFor="teacher-gender" className="text-white mb-2 block">
                讲师性别
              </Label>
              <Select value={teacherGender} onValueChange={setTeacherGender}>
                <SelectTrigger className="bg-gray-800 border-gray-700 text-white">
                  <SelectValue placeholder="选择性别" />
                </SelectTrigger>
                <SelectContent className="bg-gray-900 border-gray-700 text-white">
                  <SelectItem value="male">男</SelectItem>
                  <SelectItem value="female">女</SelectItem>
                  <SelectItem value="other">其他</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label className="text-white mb-2 block">讲师头像</Label>
              <div className="flex items-center">
                <div className="relative w-24 h-24 mr-4">
                  {teacherImage ? (
                    <Image
                      src={teacherImage || "/placeholder.svg"}
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
                    id="teacher-image"
                    accept="image/*"
                    onChange={handleImageUpload}
                  />
                  <Label htmlFor="teacher-image">
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
          <h2 className="text-lg font-semibold text-white mb-4">讲师资质</h2>

          <div className="grid gap-4">
            <div>
              <Label htmlFor="teacher-education" className="text-white mb-2 block">
                教育背景 <span className="text-red-500">*</span>
              </Label>
              <Input
                id="teacher-education"
                value={teacherEducation}
                onChange={(e) => setTeacherEducation(e.target.value)}
                placeholder="例如：北京大学数学系博士"
                className="bg-gray-800 border-gray-700 text-white"
                required
              />
            </div>

            <div>
              <Label htmlFor="teacher-experience" className="text-white mb-2 block">
                教学经验
              </Label>
              <Input
                id="teacher-experience"
                value={teacherExperience}
                onChange={(e) => setTeacherExperience(e.target.value)}
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
                value={teacherAwards}
                onChange={(e) => setTeacherAwards(e.target.value)}
                placeholder="例如：全国优秀教师称号"
                className="bg-gray-800 border-gray-700 text-white"
              />
            </div>

            <div>
              <div className="flex justify-between items-center mb-2">
                <Label htmlFor="teacher-description" className="text-white">
                  讲师简介 <span className="text-red-500">*</span>
                </Label>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={generateTeacherBio}
                  disabled={isGeneratingBio || !teacherName || !teacherEducation}
                  className="h-8 border-blue-500/30 text-blue-400 hover:bg-blue-500/20"
                >
                  {isGeneratingBio ? (
                    <>
                      <Loader2 className="h-3.5 w-3.5 mr-1.5 animate-spin" />
                      生成中...
                    </>
                  ) : (
                    <>
                      <Sparkles className="h-3.5 w-3.5 mr-1.5" />
                      AI生成简介
                    </>
                  )}
                </Button>
              </div>
              <Textarea
                id="teacher-description"
                value={teacherDescription}
                onChange={(e) => setTeacherDescription(e.target.value)}
                placeholder="请输入讲师简介，包括教学经验、专业背景等"
                className="bg-gray-800 border-gray-700 text-white min-h-[150px]"
                required
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
            <li>• 可以使用AI生成功能快速创建讲师简介，然后根据需要进行修改</li>
          </ul>
        </div>
      </div>

      {/* 底部保存按钮 */}
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-gray-900/95 backdrop-blur-md border-t border-gray-800">
        <Button
          className="w-full bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400"
          onClick={handleSaveTeacher}
          disabled={!isFormComplete() || isSaving}
        >
          {isSaving ? (
            <>
              <Loader2 className="h-4 w-4 mr-2 animate-spin" />
              保存中...
            </>
          ) : (
            <>
              <Save className="h-4 w-4 mr-2" />
              保存讲师信息
            </>
          )}
        </Button>
      </div>
    </div>
  )
}
