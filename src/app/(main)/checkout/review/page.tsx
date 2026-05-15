"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
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
    fetchCart()

    const saved = localStorage.getItem("selectedCartIds")

    if (saved) {
      setSelectedCartIds(JSON.parse(saved))
    }
  }, [fetchCart])

  const checkoutItems = items.filter((item) =>
    selectedCartIds.includes(item.cart_id)
  )

  const totalItems = checkoutItems.reduce(
    (sum, item) => sum + item.quantity,
    0
  )

  const totalPrice = checkoutItems.reduce((sum, item) => {
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

const shippingCost = getShippingCost(shippingOption)
  async function handleCreateOrder() {
  try {
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
  } catch (error) {
    console.error(error)
    alert("Checkout gagal")
  }
}

  if (step === "payment") {
    return (
      <div className="max-w-350 mx-auto px-25 pb-15 pt-20">
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

          <PayButton onClick={handleCreateOrder}/>
            </div>
        </div>
        
      </div>
    )
  }


  return (
    <div className="max-w-350 mx-auto px-25 pb-15 pt-18">
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
  )
}

export default Page