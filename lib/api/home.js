import { apiFetch } from "./client";

 // use  getCategoryList route
export async function getCategoryData() {
  const data = await apiFetch("/categories");
  return data;
}