"use client"

import { useMemo, useState } from "react"

export type SearchSelectOption = {
  id: number
  name: string
}

type Props = {
  value: string
  placeholder: string
  options: SearchSelectOption[]
  onChange: (value: string) => void
  onSelect: (option: SearchSelectOption) => void
}

export default function SearchSelect({
  value,
  placeholder,
  options,
  onChange,
  onSelect,
}: Props) {
  const [open, setOpen] = useState(false)

  const filtered = useMemo(() => {
    if (!value) return options

    return options.filter((item) =>
      item.name.toLowerCase().includes(value.toLowerCase()),
    )
  }, [options, value])

  return (
    <div className="relative">
      <div className="flex items-center overflow-hidden rounded-md border bg-white focus-within:ring-2 focus-within:ring-orange-200">
        <input
          value={value}
          onFocus={() => setOpen(true)}
          onChange={(e) => {
            onChange(e.target.value)
            setOpen(true)
          }}
          placeholder={placeholder}
          className="flex-1 px-3 py-2 outline-none"
        />

        {value && (
          <button
            type="button"
            onClick={() => {
              onChange("")
              setOpen(true)
            }}
            className="px-2 text-gray-400 hover:text-black"
          >
            ✕
          </button>
        )}

        <button
          type="button"
          onClick={() => setOpen((prev) => !prev)}
          className="border-l px-3 text-gray-500"
        >
          ▼
        </button>
      </div>

      {open && (
        <div className="absolute left-0 top-full z-50 mt-1 max-h-56 w-full overflow-y-auto rounded-md border bg-white shadow-lg">
          {filtered.length > 0 ? (
            filtered.map((item) => (
              <button
                key={item.id}
                type="button"
                onMouseDown={() => {
                  onSelect(item)
                  onChange(item.name)
                  setOpen(false)
                }}
                className={`block w-full px-4 py-3 text-left text-sm hover:bg-orange-100 ${
                  value === item.name ? "bg-orange-100" : ""
                }`}
              >
                {item.name}
              </button>
            ))
          ) : (
            <p className="px-4 py-3 text-sm text-gray-500">
              Data tidak ditemukan
            </p>
          )}
        </div>
      )}
    </div>
  )
}