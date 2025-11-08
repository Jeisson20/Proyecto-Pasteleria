import { useEffect } from "react";
import { useProducts } from "../../context/ProductContext.jsx";
import ProductCard from "../moleculas/ProductCard.jsx";

import styled from "styled-components";

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1rem;
`;

export function ProductsList({ searchTerm, canEdit, onEdit }) {
  const { products, getProducts, deleteProduct } = useProducts();

  useEffect(() => {
    getProducts();
  }, []);

  const filtered = products.filter((p) =>
    (p.nombre || "").toLowerCase().includes((searchTerm || "").toLowerCase())
  );

  return (
    <Grid>
      {filtered.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          canEdit={canEdit}
          onEdit={onEdit}
          onDelete={deleteProduct}
        />
      ))}
    </Grid>
  );
}
