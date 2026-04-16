import React from 'react'

function Header() {
  return (
    <header className="h-16 bg-white shadow flex items-center justify-between px-6">
      <h1 className="font-semibold">Dashboard</h1>

      <div className="flex items-center gap-4">
        <span className="text-sm text-gray-600">Admin</span>
        <div className="w-8 h-8 bg-gray-300 rounded-full"></div>
      </div>
    </header>
  )
}

export default Header