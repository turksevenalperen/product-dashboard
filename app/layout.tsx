import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { ProductProvider } from "@/context/ProductContext";


const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Product Management Dashboard",
  description: "A responsive product management dashboard built with Next.js and Tailwind CSS",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
           <ProductProvider>
             {children}
           </ProductProvider>
         
        </ThemeProvider>
      </body>
    </html>
  )
}
