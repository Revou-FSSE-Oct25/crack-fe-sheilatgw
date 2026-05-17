import Link from "next/link"
import { apiFetch } from "@/lib/api"
import { Product } from "@/types/product"
import ProductCard from "@/components/productCard"

type Props = {
  searchParams: Promise<{
    search?: string
  }>
}

export default async function ProductsPage({ searchParams }: Props) {
  const { search } = await searchParams

  const products = await apiFetch(
    `/product${search ? `?search=${encodeURIComponent(search)}` : ""}`
  )

  return (
    <main className="min-h-screen bg-stone-50 p-10 md:p-20">
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-8 bg-white">

        {search && (
          <div className="mb-6">
            <h1 className="text-3xl font-bold text-gray-800">
                Search Result for "{search}"
            </h1>

            <p className="text-gray-500 mt-1">
                Showing 1—{products.length} of {products.length}
            </p>
         </div>
        )}

        {products.length === 0 ? (
          <div className="bg-white p-8 text-center text-gray-500">
            No products found.
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-x-3 gap-y-6">
                {products.map((product: Product) => (
                <ProductCard key={product.product_id} product={product} />
                ))}
          </div>
        )}
      </div>
    </main>
  )
}