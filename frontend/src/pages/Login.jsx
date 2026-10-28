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
} from "lucide-react";

import "../styles/auth.css";

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <main className="care-auth-page">
      <div className="care-auth-container">
        <div className="care-auth-header">
          <div className="care-auth-logo">
            <HeartPulse size={32} strokeWidth={1.8} />
          </div>

          <h1 className="care-auth-title">
            Welcome back
          </h1>

          <p className="care-auth-subtitle">
            Sign in to access your saved CarePath conversations.
          </p>
        </div>

        <div className="care-auth-card">
          <form
            onSubmit={(event) => event.preventDefault()}
            className="care-auth-form"
          >
            <div className="care-auth-field">
              <label
                htmlFor="login-email"
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
                  id="login-email"
                  type="email"
                  autoComplete="email"
                  placeholder="you@example.com"
                  required
                  className="care-auth-input"
                />
              </div>
            </div>

            <div className="care-auth-field">
              <div className="care-auth-label-row">
                <label
                  htmlFor="login-password"
                  className="care-auth-label"
                >
                  Password
                </label>

                <span className="care-auth-hint">
                  Password reset coming soon
                </span>
              </div>

              <div className="care-auth-input-wrapper">
                <LockKeyhole
                  size={19}
                  className="care-auth-input-icon"
                />

                <input
                  id="login-password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="current-password"
                  placeholder="Enter your password"
                  required
                  className="care-auth-input care-auth-password-input"
                />

                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label={
                    showPassword
                      ? "Hide password"
                      : "Show password"
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
            </div>

            <button
              type="submit"
              disabled
              className="care-auth-submit"
            >
              Sign In
              <ArrowRight size={18} />
            </button>

            <p className="care-auth-coming-soon">
              Sign-in functionality is coming soon.
            </p>
          </form>

          <div className="care-auth-card-footer">
            Don't have an account?{" "}
            <Link
              to="/signup"
              className="care-auth-link"
            >
              Create an account
            </Link>
          </div>
        </div>

        <div className="care-auth-bottom">
          <Link
            to="/chat"
            className="care-auth-link"
          >
            Continue without an account
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
