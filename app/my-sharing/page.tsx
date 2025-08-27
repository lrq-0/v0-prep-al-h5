"use client"

import { useState } from "react"
import { ArrowLeft, ChevronRight, TrendingUp, Wallet, CreditCard, History, Link2, QrCode } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export default function MySharing() {
  const [linkCopied, setLinkCopied] = useState(false)

  // 模拟账户数据
  const account = {
    balance: 1256.78,
    totalEarnings: 3589.42,
    link: "https://prepal.com/share/u10086428",
    qrCode: "/images/user-avatar.png", // 实际应用中应该是二维码图片
  }

  // 模拟推广数据
  const promotionData = {
    today: {
      registrations: 5,
      payments: 2,
      commission: 128.5,
    },
    yesterday: {
      registrations: 8,
      payments: 3,
      commission: 189.75,
    },
    week: {
      registrations: 32,
      payments: 15,
      commission: 756.25,
    },
    month: {
      registrations: 124,
      payments: 58,
      commission: 2945.5,
    },
  }

  // 模拟佣金排行榜
  const commissionRanking = [
    { id: 1, name: "用户A", avatar: "/images/user-avatar.png", commission: 5689.42 },
    { id: 2, name: "用户B", avatar: "/images/user-avatar.png", commission: 4532.18 },
    { id: 3, name: "用户C", avatar: "/images/user-avatar.png", commission: 3987.65 },
    { id: 4, name: "张同学", avatar: "/images/user-avatar.png", commission: 3589.42 },
    { id: 5, name: "用户D", avatar: "/images/user-avatar.png", commission: 2876.29 },
    { id: 6, name: "用户E", avatar: "/images/user-avatar.png", commission: 2345.87 },
    { id: 7, name: "用户F", avatar: "/images/user-avatar.png", commission: 1987.54 },
    { id: 8, name: "用户G", avatar: "/images/user-avatar.png", commission: 1654.32 },
    { id: 9, name: "用户H", avatar: "/images/user-avatar.png", commission: 1432.19 },
    { id: 10, name: "用户I", avatar: "/images/user-avatar.png", commission: 1298.76 },
  ]

  // 复制链接
  const copyLink = () => {
    navigator.clipboard.writeText(account.link)
    setLinkCopied(true)
    setTimeout(() => setLinkCopied(false), 2000)
  }

  return (
    <div className="min-h-screen bg-black text-white">
      {/* 顶部导航栏 */}
      <div className="sticky top-0 left-0 right-0 h-14 flex items-center px-4 bg-gray-900/80 backdrop-blur-md border-b border-gray-800 z-10">
        <Link href="/" className="flex items-center text-gray-300">
          <ArrowLeft className="h-5 w-5 mr-2" />
          <span>返回</span>
        </Link>
        <h1 className="flex-1 text-center text-lg font-semibold text-white">我的分享</h1>
      </div>

      <div className="p-4 pb-16">
        {/* 账户余额 */}
        <Card className="p-4 mb-4 bg-gradient-to-r from-blue-900/50 to-gray-900 border-gray-800">
          <div className="flex justify-between items-center mb-2">
            <h2 className="text-lg font-semibold text-white">账户余额</h2>
            <Link href="/my-sharing/withdraw-history">
              <button className="text-xs text-gray-400 flex items-center">
                提现记录
                <ChevronRight className="h-3 w-3 ml-1" />
              </button>
            </Link>
          </div>
          <div className="text-3xl font-bold text-white mb-4">¥{account.balance.toFixed(2)}</div>
          <div className="text-xs text-gray-400 mb-4">累计收益：¥{account.totalEarnings.toFixed(2)}</div>
          <div className="grid grid-cols-2 gap-3">
            <Button className="bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400">
              <Wallet className="h-4 w-4 mr-2" />
              提现
            </Button>
            <Button variant="outline" className="border-blue-500/30 text-blue-400 hover:bg-blue-500/20">
              <CreditCard className="h-4 w-4 mr-2" />
              充值
            </Button>
          </div>
        </Card>

        {/* 分享工具 */}
        <div className="grid grid-cols-2 gap-3 mb-4">
          <Card className="p-3 bg-gray-900 border-gray-800">
            <button className="w-full h-full flex flex-col items-center justify-center" onClick={copyLink}>
              <div className="w-10 h-10 rounded-full bg-blue-900/20 flex items-center justify-center mb-2">
                <Link2 className="h-5 w-5 text-blue-400" />
              </div>
              <div className="text-sm font-medium text-white">我的链接</div>
              {linkCopied && <div className="text-xs text-green-400 mt-1">已复制链接</div>}
            </button>
          </Card>
          <Link href="/my-sharing/poster">
            <Card className="p-3 bg-gray-900 border-gray-800">
              <div className="w-full h-full flex flex-col items-center justify-center">
                <div className="w-10 h-10 rounded-full bg-blue-900/20 flex items-center justify-center mb-2">
                  <QrCode className="h-5 w-5 text-blue-400" />
                </div>
                <div className="text-sm font-medium text-white">我的二维码</div>
              </div>
            </Card>
          </Link>
        </div>

        {/* 功能按钮 */}
        <div className="grid grid-cols-2 gap-3 mb-6">
          <Link href="/my-sharing/fund-details">
            <Card className="p-3 bg-gray-900 border-gray-800">
              <div className="w-full h-full flex flex-col items-center justify-center">
                <div className="w-8 h-8 rounded-full bg-blue-900/20 flex items-center justify-center mb-1">
                  <History className="h-4 w-4 text-blue-400" />
                </div>
                <div className="text-xs font-medium text-white">佣金明细</div>
              </div>
            </Card>
          </Link>
          <Link href="/my-sharing/share-list">
            <Card className="p-3 bg-gray-900 border-gray-800">
              <div className="w-full h-full flex flex-col items-center justify-center">
                <div className="w-8 h-8 rounded-full bg-blue-900/20 flex items-center justify-center mb-1">
                  <TrendingUp className="h-4 w-4 text-blue-400" />
                </div>
                <div className="text-xs font-medium text-white">分享列表</div>
              </div>
            </Card>
          </Link>
        </div>

        {/* 推广数据看板 */}
        <h2 className="text-lg font-semibold text-white mb-3">推广数据看板</h2>
        <div className="space-y-4 mb-6">
          {/* 今日数据 */}
          <Card className="p-3 bg-gray-900 border-gray-800">
            <h3 className="text-sm font-medium text-white mb-2">今日数据</h3>
            <div className="grid grid-cols-3 gap-3">
              <div className="text-center">
                <div className="text-base font-bold text-white">{promotionData.today.registrations}</div>
                <div className="text-xs text-gray-400">注册用户</div>
              </div>
              <div className="text-center">
                <div className="text-base font-bold text-white">{promotionData.today.payments}</div>
                <div className="text-xs text-gray-400">付款数</div>
              </div>
              <div className="text-center">
                <div className="text-base font-bold text-blue-400">¥{promotionData.today.commission.toFixed(2)}</div>
                <div className="text-xs text-gray-400">佣金收入</div>
              </div>
            </div>
          </Card>

          {/* 昨日数据 */}
          <Card className="p-3 bg-gray-900 border-gray-800">
            <h3 className="text-sm font-medium text-white mb-2">昨日数据</h3>
            <div className="grid grid-cols-3 gap-3">
              <div className="text-center">
                <div className="text-base font-bold text-white">{promotionData.yesterday.registrations}</div>
                <div className="text-xs text-gray-400">注册用户</div>
              </div>
              <div className="text-center">
                <div className="text-base font-bold text-white">{promotionData.yesterday.payments}</div>
                <div className="text-xs text-gray-400">付款数</div>
              </div>
              <div className="text-center">
                <div className="text-base font-bold text-blue-400">
                  ¥{promotionData.yesterday.commission.toFixed(2)}
                </div>
                <div className="text-xs text-gray-400">佣金收入</div>
              </div>
            </div>
          </Card>

          {/* 近7日数据 */}
          <Card className="p-3 bg-gray-900 border-gray-800">
            <h3 className="text-sm font-medium text-white mb-2">近7日数据</h3>
            <div className="grid grid-cols-3 gap-3">
              <div className="text-center">
                <div className="text-base font-bold text-white">{promotionData.week.registrations}</div>
                <div className="text-xs text-gray-400">注册用户</div>
              </div>
              <div className="text-center">
                <div className="text-base font-bold text-white">{promotionData.week.payments}</div>
                <div className="text-xs text-gray-400">付款数</div>
              </div>
              <div className="text-center">
                <div className="text-base font-bold text-blue-400">¥{promotionData.week.commission.toFixed(2)}</div>
                <div className="text-xs text-gray-400">佣金收入</div>
              </div>
            </div>
          </Card>

          {/* 近30日数据 */}
          <Card className="p-3 bg-gray-900 border-gray-800">
            <h3 className="text-sm font-medium text-white mb-2">近30日数据</h3>
            <div className="grid grid-cols-3 gap-3">
              <div className="text-center">
                <div className="text-base font-bold text-white">{promotionData.month.registrations}</div>
                <div className="text-xs text-gray-400">注册用户</div>
              </div>
              <div className="text-center">
                <div className="text-base font-bold text-white">{promotionData.month.payments}</div>
                <div className="text-xs text-gray-400">付款数</div>
              </div>
              <div className="text-center">
                <div className="text-base font-bold text-blue-400">¥{promotionData.month.commission.toFixed(2)}</div>
                <div className="text-xs text-gray-400">佣金收入</div>
              </div>
            </div>
          </Card>
        </div>

        {/* 佣金排行榜 */}
        <h2 className="text-lg font-semibold text-white mb-3">佣金排行榜</h2>
        <Card className="p-4 bg-gray-900 border-gray-800">
          <div className="space-y-3">
            {commissionRanking.map((user, index) => (
              <div key={user.id} className="flex items-center">
                <div className="w-6 h-6 flex items-center justify-center mr-3">
                  {index < 3 ? (
                    <div
                      className={`w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold ${
                        index === 0
                          ? "bg-amber-500 text-white"
                          : index === 1
                            ? "bg-gray-400 text-white"
                            : "bg-amber-800 text-white"
                      }`}
                    >
                      {index + 1}
                    </div>
                  ) : (
                    <div className="text-gray-500 text-sm">{index + 1}</div>
                  )}
                </div>
                <div className="relative w-8 h-8 rounded-full overflow-hidden mr-3">
                  <Image src={user.avatar || "/placeholder.svg"} alt={user.name} fill className="object-cover" />
                </div>
                <div className="flex-1">
                  <div className="text-sm text-white">{user.name}</div>
                </div>
                <div className="text-sm font-medium text-amber-400">¥{user.commission.toFixed(2)}</div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  )
}
