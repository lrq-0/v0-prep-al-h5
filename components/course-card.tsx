interface CourseCardProps {
  title: string
  level: string
  rating: number
  reviewCount: number
  subscriberCount: number
  currentPrice: number
  originalPrice: number
  imageUrl: string
}

export function CourseCard({
  title,
  level,
  rating,
  reviewCount,
  subscriberCount,
  currentPrice,
  originalPrice,
  imageUrl,
}: CourseCardProps) {
  return (
    <div className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden">
      {/* 图片 */}
      <img src={imageUrl || "/placeholder.svg"} alt="课程封面" className="w-full h-40 object-cover" />

      {/* 内容 */}
      <div className="p-5">
        {/* 标题 + 标签 */}
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
          <span className="text-xs bg-green-100 text-green-600 px-2 py-1 rounded-lg">{level}</span>
        </div>

        {/* 评分 + 学员数 */}
        <div className="flex items-center text-sm text-gray-500 mb-3">
          ⭐ {rating} ({reviewCount}) · 👤 {subscriberCount}人已订阅
        </div>

        {/* 价格 */}
        <div className="text-lg font-bold text-green-600 mb-4">
          ¥{currentPrice} <span className="line-through text-gray-400 ml-2">¥{originalPrice}</span>
        </div>

        {/* 按钮 */}
        <div className="flex gap-3">
          <button className="flex-1 bg-green-600 text-white py-2 rounded-lg font-medium hover:bg-green-700 transition">
            立即购买
          </button>
          <button className="flex-1 border border-gray-300 text-gray-700 py-2 rounded-lg font-medium hover:bg-gray-100 transition">
            查看详情
          </button>
        </div>
      </div>
    </div>
  )
}
