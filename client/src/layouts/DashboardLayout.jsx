import Sidebar from "../components/Sidebar.jsx";
import fondoPasteleria from "../assets/fondoPasteleria.png";
import { Outlet } from "react-router-dom";

// Componente de layout principal
export default function DashboardLayout() {
  return (
    <div
      className="main_layout"
      style={{
        backgroundImage: `url(${fondoPasteleria})`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        minHeight: "100vh",
        display: "flex",
      }}
    >
      <Sidebar />

      {/* Contenido principal, donde se renderizan las rutas hijas */}
      <main className="main_content">
        <Outlet />
      </main>
    </div>
  );
}
