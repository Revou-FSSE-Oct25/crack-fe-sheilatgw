import React from 'react'
import {SwiperTop, SwiperHighlight, SwiperTopMobile, SwiperHighlightMobile} from './SwiperDisplay'
import Promotion from './promotion'
import {Catalog} from './catalog'
import { apiFetch } from "@/lib/api"

type Category = {
  category_id: number
  name: string
  slug: string
  parentId: number | null
}

async function Hero() {
  const categories: Category[] = await apiFetch("/category")
  return (
    <div className='mt-13 md:mt-16'>
    <div className='flex flex-col gap-5'>
        <SwiperTop/>
        <SwiperTopMobile/>
        <div className=''>
          <Catalog categories={categories}/>
        </div>
        <div className="hidden md:block">
          <SwiperHighlight/>
        </div>
        <div className="block md:hidden">
          <SwiperHighlightMobile/>
        </div>
    </div>
    </div>
  )
}

export default Hero