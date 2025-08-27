import { ArrowLeft, Play, Volume2, Settings, SkipBack, SkipForward } from "lucide-react"
import Link from "next/link"
import { Slider } from "@/components/ui/slider"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

// 录播课程观看页面
export default function WatchCourse({ params }: { params: { id: string } }) {
  // 模拟课程数据
  const lesson = {
    id: params.id,
    title: "必考核心词汇（上）",
    courseName: "高考英语词汇精讲",
    instructor: "王老师",
    duration: "60分钟",
    progress: 15, // 百分比
    materials: [
      { id: 1, name: "必考核心词汇表.pdf", size: "2.5MB" },
      { id: 2, name: "课堂笔记模板.docx", size: "1.2MB" },
    ],
    notes: [
      {
        id: 1,
        time: "05:24",
        content: "记忆单词的3R原则：Recognize（识别）, Recall（回忆）, Retain（保留）",
      },
      {
        id: 2,
        time: "12:36",
        content: "高频单词必须掌握的三个层面：拼写、发音、适用场景",
      },
    ],
  }

  return (
    <div className="min-h-screen bg-black text-white">
      {/* 顶部导航栏 */}
      <div className="sticky top-0 left-0 right-0 h-14 flex items-center px-4 bg-gray-900/80 backdrop-blur-md border-b border-gray-800 z-10">
        <Link href="/courses/curriculum/1" className="flex items-center text-gray-300">
          <ArrowLeft className="h-5 w-5 mr-2" />
          <span>返回</span>
        </Link>
        <h1 className="flex-1 text-center text-lg font-semibold text-white">{lesson.courseName}</h1>
      </div>

      {/* 视频播放器 */}
      <div className="relative w-full aspect-video bg-gray-900">
        {/* 这里实际会接入视频播放器，目前使用占位图 */}
        <div className="absolute inset-0 flex items-center justify-center flex-col">
          <Play className="h-12 w-12 text-white opacity-80" />
          <div className="mt-2 text-gray-400">点击播放视频</div>
        </div>

        {/* 视频控制层 - 正常情况会随着用户交互显示/隐藏 */}
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
          <div className="flex items-center mb-2">
            <Slider defaultValue={[lesson.progress]} max={100} className="flex-1 mr-4" />
            <div className="text-white text-sm">{Math.floor(lesson.progress * 0.6)}/60:00</div>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <button className="text-white mr-4">
                <Play className="h-6 w-6 fill-white" />
              </button>
              <button className="text-white mr-4">
                <SkipBack className="h-5 w-5" />
              </button>
              <button className="text-white mr-4">
                <SkipForward className="h-5 w-5" />
              </button>
              <button className="text-white">
                <Volume2 className="h-5 w-5" />
              </button>
            </div>
            <button className="text-white">
              <Settings className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>

      {/* 视频信息 */}
      <div className="p-4 border-b border-gray-800">
        <h1 className="text-lg font-bold text-white mb-1">{lesson.title}</h1>
        <div className="flex items-center justify-between">
          <div className="text-sm text-gray-300">{lesson.instructor}</div>
          <div className="text-sm text-gray-400">{lesson.duration}</div>
        </div>
      </div>

      {/* 标签内容 */}
      <Tabs defaultValue="materials" className="w-full">
        <TabsList className="w-full grid grid-cols-2 bg-gray-900 border-b border-gray-800 rounded-none h-12">
          <TabsTrigger value="materials" className="data-[state=active]:text-blue-400">
            课程资料
          </TabsTrigger>
          <TabsTrigger value="notes" className="data-[state=active]:text-blue-400">
            我的笔记
          </TabsTrigger>
        </TabsList>

        <TabsContent value="materials" className="p-4">
          <div className="grid gap-3">
            {lesson.materials.map((material) => (
              <div
                key={material.id}
                className="p-3 bg-gray-900 border border-gray-800 rounded-lg flex justify-between items-center"
              >
                <div className="flex items-center">
                  <div className="w-8 h-8 rounded-md bg-blue-500/20 flex items-center justify-center mr-3">
                    <svg className="h-4 w-4 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                      />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-medium text-white">{material.name}</h3>
                    <div className="text-xs text-gray-400">{material.size}</div>
                  </div>
                </div>
                <Button variant="outline" size="sm" className="border-blue-500/30 text-blue-400 hover:bg-blue-500/20">
                  下载
                </Button>
              </div>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="notes" className="p-4">
          <div className="grid gap-3">
            {lesson.notes.map((note) => (
              <div key={note.id} className="p-3 bg-gray-900 border border-gray-800 rounded-lg">
                <div className="flex items-center mb-2">
                  <div className="px-2 py-0.5 rounded bg-blue-500/20 text-blue-400 text-xs mr-2">{note.time}</div>
                  <div className="text-xs text-gray-500">点击跳转到视频对应时间点</div>
                </div>
                <p className="text-sm text-gray-300">{note.content}</p>
              </div>
            ))}

            <Button className="w-full mt-2 bg-gray-800 text-blue-400 border border-blue-500/30 hover:bg-blue-500/20">
              添加笔记
            </Button>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
