import { useAuth } from "./hook/useAuth.jsx";
import { Navigate, Outlet } from "react-router-dom";

function ProtectedRoute({ roles = [] }) {
  const { loading, isAuthenticated, user } = useAuth();

  if (loading) return <div>Cargando...</div>;

  if (!isAuthenticated) return <Navigate to="/login" replace />;

  const userRole = user?.rol;
  const hasAccess = roles.length === 0 || roles.includes(userRole);

  if (!hasAccess) {
    if (userRole === "cliente") return <Navigate to="productos" replace />;
    return <Navigate to="/dashboard" replace />;
  }

  return <Outlet />;
}

export default ProtectedRoute;
