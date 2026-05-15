"use client"

import { useEffect, useState } from "react"
import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,} from "recharts"
import { FiShoppingCart, FiDollarSign, FiTrendingUp, FiPackage,} from "react-icons/fi"
import { apiClient } from "@/lib/apiClient"

type OrderItem = {
  productName: string
  quantity: number
  price: number
  fullPrice: number
  discount?: number | null
}

type Order = {
  order_id: number
  recipientName: string
  totalPrice: number
  status: string
  createdAt: string
  items: OrderItem[]
}

export default function Dashboard() {
  const [orders, setOrders] = useState<Order[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchOrders() {
      try {
        const data = await apiClient("/order/admin/all")

        const completedOrders = data.filter(
          (order: Order) => order.status === "COMPLETED"
        )

        setOrders(completedOrders)
      } catch (error) {
        console.error(error)
      } finally {
        setLoading(false)
      }
    }

    fetchOrders()
  }, [])

  if (loading) {
    return <p>Loading dashboard...</p>
  }

  const totalOrders = orders.length

  const totalRevenue = orders.reduce(
    (sum, order) => sum + order.totalPrice,
    0
  )

  const totalItemsSold = orders.reduce((sum, order) => {
    return (
      sum +
      order.items.reduce((itemSum, item) => itemSum + item.quantity, 0)
    )
  }, 0)

  const completedOrders = orders.length

  const salesMap: Record<string, { sales: number; revenue: number }> = {}

  orders.forEach((order) => {
    const month = new Date(order.createdAt).toLocaleString("en-US", {
      month: "short",
    })

    if (!salesMap[month]) {
      salesMap[month] = {
        sales: 0,
        revenue: 0,
      }
    }

    salesMap[month].sales += 1
    salesMap[month].revenue += order.totalPrice
  })

  const salesData = Object.entries(salesMap).map(([month, value]) => ({
    month,
    sales: value.sales,
    revenue: value.revenue,
  }))

  const productMap: Record<string, { sales: number; revenue: number }> = {}

  orders.forEach((order) => {
    order.items.forEach((item) => {
      if (!productMap[item.productName]) {
        productMap[item.productName] = {
          sales: 0,
          revenue: 0,
        }
      }

      productMap[item.productName].sales += item.quantity
      productMap[item.productName].revenue += item.price * item.quantity
    })
  })

  const topProducts = Object.entries(productMap)
    .map(([name, value]) => ({
      name,
      sales: value.sales,
      revenue: value.revenue,
    }))
    .sort((a, b) => b.sales - a.sales)
    .slice(0, 5)

  const productData = topProducts.map((product, index) => ({
    name: product.name,
    value: product.sales,
    fill: ["#3b82f6", "#ef4444", "#10b981", "#f59e0b", "#8b5cf6"][index],
  }))

  const recentOrders = orders.slice(0, 5)

  const stats = [
    {
      label: "Total Orders",
      value: totalOrders.toString(),
      icon: FiShoppingCart,
      color: "bg-green-500",
    },
    {
      label: "Total Revenue",
      value: `IDR ${totalRevenue.toLocaleString("id-ID")}`,
      icon: FiDollarSign,
      color: "bg-purple-500",
    },
    {
      label: "Items Sold",
      value: totalItemsSold.toString(),
      icon: FiPackage,
      color: "bg-blue-500",
    },
    {
      label: "Completed Orders",
      value: completedOrders.toString(),
      icon: FiTrendingUp,
      color: "bg-orange-500",
    }
  ]

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-600 mt-2">
          Welcome back! Here's your business overview.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => {
          const Icon = stat.icon

          return (
            <div key={stat.label} className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm">{stat.label}</p>
                  <p className="text-2xl font-bold text-gray-900 mt-2">
                    {stat.value}
                  </p>
                </div>

                <div className={`${stat.color} p-3 rounded-full text-white`}>
                  <Icon size={24} />
                </div>
              </div>
            </div>
          )
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            Sales & Revenue
          </h2>

          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={salesData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line
                type="monotone"
                dataKey="sales"
                stroke="#3b82f6"
                strokeWidth={2}
              />
              <Line
                type="monotone"
                dataKey="revenue"
                stroke="#ef4444"
                strokeWidth={2}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            Top Products
          </h2>

          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={productData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) =>
                  `${name} ${(percent * 100).toFixed(0)}%`
                }
                outerRadius={80}
                dataKey="value"
              >
                {productData.map((entry, index) => (
                  <Cell key={index} fill={entry.fill} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">
          Monthly Performance
        </h2>

        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={salesData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="sales" fill="#3b82f6" />
            <Bar dataKey="revenue" fill="#10b981" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            Recent Orders
          </h2>

          <div className="space-y-3">
            {recentOrders.map((order) => (
              <div
                key={order.order_id}
                className="flex items-center justify-between p-3 bg-gray-50 rounded"
              >
                <div>
                  <p className="font-medium text-gray-900">
                    {order.recipientName}
                  </p>
                  <p className="text-sm text-gray-600">
                    #{order.order_id}
                  </p>
                </div>

                <div className="text-right">
                  <p className="font-semibold text-gray-900">
                    IDR {order.totalPrice.toLocaleString("id-ID")}
                  </p>
                  <span className="text-xs px-2 py-1 rounded bg-blue-100 text-blue-800">
                    {order.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            Top Products
          </h2>

          <div className="space-y-3">
            {topProducts.map((product) => (
              <div
                key={product.name}
                className="flex items-center justify-between p-3 bg-gray-50 rounded"
              >
                <div>
                  <p className="font-medium text-gray-900">
                    {product.name}
                  </p>
                  <p className="text-sm text-gray-600">
                    {product.sales} sales
                  </p>
                </div>

                <p className="font-semibold text-gray-900">
                  IDR {product.revenue.toLocaleString("id-ID")}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}