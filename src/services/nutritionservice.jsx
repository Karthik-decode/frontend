const ACTIVITY_FACTOR = 1.55;

/*
  Nutri-Track Nutrition Calculator

  Inputs:
  - age
  - sex
  - height (cm)
  - weight (kg)
  - goal

  Outputs:
  - BMR
  - maintenance calories
  - target calories
  - protein
  - carbohydrates
  - fat
*/

export function calculateBMR(age, sex, height, weight) {
  let bmr;

  if (sex === "male") {
    bmr =
      10 * weight +
      6.25 * height -
      5 * age +
      5;
  } else {
    bmr =
      10 * weight +
      6.25 * height -
      5 * age -
      161;
  }

  return Math.round(bmr);
}

export function calculateMaintenanceCalories(
  bmr
) {
  return Math.round(bmr * ACTIVITY_FACTOR);
}

export function calculateTargetCalories(
  maintenanceCalories,
  goal
) {
  let calories = maintenanceCalories;

  if (goal === "lose-weight") {
    calories = maintenanceCalories - 400;
  }

  if (goal === "gain-weight") {
    calories = maintenanceCalories + 300;
  }

  return Math.max(calories, 1200);
}

export function calculateMacros(
  weight,
  calories,
  goal
) {
  /*
    Protein:
    Higher protein is useful during weight loss,
    while a moderate-high intake is used for
    maintenance and weight gain.

    These are starting targets, not medical prescriptions.
  */

  let proteinPerKg = 1.6;

  if (goal === "lose-weight") {
    proteinPerKg = 1.8;
  }

  if (goal === "gain-weight") {
    proteinPerKg = 1.6;
  }

  const protein = Math.round(
    weight * proteinPerKg
  );

  /*
    Fat:
    Approximately 25% of total calories.
  */

  const fat = Math.round(
    (calories * 0.25) / 9
  );

  /*
    Remaining calories are assigned to carbohydrates.
  */

  const proteinCalories = protein * 4;
  const fatCalories = fat * 9;

  const remainingCalories =
    calories -
    proteinCalories -
    fatCalories;

  const carbohydrates = Math.max(
    Math.round(remainingCalories / 4),
    0
  );

  return {
    protein,
    carbohydrates,
    fat,
  };
}

export function calculateNutritionProfile(
  profile
) {
  const {
    age,
    sex,
    height,
    weight,
    goal,
  } = profile;

  if (
    !age ||
    !sex ||
    !height ||
    !weight ||
    !goal
  ) {
    throw new Error(
      "Incomplete nutrition profile."
    );
  }

  const numericAge = Number(age);
  const numericHeight = Number(height);
  const numericWeight = Number(weight);

  const bmr = calculateBMR(
    numericAge,
    sex,
    numericHeight,
    numericWeight
  );

  const maintenanceCalories =
    calculateMaintenanceCalories(bmr);

  const targetCalories =
    calculateTargetCalories(
      maintenanceCalories,
      goal
    );

  const macros = calculateMacros(
    numericWeight,
    targetCalories,
    goal
  );

  return {
    bmr,
    maintenanceCalories,
    targetCalories,
    protein: macros.protein,
    carbohydrates: macros.carbohydrates,
    fat: macros.fat,
    goal,
  };
}