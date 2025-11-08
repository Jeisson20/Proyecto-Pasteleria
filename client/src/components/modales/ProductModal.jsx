import styled from "styled-components";
import { ProductForm } from "../organismos/ProductForm.jsx";

export function ProductModal({ editing, onClose }) {
  return (
    <Overlay>
      <Modal>
        <ProductForm
          editing={editing.id ? editing : null}
          onSaved={onClose}
          onCancel={onClose}
        />
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
  align-items: center;
  justify-content: center;
`;

const Modal = styled.div`
  background: white;
  padding: 2rem;
  border-radius: 8px;
  min-width: 320px;
`;
