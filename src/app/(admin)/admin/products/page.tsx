"use client"

import { useEffect, useState } from "react"
import ProductModal from "@/components/admin/products/productModal"
import ProductTable from "@/components/admin/products/productTable"
import { getProducts, deleteProduct } from "@/lib/apiProduct"
import { AdminProduct } from "@/types/adminProduct"

export default function AdminProductsPage() {
  const [products, setProducts] = useState<AdminProduct[]>([])
  const [modalOpen, setModalOpen] = useState(false)
  const [selectedProduct, setSelectedProduct] = useState<AdminProduct | null>(
    null,
  )

  async function fetchProducts() {
    const data = await getProducts()
    setProducts(data)
  }

  useEffect(() => {
    fetchProducts()
  }, [])

  function handleAdd() {
    setSelectedProduct(null)
    setModalOpen(true)
  }

  function handleEdit(product: AdminProduct) {
    setSelectedProduct(product)
    setModalOpen(true)
  }

  async function handleDelete(product: AdminProduct) {
  const confirmed = confirm(
    `Delete "${product.name}" ?`,
  )

  if (!confirmed) return

  try {
    await deleteProduct(product.product_id)
    await fetchProducts()
  } catch (error) {
    console.error(error)
    alert("Failed to delete product")
  }
}

  return (
    <div className="p-6">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold text-blue-900">Product Admin</h1>

        <button
          onClick={handleAdd}
          className="rounded-md bg-blue-800 px-4 py-2 text-sm text-white"
        >
          Add Product
        </button>
      </div>

      <ProductTable products={products} onEdit={handleEdit} onDelete={handleDelete}/>

      <ProductModal
        open={modalOpen}
        product={selectedProduct}
        onClose={() => setModalOpen(false)}
        onSuccess={fetchProducts}
      />
    </div>
  )
}