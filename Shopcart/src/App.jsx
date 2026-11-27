import { lazy, Suspense } from "react";
import { Routes, Route, Navigate } from "react-router-dom";

const ProductListingPage = lazy(() => import("./pages/ProductListingPage"));
const ProductDetailPage = lazy(() => import("./pages/ProductDetailPage"));

const LazyLoader = (
  <div className="fixed inset-0 flex flex-col items-center justify-center gap-4 bg-[var(--color-bg)]">
    <div className="w-9 h-9 rounded-full border-3 border-[var(--color-border)] border-t-[var(--color-accent)] animate-spin" />
    <span className="text-sm text-[var(--color-text-secondary)]">Loading…</span>
  </div>
);

export default function App() {
  return (
    <Suspense fallback={LazyLoader}>
      <Routes>
        <Route path="/" element={<ProductListingPage />} />
        <Route path="/product/:id" element={<ProductDetailPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Suspense>
  );
}
