import { createContext, useContext, useState } from "react";
import {
  getUsersRequest,
  deleteUserRequest,
  updateUserRequest,
} from "../api/users";

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
      if (res.status === 204) setUsers(users.filter((user) => user.id !== id));
    } catch (error) {
      console.log(error);
    }
  };

  const updateUser = async (id, updatedData) => {
    try {
      await updateUserRequest(id, updatedData);
      setUsers((prev) =>
        prev.map((user) =>
          user.id === id ? { ...user, ...updatedData } : user
        )
      );
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
