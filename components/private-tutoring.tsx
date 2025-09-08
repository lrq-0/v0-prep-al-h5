"use client"

import { useState } from "react"
import Image from "next/image"
import { ChevronLeft, ChevronRight, Grid3X3, FileText, MessageSquare, Shuffle } from "lucide-react"

export function PrivateTutoring() {
  const [currentBanner, setCurrentBanner] = useState(0)
  const [currentCourseSet, setCurrentCourseSet] = useState(0)

  // 轮播图数据 - V190版本只有一个简单的横幅
  const banners = [
    {
      id: 1,
      title: "热销课程",
      subtitle: "精品好课，限时优惠",
    },
  ]

  const courseSets = [
    [
      { name: "英语冲刺班", image: "/english-class.png", status: "预告", statusColor: "bg-blue-500" },
      { name: "数学提高班", image: "/math-class.jpg", status: "直播中", statusColor: "bg-green-500" },
      { name: "物理实验课", image: "/physics-class.jpg", status: "回放", statusColor: "bg-red-500" },
      { name: "化学基础课", image: "/chemistry-class.jpg", status: "预告", statusColor: "bg-blue-500" },
      { name: "历史专题课", image: "/history-class.jpg", status: "直播中", statusColor: "bg-green-500" },
      { name: "生物实验课", image: "/biology-class.jpg", status: "回放", statusColor: "bg-red-500" },
      { name: "地理探索课", image: "/geography-class.jpg", status: "预告", statusColor: "bg-blue-500" },
      { name: "美术创作课", image: "/art-class.jpg", status: "直播中", statusColor: "bg-green-500" },
      { name: "音乐欣赏课", image: "/music-class.jpg", status: "回放", statusColor: "bg-red-500" },
    ],
    [
      { name: "编程入门课", image: "/programming-class.jpg", status: "预告", statusColor: "bg-blue-500" },
      { name: "写作技巧课", image: "/writing-class.jpg", status: "直播中", statusColor: "bg-green-500" },
      { name: "心理学基础", image: "/psychology-class.jpg", status: "回放", statusColor: "bg-red-500" },
      { name: "经济学原理", image: "/economics-class.jpg", status: "预告", statusColor: "bg-blue-500" },
      { name: "法律常识课", image: "/law-class.jpg", status: "直播中", statusColor: "bg-green-500" },
      { name: "健康养生课", image: "/health-class.jpg", status: "回放", statusColor: "bg-red-500" },
      { name: "摄影技巧课", image: "/photography-class.jpg", status: "预告", statusColor: "bg-blue-500" },
      { name: "烹饪基础课", image: "/cooking-class.jpg", status: "直播中", statusColor: "bg-green-500" },
      { name: "园艺种植课", image: "/gardening-class.jpg", status: "回放", statusColor: "bg-red-500" },
    ],
    [
      { name: "瑜伽健身课", image: "/yoga-class.jpg", status: "预告", statusColor: "bg-blue-500" },
      { name: "投资理财课", image: "/finance-class.jpg", status: "直播中", statusColor: "bg-green-500" },
      { name: "外语口语课", image: "/language-class.jpg", status: "回放", statusColor: "bg-red-500" },
      { name: "手工制作课", image: "/craft-class.jpg", status: "预告", statusColor: "bg-blue-500" },
      { name: "舞蹈基础课", image: "/dance-class.jpg", status: "直播中", statusColor: "bg-green-500" },
      { name: "书法练习课", image: "/calligraphy-class.jpg", status: "回放", statusColor: "bg-red-500" },
      { name: "茶艺文化课", image: "/tea-class.jpg", status: "预告", statusColor: "bg-blue-500" },
      { name: "宠物护理课", image: "/pet-class.jpg", status: "直播中", statusColor: "bg-green-500" },
      { name: "旅游规划课", image: "/travel-class.jpg", status: "回放", statusColor: "bg-red-500" },
    ],
  ]

  const nextBanner = () => {
    setCurrentBanner((prev) => (prev + 1) % banners.length)
  }

  const prevBanner = () => {
    setCurrentBanner((prev) => (prev - 1 + banners.length) % banners.length)
  }

  const switchCourseSet = () => {
    setCurrentCourseSet((prev) => (prev + 1) % courseSets.length)
  }

  const currentCourses = courseSets[currentCourseSet]

  return (
    <div className="bg-background text-foreground min-h-screen">
      {/* 轮播图区域 - 蓝色背景 */}
      <div className="relative h-48 bg-blue-800 mx-4 mt-4 rounded-lg overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-between px-4">
          <button onClick={prevBanner} className="p-1">
            <ChevronLeft className="h-5 w-5 text-white" />
          </button>

          <div className="text-center">
            <h2 className="text-2xl font-bold text-white mb-1">{banners[currentBanner].title}</h2>
            <p className="text-base text-blue-100">{banners[currentBanner].subtitle}</p>
          </div>

          <button onClick={nextBanner} className="p-1">
            <ChevronRight className="h-5 w-5 text-white" />
          </button>
        </div>

        {/* 轮播指示器 */}
        <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex space-x-1">
          {banners.map((_, index) => (
            <div
              key={index}
              className={`w-1.5 h-1.5 rounded-full ${index === currentBanner ? "bg-white" : "bg-white/50"}`}
            />
          ))}
        </div>
      </div>

      {/* 快捷操作区域 - 三个按钮 */}
      <div className="grid grid-cols-3 gap-4 px-4 mt-6">
        <div className="bg-card rounded-lg p-4 flex flex-col items-center border">
          <div className="w-12 h-12 bg-muted rounded-lg flex items-center justify-center mb-2">
            <Grid3X3 className="h-6 w-6 text-blue-400" />
          </div>
          <span className="text-sm text-muted-foreground">课程分类</span>
        </div>

        <div className="bg-card rounded-lg p-4 flex flex-col items-center border">
          <div className="w-12 h-12 bg-muted rounded-lg flex items-center justify-center mb-2">
            <FileText className="h-6 w-6 text-blue-400" />
          </div>
          <span className="text-sm text-muted-foreground">知识库</span>
        </div>

        <div className="bg-card rounded-lg p-4 flex flex-col items-center relative border">
          <div className="w-12 h-12 bg-muted rounded-lg flex items-center justify-center mb-2 relative">
            <MessageSquare className="h-6 w-6 text-blue-400" />
            <div className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
              3
            </div>
          </div>
          <span className="text-sm text-muted-foreground">我的消息</span>
        </div>
      </div>

      {/* 直播课堂区域 */}
      <div className="px-4 mt-8">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-foreground flex items-center">
            <div className="w-1 h-6 bg-blue-500 rounded mr-2"></div>
            直播课堂
          </h3>
          <button onClick={switchCourseSet} className="p-1 hover:bg-muted rounded">
            <Shuffle className="h-5 w-5 text-muted-foreground hover:text-foreground transition-colors" />
          </button>
        </div>

        <div className="grid grid-cols-3 gap-3 mb-3">
          {currentCourses.slice(0, 3).map((course, index) => (
            <div key={index} className="bg-card rounded-lg overflow-hidden border">
              <div className="relative h-24">
                <Image src={course.image || "/placeholder.svg"} alt={course.name} fill className="object-cover" />
                <div
                  className={`absolute top-1 left-1 ${course.statusColor} text-white text-[10px] px-1.5 py-0.5 rounded font-medium`}
                >
                  {course.status}
                </div>
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/95 via-black/80 to-transparent p-2">
                  <h4 className="text-white font-semibold text-xs drop-shadow-md">{course.name}</h4>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-3 gap-3 mb-3">
          {currentCourses.slice(3, 6).map((course, index) => (
            <div key={index + 3} className="bg-card rounded-lg overflow-hidden border">
              <div className="relative h-24">
                <Image src={course.image || "/placeholder.svg"} alt={course.name} fill className="object-cover" />
                <div
                  className={`absolute top-1 left-1 ${course.statusColor} text-white text-[10px] px-1.5 py-0.5 rounded font-medium`}
                >
                  {course.status}
                </div>
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/95 via-black/80 to-transparent p-2">
                  <h4 className="text-white font-semibold text-xs drop-shadow-md">{course.name}</h4>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-3 gap-3">
          {currentCourses.slice(6, 9).map((course, index) => (
            <div key={index + 6} className="bg-card rounded-lg overflow-hidden border">
              <div className="relative h-24">
                <Image src={course.image || "/placeholder.svg"} alt={course.name} fill className="object-cover" />
                <div
                  className={`absolute top-1 left-1 ${course.statusColor} text-white text-[10px] px-1.5 py-0.5 rounded font-medium`}
                >
                  {course.status}
                </div>
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/95 via-black/80 to-transparent p-2">
                  <h4 className="text-white font-semibold text-xs drop-shadow-md">{course.name}</h4>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
