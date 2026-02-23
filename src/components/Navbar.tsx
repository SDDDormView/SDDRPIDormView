import Link from "next/link"

export default function Navbar() {
  return (
    <nav className="bg-black text-white p-4 flex gap-6">
      <Link href="/">Home</Link>
      <Link href="/map">Map</Link>
      <Link href="/quiz">Quiz</Link>
      <Link href="/dorms">Dorms</Link>
      <Link href="/reviews">Reviews</Link>
    </nav>
  )
}