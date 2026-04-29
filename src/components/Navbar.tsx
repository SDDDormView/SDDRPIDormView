"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient( // add whenever we need user
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY!
);

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  const [user, setUser] = useState<any>(null);
  const [username, setUsername] = useState<string | null>(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10)
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // get user and profile info
  useEffect(() => {
    const getUser = async () => {
      const { data } = await supabase.auth.getUser();

      if (data.user) {
        setUser(data.user)

        const { data: profile } = await supabase
          .from("profiles")
          .select("username")
          .eq("id", data.user.id)
          .single();

        if (profile) setUsername(profile.username)
      }
    }

    getUser()
  }, []);

  const handleSignOut = async () => { // handle signout
    await supabase.auth.signOut();
    setUser(null);
    setUsername(null);
    setOpen(false);
  };

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Map", href: "/map" },
    { name: "Quiz", href: "/quiz" },
    { name: "Dorms", href: "/dorms" },
  ];

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
          <a href="/reviews" className="bg-black text-white px-4 py-2 rounded-md hover:bg-gray-800 transition">
              Reviews
          </a>

          {/* LOGIN/LOGOUT */}
          {!user ? (
            <Link href="/login" className="bg-black text-white px-4 py-2 rounded-md hover:bg-gray-800 transition">
              Log In
            </Link>
          ) : (
            <div className="relative">
              <button
                onClick={() => setOpen(!open)}
                className="bg-black text-white px-4 py-2 rounded-md hover:bg-gray-800 transition"
              >
                {username || user.email}
              </button>

              {/* DROPDOWN */}
              {open && (
                <div className="absolute right-0 mt-2 w-40 bg-white rounded-md shadow-lg border">
                  <button
                    onClick={handleSignOut}
                    className="w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
                  >
                    Sign Out
                  </button>
                </div>
              )}
            </div>
          )}
        </nav>
      </div>
    </header>
  );
}
