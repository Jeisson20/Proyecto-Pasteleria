import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../hook/useAuth.jsx";
import { AnimatePresence, motion } from "framer-motion";
import {
  FaBoxOpen,
  FaClipboardList,
  FaUserFriends,
  FaUsers,
  FaTimes,
} from "react-icons/fa";
import {
  GiHamburgerMenu,
  GiMaterialsScience,
  GiCakeSlice,
} from "react-icons/gi";

const links = [
  { to: "/dashboard", icon: <GiCakeSlice />, label: "Dashboard" },
  { to: "/products", icon: <FaBoxOpen />, label: "Productos" },
  { to: "/rawMaterial", icon: <GiMaterialsScience />, label: "Materia Prima" },
  { to: "/orders", icon: <FaClipboardList />, label: "Pedidos" },
  { to: "/clients", icon: <FaUserFriends />, label: "Clientes" },
  { to: "/users", icon: <FaUsers />, label: "Usuarios" },
];

export default function Sidebar() {
  const { logout, user } = useAuth();

  const [open, setOpen] = useState(false);

  return (
    <>
      <button className="hamburger" onClick={() => setOpen(!open)}>
        {open ? <FaTimes /> : <GiHamburgerMenu />}
      </button>

      <AnimatePresence>
        {open && (
          <motion.aside
            className={`sidebar_box ${open ? "expanded" : "collapsed"}`}
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          >
            <h3 className="logo_sidebar">Bienvenido, {user?.nombre}</h3>

            <nav>
              {links.map(({ to, icon, label }) => (
                <Link to={to} className="link" key={to}>
                  {icon} {label}
                </Link>
              ))}
            </nav>

            <footer>
              <Link to="/login" onClick={logout} className="footer">
                Cerrar Sesión
              </Link>
            </footer>
          </motion.aside>
        )}
      </AnimatePresence>
    </>
  );
}
