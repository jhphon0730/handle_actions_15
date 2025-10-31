import Link from "next/link"
import Image from "next/image"

export const Navbar = () => {
  return (
    <header className="fixed top-0 left-0 w-full bg-white px-6 py-4">
      <nav className="flex items-center justify-between w-full">
        <h1 className="font-bold text-xl uppercase">
          <Link href="/" className="flex items-center gap-2">
            <Image
              src="/mainBanner.png"
              alt="Logo"
              width={32}
              height={0}
              className="object-contain"
            />
            <p>Fucking TODO List</p>
          </Link>
        </h1>
      </nav>
    </header>
  )
}
