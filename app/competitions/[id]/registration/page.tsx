"use client"

import { useState } from "react"
import { User, Mail, Building, Phone, FileText } from "lucide-react"
import { useRouter } from "next/navigation"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

// 赛事活动报名页面
export default function CompetitionRegistration({ params }: { params: { id: string } }) {
  const router = useRouter()
  const [step, setStep] = useState(1)

  // 低空经济赛事数据
  const competitions = {
    "1": {
      id: "1",
      title: "2025全国无人机创新应用大赛",
      organizer: "中国航空学会",
      price: 200,
      image: "/images/tech-banner-1.png",
      categories: [
        { id: "individual", name: "个人组" },
        { id: "college", name: "高校组" },
        { id: "enterprise", name: "企业组" },
      ],
      tracks: [
        { id: "technical", name: "技术创新赛道" },
        { id: "application", name: "应用方案赛道" },
        { id: "startup", name: "创业计划赛道" },
      ],
    },
    "2": {
      id: "2",
      title: "低空经济创新创业大赛",
      organizer: "工业和信息化部",
      price: 500,
      image: "/images/tech-banner-2.png",
      categories: [
        { id: "startup", name: "初创企业组" },
        { id: "growth", name: "成长企业组" },
        { id: "research", name: "科研院所组" },
      ],
      tracks: [
        { id: "hardware", name: "硬件制造赛道" },
        { id: "software", name: "软件服务赛道" },
        { id: "business", name: "商业模式赛道" },
        { id: "application", name: "行业应用赛道" },
      ],
    },
    "3": {
      id: "3",
      title: "eVTOL飞行器设计大赛",
      organizer: "航空工业集团",
      price: 0,
      image: "/images/tech-banner-3.png",
      categories: [
        { id: "college", name: "高校组" },
        { id: "enterprise", name: "企业组" },
        { id: "individual", name: "个人创客组" },
      ],
      tracks: [
        { id: "concept", name: "概念设计赛道" },
        { id: "prototype", name: "原型开发赛道" },
        { id: "control", name: "控制算法赛道" },
      ],
    },
  }

  // 获取当前赛事
  const competition = competitions[params.id as keyof typeof competitions] || competitions["1"]

  // 表单状态
  const [formData, setFormData] = useState({
    category: "",
    track: "",
    name: "",
    email: "",
    phone: "",
    organization: "",
    title: "",
    abstract: "",
    agreeTerms: false,
  })

  // 更新表单数据
  const updateFormData = (field: string, value: any) => {
    setFormData({ ...formData, [field]: value })
  }

  // 检查当前步骤是否完成
  const isStepComplete = () => {
    if (step === 1) {
      return formData.category !== "" && formData.track !== ""
    } else if (step === 2) {
      return formData.name !== "" && formData.email !== "" && formData.phone !== "" && formData.organization !== ""
    } else if (step === 3) {
      return formData.title !== "" && formData.abstract !== "" && formData.agreeTerms
    }
    return false
  }

  // 处理下一步
  const handleNext = () => {
    if (isStepComplete()) {
      if (step < 3) {
        setStep(step + 1)
      } else {
        // 提交表单
        router.push(`/competitions/${params.id}/success`)
      }
    }
  }

  // 渲染步骤内容
  const renderStepContent = () => {
    switch (step) {
      case 1:
        return (
          <div className="space-y-6">
            <div className="space-y-3">
              <Label>参赛组别</Label>
              <RadioGroup
                value={formData.category}
                onValueChange={(value) => updateFormData("category", value)}
                className="space-y-3"
              >
                {competition.categories.map((category) => (
                  <div
                    key={category.id}
                    className={cn(
                      "flex items-center border rounded-lg p-3",
                      formData.category === category.id
                        ? "bg-blue-900/20 border-blue-500"
                        : "bg-gray-900 border-gray-800",
                    )}
                  >
                    <RadioGroupItem value={category.id} id={`category-${category.id}`} />
                    <Label htmlFor={`category-${category.id}`} className="flex-1 ml-3 font-normal cursor-pointer">
                      {category.name}
                    </Label>
                  </div>
                ))}
              </RadioGroup>
            </div>

            <div className="space-y-3">
              <Label>参赛赛道</Label>
              <RadioGroup
                value={formData.track}
                onValueChange={(value) => updateFormData("track", value)}
                className="space-y-3"
              >
                {competition.tracks.map((track) => (
                  <div
                    key={track.id}
                    className={cn(
                      "flex items-center border rounded-lg p-3",
                      formData.track === track.id ? "bg-blue-900/20 border-blue-500" : "bg-gray-900 border-gray-800",
                    )}
                  >
                    <RadioGroupItem value={track.id} id={`track-${track.id}`} />
                    <Label htmlFor={`track-${track.id}`} className="flex-1 ml-3 font-normal cursor-pointer">
                      {track.name}
                    </Label>
                  </div>
                ))}
              </RadioGroup>
            </div>
          </div>
        )

      case 2:
        return (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name" className="flex items-center">
                <User className="h-4 w-4 mr-1 text-blue-400" />
                参赛者姓名
              </Label>
              <Input
                id="name"
                placeholder="请输入姓名"
                value={formData.name}
                onChange={(e) => updateFormData("name", e.target.value)}
                className="bg-gray-900 border-gray-800 focus-visible:ring-blue-500"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email" className="flex items-center">
                <Mail className="h-4 w-4 mr-1 text-blue-400" />
                电子邮箱
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="请输入电子邮箱"
                value={formData.email}
                onChange={(e) => updateFormData("email", e.target.value)}
                className="bg-gray-900 border-gray-800 focus-visible:ring-blue-500"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone" className="flex items-center">
                <Phone className="h-4 w-4 mr-1 text-blue-400" />
                联系电话
              </Label>
              <Input
                id="phone"
                placeholder="请输入联系电话"
                value={formData.phone}
                onChange={(e) => updateFormData("phone", e.target.value)}
                className="bg-gray-900 border-gray-800 focus-visible:ring-blue-500"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="organization" className="flex items-center">
                <Building className="h-4 w-4 mr-1 text-blue-400" />
                所属单位/学校
              </Label>
              <Input
                id="organization"
                placeholder="请输入所属单位或学校"
                value={formData.organization}
                onChange={(e) => updateFormData("organization", e.target.value)}
                className="bg-gray-900 border-gray-800 focus-visible:ring-blue-500"
              />
            </div>
          </div>
        )

      case 3:
        return (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="title" className="flex items-center">
                <FileText className="h-4 w-4 mr-1 text-blue-400" />
                作品/方案标题
              </Label>
              <Input
                id="title"
                placeholder="请输入作品或方案标题"
                value={formData.title}
                onChange={(e) => updateFormData("title", e.target.value)}
                className="bg-gray-900 border-gray-800 focus-visible:ring-blue-500"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="abstract" className="flex items-center">
                <FileText className="h-4 w-4 mr-1 text-blue-400" />
                作品/方案简介
              </Label>
              <Textarea
                id="abstract"
                placeholder="请简要描述您的作品或方案（不超过500字）"
                value={formData.abstract}
                onChange={(e) => updateFormData("abstract", e.target.value)}
                className="min-h-[150px] bg-gray-900 border-gray-800 focus-visible:ring-blue-500"
              />
            </div>

            <div className="flex items-start space-x-2 pt-2">
              <Checkbox
                id="terms"
                checked={formData.agreeTerms}
                onCheckedChange={(checked) => updateFormData("agreeTerms", checked)}
                className="mt-1 data-[state=checked]:bg-blue-500 data-[state=checked]:border-blue-500"
              />
              <Label htmlFor="terms" className="text-sm font-normal">
                我已阅读并同意大赛的<span className="text-blue-400 cursor-pointer">参赛规则</span>和
                <span className="text-blue-400 cursor-pointer">隐私政策</span>
              </Label>
            </div>
          </div>
        )

      default:
        return null
    }
  }

  return (
    <div className="min-h-screen bg-gray-950 text-white">
      <div className="container max-w-3xl mx-auto py-8 px-4">
        <div className="mb-8">
          <h1 className="text-2xl font-bold mb-2">{competition.title}</h1>
          <p className="text-gray-400">主办单位: {competition.organizer}</p>
        </div>

        {/* 步骤指示器 */}
        <div className="flex items-center justify-between mb-8">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className={cn("flex flex-col items-center", {
                "text-blue-400": step === i,
                "text-gray-400": step !== i,
              })}
            >
              <div
                className={cn(
                  "w-10 h-10 rounded-full flex items-center justify-center mb-2",
                  step === i ? "bg-blue-900 text-white" : "bg-gray-800",
                )}
              >
                {i}
              </div>
              <span className="text-sm">{i === 1 ? "选择组别" : i === 2 ? "个人信息" : "作品信息"}</span>
            </div>
          ))}
        </div>

        {/* 表单内容 */}
        <div className="bg-gray-900 rounded-lg p-6 mb-6 border border-gray-800">{renderStepContent()}</div>

        {/* 按钮区域 */}
        <div className="flex justify-between">
          <Button
            variant="outline"
            onClick={() => step > 1 && setStep(step - 1)}
            disabled={step === 1}
            className="border-gray-700 text-white hover:bg-gray-800 hover:text-white"
          >
            上一步
          </Button>
          <Button
            onClick={handleNext}
            disabled={!isStepComplete()}
            className="bg-blue-600 hover:bg-blue-700 text-white"
          >
            {step === 3 ? "提交报名" : "下一步"}
          </Button>
        </div>

        {/* 报名费用提示 */}
        {competition.price > 0 && (
          <div className="mt-6 text-center text-sm text-gray-400">
            报名费用: <span className="text-blue-400 font-semibold">{competition.price}元</span>
            （提交报名后将跳转至支付页面）
          </div>
        )}
      </div>
    </div>
  )
}
