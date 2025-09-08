import "./globals.css"
import { Inter } from "next/font/google"
import { ThemeProvider } from "@/components/theme-provider"

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "SkyTalent - 低空经济人才培养平台",
  description: "专业的低空经济人才培养平台，提供无人机驾驶、低空飞行等相关课程与认证",
    generator: 'v0.app'
}

export default function RootLayout({ children }) {
  return (
    <html lang="zh-CN">
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false} storageKey="skytalent-theme">
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
