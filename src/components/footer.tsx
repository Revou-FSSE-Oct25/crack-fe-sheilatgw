import Link from "next/link"
import Image from "next/image"
const Footer = () => {
  return (
    <footer className="bg-white">
        <div className="max-w-7xl mx-auto px-4 w-full py-10 md:py-16">
            <div className="grid md:grid-cols-3 gap-7">
                <div>
                    <Link href="/" className="mb-10 block">
                        <Image src="/webicon.webp" width={85} height={30} alt="logo" priority/>
                    </Link>
                    <p className="text-gray-400">Lorem ipsum dolor sit amet consectetur adipisicing elit. 
                        Quae magni nobis exercitationem suscipit animi perspiciatis.</p>
                </div>
                <div>
                    <div className="flex gap-20">
                        <div className="flex-1 md:flex-none">
                            <h4 className="mb-8 text-xl font-semibold text-gray-600">Links</h4>
                            <ul className="list-item space-y-5 text-gray-400">
                                <li>
                                    <Link href="/">Home</Link>
                                </li>
                                <li>
                                    <Link href="/about">About Us</Link>
                                </li>
                                <li>
                                    <Link href="/items">Items</Link>
                                </li>
                                <li>
                                    <Link href="/contact">Contact Us</Link>
                                </li>
                            </ul>
                        </div>
                        <div className="flex-1 md:flex-none">
                            <h4 className="mb-8 text-xl font-semibold text-gray-600">Legal</h4>
                            <ul className="list-item space-y-5 text-gray-400">
                                <li>
                                    <Link href="#">Home</Link>
                                </li>
                                <li>
                                    <Link href="#">Terms & Conditions</Link>
                                </li>
                                <li>
                                    <Link href="#">Payment Method</Link>
                                </li>
                                <li>
                                    <Link href="#">Privacy Policy</Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div>
                    <h4 className="mb-8 text-xl font-semibold text-gray-600">Newsletter</h4>
                    <p className="text-gray-400">Lorem ipsum dolor sit amet consectetur adipisicing.</p>
                    <form action="" className="mt-5">
                        <div className="mb-5">
                            <input type="text" name="email" className="w-full p-3 rounded-sm bg-stone-50" placeholder="jeevacation@gmail.com"></input>
                        </div>
                        <button className="bg-blue-800 p-3 font-bold text-stone-50 w-full text-center rounded-sm hover:blue-900">Subscribe</button>
                    </form>
                </div>
            </div>
        </div>
        <div className="max-w-7xl mx-auto px-4 border-t border-gray-500 py-8 text-center text-base text-gray-500">
            &copy; copyright 2025 | unouno | All Right Reserved
        </div>
    </footer>
  )
}

export default Footer