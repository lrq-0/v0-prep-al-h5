"use client"

import { useState } from "react"
import { ArrowLeft, Bell, Trash2, Check } from "lucide-react"
import Link from "next/link"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
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

export default function Messages() {
  // 模拟消息数据 - 电商、短视频、自媒体相关
  const initialMessages = [
    {
      id: 1,
      title: "您的《电商运营从入门到精通》课程已开放学习",
      content: "您已成功报名《电商运营从入门到精通》课程，现在可以开始学习。",
      time: "10分钟前",
      type: "course",
      unread: true,
    },
    {
      id: 2,
      title: "恭喜您通过电商运营专业能力认证",
      content: "恭喜您顺利通过电商运营专业能力认证考试，请及时领取您的证书。",
      time: "2小时前",
      type: "exam",
      unread: true,
    },
    {
      id: 3,
      title: "2025电商直播带货峰会邀请函",
      content: "诚挚邀请您参加2025电商直播带货峰会，共同探讨行业未来发展趋势。",
      time: "昨天",
      type: "event",
      unread: false,
    },
    {
      id: 4,
      title: "新课程上线：《抖音短视频带货实战训练营》",
      content: "全新课程《抖音短视频带货实战训练营》已上线，欢迎学习。",
      time: "2天前",
      type: "course",
      unread: false,
    },
    {
      id: 5,
      title: "您的小红书爆款笔记创作AI助手已创建成功",
      content: "您定制的小红书爆款笔记创作AI助手已创建成功，现在可以开始使用了。",
      time: "3天前",
      type: "ai",
      unread: false,
    },
    {
      id: 6,
      title: "优惠活动：新人首单课程7折优惠",
      content: "限时优惠：新用户购买任意课程可享受7折优惠，优惠码：NEWUSER70",
      time: "4天前",
      type: "promotion",
      unread: false,
    },
    {
      id: 7,
      title: "您报名的《直播带货话术与互动技巧实战》即将开课",
      content: "您报名的《直播带货话术与互动技巧实战》将于明天19:30开始直播，请准时参加。",
      time: "5天前",
      type: "course",
      unread: false,
    },
  ]

  const [messages, setMessages] = useState(initialMessages)

  // 标记消息为已读
  const markAsRead = (id) => {
    setMessages(
      messages.map((msg) => {
        if (msg.id === id) {
          return { ...msg, unread: false }
        }
        return msg
      }),
    )
  }

  // 删除单条消息
  const deleteMessage = (id) => {
    setMessages(messages.filter((msg) => msg.id !== id))
  }

  // 删除所有消息
  const deleteAllMessages = () => {
    setMessages([])
  }

  // 消息卡片组件
  const MessageCard = ({ notification }) => {
    // 根据消息类型定义图标颜色
    const getTypeColor = (type) => {
      switch (type) {
        case "course":
          return "bg-purple-400/20 text-purple-400"
        case "system":
          return "bg-yellow-400/20 text-yellow-400"
        case "promotion":
          return "bg-pink-400/20 text-pink-400"
        case "event":
          return "bg-green-400/20 text-green-400"
        case "exam":
          return "bg-blue-400/20 text-blue-400"
        case "ai":
          return "bg-orange-400/20 text-orange-400"
        default:
          return "bg-gray-400/20 text-gray-400"
      }
    }

    return (
      <Card
        className={`p-4 bg-gray-900 ${
          notification.unread ? "border-l-2 border-l-purple-500 border-gray-800" : "border-gray-800"
        } relative`}
      >
        <div className="flex">
          <div
            className={`w-10 h-10 rounded-full ${getTypeColor(notification.type)} flex items-center justify-center mr-3`}
          >
            <Bell className="h-5 w-5" />
          </div>
          <div className="flex-1">
            <div className="flex justify-between items-start mb-1">
              <h3 className="font-medium text-white">{notification.title}</h3>
              <span className="text-xs text-gray-500">{notification.time}</span>
            </div>
            <p className="text-sm text-gray-300">{notification.content}</p>
            <div className="flex justify-end mt-2">
              {notification.unread && (
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-8 px-2 text-purple-400 hover:text-purple-300"
                  onClick={() => markAsRead(notification.id)}
                >
                  <Check className="h-4 w-4 mr-1" />
                  标为已读
                </Button>
              )}
              <Button
                variant="ghost"
                size="sm"
                className="h-8 px-2 text-red-400 hover:text-red-300"
                onClick={() => deleteMessage(notification.id)}
              >
                <Trash2 className="h-4 w-4 mr-1" />
                删除
              </Button>
            </div>
          </div>
        </div>
      </Card>
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
        <h1 className="flex-1 text-center text-lg font-semibold text-white">我的消息</h1>
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button variant="ghost" size="icon" className="text-gray-400">
              <Trash2 className="h-5 w-5" />
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent className="bg-gray-900 border-gray-800">
            <AlertDialogHeader>
              <AlertDialogTitle className="text-white">清空所有消息</AlertDialogTitle>
              <AlertDialogDescription className="text-gray-400">
                此操作将删除所有消息，且无法恢复。确定要继续吗？
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel className="bg-gray-800 text-white border-gray-700 hover:bg-gray-700">
                取消
              </AlertDialogCancel>
              <AlertDialogAction className="bg-red-600 text-white hover:bg-red-700" onClick={deleteAllMessages}>
                确认删除
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>

      <div className="p-4 pb-16">
        {/* 消息列表 */}
        <div className="flex justify-between items-center mb-4">
          <div className="text-sm text-gray-400">
            {messages.filter((msg) => msg.unread).length > 0
              ? `${messages.filter((msg) => msg.unread).length}条未读消息`
              : "没有未读消息"}
          </div>
          <div className="flex space-x-2">
            <Button
              variant="outline"
              size="sm"
              className="h-8 border-purple-500/30 text-purple-400 hover:bg-purple-500/20"
              onClick={() => setMessages(messages.map((msg) => ({ ...msg, unread: false })))}
            >
              全部已读
            </Button>
          </div>
        </div>

        {messages.length > 0 ? (
          <div className="grid gap-3">
            {messages.map((notification) => (
              <MessageCard key={notification.id} notification={notification} />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-12">
            <Bell className="h-12 w-12 text-gray-700 mb-4" />
            <p className="text-gray-500">暂无消息</p>
          </div>
        )}
      </div>
    </div>
  )
}
