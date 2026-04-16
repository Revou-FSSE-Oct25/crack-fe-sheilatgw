"use client";

import { useState } from "react";
import { IoSearchOutline, IoChevronBackSharp } from "react-icons/io5";

export default function SearchMobile() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="flex items-center text-2xl text-blue-800 md:hidden"
      >
        <IoSearchOutline size={20}/>
      </button>

      {open && (
        <div className="fixed inset-0 bg-white z-50 md:hidden flex flex-col">

          <div className="flex justify-between items-center p-4 border-b">
            <span className="font-semibold">Menu</span>
            <button onClick={() => setOpen(false)} className="text-2xl">
              <IoChevronBackSharp />
            </button>
          </div>

          <nav className="flex flex-col gap-6 p-6 text-lg">
            <a href="#">Home</a>
            <a href="#">Shop</a>
            <a href="#">Categories</a>
            <a href="#">Profile</a>
          </nav>
        </div>
      )}
    </>
  );
}
