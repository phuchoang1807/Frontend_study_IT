import type { UserInfo } from "../api/authApi";

/**
 * Avatar URL nếu có; nếu không — một ký tự (chữ cái cuối của họ tên, hoặc email).
 */
export function getAvatarDisplay(user: UserInfo | null | undefined): string {
  const url = user?.avatar?.trim();
  if (url) return url;

  const fullName = user?.fullName?.trim();
  if (fullName) {
    return fullName.slice(-1).toUpperCase();
  }
  const email = user?.email?.trim();
  if (email) {
    return email.slice(-1).toUpperCase();
  }
  return "?";
}

export function userHasAvatar(user: UserInfo | null | undefined): boolean {
  return !!user?.avatar?.trim();
}
