import Hero from "@/components/hero"
import ProductCard from "@/components/productCard"
import StatusSelect from "@/components/statusSelect"
import { StatusSwipe } from "@/components/SwiperDisplay"


export default function Home() {

  type Product = {
  id: number
  name: string
  price: number
  stock: number
  status: "ready" | "sold" | "PO" | "late PO" | "order close"
}


  const products: Product[] = [
    { id: 1, name: "Mouse blue red purple white black yellow", price: 150000, stock: 10, status: "ready" },
    { id: 2, name: "Keyboard blue red purple white black yellow", price: 300000, stock: 5, status: "PO" },
    { id: 3, name: "Monitor blue red purple white black yellow", price: 2000000, stock: 2, status: "late PO" },
    { id: 4, name: "Mouse blue red purple white black yellow", price: 150000, stock: 10, status: "sold" }, 
    { id: 5, name: "Keyboard blue red purple white black yellow", price: 300000, stock: 5, status: "order close" },
    { id: 6, name: "Monitor blue red purple white black yellow", price: 2000000, stock: 2, status: "PO" }
  ]

  return (
    <div>
      <Hero/>

      <div className="px-3 md:px-36">
        <p className="text-lg font-semibold text-gray-800 mb-4 mt-13">
          New Items, New Happiness
        </p>

        <div className="bg-white border border-gray-200 rounded-sm shadow-lg mb-5 md:mb-16 grid grid-cols-2 md:grid-cols-6 gap-4 p-6">
          <div className="col-span-2 md:col-span-6">
            <StatusSelect/>
            <StatusSwipe/>
          </div>
          {products.map((product) => (
            <ProductCard key={product.id} product={product}/>
          ))}
        </div>

      </div>
    </div>
  )
}
