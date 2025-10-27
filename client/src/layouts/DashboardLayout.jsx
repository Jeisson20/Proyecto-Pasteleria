import Sidebar from "../components/Sidebar.jsx";
import fondoPasteleria from "../assets/fondoPasteleria.png";
import { Outlet } from "react-router-dom";

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

      <main className="main_content">
        <Outlet />
      </main>
    </div>
  );
}
