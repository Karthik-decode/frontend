const vegetarianMeals = {
  breakfast: [
    {
      name: "Idli + Sambar + Curd",
      description: "Soft idlis with protein-rich sambar and curd.",
      items: [
        { name: "Idli", quantity: 3, unit: "pieces", grams: 150 },
        { name: "Sambar", quantity: 200, unit: "ml" },
        { name: "Curd", quantity: 100, unit: "g" },
      ],
      calories: 390,
      protein: 16,
      carbohydrates: 62,
      fat: 8,
    },

    {
      name: "Vegetable Upma + Curd",
      description: "Vegetable upma served with fresh curd.",
      items: [
        { name: "Vegetable Upma", quantity: 250, unit: "g" },
        { name: "Curd", quantity: 100, unit: "g" },
      ],
      calories: 380,
      protein: 13,
      carbohydrates: 58,
      fat: 10,
    },

    {
      name: "Masala Dosa + Sambar",
      description: "Crispy dosa with vegetable filling and sambar.",
      items: [
        { name: "Masala Dosa", quantity: 1, unit: "large piece" },
        { name: "Sambar", quantity: 200, unit: "ml" },
      ],
      calories: 430,
      protein: 12,
      carbohydrates: 64,
      fat: 14,
    },

    {
      name: "Poha + Sprouts",
      description: "Flattened rice with vegetables and protein-rich sprouts.",
      items: [
        { name: "Vegetable Poha", quantity: 250, unit: "g" },
        { name: "Sprouts", quantity: 80, unit: "g" },
      ],
      calories: 360,
      protein: 13,
      carbohydrates: 57,
      fat: 9,
    },

    {
      name: "Vegetable Pongal + Sambar",
      description: "Comforting rice-lentil pongal with sambar.",
      items: [
        { name: "Vegetable Pongal", quantity: 250, unit: "g" },
        { name: "Sambar", quantity: 200, unit: "ml" },
      ],
      calories: 410,
      protein: 15,
      carbohydrates: 65,
      fat: 10,
    },

    {
      name: "Oats + Milk + Banana",
      description: "Oats with milk and banana for a filling breakfast.",
      items: [
        { name: "Oats", quantity: 60, unit: "g" },
        { name: "Milk", quantity: 250, unit: "ml" },
        { name: "Banana", quantity: 1, unit: "medium piece" },
      ],
      calories: 420,
      protein: 16,
      carbohydrates: 67,
      fat: 10,
    },

    {
      name: "Paneer Vegetable Sandwich",
      description: "Whole-wheat sandwich with paneer and vegetables.",
      items: [
        { name: "Whole-wheat bread", quantity: 2, unit: "slices" },
        { name: "Paneer", quantity: 75, unit: "g" },
        { name: "Mixed vegetables", quantity: 80, unit: "g" },
      ],
      calories: 440,
      protein: 23,
      carbohydrates: 43,
      fat: 19,
    },
  ],

  lunch: [
    {
      name: "Rice + Dal + Vegetable Curry + Curd",
      description: "Balanced rice meal with dal, vegetables and curd.",
      items: [
        { name: "Cooked rice", quantity: 200, unit: "g" },
        { name: "Dal", quantity: 180, unit: "g" },
        { name: "Vegetable curry", quantity: 150, unit: "g" },
        { name: "Curd", quantity: 100, unit: "g" },
      ],
      calories: 620,
      protein: 23,
      carbohydrates: 92,
      fat: 15,
    },

    {
      name: "Roti + Paneer Curry + Salad",
      description: "Whole-wheat rotis with paneer curry and fresh salad.",
      items: [
        { name: "Roti", quantity: 3, unit: "pieces" },
        { name: "Paneer curry", quantity: 150, unit: "g" },
        { name: "Fresh salad", quantity: 100, unit: "g" },
      ],
      calories: 590,
      protein: 27,
      carbohydrates: 67,
      fat: 21,
    },

    {
      name: "Rajma Rice + Cucumber Raita",
      description: "Rajma with rice paired with refreshing cucumber raita.",
      items: [
        { name: "Cooked rice", quantity: 200, unit: "g" },
        { name: "Rajma curry", quantity: 180, unit: "g" },
        { name: "Cucumber raita", quantity: 120, unit: "g" },
      ],
      calories: 610,
      protein: 24,
      carbohydrates: 94,
      fat: 13,
    },

    {
      name: "Chole + Roti + Salad",
      description: "Chickpea curry with whole-wheat rotis and salad.",
      items: [
        { name: "Chole", quantity: 180, unit: "g" },
        { name: "Roti", quantity: 3, unit: "pieces" },
        { name: "Fresh salad", quantity: 100, unit: "g" },
      ],
      calories: 580,
      protein: 22,
      carbohydrates: 82,
      fat: 16,
    },

    {
      name: "Vegetable Rice + Dal + Curd",
      description: "Vegetable rice served with dal and curd.",
      items: [
        { name: "Vegetable rice", quantity: 250, unit: "g" },
        { name: "Dal", quantity: 150, unit: "g" },
        { name: "Curd", quantity: 100, unit: "g" },
      ],
      calories: 600,
      protein: 21,
      carbohydrates: 88,
      fat: 15,
    },

    {
      name: "Paneer Rice Bowl",
      description: "Rice with paneer and mixed vegetables.",
      items: [
        { name: "Cooked rice", quantity: 200, unit: "g" },
        { name: "Paneer", quantity: 120, unit: "g" },
        { name: "Mixed vegetables", quantity: 150, unit: "g" },
      ],
      calories: 650,
      protein: 29,
      carbohydrates: 78,
      fat: 23,
    },

    {
      name: "Dal Khichdi + Curd + Salad",
      description: "Comforting lentil-rice khichdi with curd and salad.",
      items: [
        { name: "Dal khichdi", quantity: 350, unit: "g" },
        { name: "Curd", quantity: 100, unit: "g" },
        { name: "Fresh salad", quantity: 100, unit: "g" },
      ],
      calories: 560,
      protein: 20,
      carbohydrates: 83,
      fat: 14,
    },
  ],

  snack: [
    {
      name: "Fruit + Almonds",
      description: "Seasonal fruit with almonds for healthy fats.",
      items: [
        { name: "Apple", quantity: 1, unit: "medium piece", grams: 150 },
        { name: "Almonds", quantity: 15, unit: "g" },
      ],
      calories: 240,
      protein: 7,
      carbohydrates: 27,
      fat: 13,
    },

    {
      name: "Sprouts Chaat",
      description: "Mixed sprouts with vegetables, lemon and spices.",
      items: [
        { name: "Mixed sprouts", quantity: 150, unit: "g" },
        { name: "Mixed vegetables", quantity: 50, unit: "g" },
      ],
      calories: 220,
      protein: 12,
      carbohydrates: 30,
      fat: 6,
    },

    {
      name: "Buttermilk + Roasted Chana",
      description: "Cooling buttermilk with protein-rich roasted chana.",
      items: [
        { name: "Buttermilk", quantity: 250, unit: "ml" },
        { name: "Roasted chana", quantity: 40, unit: "g" },
      ],
      calories: 210,
      protein: 11,
      carbohydrates: 27,
      fat: 5,
    },

    {
      name: "Curd + Banana",
      description: "Fresh curd with banana for a simple energy-rich snack.",
      items: [
        { name: "Curd", quantity: 150, unit: "g" },
        { name: "Banana", quantity: 1, unit: "medium piece" },
      ],
      calories: 230,
      protein: 9,
      carbohydrates: 36,
      fat: 6,
    },

    {
      name: "Peanut Chaat + Fruit",
      description: "Roasted peanuts with fresh vegetables and fruit.",
      items: [
        { name: "Roasted peanuts", quantity: 25, unit: "g" },
        { name: "Mixed vegetables", quantity: 50, unit: "g" },
        { name: "Orange", quantity: 1, unit: "medium piece" },
      ],
      calories: 250,
      protein: 8,
      carbohydrates: 28,
      fat: 13,
    },

    {
      name: "Paneer Cubes + Fruit",
      description: "Paneer cubes with a fresh seasonal fruit.",
      items: [
        { name: "Paneer", quantity: 60, unit: "g" },
        { name: "Apple", quantity: 1, unit: "medium piece", grams: 150 },
      ],
      calories: 260,
      protein: 12,
      carbohydrates: 20,
      fat: 15,
    },

    {
      name: "Makhana + Buttermilk",
      description: "Light roasted makhana with refreshing buttermilk.",
      items: [
        { name: "Roasted makhana", quantity: 30, unit: "g" },
        { name: "Buttermilk", quantity: 250, unit: "ml" },
      ],
      calories: 190,
      protein: 8,
      carbohydrates: 25,
      fat: 6,
    },
  ],

  dinner: [
    {
      name: "Roti + Dal + Mixed Vegetables",
      description: "Whole-wheat rotis with dal and seasonal vegetables.",
      items: [
        { name: "Roti", quantity: 3, unit: "pieces" },
        { name: "Dal", quantity: 180, unit: "g" },
        { name: "Mixed vegetables", quantity: 150, unit: "g" },
      ],
      calories: 520,
      protein: 22,
      carbohydrates: 72,
      fat: 14,
    },

    {
      name: "Paneer Bhurji + Roti + Salad",
      description: "Spiced paneer bhurji with whole-wheat rotis.",
      items: [
        { name: "Paneer bhurji", quantity: 150, unit: "g" },
        { name: "Roti", quantity: 2, unit: "pieces" },
        { name: "Fresh salad", quantity: 100, unit: "g" },
      ],
      calories: 550,
      protein: 29,
      carbohydrates: 55,
      fat: 22,
    },

    {
      name: "Vegetable Khichdi + Curd",
      description: "Rice-lentil khichdi with vegetables and curd.",
      items: [
        { name: "Vegetable khichdi", quantity: 350, unit: "g" },
        { name: "Curd", quantity: 100, unit: "g" },
      ],
      calories: 480,
      protein: 18,
      carbohydrates: 72,
      fat: 11,
    },

    {
      name: "Dal Tadka + Rice + Vegetable Curry",
      description: "Dal tadka with rice and a vegetable side.",
      items: [
        { name: "Dal tadka", quantity: 180, unit: "g" },
        { name: "Cooked rice", quantity: 180, unit: "g" },
        { name: "Vegetable curry", quantity: 150, unit: "g" },
      ],
      calories: 530,
      protein: 20,
      carbohydrates: 81,
      fat: 12,
    },

    {
      name: "Roti + Chole + Curd",
      description: "Whole-wheat rotis with chickpea curry and curd.",
      items: [
        { name: "Roti", quantity: 3, unit: "pieces" },
        { name: "Chole", quantity: 160, unit: "g" },
        { name: "Curd", quantity: 100, unit: "g" },
      ],
      calories: 540,
      protein: 22,
      carbohydrates: 78,
      fat: 15,
    },

    {
      name: "Paneer Tikka + Roti + Salad",
      description: "Grilled paneer tikka with roti and fresh salad.",
      items: [
        { name: "Paneer tikka", quantity: 150, unit: "g" },
        { name: "Roti", quantity: 2, unit: "pieces" },
        { name: "Fresh salad", quantity: 100, unit: "g" },
      ],
      calories: 560,
      protein: 31,
      carbohydrates: 48,
      fat: 23,
    },

    {
      name: "Vegetable Pulao + Raita",
      description: "Vegetable pulao with cooling cucumber raita.",
      items: [
        { name: "Vegetable pulao", quantity: 300, unit: "g" },
        { name: "Cucumber raita", quantity: 150, unit: "g" },
      ],
      calories: 510,
      protein: 15,
      carbohydrates: 78,
      fat: 14,
    },
  ],
};

const nonVegetarianMeals = {
  breakfast: [
    ...vegetarianMeals.breakfast,

    {
      name: "Egg Bhurji + Roti",
      description: "Spiced scrambled eggs with whole-wheat rotis.",
      items: [
        { name: "Eggs", quantity: 3, unit: "pieces" },
        { name: "Roti", quantity: 2, unit: "pieces" },
        { name: "Mixed vegetables", quantity: 50, unit: "g" },
      ],
      calories: 420,
      protein: 23,
      carbohydrates: 42,
      fat: 17,
    },

    {
      name: "Egg Dosa + Sambar",
      description: "Dosa topped with egg and served with sambar.",
      items: [
        { name: "Egg dosa", quantity: 1, unit: "large piece" },
        { name: "Egg", quantity: 1, unit: "piece" },
        { name: "Sambar", quantity: 200, unit: "ml" },
      ],
      calories: 450,
      protein: 21,
      carbohydrates: 61,
      fat: 14,
    },

    {
      name: "Egg Sandwich + Fruit",
      description: "Whole-wheat egg sandwich with fresh fruit.",
      items: [
        { name: "Whole-wheat bread", quantity: 2, unit: "slices" },
        { name: "Eggs", quantity: 2, unit: "pieces" },
        { name: "Apple", quantity: 1, unit: "medium piece", grams: 150 },
      ],
      calories: 430,
      protein: 22,
      carbohydrates: 47,
      fat: 16,
    },
  ],

  lunch: [
    ...vegetarianMeals.lunch,

    {
      name: "Chicken Rice Bowl + Salad",
      description: "Rice with grilled chicken and fresh vegetables.",
      items: [
        { name: "Cooked rice", quantity: 200, unit: "g" },
        { name: "Grilled chicken", quantity: 150, unit: "g" },
        { name: "Fresh salad", quantity: 100, unit: "g" },
      ],
      calories: 650,
      protein: 40,
      carbohydrates: 78,
      fat: 17,
    },

    {
      name: "Fish Curry + Rice + Vegetables",
      description: "Indian-style fish curry with rice and vegetables.",
      items: [
        { name: "Cooked rice", quantity: 200, unit: "g" },
        { name: "Fish curry", quantity: 180, unit: "g" },
        { name: "Vegetable curry", quantity: 120, unit: "g" },
      ],
      calories: 630,
      protein: 35,
      carbohydrates: 76,
      fat: 18,
    },

    {
      name: "Chicken Roti Meal",
      description: "Lean chicken with whole-wheat rotis and vegetables.",
      items: [
        { name: "Chicken curry", quantity: 160, unit: "g" },
        { name: "Roti", quantity: 3, unit: "pieces" },
        { name: "Fresh salad", quantity: 100, unit: "g" },
      ],
      calories: 640,
      protein: 39,
      carbohydrates: 64,
      fat: 20,
    },
  ],

  snack: [
    ...vegetarianMeals.snack,

    {
      name: "Boiled Eggs + Fruit",
      description: "Boiled eggs paired with a seasonal fruit.",
      items: [
        { name: "Boiled eggs", quantity: 2, unit: "pieces" },
        { name: "Apple", quantity: 1, unit: "medium piece", grams: 150 },
      ],
      calories: 230,
      protein: 14,
      carbohydrates: 19,
      fat: 10,
    },

    {
      name: "Chicken Sandwich",
      description: "Whole-wheat sandwich with lean chicken and vegetables.",
      items: [
        { name: "Whole-wheat bread", quantity: 2, unit: "slices" },
        { name: "Cooked chicken", quantity: 80, unit: "g" },
        { name: "Vegetables", quantity: 50, unit: "g" },
      ],
      calories: 300,
      protein: 25,
      carbohydrates: 31,
      fat: 9,
    },

    {
      name: "Egg Chaat + Fruit",
      description: "Boiled eggs with vegetables and fresh fruit.",
      items: [
        { name: "Boiled eggs", quantity: 2, unit: "pieces" },
        { name: "Mixed vegetables", quantity: 50, unit: "g" },
        { name: "Orange", quantity: 1, unit: "medium piece" },
      ],
      calories: 240,
      protein: 14,
      carbohydrates: 22,
      fat: 10,
    },
  ],

  dinner: [
    ...vegetarianMeals.dinner,

    {
      name: "Chicken Roti Bowl",
      description: "Chicken with whole-wheat roti and vegetables.",
      items: [
        { name: "Chicken curry", quantity: 150, unit: "g" },
        { name: "Roti", quantity: 2, unit: "pieces" },
        { name: "Mixed vegetables", quantity: 150, unit: "g" },
      ],
      calories: 570,
      protein: 38,
      carbohydrates: 55,
      fat: 18,
    },

    {
      name: "Fish + Roti + Vegetable Curry",
      description: "Protein-rich fish with roti and vegetables.",
      items: [
        { name: "Fish", quantity: 160, unit: "g" },
        { name: "Roti", quantity: 2, unit: "pieces" },
        { name: "Vegetable curry", quantity: 150, unit: "g" },
      ],
      calories: 540,
      protein: 35,
      carbohydrates: 51,
      fat: 18,
    },

    {
      name: "Chicken Rice + Salad",
      description: "Lean chicken with cooked rice and fresh salad.",
      items: [
        { name: "Cooked rice", quantity: 200, unit: "g" },
        { name: "Chicken", quantity: 150, unit: "g" },
        { name: "Fresh salad", quantity: 100, unit: "g" },
      ],
      calories: 590,
      protein: 39,
      carbohydrates: 68,
      fat: 15,
    },
  ],
};

/*
  ---------------------------------------------------------
  Helper functions
  ---------------------------------------------------------
*/


function normalizeDietPreference(preference) {
  const normalized = String(preference || "vegetarian")
    .trim()
    .toLowerCase()
    .replace(/[\s_]+/g, "-");

  return [
    "non-vegetarian",
    "nonvegetarian",
    "non-veg",
    "nonveg",
    "non-vegetarian-diet",
  ].includes(normalized)
    ? "non-vegetarian"
    : "vegetarian";
}

function getMealDatabase(preference) {
  const normalizedPreference =
    normalizeDietPreference(preference);

  if (normalizedPreference === "vegetarian") {
    return vegetarianMeals;
  }

  const containsEggChickenOrFish = (meal) =>
    (meal.items || []).some((item) =>
      /\b(egg|eggs|chicken|fish)\b/i.test(item.name)
    );

  return Object.fromEntries(
    Object.entries(nonVegetarianMeals).map(
      ([mealType, meals]) => [
        mealType,
        meals.filter(containsEggChickenOrFish),
      ]
    )
  );
}


/*
  Scale a meal according to the user's calorie requirement.

  We keep the original meal as the base and adjust the
  portion sizes slightly. This prevents extremely large
  or extremely small portions.
*/

function scaleMeal(meal, scale = 1) {
  const safeScale = Math.min(
    Math.max(scale, 0.75),
    1.3
  );

  const scaledItems = meal.items.map((item) => {
    const scaledQuantity = item.quantity * safeScale;

    /*
      Pieces should remain practical numbers.
      For example:
      2 eggs -> 2 eggs
      3 rotis -> 3 rotis
    */

    if (
      item.unit === "pieces" ||
      item.unit === "piece" ||
      item.unit === "large piece" ||
      item.unit === "medium piece" ||
      item.unit === "slices"
    ) {
      return {
        ...item,
        quantity: Math.max(
          1,
          Math.round(scaledQuantity)
        ),
      };
    }

    return {
      ...item,
      quantity: Math.round(scaledQuantity / 5) * 5,
    };
  });

  return {
    ...meal,

    items: scaledItems,

    calories: Math.round(
      meal.calories * safeScale
    ),

    protein: Math.round(
      meal.protein * safeScale
    ),

    carbohydrates: Math.round(
      meal.carbohydrates * safeScale
    ),

    fat: Math.round(
      meal.fat * safeScale
    ),

    originalCalories: meal.calories,
  };
}

/*
  Calculate the target calories for each meal.

  Approximate distribution:

  Breakfast → 25%
  Lunch     → 30%
  Snack     → 10%
  Dinner    → 25%

  The remaining 10% gives the user flexibility.
*/

function getMealCalorieTarget(
  dailyCalories,
  mealType
) {
  const distribution = {
    breakfast: 0.25,
    lunch: 0.30,
    snack: 0.10,
    dinner: 0.25,
  };

  return Math.round(
    dailyCalories *
      (distribution[mealType] || 0.25)
  );
}

/*
  Find the meal whose base calories are closest
  to the desired calorie target.
*/

function chooseMeal(
  meals,
  targetCalories,
  indexOffset = 0
) {
  if (!meals.length) {
    return null;
  }

  /*
    Rotate through the database first so different
    days don't always select the same meal.
  */

  const rotatedMeals = [
    ...meals.slice(indexOffset % meals.length),
    ...meals.slice(0, indexOffset % meals.length),
  ];

  let bestMeal = rotatedMeals[0];
  let smallestDifference = Infinity;

  rotatedMeals.forEach((meal) => {
    const difference = Math.abs(
      meal.calories - targetCalories
    );

    if (difference < smallestDifference) {
      smallestDifference = difference;
      bestMeal = meal;
    }
  });

  /*
    Scale the selected meal toward the user's
    calorie requirement.
  */

  const scale =
    targetCalories / bestMeal.calories;

  return scaleMeal(bestMeal, scale);
}

/*
  ---------------------------------------------------------
  Public API
  ---------------------------------------------------------
*/

/*
  Returns one complete meal plan.

  dayIndex:
    0 = Day 1
    1 = Day 2
    2 = Day 3
    ...
*/

export function getMealRecommendations(
  preference = "vegetarian",
  nutrition = {},
  dayIndex = 0
) {
  const database = getMealDatabase(preference);

  const targetCalories =
    Number(nutrition.targetCalories) || 2000;

  const breakfastTarget =
    getMealCalorieTarget(
      targetCalories,
      "breakfast"
    );

  const lunchTarget =
    getMealCalorieTarget(
      targetCalories,
      "lunch"
    );

  const snackTarget =
    getMealCalorieTarget(
      targetCalories,
      "snack"
    );

  const dinnerTarget =
    getMealCalorieTarget(
      targetCalories,
      "dinner"
    );

  return {
    breakfast: chooseMeal(
      database.breakfast,
      breakfastTarget,
      dayIndex
    ),

    lunch: chooseMeal(
      database.lunch,
      lunchTarget,
      dayIndex + 1
    ),

    snack: chooseMeal(
      database.snack,
      snackTarget,
      dayIndex + 2
    ),

    dinner: chooseMeal(
      database.dinner,
      dinnerTarget,
      dayIndex + 3
    ),
  };
}

/*
  Returns the complete food plan for one day.

  This function is kept compatible with your
  existing TodaysFood page.
*/

export function getDailyFoodPlan(
  profile,
  dayIndex = 0
) {
  const preference =
    profile?.dietPreference ||
    profile?.diet ||
    "vegetarian";

  const nutrition =
    profile?.nutrition || {};

  return getMealRecommendations(
    preference,
    nutrition,
    dayIndex
  );
}

/*
  Returns a complete 7-day plan.

  This will be useful for the 30-day plan later.
*/

export function getWeeklyFoodPlan(profile) {
  return Array.from(
    { length: 7 },
    (_, index) => ({
      day: index + 1,

      meals: getDailyFoodPlan(
        profile,
        index
      ),
    })
  );
}

/*
  Calculate the nutrition totals for a day's meals.
*/

export function calculateDailyMealTotals(
  dailyPlan
) {
  const meals = Object.values(
    dailyPlan || {}
  ).filter(Boolean);

  return meals.reduce(
    (totals, meal) => ({
      calories:
        totals.calories +
        (Number(meal.calories) || 0),

      protein:
        totals.protein +
        (Number(meal.protein) || 0),

      carbohydrates:
        totals.carbohydrates +
        (Number(meal.carbohydrates) || 0),

      fat:
        totals.fat +
        (Number(meal.fat) || 0),
    }),
    {
      calories: 0,
      protein: 0,
      carbohydrates: 0,
      fat: 0,
    }
  );
}

export function getAlternativeMeal(
  profile,
  mealType,
  currentMealName,
  dayIndex = 0,
  excludedNames = []
) {
  const preference =
    profile?.dietPreference ||
    profile?.diet ||
    "vegetarian";

  const nutrition = profile?.nutrition || {};
  const database = getMealDatabase(preference);

  const dailyCalories =
    Number(nutrition.targetCalories) || 2000;

  const targetCalories = getMealCalorieTarget(
    dailyCalories,
    mealType
  );

  const excluded = new Set([
    currentMealName,
    ...excludedNames,
  ]);

  const candidates = database[mealType] || [];

  const alternatives = candidates.filter(
    (meal) => !excluded.has(meal.name)
  );

  if (alternatives.length === 0) {
    return null;
  }

  // Start at a different point in the list so
  // replacement choices rotate between requests.
  const startIndex =
    Math.abs(dayIndex) % alternatives.length;

  const rotated = [
    ...alternatives.slice(startIndex),
    ...alternatives.slice(0, startIndex),
  ];

  const bestMeal = rotated.reduce(
    (best, meal) => {
      if (!best) return meal;

      const currentDifference = Math.abs(
        meal.calories - targetCalories
      );

      const bestDifference = Math.abs(
        best.calories - targetCalories
      );

      return currentDifference < bestDifference
        ? meal
        : best;
    },
    null
  );

  return scaleMeal(
    bestMeal,
    targetCalories / bestMeal.calories
  );
}
