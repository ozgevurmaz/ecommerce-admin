import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { TrendingUpIcon } from "lucide-react"
import React from "react"

interface SalesOverviewCardProps {
  title?: string
  description?: string
  chart: React.ReactNode
}

export const SalesOverviewCard: React.FC<SalesOverviewCardProps> = ({
  title = "Sales Overview",
  description = "Monthly sales performance",
  chart,
}) => {
  return (
    <Card className="border-border shadow-md lg:col-span-2">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <div>
          <CardTitle className="text-card-foreground">{title}</CardTitle>
          <p className="text-xs text-muted-foreground mt-1">{description}</p>
        </div>
        <div className="h-8 w-8 rounded-full bg-success/10 flex items-center justify-center">
          <TrendingUpIcon className="h-5 w-5 text-success" />
        </div>
      </CardHeader>
      <CardContent className="pt-4">{chart}</CardContent>
    </Card>
  )
}
