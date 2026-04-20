import Footer1 from "@/components/footers/Footer1";

import Header22 from "@/components/headers/Header22";

import Header8 from "@/components/headers/Header8";
import RelatedSlider from "@/components/singleProduct/RelatedSlider";

import SingleProduct3 from "@/components/singleProduct/SingleProduct3";
import React from "react";
import { allProducts } from "@/data/products";
// e0e0e0;
export const metadata = {
  title: "Shop Single 8 | endlessLk",
  description: "Explore Shop Single 8 on endlessLk. Discover quality products, latest collections, and secure online shopping.",
};
export default async function ProductDetailsPage8(props) {
  const params = await props.params;
  const productId = params.id;
  const product =
    allProducts.filter((elm) => elm.id == productId)[0] || allProducts[0];
  return (
    <>
      <div className="header_dark">
        <Header22 />
      </div>
      <main style={{ paddingTop: "70px" }}>
        <div className="mb-md-1 pb-md-3"></div>
        <SingleProduct3 product={product} />
        <RelatedSlider />
      </main>
      <Footer1 />
    </>
  );
}
