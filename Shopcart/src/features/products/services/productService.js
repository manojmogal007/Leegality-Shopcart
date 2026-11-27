import { API_BASE } from "../constants";

async function request(url, signal) {
  const res = await fetch(url, { signal });
  if (!res.ok) {
    throw new Error(`Request failed: ${res.status} ${res.statusText}`);
  }
  const data = await res.json();
  return data;
}

export function fetchProducts(signal, { limit = 20, skip = 0 } = {}) {
  return request(`${API_BASE}/products?limit=${limit}&skip=${skip}`, signal);
}

export function fetchProductsByCategory(
  slug,
  signal,
  { limit = 10, skip = 0 } = {},
) {
  return request(
    `${API_BASE}/products/category/${encodeURIComponent(slug)}?limit=${limit}&skip=${skip}`,
    signal,
  );
}

export function fetchCategories(signal) {
  return request(`${API_BASE}/products/categories`, signal);
}

export function fetchProductById(id, signal) {
  return request(`${API_BASE}/products/${id}`, signal);
}
