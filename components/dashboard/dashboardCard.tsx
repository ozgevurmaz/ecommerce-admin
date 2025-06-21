import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowDownIcon, ArrowUpIcon } from "lucide-react"
import React from "react"

interface DashboardCardProps {
  title: string
  value: number
  growth: number
  icon: React.ReactNode
  chartBg: string
  chart: React.ReactNode
}

export const DashboardCard: React.FC<DashboardCardProps> = ({
  title,
  value,
  growth,
  icon,
  chartBg,
  chart,
}) => {
  const isPositive = growth >= 0

  return (
    <Card className="border-border shadow-md hover:shadow-lg transition-shadow">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium text-card-foreground">{title}</CardTitle>
        <div className="relative h-8 w-8 rounded-full flex items-center justify-center">
          <div className={`absolute w-full h-full rounded-full ${chartBg} opacity-20`} />
          {icon}
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex justify-between items-end">
          <div>
            <p className="text-2xl font-bold text-card-foreground">
              {value.toLocaleString()}
            </p>
            <div className="flex items-center mt-1">
              {isPositive ? (
                <ArrowUpIcon className="h-4 w-4 text-success mr-1" />
              ) : (
                <ArrowDownIcon className="h-4 w-4 text-destructive mr-1" />
              )}
              <span className={`text-xs ${isPositive ? "text-success" : "text-destructive"}`}>
                {Math.abs(growth)}% from previous period
              </span>
            </div>
          </div>
          {chart}
        </div>
      </CardContent>
    </Card>
  )
}
