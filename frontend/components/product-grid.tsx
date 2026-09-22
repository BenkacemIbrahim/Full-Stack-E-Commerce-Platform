"use client"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Heart, ShoppingCart, Star } from "lucide-react"
import Link from "next/link"
import { BrandLogo } from "@/components/brand-logo"

interface Product {
  id: string
  name: string
  brand: string
  price: number
  originalPrice?: number
  image: string
  rating: number
  reviewCount: number
  badge?: string
}

interface ProductGridProps {
  products: Product[]
  columns?: number
}

export function ProductGrid({ products, columns = 4 }: ProductGridProps) {
  return (
    <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-${columns} gap-8`}>
      {products.map((product) => (
        <Card
          key={product.id}
          className="group overflow-hidden border border-border/50 hover:border-primary/30 hover:shadow-2xl transition-all duration-500 bg-card"
        >
          <div className="relative aspect-square overflow-hidden bg-neutral-50 h-64">
            {product.badge && (
              <div className="absolute top-4 left-4 z-10 bg-accent text-accent-foreground px-4 py-1.5 text-sm font-semibold rounded-full shadow-lg">
                {product.badge}
              </div>
            )}

            <Link href={`/products/${product.id}`}>
              <img
                src={product.image || "/placeholder.svg"}
                alt={product.name}
                className="w-full h-full object-cover object-center group-hover:scale-110 transition-transform duration-700"
              />
            </Link>

            <div className="absolute top-4 right-4 flex flex-col gap-3 opacity-0 group-hover:opacity-100 transition-all duration-300">
              <Button
                size="icon"
                variant="secondary"
                className="rounded-full shadow-xl backdrop-blur-sm bg-background/90 hover:bg-background"
              >
                <Heart className="h-4 w-4" />
              </Button>
              <Button
                size="icon"
                variant="secondary"
                className="rounded-full shadow-xl backdrop-blur-sm bg-background/90 hover:bg-background"
              >
                <ShoppingCart className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <div className="p-5">
            <BrandLogo brand={product.brand} className="mb-2" />
            <Link href={`/products/${product.id}`}>
              <h3 className="font-semibold text-lg mb-3 hover:text-primary transition-colors line-clamp-2 leading-snug">
                {product.name}
              </h3>
            </Link>

            <div className="flex items-center gap-2 mb-4">
              <div className="flex items-center gap-1.5">
                <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                <span className="text-sm font-semibold">{product.rating}</span>
              </div>
              <span className="text-sm text-muted-foreground">({product.reviewCount})</span>
            </div>

            <div className="flex items-center gap-3">
              <span className="text-2xl font-bold tracking-tight">${product.price.toFixed(2)}</span>
              {product.originalPrice && (
                <span className="text-sm text-muted-foreground line-through">${product.originalPrice.toFixed(2)}</span>
              )}
            </div>
          </div>
        </Card>
      ))}
    </div>
  )
}
