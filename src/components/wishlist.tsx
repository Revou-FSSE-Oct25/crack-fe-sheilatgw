"use client"

import { useState } from "react"
import { IoHeartOutline, IoHeart } from "react-icons/io5"

const Wishlist = () => {
  const [wishlist, setWishlist] = useState(false)

  const handleClick = () => {
    setWishlist(!wishlist)
  }

  return (
    <button
      onClick={handleClick}
      className="w-32 h-12 flex items-center justify-center border rounded-lg bg-white border-gray-300 hover:bg-gray-100 transition"
    >
      {wishlist ? (
        <IoHeart size={20} className="text-red-500 text-xl" />
      ) : (
        <IoHeartOutline size={20} className="text-xl text-gray-600" />
      )}

      <p className="ml-1 text-gray-600">Wishlist</p>
    </button>
  )
}

export default Wishlist