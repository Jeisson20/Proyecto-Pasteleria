import { useState } from "react";
import styled from "styled-components";
import { useProducts } from "../../context/ProductContext.jsx";

export function ProductForm({ editing, onSaved, onCancel }) {
  const { createProduct, updateProduct } = useProducts();

  const [formData, setFormData] = useState(
    editing || {
      nombre: "",
      descripcion: "",
      precio: 0,
      stock: 0,
    }
  );

  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(editing?.imagen_url || "");

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleFile = (file) => {
    if (!file) return;
    const url = URL.createObjectURL(file);
    setPreview(url);
    setFile(file);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    handleFile(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    data.append("nombre", formData.nombre);
    data.append("descripcion", formData.descripcion);
    data.append("precio", formData.precio);
    data.append("stock", formData.stock);
    if (file) data.append("imagen", file);

    if (editing?.id) {
      await updateProduct(editing.id, data);
    } else {
      await createProduct(data);
    }
    onSaved();
  };

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
        <Button type="submit">{editing?.id ? "Actualizar" : "Crear"}</Button>
        <Button type="button" onClick={onCancel} $secondary>
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

const Button = styled.button`
  padding: 0.8rem 1.2rem;
  background: ${({ $secondary, theme }) =>
    $secondary ? theme.bg4 : theme.primary};
  color: white;
  border: none;
  border-radius: 6px;
  font-weight: bold;
  cursor: pointer;
  &:hover {
    opacity: 0.9;
  }
`;
