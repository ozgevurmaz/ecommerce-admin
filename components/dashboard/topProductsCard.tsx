import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { StoreIcon } from "lucide-react"
import Image from "next/image"
import React from "react"

interface Product {
  title: string
  category: string
  sales: number
  image?: string[]
}

interface TopProductsCardProps {
  title?: string
  description?: string
  products?: Product[]
}

export const TopProductsCard: React.FC<TopProductsCardProps> = ({
  title = "Top Products",
  description = "Best performing items",
  products,
}) => {
  const placeholder = Array(5).fill(0)

  return (
    <Card className="border-border shadow-md">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <div>
          <CardTitle className="text-card-foreground">{title}</CardTitle>
          <p className="text-xs text-muted-foreground mt-1">{description}</p>
        </div>
        <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
          <StoreIcon className="h-5 w-5 text-primary" />
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {(products?.length ? products.slice(0, 5) : placeholder).map((product, index) => (
            <div key={index} className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="w-10 h-10 rounded-md bg-muted mr-3 overflow-hidden">
                  {product?.image && product.image[0] ? (
                    <Image
                      width={100}
                      height={100}
                      src={product.image[0]}
                      alt={product.title}
                      className="w-full h-full object-cover"
                    />
                  ) : null}
                </div>
                <div>
                  <p className="text-sm font-medium text-foreground">
                    {product?.title || `Product ${index + 1}`}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {product?.category || "Category"}
                  </p>
                </div>
              </div>
              <p className="font-medium text-sm text-foreground">
                €{product?.sales?.toLocaleString() || (Math.random() * 1000).toFixed(0)}
              </p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
