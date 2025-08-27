"use client"

import { useState } from "react"
import { ArrowLeft, Info, Check, Save } from "lucide-react"
import Link from "next/link"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"

export default function BasicConfiguration() {
  // 颜色主题选项
  const colorThemes = [
    { id: "blue", name: "蓝色主题", primary: "#60a5fa", secondary: "#3b82f6" },
    { id: "green", name: "绿色主题", primary: "#4ade80", secondary: "#22c55e" },
    { id: "purple", name: "紫色主题", primary: "#a78bfa", secondary: "#8b5cf6" },
    { id: "red", name: "红色主题", primary: "#f87171", secondary: "#ef4444" },
    { id: "amber", name: "琥珀主题", primary: "#fbbf24", secondary: "#f59e0b" },
    { id: "custom", name: "自定义", primary: "", secondary: "" },
  ]

  // 表单状态
  const [selectedTheme, setSelectedTheme] = useState("blue")
  const [customPrimary, setCustomPrimary] = useState("#60a5fa")
  const [customSecondary, setCustomSecondary] = useState("#3b82f6")
  const [brandName, setBrandName] = useState("Prep AI")
  const [siteDesc, setSiteDesc] = useState("AI驱动的智能学习平台")
  const [isSaving, setIsSaving] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)

  // 处理主题选择
  const handleThemeChange = (value: string) => {
    setSelectedTheme(value)
    if (value !== "custom") {
      const theme = colorThemes.find((t) => t.id === value)
      if (theme) {
        setCustomPrimary(theme.primary)
        setCustomSecondary(theme.secondary)
      }
    }
  }

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
        <h1 className="flex-1 text-center text-lg font-semibold text-white">基础设置</h1>
      </div>

      {/* 成功提示 */}
      {showSuccess && (
        <div className="fixed top-16 left-4 right-4 z-50">
          <Alert className="bg-green-900/60 border-green-500 backdrop-blur-sm">
            <Check className="h-4 w-4 text-green-400 mr-2" />
            <AlertDescription className="text-green-400">配置已成功保存</AlertDescription>
          </Alert>
        </div>
      )}

      <div className="p-4 pb-24">
        <Tabs defaultValue="appearance" className="w-full">
          <TabsList className="w-full grid grid-cols-2 bg-gray-900 border-b border-gray-800 rounded-none h-12 mb-4">
            <TabsTrigger value="appearance" className="data-[state=active]:text-blue-400">
              皮肤与品牌
            </TabsTrigger>
            <TabsTrigger value="seo" className="data-[state=active]:text-blue-400">
              SEO设置
            </TabsTrigger>
          </TabsList>

          <TabsContent value="appearance">
            {/* 皮肤颜色 */}
            <Card className="p-4 bg-gray-900 border-gray-800 mb-6">
              <h2 className="text-lg font-semibold text-white mb-4">皮肤颜色</h2>
              <RadioGroup value={selectedTheme} onValueChange={handleThemeChange} className="space-y-3">
                {colorThemes.map((theme) => (
                  <div key={theme.id} className="flex items-center space-x-2">
                    <RadioGroupItem value={theme.id} id={`theme-${theme.id}`} />
                    <Label htmlFor={`theme-${theme.id}`} className="flex items-center cursor-pointer">
                      {theme.id !== "custom" && (
                        <div className="flex mr-2">
                          <div className="w-6 h-6 rounded-l-md" style={{ backgroundColor: theme.primary }}></div>
                          <div className="w-6 h-6 rounded-r-md" style={{ backgroundColor: theme.secondary }}></div>
                        </div>
                      )}
                      <span>{theme.name}</span>
                    </Label>
                  </div>
                ))}
              </RadioGroup>

              {selectedTheme === "custom" && (
                <div className="mt-4 space-y-4">
                  <div>
                    <Label htmlFor="primary-color" className="text-white mb-2 block">
                      主要颜色
                    </Label>
                    <div className="flex items-center">
                      <Input
                        id="primary-color"
                        type="color"
                        value={customPrimary}
                        onChange={(e) => setCustomPrimary(e.target.value)}
                        className="w-12 h-10 p-1 bg-transparent border-gray-700"
                      />
                      <Input
                        type="text"
                        value={customPrimary}
                        onChange={(e) => setCustomPrimary(e.target.value)}
                        className="ml-2 bg-gray-800 border-gray-700 text-white"
                      />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="secondary-color" className="text-white mb-2 block">
                      次要颜色
                    </Label>
                    <div className="flex items-center">
                      <Input
                        id="secondary-color"
                        type="color"
                        value={customSecondary}
                        onChange={(e) => setCustomSecondary(e.target.value)}
                        className="w-12 h-10 p-1 bg-transparent border-gray-700"
                      />
                      <Input
                        type="text"
                        value={customSecondary}
                        onChange={(e) => setCustomSecondary(e.target.value)}
                        className="ml-2 bg-gray-800 border-gray-700 text-white"
                      />
                    </div>
                  </div>
                </div>
              )}
            </Card>

            {/* 网站品牌 */}
            <Card className="p-4 bg-gray-900 border-gray-800 mb-6">
              <div className="flex items-center mb-4">
                <h2 className="text-lg font-semibold text-white">网站品牌</h2>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger>
                      <Info className="h-4 w-4 text-gray-400 ml-2" />
                    </TooltipTrigger>
                    <TooltipContent className="bg-gray-800 text-white border-gray-700">
                      <p className="text-xs max-w-[200px]">设置您的品牌名称，将替代Prep AI在网站的显示位置</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="brand-name" className="text-white mb-2 block">
                    品牌名称
                  </Label>
                  <Input
                    id="brand-name"
                    value={brandName}
                    onChange={(e) => setBrandName(e.target.value)}
                    placeholder="输入您的品牌名称"
                    className="bg-gray-800 border-gray-700 text-white"
                  />
                </div>
                <div>
                  <Label htmlFor="brand-desc" className="text-white mb-2 block">
                    品牌简介
                  </Label>
                  <Input
                    id="brand-desc"
                    value={siteDesc}
                    onChange={(e) => setSiteDesc(e.target.value)}
                    placeholder="输入品牌简短介绍"
                    className="bg-gray-800 border-gray-700 text-white"
                  />
                </div>
              </div>
            </Card>

            {/* 系统Logo */}
            <Card className="p-4 bg-gray-900 border-gray-800 mb-6">
              <div className="flex items-center mb-4">
                <h2 className="text-lg font-semibold text-white">系统Logo</h2>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger>
                      <Info className="h-4 w-4 text-gray-400 ml-2" />
                    </TooltipTrigger>
                    <TooltipContent className="bg-gray-800 text-white border-gray-700">
                      <p className="text-xs max-w-[200px]">上传您的品牌Logo，建议使用透明背景的PNG图片</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
              <div className="flex items-center space-x-4">
                <div className="w-20 h-20 bg-gray-800 border-2 border-dashed border-gray-600 rounded-lg flex items-center justify-center">
                  <Button variant="outline" className="border-blue-500/30 text-blue-400 hover:bg-blue-500/20">
                    上传Logo
                  </Button>
                </div>
                <div>
                  <p className="text-sm text-gray-400 mb-1">建议尺寸: 180x180px</p>
                  <p className="text-xs text-gray-500">支持PNG、JPG格式，大小不超过2MB</p>
                </div>
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="seo">
            {/* SEO设置 */}
            <Card className="p-4 bg-gray-900 border-gray-800 mb-6">
              <h2 className="text-lg font-semibold text-white mb-4">SEO 基础设置</h2>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="site-title" className="text-white mb-2 block">
                    网站标题
                  </Label>
                  <Input
                    id="site-title"
                    defaultValue={`${brandName} - ${siteDesc}`}
                    placeholder="输入网站标题(Title)"
                    className="bg-gray-800 border-gray-700 text-white"
                  />
                  <p className="text-xs text-gray-500 mt-1">建议控制在60个字符以内</p>
                </div>

                <div>
                  <Label htmlFor="site-keywords" className="text-white mb-2 block">
                    关键词
                  </Label>
                  <Input
                    id="site-keywords"
                    defaultValue="AI学习,智能教育,在线课程,高考备考"
                    placeholder="输入网站关键词，用英文逗号分隔"
                    className="bg-gray-800 border-gray-700 text-white"
                  />
                  <p className="text-xs text-gray-500 mt-1">多个关键词之间用英文逗号分隔</p>
                </div>

                <div>
                  <Label htmlFor="site-description" className="text-white mb-2 block">
                    网站描述
                  </Label>
                  <Textarea
                    id="site-description"
                    defaultValue={`${brandName}是一个AI驱动的智能学习平台，提供高质量的在线课程、模拟考试和智能辅导服务，帮助学生高效学习，全面提升学习效果。`}
                    placeholder="输入网站描述(Description)"
                    className="bg-gray-800 border-gray-700 text-white min-h-[100px]"
                  />
                  <p className="text-xs text-gray-500 mt-1">建议控制在150个字符以内</p>
                </div>
              </div>
            </Card>

            {/* 统计代码 */}
            <Card className="p-4 bg-gray-900 border-gray-800 mb-6">
              <div className="flex items-center mb-4">
                <h2 className="text-lg font-semibold text-white">第三方统计代码</h2>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger>
                      <Info className="h-4 w-4 text-gray-400 ml-2" />
                    </TooltipTrigger>
                    <TooltipContent className="bg-gray-800 text-white border-gray-700">
                      <p className="text-xs max-w-[200px]">
                        添加第三方统计代码，如百度统计、Google Analytics等，将插入到网站的所有页面
                      </p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
              <Textarea
                placeholder="请输入统计代码，以<script>开头"
                className="bg-gray-800 border-gray-700 text-white min-h-[120px] font-mono text-sm"
              />
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
          {isSaving ? "保存中..." : "保存设置"}
        </Button>
      </div>
    </div>
  )
}
