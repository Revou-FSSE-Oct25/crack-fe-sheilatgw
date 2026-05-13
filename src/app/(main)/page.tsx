import Hero from "@/components/hero"
import ProductSection from "@/components/productSection"
import { apiFetch } from "@/lib/api"
import { Product } from "@/types/product"

export default async function Home() {
  const products: Product[] = await apiFetch("/product")
  return (
    <div>
      <Hero/>
      <div className="px-3 md:px-36">
        <p className="text-lg font-semibold text-gray-800 mb-4 mt-13">
          New Items, New Happiness
        </p>
        <ProductSection products={products}/>
      </div>
    </div>
  )
}
