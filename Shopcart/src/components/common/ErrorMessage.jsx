import { AlertCircle, RefreshCw } from "lucide-react";

export default function ErrorMessage({ message, onRetry }) {
  return (
    <div
      className="flex flex-col items-center justify-center gap-4 py-20 text-center"
      role="alert"
    >
      <AlertCircle size={40} className="text-[var(--color-discount)]" />
      <h3 className="text-lg font-semibold text-[var(--color-text-primary)]">
        Something went wrong
      </h3>
      <p className="text-sm text-[var(--color-text-secondary)] max-w-xs">
        {message ||
          "Failed to load data. Please check your connection and try again."}
      </p>
      {onRetry && (
        <button
          className="inline-flex items-center gap-1.5 px-4 py-2 text-sm font-medium rounded-md bg-[var(--color-accent)] text-white hover:bg-[var(--color-accent-hover)] transition-colors"
          onClick={onRetry}
        >
          <RefreshCw size={14} />
          Try again
        </button>
      )}
    </div>
  );
}
