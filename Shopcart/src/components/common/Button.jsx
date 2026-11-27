const variantClasses = {
  primary:
    "bg-[var(--color-accent)] text-white border border-[var(--color-accent)] hover:bg-[var(--color-accent-hover)] hover:border-[var(--color-accent-hover)]",
  secondary:
    "bg-white text-[var(--color-text-primary)] border border-[var(--color-border)] hover:bg-[var(--color-surface-hover)]",
  ghost:
    "bg-transparent text-[var(--color-accent)] border border-transparent hover:text-[var(--color-accent-hover)] px-0",
};

const sizeClasses = {
  sm: "px-3 py-1 text-sm rounded-md",
  md: "px-4 py-2 text-sm rounded-md",
};

export default function Button({
  variant = "primary",
  size = "md",
  className = "",
  children,
  ...props
}) {
  return (
    <button
      className={[
        "inline-flex items-center justify-center gap-2 font-medium whitespace-nowrap cursor-pointer transition-colors duration-150 disabled:opacity-45 disabled:cursor-not-allowed disabled:pointer-events-none",
        variantClasses[variant],
        sizeClasses[size],
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      {...props}
    >
      {children}
    </button>
  );
}
