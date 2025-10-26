import { Link } from "react-router-dom";
import { useAuth } from "../hook/useAuth.jsx";
import { MdDashboard } from "react-icons/md";

import { GiHamburgerMenu } from "react-icons/gi";
import {
  FaBoxOpen,
  FaClipboardList,
  FaUserFriends,
  FaUsers,
  FaTimes,
} from "react-icons/fa";
import { GiMaterialsScience } from "react-icons/gi";

export default function Sidebar() {
  const { logout } = useAuth();
  return (
    <aside className="sidebar_box">
      <input type="checkbox" id="check" />
      <div className="btn_one">
        <label htmlFor="check">
          <GiHamburgerMenu className="fas fa-bars" />
        </label>
      </div>
      <div className="sidebar_menu">
        <div className="logo_sidebar">
          <h3>Admin Panel</h3>
        </div>
        <div className="btn_two">
          <label htmlFor="check">
            <FaTimes className="fas fa-times" />
          </label>
        </div>
        <div className="menu">
          <nav>
            <Link to="/dashboard" className=" link fas fa-qrcode">
              <MdDashboard className="icon" /> Dashboard
            </Link>
            <Link to="/products" className=" link fas fa-link">
              <FaBoxOpen className="icon" /> Productos
            </Link>
            <Link to="/rawMaterial" className=" link fas fa-stream">
              <GiMaterialsScience className="icon" /> Materia Prima
            </Link>
            <Link to="/orders" className=" link fas fa-calendar">
              <FaClipboardList className="icon" /> Pedidos
            </Link>
            <Link to="/clients" className=" link fas fa-circle">
              <FaUserFriends className="icon" /> Clientes
            </Link>
            <Link to="/users" className=" link fas fa-sliders">
              <FaUsers className="icon" />
              Usuarios
            </Link>
          </nav>
        </div>
        <footer>
          <Link
            to="/login"
            onClick={() => {
              logout();
            }}
            className="footer"
          >
            Cerrar Session
          </Link>
        </footer>
      </div>
    </aside>
  );
}
