import { useState } from "react";
import { useProducts } from "../context/ProductContext.jsx";

export function useProductForm(editing, onSaved) {
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

  return {
    formData,
    handleChange,
    handleFile,
    handleDrop,
    handleSubmit,
    preview,
  };
}
