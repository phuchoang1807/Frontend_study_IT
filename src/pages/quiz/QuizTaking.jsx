import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useLoginRequired } from "../../context/LoginRequiredModalContext";
import { useNotification } from "../../context/NotificationContext";
import { getApiErrorMessage, quizService } from "../../services/api";
import "../../styles/quizTaking.css";

const startQuizInFlightByQuizId = new Map();

function startQuizOnce(quizId) {
  const key = String(quizId || "");
  if (!key) {
    return Promise.reject(new Error("Thiếu quizId"));
  }
  const existingPromise = startQuizInFlightByQuizId.get(key);
  if (existingPromise) {
    return existingPromise;
  }
  const requestPromise = quizService.startQuiz(key).finally(() => {
    startQuizInFlightByQuizId.delete(key);
  });
  startQuizInFlightByQuizId.set(key, requestPromise);
  return requestPromise;
}

function normalizeQuestionsFromPreview(preview) {
  const list = preview?.questions;
  if (!Array.isArray(list)) return [];
  return list.map((q, idx) => ({
    id: q.questionId,
    number: idx + 1,
    question: q.questionText ?? "",
    options: (q.options ?? []).map((o) => ({
      id: o.id,
      text: o.content ?? "",
    })),
  }));
}

export default function QuizTaking() {
  const { quizId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const notification = useNotification();
  const requestLogin = useLoginRequired();
  const { isAuthenticated, loading: authLoading } = useAuth();

  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState(null);
  const [quizTitle, setQuizTitle] = useState("");
  const [attemptId, setAttemptId] = useState(null);
  const [questions, setQuestions] = useState(null);
  const [answers, setAnswers] = useState({});
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [remainingSeconds, setRemainingSeconds] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  const submittedRef = useRef(false);
  const startedQuizRef = useRef(false);
  const answersRef = useRef({});
  const attemptIdRef = useRef(null);

  useEffect(() => {
    answersRef.current = answers;
  }, [answers]);

  useEffect(() => {
    attemptIdRef.current = attemptId;
  }, [attemptId]);

  const total = Array.isArray(questions) ? questions.length : 0;

  const answeredQuestions = useMemo(() => {
    const set = new Set();
    for (const [qid, oid] of Object.entries(answers)) {
      if (oid) set.add(qid);
    }
    return set;
  }, [answers]);

  const answeredCount = answeredQuestions.size;
  const progressPercent = total > 0 ? Math.round((answeredCount / total) * 100) : 0;

  const performSubmit = useCallback(
    async () => {
      if (submittedRef.current) return;
      const aid = attemptIdRef.current;
      if (!aid) return;
      submittedRef.current = true;
      setSubmitting(true);
      try {
        const raw = answersRef.current || {};
        const payloadAnswers = Object.entries(raw)
          .filter(([, optionId]) => optionId)
          .map(([questionId, selectedOptionId]) => ({ questionId, selectedOptionId }));
        await quizService.submitQuiz({
          attemptId: aid,
          answers: payloadAnswers,
        });
        navigate(`/quiz/result/${aid}`, {
          replace: true,
          state: {
            quizId,
            documentId: location.state?.documentId || null,
          },
        });
      } catch (e) {
        submittedRef.current = false;
        notification.error(getApiErrorMessage(e));
      } finally {
        setSubmitting(false);
      }
    },
    [location.state, navigate, notification, quizId]
  );

  useEffect(() => {
    window.scrollTo(0, 0);
    startedQuizRef.current = false;
  }, [quizId]);

  useEffect(() => {
    if (authLoading || !quizId) return;
    if (startedQuizRef.current) return;
    if (!isAuthenticated) {
      requestLogin({ redirectTo: `${location.pathname}${location.search}` });
      setLoading(false);
      return;
    }

    let cancelled = false;
    startedQuizRef.current = true;
    submittedRef.current = false;
    (async () => {
      setLoading(true);
      setLoadError(null);
      try {
        const startData = await startQuizOnce(quizId);
        console.log("startQuiz response:", startData);
        if (cancelled) return;
        const nextAttemptId = startData?.attemptId ?? null;
        if (!nextAttemptId) {
          throw new Error("Lỗi tải bài. Vui lòng thử lại");
        }
        setAttemptId(nextAttemptId);
        const previewData = await quizService.getQuizPreview(quizId);
        if (cancelled) return;

        setQuizTitle(previewData?.quizTitle || "Bài đánh giá");
        const norm = normalizeQuestionsFromPreview(previewData);
        setQuestions(norm);
        setAnswers({});
        setCurrentQuestionIndex(0);
        const mins = Number(startData?.durationMinutes ?? previewData?.duration ?? 0);
        const secs = Number.isFinite(mins) && mins > 0 ? Math.floor(mins * 60) : 0;
        setRemainingSeconds(secs);
      } catch (e) {
        if (!cancelled) {
          startedQuizRef.current = false;
          const msg = e?.message || getApiErrorMessage(e) || "Lỗi tải bài. Vui lòng thử lại";
          setLoadError(msg);
          notification.error(msg);
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [quizId, isAuthenticated, authLoading, location.pathname, location.search, requestLogin]);

  useEffect(() => {
    if (remainingSeconds === null || remainingSeconds > 0) return;
    performSubmit();
  }, [remainingSeconds, performSubmit]);

  useEffect(() => {
    if (!attemptId) return;
    const id = window.setInterval(() => {
      setRemainingSeconds((s) => {
        if (s == null || s <= 0) return 0;
        return s - 1;
      });
    }, 1000);
    return () => window.clearInterval(id);
  }, [attemptId]);

  const timerBad = remainingSeconds === null || remainingSeconds <= 0;
  const displayMinutes = timerBad ? 0 : Math.floor(remainingSeconds / 60);
  const displaySeconds = timerBad ? 0 : remainingSeconds % 60;

  const handleOptionSelect = (questionId, optionId) => {
    const idx = questions.findIndex((q) => q.id === questionId);
    if (idx >= 0) setCurrentQuestionIndex(idx);
    setAnswers((prev) => ({
      ...prev,
      [questionId]: optionId,
    }));
  };

  const scrollToQuestionIndex = (index) => {
    const q = questions[index];
    if (!q) return;
    const el = document.getElementById(`quiz-question-${q.id}`);
    el?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const handleNavClick = (index) => {
    setCurrentQuestionIndex(index);
    scrollToQuestionIndex(index);
  };

  if (authLoading) {
    return (
      <div className="quiz-taking-container">
        <div className="quiz-taking-content">
          <div className="quiz-taking-loading">Đang tải…</div>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="quiz-taking-container">
        <div className="quiz-taking-content">
          <div className="quiz-taking-loading">Vui lòng đăng nhập để làm bài.</div>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="quiz-taking-container">
        <div className="quiz-taking-content">
          <div className="quiz-taking-loading">Đang tải bài và bắt đầu lượt làm…</div>
        </div>
      </div>
    );
  }

  if (loadError) {
    return (
      <div className="quiz-taking-container">
        <div className="quiz-taking-content">
          <div className="quiz-taking-error">
            <p>{loadError}</p>
            <button type="button" className="submit-btn" onClick={() => navigate(-1)}>
              Quay lại
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (!attemptId || questions == null) {
    return (
      <div className="quiz-taking-container">
        <div className="quiz-taking-content">
          <div className="quiz-taking-error">
            <p>Lỗi tải bài. Vui lòng thử lại</p>
            <button type="button" className="submit-btn" onClick={() => navigate(-1)}>
              Quay lại
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (total === 0) {
    return (
      <div className="quiz-taking-container">
        <div className="quiz-taking-content">
          <div className="quiz-taking-error">
            <p>Bài đánh giá không có câu hỏi hoặc không tải được dữ liệu.</p>
            <button type="button" className="submit-btn" onClick={() => navigate(-1)}>
              Quay lại
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="quiz-taking-container">
      <div className="quiz-taking-content">
        <div className="quiz-header">
          <div className="quiz-title-section">
            <h1>{quizTitle}</h1>
            <div className="progress-container">
              <div className="progress-bar">
                <div className="progress-fill" style={{ width: `${progressPercent}%` }} />
              </div>
              <span className="progress-text">
                {progressPercent}% ({answeredCount}/{total} câu)
              </span>
            </div>
          </div>

          <div className="timer-card">
            <div className="timer-title">THỜI GIAN CÒN LẠI</div>
            <div className="timer-values">
              <div className="timer-box">
                <span className="timer-number">{String(displayMinutes).padStart(2, "0")}</span>
                <span className="timer-label">PHÚT</span>
              </div>
              <div className="timer-box">
                <span className="timer-number">{String(displaySeconds).padStart(2, "0")}</span>
                <span className="timer-label">GIÂY</span>
              </div>
            </div>
          </div>
        </div>

        <div className="main-content">
          <div className="questions-section">
            {questions.map((q, idx) => (
              <div key={q.id} id={`quiz-question-${q.id}`} className="question-card">
                <div className="question-header">
                  <div className="question-number">{q.number}</div>
                  <h3 className="question-text">{q.question}</h3>
                </div>

                <div className="options-list">
                  {q.options.map((option) => (
                    <label
                      key={option.id}
                      className={`option-item ${answers[q.id] === option.id ? "selected" : ""}`}
                      onClick={() => handleOptionSelect(q.id, option.id)}
                    >
                      <input
                        type="radio"
                        name={`question-${q.id}`}
                        checked={answers[q.id] === option.id}
                        onChange={() => handleOptionSelect(q.id, option.id)}
                      />
                      <span className="option-text">{option.text}</span>
                    </label>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="sidebar">
            <div className="question-list-card">
              <h3 className="sidebar-title">DANH SÁCH CÂU HỎI</h3>
              <div className="question-grid">
                {questions.map((q, idx) => {
                  const answered = answeredQuestions.has(q.id);
                  const current = idx === currentQuestionIndex;
                  const classNames = ["question-btn"];
                  if (answered) classNames.push("answered");
                  if (current) classNames.push("current");
                  return (
                    <button
                      key={q.id}
                      type="button"
                      className={classNames.join(" ")}
                      onClick={() => handleNavClick(idx)}
                    >
                      {q.number}
                    </button>
                  );
                })}
              </div>
            </div>

            <button
              type="button"
              className="submit-btn"
              disabled={submitting}
              onClick={() => performSubmit()}
            >
              {submitting ? "Đang nộp…" : "Nộp bài"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
