import styled from "styled-components";
import { useAuth } from "../../hook/useAuth.jsx";

export function PerfilModal({ onClose }) {
  const { user } = useAuth();

  return (
    <Overlay>
      <Modal>
        <h2>Mi perfil</h2>
        <p>
          <strong>Nombre:</strong> {user?.nombre}
        </p>
        <p>
          <strong>Email:</strong> {user?.email}
        </p>
        <p>
          <strong>Rol:</strong> {user?.rol}
        </p>
        <button onClick={onClose}>Cerrar</button>
      </Modal>
    </Overlay>
  );
}

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 99;
`;

const Modal = styled.div`
  background: ${({ theme }) => theme.bgcards};
  color: ${({ theme }) => theme.text};
  padding: 2rem;
  border-radius: 12px;
  width: 300px;
  box-shadow: 0 0 10px ${({ theme }) => theme.bg4};

  h2 {
    margin-bottom: 1rem;
  }

  button {
    margin-top: 1rem;
    padding: 0.5rem 1rem;
    background: ${({ theme }) => theme.primary};
    color: white;
    border: none;
    border-radius: 6px;
    cursor: pointer;
  }
`;
