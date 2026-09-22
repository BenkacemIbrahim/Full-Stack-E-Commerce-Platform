import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { BrandsHero } from "@/components/brands-hero"
import { AlphabetNav } from "@/components/alphabet-nav"
import { BrandsGrid } from "@/components/brands-grid"

const brands = [
  // A
  { name: "Adidas", logo: "/logos/adidas.svg", category: "Athletic", letter: "A" },
  { name: "ASICS", logo: "/logos/asics.svg", category: "Running", letter: "A" },
  { name: "Arc'teryx", logo: "/logos/arcteryx.svg", category: "Outdoor", letter: "A" },
  { name: "AllSaints", logo: "/logos/allsaints.svg", category: "Fashion", letter: "A" },

  // B
  { name: "Balenciaga", logo: "/logos/balenciaga.svg", category: "Luxury", letter: "B" },
  { name: "Brooks", logo: "/logos/brooks.svg", category: "Running", letter: "B" },
  { name: "Burberry", logo: "/logos/burberry.svg", category: "Luxury", letter: "B" },

  // C
  { name: "Calvin Klein", logo: "/logos/calvinklein.svg", category: "Fashion", letter: "C" },
  { name: "Converse", logo: "/logos/converse.svg", category: "Footwear", letter: "C" },
  { name: "Canada Goose", logo: "/logos/canadagoose.svg", category: "Outerwear", letter: "C" },
  { name: "Champion", logo: "/logos/champion.svg", category: "Athletic", letter: "C" },

  // D
  { name: "Diesel", logo: "/logos/diesel.svg", category: "Denim", letter: "D" },
  { name: "Dior", logo: "/logos/dior.svg", category: "Luxury", letter: "D" },

  // E
  { name: "Everlane", logo: "/logos/everlane.svg", category: "Sustainable", letter: "E" },

  // F
  { name: "Fendi", logo: "/logos/fendi.svg", category: "Luxury", letter: "F" },
  { name: "Fila", logo: "/logos/fila.svg", category: "Athletic", letter: "F" },

  // G
  { name: "Gucci", logo: "/logos/gucci.svg", category: "Luxury", letter: "G" },
  { name: "GAP", logo: "/logos/gap.svg", category: "Casual", letter: "G" },

  // H
  { name: "Hugo Boss", logo: "/logos/hugoboss.svg", category: "Fashion", letter: "H" },
  { name: "Herschel", logo: "/logos/herschel.svg", category: "Accessories", letter: "H" },

  // J
  { name: "Jordan", logo: "/logos/jordan.svg", category: "Athletic", letter: "J" },
  { name: "J.Crew", logo: "/logos/jcrew.svg", category: "Fashion", letter: "J" },

  // K
  { name: "Kappa", logo: "/logos/kappa.svg", category: "Athletic", letter: "K" },

  // L
  { name: "Lacoste", logo: "/logos/lacoste.svg", category: "Fashion", letter: "L" },
  { name: "Levi's", logo: "/logos/levis.svg", category: "Denim", letter: "L" },
  { name: "Lululemon", logo: "/logos/lululemon.svg", category: "Athletic", letter: "L" },
  { name: "Louis Vuitton", logo: "/logos/louisvuitton.svg", category: "Luxury", letter: "L" },

  // M
  { name: "Moncler", logo: "/logos/moncler.svg", category: "Luxury", letter: "M" },
  { name: "Michael Kors", logo: "/logos/michaelkors.svg", category: "Fashion", letter: "M" },

  // N
  { name: "Nike", logo: "/logos/nike.svg", category: "Athletic", letter: "N" },
  { name: "New Balance", logo: "/logos/newbalance.svg", category: "Athletic", letter: "N" },
  { name: "The North Face", logo: "/logos/thenorthface.svg", category: "Outdoor", letter: "N" },

  // O
  { name: "Off-White", logo: "/logos/offwhite.svg", category: "Streetwear", letter: "O" },

  // P
  { name: "Prada", logo: "/logos/prada.svg", category: "Luxury", letter: "P" },
  { name: "Puma", logo: "/logos/puma.svg", category: "Athletic", letter: "P" },
  { name: "Polo Ralph Lauren", logo: "/logos/ralphlauren.svg", category: "Fashion", letter: "P" },
  { name: "Patagonia", logo: "/logos/patagonia.svg", category: "Outdoor", letter: "P" },

  // R
  { name: "Reebok", logo: "/logos/reebok.svg", category: "Athletic", letter: "R" },
  { name: "Ray-Ban", logo: "/logos/rayban.svg", category: "Eyewear", letter: "R" },

  // S
  { name: "Supreme", logo: "/logos/supreme.svg", category: "Streetwear", letter: "S" },
  { name: "Stone Island", logo: "/logos/stoneisland.svg", category: "Fashion", letter: "S" },
  { name: "Salomon", logo: "/logos/salomon.svg", category: "Outdoor", letter: "S" },

  // T
  { name: "Tommy Hilfiger", logo: "/logos/tommyhilfiger.svg", category: "Fashion", letter: "T" },
  { name: "Timberland", logo: "/logos/timberland.svg", category: "Footwear", letter: "T" },

  // U
  { name: "Under Armour", logo: "/logos/underarmour.svg", category: "Athletic", letter: "U" },
  { name: "Uniqlo", logo: "/logos/uniqlo.svg", category: "Casual", letter: "U" },

  // V
  { name: "Versace", logo: "/logos/versace.svg", category: "Luxury", letter: "V" },
  { name: "Vans", logo: "/logos/vans.svg", category: "Footwear", letter: "V" },

  // Y
  { name: "Y-3", logo: "/logos/y3.svg", category: "Designer", letter: "Y" },

  // Z
  { name: "Zara", logo: "/logos/zara.svg", category: "Fast Fashion", letter: "Z" },
]

export default function BrandsPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* PromoBanner and Header should come from layout or be at top level */}
      <Header />

      <BrandsHero />

      <main className="container mx-auto px-4 py-12 lg:py-16">
        <AlphabetNav brands={brands} />
        <BrandsGrid brands={brands} />
      </main>

      <Footer />
    </div>
  )
}
