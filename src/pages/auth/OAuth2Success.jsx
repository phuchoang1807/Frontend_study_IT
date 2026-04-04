import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { getCurrentUser } from "../../api/authApi";
import {
  setAccessToken,
  setRefreshToken,
  setRoles,
  setPermissions,
  clearTokens,
} from "../../api/tokenStorage";
import BrandLogo from "../../components/BrandLogo";

export default function OAuth2Success() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [message, setMessage] = useState("Completing sign-in…");

  useEffect(() => {
    const error = searchParams.get("error");
    const accessToken = searchParams.get("accessToken");
    const refreshToken = searchParams.get("refreshToken");

    if (error) {
      setMessage("Sign-in failed. Redirecting…");
      const q = new URLSearchParams({ oauthError: error });
      navigate(`/login?${q.toString()}`, { replace: true });
      return;
    }

    if (!accessToken || !refreshToken) {
      setMessage("Missing tokens. Redirecting…");
      navigate("/login", { replace: true });
      return;
    }

    let cancelled = false;

    (async () => {
      try {
        setAccessToken(accessToken);
        setRefreshToken(refreshToken);
        const user = await getCurrentUser();
        if (cancelled) return;
        setRoles(user.roles || []);
        setPermissions(user.permissions || []);
        window.location.replace("/");
      } catch {
        if (cancelled) return;
        clearTokens();
        setMessage("Could not verify session. Redirecting…");
        navigate("/login", { replace: true });
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [searchParams, navigate]);

  return (
    <div className="auth-form-wrap">
      <BrandLogo />
      <header className="auth-header">
        <h1>Signing you in</h1>
        <p>{message}</p>
      </header>
    </div>
  );
}
