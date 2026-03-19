import { createContext, useContext, useEffect, useMemo, useState } from "react";
import {
  getCurrentUser,
  login as loginApi,
  logout as logoutApi,
  manualRefresh,
  type LoginRequest,
  type UserInfo,
} from "../api/authApi";
import {
  clearTokens,
  getAccessToken,
  getRefreshToken,
} from "../api/tokenStorage";

type AuthContextValue = {
  user: UserInfo | null;
  isAuthenticated: boolean;
  loading: boolean;
  initializing: boolean;
  login: (payload: LoginRequest) => Promise<void>;
  logout: () => Promise<void>;
  fetchMe: () => Promise<void>;
  error: string | null;
  setError: (message: string | null) => void;
};

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<UserInfo | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [initializing, setInitializing] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const isAuthenticated = !!user;

  const fetchMe = async () => {
    try {
      setLoading(true);
      const currentUser = await getCurrentUser();
      setUser(currentUser);
    } catch {
      clearTokens();
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  const login = async (payload: LoginRequest) => {
    setError(null);
    setLoading(true);
    try {
      const tokenResponse = await loginApi(payload);
      setUser(tokenResponse.user);
    } catch (err: any) {
      const message =
        err?.response?.data?.message ||
        err?.message ||
        "Login failed. Please try again.";
      setError(message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    setError(null);
    setLoading(true);
    try {
      await logoutApi();
    } catch {
      // ignore logout errors, still clear locally
    } finally {
      clearTokens();
      setUser(null);
      setLoading(false);
    }
  };

  // Init auth khi app mount
  useEffect(() => {
    let cancelled = false;

    const init = async () => {
      try {
        const accessToken = getAccessToken();
        if (accessToken) {
          await fetchMe();
          return;
        }

        // Mất accessToken sau F5 là bình thường (token in-memory).
        // Nếu còn refreshToken thì refresh để khôi phục session.
        const refreshToken = getRefreshToken();
        if (!refreshToken) {
          return;
        }

        const tokenData = await manualRefresh();
        if (!tokenData) {
          return;
        }

        // manualRefresh đã setAccessToken/setRefreshToken; user từ response đủ để mở app ngay
        if (!cancelled) {
          setUser(tokenData.user);
        }
      } catch {
        clearTokens();
        if (!cancelled) {
          setUser(null);
        }
      }
    };

    init().finally(() => {
      if (!cancelled) setInitializing(false);
    });

    return () => {
      cancelled = true;
    };
  }, []);

  const value: AuthContextValue = useMemo(
    () => ({
      user,
      isAuthenticated,
      loading: loading || initializing,
      initializing,
      login,
      logout,
      fetchMe,
      error,
      setError,
    }),
    [user, isAuthenticated, loading, initializing, error]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return ctx;
}

