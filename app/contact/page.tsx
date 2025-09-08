"use client"

import { ArrowLeft, Phone, Mail, Copy } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useState } from "react"

export default function Contact() {
  const [phoneNumberCopied, setPhoneNumberCopied] = useState(false)
  const [emailCopied, setEmailCopied] = useState(false)

  // 模拟联系方式数据
  const contactInfo = {
    phone: "400-123-4567",
    email: "support@prepal.com",
    qrCode: "/images/user-avatar.png", // 实际应用中应该是客服二维码图片
    workingHours: "周一至周日 9:00-21:00",
  }

  // 复制电话号码
  const copyPhoneNumber = () => {
    navigator.clipboard.writeText(contactInfo.phone)
    setPhoneNumberCopied(true)
    setTimeout(() => setPhoneNumberCopied(false), 2000)
  }

  // 复制邮箱
  const copyEmail = () => {
    navigator.clipboard.writeText(contactInfo.email)
    setEmailCopied(true)
    setTimeout(() => setEmailCopied(false), 2000)
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* 顶部导航栏 */}
      <div className="sticky top-0 left-0 right-0 h-14 flex items-center px-4 bg-card/80 backdrop-blur-md border-b border-border z-10">
        <Link href="/" className="flex items-center text-muted-foreground">
          <ArrowLeft className="h-5 w-5 mr-2" />
          <span>返回</span>
        </Link>
        <h1 className="flex-1 text-center text-lg font-semibold text-foreground">联系方式</h1>
      </div>

      <div className="p-4 pb-16">
        {/* 客服二维码 */}
        <Card className="p-4 bg-card border-border mb-4">
          <h2 className="text-lg font-semibold text-foreground mb-4 text-center">扫码添加客服</h2>
          <div className="flex justify-center mb-4">
            <div className="w-48 h-48 bg-white p-2 rounded-lg">
              <Image
                src={contactInfo.qrCode || "/placeholder.svg"}
                alt="客服二维码"
                width={192}
                height={192}
                className="object-contain"
              />
            </div>
          </div>
          <p className="text-sm text-muted-foreground text-center">工作时间: {contactInfo.workingHours}</p>
        </Card>

        {/* 联系电话 */}
        <Card className="p-4 bg-card border-border mb-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className="w-10 h-10 rounded-full bg-blue-900/20 flex items-center justify-center mr-3">
                <Phone className="h-5 w-5 text-blue-400" />
              </div>
              <div>
                <h3 className="font-medium text-foreground">客服电话</h3>
                <p className="text-sm text-blue-400">{contactInfo.phone}</p>
              </div>
            </div>
            <Button
              variant="outline"
              size="sm"
              className="border-blue-500/30 text-blue-400 hover:bg-blue-500/20 bg-transparent"
              onClick={copyPhoneNumber}
            >
              <Copy className="h-4 w-4 mr-1" />
              {phoneNumberCopied ? "已复制" : "复制"}
            </Button>
          </div>
        </Card>

        {/* 邮箱地址 */}
        <Card className="p-4 bg-card border-border mb-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className="w-10 h-10 rounded-full bg-blue-900/20 flex items-center justify-center mr-3">
                <Mail className="h-5 w-5 text-blue-400" />
              </div>
              <div>
                <h3 className="font-medium text-foreground">客服邮箱</h3>
                <p className="text-sm text-blue-400">{contactInfo.email}</p>
              </div>
            </div>
            <Button
              variant="outline"
              size="sm"
              className="border-blue-500/30 text-blue-400 hover:bg-blue-500/20 bg-transparent"
              onClick={copyEmail}
            >
              <Copy className="h-4 w-4 mr-1" />
              {emailCopied ? "已复制" : "复制"}
            </Button>
          </div>
        </Card>

        {/* 常见问题 */}
        <Card className="p-4 bg-card border-border">
          <h2 className="text-lg font-semibold text-foreground mb-3">常见问题</h2>
          <div className="space-y-3">
            <div className="p-3 bg-muted rounded-lg">
              <h3 className="font-medium text-foreground mb-1">如何购买课程？</h3>
              <p className="text-sm text-muted-foreground">
                您可以在"私教"页面浏览课程，选择心仪的课程后点击进入详情页，然后点击"立即购买"按钮完成支付。
              </p>
            </div>
            <div className="p-3 bg-muted rounded-lg">
              <h3 className="font-medium text-foreground mb-1">如何使用AI助手？</h3>
              <p className="text-sm text-muted-foreground">
                在"AI助手"页面选择您需要的AI模型或助手，点击"开始对话"按钮即可开始使用。
              </p>
            </div>
            <div className="p-3 bg-muted rounded-lg">
              <h3 className="font-medium text-foreground mb-1">如何参加考试？</h3>
              <p className="text-sm text-muted-foreground">
                在"考测"页面选择您想参加的考试，阅读考试说明后点击"开始考试"按钮即可。
              </p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  )
}
