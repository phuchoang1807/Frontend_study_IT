// Token storage strategy:
// - accessToken: memory + sessionStorage + localStorage (for RBAC/UI checks)
// - refreshToken: localStorage (persist across sessions)
// - roles/permissions: localStorage (RBAC helpers/UI guards)

const ACCESS_TOKEN_KEY = 'si_access_token';
const REFRESH_TOKEN_KEY = 'si_refresh_token';
const ACCESS_TOKEN_LOCAL_KEY = 'accessToken';
const ROLES_KEY = 'roles';
const PERMISSIONS_KEY = 'permissions';

let accessTokenMemory: string | null = null;

export function getAccessToken(): string | null {
  if (accessTokenMemory) {
    console.log("getAccessToken: from memory", accessTokenMemory ? "exists" : "null");
    return accessTokenMemory;
  }
  if (typeof window === 'undefined') {
    console.log("getAccessToken: window is undefined");
    return null;
  }

  try {
    const sessionToken = window.sessionStorage.getItem(ACCESS_TOKEN_KEY);
    const localToken = window.localStorage.getItem(ACCESS_TOKEN_LOCAL_KEY);
    const token = sessionToken || localToken;
    accessTokenMemory = token;
    console.log("getAccessToken: from storage", {
      sessionToken: sessionToken ? "exists" : "null",
      localToken: localToken ? "exists" : "null",
      result: token ? "exists" : "null"
    });
    return token;
  } catch (e) {
    console.error("getAccessToken: storage error", e);
    return null;
  }
}

export function setAccessToken(token: string | null): void {
  accessTokenMemory = token;
  if (typeof window === 'undefined') {
    console.log("setAccessToken: window is undefined");
    return;
  }

  try {
    if (token) {
      window.sessionStorage.setItem(ACCESS_TOKEN_KEY, token);
      window.localStorage.setItem(ACCESS_TOKEN_LOCAL_KEY, token);
      console.log("setAccessToken: token set", token.substring(0, 10) + "...");
    } else {
      window.sessionStorage.removeItem(ACCESS_TOKEN_KEY);
      window.localStorage.removeItem(ACCESS_TOKEN_LOCAL_KEY);
      console.log("setAccessToken: token cleared");
    }
  } catch (e) {
    console.error("setAccessToken: storage error", e);
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

export function setRoles(roles: string[] | null): void {
  if (typeof window === 'undefined') return;
  try {
    if (roles) {
      window.localStorage.setItem(ROLES_KEY, JSON.stringify(roles));
    } else {
      window.localStorage.removeItem(ROLES_KEY);
    }
  } catch {
    // ignore storage errors
  }
}

export function setPermissions(permissions: string[] | null): void {
  if (typeof window === 'undefined') return;
  try {
    if (permissions) {
      window.localStorage.setItem(PERMISSIONS_KEY, JSON.stringify(permissions));
    } else {
      window.localStorage.removeItem(PERMISSIONS_KEY);
    }
  } catch {
    // ignore storage errors
  }
}

export function clearTokens(): void {
  setAccessToken(null);
  setRefreshToken(null);
  setRoles(null);
  setPermissions(null);
}

