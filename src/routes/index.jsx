import { Navigate, createBrowserRouter } from "react-router-dom";

import AuthLayout from "../layouts/AuthLayout";

import SignIn from "../pages/auth/SignIn";
import SignUp from "../pages/auth/SignUp";
import ForgotPassword from "../pages/auth/ForgotPassword";

import Home from "../pages/home/Home";

import DocumentsList from "../components/DocumentsList";

export const router = createBrowserRouter([
    {
    path: "/",
    element: <Navigate to="/sign-in" replace />,
  },
  {
    path: "/sign-in",
    element: (
      <AuthLayout>
        <SignIn />
      </AuthLayout>
    ),
  },
  {
    path: "/sign-up",
    element: (
      <AuthLayout>
        <SignUp />
      </AuthLayout>
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

  // 👇 trang sau khi login
  {
    path: "/home",
    element: <Home />,
  },

  {
    path: "/documents",
    element: <DocumentsList />,
  },
]);