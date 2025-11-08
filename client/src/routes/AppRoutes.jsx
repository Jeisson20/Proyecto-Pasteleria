import { Routes, Route } from "react-router-dom";
import ProtectedRoute from "../ProtectedRoute.jsx";
import DashboardPage from "../pages/DashboardPage.jsx";
import UserManagement from "../pages/UserManagement.jsx";
import ProductsPage from "../pages/ProductsPage.jsx";
import OrdersPage from "../pages/OrdersPage.jsx";

export function AppRoutes() {
  return (
    <Routes>
      <Route element={<ProtectedRoute roles={["admin", "empleado"]} />}>
        <Route path="/dashboard" element={<DashboardPage />} />
      </Route>
      <Route element={<ProtectedRoute roles={["admin"]} />}>
        <Route path="/usuarios" element={<UserManagement />} />
      </Route>
      <Route
        element={
          <ProtectedRoute
            roles={["admin", "empleado", "cliente"]}
            permisoKey="productos"
          />
        }
      >
        <Route path="/productos" element={<ProductsPage />} />
      </Route>

      <Route
        element={
          <ProtectedRoute
            roles={["admin", "empleado", "cliente"]}
            permisoKey="productos"
          />
        }
      >
        <Route path="/pedidos" element={<OrdersPage />} />
      </Route>
    </Routes>
  );
}
