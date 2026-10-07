import React, { createContext, useContext, useState } from "react";

const UserContext = createContext();

export function UserProvider({ children }) {
  const [userProfile, setUserProfile] = useState(() => {
    const savedProfile = localStorage.getItem("nutriTrackProfile");

    return savedProfile ? JSON.parse(savedProfile) : {};
  });

  const updateProfile = (data) => {
    setUserProfile((previous) => {
      const updatedProfile = {
        ...previous,
        ...data,
      };

      localStorage.setItem(
        "nutriTrackProfile",
        JSON.stringify(updatedProfile)
      );

      return updatedProfile;
    });
  };

  return (
    <UserContext.Provider
      value={{
        userProfile,
        updateProfile,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  return useContext(UserContext);
}