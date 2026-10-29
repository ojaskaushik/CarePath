import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import {
  ChevronDown,
  HeartPulse,
  LogOut,
  Menu,
  MessageSquare,
  UserRound,
  X,
} from "lucide-react";

import {
  getCurrentUser,
  signOut,
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
  const [profileOpen, setProfileOpen] = useState(false);
  const [signingOut, setSigningOut] = useState(false);

  const profileRef = useRef(null);

  const user = useSyncExternalStore(
    subscribeToAuth,
    getCurrentUser
  );

  function closeMenu() {
    setMenuOpen(false);
    setProfileOpen(false);
  }

  useEffect(() => {
    if (!profileOpen) return;

    function handleOutsideClick(event) {
      if (
        profileRef.current &&
        !profileRef.current.contains(event.target)
      ) {
        setProfileOpen(false);
      }
    }

    function handleEscape(event) {
      if (event.key === "Escape") {
        setProfileOpen(false);
      }
    }

    document.addEventListener("pointerdown", handleOutsideClick);
    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener(
        "pointerdown",
        handleOutsideClick
      );
      document.removeEventListener("keydown", handleEscape);
    };
  }, [profileOpen]);

  async function handleSignOut() {
    if (signingOut) return;

    setSigningOut(true);

    try {
      const success = await signOut();

      if (!success) {
        window.alert("Unable to sign out. Please try again.");
        return;
      }

      closeMenu();
      navigate("/");
    } finally {
      setSigningOut(false);
    }
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
            <div
              className="care-navbar-profile-wrapper"
              ref={profileRef}
            >
              <button
                type="button"
                className="care-navbar-profile-trigger"
                onClick={() => setProfileOpen((open) => !open)}
                aria-expanded={profileOpen}
                aria-haspopup="true"
                aria-controls="care-profile-menu"
              >
                <span className="care-navbar-profile-avatar">
                  <UserRound size={19} />
                </span>

                <span className="care-navbar-profile-name">
                  {user.full_name}
                </span>

                <ChevronDown
                  size={16}
                  className={
                    profileOpen
                      ? "care-navbar-chevron-open"
                      : ""
                  }
                />
              </button>

              {profileOpen && (
                <div
                  id="care-profile-menu"
                  className="care-navbar-profile-dropdown"
                >
                  <div className="care-navbar-profile-info">
                    <span className="care-navbar-profile-info-label">
                      Signed in as
                    </span>

                    <strong>{user.full_name}</strong>
                  </div>

                  <div className="care-navbar-profile-divider" />

                  <Link
                    to="/profile"
                    className="care-navbar-dropdown-item"
                    onClick={closeMenu}
                  >
                    <UserRound size={18} />
                    My Profile
                  </Link>

                  <Link
                    to="/profile"
                    className="care-navbar-dropdown-item"
                    onClick={closeMenu}
                  >
                    <MessageSquare size={18} />
                    My Conversations
                  </Link>

                  <div className="care-navbar-profile-divider" />

                  <button
                    type="button"
                    className="care-navbar-dropdown-item care-navbar-dropdown-signout"
                    onClick={handleSignOut}
                    disabled={signingOut}
                  >
                    <LogOut size={18} />
                    {signingOut ? "Signing Out..." : "Sign Out"}
                  </button>
                </div>
              )}
            </div>
          ) : (
            <>
              <Link
                to="/login"
                className="care-navbar-login"
              >
                Log In
              </Link>

              <Link
                to="/signup"
                className="care-navbar-signup"
              >
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
                  `care-navbar-mobile-link ${
                    isActive ? "active" : ""
                  }`
                }
              >
                {link.label}
              </NavLink>
            ))}

            <div className="care-navbar-mobile-actions">
              {user ? (
                <>
                  <div className="care-navbar-mobile-user">
                    <span className="care-navbar-profile-avatar">
                      <UserRound size={19} />
                    </span>

                    <span>{user.full_name}</span>
                  </div>

                  <Link
                    to="/profile"
                    onClick={closeMenu}
                    className="care-navbar-mobile-account-link"
                  >
                    <UserRound size={18} />
                    My Profile
                  </Link>

                  <Link
                    to="/profile"
                    onClick={closeMenu}
                    className="care-navbar-mobile-account-link"
                  >
                    <MessageSquare size={18} />
                    My Conversations
                  </Link>

                  <button
                    type="button"
                    onClick={handleSignOut}
                    disabled={signingOut}
                    className="care-navbar-mobile-account-link care-navbar-mobile-signout"
                  >
                    <LogOut size={18} />
                    {signingOut ? "Signing Out..." : "Sign Out"}
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
