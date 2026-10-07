import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../../context/usercontext";
import "../../styles/onboarding.css";

function DietPreference() {
  const navigate = useNavigate();

  const { userProfile, updateProfile } = useUser();

  const [preference, setPreference] = useState(
    userProfile.dietPreference || ""
  );

  const [error, setError] = useState("");

  const handleContinue = () => {
    if (!preference) {
      setError("Please select your food preference.");
      return;
    }

    updateProfile({
      dietPreference: preference,
    });

    navigate("/goal");
  };

  return (
    <div className="onboarding-page">
      <div className="onboarding-container">

        <div className="onboarding-header">

          <img
            src="/logo.png"
            alt="Nutri-Track"
            className="onboarding-logo"
          />

          <div className="step-indicator">
            <div className="step completed"></div>
            <div className="step active"></div>
            <div className="step"></div>
          </div>

        </div>

        <div className="onboarding-card">

          <h1>What's your food preference?</h1>

          <p className="onboarding-description">
            We'll prioritize suitable Indian foods when
            creating your personalized daily diet.
          </p>

          <div className="option-grid">

            <button
              type="button"
              className={`option-card ${
                preference === "vegetarian"
                  ? "selected"
                  : ""
              }`}
              onClick={() => setPreference("vegetarian")}
            >
              <div className="option-icon">🥬</div>

              <div className="option-title">
                Vegetarian
              </div>

              <div className="option-description">
                Plant-based foods, dairy and suitable
                vegetarian Indian meals.
              </div>
            </button>

            <button
              type="button"
              className={`option-card ${
                preference === "non-vegetarian"
                  ? "selected"
                  : ""
              }`}
              onClick={() =>
                setPreference("non-vegetarian")
              }
            >
              <div className="option-icon">🍗</div>

              <div className="option-title">
                Non-Vegetarian
              </div>

              <div className="option-description">
                Vegetarian foods plus suitable eggs,
                chicken and fish options.
              </div>
            </button>

          </div>

          {error && (
            <p className="error-message">
              {error}
            </p>
          )}

          <div className="onboarding-actions">

            <button
              type="button"
              className="back-button"
              onClick={() => navigate("/profile")}
            >
              Back
            </button>

            <button
              type="button"
              className="primary-button"
              onClick={handleContinue}
              style={{ marginTop: 0 }}
            >
              Continue
            </button>

          </div>

        </div>

      </div>
    </div>
  );
}

export default DietPreference;