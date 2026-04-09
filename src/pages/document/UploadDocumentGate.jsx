import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import ContributorUploadGateModal from "../../components/common/ContributorUploadGateModal";
import UploadDocument from "./UploadDocument";
import {
  checkContributorAccess,
  ContributorUploadGateVariant,
  getContributorUploadGateModalCopy,
} from "../../utils/checkContributorUploadAccess";

export default function UploadDocumentGate() {
  const { user, initializing, loading } = useAuth();
  const navigate = useNavigate();
  const [allowed, setAllowed] = useState(null);
  const [modalConfig, setModalConfig] = useState(() =>
    getContributorUploadGateModalCopy(ContributorUploadGateVariant.PENDING)
  );

  useEffect(() => {
    if (initializing || loading) {
      return;
    }
    if (!user) {
      navigate("/login", { replace: true });
    }
  }, [user, initializing, loading, navigate]);

  useEffect(() => {
    if (initializing || loading || !user) {
      return;
    }

    let cancelled = false;

    async function run() {
      const access = await checkContributorAccess(user);
      if (cancelled) return;

      if (access.kind === "ALLOW_UPLOAD") {
        setAllowed(true);
        return;
      }

      if (access.kind === "NAVIGATE_CONTRIBUTOR_REGISTRATION") {
        navigate("/contributor-request", { replace: true });
        return;
      }

      setModalConfig(getContributorUploadGateModalCopy(access.variant));
      setAllowed(false);
    }

    void run();
    return () => {
      cancelled = true;
    };
  }, [user, initializing, loading, navigate]);

  if (initializing || loading) {
    return (
      <div style={{ padding: "48px 24px", textAlign: "center", color: "#64748b" }}>
        Đang tải...
      </div>
    );
  }

  if (!user) {
    return null;
  }

  if (allowed === null) {
    return (
      <div style={{ padding: "48px 24px", textAlign: "center", color: "#64748b" }}>
        Đang tải...
      </div>
    );
  }

  if (allowed) {
    return <UploadDocument />;
  }

  return (
    <ContributorUploadGateModal
      isOpen
      onClose={() => navigate("/", { replace: true })}
      title={modalConfig.title}
      message={modalConfig.message}
      primary={modalConfig.primary}
      closeOnly={modalConfig.closeOnly}
    />
  );
}
