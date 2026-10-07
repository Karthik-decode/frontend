import React, { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../context/usercontext";
import "../styles/plan.css";

const STATUS = {
  COMPLETED: "completed",
  PARTIAL: "partial",
  MISSED: "missed",
};

function getDateKey(date) {
  return date.toISOString().split("T")[0];
}

function formatDate(date) {
  return date.toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
  });
}

function getDayName(date) {
  return date.toLocaleDateString("en-IN", {
    weekday: "short",
  });
}

function Plan() {
  const navigate = useNavigate();
  const { userProfile, updateProfile } = useUser();

  const [selectedDay, setSelectedDay] = useState(0);

  const initialProgress =
    userProfile.planProgress || {};

  const [progress, setProgress] = useState(initialProgress);

  useEffect(() => {
    updateProfile({
      planProgress: progress,
    });
  }, [progress]);

  const days = useMemo(() => {
    const result = [];
    const startDate = new Date();

    startDate.setHours(0, 0, 0, 0);

    for (let i = 0; i < 30; i++) {
      const date = new Date(startDate);

      date.setDate(
        startDate.getDate() + i
      );

      result.push({
        index: i,
        date,
        dateKey: getDateKey(date),
      });
    }

    return result;
  }, []);

  const completedDays = days.filter(
    (day) =>
      progress[day.dateKey] === STATUS.COMPLETED
  ).length;

  const partialDays = days.filter(
    (day) =>
      progress[day.dateKey] === STATUS.PARTIAL
  ).length;

  const missedDays = days.filter(
    (day) =>
      progress[day.dateKey] === STATUS.MISSED
  ).length;

  const trackedDays =
    completedDays +
    partialDays +
    missedDays;

  const adherencePercentage =
    trackedDays === 0
      ? 0
      : Math.round(
          ((completedDays +
            partialDays * 0.5) /
            trackedDays) *
            100
        );

  const selectedDate =
    days[selectedDay];

  const selectedStatus =
    progress[selectedDate?.dateKey] || "";

  const setDayStatus = (status) => {
    if (!selectedDate) {
      return;
    }

    setProgress((previous) => {
      const updated = {
        ...previous,
      };

      if (updated[selectedDate.dateKey] === status) {
        delete updated[selectedDate.dateKey];
      } else {
        updated[selectedDate.dateKey] = status;
      }

      return updated;
    });
  };

  return (
    <div className="plan-page">

      <div className="plan-container">

        {/* Header */}

        <header className="plan-header">

          <button
            className="back-circle"
            onClick={() =>
              navigate("/dashboard")
            }
          >
            ←
          </button>

          <div>
            <p className="plan-header-label">
              CONSISTENCY TRACKER
            </p>

            <h1>30-Day Plan</h1>

            <p>
              Follow your nutrition plan and build
              consistency one day at a time.
            </p>
          </div>

          <img
            src="/logo.png"
            alt="Nutri-Track"
            className="plan-logo"
          />

        </header>

        {/* Progress Overview */}

        <section className="progress-card">

          <div className="progress-main">

            <div className="progress-circle">

              <strong>
                {adherencePercentage}%
              </strong>

              <span>
                adherence
              </span>

            </div>

            <div className="progress-text">

              <p className="progress-label">
                YOUR PROGRESS
              </p>

              <h2>
                Keep going 🌱
              </h2>

              <p>
                {completedDays} of 30 days completed.
              </p>

            </div>

          </div>

          <div className="progress-bar">

            <div
              style={{
                width: `${adherencePercentage}%`,
              }}
            />

          </div>

        </section>

        {/* Statistics */}

        <section className="plan-stats">

          <div>
            <span className="stat-dot completed-dot" />
            <strong>{completedDays}</strong>
            <small>Completed</small>
          </div>

          <div>
            <span className="stat-dot partial-dot" />
            <strong>{partialDays}</strong>
            <small>Partial</small>
          </div>

          <div>
            <span className="stat-dot missed-dot" />
            <strong>{missedDays}</strong>
            <small>Missed</small>
          </div>

          <div>
            <span className="stat-dot upcoming-dot" />
            <strong>
              {30 - trackedDays}
            </strong>
            <small>Upcoming</small>
          </div>

        </section>

        {/* Day Selector */}

        <section className="calendar-section">

          <div className="plan-section-title">

            <div>
              <p>
                YOUR JOURNEY
              </p>

              <h2>
                Select a day
              </h2>
            </div>

            <span>
              30 days
            </span>

          </div>

          <div className="day-grid">

            {days.map((day) => {

              const status =
                progress[day.dateKey];

              const isSelected =
                selectedDay === day.index;

              return (
                <button
                  key={day.dateKey}
                  className={`day-card ${
                    isSelected
                      ? "selected"
                      : ""
                  } ${
                    status
                      ? `status-${status}`
                      : ""
                  }`}
                  onClick={() =>
                    setSelectedDay(
                      day.index
                    )
                  }
                >

                  <span>
                    Day {day.index + 1}
                  </span>

                  <strong>
                    {getDayName(
                      day.date
                    )}
                  </strong>

                  <small>
                    {formatDate(
                      day.date
                    )}
                  </small>

                  {status && (
                    <i>
                      {status ===
                      STATUS.COMPLETED
                        ? "✓"
                        : status ===
                          STATUS.PARTIAL
                        ? "½"
                        : "×"}
                    </i>
                  )}

                </button>
              );
            })}

          </div>

        </section>

        {/* Selected Day */}

        {selectedDate && (
          <section className="selected-day-card">

            <div className="selected-day-heading">

              <div>
                <p>
                  DAY {selectedDay + 1}
                </p>

                <h2>
                  {getDayName(
                    selectedDate.date
                  )},{" "}
                  {formatDate(
                    selectedDate.date
                  )}
                </h2>
              </div>

              <span className="selected-day-icon">
                {selectedStatus ===
                STATUS.COMPLETED
                  ? "✅"
                  : selectedStatus ===
                    STATUS.PARTIAL
                  ? "🌓"
                  : selectedStatus ===
                    STATUS.MISSED
                  ? "❌"
                  : "📅"}
              </span>

            </div>

            <p className="selected-day-description">
              How closely did you follow your
              personalized nutrition plan today?
            </p>

            <div className="status-buttons">

              <button
                className={
                  selectedStatus ===
                  STATUS.COMPLETED
                    ? "active completed"
                    : ""
                }
                onClick={() =>
                  setDayStatus(
                    STATUS.COMPLETED
                  )
                }
              >
                <span>✓</span>
                <div>
                  <strong>
                    Completed
                  </strong>

                  <small>
                    Followed the plan
                  </small>
                </div>
              </button>

              <button
                className={
                  selectedStatus ===
                  STATUS.PARTIAL
                    ? "active partial"
                    : ""
                }
                onClick={() =>
                  setDayStatus(
                    STATUS.PARTIAL
                  )
                }
              >
                <span>½</span>
                <div>
                  <strong>
                    Partial
                  </strong>

                  <small>
                    Followed some of it
                  </small>
                </div>
              </button>

              <button
                className={
                  selectedStatus ===
                  STATUS.MISSED
                    ? "active missed"
                    : ""
                }
                onClick={() =>
                  setDayStatus(
                    STATUS.MISSED
                  )
                }
              >
                <span>×</span>
                <div>
                  <strong>
                    Missed
                  </strong>

                  <small>
                    Didn't follow the plan
                  </small>
                </div>
              </button>

            </div>

          </section>
        )}

        {/* Tip */}

        <section className="plan-tip">

          <span>🌱</span>

          <div>
            <strong>
              Consistency over perfection
            </strong>

            <p>
              A partial day is still progress.
              Focus on building sustainable habits
              rather than being perfect every day.
            </p>
          </div>

        </section>

      </div>

    </div>
  );
}

export default Plan;