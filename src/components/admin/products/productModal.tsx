"use client"

import { useEffect, useState } from "react"
import SearchSelect from "./searchSelect"
import { createProduct, getCategories, getCharacters, getManufacturers, getSeries, updateProduct } from "@/lib/apiProduct"
import { AdminProduct, Option, ProductForm } from "@/types/adminProduct"
import { apiFetch } from "@/lib/api"

const initialForm: ProductForm = {
  name: "",
  price: "",
  description: "",
  stock: "",
  orderType: "READY_STOCK",
  preStatus: "",
  poDeadline: "",
  poReleaseMonth: "",
  isSoldOut: false,
  imageUrl: "",
  categoryId: 0,
  characterId: 0,
  seriesId: 0,
  manufacturerId: 0,
}

type Props = {
  open: boolean
  product: AdminProduct | null
  onClose: () => void
  onSuccess: () => void
}

export default function ProductModal({
  open,
  product,
  onClose,
  onSuccess,
}: Props) {
  const [form, setForm] = useState<ProductForm>(initialForm)
  const [loading, setLoading] = useState(false)

  const [categories, setCategories] = useState<Option[]>([])
  const [characters, setCharacters] = useState<Option[]>([])
  const [manufacturers, setManufacturers] = useState<Option[]>([])
  const [series, setSeries] = useState<Option[]>([])

  const [categorySearch, setCategorySearch] = useState("")
  const [characterSearch, setCharacterSearch] = useState("")
  const [seriesSearch, setSeriesSearch] = useState("")
  const [manufacturerSearch, setManufacturerSearch] = useState("")

  useEffect(() => {
    if (!open) return

    async function fetchOptions() {
      const [categoryData, characterData, manufacturerData, seriesData] =
        await Promise.all([
          getCategories(),
          getCharacters(),
          getManufacturers(),
          getSeries(),
        ])

      setCategories(categoryData)
      setCharacters(characterData)
      setManufacturers(manufacturerData)
      setSeries(seriesData)
    }

    fetchOptions()
  }, [open])

  useEffect(() => {
    if (!open) return

    if (!product) {
      setForm(initialForm)
      setCategorySearch("")
      setCharacterSearch("")
      setSeriesSearch("")
      setManufacturerSearch("")
      return
    }

    setForm({
      name: product.name,
      price: Number(product.price),
      description: product.description,
      stock: product.stock ?? "",
      orderType: product.orderType,
      preStatus: product.preStatus ?? "",
      poDeadline: product.poDeadline ? product.poDeadline.slice(0, 10) : "",
      poReleaseMonth: product.poReleaseMonth ?? "",
      isSoldOut: product.isSoldOut,
      imageUrl: product.imageUrl,
      categoryId: product.categoryId,
      characterId: product.characterId,
      seriesId: product.seriesId,
      manufacturerId: product.manufacturerId,
    })

    setCategorySearch(product.category?.name ?? "")
    setCharacterSearch(product.character?.name ?? "")
    setSeriesSearch(product.series?.name ?? "")
    setManufacturerSearch(product.manufacturer?.name ?? "")
  }, [open, product])

  async function handleCreateOption(
  type: "character" | "series" | "manufacturer",
  name: string,
) {
  const endpointMap = {
    character: "/characters",
    series: "/series",
    manufacturer: "/manufacturers",
  }

  const created = await apiFetch(endpointMap[type], {
    method: "POST",
    body: JSON.stringify({ name }),
  })

  if (type === "character") {
    setCharacters((prev) => [...prev, created])
    setForm((prev) => ({ ...prev, characterId: created.chara_id }))
    setCharacterSearch(created.name)
  }

  if (type === "series") {
    setSeries((prev) => [...prev, created])
    setForm((prev) => ({ ...prev, seriesId: created.series_id }))
    setSeriesSearch(created.name)
  }

  if (type === "manufacturer") {
    setManufacturers((prev) => [...prev, created])
    setForm((prev) => ({ ...prev, manufacturerId: created.manuf_id }))
    setManufacturerSearch(created.name)
  }
}

  function handleChange(
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) {
    const { name, value, type } = e.target

    if (name === "orderType") {
      setForm((prev) => ({
        ...prev,
        orderType: value as "READY_STOCK" | "PO",
        preStatus: value === "READY_STOCK" ? "" : prev.preStatus,
        poDeadline: value === "READY_STOCK" ? "" : prev.poDeadline,
        poReleaseMonth: value === "READY_STOCK" ? "" : prev.poReleaseMonth,
      }))
      return
    }

    setForm((prev) => ({
      ...prev,
      [name]:
        type === "checkbox"
          ? (e.target as HTMLInputElement).checked
          : ["price", "stock"].includes(name)
            ? value === ""
              ? ""
              : Number(value)
            : value,
    }))
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()

    const payload = {
      name: form.name,
      price: Number(form.price),
      description: form.description,
      stock: form.stock === "" ? undefined : Number(form.stock),
      orderType: form.orderType,
      preStatus:
        form.orderType === "PO" && form.preStatus ? form.preStatus : undefined,
      poDeadline:
        form.orderType === "PO" && form.poDeadline ? form.poDeadline : undefined,
      poReleaseMonth:
        form.orderType === "PO" && form.poReleaseMonth
          ? form.poReleaseMonth
          : undefined,
      isSoldOut: form.isSoldOut,
      imageUrl: form.imageUrl,
      categoryId: form.categoryId,
      characterId: form.characterId,
      seriesId: form.seriesId,
      manufacturerId: form.manufacturerId,
    }

    try {
      setLoading(true)

      if (product) {
        await updateProduct(product.product_id, payload)
      } else {
        await createProduct(payload)
      }

      onSuccess()
      onClose()
    } finally {
      setLoading(false)
    }
  }

  if (!open) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <form
        onSubmit={handleSubmit}
        className="max-h-[90vh] w-[90%] max-w-3xl overflow-y-auto rounded-xl bg-white p-6"
      >
        <div className="mb-4 flex justify-between">
          <h2 className="text-xl font-bold">
            {product ? "Edit Product" : "Add Product"}
          </h2>

          <button type="button" onClick={onClose}>
            ✕
          </button>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Product name"
            className="rounded-md border p-2"
            required
          />

          <input
            name="price"
            type="number"
            value={form.price}
            onChange={handleChange}
            placeholder="Price"
            className="rounded-md border p-2"
            required
          />

          <input
            name="stock"
            type="number"
            value={form.stock}
            onChange={handleChange}
            placeholder="Stock optional"
            className="rounded-md border p-2"
          />

          <input
            name="imageUrl"
            value={form.imageUrl}
            onChange={handleChange}
            placeholder="Image URL"
            className="rounded-md border p-2"
            required
          />

          <select
            name="orderType"
            value={form.orderType}
            onChange={handleChange}
            className="rounded-md border p-2"
          >
            <option value="READY_STOCK">READY_STOCK</option>
            <option value="PO">PO</option>
          </select>

          <label className="flex items-center gap-2 rounded-md border p-2 text-sm">
            <input
              type="checkbox"
              name="isSoldOut"
              checked={form.isSoldOut}
              onChange={handleChange}
            />
            Sold Out
          </label>

          {form.orderType === "PO" && (
            <>
              <select
                name="preStatus"
                value={form.preStatus}
                onChange={handleChange}
                className="rounded-md border p-2"
              >
                <option value="">No PO Status</option>
                <option value="NORMAL">NORMAL</option>
                <option value="LATE">LATE</option>
                <option value="CLOSED">CLOSED</option>
              </select>

              <input
                name="poDeadline"
                type="date"
                value={form.poDeadline}
                onChange={handleChange}
                className="rounded-md border p-2"
              />

              <input
                name="poReleaseMonth"
                value={form.poReleaseMonth}
                onChange={handleChange}
                placeholder="PO Release Month"
                className="rounded-md border p-2"
              />
            </>
          )}

          <SearchSelect
            value={categorySearch}
            onChange={setCategorySearch}
            placeholder="Category"
            options={categories.map((item) => ({
              id: item.category_id!,
              name: item.name,
            }))}
            onSelect={(item) =>
              setForm((prev) => ({ ...prev, categoryId: item.id }))
            }
          />

          <SearchSelect
          value={characterSearch}
          onChange={setCharacterSearch}
          placeholder="Character"
          options={characters.map((item) => ({
            id: item.chara_id!,
            name: item.name,
          }))}
          onSelect={(item) =>
            setForm((prev) => ({ ...prev, characterId: item.id }))
          }
          onCreate={(name) => handleCreateOption("character", name)}
        />

        <SearchSelect
          value={seriesSearch}
          onChange={setSeriesSearch}
          placeholder="Series"
          options={series.map((item) => ({
            id: item.series_id!,
            name: item.name,
          }))}
          onSelect={(item) =>
            setForm((prev) => ({ ...prev, seriesId: item.id }))
          }
          onCreate={(name) => handleCreateOption("series", name)}
        />

        <SearchSelect
          value={manufacturerSearch}
          onChange={setManufacturerSearch}
          placeholder="Manufacturer"
          options={manufacturers.map((item) => ({
            id: item.manuf_id!,
            name: item.name,
          }))}
          onSelect={(item) =>
            setForm((prev) => ({ ...prev, manufacturerId: item.id }))
          }
          onCreate={(name) => handleCreateOption("manufacturer", name)}
        />
        </div>

        <textarea
          name="description"
          value={form.description}
          onChange={handleChange}
          placeholder="Description"
          className="mt-4 min-h-32 w-full rounded-md border p-2"
          required
        />

        <button
          disabled={
            loading ||
            !form.categoryId ||
            !form.characterId ||
            !form.seriesId ||
            !form.manufacturerId
          }
          className="mt-6 w-full rounded-md bg-blue-800 py-2 text-white disabled:bg-gray-400"
        >
          {loading ? "Saving..." : product ? "Update Product" : "Create Product"}
        </button>
      </form>
    </div>
  )
}