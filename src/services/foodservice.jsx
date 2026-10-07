const vegetarianMeals = {
  breakfast: [
    {
      name: "Idli + Sambar + Curd",
      description: "Soft idlis with protein-rich sambar and curd.",
      calories: 390,
      protein: 16,
      carbohydrates: 62,
      fat: 8,
    },
    {
      name: "Vegetable Upma + Curd",
      description: "Vegetable upma served with fresh curd.",
      calories: 380,
      protein: 13,
      carbohydrates: 58,
      fat: 10,
    },
    {
      name: "Masala Dosa + Sambar",
      description: "Crispy dosa with vegetable filling and sambar.",
      calories: 430,
      protein: 12,
      carbohydrates: 64,
      fat: 14,
    },
    {
      name: "Poha + Sprouts",
      description: "Flattened rice with vegetables and protein-rich sprouts.",
      calories: 360,
      protein: 13,
      carbohydrates: 57,
      fat: 9,
    },
    {
      name: "Vegetable Pongal + Sambar",
      description: "Comforting rice-lentil pongal with sambar.",
      calories: 410,
      protein: 15,
      carbohydrates: 65,
      fat: 10,
    },
  ],

  lunch: [
    {
      name: "Rice + Dal + Vegetable Curry + Curd",
      description: "Balanced rice meal with dal, vegetables and curd.",
      calories: 620,
      protein: 23,
      carbohydrates: 92,
      fat: 15,
    },
    {
      name: "Roti + Paneer Curry + Salad",
      description: "Whole-wheat rotis with paneer curry and fresh salad.",
      calories: 590,
      protein: 27,
      carbohydrates: 67,
      fat: 21,
    },
    {
      name: "Rajma Rice + Cucumber Raita",
      description: "Rajma with rice paired with refreshing cucumber raita.",
      calories: 610,
      protein: 24,
      carbohydrates: 94,
      fat: 13,
    },
    {
      name: "Chole + Roti + Salad",
      description: "Chickpea curry with whole-wheat rotis and salad.",
      calories: 580,
      protein: 22,
      carbohydrates: 82,
      fat: 16,
    },
  ],

  snack: [
    {
      name: "Fruit + Handful of Almonds",
      description: "Seasonal fruit with almonds for healthy fats.",
      calories: 240,
      protein: 7,
      carbohydrates: 27,
      fat: 13,
    },
    {
      name: "Sprouts Chaat",
      description: "Mixed sprouts with vegetables, lemon and spices.",
      calories: 220,
      protein: 12,
      carbohydrates: 30,
      fat: 6,
    },
    {
      name: "Buttermilk + Roasted Chana",
      description: "Cooling buttermilk with protein-rich roasted chana.",
      calories: 210,
      protein: 11,
      carbohydrates: 27,
      fat: 5,
    },
    {
      name: "Curd + Banana",
      description: "Fresh curd with banana for a simple energy-rich snack.",
      calories: 230,
      protein: 9,
      carbohydrates: 36,
      fat: 6,
    },
  ],

  dinner: [
    {
      name: "Roti + Dal + Mixed Vegetables",
      description: "Whole-wheat rotis with dal and seasonal vegetables.",
      calories: 520,
      protein: 22,
      carbohydrates: 72,
      fat: 14,
    },
    {
      name: "Paneer Bhurji + Roti + Salad",
      description: "Spiced paneer bhurji with whole-wheat rotis.",
      calories: 550,
      protein: 29,
      carbohydrates: 55,
      fat: 22,
    },
    {
      name: "Vegetable Khichdi + Curd",
      description: "Rice-lentil khichdi with vegetables and curd.",
      calories: 480,
      protein: 18,
      carbohydrates: 72,
      fat: 11,
    },
    {
      name: "Dal Tadka + Rice + Vegetable Curry",
      description: "Dal tadka with rice and a vegetable side.",
      calories: 530,
      protein: 20,
      carbohydrates: 81,
      fat: 12,
    },
  ],
};

const nonVegetarianMeals = {
  breakfast: [
    ...vegetarianMeals.breakfast,

    {
      name: "Egg Bhurji + Roti",
      description: "Spiced scrambled eggs with whole-wheat rotis.",
      calories: 420,
      protein: 23,
      carbohydrates: 42,
      fat: 17,
    },
    {
      name: "Egg Dosa + Sambar",
      description: "Dosa topped with egg and served with sambar.",
      calories: 450,
      protein: 21,
      carbohydrates: 61,
      fat: 14,
    },
  ],

  lunch: [
    ...vegetarianMeals.lunch,

    {
      name: "Chicken Rice Bowl + Salad",
      description: "Rice with grilled chicken and fresh vegetables.",
      calories: 650,
      protein: 40,
      carbohydrates: 78,
      fat: 17,
    },
    {
      name: "Fish Curry + Rice + Vegetables",
      description: "Indian-style fish curry with rice and vegetables.",
      calories: 630,
      protein: 35,
      carbohydrates: 76,
      fat: 18,
    },
  ],

  snack: [
    ...vegetarianMeals.snack,

    {
      name: "Boiled Eggs + Fruit",
      description: "Boiled eggs paired with a seasonal fruit.",
      calories: 230,
      protein: 14,
      carbohydrates: 19,
      fat: 10,
    },
    {
      name: "Chicken Sandwich",
      description: "Whole-wheat sandwich with lean chicken and vegetables.",
      calories: 300,
      protein: 25,
      carbohydrates: 31,
      fat: 9,
    },
  ],

  dinner: [
    ...vegetarianMeals.dinner,

    {
      name: "Chicken Roti Bowl",
      description: "Chicken with whole-wheat roti and vegetables.",
      calories: 570,
      protein: 38,
      carbohydrates: 55,
      fat: 18,
    },
    {
      name: "Fish + Roti + Vegetable Curry",
      description: "Protein-rich fish with roti and vegetables.",
      calories: 540,
      protein: 35,
      carbohydrates: 51,
      fat: 18,
    },
  ],
};

function getMealDatabase(preference) {
  if (preference === "non-vegetarian") {
    return nonVegetarianMeals;
  }

  return vegetarianMeals;
}

function getMealCount(mealType) {
  const count = {
    breakfast: 0,
    lunch: 1,
    snack: 2,
    dinner: 3,
  };

  return count[mealType] ?? 0;
}

export function getMealRecommendations(preference = "vegetarian") {
  const database = getMealDatabase(preference);

  return {
    breakfast: database.breakfast[getMealCount("breakfast") % database.breakfast.length],
    lunch: database.lunch[getMealCount("lunch") % database.lunch.length],
    snack: database.snack[getMealCount("snack") % database.snack.length],
    dinner: database.dinner[getMealCount("dinner") % database.dinner.length],
  };
}

export function getDailyFoodPlan(profile) {
  const preference =
    profile?.dietPreference || "vegetarian";

  return getMealRecommendations(preference);
}