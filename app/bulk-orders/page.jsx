import Footer1 from "@/components/footers/Footer1";
import Header1 from "@/components/headers/Header1";
import React from "react";
import { getAllProducts, getCategoryData } from "@/lib/api/home";
import BulkOrders from "@/components/blogs/BulkOrders";

export async function generateMetadata() {
  return {
    title: "Bulk Purchase & Business Orders | Endless Greens",
    description:
      "Curated wholesale quantities of pure Ceylon spice drops, botanical extracts, and artisanal elixirs for cafés, restaurants, retailers, and hospitality brands.",
    keywords: [
      "Bulk spice drops",
      "Wholesale Ceylon tea extracts",
      "Hospitality beverage supplies Sri Lanka",
      "Café elixir wholesale",
      "Dropit liquid spices bulk order",
      "B2B food service botanicals",
    ].join(", "),
    openGraph: {
      title: "Endless Greens Bulk Purchase | Wholesale Ceylon Botanicals",
      description:
        "Direct trade bulk quantities of certified Ceylon spice drops & elixirs for cafes, hotels & culinary businesses.",
      type: "website",
    },
  };
}

export default async function BulkOrdersPage() {
  let productsData = [];
  let collections = [];

  try {
    const [prods, cats] = await Promise.all([
      getAllProducts().catch(() => ({ products: [] })),
      getCategoryData().catch(() => ({ collections: [] })),
    ]);
    productsData = prods?.products || prods?.data || prods || [];
    collections = cats?.collections || [];
  } catch (err) {
    console.error("Failed to load bulk products data:", err);
  }

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: "Endless Greens Bulk Wholesale Botanicals",
    description:
      "Curated wholesale quantities of Ceylon spice drops, herbal elixirs, and infusions.",
    offers: {
      "@type": "AggregateOffer",
      priceCurrency: "LKR",
      availability: "https://schema.org/InStock",
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Header1 collections={collections} />
      <main className="page-wrapper">
        <h1 className="visually-hidden">
          Endless Greens Bulk Purchase & Wholesale Orders
        </h1>
        <BulkOrders products={productsData} />
      </main>
      <div className="mb-4"></div>
      <Footer1 collections={collections} />
    </>
  );
}