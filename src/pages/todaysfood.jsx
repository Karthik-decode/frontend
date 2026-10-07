import React, { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../context/usercontext";
import { getDailyFoodPlan } from "../services/foodservice";
import "../styles/food.css";

function TodaysFood() {
  const navigate = useNavigate();
  const { userProfile } = useUser();

  const nutrition = userProfile.nutrition || {};

  const meals = useMemo(
    () => getDailyFoodPlan(userProfile),
    [userProfile.dietPreference]
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

  const totalCalories = Object.values(meals).reduce(
    (sum, meal) => sum + meal.calories,
    0
  );

  const totalProtein = Object.values(meals).reduce(
    (sum, meal) => sum + meal.protein,
    0
  );

  const totalCarbohydrates = Object.values(meals).reduce(
    (sum, meal) => sum + meal.carbohydrates,
    0
  );

  const totalFat = Object.values(meals).reduce(
    (sum, meal) => sum + meal.fat,
    0
  );

  return (
    <div className="food-page">
      <div className="food-container">

        <header className="food-header">

          <button
            className="back-circle"
            onClick={() => navigate("/dashboard")}
          >
            ←
          </button>

          <div>
            <p className="food-header-label">
              PERSONALIZED PLAN
            </p>

            <h1>Today's Food</h1>

            <p>
              Indian meals selected around your nutrition
              requirements.
            </p>
          </div>

          <img
            src="/logo.png"
            alt="Nutri-Track"
            className="food-logo"
          />

        </header>

        {/* Daily Summary */}

        <section className="food-summary">

          <div>
            <span>Today's plan</span>

            <strong>
              {totalCalories} kcal
            </strong>

            <small>
              Target: {nutrition.targetCalories || "--"} kcal
            </small>
          </div>

          <div className="summary-divider"></div>

          <div>
            <span>Protein</span>

            <strong>
              {totalProtein}g
            </strong>

            <small>
              Target: {nutrition.protein || "--"}g
            </small>
          </div>

        </section>

        {/* Macro Summary */}

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

        {/* Meals */}

        <section className="meals-section">

          <div className="food-section-title">
            <div>
              <p>YOUR MEALS</p>
              <h2>Eat well today 🌱</h2>
            </div>
          </div>

          {mealInformation.map((mealInfo) => {
            const meal = meals[mealInfo.key];

            return (
              <article
                className="meal-card"
                key={mealInfo.key}
              >

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

                <h4>
                  {meal.name}
                </h4>

                <p className="meal-description">
                  {meal.description}
                </p>

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

        {/* Nutrition Note */}

        <section className="food-note">

          <span>💡</span>

          <div>
            <strong>
              Personalized nutrition
            </strong>

            <p>
              These meals are starting recommendations.
              Portion sizes can be adjusted to better match
              your calorie and macro targets.
            </p>
          </div>

        </section>

      </div>
    </div>
  );
}

export default TodaysFood;