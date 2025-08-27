import { ArrowLeft } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

// 考试类目详情页
export default function ExamCategoryDetail({ params }: { params: { id: string } }) {
  // 模拟考试类目数据
  const examCategory = {
    id: params.id,
    title: "高考模拟考试",
    description: "全真模拟，智能评分",
    image: "/images/exam-1.png",
    exams: [
      {
        id: 1,
        title: "2025高考英语模拟试卷(一)",
        questions: 30,
        duration: 120, // 分钟
        totalScore: 150,
        difficulty: "中等",
      },
      {
        id: 2,
        title: "2025高考数学模拟试卷(一)",
        questions: 22,
        duration: 120, // 分钟
        totalScore: 150,
        difficulty: "较难",
      },
      {
        id: 3,
        title: "2025高考语文模拟试卷(一)",
        questions: 25,
        duration: 150, // 分钟
        totalScore: 150,
        difficulty: "中等",
      },
    ],
  }

  return (
    <div className="min-h-screen bg-black text-white">
      {/* 顶部导航栏 */}
      <div className="sticky top-0 left-0 right-0 h-14 flex items-center px-4 bg-gray-900/80 backdrop-blur-md border-b border-gray-800 z-10">
        <Link href="/" className="flex items-center text-gray-300">
          <ArrowLeft className="h-5 w-5 mr-2" />
          <span>返回</span>
        </Link>
        <h1 className="flex-1 text-center text-lg font-semibold text-white">考试分类</h1>
      </div>

      {/* 类目封面 */}
      <div className="relative w-full h-40">
        <Image src={examCategory.image || "/placeholder.svg"} alt={examCategory.title} fill className="object-cover" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/90 flex flex-col justify-end p-4">
          <h1 className="text-xl font-bold text-white mb-1">{examCategory.title}</h1>
          <p className="text-sm text-gray-300">{examCategory.description}</p>
        </div>
      </div>

      {/* 考试列表 */}
      <div className="p-4 pb-16">
        <h2 className="text-lg font-semibold text-white mb-4">可用试卷</h2>
        <div className="grid gap-4">
          {examCategory.exams.map((exam) => (
            <Link href={`/exams/${exam.id}/intro`} key={exam.id}>
              <div className="p-4 bg-gray-900 border border-gray-800 rounded-lg">
                <h3 className="font-medium text-white mb-2">{exam.title}</h3>
                <div className="grid grid-cols-3 gap-2 mb-3">
                  <div className="text-center p-2 bg-gray-800 rounded-md">
                    <div className="text-sm font-medium text-blue-400">{exam.questions}</div>
                    <div className="text-xs text-gray-400">题目数</div>
                  </div>
                  <div className="text-center p-2 bg-gray-800 rounded-md">
                    <div className="text-sm font-medium text-blue-400">{exam.duration}分钟</div>
                    <div className="text-xs text-gray-400">时间</div>
                  </div>
                  <div className="text-center p-2 bg-gray-800 rounded-md">
                    <div className="text-sm font-medium text-blue-400">{exam.totalScore}分</div>
                    <div className="text-xs text-gray-400">总分</div>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <div className="text-xs text-gray-400">难度：{exam.difficulty}</div>
                  <div className="text-xs px-2 py-1 rounded-full bg-blue-900/30 text-blue-400 border border-blue-500/30">
                    查看详情
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
