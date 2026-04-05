import { createBrowserRouter } from "react-router-dom";

import AuthLayout from "../layouts/AuthLayout";
import UserLayout from "../layouts/user/UserLayout";
import AdminLayout from "../layouts/admin/AdminLayout";

import SignIn from "../pages/auth/SignIn";
import SignUp from "../pages/auth/SignUp";
import ForgotPassword from "../pages/auth/ForgotPassword";
import OAuth2Success from "../pages/auth/OAuth2Success";

import GuestRoute from "./GuestRoute";
import ProtectedRoute from "./ProtectedRoute";
import Home from "../pages/home/Home";
import DocumentsList from "../components/DocumentsList";
import DocumentDetail from "../pages/document/DocumentDetail";
import ContributorRequest from "../pages/contributor/ContributorRequest";
import ContributorStatus from "../pages/contributor/ContributorStatus";
import ViewHistory from "../pages/history/ViewHistory";
import Profile from "../pages/user/Profile";
import ManageDocuments from "../pages/document/ManageDocuments";
import UploadDocument from "../pages/document/UploadDocument";
import StyleGuide from "../pages/about/StyleGuide";
import AboutUs from "../pages/about/AboutUs";
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
      { path: "about-us", element: <AboutUs /> },
      { path: "favorite-documents", element: <FavoriteDocuments /> },
      { path: "manage-quizzes", element: <ManageQuizzes /> },
      { path: "quiz-history", element: <QuizHistory /> },
      { path: "profile", element: <Profile /> },
      { path: "manage-documents", element: <ManageDocuments /> },
      { path: "upload-document", element: <UploadDocument /> },
      { path: "document/:id", element: <DocumentDetail /> },
      { path: "view-history", element: <ViewHistory /> },
      { path: "contributor-request", element: <ContributorRequest /> },
      { path: "contributor-status", element: <ContributorStatus /> },
      { path: "documents/:id", element: <DocumentDetail /> },
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
  {
    path: "/oauth2-success",
    element: (
      <AuthLayout>
        <OAuth2Success />
      </AuthLayout>
    ),
  },
]);