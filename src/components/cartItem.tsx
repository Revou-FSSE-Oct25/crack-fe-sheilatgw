import { IoHeartOutline, IoHeart } from "react-icons/io5"
import { FaRegTrashAlt } from "react-icons/fa"
import { FiMinus } from "react-icons/fi"
import { IoMdAdd } from "react-icons/io"
import { LargeStatusBadge } from "./statusBadge"
import { useWishlistStore } from "@/store/useWishlistStore"

export default function CartItem({
  items,
  increaseQty,
  decreaseQty,
  removeItem,
  selectedItems,
  toggleItem,
}: any) {
  const orderType = items[0]?.orderType

  const fullPaymentPrices = JSON.parse(
    typeof window !== "undefined"
      ? localStorage.getItem("fullPaymentPrices") || "{}"
      : "{}"
  )

  const addWishlist = useWishlistStore((state) => state.addWishlist)
  const removeWishlist = useWishlistStore((state) => state.removeWishlist)
  const wishlistItems = useWishlistStore((state) => state.items)

  const allChecked =
    items.length > 0 &&
    items.every((item: any) => selectedItems.includes(item.cartId))

  function isWishlisted(productId: number) {
    return wishlistItems.some(
      (wishlist) =>
        wishlist.productId === productId ||
        wishlist.product?.product_id === productId
    )
  }

  async function toggleWishlist(productId: number) {
    if (isWishlisted(productId)) {
      await removeWishlist(productId)
    } else {
      await addWishlist(productId)
    }
  }

  function toggleGroup() {
    if (allChecked) {
      items.forEach((item: any) => toggleItem(item.cartId))
    } else {
      items.forEach((item: any) => {
        if (!selectedItems.includes(item.cartId)) {
          toggleItem(item.cartId)
        }
      })
    }
  }

  return (
    <div className="mb-4 w-200 overflow-hidden rounded-lg border border-gray-300 bg-white shadow-sm">
      <div className="flex items-center gap-6 border-b border-gray-300 bg-gray-100 px-6 py-4">
        <input
          type="checkbox"
          checked={allChecked}
          onChange={toggleGroup}
          className="h-5 w-5 accent-blue-600"
        />

        <LargeStatusBadge status={orderType === "PO" ? "PO" : "READY_STOCK"} />
      </div>

      <div className="divide-y divide-gray-200">
        {items.map((item: any) => {
          const product = item.product ?? item

          let itemPrice
          if (product.orderType === "PO" && item.dpAmount == null) {
            const stored = fullPaymentPrices[product.product_id]
            itemPrice = stored?.fullPaymentPrice
              ? Number(stored.fullPaymentPrice)
              : Number(product.fullPaymentPrice ?? product.price)
          } else if (product.orderType === "PO" && item.dpAmount != null) {
            itemPrice = Number(item.dpAmount)
          } else {
            itemPrice = Number(product.price)
          }

          const totalItemPrice = itemPrice * item.quantity
          const productId = product.product_id
          const wished = isWishlisted(productId)

          return (
            <div
              key={item.cartId}
              className="flex items-center gap-6 px-6 py-5"
            >
              <input
                type="checkbox"
                checked={selectedItems.includes(item.cartId)}
                onChange={() => toggleItem(item.cartId)}
                className="h-5 w-5 accent-blue-600"
              />

              <img
                src={product.imageUrl}
                className="h-25 w-25 rounded-lg object-cover"
                alt={product.name}
              />

              <div className="flex-1">
                <p className="font-semibold text-gray-700">{product.name}</p>

                {product.orderType === "PO" && (
                  <p className="mt-2 text-sm text-gray-500">
                    Estimated Arrival: {product.poEstimatedMonth}
                  </p>
                )}

                <p className="mt-4 font-semibold text-gray-700">
                  IDR {itemPrice.toLocaleString("id-ID")}

                  {product.orderType === "PO" && item.dpAmount != null && (
                    <span className="font-normal text-gray-400">
                      {" "}
                      /{" "}
                      {Number(
                        product.fullPaymentPrice ?? product.price
                      ).toLocaleString("id-ID")}
                    </span>
                  )}
                </p>
              </div>

              <div className="flex flex-col items-end gap-5">
                <p className="text-xl font-semibold text-blue-800">
                  IDR {totalItemPrice.toLocaleString("id-ID")}
                </p>

                <div className="flex items-center gap-5">
                  <button
                    type="button"
                    onClick={() => toggleWishlist(productId)}
                    className="text-gray-600"
                  >
                    {wished ? (
                      <IoHeart size={26} className="text-blue-800" />
                    ) : (
                      <IoHeartOutline size={26} />
                    )}
                  </button>

                  <button
                    type="button"
                    onClick={() => removeItem(item.cartId)}
                    className="text-gray-600"
                  >
                    <FaRegTrashAlt size={20} />
                  </button>

                  <div className="flex items-center gap-5 rounded-full border-3 border-gray-200 px-4 py-1">
                    <button
                      type="button"
                      onClick={() => decreaseQty(item.originalItem)}
                      className="text-gray-400"
                    >
                      <FiMinus size={20} />
                    </button>

                    <span className="text-lg font-medium text-gray-700">
                      {item.quantity}
                    </span>

                    <button
                      type="button"
                      onClick={() => increaseQty(item.originalItem)}
                      className="text-blue-600"
                    >
                      <IoMdAdd size={22} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}