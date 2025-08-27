import { ArrowLeft, Download, Share2 } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"

export default function Certificate({ params }: { params: { id: string } }) {
  // 模拟证书数据
  const certificates = {
    "1": {
      id: 1,
      title: "英语四级证书",
      name: "张同学",
      date: "2023年6月15日",
      score: 562,
      level: "优秀",
      issuer: "教育部考试中心",
      serialNumber: "CET4-2023-123456",
      image: "/images/certificate-1.png",
    },
    "2": {
      id: 2,
      title: "数学竞赛二等奖",
      name: "张同学",
      date: "2023年9月20日",
      score: null,
      level: "省级",
      issuer: "省教育厅",
      serialNumber: "MATH-2023-789012",
      image: "/images/certificate-2.png",
    },
    "3": {
      id: 3,
      title: "计算机等级考试二级",
      name: "张同学",
      date: "2023年11月5日",
      score: 85,
      level: "良好",
      issuer: "教育部考试中心",
      serialNumber: "NCRE-2023-345678",
      image: "/images/certificate-3.png",
    },
  }

  const certificate = certificates[params.id] || certificates["1"]

  return (
    <div className="min-h-screen bg-black text-white">
      {/* 顶部导航栏 */}
      <div className="sticky top-0 left-0 right-0 h-14 flex items-center px-4 bg-gray-900/80 backdrop-blur-md border-b border-gray-800 z-10">
        <Link href="/" className="flex items-center text-gray-300">
          <ArrowLeft className="h-5 w-5 mr-2" />
          <span>返回</span>
        </Link>
        <h1 className="flex-1 text-center text-lg font-semibold text-white">电子证书</h1>
        <button className="text-gray-300">
          <Share2 className="h-5 w-5" />
        </button>
      </div>

      <div className="p-4 pb-20">
        {/* 证书展示 */}
        <div className="relative w-full aspect-[3/4] mb-6 overflow-hidden rounded-lg border border-gray-700">
          <div className="absolute inset-0 bg-gradient-to-b from-blue-900/20 to-gray-900/20"></div>
          <div className="absolute inset-0 flex flex-col items-center p-6 text-center">
            <div className="w-20 h-20 mb-4">
              <Image src="/images/ai-assistant-1.png" alt="Logo" width={80} height={80} className="object-contain" />
            </div>
            <h2 className="text-2xl font-bold text-amber-400 mb-2">证书</h2>
            <h3 className="text-xl font-semibold text-white mb-6">{certificate.title}</h3>

            <p className="text-gray-300 mb-6">兹证明</p>

            <div className="text-2xl font-bold text-white mb-6">{certificate.name}</div>

            {certificate.score && (
              <p className="text-gray-300 mb-4">
                成绩：<span className="text-amber-400 font-semibold">{certificate.score}分</span>
              </p>
            )}

            <p className="text-gray-300 mb-4">
              等级：<span className="text-amber-400 font-semibold">{certificate.level}</span>
            </p>

            <p className="text-gray-300 mb-8">颁发日期：{certificate.date}</p>

            <div className="mt-auto">
              <p className="text-gray-400 mb-2">颁发机构</p>
              <p className="text-white font-semibold mb-4">{certificate.issuer}</p>
              <p className="text-xs text-gray-500">证书编号：{certificate.serialNumber}</p>
            </div>
          </div>
        </div>

        {/* 证书信息 */}
        <div className="p-4 bg-gray-900 border border-gray-800 rounded-lg mb-6">
          <h3 className="font-medium text-white mb-3">证书信息</h3>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-400">证书名称</span>
              <span className="text-white">{certificate.title}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">获得者</span>
              <span className="text-white">{certificate.name}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">颁发日期</span>
              <span className="text-white">{certificate.date}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">颁发机构</span>
              <span className="text-white">{certificate.issuer}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">证书编号</span>
              <span className="text-white">{certificate.serialNumber}</span>
            </div>
            {certificate.score && (
              <div className="flex justify-between">
                <span className="text-gray-400">成绩</span>
                <span className="text-white">{certificate.score}分</span>
              </div>
            )}
            <div className="flex justify-between">
              <span className="text-gray-400">等级</span>
              <span className="text-white">{certificate.level}</span>
            </div>
          </div>
        </div>

        {/* 证书说明 */}
        <div className="p-4 bg-gray-900 border border-gray-800 rounded-lg mb-6">
          <h3 className="font-medium text-white mb-3">证书说明</h3>
          <p className="text-sm text-gray-300">
            本证书采用区块链技术加密存储，不可篡改，可永久验证。您可以通过扫描证书上的二维码或访问证书验证页面，输入证书编号进行在线验证。
          </p>
        </div>
      </div>

      {/* 底部下载按钮 */}
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-gray-900/95 backdrop-blur-md border-t border-gray-800">
        <Button className="w-full bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400">
          <Download className="h-4 w-4 mr-2" />
          下载证书
        </Button>
      </div>
    </div>
  )
}
