import Footer1 from "@/components/footers/Footer1";
import Header1 from "@/components/headers/Header1";
import Shop6 from "@/components/shoplist/Shop6";
import { getCategoryData, getCategoryProductsBySlug } from "@/lib/api/home";
import React from "react";

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const data = await getCategoryProductsBySlug(slug);
  const seo = data?.seo;

  return {
    title: seo?.title ?? "Shop | Site name",
    description: seo?.description ?? "",
    keywords: seo?.keywords ?? "",
  };
}

export default async function ShopPage6({ params }) {
  const { slug } = await params;
  const [data, categoryData] = await Promise.all([
    getCategoryProductsBySlug(slug),
    getCategoryData(),
  ]);
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
