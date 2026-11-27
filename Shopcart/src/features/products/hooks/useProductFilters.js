import { useCallback } from "react";
import { useSearchParams } from "react-router-dom";

function parseFilters(params) {
  const brandsStr = params.get("brands") || "";
  return {
    category: params.get("category") || "",
    minPrice: params.get("minPrice") || "",
    maxPrice: params.get("maxPrice") || "",
    brands: brandsStr ? brandsStr.split(",").filter(Boolean) : [],
    page: Math.max(1, parseInt(params.get("page") || "1", 10)),
  };
}

export function useProductFilters() {
  const [searchParams, setSearchParams] = useSearchParams();
  const filters = parseFilters(searchParams);

  const setCategory = useCallback(
    (slug) => {
      setSearchParams((prev) => {
        const next = new URLSearchParams(prev);
        if (slug) {
          next.set("category", slug);
        } else next.delete("category");
        next.delete("brands");
        next.delete("page");
        return next;
      });
    },
    [setSearchParams],
  );

  const setMinPrice = useCallback(
    (val) => {
      setSearchParams((prev) => {
        const next = new URLSearchParams(prev);
        if (val !== "" && val !== null) {
          next.set("minPrice", String(val));
        } else next.delete("minPrice");
        next.delete("page");
        return next;
      });
    },
    [setSearchParams],
  );

  const setMaxPrice = useCallback(
    (val) => {
      setSearchParams((prev) => {
        const next = new URLSearchParams(prev);
        if (val !== "" && val !== null) {
          next.set("maxPrice", String(val));
        } else next.delete("maxPrice");
        next.delete("page");
        return next;
      });
    },
    [setSearchParams],
  );

  const setPriceRange = useCallback(
    (min, max) => {
      setSearchParams((prev) => {
        const next = new URLSearchParams(prev);
        if (min !== "" && min !== null) next.set("minPrice", String(min));
        else next.delete("minPrice");
        if (max !== "" && max !== null) next.set("maxPrice", String(max));
        else next.delete("maxPrice");
        next.delete("page");
        return next;
      });
    },
    [setSearchParams],
  );

  const toggleBrand = useCallback(
    (brand) => {
      setSearchParams((prev) => {
        const next = new URLSearchParams(prev);
        const brandsStr = prev.get("brands") || "";
        const current = brandsStr ? brandsStr.split(",").filter(Boolean) : [];
        const updated = current.includes(brand)
          ? current.filter((b) => b !== brand)
          : [...current, brand];
        if (updated.length > 0) next.set("brands", updated.join(","));
        else next.delete("brands");
        next.delete("page");
        return next;
      });
    },
    [setSearchParams],
  );

  const clearBrands = useCallback(() => {
    setSearchParams((prev) => {
      const next = new URLSearchParams(prev);
      next.delete("brands");
      next.delete("page");
      return next;
    });
  }, [setSearchParams]);

  const setPage = useCallback(
    (page) => {
      setSearchParams((prev) => {
        const next = new URLSearchParams(prev);
        if (page > 1) next.set("page", String(page));
        else next.delete("page");
        return next;
      });
    },
    [setSearchParams],
  );

  const clearFilters = useCallback(
    () => setSearchParams({}),
    [setSearchParams],
  );

  return {
    filters,
    setCategory,
    setMinPrice,
    setMaxPrice,
    setPriceRange,
    toggleBrand,
    clearBrands,
    setPage,
    clearFilters,
  };
}
