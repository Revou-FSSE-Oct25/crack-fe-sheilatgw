import React from 'react'

type Product = {
  id: number
  name: string
  price: number
  stock: number
  status: "ready" | "sold" | "PO" | "late PO" | "order close"
}

const statusDetails = {
    ready: { text: "Ready Stock", color: "bg-[#41b774]"},
    sold: { text: "Sold Out", color: "bg-neutral-900"},
    PO: { text: "Pre-Order", color: "bg-[#657996]"},
    "late PO": { text: "Late Pre-Order", color: "bg-[#d3647a]"},
    "order close": { text: "PO Closed", color: "bg-neutral-900"}
}

function StatusBadge({ status }: { status: Product["status"] }) {
  const badge = statusDetails[status]

  return (
    <div className={`w-fit text-white font-bold text-xs px-1 md:px-2 py-0.5 rounded ${badge.color}`}>
      {badge.text}
    </div>
  )
}

export default StatusBadge