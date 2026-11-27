import ProductCard from "./ProductCard";

function SkeletonCard() {
  return (
    <div className="flex flex-col bg-white rounded-xl border border-[var(--color-border)] overflow-hidden">
      <div className="skeleton aspect-[4/3]" />
      <div className="flex flex-col gap-2 p-3">
        <div className="skeleton h-3 w-1/4 rounded" />
        <div className="skeleton h-4 w-5/6 rounded" />
        <div className="skeleton h-4 w-3/4 rounded" />
        <div className="flex justify-between pt-2">
          <div className="skeleton h-5 w-1/4 rounded" />
          <div className="skeleton h-3 w-1/4 rounded" />
        </div>
      </div>
    </div>
  );
}

export default function ProductGrid({ products, loading }) {
  if (loading) {
    return (
      <div
        className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4"
        aria-busy="true"
        aria-label="Loading products"
      >
        {Array.from({ length: 12 }, (_, i) => (
          <SkeletonCard key={i} />
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
