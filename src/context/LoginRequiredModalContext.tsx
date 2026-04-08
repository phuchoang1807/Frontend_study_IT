import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { useLocation, useNavigate } from "react-router-dom";
import LoginRequiredModal from "../components/common/LoginRequiredModal";
import { useAuth } from "./AuthContext";

export type LoginRequiredOptions = {
  /** Sau khi đăng nhập, quay lại URL này (vd. `location.pathname + location.search`). Mặc định: trang hiện tại. */
  redirectTo?: string | null;
};

type LoginRequiredModalContextValue = {
  /** Trả về `true` nếu đã đăng nhập; nếu chưa — mở modal và trả về `false`. */
  requestLogin: (options?: LoginRequiredOptions) => boolean;
};

const LoginRequiredModalContext = createContext<
  LoginRequiredModalContextValue | undefined
>(undefined);

export function LoginRequiredModalProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [open, setOpen] = useState(false);
  const [redirectTo, setRedirectTo] = useState<string | null>(null);

  const close = useCallback(() => {
    setOpen(false);
    setRedirectTo(null);
  }, []);

  const requestLogin = useCallback(
    (options?: LoginRequiredOptions) => {
      if (isAuthenticated) return true;
      setRedirectTo(
        options?.redirectTo !== undefined ? options.redirectTo : null
      );
      setOpen(true);
      return false;
    },
    [isAuthenticated]
  );

  const resolveNextPath = useCallback(() => {
    if (redirectTo != null && redirectTo !== "") return redirectTo;
    return `${location.pathname}${location.search}`;
  }, [redirectTo, location.pathname, location.search]);

  const goLogin = useCallback(() => {
    const nextPath = resolveNextPath();
    const q = nextPath ? `?next=${encodeURIComponent(nextPath)}` : "";
    navigate(`/login${q}`);
    close();
  }, [navigate, resolveNextPath, close]);

  const goRegister = useCallback(() => {
    const nextPath = resolveNextPath();
    const q = nextPath ? `?next=${encodeURIComponent(nextPath)}` : "";
    navigate(`/sign-up${q}`);
    close();
  }, [navigate, resolveNextPath, close]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, close]);

  const value = useMemo(() => ({ requestLogin }), [requestLogin]);

  return (
    <LoginRequiredModalContext.Provider value={value}>
      {children}
      <LoginRequiredModal
        isOpen={open}
        onClose={close}
        onLoginClick={goLogin}
        onRegisterClick={goRegister}
      />
    </LoginRequiredModalContext.Provider>
  );
}

export function useLoginRequired() {
  const ctx = useContext(LoginRequiredModalContext);
  if (!ctx) {
    throw new Error(
      "useLoginRequired must be used within LoginRequiredModalProvider"
    );
  }
  return ctx.requestLogin;
}
