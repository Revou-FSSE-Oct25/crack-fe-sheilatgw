"use client"

import { useState } from "react"
import { IoChevronForward } from "react-icons/io5"

export type ShippingMethod = "REGULAR" | "NEXT_DAY" | "SAME_DAY"

type ShippingOption = {
  shippingMethod: ShippingMethod
  courier: string
  shippingService: string
  label: string
  estimate: string
}

type Props = {
  open: boolean
  onClose: () => void
  onConfirm: (option: ShippingOption) => void
}

const options: Record<string, ShippingOption[]> = {
  REGULAR: [
    {
      shippingMethod: "REGULAR",
      courier: "JNE",
      shippingService: "REG",
      label: "JNE REG",
      estimate: "Estimasi Ketibaan: 2-3 Hari",
    },
    {
      shippingMethod: "REGULAR",
      courier: "SICEPAT",
      shippingService: "REG",
      label: "SiCepat REG",
      estimate: "Estimasi Ketibaan: 2-3 Hari",
    },
  ],
  NEXT_DAY: [
    {
      shippingMethod: "NEXT_DAY",
      courier: "JNE",
      shippingService: "YES",
      label: "JNE YES",
      estimate: "Estimasi Ketibaan: 1 Hari",
    },
    {
      shippingMethod: "NEXT_DAY",
      courier: "SICEPAT",
      shippingService: "BEST",
      label: "SiCepat BEST",
      estimate: "Estimasi Ketibaan: 1 Hari",
    },
  ],
  SAME_DAY: [
    {
      shippingMethod: "SAME_DAY",
      courier: "GOJEK",
      shippingService: "INSTANT",
      label: "Gojek Instant",
      estimate: "Estimasi Ketibaan: Hari Ini",
    },
    {
      shippingMethod: "SAME_DAY",
      courier: "GRAB",
      shippingService: "INSTANT",
      label: "Grab Instant",
      estimate: "Estimasi Ketibaan: Hari Ini",
    },
  ],
}

export default function ShippingModal({ open, onClose, onConfirm }: Props) {
  const [activeMethod, setActiveMethod] = useState<ShippingMethod | null>(null)
  const [selectedOption, setSelectedOption] = useState<ShippingOption | null>(null)

  if (!open) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="w-[90%] max-w-xl pt-2 pb-5 rounded-2xl bg-white">
        <div className="flex items-center justify-between border-b border-gray-300 mx-8 py-5">
          <p className="text-xl font-semibold text-gray-800">Pengiriman</p>
          <button type="button" onClick={onClose} className="text-3xl text-gray-500">
            ×
          </button>
        </div>

        <div className="space-y-3 p-6">
          <p className="text-lg font-semibold text-gray-700">Pilih Metode</p>

          {(["REGULAR", "NEXT_DAY", "SAME_DAY"] as ShippingMethod[]).map((method) => (
            <div key={method} className="rounded-lg border border-gray-200">
              <button
                type="button"
                onClick={() =>
                  setActiveMethod(activeMethod === method ? null : method)
                }
                className="flex w-full items-center justify-between px-5 py-4 text-left"
              >
                <span className="text-lg">
                  {method === "REGULAR"
                    ? "Regular"
                    : method === "NEXT_DAY"
                    ? "Next Day"
                    : "Same Day"}
                </span>
                <IoChevronForward className="text-blue-800" />
              </button>

              {activeMethod === method &&
                options[method].map((option) => (
                  <button
                    key={`${option.courier}-${option.shippingService}`}
                    type="button"
                    onClick={() => setSelectedOption(option)}
                    className="flex w-full items-center justify-between border-t border-gray-300 px-5 py-4 text-left"
                  >
                    <span className="font-medium text-blue-600">
                      {option.label}
                    </span>

                    <span className="text-sm text-gray-700">
                      {option.estimate}
                    </span>

                    <span
                      className={`h-6 w-6 rounded-full border-2 ${
                        selectedOption?.courier === option.courier &&
                        selectedOption?.shippingService === option.shippingService
                          ? "border-blue-800 bg-blue-800"
                          : "border-gray-400"
                      }`}
                    />
                  </button>
                ))}
            </div>
          ))}
        </div>

        <div className="border-t border-gray-300 mx-8 p-6">
          <button
            type="button"
            disabled={!selectedOption}
            onClick={() => {
              if (!selectedOption) return
              onConfirm(selectedOption)
              onClose()
            }}
            className="w-full rounded-xl bg-blue-800 py-4 font-semibold text-white disabled:bg-gray-300"
          >
            Konfirmasi
          </button>
        </div>
      </div>
    </div>
  )
}