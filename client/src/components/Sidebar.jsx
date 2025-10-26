import { useState } from "react";
// Hook de React para manejar estado local (aquí lo usas para abrir/cerrar el sidebar)

import { Link } from "react-router-dom";
// Componente de React Router para navegación interna sin recargar la página

import { useAuth } from "../hook/useAuth.jsx";
// Custom hook que seguramente expone el usuario actual y la función logout

import { AnimatePresence, motion } from "framer-motion";
// Librería para animaciones declarativas. AnimatePresence permite animar entrada/salida de componentes

// Íconos de react-icons
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

// Definición de los enlaces del sidebar
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
  // usuario actual y la función logout desde el contexto de autenticación

  const [open, setOpen] = useState(false);
  // Estado local: true = sidebar abierto, false = cerrado

  return (
    <>
      {/* Botón hamburguesa para abrir/cerrar el sidebar */}
      <button className="hamburger" onClick={() => setOpen(!open)}>
        {open ? <FaTimes /> : <GiHamburgerMenu />}
      </button>

      {/* Sidebar animado con framer-motion */}
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

            {/* Navegación con los links definidos arriba */}
            <nav>
              {links.map(({ to, icon, label }) => (
                <Link to={to} className="link" key={to}>
                  {icon} {label}
                </Link>
              ))}
            </nav>

            {/* Footer con botón de logout */}
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
