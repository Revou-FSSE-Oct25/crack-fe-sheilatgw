import { redirect } from "next/navigation"
import { apiFetch } from "@/lib/api"

export default async function ProductRedirectPage({ params,}: { params: Promise<{ id: string }>}) {
  const { id } = await params

  const product = await apiFetch(`/product/${id}`)

  redirect(`/products/${id}/${product.slug}`)
}