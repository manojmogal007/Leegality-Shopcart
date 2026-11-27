# Shopcart — Product Listing & Detail App

A responsive Amazon-style product browsing app built with React 19, React Router v7, and Vite. It pulls all data from the [DummyJSON Products API](https://dummyjson.com/docs/products).

---

## Setup Instructions

### Prerequisites

- Node.js >= 18
- npm >= 9

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/manojmogal007/Leegality-Shopcart.git
cd Leegality-Shopcart/Shopcart

# 2. Install dependencies
npm install

# 3. Start the development server
npm run dev
```

The app will be available at `http://localhost:5173`.

### Available Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start the Vite development server with HMR |
| `npm run build` | Build the production bundle to `/dist` |
| `npm run preview` | Locally preview the production build |
| `npm run lint` | Run ESLint across all source files |

---

## Assumptions Made

Pagination works differently depending on whether a category filter is active or not. When a category is selected, pagination runs against that category's total product count. Without a category filter, it paginates across the full product catalogue.

---

## Architectural Decisions

### Feature-Sliced Structure

The `src/` directory is organised by feature rather than by file type. All related files for a domain sit together, which makes it easier to navigate and scale:

```
src/
├── features/
│   └── products/
│       ├── components/   # UI: ProductCard, ProductGrid, filters
│       ├── hooks/        # useProducts, useProductFilters
│       ├── services/     # productService.js (API layer)
│       ├── constants/    # API_BASE, pagination defaults
│       └── utils/        # Pure helpers (price formatting, etc.)
├── components/
│   ├── common/           # Reusable UI: Button, Pagination, EmptyState, ErrorMessage
│   └── layout/           # Header
└── pages/                # Route-level components: ProductListingPage, ProductDetailPage
```

### URL-Driven Filter State

All filter values (category, minPrice, maxPrice, brands, page) are stored directly in the URL via `useSearchParams`. This keeps things simple: filters survive a page refresh, users can share a filtered link, and the browser's back/forward buttons work exactly as expected without any extra setup.

### Custom Hooks as the Data Layer

- `useProducts` handles the fetch lifecycle (loading, error, data) and uses an `AbortController` to cancel in-flight requests when the component re-renders or unmounts.
- `useProductFilters` exposes typed helpers to read and update URL params, keeping the page components themselves thin and focused on rendering.

### Lazy-Loaded Routes with Suspense

Both `ProductListingPage` and `ProductDetailPage` are loaded lazily with `React.lazy`. This keeps the initial bundle small and shows a full-screen spinner while the route chunk loads.

### Styling with Tailwind CSS v4

Tailwind CSS v4 is used through its Vite plugin (`@tailwindcss/vite`). Design tokens like `--color-bg` and `--color-accent` are defined as CSS variables in `index.css`, which keeps theming centralised and easy to update.

### No Global State Library

The app only has two pages and one data domain, so React's built-in `useState`, `useEffect`, `useCallback`, and `useSearchParams` cover everything. Bringing in Redux or Zustand would have been overkill here.

---

## Improvements Given More Time

### Performance

Introduce a virtualised product grid using `@tanstack/react-virtual` so only the cards currently visible in the viewport are actually rendered. This becomes important as the product list grows and would noticeably improve scroll performance.

### User Experience

Add a search bar backed by the DummyJSON `/products/search` endpoint. Right now users have to browse by category, but a lot of the time people already know what they are looking for.

### Architecture and Code Quality

- **TypeScript** — Adding strict types for API responses, filter shapes, and component props would catch a whole class of bugs at compile time and make refactoring much safer.
- **API abstraction layer** — The current `productService.js` works fine, but wrapping it in a proper API client (with a typed wrapper or `axios`) would centralise error handling, make it easier to swap the base URL per environment, and simplify adding auth headers down the line.
