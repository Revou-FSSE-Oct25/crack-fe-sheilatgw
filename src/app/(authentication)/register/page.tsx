"use client"
import Link from "next/link"
import Image from "next/image"
import { useState } from "react"
import {RegisterAppleButton, RegisterGoogleButton, RegisterXButton} from "@/components/platformAuth"

function RegisterPage() {
  return (
    <div className="min-h-screen flex flex-col items-center">
    <div className="m-5 text-center flex flex-col items-center">
      <Link href="/" className="text-blue-800 hover:bg-gray-100 rounded-sm md:hover:bg-transparent md:p-0">
        <Image src="/webicon.webp" width={128} height={40} alt="logo" priority/>
      </Link>
      <p className="text-2xl text-gray-500">Let's Start Your Hobby Journey!</p>
    </div>

    <div className="bg-white w-96 mx-auto rounded-sm shadow p-8 mb-5">
        <div className="grid grid-cols-1 space-y-2">
            <RegisterXButton/>
            <RegisterGoogleButton/>
            <RegisterAppleButton/>
        </div>




        <Link href="/login" className="block text-sm text-blue-800 mt-2 text-center hover:underline hover:text-blue-900">Already have an account? Click here!</Link>
    </div>
    </div>
  )
}

export default RegisterPage