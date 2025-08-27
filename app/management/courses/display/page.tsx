"use client"

import { useState } from "react"

export default function CourseDisplaySettings() {
  // 状态管理
  const [displayTab, setDisplayTab] = useState("featured")
  const [featuredCourses, setFeaturedCourses] = useState([
    {
      id: "course-1",
      title: "高考英语词汇精讲",
      instructor: "王老师",
      price: "¥299",
      image: "/images/course-1.png",
      type: "recorded",
      active: true,
    },
    {
      id: "course-2",
      title: "数学解题技巧与方法",
      instructor: "李老师",
      price: "免费",
      image: "/images/course-2.png",
      type: "recorded",
      active: true,
    },
    {
      id: "course-4",
      title: "语文阅读理解专项训练",
      instructor: "刘老师",
      price: "免费",
      image: "/images/course-4.png",
      type: "recorded",
      active: false,
    },
  ])
  
  const [popularCourses, setPopularCourses] = useState([
    {
      id: "course-3",
      title: "物理实验与解析",
      instructor: "张老师",
      price: "¥279",
      image: "/images/course-3.png",
      type: "recorded",
      active: true,
    },
    {
      id: "course-1",
      title: "高考英语词汇精讲",
      instructor: "王老师",
      price: "¥299",
      image: "/images/course-1.png",
      type: "recorded",
      active: true,
    },
    {
      id: "course-2",
      title: "数学解题技巧与方法",
      instructor: "李老师",
      price: "免费",
      image: "/images/course-2.png",
      type: "recorded",
      active: true,
    },
  ])
  
  const [liveCourses, setLiveCourses] = useState([
    {
      id: "live-1",
      title: "高考英语冲刺班",
      instructor: "王老师",
      price: "¥99",
      image: "/images/course-1.png",
      type: "live",
      active: true,
    },
    {
      id: "live-2",
      title: "数学难点突破讲解",
      instructor: "李老师",
      price: "免费",
      image: "/images/course-2.png",
      type: "live",
      active: true,
    },
    {
      id: "live-3",
      title: "物理实验专题",
      instructor
