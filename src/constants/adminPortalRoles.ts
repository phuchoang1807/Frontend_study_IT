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
export function getAdminLandingRoute(
  roles: string[] | undefined | null
): string {
  if (!roles?.length) return "/admin/dashboard";
  if (roles.includes("ADMIN")) return "/admin/dashboard";
  if (roles.includes("USER_MODERATOR")) return "/admin/contributor-requests";
  if (roles.includes("CONTENT_MODERATOR")) return "/admin/content-moderator";
  return "/admin/dashboard";
}