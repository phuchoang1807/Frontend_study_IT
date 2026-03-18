// Token storage strategy:
// - accessToken: memory + sessionStorage (survive F5, cleared when tab closes)
// - refreshToken: localStorage (persist across sessions)

const ACCESS_TOKEN_KEY = 'si_access_token';
const REFRESH_TOKEN_KEY = 'si_refresh_token';

let accessTokenMemory: string | null = null;

export function getAccessToken(): string | null {
  if (accessTokenMemory) return accessTokenMemory;
  if (typeof window === 'undefined') return null;

  try {
    const token = window.sessionStorage.getItem(ACCESS_TOKEN_KEY);
    accessTokenMemory = token;
    return token;
  } catch {
    return null;
  }
}

export function setAccessToken(token: string | null): void {
  accessTokenMemory = token;
  if (typeof window === 'undefined') {
    return;
  }

  try {
    if (token) {
      window.sessionStorage.setItem(ACCESS_TOKEN_KEY, token);
    } else {
      window.sessionStorage.removeItem(ACCESS_TOKEN_KEY);
    }
  } catch {
    // ignore storage errors
  }
}

export function getRefreshToken(): string | null {
  if (typeof window === 'undefined') {
    return null;
  }

  try {
    return window.localStorage.getItem(REFRESH_TOKEN_KEY);
  } catch {
    return null;
  }
}

export function setRefreshToken(token: string | null): void {
  if (typeof window === 'undefined') {
    return;
  }

  try {
    if (token) {
      window.localStorage.setItem(REFRESH_TOKEN_KEY, token);
    } else {
      window.localStorage.removeItem(REFRESH_TOKEN_KEY);
    }
  } catch {
    // ignore storage errors
  }
}

export function clearTokens(): void {
  setAccessToken(null);
  setRefreshToken(null);
}

