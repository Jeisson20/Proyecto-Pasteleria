import { createContext, useState, useEffect } from "react";
import {
  registerRequest,
  loginRequest,
  verifyTokenRequest,
} from "../api/auth.js";
import Cookies from "js-cookie";

// Creamos el contexto de autenticación
export const AuthContext = createContext();

// Proveedor del contexto que envuelve a toda la app
export const AuthProvider = ({ children }) => {
  // Estado del usuario autenticado
  const [user, setUser] = useState(null);
  // Estado booleano: ¿está autenticado?
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  // Lista de errores (ej: credenciales inválidas)
  const [errors, setErrors] = useState([]);
  // Estado de carga (ej: verificando token)
  const [loading, setLoading] = useState(true);

  // Registro de usuario
  const signUp = async (user) => {
    try {
      const res = await registerRequest(user); // llamada a la API
      setUser(res.data); // guardamos datos del usuario
      setIsAuthenticated(true); // marcamos como autenticado
    } catch (error) {
      setErrors(error.response.data); // guardamos errores de la API
    }
  };

  // Inicio de sesión
  const signIn = async (user) => {
    try {
      const res = await loginRequest(user); // llamada a la API
      setIsAuthenticated(true);
      setUser(res.data);
    } catch (error) {
      // Si la API devuelve un array de errores, lo guardamos tal cual
      if (Array.isArray(error.response.data)) {
        return setErrors(error.response.data);
      }
      // Si es un solo mensaje, lo metemos en un array
      setErrors([error.response.data.message]);
    }
  };

  // Cerrar sesión
  const logout = () => {
    Cookies.remove("token"); // eliminamos la cookie del token
    setIsAuthenticated(false); // marcamos como no autenticado
    setUser(null); // limpiamos el usuario
  };

  // Efecto: limpiar errores automáticamente después de 3 segundos
  useEffect(() => {
    if (errors.length > 0) {
      const timer = setTimeout(() => {
        setErrors([]);
      }, 3000);
      return () => clearTimeout(timer); // limpiamos el timer al desmontar
    }
  }, [errors]);

  // Efecto: verificar si hay un token válido al cargar la app
  useEffect(() => {
    async function checkLogin() {
      const cookies = Cookies.get(); // obtenemos cookies
      if (!cookies.token) {
        // Si no hay token, no está autenticado
        setIsAuthenticated(false);
        setLoading(false);
        return setUser(null);
      }
      try {
        // Verificamos el token con la API
        const res = await verifyTokenRequest(cookies.token);
        if (!res.data) {
          // Si la API no devuelve datos, token inválido
          setIsAuthenticated(false);
          setLoading(false);
          return;
        }
        // Si todo va bien, guardamos usuario y autenticación
        setIsAuthenticated(true);
        setUser(res.data);
        setLoading(false);
      } catch (error) {
        // Si falla la verificación, limpiamos todo
        setIsAuthenticated(false);
        setUser(null);
        setLoading(false);
        console.log(error);
      }
    }
    checkLogin();
  }, []);

  // Proveemos el contexto a toda la app
  return (
    <AuthContext.Provider
      value={{
        signUp,
        signIn,
        loading,
        user,
        isAuthenticated,
        errors,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
