"use client"

import { useRouter } from "next/navigation"

type CheckoutButtonProps = {
  selectedItems: number[]
}

type PayButtonProps = {
  onClick?: () => void
}

export function CheckoutButton({
  selectedItems,
}: CheckoutButtonProps) {
  const router = useRouter()

  const handleCheckout = () => {
    localStorage.setItem(
      "selectedCartIds",
      JSON.stringify(selectedItems)
    )

    router.push("/checkout/review")
  }

  return (
    <button
      onClick={handleCheckout}
      disabled={selectedItems.length === 0}
      className="flex w-full cursor-pointer items-center justify-center gap-2 rounded-xl bg-blue-800 px-6 py-2 text-base font-medium uppercase text-stone-50 hover:bg-blue-950 disabled:cursor-not-allowed disabled:bg-gray-300"
    >
      Checkout
    </button>
  )
}

export function PayButton({ onClick }: PayButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex w-full cursor-pointer items-center justify-center gap-2 rounded-xl bg-blue-800 px-6 py-2 text-base font-medium uppercase text-stone-50 hover:bg-blue-950"
    >
      Pay Now
    </button>
  )
}