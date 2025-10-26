import { useEffect } from "react";
import { useUsers } from "../context/UsersContext.jsx";

// Componente que renderiza la tabla de usuarios con roles y permisos
export default function UsersTable() {
  // Extraemos del contexto las funciones y el estado de usuarios
  const { getUsers, users, deleteUser, updateUser } = useUsers();

  // Al montar el componente, obtenemos la lista de usuarios
  useEffect(() => {
    getUsers();
  }, []);

  // Maneja el cambio de rol de un usuario
  const handleRoleChange = (userId, newRole) => {
    // Buscamos el usuario en la lista
    const user = users.find((u) => u.id === userId);
    if (!user) return;

    // Actualizamos el rol manteniendo los permisos actuales
    updateUser(userId, {
      rol: newRole,
      permisos: user.permisos,
    });
  };

  // Maneja el cambio de un permiso específico de un usuario
  const handlePermissionChange = (userId, permisoKey, newValue) => {
    // Buscamos el usuario
    const user = users.find((u) => u.id === userId);
    if (!user || !user.permisos) return;

    // Clonamos los permisos y actualizamos solo el que cambió
    const updatedPermisos = {
      ...user.permisos,
      [permisoKey]: newValue,
    };

    // Actualizamos el usuario con el nuevo set de permisos
    updateUser(userId, {
      rol: user.rol,
      permisos: updatedPermisos,
    });
  };

  return (
    <div className="content-table">
      <h1>GESTION DE USUARIOS</h1>
      <p>Modificar permisos de acceso y rol de cada usuario</p>
      {/* Tabla de usuarios */}
      <table className="user-table">
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Email</th>
            <th>Productos</th>
            <th>Materia Prima</th>
            <th>Pedidos</th>
            <th>Clientes</th>
            <th>Rol</th>
            <th>Eliminar</th>
          </tr>
        </thead>

        <tbody>
          {/* Validamos que users sea un array antes de mapear */}
          {Array.isArray(users) &&
            users.map((user) => (
              <tr key={user.id}>
                {/* Datos básicos */}
                <td>{user.nombre}</td>
                <td>{user.email}</td>

                {/* Renderizamos los permisos como checkboxes */}
                {Object.entries(user.permisos || {}).map(([key, value]) => (
                  <td key={key}>
                    <input
                      type="checkbox"
                      checked={value}
                      onChange={(e) =>
                        handlePermissionChange(user.id, key, e.target.checked)
                      }
                    />
                  </td>
                ))}

                {/* Selector de rol */}
                <td>
                  <select
                    value={user.rol}
                    onChange={(e) => handleRoleChange(user.id, e.target.value)}
                  >
                    <option value="admin">Administrador</option>
                    <option value="empleado">Empleado</option>
                    <option value="cliente">Cliente</option>
                  </select>
                </td>

                {/* Botón para eliminar usuario */}
                <td>
                  <button
                    onClick={() => {
                      if (
                        window.confirm(
                          `¿Seguro que deseas eliminar a ${user.nombre}?`
                        )
                      ) {
                        deleteUser(user.id);
                      }
                    }}
                    className="button-table"
                  >
                    ❌
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}
