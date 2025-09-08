"use client"
import Link from "next/link"
import { useRouter, useSearchParams } from "next/navigation"
import { ArrowLeft, Clock, FileText, Award, MessageCircle, CheckCircle } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function ExamIntro({ params }: { params: { id: string } }) {
  const router = useRouter()
  const searchParams = useSearchParams()

  const returnUrl = searchParams.get("returnUrl") || "/"

  // 电商、短视频、自媒体相关考试数据
  const examsData = {
    "1": {
      id: "1",
      title: "电商运营专业能力认证",
      description:
        "本认证考试评估考生在电商店铺运营、商品管理、推广营销、客户服务等方面的专业能力，通过考试者将获得电商运营专业能力认证证书，是电商行业求职和晋升的重要凭证。",
      duration: "90分钟",
      questionCount: 100,
      totalScore: 100,
      passingScore: 80,
      questionTypes: [
        { type: "单选题", count: 60, score: 60, percentage: 60 },
        { type: "多选题", count: 15, score: 15, percentage: 15 },
        { type: "判断题", count: 25, score: 25, percentage: 25 },
      ],
      examNotes: [
        "考试时间为90分钟，请确保有充足的时间完成考试",
        "考试过程中请勿刷新页面或离开考试界面，否则可能导致考试中断",
        "考试及格分数为80分（满分100分）",
        "考试结束后可立即查看成绩和错题分析",
        "通过考试后，可获得电子版证书，纸质证书需另行申请",
      ],
      certificateInfo:
        "电商运营专业能力认证是由中国电子商务协会认证的专业资格证书，通过本考试后，您将获得在电商行业受认可的专业资格证明。证书有效期为2年，到期前需进行续证。续证需参加指定的复训课程并通过考核。该证书被各大电商平台和企业广泛认可，是从事电商运营工作的重要凭证。",
    },
    "2": {
      id: "2",
      title: "短视频创作与运营认证",
      description:
        "本认证考试全面评估考生在短视频内容创作、拍摄技巧、剪辑制作、账号运营等方面的专业能力，通过考试者将获得短视频创作与运营能力认证，是内容创作行业的专业资质证明。",
      duration: "120分钟",
      questionCount: 80,
      totalScore: 100,
      passingScore: 75,
      questionTypes: [
        { type: "单选题", count: 40, score: 40, percentage: 40 },
        { type: "多选题", count: 20, score: 20, percentage: 20 },
        { type: "案例分析", count: 2, score: 40, percentage: 40 },
      ],
      examNotes: [
        "考试时间为120分钟，请合理规划答题时间",
        "考试分为理论知识和实操案例分析两部分",
        "考试及格分数为75分（满分100分）",
        "案例分析题需详细说明分析思路和解决方案",
        "通过考试后，将获得短视频创作认证证书",
      ],
      certificateInfo:
        "短视频创作与运营认证是由中国网络视听节目服务协会认证的专业资格证书，通过本考试后，您将获得在短视频内容创作领域受认可的专业资格证明。证书全国通用，被各大平台、MCN机构和广告主认可，是从事短视频创作和运营的重要能力证明。",
    },
    "3": {
      id: "3",
      title: "自媒体运营能力评估",
      description:
        "本评估考试检验考生在自媒体账号定位、内容规划、粉丝运营、平台算法理解和变现能力等方面的专业技能，是衡量自媒体从业人员专业水平的重要标准。",
      duration: "100分钟",
      questionCount: 90,
      totalScore: 100,
      passingScore: 70,
      questionTypes: [
        { type: "单选题", count: 50, score: 50, percentage: 50 },
        { type: "多选题", count: 20, score: 20, percentage: 20 },
        { type: "内容创作", count: 1, score: 30, percentage: 30 },
      ],
      examNotes: [
        "考试时间为100分钟，请合理安排答题时间",
        "考试过程中请保持网络连接稳定",
        "考试包含理论知识和实操创作两部分",
        "内容创作部分需提交一篇原创内容策划方案",
        "通过考试后，可获得自媒体运营能力认证",
      ],
      certificateInfo:
        "自媒体运营能力认证是由中国新媒体行业协会推出的专业技能评估证书，旨在为自媒体运营人才提供专业能力背书。证书在全国范围内适用，被各大平台和内容机构认可，持证人在求职和业务合作中将获得更多机会和更高认可度。",
    },
  }

  // 根据ID获取考试信息
  const exam = examsData[params.id as keyof typeof examsData] || examsData["1"]

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* 顶部导航 */}
      <div className="flex items-center justify-between p-4 border-b border-border">
        <Link href={returnUrl} className="flex items-center text-muted-foreground">
          <ArrowLeft className="h-5 w-5 mr-1" />
          <span>返回</span>
        </Link>
        <h1 className="text-lg font-medium">考试介绍</h1>
        <div className="w-16"></div> {/* 占位，保持标题居中 */}
      </div>

      <div className="p-4">
        {/* 考试标题和描述 */}
        <div className="mb-6">
          <h2 className="text-xl font-bold mb-3">{exam.title}</h2>
          <p className="text-muted-foreground text-sm leading-relaxed">{exam.description}</p>
        </div>

        {/* 考试助手 */}
        <div className="bg-card rounded-lg p-4 mb-6 flex justify-between items-center border">
          <div className="flex items-center">
            <div className="bg-purple-600 rounded-full p-2 mr-3">
              <MessageCircle className="h-5 w-5" />
            </div>
            <div>
              <h3 className="font-medium">考试助手</h3>
              <p className="text-muted-foreground text-xs">有任何关于本次考试的问题，都可以向我咨询</p>
            </div>
          </div>
          <Button variant="ghost" size="sm" className="text-purple-400">
            咨询
          </Button>
        </div>

        {/* 考试基本信息 */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          <div className="bg-card rounded-lg p-4 flex flex-col items-center justify-center border">
            <Clock className="h-6 w-6 text-purple-400 mb-2" />
            <div className="text-center">
              <p className="font-bold text-lg">{exam.duration}</p>
              <p className="text-muted-foreground text-xs">考试时长</p>
            </div>
          </div>
          <div className="bg-card rounded-lg p-4 flex flex-col items-center justify-center border">
            <FileText className="h-6 w-6 text-purple-400 mb-2" />
            <div className="text-center">
              <p className="font-bold text-lg">{exam.questionCount}题</p>
              <p className="text-muted-foreground text-xs">题目数量</p>
            </div>
          </div>
          <div className="bg-card rounded-lg p-4 flex flex-col items-center justify-center border">
            <Award className="h-6 w-6 text-purple-400 mb-2" />
            <div className="text-center">
              <p className="font-bold text-lg">{exam.totalScore}分</p>
              <p className="text-muted-foreground text-xs">总分</p>
            </div>
          </div>
        </div>

        {/* 题型分布 */}
        <div className="mb-6">
          <h3 className="text-lg font-medium mb-3">题型分布</h3>

          {exam.questionTypes.map((item, index) => (
            <div key={index} className="bg-card rounded-lg p-4 mb-3 border">
              <div className="flex justify-between items-center mb-2">
                <div>
                  <h4 className="font-medium">{item.type}</h4>
                  <p className="text-muted-foreground text-xs">
                    {item.count}题 / {item.score}分
                  </p>
                </div>
                <span className="text-purple-400 font-medium">{item.percentage}%</span>
              </div>
              <div className="w-full bg-muted h-1.5 rounded-full overflow-hidden">
                <div className="bg-purple-500 h-full rounded-full" style={{ width: `${item.percentage}%` }}></div>
              </div>
            </div>
          ))}
        </div>

        {/* 考试说明 */}
        <div className="mb-6">
          <h3 className="text-lg font-medium mb-3">考试说明</h3>
          <div className="bg-card rounded-lg p-4 border">
            <ul className="space-y-3">
              {exam.examNotes.map((note, index) => (
                <li key={index} className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-purple-500 mr-2 shrink-0 mt-0.5" />
                  <span className="text-muted-foreground text-sm">{note}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* 证书说明 */}
        <div className="mb-6">
          <h3 className="text-lg font-medium mb-3">证书说明</h3>
          <div className="bg-card rounded-lg p-4 border">
            <p className="text-muted-foreground text-sm leading-relaxed">{exam.certificateInfo}</p>
          </div>
        </div>

        {/* 开始考试按钮 */}
        <Button
          onClick={() => router.push(`/exams/${params.id}/question/1`)}
          className="w-full bg-purple-600 hover:bg-purple-700 text-white py-6 rounded-lg text-lg font-medium mb-6"
        >
          开始考试
        </Button>
      </div>
    </div>
  )
}
