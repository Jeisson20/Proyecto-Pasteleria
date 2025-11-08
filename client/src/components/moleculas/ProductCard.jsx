import styled from "styled-components";
import { Button } from "../atomos/Button.jsx";
import { Icono } from "../atomos/Icono.jsx";
import { useOrders } from "../../context/OrdersContext.jsx";

export default function ProductCard({ product, canEdit, onEdit, onDelete }) {
  const { addToCart } = useOrders();

  return (
    <Card>
      <img
        src={`http://localhost:3000${product.imagen_url}`}
        alt={product.nombre}
      />
      <h3>
        {product.nombre} -stock:{product.stock}
      </h3>
      <p>{product.descripcion}</p>
      <span>${product.precio}</span>

      <div className="actions">
        <Button onClick={() => addToCart(product)}>Agregar al carrito</Button>
        {canEdit && (
          <>
            <Button onClick={() => onEdit(product)}>
              <Icono>✏️</Icono>
            </Button>
            <Button onClick={() => onDelete(product.id)}>
              <Icono>🗑️</Icono>
            </Button>
          </>
        )}
      </div>
    </Card>
  );
}

const Card = styled.div`
  background: ${({ theme }) => theme.bgcards};
  border: 1px solid ${({ theme }) => theme.bg4};
  border-radius: 16px;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  transition: transform 0.2s ease, box-shadow 0.2s ease;

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 6px 16px rgba(0, 0, 0, 0.12);
  }

  img {
    width: 100%;
    height: 180px;
    object-fit: cover;
    border-radius: 12px;
  }

  h3 {
    font-size: 1.2rem;
    font-weight: 600;
    margin: 0;
    color: ${({ theme }) => theme.text};
  }

  p {
    font-size: 0.95rem;
    color: ${({ theme }) => theme.text2};
    margin: 0;
  }

  span {
    font-weight: 700;
    font-size: 1.1rem;
    color: ${({ theme }) => theme.primary};
  }

  .actions {
    display: flex;
    gap: 0.5rem;
    margin-top: auto;
  }
`;
