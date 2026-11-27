import { useState, useEffect } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import { ArrowLeft, Star, Package, RefreshCw } from "lucide-react";
import Header from "../components/layout/Header";
import { fetchProductById } from "../features/products/services/productService";

function StockBadge({ stock }) {
  if (stock === 0)
    return (
      <span className="inline-block px-2.5 py-1 w-23 rounded-full text-xs font-semibold bg-red-100 text-red-600">
        Out of stock
      </span>
    );
  if (stock < 10)
    return (
      <span className="inline-block px-2.5 py-1 w-22 rounded-full text-xs font-semibold bg-amber-100 text-amber-600">
        Only {stock} left
      </span>
    );
  return (
    <span className="inline-block px-2.5 py-1 w-17 rounded-full text-xs font-semibold bg-green-100 text-green-600">
      In stock
    </span>
  );
}

function DetailSkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-6">
      <div className="flex flex-col gap-3">
        <div className="skeleton aspect-square rounded-xl" />
        <div className="flex gap-2">
          {Array.from({ length: 4 }, (_, i) => (
            <div key={i} className="skeleton w-16 h-16 rounded-lg" />
          ))}
        </div>
      </div>
      <div className="flex flex-col gap-4">
        <div className="skeleton h-4 w-1/4 rounded" />
        <div className="skeleton h-7 w-5/6 rounded" />
        <div className="skeleton h-7 w-3/5 rounded" />
        <div className="skeleton h-9 w-1/3 rounded" />
        <div className="skeleton h-4 w-2/5 rounded" />
        {Array.from({ length: 4 }, (_, i) => (
          <div
            key={i}
            className="skeleton h-3.5 rounded"
            style={{ width: `${90 - i * 8}%` }}
          />
        ))}
      </div>
    </div>
  );
}

export default function ProductDetailPage() {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeImage, setActiveImage] = useState(0);
  const [retryCount, setRetryCount] = useState(0);

  const backUrl = location.state?.from || "/";

  useEffect(() => {
    const controller = new AbortController();
    setLoading(true);
    setError(null);
    setProduct(null);
    setActiveImage(0);

    fetchProductById(id, controller.signal)
      .then((data) => {
        if (!data?.id) throw new Error("Product not found.");
        setProduct(data);
        setLoading(false);
      })
      .catch((err) => {
        if (err.name === "AbortError") return;
        setError(err.message || "Failed to load product.");
        setLoading(false);
      });

    return () => controller.abort();
  }, [id, retryCount]);

  const images =
    product?.images?.length > 0
      ? product.images
      : product
        ? [product.thumbnail]
        : [];
  const hasDiscount = product && product.discountPercentage > 0.5;
  const originalPrice = hasDiscount
    ? (product.price * 100) / (100 - product.discountPercentage)
    : null;

  return (
    <div className="min-h-screen bg-[var(--color-bg)]">
      <Header />

      <main className="max-w-5xl mx-auto px-5 py-6">
        <button
          className="inline-flex items-center gap-1.5 text-sm text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] transition-colors mb-4"
          onClick={() => navigate(backUrl)}
          aria-label="Back to products"
        >
          <ArrowLeft size={16} />
          Back to products
        </button>

        {loading && <DetailSkeleton />}

        {error && (
          <div className="flex flex-col items-center justify-center gap-4 py-20 text-center">
            <Package size={48} className="text-[var(--color-text-tertiary)]" />
            <h2 className="text-lg font-semibold text-[var(--color-text-primary)]">
              {error}
            </h2>
            <p className="text-sm text-[var(--color-text-secondary)] max-w-xs">
              The product you are looking for may not exist or could not be
              loaded.
            </p>
            <div className="flex items-center gap-3">
              <button
                className="inline-flex items-center gap-1.5 px-4 py-2 text-sm font-medium rounded-md bg-[var(--color-accent)] text-white hover:bg-[var(--color-accent-hover)] transition-colors"
                onClick={() => setRetryCount((c) => c + 1)}
              >
                <RefreshCw size={14} /> Try again
              </button>
              <button
                className="px-4 py-2 text-sm font-medium rounded-md border border-[var(--color-border)] bg-white hover:bg-[var(--color-surface-hover)] transition-colors"
                onClick={() => navigate("/")}
              >
                Browse products
              </button>
            </div>
          </div>
        )}

        {!loading && !error && product && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="flex flex-col gap-3">
              <div className="rounded-xl overflow-hidden bg-white border border-[var(--color-border)] aspect-square flex items-center justify-center">
                <img
                  key={activeImage}
                  src={images[activeImage]}
                  alt={product.title}
                  className="w-full h-full object-contain p-4"
                  onError={(e) => {
                    e.currentTarget.src = `https://dummyjson.com/image/600x500?text=${encodeURIComponent(product.title)}&fontSize=16`;
                  }}
                />
              </div>
              {images.length > 1 && (
                <div
                  className="flex gap-2 flex-wrap"
                  role="list"
                  aria-label="Product images"
                >
                  {images.map((img, i) => (
                    <button
                      key={i}
                      role="listitem"
                      className={`w-16 h-16 rounded-lg overflow-hidden border-2 transition-colors ${i === activeImage ? "border-[var(--color-accent)]" : "border-[var(--color-border)] hover:border-[var(--color-text-tertiary)]"}`}
                      onClick={() => setActiveImage(i)}
                      aria-label={`View image ${i + 1}`}
                      aria-pressed={i === activeImage}
                    >
                      <img
                        src={img}
                        alt={`${product.title} view ${i + 1}`}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.currentTarget.style.display = "none";
                        }}
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>

            <div className="flex flex-col gap-4">
              <div className="flex flex-wrap gap-2">
                <span className="px-2.5 py-1 rounded-full text-xs font-medium bg-[var(--color-accent-light)] text-[var(--color-accent)]">
                  {product.category}
                </span>
                {product.brand && (
                  <span className="px-2.5 py-1 rounded-full text-xs font-medium bg-[var(--color-surface-hover)] text-[var(--color-text-secondary)]">
                    {product.brand}
                  </span>
                )}
              </div>

              <h1 className="text-2xl font-bold text-[var(--color-text-primary)] leading-tight">
                {product.title}
              </h1>

              <div className="flex items-baseline gap-3">
                <span className="text-3xl font-bold text-[var(--color-text-primary)]">
                  ${product.price.toFixed(2)}
                </span>
                {hasDiscount && originalPrice && (
                  <>
                    <span className="text-base text-[var(--color-text-tertiary)] line-through">
                      ${originalPrice.toFixed(2)}
                    </span>
                    <span className="px-2 py-0.5 rounded text-sm font-semibold bg-red-100 text-red-600">
                      -{Math.round(product.discountPercentage)}% off
                    </span>
                  </>
                )}
              </div>

              <div className="flex items-center gap-2">
                <div
                  className="flex items-center gap-0.5"
                  aria-label={`${product.rating.toFixed(1)} out of 5 stars`}
                >
                  {Array.from({ length: 5 }, (_, i) => (
                    <Star
                      key={i}
                      size={16}
                      strokeWidth={1.5}
                      fill={
                        i < Math.round(product.rating) ? "currentColor" : "none"
                      }
                      className={
                        i < Math.round(product.rating)
                          ? "text-[var(--color-rating)]"
                          : "text-[var(--color-text-tertiary)]"
                      }
                    />
                  ))}
                </div>
                <span className="text-sm font-medium text-[var(--color-text-secondary)]">
                  {product.rating.toFixed(1)}
                </span>
              </div>

              <StockBadge stock={product.stock} />

              <p className="text-sm text-[var(--color-text-secondary)] leading-relaxed">
                {product.description}
              </p>

              <dl className="grid grid-cols-2 gap-x-4 gap-y-2 pt-2 border-t border-[var(--color-border)] text-sm">
                {product.sku && (
                  <>
                    <dt className="text-[var(--color-text-tertiary)]">SKU</dt>
                    <dd className="font-medium text-[var(--color-text-primary)]">
                      {product.sku}
                    </dd>
                  </>
                )}
                {product.warrantyInformation && (
                  <>
                    <dt className="text-[var(--color-text-tertiary)]">
                      Warranty
                    </dt>
                    <dd className="font-medium text-[var(--color-text-primary)]">
                      {product.warrantyInformation}
                    </dd>
                  </>
                )}
                {product.shippingInformation && (
                  <>
                    <dt className="text-[var(--color-text-tertiary)]">
                      Shipping
                    </dt>
                    <dd className="font-medium text-[var(--color-text-primary)]">
                      {product.shippingInformation}
                    </dd>
                  </>
                )}
                {product.returnPolicy && (
                  <>
                    <dt className="text-[var(--color-text-tertiary)]">
                      Returns
                    </dt>
                    <dd className="font-medium text-[var(--color-text-primary)]">
                      {product.returnPolicy}
                    </dd>
                  </>
                )}
                {product.minimumOrderQuantity && (
                  <>
                    <dt className="text-[var(--color-text-tertiary)]">
                      Min. order
                    </dt>
                    <dd className="font-medium text-[var(--color-text-primary)]">
                      {product.minimumOrderQuantity} unit
                      {product.minimumOrderQuantity > 1 ? "s" : ""}
                    </dd>
                  </>
                )}
              </dl>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
