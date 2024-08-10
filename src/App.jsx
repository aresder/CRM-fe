import "./App.css";
import { Routes, Route, Navigate } from "react-router-dom";
import HomePage from "./pages/HomePage";
import AboutPage from "./pages/AboutPage";
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import DashboardPage from "./pages/admin/DashboardPage";
import AdminLayout from "./layouts/AdminLayout";
import AddPage from "./pages/admin/AddPage";
import NotFoundPage from "./pages/NotFoundPage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route
        path="/about"
        element={<AboutPage />}
        ErrorBoundary={<NotFoundPage />}
      />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/admin/*" element={<AdminLayout />}>
        <Route index element={<Navigate to={"/admin/dashboard"} />} />
        <Route path="dashboard" element={<DashboardPage />} />
        <Route path="add" element={<AddPage />} />
      </Route>
      <Route path="/dashboard/*" element={<AdminLayout />}>
        <Route index element={<Navigate to={"/admin/dashboard"} />} />
      </Route>
    </Routes>
  );
}

export default App;
