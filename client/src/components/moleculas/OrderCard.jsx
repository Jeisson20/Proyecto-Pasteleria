import styled from "styled-components";
import { useOrders } from "../../context/OrdersContext.jsx";
import { useAuth } from "../../hook/useAuth.jsx";

export function OrderCard({ order }) {
  const { updateOrder, deleteOrder } = useOrders();
  const { user } = useAuth();
  const isAdmin = user.rol === "admin" || user.rol === "empleado";

  const handlePrint = () => {
    const pedidoElement = document.getElementById(`pedido-${order.id}`);
    pedidoElement.classList.add("printable");
    window.print();
    pedidoElement.classList.remove("printable");
  };

  const handleUpdate = () => {
    updateOrder(order.id, "Entregado");
  };

  const handleDelete = () => {
    deleteOrder(order.id);
  };

  return (
    <Card id={`pedido-${order.id}`}>
      <Printable>
        <h3>Pedido #{order.id}</h3>
        <p>
          <strong>Cliente:</strong> {order.cliente_nombre}
        </p>
        <p>
          <strong>Estado:</strong> {order.estado}
        </p>
        <p>
          <strong>Fecha:</strong> {new Date(order.fecha).toLocaleDateString()}
        </p>
        <ul>
          {(order.productos ?? []).map((p) => (
            <li key={p.id}>
              {p.nombre} — {p.cantidad} x {p.precio}
            </li>
          ))}
        </ul>

        <p>
          <strong>Total:</strong> ${order.total}
        </p>
      </Printable>

      <Actions>
        <button onClick={handlePrint}>🖨️ Imprimir</button>
        {isAdmin ? (
          <>
            <button onClick={handleUpdate}>✏️ Marcar Entregado</button>
            <button onClick={handleDelete}>🗑️ Eliminar</button>
          </>
        ) : (
          <button>💳 Pagar</button>
        )}
      </Actions>
    </Card>
  );
}

const Card = styled.div`
  background: ${({ theme }) => theme.bgcards};
  padding: 1rem;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
`;

const Printable = styled.div`
  font-family: "Arial", sans-serif;
  padding: 1rem;
`;

const Actions = styled.div`
  display: flex;
  gap: 0.5rem;
  margin-top: 1rem;

  button {
    padding: 0.4rem 0.8rem;
    border-radius: 6px;
    border: none;
    cursor: pointer;
    font-weight: bold;
  }
`;
