import Link from "next/link"

export const Navbar = () => {
  return (
    <header className="fixed top-0 left-0 w-full bg-white px-2 py-4">
      <nav>
        <h1 className="font-bold text-xl uppercase">
          <Link href="/">Todo</Link>
        </h1>
      </nav>
    </header>
  )
}
