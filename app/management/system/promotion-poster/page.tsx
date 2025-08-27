"use client"

import { useState } from "react"
import { ArrowLeft, Upload, X, Save, Info, Check, QrCode } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Switch } from "@/components/ui/switch"

export default function PromotionPosterSettings() {
  // 模拟已上传的海报数据
  const [poster, setPoster] = useState({
    id: "poster-1",
    image: "/welcome-bonus-splash.png",
    title: "推广中心海报图",
    description: "用户专属推广海报",
    active: true,
  })

  const [isUploading, setIsUploading] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)

  // 处理海报图片上传
  const handlePosterUpload = (e) => {
    if (e.target.files && e.target.files[0]) {
      setIsUploading(true)

      // 模拟上传过程
      setTimeout(() => {
        const file = e.target.files[0]
        setPoster({
          ...poster,
          image: URL.createObjectURL(file),
        })
        setIsUploading(false)
      }, 1000)
    }
  }

  // 处理海报删除
  const removePoster = () => {
    setPoster({
      ...poster,
      image: "/community-garden-harvest.png",
    })
  }

  // 处理海报编辑
  const handlePosterEdit = (field, value) => {
    setPoster({ ...poster, [field]: value })
  }

  // 处理海报激活状态切换
  const togglePosterActive = () => {
    setPoster({ ...poster, active: !poster.active })
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
        <h1 className="flex-1 text-center text-lg font-semibold text-white">推广中心海报图设置</h1>
      </div>

      {/* 成功提示 */}
      {showSuccess && (
        <div className="fixed top-16 left-4 right-4 z-50">
          <Alert className="bg-green-900/60 border-green-500 backdrop-blur-sm">
            <Check className="h-4 w-4 text-green-400 mr-2" />
            <AlertDescription className="text-green-400">推广海报设置已成功保存</AlertDescription>
          </Alert>
        </div>
      )}

      <div className="p-4 pb-24">
        {/* 海报设置说明 */}
        <Card className="p-4 bg-gray-900 border-gray-800 mb-6">
          <div className="flex items-center mb-2">
            <h2 className="text-lg font-semibold text-white">推广中心海报设置</h2>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger>
                  <Info className="h-4 w-4 text-gray-400 ml-2" />
                </TooltipTrigger>
                <TooltipContent className="bg-gray-800 text-white border-gray-700">
                  <p className="text-xs max-w-[250px]">
                    用户推广海报设置，请确保在海报的右下角留出空白区域用于放置自动生成的用户推广二维码
                  </p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
          <p className="text-sm text-gray-400 mb-4">
            推广海报建议尺寸为1080×1920像素（9:16手机屏比例），图片大小不超过2MB。
            <strong className="text-yellow-400">请在右下角留出200×200像素的空白区域用于二维码</strong>。
          </p>

          {/* 上传新海报 */}
          <div className="p-4 border-2 border-dashed border-gray-700 rounded-lg text-center mb-6">
            <Upload className="h-8 w-8 text-gray-500 mx-auto mb-2" />
            <p className="text-sm text-gray-400 mb-2">上传推广海报图片</p>
            <Input
              type="file"
              className="hidden"
              id="poster-upload"
              onChange={handlePosterUpload}
              accept="image/jpeg,image/png,image/webp"
            />
            <Label htmlFor="poster-upload">
              <Button
                variant="outline"
                className="border-blue-500/30 text-blue-400 hover:bg-blue-500/20"
                disabled={isUploading}
                asChild
              >
                <span>{isUploading ? "上传中..." : "选择图片"}</span>
              </Button>
            </Label>
          </div>

          {/* 海报设置 */}
          <div className="p-4 bg-gray-800 border border-gray-700 rounded-lg">
            <div className="flex justify-between items-start mb-4">
              <div className="flex items-center">
                <h3 className="font-medium text-white">推广中心海报图</h3>
              </div>
              <div className="flex space-x-2">
                <Button variant="ghost" size="sm" className="h-8 w-8 p-0 text-red-400" onClick={removePoster}>
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <div className="flex gap-6">
              <div className="relative w-40 h-72 rounded-md overflow-hidden">
                <Image
                  src={poster.image || "/placeholder.svg?height=1080&width=1920&query=promotional%20poster"}
                  alt="推广中心海报图"
                  fill
                  className="object-cover"
                />
                {/* QR码占位区域标识 */}
                <div className="absolute bottom-4 right-4 w-16 h-16 border-2 border-dashed border-blue-400 rounded-md flex items-center justify-center bg-black/30 backdrop-blur-sm">
                  <QrCode className="h-10 w-10 text-blue-400 opacity-70" />
                </div>
              </div>

              <div className="flex-1">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-sm text-gray-300">启用状态</span>
                  <Switch
                    checked={poster.active}
                    onCheckedChange={togglePosterActive}
                    className="data-[state=checked]:bg-blue-500"
                  />
                </div>

                <div className="space-y-3">
                  <div>
                    <Label htmlFor="title" className="text-white text-xs mb-1 block">
                      标题
                    </Label>
                    <Input
                      id="title"
                      value={poster.title}
                      onChange={(e) => handlePosterEdit("title", e.target.value)}
                      placeholder="海报标题（仅后台显示）"
                      className="bg-gray-900 border-gray-700 text-white"
                    />
                  </div>

                  <div>
                    <Label htmlFor="desc" className="text-white text-xs mb-1 block">
                      描述
                    </Label>
                    <Input
                      id="desc"
                      value={poster.description}
                      onChange={(e) => handlePosterEdit("description", e.target.value)}
                      placeholder="海报描述（仅后台显示）"
                      className="bg-gray-900 border-gray-700 text-white"
                    />
                  </div>

                  <div className="p-3 bg-gray-900 border border-yellow-500/30 rounded-lg">
                    <div className="flex items-start">
                      <Info className="h-4 w-4 text-yellow-400 mt-0.5 mr-2 flex-shrink-0" />
                      <p className="text-xs text-yellow-200">
                        请确保在海报右下角预留200×200像素的空白区域，用于系统自动生成的用户专属推广二维码。海报上传后，系统会自动将二维码添加到该位置。
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Card>
      </div>

      {/* 底部保存按钮 */}
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-gray-900/95 backdrop-blur-md border-t border-gray-800">
        <Button
          className="w-full bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400"
          onClick={saveConfiguration}
          disabled={isSaving}
        >
          <Save className="h-4 w-4 mr-2" />
          {isSaving ? "保存中..." : "保存海报设置"}
        </Button>
      </div>
    </div>
  )
}
