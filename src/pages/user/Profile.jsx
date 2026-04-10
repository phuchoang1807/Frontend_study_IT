import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Navigate } from "react-router-dom";
import {
  UserCircleIcon,
  DocumentIcon,
  QuizIcon,
  StarIcon,
} from "../../components/icons";
import "../../styles/dashboard.css";
import { useAuth } from "../../context/AuthContext";
import { useNotification } from "../../context/NotificationContext";
import UserAvatarDisplay from "../../components/UserAvatarDisplay";
import { getProfileRoleBadges } from "../../utils/roleBadges";
import { updateProfile } from "../../api/profileApi";
import { getUserDashboard, getApiErrorMessage } from "../../api/userApi";
import { supabase, AVATAR_BUCKET } from "../../supabaseClient";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const MAX_AVATAR_BYTES = 2 * 1024 * 1024;

const GridIcon = ({ size = 18, color = "currentColor" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="3" width="7" height="7"></rect>
    <rect x="14" y="3" width="7" height="7"></rect>
    <rect x="14" y="14" width="7" height="7"></rect>
    <rect x="3" y="14" width="7" height="7"></rect>
  </svg>
);

const CameraIcon = ({ size = 14, color = "currentColor" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"></path>
    <circle cx="12" cy="13" r="4"></circle>
  </svg>
);

const TrendingUpIcon = ({ size = 18, color = "currentColor" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="23 6 13.5 15.5 8.5 10.5 1 18"></polyline>
    <polyline points="17 6 23 6 23 12"></polyline>
  </svg>
);

function validateAvatarFile(file) {
  const okType =
    file.type === "image/jpeg" ||
    file.type === "image/png" ||
    /\.(jpe?g|png)$/i.test(file.name);
  if (!okType) {
    return "Chỉ chấp nhận ảnh JPG hoặc PNG.";
  }
  if (file.size > MAX_AVATAR_BYTES) {
    return "Ảnh tối đa 2MB.";
  }
  return null;
}

function avatarPathExtension(file) {
  const name = file.name || "";
  const m = /\.(jpe?g|png)$/i.exec(name);
  if (!m) return "jpg";
  const e = m[1].toLowerCase();
  if (e === "jpeg" || e === "jpg") return "jpg";
  return "png";
}

function formatProgressPercent(value) {
  const n = Number(value);
  if (!Number.isFinite(n)) return "0%";
  const s = n.toFixed(1);
  if (n > 0) return `+${s}%`;
  return `${s}%`;
}

function progressVisualClasses(percent) {
  const n = Number(percent);
  if (!Number.isFinite(n) || n === 0) {
    return {
      valueClass: "progress-neutral",
      badgeClass: "progress-badge-flat",
    };
  }
  if (n > 0) {
    return { valueClass: "progress-positive", badgeClass: "progress-badge-up" };
  }
  return { valueClass: "progress-negative", badgeClass: "progress-badge-down" };
}

function formatChartTickDate(isoDate) {
  if (!isoDate || typeof isoDate !== "string") return "";
  const d = new Date(`${isoDate}T12:00:00`);
  if (Number.isNaN(d.getTime())) return isoDate;
  return d.toLocaleDateString("vi-VN", { day: "2-digit", month: "2-digit" });
}

export default function Profile() {
  const { user, isAuthenticated, initializing, refreshUserProfile } = useAuth();
  const notification = useNotification();
  const fileInputRef = useRef(null);

  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [bio, setBio] = useState("");
  const [avatarUrl, setAvatarUrl] = useState("");
  const [avatarUploading, setAvatarUploading] = useState(false);
  const [saving, setSaving] = useState(false);

  const [dashboardData, setDashboardData] = useState(null);
  const [dashboardLoading, setDashboardLoading] = useState(true);
  const [dashboardError, setDashboardError] = useState(null);

  useEffect(() => {
    if (!user) return;
    setFullName(user.fullName ?? "");
    setPhone(user.phone ?? "");
    setBio(user.bio ?? "");
    setAvatarUrl(user.avatar?.trim() ? user.avatar : "");
  }, [user]);

  useEffect(() => {
    if (!user?.id) return undefined;
    let cancelled = false;
    setDashboardLoading(true);
    setDashboardError(null);
    getUserDashboard()
      .then((data) => {
        if (!cancelled) setDashboardData(data);
      })
      .catch((err) => {
        if (!cancelled) setDashboardError(getApiErrorMessage(err));
      })
      .finally(() => {
        if (!cancelled) setDashboardLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, [user?.id]);

  const displayUser = useMemo(() => {
    if (!user) return null;
    return {
      ...user,
      fullName: fullName || user.fullName || "",
      avatar: avatarUrl?.trim() ? avatarUrl : user.avatar,
    };
  }, [user, fullName, avatarUrl]);

  const openFilePicker = useCallback(() => {
    if (avatarUploading) return;
    fileInputRef.current?.click();
  }, [avatarUploading]);

  const onAvatarSelected = useCallback(
    async (e) => {
      const file = e.target.files?.[0];
      e.target.value = "";
      if (!file) return;

      const err = validateAvatarFile(file);
      if (err) {
        notification.error(err);
        return;
      }

      const viteUrl = import.meta.env.VITE_SUPABASE_URL;
      const viteKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
      if (!viteUrl?.trim() || !viteKey?.trim()) {
        notification.error(
          "Chưa cấu hình VITE_SUPABASE_URL hoặc VITE_SUPABASE_ANON_KEY."
        );
        return;
      }

      setAvatarUploading(true);
      try {
        const ext = avatarPathExtension(file);
        const filePath = `${user.id}_${Date.now()}.${ext}`;
        const contentType =
          file.type ||
          (ext === "png" ? "image/png" : "image/jpeg");

        const { error: uploadError } = await supabase.storage
          .from(AVATAR_BUCKET)
          .upload(filePath, file, {
            cacheControl: "3600",
            upsert: true,
            contentType,
          });

        if (uploadError) {
          throw new Error(uploadError.message || "Upload thất bại.");
        }

        const { data: pub } = supabase.storage
          .from(AVATAR_BUCKET)
          .getPublicUrl(filePath);

        const url = pub?.publicUrl;
        if (!url) {
          throw new Error("Không lấy được URL ảnh công khai.");
        }

        setAvatarUrl(url);
        notification.success(
          "Tải ảnh lên thành công. Nhấn Lưu thay đổi để lưu hồ sơ."
        );
      } catch (err) {
        const msg =
          err?.response?.data?.message ||
          err?.message ||
          "Tải ảnh thất bại.";
        notification.error(msg);
      } finally {
        setAvatarUploading(false);
      }
    },
    [notification, user]
  );

  const onSave = useCallback(async () => {
    if (!user || saving) return;
    setSaving(true);
    try {
      await updateProfile({
        fullName: fullName.trim(),
        phone: phone.trim(),
        bio: bio.trim(),
        avatarUrl: avatarUrl.trim(),
      });
      await refreshUserProfile();
      notification.success("Đã lưu hồ sơ.");
    } catch (err) {
      const msg =
        err?.response?.data?.message ||
        err?.message ||
        "Lưu hồ sơ thất bại.";
      notification.error(msg);
    } finally {
      setSaving(false);
    }
  }, [user, saving, fullName, phone, bio, avatarUrl, refreshUserProfile, notification]);

  const chartRows = useMemo(() => {
    const raw = dashboardData?.progressHistory;
    if (!Array.isArray(raw)) return [];
    return raw.map((p) => ({
      date: p.date,
      score: Number(p.score),
    }));
  }, [dashboardData]);

  if (initializing) {
    return null;
  }

  if (!isAuthenticated || !user || !displayUser) {
    return <Navigate to="/login" replace />;
  }

  const roleBadges = getProfileRoleBadges(user.roles);
  const progressClasses = progressVisualClasses(dashboardData?.progressPercent);

  return (
    <div className="dashboard-container">
      <main className="dashboard-content">
        <section className="profile-card">
          <div className="profile-info-main">
            <div className="avatar-wrapper profile-avatar-wrapper">
              <UserAvatarDisplay user={displayUser} size="profile" />
              <input
                ref={fileInputRef}
                type="file"
                accept="image/jpeg,image/png,.jpg,.jpeg,.png"
                className="profile-avatar-file-input"
                aria-hidden
                tabIndex={-1}
                onChange={onAvatarSelected}
              />
              <button
                type="button"
                className="camera-btn profile-camera-btn"
                onClick={openFilePicker}
                disabled={avatarUploading}
                title={avatarUploading ? "Đang tải ảnh…" : "Đổi ảnh đại diện"}
                aria-label="Đổi ảnh đại diện"
              >
                {avatarUploading ? (
                  <span className="profile-avatar-spinner" aria-hidden />
                ) : (
                  <CameraIcon color="white" size={16} />
                )}
              </button>
            </div>
            <div className="profile-text">
              <h2>
                {displayUser.fullName || "—"}
                {roleBadges.map(({ role, label }) => (
                  <span key={role} className="role-badge">
                    {label}
                  </span>
                ))}
              </h2>
              <p className="profile-email">{user.email}</p>
            </div>
          </div>
        </section>

        <section>
          <div className="section-header">
            <GridIcon color="#3b82f6" size={20} />
            <h3>Bảng điều khiển cá nhân</h3>
          </div>

          {dashboardError ? (
            <div className="dashboard-dashboard-error" role="alert">
              {dashboardError}
            </div>
          ) : null}

          <div
            className={`stats-grid${dashboardLoading ? " dashboard-stats-skeleton" : ""}`}
            aria-busy={dashboardLoading}
          >
            <div className="stat-card blue">
              <div>
                <div className="stat-label">SỐ TÀI LIỆU ĐÃ HỌC</div>
                {dashboardLoading ? (
                  <div className="stat-value-skel" aria-hidden />
                ) : (
                  <div className="stat-value">
                    {Number(dashboardData?.totalDocumentsLearned ?? 0)}
                  </div>
                )}
              </div>
              <div className="stat-icon-bg">
                <DocumentIcon size={20} />
              </div>
            </div>

            <div className="stat-card orange">
              <div>
                <div className="stat-label">SỐ BÀI QUIZ ĐÃ LÀM</div>
                {dashboardLoading ? (
                  <div className="stat-value-skel" aria-hidden />
                ) : (
                  <div className="stat-value">
                    {Number(dashboardData?.totalQuizzesDone ?? 0)}
                  </div>
                )}
              </div>
              <div className="stat-icon-bg">
                <QuizIcon size={20} />
              </div>
            </div>

            <div className="stat-card green">
              <div>
                <div className="stat-label">ĐIỂM TRUNG BÌNH</div>
                {dashboardLoading ? (
                  <div className="stat-value-skel" aria-hidden />
                ) : (
                  <div className="stat-value">
                    {Number(dashboardData?.averageScore ?? 0).toFixed(1)}
                  </div>
                )}
              </div>
              <div className="stat-icon-bg">
                <StarIcon size={20} />
              </div>
            </div>

            <div className="stat-card blue-light">
              <div>
                <div className="stat-label">% TIẾN BỘ</div>
                {dashboardLoading ? (
                  <div className="stat-value-skel" aria-hidden />
                ) : (
                  <div
                    className={`stat-value ${progressClasses.valueClass}`}
                  >
                    {formatProgressPercent(dashboardData?.progressPercent)}
                    <span
                      className={`month-badge ${progressClasses.badgeClass}`}
                    >
                      vs tháng trước
                    </span>
                  </div>
                )}
              </div>
              <div className="stat-icon-bg">
                <TrendingUpIcon size={20} />
              </div>
            </div>
          </div>
        </section>

        <div className="dashboard-middle-row">
          <div className="chart-card">
            <div className="card-title-row">
              <div className="card-title">
                <TrendingUpIcon color="#3b82f6" size={18} />
                Tiến độ điểm số theo ngày
              </div>
            </div>
            {dashboardLoading ? (
              <div className="dashboard-chart-empty">Đang tải…</div>
            ) : dashboardError ? (
              <div className="dashboard-chart-empty">
                Không thể hiển thị biểu đồ.
              </div>
            ) : chartRows.length === 0 ? (
              <div className="dashboard-chart-empty">
                Chưa có dữ liệu điểm theo ngày.
              </div>
            ) : (
              <div className="dashboard-recharts-wrap">
                <ResponsiveContainer width="100%" height={280}>
                  <LineChart
                    data={chartRows}
                    margin={{ top: 8, right: 16, left: 0, bottom: 8 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                    <XAxis
                      dataKey="date"
                      tickFormatter={formatChartTickDate}
                      tick={{ fontSize: 12, fill: "#94a3b8" }}
                      stroke="#cbd5e1"
                    />
                    <YAxis
                      tick={{ fontSize: 12, fill: "#94a3b8" }}
                      stroke="#cbd5e1"
                      width={40}
                    />
                    <Tooltip
                      contentStyle={{
                        borderRadius: 8,
                        border: "1px solid #e2e8f0",
                        fontSize: 13,
                      }}
                      labelFormatter={(label) =>
                        typeof label === "string"
                          ? formatChartTickDate(label)
                          : label
                      }
                      formatter={(value) => [
                        typeof value === "number"
                          ? value.toFixed(1)
                          : value,
                        "Điểm",
                      ]}
                    />
                    <Line
                      type="monotone"
                      dataKey="score"
                      stroke="#3b82f6"
                      strokeWidth={2}
                      dot={{ r: 3, fill: "#3b82f6" }}
                      activeDot={{ r: 5 }}
                      connectNulls
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            )}
          </div>
        </div>

        <section className="personal-info-card">
          <div className="card-title" style={{ marginBottom: "24px" }}>
            <UserCircleIcon color="#3b82f6" size={20} />
            Thông tin cá nhân
          </div>

          <div className="personal-info-body">
            <div className="info-form" key={user.id}>
              <div className="form-group">
                <label>HỌ VÀ TÊN</label>
                <input
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  maxLength={255}
                />
              </div>
              <div className="form-group">
                <label>SỐ ĐIỆN THOẠI</label>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  maxLength={32}
                  placeholder="Tùy chọn"
                />
              </div>
              <div className="form-group">
                <label>GIỚI THIỆU</label>
                <textarea
                  className="profile-bio-input"
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  maxLength={2000}
                  rows={4}
                  placeholder="Một vài dòng về bạn…"
                />
              </div>
              <div className="form-group">
                <label>ĐỊA CHỈ EMAIL</label>
                <input type="email" value={user.email || ""} readOnly disabled />
              </div>
              <button
                type="button"
                className="save-btn"
                onClick={onSave}
                disabled={saving}
              >
                {saving ? "Đang lưu…" : "Lưu thay đổi"}
              </button>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
