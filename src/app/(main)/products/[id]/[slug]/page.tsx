import { LargeStatusBadge } from "@/components/statusBadge"
import ProductInfoRows from "@/components/productInfo"
import PreOrderInfo from "@/components/preOrderInfo"
import ProductDetailClient from "./productDetailClient"
import AddMobile from "@/components/navigation/lowMobile"
import { apiFetch } from "@/lib/api"
import { Product } from '@/types/product'

function getMinimumDP(price: number) {
  if (price <= 200000) return 50000
  if (price <= 700000) return 100000
  if (price <= 1000000) return 200000
  if (price <= 1500000) return 300000
  if (price <= 2000000) return 800000
  if (price <= 3000000) return 1500000

  return 2000000
}

function getProductStatus(product: Product) {
  if (product.isSoldOut) return "SOLD_OUT"
  if (product.orderType === "READY_STOCK") return "READY_STOCK"
  if (product.preStatus === "LATE") return "LATE_PO"
  if (product.preStatus === "CLOSED") return "PO_CLOSED"
  return "PO"
}

export default async function ProductDetail({params,}: {params: Promise<{ id: string; slug: string }>}) {
  const { id } = await params
  const product = await apiFetch(`/product/${id}`)
  return (
    <>
      <div className="hidden md:block min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-6 py-20">
        <div className="bg-white p-6 shadow grid grid-cols-2 gap-8 rounded-lg">
          <div className="w-full h-140 bg-stone-100 flex items-center justify-center overflow-hidden">
              <img
                src={product.imageUrl}
                alt={product.name}
                className="max-w-full max-h-full object-contain"
              />
          </div>
          <div className="p-5 md:p-0">
            <div className="flex items-center gap-4">
                <LargeStatusBadge status={getProductStatus(product)}/>
                {product.orderType === "PO" && product.preStatus === "NORMAL" && product.poDeadline && (
                  <p className="text-sm text-gray-500 font-semibold">
                    Order Closes{" "}
                    {new Date(product.poDeadline).toLocaleDateString("en-GB", {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    })}
                    !
                  </p>
                )}
            </div>
            <h1 className="text-2xl font-semibold line-clamp-3 mt-2">
              {product.name}
            </h1>
            <div className="flex items-center space-x-1 mt-2">
              <p className="text-gray-500 text-sm">
                By {product.manufacturer.name}
              </p>
            </div>
            <div className="hidden md:block border-t border-gray-300 w-full mt-5"></div>
            <p className="text-2xl font-semibold mt-8 md:mt-4 mb-2 text-blue-800">IDR {Number(product.price.toString()).toLocaleString("id-ID")}</p>
           {product.orderType === "PO" && (
              <div className="flex items-center gap-8 mt-3 mb-4">
                <div>
                  <p className="text-xs text-gray-500">Minimum DP</p>
                  <p className="text-sm text-gray-700 mt-2">
                    IDR {getMinimumDP(Number(product.price)).toLocaleString("id-ID")}
                  </p>
                </div>

                <div className="border-l border-gray-300 pl-8">
                  <p className="text-xs text-gray-500">
                    Full Payment Discount
                  </p>

                  <p className="text-sm text-gray-700 mt-2">
                    IDR {product.fullPaymentDiscount?.toLocaleString("id-ID")}
                  </p>
                </div>
              </div>
            )}
            
            {product.orderType === "PO" && (
                <PreOrderInfo minimumDp={product.minimumDP?.toLocaleString("id-ID")}
            releaseMonth={product.poReleaseMonth} estimatedMonth={product.poEstimatedMonth}/>
            )}
            <ProductDetailClient product={product} />
            <div className=" border-t border-gray-300 w-full mt-5"></div>
            <p className="text-gray-600 whitespace-pre-line text-sm my-4">
              {product.description}
            </p>
            <ProductInfoRows
                character={product.character.name}
                series={product.series.name}
                category={product.category.name}
                manufacturer={product.manufacturer.name}
            />
          </div>
        </div>
      </div>
    </div>

    <div className="md:hidden min-h-screen bg-gray-50 flex flex-col gap-5 mb-10">
        <section className="bg-white border-b border-gray-300">
            <img src={product.imageUrl} alt={product.name}
            className="w-full object-cover"/>
            <div className="p-4">
                <div className="flex items-center gap-3">
                  <LargeStatusBadge status={getProductStatus(product)} />
                  {product.orderType === "PO" && product.preStatus === "NORMAL" && product.poDeadline && (
                  <p className="text-xs text-gray-500 font-semibold">
                    Order Closes{" "}
                    {new Date(product.poDeadline).toLocaleDateString("en-GB", {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    })}
                    !
                  </p>
                )}
                </div>
                <h1 className="text-sm font-semibold mt-3 leading-snug">
                  {product.name}
                </h1>
                <p className="text-gray-500 mt-2">
                  By {product.manufacturer.name}
                </p>
                <p className="text-xl font-semibold pt-8 text-blue-800">
                  IDR {Number(product.price.toString()).toLocaleString("id-ID")}
                </p>
                {product.orderType === "PO" && (
                  <p className="text-xs pt-4 text-blue-700">Pay in full, save IDR {product.fullPaymentDiscount?.toLocaleString("id-ID")}</p>
                )}
            </div>
        </section>
        
        {product.orderType === "PO" && (
          <section className="bg-white border-y border-gray-300 p-4">
            <div className="flex flex-col gap-2">
                <p className="text-base text-gray-700 font-bold">
                  Pre-Order Information
                </p>
                <PreOrderInfo minimumDp={getMinimumDP(Number(product.price)).toLocaleString("id-ID")}
            releaseMonth={product.poReleaseMonth} estimatedMonth={product.poEstimatedMonth}/>
            </div>
        </section>
        )}

        <section className="bg-white border-y border-gray-300 p-4">
            <ProductInfoRows
                character={product.character.name}
                series={product.series.name}
                category={product.category.name}
                manufacturer={product.manufacturer.name}
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
        <AddMobile product={product}/>
    </div>
    </>
  )
}