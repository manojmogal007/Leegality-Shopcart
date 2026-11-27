import { PackageOpen } from "lucide-react";

export default function EmptyState({ onClearFilters }) {
  return (
    <div className="flex flex-col items-center justify-center gap-4 py-20 text-center">
      <PackageOpen size={48} className="text-[var(--color-text-tertiary)]" />
      <h3 className="text-lg font-semibold text-[var(--color-text-primary)]">
        No products found
      </h3>
      <p className="text-sm text-[var(--color-text-secondary)] max-w-xs">
        No products match your current filters. Try adjusting or clearing them.
      </p>
      {onClearFilters && (
        <button
          className="text-sm font-medium text-[var(--color-accent)] hover:text-[var(--color-accent-hover)] transition-colors"
          onClick={onClearFilters}
        >
          Clear all filters
        </button>
      )}
    </div>
  );
}
