"use client"

import { useState } from "react"
import { IoAdd, IoRemove } from "react-icons/io5"

export default function QuantitySelector() {
  const [qty, setQty] = useState(1)

  const increaseQty = () => {
    setQty((prev) => prev + 1)
  }

  const decreaseQty = () => {
    if (qty > 1) {
      setQty((prev) => prev - 1)
    }
  }

  return (
    <div className="flex items-center gap-2">
      <p className="text-lg text-gray-600">
        Qty:
      </p>

      <div className="flex items-center gap-3">
        <div className="w-5 flex justify-center">
            {qty > 1 && (
          <button
            onClick={decreaseQty}
            className="text-gray-500 hover:text-black text-sm"
          >
            <IoRemove />
          </button>
        )}
        </div>
        
        <div className="w-17 h-10 border border-gray-300 rounded-sm flex items-center justify-center text-lg font-medium">
          {qty}
        </div>

        <button
          onClick={increaseQty}
          className="text-gray-500 hover:text-black text-sm"
        >
          <IoAdd />
        </button>
      </div>
    </div>
  )
}