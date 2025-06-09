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
  TrendingUp,
  Package,
  ShoppingCart,
} from "lucide-react"
import { useMediaQuery } from "@/hooks/use-media-query"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { ProductsTable } from "@/components/products-table"
import { StatCard } from "@/components/stat-card"
import { ThemeToggle } from "@/components/theme-toggle"
import { AnalyticsDashboard } from "@/components/analytics-dashboard"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export function ProductDashboard() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const [activeTab, setActiveTab] = useState("dashboard")
  const isDesktop = useMediaQuery("(min-width: 1024px)")

  return (
    <div className="flex min-h-screen bg-background">
      {/* Sidebar for desktop */}
      {isDesktop ? (
        <div className="hidden lg:flex w-64 flex-col border-r">
          <Sidebar activeTab={activeTab} onTabChange={setActiveTab} />
        </div>
      ) : (
        <Sheet open={isSidebarOpen} onOpenChange={setIsSidebarOpen}>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="lg:hidden absolute top-4 left-4 z-10">
              <Menu />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="p-0 w-64">
            <Sidebar activeTab={activeTab} onTabChange={setActiveTab} />
          </SheetContent>
        </Sheet>
      )}

      {/* Main content */}
      <div className="flex-1 flex flex-col">
        <Header />
        <main className="flex-1 p-4 md:p-6">
          <div className="max-w-7xl mx-auto">
            {activeTab === "dashboard" && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
                  <StatCard title="Aktif Ürünler\" value="247,384\" change="+15%\" trend="up\" className="lg:col-span-1" />
                  <StatCard title="Yeni Ürünler\" value="+2,368\" change="+24%\" trend="up\" className="lg:col-span-1" />
                  <StatCard title="Tamamlanan Sipariş\" value="33,847\" change="-4%\" trend="down\" className="lg:col-span-1" />
                  <StatCard title="Bekleyen Ödeme\" value="1,284\" change="+9%\" trend="up\" className="lg:col-span-1" />
                  <StatCard title="İptal Edilen Sipariş\" value="836\" change="-2%\" trend="down\" className="lg:col-span-1" />
                </div>
                <AnalyticsDashboard />
              </div>
            )}
            
            {activeTab === "products" && (
              <Card>
                <CardContent className="p-0">
                  <ProductsTable />
                </CardContent>
              </Card>
            )}

            {activeTab === "analytics" && (
              <AnalyticsDashboard />
            )}

            {activeTab === "settings" && (
              <Card>
                <CardContent className="p-6">
                  <h2 className="text-2xl font-bold mb-4">Ayarlar</h2>
                  <p className="text-muted-foreground">Sistem ayarları burada görüntülenecek.</p>
                </CardContent>
              </Card>
            )}
          </div>
        </main>
      </div>
    </div>
  )
}

function Sidebar({ activeTab, onTabChange }: { activeTab: string; onTabChange: (tab: string) => void }) {
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
          <Input type="search" placeholder="Ara..." className="pl-8" />
        </div>
      </div>

      <div className="px-2 py-2">
        <p className="px-2 text-xs font-medium text-muted-foreground mb-2">ANA MENÜ</p>
        <nav className="space-y-1">
          <SidebarItem 
            icon={LayoutGrid} 
            label="Dashboard" 
            active={activeTab === "dashboard"}
            onClick={() => onTabChange("dashboard")}
          />
          <SidebarItem 
            icon={Box} 
            label="Ürünler" 
            active={activeTab === "products"}
            onClick={() => onTabChange("products")}
          />
          <SidebarItem icon={Box} label="Tüm Ürünler" indent />
          <SidebarItem icon={Plus} label="Yeni Ürün Ekle" indent />
          <SidebarItem icon={Tag} label="Etiketler" indent />
          <SidebarItem icon={LayoutGrid} label="Kategoriler" indent />
          <SidebarItem icon={LayoutGrid} label="Alt Kategori" indent />
          <SidebarItem icon={Users} label="Markalar" indent />
          <SidebarItem icon={BarChart3} label="Barkod Tara" indent />
          <SidebarItem icon={Box} label="Ürün İçe Aktar" indent />
        </nav>
      </div>

      <div className="px-2 py-2">
        <p className="px-2 text-xs font-medium text-muted-foreground mb-2">ANALİTİK</p>
        <nav className="space-y-1">
          <SidebarItem 
            icon={BarChart3} 
            label="Satışlar" 
            badge="42" 
            active={activeTab === "analytics"}
            onClick={() => onTabChange("analytics")}
          />
          <SidebarItem icon={ShoppingCart} label="Satış Noktası" />
          <SidebarItem icon={TrendingUp} label="Liderlik Tablosu" />
          <SidebarItem icon={Package} label="Siparişler" />
          <SidebarItem icon={BarChart3} label="İadeler" />
          <SidebarItem icon={BarChart3} label="Vergiler" />
          <SidebarItem icon={Box} label="Stok" />
        </nav>
      </div>

      <div className="px-2 py-2">
        <p className="px-2 text-xs font-medium text-muted-foreground mb-2">UYGULAMALAR</p>
        <nav className="space-y-1">
          <SidebarItem icon={MessageSquare} label="Sohbet" badge="80" />
          <SidebarItem icon={LayoutGrid} label="Takvim" />
          <SidebarItem icon={Mail} label="E-posta" />
        </nav>
      </div>

      <div className="px-2 py-2">
        <p className="px-2 text-xs font-medium text-muted-foreground mb-2">AYARLAR</p>
        <nav className="space-y-1">
          <SidebarItem 
            icon={Settings} 
            label="Ayarlar" 
            active={activeTab === "settings"}
            onClick={() => onTabChange("settings")}
          />
          <SidebarItem icon={LogOut} label="Çıkış Yap" />
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
  onClick,
}: {
  icon: any
  label: string
  active?: boolean
  indent?: boolean
  badge?: string
  onClick?: () => void
}) {
  return (
    <div
      className={`
        flex items-center px-2 py-1.5 rounded-md text-sm cursor-pointer transition-colors
        ${active ? "bg-primary/10 text-primary font-medium" : "text-muted-foreground hover:bg-muted hover:text-foreground"}
        ${indent ? "ml-4" : ""}
      `}
      onClick={onClick}
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
                  <AvatarImage src="/placeholder-user.jpg" alt="Alperen Türkseven" />
                  <AvatarFallback>AT</AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <div className="flex items-center justify-start gap-2 p-2">
                <div className="flex flex-col space-y-1 leading-none">
                  <p className="font-medium">Alperen Türkseven</p>
                  <p className="text-xs text-muted-foreground">Admin</p>
                </div>
              </div>
              <DropdownMenuItem>Profil</DropdownMenuItem>
              <DropdownMenuItem>Ayarlar</DropdownMenuItem>
              <DropdownMenuItem>Çıkış Yap</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  )
}