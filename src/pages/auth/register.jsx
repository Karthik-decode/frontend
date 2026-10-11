import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { registerAccount } from "../../services/authservice";
import { useAuth } from "../../context/authcontext";

import "../../styles/auth.css";

function Register() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [pin, setPin] = useState("");
  const [confirmPin, setConfirmPin] = useState("");
  const [rememberMe, setRememberMe] = useState(true);

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");

    const normalizedName = name.trim();
    const normalizedEmail = email.trim().toLowerCase();

    if (!normalizedName) {
      setError("Please enter your name.");
      return;
    }

    if (!normalizedEmail) {
      setError("Please enter your email address.");
      return;
    }

    if (!/^\d{4}$/.test(pin)) {
      setError("PIN must contain exactly 4 digits.");
      return;
    }

    if (pin !== confirmPin) {
      setError("PINs do not match.");
      return;
    }

    setLoading(true);

    try {
      // Create the account in the Spring Boot backend.
      const result = await registerAccount(
        normalizedName,
        normalizedEmail,
        pin
      );

      if (!result.success) {
        setError(result.message || "Unable to create your account.");
        return;
      }

      // Log in using the newly registered backend account.
      const loginResult = await login(
        normalizedEmail,
        pin,
        rememberMe
      );

      if (!loginResult.success) {
        setError(
          loginResult.message ||
            "Account created successfully, but login failed. Please log in."
        );
        return;
      }

      // Continue to profile setup after successful registration and login.
      navigate("/profile", {
        replace: true,
      });
    } catch (err) {
      setError(
        err.message || "Unable to create your account. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-container">
        <div className="auth-card">
          {/* Logo */}
          <div className="auth-logo-wrapper">
            <img
              src="/Logo.png"
              alt="Nutri-Track"
              className="auth-logo"
            />
          </div>

          {/* Heading */}
          <div className="auth-heading">
            <h1>Create your account</h1>
            <p>Start your personalized nutrition journey.</p>
          </div>

          {/* Registration Form */}
          <form onSubmit={handleSubmit}>
            {/* Name */}
            <div className="form-group">
              <label htmlFor="register-name">Your name</label>

              <input
                id="register-name"
                type="text"
                className="form-input"
                placeholder="Enter your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                autoComplete="name"
                maxLength={50}
                required
                disabled={loading}
              />
            </div>

            {/* Email */}
            <div className="form-group">
              <label htmlFor="register-email">Email address</label>

              <input
                id="register-email"
                type="email"
                className="form-input"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoComplete="email"
                required
                disabled={loading}
              />
            </div>

            {/* PIN */}
            <div className="form-group">
              <label htmlFor="register-pin">Create 4-digit PIN</label>

              <input
                id="register-pin"
                type="password"
                className="form-input"
                placeholder="Create a 4-digit PIN"
                value={pin}
                onChange={(e) => {
                  const value = e.target.value
                    .replace(/\D/g, "")
                    .slice(0, 4);

                  setPin(value);
                }}
                inputMode="numeric"
                maxLength={4}
                autoComplete="new-password"
                required
                disabled={loading}
              />
            </div>

            {/* Confirm PIN */}
            <div className="form-group">
              <label htmlFor="confirm-pin">Confirm PIN</label>

              <input
                id="confirm-pin"
                type="password"
                className="form-input"
                placeholder="Re-enter your 4-digit PIN"
                value={confirmPin}
                onChange={(e) => {
                  const value = e.target.value
                    .replace(/\D/g, "")
                    .slice(0, 4);

                  setConfirmPin(value);
                }}
                inputMode="numeric"
                maxLength={4}
                autoComplete="new-password"
                required
                disabled={loading}
              />
            </div>

            {/* Remember Me */}
            <div className="auth-options">
              <label className="remember-option">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  disabled={loading}
                />

                <span>Keep me signed in</span>
              </label>
            </div>

            {/* Error */}
            {error && (
              <p className="auth-error" role="alert">
                {error}
              </p>
            )}

            {/* Register Button */}
            <button
              type="submit"
              className="auth-button"
              disabled={loading}
            >
              {loading ? "Creating account..." : "Create account"}
            </button>
          </form>

          {/* Footer */}
          <div className="auth-footer">
            <p>
              Already have an account?{" "}
              <Link to="/login">Login</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;
