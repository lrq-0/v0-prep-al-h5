"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Crown, Check, ArrowLeft, CreditCard } from "lucide-react"
import Image from "next/image"

export default function VipUpgrade() {
  const router = useRouter()
  const [selectedPlan, setSelectedPlan] = useState("monthly")
  const [selectedPayment, setSelectedPayment] = useState("wechat")

  const plans = [
    {
      id: "monthly",
      name: "月度会员",
      price: "39",
      originalPrice: "59",
      period: "每月",
      features: ["无限AI对话", "全部模型使用权限", "优先客服支持"],
      popular: true,
    },
    {
      id: "quarterly",
      name: "季度会员",
      price: "99",
      originalPrice: "177",
      period: "每3个月",
      features: ["无限AI对话", "全部模型使用权限", "优先客服支持", "会员专属课程"],
      popular: false,
    },
    {
      id: "yearly",
      name: "年度会员",
      price: "299",
      originalPrice: "708",
      period: "每年",
      features: ["无限AI对话", "全部模型使用权限", "优先客服支持", "会员专属课程", "1对1咨询服务"],
      popular: false,
    },
  ]

  const paymentMethods = [
    {
      id: "wechat",
      name: "微信支付",
      icon: "/wechat-pay-generic-icon.png",
    },
    {
      id: "alipay",
      name: "支付宝",
      icon: "/digital-wallet-icon.png",
    },
    {
      id: "unionpay",
      name: "银联",
      icon: "/unionpay-logo-generic.png",
    },
  ]

  const benefits = [
    "无限次数使用AI助手",
    "支持GPT-4、Claude等高级模型",
    "优先使用最新AI功能",
    "会员专属学习资源",
    "专属客服支持",
  ]

  return (
    <div className="min-h-screen bg-black text-white pb-24">
      {/* 顶部导航 */}
      <div className="sticky top-0 z-10 bg-gray-900 border-b border-gray-800 p-4 flex items-center">
        <button onClick={() => router.back()} className="mr-4">
          <ArrowLeft className="h-6 w-6 text-gray-400" />
        </button>
        <h1 className="text-lg font-semibold text-white">会员升级</h1>
      </div>

      {/* 会员状态 */}
      <Card className="m-4 p-4 bg-gray-800 border-gray-700">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center">
            <Crown className="h-6 w-6 text-yellow-400 mr-2" />
            <h2 className="text-lg font-semibold text-white">当前状态</h2>
          </div>
          <span className="text-gray-400">普通用户</span>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-gray-700 rounded-lg p-3 text-center">
            <p className="text-xs text-gray-400 mb-1">剩余天数</p>
            <p className="text-xl font-semibold text-white">0</p>
          </div>
          <div className="bg-gray-700 rounded-lg p-3 text-center">
            <p className="text-xs text-gray-400 mb-1">剩余次数</p>
            <p className="text-xl font-semibold text-white">3</p>
          </div>
        </div>
      </Card>

      {/* 会员套餐选择 */}
      <div className="px-4 mb-6">
        <h2 className="text-lg font-semibold text-white mb-3">选择会员套餐</h2>
        <div className="space-y-3">
          {plans.map((plan) => (
            <Card
              key={plan.id}
              className={`p-4 cursor-pointer ${
                selectedPlan === plan.id
                  ? "bg-blue-900 border-blue-500"
                  : "bg-gray-800 border-gray-700 hover:bg-gray-700"
              } ${plan.popular ? "relative overflow-hidden" : ""}`}
              onClick={() => setSelectedPlan(plan.id)}
            >
              {plan.popular && (
                <div className="absolute top-0 right-0">
                  <div className="bg-blue-500 text-white text-xs px-2 py-0.5 transform rotate-45 translate-x-2 -translate-y-1">
                    最受欢迎
                  </div>
                </div>
              )}
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="font-medium text-white">{plan.name}</h3>
                  <div className="flex items-baseline mt-1">
                    <span className="text-xl font-bold text-white">¥{plan.price}</span>
                    <span className="text-xs text-gray-400 line-through ml-2">¥{plan.originalPrice}</span>
                    <span className="text-xs text-gray-400 ml-2">{plan.period}</span>
                  </div>
                </div>
                <div
                  className={`w-5 h-5 rounded-full border ${
                    selectedPlan === plan.id
                      ? "bg-blue-500 border-blue-500 flex items-center justify-center"
                      : "border-gray-500"
                  }`}
                >
                  {selectedPlan === plan.id && <Check className="h-3 w-3 text-white" />}
                </div>
              </div>
              <div className="mt-3 space-y-1">
                {plan.features.map((feature, index) => (
                  <div key={index} className="flex items-center">
                    <Check className="h-4 w-4 text-green-400 mr-2" />
                    <span className="text-sm text-gray-300">{feature}</span>
                  </div>
                ))}
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* 支付方式 */}
      <div className="px-4 mb-6">
        <h2 className="text-lg font-semibold text-white mb-3">选择支付方式</h2>
        <Card className="bg-gray-800 border-gray-700 overflow-hidden">
          {paymentMethods.map((method, index) => (
            <div
              key={method.id}
              className={`flex items-center justify-between p-4 cursor-pointer hover:bg-gray-700 ${
                index !== paymentMethods.length - 1 ? "border-b border-gray-700" : ""
              }`}
              onClick={() => setSelectedPayment(method.id)}
            >
              <div className="flex items-center">
                <div className="w-8 h-8 relative mr-3">
                  <Image src={method.icon || "/placeholder.svg"} alt={method.name} fill className="object-contain" />
                </div>
                <span className="text-gray-300">{method.name}</span>
              </div>
              <div
                className={`w-5 h-5 rounded-full border ${
                  selectedPayment === method.id
                    ? "bg-blue-500 border-blue-500 flex items-center justify-center"
                    : "border-gray-500"
                }`}
              >
                {selectedPayment === method.id && <Check className="h-3 w-3 text-white" />}
              </div>
            </div>
          ))}
        </Card>
      </div>

      {/* 会员特权 */}
      <div className="px-4 mb-6">
        <h2 className="text-lg font-semibold text-white mb-3">会员特权</h2>
        <Card className="bg-gray-800 border-gray-700 p-4">
          <div className="space-y-2">
            {benefits.map((benefit, index) => (
              <div key={index} className="flex items-center">
                <Check className="h-5 w-5 text-green-400 mr-2" />
                <span className="text-gray-300">{benefit}</span>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* 底部支付按钮 */}
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-gray-900 border-t border-gray-800">
        <Button className="w-full bg-blue-600 hover:bg-blue-500 text-white py-6">
          <CreditCard className="h-5 w-5 mr-2" />
          立即支付 ¥{plans.find((plan) => plan.id === selectedPlan)?.price || "39"}
        </Button>
      </div>
    </div>
  )
}
