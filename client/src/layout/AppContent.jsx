import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import LoginPage from "../pages/auth/LoginPage.jsx";
import RegisterPage from "../pages/auth/RegisterPage.jsx";
import { MainLayout } from "./MainLayout.jsx";

export default function AppContent() {
  const location = useLocation();
  const hideLayout = ["/login", "/register", "/"].includes(location.pathname);

  return hideLayout ? (
    <Routes>
      <Route path="/" element={<Navigate to="/login" />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
    </Routes>
  ) : (
    <MainLayout />
  );
}
