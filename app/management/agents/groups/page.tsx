"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { PlusCircle, Edit, Trash2, Search } from "lucide-react"

export default function AgentGroupManagement() {
  const [searchTerm, setSearchTerm] = useState("")
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [selectedGroup, setSelectedGroup] = useState<any>(null)
  const [newGroupName, setNewGroupName] = useState("")
  const [newGroupDescription, setNewGroupDescription] = useState("")

  // Mock data for agent groups
  const [agentGroups, setAgentGroups] = useState([
    {
      id: 1,
      name: "VIP代理组",
      description: "高级代理商，享受最高佣金比例",
      agentCount: 15,
      createdAt: "2023-05-10",
    },
    {
      id: 2,
      name: "标准代理组",
      description: "标准代理商，享受基础佣金比例",
      agentCount: 42,
      createdAt: "2023-06-15",
    },
    {
      id: 3,
      name: "新手代理组",
      description: "新注册的代理商，试用期内",
      agentCount: 28,
      createdAt: "2023-07-20",
    },
    {
      id: 4,
      name: "企业代理组",
      description: "企业级代理商，专享企业服务",
      agentCount: 7,
      createdAt: "2023-08-05",
    },
    {
      id: 5,
      name: "教育机构代理组",
      description: "教育机构代理商，专注教育市场",
      agentCount: 12,
      createdAt: "2023-09-10",
    },
  ])

  const filteredGroups = agentGroups.filter((group) => group.name.toLowerCase().includes(searchTerm.toLowerCase()))

  const handleAddGroup = () => {
    const newGroup = {
      id: agentGroups.length + 1,
      name: newGroupName,
      description: newGroupDescription,
      agentCount: 0,
      createdAt: new Date().toISOString().split("T")[0],
    }
    setAgentGroups([...agentGroups, newGroup])
    setNewGroupName("")
    setNewGroupDescription("")
    setIsAddDialogOpen(false)
  }

  const handleEditGroup = () => {
    if (!selectedGroup) return
    const updatedGroups = agentGroups.map((group) =>
      group.id === selectedGroup.id
        ? {
            ...group,
            name: newGroupName,
            description: newGroupDescription,
          }
        : group,
    )
    setAgentGroups(updatedGroups)
    setIsEditDialogOpen(false)
  }

  const handleDeleteGroup = () => {
    if (!selectedGroup) return
    const updatedGroups = agentGroups.filter((group) => group.id !== selectedGroup.id)
    setAgentGroups(updatedGroups)
    setIsDeleteDialogOpen(false)
  }

  const openEditDialog = (group: any) => {
    setSelectedGroup(group)
    setNewGroupName(group.name)
    setNewGroupDescription(group.description)
    setIsEditDialogOpen(true)
  }

  const openDeleteDialog = (group: any) => {
    setSelectedGroup(group)
    setIsDeleteDialogOpen(true)
  }

  return (
    <div className="bg-gray-900 text-white min-h-screen p-6">
      <h1 className="text-2xl font-bold mb-6">代理商分组管理</h1>

      <div className="flex justify-between items-center mb-6">
        <div className="relative w-64">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-400" />
          <Input
            type="text"
            placeholder="搜索代理组..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-8 bg-gray-800 border-gray-700 text-white placeholder:text-gray-400 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-blue-600 hover:bg-blue-700">
              <PlusCircle className="h-4 w-4 mr-2" />
              添加代理组
            </Button>
          </DialogTrigger>
          <DialogContent className="bg-gray-800 text-white border-gray-700">
            <DialogHeader>
              <DialogTitle>添加新代理组</DialogTitle>
              <DialogDescription className="text-gray-400">
                创建一个新的代理商分组以便更好地管理代理商。
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="name" className="text-white">
                  分组名称
                </Label>
                <Input
                  id="name"
                  value={newGroupName}
                  onChange={(e) => setNewGroupName(e.target.value)}
                  className="bg-gray-700 border-gray-600 text-white"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="description" className="text-white">
                  分组描述
                </Label>
                <Input
                  id="description"
                  value={newGroupDescription}
                  onChange={(e) => setNewGroupDescription(e.target.value)}
                  className="bg-gray-700 border-gray-600 text-white"
                />
              </div>
            </div>
            <DialogFooter>
              <Button
                variant="outline"
                onClick={() => setIsAddDialogOpen(false)}
                className="bg-transparent border-gray-600 text-white hover:bg-gray-700"
              >
                取消
              </Button>
              <Button onClick={handleAddGroup} className="bg-blue-600 hover:bg-blue-700">
                添加
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <div className="bg-gray-800 rounded-lg overflow-hidden shadow-xl">
        <Table>
          <TableHeader className="bg-gray-700">
            <TableRow className="border-b border-gray-600">
              <TableHead className="text-white">ID</TableHead>
              <TableHead className="text-white">分组名称</TableHead>
              <TableHead className="text-white">描述</TableHead>
              <TableHead className="text-white">代理商数量</TableHead>
              <TableHead className="text-white">创建时间</TableHead>
              <TableHead className="text-white text-right">操作</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredGroups.length > 0 ? (
              filteredGroups.map((group) => (
                <TableRow key={group.id} className="border-b border-gray-700 hover:bg-gray-700/50">
                  <TableCell className="text-gray-300">{group.id}</TableCell>
                  <TableCell className="font-medium text-white">{group.name}</TableCell>
                  <TableCell className="text-gray-300">{group.description}</TableCell>
                  <TableCell className="text-gray-300">{group.agentCount}</TableCell>
                  <TableCell className="text-gray-300">{group.createdAt}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end space-x-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => openEditDialog(group)}
                        className="text-gray-300 hover:text-white hover:bg-gray-700"
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => openDeleteDialog(group)}
                        className="text-gray-300 hover:text-white hover:bg-red-700"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={6} className="h-24 text-center text-gray-400">
                  没有找到匹配的代理组
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* Edit Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="bg-gray-800 text-white border-gray-700">
          <DialogHeader>
            <DialogTitle>编辑代理组</DialogTitle>
            <DialogDescription className="text-gray-400">修改代理商分组的信息。</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="edit-name" className="text-white">
                分组名称
              </Label>
              <Input
                id="edit-name"
                value={newGroupName}
                onChange={(e) => setNewGroupName(e.target.value)}
                className="bg-gray-700 border-gray-600 text-white"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="edit-description" className="text-white">
                分组描述
              </Label>
              <Input
                id="edit-description"
                value={newGroupDescription}
                onChange={(e) => setNewGroupDescription(e.target.value)}
                className="bg-gray-700 border-gray-600 text-white"
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsEditDialogOpen(false)}
              className="bg-transparent border-gray-600 text-white hover:bg-gray-700"
            >
              取消
            </Button>
            <Button onClick={handleEditGroup} className="bg-blue-600 hover:bg-blue-700">
              保存
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent className="bg-gray-800 text-white border-gray-700">
          <DialogHeader>
            <DialogTitle>删除代理组</DialogTitle>
            <DialogDescription className="text-gray-400">您确定要删除此代理组吗？此操作无法撤销。</DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsDeleteDialogOpen(false)}
              className="bg-transparent border-gray-600 text-white hover:bg-gray-700"
            >
              取消
            </Button>
            <Button variant="destructive" onClick={handleDeleteGroup} className="bg-red-600 hover:bg-red-700">
              删除
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
