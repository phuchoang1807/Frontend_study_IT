/** Role từ API → nhãn hiển thị trong UI (theo yêu cầu). */
const ROLE_LABELS: Record<string, string> = {
  USER: "NGƯỜI DÙNG",
  CONTRIBUTOR: "NGƯỜI ĐÓNG GÓP NỘI DUNG",
};

export function getProfileRoleBadges(roles: string[] | null | undefined): {
  role: string;
  label: string;
}[] {
  if (!roles?.length) return [];
  const seen = new Set<string>();
  const out: { role: string; label: string }[] = [];
  for (const r of roles) {
    const label = ROLE_LABELS[r];
    if (label && !seen.has(r)) {
      seen.add(r);
      out.push({ role: r, label });
    }
  }
  return out;
}
