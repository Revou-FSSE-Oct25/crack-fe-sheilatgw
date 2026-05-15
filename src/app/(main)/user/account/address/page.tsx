"use client"

import { useEffect, useState } from "react"
import AddAddressModal from "@/components/address/addAddressModal"
import EditAddressModal from "@/components/address/editAddressModal"
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


export default function AddressPage() {
  const [addresses, setAddresses] = useState<Address[]>([])
  const [search, setSearch] = useState("")
  const [addOpen, setAddOpen] = useState(false)
  const [editOpen, setEditOpen] = useState(false)
  const [selectedAddress, setSelectedAddress] = useState<Address | null>(null)

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

async function handleDeleteAddress(id: number) {
  const confirmDelete = confirm("Yakin mau hapus alamat ini?")
  if (!confirmDelete) return

  try {
    const token = localStorage.getItem("access_token")

    await apiFetch(`/addresses/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })

    await fetchAddresses()
  } catch (error) {
    alert(error instanceof Error ? error.message : "Gagal hapus alamat")
  }
}

async function handleSetDefaultAddress(id: number) {
  try {
    const token = localStorage.getItem("access_token")

    await apiFetch(`/addresses/${id}/default`, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })

    await fetchAddresses()
  } catch (error) {
    alert(error instanceof Error ? error.message : "Gagal set alamat utama")
  }
}

  const filteredAddresses = addresses.filter((address) =>
    `${address.recipientName} ${address.phoneNumber} ${address.fullAddress} ${address.cityRegency} ${address.province} ${address.postalCode}`
      .toLowerCase()
      .includes(search.toLowerCase())
  )

  return (
    <section className="w-full rounded-xl bg-white p-3">
      <div className="mb-3 flex items-center justify-between">
        <h1 className="text-4xl font-bold text-gray-800">Address Book</h1>

        <button type="button" onClick={() => setAddOpen(true)} className="rounded-full bg-blue-600 px-3 py-2 font-semibold text-white hover:bg-blue-700">
          + Tambah Alamat
        </button>
      </div>

      <div className="mb-5 border-t border-gray-200" />

      <input
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search Address"
        className="mb-5 w-full rounded-full border border-gray-300 px-6 py-3 text-gray-700 outline-none focus:border-blue-500"
      />

      <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
        {filteredAddresses.map((address) => (
          <div
            key={address.address_id}
            className={`min-h-40 rounded-xl border p-4 shadow-sm ${
              address.isDefault
                ? "border-blue-100 bg-blue-50"
                : "border-gray-200 bg-white"
            }`}
          >
            <div className="flex items-start justify-between gap-4">
              <div className="min-w-0 flex-1">
                <p className="font-semibold text-gray-800">
                  {address.recipientName}
                  <span className="mx-3 text-gray-500">|</span>
                  <span>{address.phoneNumber}</span>
                </p>

                <p className="mt-3 text-sm leading-relaxed text-gray-700">
                  {address.fullAddress}, {address.cityRegency},{" "}
                  {address.province} {address.postalCode}
                </p>
              </div>

              {address.isDefault && (
                <span className="shrink-0 rounded-full bg-blue-600 p-2 text-sm font-semibold text-white">
                  Main Address
                </span>
              )}
            </div>

            <div className="mt-4 flex items-center gap-3 text-sm font-medium text-blue-600">
              <button type="button" onClick={() => { setSelectedAddress(address); setEditOpen(true)}}>Edit</button>
              <span className="text-gray-300">|</span>
              <button type="button" onClick={() => handleDeleteAddress(address.address_id)}>
                Delete
              </button>

            {!address.isDefault && (
            <>
                <span className="text-gray-300">|</span>
                <button type="button" onClick={() => handleSetDefaultAddress(address.address_id)}>
                    Set as Main Address
                </button>
            </>
            )}
                        </div>
                    </div>
                    ))}
      </div>
      <AddAddressModal
        open={addOpen}
        onClose={() => setAddOpen(false)}
        onSuccess={() => {
          fetchAddresses()
          setAddOpen(false)
        }}
      />
      <EditAddressModal
        open={editOpen}
        address={selectedAddress}
        onClose={() => setEditOpen(false)}
        onSuccess={fetchAddresses}
      />
    </section>
  )
}