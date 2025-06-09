"use client"

import { useState } from "react"
import { Filter, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Badge } from "@/components/ui/badge"

interface FilterState {
  category: string
  status: string
  priceRange: [number, number]
  stockRange: [number, number]
  searchTerm: string
}

interface ProductFiltersProps {
  filters: FilterState
  onFiltersChange: (filters: FilterState) => void
  onClearFilters: () => void
}

export function ProductFilters({ filters, onFiltersChange, onClearFilters }: ProductFiltersProps) {
  const [open, setOpen] = useState(false)

  const updateFilter = (key: keyof FilterState, value: any) => {
    onFiltersChange({
      ...filters,
      [key]: value
    })
  }

  const getActiveFilterCount = () => {
    let count = 0
    if (filters.category) count++
    if (filters.status) count++
    if (filters.priceRange[0] > 0 || filters.priceRange[1] < 1000) count++
    if (filters.stockRange[0] > 0 || filters.stockRange[1] < 1000) count++
    if (filters.searchTerm) count++
    return count
  }

  const activeFilterCount = getActiveFilterCount()

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="outline" size="sm" className="relative">
          <Filter className="h-4 w-4 mr-2" />
          Filtreler
          {activeFilterCount > 0 && (
            <Badge variant="destructive\" className="ml-2 h-5 w-5 p-0 text-xs">
              {activeFilterCount}
            </Badge>
          )}
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Ürün Filtreleri</SheetTitle>
          <SheetDescription>
            Ürünleri filtrelemek için aşağıdaki seçenekleri kullanın.
          </SheetDescription>
        </SheetHeader>
        
        <div className="space-y-6 mt-6">
          {/* Arama */}
          <div className="space-y-2">
            <Label>Ürün Ara</Label>
            <Input
              placeholder="Ürün adı, kodu veya barkod..."
              value={filters.searchTerm}
              onChange={(e) => updateFilter('searchTerm', e.target.value)}
            />
          </div>

          {/* Kategori */}
          <div className="space-y-2">
            <Label>Kategori</Label>
            <Select value={filters.category} onValueChange={(value) => updateFilter('category', value)}>
              <SelectTrigger>
                <SelectValue placeholder="Tüm kategoriler" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">Tüm kategoriler</SelectItem>
                <SelectItem value="electronics">Elektronik</SelectItem>
                <SelectItem value="clothing">Giyim</SelectItem>
                <SelectItem value="books">Kitap</SelectItem>
                <SelectItem value="home">Ev & Yaşam</SelectItem>
                <SelectItem value="sports">Spor</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Durum */}
          <div className="space-y-2">
            <Label>Durum</Label>
            <Select value={filters.status} onValueChange={(value) => updateFilter('status', value)}>
              <SelectTrigger>
                <SelectValue placeholder="Tüm durumlar" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">Tüm durumlar</SelectItem>
                <SelectItem value="active">Aktif</SelectItem>
                <SelectItem value="inactive">Pasif</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Fiyat Aralığı */}
          <div className="space-y-3">
            <Label>Fiyat Aralığı: ${filters.priceRange[0]} - ${filters.priceRange[1]}</Label>
            <Slider
              value={filters.priceRange}
              onValueChange={(value) => updateFilter('priceRange', value as [number, number])}
              max={1000}
              min={0}
              step={10}
              className="w-full"
            />
          </div>

          {/* Stok Aralığı */}
          <div className="space-y-3">
            <Label>Stok Aralığı: {filters.stockRange[0]} - {filters.stockRange[1]}</Label>
            <Slider
              value={filters.stockRange}
              onValueChange={(value) => updateFilter('stockRange', value as [number, number])}
              max={1000}
              min={0}
              step={5}
              className="w-full"
            />
          </div>

          {/* Aktif Filtreler */}
          {activeFilterCount > 0 && (
            <div className="space-y-2">
              <Label>Aktif Filtreler</Label>
              <div className="flex flex-wrap gap-2">
                {filters.category && (
                  <Badge variant="secondary\" className="gap-1">
                    Kategori: {filters.category}
                    <X 
                      className="h-3 w-3 cursor-pointer" 
                      onClick={() => updateFilter('category', '')}
                    />
                  </Badge>
                )}
                {filters.status && (
                  <Badge variant="secondary" className="gap-1">
                    Durum: {filters.status === 'active' ? 'Aktif' : 'Pasif'}
                    <X 
                      className="h-3 w-3 cursor-pointer" 
                      onClick={() => updateFilter('status', '')}
                    />
                  </Badge>
                )}
                {filters.searchTerm && (
                  <Badge variant="secondary" className="gap-1">
                    Arama: {filters.searchTerm}
                    <X 
                      className="h-3 w-3 cursor-pointer" 
                      onClick={() => updateFilter('searchTerm', '')}
                    />
                  </Badge>
                )}
              </div>
            </div>
          )}

          {/* Temizle Butonu */}
          {activeFilterCount > 0 && (
            <Button 
              variant="outline" 
              onClick={onClearFilters}
              className="w-full"
            >
              Tüm Filtreleri Temizle
            </Button>
          )}
        </div>
      </SheetContent>
    </Sheet>
  )
}