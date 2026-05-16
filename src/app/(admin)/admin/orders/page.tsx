"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { apiClient } from "@/lib/apiClient"

type Order = {
  order_id: number

  recipientName: string
  phoneNumber: string

  shippingMethod: string
  courier: string
  shippingService: string

  paymentMethod: string

  subtotalPrice: number
  shippingCost: number
  totalPrice: number
  remainingAmount: number

  totalDiscount?: number | null

  status: string

  createdAt: string

  user?: {
    user_id: number
    email: string
    username?: string | null
    name?: string | null
  }
}

function formatPrice(price: number) {
  return `IDR ${price.toLocaleString("id-ID")}`
}

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


export default function AdminOrderPage() {
  const [orders, setOrders] = useState<Order[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchOrders() {
      try {
        const data = await apiClient("/order/admin/all")
        setOrders(data)
      } catch (error) {
        console.error(error)
      } finally {
        setLoading(false)
      }
    }

    fetchOrders()
  }, [])

  if (loading) {
    return (
      <div className="p-6">
        <p className="text-gray-500">Loading orders...</p>
      </div>
    )
  }

  async function handleStatusChange(
  orderId: number,
  status: string
) {
  try {
    await apiClient(`/order/${orderId}/status`, {
      method: "PATCH",
      body: JSON.stringify({ status }),
    })

    setOrders((prev) =>
      prev.map((order) =>
        order.order_id === orderId
          ? { ...order, status }
          : order
      )
    )
  } catch (error) {
    console.error(error)
    alert("Failed to update status")
  }
}
  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-gray-800">
          Order Management
        </h1>

        <p className="mt-1 text-sm text-gray-500">
          Manage all customer orders.
        </p>
      </div>

      <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white">
        <div className="overflow-x-auto">
          <table className="w-full min-w-250 text-sm">
            <thead className="bg-gray-50">
              <tr className="text-left text-gray-600">
                <th className="px-5 py-4 font-medium">Order</th>
                <th className="px-5 py-4 font-medium">Customer</th>
                <th className="px-5 py-4 font-medium">Shipping</th>
                <th className="px-5 py-4 font-medium">Payment</th>
                <th className="px-5 py-4 font-medium">Total</th>
                <th className="px-5 py-4 font-medium">Status</th>
                <th className="px-5 py-4 font-medium">Date</th>
              </tr>
            </thead>

            <tbody>
              {orders.length === 0 ? (
                <tr>
                  <td
                    colSpan={8}
                    className="px-5 py-10 text-center text-gray-500"
                  >
                    No orders found.
                  </td>
                </tr>
              ) : (
                orders.map((order) => (
                  <tr
                    key={order.order_id}
                    className="border-t border-gray-100"
                  >
                    <td className="px-5 py-4">
                      <p className="font-semibold text-gray-800">
                        #{order.order_id}
                      </p>

                      <p className="mt-1 text-xs text-gray-500">
                        {order.phoneNumber}
                      </p>
                    </td>

                    <td className="px-5 py-4">
                      <p className="font-medium text-gray-800">
                        {order.recipientName}
                      </p>

                      <p className="mt-1 text-xs text-gray-500">
                        {order.user?.email}
                      </p>
                    </td>

                    <td className="px-5 py-4">
                      <p className="font-medium text-gray-700">
                        {order.shippingMethod}
                      </p>

                      <p className="mt-1 text-xs text-gray-500">
                        {order.courier} - {order.shippingService}
                      </p>
                    </td>

                    <td className="px-5 py-4 text-gray-700">
                      {order.paymentMethod}
                    </td>

                    <td className="px-5 py-4">
                      <p className="font-semibold text-blue-700">
                        {formatPrice(order.totalPrice)}
                      </p>

                      {order.remainingAmount > 0 && (
                        <p className="mt-1 text-xs text-blue-800">
                          Remaining:{" "}
                          {formatPrice(order.remainingAmount)}
                        </p>
                      )}
                    </td>

                    <td className="px-5 py-4">
                        <select
                            value={order.status}
                            onChange={(e) =>
                            handleStatusChange(order.order_id, e.target.value)
                            }
                            className={`rounded-xl border px-2 py-1 text-xs font-semibold outline-none ${getStatusStyle(
                            order.status
                            )}`}
                        >
                            <option value="PENDING_PAYMENT">
                            PENDING_PAYMENT
                            </option>

                            <option value="PAID">
                            PAID
                            </option>

                            <option value="PROCESSING">
                            PROCESSING
                            </option>

                            <option value="SHIPPED">
                            SHIPPED
                            </option>

                            <option value="COMPLETED">
                            COMPLETED
                            </option>

                            <option value="CANCELLED">
                            CANCELLED
                            </option>
                        </select>
                    </td>

                    <td className="px-5 py-4 text-gray-500">
                      {new Date(order.createdAt).toLocaleDateString(
                        "id-ID",
                        {
                          day: "2-digit",
                          month: "short",
                          year: "numeric",
                        }
                      )}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}