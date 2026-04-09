import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { ChevronLeftIcon, ChevronRightIcon, ClockIcon, ListIcon } from "../../components/icons";
import { documentService, getApiErrorMessage } from "../../services/api";
import { useNotification } from "../../context/NotificationContext";
import "../../styles/quizListPage.css";

export default function QuizListPage() {
  const { documentId } = useParams();
  const navigate = useNavigate();
  const notification = useNotification();

  const [documentTitle, setDocumentTitle] = useState("");
  const [items, setItems] = useState([]);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [totalItems, setTotalItems] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!documentId) return;
    let cancelled = false;

    (async () => {
      setLoading(true);
      try {
        const [detail, quizPage] = await Promise.all([
          documentService.getDocumentById(documentId),
          documentService.getDocumentQuizzes(documentId, page, 10),
        ]);
        if (cancelled) return;
        setDocumentTitle(detail?.documentInfo?.title || "");
        setItems(quizPage?.items || []);
        setTotalPages(Number(quizPage?.totalPages || 0));
        setTotalItems(Number(quizPage?.totalItems || 0));
      } catch (e) {
        if (!cancelled) notification.error(getApiErrorMessage(e));
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [documentId, page, notification]);

  const canPrev = page > 0;
  const canNext = page + 1 < totalPages;

  return (
    <div className="quiz-list-page-container">
      <main className="quiz-list-page-content">
        <nav className="breadcrumb">
          <Link to="/" className="breadcrumb-item">
            Trang chủ
          </Link>
          <ChevronRightIcon size={12} color="#64748b" />
          <Link to={`/documents/${documentId}`} className="breadcrumb-item">
            Chi tiết tài liệu
          </Link>
          <ChevronRightIcon size={12} color="#64748b" />
          <span className="breadcrumb-item active">Bài đánh giá</span>
        </nav>

        <header className="quiz-list-header">
          <h1>Bài đánh giá của tài liệu</h1>
          <p>{documentTitle || "—"}</p>
        </header>

        {loading ? (
          <div className="quiz-list-loading">Đang tải bài đánh giá…</div>
        ) : items.length === 0 ? (
          <div className="quiz-list-empty">Chưa có bài đánh giá</div>
        ) : (
          <>
            <div className="quiz-list-grid">
              {items.map((quiz) => (
                <article key={quiz.quizId} className="quiz-list-card">
                  <h3>{quiz.title}</h3>
                  <p>{quiz.description || "Không có mô tả."}</p>
                  <div className="quiz-list-meta">
                    <span>
                      <ListIcon size={14} /> {quiz.totalQuestions ?? 0} câu hỏi
                    </span>
                    <span>
                      <ClockIcon size={14} /> {quiz.durationMinutes ?? "—"} phút
                    </span>
                    <span>Điểm đạt: {quiz.passScorePercent ?? 0}%</span>
                  </div>
                  <button
                    type="button"
                    className="quiz-list-preview-btn"
                    onClick={() => navigate(`/quiz/${quiz.quizId}/preview`)}
                  >
                    Xem preview
                  </button>
                </article>
              ))}
            </div>

            <div className="quiz-list-pagination">
              <div className="entries-info">
                Trang {totalPages > 0 ? page + 1 : 0} / {totalPages} • {totalItems} bài đánh giá
              </div>
              <div className="pagination-controls">
                <button
                  type="button"
                  className="page-btn"
                  disabled={!canPrev}
                  onClick={() => canPrev && setPage((p) => p - 1)}
                >
                  <ChevronLeftIcon size={12} />
                </button>
                <button className="page-btn active" type="button">
                  {totalPages > 0 ? page + 1 : 0}
                </button>
                <button
                  type="button"
                  className="page-btn"
                  disabled={!canNext}
                  onClick={() => canNext && setPage((p) => p + 1)}
                >
                  <ChevronRightIcon size={12} />
                </button>
              </div>
            </div>
          </>
        )}
      </main>
    </div>
  );
}
