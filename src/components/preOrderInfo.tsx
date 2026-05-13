type PreOrderInfoProps = {
  minimumDp: string
  releaseMonth?: string | null
  estimatedMonth?: string | null
}

export default function PreOrderInfo({
  minimumDp,
  releaseMonth,
  estimatedMonth,
}: PreOrderInfoProps) {
  return (
    <section className="bg-white py-4">
      <div className="font-medium text-xs md:text-sm space-y-2 text-gray-700 md:text-[#657996]">
        <div className="flex justify-between md:hidden">
          <p className="text-gray-500">Minimum DP</p>
          <p>IDR {minimumDp}</p>
        </div>

        <div className="flex justify-between md:justify-start">
          <p className="text-gray-500">Releases</p>
          <p className="px-2">{releaseMonth}</p>
        </div>

        <div className="flex justify-between md:justify-start">
          <p className="text-gray-500">Estimated Arrival</p>
          <p className="px-2">{estimatedMonth}</p>
        </div>
      </div>
      <p className="text-xs text-gray-700 pt-1">*Diperkirakan tiba 5-8 minggu setelah tanggal rilis</p>
    </section>
  )
}