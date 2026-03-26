import { createBrowserRouter } from "react-router-dom";

import AuthLayout from "../layouts/AuthLayout";

import SignIn from "../pages/auth/SignIn";
import SignUp from "../pages/auth/SignUp";
import ForgotPassword from "../pages/auth/ForgotPassword";

import ProtectedRoute from "./ProtectedRoute";
import GuestRoute from "./GuestRoute";
import Home from "../pages/home/Home";
import DocumentsList from "../components/DocumentsList";
import DocumentDetail from "../pages/document/DocumentDetail";
import ContributorRequest from "../pages/contributor/ContributorRequest";
import ViewHistory from "../pages/history/ViewHistory";
import Dashboard from "../pages/dashboard/Dashboard";
import ManageDocuments from "../pages/document/ManageDocuments";
import StyleGuide from "../pages/about/StyleGuide";
import FavoriteDocuments from "../pages/document/FavoriteDocuments";
import ManageQuizzes from "../pages/quiz/ManageQuizzes";
import QuizHistory from "../pages/quiz/QuizHistory";
import AdminDashboard from "../pages/admin/AdminDashboard";
import ContributorRequests from "../pages/admin/ContributorRequests";

export const router = createBrowserRouter([
  // Public
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/admin/dashboard",
    element: (
      <ProtectedRoute requiredRoles={["ADMIN"]}>
        <AdminDashboard />
      </ProtectedRoute>
    ),
  },
  {
    path: "/admin/contributor-requests",
    element: (
      <ProtectedRoute requiredRoles={["ADMIN"]}>
        <ContributorRequests />
      </ProtectedRoute>
    ),
  },
  {
    path: "/style-guide",
    element: <StyleGuide />,
  },
  {
    path: "/favorite-documents",
    element: (
      <ProtectedRoute>
        <FavoriteDocuments />
      </ProtectedRoute>
    ),
  },
  {
    path: "/manage-quizzes",
    element: (
      <ProtectedRoute>
        <ManageQuizzes />
      </ProtectedRoute>
    ),
  },
  {
    path: "/quiz-history",
    element: (
      <ProtectedRoute>
        <QuizHistory />
      </ProtectedRoute>
    ),
  },
  {
    path: "/profile",
    element: (
      <ProtectedRoute>
        <Dashboard />
      </ProtectedRoute>
    ),
  },
  {
    path: "/manage-documents",
    element: (
      <ProtectedRoute>
        <ManageDocuments />
      </ProtectedRoute>
    ),
  },
  {
    path: "/document/:id",
    element: <DocumentDetail />,
  },
  {
    path: "/view-history",
    element: (
      <ProtectedRoute>
        <ViewHistory />
      </ProtectedRoute>
    ),
  },
  {
    path: "/contributor-request",
    element: (
      <ProtectedRoute>
        <ContributorRequest />
      </ProtectedRoute>
    ),
  },
  {
    path: "/login",
    element: (
      <GuestRoute>
        <AuthLayout>
          <SignIn />
        </AuthLayout>
      </GuestRoute>
    ),
  },
  {
    path: "/sign-up",
    element: (
      <GuestRoute>
        <AuthLayout>
          <SignUp />
        </AuthLayout>
      </GuestRoute>
    ),
  },
  {
    path: "/forgot-password",
    element: (
      <AuthLayout>
        <ForgotPassword />
      </AuthLayout>
    ),
  },

  // Protected
  {
    path: "/documents",
    element: (
      <ProtectedRoute>
        <DocumentsList />
      </ProtectedRoute>
    ),
  },
]);