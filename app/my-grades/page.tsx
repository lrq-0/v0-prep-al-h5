import { ArrowLeft } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export default function MyGrades() {
  // 模拟考试成绩数据
  const examResults = [
    {
      id: 1,
      title: "2023高考英语模拟试卷(一)",
      date: "2023-12-15",
      score: 89,
      totalScore: 100,
      duration: "120分钟",
      status: "已完成",
    },
    {
      id: 2,
      title: "数学期中测试",
      date: "2023-12-10",
      score: 92,
      totalScore: 100,
      duration: "90分钟",
      status: "已完成",
    },
    {
      id: 3,
      title: "物理能力评估",
      date: "2023-11-25",
      score: 78,
      totalScore: 100,
      duration: "60分钟",
      status: "已完成",
    },
    {
      id: 4,
      title: "化学期末考试",
      date: "2023-11-15",
      score: 85,
      totalScore: 100,
      duration: "90分钟",
      status: "已完成",
    },
    {
      id: 5,
      title: "语文阅读理解专项测试",
      date: "2023-11-05",
      score: 90,
      totalScore: 100,
      duration: "60分钟",
      status: "已完成",
    },
  ]

  // 模拟证书数据
  const certificates = [
    {
      id: 1,
      title: "英语四级证书",
      date: "2023-06-15",
      score: 562,
      level: "优秀",
      issuer: "教育部考试中心",
      image: "/images/certificate-1.png",
    },
    {
      id: 2,
      title: "数学竞赛二等奖",
      date: "2023-09-20",
      score: null,
      level: "省级",
      issuer: "省教育厅",
      image: "/images/certificate-2.png",
    },
    {
      id: 3,
      title: "计算机等级考试二级",
      date: "2023-11-05",
      score: 85,
      level: "良好",
      issuer: "教育部考试中心",
      image: "/images/certificate-3.png",
    },
  ]

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* 顶部导航栏 */}
      <div className="sticky top-0 left-0 right-0 h-14 flex items-center px-4 bg-card/80 backdrop-blur-md border-b border-border z-10">
        <Link href="/" className="flex items-center text-muted-foreground">
          <ArrowLeft className="h-5 w-5 mr-2" />
          <span>返回</span>
        </Link>
        <h1 className="flex-1 text-center text-lg font-semibold text-foreground">我的成绩</h1>
      </div>

      <div className="p-4 pb-16">
        <Tabs defaultValue="exams" className="w-full">
          <TabsList className="w-full grid grid-cols-2 bg-card border-b border-border rounded-none h-12 mb-4">
            <TabsTrigger value="exams" className="data-[state=active]:text-blue-400">
              考试成绩
            </TabsTrigger>
            <TabsTrigger value="certificates" className="data-[state=active]:text-blue-400">
              我的证书
            </TabsTrigger>
          </TabsList>

          <TabsContent value="exams">
            <div className="space-y-3">
              {examResults.map((exam) => (
                <Card key={exam.id} className="p-4 bg-card border-border">
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="font-medium text-foreground">{exam.title}</h3>
                    <div className="flex items-center">
                      <span className="text-lg font-bold text-blue-400">{exam.score}</span>
                      <span className="text-sm text-muted-foreground">/{exam.totalScore}</span>
                    </div>
                  </div>
                  <div className="flex justify-between text-xs text-muted-foreground mb-3">
                    <span>考试日期: {exam.date}</span>
                    <span>用时: {exam.duration}</span>
                  </div>
                  <div className="w-full h-2 bg-border rounded-full overflow-hidden mb-3">
                    <div
                      className="h-full bg-blue-500"
                      style={{ width: `${(exam.score / exam.totalScore) * 100}%` }}
                    ></div>
                  </div>
                  <div className="flex justify-end">
                    <Link href={`/exams/${exam.id}/result`}>
                      <Button
                        variant="outline"
                        size="sm"
                        className="border-blue-500/30 text-blue-400 hover:bg-blue-500/20 bg-transparent"
                      >
                        查看详情
                      </Button>
                    </Link>
                  </div>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="certificates">
            <div className="space-y-3">
              {certificates.map((certificate) => (
                <Card key={certificate.id} className="p-4 bg-card border-border">
                  <div className="flex">
                    <div className="relative w-16 h-16 mr-3 rounded-md overflow-hidden">
                      <Image
                        src={certificate.image || "/placeholder.svg"}
                        alt={certificate.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="font-medium text-foreground">{certificate.title}</h3>
                        <span className="text-xs px-2 py-0.5 rounded-full bg-blue-900/30 text-blue-400 border border-blue-500/30">
                          {certificate.level}
                        </span>
                      </div>
                      <div className="flex text-xs text-muted-foreground mb-2">
                        <div className="mr-4">颁发机构: {certificate.issuer}</div>
                        <div>颁发日期: {certificate.date}</div>
                      </div>
                      <div className="flex justify-between items-center">
                        {certificate.score !== null ? (
                          <div className="flex items-center">
                            <span className="font-medium text-foreground">{certificate.score}分</span>
                          </div>
                        ) : (
                          <div></div>
                        )}
                        <Link href={`/certificate/${certificate.id}`}>
                          <Button
                            variant="outline"
                            size="sm"
                            className="border-blue-500/30 text-blue-400 hover:bg-blue-500/20 bg-transparent"
                          >
                            查看证书
                          </Button>
                        </Link>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
