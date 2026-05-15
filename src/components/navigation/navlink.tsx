"use client"

import { useState } from "react"
import Link from "next/link"
import { IoHeartOutline } from "react-icons/io5";
import { MdOutlineHistory } from "react-icons/md";
import { RiAdminFill } from "react-icons/ri";
import SearchMobile from "../searchMobile";
import AuthButton from "../authButton";
import { useAuth } from "@/hooks/useAuth"
import CartButton from "../cartButton";

export default function Navlink() {
  const [open, setOpen] = useState(false)
  const { user, loading } = useAuth()

  const role =typeof window !== "undefined" ? localStorage.getItem("role") : null
  const isAdmin = role === "admin"

  return (
    <div className="flex items-center py-2 md:gap-5">
  <ul className="flex items-center gap-4 font-semibold text-sm uppercase rounded-sm bg-gray-50 md:bg-stone-50">
        <li>
            <SearchMobile/>
        </li>
        <li>
            <CartButton/>
        </li>
        <li>
            <Link href="/user/history" className="block text-blue-800 md:p-0">
                <MdOutlineHistory size={25}/>
            </Link>
        </li>
        <li className="hidden md:block">
            <Link href="/user/wishlist" className="block text-blue-800 md:p-0">
                <IoHeartOutline size={25}/>
            </Link>
        </li>
        {!loading && isAdmin && (
        <li className="hidden md:block">
            <Link href="/admin" className="block text-blue-800 md:p-0">
                <RiAdminFill size={25}/>
            </Link>
        </li>)}
      </ul>
      <div className="hidden md:block border-r border-r-gray-400 h-10"></div>
            <AuthButton/>
    </div>
  )
}
