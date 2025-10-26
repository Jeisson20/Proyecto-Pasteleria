import { useContext } from "react";
import { AuthContext } from "../context/AuthContext.jsx";

// Hook personalizado que facilita el uso del contexto de autenticación
export const useAuth = () => {
  // Obtenemos el valor actual del contexto
  const context = useContext(AuthContext);

  // Si el hook se usa fuera de un <AuthProvider>, lanzamos un error
  // Esto evita que el contexto sea undefined y ayuda a detectar mal uso
  if (!context) throw new Error("useAuth must be used within an AuthProvider");

  // Retornamos el contexto para que cualquier componente pueda acceder a el
  return context;
};
