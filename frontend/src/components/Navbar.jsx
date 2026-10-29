import { useSyncExternalStore, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { HeartPulse, LogOut, Menu, UserRound, X } from "lucide-react";

import {
  clearAuthSession,
  getCurrentUser,
  subscribeToAuth,
} from "../services/authSession";

import "../styles/navbar.css";

const links = [
  { label: "Home", path: "/" },
  { label: "How It Works", path: "/how-it-works" },
  { label: "Find Pharmacies", path: "/pharmacies" },
];

export default function Navbar() {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const user = useSyncExternalStore(subscribeToAuth, getCurrentUser);

  const closeMenu = () => setMenuOpen(false);

  function handleSignOut() {
    clearAuthSession();
    closeMenu();
    navigate("/");
  }

  return (
    <header className="care-navbar">
      <nav className="care-navbar-container">
        <Link
          to="/"
          onClick={closeMenu}
          className="care-navbar-brand"
        >
          <div className="care-navbar-logo">
            <HeartPulse size={25} strokeWidth={2.2} />
          </div>

          <span className="care-navbar-brand-name">
            Care<span>Path</span>
          </span>
        </Link>

        <div className="care-navbar-links">
          {links.map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              className={({ isActive }) =>
                `care-navbar-link ${isActive ? "active" : ""}`
              }
            >
              {link.label}
            </NavLink>
          ))}
        </div>

        <div className="care-navbar-actions">
          {user ? (
            <>
              <span className="care-navbar-link">
                <UserRound size={17} />
                {user.full_name}
              </span>

              <button
                type="button"
                onClick={handleSignOut}
                className="care-navbar-login"
              >
                <LogOut size={16} />
                Sign Out
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="care-navbar-login">
                Log In
              </Link>

              <Link to="/signup" className="care-navbar-signup">
                Sign Up
              </Link>
            </>
          )}
        </div>

        <button
          type="button"
          className="care-navbar-toggle"
          onClick={() => setMenuOpen((open) => !open)}
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
          className="care-navbar-mobile"
        >
          <div className="care-navbar-mobile-content">
            {links.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                onClick={closeMenu}
                className={({ isActive }) =>
                  `care-navbar-mobile-link ${isActive ? "active" : ""}`
                }
              >
                {link.label}
              </NavLink>
            ))}

            <div className="care-navbar-mobile-actions">
              {user ? (
                <>
                  <span className="care-navbar-mobile-link">
                    <UserRound size={17} />
                    {user.full_name}
                  </span>

                  <button
                    type="button"
                    onClick={handleSignOut}
                    className="care-navbar-mobile-login"
                  >
                    <LogOut size={16} />
                    Sign Out
                  </button>
                </>
              ) : (
                <>
                  <Link
                    to="/login"
                    onClick={closeMenu}
                    className="care-navbar-mobile-login"
                  >
                    Log In
                  </Link>

                  <Link
                    to="/signup"
                    onClick={closeMenu}
                    className="care-navbar-mobile-signup"
                  >
                    Sign Up
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
