import { createContext, useContext, useState } from "react";
import {
  getUsersRequest,
  deleteUserRequest,
  updateUserRequest,
} from "../api/users";
import { useAuth } from "../hook/useAuth.jsx";

const UsersContext = createContext();

export const useUsers = () => {
  const context = useContext(UsersContext);
  if (!context) {
    throw new Error("useUsers must be used within a UsersProvider");
  }
  return context;
};

export const UsersProvider = ({ children }) => {
  const [users, setUsers] = useState([]);
  const { user: authUser, setUser } = useAuth();

  const getUsers = async () => {
    try {
      const res = await getUsersRequest();
      setUsers(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteUser = async (id) => {
    try {
      const res = await deleteUserRequest(id);
      // El servidor puede devolver 200 o 204. Si la eliminación no está
      // permitida (p. ej. el usuario tiene pedidos) el servidor devuelve
      // un 400 con un mensaje que aquí mostramos al administrador.
      // En ese caso entra en el catch y mostramos la alerta correspondiente.
      if (res.status === 204 || res.status === 200) {
        setUsers((prev) => prev.filter((user) => user.id !== id));
      }
    } catch (error) {
      const msg =
        error?.response?.data?.message ||
        error.message ||
        "Error al eliminar usuario";
      // show a user-friendly alert; UI can be improved to use toasts
      window.alert(msg);
    }
  };

  const updateUser = async (id, updatedData) => {
    try {
      const res = await updateUserRequest(id, updatedData);
      setUsers((prev) =>
        prev.map((u) => (u.id === id ? { ...u, ...res.data } : u))
      );

      if (authUser?.id === id) {
        let updated = res.data;
        if (typeof updated.permisos === "string") {
          try {
            updated.permisos = JSON.parse(updated.permisos);
          } catch {
            updated.permisos = {};
          }
        }
        setUser(updated);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <UsersContext.Provider
      value={{
        users,
        getUsers,
        deleteUser,
        updateUser,
        useUsers,
      }}
    >
      {children}
    </UsersContext.Provider>
  );
};
