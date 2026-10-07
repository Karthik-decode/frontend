import React from "react";

import {
  Navigate,
  useLocation,
} from "react-router-dom";

import { useAuth } from "../context/authcontext";
import { useUser } from "../context/usercontext";

function ProtectedRoute({
  children,
  requireNutrition = false,
}) {
  const {
    isAuthenticated,
  } = useAuth();

  const {
    userProfile,
  } = useUser();

  const location =
    useLocation();

  /*
    Authentication check comes first.
  */

  if (!isAuthenticated) {
    return (
      <Navigate
        to="/login"
        state={{
          from:
            location.pathname,
        }}
        replace
      />
    );
  }

  /*
    Profile check.
  */

  const hasProfile =
    userProfile &&
    userProfile.age &&
    userProfile.sex &&
    userProfile.height &&
    userProfile.weight;

  /*
    Nutrition calculation check.
  */

  const hasNutrition =
    userProfile &&
    userProfile.nutrition &&
    userProfile.nutrition
      .targetCalories;

  if (
    requireNutrition &&
    !hasProfile
  ) {
    return (
      <Navigate
        to="/profile"
        replace
      />
    );
  }

  if (
    requireNutrition &&
    !hasNutrition
  ) {
    return (
      <Navigate
        to="/goal"
        replace
      />
    );
  }

  return children;
}

export default ProtectedRoute;