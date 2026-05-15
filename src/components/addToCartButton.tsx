"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { cn } from "@/lib/utils"
import { Product } from "@/types/product"
import { useCartStore } from "@/store/useCartStore"
import { useAuth } from "@/hooks/useAuth"
import { IoMdClose } from "react-icons/io"

type Props = {
  product: Product
  quantity: number
  className?: string
  disabled?: boolean
}

type PaymentType = "DP" | "FULL"

function getMinimumDP(price: number) {
  if (price <= 200000) return 50000
  if (price <= 700000) return 100000
  if (price <= 1000000) return 200000
  if (price <= 1500000) return 300000
  if (price <= 2000000) return 800000
  if (price <= 3000000) return 1500000

  return 2000000
}

export function AddToCartButton({ product, quantity, className, disabled }: Props) {
  const router = useRouter()
  const { isLoggedIn, loading: authLoading } = useAuth()
  const calculatedMinDP = getMinimumDP(Number(product.price))
  const [paymentModalOpen, setPaymentModalOpen] = useState(false)
  const [successModalOpen, setSuccessModalOpen] = useState(false)
  const [paymentType, setPaymentType] = useState<PaymentType>("DP")
  const [dpAmount, setDpAmount] = useState(calculatedMinDP ?? 0)
  const [loading, setLoading] = useState(false)
  
  const addItem = useCartStore((state) => state.addItem)

  async function handleAddToCart() {
    if (!isLoggedIn) {
      router.push("/login")
      return
    }

    if (product.orderType === "PO") {
      setPaymentModalOpen(true)
      return
    }

    await submitAddToCart()
  }

  async function submitAddToCart() {
    try {
      setLoading(true)

      await addItem({
        productId: product.product_id,
        quantity: quantity,
        dpAmount:
          product.orderType === "PO" && paymentType === "DP"
            ? dpAmount
            : undefined,
      })

      // Store full payment price info for PO items
      if (product.orderType === "PO" && paymentType === "FULL") {
        const fullPaymentPrices = JSON.parse(
          localStorage.getItem("fullPaymentPrices") || "{}"
        )
        fullPaymentPrices[product.product_id] = {
          fullPaymentPrice: product.fullPaymentPrice,
          fullPaymentDiscount: product.fullPaymentDiscount,
        }
        localStorage.setItem(
          "fullPaymentPrices",
          JSON.stringify(fullPaymentPrices)
        )
      }

      setPaymentModalOpen(false)
      setSuccessModalOpen(true)
      setPaymentType("DP")
      setDpAmount(calculatedMinDP ?? 0)
      
    } catch (error) {
      console.error(error)
      alert("Gagal menambahkan ke keranjang")
    } finally {
      setLoading(false)
    }
  }

  const min = calculatedMinDP ?? 0
  const max = Number(product.fullPaymentPrice)
  const isBelowMin = dpAmount < min
  const isAboveMax = dpAmount >= max
  const isDisabled = loading || (product.orderType === "PO" && (isAboveMax || isBelowMin))

  return (
    <>
      <button onClick={handleAddToCart} disabled={loading}
        className={cn("flex items-center justify-center text-white",
         "bg-blue-700 rounded-lg hover:bg-blue-800 transition", 
         className)}>
        <p className="ml-1 font-semibold">
          {loading ? "Adding..." : "Add to cart"}
        </p>
      </button>

      {paymentModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center">
          <div className="bg-white rounded-2xl w-[90%] max-w-2xl py-15 px-22 relative">
            <button onClick={() => setPaymentModalOpen(false)} className="absolute top-4 right-4
             text-2xl text-gray-500 hover:text-black">
              <IoMdClose/>
            </button>
            <button onClick={() => setPaymentModalOpen(false)} className="absolute right-8 top-6 text-2xl"></button>

            <div className="grid grid-cols-2 mb-16">
              <button
                onClick={() => setPaymentType("DP")}
                className={`py-2 font-bold rounded-l-sm ${
                  paymentType === "DP"
                    ? "bg-blue-800 text-white"
                    : "bg-gray-300 text-gray-600"
                }`}
              >
                Down Payment
              </button>

              <button
                onClick={() => setPaymentType("FULL")}
                className={`py-2 font-bold rounded-r-sm ${
                  paymentType === "FULL"
                    ? "bg-blue-800 text-white"
                    : "bg-gray-300 text-gray-600"
                }`}
              >
                Full Payment
              </button>
            </div>

            {paymentType === "DP" ? (
              <div className="mb-10 flex flex-col items-center justify-center">
                <div className="flex items-center justify-center">
                  <span className="text-4xl text-gray-600">
                    IDR
                  </span>

                  <input type="text" value={dpAmount.toLocaleString("id-ID")} onChange={(e) => {
                      const raw = e.target.value.replace(/\./g, "")
                      if (raw === "") {
                        setDpAmount(0)
                        return
                      }

                      const value = Number(raw)

                      if (isNaN(value)) return

                      if (dpAmount > max && value > dpAmount) {
                        return
                      }

                      setDpAmount(value)
                    }}
                    className="w-36 border-none bg-transparent text-center text-4xl
                     tracking-tight text-gray-600 outline-none placeholder:text-gray-300 ml-3"/>
                </div>

                <p className=" text-lg text-gray-400">
                  Minimal DP IDR{" "}
                  {calculatedMinDP.toLocaleString("id-ID")}
                </p>

                {isBelowMin && (
                  <p className="text-sm font-medium text-blue-600">
                    DP terlalu rendah
                  </p>
                )}

                {isAboveMax && (
                  <p className="text-sm font-medium text-blue-600">
                    DP terlalu besar
                  </p>
                )}
              </div>
            ) : (
              <div className="text-center mb-10">
                <p className="text-4xl text-gray-600">
                  IDR {product.fullPaymentPrice?.toLocaleString("id-ID")}
                </p>

                <p className="text-gray-400 text-lg">
                  Hemat IDR {product.fullPaymentDiscount?.toLocaleString("id-ID")}
                </p>
              </div>
            )}
            
            <button
              onClick={submitAddToCart}
              disabled={isDisabled}
              className={`w-full bg-blue-800 text-white font-bold py-4 rounded-lg transition
                ${isDisabled ? "bg-gray-300 text-gray-500 cursor-not-allowed" 
                  : "bg-blue-800 text-white hover:bg-blue-900"}
              `}
            >
              Tambahkan ke Keranjang
            </button>
          </div>
        </div>
      )}

      {successModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center">
          <div className="bg-white rounded-2xl w-[90%] max-w-2xl p-10 relative text-center">
            <button
              onClick={() => setSuccessModalOpen(false)}
              className="absolute right-8 top-6 text-2xl"
            >
              ×
            </button>

            <div className="text-green-500 text-8xl mb-10">✓</div>

            <p className="text-xl text-gray-600">
              Berhasil Menambahkan Item ke Dalam Keranjang
            </p>

            <p className="text-gray-400 mt-2">Sekarang mau kemana kita?</p>

            <div className="grid grid-cols-2 gap-4 mt-20">
              <button
                onClick={() => setSuccessModalOpen(false)}
                className="border border-blue-800 text-blue-800 font-bold py-4 rounded"
              >
                Lanjutkan Belanja
              </button>

              <Link
                href="/user/cart"
                className="bg-blue-800 text-white font-bold py-4 rounded"
              >
                Lihat Keranjang
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  )
}