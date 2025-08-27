"use client"

import { useState } from "react"
import { ArrowLeft, Save, Check, AlertTriangle } from "lucide-react"
import Link from "next/link"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function CustomCssSettings() {
  // 表单状态
  const [customCss, setCustomCss] = useState(`/* 自定义CSS样式 */
/* 修改按钮悬停效果 */
.button:hover {
  transform: translateY(-2px);
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
}

/* 自定义滚动条 */
::-webkit-scrollbar {
  width: 8px;
}

::-webkit-scrollbar-track {
  background: #1f2937;
}

::-webkit-scrollbar-thumb {
  background: #3b82f6;
  border-radius: 4px;
}

::-webkit-scrollbar-thumb:hover {
  background: #2563eb;
}`)

  const [customJs, setCustomJs] = useState(`// 自定义JavaScript
// 在页面加载完成后执行
document.addEventListener('DOMContentLoaded', function() {
  console.log('自定义JS已加载');
  
  // 示例：为所有卡片添加点击动画
  const cards = document.querySelectorAll('.card');
  cards.forEach(card => {
    card.addEventListener('click', function() {
      this.style.transform = 'scale(0.98)';
      setTimeout(() => {
        this.style.transform = 'scale(1)';
      }, 200);
    });
  });
});`)

  const [isSaving, setIsSaving] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)

  // 保存配置
  const saveConfiguration = () => {
    setIsSaving(true)

    // 模拟API请求
    setTimeout(() => {
      setIsSaving(false)
      setShowSuccess(true)

      // 3秒后隐藏成功提示
      setTimeout(() => {
        setShowSuccess(false)
      }, 3000)
    }, 1500)
  }

  return (
    <div className="min-h-screen bg-black text-white">
      {/* 顶部导航栏 */}
      <div className="sticky top-0 left-0 right-0 h-14 flex items-center px-4 bg-gray-900/80 backdrop-blur-md border-b border-gray-800 z-10">
        <Link href="/management/system" className="flex items-center text-gray-300">
          <ArrowLeft className="h-5 w-5 mr-2" />
          <span>返回</span>
        </Link>
        <h1 className="flex-1 text-center text-lg font-semibold text-white">自定义代码</h1>
      </div>

      {/* 成功提示 */}
      {showSuccess && (
        <div className="fixed top-16 left-4 right-4 z-50">
          <Alert className="bg-green-900/60 border-green-500 backdrop-blur-sm">
            <Check className="h-4 w-4 text-green-400 mr-2" />
            <AlertDescription className="text-green-400">自定义代码已成功保存</AlertDescription>
          </Alert>
        </div>
      )}

      <div className="p-4 pb-24">
        {/* 警告提示 */}
        <Alert className="bg-yellow-900/30 border-yellow-500/30 mb-6">
          <AlertTriangle className="h-4 w-4 text-yellow-400 mr-2" />
          <AlertDescription className="text-yellow-400">
            注意：不当的自定义代码可能会影响网站功能和性能。请确保您了解所添加代码的作用。
          </AlertDescription>
        </Alert>

        <Tabs defaultValue="css" className="w-full">
          <TabsList className="w-full grid grid-cols-2 bg-gray-900 border-b border-gray-800 rounded-none h-12 mb-4">
            <TabsTrigger value="css" className="data-[state=active]:text-blue-400">
              自定义CSS
            </TabsTrigger>
            <TabsTrigger value="js" className="data-[state=active]:text-blue-400">
              自定义JavaScript
            </TabsTrigger>
          </TabsList>

          <TabsContent value="css">
            <Card className="p-4 bg-gray-900 border-gray-800 mb-6">
              <h2 className="text-lg font-semibold text-white mb-4">自定义CSS样式</h2>
              <p className="text-sm text-gray-400 mb-4">
                添加自定义CSS样式来定制网站的外观。这些样式将应用于整个网站。
              </p>

              <div className="relative">
                <textarea
                  value={customCss}
                  onChange={(e) => setCustomCss(e.target.value)}
                  className="w-full min-h-[400px] p-4 bg-gray-800 border border-gray-700 rounded-md text-gray-300 font-mono text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                  spellCheck="false"
                />
                <div className="absolute top-2 right-2 text-xs text-gray-500 px-2 py-1 bg-gray-900 rounded">CSS</div>
              </div>
              <p className="text-xs text-gray-500 mt-2">提示：请确保CSS语法正确，否则可能导致样式不生效</p>
            </Card>
          </TabsContent>

          <TabsContent value="js">
            <Card className="p-4 bg-gray-900 border-gray-800 mb-6">
              <h2 className="text-lg font-semibold text-white mb-4">自定义JavaScript</h2>
              <p className="text-sm text-gray-400 mb-4">
                添加自定义JavaScript代码来增强网站的交互功能。这些脚本将在页面加载后执行。
              </p>

              <div className="relative">
                <textarea
                  value={customJs}
                  onChange={(e) => setCustomJs(e.target.value)}
                  className="w-full min-h-[400px] p-4 bg-gray-800 border border-gray-700 rounded-md text-gray-300 font-mono text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                  spellCheck="false"
                />
                <div className="absolute top-2 right-2 text-xs text-gray-500 px-2 py-1 bg-gray-900 rounded">
                  JavaScript
                </div>
              </div>
              <p className="text-xs text-gray-500 mt-2">
                注意：请谨慎添加JavaScript代码，错误的代码可能导致网站功能异常
              </p>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      {/* 底部保存按钮 */}
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-gray-900/95 backdrop-blur-md border-t border-gray-800">
        <Button
          className="w-full bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400"
          onClick={saveConfiguration}
          disabled={isSaving}
        >
          <Save className="h-4 w-4 mr-2" />
          {isSaving ? "保存中..." : "保存自定义代码"}
        </Button>
      </div>
    </div>
  )
}
