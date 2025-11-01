import { v } from "../styles/variables";
import { AiOutlineHome } from "react-icons/ai";

export const DesplegableUser = [
  {
    text: "Mi perfil",
    icono: <v.iconoUser />,
    tipo: "miperfil",
  },
  {
    text: "Cerrar sesión",
    icono: <v.iconoCerrarSesion />,
    tipo: "cerrarsesion",
  },
];

export const LinksArray = [
  {
    label: "Dashboard",
    icon: <AiOutlineHome />,
    to: "/dashboard",
    roles: ["admin", "empleado"],
  },
  {
    label: "Productos",
    icon: <v.iconoProductos />,
    to: "/productos",
    roles: ["admin", "empleado", "cliente"],
    permisoKey: "productos",
  },
  {
    label: "Clientes",
    icon: <v.iconoCliente />,
    to: "/clientes",
    roles: ["admin", "empleado"],
    permisoKey: "clientes",
  },
  {
    label: "Pedidos",
    icon: <v.iconoPedidos />,
    to: "/pedidos",
    roles: ["admin", "empleado", "cliente"],
    permisoKey: "pedidos",
  },
];

export const SecondarylinksArray = [
  {
    label: "Usuarios",
    icon: <v.iconoUsuarios />,
    to: "/usuarios",
    roles: ["admin"],
  },
];

export const TemasData = [
  {
    icono: "🌞",
    descripcion: "light",
  },
  {
    icono: "🌚",
    descripcion: "dark",
  },
];
