import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import StatusBadge from './statusBadge'

type Product = {
  id: number
  name: string
  price: number
  stock: number
  status: "ready" | "sold" | "PO" | "late PO" | "order close"
}


export default function ProductCard({ product }: { product: Product }) {
  return (
    <div className='bg-none rounded-sm flex flex-col h-full hover:shadow-md transition max-w-45'>
        <Link href="/product">
        <div className='h-45 w-full'>
            <Image src='/general-img-square.png' alt='try' width={45} height={45} className='w-full h-full object-contain rounded-md'/>
        </div>
        <div className='py-3'>
          <StatusBadge status={product.status}/>
          <p className='text-sm font-medium line-clamp-2'>
            {product.name}
          </p>
          <p className='text-xs font-medium text-gray-400'>Status like release date</p>
          <p className='text-base font-semibold text-blue-900 mt-3'>IDR {product.price}</p>
          <p className='text-sm text-gray-500'>DP IDR 50000</p>
        </div>
        </Link>
    </div>
  )
}

