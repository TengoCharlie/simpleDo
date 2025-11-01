import { createContext, useContext, useEffect, useState } from "react";
import { authApi } from "../services/api";

const TOKEN_STORAGE_KEY = "simpledo.auth.token";

export const AuthContext = createContext(null);

export const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuthContext must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(null);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [authError, setAuthError] = useState(null);

  // Helper to persist the authenticated session securely
  const applyAuthState = ({ token: nextToken, user: nextUser }) => {
    setToken(nextToken);
    setUser(nextUser);
    localStorage.setItem(TOKEN_STORAGE_KEY, nextToken);
  };

  const clearAuthState = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem(TOKEN_STORAGE_KEY);
  };

  useEffect(() => {
    const storedToken = localStorage.getItem(TOKEN_STORAGE_KEY);

    if (!storedToken) {
      setLoading(false);
      return;
    }

    setToken(storedToken);

    // Verify that the stored token is still valid before restoring the session
    authApi
      .getProfile(storedToken)
      .then((data) => {
        setUser(data.user);
      })
      .catch(() => {
        clearAuthState();
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const login = async (credentials) => {
    try {
      setAuthError(null);
      const data = await authApi.login(credentials);
      applyAuthState(data);
      return data.user;
    } catch (error) {
      setAuthError(error.message);
      throw error;
    }
  };

  const register = async (details) => {
    try {
      setAuthError(null);
      const data = await authApi.register(details);
      applyAuthState(data);
      return data.user;
    } catch (error) {
      setAuthError(error.message);
      throw error;
    }
  };

  const updateProfile = async (updates) => {
    if (!token) {
      throw new Error("You must be authenticated to update your profile");
    }

    try {
      setAuthError(null);
      const data = await authApi.updateProfile(token, updates);
      applyAuthState(data);
      return data.user;
    } catch (error) {
      setAuthError(error.message);
      throw error;
    }
  };

  const logout = () => {
    clearAuthState();
  };

  const value = {
    token,
    user,
    loading,
    authError,
    login,
    register,
    logout,
    updateProfile,
    clearError: () => setAuthError(null),
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
