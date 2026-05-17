"use client"

import { useEffect, useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { PayButton } from "@/components/checkpay"
import { IoChevronForward } from "react-icons/io5"
import { useCartStore } from "@/store/useCartStore"
import OrderItem from "@/components/orderItem"
import AddressShipping from "@/components/address/addressShipping"
import { apiFetch } from "@/lib/api"

function Page() {
  const items = useCartStore((state) => state.items)
  const fetchCart = useCartStore((state) => state.fetchCart)
  const [step, setStep] = useState<"review" | "payment">("review")
  const [selectedCartIds, setSelectedCartIds] = useState<number[]>([])
  const [selectedAddressId, setSelectedAddressId] = useState<number | null>(null)
  const router = useRouter()
  const searchParams = useSearchParams()
  const isRemainingPayment = searchParams.get("type") === "remaining"
  
  const [remainingPaymentData, setRemainingPaymentData] = useState<{
    orderId: number
    remainingAmount: number
  } | null>(null)

  type PaymentMethod = "TRANSFER" | "E_WALLET" | "QRIS"

  type ShippingOption = {
    shippingMethod: "REGULAR" | "NEXT_DAY" | "SAME_DAY"
    courier: string
    shippingService: string
    label: string
    estimate: string
  }
  const shippingCosts = {
  REGULAR: {
    JNE: 10000,
    SICEPAT: 9000,
  },
  NEXT_DAY: {
    JNE: 20000,
    SICEPAT: 18000,
  },
  SAME_DAY: {
    GOJEK: 30000,
    GRAB: 32000,
  },
}

  const paymentMethods: {
    value: PaymentMethod
    label: string
  }[] = [
    { value: "TRANSFER", label: "Bank Transfer" },
    { value: "E_WALLET", label: "E-Wallet" },
    { value: "QRIS", label: "QRIS" },
  ]

  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod | null>(null)
  const [shippingOption, setShippingOption] = useState<ShippingOption | null>(null)

  const fullPaymentPrices = JSON.parse(
    typeof window !== "undefined"
      ? localStorage.getItem("fullPaymentPrices") || "{}"
      : "{}"
  )

  useEffect(() => {
    if (isRemainingPayment) {
      const stored = localStorage.getItem("remainingPaymentOrder")
      if (stored) {
        setRemainingPaymentData(JSON.parse(stored))
        localStorage.removeItem("remainingPaymentOrder")
      }
    } else {
      fetchCart()
      const saved = localStorage.getItem("selectedCartIds")
      if (saved) {
        setSelectedCartIds(JSON.parse(saved))
      }
    }
  }, [fetchCart, isRemainingPayment])

  const checkoutItems = items.filter((item) =>
    selectedCartIds.includes(item.cart_id)
  )

  const totalItems = checkoutItems.reduce(
    (sum, item) => sum + item.quantity,
    0
  )

  const totalPrice = isRemainingPayment && remainingPaymentData
    ? remainingPaymentData.remainingAmount
    : checkoutItems.reduce((sum, item) => {
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

  function getShippingCost(option: ShippingOption | null) {
  if (!option) return 0

  if (option.shippingMethod === "REGULAR") {
    if (option.courier === "JNE") return 10000
    if (option.courier === "SICEPAT") return 9000
  }

  if (option.shippingMethod === "NEXT_DAY") {
    if (option.courier === "JNE") return 20000
    if (option.courier === "SICEPAT") return 18000
  }

  if (option.shippingMethod === "SAME_DAY") {
    if (option.courier === "GOJEK") return 30000
    if (option.courier === "GRAB") return 32000
  }

  return 0
}

const shippingCost = isRemainingPayment ? 0 : getShippingCost(shippingOption)

  async function handleCreateOrder() {
  try {
    if (isRemainingPayment) {
      if (!paymentMethod) {
        alert("Pilih metode pembayaran")
        return
      }
      
      if (!remainingPaymentData) {
        alert("Data pembayaran tidak valid")
        return
      }

      const payload = {
        paymentMethod,
      }

      await apiFetch(`/order/${remainingPaymentData.orderId}/pay-remaining`, {
        method: "PATCH",
        body: JSON.stringify(payload),
      })

      router.push("/order-success")
    } else {
      if (!selectedAddressId) {
        alert("Pilih alamat dulu")
        return
      }

      if (!paymentMethod) {
        alert("Pilih metode pembayaran")
        return
      }
      if (!shippingOption) {
        alert("Pilih metode pengiriman dulu")
        return
      }

      const payload = {
        addressId: selectedAddressId,
        shippingMethod: shippingOption.shippingMethod,
        courier: shippingOption.courier,
        shippingService: shippingOption.shippingService,
        paymentMethod,
        items: checkoutItems.map((item) => ({
          cartId: item.cart_id,
          dpAmount: item.dpAmount ?? undefined,
        })),
      }

      await apiFetch("/order", {
        method: "POST",
        body: JSON.stringify(payload),
      })

      router.push("/order-success")
    }
  } catch (error) {
    console.error(error)
    alert("Checkout gagal")
  }
}

  if (step === "payment") {
    return (
      <>
      <div className="hidden md:block max-w-350 mx-auto px-25 pb-15 pt-20">
        <button
          type="button"
          onClick={() => setStep("review")}
          className="mb-3 text-2xl font-bold text-gray-500"
        >
          ← Choose Payment Method
        </button>
        <div className="flex gap-5">
            <div className="flex flex-col gap-5">
                <div className="flex gap-4">
                  {paymentMethods.map((method) => (
                  <button
                    key={method.value}
                    type="button"
                    onClick={() => setPaymentMethod(method.value)}
                    className={`rounded-xl border p-5 w-30 h-35 bg-white hover:-translate-y-1 transition ${
                      paymentMethod === method.value
                        ? "border-blue-500 bg-orange-50 text-blue-600"
                        : "border-gray-200 bg-white text-gray-700"
                    }`}
                  >
                    {method.label}
                  </button>
                ))}
                </div>
                <ul className="flex text-sm w-200 list-disc flex-col gap-2 rounded-xl border border-gray-200 px-10 py-5 shadow-sm">
                    <li>Pembayaran melalui QRIS dapat dilakukan menggunakan e-wallet apa pun (seperti ShopeePay, GoPay, OVO, DANA, atau M-Banking).</li>
                    <li>Pembayaran akan langsung terverifikasi secara otomatis.</li>
                </ul>
            </div>
            
        <div className="sticky top-25 flex h-65 w-90 flex-col gap-2 rounded-lg border border-gray-200 p-6 shadow-sm">
          <p className="text-xl font-semibold text-gray-700">
            Payment Details
          </p>

          <div className="flex justify-between text-gray-500">
            <p className="text-sm">
              {isRemainingPayment ? "Remaining Payment" : "Subtotal"}{" "}
              {!isRemainingPayment && (
                <span className="text-xs">
                  ({totalItems} items)
                </span>
              )}
            </p>

            <p className="text-sm">
              IDR {totalPrice.toLocaleString("id-ID")}
            </p>
          </div>

          {!isRemainingPayment && (
            <div className="flex justify-between text-gray-500">
              <p className="text-sm">Shipping Fee</p>

              <p className="text-sm text-gray-700">
                IDR {shippingCost.toLocaleString("id-ID")}
              </p>
            </div>
          )}

          <div className="mt-1 border-t-2 border-gray-200"></div>

          <div className="mb-10 flex justify-between">
            <p className="text-lg font-semibold text-gray-700">
              Grand Total
            </p>

            <p className="text-sm font-bold text-blue-800">
              IDR {(totalPrice + shippingCost).toLocaleString("id-ID")}
            </p>
          </div>

          <PayButton onClick={handleCreateOrder}/>
            </div>
        </div>
        
      </div>

      <div className="fixed top-0 left-0 z-50 flex h-16 w-full items-center bg-white px-5 shadow-sm md:hidden">
      <button type="button" onClick={() => router.back()} className="mr-5 text-3xl text-black">
        ‹
      </button>

      <h1 className="text-2xl font-medium text-gray-800">
        Payment
      </h1>
    </div>
    <div className="md:hidden flex flex-col space-y-4 pt-20 pb-18">
      <div className="p-5 flex justify-between bg-white">
            <p className="text-lg font-semibold text-gray-700">
              Grand Total
            </p>

            <p className="text-sm font-bold text-blue-800">
              IDR {(totalPrice + shippingCost).toLocaleString("id-ID")}
            </p>
          </div>
          <div className="flex flex-col items-center bg-white p-5 space-y-5">
            <p className="text-lg font-semibold text-gray-700">Choose a Payment Method</p>
                  {paymentMethods.map((method) => (
                  <button
                    key={method.value}
                    type="button"
                    onClick={() => setPaymentMethod(method.value)}
                    className={`border-b p-5 bg-white hover:-translate-y-1 transition ${
                      paymentMethod === method.value
                        ? "border-blue-500 bg-orange-50 text-blue-600"
                        : "border-gray-200 bg-white text-gray-700"
                    }`}
                  >
                    {method.label}
                  </button>
                ))}
              <PayButton onClick={handleCreateOrder}/>
          </div>
    </div>
      </>
    )
  }

  if (isRemainingPayment && !remainingPaymentData) {
    return (
      <>
      <div className="hidden md:block max-w-350 mx-auto px-25 pb-15 pt-18">
        <p className="text-center text-gray-500">Loading...</p>
      </div>
      </>
    )
  }

  if (isRemainingPayment) {
    return (
      <>
      <div className="hidden md:block max-w-350 mx-auto px-25 pb-15 pt-18">
        <p className="mb-2 text-2xl font-semibold text-gray-500">
          Shipping Details
        </p>

        <div className="flex gap-5">
          <div className="flex flex-col gap-5 flex-1">
            <div className="rounded-lg border border-gray-200 p-6 shadow-sm">
              <p className="text-lg font-semibold text-gray-700 mb-2">
                Remaining Payment for Order #{remainingPaymentData?.orderId}
              </p>
              <p className="text-sm text-gray-600">
                Complete your payment to finalize this order.
              </p>
            </div>
          </div>

          <div className="sticky top-25 flex h-65 w-90 flex-col gap-2 rounded-lg border border-gray-200 p-6 shadow-sm">
            <p className="text-xl font-semibold text-gray-700">
              Payment Details
            </p>

            <div className="flex justify-between text-gray-500">
              <p className="text-sm">
                Total Payment
              </p>

              <p className="text-sm">
                IDR {totalPrice.toLocaleString("id-ID")}
              </p>
            </div>

            <div className="flex justify-between text-gray-500">
              <p className="text-sm">Shipping Fee</p>

              <p className="text-sm text-gray-700">
                IDR 0
              </p>
            </div>

            <div className="mt-1 border-t-2 border-gray-200"></div>

            <div className="mb-10 flex justify-between">
              <p className="text-lg font-semibold text-gray-700">
                Grand Total
              </p>

              <p className="text-sm font-bold text-blue-800">
                IDR {totalPrice.toLocaleString("id-ID")}
              </p>
            </div>

            <PayButton onClick={() => setStep("payment")}/>
          </div>
        </div>
      </div>
      </>
    )
  }

  return (
    <>
    <div className="hidden md:block max-w-350 mx-auto px-25 pb-15 pt-18">
      <p className="mb-2 text-2xl font-semibold text-gray-500">
        Shipping Details
      </p>

      <div className="flex gap-5">
        <div className="flex flex-col gap-5">
          <AddressShipping selectedAddressId={selectedAddressId} onSelectAddress={setSelectedAddressId} onSelectShipping={setShippingOption}/>
 
          <div className="flex-1">
            <p className="mb-2 text-2xl font-semibold text-gray-500">
              Detail Pesanan
            </p>
            <OrderItem />
          </div>
        </div>

        <div className="sticky top-25 flex h-65 w-90 flex-col gap-2 rounded-lg border border-gray-200 p-6 shadow-sm">
          <p className="text-xl font-semibold text-gray-700">
            Payment Details
          </p>

          <div className="flex justify-between text-gray-500">
            <p className="text-sm">
              Subtotal{" "}
              <span className="text-xs">
                ({totalItems} items)
              </span>
            </p>

            <p className="text-sm">
              IDR {totalPrice.toLocaleString("id-ID")}
            </p>
          </div>

          <div className="flex justify-between text-gray-500">
            <p className="text-sm">Shipping Fee</p>

            <p className="text-sm text-gray-700">
              IDR {shippingCost.toLocaleString("id-ID")}
           </p>
          </div>

          <div className="mt-1 border-t-2 border-gray-200"></div>

          <div className="mb-10 flex justify-between">
            <p className="text-lg font-semibold text-gray-700">
              Grand Total
            </p>

            <p className="text-sm font-bold text-blue-800">
              IDR {(totalPrice + shippingCost).toLocaleString("id-ID")}
            </p>
          </div>

          <PayButton onClick={() => setStep("payment")}/>
        </div>
      </div>
    </div>

    <div className="fixed top-0 left-0 z-50 flex h-16 w-full items-center bg-white px-5 shadow-sm md:hidden">
      <button type="button" onClick={() => router.back()} className="mr-5 text-3xl text-black">
        ‹
      </button>

      <h1 className="text-2xl font-medium text-gray-800">
        Checkout
      </h1>
    </div>
    <div className="md:hidden flex flex-col space-y-4 pt-20 pb-18">
        <AddressShipping selectedAddressId={selectedAddressId} 
        onSelectAddress={setSelectedAddressId} onSelectShipping={setShippingOption}/>
        <div className="flex-1 bg-white">
            <p className="p-5 text-base font-semibold text-gray-500">
              Detail Pesanan
            </p>
            <OrderItem />
        </div>
        <div className="bg-white flex flex-col p-5">
            <p className="text-gray-800 font-semibold mb-4">Payment Details</p>
            <div className="flex justify-between text-gray-500">
              <p className="text-sm">
                Subtotal{" "}
                <span className="text-xs">
                  ({totalItems} items)
                </span>
              </p>

              <p className="text-sm text-gray-700">
                IDR {totalPrice.toLocaleString("id-ID")}
              </p>
           </div>
           <div className="flex justify-between text-gray-500">
            <p className="text-sm">Shipping Fee</p>

            <p className="text-sm text-gray-700">
              IDR {shippingCost.toLocaleString("id-ID")}
           </p>
          </div>
        </div>
    </div>
    <div className="fixed bg-white p-5 bottom-0 left-0 w-full h-25 border-t border-gray-300 z-50 md:hidden">
      <div className="flex items-center justify-between gap-4">
        
        <div className="min-w-0">
          <p className="text-base uppercase tracking-wide text-gray-400">
            Total Price
          </p>
    
          <h2 className="mt-1 text-lg font-bold text-blue-800">
            IDR {totalPrice.toLocaleString("id-ID")}
          </h2>
        </div>
          <PayButton onClick={() => setStep("payment")} disabled={!selectedAddressId || !shippingOption}/>
      </div>
    </div>
    </>
  )
}

export default Page