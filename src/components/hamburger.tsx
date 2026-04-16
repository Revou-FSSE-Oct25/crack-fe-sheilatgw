"use client";

import { useState } from "react";
import { IoMenu, IoClose } from "react-icons/io5";

export default function Hamburger() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="text-2xl md:hidden"
      >
        <IoMenu />
      </button>

      {open && (
        <div className="fixed inset-0 bg-white z-50 md:hidden flex flex-col">

          <div className="flex justify-between items-center p-4 border-b">
            <span className="font-semibold">Menu</span>
            <button onClick={() => setOpen(false)} className="text-2xl">
              <IoClose />
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
