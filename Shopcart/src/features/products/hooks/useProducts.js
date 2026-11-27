import { useState, useEffect, useCallback } from "react";
import {
  fetchProducts,
  fetchProductsByCategory,
} from "../services/productService";

export function useProducts(category, page, pageSize) {
  const [products, setProducts] = useState([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [retryCount, setRetryCount] = useState(0);

  useEffect(() => {
    const controller = new AbortController();
    const skip = (page - 1) * pageSize;

    setLoading(true);
    setError(null);
    setProducts([]);

    const promise = category
      ? fetchProductsByCategory(category, controller.signal, {
          limit: pageSize,
          skip,
        })
      : fetchProducts(controller.signal, { limit: pageSize, skip });

    promise
      .then((data) => {
        setProducts(Array.isArray(data.products) ? data.products : []);
        setTotal(typeof data.total === "number" ? data.total : 0);
        setLoading(false);
      })
      .catch((err) => {
        if (err.name === "AbortError") return;
        setError(err.message || "Failed to load products.");
        setLoading(false);
      });

    return () => controller.abort();
  }, [category, page, pageSize, retryCount]);

  const retry = useCallback(() => setRetryCount((c) => c + 1), []);

  return { products, total, loading, error, retry };
}
