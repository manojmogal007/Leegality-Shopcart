import { X } from "lucide-react";
import CategoryFilter from "./CategoryFilter";
import PriceFilter from "./PriceFilter";
import BrandFilter from "./BrandFilter";

export default function ProductFilters({
  isOpen,
  onClose,
  filters,
  availableBrands,
  onCategoryChange,
  onMinPriceChange,
  onMaxPriceChange,
  onPriceRangeApply,
  onBrandToggle,
  onBrandsClear,
  onClearAll,
}) {
  const hasActiveFilters =
    filters.category ||
    filters.minPrice ||
    filters.maxPrice ||
    filters.brands.length > 0;

  return (
    <>
      <div
        className={`fixed inset-0 z-20 bg-black/40 transition-opacity duration-200 lg:hidden ${isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}
        onClick={onClose}
        aria-hidden="true"
      />

      <aside
        className={`fixed top-0 left-0 z-30 h-full w-64 bg-white border-r border-[var(--color-border)] flex flex-col overflow-y-auto transition-transform duration-300 lg:sticky lg:top-15 lg:z-auto lg:h-[calc(100vh-60px)] lg:translate-x-0 ${isOpen ? "translate-x-0" : "-translate-x-full"}`}
        aria-label="Product filters"
      >
        <div className="flex items-center justify-between px-5 py-4 border-b border-[var(--color-border)]">
          <span className="font-semibold text-[var(--color-text-primary)]">
            Filters
          </span>
          <div className="flex items-center gap-2">
            {hasActiveFilters && (
              <button
                className="text-xs font-medium text-[var(--color-accent)] hover:text-[var(--color-accent-hover)] transition-colors"
                onClick={onClearAll}
              >
                Clear all
              </button>
            )}
            <button
              className="p-1 rounded hover:bg-[var(--color-surface-hover)] text-[var(--color-text-secondary)] lg:hidden transition-colors"
              onClick={onClose}
              aria-label="Close filters"
            >
              <X size={18} />
            </button>
          </div>
        </div>

        <div className="flex flex-col divide-y divide-[var(--color-border)]">
          <CategoryFilter
            selected={filters.category}
            onSelect={onCategoryChange}
          />
          <PriceFilter
            minPrice={filters.minPrice}
            maxPrice={filters.maxPrice}
            onMinChange={onMinPriceChange}
            onMaxChange={onMaxPriceChange}
            onApply={onPriceRangeApply}
          />
          <BrandFilter
            brands={availableBrands}
            selected={filters.brands}
            onToggle={onBrandToggle}
            onClear={onBrandsClear}
          />
        </div>
      </aside>
    </>
  );
}
