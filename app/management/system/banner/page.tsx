"use client"

import { useState } from "react"
import { ArrowLeft, Upload, X, Save, Eye, Info } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Check } from "lucide-react"
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd"

export default function BannerSettings() {
  // 模拟已上传的Banner数据
  const [banners, setBanners] = useState([
    {
      id: "banner-1",
      image: "/images/banner-1.png",
      title: "直播预告",
      description: "名师直播课，实时互动答疑",
      link: "/courses/live/2",
    },
    {
      id: "banner-2",
      image: "/images/banner-2.png",
      title: "暑期特训营",
      description: "集中提升，突破瓶颈",
      link: "/courses/categories/3",
    },
    {
      id: "banner-3",
      image: "/images/banner-3.png",
      title: "热销课程",
      description: "精品好课，限时优惠",
      link: "/courses/1",
    },
  ])

  const [editingBanner, setEditingBanner] = useState(null)
  const [isUploading, setIsUploading] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)

  // 处理Banner图片上传
  const handleBannerUpload = (e) => {
    if (e.target.files && e.target.files[0]) {
      setIsUploading(true)

      // 模拟上传过程
      setTimeout(() => {
        const file = e.target.files[0]
        const newBanner = {
          id: `banner-${Date.now()}`,
          image: URL.createObjectURL(file),
          title: "",
          description: "",
          link: "",
        }

        setBanners([...banners, newBanner])
        setIsUploading(false)
        setEditingBanner(newBanner.id)
      }, 1000)
    }
  }

  // 处理Banner删除
  const removeBanner = (id) => {
    setBanners(banners.filter((banner) => banner.id !== id))
    if (editingBanner === id) {
      setEditingBanner(null)
    }
  }

  // 处理Banner编辑
  const handleBannerEdit = (id, field, value) => {
    setBanners(banners.map((banner) => (banner.id === id ? { ...banner, [field]: value } : banner)))
  }

  // 处理Banner排序拖拽
  const handleDragEnd = (result) => {
    if (!result.destination) return

    const items = Array.from(banners)
    const [reorderedItem] = items.splice(result.source.index, 1)
    items.splice(result.destination.index, 0, reorderedItem)

    setBanners(items)
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
        <h1 className="flex-1 text-center text-lg font-semibold text-white">Banner图设置</h1>
      </div>

      {/* 成功提示 */}
      {showSuccess && (
        <div className="fixed top-16 left-4 right-4 z-50">
          <Alert className="bg-green-900/60 border-green-500 backdrop-blur-sm">
            <Check className="h-4 w-4 text-green-400 mr-2" />
            <AlertDescription className="text-green-400">Banner设置已成功保存</AlertDescription>
          </Alert>
        </div>
      )}

      <div className="p-4 pb-24">
        {/* Banner设置说明 */}
        <Card className="p-4 bg-gray-900 border-gray-800 mb-6">
          <div className="flex items-center mb-2">
            <h2 className="text-lg font-semibold text-white">Banner图设置</h2>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger>
                  <Info className="h-4 w-4 text-gray-400 ml-2" />
                </TooltipTrigger>
                <TooltipContent className="bg-gray-800 text-white border-gray-700">
                  <p className="text-xs max-w-[200px]">首页Banner轮播图设置，最多支持3张图片，可拖拽调整顺序</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
          <p className="text-sm text-gray-400 mb-4">最多支持3张轮播图，建议尺寸1080×360像素，每张图片大小不超过2MB</p>

          {/* 上传新Banner */}
          {banners.length < 3 && (
            <div className="p-4 border-2 border-dashed border-gray-700 rounded-lg text-center mb-6">
              <Upload className="h-8 w-8 text-gray-500 mx-auto mb-2" />
              <p className="text-sm text-gray-400 mb-2">上传Banner图片</p>
              <Input
                type="file"
                className="hidden"
                id="banner-upload"
                onChange={handleBannerUpload}
                accept="image/jpeg,image/png,image/webp"
              />
              <Label htmlFor="banner-upload">
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
          )}

          {/* Banner列表与排序 */}
          <DragDropContext onDragEnd={handleDragEnd}>
            <Droppable droppableId="banners">
              {(provided) => (
                <div {...provided.droppableProps} ref={provided.innerRef} className="space-y-4">
                  {banners.map((banner, index) => (
                    <Draggable key={banner.id} draggableId={banner.id} index={index}>
                      {(provided) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          className={`p-4 bg-gray-800 border border-gray-700 rounded-lg ${
                            editingBanner === banner.id ? "border-blue-500" : ""
                          }`}
                        >
                          <div className="flex justify-between items-start mb-4">
                            <div className="flex items-center">
                              <span className="w-6 h-6 flex items-center justify-center bg-gray-700 rounded-full mr-2 text-xs">
                                {index + 1}
                              </span>
                              <h3 className="font-medium text-white">Banner {index + 1}</h3>
                            </div>
                            <div className="flex space-x-2">
                              <Button
                                variant="ghost"
                                size="sm"
                                className="h-8 w-8 p-0 text-gray-400"
                                onClick={() => setEditingBanner(editingBanner === banner.id ? null : banner.id)}
                              >
                                <Eye className="h-4 w-4" />
                              </Button>
                              <Button
                                variant="ghost"
                                size="sm"
                                className="h-8 w-8 p-0 text-red-400"
                                onClick={() => removeBanner(banner.id)}
                              >
                                <X className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>

                          <div className="relative w-full h-32 mb-3 rounded-md overflow-hidden">
                            <Image
                              src={banner.image || "/placeholder.svg"}
                              alt={`Banner ${index + 1}`}
                              fill
                              className="object-cover"
                            />
                          </div>

                          {editingBanner === banner.id && (
                            <div className="space-y-3">
                              <div>
                                <Label htmlFor={`title-${banner.id}`} className="text-white text-xs mb-1 block">
                                  标题
                                </Label>
                                <Input
                                  id={`title-${banner.id}`}
                                  value={banner.title}
                                  onChange={(e) => handleBannerEdit(banner.id, "title", e.target.value)}
                                  placeholder="Banner标题"
                                  className="bg-gray-900 border-gray-700 text-white"
                                />
                              </div>

                              <div>
                                <Label htmlFor={`desc-${banner.id}`} className="text-white text-xs mb-1 block">
                                  描述
                                </Label>
                                <Input
                                  id={`desc-${banner.id}`}
                                  value={banner.description}
                                  onChange={(e) => handleBannerEdit(banner.id, "description", e.target.value)}
                                  placeholder="Banner简短描述"
                                  className="bg-gray-900 border-gray-700 text-white"
                                />
                              </div>

                              <div>
                                <Label htmlFor={`link-${banner.id}`} className="text-white text-xs mb-1 block">
                                  链接地址
                                </Label>
                                <Input
                                  id={`link-${banner.id}`}
                                  value={banner.link}
                                  onChange={(e) => handleBannerEdit(banner.id, "link", e.target.value)}
                                  placeholder="点击Banner跳转的链接"
                                  className="bg-gray-900 border-gray-700 text-white"
                                />
                              </div>
                            </div>
                          )}
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </DragDropContext>
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
          {isSaving ? "保存中..." : "保存Banner设置"}
        </Button>
      </div>
    </div>
  )
}
