"use client"

import { useState } from "react"
import { ArrowLeft, Save, Check, Plus } from "lucide-react"
import Link from "next/link"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Alert, AlertDescription } from "@/components/ui/alert"

export default function UpgradePromptSettings() {
  // 表单状态
  const [enablePrompt, setEnablePrompt] = useState(true)
  const [title, setTitle] = useState("会员次数不足")
  const [content, setContent] = useState("您的会员次数已用完，请升级会员以继续使用")
  const [buttonText, setButtonText] = useState("立即升级")
  const [redirectType, setRedirectType] = useState("membership")
  const [customLink, setCustomLink] = useState("")
  const [isSaving, setIsSaving] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)
  const [promptStyles, setPromptStyles] = useState([
    {
      id: 1,
      title: "普通次数不足",
      content: "您的AI使用次数已用完，请升级会员继续使用。",
      buttonText: "立即升级",
      active: true,
    },
    {
      id: 2,
      title: "高级功能受限",
      content: "此功能仅对VIP会员开放，请升级会员体验完整功能。",
      buttonText: "了解会员特权",
      active: false,
    },
    { id: 3, title: "限时特惠", content: "升级会员现在享受8折优惠，仅限今日！", buttonText: "限时抢购", active: false },
  ])

  // 添加新样式
  const addNewStyle = () => {
    const newStyle = {
      id: Date.now(),
      title: "新建提示样式",
      content: "请输入提示内容",
      buttonText: "立即升级",
      active: false,
    }
    setPromptStyles([...promptStyles, newStyle])
  }

  // 删除样式
  const deleteStyle = (id) => {
    setPromptStyles(promptStyles.filter((style) => style.id !== id))
  }

  // 更新样式内容
  const updateStyle = (id, field, value) => {
    setPromptStyles(promptStyles.map((style) => (style.id === id ? { ...style, [field]: value } : style)))
  }

  // 设置为当前样式
  const setAsActive = (id) => {
    setPromptStyles(
      promptStyles.map((style) => ({
        ...style,
        active: style.id === id,
      })),
    )

    // 更新当前编辑的内容
    const activeStyle = promptStyles.find((style) => style.id === id)
    if (activeStyle) {
      setTitle(activeStyle.title)
      setContent(activeStyle.content)
      setButtonText(activeStyle.buttonText)
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
        <h1 className="flex-1 text-center text-lg font-semibold text-white">升级提示设置</h1>
      </div>

      {/* 成功提示 */}
      {showSuccess && (
        <div className="fixed top-16 left-4 right-4 z-50">
          <Alert className="bg-green-900/60 border-green-500 backdrop-blur-sm">
            <Check className="h-4 w-4 text-green-400 mr-2" />
            <AlertDescription className="text-green-400">升级提示设置已成功保存</AlertDescription>
          </Alert>
        </div>
      )}

      <div className="p-4 pb-24">
        {/* 全局开关 */}
        <Card className="p-4 bg-gray-900 border-gray-800 mb-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-semibold text-white">启用升级提示</h2>
              <p className="text-sm text-gray-400 mt-1">用户次数不足或需要升级时显示提示对话框</p>
            </div>
            <Switch checked={enablePrompt} onCheckedChange={setEnablePrompt} />
          </div>
        </Card>

        {enablePrompt && (
          <>
            {/* 预设样式选择 */}
            <Card className="p-4 bg-gray-900 border-gray-800 mb-6">
              <h2 className="text-lg font-semibold text-white mb-4">提示样式管理</h2>
              <div className="space-y-3 mb-4">
                {promptStyles.map((style) => (
                  <div
                    key={style.id}
                    className={`p-3 border rounded-lg cursor-pointer transition-colors ${
                      style.active
                        ? "bg-blue-900/20 border-blue-500"
                        : "bg-gray-800 border-gray-700 hover:border-gray-600"
                    }`}
                    onClick={() => setAsActive(style.id)}
                  >
                    <div className="flex justify-between items-center mb-2">
                      <h3 className="font-medium text-white">{style.title}</h3>
                      <div className="flex space-x-2">
                        {style.active && (
                          <span className="text-xs px-2 py-0.5 rounded-full bg-blue-900/30 text-blue-400 border border-blue-500/30">
                            当前使用
                          </span>
                        )}
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-6 text-xs text-red-400"
                          onClick={(e) => {
                            e.stopPropagation()
                            deleteStyle(style.id)
                          }}
                        >
                          删除
                        </Button>
                      </div>
                    </div>
                    <p className="text-sm text-gray-300 mb-1 line-clamp-1">{style.content}</p>
                    <div className="text-xs text-gray-400">按钮文字: {style.buttonText}</div>
                  </div>
                ))}
              </div>
              <Button
                variant="outline"
                className="w-full border-blue-500/30 text-blue-400 hover:bg-blue-500/20"
                onClick={addNewStyle}
              >
                <Plus className="h-4 w-4 mr-2" />
                添加新样式
              </Button>
            </Card>

            {/* 当前提示设置 */}
            <Card className="p-4 bg-gray-900 border-gray-800 mb-6">
              <h2 className="text-lg font-semibold text-white mb-4">当前提示设置</h2>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="prompt-title" className="text-white mb-2 block">
                    提示标题
                  </Label>
                  <Input
                    id="prompt-title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="例如：会员次数不足"
                    className="bg-gray-800 border-gray-700 text-white"
                  />
                </div>

                <div>
                  <Label htmlFor="prompt-content" className="text-white mb-2 block">
                    提示内容
                  </Label>
                  <Textarea
                    id="prompt-content"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    placeholder="例如：您的会员次数已用完，请升级会员以继续使用"
                    className="bg-gray-800 border-gray-700 text-white min-h-[100px]"
                  />
                </div>

                <div>
                  <Label htmlFor="button-text" className="text-white mb-2 block">
                    按钮文字
                  </Label>
                  <Input
                    id="button-text"
                    value={buttonText}
                    onChange={(e) => setButtonText(e.target.value)}
                    placeholder="例如：立即升级"
                    className="bg-gray-800 border-gray-700 text-white"
                  />
                </div>

                <div>
                  <Label htmlFor="redirect-type" className="text-white mb-2 block">
                    跳转类型
                  </Label>
                  <Select value={redirectType} onValueChange={setRedirectType}>
                    <SelectTrigger className="bg-gray-800 border-gray-700 text-white">
                      <SelectValue placeholder="选择跳转类型" />
                    </SelectTrigger>
                    <SelectContent className="bg-gray-900 border-gray-700 text-white">
                      <SelectItem value="membership">会员购买页面</SelectItem>
                      <SelectItem value="course">指定课程页面</SelectItem>
                      <SelectItem value="custom">自定义链接</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {redirectType === "custom" && (
                  <div>
                    <Label htmlFor="custom-link" className="text-white mb-2 block">
                      自定义链接
                    </Label>
                    <Input
                      id="custom-link"
                      value={customLink}
                      onChange={(e) => setCustomLink(e.target.value)}
                      placeholder="请输入完整URL，例如：https://example.com/page"
                      className="bg-gray-800 border-gray-700 text-white"
                    />
                  </div>
                )}
              </div>
            </Card>

            {/* 预览效果 */}
            <Card className="p-4 bg-gray-900 border-gray-800 mb-6">
              <h2 className="text-lg font-semibold text-white mb-4">预览效果</h2>
              <div className="p-6 bg-gray-800 border border-gray-700 rounded-lg">
                <div className="max-w-sm mx-auto bg-gray-900 border border-gray-800 rounded-xl p-6 shadow-lg">
                  <h3 className="text-lg font-semibold text-white mb-4 text-center">{title}</h3>
                  <p className="text-gray-300 text-center mb-6">{content}</p>
                  <Button className="w-full bg-blue-600 hover:bg-blue-500">{buttonText}</Button>
                </div>
              </div>
            </Card>
          </>
        )}
      </div>

      {/* 底部保存按钮 */}
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-gray-900/95 backdrop-blur-md border-t border-gray-800">
        <Button
          className="w-full bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400"
          onClick={saveConfiguration}
          disabled={isSaving}
        >
          <Save className="h-4 w-4 mr-2" />
          {isSaving ? "保存中..." : "保存升级提示设置"}
        </Button>
      </div>
    </div>
  )
}
