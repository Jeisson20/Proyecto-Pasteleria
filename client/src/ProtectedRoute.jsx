import { useAuth } from "./hook/useAuth.jsx";
// Hook personalizado que expone el estado de autenticación

import { Navigate, Outlet } from "react-router-dom";
// Navigate: redirige a otra ruta
// Outlet: renderiza las rutas hijas dentro de este layout protegido

function ProtectedRoute() {
  // Extraemos del contexto el estado de carga y autenticación
  const { loading, isAuthenticated } = useAuth();

  // Mientras se verifica el token o la sesión, mostramos un mensaje de carga
  if (loading) return <div>Cargando...</div>;

  // Si ya no está cargando y el usuario no está autenticado, redirigimos al login
  if (!loading && !isAuthenticated) return <Navigate to="/login" replace />;

  // Si está autenticado, renderizamos las rutas hijas
  return <Outlet />;
}

export default ProtectedRoute;
