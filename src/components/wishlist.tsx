"use client"

import { useEffect } from "react"
import { IoHeartOutline, IoHeart } from "react-icons/io5"
import { useWishlistStore } from "@/store/useWishlistStore"
import { FaRegTrashAlt } from "react-icons/fa"

type WishlistProps = {
  productId: number
}

export function Wishlist({ productId }: WishlistProps) {
  const fetchWishlist = useWishlistStore(
    (state) => state.fetchWishlist
  )

  const addWishlist = useWishlistStore(
    (state) => state.addWishlist
  )

  const removeWishlist = useWishlistStore(
    (state) => state.removeWishlist
  )

  const wished = useWishlistStore((state) =>
    state.items.some(
      (item) =>
        item.productId === productId ||
        item.product?.product_id === productId
    )
  )

  useEffect(() => {
    fetchWishlist()
  }, [fetchWishlist])

  async function handleClick() {
    if (wished) {
      await removeWishlist(productId)
    } else {
      await addWishlist(productId)
    }
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      className={`flex h-12 w-32 items-center justify-center rounded-lg border transition ${
        wished
          ? "border-gray-300 bg-white"
          : "border-gray-300 bg-white hover:bg-gray-100"
      }`}
    >
      {wished ? ( <IoHeart size={20}
          className="text-xl text-blue-800"/>
      ) : (
        <IoHeartOutline
          size={20}
          className="text-xl text-gray-600"
        />
      )}

      <p
        className={`ml-1 ${
          wished ? "text-blue-800" : "text-gray-600"
        }`}
      >
        Wishlist
      </p>
    </button>
  )
}

export function WishlistSmall({
  productId,
}: WishlistProps) {
  const fetchWishlist = useWishlistStore(
    (state) => state.fetchWishlist
  )

  const addWishlist = useWishlistStore(
    (state) => state.addWishlist
  )

  const removeWishlist = useWishlistStore(
    (state) => state.removeWishlist
  )

  const wished = useWishlistStore((state) =>
    state.items.some(
      (item) =>
        item.productId === productId ||
        item.product?.product_id === productId
    )
  )

  useEffect(() => {
    fetchWishlist()
  }, [fetchWishlist])

  async function handleClick() {
    if (wished) {
      await removeWishlist(productId)
    } else {
      await addWishlist(productId)
    }
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      className={`flex h-12 w-15 items-center justify-center rounded-lg border transition ${
        wished
          ? "border-gray-300 bg-white"
          : "border-gray-300 bg-white hover:bg-gray-100"
      }`}
    >
      {wished ? (
        <IoHeart
          size={20}
          className="text-xl text-blue-800"
        />
      ) : (
        <IoHeartOutline
          size={20}
          className="text-xl text-gray-600"
        />
      )}
    </button>
  )
}

export function UnWishlist({
  productId,
}: WishlistProps) {
  const fetchWishlist = useWishlistStore(
    (state) => state.fetchWishlist
  )

  const removeWishlist = useWishlistStore(
    (state) => state.removeWishlist
  )

  useEffect(() => {
    fetchWishlist()
  }, [fetchWishlist])

  async function handleClick() {
    try {
      await removeWishlist(productId)
    } catch (error) {
      console.error(error)
      alert("Gagal menghapus wishlist")
    }
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      className="bg-blue-700 flex p-1 items-center justify-center rounded-full transition">
        <FaRegTrashAlt
          size={18}
          className="text-xl text-white"
        />
    </button>
  )
}