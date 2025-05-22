import { ArrowDown, ArrowUp } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

interface StatCardProps {
  title: string
  value: string
  change: string
  trend: "up" | "down"
  className?: string
}

export function StatCard({ title, value, change, trend, className = "" }: StatCardProps) {
  return (
    <Card className={className}>
      <CardContent className="p-4">
        <div className="space-y-2">
          <p className="text-sm text-muted-foreground">{title}</p>
          <div className="flex items-center justify-between">
            <p className="text-2xl font-bold">{value}</p>
            <div
              className={`flex items-center text-xs font-medium ${trend === "up" ? "text-green-600" : "text-red-600"}`}
            >
              {trend === "up" ? <ArrowUp className="mr-1 h-3 w-3" /> : <ArrowDown className="mr-1 h-3 w-3" />}
              {change}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
