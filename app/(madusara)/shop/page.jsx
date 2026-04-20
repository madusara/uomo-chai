import Footer1 from "@/components/footers/Footer1";

import Header1 from "@/components/headers/Header1";

import Shop6 from "@/components/shoplist/Shop6";
import { getAllProducts } from "@/lib/api/home";
import React from "react";

export const metadata = {
  title: "Shop 6 | endlessLk",
  description: "Explore Shop 6 on endlessLk. Discover quality products, latest collections, and secure online shopping.",
};
export default async function ShopPage6() {
  const data = await getAllProducts();

  console.log(data);

  return (
    <>
      <Header1 />
      <main className="page-wrapper">
        <Shop6 products={data} />
      </main>
      <div className="mb-5 pb-xl-5"></div>
      <Footer1 />
    </>
  );
}
