import Footer1 from "@/components/footers/Footer1";
import Header1 from "@/components/headers/Header1";
import React from "react";
import { getAllProducts, getCategoryData } from "@/lib/api/home";
import BulkOrders from "@/components/blogs/BulkOrders";

export async function generateMetadata() {
  return {
    title: "B2B Services | Endless Greens",
    description:
      "Whether you are looking to purchase our products in bulk, launch them under your own brand, or develop something entirely new, Endless Greens offers tailored solutions to meet your business needs.",
    keywords: [
      "Bulk spice drops",
      "Wholesale Ceylon tea extracts",
      "Hospitality beverage supplies Sri Lanka",
      "Café elixir wholesale",
      "Dropit liquid spices bulk order",
      "Contract manufacturing",
      "Private label products",
      "Wholesale pricing",
      "chai",
    ].join(", "),
    openGraph: {
      title: "Endless Greens Bulk Purchase | White label | Private label | Contract manufacturing",
      description:
        "Direct trade bulk quantities/private label/contract manufacturing of certified Ceylon spice drops & elixirs for cafes, hotels & culinary businesses.",
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
          Endless Greens B2B Services
        </h1>
        <BulkOrders products={productsData} />

      </main>
      <div className="mb-4"></div>
      <Footer1 collections={collections} />
    </>
  );
}