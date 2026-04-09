export const ContributorRequestStatus = {
  PENDING: 'PENDING',
  APPROVED: 'APPROVED',
  REJECTED: 'REJECTED',
  NEED_INFO: 'NEED_INFO',
} as const;

export type ContributorRequestStatus =
  (typeof ContributorRequestStatus)[keyof typeof ContributorRequestStatus];

export const ContributorStatusLabel = {
  [ContributorRequestStatus.PENDING]: 'Chờ duyệt',
  [ContributorRequestStatus.APPROVED]: 'Đã duyệt',
  [ContributorRequestStatus.REJECTED]: 'Đã từ chối',
  [ContributorRequestStatus.NEED_INFO]: 'Chờ xử lý',
};

export const ContributorStatusClass = {
  [ContributorRequestStatus.PENDING]: 'dot-pending',
  [ContributorRequestStatus.APPROVED]: 'dot-approved',
  [ContributorRequestStatus.REJECTED]: 'dot-rejected',
  [ContributorRequestStatus.NEED_INFO]: 'dot-pending', // Reuse pending style or create a new one
};
