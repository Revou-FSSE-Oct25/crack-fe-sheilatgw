"use client"

import { useState } from "react"
import ProductCard from "@/components/productCard"
import StatusSelect from "@/components/navigation/statusSelect"
import { StatusSwipe } from "./navigation/statusSwipe"
import { Product } from "@/types/product"
import { IoMdArrowBack, IoMdArrowForward } from "react-icons/io";

export type ProductStatus =
  | "ALL"
  | "READY_STOCK"
  | "PO"
  | "LATE_PO"
  | "PO_CLOSED"
  | "SOLD_OUT"

type Props = {
  products: Product[]
}

function getProductStatus(product: Product): ProductStatus {
  if (product.isSoldOut) return "SOLD_OUT"
  if (product.orderType === "READY_STOCK") return "READY_STOCK"
  if (product.preStatus === "LATE") return "LATE_PO"
  if (product.preStatus === "CLOSED") return "PO_CLOSED"
  return "PO"
}

export default function ProductSection({ products }: Props) {
  const [filter, setFilter] = useState<ProductStatus>("ALL")
  const [currentPage, setCurrentPage] = useState(1)

  const perPage = 42

  const filteredProducts = products.filter((product) => {
    if (filter === "ALL") return true
    return getProductStatus(product) === filter
  })

  const totalPages = Math.ceil(filteredProducts.length / perPage)

  const startIndex = (currentPage - 1) * perPage
  const endIndex = startIndex + perPage

  const paginatedProducts = filteredProducts.slice(startIndex, endIndex)

  return (
    <div className="bg-white border border-gray-200 rounded-sm shadow-lg mb-5 md:mb-16 grid grid-cols-2 md:grid-cols-6 gap-4 p-6">
      <div className="col-span-2 md:col-span-6">
        <StatusSelect active={filter} onChange={setFilter} />
        <StatusSwipe active={filter} onChange={setFilter} />
      </div>

      {paginatedProducts.length === 0 ? (
        <div className="col-span-2 md:col-span-6 py-10 text-center text-gray-500">
          No products found.
        </div>
      ) : (
        paginatedProducts.map((product) => (
          <ProductCard key={product.product_id} product={product} />
        ))
      )}

      {totalPages > 1 && (
        <div className="col-span-2 md:col-span-6 mt-6 flex flex-wrap justify-center gap-2">
          {currentPage > 1 && (
            <button
              onClick={() => setCurrentPage(currentPage - 1)}
              className="rounded-full px-4 py-2 text-sm hover:bg-gray-100"
            >
              <IoMdArrowBack/>
            </button>
          )}

          {Array.from({ length: totalPages }, (_, i) => i + 1).map(
            (pageNumber) => (
              <button
                key={pageNumber}
                onClick={() => setCurrentPage(pageNumber)}
                className={`rounded-full px-4 py-2 text-sm ${
                  currentPage === pageNumber
                    ? "border-blue-800 bg-blue-800 text-white"
                    : "hover:bg-gray-100"
                }`}
              >
                {pageNumber}
              </button>
            )
          )}

          {currentPage < totalPages && (
            <button
              onClick={() => setCurrentPage(currentPage + 1)}
              className="rounded-full p-2 text-sm hover:bg-gray-100"
            >
              <IoMdArrowForward/>
            </button>
          )}
        </div>
      )}
    </div>
  )
}