import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

import {
  ArrowRight,
  Eye,
  EyeOff,
  HeartPulse,
  LockKeyhole,
  Mail,
  ShieldCheck,
} from "lucide-react";

import { setAuthSession } from "../services/authSession";
import "../styles/auth.css";

const API_BASE_URL = "http://localhost:8000";

export default function Login() {
  const navigate = useNavigate();
  const location = useLocation();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  const signupSuccess = location.state?.signupSuccess === true;

  async function handleSubmit(event) {
    event.preventDefault();
    setError("");
    setIsSubmitting(true);

    try {
      const response = await fetch(
        `${API_BASE_URL}/api/v1/auth/login`,
        {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: email.trim().toLowerCase(),
            password,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        const message =
          typeof data.detail === "string"
            ? data.detail
            : "Unable to sign in. Please check your details.";

        throw new Error(message);
      }

      if (!data.access_token || !data.user) {
        throw new Error("Invalid login response from CarePath");
      }

      setAuthSession(data.access_token, data.user);

      navigate("/profile", {
        replace: true,
      });
    } catch (err) {
      setError(
        err instanceof TypeError
          ? "Unable to connect to CarePath. Please try again later."
          : err.message || "Something went wrong. Please try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  }

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
            Sign in to your CarePath account.
          </p>
        </div>

        <div className="care-auth-card">
          <form
            onSubmit={handleSubmit}
            className="care-auth-form"
          >
            {signupSuccess && (
              <p role="status" className="care-auth-success">
                Account created successfully! Sign in to continue.
              </p>
            )}

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
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  required
                  disabled={isSubmitting}
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
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  required
                  disabled={isSubmitting}
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
            </div>

            {error && (
              <p role="alert" className="care-auth-error">
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={isSubmitting}
              className="care-auth-submit"
            >
              {isSubmitting ? "Signing in..." : "Sign In"}
              <ArrowRight size={18} />
            </button>
          </form>

          <div className="care-auth-card-footer">
            Don't have an account?{" "}
            <Link to="/signup" className="care-auth-link">
              Create an account
            </Link>
          </div>
        </div>

        <div className="care-auth-bottom">
          <Link to="/profile" className="care-auth-link">
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
