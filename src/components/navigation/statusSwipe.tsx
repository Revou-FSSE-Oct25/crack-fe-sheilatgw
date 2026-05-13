import { useState } from "react"
import { MdArrowBack, MdArrowForward } from "react-icons/md"
import { Swiper, SwiperSlide } from "swiper/react"
import type { Dispatch, SetStateAction } from "react"
import type { ProductStatus } from "@/components/productSection"

type Props = {
  active: ProductStatus
  onChange: Dispatch<SetStateAction<ProductStatus>>
}

export function StatusSwipe({ active, onChange }: Props) {
  const [swiper, setSwiper] = useState<any>(null)

  const tabs: { label: string; value: ProductStatus }[] = [
    { label: "All Items", value: "ALL" },
    { label: "Ready Stock", value: "READY_STOCK" },
    { label: "Pre-Order", value: "PO" },
    { label: "Late Pre-Order", value: "LATE_PO" },
  ]

  return (
    <div className="md:hidden border-b border-gray-300 flex items-center h-7">
      <button
        type="button"
        onClick={() => swiper?.slideTo(0)}
        className="w-8 flex justify-start text-gray-400 -ml-2"
      >
        <MdArrowBack size={18} />
      </button>

      <Swiper
        slidesPerView="auto"
        spaceBetween={30}
        onSwiper={setSwiper}
        className="flex-1"
      >
        {tabs.map((tab) => (
          <SwiperSlide key={tab.value} className="w-auto!">
            <div className="flex flex-col">
              <button
                type="button"
                onClick={() => onChange(tab.value)}
                className={`text-sm pb-2 ${
                  active === tab.value
                    ? "text-blue-800 font-semibold"
                    : "text-gray-400"
                }`}
              >
                {tab.label}
              </button>

              {active === tab.value && (
                <div className="h-0.5 w-20 bg-blue-800 rounded-full" />
              )}
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      <button
        type="button"
        onClick={() => swiper?.slideTo(swiper.slides.length - 1)}
        className="w-8 flex justify-end text-gray-400 -mr-2"
      >
        <MdArrowForward size={18} />
      </button>
    </div>
  )
}