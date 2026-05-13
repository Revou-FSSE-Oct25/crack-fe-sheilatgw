"use client"

import { useState } from "react"
import QuantitySelector from "@/components/QuantitySelector"
import { AddToCartButton } from "@/components/addToCartButton"
import {Wishlist} from "@/components/wishlist"
import { Product } from "@/types/product"

type Props = {
  product: Product
}

export default function ProductDetailClient({ product }: Props) {
  const [qty, setQty] = useState(1)
  const isAddToCartDisabled = product.isSoldOut || product.preStatus === "CLOSED"

  return (
    <>
      <QuantitySelector qty={qty} setQty={setQty} />

      <div className="mt-6 flex items-center gap-6">
        <Wishlist productId={product.product_id}/>
        <AddToCartButton disabled={isAddToCartDisabled} product={product} quantity={qty} className={`w-90 md:w-120 h-12
          ${isAddToCartDisabled ? "bg-gray-300 text-gray-500 cursor-not-allowed hover:bg-gray-400" 
                  : "bg-blue-800 text-white hover:bg-blue-900"}`}/>
      </div>
    </>
  )
}