"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { ArrowLeft, CheckCircle } from "lucide-react"

export default function ForgotPasswordPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [email, setEmail] = useState("")
  const [submitted, setSubmitted] = useState(false)

  // Simple validation
  const isEmailValid = email.includes("@") && email.includes(".")

  const handleSubmit = () => {
    if (!isEmailValid) return

    setLoading(true)

    // Simulate API call
    setTimeout(() => {
      setLoading(false)
      setSubmitted(true)
    }, 1500)
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="mb-6">
          <Button variant="ghost" size="sm" className="mb-6" onClick={() => router.push("/auth/login")}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            返回登录
          </Button>
          <h1 className="text-2xl font-bold mb-2">找回密码</h1>
          <p className="text-muted-foreground">我们将向您的邮箱发送密码重置链接</p>
        </div>

        {!submitted ? (
          <Card>
            <CardContent className="pt-6">
              <div className="space-y-4">
                <div>
                  <Input
                    placeholder="请输入您的注册邮箱"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>

                <Button className="w-full" disabled={!isEmailValid || loading} onClick={handleSubmit}>
                  {loading ? "发送中..." : "发送重置链接"}
                </Button>
              </div>
            </CardContent>

            <CardFooter className="flex justify-center border-t pt-6">
              <p className="text-sm text-muted-foreground">
                想起密码了？
                <Link href="/auth/login" className="text-primary ml-1">
                  返回登录
                </Link>
              </p>
            </CardFooter>
          </Card>
        ) : (
          <Card className="text-center">
            <CardContent className="pt-10 pb-6 flex flex-col items-center">
              <div className="bg-primary/10 p-4 rounded-full mb-6">
                <CheckCircle className="h-16 w-16 text-primary" />
              </div>
              <h1 className="text-2xl font-bold mb-2">邮件已发送</h1>
              <p className="text-muted-foreground mb-6">
                ��码重置链接已发送至您的邮箱
                <br />
                <span className="font-medium">{email}</span>
                <br />
                请查收并按照提示重置密码
              </p>
            </CardContent>

            <CardFooter className="flex flex-col gap-4 pb-10">
              <Button variant="outline" className="w-full" onClick={() => router.push("/auth/login")}>
                返回登录页
              </Button>
            </CardFooter>
          </Card>
        )}
      </div>
    </div>
  )
}
