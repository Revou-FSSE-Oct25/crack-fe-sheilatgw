"use client"

import React, { useEffect, useState } from "react"
import { PayButton } from "@/components/checkpay"
import { IoChevronForward } from "react-icons/io5"
import { useCartStore } from "@/store/useCartStore"
import OrderItem from "@/components/orderItem"

function Page() {
  const items = useCartStore((state) => state.items)
  const fetchCart = useCartStore((state) => state.fetchCart)

  const [selectedCartIds, setSelectedCartIds] = useState<number[]>([])

  const fullPaymentPrices = JSON.parse(
    typeof window !== "undefined"
      ? localStorage.getItem("fullPaymentPrices") || "{}"
      : "{}"
  )

  useEffect(() => {
    fetchCart()

    const saved = localStorage.getItem("selectedCartIds")

    if (saved) {
      setSelectedCartIds(JSON.parse(saved))
    }
  }, [fetchCart])

  const checkoutItems = items.filter((item) =>
    selectedCartIds.includes(item.cart_id)
  )

  const totalItems = checkoutItems.reduce(
    (sum, item) => sum + item.quantity,
    0
  )

  const totalPrice = checkoutItems.reduce((sum, item) => {
    let price
    if (item.product.orderType === "PO" && item.dpAmount == null) {
      const stored = fullPaymentPrices[item.product.product_id]
      price = stored?.fullPaymentPrice
        ? Number(stored.fullPaymentPrice)
        : Number(item.product.fullPaymentPrice ?? item.product.price)
    } else if (item.product.orderType === "PO" && item.dpAmount != null) {
      price = Number(item.dpAmount)
    } else {
      price = Number(item.product.price)
    }

    return sum + price * item.quantity
  }, 0)

  return (
    <div className="max-w-350 mx-auto px-25 pb-15 pt-18">
      <p className="mb-2 text-2xl font-semibold text-gray-500">
        Shipping Details
      </p>

      <div className="flex gap-5">
        <div className="flex flex-col gap-5">
          <div className="flex w-200 flex-col gap-2 rounded-xl border border-gray-200 p-5 shadow-sm">
            <div className="flex w-full items-center justify-between">
              <p className="text-lg font-semibold text-gray-700">
                Alamat Pengiriman
              </p>

              <button className="cursor-pointer text-blue-800">
                Ganti alamat
              </button>
            </div>

            <div className="mt-2 w-full border-t border-gray-300"></div>

            <div className="flex w-full items-center justify-between py-3">
              <p className="text-lg font-semibold text-gray-700">
                Alamat Pengiriman
              </p>

              <button className="flex w-55 items-center justify-between rounded-full border border-gray-300 bg-white px-3 py-3">
                <span className="text-sm text-gray-600">
                  Pilih Metode
                </span>

                <IoChevronForward className="text-xl text-blue-700" />
              </button>
            </div>

            <div className="w-full border-t border-gray-300"></div>

            <p className="mt-2 text-sm font-semibold text-gray-500">
              Notes:
            </p>

            <form className="w-full space-y-2">
              <input
                type="text"
                placeholder="Leave a message for us"
                className="w-full rounded-lg border border-gray-400 px-3 pb-8"
              />
            </form>
          </div>
 
          <div className="flex-1">
            <p className="mb-2 text-2xl font-semibold text-gray-500">
              Detail Pesanan
            </p>
            <OrderItem />
          </div>
        </div>

        <div className="sticky top-25 flex h-65 w-90 flex-col gap-2 rounded-lg border border-gray-200 p-6 shadow-sm">
          <p className="text-xl font-semibold text-gray-700">
            Payment Details
          </p>

          <div className="flex justify-between text-gray-500">
            <p className="text-sm">
              Subtotal{" "}
              <span className="text-xs">
                ({totalItems} items)
              </span>
            </p>

            <p className="text-sm">
              IDR {totalPrice.toLocaleString("id-ID")}
            </p>
          </div>

          <div className="flex justify-between text-gray-500">
            <p className="text-sm">Shipping Fee</p>

            <p className="text-sm text-green-700">Free</p>
          </div>

          <div className="mt-1 border-t-2 border-gray-200"></div>

          <div className="mb-10 flex justify-between">
            <p className="text-lg font-semibold text-gray-700">
              Grand Total
            </p>

            <p className="text-sm font-bold text-blue-800">
              IDR {totalPrice.toLocaleString("id-ID")}
            </p>
          </div>

          <PayButton />
        </div>
      </div>
    </div>
  )
}

export default Page