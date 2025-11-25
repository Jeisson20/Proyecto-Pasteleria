import styled from "styled-components";
import { useProductForm } from "../../hook/useProductForm.jsx";
import { Button } from "../atomos/Button.jsx";

export function ProductForm({ editing, onSaved, onCancel }) {
  const {
    formData,
    handleChange,
    handleFile,
    handleDrop,
    handleSubmit,
    preview,
  } = useProductForm(editing, onSaved);

  return (
    <Form onSubmit={handleSubmit}>
      <label>
        Nombre del producto
        <input
          name="nombre"
          value={formData.nombre}
          onChange={handleChange}
          placeholder="Ej: Pastel de chocolate"
          required
        />
      </label>

      <label>
        Descripción
        <textarea
          name="descripcion"
          value={formData.descripcion}
          onChange={handleChange}
          placeholder="Describe el producto"
          required
        />
      </label>

      <label>
        Precio
        <input
          name="precio"
          type="number"
          value={formData.precio}
          onChange={handleChange}
          placeholder="Ej: 10.50"
          min="0"
          step="0.01"
          required
        />
      </label>

      <label>
        Stock disponible
        <input
          name="stock"
          type="number"
          value={formData.stock}
          onChange={handleChange}
          placeholder="Ej: 20"
          min="0"
          required
        />
      </label>

      <label>
        Costo (opcional)
        <input
          name="costo"
          type="number"
          value={formData.costo}
          onChange={handleChange}
          placeholder="Ej: 6.00"
          min="0"
          step="0.01"
        />
      </label>

      <label>
        % Ganancia (opcional)
        <input
          name="gananciaPercent"
          type="number"
          value={formData.gananciaPercent}
          onChange={handleChange}
          placeholder="Ej: 50"
          min="0"
          step="0.01"
        />
      </label>

      <DropZone onDrop={handleDrop} onDragOver={(e) => e.preventDefault()}>
        {preview ? (
          <img src={preview} alt="preview" />
        ) : (
          "Arrastra una imagen o haz clic"
        )}
        <input
          type="file"
          accept="image/*"
          onChange={(e) => handleFile(e.target.files[0])}
          required={!editing}
        />
      </DropZone>

      <Actions>
        <Button type="submit" $variant="primary">
          {editing?.id ? "Actualizar" : "Crear"}
        </Button>
        <Button type="button" onClick={onCancel} $variant="secondary">
          Cancelar
        </Button>
      </Actions>
    </Form>
  );
}

const Form = styled.form`
  display: grid;
  gap: 1rem;
  background: ${({ theme }) => theme.bgcards};
  padding: 2rem;
  border-radius: 12px;
  box-shadow: 0 4px 12px ${({ theme }) => theme.bg4};

  label {
    display: flex;
    flex-direction: column;
    font-weight: bold;
    color: ${({ theme }) => theme.textPrimary};
    gap: 0.3rem;
  }

  input,
  textarea {
    padding: 0.6rem;
    border: 1px solid ${({ theme }) => theme.bg4};
    border-radius: 6px;
    font-size: 1rem;
  }

  textarea {
    resize: vertical;
    min-height: 80px;
  }
`;

const DropZone = styled.label`
  border: 2px dashed ${({ theme }) => theme.primary};
  padding: 1rem;
  text-align: center;
  cursor: pointer;
  img {
    max-width: 100%;
    border-radius: 8px;
    margin-top: 1rem;
  }
  input {
    display: none;
  }
`;

const Actions = styled.div`
  display: flex;
  gap: 1rem;
  justify-content: flex-end;
`;
