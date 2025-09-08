import { ArrowLeft, Users, MessageSquare, SendHorizontal, MicOff, Fullscreen } from "lucide-react"
import Link from "next/link"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"

// 直播课程观看页面
export default function LiveCourse({ params }: { params: { id: string } }) {
  // 模拟直播课程数据
  const liveCourse = {
    id: params.id,
    title: "高考英语冲刺班：写作技巧专题",
    instructor: "王老师",
    viewers: 1024,
    isLive: true,
    startTime: "2025-04-23 19:30",
    chats: [
      { id: 1, user: "学生A", message: "老师好，请讲解一下高分作文的结构", time: "19:32" },
      {
        id: 2,
        user: "王老师",
        message: "好的，我们今天会重点讲解高考英语作文的结构和常用表达",
        time: "19:33",
        isInstructor: true,
      },
      { id: 3, user: "学生B", message: "请问老师有没有推荐的写作素材？", time: "19:35" },
    ],
  }

  return (
    <div className="min-h-screen bg-black text-white">
      {/* 顶部导航栏 */}
      <div className="sticky top-0 left-0 right-0 h-14 flex items-center px-4 bg-gray-900/80 backdrop-blur-md border-b border-gray-800 z-10">
        <Link href="/" className="flex items-center text-gray-300">
          <ArrowLeft className="h-5 w-5 mr-2" />
          <span>返回</span>
        </Link>
        <h1 className="flex-1 text-center text-lg font-semibold text-white">直播课堂</h1>
      </div>

      {/* 直播视频区域 */}
      <div className="relative w-full h-56 bg-gray-900">
        {/* 这里实际接入直播API，目前使用占位图 */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <div className="text-blue-400 text-lg mb-1">
              {liveCourse.isLive ? (
                <>
                  <span className="inline-block w-3 h-3 bg-red-500 rounded-full mr-2 animate-pulse"></span>
                  直播中
                </>
              ) : (
                "直播即将开始"
              )}
            </div>
            <div className="text-gray-400 text-sm">腾讯会议教育版</div>
          </div>
        </div>

        {/* 直播控制按钮 */}
        <div className="absolute bottom-4 right-4 flex space-x-2">
          <button className="bg-gray-800/80 p-2 rounded-full">
            <MicOff className="h-4 w-4 text-white" />
          </button>
          <button className="bg-gray-800/80 p-2 rounded-full">
            <Fullscreen className="h-4 w-4 text-white" />
          </button>
        </div>

        {/* 直播信息 */}
        <div className="absolute top-4 left-4 flex items-center bg-black/50 rounded-full px-2 py-1">
          <Users className="h-3 w-3 text-blue-400 mr-1" />
          <span className="text-xs text-white">{liveCourse.viewers}</span>
        </div>
      </div>

      {/* 直播信息区 */}
      <div className="p-4 border-b border-gray-800">
        <h1 className="text-lg font-bold text-white mb-1">{liveCourse.title}</h1>
        <div className="flex items-center justify-between">
          <div className="text-sm text-gray-300">
            <span className="text-white font-medium">讲师：</span>
            {liveCourse.instructor}
          </div>
        </div>
      </div>

      {/* 聊天区域 */}
      <div className="flex flex-col h-[calc(100vh-56px-14rem)]">
        <div className="p-3 border-b border-gray-800 flex items-center">
          <MessageSquare className="h-5 w-5 text-blue-400 mr-2" />
          <span className="text-white font-medium">直播互动</span>
        </div>

        <div className="flex-1 overflow-y-auto p-3 space-y-4">
          {liveCourse.chats.map((chat) => (
            <div key={chat.id} className="flex items-start">
              <Avatar className="h-8 w-8 mr-2">
                <AvatarFallback className={chat.isInstructor ? "bg-blue-500" : "bg-gray-700"}>
                  {chat.user.charAt(0)}
                </AvatarFallback>
              </Avatar>
              <div>
                <div className="flex items-center mb-1">
                  <span className={`text-sm font-medium ${chat.isInstructor ? "text-blue-400" : "text-white"}`}>
                    {chat.user}
                    {chat.isInstructor && (
                      <span className="ml-1 text-xs px-1 py-0.5 rounded bg-blue-600 text-white">讲师</span>
                    )}
                  </span>
                  <span className="text-xs text-gray-500 ml-2">{chat.time}</span>
                </div>
                <p className="text-sm text-gray-300">{chat.message}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="p-3 border-t border-gray-800">
          <div className="flex">
            <Input
              placeholder="发送消息..."
              className="bg-gray-900 border-gray-700 text-white placeholder:text-gray-500 focus-visible:ring-blue-500"
            />
            <Button className="ml-2 bg-blue-600 hover:bg-blue-500">
              <SendHorizontal className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
