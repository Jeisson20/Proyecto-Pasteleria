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

  const getProducts = async () => {
    const res = await getProductsRequest();
    setProducts(res.data);
  };

  const createProduct = async (data) => {
    const res = await createProductRequest(data);
    setProducts((prev) => [res.data, ...prev]);
  };

  const updateProduct = async (id, data) => {
    const res = await updateProductRequest(id, data);
    setProducts((prev) => prev.map((p) => (p.id === id ? res.data : p)));
  };

  const deleteProduct = async (id) => {
    await deleteProductRequest(id);
    setProducts((prev) => prev.filter((p) => p.id !== id));
  };

  return (
    <ProductsContext.Provider
      value={{
        products,
        getProducts,
        createProduct,
        updateProduct,
        deleteProduct,
      }}
    >
      {children}
    </ProductsContext.Provider>
  );
};
