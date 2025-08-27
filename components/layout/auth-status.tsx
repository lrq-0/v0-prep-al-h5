"use client"

import { useState, useEffect } from "react"
import { usePathname, useRouter } from "next/navigation"

export default function AuthStatus({ children }) {
  const router = useRouter()
  const pathname = usePathname()
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Check if we're on a page that doesn't require auth
    const publicPages = ["/auth/login", "/auth/register", "/auth/register-success", "/auth/forgot-password"]
    const isPublicPage = publicPages.includes(pathname)

    // Check if user is logged in
    const userRole = localStorage.getItem("userRole")

    if (!userRole && !isPublicPage) {
      // Redirect to login if not logged in and not on a public page
      router.push("/auth/login")
    } else {
      setIsLoading(false)
    }
  }, [pathname, router])

  if (isLoading) {
    return <div className="min-h-screen bg-background flex items-center justify-center">Loading...</div>
  }

  return children
}
