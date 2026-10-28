
import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { HeartPulse, Menu, X } from "lucide-react";

const links = [
  { label: "Home", path: "/" },
  { label: "How It Works", path: "/how-it-works" },
  { label: "Find Pharmacies", path: "/pharmacies" },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const closeMenu = () => setMenuOpen(false);

  return (
    <header className="sticky top-0 z-50 border-b border-slate-100 bg-white/95 backdrop-blur-md">
      <nav className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6 lg:px-10">
        <Link
          to="/"
          onClick={closeMenu}
          className="flex items-center gap-3"
        >
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-teal-600 text-white">
            <HeartPulse size={25} strokeWidth={2.2} />
          </div>
          <span className="text-2xl font-bold tracking-tight text-slate-900">
            Care<span className="text-teal-600">Path</span>
          </span>
        </Link>

        <div className="hidden items-center gap-8 md:flex">
          {links.map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              className={({ isActive }) =>
                `text-sm font-medium transition-colors ${
                  isActive
                    ? "text-teal-600"
                    : "text-slate-600 hover:text-teal-600"
                }`
              }
            >
              {link.label}
            </NavLink>
          ))}
        </div>

        <div className="hidden items-center gap-4 md:flex">
          <Link
            to="/login"
            className="text-sm font-semibold text-slate-700 hover:text-teal-600"
          >
            Log In
          </Link>
          <Link
            to="/signup"
            className="rounded-full bg-teal-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-teal-700"
          >
            Sign Up
          </Link>
        </div>

        <button
          type="button"
          className="rounded-lg p-2 text-slate-700 md:hidden"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
          aria-controls="mobile-navigation"
        >
          {menuOpen ? <X size={26} /> : <Menu size={26} />}
        </button>
      </nav>

      {menuOpen && (
        <div
          id="mobile-navigation"
          className="border-t border-slate-100 bg-white px-6 py-5 md:hidden"
        >
          <div className="flex flex-col gap-5">
            {links.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                onClick={closeMenu}
                className="font-medium text-slate-700 hover:text-teal-600"
              >
                {link.label}
              </NavLink>
            ))}

            <div className="border-t border-slate-100 pt-5">
              <Link
                to="/login"
                onClick={closeMenu}
                className="block py-2 font-medium text-slate-700"
              >
                Log In
              </Link>

              <Link
                to="/signup"
                onClick={closeMenu}
                className="mt-3 block rounded-full bg-teal-600 px-5 py-3 text-center font-semibold text-white"
              >
                Sign Up
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
