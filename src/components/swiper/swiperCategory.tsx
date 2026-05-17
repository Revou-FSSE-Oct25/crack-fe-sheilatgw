"use client"

import Link from "next/link"
import { useRef, useState } from "react"
import { Swiper, SwiperSlide } from "swiper/react"
import { Navigation } from "swiper/modules"
import { IoChevronBack, IoChevronForward } from "react-icons/io5"

type Category = {
  category_id: number
  name: string
  slug: string
  parentId: number | null
}

type Props = {
  categories: Category[]
}

const categoryImages: Record<string, string> = {
  "prize-figure": "/images/categories/prize-figure.jpg",
  "nendoroid": "/images/categories/nendoroid.jpeg",
  "scale-figure": "/images/categories/scale-figure.webp",
  "pop-up-parade": "/images/categories/pop-up-parade.jpeg",
  "model-kit": "/images/categories/model-kit.webp",
  "figma": "/images/categories/figma.jpeg",
  "action-figure": "/images/categories/action-figure.jpeg",
  "mini-figure": "/images/categories/mini-figure.jpg",
  "lookup": "/images/categories/lookup.jpeg",
  "square-enix-world": "/images/categories/se-world.webp",
  "plush": "/images/categories/plush.jpeg",
  "keychain": "/images/categories/keychain.webp",
  "blind-box": "/images/categories/blind-box.jpeg",
  "acrylic-stand": "/images/categories/acrylic-stand.webp",
  "badge": "/images/categories/badge.webp",
  "mousepad": "/images/categories/mousepad.webp",
  "apparel": "/images/categories/apparel.webp",
  "electronics": "/images/categories/electronics.webp",
  "manga-novel": "/images/categories/manga.jpeg",
  "cosplay": "/images/categories/cosplay.webp"
}


export function SwiperCatalog({ categories }: Props) {
  const prevRef = useRef(null)
  const nextRef = useRef(null)
  const [showPrev, setShowPrev] = useState(false)

  return (
    <div className="relative">
      <button
        ref={prevRef}
        className={`absolute left-2 top-1/2 -translate-y-1/2 z-20 bg-white p-2 rounded-full shadow transition ${
          showPrev ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
      >
        <IoChevronBack size={20} />
      </button>

      <button
        ref={nextRef}
        className="absolute right-2 top-1/2 -translate-y-1/2 z-10 bg-white/80 backdrop-blur p-2 rounded-full shadow opacity-50 hover:opacity-100 transition"
      >
        <IoChevronForward size={20} />
      </button>

      <Swiper
        slidesPerView={2}
        spaceBetween={7}
        grabCursor
        navigation={{}}
        onBeforeInit={(swiper) => {
          // @ts-ignore
          swiper.params.navigation.prevEl = prevRef.current
          // @ts-ignore
          swiper.params.navigation.nextEl = nextRef.current
        }}
        onSlideChange={(swiper) => {
          setShowPrev(swiper.activeIndex > 0)
        }}
        modules={[Navigation]}
      >
        {categories.map((category) => (
          <SwiperSlide key={category.category_id}>
            <Link
              href={`/products?search=${encodeURIComponent(category.name)}`}
              className="bg-white rounded-xl border border-gray-200 p-3 flex flex-col items-center justify-center w-30 h-40 hover:bg-gray-50 transition"
            >
              <img src={ categoryImages[category.slug] ?? "/images/categories/default.png"}
                   alt={category.name} className="h-16 w-16 object-contain mb-3"/>
              <p className="text-sm text-center font-bold text-gray-700">
                {category.name}
              </p>
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  )
}