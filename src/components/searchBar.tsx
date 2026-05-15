"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { IoSearchOutline } from "react-icons/io5"

export default function SearchBar() {
  const [query, setQuery] = useState("")
  const router = useRouter()

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()

    const keyword = query.trim()
    if (!keyword) return

    router.push(`/products?search=${encodeURIComponent(keyword)}`)
  }

  return (
    <form onSubmit={handleSearch} className="hidden sm:flex items-center">
      <input
        type="text"
        placeholder="What do you want to buy today?"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="border-t border-l border-b rounded-l px-3 py-2 md:w-100 lg:w-190 h-8 text-sm"
      />

      <button type="submit" className="bg-blue-800 text-white p-2 rounded-r">
        <IoSearchOutline />
      </button>
    </form>
  )
}