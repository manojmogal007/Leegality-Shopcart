import { useMemo, useState } from "react";
import { SlidersHorizontal } from "lucide-react";
import Header from "../components/layout/Header";
import ProductFilters from "../features/products/components/ProductFilters";
import ProductGrid from "../features/products/components/ProductGrid";
import Pagination from "../components/common/Pagination";
import ErrorMessage from "../components/common/ErrorMessage";
import EmptyState from "../components/common/EmptyState";
import { useProducts } from "../features/products/hooks/useProducts";
import { useProductFilters } from "../features/products/hooks/useProductFilters";
import {
  applyFilters,
  extractBrands,
} from "../features/products/utils/filterUtils";
import { PAGE_SIZE } from "../features/products/constants";

export default function ProductListingPage() {
  const [filtersOpen, setFiltersOpen] = useState(false);
  const {
    filters,
    setCategory,
    setMinPrice,
    setMaxPrice,
    setPriceRange,
    toggleBrand,
    clearBrands,
    setPage,
    clearFilters,
  } = useProductFilters();

  const { products, total, loading, error, retry } = useProducts(
    filters.category,
    filters.page,
    PAGE_SIZE,
  );

  const filteredProducts = useMemo(
    () => applyFilters(products, filters),
    [products, filters.minPrice, filters.maxPrice, filters.brands.join(",")],
  );

  const availableBrands = useMemo(() => extractBrands(products), [products]);

  const totalPages = Math.max(1, Math.ceil(total / PAGE_SIZE));
  const currentPage = filters.page;

  const filterCount = useMemo(
    () =>
      Number(Boolean(filters.category)) +
      Number(Boolean(filters.minPrice && filters.maxPrice)) +
      Number(filters.brands.length > 0),
    [filters],
  );

  return (
    <div className="min-h-screen bg-[var(--color-bg)]">
      <Header />

      <div className="flex max-w-[1440px] mx-auto">
        <ProductFilters
          isOpen={filtersOpen}
          onClose={() => setFiltersOpen(false)}
          filters={filters}
          availableBrands={availableBrands}
          onCategoryChange={setCategory}
          onMinPriceChange={setMinPrice}
          onMaxPriceChange={setMaxPrice}
          onPriceRangeApply={setPriceRange}
          onBrandToggle={toggleBrand}
          onBrandsClear={clearBrands}
          onClearAll={clearFilters}
        />

        <main className="flex-1 min-w-0 px-5 py-5">
          <div className="flex items-center justify-between mb-5">
            <button
              className="lg:hidden inline-flex items-center gap-2 px-3 py-2 text-sm font-medium rounded-md border border-[var(--color-border)] bg-white hover:bg-[var(--color-surface-hover)] transition-colors relative"
              onClick={() => setFiltersOpen(true)}
              aria-label="Open filters"
            >
              <SlidersHorizontal size={16} />
              Filters
              {filterCount > 0 && (
                <span
                  className="absolute -top-2 -right-2 w-5 h-5 rounded-full text-white text-sm bg-[var(--color-accent)]"
                  aria-hidden="true"
                >
                  {filterCount}
                </span>
              )}
            </button>

            <div className="flex items-center gap-3 ml-auto">
              {!loading && !error && (
                <span className="text-sm text-[var(--color-text-secondary)]">
                  {filteredProducts.length}{" "}
                  {filteredProducts.length === 1 ? "product" : "products"}
                </span>
              )}
              {filterCount > 0 && !loading && (
                <button
                  className="text-sm font-medium text-[var(--color-accent)] hover:text-[var(--color-accent-hover)] transition-colors"
                  onClick={clearFilters}
                >
                  Clear filters
                </button>
              )}
            </div>
          </div>

          {error ? (
            <ErrorMessage message={error} onRetry={retry} />
          ) : filteredProducts.length === 0 && !loading ? (
            <EmptyState
              onClearFilters={filterCount > 0 ? clearFilters : undefined}
            />
          ) : (
            <>
              <ProductGrid products={filteredProducts} loading={loading} />
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                totalCount={filteredProducts.length}
                pageSize={PAGE_SIZE}
                onPageChange={setPage}
              />
            </>
          )}
        </main>
      </div>
    </div>
  );
}
