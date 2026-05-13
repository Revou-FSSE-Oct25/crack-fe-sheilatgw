import { useState } from "react"

export function useCartSelection(items: any[]) {
  const [selectedItems, setSelectedItems] = useState<number[]>([])

  const fullPaymentPrices = JSON.parse(
    typeof window !== "undefined"
      ? localStorage.getItem("fullPaymentPrices") || "{}"
      : "{}"
  )

  const totalPrice = items.reduce((sum, item) => {
    if (!selectedItems.includes(item.cart_id)) return sum

    let price
    if (item.product.orderType === "PO" && item.dpAmount == null) {
      const stored = fullPaymentPrices[item.product.product_id]
      price = stored?.fullPaymentPrice
        ? Number(stored.fullPaymentPrice)
        : Number(item.product.fullPaymentPrice ?? item.product.price)
    } else if (item.product.orderType === "PO" && item.dpAmount != null) {
      price = Number(item.dpAmount)
    } else {
      price = Number(item.product.price)
    }

    return sum + price * item.quantity
  }, 0)

  const groupedItems = items.reduce((acc: any, item) => {
    const key = item.product.orderType === "PO" ? "PO" : "READY_STOCK"

    if (!acc[key]) acc[key] = []

    acc[key].push({
      ...item.product,
      quantity: item.quantity,
      cartId: item.cart_id,
      dpAmount: item.dpAmount,
      fullPaymentPrice: item.product.fullPaymentPrice,
      fullPaymentDiscount: item.product.fullPaymentDiscount,
      originalItem: item,
    })

    return acc
  }, {})

  const allSelected =
    items.length > 0 &&
    items.every((item) => selectedItems.includes(item.cart_id))

  function toggleItem(cartId: number) {
    setSelectedItems((prev) =>
      prev.includes(cartId)
        ? prev.filter((id) => id !== cartId)
        : [...prev, cartId]
    )
  }

  function toggleAll() {
    if (allSelected) {
      setSelectedItems([])
    } else {
      setSelectedItems(items.map((item) => item.cart_id))
    }
  }

  return {
    selectedItems,
    totalPrice,
    groupedItems,
    allSelected,
    toggleItem,
    toggleAll,
  }
}