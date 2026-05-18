"use client"

import { AdminProduct } from "@/types/adminProduct"

type Props = {
  products: AdminProduct[]
  onEdit: (product: AdminProduct) => void
  onDelete: (product: AdminProduct) => void
}

export default function ProductTable({ products, onEdit, onDelete }: Props) {
  return (
    <div className="overflow-x-auto rounded-xl border border-gray-300 bg-white">
      <table className="w-full text-sm">
        <thead className="bg-gray-100 text-left">
          <tr>
            <th className="p-3">Image</th>
            <th className="p-3">Name</th>
            <th className="p-3">Price</th>
            <th className="p-3">Type</th>
            <th className="p-3">Stock</th>
            <th className="p-3">Sold Out</th>
            <th className="p-3">Action</th>
          </tr>
        </thead>

        <tbody>
          {products.map((product) => (
            <tr key={product.product_id} className="border-t border-gray-300">
              <td className="p-3">
                <img
                  src={product.imageUrl}
                  alt={product.name}
                  className="h-16 w-16 rounded-md object-cover"
                />
              </td>

              <td className="p-3 font-medium">{product.name}</td>

              <td className="p-3">
                IDR {Number(product.price).toLocaleString("id-ID")}
              </td>

              <td className="p-3">{product.orderType}</td>
              <td className="p-3">{product.stock ?? "-"}</td>
              <td className="p-3">{product.isSoldOut ? "Yes" : "No"}</td>

              <td className="p-3">
                <button
                  onClick={() => onEdit(product)}
                  className="rounded-md bg-yellow-500 px-3 py-1 mr-2 text-white"
                >
                  Edit
                </button>
                <button
                  onClick={() => onDelete(product)}
                  className="rounded-md bg-red-600 px-3 py-1 text-white"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}