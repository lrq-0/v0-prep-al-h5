import { ArrowLeft, ChevronRight } from "lucide-react"
import Link from "next/link"
import { Card } from "@/components/ui/card"
import {
  DrillIcon as Drone,
  Plane,
  Wrench,
  Shield,
  Cloud,
  Cpu,
  Compass,
  Radio,
  Clipboard,
  Leaf,
  Users,
} from "lucide-react"

// 课程分类页面
export default function CourseCategories() {
  // 低空经济相关课程分类数据
  const categories = [
    {
      id: 1,
      name: "无人机技术与应用",
      icon: <Drone className="h-5 w-5 text-red-400" />,
      count: 24,
      color: "bg-red-400/20 text-red-400",
    },
    {
      id: 2,
      name: "低空飞行器研发与制造",
      icon: <Wrench className="h-5 w-5 text-blue-400" />,
      count: 18,
      color: "bg-blue-400/20 text-blue-400",
    },
    {
      id: 3,
      name: "空中交通管理与调度",
      icon: <Cloud className="h-5 w-5 text-green-400" />,
      count: 15,
      color: "bg-green-400/20 text-green-400",
    },
    {
      id: 4,
      name: "低空经济商业模式",
      icon: <Shield className="h-5 w-5 text-purple-400" />,
      count: 12,
      color: "bg-purple-400/20 text-purple-400",
    },
    {
      id: 5,
      name: "低空应急救援与安全",
      icon: <Plane className="h-5 w-5 text-yellow-400" />,
      count: 16,
      color: "bg-yellow-400/20 text-yellow-400",
    },
    {
      id: 6,
      name: "低空旅游与观光服务",
      icon: <Cpu className="h-5 w-5 text-teal-400" />,
      count: 14,
      color: "bg-teal-400/20 text-teal-400",
    },
    {
      id: 7,
      name: "低空物流与配送系统",
      icon: <Compass className="h-5 w-5 text-orange-400" />,
      count: 10,
      color: "bg-orange-400/20 text-orange-400",
    },
    {
      id: 8,
      name: "低空监管与政策法规",
      icon: <Radio className="h-5 w-5 text-cyan-400" />,
      count: 8,
      color: "bg-cyan-400/20 text-cyan-400",
    },
    {
      id: 9,
      name: "低空运营",
      icon: <Clipboard className="h-5 w-5 text-pink-400" />,
      count: 20,
      color: "bg-pink-400/20 text-pink-400",
    },
    {
      id: 10,
      name: "航空气象",
      icon: <Cloud className="h-5 w-5 text-indigo-400" />,
      count: 6,
      color: "bg-indigo-400/20 text-indigo-400",
    },
    {
      id: 11,
      name: "低空生态",
      icon: <Leaf className="h-5 w-5 text-emerald-400" />,
      count: 9,
      color: "bg-emerald-400/20 text-emerald-400",
    },
    {
      id: 12,
      name: "行业管理",
      icon: <Users className="h-5 w-5 text-blue-400" />,
      count: 11,
      color: "bg-blue-400/20 text-blue-400",
    },
  ]

  return (
    <div className="min-h-screen bg-black text-white">
      {/* 顶部导航栏 */}
      <div className="sticky top-0 left-0 right-0 h-14 flex items-center px-4 bg-gray-900/80 backdrop-blur-md border-b border-gray-800 z-10">
        <Link href="/" className="flex items-center text-gray-300">
          <ArrowLeft className="h-5 w-5 mr-2" />
          <span>返回</span>
        </Link>
        <h1 className="flex-1 text-center text-lg font-semibold text-white">课程分类</h1>
      </div>

      <div className="p-4 pb-16">
        <div className="grid gap-4">
          {categories.map((category) => (
            <Link href={`/courses/categories/${category.id}`} key={category.id}>
              <Card className="p-4 bg-gray-900 border-gray-800 flex justify-between items-center">
                <div className="flex items-center">
                  <div
                    className={`w-10 h-10 rounded-lg ${category.color.split(" ")[0]} flex items-center justify-center mr-3`}
                  >
                    {category.icon}
                  </div>
                  <div>
                    <h3 className="font-medium text-white">{category.name}</h3>
                    <p className="text-xs text-gray-400">{category.count}门课程</p>
                  </div>
                </div>
                <ChevronRight className="h-5 w-5 text-gray-400" />
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
