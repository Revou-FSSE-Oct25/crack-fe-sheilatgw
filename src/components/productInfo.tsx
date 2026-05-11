type ProductInfoRowsProps = {
  character: string
  series: string
  category: string
  manufacturer: string
}

export default function ProductInfoRows({
  character,
  series,
  category,
  manufacturer,
}: ProductInfoRowsProps) {
  const rows = [
    { label: "Character", value: character },
    { label: "Series", value: series },
    { label: "Category", value: category },
    { label: "Manufacturer", value: manufacturer },
  ]

  return (
    <div className="space-y-3">
      {rows.map((row) => (
        <div key={row.label} className="flex items-center">
          <p className="w-35 text-sm text-gray-600">{row.label}</p>

          <button className="bg-gray-200 hover:bg-blue-800 text-sm text-gray-600 hover:text-white px-4 py-0.5 rounded-full cursor-pointer">
            {row.value}
          </button>
        </div>
      ))}
    </div>
  )
}