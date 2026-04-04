export enum ContributorRequestStatus {
  PENDING = 'PENDING',
  APPROVED = 'APPROVED',
  REJECTED = 'REJECTED',
  NEED_INFO = 'NEED_INFO',
}

export const ContributorStatusLabel = {
  [ContributorRequestStatus.PENDING]: 'Chờ duyệt',
  [ContributorRequestStatus.APPROVED]: 'Đã duyệt',
  [ContributorRequestStatus.REJECTED]: 'Đã từ chối',
  [ContributorRequestStatus.NEED_INFO]: 'Yêu cầu bổ sung',
};

export const ContributorStatusClass = {
  [ContributorRequestStatus.PENDING]: 'dot-pending',
  [ContributorRequestStatus.APPROVED]: 'dot-approved',
  [ContributorRequestStatus.REJECTED]: 'dot-rejected',
  [ContributorRequestStatus.NEED_INFO]: 'dot-pending', // Reuse pending style or create a new one
};
