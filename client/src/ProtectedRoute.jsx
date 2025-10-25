import { useAuth } from "./hook/useAuth.jsx";
import { Navigate, Outlet } from "react-router-dom";

function ProtectedRoute() {
  const { loading, isAuthenticated } = useAuth();

  if (loading) return <div>Cargando...</div>;
  if (!loading && !isAuthenticated) return <Navigate to="/login" replace />;

  return <Outlet />;
}

export default ProtectedRoute;
