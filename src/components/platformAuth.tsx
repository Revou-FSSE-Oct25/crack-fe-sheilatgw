import { FcGoogle } from "react-icons/fc";
import { DiApple } from "react-icons/di";
import { FaXTwitter } from "react-icons/fa6";

export const LoginGoogleButton = () => {
  return (
    <button className="flex items-center justify-center gap-2 w-full bg-gray-200 text-stone-950 font-50 font-medium py-3 px-6 text-base rounded-sm hover:bg-gray-400 cursor-pointer">
        <FcGoogle className="size-8"/>
        Log in with Google
    </button>
  )
}

export const LoginAppleButton = () => {
  return (
    <button className="flex items-center justify-center gap-2 w-full bg-stone-950 text-stone-50 font-50 font-medium py-3 px-6 text-base rounded-sm hover:bg-black cursor-pointer">
        <DiApple className="size-8"/>
        Log in with Apple
    </button>
  )
}

export const LoginXButton = () => {
  return (
    <button className="flex items-center justify-center gap-2 w-full bg-black text-stone-50 font-50 font-medium py-3 px-6 text-base rounded-sm hover:bg-black cursor-pointer">
        <FaXTwitter className="size-6"/>
        Log in with X
    </button>
  )
}

export const RegisterGoogleButton = () => {
  return (
    <button className="flex items-center justify-center gap-2 w-full bg-gray-200 text-stone-950 font-50 font-medium py-3 px-6 text-base rounded-sm hover:bg-gray-400 cursor-pointer">
        <FcGoogle className="size-8"/>
        Register with Google
    </button>
  )
}

export const RegisterAppleButton = () => {
  return (
    <button className="flex items-center justify-center gap-2 w-full bg-stone-950 text-stone-50 font-50 font-medium py-3 px-6 text-base rounded-sm hover:bg-black cursor-pointer">
        <DiApple className="size-8"/>
        Register with Apple
    </button>
  )
}

export const RegisterXButton = () => {
  return (
    <button className="flex items-center justify-center gap-2 w-full bg-black text-stone-50 font-50 font-medium py-3 px-6 text-base rounded-sm hover:bg-black cursor-pointer">
        <FaXTwitter className="size-6"/>
        Register with X
    </button>
  )
}