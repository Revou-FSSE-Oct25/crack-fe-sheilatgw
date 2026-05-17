import Image from "next/image"

function Promotion() {
  return (
    <div className="flex flex-col px-3 md:px-6 gap-5">

      {/* mobile */}
      <div className="flex flex-col md:hidden gap-4 max-w-7xl mx-auto w-full">

        <div className="relative h-100 rounded-xl overflow-hidden">
          <Image
            src="/images/promotion/banner1.jpg"
            alt="banner 1"
            fill
            className="object-cover"
          />
        </div>

        <div className="flex gap-3">

          <div className="relative flex-1 h-30 rounded-xl overflow-hidden">
            <Image
              src="/images/promotion/banner2.jpg"
              alt="banner 2"
              fill
              className="object-cover"
            />
          </div>

          <div className="relative flex-1 h-30 rounded-xl overflow-hidden">
            <Image
              src="/images/promotion/banner3.jpg"
              alt="banner 3"
              fill
              className="object-cover"
            />
          </div>

        </div>
      </div>

      <div className="flex flex-col md:hidden gap-4 max-w-7xl mx-auto w-full">

        <div className="relative flex-1 h-35 rounded-xl overflow-hidden">
          <Image
            src="/images/promotion/banner4.jpg"
            alt="banner 4"
            fill
            className="object-cover"
          />
        </div>

        <div className="relative flex-1 h-35 rounded-xl overflow-hidden">
          <Image
            src="/images/promotion/banner5.jpg"
            alt="banner 5"
            fill
            className="object-cover"
          />
        </div>

        <div className="relative flex-1 h-35 rounded-xl overflow-hidden">
          <Image
            src="/images/promotion/banner6.jpg"
            alt="banner 6"
            fill
            className="object-cover"
          />
        </div>

      </div>

      {/* desktop */}
      <div className="hidden md:flex gap-4 max-w-360 mt-4 mx-auto w-full">

        <div className="relative flex-2 h-50 rounded-xl overflow-hidden">
          <Image
            src="/images/promotion/banner1.jpg"
            alt="banner 1"
            fill
            className="object-cover"
          />
        </div>

        <div className="relative flex-1 h-50 rounded-xl overflow-hidden">
          <Image
            src="/images/promotion/banner2.jpg"
            alt="banner 2"
            fill
            className="object-cover"
          />
        </div>

        <div className="relative flex-1 h-50 rounded-xl overflow-hidden">
          <Image
            src="/images/promotion/banner3.jpg"
            alt="banner 3"
            fill
            className="object-cover"
          />
        </div>

      </div>

      <div className="hidden md:flex gap-4 max-w-360 mx-auto w-full">

        <div className="relative flex-1 h-45 rounded-xl overflow-hidden">
          <Image
            src="/images/promotion/banner4.jpg"
            alt="banner 4"
            fill
            className="object-cover"
          />
        </div>

        <div className="relative flex-1 h-45 rounded-xl overflow-hidden">
          <Image
            src="/images/promotion/banner5.jpg"
            alt="banner 5"
            fill
            className="object-cover"
          />
        </div>

        <div className="relative flex-1 h-45 rounded-xl overflow-hidden">
          <Image
            src="/images/promotion/banner6.jpg"
            alt="banner 6"
            fill
            className="object-cover"
          />
        </div>

      </div>
    </div>
  )
}

export default Promotion