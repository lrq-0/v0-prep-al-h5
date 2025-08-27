"use client"

import type React from "react"

import { useState, useRef } from "react"
import Link from "next/link"
import {
  ArrowLeft,
  Upload,
  Search,
  Check,
  AlertCircle,
  UserCheck,
  FileSpreadsheet,
  UserPlus,
  BookOpen,
} from "lucide-react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Alert, AlertDescription } from "@/components/ui/alert"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

// 模拟数据
const mockProducts = {
  membership: [
    { id: 1, name: "标准月卡", price: 39.9, validPeriod: "30天", features: ["AI问答不限次", "全部课程"] },
    { id: 2, name: "高级年卡", price: 299, validPeriod: "365天", features: ["AI问答不限次", "全部课程", "全部考试"] },
    { id: 3, name: "次卡(100次)", price: 99, validPeriod: "不限", features: ["AI问答100次", "基础课程"] },
    { id: 4, name: "终身会员", price: 1299, validPeriod: "永久", features: ["AI问答不限次", "全部内容", "优先服务"] },
  ],
  courses: [
    { id: 1, name: "AI提示词工程师", price: 199, type: "录播课", lessons: 12 },
    { id: 2, name: "Python数据分析", price: 299, type: "录播课", lessons: 24 },
    { id: 3, name: "Web前端开发", price: 399, type: "直播课", lessons: 16 },
    { id: 4, name: "产品经理实战", price: 499, type: "直播课", lessons: 20 },
  ],
  exams: [
    { id: 1, name: "AI提示词工程师证书考试", price: 399, level: "高级", questions: 100 },
    { id: 2, name: "Python数据分析证书考试", price: 299, level: "中级", questions: 80 },
    { id: 3, name: "前端开发工程师证书考试", price: 399, level: "高级", questions: 100 },
    { id: 4, name: "产品经理证书考试", price: 299, level: "初级", questions: 60 },
  ],
  agents: [
    { id: 1, name: "初级代理", price: 1999, level: "初级", commission: "15%" },
    { id: 2, name: "中级代理", price: 5999, level: "中级", commission: "25%" },
    { id: 3, name: "高级代理", price: 9999, level: "高级", commission: "35%" },
    { id: 4, name: "钻石代理", price: 19999, level: "钻石", commission: "45%" },
  ],
}

export default function UpgradesPage() {
  // 状态管理
  const [userInput, setUserInput] = useState("")
  const [searchResults, setSearchResults] = useState<any[]>([])
  const [selectedUsers, setSelectedUsers] = useState<any[]>([])
  const [productType, setProductType] = useState("membership")
  const [selectedProduct, setSelectedProduct] = useState<any>(null)
  const [isSearching, setIsSearching] = useState(false)
  const [hasSearched, setHasSearched] = useState(false)
  const [showConfirmDialog, setShowConfirmDialog] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  // 处理上传Excel文件
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const fileName = e.target.files[0].name
      // 在实际应用中，这里应该解析Excel文件内容
      // 为演示目的，我们只显示文件已上传
      setUserInput(`已导入文件: ${fileName}`)
    }
  }

  // 触发文件选择对话框
  const triggerFileInput = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click()
    }
  }

  // 查询用户
  const searchUsers = () => {
    setIsSearching(true)
    setHasSearched(true)

    // 模拟API请求延迟
    setTimeout(() => {
      // 解析用户输入的ID或手机号
      const inputs = userInput
        .replace(/，/g, ",") // 替换中文逗号为英文逗号
        .split(/[,\n]/) // 按逗号或换行分割
        .map((item) => item.trim())
        .filter((item) => item.length > 0)

      // 模拟查询结果
      const results = inputs.map((input) => {
        const isRegistered = Math.random() > 0.3 // 随机决定是否已注册
        return {
          id: isRegistered ? Math.floor(Math.random() * 10000) : null,
          mobile: input.length === 11 ? input : null,
          username: isRegistered ? `用户${Math.floor(Math.random() * 10000)}` : null,
          registered: isRegistered,
          registerTime: isRegistered
            ? new Date(Date.now() - Math.random() * 90 * 24 * 60 * 60 * 1000).toISOString()
            : null,
        }
      })

      setSearchResults(results)
      // 初始选择所有已注册用户
      setSelectedUsers(results.filter((user) => user.registered))
      setIsSearching(false)
    }, 1000)
  }

  // 选择/取消选择单个用户
  const toggleUserSelection = (user: any) => {
    if (!user.registered) return // 未注册用户不能选择

    if (selectedUsers.some((selectedUser) => selectedUser.id === user.id)) {
      setSelectedUsers(selectedUsers.filter((selectedUser) => selectedUser.id !== user.id))
    } else {
      setSelectedUsers([...selectedUsers, user])
    }
  }

  // 选择/取消选择所有已注册用户
  const toggleAllUsers = () => {
    if (selectedUsers.length === searchResults.filter((user) => user.registered).length) {
      setSelectedUsers([])
    } else {
      setSelectedUsers(searchResults.filter((user) => user.registered))
    }
  }

  // 选择产品
  const selectProduct = (product: any) => {
    setSelectedProduct(product)
  }

  // 确认升级
  const confirmUpgrade = () => {
    if (selectedUsers.length === 0 || !selectedProduct) return
    setShowConfirmDialog(true)
  }

  // 提交升级
  const submitUpgrade = () => {
    setIsSubmitting(true)

    // 模拟API请求
    setTimeout(() => {
      setIsSubmitting(false)
      setShowConfirmDialog(false)
      setShowSuccess(true)

      // 3秒后隐藏成功提示
      setTimeout(() => {
        setShowSuccess(false)
        // 重置状态
        setSelectedProduct(null)
        setSelectedUsers([])
        setSearchResults([])
        setUserInput("")
        setHasSearched(false)
      }, 3000)
    }, 1500)
  }

  return (
    <div className="min-h-screen bg-black text-white pb-24">
      {/* 顶部导航栏 */}
      <div className="sticky top-0 left-0 right-0 h-14 flex items-center px-4 bg-gray-900/80 backdrop-blur-md border-b border-gray-800 z-10">
        <Link href="/management" className="flex items-center text-gray-300">
          <ArrowLeft className="h-5 w-5 mr-2" />
          <span>返回</span>
        </Link>
        <h1 className="flex-1 text-center text-lg font-semibold text-white">指定升级</h1>
      </div>

      {/* 成功提示 */}
      {showSuccess && (
        <div className="fixed top-16 left-4 right-4 z-50">
          <Alert className="bg-green-900/60 border-green-500 backdrop-blur-sm">
            <Check className="h-4 w-4 text-green-400 mr-2" />
            <AlertDescription className="text-green-400">
              已成功为{selectedUsers.length}位用户开通{selectedProduct.name}
            </AlertDescription>
          </Alert>
        </div>
      )}

      <div className="p-4">
        {/* 用户输入区域 */}
        <Card className="p-4 bg-gray-900 border-gray-800 mb-6">
          <h2 className="text-lg font-semibold text-white mb-4">步骤一：输入用户信息</h2>
          <div className="space-y-4">
            <div>
              <Label htmlFor="user-input" className="text-white mb-2 block">
                会员ID或手机号（多个账号可用逗号或换行隔开）
              </Label>
              <Textarea
                id="user-input"
                value={userInput}
                onChange={(e) => setUserInput(e.target.value)}
                placeholder="例如: 13800138000, 13900139000, 12345"
                className="bg-gray-800 border-gray-700 text-white min-h-[120px]"
              />
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <Button variant="outline" className="flex-1" onClick={triggerFileInput}>
                <Upload className="h-4 w-4 mr-2" />
                导入Excel表格
              </Button>
              <input
                type="file"
                ref={fileInputRef}
                className="hidden"
                accept=".xlsx,.xls"
                onChange={handleFileUpload}
              />
              <Button
                className="flex-1 bg-blue-600 hover:bg-blue-500"
                onClick={searchUsers}
                disabled={isSearching || userInput.trim() === ""}
              >
                {isSearching ? (
                  <span className="flex items-center">
                    <div className="animate-spin mr-2 h-4 w-4 border-2 border-white border-t-transparent rounded-full" />
                    查询中...
                  </span>
                ) : (
                  <span className="flex items-center">
                    <Search className="h-4 w-4 mr-2" />
                    查询用户
                  </span>
                )}
              </Button>
            </div>
          </div>
        </Card>

        {/* 查询结果 */}
        <Card className="p-4 bg-gray-900 border-gray-800 mb-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold text-white">步骤二：选择用户</h2>
            <div className="flex items-center">
              <span className="text-sm text-gray-400 mr-2">已选择：{selectedUsers.length}个用户</span>
              <Button
                variant="outline"
                size="sm"
                onClick={toggleAllUsers}
                disabled={!hasSearched || searchResults.filter((user) => user.registered).length === 0}
              >
                {selectedUsers.length === searchResults.filter((user) => user.registered).length ? "取消全选" : "全选"}
              </Button>
            </div>
          </div>

          {!hasSearched ? (
            <div className="text-center p-6 text-gray-500">请先在上方输入用户信息并点击查询</div>
          ) : searchResults.length > 0 ? (
            <div className="border border-gray-800 rounded-lg overflow-hidden mb-3">
              <Table>
                <TableHeader className="bg-gray-800">
                  <TableRow>
                    <TableHead className="text-gray-300 w-[50px]">选择</TableHead>
                    <TableHead className="text-gray-300">用户信息</TableHead>
                    <TableHead className="text-gray-300">注册状态</TableHead>
                    <TableHead className="text-gray-300 hidden sm:table-cell">注册时间</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {searchResults.map((user, index) => (
                    <TableRow key={index} className={`${user.registered ? "hover:bg-gray-800" : "bg-red-900/20"}`}>
                      <TableCell>
                        {user.registered ? (
                          <Button
                            variant="ghost"
                            size="icon"
                            className={`h-8 w-8 ${
                              selectedUsers.some((selectedUser) => selectedUser.id === user.id)
                                ? "text-blue-400 bg-blue-900/20"
                                : "text-gray-400"
                            }`}
                            onClick={() => toggleUserSelection(user)}
                          >
                            {selectedUsers.some((selectedUser) => selectedUser.id === user.id) ? (
                              <Check className="h-4 w-4" />
                            ) : (
                              <div className="h-4 w-4 rounded-sm border border-current" />
                            )}
                          </Button>
                        ) : (
                          <AlertCircle className="h-4 w-4 text-red-400" />
                        )}
                      </TableCell>
                      <TableCell>
                        <div className="flex flex-col">
                          {user.registered ? (
                            <>
                              <span className="font-medium text-white">{user.username}</span>
                              <span className="text-sm text-gray-400">{user.mobile || `ID: ${user.id}`}</span>
                            </>
                          ) : (
                            <span className="text-red-400">{user.mobile || "未知账号"}</span>
                          )}
                        </div>
                      </TableCell>
                      <TableCell>
                        {user.registered ? (
                          <Badge variant="outline" className="bg-green-900/30 text-green-400 border-green-500/30">
                            已注册
                          </Badge>
                        ) : (
                          <Badge variant="outline" className="bg-red-900/30 text-red-400 border-red-500/30">
                            未注册
                          </Badge>
                        )}
                      </TableCell>
                      <TableCell className="hidden sm:table-cell">
                        {user.registered ? (
                          <span className="text-gray-400">{new Date(user.registerTime).toLocaleDateString()}</span>
                        ) : (
                          <span className="text-red-400">-</span>
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          ) : (
            <div className="text-center p-6 text-gray-500">没有查询到任何用户</div>
          )}

          {/* 未注册用户提示 */}
          {hasSearched && searchResults.some((user) => !user.registered) && (
            <Alert className="bg-red-900/20 border-red-500/30">
              <AlertCircle className="h-4 w-4 text-red-400 mr-2" />
              <AlertDescription className="text-red-400">红色标记的手机号未注册，无法为其开通产品</AlertDescription>
            </Alert>
          )}
        </Card>

        {/* 产品选择 */}
        <Card className="p-4 bg-gray-900 border-gray-800 mb-6">
          <h2 className="text-lg font-semibold text-white mb-4">步骤三：选择产品</h2>

          <Tabs defaultValue="membership" value={productType} onValueChange={setProductType}>
            <TabsList className="grid grid-cols-4 bg-gray-800 mb-4">
              <TabsTrigger value="membership" className="data-[state=active]:text-blue-400">
                会员产品
              </TabsTrigger>
              <TabsTrigger value="courses" className="data-[state=active]:text-green-400">
                课程产品
              </TabsTrigger>
              <TabsTrigger value="exams" className="data-[state=active]:text-yellow-400">
                考试产品
              </TabsTrigger>
              <TabsTrigger value="agents" className="data-[state=active]:text-purple-400">
                代理商产品
              </TabsTrigger>
            </TabsList>

            {/* 会员产品列表 */}
            <TabsContent value="membership" className="mt-0">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {mockProducts.membership.map((product) => (
                  <div
                    key={product.id}
                    className={`border rounded-lg p-3 cursor-pointer transition-colors ${
                      selectedProduct && selectedProduct.id === product.id && productType === "membership"
                        ? "bg-blue-900/20 border-blue-500"
                        : "bg-gray-800 border-gray-700 hover:border-gray-600"
                    }`}
                    onClick={() => selectProduct({ ...product, type: "membership" })}
                  >
                    <div className="flex justify-between items-center mb-2">
                      <h3 className="font-medium text-white">{product.name}</h3>
                      <Badge variant="outline" className="bg-blue-900/30 text-blue-400 border-blue-500/30">
                        ¥{product.price}
                      </Badge>
                    </div>
                    <div className="text-sm text-gray-400 mb-2">有效期: {product.validPeriod}</div>
                    <div className="flex flex-wrap gap-2">
                      {product.features.map((feature, index) => (
                        <Badge key={index} variant="secondary" className="bg-gray-700 text-gray-300">
                          {feature}
                        </Badge>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>

            {/* 课程产品列表 */}
            <TabsContent value="courses" className="mt-0">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {mockProducts.courses.map((product) => (
                  <div
                    key={product.id}
                    className={`border rounded-lg p-3 cursor-pointer transition-colors ${
                      selectedProduct && selectedProduct.id === product.id && productType === "courses"
                        ? "bg-green-900/20 border-green-500"
                        : "bg-gray-800 border-gray-700 hover:border-gray-600"
                    }`}
                    onClick={() => selectProduct({ ...product, type: "courses" })}
                  >
                    <div className="flex justify-between items-center mb-2">
                      <h3 className="font-medium text-white">{product.name}</h3>
                      <Badge variant="outline" className="bg-green-900/30 text-green-400 border-green-500/30">
                        ¥{product.price}
                      </Badge>
                    </div>
                    <div className="text-sm text-gray-400 mb-2">
                      {product.type} · {product.lessons}课时
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>

            {/* 考试产品列表 */}
            <TabsContent value="exams" className="mt-0">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {mockProducts.exams.map((product) => (
                  <div
                    key={product.id}
                    className={`border rounded-lg p-3 cursor-pointer transition-colors ${
                      selectedProduct && selectedProduct.id === product.id && productType === "exams"
                        ? "bg-yellow-900/20 border-yellow-500"
                        : "bg-gray-800 border-gray-700 hover:border-gray-600"
                    }`}
                    onClick={() => selectProduct({ ...product, type: "exams" })}
                  >
                    <div className="flex justify-between items-center mb-2">
                      <h3 className="font-medium text-white">{product.name}</h3>
                      <Badge variant="outline" className="bg-yellow-900/30 text-yellow-400 border-yellow-500/30">
                        ¥{product.price}
                      </Badge>
                    </div>
                    <div className="text-sm text-gray-400 mb-2">
                      {product.level}级 · {product.questions}题
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>

            {/* 代理商产品列表 */}
            <TabsContent value="agents" className="mt-0">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {mockProducts.agents.map((product) => (
                  <div
                    key={product.id}
                    className={`border rounded-lg p-3 cursor-pointer transition-colors ${
                      selectedProduct && selectedProduct.id === product.id && productType === "agents"
                        ? "bg-purple-900/20 border-purple-500"
                        : "bg-gray-800 border-gray-700 hover:border-gray-600"
                    }`}
                    onClick={() => selectProduct({ ...product, type: "agents" })}
                  >
                    <div className="flex justify-between items-center mb-2">
                      <h3 className="font-medium text-white">{product.name}</h3>
                      <Badge variant="outline" className="bg-purple-900/30 text-purple-400 border-purple-500/30">
                        ¥{product.price}
                      </Badge>
                    </div>
                    <div className="text-sm text-gray-400 mb-2">
                      {product.level}代理 · 佣金{product.commission}
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </Card>
      </div>

      {/* 确认升级对话框 */}
      <Dialog open={showConfirmDialog} onOpenChange={setShowConfirmDialog}>
        <DialogContent className="bg-gray-900 border-gray-800 text-white sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-lg text-white">确认批量开通</DialogTitle>
            <DialogDescription className="text-gray-400">您将为以下用户开通产品服务</DialogDescription>
          </DialogHeader>

          <div className="py-3">
            <div className="mb-4 border border-gray-800 rounded-lg p-3 bg-gray-800/50">
              <h4 className="text-sm text-gray-300 mb-1">所选产品</h4>
              <div className="flex items-center">
                <div
                  className="rounded-full w-8 h-8 flex items-center justify-center mr-2"
                  style={{
                    backgroundColor:
                      selectedProduct?.type === "membership"
                        ? "rgba(37, 99, 235, 0.2)"
                        : selectedProduct?.type === "courses"
                          ? "rgba(34, 197, 94, 0.2)"
                          : selectedProduct?.type === "exams"
                            ? "rgba(234, 179, 8, 0.2)"
                            : "rgba(147, 51, 234, 0.2)",
                  }}
                >
                  {selectedProduct?.type === "membership" && <UserCheck className="h-4 w-4 text-blue-400" />}
                  {selectedProduct?.type === "courses" && <BookOpen className="h-4 w-4 text-green-400" />}
                  {selectedProduct?.type === "exams" && <FileSpreadsheet className="h-4 w-4 text-yellow-400" />}
                  {selectedProduct?.type === "agents" && <UserPlus className="h-4 w-4 text-purple-400" />}
                </div>
                <div className="flex-1">
                  <div className="font-medium text-white">{selectedProduct?.name}</div>
                  <div className="text-sm text-gray-400">¥{selectedProduct?.price}</div>
                </div>
              </div>
            </div>

            <div className="border border-gray-800 rounded-lg p-3 bg-gray-800/50">
              <h4 className="text-sm text-gray-300 mb-2">所选用户 ({selectedUsers.length})</h4>
              {selectedUsers.length > 0 && (
                <div className="max-h-32 overflow-y-auto space-y-2 pr-2">
                  {selectedUsers.slice(0, 5).map((user, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <div className="flex-1 truncate">
                        <span className="text-white">{user.username}</span>
                        <span className="text-gray-400 ml-2">{user.mobile || `ID: ${user.id}`}</span>
                      </div>
                    </div>
                  ))}
                  {selectedUsers.length > 5 && (
                    <div className="text-center text-gray-400 text-sm">等{selectedUsers.length}个用户</div>
                  )}
                </div>
              )}
            </div>
          </div>

          <DialogFooter className="flex sm:justify-between">
            <Button
              type="button"
              variant="outline"
              onClick={() => setShowConfirmDialog(false)}
              className="mr-2 border-gray-700"
            >
              取消
            </Button>
            <Button
              type="button"
              onClick={submitUpgrade}
              disabled={isSubmitting}
              className="bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400"
            >
              {isSubmitting ? (
                <span className="flex items-center">
                  <div className="animate-spin mr-2 h-4 w-4 border-2 border-white border-t-transparent rounded-full" />
                  开通中...
                </span>
              ) : (
                <span className="flex items-center">
                  <Check className="h-4 w-4 mr-2" />
                  确认批量开通
                </span>
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* 底部确认按钮 */}
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-gray-900/95 backdrop-blur-md border-t border-gray-800">
        <Button
          className="w-full bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400"
          disabled={selectedUsers.length === 0 || !selectedProduct}
          onClick={confirmUpgrade}
        >
          {selectedProduct ? (
            <span className="flex items-center">
              <Check className="h-4 w-4 mr-2" />为{selectedUsers.length}位用户开通{selectedProduct.name}
            </span>
          ) : (
            <span>请选择用户和产品</span>
          )}
        </Button>
      </div>
    </div>
  )
}
