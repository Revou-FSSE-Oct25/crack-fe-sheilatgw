"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { useAuth } from "@/hooks/useAuth"
import { apiFetch } from "@/lib/api"
import { LargeStatusBadge, StatusBadge } from "@/components/statusBadge"

function getStatusStyle(status: string) {
  switch (status) {
    case "PENDING_PAYMENT":
      return "bg-yellow-100 text-yellow-700"

    case "PROCESSING":
      return "bg-blue-100 text-blue-700"

    case "SHIPPED":
      return "bg-purple-100 text-purple-700"

    case "COMPLETED":
      return "bg-green-100 text-green-700"

    case "CANCELLED":
      return "bg-red-100 text-red-700"

    default:
      return "bg-gray-100 text-gray-700"
  }
}

export default function HistoryPage() {
  const router = useRouter()

  const { isLoggedIn, loading } = useAuth()

  const [orders, setOrders] = useState<any[]>([])
  const [loadingOrders, setLoadingOrders] = useState(true)

  useEffect(() => {
    if (!loading && !isLoggedIn) {
      router.push("/login")
    }
  }, [loading, isLoggedIn, router])

  useEffect(() => {
    async function fetchOrders() {
      try {
        const data = await apiFetch("/order")
        setOrders(data)
      } catch (error) {
        console.error(error)
      } finally {
        setLoadingOrders(false)
      }
    }

    if (isLoggedIn) {
      fetchOrders()
    }
  }, [isLoggedIn])

  if (loading) {
    return (
      <div className="mx-auto max-w-7xl p-20 text-center">
        <p>Loading...</p>
      </div>
    )
  }

  if (!isLoggedIn) {
    return null
  }

  return (
    <div className="mx-auto">
      <h1 className="mb-8 text-3xl font-bold text-gray-800">
        Order History
      </h1>

      {loadingOrders ? (
        <div className="rounded-2xl border border-gray-200 bg-white p-10 text-center shadow-sm">
          <p className="text-gray-500">Loading orders...</p>
        </div>
      ) : orders.length === 0 ? (
        <div className="rounded-2xl border border-gray-200 bg-white p-20 text-center shadow-sm">
          <p className="mb-4 text-xl text-gray-600">
            No order history yet
          </p>

          <Link
            href="/"
            className="font-medium text-blue-800 hover:underline"
          >
            Start shopping now
          </Link>
        </div>
      ) : (
        <div className="space-y-6">
          {orders.map((order) => {
            const isPO = order.items.some(
              (item: any) => item.product.orderType === "PO"
            )

            return (
              <div  key={order.order_id} className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
                <div className="flex items-center justify-between border-b border-gray-200 bg-gray-50 px-6 py-4">
                  <div className="flex items-center gap-4">
                    <div className="md:hidden">
                      <StatusBadge status={isPO ? "PO" : "READY_STOCK"}/>
                    </div>
                    <div className="hidden md:block">
                      <LargeStatusBadge status={isPO ? "PO" : "READY_STOCK"}/>
                    </div>
                    <div>
                      <p className="font-semibold text-gray-700">
                        Order #{order.order_id}
                      </p>

                      <p className="text-sm text-gray-500">
                        {new Date(order.createdAt).toLocaleDateString(
                          "id-ID",
                          {
                            day: "numeric",
                            month: "long",
                            year: "numeric",
                          }
                        )}
                      </p>
                    </div>
                  </div>

                  <span className={`rounded-full md:px-4 px-2 py-2 text-xs md:text-sm font-medium ${getStatusStyle(order.status)}`}>
                    {order.status.replaceAll("_", " ")}
                  </span>
                </div>

                <div className="divide-y divide-gray-100">
                  {order.items.map((item: any) => {
                    const isDP =
                      item.product.orderType === "PO" &&
                      item.price !== item.fullPrice &&
                      order.remainingAmount > 0

                    const displayPrice = order.remainingAmount <= 0 ? item.fullPrice : item.price

                    return (
                      <div
                        key={item.orderItem_id}
                        className="flex gap-5 px-6 py-5"
                      >
                        <img
                          src={item.imageUrl}
                          alt={item.productName}
                          className="h-28 w-28 rounded-xl object-cover"
                        />

                        <div className="flex flex-1 flex-col justify-between">
                          <div>
                            <p className="line-clamp-2 font-semibold text-gray-700">
                              {item.productName}
                            </p>

                            {item.product.orderType === "PO" && (
                              <p className="mt-1 text-sm text-gray-500">
                                Estimated Arrival:{" "}
                                {item.product.poEstimatedMonth}
                              </p>
                            )}
                          </div>

                          <div className="mt-4 flex items-end justify-between">
                            <div>
                              <p className="text-sm text-gray-500">
                                Qty {item.quantity}
                              </p>

                              <p className="mt-1 font-semibold text-gray-700">
                                IDR{" "}
                                {Number(displayPrice).toLocaleString(
                                  "id-ID"
                                )}

                                {isDP && (
                                  <span className="ml-2 text-sm font-normal text-gray-400">
                                    /{" "}
                                    {Number(
                                      item.fullPrice
                                    ).toLocaleString("id-ID")}
                                  </span>
                                )}
                              </p>
                            </div>

                            <p className="hidden md:block text-xl font-bold text-blue-800">
                              IDR{" "}
                              {( Number(displayPrice) * item.quantity ).toLocaleString("id-ID")}
                            </p>
                          </div>
                        </div>
                      </div>
                    )
                  })}
                </div>

                <div className="space-y-2 border-t border-gray-200 bg-gray-50 px-6 py-5">
                  <div className="flex justify-between text-sm text-gray-500">
                    <p>Total Payment</p>

                    <p>
                      IDR{" "}
                      {Number(order.totalPrice).toLocaleString(
                        "id-ID"
                      )}
                    </p>
                  </div>

                  {order.remainingAmount > 0 && (
                    <div className="space-y-3">
                      <div className="flex justify-between text-sm font-medium text-blue-800">
                        <p>Remaining Payment</p>

                        <p>
                          IDR{" "}
                          {Number(order.remainingAmount).toLocaleString(
                            "id-ID"
                          )}
                        </p>
                      </div>

                      {isPO && order.status === "PROCESSING" && (
                        <button 
                          onClick={() => {
                            localStorage.setItem("remainingPaymentOrder", JSON.stringify({
                              orderId: order.order_id,
                              remainingAmount: order.remainingAmount,
                            }))
                            router.push("/checkout/review?type=remaining")
                          }}
                          className="w-full rounded-xl bg-blue-800 py-3 font-semibold text-white transition hover:bg-blue-900"
                        >
                          Pay Now
                        </button>
                      )}
                    </div>
                  )}
                </div>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}