"use client"

import { useState } from "react"
import Link from "next/link"
import { IoHeartOutline } from "react-icons/io5";
import { BsCart3 } from "react-icons/bs";
import { MdOutlineHistory } from "react-icons/md";
import { RiAdminFill } from "react-icons/ri";
import SearchMobile from "../searchMobile";

export default function Navlink() {
  const [open, setOpen] = useState(false)

  return (
    <div className="flex items-center py-2 md:gap-5">
  <ul className="flex items-center gap-4 md:gap-8 font-semibold text-sm uppercase rounded-sm bg-gray-50 md:bg-stone-50">
        <li>
            <SearchMobile/>
        </li>
        <li>
            <Link href="/user/cart" className="block text-blue-800 md:p-0">
                <BsCart3 size={20}/>
            </Link>
        </li>
        <li>
            <Link href="/user/history" className="block text-blue-800 md:p-0">
                <MdOutlineHistory size={20}/>
            </Link>
        </li>
        <li className="hidden md:block">
            <Link href="/user/wishlist" className="block text-blue-800 md:p-0">
                <IoHeartOutline size={20}/>
            </Link>
        </li>
        <li className="hidden md:block">
            <Link href="/admin" className="block text-blue-800 md:p-0">
                <RiAdminFill size={20}/>
            </Link>
        </li>
      </ul>
      <div className="hidden md:block border-r border-r-gray-400 h-10"></div>
            <Link href="/login" className="hidden md:block py-2 text-sm text-blue-800 md:p-0 hover:underline hover:text-blue-900">
                Sign In
            </Link>
    </div>
  )
}
