import { useState } from "react";

const SHOW_LIMIT = 10;

export default function BrandFilter({ brands, selected, onToggle, onClear }) {
  const [expanded, setExpanded] = useState(false);

  if (brands.length === 0) return null;

  const visible = expanded ? brands : brands.slice(0, SHOW_LIMIT);
  const overflow = brands.length - SHOW_LIMIT;

  return (
    <div className="px-5 py-4">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-xs font-semibold uppercase tracking-widest text-[var(--color-text-tertiary)]">
          Brand
        </h3>
        {selected.length > 0 && (
          <button
            className="text-xs font-medium text-[var(--color-accent)] hover:text-[var(--color-accent-hover)] transition-colors"
            onClick={onClear}
            aria-label="Clear brand filter"
          >
            Clear
          </button>
        )}
      </div>

      <ul className="flex flex-col gap-1">
        {visible.map((brand) => {
          const checked = selected.includes(brand);
          return (
            <li key={brand}>
              <label
                className={`flex items-center gap-2 px-2 py-1 rounded-md cursor-pointer text-sm transition-colors ${checked ? "text-[var(--color-accent)]" : "text-[var(--color-text-secondary)] hover:bg-[var(--color-surface-hover)]"}`}
              >
                <input
                  type="checkbox"
                  className="accent-[var(--color-accent)] w-3.5 h-3.5"
                  checked={checked}
                  onChange={() => onToggle(brand)}
                />
                <span>{brand}</span>
              </label>
            </li>
          );
        })}
      </ul>

      {overflow > 0 && (
        <button
          className="mt-2 text-xs font-medium text-[var(--color-accent)] hover:text-[var(--color-accent-hover)] transition-colors"
          onClick={() => setExpanded((v) => !v)}
        >
          {expanded ? "Show less" : `Show ${overflow} more`}
        </button>
      )}
    </div>
  );
}
