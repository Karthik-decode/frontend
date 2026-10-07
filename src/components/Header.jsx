import React from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../context/usercontext";
import "../styles/navigation.css";

function Header() {
  const navigate = useNavigate();
  const { userProfile } = useUser();

  const firstLetter =
    userProfile.email?.charAt(0).toUpperCase() || "N";

  return (
    <header className="app-header">

      <div
        className="app-header-brand"
        onClick={() => navigate("/dashboard")}
      >
        <img
          src="/logo.png"
          alt="Nutri-Track"
        />

        <span>
          Nutri-Track
        </span>
      </div>

      <button
        type="button"
        className="profile-button"
        onClick={() => navigate("/settings")}
        aria-label="Open settings"
      >
        {firstLetter}
      </button>

    </header>
  );
}

export default Header;