"use client";
import { products17 } from "@/data/products/fashion";
import Link from "next/link";
import React from "react";
import { Tooltip } from "react-tooltip";
import Image from "next/image";

export default function Lookbook({ products = [] }) {
  // Keep the original hotspot positions/styles while swapping product content.
  const lookbookProducts = products.length
    ? products17.map((item, index) => ({ ...item, ...(products[index] || {}) }))
    : products17;

  return (
    <section className="lookbook-products position-relative">
      <Image
        className="w-100 h-auto"
        loading="lazy"
        // src="/assets/images/home/demo9/lookbook-bg.jpg"
        src="/assets/images/home/demo9/lookbook2.png"
        width="1903"
        height="709"
        alt="image"
      />
      <h2
        className="section-title position-absolute position-top-center fw-normal text-center"
        style={{ top: "13.3%" }}
      >
        PURE BOTANICAL ESSENCE
        <br />
        <span className="h2 fw-normal">Natural Wellness</span>
      </h2>
      {lookbookProducts.map(({ id, style, imgSrc, price, title, slug }, index) => {
        const tooltipId = `${id}-${index}`;
        const productHref = slug ? `/product/${slug}` : `/product1_simple/${id}`;

        return (
        <React.Fragment key={tooltipId}>
          <button
            className="popover-point type2 position-absolute"
            style={style}
            data-tooltip-id={tooltipId}
          >
            <span>+</span>
          </button>
          <Tooltip
            place="right-start"
            className="example"
            render={() => (
              <div className="popover-product">
                <Link href={productHref}>
                  <Image
                    width={330}
                    height={400}
                    loading="lazy"
                    className="mb-3"
                    src={imgSrc}
                    alt="image"
                  />
                </Link>
                <p className="fw-medium mb-0">
                  <Link href={productHref}>{title}</Link>
                </p>
                <p className="mb-0">LKR {price}</p>
              </div>
            )}
            openOnClick
            id={tooltipId}
          />
        </React.Fragment>
      );
      })}
    </section>
  );
}
