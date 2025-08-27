"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { ArrowLeft, Calendar, Clock, MapPin, Trophy, Users, Award, Share2 } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent } from "@/components/ui/card"

export default function CompetitionDetail({ params }) {
  const router = useRouter()
  const { id } = params
  const [isLoading, setIsLoading] = useState(true)
  const [competition, setCompetition] = useState(null)

  // 模拟加载竞赛数据
  useEffect(() => {
    const timer = setTimeout(() => {
      // 模拟竞赛数据
      const mockCompetition = {
        id,
        title: "全国无人机创新应用大赛",
        description: "面向全国无人机爱好者和专业人士的创新应用大赛，旨在发掘无人机技术的创新应用，推动低空经济发展。",
        image: "/images/exam-2.png",
        date: "2025-07-20",
        deadline: "2025-06-30",
        price: 200,
        location: "全国各省市指定场地",
        organizer: "中国航空学会",
        participants: "无人机爱好者、企业、高校团队",
        maxParticipants: 5000,
        currentParticipants: 2345,
        awards: [
          "金奖：奖金50000元，产业孵化支持",
          "银奖：奖金30000元，技术对接机会",
          "铜奖：奖金10000元，展示推广机会",
          "优秀创新奖：奖金5000元",
          "最佳应用奖：行业资源对接",
        ],
        schedule: [
          { date: "2025-06-30", event: "报名截止" },
          { date: "2025-07-20", event: "初赛（方案评审）" },
          { date: "2025-08-15", event: "复赛（实物展示）" },
          { date: "2025-09-10", event: "决赛（现场演示）" },
          { date: "2025-09-30", event: "颁奖典礼" },
        ],
        rules: [
          "参赛者可以个人或团队形式参赛，团队不超过5人",
          "参赛作品必须是原创，不得侵犯他人知识产权",
          "初赛提交创新应用方案，不少于5000字",
          "复赛需提供实物或原型演示视频",
          "决赛采用现场演示和答辩形式",
          "参赛作品必须符合国家无人机管理相关法规",
        ],
        content: `
    <h3>竞赛背景</h3>
    <p>全国无人机创新应用大赛是由中国航空学会主办的全国性无人机技术应用竞赛，旨在推动无人机技术在各行业的创新应用，促进低空经济发展。</p>
    
    <h3>竞赛目的</h3>
    <p>发掘无人机技术的创新应用场景，培养无人机应用创新人才，推动无人机产业与各行业深度融合，加速低空经济生态建设。</p>
    
    <h3>参赛对象</h3>
    <p>全国无人机爱好者、企业团队、高校师生，分为个人组、企业组和高校组。</p>
    
    <h3>竞赛内容</h3>
    <p>竞赛内容涵盖无人机在农业、测绘、物流、安防、应急救援等领域的创新应用，重点考察参赛者的创新思维、技术实现能力和商业化潜力。</p>
    
    <h3>评分标准</h3>
    <p>评分采用百分制，从创新性（30%）、技术可行性（25%）、应用价值（25%）、展示效果（10%）和团队能力（10%）五个维度进行综合评分。</p>
  `,
        faqs: [
          {
            question: "如何报名参加竞赛？",
            answer: "可以通过本平台在线报名，填写报名表并提交参赛方案。",
          },
          {
            question: "参赛是否需要自备无人机？",
            answer: "是的，参赛者需要自备参赛所需的无人机设备和相关配件。",
          },
          {
            question: "获奖项目是否有产业化机会？",
            answer: "是的，金奖和银奖项目将获得产业对接机会，有机会获得风险投资和孵化支持。",
          },
          {
            question: "竞赛有团队人数限制吗？",
            answer: "团队参赛人数不超过5人，可以跨单位组队。",
          },
          {
            question: "参赛作品的知识产权归属？",
            answer: "参赛作品的知识产权归参赛者所有，但主办方有权进行宣传推广。",
          },
        ],
      }

      setCompetition(mockCompetition)
      setIsLoading(false)
    }, 1000)

    return () => clearTimeout(timer)
  }, [id])

  // 处理报名按钮点击
  const handleRegister = () => {
    router.push(`/competitions/${id}/registration`)
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-black text-white p-4">
        <div className="sticky top-0 left-0 right-0 h-14 flex items-center px-4 bg-gray-900/80 backdrop-blur-md border-b border-gray-800 z-10 mb-6">
          <Link href="/" className="flex items-center text-gray-300">
            <ArrowLeft className="h-5 w-5 mr-2" />
            <span>返回</span>
          </Link>
          <h1 className="flex-1 text-center text-lg font-semibold text-white">赛事详情</h1>
        </div>

        <div className="flex flex-col items-center justify-center py-12">
          <div className="animate-spin h-8 w-8 border-2 border-blue-500 rounded-full border-t-transparent"></div>
          <p className="mt-4 text-gray-400">正在加载赛事信息...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-black text-white">
      {/* 顶部导航栏 */}
      <div className="sticky top-0 left-0 right-0 h-14 flex items-center px-4 bg-gray-900/80 backdrop-blur-md border-b border-gray-800 z-10">
        <Link href="/" className="flex items-center text-gray-300">
          <ArrowLeft className="h-5 w-5 mr-2" />
          <span>返回</span>
        </Link>
        <h1 className="flex-1 text-center text-lg font-semibold text-white">赛事详情</h1>
        <Button variant="ghost" size="icon">
          <Share2 className="h-5 w-5 text-gray-300" />
        </Button>
      </div>

      {/* 赛事封面 */}
      <div className="relative w-full h-60">
        <Image src={competition.image || "/placeholder.svg"} alt={competition.title} fill className="object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent"></div>
        <div className="absolute bottom-0 left-0 right-0 p-6">
          <Badge className="bg-purple-100 text-purple-800 mb-2">
            <Trophy className="h-4 w-4 mr-1" />
            竞赛活动
          </Badge>
          <h1 className="text-2xl font-bold text-white mb-1">{competition.title}</h1>
          <p className="text-sm text-gray-300">{competition.description}</p>
        </div>
      </div>

      {/* 赛事信息卡片 */}
      <div className="p-4">
        <Card className="bg-gray-900 border-gray-800 text-white mb-6">
          <CardContent className="p-4 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center text-gray-300">
                <Calendar className="h-5 w-5 mr-2 text-blue-400" />
                <span>比赛日期: {competition.date}</span>
              </div>
              <Badge variant="outline" className="bg-blue-900/30 text-blue-400 border-blue-500/30">
                {competition.organizer}
              </Badge>
            </div>

            <div className="flex items-center text-gray-300">
              <Clock className="h-5 w-5 mr-2 text-red-400" />
              <span>报名截止: {competition.deadline}</span>
            </div>

            <div className="flex items-center text-gray-300">
              <MapPin className="h-5 w-5 mr-2 text-green-400" />
              <span>比赛地点: {competition.location}</span>
            </div>

            <div className="flex items-center text-gray-300">
              <Users className="h-5 w-5 mr-2 text-yellow-400" />
              <span>参赛对象: {competition.participants}</span>
            </div>

            <div className="flex justify-between items-center mt-4 pt-4 border-t border-gray-800">
              <div>
                <p className="text-sm text-gray-400">报名费用</p>
                <p className="text-xl font-semibold text-white">
                  {competition.price > 0 ? `¥${competition.price}` : "免费"}
                </p>
              </div>

              <div>
                <p className="text-sm text-gray-400">已报名/总名额</p>
                <p className="text-right">
                  <span className="text-blue-400 font-semibold">{competition.currentParticipants}</span>
                  <span className="text-gray-400">/{competition.maxParticipants}</span>
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* 赛事详情标签页 */}
        <Tabs defaultValue="details" className="w-full">
          <TabsList className="grid w-full grid-cols-4 bg-gray-900 mb-6">
            <TabsTrigger value="details">详情</TabsTrigger>
            <TabsTrigger value="schedule">日程</TabsTrigger>
            <TabsTrigger value="awards">奖项</TabsTrigger>
            <TabsTrigger value="faqs">问答</TabsTrigger>
          </TabsList>

          <TabsContent value="details" className="space-y-4">
            <div className="bg-gray-900 border border-gray-800 rounded-lg p-4">
              <h2 className="text-lg font-semibold mb-4 flex items-center">
                <span className="w-1 h-5 bg-blue-500 rounded mr-2"></span>
                赛事规则
              </h2>
              <ul className="space-y-2 text-gray-300">
                {competition.rules.map((rule, index) => (
                  <li key={index} className="flex items-start">
                    <span className="inline-flex items-center justify-center bg-blue-900/50 text-blue-400 rounded-full h-5 w-5 text-xs mr-2 mt-0.5">
                      {index + 1}
                    </span>
                    <span>{rule}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-gray-900 border border-gray-800 rounded-lg p-4">
              <h2 className="text-lg font-semibold mb-4 flex items-center">
                <span className="w-1 h-5 bg-blue-500 rounded mr-2"></span>
                赛事详情
              </h2>
              <div className="text-gray-300 space-y-4" dangerouslySetInnerHTML={{ __html: competition.content }} />
            </div>
          </TabsContent>

          <TabsContent value="schedule" className="space-y-4">
            <div className="bg-gray-900 border border-gray-800 rounded-lg p-4">
              <h2 className="text-lg font-semibold mb-4 flex items-center">
                <span className="w-1 h-5 bg-blue-500 rounded mr-2"></span>
                赛事日程
              </h2>
              <div className="relative">
                <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-gray-700"></div>
                <ul className="space-y-6">
                  {competition.schedule.map((item, index) => (
                    <li key={index} className="relative pl-10">
                      <div className="absolute left-0 top-1 h-6 w-6 rounded-full bg-blue-900 border-4 border-gray-900 flex items-center justify-center">
                        <span className="text-xs text-blue-400">{index + 1}</span>
                      </div>
                      <div className="bg-gray-800 rounded-lg p-3">
                        <p className="text-blue-400 font-medium">{item.date}</p>
                        <p className="text-white">{item.event}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="awards" className="space-y-4">
            <div className="bg-gray-900 border border-gray-800 rounded-lg p-4">
              <h2 className="text-lg font-semibold mb-4 flex items-center">
                <span className="w-1 h-5 bg-blue-500 rounded mr-2"></span>
                奖项设置
              </h2>
              <ul className="space-y-4">
                {competition.awards.map((award, index) => (
                  <li key={index} className="flex items-start">
                    <div className="mr-3 mt-1">
                      <Award
                        className={`h-6 w-6 ${
                          index === 0
                            ? "text-yellow-400"
                            : index === 1
                              ? "text-gray-300"
                              : index === 2
                                ? "text-amber-600"
                                : "text-blue-400"
                        }`}
                      />
                    </div>
                    <div>
                      <p className="text-white">{award}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </TabsContent>

          <TabsContent value="faqs" className="space-y-4">
            <div className="bg-gray-900 border border-gray-800 rounded-lg p-4">
              <h2 className="text-lg font-semibold mb-4 flex items-center">
                <span className="w-1 h-5 bg-blue-500 rounded mr-2"></span>
                常见问题
              </h2>
              <div className="space-y-4">
                {competition.faqs.map((faq, index) => (
                  <div key={index} className="bg-gray-800 rounded-lg p-4">
                    <h3 className="text-blue-400 font-medium mb-2">Q: {faq.question}</h3>
                    <p className="text-gray-300">A: {faq.answer}</p>
                  </div>
                ))}
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>

      {/* 底部报名按钮 */}
      <div className="fixed bottom-0 left-0 right-0 bg-gray-900/80 backdrop-blur-md border-t border-gray-800 p-4">
        <div className="container mx-auto flex justify-between items-center">
          <div className="text-white">
            <p className="text-sm text-gray-400">报名费用</p>
            <span className="text-lg font-semibold">{competition.price > 0 ? `¥${competition.price}` : "免费"}</span>
          </div>
          <Button size="lg" onClick={handleRegister}>
            立即报名
          </Button>
        </div>
      </div>
    </div>
  )
}
