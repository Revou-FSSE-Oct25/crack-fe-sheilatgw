import { apiClient } from "@/lib/apiClient"

type AddToCartPayload = {
  productId: number
  quantity: number
  dpAmount?: number
}

export function getCart() {
  return apiClient("/cart")
}

export function addToCart(payload: AddToCartPayload) {
  return apiClient("/cart", {
    method: "POST",
    body: JSON.stringify(payload),
  })
}

export function updateCartQty(
  cartId: number,
  quantity: number
) {
  return apiClient(`/cart/${cartId}`, {
    method: "PATCH",
    body: JSON.stringify({
      quantity,
    }),
  })
}

export function removeCartItem(cartId: number) {
  return apiClient(`/cart/${cartId}`, {
    method: "DELETE",
  })
}