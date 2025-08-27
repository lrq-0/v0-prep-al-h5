"use client"

import type React from "react"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { User, Mail, Phone, Calendar, CreditCard, CheckCircle, Info, AlertCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Separator } from "@/components/ui/separator"
import { cn } from "@/lib/utils"

// AOPA无人机驾驶员执照考试报名页面
export default function ExamRegistration({ params }: { params: { id: string } }) {
  const router = useRouter()

  // 考试数据
  const exam = {
    id: "2",
    title: "AOPA无人机驾驶员执照考试",
    type: "认证考试",
    image: "/images/tech-banner-2.png",
    price: 800,
    examDate: "2025年6月15日",
    location: "线上理论考试 + 线下实操考核",
    description:
      "AOPA无人机驾驶员执照是由中国航空器拥有者及驾驶员协会(AOPA)颁发的官方认证，通过本考试后，您将获得在中国境内合法操作无人机的资格证书。",
  }

  // 表单状态
  const [formData, setFormData] = useState({
    name: "",
    idNumber: "",
    email: "",
    phone: "",
    droneType: "",
    flightExperience: "",
    paymentMethod: "wechat",
    agreeTerms: false,
  })

  // 更新表单数据
  const updateFormData = (field: string, value: any) => {
    setFormData({ ...formData, [field]: value })
  }

  // 检查表单是否完整
  const isFormComplete = () => {
    return (
      formData.name !== "" &&
      formData.idNumber !== "" &&
      formData.email !== "" &&
      formData.phone !== "" &&
      formData.droneType !== "" &&
      formData.flightExperience !== "" &&
      formData.agreeTerms
    )
  }

  // 提交报名
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (isFormComplete()) {
      // 处理支付逻辑
      router.push("/payment-success")
    }
  }

  return (
    <div className="min-h-screen bg-gray-950 text-white">
      <div className="container max-w-4xl mx-auto py-8 px-4">
        <div className="mb-8">
          <h1 className="text-2xl font-bold mb-2">报名 - {exam.title}</h1>
          <p className="text-gray-400">请填写以下信息完成报名</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* 报名表单 */}
          <div className="md:col-span-2">
            <form onSubmit={handleSubmit} className="space-y-6 bg-gray-900 rounded-lg p-6 border border-gray-800">
              <div className="space-y-4">
                <h2 className="text-lg font-medium">个人信息</h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name" className="flex items-center">
                      <User className="h-4 w-4 mr-1 text-blue-400" />
                      姓名
                    </Label>
                    <Input
                      id="name"
                      placeholder="请输入真实姓名"
                      value={formData.name}
                      onChange={(e) => updateFormData("name", e.target.value)}
                      className="bg-gray-900 border-gray-800 focus-visible:ring-blue-500"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="idNumber">身份证号</Label>
                    <Input
                      id="idNumber"
                      placeholder="请输入身份证号码"
                      value={formData.idNumber}
                      onChange={(e) => updateFormData("idNumber", e.target.value)}
                      className="bg-gray-900 border-gray-800 focus-visible:ring-blue-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                </div>
              </div>

              <Separator className="bg-gray-800" />

              <div className="space-y-4">
                <h2 className="text-lg font-medium">无人机经验</h2>

                <div className="space-y-2">
                  <Label htmlFor="droneType">无人机类型</Label>
                  <Select value={formData.droneType} onValueChange={(value) => updateFormData("droneType", value)}>
                    <SelectTrigger className="bg-gray-900 border-gray-800 focus:ring-blue-500">
                      <SelectValue placeholder="选择无人机类型" />
                    </SelectTrigger>
                    <SelectContent className="bg-gray-900 border-gray-800">
                      <SelectItem value="multirotor">多旋翼无人机</SelectItem>
                      <SelectItem value="fixedwing">固定翼无人机</SelectItem>
                      <SelectItem value="hybrid">混合翼无人机</SelectItem>
                      <SelectItem value="helicopter">无人直升机</SelectItem>
                      <SelectItem value="other">其他类型</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>飞行经验</Label>
                  <RadioGroup
                    value={formData.flightExperience}
                    onValueChange={(value) => updateFormData("flightExperience", value)}
                    className="space-y-3"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="beginner" id="beginner" />
                      <Label htmlFor="beginner" className="font-normal">
                        初学者（飞行时间少于10小时）
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="intermediate" id="intermediate" />
                      <Label htmlFor="intermediate" className="font-normal">
                        中级（飞行时间10-50小时）
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="advanced" id="advanced" />
                      <Label htmlFor="advanced" className="font-normal">
                        高级（飞行时间50-200小时）
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="expert" id="expert" />
                      <Label htmlFor="expert" className="font-normal">
                        专家（飞行时间200小时以上）
                      </Label>
                    </div>
                  </RadioGroup>
                </div>
              </div>

              <Separator className="bg-gray-800" />

              <div className="space-y-4">
                <h2 className="text-lg font-medium">支付方式</h2>

                <RadioGroup
                  value={formData.paymentMethod}
                  onValueChange={(value) => updateFormData("paymentMethod", value)}
                  className="space-y-3"
                >
                  <div
                    className={cn(
                      "flex items-center border rounded-lg p-3",
                      formData.paymentMethod === "wechat"
                        ? "bg-blue-900/20 border-blue-500"
                        : "bg-gray-900 border-gray-800",
                    )}
                  >
                    <RadioGroupItem value="wechat" id="wechat" />
                    <Label htmlFor="wechat" className="flex items-center ml-3 font-normal cursor-pointer">
                      <Image
                        src="/wechat-pay-generic-icon.png"
                        alt="微信支付"
                        width={24}
                        height={24}
                        className="mr-2"
                      />
                      微信支付
                    </Label>
                  </div>

                  <div
                    className={cn(
                      "flex items-center border rounded-lg p-3",
                      formData.paymentMethod === "alipay"
                        ? "bg-blue-900/20 border-blue-500"
                        : "bg-gray-900 border-gray-800",
                    )}
                  >
                    <RadioGroupItem value="alipay" id="alipay" />
                    <Label htmlFor="alipay" className="flex items-center ml-3 font-normal cursor-pointer">
                      <Image src="/digital-wallet-icon.png" alt="支付宝" width={24} height={24} className="mr-2" />
                      支付宝
                    </Label>
                  </div>

                  <div
                    className={cn(
                      "flex items-center border rounded-lg p-3",
                      formData.paymentMethod === "unionpay"
                        ? "bg-blue-900/20 border-blue-500"
                        : "bg-gray-900 border-gray-800",
                    )}
                  >
                    <RadioGroupItem value="unionpay" id="unionpay" />
                    <Label htmlFor="unionpay" className="flex items-center ml-3 font-normal cursor-pointer">
                      <Image src="/unionpay-logo-generic.png" alt="银联支付" width={24} height={24} className="mr-2" />
                      银联支付
                    </Label>
                  </div>
                </RadioGroup>
              </div>

              <div className="flex items-start space-x-2 pt-2">
                <Checkbox
                  id="terms"
                  checked={formData.agreeTerms}
                  onCheckedChange={(checked) => updateFormData("agreeTerms", checked)}
                  className="mt-1 data-[state=checked]:bg-blue-500 data-[state=checked]:border-blue-500"
                />
                <Label htmlFor="terms" className="text-sm font-normal">
                  我已阅读并同意<span className="text-blue-400 cursor-pointer">考试规则</span>和
                  <span className="text-blue-400 cursor-pointer">隐私政策</span>，并确认所提供的信息真实有效。
                </Label>
              </div>

              <div className="pt-2">
                <Button
                  type="submit"
                  disabled={!isFormComplete()}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                >
                  确认报名并支付 ¥{exam.price}
                </Button>
              </div>
            </form>
          </div>

          {/* 考试信息侧边栏 */}
          <div className="space-y-4">
            <div className="bg-gray-900 rounded-lg p-4 border border-gray-800">
              <div className="relative w-full aspect-video rounded-lg overflow-hidden mb-4">
                <Image src={exam.image || "/placeholder.svg"} alt={exam.title} fill className="object-cover" />
              </div>

              <h2 className="text-lg font-medium mb-2">{exam.title}</h2>

              <div className="space-y-3 text-sm">
                <div className="flex items-start">
                  <Calendar className="h-4 w-4 text-blue-400 mt-0.5 mr-2" />
                  <div>
                    <p className="text-gray-400">考试日期</p>
                    <p>{exam.examDate}</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <Info className="h-4 w-4 text-blue-400 mt-0.5 mr-2" />
                  <div>
                    <p className="text-gray-400">考试方式</p>
                    <p>{exam.location}</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <CreditCard className="h-4 w-4 text-blue-400 mt-0.5 mr-2" />
                  <div>
                    <p className="text-gray-400">报名费用</p>
                    <p className="text-blue-400 font-medium">¥{exam.price}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-blue-900/20 border border-blue-900/30 rounded-lg p-4">
              <h3 className="text-blue-400 font-medium mb-2 flex items-center">
                <Info className="h-4 w-4 mr-2" /> 考试须知
              </h3>
              <ul className="space-y-2 text-sm text-gray-300">
                <li className="flex items-start">
                  <CheckCircle className="h-3.5 w-3.5 text-blue-400 mt-0.5 mr-1.5 shrink-0" />
                  <span>理论考试通过后，需在30天内完成实操考核</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-3.5 w-3.5 text-blue-400 mt-0.5 mr-1.5 shrink-0" />
                  <span>请携带有效身份证件参加考试</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-3.5 w-3.5 text-blue-400 mt-0.5 mr-1.5 shrink-0" />
                  <span>考试费用包含一次理论考试和一次实操考核</span>
                </li>
                <li className="flex items-start">
                  <AlertCircle className="h-3.5 w-3.5 text-amber-400 mt-0.5 mr-1.5 shrink-0" />
                  <span>如需改期，请至少提前7天申请</span>
                </li>
              </ul>
            </div>

            <div className="text-center">
              <Link href={`/exams/${params.id}/intro`}>
                <Button variant="outline" className="border-gray-700 text-white hover:bg-gray-800 hover:text-white">
                  返回考试详情
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
