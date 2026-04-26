import HomePage1 from "./(homes)/home-1/page";
import HomePage8 from "./(madusara)/home/page";

import Features from "@/components/common/features/Features";
import Footer8 from "@/components/footers/Footer8";
import Header9 from "@/components/headers/Header9";
import BestSelling from "@/components/homes/home-9/BestSelling";
import Blogs from "@/components/homes/home-9/Blogs";
import Brands from "@/components/common/brands/Brands";
import Collections from "@/components/homes/home-9/Collections";
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

export const metadata = {
  title: "Endless Greens | Authentic Ceylon Spices & Herbal Wellness Solutions",
  description:
    "Discover premium Sri Lankan plant-based innovation. From organic liquid spices to functional herbal infusions, Endless Greens brings the heritage of Ceylon to global kitchens.",
};

export default async function Home() {
  const categoryData = await getCategoryData();
  const collections = categoryData.collections || [];
  const showAreaProducts = await getShowAreaProducts();
  const instagramImages = await getInstagramProducts();
  const blogsData = await getBlogsData();



  console.log(categoryData)
  console.log(showAreaProducts)

  return (
    <>
      <Header9 collections={collections} />
      <main className="page-wrapper">
        <Hero />
        <div className="mb-3 pb-1 mt-4 pb-xl-5"></div>
        {/* <Collections collections={collections} /> */}

        <CategoryMassonry collections={collections} />
        <div className="mb-1 pb-4 mb-xl-5 pb-xl-5"></div>
        <BestSelling products={showAreaProducts} />
        <div className="mb-5 pb-4"></div>
        <Lookbook />
        <div className="pt-1 pb-5 mt-4 mt-xl-5"></div>
        <Blogs blogs={blogsData} />
        <div className="mb-5 pb-4 pb-xl-5 mb-xl-5"></div>
        <Brands />
        <div className="mb-3 mb-xl-5 pt-1 pb-4"></div>
        <Instagram instagramImages={instagramImages} />
        <div className="mb-3 mb-xl-5"></div>
        <Features />
      </main>

      <Footer8 collections={collections} />
    </>
  );
}
