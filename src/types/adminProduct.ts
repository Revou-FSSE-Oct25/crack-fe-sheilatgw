import { Product } from "@/types/product"

export type Option = {
  category_id?: number
  chara_id?: number
  manuf_id?: number
  series_id?: number
  name: string
}

export type AdminProduct = Product & {
  categoryId: number
  characterId: number
  seriesId: number
  manufacturerId: number
  poDeadline?: string | null
  category?: Option
  character?: Option
  series?: Option
  manufacturer?: Option
}

export type ProductForm = {
  name: string
  price: number | ""
  description: string
  stock: number | ""
  orderType: "READY_STOCK" | "PO"
  preStatus: "NORMAL" | "LATE" | "CLOSED" | ""
  poDeadline: string
  poReleaseMonth: string
  isSoldOut: boolean
  imageUrl: string
  categoryId: number
  characterId: number
  seriesId: number
  manufacturerId: number
}