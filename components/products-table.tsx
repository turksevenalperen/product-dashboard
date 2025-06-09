"use client"

import { useState, useEffect, useMemo } from "react"
import {
  MoreHorizontal,
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  ArrowUpDown,
  ArrowUp,
  ArrowDown,
} from "lucide-react"
import { useMediaQuery } from "@/hooks/use-media-query"

import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { AddProductDialog } from "./add-product-dialog"
import { EditProductDialog } from "./edit-product-dialog"
import { DeleteProductDialog } from "./delete-product-dialog"
import { ProductDetailsDialog } from "./product-details-dialog"
import { BulkActions } from "./bulk-actions"
import { ProductFilters } from "./product-filters"

type Product = {
  id: number
  name: string
  price: number
  productCode: string
  barcode: string
  stock: number
  status: boolean
  category: string
  description: string
  imageUrl: string
}

type SortField = 'name' | 'price' | 'stock' | 'category'
type SortDirection = 'asc' | 'desc'

interface FilterState {
  category: string
  status: string
  priceRange: [number, number]
  stockRange: [number, number]
  searchTerm: string
}

export function ProductsTable() {
  const [selectedProducts, setSelectedProducts] = useState<number[]>([])
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage, setItemsPerPage] = useState(10)
  const [sortField, setSortField] = useState<SortField>('name')
  const [sortDirection, setSortDirection] = useState<SortDirection>('asc')
  const [filters, setFilters] = useState<FilterState>({
    category: '',
    status: '',
    priceRange: [0, 1000],
    stockRange: [0, 1000],
    searchTerm: ''
  })
  
  const isTablet = useMediaQuery("(min-width: 768px)")

  useEffect(() => {
    fetchProducts()
  }, [])

  const fetchProducts = async () => {
    setLoading(true)
    try {
      const res = await fetch("https://devcase.isiksoftyazilim.com/api/products?page=1")
      const data = await res.json()
      setProducts(data.data || [])
    } catch (error) {
      console.error("Error fetching products:", error)
    } finally {
      setLoading(false)
    }
  }

  // Filtreleme ve sıralama
  const filteredAndSortedProducts = useMemo(() => {
    let filtered = products.filter(product => {
      // Arama filtresi
      if (filters.searchTerm) {
        const searchLower = filters.searchTerm.toLowerCase()
        const matchesSearch = 
          product.name?.toLowerCase().includes(searchLower) ||
          product.productCode?.toLowerCase().includes(searchLower) ||
          product.barcode?.toLowerCase().includes(searchLower)
        if (!matchesSearch) return false
      }

      // Kategori filtresi
      if (filters.category && product.category !== filters.category) {
        return false
      }

      // Durum filtresi
      if (filters.status) {
        const isActive = filters.status === 'active'
        if (product.status !== isActive) return false
      }

      // Fiyat aralığı filtresi
      if (product.price < filters.priceRange[0] || product.price > filters.priceRange[1]) {
        return false
      }

      // Stok aralığı filtresi
      if (product.stock < filters.stockRange[0] || product.stock > filters.stockRange[1]) {
        return false
      }

      return true
    })

    // Sıralama
    filtered.sort((a, b) => {
      let aValue = a[sortField]
      let bValue = b[sortField]

      if (typeof aValue === 'string') {
        aValue = aValue.toLowerCase()
        bValue = bValue.toLowerCase()
      }

      if (aValue < bValue) return sortDirection === 'asc' ? -1 : 1
      if (aValue > bValue) return sortDirection === 'asc' ? 1 : -1
      return 0
    })

    return filtered
  }, [products, filters, sortField, sortDirection])

  // Sayfalama
  const totalPages = Math.ceil(filteredAndSortedProducts.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const paginatedProducts = filteredAndSortedProducts.slice(startIndex, startIndex + itemsPerPage)

  const toggleProduct = (id: number) => {
    setSelectedProducts((prev) =>
      prev.includes(id) ? prev.filter((pid) => pid !== id) : [...prev, id]
    )
  }

  const toggleAll = () => {
    if (selectedProducts.length === paginatedProducts.length) {
      setSelectedProducts([])
    } else {
      setSelectedProducts(paginatedProducts.map((p) => p.id))
    }
  }

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc')
    } else {
      setSortField(field)
      setSortDirection('asc')
    }
  }

  const getSortIcon = (field: SortField) => {
    if (sortField !== field) return <ArrowUpDown className="h-4 w-4" />
    return sortDirection === 'asc' ? <ArrowUp className="h-4 w-4" /> : <ArrowDown className="h-4 w-4" />
  }

  const handleBulkDelete = () => {
    setProducts(prev => prev.filter(p => !selectedProducts.includes(p.id)))
    setSelectedProducts([])
  }

  const handleBulkExport = () => {
    const selectedProductsData = products.filter(p => selectedProducts.includes(p.id))
    const csvContent = "data:text/csv;charset=utf-8," + 
      "ID,Name,Price,Stock,Category,Status\n" +
      selectedProductsData.map(p => 
        `${p.id},"${p.name}",${p.price},${p.stock},"${p.category}",${p.status ? 'Active' : 'Inactive'}`
      ).join("\n")
    
    const encodedUri = encodeURI(csvContent)
    const link = document.createElement("a")
    link.setAttribute("href", encodedUri)
    link.setAttribute("download", "selected_products.csv")
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  const clearFilters = () => {
    setFilters({
      category: '',
      status: '',
      priceRange: [0, 1000],
      stockRange: [0, 1000],
      searchTerm: ''
    })
    setCurrentPage(1)
  }

  return (
    <div className="w-full">
      {/* Üst Kontroller */}
      <div className="p-4 flex items-center justify-between flex-wrap gap-4">
        <div className="flex items-center gap-2">
          <h2 className="text-lg font-medium">Tüm Ürünler</h2>
          <Badge variant="secondary">
            {filteredAndSortedProducts.length} ürün
          </Badge>
        </div>
        <div className="flex items-center gap-2">
          <ProductFilters 
            filters={filters}
            onFiltersChange={setFilters}
            onClearFilters={clearFilters}
          />
          <AddProductDialog onProductAdded={fetchProducts} />
        </div>
      </div>

      {/* Toplu İşlemler */}
      <BulkActions
        selectedCount={selectedProducts.length}
        onBulkDelete={handleBulkDelete}
        onBulkExport={handleBulkExport}
        onClearSelection={() => setSelectedProducts([])}
      />

      {/* Tablo */}
      <div className="overflow-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b">
              <th className="h-12 px-4 text-left font-medium">
                <Checkbox
                  checked={selectedProducts.length === paginatedProducts.length && paginatedProducts.length > 0}
                  onCheckedChange={toggleAll}
                />
              </th>
              <th className="h-12 px-4 text-left font-medium">
                <Button 
                  variant="ghost" 
                  onClick={() => handleSort('name')}
                  className="h-auto p-0 font-medium"
                >
                  Ürün {getSortIcon('name')}
                </Button>
              </th>
              {isTablet && (
                <>
                  <th className="h-12 px-4 text-left font-medium">Ürün Kodu</th>
                  <th className="h-12 px-4 text-left font-medium">Barkod</th>
                </>
              )}
              <th className="h-12 px-4 text-left font-medium">
                <Button 
                  variant="ghost" 
                  onClick={() => handleSort('price')}
                  className="h-auto p-0 font-medium"
                >
                  Fiyat {getSortIcon('price')}
                </Button>
              </th>
              <th className="h-12 px-4 text-left font-medium">
                <Button 
                  variant="ghost" 
                  onClick={() => handleSort('stock')}
                  className="h-auto p-0 font-medium"
                >
                  Stok {getSortIcon('stock')}
                </Button>
              </th>
              <th className="h-12 px-4 text-left font-medium">Durum</th>
              <th className="h-12 px-4 text-left font-medium"></th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={isTablet ? 8 : 6} className="p-4 text-center">
                  Yükleniyor...
                </td>
              </tr>
            ) : paginatedProducts.length === 0 ? (
              <tr>
                <td colSpan={isTablet ? 8 : 6} className="p-4 text-center text-muted-foreground">
                  Ürün bulunamadı
                </td>
              </tr>
            ) : (
              paginatedProducts.map((product) => (
                <tr key={product.id} className="border-b hover:bg-muted/50">
                  <td className="p-4 align-middle">
                    <Checkbox
                      checked={selectedProducts.includes(product.id)}
                      onCheckedChange={() => toggleProduct(product.id)}
                    />
                  </td>
                  <td className="p-4 align-middle">
                    <div className="flex items-center gap-3">
                      <img
                        src={product.imageUrl || "/placeholder.jpg"}
                        alt={product.name}
                        className="h-10 w-10 rounded bg-muted object-cover"
                        onError={(e) => {
                          e.currentTarget.src = "/placeholder.jpg"
                        }}
                      />
                      <div>
                        <p className="text-sm font-medium leading-none">{product.name}</p>
                        <p className="text-xs text-muted-foreground">{product.category}</p>
                      </div>
                    </div>
                  </td>
                  {isTablet && (
                    <>
                      <td className="p-4 align-middle text-sm">{product.productCode}</td>
                      <td className="p-4 align-middle text-sm">{product.barcode}</td>
                    </>
                  )}
                  <td className="p-4 align-middle text-sm font-medium">${product.price?.toFixed(2)}</td>
                  <td className="p-4 align-middle text-sm">
                    <span className={product.stock < 10 ? "text-red-600 font-medium" : ""}>
                      {product.stock}
                    </span>
                  </td>
                  <td className="p-4 align-middle">
                    <StatusBadge status={product.status} />
                  </td>
                  <td className="p-4 align-middle">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="w-48">
                        <ProductDetailsDialog product={product} />
                        <EditProductDialog product={product} onProductUpdated={fetchProducts} />
                        <DeleteProductDialog 
                          productId={product.id} 
                          productName={product.name}
                          onProductDeleted={fetchProducts} 
                        />
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Alt Kontroller - Sayfalama */}
      <div className="flex items-center justify-between px-4 py-4 border-t">
        <div className="flex items-center gap-2">
          <span className="text-sm text-muted-foreground">
            Sayfa başına:
          </span>
          <Select value={itemsPerPage.toString()} onValueChange={(value) => {
            setItemsPerPage(Number(value))
            setCurrentPage(1)
          }}>
            <SelectTrigger className="w-20">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="5">5</SelectItem>
              <SelectItem value="10">10</SelectItem>
              <SelectItem value="20">20</SelectItem>
              <SelectItem value="50">50</SelectItem>
            </SelectContent>
          </Select>
          <span className="text-sm text-muted-foreground">
            {startIndex + 1}-{Math.min(startIndex + itemsPerPage, filteredAndSortedProducts.length)} / {filteredAndSortedProducts.length}
          </span>
        </div>
        
        <div className="flex items-center gap-1">
          <Button 
            variant="outline" 
            size="icon" 
            className="h-8 w-8"
            onClick={() => setCurrentPage(1)}
            disabled={currentPage === 1}
          >
            <ChevronsLeft className="h-4 w-4" />
          </Button>
          <Button 
            variant="outline" 
            size="icon" 
            className="h-8 w-8"
            onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
            disabled={currentPage === 1}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          
          {/* Sayfa numaraları */}
          {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
            let pageNum
            if (totalPages <= 5) {
              pageNum = i + 1
            } else if (currentPage <= 3) {
              pageNum = i + 1
            } else if (currentPage >= totalPages - 2) {
              pageNum = totalPages - 4 + i
            } else {
              pageNum = currentPage - 2 + i
            }
            
            return (
              <Button
                key={pageNum}
                variant={currentPage === pageNum ? "default" : "outline"}
                size="icon"
                className="h-8 w-8"
                onClick={() => setCurrentPage(pageNum)}
              >
                {pageNum}
              </Button>
            )
          })}
          
          <Button 
            variant="outline" 
            size="icon" 
            className="h-8 w-8"
            onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
            disabled={currentPage === totalPages}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
          <Button 
            variant="outline" 
            size="icon" 
            className="h-8 w-8"
            onClick={() => setCurrentPage(totalPages)}
            disabled={currentPage === totalPages}
          >
            <ChevronsRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  )
}

function StatusBadge({ status }: { status: boolean }) {
  return (
    <Badge
      variant={status ? "default" : "secondary"}
      className={
        status 
          ? "bg-green-100 text-green-700 hover:bg-green-100" 
          : "bg-red-100 text-red-700 hover:bg-red-100"
      }
    >
      {status ? "Aktif" : "Pasif"}
    </Badge>
  )
}