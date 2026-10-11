
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../../context/usercontext";
import { calculateNutritionProfile } from "../../services/nutritionservice";
import "../../styles/onboarding.css";

function GoalSelection() {
  const navigate = useNavigate();

  const { userProfile, updateProfile, profileLoading } = useUser();

  const [goal, setGoal] = useState(userProfile.goal || "");
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    setGoal(userProfile.goal || "");
  }, [userProfile.goal]);

  const handleFinish = async () => {
    if (saving) return;

    if (!goal) {
      setError("Please select your nutrition goal.");
      return;
    }

    setError("");
    setSaving(true);

    try {
      const completeProfile = {
        ...userProfile,
        goal,
      };

      const nutrition = calculateNutritionProfile(completeProfile);

      if (
        !nutrition ||
        nutrition.targetCalories == null ||
        nutrition.protein == null ||
        nutrition.carbohydrates == null ||
        nutrition.fat == null
      ) {
        throw new Error("Nutrition targets could not be calculated.");
      }

      await updateProfile({
        goal,
        nutrition,
      });

      navigate("/dashboard");
    } catch (err) {
      setError(
        err.message ||
          "Unable to save your nutrition plan. Please try again."
      );
    } finally {
      setSaving(false);
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
            Your goal determines how Nutri-Track adjusts
            your daily calorie and macro targets.
          </p>

          <div className="option-grid">
            <button
              type="button"
              className={`option-card ${
                goal === "lose-weight" ? "selected" : ""
              }`}
              onClick={() => {
                setGoal("lose-weight");
                setError("");
              }}
              disabled={saving || profileLoading}
              aria-pressed={goal === "lose-weight"}
            >
              <div className="option-icon">📉</div>

              <div className="option-title">Lose Weight</div>

              <div className="option-description">
                Create a controlled calorie deficit while
                prioritizing adequate nutrition.
              </div>
            </button>

            <button
              type="button"
              className={`option-card ${
                goal === "maintain-weight" ? "selected" : ""
              }`}
              onClick={() => {
                setGoal("maintain-weight");
                setError("");
              }}
              disabled={saving || profileLoading}
              aria-pressed={goal === "maintain-weight"}
            >
              <div className="option-icon">⚖️</div>

              <div className="option-title">Maintain Weight</div>

              <div className="option-description">
                Keep your body weight stable with balanced
                daily nutrition.
              </div>
            </button>

            <button
              type="button"
              className={`option-card ${
                goal === "gain-weight" ? "selected" : ""
              }`}
              onClick={() => {
                setGoal("gain-weight");
                setError("");
              }}
              disabled={saving || profileLoading}
              aria-pressed={goal === "gain-weight"}
            >
              <div className="option-icon">📈</div>

              <div className="option-title">Gain Weight</div>

              <div className="option-description">
                Create a controlled calorie surplus with
                nutrient-dense foods.
              </div>
            </button>
          </div>

          {error && (
            <p className="error-message" role="alert">
              {error}
            </p>
          )}

          <div className="onboarding-actions">
            <button
              type="button"
              className="back-button"
              onClick={() => navigate("/diet-preference")}
              disabled={saving}
            >
              Back
            </button>

            <button
              type="button"
              className="primary-button"
              onClick={handleFinish}
              disabled={saving || profileLoading}
              style={{ marginTop: 0 }}
            >
              {saving
                ? "Creating Plan..."
                : profileLoading
                ? "Loading profile..."
                : "Create My Plan"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default GoalSelection;
