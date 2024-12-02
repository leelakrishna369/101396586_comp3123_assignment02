import React, { createContext, useState, useEffect, useCallback } from "react";

export const AuthContext = createContext();

const validateToken = (token) => {
  // Simulate token validation (replace this with an actual API call)
  try {
    const parsedToken = JSON.parse(atob(token.split(".")[1])); // Decode JWT payload (example)
    return parsedToken && parsedToken.exp > Date.now() / 1000; // Check expiration time
  } catch {
    return false;
  }
};

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authError, setAuthError] = useState(null);

  useEffect(() => {
    const token = sessionStorage.getItem("token") || localStorage.getItem("token");
    if (token) {
      if (validateToken(token)) {
        setIsAuthenticated(true);
      } else {
        setAuthError("Invalid or expired token");
        sessionStorage.removeItem("token");
        localStorage.removeItem("token");
      }
    }
  }, []);

  const login = useCallback((token, remember = false) => {
    if (validateToken(token)) {
      setIsAuthenticated(true);
      if (remember) {
        localStorage.setItem("token", token);
      } else {
        sessionStorage.setItem("token", token);
      }
      setAuthError(null);
    } else {
      setAuthError("Login failed: Invalid token");
    }
  }, []);

  const logout = useCallback(() => {
    setIsAuthenticated(false);
    sessionStorage.removeItem("token");
    localStorage.removeItem("token");
    setAuthError(null);
  }, []);

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        login,
        logout,
        authError, // Provide error message if needed
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
