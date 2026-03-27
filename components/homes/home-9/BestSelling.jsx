"use client";

import { useContextElement } from "@/context/Context";
import Link from "next/link";
import { useMemo, useState } from "react";
import { Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import Image from "next/image";

export default function BestSelling({ products = [] }) {
  const { toggleWishlist, isAddedtoWishlist } = useContextElement();
  const { setQuickViewItem } = useContextElement();
  const { addProductToCart, isAddedToCartProducts } = useContextElement();

  // console.log(products);

  const filterCategories = useMemo(() => {
    const names = [...new Set(products.map((p) => p.filterCategory))];
    return ["All", ...names.filter((name) => name !== "Instagram")];
  }, [products]);

  const [currentCategory, setCurrentCategory] = useState("All");

  // Filter products
  const filtered = useMemo(() => {
    const validProducts = products.filter(
      (product) => product.filterCategory !== "Instagram",
    );

    if (currentCategory === "All") {
      const uniqueProductsMap = new Map();
      validProducts.forEach((product) => {
        if (!uniqueProductsMap.has(product.id)) {
          uniqueProductsMap.set(product.id, product);
        }
      });
      return Array.from(uniqueProductsMap.values());
    }

    return validProducts.filter(
      (product) => product.filterCategory === currentCategory,
    );
  }, [products, currentCategory]);

  return (
    <section className="products-carousel container">
      <h2 className="section-title text-center fw-normal text-uppercase mb-1 mb-md-3 pb-xl-3">
        Best Selling Products
      </h2>

      {/* Dynamic Show Areas */}
      <ul className="nav nav-tabs mb-3 pb-3 mb-xl-4 text-uppercase justify-content-center">
        {filterCategories.map((category, i) => (
          <li
            key={i}
            className="nav-item"
            onClick={() => setCurrentCategory(category)}
          >
            <a
              className={`nav-link nav-link_underscore ${
                currentCategory === category ? "active" : ""
              }`}
            >
              {category}
            </a>
          </li>
        ))}
      </ul>

      <div className="tab-content pt-2">
        <div className="tab-pane fade show active">
          <div className="row">
            {filtered.map((product, i) => (
              <div
                key={`${product.id}-${i}`}
                className="col-6 col-md-4 col-lg-3"
              >
                <div className="product-card mb-3 mb-md-4 mb-xxl-5">
                  <div className="pc__img-wrapper">
                    <Swiper
                      modules={[Navigation]}
                      navigation={{
                        prevEl: `.pc__img-prev-${i}`,
                        nextEl: `.pc__img-next-${i}`,
                      }}
                      className="swiper-container background-img js-swiper-slider"
                    >
                      {[1].map((_, index) => (
                        <SwiperSlide key={index}>
                          <Link href={`/product/${product.slug}`}>
                            <Image
                              loading="lazy"
                              src={
                                product.imgSrc
                                  ? product.imgSrc
                                  : "/images/placeholder.png"
                              }
                              width={330}
                              height={400}
                              alt={product.title}
                              className="pc__img"
                            />
                          </Link>
                        </SwiperSlide>
                      ))}

                      <span
                        className={`cursor-pointer pc__img-prev pc__img-prev-${i}`}
                      >
                        <svg width="7" height="11">
                          <use href="#icon_prev_sm" />
                        </svg>
                      </span>
                      <span
                        className={`cursor-pointer pc__img-next pc__img-next-${i}`}
                      >
                        <svg width="7" height="11">
                          <use href="#icon_next_sm" />
                        </svg>
                      </span>
                    </Swiper>

                    {/* <button
                      className="pc__atc btn anim_appear-bottom btn position-absolute border-0 text-uppercase fw-medium"
                      onClick={() => addProductToCart(product)}
                    >
                      <span>
                        {isAddedToCartProducts(product.id)
                          ? "Already Added"
                          : "Add To Cart"}
                      </span>
                    </button> */}

                    <div className="anim_appear-right position-absolute top-0 mt-2 me-2">
                      <button
                        className="btn btn-round-sm btn-hover-red d-block border-0 text-uppercase mb-2 js-quick-view"
                        data-bs-toggle="modal"
                        data-bs-target="#quickView"
                        onClick={() => setQuickViewItem(product)}
                        title="Quick view"
                      >
                        <svg
                          className="d-inline-block"
                          width="14"
                          height="14"
                          viewBox="0 0 18 18"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <use href="#icon_view" />
                        </svg>
                      </button>
                    </div>
                  </div>

                  <div className="pc__info position-relative">
                    <p className="pc__category">{product.category}</p>

                    <h6 className="pc__title mb-2">
                      <Link href={`/product1_simple/${product.id}`}>
                        {product.title}
                      </Link>
                    </h6>

                    <div className="product-card__price d-flex">
                      <span className="money price">LKR {product.price}</span>
                    </div>

                    <button
                      className={`pc__btn-wl position-absolute top-0 end-0 bg-transparent border-0 js-add-wishlist ${
                        isAddedtoWishlist(product.id) ? "active" : ""
                      }`}
                      onClick={() => toggleWishlist(product.id)}
                      title="Add To Wishlist"
                    >
                      <svg width="16" height="16">
                        <use href="#icon_heart" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-2">
            <Link
              className="btn-link btn-link_lg default-underline text-uppercase fw-medium"
              href="/shop-1"
            >
              See All Products
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
