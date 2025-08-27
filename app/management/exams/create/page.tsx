"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Checkbox } from "@/components/ui/checkbox"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Calendar } from "@/components/ui/calendar"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { format } from "date-fns"
import { cn } from "@/lib/utils"
import {
  ArrowLeft,
  ChevronRight,
  ChevronLeft,
  Save,
  Upload,
  FileText,
  Award,
  FileUp,
  FileUpIcon,
  Sparkles,
  BadgeIcon as Certificate,
  Trophy,
  X,
  FileSpreadsheet,
  Info,
  HelpCircle,
  ImageIcon,
  Bot,
  MessageSquareText,
  ExternalLink,
  UploadIcon,
  Globe,
  PenLine,
  Lightbulb,
  CalendarIcon,
  Clock,
  CheckCircle,
  Settings,
  Repeat,
  ListChecks,
} from "lucide-react"
import Link from "next/link"
import Image from "next/image"

// 定义步骤类型
type Step = {
  id: string
  title: string
  description: string
}

// 定义所有步骤
const steps: Step[] = [
  {
    id: "basic-info",
    title: "基本信息",
    description: "设置考试的基本信息",
  },
  {
    id: "exam-settings",
    title: "考试设置",
    description: "配置考试的具体设置",
  },
  {
    id: "exam-content",
    title: "考试内容",
    description: "添加考试题目和内容",
  },
  {
    id: "registration-settings",
    title: "报名设置",
    description: "设置考试报名相关选项",
  },
  {
    id: "certificate-settings",
    title: "证书设置",
    description: "配置考试证书",
  },
  {
    id: "association-settings",
    title: "关联设置",
    description: "设置考试关联内容",
  },
  {
    id: "assistant-settings",
    title: "考试助手设置",
    description: "配置考试AI助手",
  },
]

export default function CreateExamPage() {
  const router = useRouter()
  const [currentStepIndex, setCurrentStepIndex] = useState(0)
  const currentStep = steps[currentStepIndex]
  const [isExitDialogOpen, setIsExitDialogOpen] = useState(false)

  // 基本信息表单状态
  const [examTitle, setExamTitle] = useState("")
  const [examCover, setExamCover] = useState(null)
  const [examDescription, setExamDescription] = useState("")
  const [isGeneratingDescription, setIsGeneratingDescription] = useState(false)
  const [uploadedDescriptionImage, setUploadedDescriptionImage] = useState(null)
  const [uploadedDescriptionDoc, setUploadedDescriptionDoc] = useState(null)

  // 考试设置
  const [validityPeriod, setValidityPeriod] = useState("unlimited")
  const [examStartDate, setExamStartDate] = useState(new Date())
  const [examEndDate, setExamEndDate] = useState(new Date())
  const [examDuration, setExamDuration] = useState("60")
  const [passingScore, setPassingScore] = useState("60")
  const [attemptLimit, setAttemptLimit] = useState("unlimited")
  const [maxAttempts, setMaxAttempts] = useState("3")
  const [showAdvancedSettings, setShowAdvancedSettings] = useState(false)
  const [showQuestionScores, setShowQuestionScores] = useState(true)
  const [resultDisplay, setResultDisplay] = useState("immediate")
  const [answerDisplay, setAnswerDisplay] = useState("after_submission")
  const [shuffleQuestions, setShuffleQuestions] = useState(false)

  // 考试内容
  const [examType, setExamType] = useState("mock")
  const [activeTab, setActiveTab] = useState("ai-generated")
  const [selectedCourse, setSelectedCourse] = useState("")
  const [questionSelectionMethod, setQuestionSelectionMethod] = useState("ai-auto")
  const [singleChoiceCount, setSingleChoiceCount] = useState("10")
  const [multipleChoiceCount, setMultipleChoiceCount] = useState("5")
  const [fillBlankCount, setFillBlankCount] = useState("3")
  const [trueFalseCount, setTrueFalseCount] = useState("5")
  const [shortAnswerCount, setShortAnswerCount] = useState("2")
  const [isGenerating, setIsGenerating] = useState(false)
  const [uploadedFile, setUploadedFile] = useState(null)
  const [examContentType, setExamContentType] = useState("upload")

  // 报名设置
  const [requiresRegistration, setRequiresRegistration] = useState(false)
  const [registrationTemplate, setRegistrationTemplate] = useState(null)
  const [requiresPhoto, setRequiresPhoto] = useState(false)
  const [photoRequirements, setPhotoRequirements] = useState("1寸证件照，白底，尺寸为295x413像素")

  // 证书设置
  const [issueCertificate, setIssueCertificate] = useState(false)
  const [certificateType, setCertificateType] = useState("ai-generated")
  const [certificatePreview, setCertificatePreview] = useState(null)
  const [certificateWebsite, setCertificateWebsite] = useState("")

  // 关联课程
  const [relatedCourse, setRelatedCourse] = useState(false)
  const [relatedCoursePrice, setRelatedCoursePrice] = useState("")

  // 价格设置
  const [isPaid, setIsPaid] = useState(false)
  const [agentPrice, setAgentPrice] = useState("")
  const [suggestedPrice, setSuggestedPrice] = useState("")
  const [priceDescription, setPriceDescription] = useState("")
  const [relatedCourseAgentPrice, setRelatedCourseAgentPrice] = useState("")
  const [relatedCourseSuggestedPrice, setRelatedCourseSuggestedPrice] = useState("")

  // 分享设置
  const [shareExam, setShareExam] = useState(true)
  const [shareRelatedCourseExam, setShareRelatedCourseExam] = useState(false)

  // AI助手设置
  const [isCreatingAIAssistant, setIsCreatingAIAssistant] = useState(false)
  const [isCreatingAgentAI, setIsCreatingAgentAI] = useState(false)
  const [aiAssistantPrompt, setAiAssistantPrompt] = useState("")
  const [agentAIPrompt, setAgentAIPrompt] = useState("")
  const [showAIAssistantSettings, setShowAIAssistantSettings] = useState(false)
  const [showAgentAISettings, setShowAgentAISettings] = useState(false)

  // 提交状态
  const [isSubmitting, setIsSubmitting] = useState(false)

  // 模拟课程列表
  const courses = [
    { id: "c1", title: "Python编程基础", lessons: 24 },
    { id: "c2", title: "数据分析入门", lessons: 18 },
    { id: "c3", title: "人工智能导论", lessons: 30 },
    { id: "c4", title: "Web前端开发", lessons: 22 },
  ]

  // 处理AI生成考试
  const handleGenerateExam = () => {
    if (!selectedCourse) {
      alert("请先选择一个课程")
      return
    }

    setIsGenerating(true)

    // 模拟AI生成过程
    setTimeout(() => {
      setIsGenerating(false)
      alert("考试题库已成功生成！")
    }, 3000)
  }

  // 处理文件上传
  const handleFileUpload = (e) => {
    const file = e.target.files[0]
    if (file) {
      // 检查文件类型
      if (
        file.type !== "application/pdf" &&
        file.type !== "application/msword" &&
        file.type !== "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
      ) {
        alert("请上传Word或PDF格式的文件")
        return
      }

      setUploadedFile(file)
    }
  }

  // 处理描述文档上传
  const handleDescriptionDocUpload = (e) => {
    const file = e.target.files[0]
    if (file) {
      // 检查文件类型
      if (
        file.type !== "application/pdf" &&
        file.type !== "application/msword" &&
        file.type !== "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
      ) {
        alert("请上传Word或PDF格式的文件")
        return
      }

      setUploadedDescriptionDoc(file)

      // 模拟AI处理过程
      setIsGeneratingDescription(true)
      setTimeout(() => {
        setExamDescription(
          `基于您上传的文档《${file.name}》，生成的考试描述：这是一个全面评估考生在相关领域专业知识和实践能力的考试。考试覆盖了核心理论知识和实际应用场景，旨在客观公正地测量考生的能力水平。通过考试不仅能够获得专业认证，还能提升自身竞争力。`,
        )
        setIsGeneratingDescription(false)
      }, 2000)
    }
  }

  // 处理描述图片上传
  const handleDescriptionImageUpload = (e) => {
    const file = e.target.files[0]
    if (file) {
      // 检查文件类型
      if (!file.type.startsWith("image/")) {
        alert("请上传图片格式文件")
        return
      }

      // 创建预览URL
      const previewUrl = URL.createObjectURL(file)
      setUploadedDescriptionImage({ file, preview: previewUrl })

      // 模拟AI处理过程
      setIsGeneratingDescription(true)
      setTimeout(() => {
        setExamDescription(
          "基于您上传的图片，生成的考试描述：从图片内容可以看出，这是一个专业性强的考试项目，旨在评估考生在实际环境中应用所学知识解决问题的能力。考试强调理论与实践的结合，注重考察分析能力和创新思维。通过考试可以有效检验学习成果，为职业发展奠定基础。",
        )
        setIsGeneratingDescription(false)
      }, 2000)
    }
  }

  // 处理考试封面上传
  const handleExamCoverUpload = (e) => {
    const file = e.target.files[0]
    if (file) {
      // 检查文件类型
      if (!file.type.startsWith("image/")) {
        alert("请上传图片格式文件")
        return
      }

      // 创建预览URL
      const previewUrl = URL.createObjectURL(file)
      setExamCover({ file, preview: previewUrl })
    }
  }

  // 处理报名模板上传
  const handleRegistrationTemplateUpload = (e) => {
    const file = e.target.files[0]
    if (file) {
      // 检查文件类型
      if (
        file.type !== "application/vnd.ms-excel" &&
        file.type !== "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
      ) {
        alert("请上传Excel格式的文件")
        return
      }

      setRegistrationTemplate(file)
    }
  }

  // 处理证书上传
  const handleCertificateUpload = (e) => {
    const file = e.target.files[0]
    if (file) {
      // 检查文件类型
      if (!file.type.startsWith("image/")) {
        alert("请上传图片格式的证书模板")
        return
      }

      // 创建预览URL
      const previewUrl = URL.createObjectURL(file)
      setCertificatePreview(previewUrl)
    }
  }

  // 生成AI证书预览
  const generateAICertificate = () => {
    if (!examTitle) {
      alert("请先填写考试标题")
      return
    }

    // 模拟生成证书
    setCertificatePreview("/images/certificate-3.png")
  }

  // 处理AI生成考试描述
  const generateExamDescription = () => {
    if (!examTitle) {
      alert("请先填写考试标题")
      return
    }

    setIsGeneratingDescription(true)

    // 模拟AI生成过程
    setTimeout(() => {
      const descriptions = {
        mock: `这是一个全面评估${examTitle}相关知识和技能的模拟考试。考试内容涵盖理论基础和实际应用，通过多种题型测试学员的掌握程度和应用能力。完成考试后，学员将获得详细的能力分析报告。`,
        certificate: `${examTitle}是一项专业认证考试，旨在评估考生在该领域的专业知识和实践能力。通过本考试的学员将获得行业认可的专业资格证书，为职业发展提供有力支持。`,
        competition: `${examTitle}是一项高水平的竞赛活动，面向所有对该领域有浓厚兴趣的学习者。参赛者将有机会展示自己的专业技能，与同行交流学习，优胜者还将获得丰厚奖励和行业认可。`,
      }

      setExamDescription(descriptions[examType] || descriptions["mock"])
      setIsGeneratingDescription(false)
    }, 1500)
  }

  // 创建考测AI助理
  const createExamAIAssistant = () => {
    if (!examTitle || !examDescription) {
      alert("请先填写考试标题和描述")
      return
    }

    setIsCreatingAIAssistant(true)

    // 生成默认提示词
    const defaultPrompt = `你是"${examTitle}"考试的AI助理。你的主要职责是帮助考生了解考试内容、规则和要求。

考试介绍：
${examDescription}

考试时长：${examDuration}分钟
通过分数：${passingScore}%

你可以回答关于考试内容、报名方式、考试流程、评分标准等问题。你应该鼓励考生认真准备，并提供一些备考建议。

如果考生询问具体题目的答案，你应该婉拒，并建议他们通过学习相关知识来提高能力。`

    setAiAssistantPrompt(defaultPrompt)
    setShowAIAssistantSettings(true)

    // 模拟创建过程
    setTimeout(() => {
      setIsCreatingAIAssistant(false)
    }, 1500)
  }

  // 创建AI代理说明助理
  const createAgentAIAssistant = () => {
    if (!examTitle || !examDescription) {
      alert("请先填写考试标题和描述")
      return
    }

    setIsCreatingAgentAI(true)

    // 生成默认提示词
    const defaultPrompt = `你是"${examTitle}"考试的代理销售AI助理。你的主要职责是帮助代理商了解该考试的详细信息、销售政策和推广建议。

考试介绍：
${examDescription}

考试类型：${examType === "mock" ? "模拟考试" : examType === "certificate" ? "证书考试" : "竞赛活动"}
考试时长：${examDuration}分钟
通过分数：${passingScore}%

代理价格：${isPaid ? `¥${agentPrice}` : "免费"}
建议市场价：${isPaid ? `¥${suggestedPrice}` : "免费"}
${relatedCourse ? `关联课程优惠价：¥${relatedCoursePrice}` : ""}

销售建议：
1. 本考试适合${examType === "mock" ? "想要检验学习成果的学员" : examType === "certificate" ? "需要获取专业认证的学员" : "想要参与竞赛提升能力的学员"}
2. 可以与相关课程打包销售，提高整体收益
3. 建议通过社交媒体、邮件等渠道进行推广

如果代理商有关于考试内容、销售策略、定价或推广方面的问题，你应该提供专业、详细的建议。`

    setAgentAIPrompt(defaultPrompt)
    setShowAgentAISettings(true)

    // 模拟创建过程
    setTimeout(() => {
      setIsCreatingAgentAI(false)
    }, 1500)
  }

  // 保存AI助理设置
  const saveAIAssistantSettings = () => {
    setShowAIAssistantSettings(false)
    alert("考测AI助理设置已保存！")
  }

  // 保存代理AI助理设置
  const saveAgentAISettings = () => {
    setShowAgentAISettings(false)
    alert("AI代理说明助理设置已保存！")
  }

  // 保存当前步骤并前进
  const handleNext = () => {
    // 这里可以添加表单验证逻辑
    if (currentStepIndex === 0) {
      // 验证基本信息
      if (!examTitle) {
        alert("请填写考试标题")
        return
      }
      if (!examCover) {
        alert("请上传考试封面")
        return
      }
    }

    // 前进到下一步
    if (currentStepIndex < steps.length - 1) {
      setCurrentStepIndex(currentStepIndex + 1)
    }
  }

  // 返回上一步
  const handlePrevious = () => {
    if (currentStepIndex > 0) {
      setCurrentStepIndex(currentStepIndex - 1)
    }
  }

  // 处理返回按钮点击
  const handleBackClick = () => {
    setIsExitDialogOpen(true)
  }

  // 处理确认退出
  const handleConfirmExit = () => {
    setIsExitDialogOpen(false)
    router.push("/management/exams")
  }

  // 完成创建
  const handleFinish = () => {
    setIsSubmitting(true)

    // 模拟提交过程
    setTimeout(() => {
      setIsSubmitting(false)
      alert("考试创建成功！")
      router.push("/management/exams")
    }, 2000)
  }

  // 渲染考试内容选项
  const renderExamContentOptions = () => {
    if (examType === "mock") {
      // 模拟考试使用原有的上传题库/AI生成选项
      return (
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-6 bg-gray-700">
            <TabsTrigger
              value="ai-generated"
              className="flex items-center text-gray-200 data-[state=active]:bg-primary data-[state=active]:text-white"
            >
              <Sparkles className="mr-2 h-4 w-4" />
              AI生成考试
            </TabsTrigger>
            <TabsTrigger
              value="upload"
              className="flex items-center text-gray-200 data-[state=active]:bg-primary data-[state=active]:text-white"
            >
              <Upload className="mr-2 h-4 w-4" />
              上传题库
            </TabsTrigger>
          </TabsList>

          <TabsContent value="ai-generated" className="space-y-4">
            <div>
              <Label htmlFor="course-select" className="text-gray-200">
                选择课程内容
              </Label>
              <Select value={selectedCourse} onValueChange={setSelectedCourse}>
                <SelectTrigger className="bg-gray-700 border-gray-600 text-white">
                  <SelectValue placeholder="选择一个课程" />
                </SelectTrigger>
                <SelectContent className="bg-gray-800 border-gray-700 text-white">
                  {courses.map((course) => (
                    <SelectItem key={course.id} value={course.id}>
                      {course.title} ({course.lessons}课时)
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <p className="text-sm text-gray-400 mt-1">
                AI将根据所选课程内容自动生成考试题库，包括选择题、判断题和简答题。
              </p>
            </div>

            {/* 新增考试类目选择方式 */}
            <div className="mt-4">
              <Label className="text-gray-200 mb-2 block">考试类目选择方式</Label>
              <RadioGroup
                value={questionSelectionMethod}
                onValueChange={setQuestionSelectionMethod}
                className="space-y-3"
              >
                <div className="flex items-start space-x-3 bg-gray-700 p-3 rounded-md">
                  <RadioGroupItem value="ai-auto" id="ai-auto" className="mt-1" />
                  <div>
                    <Label htmlFor="ai-auto" className="flex items-center cursor-pointer text-gray-200">
                      <Sparkles className="mr-2 h-4 w-4 text-blue-500" />
                      AI自动选择考试类目
                    </Label>
                    <p className="text-sm text-gray-400 mt-1">
                      AI将自动分配选择题、判断题和简答题的数量，生成最合适的考试题库
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-3 bg-gray-700 p-3 rounded-md">
                  <RadioGroupItem value="custom" id="custom" className="mt-1" />
                  <div>
                    <Label htmlFor="custom" className="flex items-center cursor-pointer text-gray-200">
                      <ListChecks className="mr-2 h-4 w-4 text-green-500" />
                      自定义考试类目
                    </Label>
                    <p className="text-sm text-gray-400 mt-1">自定义设置各类题型的数量，根据需求定制考试题库</p>

                    {questionSelectionMethod === "custom" && (
                      <div className="mt-3 grid grid-cols-2 gap-3">
                        <div>
                          <Label htmlFor="single-choice-count" className="text-gray-200 text-sm">
                            单选题数量
                          </Label>
                          <Input
                            id="single-choice-count"
                            type="number"
                            min="0"
                            value={singleChoiceCount}
                            onChange={(e) => setSingleChoiceCount(e.target.value)}
                            className="bg-gray-600 border-gray-500 text-white mt-1"
                          />
                        </div>
                        <div>
                          <Label htmlFor="multiple-choice-count" className="text-gray-200 text-sm">
                            多选题数量
                          </Label>
                          <Input
                            id="multiple-choice-count"
                            type="number"
                            min="0"
                            value={multipleChoiceCount}
                            onChange={(e) => setMultipleChoiceCount(e.target.value)}
                            className="bg-gray-600 border-gray-500 text-white mt-1"
                          />
                        </div>
                        <div>
                          <Label htmlFor="fill-blank-count" className="text-gray-200 text-sm">
                            填空题数量
                          </Label>
                          <Input
                            id="fill-blank-count"
                            type="number"
                            min="0"
                            value={fillBlankCount}
                            onChange={(e) => setFillBlankCount(e.target.value)}
                            className="bg-gray-600 border-gray-500 text-white mt-1"
                          />
                        </div>
                        <div>
                          <Label htmlFor="true-false-count" className="text-gray-200 text-sm">
                            判断题数量
                          </Label>
                          <Input
                            id="true-false-count"
                            type="number"
                            min="0"
                            value={trueFalseCount}
                            onChange={(e) => setTrueFalseCount(e.target.value)}
                            className="bg-gray-600 border-gray-500 text-white mt-1"
                          />
                        </div>
                        <div className="col-span-2">
                          <Label htmlFor="short-answer-count" className="text-gray-200 text-sm">
                            简答题数量
                          </Label>
                          <Input
                            id="short-answer-count"
                            type="number"
                            min="0"
                            value={shortAnswerCount}
                            onChange={(e) => setShortAnswerCount(e.target.value)}
                            className="bg-gray-600 border-gray-500 text-white mt-1"
                          />
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </RadioGroup>
            </div>

            <Button
              type="button"
              onClick={handleGenerateExam}
              disabled={!selectedCourse || isGenerating}
              className="w-full"
            >
              {isGenerating ? (
                <>
                  <div className="animate-spin mr-2 h-4 w-4 border-2 border-current border-t-transparent rounded-full"></div>
                  生成中...
                </>
              ) : (
                <>
                  <Sparkles className="mr-2 h-4 w-4" />
                  生成考试题库
                </>
              )}
            </Button>

            {isGenerating && (
              <div className="bg-blue-900 p-4 rounded-md">
                <p className="text-sm text-blue-200">AI正在分析课程内容并生成考试题库，这可能需要几分钟时间...</p>
                <div className="w-full bg-blue-800 rounded-full h-2.5 mt-2">
                  <div
                    className="bg-blue-500 h-2.5 rounded-full animate-[progress_3s_ease-in-out_infinite]"
                    style={{ width: "70%" }}
                  ></div>
                </div>
              </div>
            )}
          </TabsContent>

          <TabsContent value="upload" className="space-y-4">
            <div className="border-2 border-dashed border-gray-600 rounded-lg p-6 text-center">
              <FileUp className="mx-auto h-8 w-8 text-gray-400" />
              <p className="mt-2 text-sm text-gray-300">拖放文件到此处，或</p>
              <label className="mt-2 inline-block">
                <span className="rounded-md bg-gray-700 px-2.5 py-1 text-sm font-semibold text-white shadow-sm hover:bg-gray-600 cursor-pointer">
                  浏览文件
                </span>
                <input type="file" className="sr-only" accept=".doc,.docx,.pdf" onChange={handleFileUpload} />
              </label>
              <p className="mt-2 text-xs text-gray-400">支持Word或PDF格式，最大20MB</p>
            </div>

            {uploadedFile && (
              <div className="bg-green-900 p-4 rounded-md flex items-center justify-between">
                <div className="flex items-center">
                  <FileText className="h-5 w-5 text-green-400 mr-2" />
                  <div>
                    <p className="text-sm font-medium text-green-200">{uploadedFile.name}</p>
                    <p className="text-xs text-green-300">{Math.round(uploadedFile.size / 1024)} KB</p>
                  </div>
                </div>
                <Button variant="ghost" size="sm" onClick={() => setUploadedFile(null)}>
                  <X className="h-4 w-4" />
                </Button>
              </div>
            )}
          </TabsContent>
        </Tabs>
      )
    } else {
      // 证书考试和竞赛活动使用新的选项
      return (
        <div className="space-y-4">
          <Label className="text-gray-200">考试内容类型</Label>
          <RadioGroup
            value={examContentType}
            onValueChange={setExamContentType}
            className="flex flex-col space-y-3 mt-2"
          >
            <div className="flex items-start space-x-3 bg-gray-700 p-3 rounded-md">
              <RadioGroupItem value="upload" id="upload-content" className="mt-1" />
              <div>
                <Label htmlFor="upload-content" className="flex items-center cursor-pointer text-gray-200">
                  <UploadIcon className="mr-2 h-4 w-4 text-blue-500" />
                  上传题库
                </Label>
                <p className="text-sm text-gray-400 mt-1">上传Word或PDF格式的考试题库，系统将自动解析题目</p>

                {examContentType === "upload" && (
                  <div className="mt-3 border border-gray-600 rounded-md p-3">
                    <div className="border-2 border-dashed border-gray-600 rounded-lg p-4 text-center">
                      <FileUpIcon className="mx-auto h-6 w-6 text-gray-400" />
                      <p className="mt-2 text-sm text-gray-300">拖放文件到此处，或</p>
                      <label className="mt-2 inline-block">
                        <span className="rounded-md bg-gray-700 px-2.5 py-1 text-sm font-semibold text-white shadow-sm hover:bg-gray-600 cursor-pointer">
                          浏览文件
                        </span>
                        <input type="file" className="sr-only" accept=".doc,.docx,.pdf" onChange={handleFileUpload} />
                      </label>
                    </div>

                    {uploadedFile && (
                      <div className="bg-green-900 p-3 rounded-md flex items-center justify-between mt-3">
                        <div className="flex items-center">
                          <FileText className="h-5 w-5 text-green-400 mr-2" />
                          <div>
                            <p className="text-sm font-medium text-green-200">{uploadedFile.name}</p>
                            <p className="text-xs text-green-300">{Math.round(uploadedFile.size / 1024)} KB</p>
                          </div>
                        </div>
                        <Button variant="ghost" size="sm" onClick={() => setUploadedFile(null)}>
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>

            <div className="flex items-start space-x-3 bg-gray-700 p-3 rounded-md">
              <RadioGroupItem value="user-upload" id="user-upload-content" className="mt-1" />
              <div>
                <Label htmlFor="user-upload-content" className="flex items-center cursor-pointer text-gray-200">
                  <PenLine className="mr-2 h-4 w-4 text-green-500" />
                  用户上传作品
                </Label>
                <p className="text-sm text-gray-400 mt-1">考生需要上传作品或文档，由管理员进行评分</p>

                {examContentType === "user-upload" && (
                  <div className="mt-3 border border-gray-600 rounded-md p-3">
                    <div className="space-y-3">
                      <div>
                        <Label htmlFor="upload-requirements" className="text-gray-200">
                          上传要求
                        </Label>
                        <Textarea
                          id="upload-requirements"
                          placeholder="请输入作品上传要求，如格式、大小、内容等"
                          rows={3}
                          className="bg-gray-700 border-gray-600 text-white mt-1"
                        />
                      </div>

                      <div>
                        <Label htmlFor="allowed-formats" className="text-gray-200">
                          允许的文件格式
                        </Label>
                        <div className="flex flex-wrap gap-2 mt-1">
                          <Badge className="bg-blue-600">PDF</Badge>
                          <Badge className="bg-blue-600">DOC/DOCX</Badge>
                          <Badge className="bg-blue-600">JPG/PNG</Badge>
                          <Badge className="bg-blue-600">MP4</Badge>
                          <Badge className="bg-blue-600">ZIP</Badge>
                          <Button variant="outline" size="sm" className="h-6 text-xs border-gray-600 text-gray-300">
                            <span className="mr-1">+</span> 添加格式
                          </Button>
                        </div>
                      </div>

                      <div>
                        <Label htmlFor="max-file-size" className="text-gray-200">
                          最大文件大小 (MB)
                        </Label>
                        <Input
                          id="max-file-size"
                          type="number"
                          defaultValue="100"
                          min="1"
                          className="bg-gray-700 border-gray-600 text-white mt-1"
                        />
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div className="flex items-start space-x-3 bg-gray-700 p-3 rounded-md">
              <RadioGroupItem value="external" id="external-content" className="mt-1" />
              <div>
                <Label htmlFor="external-content" className="flex items-center cursor-pointer text-gray-200">
                  <Globe className="mr-2 h-4 w-4 text-purple-500" />
                  跳转官网
                </Label>
                <p className="text-sm text-gray-400 mt-1">跳转到外部官方网站进行考试</p>

                {examContentType === "external" && (
                  <div className="mt-3 border border-gray-600 rounded-md p-3">
                    <div className="space-y-3">
                      <div>
                        <Label htmlFor="external-url" className="text-gray-200">
                          官方考试网址
                        </Label>
                        <div className="relative mt-1">
                          <Globe
                            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                            size={16}
                          />
                          <Input
                            id="external-url"
                            placeholder="https://example.com/exam"
                            className="pl-10 bg-gray-700 border-gray-600 text-white"
                          />
                        </div>
                      </div>

                      <div>
                        <Label htmlFor="external-instructions" className="text-gray-200">
                          跳转说明
                        </Label>
                        <Textarea
                          id="external-instructions"
                          placeholder="请输入跳转到官网后的操作说明"
                          rows={3}
                          className="bg-gray-700 border-gray-600 text-white mt-1"
                        />
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </RadioGroup>
        </div>
      )
    }
  }

  // 渲染报名设置
  const renderRegistrationSettings = () => {
    if (examType === "mock") {
      return (
        <div className="py-8 text-center">
          <h3 className="text-lg font-medium mb-4">模拟考试无需报名设置</h3>
          <p className="text-gray-400 mb-4">模拟考试不需要报名，学员可以直接参加考试</p>
        </div>
      )
    }

    return (
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <Label htmlFor="requires-registration" className="text-gray-200">
              需要报名
            </Label>
            <p className="text-sm text-gray-400">考生需要提前报名才能参加考试</p>
          </div>
          <Switch id="requires-registration" checked={requiresRegistration} onCheckedChange={setRequiresRegistration} />
        </div>

        {requiresRegistration && (
          <>
            <div className="border-2 border-dashed border-gray-600 rounded-lg p-6 text-center mt-4">
              <FileSpreadsheet className="mx-auto h-8 w-8 text-gray-400" />
              <p className="mt-2 text-sm text-gray-300">上传报名信息模板（Excel）</p>
              <label className="mt-2 inline-block">
                <span className="rounded-md bg-gray-700 px-2.5 py-1 text-sm font-semibold text-white shadow-sm ring-1 ring-inset ring-gray-600 hover:bg-gray-600 cursor-pointer">
                  浏览文件
                </span>
                <input
                  type="file"
                  className="sr-only"
                  accept=".xls,.xlsx"
                  onChange={handleRegistrationTemplateUpload}
                />
              </label>
              <p className="mt-2 text-xs text-gray-400">支持.xlsx或.xls格式</p>
            </div>

            {registrationTemplate && (
              <div className="bg-green-900 p-4 rounded-md flex items-center justify-between mt-4">
                <div className="flex items-center">
                  <FileSpreadsheet className="h-5 w-5 text-green-400 mr-2" />
                  <div>
                    <p className="text-sm font-medium text-green-200">{registrationTemplate.name}</p>
                    <p className="text-xs text-green-300">{Math.round(registrationTemplate.size / 1024)} KB</p>
                  </div>
                </div>
                <Button variant="ghost" size="sm" onClick={() => setRegistrationTemplate(null)}>
                  <X className="h-4 w-4" />
                </Button>
              </div>
            )}

            <div className="bg-blue-900 p-3 rounded-md mt-4">
              <div className="flex">
                <Info className="h-5 w-5 text-blue-400 mr-2 flex-shrink-0" />
                <div>
                  <p className="text-sm text-blue-200">Excel模板说明：</p>
                  <ul className="text-xs text-blue-300 list-disc list-inside mt-1">
                    <li>第一行为表头，包含字段名称</li>
                    <li>必填字段：姓名、证件类型、证件号码、手机号码</li>
                    <li>可选字段：性别、年龄、学校/单位、邮箱等</li>
                    <li>系统将根据模板自动生成报名表单</li>
                  </ul>
                  <p className="text-xs text-blue-300 mt-1">
                    <Link href="#" className="underline">
                      下载示例模板
                    </Link>
                  </p>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between pt-4">
              <div className="space-y-0.5">
                <Label htmlFor="requires-photo" className="flex items-center text-gray-200">
                  需要上传证件照
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <HelpCircle className="h-4 w-4 ml-1 text-gray-400" />
                      </TooltipTrigger>
                      <TooltipContent className="bg-gray-700 text-gray-100 border-gray-600">
                        <p className="w-80">开启后，考生需要上传证件照。您可以在后台批量导出考生的证件照。</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </Label>
                <p className="text-sm text-gray-400">考生需要上传证件照</p>
              </div>
              <Switch id="requires-photo" checked={requiresPhoto} onCheckedChange={setRequiresPhoto} />
            </div>

            {requiresPhoto && (
              <div className="pt-4">
                <Label htmlFor="photo-requirements" className="text-gray-200">
                  证件照要求
                </Label>
                <Textarea
                  id="photo-requirements"
                  placeholder="请输入证件照要求，如尺寸、背景色等"
                  rows={2}
                  className="bg-gray-700 border-gray-600 text-white"
                  value={photoRequirements}
                  onChange={(e) => setPhotoRequirements(e.target.value)}
                />
                <p className="text-xs text-gray-400 mt-1">这些要求将显示在报名页面上</p>
              </div>
            )}
          </>
        )}
      </div>
    )
  }

  // 渲染证书设置选项
  const renderCertificateSettings = () => {
    return (
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <Label htmlFor="issue-certificate" className="text-gray-200">
              颁发证书
            </Label>
            <p className="text-sm text-gray-400">学员通过考试后将获得证书</p>
          </div>
          <Switch id="issue-certificate" checked={issueCertificate} onCheckedChange={setIssueCertificate} />
        </div>

        {issueCertificate && (
          <div className="pt-4 space-y-4">
            {examType === "mock" ? (
              // 模拟考试使用原有的证书设置
              <>
                <div>
                  <Label className="text-gray-200">证书类型</Label>
                  <RadioGroup
                    value={certificateType}
                    onValueChange={setCertificateType}
                    className="flex flex-col space-y-1 mt-2"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="ai-generated" id="ai-certificate" />
                      <Label htmlFor="ai-certificate" className="flex items-center cursor-pointer text-gray-200">
                        <Sparkles className="mr-2 h-4 w-4 text-blue-500" />
                        AI生成证书
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="upload" id="upload-certificate" />
                      <Label htmlFor="upload-certificate" className="flex items-center cursor-pointer text-gray-200">
                        <Upload className="mr-2 h-4 w-4 text-green-500" />
                        上传证书模板
                      </Label>
                    </div>
                  </RadioGroup>
                </div>

                {certificateType === "ai-generated" ? (
                  <div className="space-y-4">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={generateAICertificate}
                      className="w-full border-gray-600 text-gray-200"
                    >
                      <Sparkles className="mr-2 h-4 w-4" />
                      生成证书预览
                    </Button>

                    {certificatePreview && (
                      <div className="border border-gray-600 rounded-md p-2">
                        <p className="text-sm font-medium mb-2 text-gray-200">证书预览：</p>
                        <div className="relative h-48 w-full">
                          <Image
                            src={certificatePreview || "/placeholder.svg"}
                            alt="证书预览"
                            fill
                            style={{ objectFit: "contain" }}
                          />
                        </div>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div className="border-2 border-dashed border-gray-600 rounded-lg p-6 text-center">
                      <Certificate className="mx-auto h-8 w-8 text-gray-400" />
                      <p className="mt-2 text-sm text-gray-300">拖放证书模板到此处，或</p>
                      <label className="mt-2 inline-block">
                        <span className="rounded-md bg-gray-700 px-2.5 py-1 text-sm font-semibold text-white shadow-sm hover:bg-gray-600 cursor-pointer">
                          浏览文件
                        </span>
                        <input type="file" className="sr-only" accept="image/*" onChange={handleCertificateUpload} />
                      </label>
                      <p className="mt-2 text-xs text-gray-400">支持JPG、PNG格式，建议尺寸1920x1080</p>
                    </div>

                    {certificatePreview && (
                      <div className="border border-gray-600 rounded-md p-2">
                        <p className="text-sm font-medium mb-2 text-gray-200">证书预览：</p>
                        <div className="relative h-48 w-full">
                          <Image
                            src={certificatePreview || "/placeholder.svg"}
                            alt="证书预览"
                            fill
                            style={{ objectFit: "contain" }}
                          />
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </>
            ) : (
              // 证书考试和竞赛活动使用新的证书设置选项
              <>
                <Label className="text-gray-200">证书选项</Label>
                <RadioGroup
                  value={certificateType}
                  onValueChange={setCertificateType}
                  className="flex flex-col space-y-3 mt-2"
                >
                  <div className="flex items-start space-x-3 bg-gray-700 p-3 rounded-md">
                    <RadioGroupItem value="upload" id="upload-certificate" className="mt-1" />
                    <div>
                      <Label htmlFor="upload-certificate" className="flex items-center cursor-pointer text-gray-200">
                        <Upload className="mr-2 h-4 w-4 text-green-500" />
                        上传证书模板
                      </Label>
                      <p className="text-sm text-gray-400 mt-1">上传自定义证书模板，系统将自动填充考生信息</p>

                      {certificateType === "upload" && (
                        <div className="mt-3 border border-gray-600 rounded-md p-3">
                          <div className="border-2 border-dashed border-gray-600 rounded-lg p-4 text-center">
                            <Certificate className="mx-auto h-6 w-6 text-gray-400" />
                            <p className="mt-2 text-sm text-gray-300">拖放证书模板到此处，或</p>
                            <label className="mt-2 inline-block">
                              <span className="rounded-md bg-gray-700 px-2.5 py-1 text-sm font-semibold text-white shadow-sm hover:bg-gray-600 cursor-pointer">
                                浏览文件
                              </span>
                              <input
                                type="file"
                                className="sr-only"
                                accept="image/*"
                                onChange={handleCertificateUpload}
                              />
                            </label>
                          </div>

                          {certificatePreview && (
                            <div className="border border-gray-600 rounded-md p-2 mt-3">
                              <p className="text-sm font-medium mb-2 text-gray-200">证书预览：</p>
                              <div className="relative h-40 w-full">
                                <Image
                                  src={certificatePreview || "/placeholder.svg"}
                                  alt="证书预览"
                                  fill
                                  style={{ objectFit: "contain" }}
                                />
                              </div>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="flex items-start space-x-3 bg-gray-700 p-3 rounded-md">
                    <RadioGroupItem value="website" id="website-certificate" className="mt-1" />
                    <div>
                      <Label htmlFor="website-certificate" className="flex items-center cursor-pointer text-gray-200">
                        <ExternalLink className="mr-2 h-4 w-4 text-purple-500" />
                        跳转证书查询官网
                      </Label>
                      <p className="text-sm text-gray-400 mt-1">跳转到外部官方网站查询和下载证书</p>

                      {certificateType === "website" && (
                        <div className="mt-3 border border-gray-600 rounded-md p-3">
                          <div>
                            <Label htmlFor="certificate-website" className="text-gray-200">
                              证书查询网址
                            </Label>
                            <div className="relative mt-1">
                              <Globe
                                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                                size={16}
                              />
                              <Input
                                id="certificate-website"
                                placeholder="https://example.com/certificate"
                                className="pl-10 bg-gray-700 border-gray-600 text-white"
                                value={certificateWebsite}
                                onChange={(e) => setCertificateWebsite(e.target.value)}
                              />
                            </div>
                            <p className="text-xs text-gray-400 mt-1">考生将通过此网址查询和下载证书</p>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </RadioGroup>
              </>
            )}
          </div>
        )}
      </div>
    )
  }

  // 渲染关联设置
  const renderAssociationSettings = () => {
    return (
      <div className="space-y-6">
        {/* 关联课程 */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="related-course" className="text-gray-200">
                关联课程
              </Label>
              <p className="text-sm text-gray-400">已购买相关课程的学员可享受考试价格优惠</p>
            </div>
            <Switch id="related-course" checked={relatedCourse} onCheckedChange={setRelatedCourse} />
          </div>

          {relatedCourse && (
            <div className="pt-4">
              <Label htmlFor="course-select" className="text-gray-200 mb-2 block">
                选择关联课程
              </Label>
              <Select>
                <SelectTrigger className="bg-gray-700 border-gray-600 text-white">
                  <SelectValue placeholder="选择要关联的课程" />
                </SelectTrigger>
                <SelectContent className="bg-gray-800 border-gray-700 text-white">
                  {courses.map((course) => (
                    <SelectItem key={course.id} value={course.id}>
                      {course.title}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <p className="text-xs text-gray-400 mt-1">购买了关联课程的学员可享受考试优惠价</p>
            </div>
          )}
        </div>

        {/* 价格设置 */}
        <div className="space-y-4">
          <h3 className="text-lg font-medium text-white">价格设置</h3>
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="is-paid" className="text-gray-200">
                收费考试
              </Label>
              <p className="text-sm text-gray-400">学员需要付费才能参加考试</p>
            </div>
            <Switch id="is-paid" checked={isPaid} onCheckedChange={setIsPaid} />
          </div>

          {isPaid && (
            <div className="pt-4 space-y-4">
              <div>
                <Label htmlFor="agent-price" className="text-gray-200">
                  代理价格（元）
                </Label>
                <div className="relative mt-1">
                  <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">¥</span>
                  <Input
                    id="agent-price"
                    type="number"
                    min="0.01"
                    step="0.01"
                    className="pl-10 bg-gray-700 border-gray-600 text-white"
                    placeholder="输入代理价格"
                    value={agentPrice}
                    onChange={(e) => setAgentPrice(e.target.value)}
                  />
                </div>
                <p className="text-xs text-gray-400 mt-1">其他代理商添加此考试时的采购价格</p>
              </div>

              <div>
                <Label htmlFor="suggested-price" className="text-gray-200">
                  建议市场价格（元）
                </Label>
                <div className="relative mt-1">
                  <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">¥</span>
                  <Input
                    id="suggested-price"
                    type="number"
                    min="0.01"
                    step="0.01"
                    className="pl-10 bg-gray-700 border-gray-600 text-white"
                    placeholder="输入建议市场价格"
                    value={suggestedPrice}
                    onChange={(e) => setSuggestedPrice(e.target.value)}
                  />
                </div>
                <p className="text-xs text-gray-400 mt-1">建议其他代理商设置的销售价格</p>
              </div>

              {/* 添加关联课程价格 */}
              {relatedCourse && (
                <>
                  <Separator className="my-2 bg-gray-700" />
                  <h3 className="text-sm font-medium text-gray-200 mb-3">关联课程价格设置</h3>

                  <div>
                    <Label htmlFor="related-course-agent-price" className="text-gray-200">
                      关联课程代理价格（元）
                    </Label>
                    <div className="relative mt-1">
                      <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">¥</span>
                      <Input
                        id="related-course-agent-price"
                        type="number"
                        min="0.01"
                        step="0.01"
                        className="pl-10 bg-gray-700 border-gray-600 text-white"
                        placeholder="输入关联课程代理价格"
                        value={relatedCourseAgentPrice}
                        onChange={(e) => setRelatedCourseAgentPrice(e.target.value)}
                      />
                    </div>
                    <p className="text-xs text-gray-400 mt-1">关联课程情况下的代理商采购价格</p>
                  </div>

                  <div>
                    <Label htmlFor="related-course-suggested-price" className="text-gray-200">
                      关联课程建议市场价（元）
                    </Label>
                    <div className="relative mt-1">
                      <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">¥</span>
                      <Input
                        id="related-course-suggested-price"
                        type="number"
                        min="0.01"
                        step="0.01"
                        className="pl-10 bg-gray-700 border-gray-600 text-white"
                        placeholder="输入关联课程建议市场价"
                        value={relatedCourseSuggestedPrice}
                        onChange={(e) => setRelatedCourseSuggestedPrice(e.target.value)}
                      />
                    </div>
                    <p className="text-xs text-gray-400 mt-1">建议代理商设置的关联课程销售价格</p>
                  </div>
                </>
              )}

              <div>
                <Label htmlFor="price-description" className="text-gray-200">
                  价格说明
                </Label>
                <Textarea
                  id="price-description"
                  placeholder="输入价格相关说明（可选）"
                  rows={2}
                  className="bg-gray-700 border-gray-600 text-white"
                  value={priceDescription}
                  onChange={(e) => setPriceDescription(e.target.value)}
                />
                <p className="text-xs text-gray-400 mt-1">可说明价格包含的服务内容、优惠政策等</p>
              </div>
            </div>
          )}
        </div>

        {/* 分享设置 */}
        <div className="space-y-4">
          <h3 className="text-lg font-medium text-white">分享设置</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="share-options" className="text-gray-200">
                  分享选项
                </Label>
                <p className="text-sm text-gray-400">选择要分享到考测市场的内容</p>
              </div>
            </div>

            <div className="grid gap-2 bg-gray-900 p-3 rounded-md">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="share-exam"
                  checked={shareExam}
                  onCheckedChange={setShareExam}
                  className="data-[state=checked]:bg-blue-600 data-[state=checked]:border-blue-600"
                />
                <Label htmlFor="share-exam" className="text-gray-200 cursor-pointer">
                  分享考试到考测市场
                </Label>
              </div>

              {relatedCourse && (
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="share-related-course-exam"
                    checked={shareRelatedCourseExam}
                    onCheckedChange={setShareRelatedCourseExam}
                    className="data-[state=checked]:bg-blue-600 data-[state=checked]:border-blue-600"
                  />
                  <Label htmlFor="share-related-course-exam" className="text-gray-200 cursor-pointer">
                    分享关联课程考试到考测市场
                  </Label>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    )
  }

  // 渲染考试助手设置
  const renderAssistantSettings = () => {
    return (
      <div className="space-y-6">
        {/* 考测AI助理 */}
        <div className="space-y-4">
          <h3 className="text-lg font-medium text-white flex items-center">
            <Bot className="mr-2 h-5 w-5 text-blue-400" />
            考测AI助理
          </h3>
          <p className="text-sm text-gray-300">自动根据考试介绍和规则创建AI助理，帮助考生了解考试内容和要求。</p>
          <Button type="button" onClick={createExamAIAssistant} disabled={isCreatingAIAssistant} className="w-full">
            {isCreatingAIAssistant ? (
              <>
                <div className="animate-spin mr-2 h-4 w-4 border-2 border-current border-t-transparent rounded-full"></div>
                创建中...
              </>
            ) : (
              <>
                <Bot className="mr-2 h-4 w-4" />
                创建考测AI助理
              </>
            )}
          </Button>

          {showAIAssistantSettings && (
            <div className="mt-4 border border-gray-700 rounded-md p-4 bg-gray-800/50">
              <div className="space-y-4">
                <div>
                  <Label htmlFor="ai-assistant-name" className="text-gray-200">
                    AI助理名称
                  </Label>
                  <Input
                    id="ai-assistant-name"
                    defaultValue={`${examTitle}考试助理`}
                    className="bg-gray-700 border-gray-600 text-white mt-1"
                  />
                </div>

                <div>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="ai-assistant-prompt" className="text-gray-200">
                      AI助理提示词
                    </Label>
                    <Button variant="ghost" size="sm" className="h-7 text-xs text-blue-400">
                      <Sparkles className="mr-1 h-3 w-3" />
                      优化提示词
                    </Button>
                  </div>
                  <Textarea
                    id="ai-assistant-prompt"
                    rows={6}
                    className="bg-gray-700 border-gray-600 text-white mt-1 font-mono text-sm"
                    value={aiAssistantPrompt}
                    onChange={(e) => setAiAssistantPrompt(e.target.value)}
                  />
                  <p className="text-xs text-gray-400 mt-1">提示词决定了AI助理的行为和回答方式，您可以根据需要修改。</p>
                </div>

                <Alert className="bg-blue-900 border-blue-800 text-blue-100">
                  <Lightbulb className="h-4 w-4 text-blue-400" />
                  <AlertTitle>提示</AlertTitle>
                  <AlertDescription className="text-blue-200">
                    考测AI助理将出现在官网首页"的考测"板块页面里的每一个考试项目中，帮助考生了解考试内容和规则。
                  </AlertDescription>
                </Alert>

                <div className="flex justify-end space-x-3 pt-2">
                  <Button
                    variant="outline"
                    onClick={() => setShowAIAssistantSettings(false)}
                    className="border-gray-600 text-gray-300"
                  >
                    取消
                  </Button>
                  <Button onClick={saveAIAssistantSettings}>
                    <Save className="mr-2 h-4 w-4" />
                    保存设置
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* AI代理说明 */}
        <div className="space-y-4">
          <h3 className="text-lg font-medium text-white flex items-center">
            <MessageSquareText className="mr-2 h-5 w-5 text-green-400" />
            AI代理说明
          </h3>
          <p className="text-sm text-gray-300">创建AI助理解答代理商关于考试内容、销售政策和推广建议等问题。</p>
          <Button
            type="button"
            onClick={createAgentAIAssistant}
            disabled={isCreatingAgentAI}
            className="w-full bg-green-600 hover:bg-green-700"
          >
            {isCreatingAgentAI ? (
              <>
                <div className="animate-spin mr-2 h-4 w-4 border-2 border-current border-t-transparent rounded-full"></div>
                创建中...
              </>
            ) : (
              <>
                <MessageSquareText className="mr-2 h-4 w-4" />
                创建AI代理说明
              </>
            )}
          </Button>

          {showAgentAISettings && (
            <div className="mt-4 border border-gray-700 rounded-md p-4 bg-gray-800/50">
              <div className="space-y-4">
                <div>
                  <Label htmlFor="agent-ai-name" className="text-gray-200">
                    AI助理名称
                  </Label>
                  <Input
                    id="agent-ai-name"
                    defaultValue={`${examTitle}代理销售助理`}
                    className="bg-gray-700 border-gray-600 text-white mt-1"
                  />
                </div>

                <div>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="agent-ai-prompt" className="text-gray-200">
                      AI助理提示词
                    </Label>
                    <Button variant="ghost" size="sm" className="h-7 text-xs text-blue-400">
                      <Sparkles className="mr-1 h-3 w-3" />
                      优化提示词
                    </Button>
                  </div>
                  <Textarea
                    id="agent-ai-prompt"
                    rows={6}
                    className="bg-gray-700 border-gray-600 text-white mt-1 font-mono text-sm"
                    value={agentAIPrompt}
                    onChange={(e) => setAgentAIPrompt(e.target.value)}
                  />
                  <p className="text-xs text-gray-400 mt-1">提示词决定了AI助理的行为和回答方式，您可以根据需要修改。</p>
                </div>

                <Alert className="bg-green-900 border-green-800 text-green-100">
                  <Lightbulb className="h-4 w-4 text-green-400" />
                  <AlertTitle>提示</AlertTitle>
                  <AlertDescription className="text-green-200">
                    AI代理说明助理将出现在"考测设置"页面里"考测市场"的每个考试中，帮助代理商了解考试内容、销售政策和推广建议。
                  </AlertDescription>
                </Alert>

                <div className="flex justify-end space-x-3 pt-2">
                  <Button
                    variant="outline"
                    onClick={() => setShowAgentAISettings(false)}
                    className="border-gray-600 text-gray-300"
                  >
                    取消
                  </Button>
                  <Button onClick={saveAgentAISettings} className="bg-green-600 hover:bg-green-700">
                    <Save className="mr-2 h-4 w-4" />
                    保存设置
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto p-4 bg-gray-900 text-white min-h-screen">
      <div className="mb-6 flex items-center">
        <Button variant="ghost" size="sm" onClick={handleBackClick} className="text-gray-300">
          <ArrowLeft className="mr-2 h-4 w-4" />
          返回
        </Button>
        <h1 className="text-2xl font-bold ml-2">创建考试</h1>
      </div>

      {/* 步骤指示器 */}
      <div className="mb-8">
        <div className="flex justify-between items-center">
          {steps.map((step, index) => (
            <div key={step.id} className="flex flex-col items-center">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  index < currentStepIndex
                    ? "bg-green-600"
                    : index === currentStepIndex
                      ? "bg-purple-600"
                      : "bg-gray-700"
                }`}
              >
                {index < currentStepIndex ? "✓" : index + 1}
              </div>
              <span className={`text-xs mt-2 ${index === currentStepIndex ? "text-purple-400" : "text-gray-400"}`}>
                {step.title}
              </span>
            </div>
          ))}
        </div>
        <div className="relative mt-2">
          <div className="absolute top-0 left-0 h-1 bg-gray-700 w-full"></div>
          <div
            className="absolute top-0 left-0 h-1 bg-purple-600"
            style={{ width: `${(currentStepIndex / (steps.length - 1)) * 100}%` }}
          ></div>
        </div>
      </div>

      {/* 当前步骤内容 */}
      <Card className="bg-gray-800 border-gray-700 shadow-lg">
        <CardHeader className="border-b border-gray-700">
          <CardTitle>{currentStep.title}</CardTitle>
          <p className="text-sm text-gray-400">{currentStep.description}</p>
        </CardHeader>
        <CardContent className="pt-6">
          {/* 基本信息 */}
          {currentStepIndex === 0 && (
            <div className="space-y-6">
              <div>
                <Label htmlFor="exam-title" className="text-gray-200">
                  考试标题
                </Label>
                <Input
                  id="exam-title"
                  placeholder="输入考试标题"
                  value={examTitle}
                  onChange={(e) => setExamTitle(e.target.value)}
                  className="bg-gray-700 border-gray-600 text-white"
                />
              </div>

              {/* 考试封面 */}
              <div>
                <Label className="text-gray-200 mb-2 block">考试封面</Label>
                <div className="border-2 border-dashed border-gray-600 rounded-lg p-4 text-center">
                  {examCover ? (
                    <div className="relative">
                      <div className="relative h-40 w-full rounded-md overflow-hidden">
                        <Image
                          src={examCover.preview || "/placeholder.svg"}
                          alt="考试封面"
                          fill
                          style={{ objectFit: "cover" }}
                        />
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="absolute top-2 right-2 bg-gray-800 bg-opacity-70 text-white rounded-full p-1 h-8 w-8"
                        onClick={() => setExamCover(null)}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  ) : (
                    <>
                      <ImageIcon className="mx-auto h-8 w-8 text-gray-400" />
                      <p className="mt-2 text-sm text-gray-300">拖放图片到此处，或</p>
                      <label className="mt-2 inline-block">
                        <span className="rounded-md bg-gray-700 px-2.5 py-1 text-sm font-semibold text-white shadow-sm hover:bg-gray-600 cursor-pointer">
                          浏览文件
                        </span>
                        <input type="file" className="sr-only" accept="image/*" onChange={handleExamCoverUpload} />
                      </label>
                      <p className="mt-2 text-xs text-gray-400">支持JPG、PNG格式，建议尺寸1200x630</p>
                    </>
                  )}
                </div>
              </div>

              <div>
                <Label htmlFor="exam-description" className="text-gray-200">
                  考试描述
                </Label>
                <Textarea
                  id="exam-description"
                  placeholder="输入考试描述"
                  rows={3}
                  value={examDescription}
                  onChange={(e) => setExamDescription(e.target.value)}
                  disabled={isGeneratingDescription}
                  className="bg-gray-700 border-gray-600 text-white"
                />
                <div className="flex flex-wrap gap-2 mt-2">
                  <Button
                    type="button"
                    variant="secondary"
                    size="sm"
                    onClick={generateExamDescription}
                    disabled={isGeneratingDescription}
                  >
                    {isGeneratingDescription ? (
                      <>
                        <div className="animate-spin mr-2 h-4 w-4 border-2 border-current border-t-transparent rounded-full"></div>
                        生成中...
                      </>
                    ) : (
                      <>
                        <Sparkles className="mr-2 h-4 w-4" />
                        AI生成描述
                      </>
                    )}
                  </Button>

                  {/* 上传文档生成描述 */}
                  <div className="relative">
                    <Button type="button" variant="secondary" size="sm">
                      <FileText className="mr-2 h-4 w-4" />
                      上传文档生成
                    </Button>
                    <input
                      type="file"
                      className="absolute inset-0 opacity-0 cursor-pointer"
                      accept=".doc,.docx,.pdf"
                      onChange={handleDescriptionDocUpload}
                    />
                  </div>

                  {/* 上传图片生成描述 */}
                  <div className="relative">
                    <Button type="button" variant="secondary" size="sm">
                      <ImageIcon className="mr-2 h-4 w-4" />
                      上传图片生成
                    </Button>
                    <input
                      type="file"
                      className="absolute inset-0 opacity-0 cursor-pointer"
                      accept="image/*"
                      onChange={handleDescriptionImageUpload}
                    />
                  </div>
                </div>

                {/* 显示上传的文档或图片 */}
                {(uploadedDescriptionDoc || uploadedDescriptionImage) && (
                  <div className="mt-3 p-3 rounded-md bg-gray-700 border border-gray-600">
                    {uploadedDescriptionDoc && (
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <FileText className="h-5 w-5 text-blue-400 mr-2" />
                          <div>
                            <p className="text-sm font-medium text-gray-200">{uploadedDescriptionDoc.name}</p>
                            <p className="text-xs text-gray-400">{Math.round(uploadedDescriptionDoc.size / 1024)} KB</p>
                          </div>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => setUploadedDescriptionDoc(null)}
                          className="text-gray-400 hover:text-white"
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    )}

                    {uploadedDescriptionImage && (
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <div className="h-12 w-12 relative mr-2 rounded-md overflow-hidden">
                            <Image
                              src={uploadedDescriptionImage.preview || "/placeholder.svg"}
                              alt="描述图片"
                              fill
                              style={{ objectFit: "cover" }}
                            />
                          </div>
                          <div>
                            <p className="text-sm font-medium text-gray-200">{uploadedDescriptionImage.file.name}</p>
                            <p className="text-xs text-gray-400">
                              {Math.round(uploadedDescriptionImage.file.size / 1024)} KB
                            </p>
                          </div>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => setUploadedDescriptionImage(null)}
                          className="text-gray-400 hover:text-white"
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* 考试设置 */}
          {currentStepIndex === 1 && (
            <div className="space-y-5">
              {/* 考试有效期 */}
              <div>
                <Label className="text-gray-200">考试有效期</Label>
                <RadioGroup
                  value={validityPeriod}
                  onValueChange={setValidityPeriod}
                  className="flex flex-col space-y-3 mt-2"
                >
                  <div className="flex items-start space-x-3 bg-gray-700 p-3 rounded-md">
                    <RadioGroupItem value="unlimited" id="unlimited-validity" className="mt-1" />
                    <div>
                      <Label htmlFor="unlimited-validity" className="flex items-center cursor-pointer text-gray-200">
                        <Clock className="mr-2 h-4 w-4 text-blue-500" />
                        不限时间
                      </Label>
                      <p className="text-sm text-gray-400 mt-1">考试永久有效，考生可以随时参加考试</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3 bg-gray-700 p-3 rounded-md">
                    <RadioGroupItem value="limited" id="limited-validity" className="mt-1" />
                    <div className="w-full">
                      <Label htmlFor="limited-validity" className="flex items-center cursor-pointer text-gray-200">
                        <CalendarIcon className="mr-2 h-4 w-4 text-green-500" />
                        限时有效
                      </Label>
                      <p className="text-sm text-gray-400 mt-1">设置考试的开始和结束时间</p>

                      {validityPeriod === "limited" && (
                        <div className="grid grid-cols-2 gap-3 mt-3">
                          <div>
                            <Label htmlFor="exam-start-date" className="text-gray-200 text-sm">
                              开始时间
                            </Label>
                            <div className="mt-1">
                              <Popover>
                                <PopoverTrigger asChild>
                                  <Button
                                    variant="outline"
                                    className={cn(
                                      "w-full justify-start text-left font-normal bg-gray-700 border-gray-600 text-white",
                                      !examStartDate && "text-gray-400",
                                    )}
                                  >
                                    <CalendarIcon className="mr-2 h-4 w-4" />
                                    {examStartDate ? format(examStartDate, "yyyy-MM-dd") : "选择日期"}
                                  </Button>
                                </PopoverTrigger>
                                <PopoverContent className="w-auto p-0 bg-gray-800 border-gray-700">
                                  <Calendar
                                    mode="single"
                                    selected={examStartDate}
                                    onSelect={(date) => date && setExamStartDate(date)}
                                    initialFocus
                                    className="bg-gray-800 text-white"
                                  />
                                </PopoverContent>
                              </Popover>
                            </div>
                          </div>
                          <div>
                            <Label htmlFor="exam-end-date" className="text-gray-200 text-sm">
                              结束时间
                            </Label>
                            <div className="mt-1">
                              <Popover>
                                <PopoverTrigger asChild>
                                  <Button
                                    variant="outline"
                                    className={cn(
                                      "w-full justify-start text-left font-normal bg-gray-700 border-gray-600 text-white",
                                      !examEndDate && "text-gray-400",
                                    )}
                                  >
                                    <CalendarIcon className="mr-2 h-4 w-4" />
                                    {examEndDate ? format(examEndDate, "yyyy-MM-dd") : "选择日期"}
                                  </Button>
                                </PopoverTrigger>
                                <PopoverContent className="w-auto p-0 bg-gray-800 border-gray-700">
                                  <Calendar
                                    mode="single"
                                    selected={examEndDate}
                                    onSelect={(date) => date && setExamEndDate(date)}
                                    initialFocus
                                    className="bg-gray-800 text-white"
                                  />
                                </PopoverContent>
                              </Popover>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </RadioGroup>
              </div>

              {/* 考试时长和通过分数 */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="exam-duration" className="text-gray-200">
                    考试时长（分钟）
                  </Label>
                  <Input
                    id="exam-duration"
                    type="number"
                    min="1"
                    value={examDuration}
                    onChange={(e) => setExamDuration(e.target.value)}
                    className="bg-gray-700 border-gray-600 text-white"
                  />
                </div>
                <div>
                  <Label htmlFor="passing-score" className="text-gray-200">
                    通过分数（百分比）
                  </Label>
                  <Input
                    id="passing-score"
                    type="number"
                    min="1"
                    max="100"
                    value={passingScore}
                    onChange={(e) => setPassingScore(e.target.value)}
                    className="bg-gray-700 border-gray-600 text-white"
                  />
                </div>
              </div>

              {/* 考试次数 */}
              <div>
                <Label className="text-gray-200">考试次数</Label>
                <RadioGroup
                  value={attemptLimit}
                  onValueChange={setAttemptLimit}
                  className="flex flex-col space-y-3 mt-2"
                >
                  <div className="flex items-start space-x-3 bg-gray-700 p-3 rounded-md">
                    <RadioGroupItem value="unlimited" id="unlimited-attempts" className="mt-1" />
                    <div>
                      <Label htmlFor="unlimited-attempts" className="flex items-center cursor-pointer text-gray-200">
                        <Repeat className="mr-2 h-4 w-4 text-blue-500" />
                        不限制次数
                      </Label>
                      <p className="text-sm text-gray-400 mt-1">考生可以无限次参加考试</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3 bg-gray-700 p-3 rounded-md">
                    <RadioGroupItem value="limited" id="limited-attempts" className="mt-1" />
                    <div className="w-full">
                      <Label htmlFor="limited-attempts" className="flex items-center cursor-pointer text-gray-200">
                        <CheckCircle className="mr-2 h-4 w-4 text-green-500" />
                        限制次数
                      </Label>
                      <p className="text-sm text-gray-400 mt-1">限制考生参加考试的最大次数</p>

                      {attemptLimit === "limited" && (
                        <div className="mt-3">
                          <Label htmlFor="max-attempts" className="text-gray-200 text-sm">
                            最大考试次数
                          </Label>
                          <Input
                            id="max-attempts"
                            type="number"
                            min="1"
                            value={maxAttempts}
                            onChange={(e) => setMaxAttempts(e.target.value)}
                            className="bg-gray-600 border-gray-500 text-white mt-1 w-full md:w-1/3"
                          />
                        </div>
                      )}
                    </div>
                  </div>
                </RadioGroup>
              </div>

              {/* 随机题目顺序 */}
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="shuffle-questions" className="text-gray-200">
                    随机题目顺序
                  </Label>
                  <p className="text-sm text-gray-400">每次考试随机打乱题目顺序</p>
                </div>
                <Switch id="shuffle-questions" checked={shuffleQuestions} onCheckedChange={setShuffleQuestions} />
              </div>

              {/* 高级设置 */}
              <div>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="advanced-settings" className="flex items-center text-gray-200">
                      <Settings className="mr-2 h-4 w-4 text-purple-500" />
                      高级设置
                    </Label>
                    <p className="text-sm text-gray-400">显示更多考试设置选项</p>
                  </div>
                  <Switch
                    id="advanced-settings"
                    checked={showAdvancedSettings}
                    onCheckedChange={setShowAdvancedSettings}
                  />
                </div>

                {showAdvancedSettings && (
                  <div className="mt-4 space-y-4 border border-gray-700 rounded-md p-4 bg-gray-800/50">
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="show-question-scores" className="text-gray-200">
                          显示题目分值
                        </Label>
                        <p className="text-sm text-gray-400">在考试中显示每道题的分值</p>
                      </div>
                      <Switch
                        id="show-question-scores"
                        checked={showQuestionScores}
                        onCheckedChange={setShowQuestionScores}
                      />
                    </div>

                    <div>
                      <Label className="text-gray-200">成绩展示</Label>
                      <RadioGroup
                        value={resultDisplay}
                        onValueChange={setResultDisplay}
                        className="flex flex-col space-y-2 mt-2"
                      >
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="immediate" id="immediate-result" />
                          <Label htmlFor="immediate-result" className="cursor-pointer text-gray-200">
                            提交后立即显示
                          </Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="after_all_submissions" id="after-all-submissions" />
                          <Label htmlFor="after-all-submissions" className="cursor-pointer text-gray-200">
                            所有考生提交后显示
                          </Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="manual_release" id="manual-release" />
                          <Label htmlFor="manual-release" className="cursor-pointer text-gray-200">
                            手动发布成绩
                          </Label>
                        </div>
                      </RadioGroup>
                    </div>

                    <div>
                      <Label className="text-gray-200">答案展示</Label>
                      <RadioGroup
                        value={answerDisplay}
                        onValueChange={setAnswerDisplay}
                        className="flex flex-col space-y-2 mt-2"
                      >
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="after_submission" id="after-submission" />
                          <Label htmlFor="after-submission" className="cursor-pointer text-gray-200">
                            提交后显示答案
                          </Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="after_all_submissions" id="after-all-answers" />
                          <Label htmlFor="after-all-answers" className="cursor-pointer text-gray-200">
                            所有考生提交后显示
                          </Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="never" id="never-show" />
                          <Label htmlFor="never-show" className="cursor-pointer text-gray-200">
                            不显示答案
                          </Label>
                        </div>
                      </RadioGroup>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* 考试内容 */}
          {currentStepIndex === 2 && (
            <div className="space-y-6">
              {/* 考试类型 */}
              <div>
                <Label className="text-gray-200">考试类型</Label>
                <RadioGroup value={examType} onValueChange={setExamType} className="flex flex-col space-y-3 mt-2">
                  <div className="flex items-start space-x-3 bg-gray-700 p-3 rounded-md">
                    <RadioGroupItem value="mock" id="mock" className="mt-1" />
                    <div>
                      <Label htmlFor="mock" className="flex items-center cursor-pointer text-gray-200">
                        <FileText className="mr-2 h-4 w-4 text-blue-500" />
                        模拟考试
                      </Label>
                      <p className="text-sm text-gray-400 mt-1">用于练习和自我评估，不颁发正式证书</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3 bg-gray-700 p-3 rounded-md">
                    <RadioGroupItem value="certificate" id="certificate" className="mt-1" />
                    <div>
                      <Label htmlFor="certificate" className="flex items-center cursor-pointer text-gray-200">
                        <Award className="mr-2 h-4 w-4 text-green-500" />
                        证书考试
                      </Label>
                      <p className="text-sm text-gray-400 mt-1">通过考试后颁发正式证书，可用于专业认证</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3 bg-gray-700 p-3 rounded-md">
                    <RadioGroupItem value="competition" id="competition" className="mt-1" />
                    <div>
                      <Label htmlFor="competition" className="flex items-center cursor-pointer text-gray-200">
                        <Trophy className="mr-2 h-4 w-4 text-purple-500" />
                        竞赛活动
                      </Label>
                      <p className="text-sm text-gray-400 mt-1">用于举办竞赛，可设置排名和奖励</p>
                    </div>
                  </div>
                </RadioGroup>
              </div>

              {/* 考试内容选项 */}
              <div className="mt-6">{renderExamContentOptions()}</div>
            </div>
          )}

          {/* 报名设置 */}
          {currentStepIndex === 3 && renderRegistrationSettings()}

          {/* 证书设置 */}
          {currentStepIndex === 4 && renderCertificateSettings()}

          {/* 关联设置 */}
          {currentStepIndex === 5 && renderAssociationSettings()}

          {/* 考试助手设置 */}
          {currentStepIndex === 6 && renderAssistantSettings()}
        </CardContent>
      </Card>

      {/* 导航按钮 */}
      <div className="mt-6 flex justify-between">
        <Button
          variant="outline"
          onClick={handlePrevious}
          disabled={currentStepIndex === 0}
          className="border-gray-700 text-white hover:bg-gray-700"
        >
          <ChevronLeft className="mr-2 h-4 w-4" /> 上一步
        </Button>

        <div className="flex space-x-2">
          <Button variant="outline" onClick={handleBackClick} className="border-gray-700 text-white hover:bg-gray-700">
            取消
          </Button>

          {currentStepIndex < steps.length - 1 ? (
            <Button
              onClick={handleNext}
              className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700"
            >
              下一步 <ChevronRight className="ml-2 h-4 w-4" />
            </Button>
          ) : (
            <Button
              onClick={handleFinish}
              disabled={isSubmitting}
              className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700"
            >
              {isSubmitting ? (
                <>
                  <div className="animate-spin mr-2 h-4 w-4 border-2 border-current border-t-transparent rounded-full"></div>
                  保存中...
                </>
              ) : (
                <>
                  <Save className="mr-2 h-4 w-4" /> 完成创建
                </>
              )}
            </Button>
          )}
        </div>
      </div>

      {/* 退出确认对话框 */}
      <Dialog open={isExitDialogOpen} onOpenChange={setIsExitDialogOpen}>
        <DialogContent className="sm:max-w-md bg-gray-800 border-gray-700 text-white">
          <DialogHeader>
            <DialogTitle>保存草稿</DialogTitle>
            <DialogDescription className="text-gray-300">
              您的设置已保存至草稿箱，可下次继续完成创建。
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="mt-4">
            <Button variant="outline" onClick={() => setIsExitDialogOpen(false)} className="border-gray-600">
              继续编辑
            </Button>
            <Button onClick={handleConfirmExit}>返回列表</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
