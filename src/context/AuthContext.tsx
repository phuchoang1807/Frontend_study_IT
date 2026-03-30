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
import axiosClient from "../api/axiosClient";

type AuthContextValue = {
  user: UserInfo | null;
  isAuthenticated: boolean;
  contributorStatus: string | null; // Thêm trạng thái contributor
  loading: boolean;
  initializing: boolean;
  login: (payload: LoginRequest) => Promise<UserInfo>;
  logout: () => Promise<void>;
  fetchMe: () => Promise<void>;
  refreshContributorStatus: () => Promise<void>; // Hàm để cập nhật lại trạng thái khi cần
  error: string | null;
  setError: (message: string | null) => void;
};

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<UserInfo | null>(null);
  const [contributorStatus, setContributorStatus] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [initializing, setInitializing] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const isAuthenticated = !!user;

  const refreshContributorStatus = async () => {
    try {
      const response = await axiosClient.get("/contributor/registration-status");
      if (response.data.success && response.data.data) {
        setContributorStatus(response.data.data.status);
      } else {
        setContributorStatus(null);
      }
    } catch (err) {
      // Log the error conceptually for debugging.
      console.error("Failed to refresh contributor status:", err);
      // Do not set contributorStatus to null here.
      // This preserves the existing contributorStatus if one exists,
      // preventing incorrect navigation due to temporary API errors.
    }
  };

  const fetchMe = async () => {
    try {
      setLoading(true);
      const currentUser = await getCurrentUser();
      setUser(currentUser);
      // Khi lấy user thành công, lấy luôn trạng thái contributor
      await refreshContributorStatus();
    } catch {
      clearTokens();
      setUser(null);
      setContributorStatus(null);
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
      // Sau khi login thành công, lấy trạng thái contributor
      await refreshContributorStatus();
      return tokenResponse.user;
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
      setContributorStatus(null);
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

        const refreshToken = getRefreshToken();
        if (!refreshToken) {
          return;
        }

        const tokenData = await manualRefresh();
        if (!tokenData) {
          return;
        }

        if (!cancelled) {
          setUser(tokenData.user);
          // Refresh trạng thái contributor sau khi phục hồi session
          await refreshContributorStatus();
        }
      } catch {
        clearTokens();
        if (!cancelled) {
          setUser(null);
          setContributorStatus(null);
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
      contributorStatus,
      loading: loading || initializing,
      initializing,
      login,
      logout,
      fetchMe,
      refreshContributorStatus,
      error,
      setError,
    }),
    [user, isAuthenticated, contributorStatus, loading, initializing, error]
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

