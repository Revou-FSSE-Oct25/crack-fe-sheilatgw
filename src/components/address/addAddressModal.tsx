import { useState } from "react"
import { apiFetch } from "@/lib/api"

type Props = {
  open: boolean
  onClose: () => void
  onSuccess: () => void | Promise<void>
}

export default function AddAddressModal({ open, onClose, onSuccess }: Props) {
  const [recipientName, setRecipientName] = useState("")
  const [phoneNumber, setPhoneNumber] = useState("")
  const [fullAddress, setFullAddress] = useState("")
  const [province, setProvince] = useState("")
  const [cityRegency, setCityRegency] = useState("")
  const [postalCode, setPostalCode] = useState("")

  if (!open) return null

  async function handleSubmit() {
    try {
      const token = localStorage.getItem("access_token")

      await apiFetch("/addresses", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          recipientName: recipientName.trim(),
          phoneNumber: phoneNumber.trim(),
          fullAddress: fullAddress.trim(),
          province: province.trim(),
          cityRegency: cityRegency.trim(),
          postalCode: postalCode.trim(),
        }),
      })

      await onSuccess()
      onClose()
    } catch (error) {
      alert(error instanceof Error ? error.message : "Gagal tambah alamat")
      console.error(error)
    }
  }

  return (
    <div className="fixed inset-0 z-60 flex items-center justify-center bg-black/50">
      <div className="w-[90%] max-w-xl pt-2 pb-5 rounded-2xl bg-white">
        <div className="flex items-center justify-between border-b border-gray-300 px-8 py-6 mx-8">
          <p className="text-2xl font-semibold text-gray-800">Tambah Alamat</p>

          <button type="button" onClick={onClose} className="text-3xl text-gray-500">
            ×
          </button>
        </div>

        <div className="space-y-2 px-8 py-4">
          <input
            value={recipientName}
            onChange={(e) => setRecipientName(e.target.value)}
            className="w-full rounded-xl border px-5 py-4"
            placeholder="Nama Penerima"
          />

          <input
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            className="w-full rounded-xl border px-5 py-4"
            placeholder="Nomor Telepon"
          />

          <textarea
            value={fullAddress}
            onChange={(e) => setFullAddress(e.target.value)}
            className="w-full rounded-xl border px-5 py-4"
            placeholder="Alamat Lengkap"
          />

          <input
            value={province}
            onChange={(e) => setProvince(e.target.value)}
            className="w-full rounded-xl border px-5 py-4"
            placeholder="Provinsi"
          />

          <input
            value={cityRegency}
            onChange={(e) => setCityRegency(e.target.value)}
            className="w-full rounded-xl border px-5 py-4"
            placeholder="Kota"
          />

          <input
            value={postalCode}
            onChange={(e) => setPostalCode(e.target.value)}
            className="w-full rounded-xl border px-5 py-4"
            placeholder="Kode Pos"
          />

          <button
            type="button"
            onClick={handleSubmit}
            className="w-full rounded-xl bg-blue-800 py-4 font-semibold text-white"
          >
            Simpan
          </button>
        </div>
      </div>
    </div>
  )
}