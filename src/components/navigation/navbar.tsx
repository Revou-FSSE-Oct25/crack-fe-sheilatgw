import Navlink from "./navlink";
import Link from "next/link";
import React from 'react'
import Hamburger from "../hamburger";
import SearchBar from "../searchBar";
import Image from "next/image";

function Navbar() {
  return (
    <div className="fixed top-0 w-full bg-stone-50 shadow-sm z-20 sm:h-13 h-15">
        <div className="md:max-w-7xl md:mx-auto w-full flex items-center justify-between h-full px-4">
            <div className="flex gap-1">
                <Hamburger/>
            <Link href="/">
                <Image src="/webicon.webp" width={85} height={30} alt="logo" priority className="w-14 md:w-20 h-auto"/>
            </Link>
            </div>
            <div className="flex items-center md:gap-10">
                <SearchBar/>
                <Navlink/>
            </div>
        </div>
    </div>
  )
}

export default Navbar