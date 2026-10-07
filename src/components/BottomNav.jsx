import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "../styles/navigation.css";

function BottomNav() {
  const navigate = useNavigate();
  const location = useLocation();

  const navigationItems = [
    {
      path: "/dashboard",
      label: "Home",
      icon: "⌂",
    },
    {
      path: "/today",
      label: "Food",
      icon: "🍽",
    },
    {
      path: "/plan",
      label: "Plan",
      icon: "▣",
    },
    {
      path: "/settings",
      label: "Settings",
      icon: "⚙",
    },
  ];

  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <nav className="bottom-nav">
      <div className="bottom-nav-inner">
        {navigationItems.map((item) => (
          <button
            key={item.path}
            type="button"
            className={`bottom-nav-item ${
              isActive(item.path) ? "active" : ""
            }`}
            onClick={() => navigate(item.path)}
          >
            <span className="bottom-nav-icon">
              {item.icon}
            </span>

            <span className="bottom-nav-label">
              {item.label}
            </span>
          </button>
        ))}
      </div>
    </nav>
  );
}

export default BottomNav;