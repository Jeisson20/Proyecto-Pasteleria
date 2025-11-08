import styled from "styled-components";
import { useEffect } from "react";
import { useUsers } from "../../context/UsersContext.jsx";
import UserRow from "../moleculas/UserRow.jsx";
import { Device } from "../../styles/breackpoints.jsx";

export function UsersTable({ searchTerm = "" }) {
  const { getUsers, users, deleteUser, updateUser } = useUsers();

  useEffect(() => {
    getUsers();
  }, []);

  const handleRoleChange = (userId, newRole) => {
    const user = users.find((u) => u.id === userId);
    if (!user) return;
    updateUser(userId, { rol: newRole, permisos: user.permisos });
  };

  const handlePermissionChange = (userId, permisoKey, newValue) => {
    const user = users.find((u) => u.id === userId);
    if (!user || !user.permisos) return;
    updateUser(userId, {
      rol: user.rol,
      permisos: { ...user.permisos, [permisoKey]: newValue },
    });
  };

  const filteredUsers = Array.isArray(users)
    ? users.filter(
        (u) =>
          u.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
          u.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
          u.rol.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : [];

  return (
    <TableWrapper>
      <p className="table-p">
        Modificar permisos de acceso y rol de cada usuario
      </p>

      <TableContainer>
        <StyledTable>
          <Thead>
            <tr>
              <th>Nombre</th>
              <th>Email</th>
              <th>Productos</th>
              <th>Pedidos</th>
              <th>Facturas</th>
              <th>Rol</th>
              <th>Eliminar</th>
            </tr>
          </Thead>
          <Tbody>
            {filteredUsers.map((user) => (
              <UserRow
                key={user.id}
                user={user}
                handlePermissionChange={handlePermissionChange}
                handleRoleChange={handleRoleChange}
                deleteUser={deleteUser}
              />
            ))}
          </Tbody>
        </StyledTable>
      </TableContainer>
    </TableWrapper>
  );
}

const TableWrapper = styled.div`
  background: ${({ theme }) => theme.bg};
  padding: 2rem;
  border-radius: 12px;
  color: ${({ theme }) => theme.text};
  font-family: "Poppins", sans-serif;
  display: flex;
  flex-direction: column;
  height: 100%;

  .table-p {
    font-size: 28px;
    @media ${Device.mobile} {
      font-size: 20px;
      text-align: center;
    }
  }
`;

const TableContainer = styled.div`
  flex: 1;
  border: 1px solid ${({ theme }) => theme.bg4};
  border-radius: 8px;
  margin-top: 1rem;
  overflow-x: auto;
`;

const StyledTable = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

const Thead = styled.thead`
  display: table;
  width: 100%;
  table-layout: fixed;

  th {
    padding: 0.8rem;
    text-align: center;
    border-bottom: 1px solid ${({ theme }) => theme.bg4};
    color: ${({ theme }) => theme.primary};
    font-weight: 600;
    text-transform: uppercase;
    position: sticky;
    top: 0;
    background: ${({ theme }) => theme.bg};
    z-index: 2;
  }
`;

const Tbody = styled.tbody`
  display: block;
  max-height: 50vh;
  overflow-y: auto;
  &::-webkit-scrollbar {
    width: 8px;
  }
  &::-webkit-scrollbar-thumb {
    background: ${({ theme }) => theme.primary};
    border-radius: 4px;
  }
  &::-webkit-scrollbar-track {
    background: ${({ theme }) => theme.bg2};
  }

  tr {
    display: table;
    width: 100%;
    table-layout: fixed;
  }

  td {
    padding: 0.8rem;
    text-align: center;
    border-bottom: 1px solid ${({ theme }) => theme.bg4};
  }

  tr:hover {
    background: ${({ theme }) => theme.rgbafondoanimado};
  }
`;
