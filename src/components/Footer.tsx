import Link from "next/link";

export default function Footer() {
  return (
    <footer className="mt-8">
      {/* Grey separator bar */}
      <div className="h-1 bg-gray-300 w-full"></div>

      {/* Footer content */}
      <div className="bg-gray-100 text-gray-700 py-4 text-center">
        <p>
          {new Date().getFullYear()} RPI Dorm View.{" "}
          <Link
            href="https://github.com/IBurntMyBagel/rpi-dorm-view"
            target="_blank"
            className="text-blue-600 hover:underline"
          >
            GitHub
          </Link>
        </p>
      </div>
    </footer>
  );
}