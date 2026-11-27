import { Link } from "react-router-dom";
import { ShoppingBag } from "lucide-react";

export default function Header() {
  return (
    <header className="sticky top-0 z-40 h-15 bg-white border-b border-[var(--color-border)] shadow-sm">
      <div className="max-w-[1440px] mx-auto px-6 h-full flex items-center">
        <Link
          to="/"
          className="flex items-center gap-2 font-semibold text-[var(--color-text-primary)] hover:text-[var(--color-accent)] transition-colors"
        >
          <ShoppingBag size={20} strokeWidth={2} />
          <span>Shopcart</span>
        </Link>
      </div>
    </header>
  );
}
