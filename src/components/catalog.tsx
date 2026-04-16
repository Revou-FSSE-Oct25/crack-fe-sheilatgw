import React from 'react'
import { SwiperCatalogMobile } from './SwiperDisplay'

export function Catalog() {
  return (
    <div className="max-w-8xl mx-auto px-40 mt-8 hidden md:block">
      <p className="text-lg font-semibold text-gray-700 mb-4">
          Explore By Category
      </p>

  <div className="flex flex-col gap-4">
    <div className="flex gap-2 items-center">
        <div className="col-span-2 row-span-1 h-45 w-35 rounded-xl bg-blue-800 flex items-center justify-center text-white font-semibold text-center"></div>
    <div className='grid grid-cols-10 gap-2'>
    <div className="h-38 w-25 rounded-xl bg-gray-200"></div>
    <div className="h-38 w-25 rounded-xl bg-gray-200"></div>
    <div className="h-38 w-25 rounded-xl bg-gray-200"></div>
    <div className="h-38 w-25 rounded-xl bg-gray-200"></div>
    <div className="h-38 w-25 rounded-xl bg-gray-200"></div>
    <div className="h-38 w-25 rounded-xl bg-gray-200"></div>
    <div className="h-38 w-25 rounded-xl bg-gray-200"></div>
    <div className="h-38 w-25 rounded-xl bg-gray-200"></div>
    <div className="h-38 w-25 rounded-xl bg-gray-200"></div>
    <div className="h-38 w-25 rounded-xl bg-gray-200"></div>
    </div>
    </div>
    <div className="flex gap-2 items-center">
        <div className="col-span-2 row-span-1 h-45 w-35 rounded-xl bg-blue-800 flex items-center justify-center text-white font-semibold text-center">
      
    </div>
    <div className='grid grid-cols-10 gap-2'>
    <div className="h-38 w-25 rounded-xl bg-gray-200"></div>
    <div className="h-38 w-25 rounded-xl bg-gray-200"></div>
    <div className="h-38 w-25 rounded-xl bg-gray-200"></div>
    <div className="h-38 w-25 rounded-xl bg-gray-200"></div>
    <div className="h-38 w-25 rounded-xl bg-gray-200"></div>
    <div className="h-38 w-25 rounded-xl bg-gray-200"></div>
    <div className="h-38 w-25 rounded-xl bg-gray-200"></div>
    <div className="h-38 w-25 rounded-xl bg-gray-200"></div>
    <div className="h-38 w-25 rounded-xl bg-gray-200"></div>
    <div className="h-38 w-25 rounded-xl bg-gray-200"></div>
    </div>
    </div>
  </div>
</div>
  )
}

export function CatalogMobile(){
    return(
     <div className="max-w-8xl px-4 mt-6 md:hidden">
      <p className="text-lg font-semibold text-gray-700 mb-4">
          Explore By Category
      </p>

  <div className="flex flex-col gap-4">
    <div className="flex gap-2 items-center">
        <div className="col-span-2 row-span-1 h-45 w-35 rounded-xl bg-blue-800 flex items-center justify-center text-white font-semibold text-center"></div>
        <div className="flex-1 min-w-0">
            <SwiperCatalogMobile/>
        </div>
    </div>
    <div className="flex gap-2 items-center">
        <div className="col-span-2 row-span-1 h-45 w-35 rounded-xl bg-blue-800 flex items-center justify-center text-white font-semibold text-center"></div>
        <div className="flex-1 min-w-0">
            <SwiperCatalogMobile/>
        </div>
    </div>
    </div>
    
    </div>
    )
}

