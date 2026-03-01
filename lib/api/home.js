import { apiFetch } from "./client";

 // use  getCategoryList route
export async function getCategoryData() {
  const data = await apiFetch("/categories");
  return data;
}


export async function getShowAreaProducts() {
  return apiFetch("/products/show-area", {
    next: { revalidate: 60 },
  });
}