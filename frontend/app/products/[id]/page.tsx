import { Header } from "@/components/header"
import { ProductImageGallery } from "@/components/product-image-gallery"
import { ProductDetails } from "@/components/product-details"
import { ProductTabs } from "@/components/product-tabs"
import { RelatedProducts } from "@/components/related-products"
import { PromoBanner } from "@/components/promo-banner"
import { Footer } from "@/components/footer"

const productImages = [
  "/reebok-zig-kinetica-side.jpg",
  "/reebok-zig-kinetica-back.jpg",
  "/reebok-zig-kinetica-sole.jpg",
]

const productColors = [
  { name: "White", value: "white", image: "/white-shoe.jpg" },
  { name: "Gray", value: "gray", image: "/gray-shoe.jpg" },
  { name: "Black", value: "black", image: "/black-shoe.jpg" },
]

const productSizes = ["40.5", "41", "42", "43", "43.5", "44", "44.5", "45", "46"]

export default function ProductPage() {
  return (
    <div className="min-h-screen">
      <Header />

      <main className="container mx-auto px-4 py-12 lg:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 mb-16">
          <ProductImageGallery images={productImages} productName="Shoes Reebok Zig Kinetica 3" />

          <div>
            <ProductDetails
              brand="Reebok"
              name="Shoes Reebok Zig Kinetica 3"
              price={199.0}
              rating={4.8}
              reviewCount={42}
              colors={productColors}
              sizes={productSizes}
            />
          </div>
        </div>

        <ProductTabs />
        <RelatedProducts />
        <PromoBanner />
      </main>

      <Footer />
    </div>
  )
}
