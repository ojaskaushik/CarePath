import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

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

const API_BASE_URL = "http://localhost:8000";

export default function Signup() {
  const navigate = useNavigate();

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(event) {
    event.preventDefault();
    setError("");

    if (fullName.trim().length < 2) {
      setError("Please enter your full name");
      return;
    }

    if (password.length < 8) {
      setError("Your password must contain at least 8 characters");
      return;
    }

    if (password.length > 128) {
      setError("Your password must contain no more than 128 characters");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch(
        `${API_BASE_URL}/api/v1/auth/signup`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            full_name: fullName.trim(),
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
            : "Unable to create your account. Please check your details.";

        throw new Error(message);
      }

      navigate("/login", {
        replace: true,
        state: {
          signupSuccess: true,
        },
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
            Create your account
          </h1>

          <p className="care-auth-subtitle">
            Join CarePath to save and revisit your conversations.
          </p>
        </div>

        <div className="care-auth-card">
          <form
            onSubmit={handleSubmit}
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
                  minLength={2}
                  maxLength={150}
                  value={fullName}
                  onChange={(event) => setFullName(event.target.value)}
                  required
                  disabled={isSubmitting}
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
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  required
                  disabled={isSubmitting}
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
                  maxLength={128}
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
                  value={confirmPassword}
                  onChange={(event) =>
                    setConfirmPassword(event.target.value)
                  }
                  required
                  disabled={isSubmitting}
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
              {isSubmitting ? "Creating account..." : "Create Account"}
              <ArrowRight size={18} />
            </button>
          </form>

          <div className="care-auth-card-footer">
            Already have an account?{" "}
            <Link to="/login" className="care-auth-link">
              Sign in
            </Link>
          </div>
        </div>

        <div className="care-auth-bottom">
          <Link to="/chat" className="care-auth-link">
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
