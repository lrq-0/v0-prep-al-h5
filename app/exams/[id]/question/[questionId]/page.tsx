"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Clock, ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Progress } from "@/components/ui/progress"
import { cn } from "@/lib/utils"

// 无人机AOPA模拟考试题目页面
export default function ExamQuestion({ params }: { params: { id: string; questionId: string } }) {
  const router = useRouter()
  const examId = params.id
  const currentQuestionId = Number.parseInt(params.questionId)

  // 计时器状态
  const [timeLeft, setTimeLeft] = useState(60 * 60) // 60分钟
  const [answers, setAnswers] = useState<Record<number, string[]>>({})

  // 无人机AOPA考试题目
  const questions = [
    {
      id: 1,
      type: "single",
      text: "根据《民用无人机驾驶员管理规定》，下列哪项不属于无人机驾驶员执照的类别？",
      options: [
        { id: "A", text: "多旋翼无人机驾驶员执照" },
        { id: "B", text: "固定翼无人机驾驶员执照" },
        { id: "C", text: "直升机无人机驾驶员执照" },
        { id: "D", text: "军用无人机驾驶员执照" },
      ],
      correctAnswer: ["D"],
      explanation:
        "《民用无人机驾驶员管理规定》中规定的无人机驾驶员执照类别包括多旋翼、固定翼、直升机等民用类别，不包括军用无人机驾驶员执照。",
    },
    {
      id: 2,
      type: "single",
      text: "无人机飞行时，下列哪种气象条件最危险？",
      options: [
        { id: "A", text: "小雨" },
        { id: "B", text: "雷暴天气" },
        { id: "C", text: "轻雾" },
        { id: "D", text: "小风" },
      ],
      correctAnswer: ["B"],
      explanation: "雷暴天气对无人机飞行极为危险，不仅有强烈的上下气流，还可能有闪电，会导致无人机失控或损坏。",
    },
    {
      id: 3,
      type: "multiple",
      text: "以下哪些因素会影响无人机的飞行性能？",
      options: [
        { id: "A", text: "温度" },
        { id: "B", text: "湿度" },
        { id: "C", text: "气压" },
        { id: "D", text: "风速" },
      ],
      correctAnswer: ["A", "C", "D"],
      explanation:
        "温度、气压和风速都会直接影响无人机的飞行性能。温度影响电池性能和空气密度，气压影响升力，风速影响飞行稳定性和续航时间。湿度对飞行性能的影响相对较小。",
    },
    {
      id: 4,
      type: "single",
      text: "无人机飞行前，以下哪项检查最不重要？",
      options: [
        { id: "A", text: "电池电量" },
        { id: "B", text: "螺旋桨完整性" },
        { id: "C", text: "遥控器信号强度" },
        { id: "D", text: "无人机外壳颜色" },
      ],
      correctAnswer: ["D"],
      explanation:
        "无人机外壳颜色不会影响飞行安全和性能，而电池电量、螺旋桨完整性和遥控器信号强度都是飞行前必须检查的重要项目。",
    },
    {
      id: 5,
      type: "single",
      text: "在中国，无人机飞行高度一般不得超过多少米？",
      options: [
        { id: "A", text: "50米" },
        { id: "B", text: "120米" },
        { id: "C", text: "200米" },
        { id: "D", text: "500米" },
      ],
      correctAnswer: ["B"],
      explanation: "根据中国民航局规定，一般情况下无人机飞行高度不得超过120米，以避免与载人航空器发生冲突。",
    },
    {
      id: 6,
      type: "multiple",
      text: "以下哪些区域属于无人机禁飞区？",
      options: [
        { id: "A", text: "机场周边" },
        { id: "B", text: "军事设施周边" },
        { id: "C", text: "人口密集区" },
        { id: "D", text: "政府机关周边" },
      ],
      correctAnswer: ["A", "B", "D"],
      explanation:
        "机场周边、军事设施周边和政府机关周边通常被划定为无人机禁飞区。人口密集区虽然有飞行限制，但不一定完全禁飞，可能在特定条件下允许飞行。",
    },
    {
      id: 7,
      type: "single",
      text: "无人机电池发生鼓包现象，应该如何处理？",
      options: [
        { id: "A", text: "继续使用，直到电池完全损坏" },
        { id: "B", text: "立即停止使用，按规定回收处理" },
        { id: "C", text: "放电后继续使用" },
        { id: "D", text: "用针刺破放气后继续使用" },
      ],
      correctAnswer: ["B"],
      explanation:
        "电池鼓包是电池损坏的明显迹象，继续使用有爆炸风险。应立即停止使用并按规定回收处理，切勿刺破或继续使用。",
    },
    {
      id: 8,
      type: "single",
      text: "无人机飞行过程中突然失控，首先应该采取的措施是？",
      options: [
        { id: "A", text: "立即关闭遥控器" },
        { id: "B", text: "尝试重新建立连接" },
        { id: "C", text: "启动返航功能" },
        { id: "D", text: "等待无人机自动降落" },
      ],
      correctAnswer: ["C"],
      explanation:
        "无人机失控时，首先应尝试启动返航功能，这是最安全的应对方式。关闭遥控器会使情况更糟，因为无人机将完全失去控制。",
    },
    {
      id: 9,
      type: "multiple",
      text: "无人机飞行前，需要检查哪些天气因素？",
      options: [
        { id: "A", text: "风速" },
        { id: "B", text: "降水概率" },
        { id: "C", text: "能见度" },
        { id: "D", text: "日出日落时间" },
      ],
      correctAnswer: ["A", "B", "C", "D"],
      explanation:
        "飞行前应检查所有这些天气因素。风速影响飞行稳定性，降水会损坏设备，能见度关系到视线范围，日出日落时间关系到光线条件和是否符合日间飞行规定。",
    },
    {
      id: 10,
      type: "single",
      text: "根据中国民航局规定，重量超过多少克的无人机需要实名登记？",
      options: [
        { id: "A", text: "100克" },
        { id: "B", text: "250克" },
        { id: "C", text: "500克" },
        { id: "D", text: "1000克" },
      ],
      correctAnswer: ["B"],
      explanation: "根据中国民航局规定，最大起飞重量超过250克的无人机需要在民航局无人机实名登记系统进行实名登记。",
    },
  ]

  // 获取当前题目
  const currentQuestion = questions.find((q) => q.id === currentQuestionId) || questions[0]

  // 更新答案
  const updateAnswer = (value: string) => {
    if (currentQuestion.type === "single") {
      setAnswers({ ...answers, [currentQuestionId]: [value] })
    } else if (currentQuestion.type === "multiple") {
      const currentAnswers = answers[currentQuestionId] || []
      if (currentAnswers.includes(value)) {
        setAnswers({
          ...answers,
          [currentQuestionId]: currentAnswers.filter((a) => a !== value),
        })
      } else {
        setAnswers({
          ...answers,
          [currentQuestionId]: [...currentAnswers, value],
        })
      }
    }
  }

  // 检查是否已回答
  const isAnswered = (questionId: number) => {
    return answers[questionId] && answers[questionId].length > 0
  }

  // 导航到下一题
  const goToNextQuestion = () => {
    if (currentQuestionId < questions.length) {
      router.push(`/exams/${examId}/question/${currentQuestionId + 1}`)
    } else {
      // 提交考试
      submitExam()
    }
  }

  // 导航到上一题
  const goToPrevQuestion = () => {
    if (currentQuestionId > 1) {
      router.push(`/exams/${examId}/question/${currentQuestionId - 1}`)
    }
  }

  // 提交考试
  const submitExam = () => {
    // 计算得分
    let score = 0
    const totalQuestions = questions.length

    questions.forEach((question) => {
      const userAnswer = answers[question.id] || []
      const correctAnswer = question.correctAnswer

      // 检查答案是否完全匹配
      if (userAnswer.length === correctAnswer.length && userAnswer.every((a) => correctAnswer.includes(a))) {
        score++
      }
    })

    // 转换为百分制
    const finalScore = Math.round((score / totalQuestions) * 100)

    // 跳转到结果页面
    router.push(`/exams/${examId}/result?score=${finalScore}`)
  }

  // 计时器
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer)
          submitExam()
          return 0
        }
        return prev - 1
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  // 格式化时间
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`
  }

  return (
    <div className="min-h-screen bg-gray-950 text-white">
      <div className="container max-w-4xl mx-auto py-8 px-4">
        {/* 顶部进度条和计时器 */}
        <div className="mb-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div className="flex-1 w-full">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm text-gray-400">
                题目 {currentQuestionId} / {questions.length}
              </span>
              <div className="flex items-center text-sm">
                <Clock className="h-4 w-4 mr-1 text-amber-400" />
                <span className="text-amber-400">{formatTime(timeLeft)}</span>
              </div>
            </div>
            <Progress value={(currentQuestionId / questions.length) * 100} className="h-2 bg-gray-800" />
          </div>
        </div>

        {/* 题目内容 */}
        <div className="bg-gray-900 rounded-lg p-6 mb-6 border border-gray-800">
          <div className="mb-6">
            <div className="flex items-center mb-4">
              <span className="bg-blue-900/30 text-blue-400 text-sm px-2 py-1 rounded mr-2">
                {currentQuestion.type === "single" ? "单选题" : "多选题"}
              </span>
              <h2 className="text-lg font-medium">问题 {currentQuestionId}</h2>
            </div>
            <p className="text-gray-200">{currentQuestion.text}</p>
          </div>

          {/* 选项 */}
          {currentQuestion.type === "single" ? (
            <RadioGroup
              value={answers[currentQuestionId]?.[0] || ""}
              onValueChange={updateAnswer}
              className="space-y-3"
            >
              {currentQuestion.options.map((option) => (
                <div
                  key={option.id}
                  className={cn(
                    "flex items-center border rounded-lg p-3",
                    answers[currentQuestionId]?.[0] === option.id
                      ? "bg-blue-900/20 border-blue-500"
                      : "bg-gray-900 border-gray-800",
                  )}
                >
                  <RadioGroupItem value={option.id} id={`option-${option.id}`} />
                  <Label htmlFor={`option-${option.id}`} className="flex-1 ml-3 font-normal cursor-pointer">
                    <span className="font-medium mr-2">{option.id}.</span>
                    {option.text}
                  </Label>
                </div>
              ))}
            </RadioGroup>
          ) : (
            <div className="space-y-3">
              {currentQuestion.options.map((option) => (
                <div
                  key={option.id}
                  className={cn(
                    "flex items-center border rounded-lg p-3",
                    answers[currentQuestionId]?.includes(option.id)
                      ? "bg-blue-900/20 border-blue-500"
                      : "bg-gray-900 border-gray-800",
                  )}
                >
                  <Checkbox
                    id={`option-${option.id}`}
                    checked={answers[currentQuestionId]?.includes(option.id) || false}
                    onCheckedChange={() => updateAnswer(option.id)}
                    className="data-[state=checked]:bg-blue-500 data-[state=checked]:border-blue-500"
                  />
                  <Label htmlFor={`option-${option.id}`} className="flex-1 ml-3 font-normal cursor-pointer">
                    <span className="font-medium mr-2">{option.id}.</span>
                    {option.text}
                  </Label>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* 导航按钮 */}
        <div className="flex justify-between">
          <Button
            variant="outline"
            onClick={goToPrevQuestion}
            disabled={currentQuestionId === 1}
            className="border-gray-700 text-white hover:bg-gray-800 hover:text-white"
          >
            <ChevronLeft className="h-4 w-4 mr-1" />
            上一题
          </Button>

          <Button
            onClick={goToNextQuestion}
            className={cn("bg-blue-600 hover:bg-blue-700 text-white", !isAnswered(currentQuestionId) && "opacity-70")}
          >
            {currentQuestionId === questions.length ? "提交考试" : "下一题"}
            {currentQuestionId !== questions.length && <ChevronRight className="h-4 w-4 ml-1" />}
          </Button>
        </div>

        {/* 题目导航 */}
        <div className="mt-8">
          <h3 className="text-sm text-gray-400 mb-3">题目导航</h3>
          <div className="flex flex-wrap gap-2">
            {questions.map((question) => (
              <Button
                key={question.id}
                variant="outline"
                size="sm"
                onClick={() => router.push(`/exams/${examId}/question/${question.id}`)}
                className={cn(
                  "w-10 h-10 p-0",
                  question.id === currentQuestionId
                    ? "bg-blue-600 border-blue-600 text-white hover:bg-blue-700 hover:border-blue-700"
                    : isAnswered(question.id)
                      ? "bg-green-900/20 border-green-600 text-green-400 hover:bg-green-900/30"
                      : "bg-gray-900 border-gray-800 text-gray-400",
                )}
              >
                {question.id}
              </Button>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
