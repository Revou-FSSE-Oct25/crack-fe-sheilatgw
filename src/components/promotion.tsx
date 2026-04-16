import React from 'react'

function Promotion() {
  return (
    <div className='flex flex-col px-3 md:px-6 gap-5'>
         {/* mobile */}
         <div className="flex flex-col md:hidden gap-4 max-w-7xl mx-auto w-full">
            <div className="h-100 rounded-xl bg-red-300"></div>
            <div className="flex gap-3">
                <div className=" flex-1 h-30 rounded-xl bg-green-300"></div>
                <div className=" flex-1 h-30 rounded-xl bg-blue-300"></div>
            </div>
        </div>
        <div className="flex flex-col md:hidden gap-4 max-w-7xl mx-auto w-full">
            <div className="flex-1">
                <div className="h-35 rounded-xl bg-yellow-300"></div>
            </div>
            <div className="flex-1">
                <div className="h-35 rounded-xl bg-cyan-300"></div>
            </div>
            <div className="flex-1">
                <div className="h-35 rounded-xl bg-gray-300"></div>
            </div>
        </div>

         {/* desktop */}
        <div className="hidden md:flex gap-4 max-w-360 mt-4 mx-auto w-full">
            <div className="flex-2">
                <div className="h-50 rounded-xl bg-red-300"></div>
            </div>
            <div className="flex-1">
                <div className="h-50 rounded-xl bg-green-300"></div>
            </div>
            <div className="flex-1">
                <div className="h-50 rounded-xl bg-blue-300"></div>
            </div>
        </div>
        <div className="hidden md:flex gap-4 max-w-360 mx-auto w-full">
            <div className="flex-1">
                <div className="h-45 rounded-xl bg-yellow-300"></div>
            </div>
            <div className="flex-1">
                <div className="h-45 rounded-xl bg-cyan-300"></div>
            </div>
            <div className="flex-1">
                <div className="h-45 rounded-xl bg-gray-300"></div>
            </div>
        </div>
    </div>

  )
}

export default Promotion


