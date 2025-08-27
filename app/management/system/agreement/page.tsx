"use client"

import { useState } from "react"
import { ArrowLeft, Save, Check, Bold, Italic, List, ListOrdered, Heading } from "lucide-react"
import Link from "next/link"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Textarea } from "@/components/ui/textarea"

export default function AgreementSettings() {
  // 表单状态
  const [userAgreement, setUserAgreement] = useState(
    `# 用户服务协议

欢迎使用我们的服务！

本协议是您与本平台之间关于使用本平台服务所订立的契约。请您仔细阅读本协议，如果您不同意本协议中的任何条款，您应立即停止使用本平台服务。

## 1. 服务内容

本平台是一个AI驱动的智能学习平台，提供在线课程、模拟考试和智能辅导等服务。

## 2. 用户账号

用户注册成功后，将获得一个用户账号及相应的密码，该账号和密码由用户负责保管。

## 3. 用户行为规范

用户在使用本平台服务时，必须遵守中华人民共和国相关法律法规的规定，不得利用本平台服务进行任何违法或不当的活动。

## 4. 知识产权

本平台的所有内容，包括但不限于文字、图片、音频、视频、软件、程序、数据及其所有权等知识产权，均受版权、商标、专利等相关法律法规的保护。

## 5. 隐私保护

本平台重视用户隐私保护，具体隐私保护政策请参见《隐私政策》。

## 6. 免责声明

对于因不可抗力或本平台不能控制的原因造成的服务中断或其它缺陷，本平台不承担任何责任。

## 7. 协议修改

本平台有权在必要时修改本协议条款，协议条款变更后，如果您继续使用本平台服务，即视为您已接受修改后的协议。

## 8. 法律适用

本协议的订立、执行和解释及争议的解决均应适用中华人民共和国法律。

最后更新日期：2025年4月1日`,
  )

  const [privacyPolicy, setPrivacyPolicy] = useState(
    `# 隐私政策

本隐私政策描述了我们如何收集、使用和披露您的个人信息。

## 1. 信息收集

我们收集的个人信息类型包括：

- 注册信息：如姓名、手机号、电子邮件地址等
- 学习数据：如学习进度、考试成绩等
- 设备信息：如设备型号、操作系统版本等
- 位置信息：如IP地址等

## 2. 信息使用

我们使用收集的信息：

- 提供、维护和改进我们的服务
- 处理您的交易和请求
- 向您发送通知和更新
- 个性化您的体验
- 进行分析和研究

## 3. 信息共享

除非有法律要求或获得您的同意，我们不会与第三方共享您的个人信息。

## 4. 信息安全

我们采取合理的安全措施来保护您的个人信息不被未经授权的访问、使用或披露。

## 5. 您的权利

您有权访问、更正、删除您的个人信息，以及限制或反对我们处理您的个人信息。

## 6. 儿童隐私

我们的服务不面向13岁以下的儿童。如果我们发现已收集了13岁以下儿童的个人信息，我们会立即删除这些信息。

## 7. 隐私政策的变更

我们可能会不时更新本隐私政策。当我们更新本隐私政策时，我们会在本页面上发布更新后的版本。

最后更新日期：2025年4月1日`,
  )

  const [isSaving, setIsSaving] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)
  const [previewMode, setPreviewMode] = useState(false)

  // 保存配置
  const saveConfiguration = () => {
    setIsSaving(true)

    // 模拟API请求
    setTimeout(() => {
      setIsSaving(false)
      setShowSuccess(true)

      // 3秒后隐藏成功提示
      setTimeout(() => {
        setShowSuccess(false)
      }, 3000)
    }, 1500)
  }

  // 简单的Markdown渲染函数
  const renderMarkdown = (text) => {
    // 转换标题
    let html = text
      .replace(/^# (.*$)/gm, '<h1 class="text-xl font-bold my-4">$1</h1>')
      .replace(/^## (.*$)/gm, '<h2 class="text-lg font-bold my-3">$1</h2>')
      .replace(/^### (.*$)/gm, '<h3 class="text-md font-bold my-2">$1</h3>')

    // 转换段落
    html = html.replace(/^(?!<h[1-6]|<ul|<ol|<li)(.+$)/gm, '<p class="my-2">$1</p>')

    // 转换列表
    html = html.replace(/^- (.*$)/gm, '<li class="ml-4 list-disc">$1</li>')
    html = html.replace(/^([0-9]+)\. (.*$)/gm, '<li class="ml-4 list-decimal">$1. $2</li>')

    // 将连续的li元素包装在ul或ol中
    html = html.replace(/<li class="ml-4 list-disc">([\s\S]*?)(?=<(?!\/li|li))/g, '<ul class="my-2">$&</ul>')
    html = html.replace(/<li class="ml-4 list-decimal">([\s\S]*?)(?=<(?!\/li|li))/g, '<ol class="my-2">$&</ol>')

    // 转换粗体和斜体
    html = html.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
    html = html.replace(/\*(.*?)\*/g, "<em>$1</em>")

    return html
  }

  // 插入格式化文本
  const insertFormatting = (format, textareaId) => {
    const textarea = document.getElementById(textareaId) as HTMLTextAreaElement
    if (!textarea) return

    const start = textarea.selectionStart
    const end = textarea.selectionEnd
    const selectedText = textarea.value.substring(start, end)
    let formattedText = ""

    switch (format) {
      case "bold":
        formattedText = `**${selectedText || "粗体文本"}**`
        break
      case "italic":
        formattedText = `*${selectedText || "斜体文本"}*`
        break
      case "heading":
        formattedText = `\n## ${selectedText || "标题"}\n`
        break
      case "list":
        formattedText = selectedText
          ? selectedText
              .split("\n")
              .map((line) => `- ${line}`)
              .join("\n")
          : `\n- 列表项1\n- 列表项2\n- 列表项3\n`
        break
      case "ordered-list":
        formattedText = selectedText
          ? selectedText
              .split("\n")
              .map((line, i) => `${i + 1}. ${line}`)
              .join("\n")
          : `\n1. 列表项1\n2. 列表项2\n3. 列表项3\n`
        break
      default:
        formattedText = selectedText
    }

    const newValue = textarea.value.substring(0, start) + formattedText + textarea.value.substring(end)

    if (textareaId === "user-agreement") {
      setUserAgreement(newValue)
    } else {
      setPrivacyPolicy(newValue)
    }

    // 重新聚焦并设置光标位置
    setTimeout(() => {
      textarea.focus()
      textarea.setSelectionRange(start + formattedText.length, start + formattedText.length)
    }, 0)
  }

  return (
    <div className="min-h-screen bg-black text-white">
      {/* 顶部导航栏 */}
      <div className="sticky top-0 left-0 right-0 h-14 flex items-center px-4 bg-gray-900/80 backdrop-blur-md border-b border-gray-800 z-10">
        <Link href="/management/system" className="flex items-center text-gray-300">
          <ArrowLeft className="h-5 w-5 mr-2" />
          <span>返回</span>
        </Link>
        <h1 className="flex-1 text-center text-lg font-semibold text-white">协议和政策设置</h1>
      </div>

      {/* 成功提示 */}
      {showSuccess && (
        <div className="fixed top-16 left-4 right-4 z-50">
          <Alert className="bg-green-900/60 border-green-500 backdrop-blur-sm">
            <Check className="h-4 w-4 text-green-400 mr-2" />
            <AlertDescription className="text-green-400">协议和政策设置已成功保存</AlertDescription>
          </Alert>
        </div>
      )}

      <div className="p-4 pb-24">
        <Tabs defaultValue="user-agreement" className="w-full">
          <TabsList className="w-full grid grid-cols-2 bg-gray-900 border-b border-gray-800 rounded-none h-12 mb-4">
            <TabsTrigger value="user-agreement" className="data-[state=active]:text-blue-400">
              用户协议
            </TabsTrigger>
            <TabsTrigger value="privacy-policy" className="data-[state=active]:text-blue-400">
              隐私政策
            </TabsTrigger>
          </TabsList>

          <TabsContent value="user-agreement">
            <Card className="p-4 bg-gray-900 border-gray-800 mb-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold text-white">用户服务协议</h2>
                <Button variant="outline" size="sm" onClick={() => setPreviewMode(!previewMode)} className="text-xs">
                  {previewMode ? "编辑模式" : "预览模式"}
                </Button>
              </div>

              <p className="text-sm text-gray-400 mb-4">设置用户注册和使用时需要同意的服务协议内容</p>

              {!previewMode ? (
                <>
                  <div className="flex gap-1 mb-2 bg-gray-800 p-2 rounded-t-md border-b border-gray-700">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8"
                      onClick={() => insertFormatting("heading", "user-agreement")}
                      title="添加标题"
                    >
                      <Heading className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8"
                      onClick={() => insertFormatting("bold", "user-agreement")}
                      title="粗体"
                    >
                      <Bold className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8"
                      onClick={() => insertFormatting("italic", "user-agreement")}
                      title="斜体"
                    >
                      <Italic className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8"
                      onClick={() => insertFormatting("list", "user-agreement")}
                      title="无序列表"
                    >
                      <List className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8"
                      onClick={() => insertFormatting("ordered-list", "user-agreement")}
                      title="有序列表"
                    >
                      <ListOrdered className="h-4 w-4" />
                    </Button>
                  </div>

                  <Textarea
                    id="user-agreement"
                    value={userAgreement}
                    onChange={(e) => setUserAgreement(e.target.value)}
                    className="min-h-[400px] font-mono text-sm bg-gray-800 border-gray-700 rounded-t-none"
                  />
                </>
              ) : (
                <div className="bg-white text-black p-4 rounded-md min-h-[400px] overflow-auto">
                  <div
                    dangerouslySetInnerHTML={{ __html: renderMarkdown(userAgreement) }}
                    className="prose max-w-none"
                  />
                </div>
              )}

              <p className="text-xs text-gray-500 mt-2">
                提示：使用Markdown语法编辑文本。# 表示一级标题，## 表示二级标题，**文本** 表示粗体，*文本* 表示斜体，-
                表示列表项
              </p>
            </Card>
          </TabsContent>

          <TabsContent value="privacy-policy">
            <Card className="p-4 bg-gray-900 border-gray-800 mb-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold text-white">隐私政策</h2>
                <Button variant="outline" size="sm" onClick={() => setPreviewMode(!previewMode)} className="text-xs">
                  {previewMode ? "编辑模式" : "预览模式"}
                </Button>
              </div>

              <p className="text-sm text-gray-400 mb-4">设置用户注册和使用时需要了解的隐私政策内容</p>

              {!previewMode ? (
                <>
                  <div className="flex gap-1 mb-2 bg-gray-800 p-2 rounded-t-md border-b border-gray-700">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8"
                      onClick={() => insertFormatting("heading", "privacy-policy")}
                      title="添加标题"
                    >
                      <Heading className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8"
                      onClick={() => insertFormatting("bold", "privacy-policy")}
                      title="粗体"
                    >
                      <Bold className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8"
                      onClick={() => insertFormatting("italic", "privacy-policy")}
                      title="斜体"
                    >
                      <Italic className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8"
                      onClick={() => insertFormatting("list", "privacy-policy")}
                      title="无序列表"
                    >
                      <List className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8"
                      onClick={() => insertFormatting("ordered-list", "privacy-policy")}
                      title="有序列表"
                    >
                      <ListOrdered className="h-4 w-4" />
                    </Button>
                  </div>

                  <Textarea
                    id="privacy-policy"
                    value={privacyPolicy}
                    onChange={(e) => setPrivacyPolicy(e.target.value)}
                    className="min-h-[400px] font-mono text-sm bg-gray-800 border-gray-700 rounded-t-none"
                  />
                </>
              ) : (
                <div className="bg-white text-black p-4 rounded-md min-h-[400px] overflow-auto">
                  <div
                    dangerouslySetInnerHTML={{ __html: renderMarkdown(privacyPolicy) }}
                    className="prose max-w-none"
                  />
                </div>
              )}

              <p className="text-xs text-gray-500 mt-2">
                提示：使用Markdown语法编辑文本。# 表示一级标题，## 表示二级标题，**文本** 表示粗体，*文本* 表示斜体，-
                表示列表项
              </p>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      {/* 底部保存按钮 */}
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-gray-900/95 backdrop-blur-md border-t border-gray-800">
        <Button
          className="w-full bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400"
          onClick={saveConfiguration}
          disabled={isSaving}
        >
          <Save className="h-4 w-4 mr-2" />
          {isSaving ? "保存中..." : "保存协议和政策"}
        </Button>
      </div>
    </div>
  )
}
