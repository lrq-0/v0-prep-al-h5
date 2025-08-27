"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { CheckCircle } from "lucide-react"
import { useRouter } from "next/navigation"

export default function RegisterSuccessPage() {
  const router = useRouter()

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <Card className="text-center">
          <CardContent className="pt-10 pb-6 flex flex-col items-center">
            <div className="bg-primary/10 p-4 rounded-full mb-6">
              <CheckCircle className="h-16 w-16 text-primary" />
            </div>
            <h1 className="text-2xl font-bold mb-2">注册成功</h1>
            <p className="text-muted-foreground mb-6">恭喜您已成功注册PrepAI账号</p>
          </CardContent>

          <CardFooter className="flex flex-col gap-4 pb-10">
            <Button className="w-full" onClick={() => router.push("/")}>
              开始使用
            </Button>
            <Button variant="outline" className="w-full" onClick={() => router.push("/profile")}>
              完善个人资料
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}
