"use client";

import React, { createContext, useContext, useEffect, useState } from "react";

interface Product {
  id: number;
  name: string;
  price: number;
  stock: number;
  // Diğer alanları da ekleyebilirsin
}

interface ProductContextType {
  products: Product[];
  loading: boolean;
  error: string | null;
  refetch: () => void;
}

const ProductContext = createContext<ProductContextType | undefined>(undefined);

export const ProductProvider = ({ children }: { children: React.ReactNode }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchProducts = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("https://devcase.isiksoftyazilim.com/api/products?page=1");
      if (!res.ok) throw new Error("API'den veri alınamadı.");
      const data = await res.json();
      setProducts(data.products); // Eğer `data.products` değilse, console ile bakıp düzeltiriz
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <ProductContext.Provider value={{ products, loading, error, refetch: fetchProducts }}>
      {children}
    </ProductContext.Provider>
  );
};

export const useProductContext = () => {
  const context = useContext(ProductContext);
  if (!context) throw new Error("useProductContext must be used within a ProductProvider");
  return context;
};
