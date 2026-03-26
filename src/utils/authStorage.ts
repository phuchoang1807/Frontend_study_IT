const ROLES_KEY = "roles";
const PERMISSIONS_KEY = "permissions";

function parseStringArray(value: string | null): string[] {
  if (!value) return [];

  try {
    const parsed = JSON.parse(value);
    if (!Array.isArray(parsed)) return [];
    return parsed.filter((item): item is string => typeof item === "string");
  } catch {
    return [];
  }
}

export function getPermissions(): string[] {
  if (typeof window === "undefined") return [];
  return parseStringArray(window.localStorage.getItem(PERMISSIONS_KEY));
}

export function hasPermission(permission: string): boolean {
  return getPermissions().includes(permission);
}

export function getRoles(): string[] {
  if (typeof window === "undefined") return [];
  return parseStringArray(window.localStorage.getItem(ROLES_KEY));
}

export function hasRole(role: string): boolean {
  return getRoles().includes(role);
}
