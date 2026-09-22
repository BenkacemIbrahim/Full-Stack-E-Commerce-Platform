import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { CategoryHero } from "@/components/category-hero"
import { SectionHeader } from "@/components/section-header"
import { ProductGrid } from "@/components/product-grid"
import { CategoryShowcase } from "@/components/category-showcase"
import { PromoGrid } from "@/components/promo-grid"

const topProducts = [
  {
    id: "1",
    name: "Air Jordan 1 Retro High",
    brand: "Nike",
    price: 179.99,
    image: "/black-red-basketball-shoes.jpg",
    rating: 4.9,
    reviewCount: 456,
    badge: "Best Seller",
  },
  {
    id: "2",
    name: "Zig Kinetica 3",
    brand: "Reebok",
    price: 199.0,
    image: "/reebok-zig-kinetica-side.jpg",
    rating: 4.8,
    reviewCount: 342,
  },
  {
    id: "3",
    name: "Pegasus 40",
    brand: "Nike",
    price: 139.99,
    originalPrice: 169.99,
    image: "/blue-running-shoes.png",
    rating: 4.7,
    reviewCount: 289,
    badge: "Sale",
  },
  {
    id: "4",
    name: "990v6",
    brand: "New Balance",
    price: 199.99,
    image: "/grey-new-balance-990.jpg",
    rating: 4.9,
    reviewCount: 412,
  },
]

const newArrivals = [
  {
    id: "5",
    name: "Phantom GX Elite",
    brand: "Nike",
    price: 289.99,
    image: "/soccer-cleats-black.jpg",
    rating: 4.8,
    reviewCount: 78,
    badge: "New",
  },
  {
    id: "6",
    name: "Speedcat LS",
    brand: "Puma",
    price: 119.99,
    image: "/black-leather-sneakers.jpg",
    rating: 4.7,
    reviewCount: 64,
    badge: "New",
  },
  {
    id: "7",
    name: "Yeezy Foam Runner",
    brand: "Adidas",
    price: 89.99,
    image: "/foam-runner-grey.jpg",
    rating: 4.6,
    reviewCount: 156,
    badge: "New",
  },
  {
    id: "8",
    name: "Nano X3",
    brand: "Reebok",
    price: 149.99,
    image: "/training-shoes-black.jpg",
    rating: 4.8,
    reviewCount: 93,
    badge: "New",
  },
]

const categories = [
  { id: "1", name: "Basketball", image: "/athletic-basketball-shoes.png", productCount: 156 },
  { id: "2", name: "Running", image: "/blue-running-shoes.png", productCount: 234 },
  { id: "3", name: "Training", image: "/training-shoes-black.jpg", productCount: 189 },
  { id: "4", name: "Lifestyle", image: "/casual-sneakers.png", productCount: 278 },
  { id: "5", name: "Soccer", image: "/soccer-cleats-black.jpg", productCount: 92 },
]

const promos = [
  {
    id: "1",
    title: "Performance Collection",
    description: "Engineered for athletes and champions",
    image: "/men-athletic-performance.jpg",
    link: "#",
    buttonText: "Shop Performance",
  },
  {
    id: "2",
    title: "Street Style",
    description: "Urban fashion meets comfort",
    image: "/men-street-style-sneakers.jpg",
    link: "#",
    buttonText: "Explore Streetwear",
  },
]

export default function MenPage() {
  return (
    <div className="min-h-screen">
      <Header />

      <CategoryHero
        title="Men's Collection"
        description="Performance meets style. Discover footwear engineered for athletes and designed for life"
        imageUrl="/men-collection-hero.jpg"
        ctaText="Shop Men's"
      />

      <main className="container mx-auto px-4 py-16">
        <section className="mb-20">
          <SectionHeader title="Top Products" description="Fan favorites and best-selling styles" viewAllLink="#" />
          <ProductGrid products={topProducts} />
        </section>

        <section className="mb-20">
          <SectionHeader title="Shop by Category" description="Find your perfect fit for any activity" />
          <CategoryShowcase categories={categories} />
        </section>

        <section className="mb-20">
          <SectionHeader title="New Arrivals" description="Fresh drops and latest innovations" viewAllLink="#" />
          <ProductGrid products={newArrivals} />
        </section>

        <section>
          <PromoGrid promos={promos} />
        </section>
      </main>

      <Footer />
    </div>
  )
}
