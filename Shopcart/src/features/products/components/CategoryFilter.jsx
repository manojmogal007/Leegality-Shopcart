import { useState, useEffect } from "react";
import { fetchCategories } from "../services/productService";
import { RefreshCw } from "lucide-react";

export default function CategoryFilter({ selected, onSelect }) {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [retryCount, setRetryCount] = useState(0);

  useEffect(() => {
    const controller = new AbortController();
    setLoading(true);
    setError(null);

    fetchCategories(controller.signal)
      .then((data) => {
        setCategories(Array.isArray(data) ? data : []);
        setLoading(false);
      })
      .catch((err) => {
        if (err.name === "AbortError") return;
        setError("Failed to load categories.");
        setLoading(false);
      });

    return () => controller.abort();
  }, [retryCount]);

  if (loading) {
    return (
      <div className="px-5 py-4">
        <h3 className="text-xs font-semibold uppercase tracking-widest text-[var(--color-text-tertiary)] mb-3">
          Category
        </h3>
        <div className="flex flex-col gap-2">
          {Array.from({ length: 6 }, (_, i) => (
            <div
              key={i}
              className="skeleton h-4 rounded"
              style={{ width: `${70 + (i % 3) * 10}%` }}
            />
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="px-5 py-4">
        <h3 className="text-xs font-semibold uppercase tracking-widest text-[var(--color-text-tertiary)] mb-3">
          Category
        </h3>
        <p className="text-xs text-[var(--color-discount)] mb-2">{error}</p>
        <button
          className="inline-flex items-center gap-1 text-xs font-medium text-[var(--color-accent)] hover:text-[var(--color-accent-hover)] transition-colors"
          onClick={() => setRetryCount((c) => c + 1)}
        >
          <RefreshCw size={12} />
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="px-5 py-4">
      <h3 className="text-xs font-semibold uppercase tracking-widest text-[var(--color-text-tertiary)] mb-3">
        Category
      </h3>
      <ul
        className="flex flex-col gap-0.5"
        role="listbox"
        aria-label="Product categories"
      >
        <li>
          <button
            role="option"
            aria-selected={!selected}
            className={`w-full text-left px-2 py-1.5 rounded-md text-sm transition-colors ${!selected ? "bg-[var(--color-accent-light)] text-[var(--color-accent)] font-medium" : "text-[var(--color-text-secondary)] hover:bg-[var(--color-surface-hover)]"}`}
            onClick={() => onSelect("")}
          >
            All Categories
          </button>
        </li>
        {categories.map((cat) => (
          <li key={cat.slug}>
            <button
              role="option"
              aria-selected={selected === cat.slug}
              className={`w-full text-left px-2 py-1.5 rounded-md text-sm transition-colors ${selected === cat.slug ? "bg-[var(--color-accent-light)] text-[var(--color-accent)] font-medium" : "text-[var(--color-text-secondary)] hover:bg-[var(--color-surface-hover)]"}`}
              onClick={() => onSelect(cat.slug)}
            >
              {cat.name}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
