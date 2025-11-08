import styled from "styled-components";
import { Header } from "../organismos/Header.jsx";
import { Title } from "../atomos/Title.jsx";
import SearchBar from "../moleculas/SearchBar.jsx";
import { ProductsList } from "../organismos/ProductsList.jsx";
import { ProductForm } from "../organismos/ProductForm.jsx";
import { useState } from "react";
import { useAuth } from "../../hook/useAuth.jsx";
import { useOrders } from "../../context/OrdersContext.jsx";

export function ProductsTemplate() {
  const [state, setState] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [editing, setEditing] = useState(null);
  const [showCart, setShowCart] = useState(false);

  const {
    cart,
    setCart,
    addToCart,
    removeFromCart,
    createOrder,
    getCartTotal,
  } = useOrders();
  const { user } = useAuth();
  const canEdit = user?.rol === "admin" || user?.rol === "empleado";

  const handleDecrease = (id) => {
    const item = cart.find((p) => p.id === id);
    if (!item) return;

    if (item.cantidad > 1) {
      const updated = cart.map((p) =>
        p.id === id ? { ...p, cantidad: p.cantidad - 1 } : p
      );
      setCart(updated);
    } else {
      removeFromCart(id);
    }
  };
  const handleCheckout = async () => {
    if (cart.length === 0) return;
    await createOrder();
  };

  return (
    <Container>
      <header className="header">
        <div className="area1">
          <Title className="title">Gestión de Productos</Title>
          <SearchBar value={searchTerm} onChange={setSearchTerm} />
        </div>
        <Header
          stateConfig={{ state: state, setState: () => setState(!state) }}
        />
      </header>

      <section>
        <ActionsRow>
          {canEdit && !editing && (
            <RegisterButton onClick={() => setEditing({})}>
              ➕ Registrar producto
            </RegisterButton>
          )}
          <CartToggle onClick={() => setShowCart(!showCart)}>
            🛒 Carrito ({cart.length})
          </CartToggle>
        </ActionsRow>

        <ProductsGrid>
          <ProductsList
            searchTerm={searchTerm}
            canEdit={canEdit}
            onEdit={(p) => setEditing(p)}
          />
        </ProductsGrid>
      </section>

      {canEdit && editing && (
        <ModalOverlay>
          <ModalContent>
            <ProductForm
              editing={editing.id ? editing : null}
              onSaved={() => setEditing(null)}
              onCancel={() => setEditing(null)}
            />
          </ModalContent>
        </ModalOverlay>
      )}

      {showCart && (
        <CartPanel>
          <CloseCart onClick={() => setShowCart(false)}>✖️</CloseCart>
          <h2>🛒 Tu carrito</h2>
          {cart.length === 0 ? (
            <Empty>El carrito está vacío</Empty>
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
                        <button onClick={() => handleDecrease(item.id)}>
                          ➖
                        </button>
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
            Finalizar pedido
          </Checkout>
        </CartPanel>
      )}
    </Container>
  );
}

const Container = styled.div`
  position: relative;
  min-height: 100vh;
  width: 100%;
  background-color: ${({ theme }) => theme.bgtotal};
  color: ${({ theme }) => theme.text};
  display: flex;
  flex-direction: column;
  padding: 1rem;

  .header {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .title {
    font-size: clamp(1.5rem, 2vw + 1rem, 2.5rem);
  }
`;

const RegisterButton = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.8rem 1.2rem;
  background: ${({ theme }) => theme.primary};
  color: white;
  border: none;
  border-radius: 8px;
  font-weight: bold;
  cursor: pointer;
  transition: transform 0.2s ease, background 0.3s ease;

  &:hover {
    background: ${({ theme }) => theme.primaryHover};
    transform: scale(1.05);
  }
`;
const ProductsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
  margin-top: 1rem;
`;
const ActionsRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 1rem;
`;

const CartToggle = styled.button`
  background: ${({ theme }) => theme.bg4};
  color: ${({ theme }) => theme.text};
  border: none;
  padding: 0.6rem 1rem;
  border-radius: 8px;
  font-weight: bold;
  cursor: pointer;
  transition: background 0.3s ease;

  &:hover {
    background: ${({ theme }) => theme.primaryHover};
    color: white;
  }
`;

const CartPanel = styled.div`
  position: fixed;
  top: 6rem;
  right: 1rem;
  width: 320px;
  background: ${({ theme }) => theme.bgcards};
  border-radius: 12px;
  padding: 1rem;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  z-index: 100;

  ul {
    list-style: none;
    padding: 0;
    margin: 0;
  }

  li {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    margin-bottom: 1rem;
  }

  img {
    width: 40px;
    height: 40px;
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

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.4);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 200;
`;

const ModalContent = styled.div`
  background: ${({ theme }) => theme.bgcards};
  padding: 2rem;
  border-radius: 12px;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.2);
  width: 100%;
  max-width: 500px;
`;

const Empty = styled.p`
  text-align: center;
  color: ${({ theme }) => theme.textSecondary};
`;

const Checkout = styled.button`
  width: 100%;
  padding: 0.8rem;
  background: ${({ theme }) => theme.primary};
  color: white;
  border: none;
  border-radius: 8px;
  font-weight: bold;
  cursor: pointer;
  margin-top: 1rem;

  &:disabled {
    background: ${({ theme }) => theme.bg4};
    cursor: not-allowed;
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

const CloseCart = styled.button`
  position: absolute;
  top: 0.5rem;
  right: 0.5rem;
  background: transparent;
  border: none;
  font-size: 1.2rem;
  cursor: pointer;
  color: ${({ theme }) => theme.text};
`;
