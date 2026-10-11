import React, {
  useRef,
  useState,
  useEffect,
} from "react"; 

import { useNavigate } from "react-router-dom";

import {
  useAuth,
} from "../context/authcontext";

import {
  useUser,
} from "../context/usercontext";

import {
  getAccount,
} from "../services/authservice";

import {
  calculateNutritionProfile,
} from "../services/nutritionservice";

import "../styles/settings.css";

function Settings() {
  const navigate = useNavigate();

  const { logout } = useAuth();

  const {
    userProfile,
    updateProfile,
  } = useUser();

  const fileInputRef = useRef(null);

  const [showPhotoMenu, setShowPhotoMenu] =
    useState(false);

  const [age, setAge] = useState(
    userProfile.age || ""
  );

  const [sex, setSex] = useState(
    userProfile.sex || ""
  );

  const [saving, setSaving] = useState(false);

  const [height, setHeight] = useState(
    userProfile.height || ""
  );

  const [weight, setWeight] = useState(
    userProfile.weight || ""
  );

  const [dietPreference, setDietPreference] =
    useState(
      userProfile.dietPreference ||
        "vegetarian"
    );

  const [goal, setGoal] = useState(
    userProfile.goal ||
      "maintain-weight"
  );

  const [message, setMessage] =
    useState("");

  const [error, setError] =
    useState("");

useEffect(() => {
  setAge(userProfile.age ?? "");
  setSex(userProfile.sex ?? "");
  setHeight(userProfile.height ?? "");
  setWeight(userProfile.weight ?? "");
  setDietPreference(
    userProfile.dietPreference || "vegetarian"
  );
  setGoal(
    userProfile.goal || "maintain-weight"
  );
}, [
  userProfile.age,
  userProfile.sex,
  userProfile.height,
  userProfile.weight,
  userProfile.dietPreference,
  userProfile.goal,
]); 

  /*
   * Registered account name.
   *
   * The name is collected only during
   * registration and does not need to be
   * entered again during login.
   */

  const account = getAccount();

  const displayName =
    userProfile.name ||
    account?.name ||
    userProfile.email
      ?.split("@")[0] ||
    "there";


  const goalLabels = {
    "lose-weight": "Lose Weight",
    "maintain-weight": "Maintain Weight",
    "gain-weight": "Gain Weight",
  };


  const planProgress =
    userProfile.planProgress || {};


  const completedDays =
    Object.values(planProgress).filter(
      (status) =>
        status === "completed"
    ).length;


  const partialDays =
    Object.values(planProgress).filter(
      (status) =>
        status === "partial"
    ).length;


  /*
   * PROFILE PHOTO
   */

  const profilePicture =
    userProfile.profilePicture || "";


  const openFilePicker = () => {
    setShowPhotoMenu(false);

    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };


  const handlePhotoChange = (e) => {
    const file =
      e.target.files?.[0];

    if (!file) {
      return;
    }


    /*
     * Only allow common image formats.
     */

    if (!file.type.startsWith("image/")) {
      setError(
        "Please select a valid image file."
      );

      return;
    }


    /*
     * Keep the prototype lightweight.
     */

    if (file.size > 5 * 1024 * 1024) {
      setError(
        "Please choose an image smaller than 5 MB."
      );

      return;
    }


    const reader =
      new FileReader();

    reader.onload = () => {
      const imageData =
        reader.result;

      updateProfile({
        profilePicture: imageData,
      });

      setError("");

      setMessage(
        "Profile picture updated."
      );
    };

    reader.onerror = () => {
      setError(
        "Unable to read the selected image."
      );
    };

    reader.readAsDataURL(file);

    /*
     * Allows selecting the same file again
     * after removing/changing it.
     */

    e.target.value = "";
  };


  const removeProfilePicture = () => {
    updateProfile({
      profilePicture: "",
    });

    setShowPhotoMenu(false);

    setMessage(
      "Profile picture removed."
    );
  };


  const handleAvatarClick = () => {
    setError("");
    setMessage("");

    if (profilePicture) {
      setShowPhotoMenu(
        (previous) => !previous
      );

      return;
    }

    openFilePicker();
  };


  /*
   * SAVE PROFILE
   */

  
const handleSave = async (e) => {
  e.preventDefault();

  if (saving) return;

  setError("");
  setMessage("");

  const numericAge = Number(age);
  const numericHeight = Number(height);
  const numericWeight = Number(weight);

  if (
    !Number.isFinite(numericAge) ||
    numericAge < 13 ||
    numericAge > 100
  ) {
    setError("Please enter a valid age between 13 and 100.");
    return;
  }

  if (!sex) {
    setError("Please select your sex.");
    return;
  }

  if (
    !Number.isFinite(numericHeight) ||
    numericHeight < 100 ||
    numericHeight > 250
  ) {
    setError("Please enter a valid height between 100 and 250 cm.");
    return;
  }

  if (
    !Number.isFinite(numericWeight) ||
    numericWeight < 25 ||
    numericWeight > 300
  ) {
    setError("Please enter a valid weight between 25 and 300 kg.");
    return;
  }

  if (!["vegetarian", "non-vegetarian"].includes(dietPreference)) {
    setError("Please select a valid food preference.");
    return;
  }

  if (
    !["lose-weight", "maintain-weight", "gain-weight"].includes(goal)
  ) {
    setError("Please select a valid nutrition goal.");
    return;
  }

  setSaving(true);

  try {
    const updatedProfile = {
      age: numericAge,
      sex,
      height: numericHeight,
      weight: numericWeight,
      dietPreference,
      goal,
    };

    const nutrition = calculateNutritionProfile({
      ...userProfile,
      ...updatedProfile,
    });

    await updateProfile({
      ...updatedProfile,
      nutrition,
    });

    setMessage(
      "Your profile and nutrition targets have been saved successfully."
    );
  } catch (err) {
    console.error("Profile save failed:", err);

    setError(
      err.message ||
        "Unable to save your profile. Please try again."
    );
  } finally {
    setSaving(false);
  }
};



  /*
   * LOGOUT
   */

  const handleLogout = () => {
    logout();

    navigate("/login", {
      replace: true,
    });
  };


  /*
   * RESET PROFILE
   */

  const handleReset = () => {
    const confirmed =
      window.confirm(
        "Are you sure you want to reset your Nutri-Track profile? This will remove your saved nutrition data and 30-day progress."
      );

    if (!confirmed) {
      return;
    }

    localStorage.removeItem(
      "nutriTrackProfile"
    );

    navigate("/register", {
      replace: true,
    });
  };


  return (
    <div className="settings-page">

      <div className="settings-container">


        {/* HEADER */}

        <header className="settings-header">

          <button
            className="back-circle"
            onClick={() =>
              navigate("/dashboard")
            }
          >
            ←
          </button>


          <div>

            <p className="settings-header-label">
              ACCOUNT
            </p>

            <h1>
              Settings
            </h1>

            <p>
              Manage your profile and nutrition preferences.
            </p>

          </div>


          <img
            src="/Logo.png"
            alt="Nutri-Track"
            className="page-header-logo"
          />

        </header>


        {/* PROFILE SUMMARY */}

        <section className="profile-summary">


          {/* Hidden file input */}

          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handlePhotoChange}
            style={{
              display: "none",
            }}
          />


          {/* PROFILE AVATAR */}

          <div
            style={{
              position: "relative",
              flexShrink: 0,
            }}
          >

            <button
              type="button"
              className="profile-avatar"
              onClick={handleAvatarClick}
              aria-label={
                profilePicture
                  ? "Change or remove profile picture"
                  : "Upload profile picture"
              }
              style={{
                padding: 0,
                overflow: "hidden",
                border: "none",
                cursor: "pointer",
                position: "relative",
              }}
            >

              {profilePicture ? (
                <img
                  src={profilePicture}
                  alt={`${displayName} profile`}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    display: "block",
                  }}
                />
              ) : (
                <span>
                  N
                </span>
              )}

            </button>


            {/* Photo actions */}

            {showPhotoMenu &&
              profilePicture && (
                <div
                  style={{
                    position: "absolute",
                    top: "calc(100% + 8px)",
                    left: 0,
                    zIndex: 20,

                    width: "155px",

                    padding: "8px",

                    background:
                      "var(--white)",

                    border:
                      "1px solid var(--border)",

                    borderRadius: "14px",

                    boxShadow:
                      "0 12px 30px rgba(40, 100, 65, 0.14)",
                  }}
                >

                  <button
                    type="button"
                    onClick={openFilePicker}
                    style={{
                      width: "100%",
                      padding: "9px 10px",

                      border: "none",
                      borderRadius: "9px",

                      background:
                        "var(--soft-green)",

                      color:
                        "var(--text-dark)",

                      fontFamily:
                        "inherit",

                      fontSize: "12px",
                      fontWeight: 700,

                      textAlign: "left",

                      cursor: "pointer",
                    }}
                  >
                    📷 Change photo
                  </button>


                  <button
                    type="button"
                    onClick={
                      removeProfilePicture
                    }
                    style={{
                      width: "100%",
                      marginTop: "5px",

                      padding: "9px 10px",

                      border: "none",
                      borderRadius: "9px",

                      background:
                        "transparent",

                      color:
                        "var(--danger)",

                      fontFamily:
                        "inherit",

                      fontSize: "12px",
                      fontWeight: 700,

                      textAlign: "left",

                      cursor: "pointer",
                    }}
                  >
                    🗑 Remove photo
                  </button>

                </div>
              )}

          </div>


          {/* ACCOUNT NAME */}

          <div>

            


            <h2>
              {displayName}
            </h2>


            <p>
              {goalLabels[userProfile.goal] ||
                "Personalized nutrition"}
            </p>

          </div>

        </section>


        {/* NUTRITION OVERVIEW */}

        <section className="settings-overview">

          <div>

            <span>
              Daily calories
            </span>

            <strong>
              {userProfile.nutrition
                ?.targetCalories ||
                "--"}{" "}
              kcal
            </strong>

          </div>


          <div>

            <span>
              Protein
            </span>

            <strong>
              {userProfile.nutrition
                ?.protein ||
                "--"}g
            </strong>

          </div>


          <div>

            <span>
              30-day progress
            </span>

            <strong>
              {completedDays}

              <small>
                {" "}completed
              </small>
            </strong>

          </div>

        </section>


        {/* EDIT PROFILE */}

        <section className="settings-card">

          <div className="settings-card-heading">

            <div>

              <p>
                PERSONAL INFORMATION
              </p>

              <h2>
                Body profile
              </h2>

            </div>

            <span>
              👤
            </span>

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
                    setAge(
                      e.target.value
                    )
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
                    setSex(
                      e.target.value
                    )
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
                    setHeight(
                      e.target.value
                    )
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
                    setWeight(
                      e.target.value
                    )
                  }
                />

              </div>

            </div>


            {/* FOOD PREFERENCE */}

            <div className="settings-subsection">

              <label className="settings-label">
                Food preference
              </label>


              <div className="settings-options">

                <button
                  type="button"
                  className={
                    dietPreference ===
                    "vegetarian"
                      ? "settings-option active"
                      : "settings-option"
                  }
                  onClick={() =>
                    setDietPreference(
                      "vegetarian"
                    )
                  }
                >

                  <span>
                    🥬
                  </span>

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

                  <span>
                    🍗
                  </span>

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


            {/* NUTRITION GOAL */}

            <div className="settings-subsection">

              <label className="settings-label">
                Nutrition goal
              </label>


              <div className="settings-options">

                <button
                  type="button"
                  className={
                    goal ===
                    "lose-weight"
                      ? "settings-option active"
                      : "settings-option"
                  }
                  onClick={() =>
                    setGoal(
                      "lose-weight"
                    )
                  }
                >

                  <span>
                    📉
                  </span>

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
                    goal ===
                    "maintain-weight"
                      ? "settings-option active"
                      : "settings-option"
                  }
                  onClick={() =>
                    setGoal(
                      "maintain-weight"
                    )
                  }
                >

                  <span>
                    ⚖️
                  </span>

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
                    goal ===
                    "gain-weight"
                      ? "settings-option active"
                      : "settings-option"
                  }
                  onClick={() =>
                    setGoal(
                      "gain-weight"
                    )
                  }
                >

                  <span>
                    📈
                  </span>

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


            {/* MESSAGES */}

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
  disabled={saving}
>
  {saving ? "Saving..." : "Save & Recalculate"}
</button>

          </form>

        </section>


        {/* PLAN PROGRESS */}

        <section className="settings-card">

          <div className="settings-card-heading">

            <div>

              <p>
                YOUR PROGRESS
              </p>

              <h2>
                30-Day Plan
              </h2>

            </div>

            <span>
              📅
            </span>

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


        {/* ACCOUNT ACTIONS */}

        <section className="account-actions">

          <button
            className="logout-button"
            onClick={handleLogout}
          >

            <span>
              ↪
            </span>

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

            <span>
              ♻
            </span>

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