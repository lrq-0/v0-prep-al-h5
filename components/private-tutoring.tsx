"use client"

import { useState } from "react"
import Image from "next/image"
import { ChevronLeft, ChevronRight, Grid3X3, FileText, MessageSquare, ChevronUp } from "lucide-react"

export function PrivateTutoring() {
  const [currentBanner, setCurrentBanner] = useState(0)

  // 轮播图数据 - V190版本只有一个简单的横幅
  const banners = [
    {
      id: 1,
      title: "热销课程",
      subtitle: "精品好课，限时优惠",
    },
  ]

  const nextBanner = () => {
    setCurrentBanner((prev) => (prev + 1) % banners.length)
  }

  const prevBanner = () => {
    setCurrentBanner((prev) => (prev - 1 + banners.length) % banners.length)
  }

  return (
    <div className="bg-black text-white min-h-screen">
      {/* 轮播图区域 - 蓝色背景 */}
      <div className="relative h-32 bg-blue-800 mx-4 mt-4 rounded-lg overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-between px-4">
          <button onClick={prevBanner} className="p-1">
            <ChevronLeft className="h-5 w-5 text-white" />
          </button>

          <div className="text-center">
            <h2 className="text-xl font-bold text-white mb-1">{banners[currentBanner].title}</h2>
            <p className="text-sm text-blue-100">{banners[currentBanner].subtitle}</p>
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
        <div className="bg-gray-800 rounded-lg p-4 flex flex-col items-center">
          <div className="w-12 h-12 bg-gray-700 rounded-lg flex items-center justify-center mb-2">
            <Grid3X3 className="h-6 w-6 text-blue-400" />
          </div>
          <span className="text-sm text-gray-300">课程分类</span>
        </div>

        <div className="bg-gray-800 rounded-lg p-4 flex flex-col items-center">
          <div className="w-12 h-12 bg-gray-700 rounded-lg flex items-center justify-center mb-2">
            <FileText className="h-6 w-6 text-blue-400" />
          </div>
          <span className="text-sm text-gray-300">知识库</span>
        </div>

        <div className="bg-gray-800 rounded-lg p-4 flex flex-col items-center relative">
          <div className="w-12 h-12 bg-gray-700 rounded-lg flex items-center justify-center mb-2 relative">
            <MessageSquare className="h-6 w-6 text-blue-400" />
            <div className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
              3
            </div>
          </div>
          <span className="text-sm text-gray-300">我的消息</span>
        </div>
      </div>

      {/* 直播课堂区域 */}
      <div className="px-4 mt-8">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-white flex items-center">
            <div className="w-1 h-6 bg-blue-500 rounded mr-2"></div>
            直播课堂
          </h3>
          <ChevronUp className="h-5 w-5 text-gray-400" />
        </div>

        <div className="bg-gray-800 rounded-lg overflow-hidden">
          <div className="relative h-32">
            <Image src="/english-class.png" alt="英语冲刺班" fill className="object-cover" />
            <div className="absolute top-2 left-2 bg-blue-500 text-white text-xs px-2 py-1 rounded">预告</div>
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-3">
              <h4 className="text-white font-medium">英语冲刺班</h4>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
