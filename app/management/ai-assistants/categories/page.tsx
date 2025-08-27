"use client"

import { useState } from "react"
import { ArrowLeft, Plus, MoreHorizontal, Pencil, Trash2, MoveUp, MoveDown } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

// AI助手分类管理页面
export default function AIAssistantCategoriesPage() {
  // 低空经济相关AI助手分类
  const [categories, setCategories] = useState([
    { id: 1, name: "无人机技术", count: 8, description: "专注于无人机技术、操控和应用的AI助手" },
    { id: 2, name: "低空导航", count: 5, description: "低空航路规划和导航相关的AI助手" },
    { id: 3, name: "eVTOL技术", count: 4, description: "电动垂直起降飞行器技术相关的AI助手" },
    { id: 4, name: "空域管理", count: 3, description: "低空空域规划和管理相关的AI助手" },
    { id: 5, name: "测绘应用", count: 6, description: "无人机测绘和地理信息应用相关的AI助手" },
    { id: 6, name: "低空物流", count: 4, description: "低空物流配送解决方案相关的AI助手" },
    { id: 7, name: "认证考试", count: 7, description: "低空经济领域各类认证和考试相关的AI助手" },
  ])

  // 新分类表单
  const [newCategory, setNewCategory] = useState({ name: "", description: "" })
  const [editingCategory, setEditingCategory] = useState<null | { id: number; name: string; description: string }>(null)
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [deletingCategoryId, setDeletingCategoryId] = useState<null | number>(null)

  // 新增分类
  const handleAddCategory = () => {
    if (newCategory.name.trim() === "") return

    const newId = Math.max(...categories.map((c) => c.id), 0) + 1
    setCategories([
      ...categories,
      { id: newId, name: newCategory.name, count: 0, description: newCategory.description },
    ])
    setNewCategory({ name: "", description: "" })
    setIsAddDialogOpen(false)
  }

  // 编辑分类
  const handleEditCategory = () => {
    if (!editingCategory || editingCategory.name.trim() === "") return

    setCategories(
      categories.map((c) =>
        c.id === editingCategory.id
          ? { ...c, name: editingCategory.name, description: editingCategory.description }
          : c,
      ),
    )
    setIsEditDialogOpen(false)
  }

  // 删除分类
  const handleDeleteCategory = () => {
    if (deletingCategoryId === null) return

    setCategories(categories.filter((c) => c.id !== deletingCategoryId))
    setIsDeleteDialogOpen(false)
    setDeletingCategoryId(null)
  }

  // 移动分类顺序
  const moveCategory = (id: number, direction: "up" | "down") => {
    const index = categories.findIndex((c) => c.id === id)
    if ((direction === "up" && index === 0) || (direction === "down" && index === categories.length - 1)) {
      return
    }

    const newCategories = [...categories]
    const targetIndex = direction === "up" ? index - 1 : index + 1
    const temp = newCategories[index]
    newCategories[index] = newCategories[targetIndex]
    newCategories[targetIndex] = temp

    setCategories(newCategories)
  }

  return (
    <div className="min-h-screen bg-black text-white">
      {/* 顶部导航栏 */}
      <div className="sticky top-0 left-0 right-0 h-14 flex items-center px-4 bg-gray-900/80 backdrop-blur-md border-b border-gray-800 z-10">
        <Link href="/management/ai-assistants" className="flex items-center text-gray-300">
          <ArrowLeft className="h-5 w-5 mr-2" />
          <span>返回</span>
        </Link>
        <h1 className="flex-1 text-center text-lg font-semibold text-white">AI助手分类管理</h1>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button size="icon" variant="ghost" className="h-8 w-8 text-gray-300">
              <Plus className="h-5 w-5" />
            </Button>
          </DialogTrigger>
          <DialogContent className="bg-gray-900 text-white border-gray-800">
            <DialogHeader>
              <DialogTitle>添加AI助手分类</DialogTitle>
              <DialogDescription className="text-gray-400">创建新的AI助手分类以便更好地组织AI助手。</DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="category-name">分类名称</Label>
                <Input
                  id="category-name"
                  placeholder="输入分类名称"
                  value={newCategory.name}
                  onChange={(e) => setNewCategory({ ...newCategory, name: e.target.value })}
                  className="bg-gray-800 border-gray-700 text-white"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="category-description">分类描述</Label>
                <Input
                  id="category-description"
                  placeholder="输入分类描述"
                  value={newCategory.description}
                  onChange={(e) => setNewCategory({ ...newCategory, description: e.target.value })}
                  className="bg-gray-800 border-gray-700 text-white"
                />
              </div>
            </div>
            <DialogFooter>
              <Button
                variant="outline"
                onClick={() => setIsAddDialogOpen(false)}
                className="border-gray-700 text-gray-300"
              >
                取消
              </Button>
              <Button onClick={handleAddCategory}>确认添加</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <div className="p-4">
        <div className="space-y-4">
          <div className="text-sm text-gray-400 mb-2">当前共 {categories.length} 个分类</div>

          {categories.map((category) => (
            <div
              key={category.id}
              className="p-4 bg-gray-900 border border-gray-800 rounded-lg flex justify-between items-center"
            >
              <div className="flex-1">
                <div className="flex items-center justify-between mb-1">
                  <h3 className="font-medium text-white">{category.name}</h3>
                  <div className="text-xs text-gray-500">{category.count}个助手</div>
                </div>
                <p className="text-sm text-gray-400">{category.description}</p>
              </div>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="h-8 w-8 text-gray-400">
                    <MoreHorizontal className="h-5 w-5" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="bg-gray-900 text-white border-gray-700">
                  <DropdownMenuItem
                    onClick={() => {
                      setEditingCategory({
                        id: category.id,
                        name: category.name,
                        description: category.description,
                      })
                      setIsEditDialogOpen(true)
                    }}
                    className="cursor-pointer flex items-center text-gray-200 focus:text-white focus:bg-gray-800"
                  >
                    <Pencil className="h-4 w-4 mr-2" /> 编辑
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => moveCategory(category.id, "up")}
                    className="cursor-pointer flex items-center text-gray-200 focus:text-white focus:bg-gray-800"
                  >
                    <MoveUp className="h-4 w-4 mr-2" /> 上移
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => moveCategory(category.id, "down")}
                    className="cursor-pointer flex items-center text-gray-200 focus:text-white focus:bg-gray-800"
                  >
                    <MoveDown className="h-4 w-4 mr-2" /> 下移
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => {
                      setDeletingCategoryId(category.id)
                      setIsDeleteDialogOpen(true)
                    }}
                    className="cursor-pointer flex items-center text-red-400 focus:text-red-300 focus:bg-red-900/20"
                  >
                    <Trash2 className="h-4 w-4 mr-2" /> 删除
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          ))}
        </div>
      </div>

      {/* 编辑分类对话框 */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="bg-gray-900 text-white border-gray-800">
          <DialogHeader>
            <DialogTitle>编辑AI助手分类</DialogTitle>
            <DialogDescription className="text-gray-400">修改AI助手分类信息。</DialogDescription>
          </DialogHeader>
          {editingCategory && (
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="edit-category-name">分类名称</Label>
                <Input
                  id="edit-category-name"
                  placeholder="输入分类名称"
                  value={editingCategory.name}
                  onChange={(e) => setEditingCategory({ ...editingCategory, name: e.target.value })}
                  className="bg-gray-800 border-gray-700 text-white"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-category-description">分类描述</Label>
                <Input
                  id="edit-category-description"
                  placeholder="输入分类描述"
                  value={editingCategory.description}
                  onChange={(e) => setEditingCategory({ ...editingCategory, description: e.target.value })}
                  className="bg-gray-800 border-gray-700 text-white"
                />
              </div>
            </div>
          )}
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsEditDialogOpen(false)}
              className="border-gray-700 text-gray-300"
            >
              取消
            </Button>
            <Button onClick={handleEditCategory}>保存更改</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* 删除分类确认对话框 */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent className="bg-gray-900 text-white border-gray-800">
          <DialogHeader>
            <DialogTitle>删除AI助手分类</DialogTitle>
            <DialogDescription className="text-gray-400">
              确定要删除此分类吗？删除后分类下的AI助手将变为未分类状态。
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsDeleteDialogOpen(false)}
              className="border-gray-700 text-gray-300"
            >
              取消
            </Button>
            <Button variant="destructive" onClick={handleDeleteCategory}>
              确认删除
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
