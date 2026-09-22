"use client"

import { useState } from "react"
import { Heart, Truck, ShieldCheck, RotateCcw, Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { BrandLogo } from "@/components/brand-logo"

interface ProductDetailsProps {
  brand: string
  name: string
  price: number
  rating: number
  reviewCount: number
  colors: { name: string; value: string; image: string }[]
  sizes: string[]
}

export function ProductDetails({ brand, name, price, rating, reviewCount, colors, sizes }: ProductDetailsProps) {
  const [selectedColor, setSelectedColor] = useState(0)
  const [selectedSize, setSelectedSize] = useState(1)

  return (
    <div className="space-y-8">
      <div className="flex items-center gap-3">
        <div className="h-10 w-10 rounded-full bg-white flex items-center justify-center p-2 border border-border shadow-sm overflow-hidden">
          <BrandLogo brand={brand} showText={false} logoClassName="h-full w-full object-contain" />
        </div>
        <span className="text-sm font-semibold tracking-wider uppercase text-foreground">{brand}</span>
      </div>

      <div>
        <h1 className="text-4xl md:text-5xl font-serif font-semibold mb-3 leading-tight text-balance">{name}</h1>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={cn(
                  "h-4 w-4",
                  i < Math.floor(rating) ? "fill-foreground text-foreground" : "fill-muted text-muted",
                )}
              />
            ))}
          </div>
          <span className="text-sm text-muted-foreground">({reviewCount} Reviews)</span>
        </div>
      </div>

      <div className="text-3xl font-serif font-semibold tracking-tight">${price.toFixed(2)}</div>

      <div className="space-y-6 pt-4 border-t border-border/40">
        <div>
          <div className="flex items-center justify-between mb-4">
            <span className="text-sm font-medium uppercase tracking-wide">Color</span>
            <span className="text-sm text-muted-foreground">{colors[selectedColor].name}</span>
          </div>
          <div className="flex gap-3">
            {colors.map((color, index) => (
              <button
                key={index}
                onClick={() => setSelectedColor(index)}
                className={cn(
                  "w-16 h-16 rounded-md overflow-hidden border-2 transition-all hover:scale-105",
                  selectedColor === index ? "border-foreground shadow-md" : "border-border/40",
                )}
              >
                <img src={color.image || "/placeholder.svg"} alt={color.name} className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        </div>

        <div>
          <div className="flex items-center justify-between mb-4">
            <span className="text-sm font-medium uppercase tracking-wide">Size</span>
            <button className="text-sm text-muted-foreground hover:text-foreground transition-colors underline underline-offset-4">
              Size guide
            </button>
          </div>
          <div className="grid grid-cols-5 gap-2">
            {sizes.map((size, index) => (
              <button
                key={index}
                onClick={() => setSelectedSize(index)}
                className={cn(
                  "py-3 rounded-md border text-sm font-medium transition-all hover:border-foreground",
                  selectedSize === index
                    ? "bg-foreground text-background border-foreground"
                    : "bg-background border-border/40",
                )}
              >
                {size}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="flex gap-3 pt-2">
        <Button className="flex-1 h-14 text-base font-medium tracking-wide" size="lg">
          Add to cart
        </Button>
        <Button variant="outline" size="icon" className="h-14 w-14 border-border/40 hover:bg-secondary bg-transparent">
          <Heart className="h-5 w-5" />
        </Button>
      </div>

      <div className="space-y-3 pt-6 border-t border-border/40">
        <div className="flex items-center gap-3 text-sm">
          <Truck className="h-5 w-5 text-muted-foreground" />
          <span className="text-foreground">Free delivery on orders over $80.0</span>
        </div>
        <div className="flex items-center gap-3 text-sm">
          <RotateCcw className="h-5 w-5 text-muted-foreground" />
          <span className="text-foreground">Free 30-day returns</span>
        </div>
        <div className="flex items-center gap-3 text-sm">
          <ShieldCheck className="h-5 w-5 text-muted-foreground" />
          <span className="text-foreground">2-year warranty included</span>
        </div>
      </div>
    </div>
  )
}
