import React from "react"

const BRAND_LOGO_MAP: Record<string, string> = {
  nike: "/logos/nike.svg",
  adidas: "/logos/adidas.svg",
  reebok: "/logos/reebok.svg",
  puma: "/logos/puma.svg",
  "new balance": "/logos/newbalance.svg",
  jordan: "/logos/jordan.svg",
  "under armour": "/logos/underarmour.svg",
  converse: "/logos/converse.svg",
  asics: "/logos/asics.svg",
  vans: "/logos/vans.svg",
  salomon: "/logos/salomon.svg",
  fila: "/logos/fila.svg",
  lacoste: "/logos/lacoste.svg",
  champion: "/logos/champion.svg",
  timberland: "/logos/timberland.svg",
  supreme: "/logos/supreme.svg",
  "the north face": "/logos/thenorthface.svg",
  gucci: "/logos/gucci.svg",
  prada: "/logos/prada.svg",
  balenciaga: "/logos/balenciaga.svg",
  dior: "/logos/dior.svg",
  zara: "/logos/zara.svg",
  "calvin klein": "/logos/calvinklein.svg",
  "tommy hilfiger": "/logos/tommyhilfiger.svg",
}

interface BrandLogoProps {
  brand?: string
  showText?: boolean
  className?: string
  logoClassName?: string
}

export function BrandLogo({ brand, showText = true, className = "", logoClassName = "h-4 max-w-[50px]" }: BrandLogoProps) {
  if (!brand) return null
  const key = brand.toLowerCase().trim()
  const logoPath = BRAND_LOGO_MAP[key] || `/logos/${key.replace(/[^a-z0-9]/g, "")}.svg`

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <img
        src={logoPath}
        alt={`${brand} logo`}
        className={`${logoClassName} object-contain object-left filter dark:invert-0`}
        onError={(e) => {
          ;(e.target as HTMLElement).style.display = "none"
        }}
      />
      {showText && (
        <span className="text-xs text-muted-foreground font-semibold uppercase tracking-wider">
          {brand}
        </span>
      )}
    </div>
  )
}
