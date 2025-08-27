"use client"

import { MyProfile } from "@/components/my-profile"
import { PrivateTutoring } from "@/components/private-tutoring"
import { Exams } from "@/components/exams"
import { AiAssistant } from "@/components/ai-assistant"
import { AiMarket } from "@/components/ai-market"
import { useState } from "react"

export default function Home() {
  const [activeTab, setActiveTab] = useState("courses")

  const tabs = [
    { id: "courses", label: "好课", component: <PrivateTutoring /> },
    { id: "exams", label: "考测", component: <Exams /> },
    { id: "ai-assistant", label: "AI助手", component: <AiAssistant /> },
    { id: "ai-market", label: "AI市场", component: <AiMarket /> },
    { id: "profile", label: "我的", component: <MyProfile /> },
  ]

  return (
    <div className="min-h-screen bg-black">
      {/* 顶部标题栏 */}
      <header className="fixed top-0 left-0 right-0 h-14 flex items-center justify-center bg-gray-900 shadow-sm border-b border-gray-800 z-10">
        <h1 className="text-lg font-semibold text-blue-400">Prep AI</h1>
      </header>

      {/* 主要内容区域 */}
      <main className="pt-14 pb-16">{tabs.find((tab) => tab.id === activeTab)?.component}</main>

      {/* 底部导航栏 */}
      <nav className="fixed bottom-0 left-0 right-0 bg-gray-900 border-t border-gray-800 px-4 py-2">
        <div className="flex justify-around">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex flex-col items-center py-1 px-2 rounded-lg transition-colors ${
                activeTab === tab.id ? "text-blue-500" : "text-gray-500"
              }`}
            >
              <span className="text-sm font-medium">{tab.label}</span>
            </button>
          ))}
        </div>
      </nav>
    </div>
  )
}
