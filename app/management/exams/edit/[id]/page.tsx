"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { ArrowLeft, FileText, Award, Trophy, Sparkles, Trash2, X, ImageIcon } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

export default function EditExam({ params }) {
  const router = useRouter()
  const { id } = params

  const [isLoading, setIsLoading] = useState(true)
  const [activeTab, setActiveTab] = useState("ai-generated")
  const [examType, setExamType] = useState("mock")
  const [issueCertificate, setIssueCertificate] = useState(false)
  const [certificateType, setCertificateType] = useState("ai-generated")
  const [isPaid, setIsPaid] = useState(false)
  const [price, setPrice] = useState("")
  const [shareToMarket, setShareToMarket] = useState(false)
  const [selectedCourse, setSelectedCourse] = useState("")
  const [examTitle, setExamTitle] = useState("")
  const [examDescription, setExamDescription] = useState("")
  const [examDuration, setExamDuration] = useState("60")
  const [passingScore, setPassingScore] = useState("60")
  const [uploadedFile, setUploadedFile] = useState(null)
  const [uploadedDescriptionImage, setUploadedDescriptionImage] = useState(null)
  const [uploadedDescriptionDoc, setUploadedDescriptionDoc] = useState(null)
  const [certificatePreview, setCertificatePreview] = useState(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)
  const [isGeneratingDescription, setIsGeneratingDescription] = useState(false)
  const [agentPrice, setAgentPrice] = useState("")
  const [suggestedPrice, setSuggestedPrice] = useState("")
  const [priceDescription, setPriceDescription] = useState("")

  // 模拟课程列表
  const courses = [
    { id: "c1", title: "Python编程基础", lessons: 24 },
    { id: "c2", title: "数据分析入门", lessons: 18 },
    { id: "c3", title: "人工智能导论", lessons: 30 },
    { id: "c4", title: "Web前端开发", lessons: 22 },
  ]

  // 模拟加载考试数据
  useEffect(() => {
    // 模拟API请求延迟
    const timer = setTimeout(() => {
      // 根据ID加载不同的模拟数据
      if (id === "e1") {
        setExamTitle("Python编程能力评估")
        setExamDescription("全面评估Python编程基础知识和实际应用能力，包含选择题和编程题。")
        setExamType("mock")
        setActiveTab("ai-generated")
        setSelectedCourse("c1")
        setExamDuration("90")
        setPassingScore("70")
        setIssueCertificate(false)
        setIsPaid(false)
        setShareToMarket(true)
      } else if (id === "e2") {
        setExamTitle("数据分析师认证考试")
        setExamDescription("专业数据分析能力认证，涵盖数据处理、统计分析和数据可视化等核心技能。")
        setExamType("certificate")
        setActiveTab("ai-generated")
        setSelectedCourse("c2")
        setExamDuration("120")
        setPassingScore("75")
        setIssueCertificate(true)
        setCertificateType("ai-generated")
        setCertificatePreview("/images/certificate-2.png")
        setIsPaid(true)
        setPrice("199")
        setShareToMarket(false)
        setAgentPrice("149")
        setSuggestedPrice("249")
        setPriceDescription("包含证书打印和邮寄服务，支持分期付款")
      } else {
        setExamTitle("AI基础知识测试")
        setExamDescription("测试人工智能基础概念和应用知识的掌握程度。")
        setExamType("mock")
        setActiveTab("upload")
        setExamDuration("60")
        setPassingScore("60")
        setIssueCertificate(false)
        setIsPaid(false)
        setShareToMarket(false)
        setUploadedFile({ name: "AI基础知识题库.pdf", size: 1024 * 500 })
      }

      setIsLoading(false)
    }, 1000)

    return () => clearTimeout(timer)
  }, [id])

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
        setExamDescription(`基于您上传的文档《${file.name}》，生成的考试描述：这是一个全面评估考生在相关领域专业知识和实践能力的考试。考试覆盖了核心理论知识和实际应用场景，旨在客观公正地测量考生的能力水平。通过考试不仅能够获得专业认证，还能提升自身竞争力。`)
        setIsGeneratingDescription(false)
      }, 2000)
    }
  }

  // 处理描述图片上传
  const handleDescriptionImageUpload = (e) => {
    const file = e.target.files[0]
    if (file) {
      // 检查文件类型
      if (!file.type.startsWith('image/')) {
        alert("请上传图片格式文件")
        return
      }

      // 创建预览URL
      const previewUrl = URL.createObjectURL(file)
      setUploadedDescriptionImage({ file, preview: previewUrl })
      
      // 模拟AI处理过程
      setIsGeneratingDescription(true)
      setTimeout(() => {
        setExamDescription("基于您上传的图片，生成的考试描述：从图片内容可以看出，这是一个专业性强的考试项目，旨在评估考生在实际环境中应用所学知识解决问题的能力。考试强调理论与实践的结合，注重考察分析能力和创新思维。通过考试可以有效检验学习成果，为职业发展奠定基础。")
        setIsGeneratingDescription(false)
      }, 2000)
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

  // 处理表单提交
  const handleSubmit = (e) => {
    e.preventDefault()

    // 验证必填字段
    if (!examTitle) {
      alert("请填写考试标题")
      return
    }

    if (activeTab === "ai-generated" && !selectedCourse) {
      alert("请选择一个课程")
      return
    }

    if (activeTab === "upload" && !uploadedFile) {
      alert("请上传考试题库文件")
      return
    }

    if (issueCertificate && certificateType === "upload" && !certificatePreview) {
      alert("请上传证书模板")
      return
    }

    if (isPaid) {
      if (!price || isNaN(Number.parseFloat(price)) || Number.parseFloat(price) <= 0) {
        alert("请输入有效的销售价格")
        return
      }

      if (agentPrice && (isNaN(Number.parseFloat(agentPrice)) || Number.parseFloat(agentPrice) <= 0)) {
        alert("请输入有效的代理价格")
        return
      }

      if (suggestedPrice && (isNaN(Number.parseFloat(suggestedPrice)) || Number.parseFloat(suggestedPrice) <= 0)) {
        alert("请输入有效的建议市场价格")
        return
      }
    }

    setIsSubmitting(true)

    // 模拟提交过程
    setTimeout(() => {
      setIsSubmitting(false)
      alert("考试更新成功！")
      router.push("/management/exams")
    }, 2000)
  }

  // 处理删除考试
  const handleDeleteExam = () => {
    setIsSubmitting(true)

    // 模拟删除过程
    setTimeout(() => {
      setIsSubmitting(false)
      setShowDeleteConfirm(false)
      alert("考试已删除！")
      router.push("/management/exams")
    }, 1500)
  }

  if (isLoading) {
    return (
      <div className="container mx-auto p-4 max-w-4xl bg-gray-900 text-gray-100">
        <div className="animate-pulse space-y-6">
          <div className="h-8 bg-gray-800 rounded w-1/4"></div>
          <div className="h-64 bg-gray-800 rounded"></div>
          <div className="h-64 bg-gray-800 rounded"></div>
          <div className="h-40 bg-gray-800 rounded"></div>
          <div className="h-24 bg-gray-800 rounded"></div>
          <div className="flex justify-end">
            <div className="h-10 bg-gray-800 rounded w-24"></div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto p-4 max-w-4xl bg-gray-900 text-gray-100">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center">
          <Link href="/management/exams">
            <Button variant="ghost" size="sm" className="text-gray-300">
              <ArrowLeft className="mr-2 h-4 w-4" />
              返回
            </Button>
          </Link>
          <h1 className="text-2xl font-bold ml-2 text-white">编辑考试</h1>
        </div>
        <Button variant="destructive" size="sm" onClick={() => setShowDeleteConfirm(true)}>
          <Trash2 className="mr-2 h-4 w-4" />
          删除考试
        </Button>
      </div>

      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
          <div className="bg-gray-800 rounded-lg p-6 max-w-md w-full border border-gray-700">
            <h3 className="text-lg font-bold mb-4 text-white">确认删除</h3>
            <p className="mb-6 text-gray-300">您确定要删除此考试吗？此操作无法撤销。</p>
            <div className="flex justify-end space-x-2">
              <Button variant="outline" onClick={() => setShowDeleteConfirm(false)} disabled={isSubmitting} className="border-gray-600 text-gray-200">
                取消
              </Button>
              <Button variant="destructive" onClick={handleDeleteExam} disabled={isSubmitting}>
                {isSubmitting ? (
                  <>
                    <div className="animate-spin mr-2 h-4 w-4 border-2 border-current border-t-transparent rounded-full"></div>
                    删除中...
                  </>
                ) : (
                  "确认删除"
                )}
              </Button>
            </div>
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div className="space-y-6">
          {/* 基本信息 */}
          <Card className="bg-gray-800 border-gray-700">
            <CardHeader>
              <CardTitle className="text-white">基本信息</CardTitle>
              <CardDescription className="text-gray-300">设置考试的基本信息和类型</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 gap-4">
                <div>
                  <Label htmlFor="exam-title" className="text-gray-200">考试标题</Label>
                  <Input
                    id="exam-title"
                    placeholder="输入考试标题"
                    value={examTitle}
                    onChange={(e) => setExamTitle(e.target.value)}
                    className="bg-gray-700 border-gray-600 text-white"
                  />
                </div>

                <div>
                  <Label htmlFor="exam-description" className="text-gray-200">考试描述</Label>
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
                      variant="outline"
                      size="sm"
                      onClick={generateExamDescription}
                      disabled={isGeneratingDescription}
                      className="border-gray-600 text-gray-200"
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
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        className="border-gray-600 text-gray-200"
                      >
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
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        className="border-gray-600 text-gray-200"
                      >
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
                              <p className="text-xs text-gray-400">{Math.round(uploadedDescriptionImage.file.size / 1024)} KB</p>
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

                <div>
                  <Label className="text-gray-200">考试类型</Label>
                  <RadioGroup value={examType} onValueChange={setExamType} className="flex flex-col space-y-1 mt-2">
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="mock" id="mock" />
                      <Label htmlFor="mock" className="flex items-center cursor-pointer text-gray-200">
                        <FileText className="mr-2 h-4 w-4 text-blue-500" />
                        模拟考试
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="certificate" id="certificate" />
                      <Label htmlFor="certificate" className="flex items-center cursor-pointer text-gray-200">
                        <Award className="mr-2 h-4 w-4 text-green-500" />
                        证书考试
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="competition" id="competition" />
                      <Label htmlFor="competition" className="flex items-center cursor-pointer text-gray-200">
                        <Trophy className="mr-2 h-4 w-4 text-purple-500" />
                        竞赛活动
                      </Label>
                    </div>
                  </RadioGroup>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="exam-duration" className="text-gray\
