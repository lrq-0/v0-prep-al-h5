import { ArrowLeft, CreditCard, AlertCircle, Check } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"

// 课程支付页面
export default function PurchaseCourse({ params }: { params: { id: string } }) {
  // 模拟课程数据
  const course = {
    id: params.id,
    title: "高考英语词汇精讲",
    instructor: "王老师",
    duration: "24课时",
    price: 299,
    originalPrice: 399,
    discount: 100,
    image: "/images/course-1.png",
  }

  return (
    <div className="min-h-screen bg-black text-white">
      {/* 顶部导航栏 */}
      <div className="sticky top-0 left-0 right-0 h-14 flex items-center px-4 bg-gray-900/80 backdrop-blur-md border-b border-gray-800 z-10">
        <Link href={`/courses/${course.id}`} className="flex items-center text-gray-300">
          <ArrowLeft className="h-5 w-5 mr-2" />
          <span>返回</span>
        </Link>
        <h1 className="flex-1 text-center text-lg font-semibold text-white">确认订单</h1>
      </div>

      <div className="p-4 pb-24">
        {/* 课程信息 */}
        <div className="mb-6">
          <div className="flex items-start mb-4">
            <div className="relative w-20 h-14 mr-3 rounded-md overflow-hidden">
              <Image src={course.image || "/placeholder.svg"} alt={course.title} fill className="object-cover" />
            </div>
            <div>
              <h3 className="font-medium text-white mb-1">{course.title}</h3>
              <p className="text-xs text-gray-400">
                {course.instructor} · {course.duration}
              </p>
            </div>
          </div>
          <div className="p-3 bg-blue-900/20 border border-blue-500/30 rounded-lg">
            <div className="text-blue-400 text-sm mb-1">购买此课程，您将获得：</div>
            <div className="text-xs text-gray-300 space-y-1">
              <div className="flex items-center">
                <Check className="h-3 w-3 text-blue-400 mr-1" />
                <span>所有24节课程的完整访问权限</span>
              </div>
              <div className="flex items-center">
                <Check className="h-3 w-3 text-blue-400 mr-1" />
                <span>课程配套资料的下载权限</span>
              </div>
              <div className="flex items-center">
                <Check className="h-3 w-3 text-blue-400 mr-1" />
                <span>课后作业批改与反馈</span>
              </div>
              <div className="flex items-center">
                <Check className="h-3 w-3 text-blue-400 mr-1" />
                <span>永久观看权限，不限时间</span>
              </div>
            </div>
          </div>
        </div>

        {/* 价格明细 */}
        <div className="mb-6">
          <h3 className="font-medium text-white mb-3">价格明细</h3>
          <div className="space-y-2 mb-3">
            <div className="flex justify-between">
              <span className="text-gray-300">课程原价</span>
              <span className="text-gray-300">¥{course.originalPrice}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-blue-400">限时优惠</span>
              <span className="text-blue-400">-¥{course.discount}</span>
            </div>
          </div>
          <div className="flex justify-between pt-2 border-t border-gray-800">
            <span className="font-medium text-white">实付金额</span>
            <span className="font-medium text-red-400">¥{course.price}</span>
          </div>
        </div>

        {/* 支付方式 */}
        <div className="mb-6">
          <h3 className="font-medium text-white mb-3">选择支付方式</h3>
          <RadioGroup defaultValue="wechat">
            <div className="flex items-center space-x-2 p-3 bg-gray-900 border border-gray-800 rounded-lg mb-3">
              <RadioGroupItem value="wechat" id="wechat" />
              <Label htmlFor="wechat" className="flex-1">
                <div className="flex items-center">
                  <div className="w-8 h-8 rounded-md bg-green-500 flex items-center justify-center mr-2">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path
                        d="M9.5 8.5C9.5 9.33 8.83 10 8 10S6.5 9.33 6.5 8.5 7.17 7 8 7 9.5 7.67 9.5 8.5Z"
                        fill="white"
                      />
                      <path
                        d="M17.5 8.5C17.5 9.33 16.83 10 16 10S14.5 9.33 14.5 8.5 15.17 7 16 7 17.5 7.67 17.5 8.5Z"
                        fill="white"
                      />
                      <path d="M16 13H8C6.34 13 5 14.34 5 16V17H19V16C19 14.34 17.66 13 16 13Z" fill="white" />
                      <path
                        d="M9.5 15.5C9.5 16.33 8.83 17 8 17S6.5 16.33 6.5 15.5 7.17 14 8 14 9.5 14.67 9.5 15.5Z"
                        fill="white"
                      />
                      <path
                        d="M17.5 15.5C17.5 16.33 16.83 17 16 17S14.5 16.33 14.5 15.5 15.17 14 16 14 17.5 14.67 17.5 15.5Z"
                        fill="white"
                      />
                    </svg>
                  </div>
                  <span>微信支付</span>
                </div>
              </Label>
            </div>
            <div className="flex items-center space-x-2 p-3 bg-gray-900 border border-gray-800 rounded-lg">
              <RadioGroupItem value="alipay" id="alipay" />
              <Label htmlFor="alipay" className="flex-1">
                <div className="flex items-center">
                  <div className="w-8 h-8 rounded-md bg-blue-500 flex items-center justify-center mr-2">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path
                        d="M19 6V18C19 19.1 18.1 20 17 20H7C5.9 20 5 19.1 5 18V6C5 4.9 5.9 4 7 4H17C18.1 4 19 4.9 19 6Z"
                        fill="white"
                      />
                      <path d="M12 17.5C14.76 17.5 17 15.26 17 12.5H7C7 15.26 9.24 17.5 12 17.5Z" fill="#2196F3" />
                      <path d="M12 6.5C9.24 6.5 7 8.74 7 11.5H17C17 8.74 14.76 6.5 12 6.5Z" fill="#2196F3" />
                    </svg>
                  </div>
                  <span>支付宝</span>
                </div>
              </Label>
            </div>
          </RadioGroup>
        </div>

        {/* 用户协议 */}
        <div className="p-3 bg-gray-900/50 border border-gray-800 rounded-lg mb-6">
          <div className="flex items-start">
            <AlertCircle className="h-4 w-4 text-gray-400 mr-2 mt-0.5" />
            <p className="text-xs text-gray-400">
              点击"确认支付"，即表示您同意 Prep AI 的
              <Link href="#" className="text-blue-400">
                《用户服务协议》
              </Link>
              和
              <Link href="#" className="text-blue-400">
                《隐私政策》
              </Link>
            </p>
          </div>
        </div>
      </div>

      {/* 底部支付按钮 */}
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-gray-900/95 backdrop-blur-md border-t border-gray-800">
        <div className="flex justify-between items-center mb-2">
          <span className="text-gray-300">实付金额：</span>
          <span className="text-xl font-bold text-red-400">¥{course.price}</span>
        </div>
        <Button className="w-full bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400">
          <CreditCard className="h-4 w-4 mr-2" />
          确认支付
        </Button>
      </div>
    </div>
  )
}
