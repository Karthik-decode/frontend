import React, {
  createContext,
  useContext,
  useState,
} from "react";

import {
  getAuthSession,
  loginAccount,
  logout as logoutService,
} from "../services/authservice";

const AuthContext =
  createContext();

export function AuthProvider({
  children,
}) {
  const [
    authSession,
    setAuthSession,
  ] = useState(() =>
    getAuthSession()
  );

  const isAuthenticated =
    Boolean(
      authSession?.authenticated
    );

  const login = (
    email,
    pin,
    rememberMe = false
  ) => {
    const result =
      loginAccount(
        email,
        pin,
        rememberMe
      );

    if (result.success) {
      setAuthSession(
        result.session
      );
    }

    return result;
  };

  const logout = () => {
    logoutService();
    setAuthSession(null);
  };

  return (
    <AuthContext.Provider
      value={{
        authSession,
        isAuthenticated,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(
    AuthContext
  );
}