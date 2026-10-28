import { useState } from "react";
import { Link } from "react-router-dom";

import {
  ArrowRight,
  Eye,
  EyeOff,
  HeartPulse,
  LockKeyhole,
  Mail,
  ShieldCheck,
  UserRound,
} from "lucide-react";

import "../styles/auth.css";

export default function Signup() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  return (
    <main className="care-auth-page">
      <div className="care-auth-container">
        <div className="care-auth-header">
          <div className="care-auth-logo">
            <HeartPulse size={32} strokeWidth={1.8} />
          </div>

          <h1 className="care-auth-title">
            Create your account
          </h1>

          <p className="care-auth-subtitle">
            Join CarePath to save and revisit your conversations.
          </p>
        </div>

        <div className="care-auth-card">
          <form
            onSubmit={(event) => event.preventDefault()}
            className="care-auth-form care-auth-signup-form"
          >
            <div className="care-auth-field">
              <label
                htmlFor="signup-name"
                className="care-auth-label"
              >
                Full name
              </label>

              <div className="care-auth-input-wrapper">
                <UserRound
                  size={19}
                  className="care-auth-input-icon"
                />

                <input
                  id="signup-name"
                  type="text"
                  autoComplete="name"
                  placeholder="Your full name"
                  required
                  className="care-auth-input"
                />
              </div>
            </div>

            <div className="care-auth-field">
              <label
                htmlFor="signup-email"
                className="care-auth-label"
              >
                Email address
              </label>

              <div className="care-auth-input-wrapper">
                <Mail
                  size={19}
                  className="care-auth-input-icon"
                />

                <input
                  id="signup-email"
                  type="email"
                  autoComplete="email"
                  placeholder="you@example.com"
                  required
                  className="care-auth-input"
                />
              </div>
            </div>

            <div className="care-auth-field">
              <label
                htmlFor="signup-password"
                className="care-auth-label"
              >
                Password
              </label>

              <div className="care-auth-input-wrapper">
                <LockKeyhole
                  size={19}
                  className="care-auth-input-icon"
                />

                <input
                  id="signup-password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="new-password"
                  placeholder="Create a password"
                  minLength={8}
                  required
                  className="care-auth-input care-auth-password-input"
                />

                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label={
                    showPassword ? "Hide password" : "Show password"
                  }
                  className="care-auth-password-toggle"
                >
                  {showPassword ? (
                    <EyeOff size={19} />
                  ) : (
                    <Eye size={19} />
                  )}
                </button>
              </div>

              <p className="care-auth-field-hint">
                Use at least 8 characters.
              </p>
            </div>

            <div className="care-auth-field">
              <label
                htmlFor="signup-confirm"
                className="care-auth-label"
              >
                Confirm password
              </label>

              <div className="care-auth-input-wrapper">
                <LockKeyhole
                  size={19}
                  className="care-auth-input-icon"
                />

                <input
                  id="signup-confirm"
                  type={showConfirmPassword ? "text" : "password"}
                  autoComplete="new-password"
                  placeholder="Confirm your password"
                  required
                  className="care-auth-input care-auth-password-input"
                />

                <button
                  type="button"
                  onClick={() =>
                    setShowConfirmPassword(!showConfirmPassword)
                  }
                  aria-label={
                    showConfirmPassword
                      ? "Hide confirmation password"
                      : "Show confirmation password"
                  }
                  className="care-auth-password-toggle"
                >
                  {showConfirmPassword ? (
                    <EyeOff size={19} />
                  ) : (
                    <Eye size={19} />
                  )}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled
              className="care-auth-submit"
            >
              Create Account
              <ArrowRight size={18} />
            </button>

            <p className="care-auth-coming-soon">
              Account creation is coming soon.
            </p>
          </form>

          <div className="care-auth-card-footer">
            Already have an account?{" "}
            <Link
              to="/login"
              className="care-auth-link"
            >
              Sign in
            </Link>
          </div>
        </div>

        <div className="care-auth-bottom">
          <Link
            to="/chat"
            className="care-auth-link"
          >
            Continue as guest
          </Link>

          <p className="care-auth-privacy">
            <ShieldCheck size={15} />
            Your privacy matters.
          </p>
        </div>
      </div>
    </main>
  );
}
