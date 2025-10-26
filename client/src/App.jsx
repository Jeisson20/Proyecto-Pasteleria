import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "./pages/auth/LoginPage.jsx";
import RegisterPage from "./pages/auth/RegisterPage.jsx";
import DashboardPage from "./pages/DashboardPage.jsx";
import { AuthProvider } from "./context/AuthContext.jsx";
import ProtectedRoute from "./ProtectedRoute.jsx";
import UserManagement from "./pages/UserManagement.jsx";
import { UsersProvider } from "./context/UsersContext.jsx";
import "./styles/global.css";
import "./styles/layout.css";
import "./styles/users.css";

import "./App.css";

function App() {
  return (
    <AuthProvider>
      <UsersProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Navigate to="/login" />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />

            <Route element={<ProtectedRoute />}>
              <Route path="/dashboard" element={<DashboardPage />} />
              <Route path="/users" element={<UserManagement />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </UsersProvider>
    </AuthProvider>
  );
}

export default App;
