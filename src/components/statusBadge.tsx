type ProductStatus =
  | "READY_STOCK"
  | "SOLD_OUT"
  | "PO"
  | "LATE_PO"
  | "PO_CLOSED"

const statusDetails: Record<ProductStatus, { text: string; color: string }> = {
  READY_STOCK: { text: "Ready Stock", color: "bg-[#41b774]" },
  SOLD_OUT: { text: "Sold Out", color: "bg-neutral-900" },
  PO: { text: "Pre-Order", color: "bg-[#657996]" },
  LATE_PO: { text: "Late Pre-Order", color: "bg-[#d3647a]" },
  PO_CLOSED: { text: "PO Closed", color: "bg-neutral-900" },
}

function getBadge(status: string) {
  return (
    statusDetails[status as ProductStatus] ?? {
      text: status,
      color: "bg-gray-500",
    }
  )
}

export function StatusBadge({ status }: { status: string }) {
  const badge = getBadge(status)

  return (
    <div
      className={`w-fit text-white font-bold text-xs px-1 md:px-2 py-0.5 rounded ${badge.color}`}
    >
      {badge.text}
    </div>
  )
}

export function LargeStatusBadge({ status }: { status: string }) {
  const badge = getBadge(status)

  return (
    <div
      className={`flex items-center justify-center leading-none w-fit text-white font-bold text-sm px-4 py-1 rounded-full ${badge.color}`}
    >
      {badge.text}
    </div>
  )
}