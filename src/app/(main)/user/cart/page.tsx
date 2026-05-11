"use client"

import Link from "next/link";
import { IoMdAdd } from "react-icons/io";
import { FiMinus } from "react-icons/fi";
import { FaRegTrashAlt } from "react-icons/fa";
import { CheckoutButton } from "@/components/checkpay";

export default function CartPage() {
    const items: any[] = []

    const increaseQty = (id: any) => {}
    const decreaseQty = (id: any) => {}
    const removeItem = (id: any) => {}
  const totalPrice = items.reduce(
    (sum, item) => sum + item.price * item.quantity, 0)

  return (
    <div className="max-w-350 mx-auto p-25">
        <h1 className="text-xl font-bold mb-4">Shopping Cart</h1>
        <div className="flex item-center gap-4">
        <div className="">
      {items.length === 0 && <div className="flex flex-col items-center justify-center gap-4 mb-4 border border-gray-200 shadow-sm p-3 rounded-lg w-200 h-30">
        <p className="text-xl">You haven't add anything</p>
        <Link href="/" className="text-blue-800">Let's start shopping!</Link>
        </div>
        }

      {items.map(item => (
        <div key={item.id} className="flex items-center gap-4 mb-4 border border-gray-200 shadow-sm p-3 rounded-lg w-200">
          <img src={item.image} className="w-16 h-16 object-contain" />

          <div className="flex-1">
            <p>{item.title}</p>
             <p>${item.price}</p>
          </div>

          <div className="flex flex-col items-center gap-2">
            <p className="self-end font-semibold text-blue-800 text-xl">${item.price * item.quantity}</p>
            <div className="flex items-center">
                <button onClick={() => removeItem(item.id)} className="mr-5"><FaRegTrashAlt/></button>
                <div className="flex items-center gap-4 border-3 border-gray-200 px-5 py-1 rounded-2xl">
                <button onClick={() => decreaseQty(item.id)} className="text-gray-400"><FiMinus size={20}/></button>
                <span>{item.quantity}</span>
                <button onClick={() => increaseQty(item.id)} className="text-blue-800"><IoMdAdd size={20}/></button>
                </div>
            </div>
          </div>
        </div>
      ))}
      </div>
      <div className="flex flex-col items-center gap-2 border border-gray-200 shadow-sm p-6 rounded-lg w-90 h-65">
        <p className="justify-center uppercase text-lg text-gray-500">Total Price</p>
        <h2 className=" font-bold text-2xl">IDR {totalPrice.toFixed(2)}</h2>
        <CheckoutButton/>
        <div className="mt-3 border-t-2 border-gray-200">
            <p className="text-xs text-gray-500 font-normal pt-5">Shipping fee will be calculated when checkout</p>
            <p className="text-xs text-gray-500 font-normal mt-2 mb-5">If choosing DP as payment option, shipping fee will be invoiced when the item is arrived.</p>
        </div>
      </div>
        </div>
      
    </div>
  )
}