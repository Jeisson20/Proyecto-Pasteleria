import { useEffect } from "react";
import { useUsers } from "../context/UsersContext.jsx";

export default function UsersTable() {
  const { getUsers, users, deleteUser, updateUser } = useUsers();

  useEffect(() => {
    getUsers();
  }, []);

  const handleRoleChange = (userId, newRole) => {
    const user = users.find((u) => u.id === userId);
    if (!user) return;

    updateUser(userId, {
      rol: newRole,
      permisos: user.permisos,
    });
  };

  const handlePermissionChange = (userId, permisoKey, newValue) => {
    const user = users.find((u) => u.id === userId);
    if (!user || !user.permisos) return;

    const updatedPermisos = {
      ...user.permisos,
      [permisoKey]: newValue,
    };

    updateUser(userId, {
      rol: user.rol,
      permisos: updatedPermisos,
    });
  };

  return (
    <div className="content-table">
      <h1>GESTION DE USUARIOS</h1>
      <p>Modificar permisos de acceso y rol de cada usuario</p>

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
          {Array.isArray(users) &&
            users.map((user) => (
              <tr key={user.id}>
                {/* Datos básicos */}
                <td>{user.nombre}</td>
                <td>{user.email}</td>

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
