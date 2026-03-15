import React from "react";
import Link from "next/link";
import Image from "next/image";

export default function CategoryMassonry({ collections = [] }) {
  const categoryList = Array.isArray(collections) ? collections : [];
  const leftItems = categoryList.filter((_, index) => index % 2 === 0);
  const rightItems = categoryList.filter((_, index) => index % 2 === 1);

  const leftFallback = {
    imageSrc: "/assets/images/home/demo6/banner1.jpg",
    title: "Women’s Collection",
    productCount: "WOMEN LOOKBOOK",
    slug: "shop-1",
  };

  const rightFallback = {
    imageSrc: "/assets/images/home/demo6/banner5.jpg",
    title: "Men’s Spring Collection 2020",
    productCount: "MEN COLLECTION",
    slug: "shop-1",
  };

  const getImageSrc = (item, fallbackSrc) =>
    item?.imageSrc || item?.imgSrc || item?.image || fallbackSrc;

  const getShopHref = (item, fallbackSlug) => {
    const slug = item?.slug || fallbackSlug;
    return slug === "shop-1" ? "/shop-1" : `/shop/${slug}`;
  };

  return (
    <section className="category-masonry container">
      <div className="row">
        <div className="col-lg-6 px-4">
          <div className="category-masonry__item">
            <h2 className="category-masonry__title fw-normal mb-0">
              New Season
              <br />
              and New Trends
            </h2>
          </div>
          <div className="pb-4 mb-4 pb-xl-5 mb-xl-5"></div>

          {(leftItems.length ? leftItems : [leftFallback]).map((item, index) => (
            <div key={item?.id || `left-${index}`} className="category-masonry__item">
              <div className="category-masonry__item-image pb-1 mb-4">
                <Image
                  loading="lazy"
                  className="h-auto"
                  src={getImageSrc(item, leftFallback.imageSrc)}
                  width="570"
                  height="500"
                  alt="image"
                />
              </div>
              <h2>{item?.title || leftFallback.title}</h2>
              <Link
                href={getShopHref(item, leftFallback.slug)}
                className="btn-link btn-link_md default-underline text-uppercase fw-medium"
              >
                Discover Now
              </Link>
              <div className="category-masonry__item-category fw-medium">
                {item?.productCount || leftFallback.productCount}
              </div>
            </div>
          ))}

        </div>


        <div className="col-lg-6 px-4 d-lg-flex flex-lg-column align-items-lg-end">
          {(rightItems.length ? rightItems : [rightFallback]).map((item, index) => (
            <div key={item?.id || `right-${index}`} className="category-masonry__item">
              <div className="category-masonry__item-image pb-1 mb-4">
                <Image
                  loading="lazy"
                  className="h-auto"
                  src={getImageSrc(item, rightFallback.imageSrc)}
                  width="570"
                  height="631"
                  alt="image"
                />
              </div>
              <h2>{item?.title || rightFallback.title}</h2>
              <Link
                href={getShopHref(item, rightFallback.slug)}
                className="btn-link btn-link_md default-underline text-uppercase fw-medium"
              >
                Discover Now
              </Link>
              <div className="category-masonry__item-category fw-medium">
                {item?.productCount || rightFallback.productCount}
              </div>
            </div>
          ))}

        </div>

        
      </div>
    </section>
  );
}
