import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/authcontext";
import "../../styles/auth.css";

function Login() {
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();

  const [email, setEmail] = useState("");
  const [pin, setPin] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    const result = login(email, pin, rememberMe);

    if (!result.success) {
      setError(result.message);
      return;
    }

    const destination = location.state?.from || "/dashboard";

    navigate(destination, { replace: true });
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
            <h1>Login</h1>

            <p>
              Welcome back. Continue your nutrition journey.
            </p>
          </div>

          {/* Login Form */}
          <form onSubmit={handleSubmit}>

            <div className="form-group">
              <label htmlFor="email">
                Email address
              </label>

              <input
                id="email"
                type="email"
                className="form-input"
                placeholder="Enter your email"
                value={email}
                onChange={(e) =>
                  setEmail(e.target.value)
                }
                autoComplete="email"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="pin">
                4-digit PIN
              </label>

              <input
                id="pin"
                type="password"
                className="form-input"
                placeholder="Enter your 4-digit PIN"
                value={pin}
                onChange={(e) => {
                  const value = e.target.value
                    .replace(/\D/g, "")
                    .slice(0, 4);

                  setPin(value);
                }}
                inputMode="numeric"
                maxLength="4"
                autoComplete="current-password"
                required
              />
            </div>

            {/* Remember Me */}
            <div className="auth-options">

              <label className="remember-option">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) =>
                    setRememberMe(e.target.checked)
                  }
                />

                <span>
                  Keep me signed in
                </span>
              </label>

            </div>

            {/* Error */}
            {error && (
              <p className="auth-error">
                {error}
              </p>
            )}

            {/* Login Button */}
            <button
              type="submit"
              className="auth-button"
            >
              Login
            </button>

          </form>

          {/* Footer */}
          <div className="auth-footer">
            <p>
              Don't have an account?{" "}
              <Link to="/register">
                Create your account
              </Link>
            </p>
          </div>

        </div>

      </div>
    </div>
  );
}

export default Login;