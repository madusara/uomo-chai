import Features from "@/components/common/features/Features";
import Footer8 from "@/components/footers/Footer8";
import Header9 from "@/components/headers/Header9";
import BestSelling from "@/components/homes/home-9/BestSelling";
import Blogs from "@/components/homes/home-9/Blogs";
import Brands from "@/components/common/brands/Brands";
import Hero from "@/components/homes/home-9/Hero";
import Instagram from "@/components/homes/home-9/Instagram";
import Lookbook from "@/components/homes/home-9/Lookbook";
import React from "react";
import {
  getBlogsData,
  getCategoryData,
  getInstagramProducts,
  getShowAreaProducts,
} from "@/lib/api/home";
import CategoryMassonry from "@/components/homes/home-6/CategoryMassonry";

export async function generateMetadata() {
  const [categoryData, showAreaProducts, blogsData] = await Promise.all([
    getCategoryData(),
    getShowAreaProducts(),
    getBlogsData(),
  ]);

  const productKeywords = showAreaProducts.map((p) => p.title);
  const categoryKeywords = categoryData.collections?.map((c) => c.title) || [];
  const blogKeywords = blogsData.blogs?.map((b) => b.title) || [];

  const allKeywords = [
    ...productKeywords,
    ...categoryKeywords,
    ...blogKeywords,
    "Ceylon Spice Drops",
    "Liquid Spices Sri Lanka",
    "Endless Greens",
    "Plant-based extracts Sri Lanka",
    "Premium Ceylon Tea and Spices",
  ];

  return {
    title:
      "Endless Greens | Authentic Ceylon Spice Drops & Herbal Wellness Elixirs",
    description: `Discover Endless Greens: Sri Lanka's finest ${categoryKeywords.join(", ")}. Explore our ${blogKeywords[0] || "heritage"} and shop pure ${productKeywords.slice(0, 3).join(", ")}.`,
    keywords: allKeywords.join(", "),
    alternates: {
      canonical: "https://endlesslk.com",
    },
    openGraph: {
      title: "Endless Greens | Plant-Based Innovation from Sri Lanka",
      description:
        "Rooted in heritage, shaped by science. Premium liquid spices and wellness elixirs.",
      type: "website",
    },
  };
}

export default async function Home() {
  const categoryData = await getCategoryData();
  const collections = categoryData.collections || [];
  const showAreaProducts = await getShowAreaProducts();
  const instagramImages = await getInstagramProducts();
  const blogsData = await getBlogsData();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Store",
    name: "Endless Greens",
    description: "Premium Sri Lankan plant-based extracts and liquid spices.",
    url: "https://endlesslk.com",
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Spice Drops & Elixirs",
      itemListElement: showAreaProducts.slice(0, 5).map((p, index) => ({
        "@type": "ListItem",
        position: index + 1,
        item: {
          "@type": "Product",
          name: p.title,
          image: p.imgSrc,
          description: p.category,
        },
      })),
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <Header9 collections={collections} />
      <main className="page-wrapper">
        <Hero />

        <div className="mb-3 pb-1 mt-4 pb-xl-5"></div>

        <section id="collections" aria-label="Our Collections">
          <CategoryMassonry collections={collections} />
        </section>

        <div className="mb-1 pb-4 mb-xl-5 pb-xl-5"></div>

        <section id="best-sellers" aria-label="Best Selling Products">
          <BestSelling products={showAreaProducts} />
        </section>

        <div className="mb-5 pb-4"></div>
        <Lookbook />

        <div className="pt-1 pb-5 mt-4 mt-xl-5"></div>

        <section id="blog" aria-label="Wellness and Spice Stories">
          <Blogs blogs={blogsData} />
        </section>

        <div className="mb-5 pb-4 pb-xl-5 mb-xl-5"></div>
        {/* <Brands /> */}

        <div className="mb-3 mb-xl-5 pt-1 pb-4"></div>
        <Instagram instagramImages={instagramImages} />

        <div className="mb-3 mb-xl-5"></div>
        <Features />
      </main>

      <Footer8 collections={collections} />
    </>
  );
}
