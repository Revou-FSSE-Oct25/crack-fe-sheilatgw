"use client"

import { useEffect } from "react"
import Link from "next/link"
import { CheckoutButton } from "@/components/checkpay"
import CartItem from "@/components/cartItem"
import { useCartStore } from "@/store/useCartStore"
import { useCartSelection } from "@/hooks/useCartSelection"
import { useWishlistStore } from "@/store/useWishlistStore"

export default function CartPage() {
  const items = useCartStore((state) => state.items)
  const fetchCart = useCartStore((state) => state.fetchCart)
  const increaseQty = useCartStore((state) => state.increaseQty)
  const decreaseQty = useCartStore((state) => state.decreaseQty)
  const removeItem = useCartStore((state) => state.removeItem)
  const fetchWishlist = useWishlistStore((state) => state.fetchWishlist)

  useEffect(() => {
    fetchCart()
    fetchWishlist()
  }, [fetchCart, fetchWishlist])

  const {selectedItems, totalPrice, groupedItems, allSelected, toggleItem, toggleAll,} = useCartSelection(items)

  return (
    <>
      <div className="hidden md:block max-w-350 mx-auto p-25">
        <h1 className="text-xl font-bold mb-4">Shopping Cart</h1>

        <div className="flex item-center gap-4">
          <div>
            {items.length > 0 && (
              <div className="mb-4 flex w-200 items-center gap-5 rounded-lg border border-gray-300
               bg-white px-6 py-4 shadow-sm">
                <input
                  type="checkbox"
                  checked={allSelected}
                  onChange={toggleAll}
                  className="h-6 w-6 accent-blue-700 cursor-pointer"
                />
                <p className="text-lg font-semibold text-gray-600">Select All</p>
              </div>
            )}
            {items.length === 0 && (
              <div className="flex flex-col bg-white items-center justify-center gap-4 mb-4 border-2
               border-gray-300 shadow-sm p-3 rounded-lg w-200 h-30">
                <p className="text-xl">You haven't add anything</p>
                <Link href="/" className="text-blue-800">
                  Let's start shopping!
                </Link>
              </div>
            )}

            {Object.entries(groupedItems).map(([orderType, groupedItems]: any) => (
              <CartItem
                key={orderType}
                items={groupedItems}
                increaseQty={increaseQty}
                decreaseQty={decreaseQty}
                removeItem={removeItem}
                selectedItems={selectedItems}
                toggleItem={toggleItem}
              />
            ))}
          </div>

          <div className="sticky top-25 flex flex-col items-center gap-2 bg-white border border-gray-200 shadow-sm p-6 rounded-lg w-90 h-65">
            <p className="justify-center uppercase text-lg text-gray-500">
              Total Price
            </p>

            <h2 className="font-bold text-2xl">
              IDR {totalPrice.toLocaleString("id-ID")}
            </h2>

            <CheckoutButton selectedItems={selectedItems}/>

            <div className="mt-3 border-t-2 border-gray-200">
              <p className="text-xs text-gray-500 font-normal pt-5">
                Shipping fee will be calculated when checkout
              </p>
              <p className="text-xs text-gray-500 font-normal mt-2 mb-5">
                If choosing DP as payment option, shipping fee will be invoiced
                when the item is arrived.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="md:hidden min-h-screen py-22 px-3">
        <div className="bg-white p-4 border-b border-gray-200 sticky top-12">
          <p className="text-2xl text-gray-900 font-medium">Shopping Cart</p>
        </div>
        <div className="bg-white p-4 border-b border-gray-200">isi lain</div>
      </div>
    </>
  )
}