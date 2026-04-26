import Footer1 from "@/components/footers/Footer1";

import Header1 from "@/components/headers/Header1";
import RelatedSlider from "@/components/singleProduct/RelatedSlider";
import SingleProduct12 from "@/components/singleProduct/SingleProduct12";
import { getProductDetails, getRelatedProducts } from "@/lib/api/home";
import React from "react";


export async function generateMetadata(props) {
  const params = await props.params;
  const res = await getProductDetails(params.slug);
  
  if (!res.success || !res.product) {
    return { title: "Product Not Found | Endless Greens" };
  }

  const product = res.product;
  const cleanDescription = product.description.replace(/<[^>]*>/g, "").slice(0, 160);

  return {
    title: `${product.title} | Premium Ceylon Spice Drops`,
    description: cleanDescription,
    keywords: [
      product.title,
      "True Cinnamon Extract",
      "Liquid Ceylon Cinnamon",
      "Cinnamomum zeylanicum extract",
      "Sri Lankan Spice Drops",
      "Endless Greens Liquid Spices",
      product.category,
      "Plant-based food enhancer"
    ].join(", "),
    openGraph: {
      title: product.title,
      description: cleanDescription,
      images: product.imgSrc,
      type: "article", 
    }
  };
}

export default async function ProductDetailsPage1(props) {
  const params = await props.params;

  const slug = params.slug;

  const ensureArray = (value) => {
    if (Array.isArray(value)) return value;
    if (Array.isArray(value?.products)) return value.products;
    if (Array.isArray(value?.data)) return value.data;
    if (Array.isArray(value?.related_products)) return value.related_products;
    return [];
  };

  const [res, relatedRes] = await Promise.all([
    getProductDetails(slug),
    getRelatedProducts(),
  ]);

  const product = res.success ? res.product : null;

  // console.log(product)
  const relatedProducts = ensureArray(relatedRes).filter((item) => {
    if (!item) return false;
    if (item.slug && item.slug === slug) return false;
    if (product?.id && item.id && item.id === product.id) return false;
    return true;
  });
  //   const productId = params.id;
  //   const product =
  //     allProducts.filter((elm) => elm.id == productId)[0] || allProducts[0];
  return (
    <>
      <Header1 />
      <main className="page-wrapper">
        <div className="mb-md-1 pb-md-3"></div>
        <SingleProduct12 product={product} />
        {relatedProducts.length > 0 ? (
          <RelatedSlider products={relatedProducts} />
        ) : null}
      </main>
      <Footer1 />
    </>
  );
}
