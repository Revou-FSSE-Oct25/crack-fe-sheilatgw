import Link from "next/link"
import { SwiperCatalog } from "./swiper/swiperCategory"

type Category = {
  category_id: number
  name: string
  slug: string
  parentId: number | null
}

type Props = {
  categories: Category[]
}

const categoryImages: Record<string, string> = {
  "prize-figure": "/images/categories/prize-figure.jpg",
  "nendoroid": "/images/categories/nendoroid.jpeg",
  "scale-figure": "/images/categories/scale-figure.webp",
  "pop-up-parade": "/images/categories/pop-up-parade.jpeg",
  "model-kit": "/images/categories/model-kit.webp",
  "figma": "/images/categories/figma.jpeg",
  "action-figure": "/images/categories/action-figure.jpeg",
  "mini-figure": "/images/categories/mini-figure.jpg",
  "lookup": "/images/categories/lookup.jpeg",
  "square-enix-world": "/images/categories/se-world.webp",
  "plush": "/images/categories/plush.jpeg",
  "keychain": "/images/categories/keychain.webp",
  "blind-box": "/images/categories/blind-box.jpeg",
  "acrylic-stand": "/images/categories/acrylic-stand.webp",
  "badge": "/images/categories/badge.webp",
  "mousepad": "/images/categories/mousepad.webp",
  "apparel": "/images/categories/apparel.webp",
  "electronics": "/images/categories/electronics.webp",
  "manga-novel": "/images/categories/manga.jpeg",
  "cosplay": "/images/categories/cosplay.webp"
}

export function Catalog({ categories }: Props) {
  const parents = categories.filter((category) => category.parentId === null)

  return (
    <>
      <div className="max-w-8xl mx-auto px-40 mt-8 hidden md:block">
        <p className="text-lg font-semibold text-gray-700 mb-4">
          Explore By Category
        </p>

        <div className="flex flex-col gap-4">
          {parents.map((parent) => {
            const children = categories.filter(
              (category) => category.parentId === parent.category_id
            )

            return (
              <div key={parent.category_id} className="flex gap-2 items-center">
                <Link
                  href={`/categories/${parent.slug}`}
                  className="h-45 w-35 rounded-xl bg-blue-800 flex items-center justify-center text-white text-xl font-bold text-center px-4"
                >
                  {parent.name}
                </Link>

                <div className="grid grid-cols-10 gap-2">
                  {children.map((child) => (
                    <Link key={child.category_id} href={`/categories/${child.slug}`} className="h-38 w-25 rounded-xl 
                    bg-white hover:bg-gray-300 transition flex flex-col items-center justify-center text-center
                     text-xs font-bold text-gray-700 px-2">
                        <img src={ categoryImages[child.slug] ?? "/images/categories/default.png"}
                            alt={child.name}
                            className="h-20 w-20 object-contain mb-3"
                        />

                        <span>{child.name}</span>
                    </Link>
                  ))}
                </div>
              </div>
            )
          })}
        </div>
      </div>

      <div className="max-w-8xl px-4 mt-6 md:hidden">
        <p className="text-lg font-semibold text-gray-700 mb-4">
          Explore By Category
        </p>

        <div className="flex flex-col gap-4">
          {parents.map((parent) => {
            const children = categories.filter(
              (category) => category.parentId === parent.category_id
            )

            return (
              <div key={parent.category_id} className="flex gap-2 items-center">
                <Link
                  href={`/categories/${parent.slug}`}
                  className="h-45 w-35 rounded-xl bg-blue-800 flex items-center justify-center text-white font-semibold text-center px-4 shrink-0"
                >
                  {parent.name}
                </Link>

                <div className="flex-1 min-w-0">
                  <SwiperCatalog categories={children} />
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </>
  )
}