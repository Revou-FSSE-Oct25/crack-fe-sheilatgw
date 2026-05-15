import Link from "next/link"

export default function OrderSuccessPage() {
  return (
    <div className="flex min-h-screen items-center justify-center px-4">
      <div className="w-full max-w-md rounded-2xl border border-gray-200 p-8 text-center shadow-sm">
        <h1 className="text-2xl font-bold text-blue-800">
          Order Berhasil
        </h1>

        <p className="mt-3 text-gray-500">
          Pesanan kamu berhasil dibuat!
        </p>

        <Link
          href="/user/history"
          className="mt-6 inline-block rounded-lg bg-blue-800 px-6 py-3 font-semibold text-white"
        >
          Lihat Pesanan
        </Link>
      </div>
    </div>
  )
}