"use client"

import { useState } from "react"
import { Eye } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"

interface Product {
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

interface ProductDetailsDialogProps {
  product: Product
}

export function ProductDetailsDialog({ product }: ProductDetailsDialogProps) {
  const [open, setOpen] = useState(false)

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" size="sm" className="w-full justify-start">
          <Eye className="h-4 w-4 mr-2" />
          Detayları Görüntüle
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Ürün Detayları</DialogTitle>
          <DialogDescription>
            {product.name} ürününün detaylı bilgileri
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-6">
          {/* Ürün Resmi */}
          <div className="flex justify-center">
            <img
              src={product.imageUrl || "/placeholder.jpg"}
              alt={product.name}
              className="w-32 h-32 rounded-lg object-cover border"
              onError={(e) => {
                e.currentTarget.src = "/placeholder.jpg"
              }}
            />
          </div>

          {/* Temel Bilgiler */}
          <div className="space-y-4">
            <div>
              <h3 className="font-semibold text-lg">{product.name}</h3>
              <div className="flex items-center gap-2 mt-1">
                <Badge variant={product.status ? "default" : "secondary"}>
                  {product.status ? "Aktif" : "Pasif"}
                </Badge>
                {product.category && (
                  <Badge variant="outline">{product.category}</Badge>
                )}
              </div>
            </div>

            <Separator />

            {/* Fiyat ve Stok */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-muted-foreground">Fiyat</p>
                <p className="text-2xl font-bold text-green-600">
                  ${product.price?.toFixed(2)}
                </p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Stok</p>
                <p className="text-2xl font-bold">
                  {product.stock}
                </p>
              </div>
            </div>

            <Separator />

            {/* Kodlar */}
            <div className="space-y-3">
              <div>
                <p className="text-sm text-muted-foreground">Ürün Kodu</p>
                <p className="font-mono text-sm bg-muted px-2 py-1 rounded">
                  {product.productCode || "Belirtilmemiş"}
                </p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Barkod</p>
                <p className="font-mono text-sm bg-muted px-2 py-1 rounded">
                  {product.barcode || "Belirtilmemiş"}
                </p>
              </div>
            </div>

            {/* Açıklama */}
            {product.description && (
              <>
                <Separator />
                <div>
                  <p className="text-sm text-muted-foreground mb-2">Açıklama</p>
                  <p className="text-sm leading-relaxed">
                    {product.description}
                  </p>
                </div>
              </>
            )}

            {/* ID */}
            <Separator />
            <div>
              <p className="text-sm text-muted-foreground">Ürün ID</p>
              <p className="font-mono text-sm">{product.id}</p>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}