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
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!/^\d{4}$/.test(pin)) {
      setError("PIN must contain exactly 4 digits.");
      return;
    }

    setLoading(true);

    try {
      const result = await login(email, pin, rememberMe);

      if (!result.success) {
        setError(result.message || "Login failed.");
        return;
      }

      const destination = location.state?.from || "/dashboard";
      navigate(destination, { replace: true });
    } catch (err) {
      setError(err.message || "Unable to log in. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-container">
        <div className="auth-card">
          <div className="auth-logo-wrapper">
            <img
              src="/Logo.png"
              alt="Nutri-Track"
              className="auth-logo"
            />
          </div>

          <div className="auth-heading">
            <h1>Login</h1>
            <p>
              Welcome back. Continue your nutrition journey.
            </p>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="email">Email address</label>

              <input
                id="email"
                type="email"
                className="form-input"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoComplete="email"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="pin">4-digit PIN</label>

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
                maxLength={4}
                autoComplete="current-password"
                required
              />
            </div>

            <div className="auth-options">
              <label className="remember-option">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) =>
                    setRememberMe(e.target.checked)
                  }
                />

                <span>Keep me signed in</span>
              </label>
            </div>

            {error && (
              <p className="auth-error" role="alert">
                {error}
              </p>
            )}

            <button
              type="submit"
              className="auth-button"
              disabled={loading}
            >
              {loading ? "Logging in..." : "Login"}
            </button>
          </form>

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
