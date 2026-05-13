"use client"

import type { Dispatch, SetStateAction } from "react"
import type { ProductStatus } from "@/components/productSection"

type Props = {
  active: ProductStatus
  onChange: Dispatch<SetStateAction<ProductStatus>>
}

export default function StatusSelect({ active, onChange }: Props) {
  const tabs: { label: string; value: ProductStatus }[] = [
    { label: "All Items", value: "ALL" },
    { label: "Ready Stock", value: "READY_STOCK" },
    { label: "Pre-Order", value: "PO" },
    { label: "Late Pre-Order", value: "LATE_PO" },
  ]

  return (
    <div className="hidden border-b border-gray-200 md:flex items-end h-12 justify-between px-4">
      <div className="flex gap-8">
        {tabs.map((tab) => (
          <div key={tab.value} className="flex flex-col items-center">
            <button
              type="button"
              onClick={() => onChange(tab.value)}
              className={`text-sm ${
                active === tab.value
                  ? "text-blue-800 font-bold"
                  : "text-gray-700 font-bold"
              }`}
            >
              {tab.label}
            </button>

            {active === tab.value && (
              <div className="h-0.5 w-25 bg-blue-800 mt-2 rounded-full" />
            )}
          </div>
        ))}
      </div>
    </div>
  )
}