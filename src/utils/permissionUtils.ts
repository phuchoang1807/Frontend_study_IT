import type { UserInfo } from "../api/authApi";

export function hasPermission(user: UserInfo | null, permission: string): boolean {
  if (!user || !user.permissions) return false;
  return user.permissions.includes(permission);
}

export function hasAnyPermission(
  user: UserInfo | null,
  permissions: string[]
): boolean {
  if (!user || !user.permissions || permissions.length === 0) return false;
  return permissions.some((perm) => user.permissions.includes(perm));
}

export function hasRole(user: UserInfo | null, role: string): boolean {
  if (!user || !user.roles) return false;
  return user.roles.includes(role);
}

