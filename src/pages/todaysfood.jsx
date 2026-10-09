import React, { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../context/usercontext";
import { getDailyFoodPlan } from "../services/foodservice";
import "../styles/food.css";

function TodaysFood() {
  const navigate = useNavigate();
  const { userProfile } = useUser();

  const nutrition = userProfile?.nutrition || {};

  /*
    Use the current date to determine the meal rotation.

    This means:
    Day 1 → rotation 1
    Day 2 → rotation 2
    Day 3 → rotation 3
    ...
    Day 7 → rotation 7
    Day 8 → rotation starts again.

    This prevents the same meals from appearing every day.
  */
  const today = new Date();

  const startOfYear = new Date(
    today.getFullYear(),
    0,
    1
  );

  const difference =
    today.getTime() - startOfYear.getTime();

  const dayIndex = Math.floor(
    difference / (1000 * 60 * 60 * 24)
  ) % 7;

  const meals = useMemo(
    () =>
      getDailyFoodPlan(
        userProfile,
        dayIndex
      ),
    [
      userProfile,
      dayIndex,
    ]
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

  const mealList = Object.values(meals || {}).filter(
    Boolean
  );

  const totalCalories = mealList.reduce(
    (sum, meal) =>
      sum + (Number(meal.calories) || 0),
    0
  );

  const totalProtein = mealList.reduce(
    (sum, meal) =>
      sum + (Number(meal.protein) || 0),
    0
  );

  const totalCarbohydrates = mealList.reduce(
    (sum, meal) =>
      sum + (Number(meal.carbohydrates) || 0),
    0
  );

  const totalFat = mealList.reduce(
    (sum, meal) =>
      sum + (Number(meal.fat) || 0),
    0
  );

  /*
    Format today's date for the header.
  */
  const formattedDate = new Date().toLocaleDateString(
    "en-IN",
    {
      weekday: "long",
      day: "numeric",
      month: "long",
    }
  );

  /*
    Display quantity cleanly.

    Examples:
    150 g
    200 ml
    3 pieces
    2 slices
  */
  const formatQuantity = (item) => {
    if (!item) {
      return "";
    }

    return `${item.quantity} ${item.unit}`;
  };

  return (
    <div className="food-page">
      <div className="food-container">

        {/* Header */}

        <header className="food-header">

          <button
            className="back-circle"
            onClick={() =>
              navigate("/dashboard")
            }
            aria-label="Back to dashboard"
          >
            ←
          </button>

          <div>
            <p className="food-header-label">
              PERSONALIZED PLAN
            </p>

            <h1>Today's Food</h1>

            <p>
              {formattedDate}
            </p>
          </div>

          <img
  src="/Logo.png"
  alt="Nutri-Track"
  className="page-header-logo"
/>

        </header>

        {/* Daily Summary */}

        <section className="food-summary">

          <div>
            <span>Today's plan</span>

            <strong>
              {totalCalories.toLocaleString()} kcal
            </strong>

            <small>
              Target:{" "}
              {nutrition.targetCalories
                ? `${nutrition.targetCalories} kcal`
                : "--"}
            </small>
          </div>

          <div className="summary-divider"></div>

          <div>
            <span>Protein</span>

            <strong>
              {totalProtein}g
            </strong>

            <small>
              Target:{" "}
              {nutrition.protein
                ? `${nutrition.protein}g`
                : "--"}
            </small>
          </div>

        </section>

        {/* Macro Summary */}

        <section className="food-macro-row">

          <div>
            <span>Carbs</span>
            <strong>
              {totalCarbohydrates}g
            </strong>
          </div>

          <div>
            <span>Protein</span>
            <strong>
              {totalProtein}g
            </strong>
          </div>

          <div>
            <span>Fat</span>
            <strong>
              {totalFat}g
            </strong>
          </div>

        </section>

        {/* Meals */}

        <section className="meals-section">

          <div className="food-section-title">
            <div>
              <p>YOUR MEALS</p>

              <h2>
                Eat well today 🌱
              </h2>
            </div>
          </div>

          {mealInformation.map(
            (mealInfo) => {
              const meal =
                meals?.[mealInfo.key];

              if (!meal) {
                return null;
              }

              return (
                <article
                  className="meal-card"
                  key={mealInfo.key}
                >

                  {/* Meal Header */}

                  <div className="meal-top">

                    <div className="meal-icon">
                      {mealInfo.icon}
                    </div>

                    <div className="meal-heading">

                      <span>
                        {mealInfo.time}
                      </span>

                      <h3>
                        {mealInfo.title}
                      </h3>

                    </div>

                    <div className="meal-calories">
                      {meal.calories} kcal
                    </div>

                  </div>

                  {/* Meal Name */}

                  <h4>
                    {meal.name}
                  </h4>

                  <p className="meal-description">
                    {meal.description}
                  </p>

                  {/* Food Quantities */}

                  {meal.items &&
                    meal.items.length > 0 && (
                      <div className="meal-items">

                        <div className="meal-items-title">
                          <span>
                            🍽️
                          </span>

                          <strong>
                            Portion
                            guide
                          </strong>
                        </div>

                        <div className="meal-items-list">

                          {meal.items.map(
                            (
                              item,
                              index
                            ) => (
                              <div
                                className="meal-item"
                                key={`${item.name}-${index}`}
                              >

                                <div className="meal-item-info">

                                  <span className="meal-item-dot">
                                    •
                                  </span>

                                  <span className="meal-item-name">
                                    {item.name}
                                  </span>

                                </div>

                                <strong className="meal-item-quantity">
                                  {formatQuantity(
                                    item
                                  )}

                                  {item.grams &&
                                    item.unit !==
                                      "g" && (
                                      <small>
                                        {" "}
                                        (
                                        {
                                          item.grams
                                        }
                                        g)
                                      </small>
                                    )}
                                </strong>

                              </div>
                            )
                          )}

                        </div>

                      </div>
                    )}

                  {/* Meal Macros */}

                  <div className="meal-macros">

                    <div>
                      <span>
                        Protein
                      </span>

                      <strong>
                        {meal.protein}g
                      </strong>
                    </div>

                    <div>
                      <span>
                        Carbs
                      </span>

                      <strong>
                        {meal.carbohydrates}g
                      </strong>
                    </div>

                    <div>
                      <span>
                        Fat
                      </span>

                      <strong>
                        {meal.fat}g
                      </strong>
                    </div>

                  </div>

                </article>
              );
            }
          )}

        </section>

        {/* Nutrition Note */}

        <section className="food-note">

          <span>💡</span>

          <div>
            <strong>
              Personalized nutrition
            </strong>

            <p>
              Portions are adjusted according
              to your daily calorie target.
              Nutrition values are approximate
              and may vary depending on
              preparation and ingredients.
            </p>
          </div>

        </section>

      </div>
    </div>
  );
}

export default TodaysFood;