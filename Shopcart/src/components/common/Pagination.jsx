import { ChevronLeft, ChevronRight } from "lucide-react";

export default function Pagination({
  currentPage,
  totalPages,
  totalCount,
  pageSize,
  onPageChange,
}) {
  if (totalPages <= 1) return null;

  const start = (currentPage - 1) * pageSize + 1;
  const end = Math.min(currentPage * pageSize, totalCount);

  const btnBase =
    "inline-flex items-center justify-center w-8 h-8 rounded-md text-sm font-medium border border-[var(--color-border)] bg-white text-[var(--color-text-primary)] hover:bg-[var(--color-surface-hover)] transition-colors disabled:opacity-40 disabled:cursor-not-allowed";

  return (
    <nav
      className="flex flex-wrap items-center justify-between gap-3 mt-8"
      aria-label="Product list pagination"
    >
      <span className="text-sm text-[var(--color-text-secondary)]">
        Showing {start}–{end} of {totalCount}
      </span>

      <div className="flex items-center gap-1">
        <button
          className={btnBase}
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          aria-label="Previous page"
        >
          <ChevronLeft size={16} />
        </button>

        <span className="px-3 text-sm text-[var(--color-text-secondary)]">
          Page {currentPage} of {totalPages}
        </span>

        <button
          className={btnBase}
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          aria-label="Next page"
        >
          <ChevronRight size={16} />
        </button>
      </div>
    </nav>
  );
}
