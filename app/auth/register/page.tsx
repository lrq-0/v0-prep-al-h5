"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { ArrowLeft, Eye, EyeOff } from "lucide-react"

export default function RegisterPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [countdown, setCountdown] = useState(0)
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  // Form states
  const [phoneNumber, setPhoneNumber] = useState("")
  const [verificationCode, setVerificationCode] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [agreeTerms, setAgreeTerms] = useState(false)

  // Simple validation
  const isPhoneValid = phoneNumber.length === 11
  const isCodeValid = verificationCode.length >= 4
  const isEmailValid = email.includes("@") && email.includes(".")
  const isPasswordValid = password.length >= 6
  const doPasswordsMatch = password === confirmPassword

  const handleSendVerificationCode = () => {
    if (!isPhoneValid) return
    setLoading(true)

    // Simulate API call
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

  const handleRegister = () => {
    if (!isPhoneValid || !isCodeValid || !isEmailValid || !isPasswordValid || !doPasswordsMatch || !agreeTerms) {
      return
    }

    setLoading(true)

    // Simulate registration process
    setTimeout(() => {
      setLoading(false)
      router.push("/auth/register-success")
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
          <h1 className="text-2xl font-bold mb-2">注册账号</h1>
          <p className="text-muted-foreground">创建您的PrepAI账号</p>
        </div>

        <Card>
          <CardContent className="pt-6">
            <div className="space-y-4">
              <div>
                <Input
                  placeholder="请输入手机号"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                />
              </div>

              <div className="flex space-x-2">
                <Input
                  placeholder="请输入验证码"
                  value={verificationCode}
                  onChange={(e) => setVerificationCode(e.target.value)}
                />
                <Button
                  variant="outline"
                  disabled={!isPhoneValid || countdown > 0 || loading}
                  onClick={handleSendVerificationCode}
                  className="whitespace-nowrap"
                >
                  {countdown > 0 ? `${countdown}秒后重试` : "获取验证码"}
                </Button>
              </div>

              <div>
                <Input placeholder="请输入邮箱" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
              </div>

              <div className="relative">
                <Input
                  placeholder="请设置密码"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <Button
                  variant="ghost"
                  size="sm"
                  className="absolute right-0 top-0 h-full px-3"
                  onClick={() => setShowPassword(!showPassword)}
                  type="button"
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </Button>
              </div>

              <div className="relative">
                <Input
                  placeholder="请确认密码"
                  type={showConfirmPassword ? "text" : "password"}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
                <Button
                  variant="ghost"
                  size="sm"
                  className="absolute right-0 top-0 h-full px-3"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  type="button"
                >
                  {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </Button>
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox id="terms" checked={agreeTerms} onCheckedChange={(checked) => setAgreeTerms(!!checked)} />
                <label htmlFor="terms" className="text-sm">
                  我已阅读并同意{" "}
                  <Link href="#" className="text-primary">
                    用户协议
                  </Link>{" "}
                  和{" "}
                  <Link href="#" className="text-primary">
                    隐私政策
                  </Link>
                </label>
              </div>

              <Button
                className="w-full"
                disabled={
                  !isPhoneValid ||
                  !isCodeValid ||
                  !isEmailValid ||
                  !isPasswordValid ||
                  !doPasswordsMatch ||
                  !agreeTerms ||
                  loading
                }
                onClick={handleRegister}
              >
                {loading ? "注册中..." : "注册账号"}
              </Button>
            </div>
          </CardContent>

          <CardFooter className="flex justify-center border-t pt-6">
            <p className="text-sm text-muted-foreground">
              已有账号？
              <Link href="/auth/login" className="text-primary ml-1">
                立即登录
              </Link>
            </p>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}
