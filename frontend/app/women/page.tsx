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
    name: "Air Max 270 Essential",
    brand: "Nike",
    price: 149.99,
    originalPrice: 199.99,
    image: "/white-women-sneakers.jpg",
    rating: 4.8,
    reviewCount: 234,
    badge: "Best Seller",
  },
  {
    id: "2",
    name: "Chuck Taylor All Star",
    brand: "Converse",
    price: 65.0,
    image: "/black-canvas-sneakers.jpg",
    rating: 4.7,
    reviewCount: 189,
  },
  {
    id: "3",
    name: "Classic Leather",
    brand: "Reebok",
    price: 89.99,
    originalPrice: 119.99,
    image: "/white-leather-sneakers.png",
    rating: 4.6,
    reviewCount: 156,
    badge: "Sale",
  },
  {
    id: "4",
    name: "Suede Classic XXI",
    brand: "Puma",
    price: 75.0,
    image: "/beige-suede-sneakers.jpg",
    rating: 4.9,
    reviewCount: 203,
  },
]

const newArrivals = [
  {
    id: "5",
    name: "Gel-Kayano 30",
    brand: "Asics",
    price: 159.99,
    image: "/running-shoes-pink.jpg",
    rating: 4.8,
    reviewCount: 87,
    badge: "New",
  },
  {
    id: "6",
    name: "Fresh Foam X 1080v13",
    brand: "New Balance",
    price: 164.99,
    image: "/running-shoes-blue.jpg",
    rating: 4.7,
    reviewCount: 92,
    badge: "New",
  },
  {
    id: "7",
    name: "Ultraboost Light",
    brand: "Adidas",
    price: 189.99,
    image: "/adidas-ultraboost-white.jpg",
    rating: 4.9,
    reviewCount: 145,
    badge: "New",
  },
  {
    id: "8",
    name: "React Infinity 3",
    brand: "Nike",
    price: 169.99,
    image: "/orange-running-shoes.jpg",
    rating: 4.8,
    reviewCount: 118,
    badge: "New",
  },
]

const categories = [
  { id: "1", name: "Running", image: "/running-shoes.jpg", productCount: 124 },
  { id: "2", name: "Training", image: "/athletic-training-shoes.png", productCount: 89 },
  { id: "3", name: "Casual", image: "/casual-sneakers.png", productCount: 156 },
  { id: "4", name: "Basketball", image: "/athletic-basketball-shoes.png", productCount: 67 },
  { id: "5", name: "Sandals", image: "/women-sandals.jpg", productCount: 94 },
]

const promos = [
  {
    id: "1",
    title: "Spring Collection",
    description: "Fresh styles for the new season",
    image: "/spring-sneakers-collection.jpg",
    link: "#",
    buttonText: "Shop Spring",
  },
  {
    id: "2",
    title: "Performance Running",
    description: "Engineered for your best run",
    image: "/women-running-performance.jpg",
    link: "#",
    buttonText: "Explore Running",
  },
]

export default function WomenPage() {
  return (
    <div className="min-h-screen">
      <Header />

      <CategoryHero
        title="Women's Collection"
        description="Discover the latest styles designed for comfort, performance, and everyday elegance"
        imageUrl="/women-collection-hero.jpg"
        ctaText="Shop Women's"
      />

      <main className="container mx-auto px-4 py-16">
        <section className="mb-20">
          <SectionHeader title="Top Products" description="Our most popular women's footwear" viewAllLink="#" />
          <ProductGrid products={topProducts} />
        </section>

        <section className="mb-20">
          <SectionHeader title="Shop by Category" description="Find the perfect shoe for every occasion" />
          <CategoryShowcase categories={categories} />
        </section>

        <section className="mb-20">
          <SectionHeader
            title="New Arrivals"
            description="Just dropped: Latest styles and innovations"
            viewAllLink="#"
          />
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
