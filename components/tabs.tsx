"use client"

import { useState } from "react"
import { Tabs as UITabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export function Tabs() {
  const [activeTab, setActiveTab] = useState("recorded")

  return (
    <UITabs defaultValue="recorded" value={activeTab} onValueChange={setActiveTab} className="w-full">
      <TabsList className="w-full grid grid-cols-2 bg-gray-900 border-b border-gray-800 rounded-none h-12">
        <TabsTrigger value="recorded" className="data-[state=active]:text-blue-400">
          录播课程
        </TabsTrigger>
        <TabsTrigger value="live" className="data-[state=active]:text-blue-400">
          直播课程
        </TabsTrigger>
      </TabsList>

      <TabsContent value="recorded" className="p-4 pb-16">
        <div className="grid gap-4">
          <div className="p-4 bg-gray-800 rounded-lg">
            <h3 className="text-white font-medium mb-2">录播课程内容</h3>
            <p className="text-gray-300">录播课程列表将显示在这里</p>
          </div>
        </div>
      </TabsContent>

      <TabsContent value="live" className="p-4 pb-16">
        <div className="grid gap-4">
          <div className="p-4 bg-gray-800 rounded-lg">
            <h3 className="text-white font-medium mb-2">直播课程内容</h3>
            <p className="text-gray-300">直播课程列表将显示在这里</p>
          </div>
        </div>
      </TabsContent>
    </UITabs>
  )
}
