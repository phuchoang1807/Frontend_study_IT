import { useNavigate } from "react-router-dom";
import BookmarkButton from "./common/BookmarkButton";
import { ChevronRightIcon, EyeIcon } from "./icons";
import { getDocumentUploaderDisplayName } from "../utils/documentUploaderDisplay";

const documents = [
  {
    category: "Technology",
    categoryColor: "#6366F1",
    image: "https://placehold.co/174x192",
    imageAlt: "React Fullstack",
    title: "React Fullstack Programming Guide from A-Z",
    uploader: { fullName: "Nguyen Van A" },
    date: "10/10/2023",
    views: "1.2k",
  },
  {
    category: "C#",
    categoryColor: "#F97316",
    image: "https://placehold.co/192x192",
    imageAlt: "C#",
    title: "C# Programming Guide",
    uploader: { fullName: "Tran Thi B" },
    date: "09/10/2023",
    views: "850",
  },
  {
    category: "HTML",
    categoryColor: "#22C55E",
    image: "https://placehold.co/192x192",
    imageAlt: "HTML",
    title: "Self-study HTML",
    uploader: { fullName: "Le Van C" },
    date: "08/10/2023",
    views: "2.1k",
  },
  {
    category: "Book",
    categoryColor: "#A855F7",
    image: "https://placehold.co/131x189",
    imageAlt: "IT Life",
    title: "IT Life",
    uploader: { fullName: "Pham Minh D" },
    date: "07/10/2023",
    views: "3.4k",
  },
];

const lineClampTitle = {
  display: "-webkit-box",
  WebkitLineClamp: 2,
  WebkitBoxOrient: "vertical",
  overflow: "hidden",
  lineHeight: "24px",
  minHeight: "48px",
};

export default function LatestDocuments() {
  const navigate = useNavigate();

  return (
    <div style={{ alignSelf: "stretch", display: "flex", flexDirection: "column", gap: "24px" }}>
      
      {/* HEADER */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ color: "#0F172A", fontSize: "24px", fontWeight: 700 }}>
            Latest Documents
          </div>
          <div style={{ color: "#64748B", fontSize: "14px" }}>
            Continuously updated by the community
          </div>
        </div>

        <div
          style={{ display: "flex", alignItems: "center", cursor: "pointer" }}
          onClick={() => navigate("/documents")}
        >
          <div style={{ color: "#007BFF", fontSize: "14px", fontWeight: 600 }}>
            View All
          </div>
          <div style={{ paddingLeft: "4px", color: "#007BFF" }}>
            <ChevronRightIcon size={14} />
          </div>
        </div>
      </div>

      {/* LIST */}
      <div style={{ display: "flex", gap: "24px" }}>
        {documents.map((doc) => (
          <div
            key={`${doc.title}-${getDocumentUploaderDisplayName(doc)}`}
            onClick={() => navigate(`/document/1`)}
            style={{
              flex: 1,
              background: "white",
              borderRadius: "16px",
              border: "1px solid #F1F5F9",
              display: "flex",
              flexDirection: "column",
              overflow: "hidden",
              cursor: "pointer",
            }}
          >
            {/* IMAGE */}
            <div style={{ height: "192px", position: "relative", background: "#E2E8F0", display: "flex", justifyContent: "center", alignItems: "center" }}>
              <img src={doc.image} alt={doc.imageAlt} />

              <div
                style={{
                  position: "absolute",
                  top: "10px",
                  left: "10px",
                  padding: "4px 8px",
                  background: doc.categoryColor,
                  color: "white",
                  fontSize: "10px",
                  fontWeight: 700,
                  borderRadius: "4px",
                }}
              >
                {doc.category}
              </div>
            </div>

            {/* CONTENT */}
            <div style={{ padding: "16px", display: "flex", flexDirection: "column", gap: "12px", flex: 1 }}>
              
              <div style={{ fontWeight: 700, fontSize: "16px", ...lineClampTitle }}>
                {doc.title}
              </div>

              <div style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "12px", color: "#64748B" }}>
                <img src="https://placehold.co/24x24" style={{ borderRadius: "50%" }} />
                <span>{getDocumentUploaderDisplayName(doc) || "—"}</span>
                <span>•</span>
                <span>{doc.date}</span>
              </div>

              <div style={{ marginTop: "auto", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                
                <div style={{ display: "flex", alignItems: "center", gap: "4px", fontSize: "12px", color: "#94A3B8" }}>
                  <EyeIcon size={13} />
                  {doc.views}
                </div>

                <BookmarkButton
                  isBookmarked={false}
                  onToggle={() => {}}
                  disabled
                  title="Dữ liệu mẫu — dùng trang chủ thật để lưu tài liệu"
                />
              </div>

            </div>
          </div>
        ))}
      </div>
    </div>
  );
}