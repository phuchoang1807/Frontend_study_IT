import { createBrowserRouter } from "react-router-dom";

import AuthLayout from "../layouts/AuthLayout";
import UserLayout from "../layouts/user/UserLayout";
import AdminLayout from "../layouts/admin/AdminLayout";

import SignIn from "../pages/auth/SignIn";
import SignUp from "../pages/auth/SignUp";
import ForgotPassword from "../pages/auth/ForgotPassword";

import GuestRoute from "./GuestRoute";
import ProtectedRoute from "./ProtectedRoute";
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
import AdminSignIn from "../pages/admin/AdminSignIn";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <UserLayout />,
    children: [
      { index: true, element: <Home /> },
      { path: "style-guide", element: <StyleGuide /> },
      { path: "favorite-documents", element: <FavoriteDocuments /> },
      { path: "manage-quizzes", element: <ManageQuizzes /> },
      { path: "quiz-history", element: <QuizHistory /> },
      { path: "profile", element: <Dashboard /> },
      { path: "manage-documents", element: <ManageDocuments /> },
      { path: "document/:id", element: <DocumentDetail /> },
      { path: "view-history", element: <ViewHistory /> },
      { path: "contributor-request", element: <ContributorRequest /> },
      { path: "documents", element: <DocumentsList /> },
    ],
  },
  {
    path: "/admin",
    children: [
      {
        path: "login",
        element: (
          <GuestRoute adminPortal>
            <AdminSignIn />
          </GuestRoute>
        ),
      },
      {
        element: (
          <ProtectedRoute
            requiredRoles={["ADMIN", "USER_MODERATOR", "CONTENT_MODERATOR"]}
          >
            <AdminLayout />
          </ProtectedRoute>
        ),
        children: [
          { path: "dashboard", element: <AdminDashboard /> },
          { path: "contributor-requests", element: <ContributorRequests /> },
        ],
      },
    ],
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
]);