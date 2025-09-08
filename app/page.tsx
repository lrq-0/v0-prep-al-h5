"use client"

import { MyProfile } from "@/components/my-profile"
import { PrivateTutoring } from "@/components/private-tutoring"
import { Exams } from "@/components/exams"
import { AiAssistant } from "@/components/ai-assistant"
import { AiMarket } from "@/components/ai-market"
import { useState, useEffect } from "react"
import { BookOpen, FileText, MessageSquare, ShoppingBag, User } from "lucide-react"
import { useSearchParams } from "next/navigation"

export default function Home() {
  const searchParams = useSearchParams()
  const tabFromUrl = searchParams.get("tab")
  const sectionFromUrl = searchParams.get("section")
  const [activeTab, setActiveTab] = useState(tabFromUrl || "courses")

  console.log("[v0] Main page - Full URL:", window.location.href)
  console.log("[v0] Main page - Search params string:", window.location.search)
  console.log("[v0] Main page - All search params:", Array.from(searchParams.entries()))
  console.log("[v0] Main page - tabFromUrl:", tabFromUrl)
  console.log("[v0] Main page - sectionFromUrl:", sectionFromUrl)
  console.log("[v0] Main page - activeTab:", activeTab)

  useEffect(() => {
    if (tabFromUrl) {
      setActiveTab(tabFromUrl)
    }
  }, [tabFromUrl])

  const tabs = [
    { id: "courses", label: "好课", icon: BookOpen, component: <PrivateTutoring /> },
    {
      id: "exams",
      label: "考测",
      icon: FileText,
      component:
        (activeTab === "exams" || tabFromUrl === "exams") && sectionFromUrl ? (
          <Exams initialSection={sectionFromUrl} />
        ) : (
          <Exams />
        ),
    },
    {
      id: "ai-assistant",
      label: "AI助手",
      icon: MessageSquare,
      component:
        (activeTab === "ai-assistant" || tabFromUrl === "ai-assistant") && sectionFromUrl ? (
          <AiAssistant initialSection={sectionFromUrl} />
        ) : (
          <AiAssistant />
        ),
    },
    {
      id: "ai-market",
      label: "AI市场",
      icon: ShoppingBag,
      component:
        (activeTab === "ai-market" || tabFromUrl === "ai-market") && sectionFromUrl ? (
          <AiMarket initialSection={sectionFromUrl} />
        ) : (
          <AiMarket />
        ),
    },
    { id: "profile", label: "我的", icon: User, component: <MyProfile /> },
  ]

  return (
    <div className="min-h-screen bg-white dark:bg-black transition-colors">
      {/* 顶部标题栏 */}
      <header className="fixed top-0 left-0 right-0 h-14 flex items-center justify-center bg-gray-100 dark:bg-gray-900 shadow-sm border-b border-gray-200 dark:border-gray-800 z-10 transition-colors">
        <h1 className="text-lg font-semibold text-blue-600 dark:text-blue-400">Prep AI</h1>
      </header>

      {/* 主要内容区域 */}
      <main className="pt-14 pb-16">{tabs.find((tab) => tab.id === activeTab)?.component}</main>

      {/* 底部导航栏 */}
      <nav className="fixed bottom-0 left-0 right-0 bg-gray-100 dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 px-4 py-2 transition-colors">
        <div className="flex justify-around">
          {tabs.map((tab) => {
            const IconComponent = tab.icon
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex flex-col items-center py-1 px-2 rounded-lg transition-colors ${
                  activeTab === tab.id ? "text-blue-600 dark:text-blue-500" : "text-gray-600 dark:text-gray-500"
                }`}
              >
                <IconComponent className="h-5 w-5 mb-1" />
                <span className="text-xs font-medium">{tab.label}</span>
              </button>
            )
          })}
        </div>
      </nav>
    </div>
  )
}
