import { apiFetch } from "./client";
import { parseWeightInGrams } from "@/utlis/shipping";

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

export async function getBlogsData() {
  const data = await apiFetch("/blogs", {
    next: { revalidate: 60 },
  });
  return data;
}

export async function getBlogDetails(slug) {
  const data = await apiFetch(`/blog/${slug}`, {
    next: { revalidate: 60 },
  });
  return data;
}

export async function getAllProducts() {
  const data = await apiFetch("/products", {
    next: { revalidate: 60 },
  });
  return data;
}

export async function getRelatedProducts() {
  const data = await apiFetch("/products/related", {
    next: { revalidate: 60 },
  });
  return data;
}

// Fetch product details by slug
export async function getProductDetails(slug) {
  const data = await apiFetch(`/product/${slug}`, {
    next: { revalidate: 60 },
  });

  if (data?.success && data?.product) {
    const product = data.product;

    // Normalize variant weights
    if (product.variants && typeof product.variants === "object") {
      Object.keys(product.variants).forEach((sizeKey) => {
        const variant = product.variants[sizeKey];
        if (variant) {
          variant.weight = parseWeightInGrams(variant.weight, sizeKey, 200);
        }
      });
    }

    // Normalize top-level product weight
    product.weight = parseWeightInGrams(
      product.weight,
      Array.isArray(product.bottle_sizes) && product.bottle_sizes.length > 0
        ? product.bottle_sizes[0]
        : "",
      200
    );
  }

  return data;
}

// Fetch products by category slug
export async function getCategoryProductsBySlug(slug) {
  const data = await apiFetch(`/category/${slug}/products`, {
    next: { revalidate: 60 },
  });
  return data;
}
