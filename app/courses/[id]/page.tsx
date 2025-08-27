import { ArrowLeft, Clock, Users, Share2 } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { MessageCircle } from "lucide-react"

// 课程详情页 - 未购买的课程
export default function CourseDetail({ params }: { params: { id: string } }) {
  // 电商、短视频、自媒体相关课程数据
  const coursesData = {
    "1": {
      id: "1",
      title: "电商运营从入门到精通",
      instructor: "王明远 | 资深电商运营总监",
      duration: "36课时",
      price: "¥2999",
      originalPrice: "¥3599",
      image: "/placeholder-fe69z.png",
      purchaseCount: 1458,
      purchased: false,
      description:
        "本课程系统讲解电商运营核心知识，涵盖选品、定价、店铺装修、流量获取、转化提升、客户管理等全方位内容。通过实际案例分析和操作演示，帮助学员掌握淘宝、天猫、京东、拼多多等主流平台的运营技巧，从零基础成长为电商运营专家。",
      instructorInfo: {
        name: "王明远",
        title: "资深电商运营总监 | 多平台店铺操盘手",
        avatar: "/images/user-avatar.png",
        experience:
          "10年电商运营经验，曾负责年销售额过亿的淘宝、京东店铺运营，擅长全渠道电商策略规划和执行。培训学员超过5000人，多家企业电商转型顾问。",
      },
      outlines: [
        { id: 1, title: "电商行业概述与平台选择", duration: "45分钟", free: true },
        { id: 2, title: "店铺定位与产品选品策略", duration: "90分钟", free: false },
        { id: 3, title: "店铺视觉设计与装修技巧", duration: "120分钟", free: false },
        { id: 4, title: "商品详情页优化与转化提升", duration: "90分钟", free: false },
        { id: 5, title: "平台内流量获取与运营玩法", duration: "150分钟", free: false },
        { id: 6, title: "直通车推广与精准投放", duration: "120分钟", free: false },
      ],
    },
    "2": {
      id: "2",
      title: "抖音短视频带货实战训练营",
      instructor: "李博文 | 抖音百万粉丝带货达人",
      duration: "24课时",
      price: "¥3599",
      originalPrice: "¥3999",
      image: "/placeholder-r15ml.png",
      purchaseCount: 926,
      purchased: false,
      description:
        "本课程专注于抖音短视频电商带货技能培训，从账号定位、内容策划到带货话术、橱窗搭建，全方位提升短视频带货能力。通过系统学习抖音算法规则、爆款视频拍摄技巧和直播带货技巧，帮助学员快速掌握短视频带货核心方法，实现从0到1的变现突破。",
      instructorInfo: {
        name: "李博文",
        title: "抖音百万粉丝带货达人 | 短视频培训专家",
        avatar: "/images/user-avatar.png",
        experience:
          "抖音平台粉丝超120万，单场直播带货最高记录300万，曾帮助多个品牌通过短视频实现百万级销售额。连续两年获得抖音电商带货优质创作者奖项。",
      },
      outlines: [
        { id: 1, title: "抖音电商生态与账号定位", duration: "60分钟", free: true },
        { id: 2, title: "抖音算法规则与内容偏好", duration: "90分钟", free: false },
        { id: 3, title: "爆款短视频内容策划与脚本", duration: "120分钟", free: false },
        { id: 4, title: "短视频拍摄技巧与设备选择", duration: "90分钟", free: false },
        { id: 5, title: "视频剪辑与特效制作教程", duration: "150分钟", free: false },
        { id: 6, title: "抖音橱窗搭建与商品选择", duration: "120分钟", free: false },
      ],
    },
    "3": {
      id: "3",
      title: "小红书爆款笔记创作与引流变现",
      instructor: "张雨晴 | 小红书KOL",
      duration: "20课时",
      price: "¥2599",
      originalPrice: "¥2999",
      image: "/placeholder-yl8y6.png",
      purchaseCount: 764,
      purchased: false,
      description:
        "本课程深入讲解小红书平台运营与爆款内容创作技巧，帮助学员掌握小红书账号定位、内容策划、爆款笔记创作、种草技巧及变现方法。课程包含实操案例分析，助力学员快速掌握小红书引流与变现技能，成为专业的小红书KOL。",
      instructorInfo: {
        name: "张雨晴",
        title: "小红书百万粉丝博主 | 内容营销专家",
        avatar: "/images/user-avatar.png",
        experience:
          "小红书粉丝超80万，笔记平均收藏量10万+，多次登上小红书多个领域探索页。曾服务超过50个品牌的小红书内容营销策划，擅长美妆、护肤、生活方式等垂直领域内容创作。",
      },
      outlines: [
        { id: 1, title: "小红书平台规则与算法解析", duration: "60分钟", free: true },
        { id: 2, title: "账号定位与人设打造", duration: "90分钟", free: false },
        { id: 3, title: "爆款选题方法与内容规划", duration: "120分钟", free: false },
        { id: 4, title: "高质量图文笔记创作技巧", duration: "150分钟", free: false },
        { id: 5, title: "小红书短视频拍摄与剪辑", duration: "120分钟", free: false },
        { id: 6, title: "种草技巧与品牌合作变现", duration: "90分钟", free: false },
      ],
    },
    "4": {
      id: "4",
      title: "直播带货话术与互动技巧实战",
      instructor: "陈星宇 | 电商直播带货教练",
      duration: "18课时",
      price: "¥1999",
      originalPrice: "¥2599",
      image: "/placeholder-454ni.png",
      purchaseCount: 582,
      purchased: false,
      description:
        "本课程专注于电商直播带货话术与互动技巧训练，系统讲解直播间流量获取、粉丝互动、产品讲解、促单转化等核心技能。通过大量实操演练和案例分析，帮助学员掌握不同平台直播带货的话术体系和互动方法，迅速提升直播间转化率。",
      instructorInfo: {
        name: "陈星宇",
        title: "电商直播带货教练 | 全平台直播策划师",
        avatar: "/images/user-avatar.png",
        experience:
          "5年直播带货经验，曾任多家MCN机构直播培训讲师，培养超过200名主播，帮助学员实现直播带货从0到百万的突破。擅长淘宝、抖音、快手等平台直播带货话术体系建立和训练。",
      },
      outlines: [
        { id: 1, title: "直播带货行业趋势与发展", duration: "60分钟", free: true },
        { id: 2, title: "主播人设定位与台风训练", duration: "90分钟", free: false },
        { id: 3, title: "直播间流量获取与粉丝维护", duration: "120分钟", free: false },
        { id: 4, title: "产品讲解与卖点挖掘技巧", duration: "150分钟", free: false },
        { id: 5, title: "促单话术与转化技巧", duration: "180分钟", free: false },
        { id: 6, title: "直播间危机处理与氛围营造", duration: "120分钟", free: false },
      ],
    },
  }

  // 根据ID获取课程信息
  const course = coursesData[params.id as keyof typeof coursesData] || coursesData["1"]

  return (
    <div className="pb-20 min-h-screen bg-black text-white">
      {/* 顶部导航栏 */}
      <div className="sticky top-0 left-0 right-0 h-14 flex items-center px-4 bg-gray-900/80 backdrop-blur-md border-b border-gray-800 z-10">
        <Link href="/#courses" className="flex items-center text-gray-300">
          <ArrowLeft className="h-5 w-5 mr-2" />
          <span>返回</span>
        </Link>
        <h1 className="flex-1 text-center text-lg font-semibold text-white">课程详情</h1>
        <button className="text-gray-300">
          <Share2 className="h-5 w-5" />
        </button>
      </div>

      {/* 课程封面 */}
      <div className="relative w-full h-48">
        <Image
          src={course.image || "/placeholder.svg?height=240&width=600&query=ecommerce+course"}
          alt={course.title}
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/90"></div>
      </div>

      {/* 课程信息 */}
      <div className="px-4 pt-2 pb-4">
        <h1 className="text-xl font-bold text-white mb-2">{course.title}</h1>
        <div className="flex items-center justify-between mb-2">
          <div className="text-sm text-gray-300">{course.instructor}</div>
          <div className="flex items-center text-xs text-gray-400">
            <Users className="h-3 w-3 mr-1" />
            <span>{course.purchaseCount}人已学</span>
          </div>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <span className="text-purple-400 text-xl font-bold">{course.price}</span>
            {course.originalPrice && (
              <span className="ml-2 text-gray-500 text-sm line-through">{course.originalPrice}</span>
            )}
          </div>
          <div className="flex items-center text-xs text-gray-400">
            <Clock className="h-3 w-3 mr-1" />
            <span>{course.duration}</span>
          </div>
        </div>
      </div>

      {/* 课程AI助手 */}
      <div className="px-4 mb-4">
        <Link href={`/ai-chat/course-assistant?courseId=${course.id}&returnUrl=/courses/${course.id}`}>
          <div className="p-3 bg-gray-900/60 border border-gray-800 rounded-lg hover:bg-gray-800/60 transition-colors">
            <div className="flex items-center">
              <div className="w-8 h-8 rounded-full bg-purple-600 flex items-center justify-center mr-3 flex-shrink-0">
                <MessageCircle className="h-4 w-4 text-white" />
              </div>
              <div className="flex-1">
                <h3 className="font-medium text-white">课程助手</h3>
                <p className="text-xs text-gray-400 mt-0.5">有关{course.title}的问题，可随时咨询</p>
              </div>
            </div>
          </div>
        </Link>
      </div>

      <div className="border-t border-gray-800"></div>

      {/* 详情标签页 */}
      <Tabs defaultValue="intro" className="w-full">
        <TabsList className="w-full grid grid-cols-3 bg-gray-900 border-b border-gray-800 rounded-none h-12">
          <TabsTrigger value="intro" className="data-[state=active]:text-purple-400">
            课程介绍
          </TabsTrigger>
          <TabsTrigger value="instructor" className="data-[state=active]:text-purple-400">
            师资介绍
          </TabsTrigger>
          <TabsTrigger value="outline" className="data-[state=active]:text-purple-400">
            课程目录
          </TabsTrigger>
        </TabsList>

        <TabsContent value="intro" className="p-4">
          <p className="text-gray-300 text-sm leading-relaxed">{course.description}</p>
        </TabsContent>

        <TabsContent value="instructor" className="p-4">
          <div className="flex items-center mb-4">
            <div className="relative w-14 h-14 mr-3 rounded-full overflow-hidden">
              <Image
                src={course.instructorInfo.avatar || "/placeholder.svg?height=100&width=100&query=business+instructor"}
                alt={course.instructorInfo.name}
                fill
                className="object-cover"
              />
            </div>
            <div>
              <h3 className="font-medium text-white">{course.instructorInfo.name}</h3>
              <p className="text-xs text-purple-400">{course.instructorInfo.title}</p>
            </div>
          </div>
          <p className="text-gray-300 text-sm leading-relaxed">{course.instructorInfo.experience}</p>
        </TabsContent>

        <TabsContent value="outline" className="p-4">
          <div className="grid gap-3">
            {course.outlines.map((item) => (
              <div key={item.id} className="p-3 bg-gray-900 border border-gray-800 rounded-lg">
                <div className="flex justify-between items-center mb-1">
                  <h3 className="font-medium text-white">{item.title}</h3>
                  {item.free && (
                    <span className="text-xs px-2 py-0.5 rounded-full bg-green-900/30 text-green-400 border border-green-500/30">
                      免费
                    </span>
                  )}
                </div>
                <div className="flex justify-between items-center">
                  <div className="text-xs text-gray-400">
                    <Clock className="h-3 w-3 inline mr-1" />
                    {item.duration}
                  </div>
                  <button className="text-xs text-purple-400">{item.free ? "免费预览" : "购买后学习"}</button>
                </div>
              </div>
            ))}
          </div>
        </TabsContent>
      </Tabs>

      {/* 底部购买按钮 */}
      <div className="fixed bottom-0 left-0 right-0 p-3 bg-gray-900/95 backdrop-blur-md border-t border-gray-800">
        <Button className="w-full bg-gradient-to-r from-purple-600 to-purple-500 hover:from-purple-500 hover:to-purple-400">
          立即购买
        </Button>
      </div>
    </div>
  )
}
