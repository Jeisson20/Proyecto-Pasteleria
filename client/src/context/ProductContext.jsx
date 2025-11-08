import { createContext, useContext, useState } from "react";
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

  const createProduct = async (data) => {
    const res = await createProductRequest(data);
    setProducts((prev) => [res.data, ...prev]);
    emit("PRODUCT_CREATED", res.data); // 🔔
  };

  const updateProduct = async (id, data) => {
    const res = await updateProductRequest(id, data);
    setProducts((prev) => prev.map((p) => (p.id === id ? res.data : p)));
    emit("PRODUCT_UPDATED", res.data); // 🔔
  };

  const deleteProduct = async (id) => {
    await deleteProductRequest(id);
    setProducts((prev) => prev.filter((p) => p.id !== id));
    emit("PRODUCT_DELETED", { id }); // 🔔
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
