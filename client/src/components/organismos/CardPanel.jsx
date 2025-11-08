import styled from "styled-components";
import { useOrders } from "../../context/OrdersContext.jsx";

export function CardPanel() {
  const { cart, addToCart, removeFromCart, createOrder, getCartTotal } =
    useOrders();

  const handleDecrease = (id) => {
    const item = cart.find((p) => p.id === id);
    if (item.cantidad > 1) {
      const updated = cart.map((p) =>
        p.id === id ? { ...p, cantidad: p.cantidad - 1 } : p
      );
      localStorage.setItem("cart", JSON.stringify(updated));
      window.dispatchEvent(new Event("storage"));
    } else {
      removeFromCart(id);
    }
  };

  const handleCheckout = async () => {
    if (cart.length === 0) return;
    await createOrder();
    alert("✅ Pedido realizado con éxito");
  };

  return (
    <Panel>
      <h2>🛒 Carrito</h2>
      {cart.length === 0 ? (
        <Empty>No hay productos en el carrito</Empty>
      ) : (
        <>
          <ul>
            {cart.map((item) => (
              <li key={item.id}>
                <img
                  src={`http://localhost:3000${item.imagen_url}`}
                  alt={item.nombre}
                />
                <div>
                  <strong>{item.nombre}</strong>
                  <span>
                    ${item.precio} x {item.cantidad} = $
                    {item.precio * item.cantidad}
                  </span>
                  <QuantityControls>
                    <button onClick={() => handleDecrease(item.id)}>➖</button>
                    <button onClick={() => addToCart(item)}>➕</button>
                  </QuantityControls>
                </div>
                <button onClick={() => removeFromCart(item.id)}>❌</button>
              </li>
            ))}
          </ul>
          <Total>
            Total: <strong>${getCartTotal()}</strong>
          </Total>
        </>
      )}
      <Checkout disabled={cart.length === 0} onClick={handleCheckout}>
        Realizar pedido
      </Checkout>
    </Panel>
  );
}

const Panel = styled.div`
  background: ${({ theme }) => theme.bgcards};
  border-radius: 12px;
  padding: 1rem;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);

  ul {
    list-style: none;
    padding: 0;
    margin: 0;
  }

  li {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    margin-bottom: 1rem;
  }

  img {
    width: 50px;
    height: 50px;
    object-fit: cover;
    border-radius: 6px;
  }

  button {
    background: transparent;
    border: none;
    font-size: 1.2rem;
    cursor: pointer;
  }
`;

const QuantityControls = styled.div`
  display: flex;
  gap: 0.5rem;
  margin-top: 0.25rem;

  button {
    background: ${({ theme }) => theme.bg4};
    border: none;
    padding: 0.3rem 0.6rem;
    border-radius: 6px;
    cursor: pointer;
    font-weight: bold;
  }
`;

const Total = styled.p`
  text-align: right;
  font-size: 1.1rem;
  font-weight: bold;
  margin-top: 1rem;
`;

const Empty = styled.p`
  color: ${({ theme }) => theme.text2};
  font-style: italic;
`;

const Checkout = styled.button`
  margin-top: 1rem;
  width: 100%;
  padding: 0.8rem;
  background: ${({ theme }) => theme.primary};
  color: white;
  border: none;
  border-radius: 6px;
  font-weight: bold;
  cursor: pointer;

  &:disabled {
    background: ${({ theme }) => theme.bg4};
    cursor: not-allowed;
  }
`;
