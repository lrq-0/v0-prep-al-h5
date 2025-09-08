import { ArrowLeft, Play, Clock, CheckCircle } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

// 课程目录页 - 已购买的课程
export default function CourseCurriculum({ params }: { params: { id: string } }) {
  // 模拟课程数据 - 实际应用中会从API获取
  const course = {
    id: params.id,
    title: "高考英语词汇精讲",
    instructor: "王老师",
    image: "/images/course-1.png",
    progress: 75,
    completedLessons: 18,
    totalLessons: 24,
    sections: [
      {
        id: 1,
        title: "基础模块",
        lessons: [
          { id: 101, title: "课程介绍与学习方法", duration: "45分钟", completed: true },
          { id: 102, title: "必考核心词汇（上）", duration: "60分钟", completed: true },
          { id: 103, title: "必考核心词汇（下）", duration: "60分钟", completed: true },
          { id: 104, title: "高频词组与固定搭配", duration: "55分钟", completed: true },
        ],
      },
      {
        id: 2,
        title: "进阶模块",
        lessons: [
          { id: 201, title: "易混词辨析", duration: "50分钟", completed: true },
          { id: 202, title: "词汇记忆技巧", duration: "45分钟", completed: false },
          { id: 203, title: "同义词与反义词", duration: "60分钟", completed: false },
          { id: 204, title: "词根与词缀", duration: "65分钟", completed: false },
        ],
      },
      {
        id: 3,
        title: "提高模块",
        lessons: [
          { id: 301, title: "阅读词汇策略", duration: "55分钟", completed: false },
          { id: 302, title: "写作词汇运用", duration: "60分钟", completed: false },
          { id: 303, title: "词汇量扩充方法", duration: "50分钟", completed: false },
          { id: 304, title: "真题词汇解析", duration: "70分钟", completed: false },
        ],
      },
    ],
  }

  // 计算已完成课时
  const totalCompleted = course.sections.reduce((acc, section) => {
    return acc + section.lessons.filter((lesson) => lesson.completed).length
  }, 0)

  // 计算总课时
  const totalLessons = course.sections.reduce((acc, section) => {
    return acc + section.lessons.length
  }, 0)

  // 计算进度百分比
  const progressPercentage = Math.round((totalCompleted / totalLessons) * 100)

  return (
    <div className="min-h-screen bg-black text-white">
      {/* 顶部导航栏 */}
      <div className="sticky top-0 left-0 right-0 h-14 flex items-center px-4 bg-gray-900/80 backdrop-blur-md border-b border-gray-800 z-10">
        <Link href="/" className="flex items-center text-gray-300">
          <ArrowLeft className="h-5 w-5 mr-2" />
          <span>返回</span>
        </Link>
        <h1 className="flex-1 text-center text-lg font-semibold text-white">课程目录</h1>
      </div>

      {/* 课程封面与进度 */}
      <div className="relative w-full h-40">
        <Image src={course.image || "/placeholder.svg"} alt={course.title} fill className="object-cover" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/90 flex flex-col justify-end p-4">
          <h1 className="text-xl font-bold text-white mb-1">{course.title}</h1>
          <p className="text-sm text-white mb-2">{course.instructor}</p>
          <div className="flex items-center">
            <div className="flex-1 h-1 bg-gray-700 rounded-full overflow-hidden">
              <div className="h-full bg-blue-500" style={{ width: `${progressPercentage}%` }}></div>
            </div>
            <span className="ml-2 text-xs text-gray-400">
              {progressPercentage}% ({totalCompleted}/{totalLessons})
            </span>
          </div>
        </div>
      </div>

      {/* 课程内容 */}
      <div className="p-4 pb-16">
        {course.sections.map((section) => (
          <div key={section.id} className="mb-6">
            <h2 className="text-lg font-semibold text-white mb-3">{section.title}</h2>
            <div className="grid gap-3">
              {section.lessons.map((lesson) => (
                <Link
                  href={`/courses/watch/${lesson.id}`}
                  key={lesson.id}
                  className="p-3 bg-gray-900 border border-gray-800 rounded-lg flex items-center"
                >
                  <div className="w-8 h-8 rounded-full flex items-center justify-center mr-3 bg-gray-800">
                    {lesson.completed ? (
                      <CheckCircle className="h-5 w-5 text-green-400" />
                    ) : (
                      <Play className="h-4 w-4 text-white" />
                    )}
                  </div>
                  <div className="flex-1">
                    <h3 className="font-medium text-white">{lesson.title}</h3>
                    <div className="flex justify-between items-center mt-1">
                      <div className="text-xs text-gray-400">
                        <Clock className="h-3 w-3 inline mr-1" />
                        {lesson.duration}
                      </div>
                      <div className="text-xs text-blue-400">{lesson.completed ? "继续学习" : "开始学习"}</div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
