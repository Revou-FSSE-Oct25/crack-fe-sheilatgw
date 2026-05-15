export type Product = {
  product_id: number

  name: string
  slug: string

  price: number
  description: string

  stock?: number | null

  orderType: "READY_STOCK" | "PO"
  preStatus?: "NORMAL" | "LATE" | "CLOSED" | null

  poReleaseMonth?: string | null
  poEstimatedMonth?: string | null

  isSoldOut: boolean

  imageUrl: string

  minimumDP?: number | null
  fullPaymentPrice?: number | null
  fullPaymentDiscount?: number | null

  categoryId: number
  characterId: number
  seriesId: number
  manufacturerId: number

  category?: {
    name: string
  }

  character?: {
    name: string
  }

  series?: {
    name: string
  }

  manufacturer?: {
    name: string
  }

  poDeadline?: string | null
}