import { createContext, useContext, useState, useEffect } from "react";
import {
  getProductsRequest,
  createProductRequest,
  updateProductRequest,
  deleteProductRequest,
} from "../api/products";

const ProductsContext = createContext();

export const useProducts = () => {
  const context = useContext(ProductsContext);
  if (!context)
    throw new Error("useProducts must be used within a ProductsProvider");
  return context;
};

export const ProductsProvider = ({ children }) => {
  const [products, setProducts] = useState([]);

  // 🔔 Observer subscribers
  const subscribers = [];

  const subscribe = (callback) => {
    subscribers.push(callback);
    return () => {
      const index = subscribers.indexOf(callback);
      if (index !== -1) subscribers.splice(index, 1);
    };
  };

  const emit = (event, payload) => {
    subscribers.forEach((callback) => callback(event, payload));
  };

  const getProducts = async () => {
    const res = await getProductsRequest();
    setProducts(res.data);
  };

  // Escucha eventos globales de eliminación de pedido para refrescar stock
  // Motivo: cuando se elimina un pedido en la interfaz, el servidor restaura
  // el stock de los productos; aquí respondemos a ese evento recargando
  // la lista de productos para que la UI muestre los valores actualizados.
  useEffect(() => {
    const handler = () => {
      // Al recibir el evento intentamos recargar la lista de productos.
      getProducts().catch((err) =>
        console.error("Error refreshing products:", err)
      );
    };
    window.addEventListener("ORDER_DELETED", handler);
    return () => window.removeEventListener("ORDER_DELETED", handler);
  }, []);

  const createProduct = async (data) => {
    // Al crear un producto el backend puede devolver dos comportamientos:
    // - Inserta un nuevo producto.
    // - Si ya existe un producto con el mismo `nombre`, incrementa su `stock`
    //   y devuelve el registro actualizado. Aquí nos aseguramos de no
    //   duplicar el producto en la UI y de reemplazar el existente si procede.
    const res = await createProductRequest(data);
    setProducts((prev) => {
      const existsIndex = prev.findIndex((p) => p.id === res.data.id);
      if (existsIndex !== -1) {
        // Reemplaza el producto existente con la respuesta del servidor
        const copy = [...prev];
        copy[existsIndex] = res.data;
        return copy;
      }
      return [res.data, ...prev];
    });
    emit("PRODUCT_CREATED", res.data); // 🔔 emitimos para suscriptores locales
  };

  const updateProduct = async (id, data) => {
    const res = await updateProductRequest(id, data);
    setProducts((prev) => prev.map((p) => (p.id === id ? res.data : p)));
    emit("PRODUCT_UPDATED", res.data); // 🔔
  };

  const deleteProduct = async (id) => {
    try {
      const res = await deleteProductRequest(id);
      // allow 204 or 200
      if (res.status === 204 || res.status === 200) {
        setProducts((prev) => prev.filter((p) => p.id !== id));
        emit("PRODUCT_DELETED", { id }); // 🔔
      }
    } catch (error) {
      const msg =
        error?.response?.data?.message ||
        error.message ||
        "Error al eliminar producto";
      window.alert(msg);
    }
  };

  return (
    <ProductsContext.Provider
      value={{
        products,
        getProducts,
        createProduct,
        updateProduct,
        deleteProduct,
        subscribe, // 🔔
      }}
    >
      {children}
    </ProductsContext.Provider>
  );
};
