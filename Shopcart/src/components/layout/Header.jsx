import { Link } from "react-router-dom";
import shopcartLogo from "../../assets/shopcart.webp";

export default function Header() {
  return (
    <header className="sticky top-0 z-40 h-15 bg-white border-b border-[var(--color-border)] shadow-sm">
      <div className="max-w-[1440px] mx-auto px-6 h-full flex items-center">
        <Link to="/" className="flex items-center gap-2 transition-opacity hover:opacity-80">
          <img src={shopcartLogo} alt="Shopcart" className="h-9 w-auto object-contain" />
          <span className="font-semibold text-[var(--color-text-primary)]">Shopcart</span>
        </Link>
      </div>
    </header>
  );
}
