export function applyFilters(products, { minPrice, maxPrice, brands }) {
  return products.filter((product) => {
    const price = product.price ?? 0;

    if (minPrice !== "" && !isNaN(Number(minPrice)) && price < Number(minPrice))
      return false;
    if (maxPrice !== "" && !isNaN(Number(maxPrice)) && price > Number(maxPrice))
      return false;
    if (brands.length > 0 && !brands.includes(product.brand)) return false;

    return true;
  });
}

export function extractBrands(products) {
  const bucket = new Set();
  for (const p of products) {
    if (p.brand) bucket.add(p.brand);
  }
  return [...bucket].sort();
}
