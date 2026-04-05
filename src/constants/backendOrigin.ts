/** Origin backend Spring (không có /api) — dùng cho OAuth2 redirect. */
export const BACKEND_ORIGIN =
  import.meta.env.VITE_BACKEND_ORIGIN ?? "http://localhost:8080";

export const GOOGLE_OAUTH_LOGIN_URL = `${BACKEND_ORIGIN}/oauth2/authorization/google`;

export const GITHUB_OAUTH_LOGIN_URL = `${BACKEND_ORIGIN}/oauth2/authorization/github`;
