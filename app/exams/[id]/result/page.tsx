"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { ArrowLeft, CheckCircle, Download, Share2 } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"

// 考试结果页面
export default function ExamResult({ params }: { params: { id: string } }) {
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const [result, setResult] = useState<any>(null)

  // 模拟加载考试结果
  useEffect(() => {
    const timer = setTimeout(() => {
      // 模拟考试结果数据
      const mockResult = {
        score: 85,
        passingScore: 60,
        passed: true,
        totalQuestions: 10,
        correctQuestions: 8,
        incorrectQuestions: 2,
        duration: "01:15:32",
        categoryScores: [
          { name: "无人机法规", score: 90, total: 100 },
          { name: "飞行原理", score: 80, total: 100 },
          { name: "操作技能", score: 85, total: 100 },
          { name: "安全知识", score: 88, total: 100 },
        ],
        certificate: {
          id: "AOPA-UAS-2025-" + Math.floor(10000 + Math.random() * 90000),
          name: "无人机驾驶员AOPA模拟考试",
          date: new Date().toISOString().split("T")[0],
          validUntil: new Date(new Date().setFullYear(new Date().getFullYear() + 2)).toISOString().split("T")[0],
        },
      }

      setResult(mockResult)
      setLoading(false)
    }, 2000)

    return () => clearTimeout(timer)
  }, [])

  if (loading) {
    return (
      <div className="min-h-screen bg-background text-foreground flex flex-col">
        <div className="sticky top-0 left-0 right-0 h-14 flex items-center px-4 bg-card/80 backdrop-blur-md border-b border-border z-10">
          <Link href={`/exams/${params.id}/intro`} className="flex items-center text-muted-foreground">
            <ArrowLeft className="h-5 w-5 mr-2" />
            <span>返回</span>
          </Link>
          <h1 className="flex-1 text-center text-lg font-semibold text-foreground">考试结果</h1>
        </div>

        <div className="flex-1 flex flex-col items-center justify-center p-4">
          <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mb-4"></div>
          <p className="text-muted-foreground">正在计算考试结果...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="sticky top-0 left-0 right-0 h-14 flex items-center px-4 bg-card/80 backdrop-blur-md border-b border-border z-10">
        <Link href={`/exams/${params.id}/intro`} className="flex items-center text-muted-foreground">
          <ArrowLeft className="h-5 w-5 mr-2" />
          <span>返回</span>
        </Link>
        <h1 className="flex-1 text-center text-lg font-semibold text-foreground">考试结果</h1>
        <button className="text-muted-foreground">
          <Share2 className="h-5 w-5" />
        </button>
      </div>

      <div className="p-4 pb-24">
        {/* 成绩展示 */}
        <div className="bg-card border border-border rounded-lg p-6 mb-6 text-center">
          <div className="mb-4">
            {result.passed ? (
              <div className="w-20 h-20 rounded-full bg-green-900/30 flex items-center justify-center mx-auto">
                <CheckCircle className="h-10 w-10 text-green-500" />
              </div>
            ) : (
              <div className="w-20 h-20 rounded-full bg-red-900/30 flex items-center justify-center mx-auto">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-10 w-10 text-red-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </div>
            )}
          </div>

          <h2 className="text-2xl font-bold text-foreground mb-1">
            {result.score}
            <span className="text-muted-foreground text-lg">/100</span>
          </h2>
          <p className="text-sm text-muted-foreground mb-4">
            {result.passed ? "恭喜您通过了考试！" : "很遗憾，您未通过考试。"}
          </p>

          <div className="flex justify-between text-sm mb-2">
            <span className="text-muted-foreground">及格分数线</span>
            <span className="text-foreground">{result.passingScore}分</span>
          </div>
          <Progress value={result.score} className="h-2 mb-4" />

          <div className="grid grid-cols-2 gap-4 text-center">
            <div className="bg-muted rounded-lg p-3">
              <p className="text-muted-foreground text-xs mb-1">答题数</p>
              <p className="text-foreground font-medium">
                {result.correctQuestions + result.incorrectQuestions}/{result.totalQuestions}
              </p>
            </div>
            <div className="bg-muted rounded-lg p-3">
              <p className="text-muted-foreground text-xs mb-1">正确率</p>
              <p className="text-foreground font-medium">
                {Math.round((result.correctQuestions / result.totalQuestions) * 100)}%
              </p>
            </div>
            <div className="bg-muted rounded-lg p-3">
              <p className="text-muted-foreground text-xs mb-1">用时</p>
              <p className="text-foreground font-medium">{result.duration}</p>
            </div>
            <div className="bg-muted rounded-lg p-3">
              <p className="text-muted-foreground text-xs mb-1">排名</p>
              <p className="text-foreground font-medium">前{Math.floor(Math.random() * 20) + 10}%</p>
            </div>
          </div>
        </div>

        {/* 分类得分 */}
        <div className="bg-card border border-border rounded-lg p-4 mb-6">
          <h3 className="text-foreground font-medium mb-4">分类得分</h3>
          <div className="space-y-4">
            {result.categoryScores.map((category, index) => (
              <div key={index}>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-muted-foreground">{category.name}</span>
                  <span className="text-foreground">
                    {category.score}/{category.total}
                  </span>
                </div>
                <Progress value={(category.score / category.total) * 100} className="h-2" />
              </div>
            ))}
          </div>
        </div>

        {/* 证书信息 */}
        {result.passed && (
          <div className="bg-card border border-border rounded-lg p-4 mb-6">
            <h3 className="text-foreground font-medium mb-4">证书信息</h3>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-muted-foreground">证书编号</span>
                <span className="text-foreground">{result.certificate.id}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">证书名称</span>
                <span className="text-foreground">{result.certificate.name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">发证日期</span>
                <span className="text-foreground">{result.certificate.date}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">有效期至</span>
                <span className="text-foreground">{result.certificate.validUntil}</span>
              </div>
            </div>
          </div>
        )}

        {/* 建议 */}
        <div className="bg-blue-900/20 border border-blue-800/30 rounded-lg p-4">
          <h3 className="text-blue-400 font-medium mb-2">学习建议</h3>
          <p className="text-sm text-blue-300">
            {result.passed
              ? "恭喜您通过了无人机驾驶员AOPA模拟考试！建议您继续巩固无人机法规和飞行安全知识，多进行实际飞行练习，提高操作熟练度。您可以参加AOPA正式考试，获取无人机驾驶员执照。"
              : "建议您重点复习无人机法规和飞行原理部分，多进行模拟考试练习。可以参考我们的AOPA无人机驾驶员资格考证班课程，系统学习相关知识，提高通过率。"}
          </p>
        </div>
      </div>

      {/* 底部按钮 */}
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-card/95 backdrop-blur-md border-t border-border">
        <div className="grid grid-cols-2 gap-3">
          {result.passed && (
            <Button variant="outline" className="border-blue-500/30 text-blue-400 hover:bg-blue-500/20 bg-transparent">
              <Download className="h-4 w-4 mr-2" />
              下载证书
            </Button>
          )}
          <Button
            className={`bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 text-white ${
              !result.passed ? "col-span-2" : ""
            }`}
            onClick={() => router.push(result.passed ? "/exams/1/certificate" : `/exams/${params.id}/intro`)}
          >
            {result.passed ? "查看证书" : "重新考试"}
          </Button>
        </div>
      </div>
    </div>
  )
}
