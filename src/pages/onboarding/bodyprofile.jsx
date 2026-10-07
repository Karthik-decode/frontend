import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../../context/usercontext";
import "../../styles/onboarding.css";

function BodyProfile() {
  const navigate = useNavigate();
  const { userProfile, updateProfile } = useUser();

  const [age, setAge] = useState(userProfile.age || "");
  const [sex, setSex] = useState(userProfile.sex || "");
  const [height, setHeight] = useState(userProfile.height || "");
  const [weight, setWeight] = useState(userProfile.weight || "");

  const [error, setError] = useState("");

  const handleContinue = (e) => {
    e.preventDefault();

    const numericAge = Number(age);
    const numericHeight = Number(height);
    const numericWeight = Number(weight);

    if (!numericAge || numericAge < 13 || numericAge > 100) {
      setError("Please enter a valid age between 13 and 100.");
      return;
    }

    if (!sex) {
      setError("Please select your sex.");
      return;
    }

    if (
      !numericHeight ||
      numericHeight < 100 ||
      numericHeight > 250
    ) {
      setError("Please enter a valid height between 100 and 250 cm.");
      return;
    }

    if (
      !numericWeight ||
      numericWeight < 25 ||
      numericWeight > 300
    ) {
      setError("Please enter a valid weight between 25 and 300 kg.");
      return;
    }

    updateProfile({
      age: numericAge,
      sex,
      height: numericHeight,
      weight: numericWeight,
    });

    navigate("/diet-preference");
  };

  return (
    <div className="onboarding-page">
      <div className="onboarding-container">

        <div className="onboarding-header">
          <img
            src="/logo.png"
            alt="Nutri-Track"
            className="onboarding-logo"
          />

          <div className="step-indicator">
            <div className="step active"></div>
            <div className="step"></div>
            <div className="step"></div>
          </div>
        </div>

        <div className="onboarding-card">

          <h1>Let's understand your body</h1>

          <p className="onboarding-description">
            These details help Nutri-Track calculate your
            personalized nutrition requirements.
          </p>

          <form onSubmit={handleContinue}>

            <div className="profile-grid">

              <div className="form-group">
                <label>Age</label>

                <input
                  className="form-input"
                  type="number"
                  min="13"
                  max="100"
                  placeholder="e.g. 21"
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                />
              </div>

              <div className="form-group">
                <label>Sex</label>

                <select
                  className="form-input"
                  value={sex}
                  onChange={(e) => setSex(e.target.value)}
                >
                  <option value="">Select</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                </select>
              </div>

              <div className="form-group">
                <label>Height (cm)</label>

                <input
                  className="form-input"
                  type="number"
                  min="100"
                  max="250"
                  placeholder="e.g. 175"
                  value={height}
                  onChange={(e) => setHeight(e.target.value)}
                />
              </div>

              <div className="form-group">
                <label>Weight (kg)</label>

                <input
                  className="form-input"
                  type="number"
                  min="25"
                  max="300"
                  step="0.1"
                  placeholder="e.g. 70"
                  value={weight}
                  onChange={(e) => setWeight(e.target.value)}
                />
              </div>

            </div>

            {error && (
              <p className="error-message">
                {error}
              </p>
            )}

            <button
              type="submit"
              className="primary-button"
            >
              Continue
            </button>

          </form>

        </div>

      </div>
    </div>
  );
}

export default BodyProfile;