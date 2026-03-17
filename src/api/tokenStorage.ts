// Simple token storage: accessToken in memory, refreshToken in localStorage

const REFRESH_TOKEN_KEY = 'si_refresh_token';

let accessTokenMemory: string | null = null;

export function getAccessToken(): string | null {
  return accessTokenMemory;
}

export function setAccessToken(token: string | null): void {
  accessTokenMemory = token;
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

