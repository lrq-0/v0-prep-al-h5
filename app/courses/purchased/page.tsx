import { ArrowLeft } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { Card } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Clock } from "lucide-react"

// 已购课程页面
export default function PurchasedCourses() {
  // 模拟已购课程数据
  const recordedCourses = [
    {
      id: 1,
      title: "高考英语词汇精讲",
      instructor: "王老师",
      progress: 75,
      completedLessons: 18,
      totalLessons: 24,
      image: "/images/course-1.png",
    },
    {
      id: 2,
      title: "数学解题技巧与方法",
      instructor: "李老师",
      progress: 40,
      completedLessons: 7,
      totalLessons: 18,
      image: "/images/course-2.png",
    },
    {
      id: 3,
      title: "物理实验与解析",
      instructor: "张老师",
      progress: 20,
      completedLessons: 3,
      totalLessons: 16,
      image: "/images/course-3.png",
    },
  ]

  const liveCourses = [
    {
      id: 1,
      title: "高考英语冲刺班",
      instructor: "王老师",
      nextLive: "今天 19:30",
      lastCompleted: "2025-04-20",
      completedSessions: 4,
      totalSessions: 8,
      image: "/images/course-1.png",
    },
    {
      id: 2,
      title: "物理实验专题",
      instructor: "张老师",
      nextLive: "明天 21:00",
      lastCompleted: "2025-04-22",
      completedSessions: 2,
      totalSessions: 6,
      image: "/images/course-3.png",
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
        <h1 className="flex-1 text-center text-lg font-semibold text-foreground">已购课程</h1>
      </div>

      <Tabs defaultValue="recorded" className="w-full">
        <TabsList className="w-full grid grid-cols-2 bg-card border-b border-border rounded-none h-12">
          <TabsTrigger value="recorded" className="data-[state=active]:text-blue-400">
            录播课程
          </TabsTrigger>
          <TabsTrigger value="live" className="data-[state=active]:text-blue-400">
            直播课程
          </TabsTrigger>
        </TabsList>

        <TabsContent value="recorded" className="p-4 pb-16">
          <div className="grid gap-4">
            {recordedCourses.map((course) => (
              <Link href={`/courses/curriculum/${course.id}`} key={course.id}>
                <Card className="overflow-hidden bg-card border-border">
                  <div className="flex">
                    <div className="relative w-24 h-20">
                      <Image
                        src={course.image || "/placeholder.svg"}
                        alt={course.title}
                        fill
                        className="object-cover"
                      />
                      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gray-700">
                        <div className="h-full bg-green-500" style={{ width: `${course.progress}%` }}></div>
                      </div>
                    </div>
                    <div className="p-3 flex-1">
                      <h3 className="font-medium text-foreground mb-1 line-clamp-1">{course.title}</h3>
                      <p className="text-xs text-muted-foreground mb-2">{course.instructor}</p>
                      <div className="flex justify-between items-center">
                        <div className="text-xs text-muted-foreground">
                          已学习 {course.completedLessons}/{course.totalLessons} 课时
                        </div>
                        <div className="text-xs px-2 py-0.5 rounded-full bg-blue-900/30 text-blue-400 border border-blue-500/30">
                          {course.progress}%
                        </div>
                      </div>
                    </div>
                  </div>
                </Card>
              </Link>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="live" className="p-4 pb-16">
          <div className="grid gap-4">
            {liveCourses.map((course) => (
              <Link href={`/courses/curriculum/${course.id}`} key={course.id}>
                <Card className="overflow-hidden bg-card border-border">
                  <div className="flex">
                    <div className="relative w-24 h-20">
                      <Image
                        src={course.image || "/placeholder.svg"}
                        alt={course.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="p-3 flex-1">
                      <h3 className="font-medium text-foreground mb-1 line-clamp-1">{course.title}</h3>
                      <p className="text-xs text-muted-foreground mb-1">{course.instructor}</p>
                      <div className="text-xs text-blue-400 mb-1">
                        <Clock className="h-3 w-3 inline mr-1" />
                        下一节课：{course.nextLive}
                      </div>
                      <div className="flex justify-between items-center">
                        <div className="text-xs text-muted-foreground">
                          已完成 {course.completedSessions}/{course.totalSessions} 节
                        </div>
                      </div>
                    </div>
                  </div>
                </Card>
              </Link>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
