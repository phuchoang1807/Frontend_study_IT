import { useEffect, useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useNotification } from "../context/NotificationContext";
import {
  BookmarkIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  DocumentIcon,
  EyeIcon,
  GlobeIcon,
  ShieldIcon,
  UsersIcon,
} from "./icons";
import {
  documentService,
  getApiErrorMessage,
  requireAuthOrPrompt,
  sidebarService,
} from "../services/api";

const SORT_OPTIONS = [
  { label: "Popular", value: "popular" },
  { label: "Newest", value: "newest" },
];

const CARD_POSITIONS = [
  { left: 0, top: 0 },
  { left: "492px", top: 0 },
  { left: 0, top: "248.50px" },
  { left: "492px", top: "248.50px" },
];

function formatDateDDMMYYYY(iso) {
  if (!iso) return "";
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return "";
  const dd = String(d.getDate()).padStart(2, "0");
  const mm = String(d.getMonth() + 1).padStart(2, "0");
  const yyyy = d.getFullYear();
  return `${dd}/${mm}/${yyyy}`;
}

function formatCompactNumber(value) {
  const n = Number(value ?? 0);
  if (Number.isNaN(n)) return "0";
  return new Intl.NumberFormat("en", { notation: "compact" }).format(n);
}

function fileTypeBadge(fileType) {
  const t = String(fileType || "").toUpperCase();
  if (t === "PDF") return { bg: "#EF4444", label: "PDF" };
  if (t === "DOC") return { bg: "#3B82F6", label: "DOC" };
  if (t === "PPTX") return { bg: "#F59E0B", label: "PPTX" };
  return { bg: "#64748B", label: t || "FILE" };
}

function buildSearchParams({ keyword, categoryId, tagIds, sort, page, size }) {
  const sp = new URLSearchParams();
  if (keyword) sp.set("keyword", keyword);
  if (categoryId) sp.set("categoryId", categoryId);
  (tagIds || []).forEach((id) => sp.append("tagIds", id));
  if (sort) sp.set("sort", sort);
  if (typeof page === "number") sp.set("page", String(page));
  if (typeof size === "number") sp.set("size", String(size));
  return sp;
}

function computePageItems(currentPage, totalPages) {
  // 1-based for UI
  if (totalPages <= 7) {
    return Array.from({ length: totalPages }, (_, i) => ({ type: "page", page: i + 1 }));
  }

  const items = [];
  const addPage = (p) => items.push({ type: "page", page: p });
  const addDots = () => items.push({ type: "dots" });

  addPage(1);
  const start = Math.max(2, currentPage - 1);
  const end = Math.min(totalPages - 1, currentPage + 1);

  if (start > 2) addDots();
  for (let p = start; p <= end; p += 1) addPage(p);
  if (end < totalPages - 1) addDots();
  addPage(totalPages);

  return items;
}

export default function DocumentsList() {
  const navigate = useNavigate();
  const location = useLocation();
  const { isAuthenticated } = useAuth();
  const notification = useNotification();

  const query = useMemo(() => new URLSearchParams(location.search), [location.search]);
  const initialKeyword = (query.get("keyword") || "").trim();
  const initialSort = query.get("sort") || "newest";
  const initialCategoryId = query.get("categoryId") || "";
  const initialTagIds = query.getAll("tagIds");
  const initialPage = Number(query.get("page") ?? "0");
  const initialSize = Number(query.get("size") ?? "4");

  const size = Number.isFinite(initialSize) && initialSize > 0 ? initialSize : 4;

  // Sidebar data
  const [categories, setCategories] = useState([]);
  const [tags, setTags] = useState([]);
  const [sidebarLoading, setSidebarLoading] = useState(false);
  const [sidebarError, setSidebarError] = useState(null);

  // Pending filters (user selects but not yet applied)
  const [pendingCategoryId, setPendingCategoryId] = useState(initialCategoryId);
  const [pendingTagIds, setPendingTagIds] = useState(new Set(initialTagIds));
  const [pendingSort, setPendingSort] = useState(
    SORT_OPTIONS.some((o) => o.value === initialSort) ? initialSort : "newest"
  );
  const [isSortOpen, setIsSortOpen] = useState(false);

  // Applied filters (used for API)
  const [appliedKeyword, setAppliedKeyword] = useState(initialKeyword);
  const [appliedCategoryId, setAppliedCategoryId] = useState(initialCategoryId);
  const [appliedTagIds, setAppliedTagIds] = useState(initialTagIds);
  const [appliedSort, setAppliedSort] = useState(
    SORT_OPTIONS.some((o) => o.value === initialSort) ? initialSort : "newest"
  );
  const [page, setPage] = useState(Number.isFinite(initialPage) && initialPage >= 0 ? initialPage : 0);

  // Documents data
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [documents, setDocuments] = useState([]);
  const [totalPages, setTotalPages] = useState(1);

  const isSearchMode = !!appliedKeyword;

  useEffect(() => {
    let cancelled = false;
    async function loadSidebar() {
      try {
        setSidebarLoading(true);
        setSidebarError(null);
        const [c, t] = await Promise.all([
          sidebarService.getCategories(),
          sidebarService.getPopularTags(),
        ]);
        if (cancelled) return;
        setCategories(Array.isArray(c) ? c : []);
        setTags(Array.isArray(t) ? t : []);
      } catch (e) {
        if (!cancelled) setSidebarError(getApiErrorMessage(e));
      } finally {
        if (!cancelled) setSidebarLoading(false);
      }
    }
    loadSidebar();
    return () => {
      cancelled = true;
    };
  }, []);

  async function fetchDocuments({
    nextPage,
    keyword = appliedKeyword,
    categoryId = appliedCategoryId,
    tagIds = appliedTagIds,
    sort = appliedSort,
  }) {
    try {
      setLoading(true);
      setError(null);
      const payload = await documentService.getDocuments({
        keyword: keyword || undefined,
        categoryId: categoryId || undefined,
        tagIds: tagIds?.length ? tagIds : undefined,
        sort: sort || undefined,
        page: nextPage,
        size,
      });

      // openapi: ApiResponsePagedDocumentCard.data = { content, page, size, totalElements, totalPages }
      const content = Array.isArray(payload?.content) ? payload.content : [];
      setDocuments(content);
      setTotalPages(Number(payload?.totalPages) || 1);
      setPage(Number(payload?.page) || 0);
    } catch (e) {
      const msg = getApiErrorMessage(e);
      setError(msg);
      notification.error(msg);
      setDocuments([]);
      setTotalPages(1);
    } finally {
      setLoading(false);
    }
  }

  // Initial load: if we arrive with keyword or sort/page params, fetch immediately.
  useEffect(() => {
    fetchDocuments({ nextPage: page });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Keep state & data in sync with URL changes (e.g. header search on /documents)
  useEffect(() => {
    const sp = new URLSearchParams(location.search);
    const nextKeyword = (sp.get("keyword") || "").trim();
    const nextSort = sp.get("sort") || "newest";
    const nextCategoryId = sp.get("categoryId") || "";
    const nextTagIds = sp.getAll("tagIds");
    const nextPageRaw = Number(sp.get("page") ?? "0");
    const nextPage = Number.isFinite(nextPageRaw) && nextPageRaw >= 0 ? nextPageRaw : 0;
    const normalizedSort = SORT_OPTIONS.some((o) => o.value === nextSort) ? nextSort : "newest";

    setPendingCategoryId(nextCategoryId);
    setPendingTagIds(new Set(nextTagIds));
    setPendingSort(normalizedSort);

    setAppliedKeyword(nextKeyword);
    setAppliedCategoryId(nextCategoryId);
    setAppliedTagIds(nextTagIds);
    setAppliedSort(normalizedSort);
    setPage(nextPage);

    fetchDocuments({
      nextPage,
      keyword: nextKeyword,
      categoryId: nextCategoryId,
      tagIds: nextTagIds,
      sort: normalizedSort,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.search]);

  function applyFilters() {
    const nextTagIds = Array.from(pendingTagIds);
    setAppliedCategoryId(pendingCategoryId);
    setAppliedTagIds(nextTagIds);
    setAppliedSort(pendingSort);
    setPage(0);

    const sp = buildSearchParams({
      keyword: appliedKeyword || undefined,
      categoryId: pendingCategoryId || undefined,
      tagIds: nextTagIds,
      sort: pendingSort,
      page: 0,
      size,
    });
    navigate({ pathname: "/documents", search: `?${sp.toString()}` }, { replace: false });

    fetchDocuments({
      nextPage: 0,
      keyword: appliedKeyword,
      categoryId: pendingCategoryId,
      tagIds: nextTagIds,
      sort: pendingSort,
    });
  }

  function goToPage(uiPage) {
    const nextPage = Math.max(0, Math.min(totalPages - 1, uiPage - 1));
    const sp = buildSearchParams({
      keyword: appliedKeyword || undefined,
      categoryId: appliedCategoryId || undefined,
      tagIds: appliedTagIds || [],
      sort: appliedSort,
      page: nextPage,
      size,
    });
    navigate({ pathname: "/documents", search: `?${sp.toString()}` }, { replace: false });
    fetchDocuments({
      nextPage,
      keyword: appliedKeyword,
      categoryId: appliedCategoryId,
      tagIds: appliedTagIds,
      sort: appliedSort,
    });
  }

  async function handleToggleBookmark(doc) {
    const ok = requireAuthOrPrompt({
      isAuthenticated,
      navigate,
      redirectTo: location.pathname + location.search,
    });
    if (!ok) return;

    try {
      const nextIsBookmarked = !doc.isBookmarked;
      setDocuments((prev) =>
        prev.map((d) => (d.id === doc.id ? { ...d, isBookmarked: nextIsBookmarked } : d))
      );
      if (nextIsBookmarked) {
        await documentService.bookmark(doc.id);
      } else {
        await documentService.unbookmark(doc.id);
      }
    } catch (e) {
      const msg = getApiErrorMessage(e);
      setError(msg);
      notification.error(msg);
      // rollback by refetching current page
      fetchDocuments({ nextPage: page });
    }
  }

  async function handleDownload(doc) {
    const ok = requireAuthOrPrompt({
      isAuthenticated,
      navigate,
      redirectTo: location.pathname + location.search,
    });
    if (!ok) return;

    try {
      await documentService.download(doc.id);
      setDocuments((prev) =>
        prev.map((d) =>
          d.id === doc.id
            ? { ...d, downloadCount: Number(d.downloadCount || 0) + 1 }
            : d
        )
      );
    } catch (e) {
      const msg = getApiErrorMessage(e);
      setError(msg);
      notification.error(msg);
    }
  }

  async function handleView(doc) {
    try {
      await documentService.view(doc.id);
      setDocuments((prev) =>
        prev.map((d) =>
          d.id === doc.id ? { ...d, viewCount: Number(d.viewCount || 0) + 1 } : d
        )
      );
    } catch {
      // ignore view errors
    }
  }

  const title = isSearchMode ? "Kết quả tìm kiếm" : "Danh sách tài liệu";
  const subtitle = isSearchMode
    ? "Kết quả tìm kiếm của bạn"
    : "Search and download more than 10,000 high-quality IT learning documents.";

  const sortLabel = SORT_OPTIONS.find((o) => o.value === pendingSort)?.label || "Newest";
  const pageItems = computePageItems(page + 1, totalPages);

  const categoryRows = useMemo(() => {
    const rows = [{ id: "", name: "All" }, ...(categories || [])];
    const icons = [GlobeIcon, UsersIcon, EyeIcon, DocumentIcon, ShieldIcon];
    return rows.map((c, idx) => ({
      ...c,
      Icon: icons[idx % icons.length],
    }));
  }, [categories]);

  return (
    <div
      style={{
        width: "100%",
        minHeight: "100vh",
        background: "#F5F7F8",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "1280px",
          margin: "0 auto",
          paddingTop: "32px",
          paddingBottom: "32px",
          paddingLeft: "16px",
          paddingRight: "16px",
          boxSizing: "border-box",
          justifyContent: "center",
          alignItems: "flex-start",
          gap: "32px",
          display: "flex",
        }}
      >
        {/* Sidebar */}
        <div
          style={{
            width: "272px",
            height: "721px",
            transform: "translateX(-42px)",
            paddingLeft: "11px",
            paddingRight: "11px",
            position: "relative",
            background: "white",
            borderBottomRightRadius: "10px",
            borderBottomLeftRadius: "10px",
            flexDirection: "column",
            justifyContent: "flex-start",
            alignItems: "flex-start",
            display: "inline-flex",
          }}
        >
          <div
            style={{
              alignSelf: "stretch",
              paddingTop: "10px",
              flexDirection: "column",
              justifyContent: "flex-start",
              alignItems: "flex-start",
              gap: "24px",
              display: "flex",
            }}
          >
            <div
              style={{
                alignSelf: "stretch",
                justifyContent: "flex-start",
                alignItems: "center",
                gap: "8px",
                display: "inline-flex",
              }}
            >
              <div style={{ flexDirection: "column", justifyContent: "flex-start", alignItems: "flex-start", display: "inline-flex" }}>
                <DocumentIcon size={18} color="#007BFF" />
              </div>
              <div style={{ flexDirection: "column", justifyContent: "flex-start", alignItems: "flex-start", display: "inline-flex" }}>
                <div
                  style={{
                    width: "132.61px",
                    height: "28px",
                    justifyContent: "center",
                    display: "flex",
                    flexDirection: "column",
                    color: "#0F172A",
                    fontSize: "18px",
                    fontFamily: "Inter",
                    fontWeight: 700,
                    lineHeight: "28px",
                  }}
                >
                  Search Filters
                </div>
              </div>
            </div>

            {/* Categories */}
            <div
              style={{
                alignSelf: "stretch",
                flexDirection: "column",
                justifyContent: "flex-start",
                alignItems: "flex-start",
                gap: "12px",
                display: "flex",
              }}
            >
              <div
                style={{
                  alignSelf: "stretch",
                  flexDirection: "column",
                  justifyContent: "flex-start",
                  alignItems: "flex-start",
                  display: "flex",
                }}
              >
                <div
                  style={{
                    alignSelf: "stretch",
                    justifyContent: "center",
                    display: "flex",
                    flexDirection: "column",
                    color: "#94A3B8",
                    fontSize: "12px",
                    fontFamily: "Inter",
                    fontWeight: 700,
                    textTransform: "uppercase",
                    lineHeight: "16px",
                    letterSpacing: "0.60px",
                  }}
                >
                  IT Fields
                </div>
              </div>

              {sidebarError ? (
                <div style={{ color: "#EF4444", fontSize: "12px" }}>{sidebarError}</div>
              ) : (
                <div
                  style={{
                    alignSelf: "stretch",
                    flexDirection: "column",
                    justifyContent: "flex-start",
                    alignItems: "flex-start",
                    gap: "4px",
                    display: "flex",
                    opacity: sidebarLoading ? 0.6 : 1,
                  }}
                >
                  {categoryRows.map((c) => {
                    const selected = pendingCategoryId === c.id;
                    const Icon = c.Icon;
                    return (
                      <button
                        key={c.id || "all"}
                        type="button"
                        onClick={() => setPendingCategoryId(c.id)}
                        style={{
                          width: "100%",
                          alignSelf: "stretch",
                          paddingLeft: "12px",
                          paddingRight: "12px",
                          paddingTop: "8px",
                          paddingBottom: "8px",
                          background: selected ? "rgba(0, 123, 255, 0.10)" : "transparent",
                          borderRadius: "8px",
                          justifyContent: "flex-start",
                          alignItems: "center",
                          gap: "12px",
                          display: "inline-flex",
                          border: "none",
                          cursor: "pointer",
                        }}
                      >
                        <div style={{ flexDirection: "column", justifyContent: "flex-start", alignItems: "flex-start", display: "inline-flex" }}>
                          <Icon size={15} color={selected ? "#007BFF" : "#94A3B8"} />
                        </div>
                        <div style={{ flexDirection: "column", justifyContent: "flex-start", alignItems: "flex-start", display: "inline-flex" }}>
                          <div
                            style={{
                              width: "200px",
                              height: "20px",
                              justifyContent: "center",
                              display: "flex",
                              flexDirection: "column",
                              color: selected ? "#007BFF" : "#0F172A",
                              fontSize: "14px",
                              fontFamily: "Inter",
                              fontWeight: 500,
                              lineHeight: "20px",
                              textAlign: "left",
                              overflow: "hidden",
                              textOverflow: "ellipsis",
                              whiteSpace: "nowrap",
                            }}
                          >
                            {c.name}
                          </div>
                        </div>
                      </button>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Popular Tags */}
            <div
              style={{
                alignSelf: "stretch",
                flexDirection: "column",
                justifyContent: "flex-start",
                alignItems: "flex-start",
                gap: "12px",
                display: "flex",
              }}
            >
              <div
                style={{
                  alignSelf: "stretch",
                  flexDirection: "column",
                  justifyContent: "flex-start",
                  alignItems: "flex-start",
                  display: "flex",
                }}
              >
                <div
                  style={{
                    alignSelf: "stretch",
                    justifyContent: "center",
                    display: "flex",
                    flexDirection: "column",
                    color: "#94A3B8",
                    fontSize: "12px",
                    fontFamily: "Inter",
                    fontWeight: 700,
                    textTransform: "uppercase",
                    lineHeight: "16px",
                    letterSpacing: "0.60px",
                  }}
                >
                  Popular Tags
                </div>
              </div>

              <div
                style={{
                  alignSelf: "stretch",
                  minHeight: "120px",
                  display: "flex",
                  flexWrap: "wrap",
                  gap: "8px",
                  opacity: sidebarLoading ? 0.6 : 1,
                }}
              >
                {(tags || []).map((tag) => {
                  const selected = pendingTagIds.has(tag.id);
                  return (
                    <button
                      key={tag.id}
                      type="button"
                      onClick={() => {
                        setPendingTagIds((prev) => {
                          const next = new Set(prev);
                          if (next.has(tag.id)) next.delete(tag.id);
                          else next.add(tag.id);
                          return next;
                        });
                      }}
                      style={{
                        height: "24px",
                        paddingLeft: "8px",
                        paddingRight: "8px",
                        paddingTop: "4px",
                        paddingBottom: "4px",
                        background: selected ? "rgba(0, 123, 255, 0.10)" : "#F1F5F9",
                        borderRadius: "4px",
                        border: "none",
                        cursor: "pointer",
                      }}
                    >
                      <div
                        style={{
                          height: "16px",
                          justifyContent: "center",
                          display: "flex",
                          flexDirection: "column",
                          color: selected ? "#007BFF" : "#0F172A",
                          fontSize: "12px",
                          fontFamily: "Inter",
                          fontWeight: 500,
                          lineHeight: "16px",
                        }}
                      >
                        {tag.name}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Sort */}
            <div
              style={{
                alignSelf: "stretch",
                flexDirection: "column",
                justifyContent: "flex-start",
                alignItems: "flex-start",
                gap: "12px",
                display: "flex",
                position: "relative",
              }}
            >
              <div style={{ color: "#94A3B8", fontSize: "12px", fontFamily: "Inter", fontWeight: 700, textTransform: "uppercase", lineHeight: "16px", letterSpacing: "0.60px" }}>
                Sort By
              </div>

              <button
                type="button"
                onClick={() => setIsSortOpen((prev) => !prev)}
                style={{
                  width: "100%",
                  height: "36px",
                  border: "none",
                  background: "#F1F5F9",
                  borderRadius: "8px",
                  padding: "8px 12px",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  color: "#0F172A",
                  fontSize: "14px",
                  fontFamily: "Inter",
                  cursor: "pointer",
                }}
              >
                <span>{sortLabel}</span>
                <span style={{ color: "#6B7280" }}>{isSortOpen ? "▴" : "▾"}</span>
              </button>

              {isSortOpen && (
                <div
                  style={{
                    width: "100%",
                    background: "#FFFFFF",
                    borderRadius: "8px",
                    outline: "1px solid #E2E8F0",
                    boxShadow: "0px 8px 10px -6px rgba(0,0,0,0.10), 0px 20px 25px -5px rgba(0,0,0,0.10)",
                    overflow: "hidden",
                  }}
                >
                  {SORT_OPTIONS.map((option) => (
                    <button
                      key={option.value}
                      type="button"
                      onClick={() => {
                        setPendingSort(option.value);
                        setIsSortOpen(false);
                      }}
                      style={{
                        width: "100%",
                        border: "none",
                        background: option.value === pendingSort ? "rgba(0, 123, 255, 0.10)" : "#FFFFFF",
                        color: option.value === pendingSort ? "#007BFF" : "#0F172A",
                        textAlign: "left",
                        padding: "8px 16px",
                        fontSize: "14px",
                        lineHeight: "20px",
                        fontFamily: "Inter",
                        cursor: "pointer",
                      }}
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Filter button */}
            <button
              type="button"
              onClick={applyFilters}
              style={{
                width: "100%",
                height: "40px",
                border: "none",
                background: "#007BFF",
                borderRadius: "10px",
                color: "white",
                fontSize: "14px",
                fontFamily: "Inter",
                fontWeight: 700,
                cursor: "pointer",
                boxShadow:
                  "0px 4px 6px -4px rgba(0,123,255,0.25), 0px 10px 15px -3px rgba(0,123,255,0.25)",
              }}
            >
              Lọc
            </button>
          </div>
        </div>

        {/* Main content */}
        <div style={{ flex: "1 1 0", maxWidth: "936px", alignSelf: "stretch", flexDirection: "column", justifyContent: "flex-start", alignItems: "center", gap: "32px", display: "inline-flex" }}>
          {/* Breadcrumb + Title */}
          <div
            style={{
              alignSelf: "stretch",
              paddingTop: "18px",
              flexDirection: "column",
              justifyContent: "flex-start",
              alignItems: "flex-start",
              gap: "8px",
              display: "flex",
            }}
          >
            <div
              style={{
                alignSelf: "stretch",
                justifyContent: "flex-start",
                alignItems: "center",
                gap: "8px",
                display: "inline-flex",
              }}
            >
              <div style={{ flexDirection: "column", justifyContent: "flex-start", alignItems: "flex-start", display: "inline-flex" }}>
                <div
                  style={{
                    width: "66.73px",
                    height: "20px",
                    justifyContent: "center",
                    display: "flex",
                    flexDirection: "column",
                    color: "#64748B",
                    fontSize: "14px",
                    fontFamily: "Inter",
                    fontWeight: 400,
                    lineHeight: "20px",
                  }}
                >
                  Home
                </div>
              </div>
              <div style={{ display: "inline-flex", alignItems: "center" }}>
                <ChevronRightIcon size={12} color="#64748B" />
              </div>
              <div style={{ flexDirection: "column", justifyContent: "flex-start", alignItems: "flex-start", display: "inline-flex" }}>
                <div
                  style={{
                    width: "200px",
                    height: "20px",
                    justifyContent: "center",
                    display: "flex",
                    flexDirection: "column",
                    color: "#0F172A",
                    fontSize: "14px",
                    fontFamily: "Inter",
                    fontWeight: 500,
                    lineHeight: "20px",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                  }}
                >
                  {title}
                </div>
              </div>
            </div>

            <div style={{ alignSelf: "stretch", flexDirection: "column", justifyContent: "flex-start", alignItems: "flex-start", display: "flex" }}>
              <div
                style={{
                  alignSelf: "stretch",
                  justifyContent: "center",
                  display: "flex",
                  flexDirection: "column",
                  color: "#0F172A",
                  fontSize: "30px",
                  fontFamily: "Inter",
                  fontWeight: 700,
                  lineHeight: "36px",
                }}
              >
                {title}
              </div>
            </div>

            <div style={{ alignSelf: "stretch", flexDirection: "column", justifyContent: "flex-start", alignItems: "flex-start", display: "flex" }}>
              <div
                style={{
                  alignSelf: "stretch",
                  justifyContent: "center",
                  display: "flex",
                  flexDirection: "column",
                  color: "#64748B",
                  fontSize: "16px",
                  fontFamily: "Inter",
                  fontWeight: 400,
                  lineHeight: "24px",
                }}
              >
                {subtitle}
              </div>
            </div>

            {isSearchMode && (
              <div style={{ color: "#94A3B8", fontSize: "12px", fontFamily: "Inter", fontWeight: 500 }}>
                Keyword: <span style={{ color: "#0F172A" }}>{appliedKeyword}</span>
              </div>
            )}
          </div>

          {error && (
            <div style={{ width: "100%", color: "#EF4444", fontSize: "14px" }}>{error}</div>
          )}

          {/* Cards grid (fixed layout 2x2) */}
          <div style={{ width: "100%", maxWidth: "936px", height: "473px", position: "relative", opacity: loading ? 0.7 : 1 }}>
            {(documents || []).slice(0, 4).map((doc, idx) => {
              const pos = CARD_POSITIONS[idx] || CARD_POSITIONS[0];
              const badge = fileTypeBadge(doc.fileType);
              return (
                <div
                  key={doc.id}
                  role="button"
                  tabIndex={0}
                  onClick={() => handleView(doc)}
                  onKeyDown={(e) => e.key === "Enter" && handleView(doc)}
                  style={{
                    width: "452px",
                    left: pos.left,
                    top: pos.top,
                    position: "absolute",
                    background: "white",
                    overflow: "hidden",
                    borderRadius: "12px",
                    outline: "1px solid #E2E8F0",
                    outlineOffset: "-1px",
                    justifyContent: "flex-start",
                    alignItems: "flex-start",
                    display: "inline-flex",
                    cursor: "pointer",
                  }}
                >
                  <div
                    style={{
                      width: "160px",
                      alignSelf: "stretch",
                      position: "relative",
                      background: "#F1F5F9",
                      justifyContent: "center",
                      alignItems: "center",
                      display: "flex",
                    }}
                  >
                    {doc.thumbnail ? (
                      <img src={doc.thumbnail} alt={doc.title || "thumbnail"} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                    ) : (
                      <div style={{ width: "32px", height: "40px", background: "rgba(0, 123, 255, 0.40)" }} />
                    )}

                    <div
                      style={{
                        paddingLeft: "8px",
                        paddingRight: "8px",
                        paddingTop: "4px",
                        paddingBottom: "4px",
                        left: "8px",
                        top: "8px",
                        position: "absolute",
                        background: badge.bg,
                        borderRadius: "4px",
                        flexDirection: "column",
                        justifyContent: "flex-start",
                        alignItems: "flex-start",
                        display: "inline-flex",
                      }}
                    >
                      <div
                        style={{
                          height: "15px",
                          justifyContent: "center",
                          display: "flex",
                          flexDirection: "column",
                          color: "white",
                          fontSize: "10px",
                          fontFamily: "Inter",
                          fontWeight: 700,
                          textTransform: "uppercase",
                          lineHeight: "15px",
                        }}
                      >
                        {badge.label}
                      </div>
                    </div>
                  </div>

                  <div
                    style={{
                      flex: "1 1 0",
                      alignSelf: "stretch",
                      padding: "20px",
                      flexDirection: "column",
                      justifyContent: "space-between",
                      alignItems: "flex-start",
                      display: "inline-flex",
                    }}
                  >
                    <div
                      style={{
                        alignSelf: "stretch",
                        paddingBottom: "16px",
                        flexDirection: "column",
                        justifyContent: "flex-start",
                        alignItems: "flex-start",
                        gap: "8px",
                        display: "flex",
                      }}
                    >
                      <div
                        style={{
                          alignSelf: "stretch",
                          justifyContent: "space-between",
                          alignItems: "center",
                          display: "inline-flex",
                        }}
                      >
                        <div
                          style={{
                            paddingLeft: "8px",
                            paddingRight: "8px",
                            paddingTop: "4px",
                            paddingBottom: "4px",
                            background: "rgba(0, 123, 255, 0.10)",
                            borderRadius: "4px",
                            flexDirection: "column",
                            justifyContent: "flex-start",
                            alignItems: "flex-start",
                            display: "inline-flex",
                            maxWidth: "190px",
                          }}
                        >
                          <div
                            style={{
                              height: "16px",
                              justifyContent: "center",
                              display: "flex",
                              flexDirection: "column",
                              color: "#007BFF",
                              fontSize: "12px",
                              fontFamily: "Inter",
                              fontWeight: 600,
                              lineHeight: "16px",
                              overflow: "hidden",
                              textOverflow: "ellipsis",
                              whiteSpace: "nowrap",
                            }}
                          >
                            {doc.categoryName || "Unknown"}
                          </div>
                        </div>

                        <div style={{ flexDirection: "column", justifyContent: "flex-start", alignItems: "flex-start", display: "inline-flex" }}>
                          <div
                            style={{
                              width: "90px",
                              height: "16px",
                              justifyContent: "center",
                              display: "flex",
                              flexDirection: "column",
                              color: "#94A3B8",
                              fontSize: "12px",
                              fontFamily: "Inter",
                              fontWeight: 400,
                              lineHeight: "16px",
                              textAlign: "right",
                            }}
                          >
                            {formatDateDDMMYYYY(doc.createdAt)}
                          </div>
                        </div>
                      </div>

                      <div style={{ alignSelf: "stretch", height: "49.50px", position: "relative", overflow: "hidden" }}>
                        <div
                          style={{
                            width: "266px",
                            height: "50px",
                            left: 0,
                            top: 0,
                            position: "absolute",
                            justifyContent: "center",
                            display: "flex",
                            flexDirection: "column",
                            color: "#0F172A",
                            fontSize: "17px",
                            fontFamily: "Inter",
                            fontWeight: 700,
                            lineHeight: "24.75px",
                          }}
                        >
                          {doc.title}
                        </div>
                      </div>

                      <div style={{ alignSelf: "stretch", justifyContent: "flex-start", alignItems: "center", gap: "4px", display: "inline-flex" }}>
                        <div style={{ flexDirection: "column", justifyContent: "flex-start", alignItems: "flex-start", display: "inline-flex" }}>
                          <UsersIcon size={12} color="#64748B" />
                        </div>
                        <div
                          style={{
                            width: "220px",
                            height: "20px",
                            justifyContent: "center",
                            display: "flex",
                            flexDirection: "column",
                            color: "#64748B",
                            fontSize: "14px",
                            fontFamily: "Inter",
                            fontWeight: 400,
                            lineHeight: "20px",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            whiteSpace: "nowrap",
                          }}
                        >
                          {doc.authorName || "Unknown"}
                        </div>
                      </div>
                    </div>

                    <div
                      style={{
                        alignSelf: "stretch",
                        paddingTop: "16px",
                        borderTop: "1px solid #F1F5F9",
                        justifyContent: "space-between",
                        alignItems: "center",
                        display: "inline-flex",
                      }}
                    >
                      <div style={{ justifyContent: "flex-start", alignItems: "flex-start", gap: "16px", display: "flex" }}>
                        <div style={{ alignSelf: "stretch", justifyContent: "flex-start", alignItems: "center", gap: "4px", display: "flex" }}>
                          <div style={{ flexDirection: "column", justifyContent: "flex-start", alignItems: "flex-start", display: "inline-flex" }}>
                            <EyeIcon size={14} color="#64748B" />
                          </div>
                          <div style={{ flexDirection: "column", justifyContent: "flex-start", alignItems: "flex-start", display: "inline-flex" }}>
                            <div
                              style={{
                                width: "60px",
                                height: "16px",
                                justifyContent: "center",
                                display: "flex",
                                flexDirection: "column",
                                color: "#64748B",
                                fontSize: "12px",
                                fontFamily: "Inter",
                                fontWeight: 500,
                                lineHeight: "16px",
                              }}
                            >
                              {formatCompactNumber(doc.viewCount)}
                            </div>
                          </div>
                        </div>

                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDownload(doc);
                          }}
                          style={{
                            alignSelf: "stretch",
                            justifyContent: "flex-start",
                            alignItems: "center",
                            gap: "4px",
                            display: "flex",
                            border: "none",
                            background: "transparent",
                            cursor: "pointer",
                            padding: 0,
                          }}
                          title="Download"
                        >
                          <div style={{ flexDirection: "column", justifyContent: "flex-start", alignItems: "flex-start", display: "inline-flex" }}>
                            <UsersIcon size={12} color="#64748B" />
                          </div>
                          <div style={{ flexDirection: "column", justifyContent: "flex-start", alignItems: "flex-start", display: "inline-flex" }}>
                            <div
                              style={{
                                width: "60px",
                                height: "16px",
                                justifyContent: "center",
                                display: "flex",
                                flexDirection: "column",
                                color: "#64748B",
                                fontSize: "12px",
                                fontFamily: "Inter",
                                fontWeight: 500,
                                lineHeight: "16px",
                              }}
                            >
                              {formatCompactNumber(doc.downloadCount)}
                            </div>
                          </div>
                        </button>
                      </div>

                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleToggleBookmark(doc);
                        }}
                        style={{
                          padding: "8px",
                          borderRadius: "8px",
                          justifyContent: "center",
                          alignItems: "center",
                          display: "flex",
                          border: "none",
                          background: "transparent",
                          cursor: "pointer",
                        }}
                        title={doc.isBookmarked ? "Remove bookmark" : "Bookmark"}
                      >
                        <div style={{ flexDirection: "column", justifyContent: "flex-start", alignItems: "center", display: "inline-flex" }}>
                          <BookmarkIcon size={16} color={doc.isBookmarked ? "#007BFF" : "#94A3B8"} />
                        </div>
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}

            {!loading && documents.length === 0 && (
              <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", color: "#94A3B8" }}>
                No documents found.
              </div>
            )}
          </div>

          {/* Pagination */}
          <div
            style={{
              alignSelf: "stretch",
              paddingTop: "16px",
              justifyContent: "center",
              alignItems: "center",
              gap: "8px",
              display: "inline-flex",
              opacity: loading ? 0.6 : 1,
            }}
          >
            <button
              type="button"
              disabled={page <= 0 || loading}
              onClick={() => goToPage(page)}
              style={{
                width: "40px",
                height: "40px",
                borderRadius: "8px",
                outline: "1px solid #E2E8F0",
                outlineOffset: "-1px",
                justifyContent: "center",
                alignItems: "center",
                display: "flex",
                border: "none",
                background: "white",
                cursor: page > 0 && !loading ? "pointer" : "not-allowed",
              }}
            >
              <div style={{ flexDirection: "column", justifyContent: "flex-start", alignItems: "center", display: "inline-flex" }}>
                <ChevronLeftIcon size={14} color="#0F172A" />
              </div>
            </button>

            {pageItems.map((it, idx) => {
              if (it.type === "dots") {
                return (
                  <div key={`dots-${idx}`} style={{ paddingLeft: "8px", paddingRight: "8px", flexDirection: "column", justifyContent: "flex-start", alignItems: "flex-start", display: "inline-flex" }}>
                    <div
                      style={{
                        width: "13.83px",
                        height: "24px",
                        justifyContent: "center",
                        display: "flex",
                        flexDirection: "column",
                        color: "#94A3B8",
                        fontSize: "16px",
                        fontFamily: "Inter",
                        fontWeight: 400,
                        lineHeight: "24px",
                      }}
                    >
                      ...
                    </div>
                  </div>
                );
              }

              const active = it.page === page + 1;
              return (
                <button
                  key={`page-${it.page}`}
                  type="button"
                  disabled={loading}
                  onClick={() => goToPage(it.page)}
                  style={{
                    width: "40px",
                    height: "40px",
                    background: active ? "#007BFF" : "transparent",
                    borderRadius: "8px",
                    justifyContent: "center",
                    alignItems: "center",
                    display: "flex",
                    outline: active ? "none" : "1px solid #E2E8F0",
                    outlineOffset: "-1px",
                    border: "none",
                    cursor: loading ? "not-allowed" : "pointer",
                  }}
                >
                  <div
                    style={{
                      width: "16px",
                      height: "24px",
                      textAlign: "center",
                      justifyContent: "center",
                      display: "flex",
                      flexDirection: "column",
                      color: active ? "white" : "#0F172A",
                      fontSize: "16px",
                      fontFamily: "Inter",
                      fontWeight: active ? 700 : 400,
                      lineHeight: "24px",
                    }}
                  >
                    {it.page}
                  </div>
                </button>
              );
            })}

            <button
              type="button"
              disabled={page >= totalPages - 1 || loading}
              onClick={() => goToPage(page + 2)}
              style={{
                width: "40px",
                height: "40px",
                borderRadius: "8px",
                outline: "1px solid #E2E8F0",
                outlineOffset: "-1px",
                justifyContent: "center",
                alignItems: "center",
                display: "flex",
                border: "none",
                background: "white",
                cursor: page < totalPages - 1 && !loading ? "pointer" : "not-allowed",
              }}
            >
              <div style={{ flexDirection: "column", justifyContent: "flex-start", alignItems: "center", display: "inline-flex" }}>
                <ChevronRightIcon size={14} color="#0F172A" />
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

