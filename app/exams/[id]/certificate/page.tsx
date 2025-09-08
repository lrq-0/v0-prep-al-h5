"use client"

import { ArrowLeft, Clock, FileText, AlertTriangle, MessageSquare, MessageCircle, Calendar, Award } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { useRouter, useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

// 证书考试介绍页面
export default function CertificateExamIntro({ params }: { params: { id: string } }) {
  const router = useRouter()
  const searchParams = useSearchParams()

  const returnUrl = searchParams.get("returnUrl") || "/"

  // 低空经济相关证书考试数据
  const certificateExams = {
    "1": {
      id: "1",
      title: "AOPA无人机驾驶员执照考试",
      description:
        "AOPA无人机驾驶员执照是中国AOPA(中国航空器拥有者及驾驶员协会)颁发的无人机操控资格证书，是从事无人机驾驶和作业的必要资质。证书分为多旋翼、固定翼、垂直起降固定翼、直升机等不同机型类别。通过考试的学员将获得由中国AOPA颁发的无人机驾驶员电子执照和实体证书。",
      image: "/images/certificate-1.png",
      date: "2025-06-15",
      deadline: "2025-05-30",
      price: 2000,
      certIssueTime: "考试合格后10个工作日内",
      examFormat: "理论考试+实操考核",
      requirements: ["年满16周岁", "具备初中及以上文化程度", "无影响无人机操控的身体缺陷", "无相关不良记录"],
      syllabus: [
        "民用无人机相关法律法规（20%）",
        "无人机系统知识（25%）",
        "飞行原理与操控（25%）",
        "空域管理与飞行规则（15%）",
        "应急处置（15%）",
      ],
      benefits: [
        "取得无人机商业飞行资质",
        "增强就业竞争力",
        "获得无人机作业项目承接资格",
        "满足法规对无人机驾驶员的资质要求",
      ],
      organizer: "中国航空器拥有者及驾驶员协会(AOPA)",
      validity: "2年，期满前3个月内申请换证",
      level: "民用无人机驾驶员",
    },
    "2": {
      id: "2",
      title: "低空空域协调员职业资格认证",
      description:
        "低空空域协调员是适应低空经济发展的新兴职业，主要负责低空空域使用规划、航路设计、飞行计划协调等工作。本认证由民航局空管局联合相关机构推出，旨在培养专业的低空空域管理人才，推动低空空域精细化管理。获得此证书将成为从事低空空域管理和协调工作的重要资质。",
      image: "/images/certificate-2.png",
      date: "2025-07-20",
      deadline: "2025-06-30",
      price: 3500,
      certIssueTime: "考试合格后15个工作日内",
      examFormat: "理论考试+案例分析+模拟演练",
      requirements: [
        "大专及以上学历",
        "具备航空、交通或相关专业背景",
        "熟悉航空法规和低空管理政策",
        "具有一定空域管理或飞行经验者优先",
      ],
      syllabus: [
        "低空空域管理法规（20%）",
        "空域结构与分类（15%）",
        "航路规划与设计（25%）",
        "飞行计划管理（20%）",
        "应急管理与协调（20%）",
      ],
      benefits: [
        "成为低空管理领域的专业人才",
        "获得低空空域管理岗位任职资格",
        "提升在航空管理领域的职业竞争力",
        "参与低空经济产业发展的前沿领域",
      ],
      organizer: "中国民航局空中交通管理局",
      validity: "3年，需定期参加继续教育",
      level: "中级",
    },
    "3": {
      id: "3",
      title: "eVTOL维护工程师资格认证",
      description:
        "eVTOL(电动垂直起降)飞行器维护工程师认证是针对低空载人飞行器维护人才的专业资格认证。本认证由中国航空维修协会联合相关机构推出，重点评估eVTOL飞行器电气系统、动力系统、结构系统的维护能力。持证人将具备eVTOL飞行器检查、维护、故障诊断与排除的专业资质。",
      image: "/images/certificate-3.png",
      date: "2025-05-10",
      deadline: "2025-04-20",
      price: 4800,
      certIssueTime: "考试合格后20个工作日内",
      examFormat: "理论考试+实操考核+口试",
      requirements: [
        "航空、机械、电气等相关专业大专及以上学历",
        "2年以上航空器或无人机维修经验",
        "具备基础电子电气知识和机械维修能力",
        "无不良从业记录",
      ],
      syllabus: [
        "eVTOL结构与系统（20%）",
        "电气系统与动力系统（25%）",
        "维护规程与标准（15%）",
        "故障诊断与排除（25%）",
        "维修安全与管理（15%）",
      ],
      benefits: [
        "获得eVTOL维护领域专业资质",
        "提升在低空载人领域的就业竞争力",
        "获得eVTOL制造商授权维修资格",
        "参与低空载人交通这一未来发展领域",
      ],
      organizer: "中国航空维修协会",
      validity: "2年，需参加年度技术更新培训",
      level: "中级/高级",
    },
  }

  // 根据ID获取当前证书考试
  const exam = certificateExams[params.id as keyof typeof certificateExams] || certificateExams["1"]

  // 报名考试
  const registerExam = () => {
    router.push(`/exams/${params.id}/registration`)
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* 顶部导航栏 */}
      <div className="sticky top-0 left-0 right-0 h-14 flex items-center px-4 bg-card/80 backdrop-blur-md border-b border-border z-10">
        <Link href={returnUrl} className="flex items-center text-muted-foreground">
          <ArrowLeft className="h-5 w-5 mr-2" />
          <span>返回</span>
        </Link>
        <h1 className="flex-1 text-center text-lg font-semibold text-foreground">证书详情</h1>
      </div>

      {/* 证书封面 */}
      <div className="relative w-full h-60">
        <Image
          src={exam.image || "/placeholder.svg?height=240&width=600&query=drone+pilot+license"}
          alt={exam.title}
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/90 flex flex-col justify-end p-4">
          <Badge variant="secondary" className="bg-green-100 text-green-800 border-green-200 self-start mb-2">
            证书考试
          </Badge>
          <h1 className="text-xl font-bold text-white mb-1">{exam.title}</h1>
          <p className="text-sm text-gray-300">主办方：{exam.organizer}</p>
        </div>
      </div>

      {/* 考试AI助手 */}
      <div className="mx-4 mt-4 mb-2 p-3 bg-card/60 border border-border rounded-lg">
        <div className="flex items-center">
          <div className="w-8 h-8 rounded-full bg-green-600 flex items-center justify-center mr-3 flex-shrink-0">
            <MessageSquare className="h-4 w-4 text-white" />
          </div>
          <div className="flex-1">
            <div className="flex items-center justify-between">
              <h3 className="font-medium text-foreground">考试助手</h3>
              <Button
                onClick={() =>
                  router.push(`/ai-chat/exam-assistant?examId=${params.id}&returnUrl=/exams/${params.id}/certificate`)
                }
                variant="ghost"
                size="sm"
                className="h-8 text-xs text-green-400 hover:bg-green-500/10"
              >
                <MessageCircle className="h-3.5 w-3.5 mr-1" />
                咨询
              </Button>
            </div>
            <p className="text-xs text-muted-foreground mt-0.5">有任何关于本次证书考试的问题，都可以向我咨询</p>
          </div>
        </div>
      </div>

      <div className="p-4 pb-24">
        {/* 考试基本信息 */}
        <div className="grid grid-cols-2 gap-3 mb-6">
          <div className="p-3 bg-card border border-border rounded-lg">
            <div className="flex items-center mb-1">
              <Calendar className="h-4 w-4 text-green-400 mr-1" />
              <div className="text-xs text-muted-foreground">考试日期</div>
            </div>
            <div className="text-sm font-medium text-foreground">{exam.date}</div>
          </div>
          <div className="p-3 bg-card border border-border rounded-lg">
            <div className="flex items-center mb-1">
              <Clock className="h-4 w-4 text-red-400 mr-1" />
              <div className="text-xs text-muted-foreground">报名截止</div>
            </div>
            <div className="text-sm font-medium text-foreground">{exam.deadline}</div>
          </div>
          <div className="p-3 bg-card border border-border rounded-lg">
            <div className="flex items-center mb-1">
              <FileText className="h-4 w-4 text-blue-400 mr-1" />
              <div className="text-xs text-muted-foreground">考试形式</div>
            </div>
            <div className="text-sm font-medium text-foreground">{exam.examFormat}</div>
          </div>
          <div className="p-3 bg-card border border-border rounded-lg">
            <div className="flex items-center mb-1">
              <Award className="h-4 w-4 text-yellow-400 mr-1" />
              <div className="text-xs text-muted-foreground">发证时间</div>
            </div>
            <div className="text-sm font-medium text-foreground">{exam.certIssueTime}</div>
          </div>
        </div>

        {/* 证书介绍 */}
        <div className="mb-6">
          <h2 className="text-lg font-semibold text-foreground mb-3">证书介绍</h2>
          <div className="p-4 bg-card border border-border rounded-lg">
            <p className="text-sm text-muted-foreground leading-relaxed">{exam.description}</p>
          </div>
        </div>

        {/* 报考条件 */}
        <div className="mb-6">
          <h2 className="text-lg font-semibold text-foreground mb-3">报考条件</h2>
          <div className="p-4 bg-card border border-border rounded-lg">
            <ul className="space-y-2">
              {exam.requirements.map((item, index) => (
                <li key={index} className="flex items-start">
                  <span className="inline-block w-1.5 h-1.5 rounded-full bg-green-400 mt-1.5 mr-2"></span>
                  <span className="text-sm text-muted-foreground">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* 考试内容 */}
        <div className="mb-6">
          <h2 className="text-lg font-semibold text-foreground mb-3">考试内容</h2>
          <div className="p-4 bg-card border border-border rounded-lg">
            <ul className="space-y-2">
              {exam.syllabus.map((item, index) => (
                <li key={index} className="flex items-start">
                  <span className="inline-block w-1.5 h-1.5 rounded-full bg-green-400 mt-1.5 mr-2"></span>
                  <span className="text-sm text-muted-foreground">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* 证书价值 */}
        <div className="mb-6">
          <h2 className="text-lg font-semibold text-foreground mb-3">证书价值</h2>
          <div className="p-4 bg-card border border-border rounded-lg">
            <ul className="space-y-2">
              {exam.benefits.map((item, index) => (
                <li key={index} className="flex items-start">
                  <span className="inline-block w-1.5 h-1.5 rounded-full bg-green-400 mt-1.5 mr-2"></span>
                  <span className="text-sm text-muted-foreground">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* 证书信息 */}
        <div className="mb-6">
          <h2 className="text-lg font-semibold text-foreground mb-3">证书信息</h2>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-card border border-border rounded-lg">
              <div className="text-sm text-muted-foreground">证书级别</div>
              <div className="text-sm font-medium text-foreground">{exam.level}</div>
            </div>
            <div className="flex items-center justify-between p-3 bg-card border border-border rounded-lg">
              <div className="text-sm text-muted-foreground">证书有效期</div>
              <div className="text-sm font-medium text-foreground">{exam.validity}</div>
            </div>
          </div>
        </div>

        {/* 注意事项 */}
        <div className="p-4 bg-red-900/20 border border-red-500/30 rounded-lg mb-6">
          <div className="flex items-start">
            <AlertTriangle className="h-5 w-5 text-red-400 mr-2 mt-0.5" />
            <div>
              <h3 className="font-medium text-foreground mb-1">考试须知</h3>
              <p className="text-sm text-muted-foreground">
                请考生务必携带有效身份证件参加考试。考试前请仔细阅读考场规则，遵守考试纪律。对于有实操考核部分的考试，请提前熟悉考试设备和操作流程。证书将在考试成绩公布后按规定时间发放。
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* 底部报名按钮 */}
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-card/95 backdrop-blur-md border-t border-border">
        <div className="flex justify-between items-center mb-2">
          <div>
            <div className="text-xs text-muted-foreground">报名费用</div>
            <div className="text-lg font-bold text-foreground">¥{exam.price}</div>
          </div>
          <div className="text-xs text-muted-foreground">
            报名截止：<span className="text-red-400">{exam.deadline}</span>
          </div>
        </div>
        <Button
          onClick={registerExam}
          className="w-full bg-gradient-to-r from-green-600 to-green-500 hover:from-green-500 hover:to-green-400 text-white"
        >
          报名缴费
        </Button>
      </div>
    </div>
  )
}
