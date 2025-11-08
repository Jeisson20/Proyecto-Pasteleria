import { useOrders } from "../../context/OrdersContext.jsx";
import { useAuth } from "../../hook/useAuth.jsx";
import { OrderCard } from "../moleculas/OrderCard.jsx";
import styled from "styled-components";
import { useEffect } from "react";

export function OrdersList() {
  const { orders, getOrders } = useOrders();
  const { user } = useAuth();
  const isAdmin = user.rol === "admin" || user.rol === "empleado";

  useEffect(() => {
    getOrders();
  }, []);

  const filtered = isAdmin
    ? orders
    : orders.filter((o) => o.usuario_id === user.id);

  return (
    <List>
      {filtered.length === 0 ? (
        <Empty>No hay pedidos registrados</Empty>
      ) : (
        filtered.map((order) => <OrderCard key={order.id} order={order} />)
      )}
    </List>
  );
}

const List = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 1.5rem;
  margin-top: 2rem;

  @media (min-width: 1024px) {
    grid-template-columns: repeat(4, 1fr);
  }
`;

const Empty = styled.p`
  grid-column: 1 / -1;
  text-align: center;
  font-size: 1.2rem;
  color: ${({ theme }) => theme.textSecondary};
  padding: 2rem;
  background: ${({ theme }) => theme.bg2};
  border-radius: 8px;
`;
