import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import { useAuth } from "../context/authcontext";
import { useUser } from "../context/usercontext";
import { calculateNutritionProfile } from "../services/nutritionservice";

import "../styles/settings.css";

function Settings() {
  const navigate = useNavigate();

  const { logout } = useAuth();
  const { userProfile, updateProfile } = useUser();

  const [age, setAge] = useState(userProfile.age || "");
  const [sex, setSex] = useState(userProfile.sex || "");
  const [height, setHeight] = useState(userProfile.height || "");
  const [weight, setWeight] = useState(userProfile.weight || "");

  const [dietPreference, setDietPreference] = useState(
    userProfile.dietPreference || "vegetarian"
  );

  const [goal, setGoal] = useState(
    userProfile.goal || "maintain-weight"
  );

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const goalLabels = {
    "lose-weight": "Lose Weight",
    "maintain-weight": "Maintain Weight",
    "gain-weight": "Gain Weight",
  };

  const planProgress = userProfile.planProgress || {};

  const completedDays = Object.values(planProgress).filter(
    (status) => status === "completed"
  ).length;

  const partialDays = Object.values(planProgress).filter(
    (status) => status === "partial"
  ).length;

  const handleSave = (e) => {
    e.preventDefault();

    setError("");
    setMessage("");

    const numericAge = Number(age);
    const numericHeight = Number(height);
    const numericWeight = Number(weight);

    if (
      !numericAge ||
      numericAge < 13 ||
      numericAge > 100
    ) {
      setError(
        "Please enter a valid age between 13 and 100."
      );
      return;
    }

    if (!sex) {
      setError("Please select your sex.");
      return;
    }

    if (
      !numericHeight ||
      numericHeight < 100 ||
      numericHeight > 250
    ) {
      setError(
        "Please enter a valid height between 100 and 250 cm."
      );
      return;
    }

    if (
      !numericWeight ||
      numericWeight < 25 ||
      numericWeight > 300
    ) {
      setError(
        "Please enter a valid weight between 25 and 300 kg."
      );
      return;
    }

    try {
      const updatedProfile = {
        ...userProfile,
        age: numericAge,
        sex,
        height: numericHeight,
        weight: numericWeight,
        dietPreference,
        goal,
      };

      const nutrition =
        calculateNutritionProfile(updatedProfile);

      updateProfile({
        age: numericAge,
        sex,
        height: numericHeight,
        weight: numericWeight,
        dietPreference,
        goal,
        nutrition,
      });

      setMessage(
        "Your profile and nutrition targets have been updated."
      );
    } catch (err) {
      console.error(err);

      setError(
        "Unable to update your nutrition targets."
      );
    }
  };

  const handleLogout = () => {
    logout();

    navigate("/login", {
      replace: true,
    });
  };

  const handleReset = () => {
    const confirmed = window.confirm(
      "Are you sure you want to reset your Nutri-Track profile? This will remove your saved nutrition data and 30-day progress."
    );

    if (!confirmed) {
      return;
    }

    localStorage.removeItem("nutriTrackProfile");

    navigate("/register", {
      replace: true,
    });
  };

  return (
    <div className="settings-page">
      <div className="settings-container">

        {/* Header */}

        <header className="settings-header">
          <button
            className="back-circle"
            onClick={() => navigate("/dashboard")}
          >
            ←
          </button>

          <div>
            <p className="settings-header-label">
              ACCOUNT
            </p>

            <h1>Settings</h1>

            <p>
              Manage your profile and nutrition preferences.
            </p>
          </div>

          <img
            src="/logo.png"
            alt="Nutri-Track"
            className="settings-logo"
          />
        </header>

        {/* Profile Summary */}

        <section className="profile-summary">
          <div className="profile-avatar">
            {userProfile.email
              ? userProfile.email
                  .charAt(0)
                  .toUpperCase()
              : "N"}
          </div>

          <div>
            <span>Nutri-Track account</span>

            <h2>
              {userProfile.email || "Your account"}
            </h2>

            <p>
              {goalLabels[userProfile.goal] ||
                "Personalized nutrition"}
            </p>
          </div>
        </section>

        {/* Nutrition Overview */}

        <section className="settings-overview">
          <div>
            <span>Daily calories</span>

            <strong>
              {userProfile.nutrition?.targetCalories ||
                "--"}{" "}
              kcal
            </strong>
          </div>

          <div>
            <span>Protein</span>

            <strong>
              {userProfile.nutrition?.protein || "--"}g
            </strong>
          </div>

          <div>
            <span>30-day progress</span>

            <strong>
              {completedDays}
              <small> completed</small>
            </strong>
          </div>
        </section>

        {/* Edit Profile */}

        <section className="settings-card">
          <div className="settings-card-heading">
            <div>
              <p>PERSONAL INFORMATION</p>

              <h2>
                Body profile
              </h2>
            </div>

            <span>👤</span>
          </div>

          <form onSubmit={handleSave}>
            <div className="settings-grid">

              <div className="form-group">
                <label>
                  Age
                </label>

                <input
                  className="form-input"
                  type="number"
                  min="13"
                  max="100"
                  value={age}
                  onChange={(e) =>
                    setAge(e.target.value)
                  }
                />
              </div>

              <div className="form-group">
                <label>
                  Sex
                </label>

                <select
                  className="form-input"
                  value={sex}
                  onChange={(e) =>
                    setSex(e.target.value)
                  }
                >
                  <option value="">
                    Select
                  </option>

                  <option value="male">
                    Male
                  </option>

                  <option value="female">
                    Female
                  </option>
                </select>
              </div>

              <div className="form-group">
                <label>
                  Height (cm)
                </label>

                <input
                  className="form-input"
                  type="number"
                  min="100"
                  max="250"
                  value={height}
                  onChange={(e) =>
                    setHeight(e.target.value)
                  }
                />
              </div>

              <div className="form-group">
                <label>
                  Weight (kg)
                </label>

                <input
                  className="form-input"
                  type="number"
                  min="25"
                  max="300"
                  step="0.1"
                  value={weight}
                  onChange={(e) =>
                    setWeight(e.target.value)
                  }
                />
              </div>

            </div>

            {/* Food Preference */}

            <div className="settings-subsection">
              <label className="settings-label">
                Food preference
              </label>

              <div className="settings-options">

                <button
                  type="button"
                  className={
                    dietPreference === "vegetarian"
                      ? "settings-option active"
                      : "settings-option"
                  }
                  onClick={() =>
                    setDietPreference("vegetarian")
                  }
                >
                  <span>🥬</span>

                  <div>
                    <strong>
                      Vegetarian
                    </strong>

                    <small>
                      Vegetarian Indian meals
                    </small>
                  </div>
                </button>

                <button
                  type="button"
                  className={
                    dietPreference ===
                    "non-vegetarian"
                      ? "settings-option active"
                      : "settings-option"
                  }
                  onClick={() =>
                    setDietPreference(
                      "non-vegetarian"
                    )
                  }
                >
                  <span>🍗</span>

                  <div>
                    <strong>
                      Non-Vegetarian
                    </strong>

                    <small>
                      Includes eggs, chicken and fish
                    </small>
                  </div>
                </button>

              </div>
            </div>

            {/* Nutrition Goal */}

            <div className="settings-subsection">
              <label className="settings-label">
                Nutrition goal
              </label>

              <div className="settings-options">

                <button
                  type="button"
                  className={
                    goal === "lose-weight"
                      ? "settings-option active"
                      : "settings-option"
                  }
                  onClick={() =>
                    setGoal("lose-weight")
                  }
                >
                  <span>📉</span>

                  <div>
                    <strong>
                      Lose Weight
                    </strong>

                    <small>
                      Controlled calorie deficit
                    </small>
                  </div>
                </button>

                <button
                  type="button"
                  className={
                    goal === "maintain-weight"
                      ? "settings-option active"
                      : "settings-option"
                  }
                  onClick={() =>
                    setGoal("maintain-weight")
                  }
                >
                  <span>⚖️</span>

                  <div>
                    <strong>
                      Maintain Weight
                    </strong>

                    <small>
                      Balanced calorie intake
                    </small>
                  </div>
                </button>

                <button
                  type="button"
                  className={
                    goal === "gain-weight"
                      ? "settings-option active"
                      : "settings-option"
                  }
                  onClick={() =>
                    setGoal("gain-weight")
                  }
                >
                  <span>📈</span>

                  <div>
                    <strong>
                      Gain Weight
                    </strong>

                    <small>
                      Controlled calorie surplus
                    </small>
                  </div>
                </button>

              </div>
            </div>

            {/* Messages */}

            {error && (
              <p className="settings-error">
                {error}
              </p>
            )}

            {message && (
              <p className="settings-success">
                ✓ {message}
              </p>
            )}

            <button
              type="submit"
              className="primary-button"
            >
              Save & Recalculate
            </button>
          </form>
        </section>

        {/* Plan Progress */}

        <section className="settings-card">
          <div className="settings-card-heading">
            <div>
              <p>YOUR PROGRESS</p>

              <h2>
                30-Day Plan
              </h2>
            </div>

            <span>📅</span>
          </div>

          <div className="settings-progress-row">

            <div>
              <strong>
                {completedDays}
              </strong>

              <span>
                Completed
              </span>
            </div>

            <div>
              <strong>
                {partialDays}
              </strong>

              <span>
                Partial
              </span>
            </div>

            <button
              onClick={() =>
                navigate("/plan")
              }
            >
              View Plan →
            </button>

          </div>
        </section>

        {/* Account Actions */}

        <section className="account-actions">

          <button
            className="logout-button"
            onClick={handleLogout}
          >
            <span>↪</span>

            <div>
              <strong>
                Log out
              </strong>

              <small>
                Sign out of this device
              </small>
            </div>
          </button>

          <button
            className="reset-button"
            onClick={handleReset}
          >
            <span>♻</span>

            <div>
              <strong>
                Reset profile
              </strong>

              <small>
                Delete saved nutrition profile
              </small>
            </div>
          </button>

        </section>

      </div>
    </div>
  );
}

export default Settings;