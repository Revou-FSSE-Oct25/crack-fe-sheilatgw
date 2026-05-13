"use client"

import { useState } from "react"
import ProductCard from "@/components/productCard"
import StatusSelect from "@/components/navigation/statusSelect"
import { StatusSwipe } from "./navigation/statusSwipe"
import { Product } from "@/types/product"

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

  const filteredProducts = products.filter((product) => {
    if (filter === "ALL") return true
    return getProductStatus(product) === filter
  })

  return (
    <div className="bg-white border border-gray-200 rounded-sm shadow-lg mb-5 md:mb-16 grid grid-cols-2 md:grid-cols-6 gap-4 p-6">
      <div className="col-span-2 md:col-span-6">
        <StatusSelect active={filter} onChange={setFilter} />
        <StatusSwipe active={filter} onChange={setFilter}/>
      </div>

      {filteredProducts.map((product) => (
        <ProductCard key={product.product_id} product={product} />
      ))}
    </div>
  )
}