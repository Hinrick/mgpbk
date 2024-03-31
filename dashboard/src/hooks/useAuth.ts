// src/hooks/useAuth.ts
import { useState, useEffect, useCallback, useContext } from "react";
// Add additional imports if needed (e.g., context, API calls, etc.)

interface AuthState {
  isLoggedIn: boolean;
  token: string | null;
}

export const useAuth = () => {
  const [authState, setAuthState] = useState<AuthState>({
    isLoggedIn: false,
    token: null,
  });

  const login = useCallback((token: string) => {
    // Store token in local storage or cookie
    localStorage.setItem("token", token);
    setAuthState({ isLoggedIn: true, token });
  }, []);

  const logout = useCallback(() => {
    // Remove token from local storage or cookie
    localStorage.removeItem("token");
    setAuthState({ isLoggedIn: false, token: null });
  }, []);

  // Automatically try to log in if token exists in storage
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setAuthState({ isLoggedIn: true, token });
    }
  }, []);

  return {
    authState,
    login,
    logout,
  };
};
