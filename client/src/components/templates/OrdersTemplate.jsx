import { Title } from "../atomos/Title.jsx";
import { OrdersList } from "../organismos/OrdersList.jsx";
import { useAuth } from "../../hook/useAuth.jsx";
import styled from "styled-components";

export function OrdersTemplate() {
  const { user } = useAuth();

  return (
    <Container>
      <Title className="title">
        📦 {user.rol === "cliente" ? "Mis pedidos" : "Gestión de pedidos"}
      </Title>
      <OrdersList />
    </Container>
  );
}

const Container = styled.div`
  padding: 2rem;
  background: ${({ theme }) => theme.bgtotal};
  color: ${({ theme }) => theme.text};
  min-height: 100vh;

  .title {
    font-size: clamp(1.5rem, 2vw + 1rem, 2.5rem);
    margin-bottom: 1rem;
  }
`;
