import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { useAuth } from "./AuthContext";

type Overrides = Record<string, boolean>;

type BookmarkSyncContextValue = {
  resolveBookmarked: (
    documentId: string | null | undefined,
    serverIsBookmarked: boolean | null | undefined
  ) => boolean;
  setBookmarkOverride: (
    documentId: string | null | undefined,
    value: boolean
  ) => void;
};

const BookmarkSyncContext = createContext<BookmarkSyncContextValue | undefined>(
  undefined
);

export function BookmarkSyncProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isAuthenticated } = useAuth();
  const [overrides, setOverrides] = useState<Overrides>({});

  useEffect(() => {
    if (!isAuthenticated) setOverrides({});
  }, [isAuthenticated]);

  const resolveBookmarked = useCallback(
    (
      documentId: string | null | undefined,
      serverIsBookmarked: boolean | null | undefined
    ) => {
      if (documentId == null || documentId === "") {
        return Boolean(serverIsBookmarked);
      }
      const k = String(documentId);
      if (Object.prototype.hasOwnProperty.call(overrides, k)) {
        return overrides[k];
      }
      return Boolean(serverIsBookmarked);
    },
    [overrides]
  );

  const setBookmarkOverride = useCallback(
    (documentId: string | null | undefined, value: boolean) => {
      if (documentId == null || documentId === "") return;
      setOverrides((prev) => ({ ...prev, [String(documentId)]: value }));
    },
    []
  );

  const value = useMemo(
    () => ({ resolveBookmarked, setBookmarkOverride }),
    [resolveBookmarked, setBookmarkOverride]
  );

  return (
    <BookmarkSyncContext.Provider value={value}>
      {children}
    </BookmarkSyncContext.Provider>
  );
}

export function useBookmarkSync() {
  const ctx = useContext(BookmarkSyncContext);
  if (!ctx) {
    throw new Error(
      "useBookmarkSync must be used within BookmarkSyncProvider"
    );
  }
  return ctx;
}
