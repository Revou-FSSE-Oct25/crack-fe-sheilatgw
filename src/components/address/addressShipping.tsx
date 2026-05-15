"use client"

import { useState, useEffect } from "react"
import { IoChevronForward } from "react-icons/io5"
import AddressModal from "./addressModal"
import ShippingModal from "./shippingModal"
import AddAddressModal from "./addAddressModal"
import { apiFetch } from "@/lib/api"

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

type ShippingOption = {
  shippingMethod: "REGULAR" | "NEXT_DAY" | "SAME_DAY"
  courier: string
  shippingService: string
  label: string
  estimate: string
}

type Props = {
  selectedAddressId: number | null
  onSelectAddress: (id: number) => void
  onSelectShipping: (option: ShippingOption) => void
}

export default function AddressShipping({
  selectedAddressId,
  onSelectAddress,
  onSelectShipping,
}: Props) {
  const [open, setOpen] = useState(false)
  const [addresses, setAddresses] = useState<Address[]>([])
  const [addOpen, setAddOpen] = useState(false)
  const [shippingOpen, setShippingOpen] = useState(false)
  const [selectedShipping, setSelectedShipping] = useState<{
  shippingMethod: "REGULAR" | "NEXT_DAY" | "SAME_DAY"
  courier: string
  shippingService: string
  label: string
  estimate: string
} | null>(null)
  async function fetchAddresses() {
  const token = localStorage.getItem("access_token")

  const data = await apiFetch("/addresses", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })

  setAddresses(data)
}

useEffect(() => {
  fetchAddresses()
}, [])
const selectedAddress = addresses.find(
  (address) => address.address_id === selectedAddressId
)

  return (
    <>
      <div className="flex w-200 flex-col gap-2 rounded-xl border border-gray-200 p-5 shadow-sm">
        <div className="flex w-full items-center justify-between">
          <p className="text-lg font-semibold text-gray-700">
            Alamat Pengiriman
          </p>

          <button
            type="button"
            onClick={() => setOpen(true)}
            className="cursor-pointer text-blue-800"
          >
            Ganti alamat
          </button>
        </div>

        <div className="mt-2 w-full border-t border-gray-300" />

        <div className="flex w-full items-center justify-between py-3">
          <div>
          {selectedAddress ? (
            <>
              <p className="font-semibold text-gray-700">
                {selectedAddress.recipientName} | {selectedAddress.phoneNumber}
              </p>

              <p className="mt-1 text-sm text-gray-500">
                {selectedAddress.fullAddress}, {selectedAddress.cityRegency},{" "}
                {selectedAddress.province} {selectedAddress.postalCode}
              </p>
            </>
          ) : (
            <p className="text-sm text-gray-500">
              Belum ada alamat dipilih
            </p>
          )}
        </div>

          <button
  type="button"
  onClick={() => setShippingOpen(true)}
  className="flex w-55 items-center justify-between rounded-full border border-gray-300 bg-white px-3 py-3"
>
  <span className="text-sm text-gray-600">
    {selectedShipping ? selectedShipping.label : "Pilih Metode"}
  </span>

  <IoChevronForward className="text-xl text-blue-700" />
</button>
        </div>

        <div className="w-full border-t border-gray-300" />

        <p className="mt-2 text-sm font-semibold text-gray-500">Notes:</p>

        <form className="w-full space-y-2">
          <input
            type="text"
            placeholder="Leave a message for us"
            className="w-full rounded-lg border border-gray-400 px-3 pb-8"
          />
        </form>
      </div>

      <AddressModal
        open={open}
        addresses={addresses}
        selectedAddressId={selectedAddressId}
        onClose={() => setOpen(false)}
        onSelect={onSelectAddress}
        onAddAddress={() => setAddOpen(true)}
      />

      <AddAddressModal
  open={addOpen}
  onClose={() => setAddOpen(false)}
  onSuccess={fetchAddresses}
/>    
          <ShippingModal
  open={shippingOpen}
  onClose={() => setShippingOpen(false)}
  onConfirm={(option) => {
    setSelectedShipping(option)
    onSelectShipping(option)
  }}
/>
    </>
  )
}