"use client"

import { useState } from "react"
import {
  BarChart3,
  Box,
  Globe,
  LayoutGrid,
  LogOut,
  Mail,
  Menu,
  MessageSquare,
  Plus,
  Search,
  Settings,
  Tag,
  Users,
} from "lucide-react"
import { useMediaQuery } from "@/hooks/use-media-query"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { ProductsTable } from "@/components/products-table"
import { StatCard } from "@/components/stat-card"
import { ThemeToggle } from "@/components/theme-toggle"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

export function ProductDashboard() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const isDesktop = useMediaQuery("(min-width: 1024px)")

  return (
    <div className="flex min-h-screen bg-background">
      {/* Sidebar for desktop */}
      {isDesktop ? (
        <div className="hidden lg:flex w-64 flex-col border-r">
          <Sidebar />
        </div>
      ) : (
        <Sheet open={isSidebarOpen} onOpenChange={setIsSidebarOpen}>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="lg:hidden absolute top-4 left-4 z-10">
              <Menu />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="p-0 w-64">
            <Sidebar />
          </SheetContent>
        </Sheet>
      )}

      {/* Main content */}
      <div className="flex-1 flex flex-col">
        <Header />
        <main className="flex-1 p-4 md:p-6">
          <div className="max-w-7xl mx-auto space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
              <StatCard title="Active Products" value="247,384" change="+15%" trend="up" className="lg:col-span-1" />
              <StatCard title="New Products" value="+2,368" change="+24%" trend="up" className="lg:col-span-1" />
              <StatCard title="Completed Order" value="33,847" change="-4%" trend="down" className="lg:col-span-1" />
              <StatCard title="Pending Payment" value="1,284" change="+9%" trend="up" className="lg:col-span-1" />
              <StatCard title="Canceled Order" value="836" change="-2%" trend="down" className="lg:col-span-1" />
            </div>

            <Card>
              <CardContent className="p-0">
                <div className="p-4 flex items-center justify-between">
                  <h2 className="text-lg font-medium">All Products</h2>
                  <div className="flex items-center gap-2">
                    <div className="relative hidden md:block">
                      <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                      <Input type="search" placeholder="Search item..." className="w-[200px] pl-8" />
                    </div>
                    <Button className="gap-1" size="sm">
                      <Plus className="h-4 w-4" />
                      Add New Product
                    </Button>
                  </div>
                </div>
                <ProductsTable />
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </div>
  )
}

function Sidebar() {
  return (
    <>
      <div className="p-4 flex items-center gap-2">
        <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary">
          <Box className="h-4 w-4 text-primary-foreground" />
        </div>
        <span className="font-semibold">master POS</span>
      </div>

      <div className="px-4 py-2">
        <div className="relative">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input type="search" placeholder="Search here" className="pl-8" />
        </div>
      </div>

      <div className="px-2 py-2">
        <p className="px-2 text-xs font-medium text-muted-foreground mb-2">MAIN MENU</p>
        <nav className="space-y-1">
          <SidebarItem icon={LayoutGrid} label="Dashboard" />
          <SidebarItem icon={Box} label="Products" active />
          <SidebarItem icon={Box} label="All Products" indent />
          <SidebarItem icon={Plus} label="Add New Product" indent />
          <SidebarItem icon={Tag} label="Tags" indent />
          <SidebarItem icon={LayoutGrid} label="Categories" indent />
          <SidebarItem icon={LayoutGrid} label="Sub Category" indent />
          <SidebarItem icon={Users} label="Brands" indent />
          <SidebarItem icon={BarChart3} label="Scan Barcode" indent />
          <SidebarItem icon={Box} label="Import Products" indent />
        </nav>
      </div>

      <div className="px-2 py-2">
        <p className="px-2 text-xs font-medium text-muted-foreground mb-2">ANALYTICS</p>
        <nav className="space-y-1">
          <SidebarItem icon={BarChart3} label="Sales" badge="42" />
          <SidebarItem icon={BarChart3} label="Point of Sales" />
          <SidebarItem icon={BarChart3} label="Leaderboards" />
          <SidebarItem icon={BarChart3} label="Orders" />
          <SidebarItem icon={BarChart3} label="Refund" />
          <SidebarItem icon={BarChart3} label="Taxes" />
          <SidebarItem icon={Box} label="Stock" />
        </nav>
      </div>

      <div className="px-2 py-2">
        <p className="px-2 text-xs font-medium text-muted-foreground mb-2">APPS</p>
        <nav className="space-y-1">
          <SidebarItem icon={MessageSquare} label="Chat" badge="80" />
          <SidebarItem icon={LayoutGrid} label="Calendar" />
          <SidebarItem icon={Mail} label="Email" />
        </nav>
      </div>

      <div className="px-2 py-2">
        <p className="px-2 text-xs font-medium text-muted-foreground mb-2">SETTINGS</p>
        <nav className="space-y-1">
          <SidebarItem icon={Settings} label="Settings" />
          <SidebarItem icon={LogOut} label="Log Out" />
        </nav>
      </div>
    </>
  )
}

function SidebarItem({
  icon: Icon,
  label,
  active = false,
  indent = false,
  badge,
}: {
  icon: any
  label: string
  active?: boolean
  indent?: boolean
  badge?: string
}) {
  return (
    <div
      className={`
        flex items-center px-2 py-1.5 rounded-md text-sm
        ${active ? "bg-primary/10 text-primary font-medium" : "text-muted-foreground hover:bg-muted"}
        ${indent ? "ml-4" : ""}
      `}
    >
      <Icon className="h-4 w-4 mr-2" />
      <span>{label}</span>
      {badge && (
        <div className="ml-auto bg-primary/20 text-primary text-xs font-medium rounded-full w-5 h-5 flex items-center justify-center">
          {badge}
        </div>
      )}
    </div>
  )
}

function Header() {
  return (
    <header className="border-b">
      <div className="flex h-16 items-center px-4 md:px-6">
        <div className="ml-auto flex items-center gap-4">
          <ThemeToggle />
          <Globe className="h-5 w-5 text-muted-foreground" />
          <div className="relative">
            <Mail className="h-5 w-5 text-muted-foreground" />
            <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[10px] font-medium text-primary-foreground">
              12
            </span>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                <Avatar className="h-8 w-8">
                  <AvatarImage src="/placeholder-user.jpg" alt="Patricia Peter" />
                  <AvatarFallback>PP</AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <div className="flex items-center justify-start gap-2 p-2">
                <div className="flex flex-col space-y-1 leading-none">
                  <p className="font-medium">Patricia Peter</p>
                  <p className="text-xs text-muted-foreground">Super Admin</p>
                </div>
              </div>
              <DropdownMenuItem>Profile</DropdownMenuItem>
              <DropdownMenuItem>Settings</DropdownMenuItem>
              <DropdownMenuItem>Log out</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  )
}
