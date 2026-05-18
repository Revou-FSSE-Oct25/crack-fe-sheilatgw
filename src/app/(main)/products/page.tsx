import Link from "next/link"
import { apiFetch } from "@/lib/api"
import { Product } from "@/types/product"
import ProductCard from "@/components/productCard"
import { IoMdArrowBack, IoMdArrowForward } from "react-icons/io";

type Props = {
  searchParams: Promise<{
    search?: string
    page?: string
  }>
}

export default async function ProductsPage({ searchParams }: Props) {
  const { search, page } = await searchParams

  const products = await apiFetch(
    `/product${search ? `?search=${encodeURIComponent(search)}` : ""}`
  )

  const currentPage = Number(page) || 1
  const perPage = 40

  const totalProducts = products.length
  const totalPages = Math.ceil(totalProducts / perPage)

  const startIndex = (currentPage - 1) * perPage
  const endIndex = startIndex + perPage

  const paginatedProducts = products.slice(startIndex, endIndex)

  const createPageUrl = (pageNumber: number) => {
    const params = new URLSearchParams()

    if (search) params.set("search", search)

    params.set("page", String(pageNumber))

    return `/products?${params.toString()}`
  }

  return (
    <main className="min-h-screen bg-stone-50 p-10 md:p-20">
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-8 bg-white">

        {search && (
          <div className="mb-6">
            <h1 className="text-3xl font-bold text-gray-800">
              Search Result for "{search}"
            </h1>

            <p className="text-gray-500 mt-1">
              Showing {startIndex + 1}—
              {Math.min(endIndex, totalProducts)} of {totalProducts}
            </p>
          </div>
        )}

        {paginatedProducts.length === 0 ? (
          <div className="bg-white p-8 text-center text-gray-500">
            No products found.
          </div>
        ) : (
          <>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-x-3 gap-y-6">
              {paginatedProducts.map((product: Product) => (
                <ProductCard
                  key={product.product_id}
                  product={product}
                />
              ))}
            </div>

            {totalPages > 1 && (
              <div className="mt-10 flex justify-center gap-2 flex-wrap">
                {currentPage > 1 && (
                  <Link
                    href={createPageUrl(currentPage - 1)}
                    className="px-4 rounded-full text-sm hover:bg-gray-100"
                  >
                    <IoMdArrowBack/>
                  </Link>
                )}

                {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                  (pageNumber) => (
                    <Link
                      key={pageNumber}
                      href={createPageUrl(pageNumber)}
                      className={`px-4 py-2 rounded-full text-sm ${
                        currentPage === pageNumber
                          ? "bg-blue-800 text-white border-blue-800"
                          : "hover:bg-gray-100"
                      }`}
                    >
                      {pageNumber}
                    </Link>
                  )
                )}

                {currentPage < totalPages && (
                  <Link href={createPageUrl(currentPage + 1)} className="px-4 py-2 rounded-full text-sm hover:bg-gray-100">
                    <IoMdArrowForward/>
                  </Link>
                )}
              </div>
            )}
          </>
        )}
      </div>
    </main>
  )
}