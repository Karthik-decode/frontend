import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import { useUser } from "../../context/usercontext";

import {
  calculateNutritionProfile,
} from "../../services/nutritionservice";

import "../../styles/onboarding.css";

function GoalSelection() {
  const navigate = useNavigate();

  const {
    userProfile,
    updateProfile,
  } = useUser();

  const [goal, setGoal] = useState(
    userProfile.goal || ""
  );

  const [error, setError] = useState("");

  const handleFinish = () => {
    if (!goal) {
      setError(
        "Please select your nutrition goal."
      );
      return;
    }

    try {
      const completeProfile = {
        ...userProfile,
        goal,
      };

      const nutrition =
        calculateNutritionProfile(
          completeProfile
        );

      updateProfile({
        goal,
        nutrition,
      });

      navigate("/dashboard");

    } catch (error) {
      setError(
        "Unable to calculate your nutrition target. Please check your profile."
      );
    }
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

            <div className="step completed"></div>

            <div className="step active"></div>

          </div>

        </div>

        <div className="onboarding-card">

          <h1>What's your goal?</h1>

          <p className="onboarding-description">
            Your goal determines how Nutri-Track
            adjusts your daily calorie and macro
            targets.
          </p>

          <div className="option-grid">

            <button
              type="button"
              className={`option-card ${
                goal === "lose-weight"
                  ? "selected"
                  : ""
              }`}
              onClick={() =>
                setGoal("lose-weight")
              }
            >
              <div className="option-icon">
                📉
              </div>

              <div className="option-title">
                Lose Weight
              </div>

              <div className="option-description">
                Create a controlled calorie
                deficit while prioritizing
                adequate nutrition.
              </div>

            </button>

            <button
              type="button"
              className={`option-card ${
                goal === "maintain-weight"
                  ? "selected"
                  : ""
              }`}
              onClick={() =>
                setGoal("maintain-weight")
              }
            >
              <div className="option-icon">
                ⚖️
              </div>

              <div className="option-title">
                Maintain Weight
              </div>

              <div className="option-description">
                Keep your body weight stable
                with balanced daily nutrition.
              </div>

            </button>

            <button
              type="button"
              className={`option-card ${
                goal === "gain-weight"
                  ? "selected"
                  : ""
              }`}
              onClick={() =>
                setGoal("gain-weight")
              }
            >
              <div className="option-icon">
                📈
              </div>

              <div className="option-title">
                Gain Weight
              </div>

              <div className="option-description">
                Create a controlled calorie
                surplus with nutrient-dense
                foods.
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
              onClick={() =>
                navigate(
                  "/diet-preference"
                )
              }
            >
              Back
            </button>

            <button
              type="button"
              className="primary-button"
              onClick={handleFinish}
              style={{ marginTop: 0 }}
            >
              Create My Plan
            </button>

          </div>

        </div>

      </div>

    </div>
  );
}

export default GoalSelection;