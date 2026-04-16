import Link from "next/link";
import Image from "next/image";

export default function Sidebar() {
  return (
    <aside className="w-55 h-screen bg-gray-900 text-white p-5">
      <div className="flex">
          <Link href="/">
              <Image src="/logo_white.webp" width={85} height={30} alt="logo" priority></Image>
          </Link>
          <h1 className="text-sm font-bold mb-8 uppercase">web it</h1>
      </div>
      <div className="border border-gray-50 w-45"></div>

      <nav className="flex flex-col gap-3">
        <Link href="/admin" className="hover:bg-gray-700 px-3 py-2 rounded">
          Dashboard
        </Link>

        <Link href="/admin/products" className="hover:bg-gray-700 px-3 py-2 rounded">
          Products
        </Link>

        <Link href="/admin/users" className="hover:bg-gray-700 px-3 py-2 rounded">
          Users
        </Link>

        <Link href="/admin/orders" className="hover:bg-gray-700 px-3 py-2 rounded">
          Orders
        </Link>
      </nav>
    </aside>
  );
}
