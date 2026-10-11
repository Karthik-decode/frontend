import React, { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

import { useUser } from "../context/usercontext";
import {
  getDailyFoodPlan,
  getAlternativeMeal,
} from "../services/foodservice";

import "../styles/food.css";

function TodaysFood() {
  const navigate = useNavigate();
  const { userProfile } = useUser();

  const [replacedMeals, setReplacedMeals] = useState({});
  const [replacementHistory, setReplacementHistory] = useState({});
  const [replacementCounts, setReplacementCounts] = useState({});
  const [replacementErrors, setReplacementErrors] = useState({});

  const nutrition = userProfile?.nutrition || {};

  // Rotate the meal plan based on the current day of the year.
  const today = new Date();

  const startOfYear = new Date(today.getFullYear(), 0, 1);

  const dayIndex =
    Math.floor(
      (today.getTime() - startOfYear.getTime()) /
        (1000 * 60 * 60 * 24)
    ) % 7;

  // Generate the original daily plan from the latest user profile.
  const originalMeals = useMemo(
    () => getDailyFoodPlan(userProfile, dayIndex),
    [userProfile, dayIndex]
  );

  // Use a replaced meal when one has been selected.
  const meals = useMemo(
    () => ({
      ...originalMeals,
      ...replacedMeals,
    }),
    [originalMeals, replacedMeals]
  );

  const mealInformation = [
    {
      key: "breakfast",
      title: "Breakfast",
      icon: "🌅",
      time: "Morning",
    },
    {
      key: "lunch",
      title: "Lunch",
      icon: "☀️",
      time: "Afternoon",
    },
    {
      key: "snack",
      title: "Snack",
      icon: "🍎",
      time: "Evening",
    },
    {
      key: "dinner",
      title: "Dinner",
      icon: "🌙",
      time: "Night",
    },
  ];

  const mealList = Object.values(meals || {}).filter(Boolean);

  const totalCalories = Math.round(
    mealList.reduce(
      (sum, meal) => sum + (Number(meal.calories) || 0),
      0
    )
  );

  const totalProtein = Math.round(
    mealList.reduce(
      (sum, meal) => sum + (Number(meal.protein) || 0),
      0
    )
  );

  const totalCarbohydrates = Math.round(
    mealList.reduce(
      (sum, meal) => sum + (Number(meal.carbohydrates) || 0),
      0
    )
  );

  const totalFat = Math.round(
    mealList.reduce(
      (sum, meal) => sum + (Number(meal.fat) || 0),
      0
    )
  );

  const formattedDate = today.toLocaleDateString("en-IN", {
    weekday: "long",
    day: "numeric",
    month: "long",
  });

  const formatQuantity = (item) => {
    if (!item) return "";

    return `${item.quantity ?? ""} ${item.unit ?? ""}`.trim();
  };

  // Replace one meal without changing the other meals.
  const handleReplaceMeal = (mealType) => {
    const currentMeal = meals?.[mealType];

    if (!currentMeal) return;

    const count = replacementCounts[mealType] || 0;
    const previouslySeen = replacementHistory[mealType] || [];

    setReplacementErrors((previous) => ({
      ...previous,
      [mealType]: "",
    }));

    const alternative = getAlternativeMeal(
      userProfile,
      mealType,
      currentMeal.name,
      dayIndex + count + 1,
      previouslySeen
    );

    if (!alternative) {
      setReplacementErrors((previous) => ({
        ...previous,
        [mealType]:
          "No different meal is available in this category. Try again later.",
      }));
      return;
    }

    // Remember the meal being replaced to avoid cycling back to it.
    setReplacementHistory((previous) => ({
      ...previous,
      [mealType]: [
        ...(previous[mealType] || []),
        currentMeal.name,
      ],
    }));

    setReplacedMeals((previous) => ({
      ...previous,
      [mealType]: alternative,
    }));

    setReplacementCounts((previous) => ({
      ...previous,
      [mealType]: count + 1,
    }));
  };

  return (
    <div className="food-page">
      <div className="food-container">
        <header className="food-header">
          <button
            type="button"
            className="back-circle"
            onClick={() => navigate("/dashboard")}
            aria-label="Back to dashboard"
          >
            ←
          </button>

          <div>
            <p className="food-header-label">PERSONALIZED PLAN</p>
            <h1>Today's Food</h1>
            <p>{formattedDate}</p>
          </div>

          <img
            src="/Logo.png"
            alt="Nutri-Track"
            className="page-header-logo"
          />
        </header>

        <section className="food-summary">
          <div>
            <span>Today's plan</span>
            <strong>{totalCalories.toLocaleString("en-IN")} kcal</strong>
            <small>
              Target:{" "}
              {nutrition.targetCalories
                ? `${nutrition.targetCalories} kcal`
                : "--"}
            </small>
          </div>

          <div className="summary-divider" />

          <div>
            <span>Protein</span>
            <strong>{totalProtein}g</strong>
            <small>
              Target:{" "}
              {nutrition.protein ? `${nutrition.protein}g` : "--"}
            </small>
          </div>
        </section>

        <section className="food-macro-row">
          <div>
            <span>Carbs</span>
            <strong>{totalCarbohydrates}g</strong>
          </div>

          <div>
            <span>Protein</span>
            <strong>{totalProtein}g</strong>
          </div>

          <div>
            <span>Fat</span>
            <strong>{totalFat}g</strong>
          </div>
        </section>

        <section className="meals-section">
          <div className="food-section-title">
            <div>
              <p>YOUR MEALS</p>
              <h2>Eat well today 🌱</h2>
            </div>
          </div>

          {mealInformation.map((mealInfo) => {
            const meal = meals && meals[mealInfo.key];

            if (!meal) return null;

            return (
              <article className="meal-card" key={mealInfo.key}>
                <div className="meal-top">
                  <div className="meal-icon">{mealInfo.icon}</div>

                  <div className="meal-heading">
                    <span>{mealInfo.time}</span>
                    <h3>{mealInfo.title}</h3>
                  </div>

                  <div className="meal-calories">{meal.calories} kcal</div>
                </div>

                <h4>{meal.name}</h4>

                <button
                  type="button"
                  className="replace-meal-button"
                  onClick={() => handleReplaceMeal(mealInfo.key)}
                  aria-label={`Replace ${mealInfo.title}`}
                >
                  ↻ Replace meal
                </button>

                {replacementErrors[mealInfo.key] && (
                  <p
                    role="status"
                    style={{
                      color: "#b45309",
                      fontSize: "13px",
                      margin: "0 0 10px",
                    }}
                  >
                    {replacementErrors[mealInfo.key]}
                  </p>
                )}

                <p className="meal-description">{meal.description}</p>

                {meal.items && meal.items.length > 0 && (
                  <div className="meal-items">
                    <div className="meal-items-title">
                      <span>🍽️</span>
                      <strong>Portion guide</strong>
                    </div>

                    <div className="meal-items-list">
                      {meal.items.map((item, index) => (
                        <div
                          className="meal-item"
                          key={`${item.name}-${index}`}
                        >
                          <div className="meal-item-info">
                            <span className="meal-item-dot">•</span>
                            <span className="meal-item-name">{item.name}</span>
                          </div>

                          <strong className="meal-item-quantity">
                            {formatQuantity(item)}
                            {item.grams && item.unit !== "g" && (
                              <small>{" "}({item.grams} g)</small>
                            )}
                          </strong>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <div className="meal-macros">
                  <div>
                    <span>Protein</span>
                    <strong>{meal.protein}g</strong>
                  </div>

                  <div>
                    <span>Carbs</span>
                    <strong>{meal.carbohydrates}g</strong>
                  </div>

                  <div>
                    <span>Fat</span>
                    <strong>{meal.fat}g</strong>
                  </div>
                </div>
              </article>
            );
          })}
        </section>

        <section className="food-note">
          <span>💡</span>

          <div>
            <strong>Personalized nutrition</strong>

            <p>
              Meals and portions are selected according to your saved dietary
              preference and nutrition targets. Nutrition values are approximate
              and may vary depending on ingredients and preparation.
            </p>
          </div>
        </section>
      </div>
    </div>
  );
}

export default TodaysFood;
