import { useState, useEffect } from "react";

export default function PriceFilter({
  minPrice,
  maxPrice,
  onMinChange,
  onMaxChange,
  onApply,
}) {
  const [localMin, setLocalMin] = useState(minPrice);
  const [localMax, setLocalMax] = useState(maxPrice);
  const [validationError, setValidationError] = useState("");

  useEffect(() => {
    setLocalMin(minPrice);
  }, [minPrice]);
  useEffect(() => {
    setLocalMax(maxPrice);
  }, [maxPrice]);

  function validate(min, max) {
    if (min === "" || max === "")
      return "Both min and max prices are required.";
    if (Number(min) < 0 || Number(max) < 0)
      return "Price must be a positive number.";
    if (Number(min) > Number(max)) return "Min price cannot exceed max price.";
    return "";
  }

  const canApply =
    localMin !== "" && localMax !== "" && !validate(localMin, localMax);

  function handleApply() {
    const err = validate(localMin, localMax);
    setValidationError(err);
    if (err) return;
    onApply(localMin, localMax);
  }

  function handleKeyDown(e) {
    if (e.key === "Enter") handleApply();
  }

  function handleMinChange(val) {
    setLocalMin(val);
    setValidationError(validate(val, localMax));
  }

  function handleMaxChange(val) {
    setLocalMax(val);
    setValidationError(validate(localMin, val));
  }

  const inputCls =
    "w-full px-2.5 py-1.5 text-sm rounded-md border border-[var(--color-border)] bg-white text-[var(--color-text-primary)] placeholder-[var(--color-text-tertiary)] focus:outline-none focus:border-[var(--color-accent)] transition-colors";

  return (
    <div className="px-5 py-4">
      <h3 className="text-xs font-semibold uppercase tracking-widest text-[var(--color-text-tertiary)] mb-3">
        Price Range
      </h3>

      <div className="flex items-end gap-2">
        <div className="flex flex-col gap-1 flex-1">
          <label
            htmlFor="price-min"
            className="text-xs text-[var(--color-text-secondary)]"
          >
            Min ($)
          </label>
          <input
            id="price-min"
            type="number"
            min="0"
            className={inputCls}
            placeholder="0"
            value={localMin}
            onChange={(e) => handleMinChange(e.target.value)}
            onKeyDown={handleKeyDown}
          />
        </div>
        <span className="pb-2 text-[var(--color-text-tertiary)] text-sm">
          —
        </span>
        <div className="flex flex-col gap-1 flex-1">
          <label
            htmlFor="price-max"
            className="text-xs text-[var(--color-text-secondary)]"
          >
            Max ($)
          </label>
          <input
            id="price-max"
            type="number"
            min="0"
            className={inputCls}
            placeholder="Any"
            value={localMax}
            onChange={(e) => handleMaxChange(e.target.value)}
            onKeyDown={handleKeyDown}
          />
        </div>
      </div>

      {validationError && localMin !== "" && localMax !== "" && (
        <p className="mt-2 text-xs text-[var(--color-discount)]" role="alert">
          {validationError}
        </p>
      )}

      <button
        onClick={handleApply}
        disabled={!canApply}
        className="mt-3 w-full py-1.5 text-sm font-medium rounded-md bg-[var(--color-accent)] text-white transition-colors
          enabled:hover:bg-[var(--color-accent-hover)]
          disabled:opacity-40 disabled:cursor-not-allowed"
      >
        Apply
      </button>
    </div>
  );
}
