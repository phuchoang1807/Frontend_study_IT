import axiosClient from "../api/axiosClient";
import type { UserInfo } from "../api/authApi";
import { hasRole } from "./permissionUtils";

export type ContributorRegistrationSnapshot = {
  status: string | null;
  submissionCount: number;
};

export const ContributorUploadGateVariant = {
  NO_REQUEST: "NO_REQUEST",
  PENDING: "PENDING",
  REJECTED_RESUBMIT: "REJECTED_RESUBMIT",
  REJECTED_EXHAUSTED: "REJECTED_EXHAUSTED",
  APPROVED_AWAITING_ROLE: "APPROVED_AWAITING_ROLE",
  INSUFFICIENT_ROLE: "INSUFFICIENT_ROLE",
  FETCH_ERROR: "FETCH_ERROR",
} as const;

export type ContributorUploadGateVariant =
  (typeof ContributorUploadGateVariant)[keyof typeof ContributorUploadGateVariant];

export type ContributorUploadAccessResult =
  | { kind: "ALLOW_UPLOAD" }
  | { kind: "GATE_MODAL"; variant: ContributorUploadGateVariant }
  | { kind: "FETCH_ERROR" };

export async function fetchContributorRegistrationSnapshot(): Promise<
  ContributorRegistrationSnapshot | null | undefined
> {
  try {
    const response = await axiosClient.get("/contributor/registration-status");
    if (!response.data?.success) {
      return null;
    }
    const data = response.data.data;
    if (data == null) {
      return { status: null, submissionCount: 0 };
    }
    return {
      status: data.status != null ? String(data.status).toUpperCase() : null,
      submissionCount: Number(data.submissionCount ?? 0),
    };
  } catch {
    return undefined;
  }
}

/**
 * Quyền mở trang đăng tải: chỉ CONTRIBUTOR được phép truy cập trực tiếp.
 * USER: chặn theo trạng thái đăng ký Contributor (gọi API).
 */
export async function checkContributorUploadAccess(
  user: UserInfo
): Promise<ContributorUploadAccessResult> {
  if (hasRole(user, "CONTRIBUTOR")) {
    return { kind: "ALLOW_UPLOAD" };
  }

  if (!hasRole(user, "USER")) {
    return {
      kind: "GATE_MODAL",
      variant: ContributorUploadGateVariant.INSUFFICIENT_ROLE,
    };
  }

  const snap = await fetchContributorRegistrationSnapshot();
  if (snap === undefined) {
    return { kind: "FETCH_ERROR" };
  }
  if (snap === null) {
    return {
      kind: "GATE_MODAL",
      variant: ContributorUploadGateVariant.NO_REQUEST,
    };
  }

  const { status, submissionCount } = snap;

  if (status == null) {
    return {
      kind: "GATE_MODAL",
      variant: ContributorUploadGateVariant.NO_REQUEST,
    };
  }

  switch (status) {
    case "PENDING":
    case "NEED_INFO":
      return {
        kind: "GATE_MODAL",
        variant: ContributorUploadGateVariant.PENDING,
      };
    case "REJECTED":
      if (submissionCount >= 2) {
        return {
          kind: "GATE_MODAL",
          variant: ContributorUploadGateVariant.REJECTED_EXHAUSTED,
        };
      }
      return {
        kind: "GATE_MODAL",
        variant: ContributorUploadGateVariant.REJECTED_RESUBMIT,
      };
    case "APPROVED":
      return {
        kind: "GATE_MODAL",
        variant: ContributorUploadGateVariant.APPROVED_AWAITING_ROLE,
      };
    default:
      return {
        kind: "GATE_MODAL",
        variant: ContributorUploadGateVariant.NO_REQUEST,
      };
  }
}

export type ContributorUploadGateModalConfig = {
  title: string;
  message: string;
  primary?: { label: string; path: string };
  closeOnly?: boolean;
};

export function getContributorUploadGateModalCopy(
  variant: ContributorUploadGateVariant
): ContributorUploadGateModalConfig {
  switch (variant) {
    case ContributorUploadGateVariant.PENDING:
      return {
        title: "Đang chờ duyệt",
        message:
          "Yêu cầu của bạn đang được chờ duyệt, vui lòng đợi thêm để có thể đăng tải tài liệu.",
        primary: { label: "Xem trạng thái", path: "/contributor-status" },
      };
    case ContributorUploadGateVariant.REJECTED_RESUBMIT:
      return {
        title: "Yêu cầu bị từ chối",
        message:
          "Yêu cầu của bạn đã bị từ chối. Bạn có thể gửi lại yêu cầu này 1 lần nữa.",
        primary: { label: "Tới hồ sơ contributor", path: "/contributor-profile" },
      };
    case ContributorUploadGateVariant.REJECTED_EXHAUSTED:
      return {
        title: "Không thể đăng tải",
        message:
          "Bạn đã hết lượt để đăng ký trở thành Contributor và không thể thực hiện đăng tải tài liệu. Nếu cần hỗ trợ, vui lòng liên hệ gmail: support@studyit.com",
        closeOnly: true,
      };
    case ContributorUploadGateVariant.NO_REQUEST:
      return {
        title: "Cần đăng ký Contributor",
        message:
          "Bạn cần đăng ký trở thành Contributor để đăng tải tài liệu.",
        primary: { label: "Đăng ký ngay", path: "/contributor-request" },
      };
    case ContributorUploadGateVariant.APPROVED_AWAITING_ROLE:
      return {
        title: "Đang cập nhật vai trò",
        message:
          "Hồ sơ của bạn đã được phê duyệt. Vai trò Contributor có thể cần vài phút để đồng bộ trên tài khoản của bạn.",
        primary: { label: "Xem trạng thái", path: "/contributor-status" },
      };
    case ContributorUploadGateVariant.INSUFFICIENT_ROLE:
      return {
        title: "Không thể đăng tải",
        message:
          "Tài khoản của bạn không có quyền đăng tải tài liệu trên kênh này.",
        closeOnly: true,
      };
    case ContributorUploadGateVariant.FETCH_ERROR:
      return {
        title: "Lỗi kết nối",
        message:
          "Không thể kiểm tra trạng thái đăng ký Contributor. Vui lòng thử lại sau.",
        closeOnly: true,
      };
    default:
      return {
        title: "Thông báo",
        message: "Không thể truy cập trang đăng tải.",
        closeOnly: true,
      };
  }
}
