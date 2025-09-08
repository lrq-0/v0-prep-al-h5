"use client"

import { ArrowLeft, Calendar, Clock, MapPin, Trophy, Users, MessageSquare, MessageCircle } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { useRouter, useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

// 赛事介绍页面
export default function CompetitionIntro({ params }: { params: { id: string } }) {
  const router = useRouter()
  const searchParams = useSearchParams()

  const returnUrl = searchParams.get("returnUrl") || "/"

  // 模拟赛事数据
  const competition = {
    id: params.id,
    title: "全国无人机创新应用大赛",
    description:
      "全国无人机创新应用大赛是面向无人机爱好者和专业人士的高水平创新竞赛，旨在发掘无人机技术的创新应用，推动低空经济发展。",
    image: "/images/exam-2.png",
    organizer: "中国航空学会",
    location: "线上初审 + 各省市指定场地",
    registrationDeadline: "2025-06-30",
    competitionDate: "2025-07-20",
    participants: 5000,
    price: 200,
    tags: ["国家级", "创新应用", "产业对接"],
    awards: [
      { name: "金奖", count: 10, description: "奖金50000元，产业孵化支持" },
      { name: "银奖", count: 20, description: "奖金30000元，技术对接机会" },
      { name: "铜奖", count: 50, description: "奖金10000元，展示推广机会" },
      { name: "优秀创新奖", count: 100, description: "奖金5000元" },
    ],
    schedule: [
      { stage: "报名阶段", time: "2025-05-01 至 2025-06-30", status: "进行中" },
      { stage: "初赛（方案评审）", time: "2025-07-20", status: "未开始" },
      { stage: "复赛（实物展示）", time: "2025-08-15", status: "未开始" },
      { stage: "决赛（现场演示）", time: "2025-09-10", status: "未开始" },
      { stage: "颁奖典礼", time: "2025-09-30", status: "未开始" },
    ],
    rules: [
      "参赛者可以个人或团队形式参赛，团队不超过5人",
      "参赛作品必须是原创，不得侵犯他人知识产权",
      "初赛提交创新应用方案，不少于5000字",
      "复赛需提供实物或原型演示视频",
      "决赛采用现场演示和答辩形式",
      "参赛作品必须符合国家无人机管理相关法规",
    ],
  }

  // 注册赛事
  const registerCompetition = () => {
    router.push(`/competitions/${params.id}/registration`)
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* 顶部导航栏 */}
      <div className="sticky top-0 left-0 right-0 h-14 flex items-center px-4 bg-card/80 backdrop-blur-md border-b border-border z-10">
        <Link href={returnUrl} className="flex items-center text-muted-foreground">
          <ArrowLeft className="h-5 w-5 mr-2" />
          <span>返回</span>
        </Link>
        <h1 className="flex-1 text-center text-lg font-semibold text-foreground">赛事详情</h1>
      </div>

      {/* 赛事封面 */}
      <div className="relative w-full h-48">
        <Image src={competition.image || "/placeholder.svg"} alt={competition.title} fill className="object-cover" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/90 flex flex-col justify-end p-4">
          <div className="flex flex-wrap gap-1 mb-2">
            {competition.tags.map((tag, index) => (
              <Badge key={index} variant="secondary" className="bg-purple-900/60 text-purple-300 border-purple-700/50">
                {tag}
              </Badge>
            ))}
          </div>
          <h1 className="text-xl font-bold text-white mb-1">{competition.title}</h1>
          <p className="text-sm text-gray-300">主办方：{competition.organizer}</p>
        </div>
      </div>

      {/* 赛事AI助手 */}
      <div className="mx-4 mt-4 mb-2 p-3 bg-card/60 border border-border rounded-lg">
        <div className="flex items-center">
          <div className="w-8 h-8 rounded-full bg-purple-600 flex items-center justify-center mr-3 flex-shrink-0">
            <MessageSquare className="h-4 w-4 text-white" />
          </div>
          <div className="flex-1">
            <div className="flex items-center justify-between">
              <h3 className="font-medium text-foreground">赛事助手</h3>
              <Button
                onClick={() =>
                  router.push(
                    `/ai-chat/competition-assistant?competitionId=${params.id}&returnUrl=/competitions/${params.id}/intro`,
                  )
                }
                variant="ghost"
                size="sm"
                className="h-8 text-xs text-purple-400 hover:bg-purple-500/10"
              >
                <MessageCircle className="h-3.5 w-3.5 mr-1" />
                咨询
              </Button>
            </div>
            <p className="text-xs text-muted-foreground mt-0.5">有任何关于本次赛事的问题，都可以向我咨询</p>
          </div>
        </div>
      </div>

      <div className="p-4 pb-24">
        {/* 赛事信息 */}
        <div className="grid grid-cols-2 gap-3 mb-6">
          <div className="p-3 bg-card border border-border rounded-lg">
            <div className="flex items-center mb-1">
              <Calendar className="h-4 w-4 text-purple-400 mr-1" />
              <div className="text-xs text-muted-foreground">比赛日期</div>
            </div>
            <div className="text-sm font-medium text-foreground">{competition.competitionDate}</div>
          </div>
          <div className="p-3 bg-card border border-border rounded-lg">
            <div className="flex items-center mb-1">
              <Clock className="h-4 w-4 text-red-400 mr-1" />
              <div className="text-xs text-muted-foreground">报名截止</div>
            </div>
            <div className="text-sm font-medium text-foreground">{competition.registrationDeadline}</div>
          </div>
          <div className="p-3 bg-card border border-border rounded-lg">
            <div className="flex items-center mb-1">
              <MapPin className="h-4 w-4 text-green-400 mr-1" />
              <div className="text-xs text-muted-foreground">比赛地点</div>
            </div>
            <div className="text-sm font-medium text-foreground">{competition.location}</div>
          </div>
          <div className="p-3 bg-card border border-border rounded-lg">
            <div className="flex items-center mb-1">
              <Users className="h-4 w-4 text-blue-400 mr-1" />
              <div className="text-xs text-muted-foreground">参赛人数</div>
            </div>
            <div className="text-sm font-medium text-foreground">{competition.participants}+</div>
          </div>
        </div>

        {/* 赛事描述 */}
        <div className="mb-6">
          <h2 className="text-lg font-semibold text-foreground mb-3">赛事介绍</h2>
          <div className="p-4 bg-card border border-border rounded-lg">
            <p className="text-sm text-muted-foreground leading-relaxed">{competition.description}</p>
          </div>
        </div>

        {/* 赛事流程 */}
        <div className="mb-6">
          <h2 className="text-lg font-semibold text-foreground mb-3">赛事流程</h2>
          <div className="p-4 bg-card border border-border rounded-lg">
            <div className="relative">
              {competition.schedule.map((stage, index) => (
                <div key={index} className="flex mb-4 last:mb-0">
                  <div className="mr-3 relative">
                    <div
                      className={`w-6 h-6 rounded-full flex items-center justify-center z-10 relative ${
                        stage.status === "进行中"
                          ? "bg-purple-600 text-white"
                          : stage.status === "已完成"
                            ? "bg-green-600 text-white"
                            : "bg-muted text-muted-foreground"
                      }`}
                    >
                      {index + 1}
                    </div>
                    {index < competition.schedule.length - 1 && (
                      <div className="absolute top-6 bottom-0 left-1/2 w-0.5 -translate-x-1/2 bg-border"></div>
                    )}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <div className="font-medium text-foreground">{stage.stage}</div>
                      <div
                        className={`text-xs px-2 py-0.5 rounded-full ${
                          stage.status === "进行中"
                            ? "bg-purple-900/30 text-purple-400 border border-purple-500/30"
                            : stage.status === "已完成"
                              ? "bg-green-900/30 text-green-400 border border-green-500/30"
                              : "bg-muted text-muted-foreground border border-border"
                        }`}
                      >
                        {stage.status}
                      </div>
                    </div>
                    <div className="text-sm text-muted-foreground">{stage.time}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* 奖项设置 */}
        <div className="mb-6">
          <h2 className="text-lg font-semibold text-foreground mb-3">奖项设置</h2>
          <div className="space-y-3">
            {competition.awards.map((award, index) => (
              <div key={index} className="p-3 bg-card border border-border rounded-lg">
                <div className="flex items-center justify-between mb-1">
                  <div className="flex items-center">
                    <Trophy
                      className={`h-5 w-5 mr-2 ${
                        index === 0
                          ? "text-yellow-400"
                          : index === 1
                            ? "text-gray-400"
                            : index === 2
                              ? "text-amber-600"
                              : "text-blue-400"
                      }`}
                    />
                    <div className="font-medium text-foreground">{award.name}</div>
                  </div>
                  <div className="text-sm text-muted-foreground">{award.count}名</div>
                </div>
                <p className="text-sm text-muted-foreground pl-7">{award.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* 比赛规则 */}
        <div className="mb-6">
          <h2 className="text-lg font-semibold text-foreground mb-3">比赛规则</h2>
          <div className="p-4 bg-card border border-border rounded-lg">
            <ul className="space-y-2">
              {competition.rules.map((rule, index) => (
                <li key={index} className="flex items-start">
                  <span className="inline-block w-1.5 h-1.5 rounded-full bg-purple-400 mt-1.5 mr-2"></span>
                  <span className="text-sm text-muted-foreground">{rule}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* 底部报名按钮 */}
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-card/95 backdrop-blur-md border-t border-border">
        <div className="flex justify-between items-center mb-2">
          <div>
            <div className="text-xs text-muted-foreground">报名费用</div>
            {competition.price > 0 ? (
              <div className="text-lg font-bold text-foreground">¥{competition.price}</div>
            ) : (
              <div className="text-lg font-bold text-green-400">免费</div>
            )}
          </div>
          <div className="text-xs text-muted-foreground">
            报名截止：<span className="text-red-400">{competition.registrationDeadline}</span>
          </div>
        </div>
        <Button
          onClick={registerCompetition}
          className="w-full bg-gradient-to-r from-purple-600 to-purple-500 hover:from-purple-500 hover:to-purple-400 text-white"
        >
          立即报名
        </Button>
      </div>
    </div>
  )
}
