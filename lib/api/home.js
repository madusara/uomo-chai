import { apiFetch } from "./client";

// use  getCategoryList route
export async function getCategoryData() {
  const data = await apiFetch("/categories", {
    next: { revalidate: 60 },
  });
  return data;
}

export async function getShowAreaProducts() {
  return apiFetch("/products/show-area", {
    next: { revalidate: 60 },
  });
}

export async function getInstagramProducts() {
  return apiFetch("/products/instagram", {
    next: { revalidate: 60 },
  });
}

// Fetch product details by slug
export async function getProductDetails(slug) {
  const data = await apiFetch(`/product/${slug}`, {
    next: { revalidate: 60 },
  });
  return data;
}

// Fetch products by category slug
export async function getCategoryProductsBySlug(slug) {
  const data = await apiFetch(`/category/${slug}/products`, {
    next: { revalidate: 60 },
  });
  return data;
}
