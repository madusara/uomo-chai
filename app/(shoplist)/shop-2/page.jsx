import Footer1 from "@/components/footers/Footer1";

import Header1 from "@/components/headers/Header1";

import Shop2 from "@/components/shoplist/Shop2";
import React from "react";

export const metadata = {
  title: "Shop 2 | endlessLk",
  description: "Explore Shop 2 on endlessLk. Discover quality products, latest collections, and secure online shopping.",
};
export default function ShopPage2() {
  return (
    <>
      <Header1 />
      <main className="page-wrapper">
        <Shop2 />
      </main>
      <div className="mb-5 pb-xl-5"></div>
      <Footer1 />
    </>
  );
}
