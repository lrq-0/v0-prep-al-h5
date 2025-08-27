"use client"

import { useState } from "react"
import {
  ArrowLeft,
  Plus,
  Trash2,
  MessageSquare,
  Users,
  User,
  AlertCircle,
  Info,
  Send,
  Forward,
  ChevronDown,
  ChevronUp,
} from "lucide-react"
import Link from "next/link"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"

export default function MessageSettings() {
  // 状态变量
  const [selectedMessage, setSelectedMessage] = useState(null)
  const [composeDialogOpen, setComposeDialogOpen] = useState(false)
  const [expandedMessage, setExpandedMessage] = useState(null)
  const [dailyMessageSent, setDailyMessageSent] = useState(false) // 今日是否已发送群发消息

  // 新消息状态
  const [newMessage, setNewMessage] = useState({
    title: "",
    content: "",
    recipientType: "all", // 'all', 'group', 'specific'
    selectedGroup: "all",
    specificRecipients: "",
  })

  // 模拟系统消息数据
  const [systemMessages, setSystemMessages] = useState([
    {
      id: 1,
      title: "系统更新通知",
      content: "Prep AI平台已更新至v2.5.0版本，新增AI助手市场功能，欢迎体验。",
      date: "2025-04-15 10:30",
      type: "update",
      read: true,
    },
    {
      id: 2,
      title: "功能调整公告",
      content: "从2025年5月1日起，平台将调整课程分享机制，增加分佣比例设置功能，详情请查看公告。",
      date: "2025-04-12 14:25",
      type: "notice",
      read: false,
    },
    {
      id: 3,
      title: "服务器维护通知",
      content: "系统将于2025年4月20日凌晨2:00-4:00进行服务器维护，期间服务可能不稳定，请提前做好准备。",
      date: "2025-04-10 09:15",
      type: "maintenance",
      read: false,
    },
    {
      id: 4,
      title: "新功能预告",
      content: "Prep AI平台即将推出全新的知识库管理功能，敬请期待。",
      date: "2025-04-05 16:40",
      type: "update",
      read: true,
    },
  ])

  // 模拟已发送消息数据
  const [sentMessages, setSentMessages] = useState([
    {
      id: 1,
      title: "五一促销活动",
      content: "五一假期促销活动开启，全场课程8折，活动截止到5月5日。",
      date: "2025-04-15 15:30",
      recipientType: "all",
      recipients: "所有用户",
      status: "sent",
    },
    {
      id: 2,
      title: "新课程上线通知",
      content: "「高考英语冲刺班」已上线，欢迎选购学习。",
      date: "2025-04-10 11:20",
      recipientType: "group",
      recipients: "高中生组",
      status: "sent",
    },
    {
      id: 3,
      title: "会员专属优惠",
      content: "尊敬的会员用户，您有一张专属优惠券已发放，可在「我的优惠券」中查看。",
      date: "2025-04-05 09:45",
      recipientType: "specific",
      recipients: "VIP会员",
      status: "sent",
    },
    {
      id: 4,
      title: "系统更新转发",
      content: "Prep AI平台已更新至v2.5.0版本，新增AI助手市场功能，欢迎体验。",
      date: "2025-04-01 14:15",
      recipientType: "all",
      recipients: "所有用户",
      status: "sent",
      forwarded: true,
    },
  ])

  // 模拟用户组数据
  const userGroups = [
    { id: "all", name: "所有用户" },
    { id: "vip", name: "VIP会员" },
    { id: "highschool", name: "高中生组" },
    { id: "junior", name: "初级代理组" },
    { id: "senior", name: "高级代理组" },
  ]

  // 删除系统消息
  const deleteSystemMessage = (id) => {
    setSystemMessages(systemMessages.filter((msg) => msg.id !== id))
  }

  // 删除已发送消息
  const deleteSentMessage = (id) => {
    setSentMessages(sentMessages.filter((msg) => msg.id !== id))
  }

  // 转发系统消息
  const forwardSystemMessage = (message) => {
    setNewMessage({
      title: `转发: ${message.title}`,
      content: message.content,
      recipientType: "all",
      selectedGroup: "all",
      specificRecipients: "",
    })
    setComposeDialogOpen(true)
  }

  // 发送新消息
  const sendMessage = () => {
    if (newMessage.title.trim() === "" || newMessage.content.trim() === "") return

    const today = new Date()
    const formattedDate = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, "0")}-${String(
      today.getDate(),
    ).padStart(2, "0")} ${String(today.getHours()).padStart(2, "0")}:${String(today.getMinutes()).padStart(2, "0")}`

    let recipients = ""
    if (newMessage.recipientType === "all") {
      recipients = "所有用户"
      // 标记今日已发送群发消息
      setDailyMessageSent(true)
    } else if (newMessage.recipientType === "group") {
      recipients = userGroups.find((g) => g.id === newMessage.selectedGroup)?.name || "未知组"
      if (newMessage.selectedGroup === "all") {
        // 如果选择了所有用户，也标记为今日已发送群发消息
        setDailyMessageSent(true)
      }
    } else {
      recipients = "指定用户"
    }

    const newMsg = {
      id: Date.now(),
      title: newMessage.title,
      content: newMessage.content,
      date: formattedDate,
      recipientType: newMessage.recipientType,
      recipients: recipients,
      status: "sent",
    }

    setSentMessages([newMsg, ...sentMessages])
    setNewMessage({
      title: "",
      content: "",
      recipientType: "all",
      selectedGroup: "all",
      specificRecipients: "",
    })
    setComposeDialogOpen(false)
  }

  // 切换消息展开/折叠状态
  const toggleMessageExpand = (id) => {
    setExpandedMessage(expandedMessage === id ? null : id)
  }

  // 获取消息类型图标和颜色
  const getMessageTypeIcon = (type) => {
    switch (type) {
      case "update":
        return { icon: <Info className="h-5 w-5" />, color: "bg-blue-400/20 text-blue-400" }
      case "notice":
        return { icon: <AlertCircle className="h-5 w-5" />, color: "bg-yellow-400/20 text-yellow-400" }
      case "maintenance":
        return { icon: <AlertCircle className="h-5 w-5" />, color: "bg-orange-400/20 text-orange-400" }
      default:
        return { icon: <MessageSquare className="h-5 w-5" />, color: "bg-gray-400/20 text-gray-400" }
    }
  }

  // 获取收件人类型图标
  const getRecipientTypeIcon = (type) => {
    switch (type) {
      case "all":
        return <Users className="h-4 w-4" />
      case "group":
        return <Users className="h-4 w-4" />
      case "specific":
        return <User className="h-4 w-4" />
      default:
        return <MessageSquare className="h-4 w-4" />
    }
  }

  return (
    <div className="min-h-screen bg-black text-white">
      {/* 顶部导航栏 */}
      <div className="sticky top-0 left-0 right-0 h-14 flex items-center px-4 bg-gray-900/80 backdrop-blur-md border-b border-gray-800 z-10">
        <Link href="/management" className="flex items-center text-gray-300">
          <ArrowLeft className="h-5 w-5 mr-2" />
          <span>返回</span>
        </Link>
        <h1 className="flex-1 text-center text-lg font-semibold text-white">消息发送设置</h1>
      </div>

      <div className="p-4 pb-16">
        {/* 创建新消息按钮 */}
        <div className="flex justify-end mb-6">
          <Dialog open={composeDialogOpen} onOpenChange={setComposeDialogOpen}>
            <DialogTrigger asChild>
              <Button
                className="bg-blue-600 hover:bg-blue-700 text-white"
                disabled={dailyMessageSent && newMessage.recipientType === "all"}
              >
                <Plus className="h-4 w-4 mr-1" />
                创建新消息
              </Button>
            </DialogTrigger>
            <DialogContent className="bg-gray-900 border-gray-800 text-white max-w-2xl">
              <DialogHeader>
                <DialogTitle>创建新消息</DialogTitle>
                <DialogDescription className="text-gray-400">填写消息内容并选择发送对象。</DialogDescription>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-300">消息标题</label>
                  <Input
                    placeholder="输入消息标题"
                    value={newMessage.title}
                    onChange={(e) => setNewMessage({ ...newMessage, title: e.target.value })}
                    className="bg-gray-800 border-gray-700 text-white"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-300">消息内容</label>
                  <Textarea
                    placeholder="输入消息内容"
                    value={newMessage.content}
                    onChange={(e) => setNewMessage({ ...newMessage, content: e.target.value })}
                    className="bg-gray-800 border-gray-700 text-white min-h-[150px]"
                  />
                </div>

                <div className="space-y-3">
                  <label className="text-sm font-medium text-gray-300">发送对象</label>
                  <RadioGroup
                    value={newMessage.recipientType}
                    onValueChange={(value) => setNewMessage({ ...newMessage, recipientType: value })}
                  >
                    <div className="flex items-center space-x-2 mb-2">
                      <RadioGroupItem
                        value="all"
                        id="all"
                        disabled={dailyMessageSent}
                        className="border-gray-600 text-blue-500"
                      />
                      <Label htmlFor="all" className="text-white">
                        所有用户
                        {dailyMessageSent && (
                          <Badge className="ml-2 bg-yellow-600 text-white">今日已发送群发消息</Badge>
                        )}
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2 mb-2">
                      <RadioGroupItem value="group" id="group" className="border-gray-600 text-blue-500" />
                      <Label htmlFor="group" className="text-white">
                        指定用户组
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="specific" id="specific" className="border-gray-600 text-blue-500" />
                      <Label htmlFor="specific" className="text-white">
                        指定用户
                      </Label>
                    </div>
                  </RadioGroup>
                </div>

                {newMessage.recipientType === "group" && (
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-300">选择用户组</label>
                    <select
                      value={newMessage.selectedGroup}
                      onChange={(e) => setNewMessage({ ...newMessage, selectedGroup: e.target.value })}
                      className="w-full rounded-md bg-gray-800 border-gray-700 text-white p-2"
                    >
                      {userGroups.map((group) => (
                        <option key={group.id} value={group.id} disabled={dailyMessageSent && group.id === "all"}>
                          {group.name} {dailyMessageSent && group.id === "all" ? "(今日已发送)" : ""}
                        </option>
                      ))}
                    </select>
                  </div>
                )}

                {newMessage.recipientType === "specific" && (
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-300">指定用户</label>
                    <Textarea
                      placeholder="输入用户ID或手机号，多个用户请用逗号分隔"
                      value={newMessage.specificRecipients}
                      onChange={(e) => setNewMessage({ ...newMessage, specificRecipients: e.target.value })}
                      className="bg-gray-800 border-gray-700 text-white"
                    />
                    <p className="text-xs text-gray-500">例如：13800138000,13900139000 或 user_123,user_456</p>
                  </div>
                )}
              </div>
              <DialogFooter>
                <Button
                  variant="outline"
                  onClick={() => setComposeDialogOpen(false)}
                  className="bg-gray-800 border-gray-700 text-white hover:bg-gray-700"
                >
                  取消
                </Button>
                <Button
                  onClick={sendMessage}
                  disabled={
                    !newMessage.title ||
                    !newMessage.content ||
                    (newMessage.recipientType === "specific" && !newMessage.specificRecipients)
                  }
                  className="bg-blue-600 hover:bg-blue-700 text-white"
                >
                  <Send className="h-4 w-4 mr-1" />
                  发送消息
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>

        {/* 系统消息模块 */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4 flex items-center">
            <AlertCircle className="h-5 w-5 mr-2 text-blue-400" />
            系统消息
          </h2>

          <div className="space-y-3">
            {systemMessages.length > 0 ? (
              systemMessages.map((message) => (
                <Card key={message.id} className="bg-gray-900 border-gray-800 p-4">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start space-x-3">
                      <div className={`p-2 rounded-full ${getMessageTypeIcon(message.type).color}`}>
                        {getMessageTypeIcon(message.type).icon}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center">
                          <h3 className="font-semibold text-white">{message.title}</h3>
                          {!message.read && (
                            <span className="ml-2 inline-block h-2 w-2 rounded-full bg-blue-500"></span>
                          )}
                        </div>
                        <p className="text-sm text-gray-400">{message.date}</p>
                        <div className={`mt-2 text-gray-300 ${expandedMessage === message.id ? "" : "line-clamp-2"}`}>
                          {message.content}
                        </div>
                        {message.content.length > 100 && (
                          <button
                            onClick={() => toggleMessageExpand(message.id)}
                            className="text-sm text-blue-400 mt-1 hover:underline flex items-center"
                          >
                            {expandedMessage === message.id ? (
                              <>
                                收起 <ChevronUp className="h-3 w-3 ml-1" />
                              </>
                            ) : (
                              <>
                                展开 <ChevronDown className="h-3 w-3 ml-1" />
                              </>
                            )}
                          </button>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => forwardSystemMessage(message)}
                        className="h-8 text-gray-400 hover:bg-gray-800"
                      >
                        <Forward className="h-4 w-4 mr-1" />
                        转发
                      </Button>
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button variant="ghost" size="sm" className="h-8 text-red-400 hover:bg-gray-800">
                            <Trash2 className="h-4 w-4 mr-1" />
                            删除
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent className="bg-gray-900 border-gray-800">
                          <AlertDialogHeader>
                            <AlertDialogTitle className="text-white">确认删除</AlertDialogTitle>
                            <AlertDialogDescription className="text-gray-400">
                              确定要删除"{message.title}"消息吗？此操作不可撤销。
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel className="bg-gray-800 text-white border-gray-700 hover:bg-gray-700">
                              取消
                            </AlertDialogCancel>
                            <AlertDialogAction
                              className="bg-red-600 text-white hover:bg-red-700"
                              onClick={() => deleteSystemMessage(message.id)}
                            >
                              删除
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </div>
                  </div>
                </Card>
              ))
            ) : (
              <div className="text-center py-8 text-gray-500">
                <MessageSquare className="h-12 w-12 mx-auto mb-3 opacity-50" />
                <p className="text-lg">暂无系统消息</p>
              </div>
            )}
          </div>
        </div>

        {/* 我的消息模块 */}
        <div>
          <h2 className="text-xl font-semibold mb-4 flex items-center">
            <MessageSquare className="h-5 w-5 mr-2 text-green-400" />
            我的消息
          </h2>

          <div className="space-y-3">
            {sentMessages.length > 0 ? (
              sentMessages.map((message) => (
                <Card key={message.id} className="bg-gray-900 border-gray-800 p-4">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start space-x-3">
                      <div className="p-2 rounded-full bg-green-400/20 text-green-400">
                        {getRecipientTypeIcon(message.recipientType)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center">
                          <h3 className="font-semibold text-white">{message.title}</h3>
                          {message.forwarded && <Badge className="ml-2 bg-blue-600 text-white">转发</Badge>}
                        </div>
                        <div className="flex items-center text-sm text-gray-400 mt-1">
                          <span className="mr-3">{message.date}</span>
                          <span className="flex items-center">
                            {getRecipientTypeIcon(message.recipientType)}
                            <span className="ml-1">{message.recipients}</span>
                          </span>
                        </div>
                        <div className={`mt-2 text-gray-300 ${expandedMessage === message.id ? "" : "line-clamp-2"}`}>
                          {message.content}
                        </div>
                        {message.content.length > 100 && (
                          <button
                            onClick={() => toggleMessageExpand(message.id)}
                            className="text-sm text-blue-400 mt-1 hover:underline flex items-center"
                          >
                            {expandedMessage === message.id ? (
                              <>
                                收起 <ChevronUp className="h-3 w-3 ml-1" />
                              </>
                            ) : (
                              <>
                                展开 <ChevronDown className="h-3 w-3 ml-1" />
                              </>
                            )}
                          </button>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center">
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button variant="ghost" size="sm" className="h-8 text-red-400 hover:bg-gray-800">
                            <Trash2 className="h-4 w-4 mr-1" />
                            删除
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent className="bg-gray-900 border-gray-800">
                          <AlertDialogHeader>
                            <AlertDialogTitle className="text-white">确认删除</AlertDialogTitle>
                            <AlertDialogDescription className="text-gray-400">
                              确定要删除"{message.title}"消息吗？此操作不可撤销。
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel className="bg-gray-800 text-white border-gray-700 hover:bg-gray-700">
                              取消
                            </AlertDialogCancel>
                            <AlertDialogAction
                              className="bg-red-600 text-white hover:bg-red-700"
                              onClick={() => deleteSentMessage(message.id)}
                            >
                              删除
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </div>
                  </div>
                </Card>
              ))
            ) : (
              <div className="text-center py-8 text-gray-500">
                <MessageSquare className="h-12 w-12 mx-auto mb-3 opacity-50" />
                <p className="text-lg">暂无已发送消息</p>
                <p className="text-sm mt-1">点击上方"创建新消息"按钮发送消息</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
