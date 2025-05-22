"use client"

import { useState, useEffect } from "react"
import {
  MoreHorizontal,
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
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

export function ProductsTable() {
  const [selectedProducts, setSelectedProducts] = useState<number[]>([])
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const isTablet = useMediaQuery("(min-width: 768px)")

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true)
      try {
        const res = await fetch("https://devcase.isiksoftyazilim.com/api/products?page=1")
        const data = await res.json()
        setProducts(data.data)
      } catch (error) {
        console.error("Error fetching products:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchProducts()
  }, [])

  const toggleProduct = (id: number) => {
    setSelectedProducts((prev) =>
      prev.includes(id) ? prev.filter((pid) => pid !== id) : [...prev, id]
    )
  }

  const toggleAll = () => {
    if (selectedProducts.length === products.length) {
      setSelectedProducts([])
    } else {
      setSelectedProducts(products.map((p) => p.id))
    }
  }

  return (
    <div className="w-full overflow-auto">
      <table className="w-full">
        <thead>
          <tr className="border-b">
            <th className="h-12 px-4 text-left font-medium">
              <Checkbox
                checked={selectedProducts.length === products.length && products.length > 0}
                onCheckedChange={toggleAll}
              />
            </th>
            <th className="h-12 px-4 text-left font-medium">Product</th>
            {isTablet && (
              <>
                <th className="h-12 px-4 text-left font-medium">Product Code</th>
                <th className="h-12 px-4 text-left font-medium">Barcode</th>
              </>
            )}
            <th className="h-12 px-4 text-left font-medium">Price</th>
            <th className="h-12 px-4 text-left font-medium">Status</th>
            <th className="h-12 px-4 text-left font-medium"></th>
          </tr>
        </thead>
        <tbody>
          {loading ? (
            <tr>
              <td colSpan={7} className="p-4 text-center">
                Loading...
              </td>
            </tr>
          ) : (
            products.map((product) => (
              <tr key={product.id} className="border-b">
                <td className="p-4 align-middle">
                  <Checkbox
                    checked={selectedProducts.includes(product.id)}
                    onCheckedChange={() => toggleProduct(product.id)}
                  />
                </td>
                <td className="p-4 align-middle">
                  <div className="flex items-center gap-3">
                    <img
                      src={product.imageUrl}
                      alt={product.name}
                      className="h-10 w-10 rounded bg-muted object-cover"
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
                <td className="p-4 align-middle text-sm font-medium">${product.price.toFixed(2)}</td>
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
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>View details</DropdownMenuItem>
                      <DropdownMenuItem>Edit product</DropdownMenuItem>
                      <DropdownMenuItem>Delete product</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>

      <div className="flex items-center justify-between px-4 py-4 border-t">
        <div className="text-sm text-muted-foreground">Showing {products.length} products</div>
        <div className="flex items-center gap-1">
          <Button variant="outline" size="icon" className="h-8 w-8">
            <ChevronsLeft className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="icon" className="h-8 w-8">
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="icon" className="h-8 w-8 bg-primary text-primary-foreground">
            1
          </Button>
          <Button variant="outline" size="icon" className="h-8 w-8">
            2
          </Button>
          <Button variant="outline" size="icon" className="h-8 w-8">
            3
          </Button>
          <Button variant="outline" size="icon" className="h-8 w-8">
            <ChevronRight className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="icon" className="h-8 w-8">
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
      className={`
        ${status === true ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}
      `}
    >
      {status ? "Active" : "Inactive"}
    </Badge>
  )
}
