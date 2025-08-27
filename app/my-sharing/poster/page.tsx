import { ArrowLeft, Download, Share2 } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"

export default function SharingPoster() {
  return (
    <div className="min-h-screen bg-black text-white">
      {/* 顶部导航栏 */}
      <div className="sticky top-0 left-0 right-0 h-14 flex items-center px-4 bg-gray-900/80 backdrop-blur-md border-b border-gray-800 z-10">
        <Link href="/my-sharing" className="flex items-center text-gray-300">
          <ArrowLeft className="h-5 w-5 mr-2" />
          <span>返回</span>
        </Link>
        <h1 className="flex-1 text-center text-lg font-semibold text-white">分享海报</h1>
        <button className="text-gray-300">
          <Share2 className="h-5 w-5" />
        </button>
      </div>

      <div className="p-4 pb-20">
        {/* 海报预览 */}
        <div className="relative w-full aspect-[3/5] mb-6 overflow-hidden rounded-lg border border-gray-700">
          <div className="absolute inset-0 bg-gradient-to-b from-blue-900/20 to-black/80"></div>
          <div className="absolute inset-0 flex flex-col items-center p-6 text-center">
            <div className="w-20 h-20 mb-4">
              <Image src="/images/ai-assistant-1.png" alt="Logo" width={80} height={80} className="object-contain" />
            </div>
            <h2 className="text-2xl font-bold text-white mb-2">Prep AI</h2>
            <h3 className="text-lg font-semibold text-blue-400 mb-6">AI驱动的智能学习平台</h3>

            <div className="mb-6">
              <Image src="/images/tech-banner-1.png" alt="Banner" width={250} height={150} className="rounded-lg" />
            </div>

            <p className="text-gray-300 mb-6">扫描下方二维码，立即体验AI智能学习</p>

            <div className="w-40 h-40 bg-white p-2 rounded-lg mb-6">
              <Image src="/images/user-avatar.png" alt="QR Code" width={160} height={160} className="object-contain" />
            </div>

            <div className="mt-auto">
              <p className="text-xs text-gray-400">邀请码: 10086428</p>
              <p className="text-xs text-gray-400">邀请人: 张同学</p>
            </div>
          </div>
        </div>

        {/* 海报说明 */}
        <div className="p-4 bg-gray-900 border border-gray-800 rounded-lg mb-6">
          <h3 className="font-medium text-white mb-3">分享说明</h3>
          <p className="text-sm text-gray-300 mb-3">
            通过您的专属二维码邀请好友注册并购买课程，您将获得课程金额的15%作为佣金奖励。
          </p>
          <div className="text-xs text-gray-400">
            <p>• 好友注册时需使用您的邀请码</p>
            <p>• 佣金将在好友支付成功后24小时内到账</p>
            <p>• 佣金可随时提现至微信或支付宝</p>
          </div>
        </div>
      </div>

      {/* 底部下载按钮 */}
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-gray-900/95 backdrop-blur-md border-t border-gray-800">
        <Button className="w-full bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400">
          <Download className="h-4 w-4 mr-2" />
          下载海报
        </Button>
      </div>
    </div>
  )
}
