"use client"

import { useEffect, useState } from "react"
import { apiFetch } from "@/lib/api"

type Item = {
  id?: number
  series_id?: number
  manufacturer_id?: number
  character_id?: number
  category_id?: number
  name: string
  slug?: string
  parentId?: number | null
}

type EntityType = "series" | "manufacturer" | "character" | "category"

const configs: {
  type: EntityType
  title: string
  endpoint: string
}[] = [
  {
    type: "series",
    title: "Series",
    endpoint: "/series",
  },
  {
    type: "manufacturer",
    title: "Manufacturer",
    endpoint: "/manufacturers",
  },
  {
    type: "character",
    title: "Character",
    endpoint: "/characters",
  },
  {
    type: "category",
    title: "Category",
    endpoint: "/category",
  },
]

export default function AdminMasterDataPage() {
  const [data, setData] = useState<Record<EntityType, Item[]>>({
    series: [],
    manufacturer: [],
    character: [],
    category: [],
  })

  const [form, setForm] = useState<Record<EntityType, string>>({
    series: "",
    manufacturer: "",
    character: "",
    category: "",
  })

  const [categoryParentId, setCategoryParentId] = useState("")
  const [loading, setLoading] = useState(false)
  const parentCategories = data.category.filter(
  (category) =>
    category.name === "Figure & Model Kit" ||
    category.name === "Goods & Merchandise"
    )
    
  async function fetchAll() {
    const result = await Promise.all(
      configs.map(async (config) => {
        const res = await apiFetch(config.endpoint)
        return [config.type, res] as const
      })
    )

    setData(Object.fromEntries(result) as Record<EntityType, Item[]>)
  }

  useEffect(() => {
    fetchAll()
  }, [])

  async function handleCreate(type: EntityType, endpoint: string) {
    const name = form[type].trim()
    if (!name) return

    setLoading(true)

    try {
      const body =
        type === "category"
          ? {
              name,
              parentId: categoryParentId ? Number(categoryParentId) : null,
            }
          : { name }

      await apiFetch(endpoint, {
        method: "POST",
        body: JSON.stringify(body),
      })

      setForm((prev) => ({
        ...prev,
        [type]: "",
      }))

      if (type === "category") {
        setCategoryParentId("")
      }

      await fetchAll()
    } finally {
      setLoading(false)
    }
  }

  function getId(item: Item) {
    return (
      item.id ??
      item.series_id ??
      item.manufacturer_id ??
      item.character_id ??
      item.category_id
    )
  }

  return (
    <main className="min-h-screen bg-gray-50 px-6 py-24">
      <div className="mx-auto max-w-7xl">
        <h1 className="mb-8 text-3xl font-bold text-gray-800">
          Admin Master Data
        </h1>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {configs.map((config) => (
            <section key={config.type} className="rounded-xl bg-white p-5 shadow">
            <h2 className="mb-4 text-xl font-bold text-gray-800">
                Manage {config.title}
            </h2>

            <input
                value={form[config.type]}
                onChange={(e) =>
                setForm((prev) => ({
                    ...prev,
                    [config.type]: e.target.value,
                }))
                }
                placeholder={`Search or add ${config.title}`}
                className="h-11 w-full rounded-lg border px-3 text-sm outline-none focus:border-blue-800"
            />

            {form[config.type] && (
                <div className="mt-2 max-h-44 overflow-y-auto rounded-lg border bg-white">
                {data[config.type]
                    .filter((item) =>
                    item.name
                        .toLowerCase()
                        .includes(form[config.type].toLowerCase())
                    )
                    .slice(0, 8)
                    .map((item) => (
                    <button
                        key={getId(item)}
                        type="button"
                        onClick={() =>
                        setForm((prev) => ({
                            ...prev,
                            [config.type]: item.name,
                        }))
                        }
                        className="block w-full px-3 py-2 text-left text-sm hover:bg-gray-100"
                    >
                        {item.name}
                    </button>
                    ))}

                {!data[config.type].some(
                    (item) =>
                    item.name.toLowerCase() ===
                    form[config.type].trim().toLowerCase()
                ) && (
                    <button
                    type="button"
                    onClick={() => handleCreate(config.type, config.endpoint)}
                    disabled={loading}
                    className="block w-full px-3 py-2 text-left text-sm font-semibold text-blue-800 hover:bg-blue-50 disabled:opacity-50"
                    >
                    + Add "{form[config.type]}"
                    </button>
                )}
                </div>
            )}

            {config.type === "category" && (
                <select
                value={categoryParentId}
                onChange={(e) => setCategoryParentId(e.target.value)}
                className="mt-3 h-11 w-full rounded-lg border px-3 text-sm outline-none focus:border-blue-800"
                >
                <option value="">No Parent</option>

                {parentCategories.map((category) => (
                    <option key={getId(category)} value={getId(category)}>
                    {category.name}
                    </option>
                ))}
                </select>
            )}
            </section>
          ))}
        </div>
      </div>
    </main>
  )
}