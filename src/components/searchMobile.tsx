"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { IoSearchOutline, IoChevronBackSharp,} from "react-icons/io5"

export default function SearchMobile() {
  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState("")
  const router = useRouter()

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()

    const keyword = query.trim()
    if (!keyword) return

    router.push(`/products?search=${encodeURIComponent(keyword)}`)
    setOpen(false)
  }

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="flex items-center text-2xl text-blue-800 md:hidden"
      >
        <IoSearchOutline size={25} />
      </button>

      {open && (
        <div className="fixed inset-0 z-50 flex flex-col bg-white md:hidden">
          <div className="flex h-12 items-center gap-2 border-b border-gray-200 px-3">
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="text-2xl text-blue-800"
            >
              <IoChevronBackSharp />
            </button>

            <form onSubmit={handleSearch} className="flex flex-1 items-center">
              <input
                type="text"
                placeholder="Khilaf apa hari ini?"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="h-10 flex-1 bg-transparent text-sm outline-none"
                autoFocus
              />
            </form>
          </div>
        </div>
      )}
    </>
  )
}