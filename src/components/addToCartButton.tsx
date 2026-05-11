"use client"

type Props = {
  product?: any
}

function handleAddToCart(product?: any) {
  return () => {
    console.log("added to cart", product)
  }
}

export function AddToCartSmallButton({ product }: Props) {
  const handleClick = handleAddToCart(product)

  return (
    <button
      onClick={handleClick}
      className="flex items-center justify-center w-10 h-10 py-2 text-white bg-blue-700 rounded hover:bg-blue-800 transition"
    >
    </button>
  )
}

export function AddToCartLargeButton({ product }: Props) {
  const handleClick = handleAddToCart(product)

  return (
    <button
      onClick={handleClick}
      className="flex items-center justify-center w-120 h-12  text-white bg-blue-700 rounded-lg hover:bg-blue-800 transition"
    >
      <p className="ml-1 font-semibold">Add to cart</p>
    </button>
  )
}