"use client"

import { useEffect, useState } from "react"
import { useCartStore } from "@/store/useCartStore"

export default function OrderItem() {
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

  const currentMonth = new Date().toLocaleDateString("en-US", {
    month: "long", year: "numeric",
  })

  const groupedItems = checkoutItems.reduce((acc, item) => {
    const groupKey =
      item.product.poEstimatedMonth ?? currentMonth

    if (!acc[groupKey]) {
      acc[groupKey] = []
    }

    acc[groupKey].push(item)

    return acc
  }, {} as Record<string, typeof checkoutItems>)

  return (
    <div className="md:space-y-6">
      {Object.entries(groupedItems).map(([month, groupItems]) => (
        <div key={month} className="overflow-hidden rounded-none md:rounded-xl border-none md:border border-gray-300 bg-white shadow-sm">
          <div className="border-b border-gray-200 bg-gray-200 md:bg-gray-100 px-6 py-4">
            <p className="font-semibold text-gray-700 text-sm">
             <span className="text-gray-500">Delivery Estimate:</span> {month}
            </p>
          </div>

          <div className="divide-y divide-gray-200">
            {groupItems.map((item) => {
              let price
              if (
                item.product.orderType === "PO" &&
                item.dpAmount == null
              ) {
                const stored = fullPaymentPrices[item.product.product_id]
                price = stored?.fullPaymentPrice
                  ? Number(stored.fullPaymentPrice)
                  : Number(item.product.fullPaymentPrice ?? item.product.price)
              } else if (
                item.product.orderType === "PO" &&
                item.dpAmount != null
              ) {
                price = Number(item.dpAmount)
              } else {
                price = Number(item.product.price)
              }

              return (
                <div key={item.cart_id}>
                  <div className="flex w-full items-center gap-4 md:h-30 px-4 pt-4 pb-2">
                    <img src={item.product.imageUrl}
                      alt={item.product.name}
                      className="h-16 w-16 object-contain rounded-lg"
                    />

                    <div className="flex-1">
                      <p className="text-base font-medium text-gray-800 line-clamp-2">
                        {item.product.name}
                      </p>

                      <p className="text-sm font-semibold text-gray-600">
                        IDR {price.toLocaleString("id-ID")}

                        {item.product.orderType === "PO" &&
                          item.dpAmount != null && (
                            <span className="font-normal text-gray-400">
                              {" "}
                              /{" "}
                              {Number(item.product.price).toLocaleString("id-ID")}
                            </span>
                          )}
                      </p>
                    </div>

                    <div className="hidden md:block">
                      <p className="text-xl font-semibold text-blue-800">
                        IDR {(price * item.quantity).toLocaleString("id-ID")}
                      </p>

                      <p className="text-right text-sm text-gray-500">
                        Qty {item.quantity}
                      </p>
                    </div>
                  </div>

                  <div className="mx-4 border-t-2 border-dashed border-gray-300 md:hidden" />

                  <div className="flex items-center justify-between px-4 py-3 md:hidden">
                    <p className="text-xl font-semibold text-blue-800">
                      IDR {(price * item.quantity).toLocaleString("id-ID")}
                    </p>

                    <p className="border rounded-full py-1 px-2 text-sm text-gray-500">
                      Qty {item.quantity}
                    </p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      ))}
    </div>
  )
}