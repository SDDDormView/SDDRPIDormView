"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Map", href: "/map" },
    { name: "Quiz", href: "/quiz" },
    { name: "Dorms", href: "/dorms" },
    { name: "Reviews", href: "/reviews" },
  ]

  return (
    <header
      className={`fixed top-0 w-full z-50 transition-colors duration-300 ${
        scrolled ? "bg-gray-900" : "bg-black/50"
      }`}
    >
      <div className="max-w-6xl mx-auto flex items-center justify-between px-6 py-4">


        <div className="flex items-center gap-3">
          <a href= "/">
            <img
              src="/logo.svg"
              alt="Logo"
              className="w-8 h-8 object-contain"
            />
            <span className="text-white font-semibold text-lg">
              RPI Dorm View
            </span>
          </a>
        </div>


        <nav className="flex items-center gap-6">
          {navLinks.map((link) => {
            const isActive = pathname === link.href

            return (
              <Link
                key={link.href}
                href={link.href}
                className={`text-white transition-all ${
                  isActive
                    ? "text-lg font-semibold"
                    : "text-base hover:text-gray-300"
                }`}
              >
                {link.name}
              </Link>
            )
          })}


          <Link href="/login" className="bg-black text-white px-4 py-2 rounded-md hover:bg-gray-800 transition">
            Log In
          </Link>
        </nav>
      </div>
    </header>
  )
}
