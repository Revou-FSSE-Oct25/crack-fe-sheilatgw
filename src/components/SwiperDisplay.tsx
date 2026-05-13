"use client";

import Image from 'next/image';
import { useRef, useState } from 'react';
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import { IoChevronBack, IoChevronForward } from "react-icons/io5";
import { MdArrowBack, MdArrowForward } from "react-icons/md";
import "swiper/css";
import "swiper/css/navigation";

export function SwiperTop() {
    const prevRef = useRef(null);
    const nextRef = useRef(null);

    return (
        <div className='bg-blue-950 w-full md:flex items-center py-3 relative group hidden'>
            <button ref={prevRef} className="absolute left-2 top-1/2 -translate-y-1/2 z-10 
            bg-white/80 backdrop-blur p-2 rounded-full shadow 
              opacity-50 group-hover:opacity-100 transition">
              <IoChevronBack size={20} />
            </button>

            <button ref={nextRef} className="absolute right-2 top-1/2 -translate-y-1/2 z-10 
            bg-white/80 backdrop-blur p-2 rounded-full shadow 
              opacity-50 group-hover:opacity-100 transition">
              <IoChevronForward size={20} />
            </button>
            <Swiper
            slidesPerView={3.5}
            spaceBetween={12}
            centeredSlides={true}
            loop={true}
            speed={1000}
            autoplay={{ delay: 5000, disableOnInteraction: false }}
            navigation={{}}
            onBeforeInit={(swiper) => {
            // @ts-ignore
            swiper.params.navigation.prevEl = prevRef.current;
            // @ts-ignore
            swiper.params.navigation.nextEl = nextRef.current;
            }}
            modules={[Navigation, Autoplay]}
            className="w-full mx-auto">
              {[1,2,3,4,5,6,7,8,9].map((i) => (
                <SwiperSlide>
                  <div className="relative w-full aspect-video rounded-2xl overflow-hidden">
                     <Image src="/slider4.webp" fill alt="carousel" className="object-cover"/>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
        </div>
      )
    }

export function SwiperHighlight (){
    const prevRef = useRef(null);
    const nextRef = useRef(null);

    return(
      <div className="w-full max-w-8xl px-36 mt-8 overflow-hidden">
          <p className="text-lg font-semibold text-gray-700 mb-4">
              Featured Highlights
          </p>

          <div className="relative rounded-sm overflow-hidden">
              <button ref={prevRef} className="absolute left-2 top-1/2 -translate-y-1/2 z-10 
                bg-white/80 backdrop-blur p-2 rounded-full shadow opacity-50 group-hover:opacity-100 transition">
                  <IoChevronBack size={20} />
              </button>

              <button ref={nextRef} className="absolute right-2 top-1/2 -translate-y-1/2 z-10 
                bg-white/80 backdrop-blur p-2 rounded-full shadow opacity-50 group-hover:opacity-100 transition">
                  <IoChevronForward size={20} />
              </button>

              <Swiper
              slidesPerView={3.5}
              spaceBetween={10}
              centeredSlides
              loop
              speed={800}
              autoplay={{ delay: 5000, disableOnInteraction: false }}
              navigation={{}}
              onBeforeInit={(swiper) => {
              // @ts-ignore
              swiper.params.navigation.prevEl = prevRef.current;
              // @ts-ignore
              swiper.params.navigation.nextEl = nextRef.current;
              }}
              modules={[Navigation, Autoplay]}>
                {[1,2,3,4,5,6,7,8,9].map((i) => (
                <SwiperSlide key={i}>
                  <div className="relative w-full h-50 rounded-sm overflow-hidden">
                    <Image
                      src="/slider4.webp"
                      fill
                      alt="carousel"
                      className="object-cover"
                    />
                  </div>
                </SwiperSlide>
                ))}
              </Swiper>
          </div>
      </div>
    )
}

export const SwiperTopMobile = () => {
      const prevRef = useRef(null);
      const nextRef = useRef(null);
    return (
        <div className='bg-blue-950 w-full flex md:hidden items-center py-4 relative group'>
            <button ref={prevRef} className="absolute left-2 top-1/2 -translate-y-1/2 z-10 
              bg-white/80 backdrop-blur p-2 rounded-full shadow opacity-50 group-hover:opacity-100 transition">
                <IoChevronBack size={20} />
            </button>

            <button ref={nextRef} className="absolute right-2 top-1/2 -translate-y-1/2 z-10 
              bg-white/80 backdrop-blur p-2 rounded-full shadow opacity-50 group-hover:opacity-100 transition">
                <IoChevronForward size={20} />
            </button>
        <Swiper
  slidesPerView={1.5}
  spaceBetween={12}
  centeredSlides={true}
  loop={true}
  speed={1000}
  autoplay={{ delay: 5000, disableOnInteraction: false }}
  navigation={{}}
  onBeforeInit={(swiper) => {
    // @ts-ignore
    swiper.params.navigation.prevEl = prevRef.current;
    // @ts-ignore
    swiper.params.navigation.nextEl = nextRef.current;
  }}
  modules={[Navigation, Autoplay]}
  className="w-full mx-auto">
    {[1,2,3,4,5,6,7,8,9].map((i) => (
        <SwiperSlide>
    <div className="relative w-full h-40 rounded-2xl overflow-hidden">
      <Image src="/slider4.webp" fill alt="carousel" className="object-cover"/>
    </div>
  </SwiperSlide>
      ))}
</Swiper>
</div>
    )
}

export function SwiperHighlightMobile() {
  const prevRef = useRef(null);
      const nextRef = useRef(null);
  return (
    <div className="w-full px-4 mt-6 relative group">
      
  <p className="text-lg font-semibold text-gray-700 mb-3">
    Featured Highlights
  </p>

  <button ref={prevRef} className="absolute left-2 top-1/2 -translate-y-1/2 z-20 
    bg-white/80 backdrop-blur p-2 rounded-full shadow opacity-50 group-hover:opacity-100 transition">
    <IoChevronBack size={20} />
  </button>

  <button ref={nextRef} className="absolute right-2 top-1/2 -translate-y-1/2 z-20 
    bg-white/80 backdrop-blur p-2 rounded-full shadow opacity-50 group-hover:opacity-100 transition">
    <IoChevronForward size={20} />
  </button>

  <Swiper
    slidesPerView={1.5}
    spaceBetween={12}
    centeredSlides
    loop
    speed={1000}
    autoplay={{ delay: 5000, disableOnInteraction: false }}
    navigation={{}}
    onBeforeInit={(swiper) => {
    // @ts-ignore
    swiper.params.navigation.prevEl = prevRef.current;
    // @ts-ignore
    swiper.params.navigation.nextEl = nextRef.current;
    }}
    modules={[Navigation, Autoplay]}
  >
    {[1,2,3,4,5,6,7,8,9].map((i) => (
      <SwiperSlide key={i}>
        <div className="relative w-full h-40 rounded-2xl overflow-hidden">
          <Image
            src="/slider4.webp"
            fill
            alt="carousel"
            className="object-cover"
          />
        </div>
      </SwiperSlide>
    ))}
  </Swiper>
</div>
  )
}


