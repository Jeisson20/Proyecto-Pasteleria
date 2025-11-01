import { Routes, Route } from "react-router-dom";
import ProtectedRoute from "../ProtectedRoute.jsx";
import DashboardPage from "../pages/DashboardPage.jsx";
import UserManagement from "../pages/UserManagement.jsx";

export function AppRoutes() {
  return (
    <Routes>
      <Route element={<ProtectedRoute roles={["admin", "empleado"]} />}>
        <Route path="/dashboard" element={<DashboardPage />} />
      </Route>
      <Route element={<ProtectedRoute roles={["admin"]} />}>
        <Route path="/usuarios" element={<UserManagement />} />
      </Route>
    </Routes>
  );
}
