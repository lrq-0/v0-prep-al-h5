"use client"

import { useState } from "react"
import { ArrowLeft, UserPlus, Info, Trash2 } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
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

// 模拟数据
const initialAdminUsers = [
  {
    id: "ADM10001",
    name: "张三",
    phone: "13800138000",
    role: "主账号",
    isMain: true,
    note: "系统管理员",
    createdAt: "2023-08-15 14:30",
    lastLogin: "2024-04-25 09:45",
  },
  {
    id: "ADM10025",
    name: "李四",
    phone: "13900139000",
    role: "子账号",
    isMain: false,
    note: "负责课程管理",
    createdAt: "2023-09-21 10:15",
    lastLogin: "2024-04-24 16:30",
  },
  {
    id: "ADM10042",
    name: "王五",
    phone: "13700137000",
    role: "子账号",
    isMain: false,
    note: "负责考试管理",
    createdAt: "2023-11-03 09:20",
    lastLogin: "2024-04-23 11:22",
  },
  {
    id: "ADM10056",
    name: "赵六",
    phone: "13600136000",
    role: "子账号",
    isMain: false,
    note: "负责AI助手设置",
    createdAt: "2024-01-12 15:40",
    lastLogin: "2024-04-20 14:15",
  },
]

export default function AdminsPage() {
  const [adminUsers, setAdminUsers] = useState(initialAdminUsers)
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [newAdminId, setNewAdminId] = useState("")
  const [newAdminNote, setNewAdminNote] = useState("")
  const [deleteAdminId, setDeleteAdminId] = useState<string | null>(null)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [adminToDelete, setAdminToDelete] = useState<{ id: string; name: string } | null>(null)

  // 处理添加子管理员
  const handleAddAdmin = () => {
    // 这里应该有实际的API调用来添加管理员
    alert(`已添加ID为${newAdminId}的用户为子管理员`)
    setIsAddDialogOpen(false)
    setNewAdminId("")
    setNewAdminNote("")
  }

  // 打开删除确认对话框
  const openDeleteDialog = (admin: { id: string; name: string }) => {
    setAdminToDelete(admin)
    setIsDeleteDialogOpen(true)
  }

  // 处理删除子管理员
  const handleDeleteAdmin = () => {
    if (adminToDelete) {
      // 这里应该有实际的API调用来删除管理员
      setAdminUsers(adminUsers.filter((admin) => admin.id !== adminToDelete.id))
      setIsDeleteDialogOpen(false)
      setAdminToDelete(null)
    }
  }

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100">
      {/* 顶部导航栏 */}
      <div className="sticky top-0 left-0 right-0 h-14 flex items-center px-4 bg-gray-800 shadow-md z-10">
        <Link href="/management" className="flex items-center text-gray-300 hover:text-white">
          <ArrowLeft className="h-5 w-5 mr-2" />
          <span>返回</span>
        </Link>
        <h1 className="flex-1 text-center text-lg font-semibold text-white">管理员设定</h1>
      </div>

      <div className="p-4 pb-16">
        {/* 功能说明 */}
        <Card className="p-4 bg-gray-800 border border-gray-700 mb-6">
          <div className="flex">
            <Info className="h-5 w-5 text-blue-400 mr-2 flex-shrink-0 mt-0.5" />
            <div>
              <h2 className="text-md font-semibold text-gray-100 mb-1">权限说明</h2>
              <p className="text-sm text-gray-300 mb-2">
                <span className="font-medium text-gray-200">主账号管理员：</span>
                拥有代理后台的全部修改权限，以及我的分享里账户充值和提现权限。
              </p>
              <p className="text-sm text-gray-300">
                <span className="font-medium text-gray-200">子账号管理员：</span>
                仅拥有代理后台的修改权限，无资金充值和提现权限。
              </p>
            </div>
          </div>
        </Card>

        {/* 添加子管理员按钮 */}
        <div className="mb-6">
          <Button onClick={() => setIsAddDialogOpen(true)} className="bg-blue-600 hover:bg-blue-700 text-white">
            <UserPlus className="h-4 w-4 mr-2" />
            添加子管理员
          </Button>
        </div>

        {/* 管理员列表 */}
        <Card className="border border-gray-700 bg-gray-800">
          <Table>
            <TableHeader>
              <TableRow className="border-b border-gray-700">
                <TableHead className="text-gray-300">账号</TableHead>
                <TableHead className="text-gray-300">手机号</TableHead>
                <TableHead className="text-gray-300">角色</TableHead>
                <TableHead className="text-gray-300">备注</TableHead>
                <TableHead className="text-gray-300">最近登录</TableHead>
                <TableHead className="text-gray-300 text-right">操作</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {adminUsers.map((admin) => (
                <TableRow key={admin.id} className="border-b border-gray-700">
                  <TableCell className="py-4">
                    <div className="text-sm font-medium text-gray-200">{admin.name}</div>
                    <div className="text-xs text-gray-400 mt-1">{admin.id}</div>
                  </TableCell>
                  <TableCell className="text-gray-300">{admin.phone}</TableCell>
                  <TableCell>
                    {admin.isMain ? (
                      <Badge className="bg-red-900/50 text-red-300 hover:bg-red-800 border-none">主账号</Badge>
                    ) : (
                      <span className="text-gray-300">子账号</span>
                    )}
                  </TableCell>
                  <TableCell className="text-gray-300">{admin.note}</TableCell>
                  <TableCell className="text-gray-300">{admin.lastLogin}</TableCell>
                  <TableCell className="text-right">
                    {!admin.isMain && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => openDeleteDialog({ id: admin.id, name: admin.name })}
                        className="text-red-400 hover:text-red-300 hover:bg-red-900/30"
                      >
                        <Trash2 className="h-4 w-4" />
                        <span className="ml-1">删除</span>
                      </Button>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Card>
      </div>

      {/* 添加子管理员弹窗 */}
      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent className="bg-gray-800 text-gray-100 border border-gray-700">
          <DialogHeader>
            <DialogTitle className="text-gray-100">添加子管理员</DialogTitle>
            <DialogDescription className="text-gray-400">
              输入用户ID码和备注名，将其添加为子管理员。子管理员仅拥有代理后台的修改权限，无资金操作权限。
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-2">
            <div className="space-y-2">
              <Label htmlFor="adminId" className="text-gray-200">
                用户ID码
              </Label>
              <Input
                id="adminId"
                placeholder="输入需要添加为子管理员的用户ID码"
                value={newAdminId}
                onChange={(e) => setNewAdminId(e.target.value)}
                className="bg-gray-700 border-gray-600 text-gray-100 placeholder:text-gray-500"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="adminNote" className="text-gray-200">
                备注名称
              </Label>
              <Textarea
                id="adminNote"
                placeholder="例如：负责课程管理、负责考试管理等"
                value={newAdminNote}
                onChange={(e) => setNewAdminNote(e.target.value)}
                className="bg-gray-700 border-gray-600 text-gray-100 placeholder:text-gray-500 resize-none h-24"
              />
            </div>
          </div>

          <DialogFooter>
            <DialogClose asChild>
              <Button
                variant="outline"
                className="bg-transparent border-gray-600 text-gray-300 hover:bg-gray-700 hover:text-gray-100"
              >
                取消
              </Button>
            </DialogClose>
            <Button
              onClick={handleAddAdmin}
              disabled={!newAdminId.trim()}
              className="bg-blue-600 hover:bg-blue-700 text-white"
            >
              确认添加
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* 删除确认对话框 */}
      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent className="bg-gray-800 text-gray-100 border border-gray-700">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-gray-100">确认删除子管理员</AlertDialogTitle>
            <AlertDialogDescription className="text-gray-400">
              {adminToDelete && `您确定要删除子管理员"${adminToDelete.name}"吗？此操作无法撤销。`}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="bg-transparent border-gray-600 text-gray-300 hover:bg-gray-700 hover:text-gray-100">
              取消
            </AlertDialogCancel>
            <AlertDialogAction onClick={handleDeleteAdmin} className="bg-red-600 hover:bg-red-700 text-white">
              确认删除
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}
