import Link from 'next/link'
import { useState } from 'react'
import {StatusBadge} from './statusBadge'
import { Product } from '@/types/product'
import { AddToCartButton } from './addToCartButton'
import { UnWishlist } from './wishlist'

function getProductStatus(product: Product) {
  if (product.isSoldOut) return "SOLD_OUT"
  if (product.orderType === "READY_STOCK") return "READY_STOCK"
  if (product.preStatus === "LATE") return "LATE_PO"
  if (product.preStatus === "CLOSED") return "PO_CLOSED"
  return "PO"
}

function getMinimumDP(price: number) {
  if (price <= 200000) return 50000
  if (price <= 700000) return 100000
  if (price <= 1000000) return 200000
  if (price <= 1500000) return 300000
  if (price <= 2000000) return 800000
  if (price <= 3000000) return 1500000

  return 2000000
}

export default function WishlistCard({ product }: { product: Product }) {
  const productWithPayment = {
  ...product,
  minimumDP: getMinimumDP(Number(product.price)),
  fullPaymentPrice: Number(product.price),
}
  console.log("wishlist card product:", product)
console.log("minimumDP:", product.minimumDP)
    const [qty, setQty] = useState(1)
  return (
    <div className='bg-none rounded-sm flex flex-col h-full hover:shadow-md transition max-w-45'>
        <Link href={`/products/${product.product_id}/${product.slug}`}>
        <div className='h-45 w-full'>
            <img src={product.imageUrl} alt='try' width={45} height={45} className='w-full h-full object-contain rounded-md'/>
        </div>
        <div className='py-2'>
          <StatusBadge status={getProductStatus(product)}/>
          <p className='text-sm font-medium line-clamp-2'>
            {product.name}
          </p>
          {product.orderType === "PO" && (
            <p className='text-xs text-gray-500 mb-3'>Releases {product.poReleaseMonth}</p>
          )}
          <p className={`text-base font-semibold text-blue-900 ${product.orderType === "READY_STOCK" || product.isSoldOut
            ? "mt-12" : ""}`}>
            IDR {Number(product.price).toLocaleString('id-ID')}
          </p>
          {product.minimumDP && (
            <p className='text-sm text-gray-500'>
              DP IDR {productWithPayment.minimumDP.toLocaleString('id-ID')}
            </p>
          )}
        </div>
        </Link>
        <div className="flex gap-0.5 -mt-1">
            <AddToCartButton product={productWithPayment} quantity={qty} className="rounded-2xl w-38"/>
            <UnWishlist productId={product.product_id}/> 
        </div>
    </div>
  )
}

