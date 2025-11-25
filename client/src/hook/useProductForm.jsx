import { useState } from "react";
import { useProducts } from "../context/ProductContext.jsx";

export function useProductForm(editing, onSaved) {
  const { createProduct, updateProduct } = useProducts();

  const [formData, setFormData] = useState(
    editing || {
      nombre: "",
      descripcion: "",
      costo: 0,
      gananciaPercent: 0,
      precio: 0,
      stock: 0,
    }
  );

  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(editing?.imagen_url || "");

  const handleChange = (e) => {
    const { name, value } = e.target;
    const updated = { ...formData, [name]: value };

    // Si cambian `costo` o `gananciaPercent` recalculamos `precio` automáticamente
    // para mejorar la UX: el usuario ve el precio resultante mientras edita.
    if (name === "costo" || name === "gananciaPercent") {
      const costo = Number(name === "costo" ? value : updated.costo ?? 0);
      const gan = Number(
        name === "gananciaPercent" ? value : updated.gananciaPercent ?? 0
      );
      const precioCalc = costo * (1 + (gan || 0) / 100);
      updated.precio = Number(precioCalc.toFixed(2));
    }

    setFormData(updated);
  };

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
    // Enviamos `costo` y `gananciaPercent` al servidor para que éste pueda
    // calcular y persistir `precio` y `ganancia_percent` de forma consistente.
    if (formData.costo !== undefined) data.append("costo", formData.costo);
    if (formData.gananciaPercent !== undefined)
      data.append("gananciaPercent", formData.gananciaPercent);
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
