import Wishlist from "@/components/wishlist"
import { AddToCartLargeButton } from "@/components/addToCartButton"
import { LargeStatusBadge } from "@/components/statusBadge"
import QuantitySelector from "@/components/QuantitySelector"
import ProductInfoRows from "@/components/productInfo"

const product = {
  id: 1,
  title: "Nendoroid Oblivionis / Togawa Sakiko - BanG Dream! Ave Mujica",
  image: "https://kyoucdn.id/items/530807-nendoroid-oblivionis-togawa-sakiko-bang-dream-ave-mujica.jpg.webp",
  price: '720.000',
  description:
    `The sun heads toward Capricorn, now, the sky is filled with 
     Ah, a black sea Yes, my heart grieving that my screams do not reach God
     Lamenting this fate

     Once again, a curtsy stirs up your lust
     Where do virtue and this soul go?

     Entice me, entice me, entice me, entice me
     Mock me, humiliate someone like me
     I hate this, I hate it, I really hate it, so stop
     I truly hate this highlight of despair
     The swaying shadow of the Grim Reaper`,
  status: 'PO',
  character: 'Togawa Sakiko',
  series: 'BanG Dream!',
  category: 'Nendoroid',
  manufacturer: "Good Smile Arts Shanghai",
}

export default function ProductDetail() {
  return (
    <>
      <div className="hidden md:block min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-6 py-20">
        <div className="bg-white p-6 shadow grid grid-cols-2 gap-8 rounded-lg">
          <div className="w-full h-140 bg-stone-100 flex items-center justify-center overflow-hidden">
              <img
                src={product.image}
                alt={product.title}
                className="max-w-full max-h-full object-contain"
              />
          </div>
          <div className="p-5 md:p-0">
            <div className="flex items-center gap-4">
                <LargeStatusBadge status='PO'/>
                <p className="text-sm text-gray-500 font-semibold">
                Order Closes 26 May 2026!
              </p>
            </div>
            <h1 className="text-2xl font-semibold line-clamp-3 mt-2">
              {product.title}
            </h1>
            <div className="flex items-center space-x-1 mt-2">
              <p className="text-gray-500 text-sm">
                By {product.manufacturer}
              </p>
            </div>
            <div className="hidden md:block border-t border-gray-300 w-full mt-5"></div>
            <p className="text-2xl font-semibold mt-8 md:mt-4 text-blue-800">IDR {product.price}</p>
            <div className="flex items-center gap-8 mt-3 mb-4">
                <div>
                    <p className="text-xs text-gray-500">Minimum DP</p>
                    <p className="text-sm text-gray-700 mt-2">IDR 200.000</p>
                </div>

                <div className="border-l border-gray-300 pl-8">
                    <p className="text-xs text-gray-500">Full Payment Discount</p>
                    <p className="text-sm text-gray-700 mt-2">IDR 20.000</p>
                </div>
            </div>
            <QuantitySelector/>
            <div className="mt-6 flex items-center gap-6">
              <Wishlist />
              <AddToCartLargeButton product={product} />
            </div>
            <div className=" border-t border-gray-300 w-full mt-5"></div>
            <p className="text-gray-600 whitespace-pre-line text-sm my-4">
              {product.description}
            </p>
            <ProductInfoRows
                character={product.character}
                series={product.series}
                category={product.category}
                manufacturer={product.manufacturer}
            />
          </div>
        </div>
      </div>
    </div>

    <div className="md:hidden min-h-screen bg-gray-50 flex flex-col gap-5 mb-10">
        <section className="bg-white border-b border-gray-300">
            <img src={product.image} alt={product.title}
            className="w-full object-cover"/>
            <div className="p-4">
                <div className="flex items-center gap-3">
                  <LargeStatusBadge status="PO" />
                  <p className="text-xs text-gray-500 font-semibold">
                    Order Closes 26 May 2026!
                  </p>
                </div>
                <h1 className="text-sm font-semibold mt-3 leading-snug">
                  {product.title}
                </h1>
                <p className="text-gray-500 mt-2">
                  By {product.manufacturer}
                </p>
                <p className="text-xl font-semibold pt-8 text-blue-800">
                  IDR {product.price}
                </p>
                <p className="text-xs pt-4 text-blue-700">Pay in full, save IDR 10.000</p>
            </div>
        </section>

        <section className="bg-white border-y border-gray-300 p-4">
            <div className="flex flex-col gap-2">
                <p className="text-base text-gray-700 font-bold">
                  Pre-Order Information
                </p>
            </div>
        </section>

        <section className="bg-white border-y border-gray-300 p-4">
            <ProductInfoRows
                character={product.character}
                series={product.series}
                category={product.category}
                manufacturer={product.manufacturer}
            />
        </section>

        <section className="bg-white border-y border-gray-300 p-4">
            <div className="flex flex-col gap-2">
                <p className="text-base text-gray-700 font-bold">
                  About This Item
                </p>
                <p className="text-gray-600 whitespace-pre-line text-sm my-4">
                  {product.description}
                </p>
            </div>
        </section>
    </div>
    </>
  )
}