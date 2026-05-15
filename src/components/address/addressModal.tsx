'use client'

import { useState } from "react"

type Address = {
  address_id: number
  recipientName: string
  phoneNumber: string
  fullAddress: string
  province: string
  cityRegency: string
  postalCode: string
  isDefault: boolean
}

type Props = {
  open: boolean
  addresses: Address[]
  selectedAddressId: number | null
  onClose: () => void
  onAddAddress: () => void
  onSelect: (id: number) => void
}

export default function AddressModal({open, addresses, selectedAddressId, onClose, onSelect, onAddAddress}: Props) {
    const [addOpen, setAddOpen] = useState(false)
    if (!open) return null
        return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
        <div className="w-[90%] max-w-xl pt-2 pb-5 relative rounded-2xl bg-white">
            <div className="flex items-center justify-between border-b px-8 py-6">
            <p className="text-2xl font-semibold text-gray-700">
                Alamat Pengiriman
            </p>

            <button type="button" onClick={onClose} className="text-3xl text-gray-500">
                ×
            </button>
            </div>

            <div className="space-y-5 p-8">
            {addresses.map((address) => {
                const isSelected = selectedAddressId === address.address_id

                return (
                <button
                    key={address.address_id}
                    type="button"
                    onClick={() => {
                    onSelect(address.address_id)
                    onClose()
                    }}
                    className="w-full rounded-xl border border-gray-200 p-5 text-left transition hover:border-blue-500 hover:shadow-md"
                >
                    <div className="flex items-start justify-between">
                    <div>
                        <div className="flex items-center gap-3">
                        <p className="font-semibold text-gray-700">
                            {address.recipientName}
                        </p>

                        <p className="text-gray-500">{address.phoneNumber}</p>

                        {address.isDefault && (
                            <span className="rounded-full border border-blue-500 px-3 py-1 text-xs font-semibold text-blue-500">
                            Utama
                            </span>
                        )}
                        </div>

                        <p className="mt-4 text-sm text-gray-500">
                        {address.fullAddress}, {address.cityRegency},{" "}
                        {address.province} {address.postalCode}
                        </p>
                    </div>

                    <div
                        className={`h-7 w-7 rounded-full border-2 p-1 ${
                        isSelected ? "border-blue-500" : "border-gray-300"
                        }`}
                    >
                        {isSelected && (
                        <div className="h-full w-full rounded-full bg-blue-500" />
                        )}
                    </div>
                    </div>
                </button>
                )
            })}

            <button
                type="button" onClick={onAddAddress}
                className="mt-4 w-full rounded-xl bg-blue-700 py-4 text-lg font-semibold text-white hover:bg-blue-800"
            >
                + Tambah Alamat
            </button>
            </div>
        </div>
        </div>
    )
}