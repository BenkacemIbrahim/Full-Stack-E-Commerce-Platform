import { SectionHeader } from "@/components/section-header"
import { CategoryShowcase } from "@/components/category-showcase"

const categories = [
  { id: "1", name: "Men", image: "/men-collection-hero.jpg", productCount: 340 },
  { id: "2", name: "Women", image: "/women-collection-hero.jpg", productCount: 425 },
  { id: "3", name: "Kids", image: "/kids-collection-hero.jpg", productCount: 180 },
  { id: "4", name: "Sports", image: "/sports-collection-hero.jpg", productCount: 290 },
  { id: "5", name: "New", image: "/fashion-model-wearing-contemporary-athletic-street.jpg", productCount: 156 },
]

export function FeaturedCategories() {
  return (
    <section className="py-20 bg-secondary/30">
      <div className="container mx-auto px-4">
        <SectionHeader title="Shop by Category" description="Find the perfect footwear for every style and occasion" />
        <CategoryShowcase categories={categories} />
      </div>
    </section>
  )
}
