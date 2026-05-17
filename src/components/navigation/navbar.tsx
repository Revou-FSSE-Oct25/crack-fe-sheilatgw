import Navlink from "./navlink";
import Link from "next/link";
import React from 'react'
import Hamburger from "../hamburger";
import SearchBar from "../searchBar";
import Image from "next/image";

function Navbar() {
  return (
    <div className="fixed top-0 w-full bg-stone-50 shadow-sm z-50 h-13 md:h-16">
        <div className="max-w-7xl px-4 md:px-0 md:mx-auto w-full flex items-center justify-between h-full">
            <div className="flex gap-4">
                <Hamburger/>
            <Link href="/">
                <Image src="/webicon.webp" width={90} height={35} alt="logo" priority className="w-14 md:w-20 h-auto"/>
            </Link>
            </div>
            <div className="flex items-center md:gap-10">
                <SearchBar />
                <Navlink/>
            </div>
        </div>
    </div>
  )
}

export default Navbar