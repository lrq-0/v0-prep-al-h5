"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { Calendar, Clock, BookOpen, Award, BarChart2, MessageSquare, Briefcase, ChevronRight, Gem } from "lucide-react"

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState("overview")

  // Demo data - in a real app this would come from an API call
  const courseProgress = [
    { id: 1, title: "Introduction to Machine Learning", progress: 65, image: "/images/course-1.png" },
    { id: 2, title: "Advanced Data Structures", progress: 30, image: "/images/course-2.png" },
    { id: 3, title: "Web Development Fundamentals", progress: 90, image: "/images/course-3.png" },
  ]

  const upcomingExams = [
    { id: 1, title: "Machine Learning Certification", date: "May 20, 2025", image: "/images/exam-1.png" },
    { id: 2, title: "Data Structures Final", date: "May 25, 2025", image: "/images/exam-2.png" },
  ]

  return (
    <div className="container px-4 py-6 mx-auto max-w-7xl">
      {/* Welcome Banner */}
      <div className="mb-8">
        <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-gray-800 dark:to-gray-900 border-0 shadow-md">
          <CardContent className="p-6 sm:p-8">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between">
              <div>
                <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">Welcome back, Alex!</h1>
                <p className="mt-1 text-gray-600 dark:text-gray-300">
                  You have 3 courses in progress and 2 upcoming exams.
                </p>
              </div>
              <div className="mt-4 sm:mt-0 flex items-center space-x-2">
                <div className="h-10 w-10 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center">
                  <Gem className="h-5 w-5 text-blue-600 dark:text-blue-300" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Premium Member</p>
                  <p className="text-sm font-bold text-blue-600 dark:text-blue-300">Valid until Jun 15, 2025</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
        <Card>
          <CardContent className="p-4 flex flex-col items-center justify-center text-center h-full">
            <BookOpen className="h-8 w-8 text-blue-600 dark:text-blue-400 mb-2" />
            <h3 className="text-2xl font-bold">3</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">Active Courses</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4 flex flex-col items-center justify-center text-center h-full">
            <Award className="h-8 w-8 text-green-600 dark:text-green-400 mb-2" />
            <h3 className="text-2xl font-bold">7</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">Certifications</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4 flex flex-col items-center justify-center text-center h-full">
            <BarChart2 className="h-8 w-8 text-purple-600 dark:text-purple-400 mb-2" />
            <h3 className="text-2xl font-bold">12</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">Exams Completed</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4 flex flex-col items-center justify-center text-center h-full">
            <MessageSquare className="h-8 w-8 text-amber-600 dark:text-amber-400 mb-2" />
            <h3 className="text-2xl font-bold">5</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">AI Assistants</p>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Tabs */}
      <Tabs defaultValue="overview" className="mb-8" onValueChange={setActiveTab}>
        <TabsList className="grid grid-cols-3 sm:grid-cols-5 mb-6">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="courses">Courses</TabsTrigger>
          <TabsTrigger value="exams">Exams</TabsTrigger>
          <TabsTrigger value="ai" className="hidden sm:block">
            AI Assistants
          </TabsTrigger>
          <TabsTrigger value="achievements" className="hidden sm:block">
            Achievements
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Continuing Learning */}
            <Card className="md:row-span-2">
              <CardHeader>
                <CardTitle>Continue Learning</CardTitle>
                <CardDescription>Pick up where you left off</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {courseProgress.map((course) => (
                  <div key={course.id} className="space-y-2">
                    <div className="flex items-center space-x-3">
                      <div className="relative h-12 w-16 rounded overflow-hidden">
                        <Image
                          src={course.image || "/placeholder.svg"}
                          alt={course.title}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="flex-1">
                        <h4 className="text-sm font-medium line-clamp-1">{course.title}</h4>
                        <div className="flex items-center space-x-2 mt-1">
                          <Progress value={course.progress} className="h-2" />
                          <span className="text-xs text-gray-500 dark:text-gray-400 whitespace-nowrap">
                            {course.progress}%
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
              <CardFooter>
                <Link href="/courses/purchased" className="w-full">
                  <Button variant="outline" className="w-full">
                    View all courses
                    <ChevronRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </CardFooter>
            </Card>

            {/* Upcoming Exams */}
            <Card>
              <CardHeader>
                <CardTitle>Upcoming Exams</CardTitle>
                <CardDescription>Prepare for your next challenge</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {upcomingExams.map((exam) => (
                  <div key={exam.id} className="flex items-center space-x-3">
                    <div className="relative h-12 w-16 rounded overflow-hidden">
                      <Image src={exam.image || "/placeholder.svg"} alt={exam.title} fill className="object-cover" />
                    </div>
                    <div className="flex-1">
                      <h4 className="text-sm font-medium">{exam.title}</h4>
                      <div className="flex items-center text-gray-500 dark:text-gray-400 mt-1">
                        <Calendar className="h-3.5 w-3.5 mr-1" />
                        <span className="text-xs">{exam.date}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
              <CardFooter>
                <Link href="/exams/category/upcoming" className="w-full">
                  <Button variant="outline" className="w-full">
                    View all exams
                    <ChevronRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </CardFooter>
            </Card>

            {/* Featured AI Assistant */}
            <Card>
              <CardHeader>
                <CardTitle>AI Learning Assistant</CardTitle>
                <CardDescription>Get help with your studies</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center space-x-4">
                  <div className="relative h-16 w-16 rounded-full overflow-hidden">
                    <Image src="/images/ai-assistant-1.png" alt="AI Assistant" fill className="object-cover" />
                  </div>
                  <div>
                    <h3 className="font-medium">Study Buddy</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      24/7 assistance with course materials and exam prep
                    </p>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Link href="/ai-chat/study-buddy" className="w-full">
                  <Button className="w-full">
                    Chat with AI
                    <MessageSquare className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </CardFooter>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="courses">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle>Latest Courses</CardTitle>
                <CardDescription>Recently added to our platform</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[1, 2, 3, 4].map((id) => (
                    <div key={id} className="flex items-center space-x-3">
                      <div className="relative h-14 w-20 rounded overflow-hidden">
                        <Image src={`/images/course-${id}.png`} alt={`Course ${id}`} fill className="object-cover" />
                      </div>
                      <div>
                        <h4 className="text-sm font-medium line-clamp-1">
                          {
                            ["Data Science Fundamentals", "Mobile App Development", "Blockchain Basics", "AI Ethics"][
                              id - 1
                            ]
                          }
                        </h4>
                        <div className="flex items-center mt-1">
                          <Clock className="h-3.5 w-3.5 text-gray-500 dark:text-gray-400 mr-1" />
                          <span className="text-xs text-gray-500 dark:text-gray-400">
                            {[12, 8, 10, 6][id - 1]} hours
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
              <CardFooter>
                <Link href="/courses/categories" className="w-full">
                  <Button variant="outline" className="w-full">
                    Browse all courses
                  </Button>
                </Link>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <CardTitle>Recommended</CardTitle>
                <CardDescription>Based on your interests</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[2, 3, 1, 4].map((id) => (
                    <div key={id} className="flex items-center space-x-3">
                      <div className="relative h-14 w-20 rounded overflow-hidden">
                        <Image src={`/images/course-${id}.png`} alt={`Course ${id}`} fill className="object-cover" />
                      </div>
                      <div>
                        <h4 className="text-sm font-medium line-clamp-1">
                          {
                            [
                              "Advanced Machine Learning",
                              "Cybersecurity Essentials",
                              "Cloud Architecture",
                              "UI/UX Design",
                            ][id - 1]
                          }
                        </h4>
                        <div className="flex items-center text-gray-500 dark:text-gray-400 mt-1">
                          <Clock className="h-3.5 w-3.5 mr-1" />
                          <span className="text-xs">{[16, 12, 14, 8][id - 1]} hours</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
              <CardFooter>
                <Link href="/course-advisor" className="w-full">
                  <Button variant="outline" className="w-full">
                    Get personalized recommendations
                  </Button>
                </Link>
              </CardFooter>
            </Card>

            <Card className="sm:col-span-2 lg:col-span-1">
              <CardHeader className="pb-3">
                <CardTitle>Learning Achievements</CardTitle>
                <CardDescription>Track your progress</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <BookOpen className="h-5 w-5 text-blue-500" />
                      <span className="text-sm font-medium">Courses Completed</span>
                    </div>
                    <span className="font-bold">9/24</span>
                  </div>
                  <Progress value={37.5} className="h-2" />

                  <div className="flex items-center justify-between mt-4">
                    <div className="flex items-center space-x-2">
                      <Award className="h-5 w-5 text-amber-500" />
                      <span className="text-sm font-medium">Certifications Earned</span>
                    </div>
                    <span className="font-bold">7/15</span>
                  </div>
                  <Progress value={46.6} className="h-2" />

                  <div className="flex items-center justify-between mt-4">
                    <div className="flex items-center space-x-2">
                      <Briefcase className="h-5 w-5 text-green-500" />
                      <span className="text-sm font-medium">Skills Mastered</span>
                    </div>
                    <span className="font-bold">12/20</span>
                  </div>
                  <Progress value={60} className="h-2" />
                </div>
              </CardContent>
              <CardFooter>
                <Link href="/my-grades" className="w-full">
                  <Button variant="outline" className="w-full">
                    View detailed progress
                  </Button>
                </Link>
              </CardFooter>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="exams">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Upcoming Exams</CardTitle>
                <CardDescription>Your scheduled assessments</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[1, 2, 3].map((id) => (
                    <div key={id} className="flex items-center space-x-3">
                      <div className="relative h-14 w-20 rounded overflow-hidden">
                        <Image src={`/images/exam-${id}.png`} alt={`Exam ${id}`} fill className="object-cover" />
                      </div>
                      <div className="flex-1">
                        <h4 className="text-sm font-medium">
                          {["Data Science Final", "Programming Fundamentals", "Web Development"][id - 1]}
                        </h4>
                        <div className="flex items-center text-gray-500 dark:text-gray-400 mt-1">
                          <Calendar className="h-3.5 w-3.5 mr-1" />
                          <span className="text-xs">{["May 20, 2025", "May 25, 2025", "June 2, 2025"][id - 1]}</span>
                        </div>
                      </div>
                      <Link href={`/exams/${id}/intro`}>
                        <Button size="sm" variant="outline">
                          Prepare
                        </Button>
                      </Link>
                    </div>
                  ))}
                </div>
              </CardContent>
              <CardFooter>
                <Link href="/exams/category/upcoming" className="w-full">
                  <Button variant="outline" className="w-full">
                    View all exams
                  </Button>
                </Link>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Recent Results</CardTitle>
                <CardDescription>Your exam performances</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[4, 2, 1].map((id) => (
                    <div key={id} className="flex items-center space-x-3">
                      <div className="relative h-14 w-20 rounded overflow-hidden">
                        <Image src={`/images/exam-${id}.png`} alt={`Exam Result ${id}`} fill className="object-cover" />
                      </div>
                      <div className="flex-1">
                        <h4 className="text-sm font-medium">
                          {["Cloud Computing", "Database Design", "Machine Learning Basics"][id - 1]}
                        </h4>
                        <div className="flex items-center text-gray-500 dark:text-gray-400 mt-1">
                          <span
                            className={`text-xs px-1.5 py-0.5 rounded-full ${
                              [85, 92, 78][id - 1] >= 90
                                ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                                : [85, 92, 78][id - 1] >= 80
                                  ? "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
                                  : "bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-200"
                            }`}
                          >
                            Score: {[85, 92, 78][id - 1]}%
                          </span>
                          <span className="text-xs ml-2">{["May 1", "April 22", "April 10"][id - 1]}</span>
                        </div>
                      </div>
                      <Link href={`/exams/${id}/result`}>
                        <Button size="sm" variant="ghost">
                          View
                        </Button>
                      </Link>
                    </div>
                  ))}
                </div>
              </CardContent>
              <CardFooter>
                <Link href="/my-grades" className="w-full">
                  <Button variant="outline" className="w-full">
                    View all results
                  </Button>
                </Link>
              </CardFooter>
            </Card>

            <Card className="md:col-span-2">
              <CardHeader>
                <CardTitle>Upcoming Competitions</CardTitle>
                <CardDescription>Challenge yourself and compete with others</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {[1, 2, 3].map((id) => (
                    <Card key={id} className="border shadow-sm">
                      <CardContent className="p-4">
                        <div className="relative h-32 w-full rounded-md overflow-hidden mb-3">
                          <Image
                            src={`/images/certificate-${id}.png`}
                            alt={`Competition ${id}`}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <h4 className="text-sm font-semibold mb-1">
                          {["Coding Challenge 2025", "Data Science Cup", "AI Innovation Contest"][id - 1]}
                        </h4>
                        <div className="flex items-center text-gray-500 dark:text-gray-400 mb-3">
                          <Calendar className="h-3.5 w-3.5 mr-1" />
                          <span className="text-xs">
                            {["June 5-12, 2025", "June 20-21, 2025", "July 10-15, 2025"][id - 1]}
                          </span>
                        </div>
                        <Link href={`/competitions/${id}/intro`}>
                          <Button size="sm" className="w-full">
                            Register Now
                          </Button>
                        </Link>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="ai">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="md:col-span-3">
              <CardHeader>
                <CardTitle>AI Learning Assistants</CardTitle>
                <CardDescription>Your personal AI tutors and study helpers</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {[1, 2, 3, 4, 5, 6].map((id) => (
                    <Card key={id} className="border shadow-sm">
                      <CardContent className="p-4">
                        <div className="flex items-center space-x-3 mb-3">
                          <div className="relative h-12 w-12 rounded-full overflow-hidden">
                            <Image
                              src={`/images/ai-assistant-${id}.png`}
                              alt={`AI Assistant ${id}`}
                              fill
                              className="object-cover"
                            />
                          </div>
                          <div>
                            <h4 className="text-sm font-semibold">
                              {
                                [
                                  "Study Buddy",
                                  "Code Helper",
                                  "Math Tutor",
                                  "Writing Coach",
                                  "Science Expert",
                                  "Career Advisor",
                                ][id - 1]
                              }
                            </h4>
                            <p className="text-xs text-gray-500 dark:text-gray-400">
                              {
                                [
                                  "General learning assistance",
                                  "Programming help",
                                  "Math problem solving",
                                  "Essay and writing feedback",
                                  "Science concepts explained",
                                  "Career and skill guidance",
                                ][id - 1]
                              }
                            </p>
                          </div>
                        </div>
                        <Link href={`/ai-chat/${id}`}>
                          <Button size="sm" variant="outline" className="w-full">
                            Chat Now
                          </Button>
                        </Link>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
              <CardFooter>
                <div className="flex flex-col sm:flex-row w-full gap-3">
                  <Link href="/ai-assistant/create" className="flex-1">
                    <Button variant="outline" className="w-full">
                      Create Custom Assistant
                    </Button>
                  </Link>
                  <Link href="/course-advisor" className="flex-1">
                    <Button className="w-full">Get Course Recommendations</Button>
                  </Link>
                </div>
              </CardFooter>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="achievements">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Certificates & Badges</CardTitle>
                <CardDescription>Your earned credentials</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {[1, 2, 3].map((id) => (
                    <Card key={id} className="border shadow-sm">
                      <CardContent className="p-4">
                        <div className="relative h-32 w-full rounded-md overflow-hidden mb-3">
                          <Image
                            src={`/images/certificate-${id}.png`}
                            alt={`Certificate ${id}`}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <h4 className="text-sm font-semibold mb-1">
                          {["Data Science Certification", "Web Development Pro", "Machine Learning Expert"][id - 1]}
                        </h4>
                        <div className="flex items-center text-gray-500 dark:text-gray-400">
                          <Calendar className="h-3.5 w-3.5 mr-1" />
                          <span className="text-xs">
                            Issued: {["Jan 15, 2025", "Mar 22, 2025", "Apr 10, 2025"][id - 1]}
                          </span>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
              <CardFooter>
                <Link href="/certificate/all" className="w-full">
                  <Button variant="outline" className="w-full">
                    View all certificates
                  </Button>
                </Link>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Learning Journey</CardTitle>
                <CardDescription>Your educational milestones</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[1, 2, 3, 4].map((id) => (
                    <div key={id} className="flex">
                      <div className="mr-4 flex flex-col items-center">
                        <div className="rounded-full h-9 w-9 bg-blue-100 dark:bg-blue-900 flex items-center justify-center">
                          {
                            [
                              <BookOpen key="1" className="h-5 w-5 text-blue-600 dark:text-blue-400" />,
                              <Award key="2" className="h-5 w-5 text-amber-600 dark:text-amber-400" />,
                              <BarChart2 key="3" className="h-5 w-5 text-green-600 dark:text-green-400" />,
                              <MessageSquare key="4" className="h-5 w-5 text-purple-600 dark:text-purple-400" />,
                            ][id - 1]
                          }
                        </div>
                        {id < 4 && <div className="h-full w-0.5 bg-gray-200 dark:bg-gray-700 mt-1"></div>}
                      </div>
                      <div className="pb-5">
                        <h4 className="text-sm font-medium">
                          {
                            [
                              "Completed Web Development Fundamentals",
                              "Earned Data Science Certificate",
                              "Scored 95% on Machine Learning Exam",
                              "Joined AI Research Group",
                            ][id - 1]
                          }
                        </h4>
                        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                          {["May 5, 2025", "April 20, 2025", "March 15, 2025", "February 28, 2025"][id - 1]}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
              <CardFooter>
                <Link href="/my-grades" className="w-full">
                  <Button variant="outline" className="w-full">
                    View complete journey
                  </Button>
                </Link>
              </CardFooter>
            </Card>
          </div>
        </TabsContent>
      </Tabs>

      {/* Quick Access Shortcuts */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <Link href="/courses/categories">
          <Card className="hover:bg-gray-50 dark:hover:bg-gray-900 transition-colors">
            <CardContent className="p-4 flex flex-col items-center justify-center text-center">
              <BookOpen className="h-7 w-7 text-blue-600 dark:text-blue-400 mb-2" />
              <h3 className="font-semibold">Courses</h3>
            </CardContent>
          </Card>
        </Link>

        <Link href="/exams/category/all">
          <Card className="hover:bg-gray-50 dark:hover:bg-gray-900 transition-colors">
            <CardContent className="p-4 flex flex-col items-center justify-center text-center">
              <BarChart2 className="h-7 w-7 text-purple-600 dark:text-purple-400 mb-2" />
              <h3 className="font-semibold">Exams</h3>
            </CardContent>
          </Card>
        </Link>

        <Link href="/ai-assistant/create">
          <Card className="hover:bg-gray-50 dark:hover:bg-gray-900 transition-colors">
            <CardContent className="p-4 flex flex-col items-center justify-center text-center">
              <MessageSquare className="h-7 w-7 text-amber-600 dark:text-amber-400 mb-2" />
              <h3 className="font-semibold">AI Assistants</h3>
            </CardContent>
          </Card>
        </Link>

        <Link href="/my-sharing">
          <Card className="hover:bg-gray-50 dark:hover:bg-gray-900 transition-colors">
            <CardContent className="p-4 flex flex-col items-center justify-center text-center">
              <Briefcase className="h-7 w-7 text-green-600 dark:text-green-400 mb-2" />
              <h3 className="font-semibold">My Sharing</h3>
            </CardContent>
          </Card>
        </Link>
      </div>
    </div>
  )
}
