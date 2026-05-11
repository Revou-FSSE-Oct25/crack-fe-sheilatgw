"use client"

import React from 'react'
import { PayButton } from '@/components/checkpay'
import Link from 'next/link'
import { IoChevronForward } from "react-icons/io5"

function page() {
    const items = [
  {
    id: 1,
    title: "Sample Product",
    quantity: 1,
    price: 99.99,
    image: "https://via.placeholder.com/100",
  },
  {
    id: 2,
    title: "Sample Product",
    quantity: 1,
    price: 99.99,
    image: "https://via.placeholder.com/100",
  },
]


    const totalItems = items.reduce((sum, item) => sum + item.quantity,0)
    const totalPrice = items.reduce((sum, item) => sum + item.price * item.quantity, 0)

  return (
    <div className='max-w-350 mx-auto px-25 pb-15 pt-18'>
        <p className='font-semibold text-2xl text-gray-500 mb-2'>Shipping Details</p>
        <div className='flex gap-5'>
        <div className="flex flex-col gap-5">
            <div className="flex flex-col gap-2 border border-gray-200 shadow-sm p-5 rounded-xl w-200">
                <div className='flex justify-between items-center w-full'>
                    <p className='text-lg text-gray-700 font-semibold'>Alamat Pengiriman</p>
                    <button className='text-blue-800 cursor-pointer'>Ganti alamat</button>
                </div>
                <div className="mt-2 border-t border-gray-300 w-full"></div>
                <div className='flex justify-between items-center w-full py-3'>
                    <p className='text-lg text-gray-700 font-semibold'>Alamat Pengiriman</p>
                    <button className="w-55 flex items-center justify-between border border-gray-300 rounded-full px-3 py-3 bg-white">
                        <span className="text-gray-600 text-sm">
                            Pilih Metode
                        </span>
                        <IoChevronForward className="text-blue-700 text-xl" />
                    </button>
                </div>
                <div className=" border-t border-gray-300 w-full"></div>
                <p className="mt-2 text-gray-500 text-sm font-semibold">Notes:</p>
                <form className="space-y-2 w-full">
                    <input type="text" placeholder="Leave a message for us" className="w-full border border-gray-400 rounded-lg px-3 pb-8"/>
                </form>
            </div>
            <div className='flex-1'>
                <p className='font-semibold text-2xl text-gray-500 mb-2'>Order Details</p>
        {items.map(item => (
  <div key={item.id} className="flex items-center gap-4 mb-4 border border-gray-200 shadow-sm p-3 rounded-lg w-200">
    <img src={item.image} className="w-16 h-16 object-contain" />

    <div className="flex-1">
      <p>{item.title}</p>

      <p className="text-gray-500 text-sm">
        Quantity: {item.quantity} item(s)
      </p>
    </div>
    <p className="font-semibold text-blue-800 text-xl">
      ${item.price * item.quantity}
    </p>
  </div>
))}
            </div>
        </div>
        <div className="flex flex-col gap-2 border border-gray-200 shadow-sm p-6 rounded-lg w-90 h-65">
        <p className="text-base font-semibold text-gray-700">Payment Details</p>
        <div className='flex justify-between text-gray-500'>
            <p className='text-sm'>Subtotal <span className='text-xs'>({totalItems} items)</span></p>
            <p className='text-sm'>{totalPrice.toFixed(2)} USD</p>
        </div>
        <div className='flex justify-between text-gray-500'>
            <p className='text-sm'>Shipping Fee</p>
            <p className='text-sm text-green-700'>Free</p>
        </div>
        <div className="mt-1 border-t-2 border-gray-200"></div>
        <div className='flex justify-between mb-10'>
            <p className='text-lg font-semibold text-gray-700'>Grand Total</p>
            <p className='text-sm font-bold text-blue-800'>{totalPrice.toFixed(2)} USD</p>
        </div>
        <PayButton/>
      </div>
        </div>
    </div>
  )
}

export default page