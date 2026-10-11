import React from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../context/usercontext";
import { getAccount } from "../services/authservice";
import "../styles/dashboard.css";

function Dashboard() {
  const navigate = useNavigate();
  const {
  userProfile,
  profileLoading,
  profileError,
  reloadProfile,
} = useUser();

  const nutrition = userProfile.nutrition || {};

  const targetCalories = nutrition.targetCalories || 0;
  const protein = nutrition.protein || 0;
  const carbohydrates = nutrition.carbohydrates || 0;
  const fat = nutrition.fat || 0;

  const goalLabels = {
    "lose-weight": "Lose Weight",
    "maintain-weight": "Maintain Weight",
    "gain-weight": "Gain Weight",
  };

  const goalLabel =
    goalLabels[userProfile.goal] || "Personalized Goal";

  const account = getAccount();

  const firstName =
    account?.name ||
    "there";
  
  if (profileLoading) {
    return (
      <div className="dashboard-page">
        <div className="dashboard-container">
          <p>Loading your personalized nutrition...</p>
        </div>
      </div>
    );
  }

  if (profileError && !userProfile.nutrition?.targetCalories) {
    return (
      <div className="dashboard-page">
        <div className="dashboard-container">
          <h2>Unable to load your nutrition profile</h2>
          <p>{profileError}</p>

          <button
            type="button"
            className="primary-button"
            onClick={reloadProfile}
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  /*
   * Macro calorie calculations
   * Protein = 4 kcal/g
   * Carbohydrates = 4 kcal/g
   * Fat = 9 kcal/g
   */
  const proteinCalories = protein * 4;
  const carbCalories = carbohydrates * 4;
  const fatCalories = fat * 9;

  const totalMacroCalories =
    proteinCalories +
    carbCalories +
    fatCalories;

  const proteinPercentage =
    totalMacroCalories > 0
      ? Math.round(
          (proteinCalories / totalMacroCalories) * 100
        )
      : 0;

  const carbPercentage =
    totalMacroCalories > 0
      ? Math.round(
          (carbCalories / totalMacroCalories) * 100
        )
      : 0;

  const fatPercentage =
    totalMacroCalories > 0
      ? Math.round(
          (fatCalories / totalMacroCalories) * 100
        )
      : 0;

  return (
    <div className="dashboard-page">
      <div className="dashboard-container">

        {/* ========================================= */}
        {/* HEADER */}
        {/* ========================================= */}

        <header className="dashboard-header">

          <div className="dashboard-header-content">

            

            <h1>
              Hello, {firstName}
            </h1>

            <p className="dashboard-subtitle">
              Here's your personalized nutrition.
            </p>

          </div>

          <div className="dashboard-logo-wrapper">
            <img
              src="/Logo.png"
              alt="Nutri-Track"
              className="dashboard-logo"
            />
          </div>

        </header>


        {/* ========================================= */}
        {/* GOAL CARD */}
        {/* ========================================= */}

        <section className="goal-banner">

          <div className="goal-content">

            <div className="goal-badge">
              YOUR CURRENT GOAL
            </div>

            <h2>
              {goalLabel}
            </h2>

            <p>
              Your nutrition targets are personalized
              around your body profile and goal.
            </p>

          </div>

          <div className="goal-icon">
            {userProfile.goal === "lose-weight"
              ? "📉"
              : userProfile.goal === "gain-weight"
              ? "📈"
              : "⚖️"}
          </div>

        </section>


        {/* ========================================= */}
        {/* CALORIE + DAILY OVERVIEW */}
        {/* ========================================= */}

        <section className="overview-grid">

          <div className="calorie-card">

            <div className="card-top-row">

              <div>
                <p className="section-label">
                  DAILY TARGET
                </p>

                <h2>
                  Calories
                </h2>
              </div>

              <div className="calorie-icon">
                🔥
              </div>

            </div>


            <div className="calorie-main">

              <div
                className="calorie-ring"
                style={{
                  background: `conic-gradient(
                    var(--primary-green) 0deg,
                    var(--primary-green) 250deg,
                    #e5eee8 250deg,
                    #e5eee8 360deg
                  )`,
                }}
              >

                <div className="calorie-ring-inner">

                  <strong>
                    {targetCalories.toLocaleString()}
                  </strong>

                  <span>
                    kcal / day
                  </span>

                </div>

              </div>


              <div className="calorie-summary">

                <div className="summary-item">
                  <span className="summary-dot target-dot" />

                  <div>
                    <small>
                      Daily target
                    </small>

                    <strong>
                      {targetCalories.toLocaleString()} kcal
                    </strong>
                  </div>
                </div>


                <div className="summary-item">
                  <span className="summary-dot goal-dot" />

                  <div>
                    <small>
                      Goal
                    </small>

                    <strong>
                      {goalLabel}
                    </strong>
                  </div>
                </div>

              </div>

            </div>

            <p className="calorie-note">
              Your recommended daily calorie intake.
            </p>

          </div>


          {/* Quick Stats */}

          <div className="daily-summary-card">

            <div className="card-top-row">

              <div>
                <p className="section-label">
                  YOUR PROFILE
                </p>

                <h2>
                  Daily overview
                </h2>
              </div>

              <span className="overview-icon">
                🌱
              </span>

            </div>


            <div className="profile-stat-grid">

              <div className="profile-stat">
                <span>Age</span>
                <strong>
                  {userProfile.age || "--"}
                </strong>
                <small>years</small>
              </div>

              <div className="profile-stat">
                <span>Height</span>
                <strong>
                  {userProfile.height || "--"}
                </strong>
                <small>cm</small>
              </div>

              <div className="profile-stat">
                <span>Weight</span>
                <strong>
                  {userProfile.weight || "--"}
                </strong>
                <small>kg</small>
              </div>

              <div className="profile-stat">
                <span>Diet</span>
                <strong className="diet-value">
                  {userProfile.dietPreference ===
                  "vegetarian"
                    ? "Veg"
                    : userProfile.dietPreference ===
                      "non-vegetarian"
                    ? "Non-Veg"
                    : "--"}
                </strong>
              </div>

            </div>


            <button
              className="profile-link"
              onClick={() => navigate("/settings")}
            >
              Manage your profile
              <span>→</span>
            </button>

          </div>

        </section>


        {/* ========================================= */}
        {/* MACROS */}
        {/* ========================================= */}

        <section className="macro-section">

          <div className="section-title-row">

            <div>
              <p className="section-label">
                DAILY MACROS
              </p>

              <h2>
                Nutrition targets
              </h2>
            </div>

            <span className="section-caption">
              Based on your goal
            </span>

          </div>


          <div className="macro-grid">

            <div className="macro-card protein-card">

              <div className="macro-card-top">

                <div className="macro-icon">
                  🥩
                </div>

                <span className="macro-percentage">
                  {proteinPercentage}%
                </span>

              </div>

              <p className="macro-name">
                Protein
              </p>

              <div className="macro-value">
                <strong>
                  {protein}g
                </strong>

                <span>
                  / day
                </span>
              </div>

              <div className="macro-progress">
                <div
                  className="macro-progress-fill"
                  style={{
                    width: `${Math.min(
                      proteinPercentage * 2.2,
                      100
                    )}%`,
                  }}
                />
              </div>

              <small>
                Supports muscle & recovery
              </small>

            </div>


            <div className="macro-card carbs-card">

              <div className="macro-card-top">

                <div className="macro-icon">
                  🍚
                </div>

                <span className="macro-percentage">
                  {carbPercentage}%
                </span>

              </div>

              <p className="macro-name">
                Carbohydrates
              </p>

              <div className="macro-value">
                <strong>
                  {carbohydrates}g
                </strong>

                <span>
                  / day
                </span>
              </div>

              <div className="macro-progress">
                <div
                  className="macro-progress-fill"
                  style={{
                    width: `${Math.min(
                      carbPercentage * 1.4,
                      100
                    )}%`,
                  }}
                />
              </div>

              <small>
                Your primary energy source
              </small>

            </div>


            <div className="macro-card fat-card">

              <div className="macro-card-top">

                <div className="macro-icon">
                  🥑
                </div>

                <span className="macro-percentage">
                  {fatPercentage}%
                </span>

              </div>

              <p className="macro-name">
                Healthy Fats
              </p>

              <div className="macro-value">
                <strong>
                  {fat}g
                </strong>

                <span>
                  / day
                </span>
              </div>

              <div className="macro-progress">
                <div
                  className="macro-progress-fill"
                  style={{
                    width: `${Math.min(
                      fatPercentage * 2,
                      100
                    )}%`,
                  }}
                />
              </div>

              <small>
                Supports hormones & absorption
              </small>

            </div>

          </div>

        </section>


        {/* ========================================= */}
        {/* MACRO DISTRIBUTION CHART */}
        {/* ========================================= */}

        <section className="chart-card">

          <div className="chart-header">

            <div>
              <p className="section-label">
                NUTRITION BREAKDOWN
              </p>

              <h2>
                Macro distribution
              </h2>

              <p>
                How your daily calories are distributed
                across your macronutrients.
              </p>
            </div>

            <div className="chart-total">
              <strong>
                {totalMacroCalories.toLocaleString()}
              </strong>

              <span>
                kcal from macros
              </span>
            </div>

          </div>


          <div className="macro-chart">

            <div className="chart-bar">

              <div
                className="chart-segment protein-segment"
                style={{
                  width: `${proteinPercentage}%`,
                }}
              />

              <div
                className="chart-segment carb-segment"
                style={{
                  width: `${carbPercentage}%`,
                }}
              />

              <div
                className="chart-segment fat-segment"
                style={{
                  width: `${fatPercentage}%`,
                }}
              />

            </div>


            <div className="chart-legend">

              <div className="legend-item">
                <span className="legend-dot protein-dot" />

                <div>
                  <strong>Protein</strong>
                  <span>{proteinPercentage}%</span>
                </div>
              </div>


              <div className="legend-item">
                <span className="legend-dot carbs-dot" />

                <div>
                  <strong>Carbs</strong>
                  <span>{carbPercentage}%</span>
                </div>
              </div>


              <div className="legend-item">
                <span className="legend-dot fat-dot" />

                <div>
                  <strong>Fat</strong>
                  <span>{fatPercentage}%</span>
                </div>
              </div>

            </div>

          </div>

        </section>


        {/* ========================================= */}
        {/* TODAY'S FOOD */}
        {/* ========================================= */}

        <section className="dashboard-food-card">

          <div className="section-title-row">

            <div>
              <p className="section-label">
                TODAY
              </p>

              <h2>
                Today's food
              </h2>
            </div>

            <button
              className="text-button"
              onClick={() => navigate("/today")}
            >
              View →
            </button>

          </div>


          <div className="meal-timeline">

            {/* Breakfast */}

            <div className="meal-preview">

              <div className="meal-time">
                <span>
                  08:00
                </span>

                <div className="timeline-line" />
              </div>

              <div className="meal-preview-icon breakfast-icon">
                🌅
              </div>

              <div className="meal-preview-content">

                <div className="meal-title-row">
                  <h3>
                    Breakfast
                  </h3>

                  <span className="meal-status">
                    Planned
                  </span>
                </div>

                <p>
                  Your personalized Indian breakfast
                </p>

              </div>

              

            </div>


            {/* Lunch */}

            <div className="meal-preview">

              <div className="meal-time">
                <span>
                  13:00
                </span>

                <div className="timeline-line" />
              </div>

              <div className="meal-preview-icon lunch-icon">
                ☀️
              </div>

              <div className="meal-preview-content">

                <div className="meal-title-row">
                  <h3>
                    Lunch
                  </h3>

                  <span className="meal-status">
                    Planned
                  </span>
                </div>

                <p>
                  Balanced Indian lunch
                </p>

              </div>

              

            </div>


            {/* Snack */}

            <div className="meal-preview">

              <div className="meal-time">
                <span>
                  17:00
                </span>

                <div className="timeline-line" />
              </div>

              <div className="meal-preview-icon snack-icon">
                🍎
              </div>

              <div className="meal-preview-content">

                <div className="meal-title-row">
                  <h3>
                    Snack
                  </h3>

                  <span className="meal-status">
                    Planned
                  </span>
                </div>

                <p>
                  Healthy snack recommendation
                </p>

              </div>

              

            </div>


            {/* Dinner */}

            <div className="meal-preview">

              <div className="meal-time">
                <span>
                  20:00
                </span>
              </div>

              <div className="meal-preview-icon dinner-icon">
                🌙
              </div>

              <div className="meal-preview-content">

                <div className="meal-title-row">
                  <h3>
                    Dinner
                  </h3>

                  <span className="meal-status">
                    Planned
                  </span>
                </div>

                <p>
                  Personalized dinner recommendation
                </p>

              </div>

              

            </div>

          </div>

        </section>

      </div>
    </div>
  );
}

export default Dashboard;