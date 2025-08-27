"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { ArrowLeft, Calendar } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Calendar as CalendarComponent } from "@/components/ui/calendar"
import { format } from "date-fns"
import { cn } from "@/lib/utils"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Switch } from "@/components/ui/switch"
import { Separator } from "@/components/ui/separator"
import { toast } from "@/components/ui/use-toast"

export default function CreateCouponPage() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    name: "",
    amount: "",
    total: "",
    perPersonLimit: "1",
    claimMethod: "manual",
    condition: "",
    startDate: null as Date | null,
    endDate: null as Date | null,
    useStartDate: null as Date | null,
    useEndDate: null as Date | null,
    validDays: "",
    useValidDays: false,
    description: "",
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleDateChange = (name: string, date: Date | null) => {
    setFormData((prev) => ({ ...prev, [name]: date }))
  }

  const handleSwitchChange = (name: string, checked: boolean) => {
    setFormData((prev) => ({ ...prev, [name]: checked }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // 表单验证
    if (!formData.name || !formData.amount || !formData.total) {
      toast({
        title: "表单不完整",
        description: "请填写所有必填字段",
        variant: "destructive",
      })
      return
    }

    // 这里可以添加更多的验证逻辑

    // 提交表单
    console.log("提交的表单数据:", formData)

    // 显示成功提示
    toast({
      title: "创建成功",
      description: "优惠券活动已成功创建",
    })

    // 返回列表页
    router.push("/management/coupons")
  }

  return (
    <div className="container mx-auto px-4 py-6 pb-24">
      <div className="flex items-center mb-6">
        <Button variant="ghost" size="icon" onClick={() => router.push("/management/coupons")} className="mr-2">
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <h1 className="text-2xl font-bold">创建优惠券活动</h1>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6 max-w-3xl mx-auto">
        <div className="space-y-4 bg-white p-6 rounded-lg shadow-sm border">
          <h2 className="text-lg font-medium text-gray-900">基本信息</h2>
          <Separator />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="name" className="text-gray-800">
                优惠券名称 <span className="text-red-500">*</span>
              </Label>
              <Input
                id="name"
                name="name"
                placeholder="例如：新用户专享优惠"
                value={formData.name}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="amount" className="text-gray-800">
                优惠券面额 (元) <span className="text-red-500">*</span>
              </Label>
              <Input
                id="amount"
                name="amount"
                type="number"
                min="0"
                step="0.01"
                placeholder="例如：50"
                value={formData.amount}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="total" className="text-gray-800">
                发行量 <span className="text-red-500">*</span>
              </Label>
              <Input
                id="total"
                name="total"
                type="number"
                min="1"
                placeholder="例如：1000"
                value={formData.total}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="perPersonLimit" className="text-gray-800">
                每人限领
              </Label>
              <Select
                value={formData.perPersonLimit}
                onValueChange={(value) => handleSelectChange("perPersonLimit", value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="选择每人限领数量" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">1张</SelectItem>
                  <SelectItem value="2">2张</SelectItem>
                  <SelectItem value="3">3张</SelectItem>
                  <SelectItem value="5">5张</SelectItem>
                  <SelectItem value="10">10张</SelectItem>
                  <SelectItem value="unlimited">不限制</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label className="text-gray-800">领取方式</Label>
            <RadioGroup
              value={formData.claimMethod}
              onValueChange={(value) => handleSelectChange("claimMethod", value)}
              className="flex flex-col space-y-2"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="manual" id="manual" />
                <Label htmlFor="manual" className="cursor-pointer text-gray-700">
                  手动领取（用户在优惠券中心主动领取）
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="automatic" id="automatic" />
                <Label htmlFor="automatic" className="cursor-pointer text-gray-700">
                  自动发放（满足条件的用户自动获得）
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="code" id="code" />
                <Label htmlFor="code" className="cursor-pointer text-gray-700">
                  兑换码（用户通过兑换码获得）
                </Label>
              </div>
            </RadioGroup>
          </div>

          <div className="space-y-2">
            <Label htmlFor="condition" className="text-gray-800">
              使用条件
            </Label>
            <Input
              id="condition"
              name="condition"
              placeholder="例如：满200元可用"
              value={formData.condition}
              onChange={handleInputChange}
            />
            <p className="text-sm text-gray-600">留空表示无使用门槛</p>
          </div>
        </div>

        <div className="space-y-4 bg-white p-6 rounded-lg shadow-sm border">
          <h2 className="text-lg font-medium text-gray-900">时间设置</h2>
          <Separator />

          <div className="space-y-2">
            <Label className="text-gray-800">领取时间范围</Label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label className="text-sm text-gray-600 mb-1 block">开始日期</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "w-full justify-start text-left font-normal",
                        !formData.startDate && "text-gray-400",
                        formData.startDate && "text-gray-700",
                      )}
                    >
                      <Calendar className="mr-2 h-4 w-4" />
                      {formData.startDate ? format(formData.startDate, "yyyy-MM-dd") : "选择开始日期"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <CalendarComponent
                      mode="single"
                      selected={formData.startDate || undefined}
                      onSelect={(date) => handleDateChange("startDate", date)}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>

              <div>
                <Label className="text-sm text-gray-600 mb-1 block">结束日期</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "w-full justify-start text-left font-normal",
                        !formData.endDate && "text-gray-400",
                        formData.endDate && "text-gray-700",
                      )}
                    >
                      <Calendar className="mr-2 h-4 w-4" />
                      {formData.endDate ? format(formData.endDate, "yyyy-MM-dd") : "选择结束日期"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <CalendarComponent
                      mode="single"
                      selected={formData.endDate || undefined}
                      onSelect={(date) => handleDateChange("endDate", date)}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Label htmlFor="useValidDays" className="cursor-pointer text-gray-800">
                使用有效期（天）
              </Label>
              <Switch
                id="useValidDays"
                checked={formData.useValidDays}
                onCheckedChange={(checked) => handleSwitchChange("useValidDays", checked)}
              />
            </div>

            {formData.useValidDays ? (
              <div className="space-y-2">
                <Input
                  id="validDays"
                  name="validDays"
                  type="number"
                  min="1"
                  placeholder="例如：30（表示领取后30天内有效）"
                  value={formData.validDays}
                  onChange={handleInputChange}
                />
                <p className="text-sm text-gray-500">从用户领取优惠券的时刻开始计算</p>
              </div>
            ) : (
              <div className="space-y-2">
                <Label className="text-gray-800">使用时间范围</Label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label className="text-sm text-gray-600 mb-1 block">开始日期</Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className={cn(
                            "w-full justify-start text-left font-normal",
                            !formData.useStartDate && "text-gray-400",
                          )}
                        >
                          <Calendar className="mr-2 h-4 w-4" />
                          {formData.useStartDate ? format(formData.useStartDate, "yyyy-MM-dd") : "选择开始日期"}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <CalendarComponent
                          mode="single"
                          selected={formData.useStartDate || undefined}
                          onSelect={(date) => handleDateChange("useStartDate", date)}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                  </div>

                  <div>
                    <Label className="text-sm text-gray-600 mb-1 block">结束日期</Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className={cn(
                            "w-full justify-start text-left font-normal",
                            !formData.useEndDate && "text-gray-400",
                          )}
                        >
                          <Calendar className="mr-2 h-4 w-4" />
                          {formData.useEndDate ? format(formData.useEndDate, "yyyy-MM-dd") : "选择结束日期"}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <CalendarComponent
                          mode="single"
                          selected={formData.useEndDate || undefined}
                          onSelect={(date) => handleDateChange("useEndDate", date)}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="space-y-4 bg-white p-6 rounded-lg shadow-sm border">
          <h2 className="text-lg font-medium text-gray-900">其他信息</h2>
          <Separator />

          <div className="space-y-2">
            <Label htmlFor="description" className="text-gray-800">
              优惠券描述
            </Label>
            <Textarea
              id="description"
              name="description"
              placeholder="请输入优惠券的详细描述和使用说明"
              rows={4}
              value={formData.description}
              onChange={handleInputChange}
            />
          </div>
        </div>

        <div className="fixed bottom-0 left-0 right-0 bg-white border-t p-4 flex justify-end">
          <div className="container mx-auto flex justify-end gap-4">
            <Button type="button" variant="outline" onClick={() => router.push("/management/coupons")}>
              取消
            </Button>
            <Button type="submit">保存</Button>
          </div>
        </div>
      </form>
    </div>
  )
}
