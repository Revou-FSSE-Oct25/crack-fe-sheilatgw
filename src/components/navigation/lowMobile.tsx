'use client'

import { useState } from "react";
import { AddToCartButton } from "../addToCartButton";
import { WishlistSmall } from "../wishlist";
import { Product } from "@/types/product";

export default function AddMobile({ product }: { product: Product }){
    const [qty, setQty] = useState(1)
    return(
        <div className="bg-white fixed bottom-0 left-0 w-full h-25 border-t border-gray-300 z-50">
            <div className="max-w-3xl mx-auto p-4 flex gap-4">
                <WishlistSmall productId={product.product_id}/>
                <AddToCartButton product={product} quantity={qty} className="w-90 h-12"/>
            </div> 
        </div>
    )
}