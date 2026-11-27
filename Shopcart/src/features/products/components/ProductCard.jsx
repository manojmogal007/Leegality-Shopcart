import { Link, useLocation } from "react-router-dom";
import { Star } from "lucide-react";

function StarRating({ rating }) {
  const filled = Math.round(rating);
  return (
    <div
      className="flex items-center gap-0.5"
      aria-label={`${rating.toFixed(1)} out of 5 stars`}
    >
      {Array.from({ length: 5 }, (_, i) => (
        <Star
          key={i}
          size={12}
          strokeWidth={1.5}
          fill={i < filled ? "currentColor" : "none"}
          className={
            i < filled
              ? "text-[var(--color-rating)]"
              : "text-[var(--color-text-tertiary)]"
          }
        />
      ))}
      <span className="ml-1 text-xs text-[var(--color-text-secondary)]">
        {rating.toFixed(1)}
      </span>
    </div>
  );
}

export default function ProductCard({ product }) {
  const location = useLocation();
  const { id, title, brand, price, rating, thumbnail, discountPercentage } =
    product;
  const hasDiscount = discountPercentage > 0;
  const originalPrice = hasDiscount
    ? (price * 100) / (100 - discountPercentage)
    : null;

  return (
    <Link
      to={`/product/${id}`}
      state={{ from: location.pathname + location.search }}
      className="group flex flex-col bg-white rounded-xl border border-[var(--color-border)] overflow-hidden hover:shadow-md hover:-translate-y-0.5 transition-all duration-200"
      aria-label={title}
    >
      <div className="relative aspect-[4/3] overflow-hidden bg-[var(--color-surface-hover)]">
        <img
          src={thumbnail}
          alt={title}
          className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300"
          loading="lazy"
        />
        {hasDiscount && (
          <span
            className="absolute top-2 left-2 px-1.5 py-0.5 rounded text-xs font-semibold bg-[var(--color-discount)] text-white"
            aria-label={`${Math.round(discountPercentage)}% off`}
          >
            -{Math.round(discountPercentage)}%
          </span>
        )}
      </div>

      <div className="flex flex-col flex-1 gap-1 p-3">
        {brand && (
          <p className="text-xs font-medium text-[var(--color-accent)] uppercase tracking-wide">
            {brand}
          </p>
        )}
        <h3 className="text-sm font-semibold text-[var(--color-text-primary)] line-clamp-2 leading-snug">
          {title}
        </h3>

        <div className="flex items-center justify-between mt-auto pt-2">
          <div className="flex items-baseline gap-1.5">
            <span className="text-base font-bold text-[var(--color-text-primary)]">
              ${price.toFixed(2)}
            </span>
            {hasDiscount && originalPrice && (
              <span className="text-xs text-[var(--color-text-tertiary)] line-through">
                ${originalPrice.toFixed(2)}
              </span>
            )}
          </div>
          <StarRating rating={rating} />
        </div>
      </div>
    </Link>
  );
}
