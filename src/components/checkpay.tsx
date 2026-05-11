"use client"

import { useRouter } from "next/navigation"

export function CheckoutButton() {
  const router = useRouter()

  const handleCheckout = () => {
    router.push("/checkout")
  }

  return (
    <button
      onClick={handleCheckout}
      className="flex uppercase items-center justify-center gap-2 w-full bg-blue-800 text-stone-50 font-medium py-2 px-6 text-base rounded-xl hover:bg-blue-950 cursor-pointer"
    >
      Checkout
    </button>
  )
}

export function PayButton() {
  const router = useRouter()

  const handleCheckout = () => {
    router.push("/checkout")
  }

  return (
    <button
      onClick={handleCheckout}
      className="flex uppercase items-center justify-center gap-2 w-full bg-blue-800 text-stone-50 font-medium py-2 px-6 text-base rounded-xl hover:bg-blue-950 cursor-pointer"
    >
      Pay Now
    </button>
  )
}
