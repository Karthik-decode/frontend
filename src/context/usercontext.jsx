import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from "react";
import { getAuthToken } from "../services/authservice";

const UserContext = createContext(null);

// React + Vite: use the configured backend URL,
// falling back to the deployed Render backend.
const API_BASE_URL = (
  import.meta.env.VITE_API_BASE_URL ||
  "https://backend-1-9w9u.onrender.com/api"
).replace(/\/+$/, "");

const PROFILE_KEY = "nutriTrackProfile";

function readSavedProfile() {
  try {
    const saved = localStorage.getItem(PROFILE_KEY);
    return saved ? JSON.parse(saved) : {};
  } catch {
    return {};
  }
}

function mergeProfiles(localProfile, serverProfile) {
  const merged = { ...localProfile, ...serverProfile };

  // Keep locally cached values when the server has null values.
  for (const key of Object.keys(merged)) {
    if (
      serverProfile[key] === null ||
      serverProfile[key] === undefined
    ) {
      merged[key] = localProfile[key] ?? null;
    }
  }

  if (
    serverProfile.nutrition === null ||
    serverProfile.nutrition === undefined
  ) {
    merged.nutrition = localProfile.nutrition ?? null;
  } else {
    merged.nutrition = {
      ...(localProfile.nutrition || {}),
      ...serverProfile.nutrition,
    };

    for (const key of Object.keys(merged.nutrition)) {
      if (serverProfile.nutrition[key] == null) {
        merged.nutrition[key] =
          localProfile.nutrition?.[key] ?? null;
      }
    }
  }

  return merged;
}

export function UserProvider({ children }) {
  const [userProfile, setUserProfile] = useState(readSavedProfile);
  const [profileLoading, setProfileLoading] = useState(true);
  const [profileError, setProfileError] = useState("");

  const persistLocalProfile = useCallback((profile) => {
    localStorage.setItem(PROFILE_KEY, JSON.stringify(profile));
  }, []);

  const loadProfile = useCallback(async () => {
    const token = getAuthToken();

    if (!token) {
      setProfileLoading(false);
      return;
    }

    try {
      setProfileError("");

      const response = await fetch(`${API_BASE_URL}/profile`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        if (response.status === 401) {
          throw new Error(
            "Your session has expired. Please log in again."
          );
        }

        throw new Error(
          "Unable to load your profile from the server."
        );
      }

      const serverProfile = await response.json();

      setUserProfile((previous) => {
        const merged = mergeProfiles(previous, serverProfile);
        persistLocalProfile(merged);
        return merged;
      });
    } catch (error) {
      setProfileError(error.message || "Unable to load profile.");
      console.error("Profile loading error:", error);
    } finally {
      setProfileLoading(false);
    }
  }, [persistLocalProfile]);

  useEffect(() => {
    loadProfile();
  }, [loadProfile]);

  const updateProfile = useCallback(
    async (data) => {
      const token = getAuthToken();

      // Update the local cache immediately.
      const updatedProfile = { ...userProfile, ...data };

      if (data.nutrition) {
        updatedProfile.nutrition = {
          ...(userProfile.nutrition || {}),
          ...data.nutrition,
        };
      }

      setUserProfile(updatedProfile);
      persistLocalProfile(updatedProfile);
      setProfileError("");

      if (!token) {
        throw new Error(
          "Please log in before saving your profile."
        );
      }

      const response = await fetch(`${API_BASE_URL}/profile`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedProfile),
      });

      if (!response.ok) {
        const body = await response.json().catch(() => ({}));

        const message =
          body.message ||
          body.error ||
          (response.status === 401
            ? "Your session has expired. Please log in again."
            : "Could not save your profile to the server.");

        setProfileError(message);
        throw new Error(message);
      }

      const savedProfile = await response.json();

      setUserProfile((previous) => {
        const merged = mergeProfiles(previous, savedProfile);
        persistLocalProfile(merged);
        return merged;
      });

      return savedProfile;
    },
    [userProfile, persistLocalProfile]
  );

  return (
    <UserContext.Provider
      value={{
        userProfile,
        updateProfile,
        profileLoading,
        profileError,
        reloadProfile: loadProfile,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const context = useContext(UserContext);

  if (!context) {
    throw new Error(
      "useUser must be used within a UserProvider."
    );
  }

  return context;
}
