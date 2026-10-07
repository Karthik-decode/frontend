import React from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import Login from "./pages/auth/login";
import Register from "./pages/auth/register";
import VerifyCode from "./pages/auth/verifycode";

import BodyProfile from "./pages/onboarding/bodyprofile";
import DietPreference from "./pages/onboarding/dietpreference";
import GoalSelection from "./pages/onboarding/goalselection";

import Dashboard from "./pages/dashboard";
import TodaysFood from "./pages/todaysfood";
import Plan from "./pages/plan";
import Settings from "./pages/settings";

import ProtectedRoute from "./components/ProtectedRoute";
import BottomNav from "./components/BottomNav";

import "./styles/global.css";

function ProtectedPage({ children }) {
  return (
    <ProtectedRoute requireNutrition={true}>
      <div className="app-shell">
        {children}
        <BottomNav />
      </div>
    </ProtectedRoute>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* Default Route */}

        <Route
          path="/"
          element={
            <Navigate
              to="/login"
              replace
            />
          }
        />

        {/* Authentication */}

        <Route
          path="/login"
          element={<Login />}
        />

        <Route
          path="/register"
          element={<Register />}
        />

        <Route
          path="/verify-code"
          element={<VerifyCode />}
        />

        {/* Onboarding */}

        <Route
          path="/profile"
          element={
            <ProtectedRoute requireNutrition={false}>
              <BodyProfile />
            </ProtectedRoute>
          }
        />

        <Route
          path="/diet-preference"
          element={
            <ProtectedRoute requireNutrition={false}>
              <DietPreference />
            </ProtectedRoute>
          }
        />

        <Route
          path="/goal"
          element={
            <ProtectedRoute requireNutrition={false}>
              <GoalSelection />
            </ProtectedRoute>
          }
        />

        {/* Main Application */}

        <Route
          path="/dashboard"
          element={
            <ProtectedPage>
              <Dashboard />
            </ProtectedPage>
          }
        />

        <Route
          path="/today"
          element={
            <ProtectedPage>
              <TodaysFood />
            </ProtectedPage>
          }
        />

        <Route
          path="/plan"
          element={
            <ProtectedPage>
              <Plan />
            </ProtectedPage>
          }
        />

        <Route
          path="/settings"
          element={
            <ProtectedPage>
              <Settings />
            </ProtectedPage>
          }
        />

        {/* Unknown Route */}

        <Route
          path="*"
          element={
            <Navigate
              to="/login"
              replace
            />
          }
        />

      </Routes>
    </BrowserRouter>
  );
}

export default App;