"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { Card } from "@/components/ui/card"
import Image from "next/image"
import { ArrowUpDown, GripVertical } from "lucide-react"

interface Course {
  id: number
  title: string
  image: string
  [key: string]: any
}

interface DragSortProps {
  courses: Course[]
  onSort: (newOrder: Course[]) => void
}

export default function DragSort({ courses, onSort }: DragSortProps) {
  const [items, setItems] = useState<Course[]>(courses)
  const [dragging, setDragging] = useState<number | null>(null)
  const [dragOverItem, setDragOverItem] = useState<number | null>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    setItems(courses)
  }, [courses])

  const handleDragStart = (e: React.DragEvent<HTMLDivElement>, index: number) => {
    e.dataTransfer.setData("text/plain", index.toString())
    e.dataTransfer.effectAllowed = "move"
    setDragging(index)
  }

  const handleDragEnter = (e: React.DragEvent<HTMLDivElement>, index: number) => {
    e.preventDefault()
    setDragOverItem(index)
  }

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    e.dataTransfer.dropEffect = "move"
  }

  const handleDrop = (e: React.DragEvent<HTMLDivElement>, index: number) => {
    e.preventDefault()
    const draggedItemIndex = Number(e.dataTransfer.getData("text/plain"))
    if (draggedItemIndex === index) return

    const newItems = [...items]
    const draggedItem = newItems[draggedItemIndex]

    // Remove the dragged item
    newItems.splice(draggedItemIndex, 1)
    // Insert it at the new position
    newItems.splice(index, 0, draggedItem)

    setItems(newItems)
    onSort(newItems)
    setDragging(null)
    setDragOverItem(null)
  }

  const handleDragEnd = () => {
    setDragging(null)
    setDragOverItem(null)
  }

  return (
    <div ref={containerRef} className="space-y-2">
      {items.map((course, index) => (
        <div
          key={course.id}
          draggable
          onDragStart={(e) => handleDragStart(e, index)}
          onDragEnter={(e) => handleDragEnter(e, index)}
          onDragOver={handleDragOver}
          onDrop={(e) => handleDrop(e, index)}
          onDragEnd={handleDragEnd}
          className={`${dragging === index ? "opacity-50" : "opacity-100"} ${
            dragOverItem === index ? "border-2 border-blue-500" : ""
          } transition-opacity duration-200`}
        >
          <Card className="p-3 bg-gray-900 border-gray-800 hover:bg-gray-800/80 cursor-move">
            <div className="flex items-center">
              <div className="p-1 mr-2 text-gray-400">
                <GripVertical className="h-5 w-5" />
              </div>
              <div className="relative w-12 h-12 mr-3 rounded-md overflow-hidden flex-shrink-0">
                <Image src={course.image || "/placeholder.svg"} alt={course.title} fill className="object-cover" />
              </div>
              <div className="flex-1">
                <h3 className="font-medium text-white text-sm line-clamp-1">{course.title}</h3>
                <p className="text-xs text-gray-400">拖动调整顺序</p>
              </div>
              <div className="ml-2 flex-shrink-0">
                <div className="flex items-center justify-center h-8 w-8 rounded-full bg-gray-800">
                  <ArrowUpDown className="h-4 w-4 text-gray-400" />
                </div>
              </div>
            </div>
          </Card>
        </div>
      ))}
    </div>
  )
}
