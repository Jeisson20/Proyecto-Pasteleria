import styled from "styled-components";
import { Checkbox } from "../atomos/Checkbox.jsx";
import { Button } from "../atomos/Button.jsx";

const TableRow = styled.tr`
  &:hover {
    background: ${({ theme }) => theme.rgbafondoanimado};
  }
`;

const TableCell = styled.td`
  padding: 0.8rem;
  text-align: center;
  color: ${({ theme }) => theme.text};
  font-size: ${({ theme }) => theme.fontsm};
`;

const Select = styled.select`
  background: ${({ theme }) => theme.bgcards};
  color: ${({ theme }) => theme.text};
  border: 1px solid ${({ theme }) => theme.bg4};
  border-radius: 6px;
  padding: 0.3rem 0.5rem;
  font-size: ${({ theme }) => theme.fontsm};
  cursor: pointer;

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.primary};
  }
`;

export default function UserRow({
  user,
  handlePermissionChange,
  handleRoleChange,
  deleteUser,
}) {
  return (
    <TableRow>
      <TableCell>{user.nombre}</TableCell>
      <TableCell>{user.email}</TableCell>

      {Object.entries(user.permisos || {}).map(([key, value]) => (
        <TableCell key={key}>
          <Checkbox
            checked={value}
            onChange={(e) =>
              handlePermissionChange(user.id, key, e.target.checked)
            }
          />
        </TableCell>
      ))}

      <TableCell>
        <Select
          value={user.rol}
          onChange={(e) => handleRoleChange(user.id, e.target.value)}
        >
          <option value="admin">Administrador</option>
          <option value="empleado">Empleado</option>
          <option value="cliente">Cliente</option>
        </Select>
      </TableCell>

      <TableCell>
        <Button
          onClick={() => {
            if (
              window.confirm(`¿Seguro que deseas eliminar a ${user.nombre}?`)
            ) {
              deleteUser(user.id);
            }
          }}
        >
          ❌
        </Button>
      </TableCell>
    </TableRow>
  );
}
