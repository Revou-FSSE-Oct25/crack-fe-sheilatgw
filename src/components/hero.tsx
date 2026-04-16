import React from 'react'
import {SwiperTop, SwiperHighlight, SwiperTopMobile, SwiperHighlightMobile} from './SwiperDisplay'
import Promotion from './promotion'
import {Catalog, CatalogMobile} from './catalog'

function Hero() {
  return (
    <div className='mt-15 md:mt-13'>
    <div className='flex flex-col gap-5'>
        <SwiperTop/>
        <SwiperTopMobile/>
        <Promotion/>
        <div className='hidden md:block'>
          <Catalog/>
        </div>
        <div className='block md:hidden'>
          <CatalogMobile/>
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