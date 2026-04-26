import Footer1 from "@/components/footers/Footer1";

import Header1 from "@/components/headers/Header1";

import Shop6 from "@/components/shoplist/Shop6";
import { getAllProducts, getCategoryData } from "@/lib/api/home";
import React from "react";

export async function generateMetadata() {
  const data = await getAllProducts();
  const seo = data?.seo || {};

  return {
    title: seo.title || "Shop | EndlessLk",
    description:
      seo.description ||
      "Explore Shop on endlessLk. Discover quality products, latest collections, and secure online shopping.",
    keywords: seo.keywords || "",
  };
}

export default async function ShopPage6() {
  const data = await getAllProducts();
  const categoryData = await getCategoryData();
  const collections = categoryData.collections || [];

  return (
    <>
      <Header1 collections={collections} />
      <main className="page-wrapper">
        <Shop6 products={data} />
      </main>
      <div className="mb-5 pb-xl-5"></div>
      <Footer1 collections={collections} />
    </>
  );
}
