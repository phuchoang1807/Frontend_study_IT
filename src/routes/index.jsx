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

export const router = createBrowserRouter([
  // Public
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/profile",
    element: <Dashboard />,
  },
  {
    path: "/document/:id",
    element: <DocumentDetail />,
  },
  {
    path: "/view-history",
    element: <ViewHistory />,
  },
  {
    path: "/contributor-request",
    element: <ContributorRequest />,
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