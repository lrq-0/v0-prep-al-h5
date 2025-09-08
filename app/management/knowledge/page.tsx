"use client"

import { useState } from "react"
import {
  ArrowLeft,
  Search,
  Plus,
  FileText,
  Pencil,
  Trash2,
  GripVertical,
  FolderPlus,
  Upload,
  Link2,
  MoveVertical,
} from "lucide-react"
import Link from "next/link"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

export default function KnowledgeManagement() {
  const [selectedCategory, setSelectedCategory] = useState("英语")
  const [searchQuery, setSearchQuery] = useState("")
  const [showCreateCategoryDialog, setShowCreateCategoryDialog] = useState(false)
  const [showEditCategoryDialog, setShowEditCategoryDialog] = useState(false)
  const [showDeleteCategoryDialog, setShowDeleteCategoryDialog] = useState(false)
  const [showUploadDocumentDialog, setShowUploadDocumentDialog] = useState(false)
  const [showDeleteDocumentDialog, setShowDeleteDocumentDialog] = useState(false)
  const [showMoveDocumentDialog, setShowMoveDocumentDialog] = useState(false)
  const [categoryToEdit, setCategoryToEdit] = useState(null)
  const [documentToDelete, setDocumentToDelete] = useState(null)
  const [documentToMove, setDocumentToMove] = useState(null)
  const [uploadType, setUploadType] = useState("file")

  // 模拟分类数据
  const categories = [
    { id: 1, name: "英语", count: 3 },
    { id: 2, name: "数学", count: 2 },
    { id: 3, name: "物理", count: 1 },
    { id: 4, name: "化学", count: 1 },
    { id: 5, name: "生物", count: 1 },
    { id: 6, name: "历史", count: 1 },
    { id: 7, name: "地理", count: 1 },
    { id: 8, name: "政治", count: 1 },
    { id: 9, name: "综合", count: 4 },
  ]

  // 模拟文档数据
  const documents = [
    {
      id: 1,
      title: "高考英语词汇表",
      category: "英语",
      format: "DOCX",
      uploadTime: "2025-04-10 14:30",
      size: "2.5MB",
    },
    {
      id: 2,
      title: "英语语法大全",
      category: "英语",
      format: "PDF",
      uploadTime: "2025-04-08 09:15",
      size: "3.7MB",
    },
    {
      id: 3,
      title: "英语听力训练材料",
      category: "英语",
      format: "MP3",
      uploadTime: "2025-04-05 16:45",
      size: "15.8MB",
    },
    {
      id: 4,
      title: "数学公式大全",
      category: "数学",
      format: "PDF",
      uploadTime: "2025-04-01 11:20",
      size: "4.2MB",
    },
    {
      id: 5,
      title: "高等数学习题集",
      category: "数学",
      format: "PDF",
      uploadTime: "2025-03-28 15:10",
      size: "6.1MB",
    },
    {
      id: 6,
      title: "物理实验图解",
      category: "物理",
      format: "JPG",
      uploadTime: "2025-03-25 10:05",
      size: "1.8MB",
    },
    {
      id: 7,
      title: "化学元素周期表",
      category: "化学",
      format: "PDF",
      uploadTime: "2025-03-20 13:40",
      size: "3.1MB",
    },
    {
      id: 8,
      title: "生物知识结构图",
      category: "生物",
      format: "PPT",
      uploadTime: "2025-03-15 09:30",
      size: "5.6MB",
    },
    {
      id: 9,
      title: "历史年代表",
      category: "历史",
      format: "XLSX",
      uploadTime: "2025-03-10 14:25",
      size: "1.2MB",
    },
    {
      id: 10,
      title: "地理知识点总结",
      category: "地理",
      format: "DOCX",
      uploadTime: "2025-03-05 16:15",
      size: "3.5MB",
    },
    {
      id: 11,
      title: "政治考点归纳",
      category: "政��",
      format: "PDF",
      uploadTime: "2025-03-01 11:50",
      size: "2.8MB",
    },
    {
      id: 12,
      title: "高考复习计划表",
      category: "综合",
      format: "XLSX",
      uploadTime: "2025-02-25 10:35",
      size: "0.8MB",
    },
    {
      id: 13,
      title: "学习方法指导",
      category: "综合",
      format: "PPT",
      uploadTime: "2025-02-20 14:15",
      size: "4.5MB",
    },
    {
      id: 14,
      title: "高考真题解析",
      category: "综合",
      format: "PDF",
      uploadTime: "2025-02-15 09:20",
      size: "6.2MB",
    },
    {
      id: 15,
      title: "学科思维导图",
      category: "综合",
      format: "HTML",
      uploadTime: "2025-02-10 16:40",
      size: "2.3MB",
    },
  ]

  // 获取当前分类的文档
  const filteredDocuments = documents
    .filter((doc) => doc.category === selectedCategory)
    .filter((doc) => doc.title.toLowerCase().includes(searchQuery.toLowerCase()))

  // 处理创建分类
  const handleCreateCategory = () => {
    console.log("创建新分类")
    setShowCreateCategoryDialog(false)
  }

  // 处理编辑分类
  const handleEditCategory = (category) => {
    setCategoryToEdit(category)
    setShowEditCategoryDialog(true)
  }

  // 处理删除分类
  const handleDeleteCategory = (category) => {
    setCategoryToEdit(category)
    setShowDeleteCategoryDialog(true)
  }

  // 处理确认删除分类
  const confirmDeleteCategory = () => {
    console.log("删除分类:", categoryToEdit)
    setShowDeleteCategoryDialog(false)
    setCategoryToEdit(null)
  }

  // 处理上传文档
  const handleUploadDocument = () => {
    console.log("上传文档到分类:", selectedCategory)
    setShowUploadDocumentDialog(false)
  }

  // 处理删除文档
  const handleDeleteDocument = (document) => {
    setDocumentToDelete(document)
    setShowDeleteDocumentDialog(true)
  }

  // 处理确认删除文档
  const confirmDeleteDocument = () => {
    console.log("删除文档:", documentToDelete)
    setShowDeleteDocumentDialog(false)
    setDocumentToDelete(null)
  }

  // 处理移动文档
  const handleMoveDocument = (document) => {
    setDocumentToMove(document)
    setShowMoveDocumentDialog(true)
  }

  // 处理确认移动文档
  const confirmMoveDocument = (targetCategory) => {
    console.log("移动文档:", documentToMove, "到分类:", targetCategory)
    setShowMoveDocumentDialog(false)
    setDocumentToMove(null)
  }

  return (
    <div className="min-h-screen bg-black text-white">
      {/* 顶部导航栏 */}
      <div className="sticky top-0 left-0 right-0 h-14 flex items-center px-4 bg-gray-900/80 backdrop-blur-md border-b border-gray-800 z-10">
        <Link href="/management" className="flex items-center text-gray-300">
          <ArrowLeft className="h-5 w-5 mr-2" />
          <span>返回</span>
        </Link>
        <h1 className="flex-1 text-center text-lg font-semibold text-white">知识库设定</h1>
      </div>

      <div className="flex h-[calc(100vh-56px)]">
        {/* 左侧分类列表 */}
        <div className="w-1/4 min-w-[200px] max-w-[300px] border-r border-gray-800 p-4 overflow-y-auto">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold text-white">分类管理</h2>
            <Button
              size="sm"
              className="bg-blue-600 hover:bg-blue-500"
              onClick={() => setShowCreateCategoryDialog(true)}
            >
              <Plus className="h-4 w-4 mr-1" />
              创建分类
            </Button>
          </div>

          <div className="space-y-2">
            {categories.map((category) => (
              <div
                key={category.id}
                className={`flex items-center justify-between p-2 rounded-md cursor-pointer ${
                  selectedCategory === category.name
                    ? "bg-blue-600 text-white"
                    : "bg-gray-900 text-gray-300 hover:bg-gray-800"
                }`}
                onClick={() => setSelectedCategory(category.name)}
              >
                <div className="flex items-center">
                  <GripVertical className="h-4 w-4 mr-2 cursor-move text-gray-500" />
                  <span>{category.name}</span>
                  <Badge variant="outline" className="ml-2 bg-gray-800 text-gray-300 border-gray-700">
                    {category.count}
                  </Badge>
                </div>
                <div className="flex items-center">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-7 w-7 text-gray-400 hover:text-white hover:bg-gray-800"
                    onClick={(e) => {
                      e.stopPropagation()
                      handleEditCategory(category)
                    }}
                  >
                    <Pencil className="h-3.5 w-3.5" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-7 w-7 text-gray-400 hover:text-white hover:bg-gray-800"
                    onClick={(e) => {
                      e.stopPropagation()
                      handleDeleteCategory(category)
                    }}
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 右侧文档列表 */}
        <div className="flex-1 p-4 overflow-y-auto">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold text-white">{selectedCategory} - 文档列表</h2>
            <Button className="bg-blue-600 hover:bg-blue-500" onClick={() => setShowUploadDocumentDialog(true)}>
              <Upload className="h-4 w-4 mr-1" />
              上传文档
            </Button>
          </div>

          {/* 搜索框 */}
          <div className="relative mb-4">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 h-4 w-4" />
            <Input
              placeholder="搜索文档..."
              className="pl-9 bg-gray-900 border-gray-700 text-white placeholder:text-gray-500 focus-visible:ring-blue-500"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          {/* 文档列表 */}
          <div className="space-y-2">
            {filteredDocuments.length === 0 ? (
              <div className="text-center py-12 bg-gray-900 rounded-lg">
                <p className="text-gray-500">该分类下暂无文档</p>
              </div>
            ) : (
              filteredDocuments.map((document) => (
                <Card key={document.id} className="p-3 bg-gray-900 border-gray-800">
                  <div className="flex items-center">
                    <div className="w-10 h-10 rounded-md bg-gray-800 flex items-center justify-center mr-3">
                      <FileText className="h-5 w-5 text-blue-400" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-medium text-white text-sm truncate">{document.title}</h3>
                      <div className="flex justify-between text-xs mt-1">
                        <div className="flex items-center">
                          <span className="text-blue-400 mr-2">{document.format}</span>
                          <span className="text-gray-400">{document.size}</span>
                        </div>
                        <span className="text-gray-500">{document.uploadTime}</span>
                      </div>
                    </div>
                    <div className="flex items-center ml-2">
                      <GripVertical className="h-4 w-4 mr-2 cursor-move text-gray-500" />
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 text-gray-400 hover:text-white hover:bg-gray-800"
                          >
                            <MoveVertical className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="bg-gray-900 border-gray-800 text-white">
                          <DropdownMenuItem
                            className="hover:bg-gray-800 cursor-pointer"
                            onClick={() => handleMoveDocument(document)}
                          >
                            移动到其他分类
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            className="hover:bg-gray-800 cursor-pointer text-red-400"
                            onClick={() => handleDeleteDocument(document)}
                          >
                            删除文档
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </div>
                </Card>
              ))
            )}
          </div>
        </div>
      </div>

      {/* 创建分类对话框 */}
      <Dialog open={showCreateCategoryDialog} onOpenChange={setShowCreateCategoryDialog}>
        <DialogContent className="bg-gray-900 border-gray-800 text-white">
          <DialogHeader>
            <DialogTitle>创建新分类</DialogTitle>
            <DialogDescription className="text-gray-400">添加一个新的知识库分类，用于组织相关文档。</DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-2">
            <div className="space-y-2">
              <Label htmlFor="category-name" className="text-white">
                分类名称
              </Label>
              <Input id="category-name" placeholder="输入分类名称" className="bg-gray-800 border-gray-700 text-white" />
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              className="border-gray-700 text-gray-300"
              onClick={() => setShowCreateCategoryDialog(false)}
            >
              取消
            </Button>
            <Button className="bg-blue-600 hover:bg-blue-500" onClick={handleCreateCategory}>
              创建
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* 编辑分类对话框 */}
      <Dialog open={showEditCategoryDialog} onOpenChange={setShowEditCategoryDialog}>
        <DialogContent className="bg-gray-900 border-gray-800 text-white">
          <DialogHeader>
            <DialogTitle>编辑分类</DialogTitle>
            <DialogDescription className="text-gray-400">修改分类名称。</DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-2">
            <div className="space-y-2">
              <Label htmlFor="edit-category-name" className="text-white">
                分类名称
              </Label>
              <Input
                id="edit-category-name"
                placeholder="输入分类名称"
                className="bg-gray-800 border-gray-700 text-white"
                defaultValue={categoryToEdit?.name}
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              className="border-gray-700 text-gray-300"
              onClick={() => setShowEditCategoryDialog(false)}
            >
              取消
            </Button>
            <Button className="bg-blue-600 hover:bg-blue-500" onClick={() => setShowEditCategoryDialog(false)}>
              保存
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* 删除分类确认对话框 */}
      <AlertDialog open={showDeleteCategoryDialog} onOpenChange={setShowDeleteCategoryDialog}>
        <AlertDialogContent className="bg-gray-900 border-gray-800 text-white">
          <AlertDialogHeader>
            <AlertDialogTitle>确认删除分类</AlertDialogTitle>
            <AlertDialogDescription className="text-gray-400">
              您确定要删除"{categoryToEdit?.name}"分类吗？该分类下的所有文档也将被删除，此操作无法撤销。
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="bg-gray-800 text-white border-gray-700 hover:bg-gray-700">
              取消
            </AlertDialogCancel>
            <AlertDialogAction className="bg-red-600 hover:bg-red-500" onClick={confirmDeleteCategory}>
              确认删除
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* 上传文档对话框 */}
      <Dialog open={showUploadDocumentDialog} onOpenChange={setShowUploadDocumentDialog}>
        <DialogContent className="bg-gray-900 border-gray-800 text-white">
          <DialogHeader>
            <DialogTitle>上传文档</DialogTitle>
            <DialogDescription className="text-gray-400">上传文档到"{selectedCategory}"分类。</DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-2">
            <div className="space-y-2">
              <Label htmlFor="document-title" className="text-white">
                文档标题
              </Label>
              <Input
                id="document-title"
                placeholder="输入文档标题"
                className="bg-gray-800 border-gray-700 text-white"
              />
            </div>

            <RadioGroup value={uploadType} onValueChange={setUploadType} className="flex space-x-4">
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="file" id="file" />
                <Label htmlFor="file" className="text-white">
                  上传文件
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="link" id="link" />
                <Label htmlFor="link" className="text-white">
                  外部链接
                </Label>
              </div>
            </RadioGroup>

            {uploadType === "file" ? (
              <div className="border-2 border-dashed border-gray-700 rounded-lg p-6 text-center">
                <FolderPlus className="h-8 w-8 mx-auto text-gray-500 mb-2" />
                <p className="text-sm text-gray-400 mb-2">点击或拖拽文件到此处上传</p>
                <p className="text-xs text-gray-500">支持 PDF, DOCX, XLSX, PPT, JPG, PNG 等格式</p>
                <Button className="mt-4 bg-gray-800 hover:bg-gray-700">选择文件</Button>
              </div>
            ) : (
              <div className="space-y-2">
                <Label htmlFor="document-link" className="text-white">
                  文档链接
                </Label>
                <div className="flex space-x-2">
                  <Input
                    id="document-link"
                    placeholder="输入文档链接 (腾讯文档、飞书文档等)"
                    className="bg-gray-800 border-gray-700 text-white flex-1"
                  />
                  <Button variant="outline" size="icon" className="border-gray-700">
                    <Link2 className="h-4 w-4 text-gray-400" />
                  </Button>
                </div>
                <p className="text-xs text-gray-500">支持腾讯文档、飞书文档、石墨文档等外部链接</p>
              </div>
            )}
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              className="border-gray-700 text-gray-300"
              onClick={() => setShowUploadDocumentDialog(false)}
            >
              取消
            </Button>
            <Button className="bg-blue-600 hover:bg-blue-500" onClick={handleUploadDocument}>
              上传
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* 删除文档确认对话框 */}
      <AlertDialog open={showDeleteDocumentDialog} onOpenChange={setShowDeleteDocumentDialog}>
        <AlertDialogContent className="bg-gray-900 border-gray-800 text-white">
          <AlertDialogHeader>
            <AlertDialogTitle>确认删除文档</AlertDialogTitle>
            <AlertDialogDescription className="text-gray-400">
              您确定要删除"{documentToDelete?.title}"文档吗？此操作无法撤销。
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="bg-gray-800 text-white border-gray-700 hover:bg-gray-700">
              取消
            </AlertDialogCancel>
            <AlertDialogAction className="bg-red-600 hover:bg-red-500" onClick={confirmDeleteDocument}>
              确认删除
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* 移动文档对话框 */}
      <Dialog open={showMoveDocumentDialog} onOpenChange={setShowMoveDocumentDialog}>
        <DialogContent className="bg-gray-900 border-gray-800 text-white">
          <DialogHeader>
            <DialogTitle>移动文档</DialogTitle>
            <DialogDescription className="text-gray-400">将"{documentToMove?.title}"移动到其他分类。</DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-2">
            <div className="space-y-2">
              <Label className="text-white">选择目标分类</Label>
              <div className="max-h-60 overflow-y-auto space-y-2">
                {categories
                  .filter((category) => category.name !== selectedCategory)
                  .map((category) => (
                    <div
                      key={category.id}
                      className="flex items-center justify-between p-2 rounded-md cursor-pointer bg-gray-800 hover:bg-gray-700"
                      onClick={() => confirmMoveDocument(category.name)}
                    >
                      <span className="text-white">{category.name}</span>
                      <Badge variant="outline" className="bg-gray-700 text-gray-300 border-gray-600">
                        {category.count}
                      </Badge>
                    </div>
                  ))}
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              className="border-gray-700 text-gray-300"
              onClick={() => setShowMoveDocumentDialog(false)}
            >
              取消
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
