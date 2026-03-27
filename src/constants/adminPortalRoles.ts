export const ADMIN_PORTAL_ROLES = [
  "ADMIN",
  "USER_MODERATOR",
  "CONTENT_MODERATOR",
] as const;

export function userHasAdminPortalRole(
  roles: string[] | undefined | null
): boolean {
  if (!roles?.length) return false;
  return roles.some((r) =>
    (ADMIN_PORTAL_ROLES as readonly string[]).includes(r)
  );
}
