"use client"

import type React from "react"

import { useState } from "react"
import { ArrowLeft, Upload, Check, Save, Phone, Mail } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Alert, AlertDescription } from "@/components/ui/alert"

export default function ContactSettings() {
  // 表单状态
  const [customerServiceQR, setCustomerServiceQR] = useState<string | null>(null)
  const [phone, setPhone] = useState("400-123-4567")
  const [email, setEmail] = useState("support@prepal.com")
  const [workingHours, setWorkingHours] = useState("周一至周日 9:00-21:00")
  const [isSaving, setIsSaving] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)

  // 处理二维码上传
  const handleQRUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0]
      const reader = new FileReader()
      reader.onload = (e) => {
        if (e.target?.result) {
          setCustomerServiceQR(e.target.result as string)
        }
      }
      reader.readAsDataURL(file)
    }
  }

  // 保存配置
  const saveConfiguration = () => {
    setIsSaving(true)

    // 模拟API请求
    setTimeout(() => {
      setIsSaving(false)
      setShowSuccess(true)

      // 3秒后隐藏成功提示
      setTimeout(() => {
        setShowSuccess(false)
      }, 3000)
    }, 1500)
  }

  return (
    <div className="min-h-screen bg-black text-white">
      {/* 顶部导航栏 */}
      <div className="sticky top-0 left-0 right-0 h-14 flex items-center px-4 bg-gray-900/80 backdrop-blur-md border-b border-gray-800 z-10">
        <Link href="/management/system" className="flex items-center text-gray-300">
          <ArrowLeft className="h-5 w-5 mr-2" />
          <span>返回</span>
        </Link>
        <h1 className="flex-1 text-center text-lg font-semibold text-white">联系方式设置</h1>
      </div>

      {/* 成功提示 */}
      {showSuccess && (
        <div className="fixed top-16 left-4 right-4 z-50">
          <Alert className="bg-green-900/60 border-green-500 backdrop-blur-sm">
            <Check className="h-4 w-4 text-green-400 mr-2" />
            <AlertDescription className="text-green-400">联系方式设置已成功保存</AlertDescription>
          </Alert>
        </div>
      )}

      <div className="p-4 pb-24">
        {/* 客服二维码 */}
        <Card className="p-4 bg-gray-900 border-gray-800 mb-6">
          <h2 className="text-lg font-semibold text-white mb-4">客服二维码</h2>
          <div className="mb-4 flex flex-col items-center">
            <div className="relative w-48 h-48 mb-3">
              {customerServiceQR ? (
                <Image
                  src={customerServiceQR || "/placeholder.svg"}
                  alt="客服二维码"
                  fill
                  className="object-contain bg-white p-2 rounded-lg"
                />
              ) : (
                <div className="w-full h-full rounded-lg bg-white p-2 border-2 border-dashed border-gray-600 flex items-center justify-center">
                  <Upload className="h-8 w-8 text-gray-500" />
                </div>
              )}
              <label
                htmlFor="qr-upload"
                className="absolute bottom-2 right-2 bg-blue-600 rounded-full p-2 cursor-pointer"
              >
                <Upload className="h-4 w-4 text-white" />
              </label>
              <input id="qr-upload" type="file" accept="image/*" className="hidden" onChange={handleQRUpload} />
            </div>
            <p className="text-sm text-gray-400">上传客服二维码</p>
            <p className="text-xs text-gray-500 mt-1">建议尺寸: 300×300px，支持PNG、JPG格式</p>
          </div>
        </Card>

        {/* 联系方式 */}
        <Card className="p-4 bg-gray-900 border-gray-800 mb-6">
          <h2 className="text-lg font-semibold text-white mb-4">联系方式</h2>
          <div className="space-y-4">
            <div>
              <Label htmlFor="phone" className="text-white mb-2 block">
                客服电话
              </Label>
              <div className="flex items-center">
                <Phone className="h-4 w-4 text-gray-500 mr-2" />
                <Input
                  id="phone"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="请输入客服电话号码"
                  className="bg-gray-800 border-gray-700 text-white"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="email" className="text-white mb-2 block">
                客服邮箱
              </Label>
              <div className="flex items-center">
                <Mail className="h-4 w-4 text-gray-500 mr-2" />
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="请输入客服邮箱地址"
                  className="bg-gray-800 border-gray-700 text-white"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="working-hours" className="text-white mb-2 block">
                工作时间
              </Label>
              <Input
                id="working-hours"
                value={workingHours}
                onChange={(e) => setWorkingHours(e.target.value)}
                placeholder="例如：周一至周日 9:00-21:00"
                className="bg-gray-800 border-gray-700 text-white"
              />
            </div>
          </div>
        </Card>

        {/* 常见问题 */}
        <Card className="p-4 bg-gray-900 border-gray-800 mb-6">
          <h2 className="text-lg font-semibold text-white mb-4">常见问题设置</h2>
          <p className="text-sm text-gray-400 mb-4">添加在联系方式页面底部显示的常见问题，最多支持5个问题</p>

          <div className="space-y-4">
            <div className="p-4 bg-gray-800 rounded-lg border border-gray-700">
              <div className="flex justify-between mb-2">
                <Label htmlFor="question-1" className="text-white">
                  问题1
                </Label>
                <Button variant="ghost" size="sm" className="h-6 text-xs text-red-400">
                  删除
                </Button>
              </div>
              <Input
                id="question-1"
                defaultValue="如何购买课程？"
                placeholder="请输入问题标题"
                className="bg-gray-900 border-gray-700 text-white mb-2"
              />
              <Textarea
                defaultValue={
                  '您可以在"私教"页面浏览课程，选择心仪的课程后点击进入详情页，然后点击"立即购买"按钮完成支付。'
                }
                placeholder="请输入问题答案"
                className="bg-gray-900 border-gray-700 text-white min-h-[80px]"
              />
            </div>

            <div className="p-4 bg-gray-800 rounded-lg border border-gray-700">
              <div className="flex justify-between mb-2">
                <Label htmlFor="question-2" className="text-white">
                  问题2
                </Label>
                <Button variant="ghost" size="sm" className="h-6 text-xs text-red-400">
                  删除
                </Button>
              </div>
              <Input
                id="question-2"
                defaultValue="如何使用AI助手？"
                placeholder="请输入问题标题"
                className="bg-gray-900 border-gray-700 text-white mb-2"
              />
              <Textarea
                defaultValue={'您可以在"AI助手"页面选择您需要的AI模型或助手，点击"开始对话"按钮即可开始使用。'}
                placeholder="请输入问题答案"
                className="bg-gray-900 border-gray-700 text-white min-h-[80px]"
              />
            </div>

            <Button variant="outline" className="w-full border-blue-500/30 text-blue-400 hover:bg-blue-500/20">
              + 添加新问题
            </Button>
          </div>
        </Card>
      </div>

      {/* 底部保存按钮 */}
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-gray-900/95 backdrop-blur-md border-t border-gray-800">
        <Button
          className="w-full bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400"
          onClick={saveConfiguration}
          disabled={isSaving}
        >
          <Save className="h-4 w-4 mr-2" />
          {isSaving ? "保存中..." : "保存联系方式"}
        </Button>
      </div>
    </div>
  )
}
