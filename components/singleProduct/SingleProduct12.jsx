"use client";
import React, { useState } from "react";
import ProductSlider1 from "./sliders/ProductSlider1";
import BreadCumb from "./BreadCumb";
import Star from "../common/Star";
import Colors from "./Colors";
import Size from "./Size";
import Description from "./Description";
import AdditionalInfo from "./AdditionalInfo";
import Reviews from "./Reviews";
import Link from "next/link";
import { useRouter } from "next/navigation";
import ShareComponent from "../common/ShareComponent";
import { useContextElement } from "@/context/Context";
import HowToUse from "./HowToUse";
import { openCart } from "@/utlis/openCart";
import { parseWeightInGrams } from "@/utlis/shipping";

export default function SingleProduct12({ product }) {
  const router = useRouter();
  const { cartProducts, setCartProducts, toggleWishlist, isAddedtoWishlist } =
    useContextElement();
  const [quantity, setQuantity] = useState(1);

  if (!product) return null;

  const sizes = product.bottle_sizes || [];

  const [selectedSize, setSelectedSize] = useState(
    sizes && sizes.length > 0 ? sizes[0] : "500ml",
  );

  const selectedVariant = product.variants?.[selectedSize];

  const [displayPrice, setDisplayPrice] = useState(
    selectedVariant?.price || product.price,
  );

  const currentWeight = parseWeightInGrams(
    selectedVariant?.weight ?? product.weight,
    selectedSize,
    200
  );

  const allImages = [
    ...(Array.isArray(product.imgSrc) ? product.imgSrc : []),
    ...(product.other_images ? Object.values(product.other_images) : []),
  ].filter((v, i, a) => a.indexOf(v) === i);

  // const description = product.description;
  // const ingredients = product.ingredients;
  // const howToUse = product.how_to_use;

  const handleSizeChange = (size) => {
    setSelectedSize(size);
    const variant = product.variants?.[size];
    setDisplayPrice(variant?.price || product.price);
  };

  const isIncludeCard = () => {
    const variant = product.variants?.[selectedSize];
    const variantId = variant?.id || product.variant_id;
    return cartProducts.find((elm) => {
      if (elm.id != product.id) return false;
      if (variantId && elm.variant_id) return elm.variant_id == variantId;
      return elm.size === selectedSize;
    });
  };

  const setQuantityCartItem = (id, newQuantity) => {
    const qty = Math.max(1, Number(newQuantity) || 1);
    const existing = isIncludeCard();
    if (existing) {
      const items = cartProducts.map((elm) =>
        elm === existing ? { ...elm, quantity: qty } : elm
      );
      setCartProducts(items);
    } else {
      setQuantity(qty);
    }
  };

  const addToCart = () => {
    const existing = isIncludeCard();
    if (existing) {
      openCart();
      return;
    }

    const variant = product.variants?.[selectedSize];
    const variantId = variant?.id || product.variant_id || product.id;
    const variantWeight = parseWeightInGrams(
      variant?.weight ?? product.weight,
      selectedSize,
      200
    );

    const item = {
      ...product,
      id: product.id,
      variant_id: variantId,
      product_variant_id: variantId,
      imgSrc: allImages[0] || product.imgSrc || "/assets/images/products/product_0.jpg",
      quantity,
      size: selectedSize,
      price: Number(displayPrice) || Number(product.price) || 0,
      weight: variantWeight,
      weight_grams: variantWeight,
    };
    setCartProducts((pre) => [...pre, item]);
    openCart();
  };

  const handleBuyNow = (e) => {
    if (e) e.preventDefault();
    const existing = isIncludeCard();
    let updatedCart = [...cartProducts];

    const variant = product.variants?.[selectedSize];
    const variantId = variant?.id || product.variant_id || product.id;
    const variantWeight = parseWeightInGrams(
      variant?.weight ?? product.weight,
      selectedSize,
      200
    );

    const chosenQty = Number(quantity) > 0 ? Number(quantity) : 1;

    if (!existing) {
      const item = {
        ...product,
        id: product.id,
        variant_id: variantId,
        product_variant_id: variantId,
        imgSrc:
          allImages[0] ||
          product.imgSrc ||
          "/assets/images/products/product_0.jpg",
        quantity: chosenQty,
        size: selectedSize,
        price: Number(displayPrice) || Number(product.price) || 0,
        weight: variantWeight,
        weight_grams: variantWeight,
      };
      updatedCart = [...updatedCart, item];
    } else {
      updatedCart = updatedCart.map((elm) =>
        elm === existing ? { ...elm, quantity: chosenQty } : elm
      );
    }

    setCartProducts(updatedCart);
    try {
      localStorage.setItem("cartList", JSON.stringify(updatedCart));
    } catch (err) {
      console.error("Cart storage error:", err);
    }

    router.push("/shop_checkout");
  };

  const formattedPrice = Number(displayPrice || product.price || 0).toLocaleString(
    "en-US",
    {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }
  );
  return (
    <section className="product-single container">
      <div className="row">
        <div className="col-lg-7">
          <ProductSlider1 images={allImages} />
        </div>
        <div className="col-lg-5">
          <div className="d-flex justify-content-between mb-4 pb-md-2">
            <div className="breadcrumb mb-0 d-none d-md-block flex-grow-1">
              <BreadCumb />
            </div>
            {/* <!-- /.breadcrumb --> */}

            {/* <div className="product-single__prev-next d-flex align-items-center justify-content-between justify-content-md-end flex-grow-1">
              <a className="text-uppercase fw-medium">
                <svg
                  className="mb-1px"
                  width="10"
                  height="10"
                  viewBox="0 0 25 25"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <use href="#icon_prev_md" />
                </svg>
                <span className="menu-link menu-link_us-s">Prev</span>
              </a>
              <a className="text-uppercase fw-medium">
                <span className="menu-link menu-link_us-s">Next</span>
                <svg
                  className="mb-1px"
                  width="10"
                  height="10"
                  viewBox="0 0 25 25"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <use href="#icon_next_md" />
                </svg>
              </a>
            </div> */}
            {/* <!-- /.shop-acs --> */}
          </div>
          <h1 className="product-single__name">{product.title}</h1>
          {/* <div className="product-single__rating">
            <div className="reviews-group d-flex">
              <Star stars={5} />
            </div>
            <span className="reviews-note text-lowercase text-secondary ms-1">
              8k+ reviews
            </span>
          </div> */}
          <div className="product-single__price">
            <span className="current-price">Rs {displayPrice}</span>
          </div>
          <div className="product-single__short-desc">
            <div dangerouslySetInnerHTML={{ __html: product.description }} />
          </div>
          <form onSubmit={(e) => e.preventDefault()}>
            <div className="product-single__swatches">
              <div className="product-swatch text-swatches">
                <label>Sizes</label>
                <div className="swatch-list">
                  <Size
                    sizes={sizes}
                    selectedSize={selectedSize}
                    onSizeChange={handleSizeChange}
                  />
                </div>
                {/* <a
                  href="#"
                  className="sizeguide-link"
                  data-bs-toggle="modal"
                  data-bs-target="#sizeGuide"
                >
                  Size Guide
                </a> */}
              </div>
              {/* <div className="product-swatch color-swatches">
                <label>Color</label>
                <div className="swatch-list">
                  <Colors />
                </div>
              </div> */}
            </div>
            <div className="product-single__addtocart">
              <div className="qty-control position-relative">
                <input
                  type="number"
                  name="quantity"
                  value={isIncludeCard() ? isIncludeCard().quantity : quantity}
                  min="1"
                  onChange={(e) =>
                    setQuantityCartItem(product.id, e.target.value)
                  }
                  className="qty-control__number text-center"
                />
                <div
                  onClick={() =>
                    setQuantityCartItem(
                      product.id,
                      isIncludeCard()?.quantity - 1 || quantity - 1,
                    )
                  }
                  className="qty-control__reduce"
                >
                  -
                </div>
                <div
                  onClick={() =>
                    setQuantityCartItem(
                      product.id,
                      isIncludeCard()?.quantity + 1 || quantity + 1,
                    )
                  }
                  className="qty-control__increase"
                >
                  +
                </div>
              </div>
              {/* <!-- .qty-control --> */}
              <button
                type="button"
                className="btn btn-primary btn-addtocart js-open-aside"
                onClick={() => addToCart()}
              >
                {isIncludeCard() ? "Already Added" : "Add to Cart"} -LKR {formattedPrice}
              </button>

              <button
                type="button"
                className={`btn-wishlist-box ${
                  isAddedtoWishlist(product.id) ? "active" : ""
                }`}
                onClick={(e) => {
                  e.preventDefault();
                  toggleWishlist(product.id);
                }}
                title={
                  isAddedtoWishlist(product.id)
                    ? "Remove from Wishlist"
                    : "Add to Wishlist"
                }
                aria-label="Wishlist"
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill={isAddedtoWishlist(product.id) ? "#d6001c" : "none"}
                  stroke={
                    isAddedtoWishlist(product.id) ? "#d6001c" : "currentColor"
                  }
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <use href="#icon_heart" />
                </svg>
              </button>
            </div>

            <div className="product-single__payment-methods d-flex align-items-center flex-wrap gap-2 my-3 d-none">
              <span className="payment-methods__title">
                Pay via Bank Transfer or
              </span>
              <div className="payment-methods__badges d-flex align-items-center gap-2">
                {/* COD Badge */}
                <div
                  className="payment-badge payment-badge--cod"
                  title="Cash on Delivery"
                >
                  <svg
                    width="48"
                    height="22"
                    viewBox="0 0 66 26"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <text
                      x="0"
                      y="13"
                      fill="#D62828"
                      fontFamily="Arial, sans-serif"
                      fontWeight="900"
                      fontSize="14"
                      letterSpacing="0.5"
                    >
                      COD
                    </text>
                    <text
                      x="0"
                      y="22"
                      fill="#D62828"
                      fontFamily="Arial, sans-serif"
                      fontWeight="700"
                      fontSize="4.8"
                      letterSpacing="0.2"
                    >
                      CASH ON DELIVERY
                    </text>
                    <g transform="translate(36, 3)">
                      <rect
                        x="1"
                        y="3"
                        width="13"
                        height="9"
                        rx="1"
                        fill="#D62828"
                      />
                      <path d="M14 6h4l3 3.5v2.5h-7V6z" fill="#D62828" />
                      <circle cx="5" cy="13" r="2.2" fill="#333" />
                      <circle cx="17" cy="13" r="2.2" fill="#333" />
                      <circle cx="5" cy="13" r="1" fill="#fff" />
                      <circle cx="17" cy="13" r="1" fill="#fff" />
                      <circle cx="7" cy="7.5" r="2.8" fill="#fff" />
                      <text
                        x="5.4"
                        y="9.2"
                        fill="#D62828"
                        fontFamily="Arial, sans-serif"
                        fontWeight="bold"
                        fontSize="4.5"
                      >
                        C
                      </text>
                    </g>
                  </svg>
                </div>

                {/* VISA Badge */}
                <div
                  className="payment-badge payment-badge--visa"
                  title="Visa"
                >
                  <svg
                    width="36"
                    height="22"
                    viewBox="0 0 44 22"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <text
                      x="2"
                      y="16"
                      fill="#1A1F71"
                      fontFamily="Arial, sans-serif"
                      fontStyle="italic"
                      fontWeight="900"
                      fontSize="17"
                      letterSpacing="-0.5"
                    >
                      VISA
                    </text>
                    <path d="M2 5 L7 5 L5 9 Z" fill="#F7B600" />
                  </svg>
                </div>

                {/* MASTERCARD Badge */}
                <div
                  className="payment-badge payment-badge--mastercard"
                  title="Mastercard"
                >
                  <svg
                    width="36"
                    height="22"
                    viewBox="0 0 38 22"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <circle cx="14" cy="11" r="7.5" fill="#EB001B" />
                    <circle
                      cx="24"
                      cy="11"
                      r="7.5"
                      fill="#F79E1B"
                      fillOpacity="0.95"
                    />
                    <path
                      d="M19 5.5a7.5 7.5 0 0 1 0 11 7.5 7.5 0 0 1 0-11z"
                      fill="#FF5F00"
                    />
                  </svg>
                </div>

                {/* KOKO Badge */}
                <div
                  className="payment-badge payment-badge--koko"
                  title="Koko - Buy Now Pay Later"
                >
                  <svg
                    width="46"
                    height="22"
                    viewBox="0 0 52 22"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <defs>
                      <linearGradient
                        id="kokoGradient"
                        x1="0%"
                        y1="0%"
                        x2="100%"
                        y2="100%"
                      >
                        <stop offset="0%" stopColor="#4A00E0" />
                        <stop offset="40%" stopColor="#8E2DE2" />
                        <stop offset="100%" stopColor="#FF007F" />
                      </linearGradient>
                    </defs>
                    <text
                      x="3"
                      y="16"
                      fill="url(#kokoGradient)"
                      stroke="url(#kokoGradient)"
                      strokeWidth="0.8"
                      fontFamily="Arial Rounded MT Bold, Arial, sans-serif"
                      fontWeight="900"
                      fontSize="14"
                      letterSpacing="0.8"
                    >
                      KOKO
                    </text>
                  </svg>
                </div>
              </div>
            </div>

            <button
              type="button"
              className="btn btn-buy-now w-100"
              onClick={handleBuyNow}
            >
              Buy Now – Refresh Your Mind
            </button>
          </form>
          <div className="product-single__addtolinks mt-3">
            <ShareComponent title={product.title} />
          </div>
          {/* <div className="product-single__meta-info">
            <div className="meta-item">
              <label>SKU:</label>
              <span>N/A</span>
            </div>
            <div className="meta-item">
              <label>Categories:</label>
              <span>Casual & Urban Wear, Jackets, Men</span>
            </div>
            <div className="meta-item">
              <label>Tags:</label>
              <span>biker, black, bomber, leather</span>
            </div>
          </div> */}
        </div>
      </div>
      <div className="product-single__details-tab">
        <ul className="nav nav-tabs" id="myTab1" role="tablist">
          <li className="nav-item" role="presentation">
            <a
              className="nav-link nav-link_underscore active"
              id="tab-description-tab"
              data-bs-toggle="tab"
              href="#tab-description"
              role="tab"
              aria-controls="tab-description"
              aria-selected="true"
            >
              Description
            </a>
          </li>
          <li className="nav-item" role="presentation">
            <a
              className="nav-link nav-link_underscore"
              id="tab-additional-info-tab"
              data-bs-toggle="tab"
              href="#tab-additional-info"
              role="tab"
              aria-controls="tab-additional-info"
              aria-selected="false"
            >
              Ingredients
            </a>
          </li>
          {/* <li className="nav-item" role="presentation">
            <a
              className="nav-link nav-link_underscore"
              id="tab-reviews-tab"
              data-bs-toggle="tab"
              href="#tab-reviews"
              role="tab"
              aria-controls="tab-reviews"
              aria-selected="false"
            >
              Reviews
            </a>
          </li> */}
          <li className="nav-item" role="presentation">
            <a
              className="nav-link nav-link_underscore"
              id="tab-how-to-use-tab"
              data-bs-toggle="tab"
              href="#tab-how-to-use"
              role="tab"
              aria-controls="tab-how-to-use"
              aria-selected="false"
            >
              How To Use
            </a>
          </li>
        </ul>
        <div className="tab-content">
          <div
            className="tab-pane fade show active"
            id="tab-description"
            role="tabpanel"
            aria-labelledby="tab-description-tab"
          >
            <Description description={product.description} />
          </div>
          <div
            className="tab-pane fade"
            id="tab-additional-info"
            role="tabpanel"
            aria-labelledby="tab-additional-info-tab"
          >
            <AdditionalInfo ingredients={product.ingredients} />
          </div>
          <div
            className="tab-pane fade"
            id="tab-reviews"
            role="tabpanel"
            aria-labelledby="tab-reviews-tab"
          >
            <Reviews />
          </div>

          <div
            className="tab-pane fade"
            id="tab-how-to-use"
            role="tabpanel"
            aria-labelledby="tab-how-to-use-tab"
          >
            <HowToUse howToUse={product.how_to_use} />
          </div>
        </div>
      </div>
    </section>
  );
}
