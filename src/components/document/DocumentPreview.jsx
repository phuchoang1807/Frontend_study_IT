import React, { useEffect, useMemo, useState } from "react";

function getFileExt(fileUrl) {
  if (!fileUrl || typeof fileUrl !== "string") return "";
  const clean = fileUrl.split("#")[0].split("?")[0].toLowerCase();
  if (clean.endsWith(".pdf")) return "pdf";
  if (clean.endsWith(".docx")) return "docx";
  return "";
}

export default function DocumentPreview({ fileUrl }) {
  const [isLoading, setIsLoading] = useState(true);
  const ext = useMemo(() => getFileExt(fileUrl), [fileUrl]);

  const previewSrc = useMemo(() => {
    if (ext === "pdf") return fileUrl;
    if (ext === "docx") {
      return `https://docs.google.com/gview?url=${encodeURIComponent(
        fileUrl
      )}&embedded=true`;
    }
    return "";
  }, [ext, fileUrl]);

  useEffect(() => {
    if (!previewSrc) return;
    setIsLoading(true);
  }, [previewSrc]);

  if (!fileUrl) {
    return (
      <div className="document-preview-message">
        Không có file để xem trước
      </div>
    );
  }

  if (!previewSrc) {
    return (
      <div className="document-preview-message">
        Không hỗ trợ xem trước tài liệu này
      </div>
    );
  }

  return (
    <div className="document-preview-inner">
      {isLoading ? (
        <div className="document-preview-loading" aria-live="polite">
          Đang tải xem trước...
        </div>
      ) : null}
      <iframe
        title="Document preview"
        className="document-preview-iframe"
        src={previewSrc}
        onLoad={() => setIsLoading(false)}
      />
    </div>
  );
}
