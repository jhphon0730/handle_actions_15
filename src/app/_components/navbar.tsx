import Link from "next/link"

export const Navbar = () => {
  return (
    <header className="fixed top-0 left-0 w-full bg-white px-6 py-4">
      <nav className="flex items-center justify-between w-full">
        <h1 className="font-bold text-xl uppercase">
          <Link href="/">Todo</Link>
        </h1>

        {/* 네비게이션 링크 */}
        <ul>
          <li className="inline-block mr-4">
            <Link href="/">Home</Link>
          </li>
          <li className="inline-block">
            <Link href="/category">Categories</Link>
          </li>
        </ul>
      </nav>
    </header>
  )
}
