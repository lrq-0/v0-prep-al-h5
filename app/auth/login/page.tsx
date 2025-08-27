"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { ArrowLeft, Eye, EyeOff, Mail, Phone, PhoneIcon as Wechat } from "lucide-react"

export default function LoginPage() {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState("phone")
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [countdown, setCountdown] = useState(0)
  const [error, setError] = useState("")

  // Form states
  const [phoneNumber, setPhoneNumber] = useState("")
  const [verificationCode, setVerificationCode] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [agreeTerms, setAgreeTerms] = useState(true) // 默认勾选同意条款

  // 简化验证逻辑，确保超级管理员手机号可以通过验证
  const isPhoneValid = phoneNumber.length > 0
  const isCodeValid = verificationCode.length > 0
  const isEmailValid = email.includes("@")
  const isPasswordValid = password.length > 0

  const handleSendVerificationCode = () => {
    if (!phoneNumber) {
      setError("请输入手机号")
      return
    }

    setError("")
    setLoading(true)

    // 模拟发送验证码
    setTimeout(() => {
      setLoading(false)
      setCountdown(60)

      const timer = setInterval(() => {
        setCountdown((prev) => {
          if (prev <= 1) {
            clearInterval(timer)
            return 0
          }
          return prev - 1
        })
      }, 1000)
    }, 1000)
  }

  const handleLogin = () => {
    // 表单验证
    if (activeTab === "phone") {
      if (!phoneNumber) {
        setError("请输入手机号")
        return
      }
      if (!verificationCode) {
        setError("请输入验证码")
        return
      }
    } else if (activeTab === "email") {
      if (!email) {
        setError("请输入邮箱")
        return
      }
      if (!password) {
        setError("请输入密码")
        return
      }
    }

    if (!agreeTerms) {
      setError("请同意用户协议和隐私政策")
      return
    }

    setError("")
    setLoading(true)

    // 模拟登录过程
    setTimeout(() => {
      setLoading(false)

      // 根据不同手机号设置不同角色
      if (activeTab === "phone") {
        if (phoneNumber === "1234567") {
          // 普通会员
          localStorage.setItem("userRole", "user")
          localStorage.setItem("userName", "普通会员")
          router.push("/")
        } else if (phoneNumber === "7654321") {
          // 独立系统代理商
          localStorage.setItem("userRole", "agent")
          localStorage.setItem("userName", "系统代理商")
          router.push("/")
        } else if (phoneNumber === "1234568") {
          // 超级管理员
          localStorage.setItem("userRole", "super_admin")
          localStorage.setItem("userName", "超级管理员")
          router.push("/")
        } else {
          // 默认为普通用户
          localStorage.setItem("userRole", "user")
          localStorage.setItem("userName", "测试用户")
          router.push("/")
        }
      } else if (activeTab === "email") {
        if (email === "admin@example.com") {
          localStorage.setItem("userRole", "super_admin")
          localStorage.setItem("userName", "超级管理员")
        } else if (email === "agent@example.com") {
          localStorage.setItem("userRole", "agent")
          localStorage.setItem("userName", "系统代理商")
        } else {
          localStorage.setItem("userRole", "user")
          localStorage.setItem("userName", "普通会员")
        }
        router.push("/")
      }
    }, 1500)
  }

  const handleWechatLogin = () => {
    if (!agreeTerms) {
      setError("请同意用户协议和隐私政策")
      return
    }

    setError("")
    setLoading(true)

    // 模拟微信登录
    setTimeout(() => {
      setLoading(false)
      localStorage.setItem("userRole", "user")
      localStorage.setItem("userName", "微信用户")
      router.push("/")
    }, 1500)
  }

  return (
    <div className="min-h-screen bg-gray-950 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="mb-6">
          <Button variant="ghost" size="sm" className="mb-6" onClick={() => router.push("/")}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            返回
          </Button>
          <h1 className="text-2xl font-bold mb-2">欢迎使用PrepAI</h1>
          <p className="text-gray-400">登录账号以继续使用服务</p>
        </div>

        <Tabs defaultValue="phone" value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid grid-cols-3 mb-4">
            <TabsTrigger value="phone">
              <Phone className="h-4 w-4 mr-2" />
              手机号
            </TabsTrigger>
            <TabsTrigger value="wechat">
              <Wechat className="h-4 w-4 mr-2" />
              微信
            </TabsTrigger>
            <TabsTrigger value="email">
              <Mail className="h-4 w-4 mr-2" />
              邮箱
            </TabsTrigger>
          </TabsList>

          <Card className="bg-gray-900 border-gray-800">
            <CardContent className="pt-6">
              <TabsContent value="phone" className="mt-0">
                <div className="space-y-4">
                  <div>
                    <label className="text-sm text-gray-400 mb-1 block">手机号</label>
                    <Input
                      placeholder="请输入手机号"
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value)}
                      className="bg-gray-800 border-gray-700"
                    />
                  </div>

                  <div>
                    <label className="text-sm text-gray-400 mb-1 block">验证码</label>
                    <div className="flex space-x-2">
                      <Input
                        placeholder="请输入验证码"
                        value={verificationCode}
                        onChange={(e) => setVerificationCode(e.target.value)}
                        className="bg-gray-800 border-gray-700"
                      />
                      <Button
                        variant="outline"
                        disabled={!phoneNumber || countdown > 0 || loading}
                        onClick={handleSendVerificationCode}
                        className="whitespace-nowrap bg-gray-800 hover:bg-gray-700 border-gray-700"
                      >
                        {countdown > 0 ? `${countdown}秒后重试` : "获取验证码"}
                      </Button>
                    </div>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="terms"
                      checked={agreeTerms}
                      onCheckedChange={(checked) => setAgreeTerms(checked === true)}
                    />
                    <label htmlFor="terms" className="text-sm text-gray-400">
                      我已阅读并同意{" "}
                      <Link href="#" className="text-blue-400 hover:underline">
                        用户协议
                      </Link>{" "}
                      和{" "}
                      <Link href="#" className="text-blue-400 hover:underline">
                        隐私政策
                      </Link>
                    </label>
                  </div>

                  {error && <p className="text-red-500 text-sm">{error}</p>}

                  <Button className="w-full bg-blue-600 hover:bg-blue-700" disabled={loading} onClick={handleLogin}>
                    {loading ? "登录中..." : "登录 / 注册"}
                  </Button>
                </div>
              </TabsContent>

              <TabsContent value="wechat" className="mt-0">
                <div className="space-y-4">
                  <div className="border border-gray-700 rounded-lg p-6 flex flex-col items-center justify-center">
                    <div className="bg-white h-48 w-48 rounded-lg flex items-center justify-center">
                      <svg
                        className="w-32 h-32 text-green-500"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M9.5,4C5.36,4 2,6.69 2,10C2,11.89 3.08,13.56 4.78,14.66L4,17L6.5,15.5C7.39,15.81 8.37,16 9.41,16C9.15,15.37 9,14.7 9,14C9,10.69 12.13,8 16,8C16.19,8 16.38,8 16.56,8.03C15.54,5.69 12.78,4 9.5,4M6.5,6.5A1,1 0 0,1 7.5,7.5A1,1 0 0,1 6.5,8.5A1,1 0 0,1 5.5,7.5A1,1 0 0,1 6.5,6.5M11.5,6.5A1,1 0 0,1 12.5,7.5A1,1 0 0,1 11.5,8.5A1,1 0 0,1 10.5,7.5A1,1 0 0,1 11.5,6.5M16,9C12.69,9 10,11.24 10,14C10,16.76 12.69,19 16,19C16.67,19 17.31,18.92 17.91,18.75L20,20L19.38,18.13C20.95,17.22 22,15.71 22,14C22,11.24 19.31,9 16,9M14,11.5A1,1 0 0,1 15,12.5A1,1 0 0,1 14,13.5A1,1 0 0,1 13,12.5A1,1 0 0,1 14,11.5M18,11.5A1,1 0 0,1 19,12.5A1,1 0 0,1 18,13.5A1,1 0 0,1 17,12.5A1,1 0 0,1 18,11.5Z" />
                      </svg>
                    </div>
                    <p className="mt-4 text-sm text-gray-400">请使用微信扫描二维码登录</p>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="wechat-terms"
                      checked={agreeTerms}
                      onCheckedChange={(checked) => setAgreeTerms(checked === true)}
                    />
                    <label htmlFor="wechat-terms" className="text-sm text-gray-400">
                      我已阅读并同意{" "}
                      <Link href="#" className="text-blue-400 hover:underline">
                        用户协议
                      </Link>{" "}
                      和{" "}
                      <Link href="#" className="text-blue-400 hover:underline">
                        隐私政策
                      </Link>
                    </label>
                  </div>

                  {error && <p className="text-red-500 text-sm">{error}</p>}

                  <Button
                    className="w-full bg-green-600 hover:bg-green-700"
                    onClick={handleWechatLogin}
                    disabled={loading}
                  >
                    {loading ? "登录中..." : "模拟微信登录"}
                  </Button>
                </div>
              </TabsContent>

              <TabsContent value="email" className="mt-0">
                <div className="space-y-4">
                  <div>
                    <label className="text-sm text-gray-400 mb-1 block">邮箱</label>
                    <Input
                      placeholder="请输入邮箱"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="bg-gray-800 border-gray-700"
                    />
                  </div>

                  <div>
                    <div className="flex justify-between">
                      <label className="text-sm text-gray-400 mb-1 block">密码</label>
                      <Link href="/auth/forgot-password" className="text-sm text-blue-400 hover:underline">
                        忘记密码？
                      </Link>
                    </div>
                    <div className="relative">
                      <Input
                        placeholder="请输入密码"
                        type={showPassword ? "text" : "password"}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="bg-gray-800 border-gray-700 pr-10"
                      />
                      <button
                        type="button"
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </button>
                    </div>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="email-terms"
                      checked={agreeTerms}
                      onCheckedChange={(checked) => setAgreeTerms(checked === true)}
                    />
                    <label htmlFor="email-terms" className="text-sm text-gray-400">
                      我已阅读并同意{" "}
                      <Link href="#" className="text-blue-400 hover:underline">
                        用户协议
                      </Link>{" "}
                      和{" "}
                      <Link href="#" className="text-blue-400 hover:underline">
                        隐私政策
                      </Link>
                    </label>
                  </div>

                  {error && <p className="text-red-500 text-sm">{error}</p>}

                  <Button className="w-full bg-blue-600 hover:bg-blue-700" disabled={loading} onClick={handleLogin}>
                    {loading ? "登录中..." : "登录"}
                  </Button>
                </div>
              </TabsContent>
            </CardContent>

            <CardFooter className="flex justify-center border-t border-gray-800 pt-6">
              <p className="text-sm text-gray-400">
                还没有账号？
                <Link href="/auth/register" className="text-blue-400 hover:underline ml-1">
                  立即注册
                </Link>
              </p>
            </CardFooter>
          </Card>
        </Tabs>
      </div>
    </div>
  )
}
