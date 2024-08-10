import { createBrowserRouter, Navigate } from "react-router-dom";

// Compenent
import HomePage from "../pages/HomePage";
import AdminLayout from "../layouts/AdminLayout";
import DashboardPage from "../pages/admin/DashboardPage";
import NotFoundPage from "../pages/NotFoundPage";
import AddPage from "../pages/admin/AddPage";
import RegisterPage from "../pages/auth/RegisterPage";
import LoginPage from "../pages/auth/LoginPage";

export const route = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
    errorElement: <NotFoundPage />,
  },
  {
    path: "/auth",
    children: [
      {
        path: "",
        element: <Navigate to={"/auth/login"} replace />,
      },
      {
        path: "login",
        element: <LoginPage />,
      },
      {
        path: "register",
        element: <RegisterPage />,
      },
    ],
  },

  {
    path: "/login",
    children: [
      {
        path: "",
        element: <Navigate to={"/auth/login"} replace />,
      },
    ],
  },

  {
    path: "/register",
    children: [
      {
        path: "",
        element: <Navigate to={"/auth/register"} replace />,
      },
    ],
  },

  {
    path: "/admin",
    element: <AdminLayout />,
    children: [
      {
        path: "",
        element: <Navigate to="/admin/dashboard" replace />,
      },
      {
        path: "dashboard",
        element: <DashboardPage />,
      },
      {
        path: "add",
        element: <AddPage />,
      },
    ],
  },
]);
