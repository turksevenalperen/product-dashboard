"use client"

import { useState } from "react"
import { Trash2, Edit, Download, Upload } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { useToast } from "@/hooks/use-toast"

interface BulkActionsProps {
  selectedCount: number
  onBulkDelete: () => void
  onBulkExport: () => void
  onClearSelection: () => void
}

export function BulkActions({ selectedCount, onBulkDelete, onBulkExport, onClearSelection }: BulkActionsProps) {
  const [showDeleteDialog, setShowDeleteDialog] = useState(false)
  const [loading, setLoading] = useState(false)
  const { toast } = useToast()

  const handleBulkDelete = async () => {
    setLoading(true)
    try {
      await new Promise(resolve => setTimeout(resolve, 1000))
      onBulkDelete()
      setShowDeleteDialog(false)
      toast({
        title: "Başarılı!",
        description: `${selectedCount} ürün başarıyla silindi.`,
      })
    } catch (error) {
      toast({
        title: "Hata!",
        description: "Ürünler silinirken bir hata oluştu.",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const handleBulkExport = () => {
    onBulkExport()
    toast({
      title: "Başarılı!",
      description: `${selectedCount} ürün Excel dosyası olarak dışa aktarıldı.`,
    })
  }

  if (selectedCount === 0) return null

  return (
    <>
      <div className="flex items-center gap-2 p-4 bg-muted/50 border-b">
        <span className="text-sm text-muted-foreground">
          {selectedCount} ürün seçildi
        </span>
        
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="sm">
              Toplu İşlemler
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start">
            <DropdownMenuItem onClick={handleBulkExport}>
              <Download className="h-4 w-4 mr-2" />
              Excel'e Aktar
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Edit className="h-4 w-4 mr-2" />
              Toplu Düzenle
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem 
              onClick={() => setShowDeleteDialog(true)}
              className="text-destructive focus:text-destructive"
            >
              <Trash2 className="h-4 w-4 mr-2" />
              Seçilenleri Sil
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <Button variant="ghost" size="sm" onClick={onClearSelection}>
          Seçimi Temizle
        </Button>
      </div>

      <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Seçili Ürünleri Sil</AlertDialogTitle>
            <AlertDialogDescription>
              {selectedCount} ürün kalıcı olarak silinecek. Bu işlem geri alınamaz.
              Devam etmek istediğinizden emin misiniz?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>İptal</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleBulkDelete}
              disabled={loading}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              {loading ? "Siliniyor..." : "Sil"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}