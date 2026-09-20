"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useMemo } from "react";
import { WHATSAPP_CONFIG } from "@/config/whatsapp.config";

// Default authentic products if API is offline or loading
const DEFAULT_PRODUCTS = [
  {
    id: 7,
    title: "Dropit Masala Tea Extract",
    filterCategory: "Liquid Spices",
    imgSrc: "https://pub-82664a84eabd402db7a9aa963e98cc10.r2.dev/products/kAzqC7W6pOp5wELeNOAJZjlDgBkDGYqwbkzSf2JR.jpg",
    variants: ["30 ml", "100 ml", "500 ml", "1 L"],
  },
  {
    id: 6,
    title: "Dropit Cardamom Extract",
    filterCategory: "Liquid Spices",
    imgSrc: "https://pub-82664a84eabd402db7a9aa963e98cc10.r2.dev/products/G7TKM66doAR43cS1eZs63mX7YcPqmLXSd4bpwDxz.jpg",
    variants: ["30 ml", "100 ml", "500 ml", "1 L"],
  },
  {
    id: 5,
    title: "Dropit Ceylon Cinnamon Extract",
    filterCategory: "Liquid Spices",
    imgSrc: "https://pub-82664a84eabd402db7a9aa963e98cc10.r2.dev/products/BPRBdIaWCyfG5LPA8phl1vTA9q4WPKMklV6tQWDz.jpg",
    variants: ["30 ml", "100 ml", "500 ml", "1 L"],
  },
  {
    id: 4,
    title: "Dropit Ginger Extract",
    filterCategory: "Liquid Spices",
    imgSrc: "https://pub-82664a84eabd402db7a9aa963e98cc10.r2.dev/products/X9yEDhbHtPwI5WDMrIcJfxtlVbmDLq0T9kvZNwcQ.jpg",
    variants: ["30 ml", "100 ml", "500 ml", "1 L"],
  },
  {
    id: 3,
    title: "Ceylon Cinnamon & Vanilla Elixir",
    filterCategory: "Gourmet Syrups",
    imgSrc: "https://pub-82664a84eabd402db7a9aa963e98cc10.r2.dev/products/KlkFjmbqDLQjeEMylAlnUGE0hbPVE6UuyFQWmBKl.png",
    variants: ["200 ml", "250 ml", "500 ml", "1 L"],
  },
  {
    id: 2,
    title: "Chai Elixir",
    filterCategory: "Gourmet Syrups",
    imgSrc: "https://pub-82664a84eabd402db7a9aa963e98cc10.r2.dev/products/rZkAjAfFqUpUEAadpPXk1DEltZZtTb3oGB5Caf6T.jpg",
    variants: ["200 ml", "500 ml", "1 L"],
  },
  {
    id: 1,
    title: "Ginger Elixir",
    filterCategory: "Gourmet Syrups",
    imgSrc: "https://pub-82664a84eabd402db7a9aa963e98cc10.r2.dev/products/i2sWi0BDUvqABe9Kn4rwJiM9153PZX55GiQxs68b.jpg",
    variants: ["200 ml", "500 ml", "1 L"],
  },
];

const POPULAR_COUNTRIES = [
  "United Kingdom",
  "United States",
  "Australia",
  "United Arab Emirates",
  "Germany",
  "Canada",
  "Singapore",
  "Japan",
  "France",
  "Netherlands",
  "Saudi Arabia",
  "India",
  "Maldives",
  "Other",
];

export default function BulkOrders({ products = [] }) {
  // Normalize incoming products list
  const normalizedProducts = useMemo(() => {
    const rawList = Array.isArray(products)
      ? products
      : products?.products && Array.isArray(products.products)
      ? products.products
      : [];

    if (!rawList || rawList.length === 0) return DEFAULT_PRODUCTS;

    return rawList.map((p) => {
      let variantList = ["30 ml", "100 ml", "500 ml"];
      if (p.variants && typeof p.variants === "object") {
        const keys = Object.keys(p.variants);
        if (keys.length > 0) {
          variantList = keys;
        }
      }
      return {
        id: p.id,
        title: p.title || "Ceylon Extract",
        filterCategory: p.filterCategory?.trim() || "Liquid Spices",
        imgSrc: p.imgSrc || "/assets/images/shop/product-1.jpg",
        variants: variantList,
      };
    });
  }, [products]);

  // Categories list
  const categories = useMemo(() => {
    const unique = [
      ...new Set(normalizedProducts.map((p) => p.filterCategory)),
    ];
    return ["All Categories", ...unique];
  }, [normalizedProducts]);

  // Filters & Search
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All Categories");

  // Selection states for each card: { [productId]: { variant: string, qty: number } }
  const [cardSelections, setCardSelections] = useState(() => {
    const initial = {};
    normalizedProducts.forEach((p) => {
      initial[p.id] = {
        variant: p.variants[0] || "30 ml",
        qty: 1,
      };
    });
    return initial;
  });

  // Bulk Order Cart: array of { id, productId, title, variant, qty, imgSrc }
  const [orderItems, setOrderItems] = useState([]);

  // Modal / Details Form State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [orderType, setOrderType] = useState("local"); // 'local' | 'international'
  const [formData, setFormData] = useState({
    fullName: "",
    businessName: "",
    email: "",
    phone: "",
    country: "United Kingdom",
    city: "",
    notes: "",
  });
  const [addedNotice, setAddedNotice] = useState(null);

  // Filtered products
  const filteredProducts = useMemo(() => {
    return normalizedProducts.filter((p) => {
      const matchCategory =
        selectedCategory === "All Categories" ||
        p.filterCategory.toLowerCase() === selectedCategory.toLowerCase();
      const matchSearch =
        searchQuery.trim() === "" ||
        p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.filterCategory.toLowerCase().includes(searchQuery.toLowerCase());
      return matchCategory && matchSearch;
    });
  }, [normalizedProducts, selectedCategory, searchQuery]);

  // Handle card variant change
  const handleVariantChange = (productId, variant) => {
    setCardSelections((prev) => ({
      ...prev,
      [productId]: {
        ...(prev[productId] || { qty: 1 }),
        variant,
      },
    }));
  };

  // Handle card qty change
  const handleQtyChange = (productId, delta) => {
    setCardSelections((prev) => {
      const current = prev[productId] || { variant: "30 ml", qty: 1 };
      const nextQty = Math.max(1, current.qty + delta);
      return {
        ...prev,
        [productId]: { ...current, qty: nextQty },
      };
    });
  };

  // Add item from card to order
  const handleAddToOrder = (product) => {
    const sel = cardSelections[product.id] || {
      variant: product.variants[0] || "30 ml",
      qty: 1,
    };
    const key = `${product.id}-${sel.variant}`;

    setOrderItems((prev) => {
      const existingIndex = prev.findIndex((item) => item.id === key);
      if (existingIndex > -1) {
        const updated = [...prev];
        updated[existingIndex].qty += sel.qty;
        return updated;
      } else {
        return [
          ...prev,
          {
            id: key,
            productId: product.id,
            title: product.title,
            variant: sel.variant,
            qty: sel.qty,
            imgSrc: product.imgSrc,
          },
        ];
      }
    });

    setAddedNotice(`Added ${sel.qty}x ${product.title} (${sel.variant})`);
    setTimeout(() => setAddedNotice(null), 2500);
  };

  // Update order item quantity in right panel
  const handleUpdateCartQty = (id, delta) => {
    setOrderItems((prev) => {
      return prev
        .map((item) => {
          if (item.id === id) {
            const nextQty = item.qty + delta;
            return nextQty > 0 ? { ...item, qty: nextQty } : null;
          }
          return item;
        })
        .filter(Boolean);
    });
  };

  // Remove order item from right panel
  const handleRemoveItem = (id) => {
    setOrderItems((prev) => prev.filter((item) => item.id !== id));
  };

  // Total quantity calculation
  const totalItemsCount = useMemo(() => {
    return orderItems.reduce((acc, item) => acc + item.qty, 0);
  }, [orderItems]);

  // WhatsApp Inquiry Generator
  const handleSendWhatsAppInquiry = (e) => {
    e.preventDefault();

    if (orderItems.length === 0) {
      alert("Please add at least one product to your bulk order list.");
      return;
    }

    if (!formData.fullName.trim()) {
      alert("Please enter your name.");
      return;
    }

    const itemsText = orderItems
      .map(
        (item, idx) =>
          `${idx + 1}. *${item.title}* (${item.variant}) - *${item.qty} units*`
      )
      .join("\n");

    const destinationText =
      orderType === "international"
        ? `🌍 International Export (Destination: ${formData.country})`
        : "📍 Local Delivery (Sri Lanka)";

    const message = `🌿 *ENDLESS GREENS - BULK PURCHASE INQUIRY*

*Customer Details:*
• *Name:* ${formData.fullName}
${formData.businessName ? `• *Company/Business:* ${formData.businessName}\n` : ""
}• *Order Type:* ${destinationText}
${formData.email ? `• *Email:* ${formData.email}\n` : ""
}• *Phone:* ${formData.phone || "Not provided"}
${formData.city ? `• *City/Address:* ${formData.city}\n` : ""}
*Requested Products (${totalItemsCount} total items):*
${itemsText}

${formData.notes ? `*Special Notes & Requirements:*\n${formData.notes}\n\n` : ""
}---
_Sent via Endless Greens Bulk Orders Portal_`;

    const phone = WHATSAPP_CONFIG.phoneNumber || "94777530354";
    const url = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
    window.open(url, "_blank");
    setIsModalOpen(false);
  };

  return (
    <div className="bulk-order-page">
      {/* 1. HERO BANNER */}
      <section className="bulk-hero-banner">
        <div className="container">
          <div className="bulk-hero-banner__content">
            <nav className="bulk-hero-banner__breadcrumb" aria-label="breadcrumb">
              <Link href="/">HOME</Link>
              <span className="sep">/</span>
              <span className="current">BULK PURCHASE</span>
            </nav>
            <h1 className="bulk-hero-banner__title">BULK PURCHASE</h1>
            <p className="bulk-hero-banner__desc">
              Curated quantities for cafés, retailers, hospitality
              <br className="d-none d-sm-inline" /> and growing businesses.
            </p>
            <div className="bulk-hero-banner__accent" />
          </div>
        </div>
      </section>

      {/* 2. MAIN BULK SELECTOR + ORDER SUMMARY SECTION */}
      <section className="bulk-main-container container mb-5 pb-xl-4">
        {/* Feedback Alert Toast */}
        {addedNotice && (
          <div className="bulk-added-toast alert alert-success d-flex align-items-center justify-content-between shadow-sm">
            <span>✓ {addedNotice}</span>
            <button
              type="button"
              className="btn-close ms-2"
              onClick={() => setAddedNotice(null)}
            ></button>
          </div>
        )}

        <div className="row g-4 g-xl-5">
          {/* LEFT COLUMN: PRODUCTS CATALOG */}
          <div className="col-lg-8 col-xl-8">
            <div className="d-flex flex-column flex-md-row align-items-md-center justify-content-between mb-4">
              <div>
                <h2 className="bulk-section-title mb-1">Select Products</h2>
                <p className="text-secondary small mb-0">
                  Select your desired botanical drops, size options, and wholesale quantities.
                </p>
              </div>
            </div>

            {/* Filter & Search Bar */}
            <div className="bulk-filter-bar mb-4 p-3 bg-white rounded-3 shadow-xs border">
              <div className="row g-2 align-items-center">
                <div className="col-12 col-md-7">
                  <div className="bulk-search-box">
                    <svg
                      className="bulk-search-icon"
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <circle cx="11" cy="11" r="8"></circle>
                      <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                    </svg>
                    <input
                      type="text"
                      className="form-control bulk-search-input"
                      placeholder="Search products..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                    {searchQuery && (
                      <button
                        className="btn btn-sm text-secondary p-0 me-2"
                        onClick={() => setSearchQuery("")}
                      >
                        ✕
                      </button>
                    )}
                  </div>
                </div>
                <div className="col-12 col-md-5">
                  <select
                    className="form-select bulk-category-select"
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                  >
                    {categories.map((cat, idx) => (
                      <option key={idx} value={cat}>
                        {cat}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {/* Product Cards Grid */}
            {filteredProducts.length === 0 ? (
              <div className="text-center py-5 bg-white rounded-3 border">
                <p className="fs-5 text-secondary mb-2">No products found</p>
                <button
                  className="btn btn-outline-secondary btn-sm"
                  onClick={() => {
                    setSearchQuery("");
                    setSelectedCategory("All Categories");
                  }}
                >
                  Reset Filters
                </button>
              </div>
            ) : (
              <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3 g-md-4">
                {filteredProducts.map((product) => {
                  const sel = cardSelections[product.id] || {
                    variant: product.variants[0] || "30 ml",
                    qty: 1,
                  };
                  return (
                    <div key={product.id} className="col">
                      <div className="bulk-product-card card h-100 border rounded-3 bg-white shadow-xs">
                        {/* Product Image */}
                        <div className="bulk-product-card__img-wrap position-relative">
                          <Image
                            src={product.imgSrc}
                            alt={product.title}
                            width={320}
                            height={300}
                            className="bulk-product-card__img"
                            unoptimized={product.imgSrc.startsWith("http")}
                          />
                        </div>

                        {/* Product Info */}
                        <div className="card-body p-3 d-flex flex-column">
                          <span className="bulk-product-card__category text-uppercase mb-1">
                            {product.filterCategory}
                          </span>
                          <h3 className="bulk-product-card__title mb-3">
                            {product.title}
                          </h3>

                          {/* Variant Dropdown */}
                          <div className="mb-2 mt-auto">
                            <select
                              className="form-select bulk-product-card__select w-100"
                              value={sel.variant}
                              onChange={(e) =>
                                handleVariantChange(product.id, e.target.value)
                              }
                            >
                              {product.variants.map((v, i) => (
                                <option key={i} value={v}>
                                  {v}
                                </option>
                              ))}
                            </select>
                          </div>

                          {/* Stepper (Full Width) */}
                          <div className="bulk-stepper w-100 d-flex align-items-center justify-content-between border rounded mb-2">
                            <button
                              type="button"
                              className="bulk-stepper__btn"
                              onClick={() => handleQtyChange(product.id, -1)}
                              aria-label="Decrease quantity"
                            >
                              –
                            </button>
                            <span className="bulk-stepper__val flex-grow-1 text-center">
                              {sel.qty}
                            </span>
                            <button
                              type="button"
                              className="bulk-stepper__btn"
                              onClick={() => handleQtyChange(product.id, 1)}
                              aria-label="Increase quantity"
                            >
                              +
                            </button>
                          </div>

                          {/* Add to Order Button (Full Width) */}
                          <button
                            type="button"
                            className="btn bulk-product-card__btn w-100 d-flex align-items-center justify-content-center gap-2"
                            onClick={() => handleAddToOrder(product)}
                          >
                            <svg
                              width="15"
                              height="15"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                            >
                              <circle cx="9" cy="21" r="1"></circle>
                              <circle cx="20" cy="21" r="1"></circle>
                              <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
                            </svg>
                            <span>Add to Order</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* RIGHT COLUMN: STICKY "YOUR BULK ORDER" PANEL */}
          <div className="col-lg-4 col-xl-4">
            <div className="bulk-order-summary-card card border rounded-3 bg-white p-3 p-xl-4 sticky-top">
              <h3 className="bulk-order-summary-card__title mb-3">
                Your Bulk Order
              </h3>

              {/* Items List */}
              <div className="bulk-order-summary-card__list mb-3">
                {orderItems.length === 0 ? (
                  <div className="text-center py-4 text-secondary">
                    <svg
                      className="mb-2 text-muted"
                      width="40"
                      height="40"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.5"
                    >
                      <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path>
                      <line x1="3" y1="6" x2="21" y2="6"></line>
                      <path d="M16 10a4 4 0 0 1-8 0"></path>
                    </svg>
                    <p className="small mb-0">No items selected yet.</p>
                    <p className="text-muted small">
                      Select items and quantities on the left to build your bulk inquiry.
                    </p>
                  </div>
                ) : (
                  orderItems.map((item) => (
                    <div
                      key={item.id}
                      className="bulk-cart-item d-flex align-items-start gap-3 py-3 border-bottom position-relative"
                    >
                      <div className="bulk-cart-item__thumb flex-shrink-0">
                        <Image
                          src={item.imgSrc}
                          alt={item.title}
                          width={60}
                          height={60}
                          className="rounded object-fit-cover"
                          unoptimized={item.imgSrc.startsWith("http")}
                        />
                      </div>
                      <div className="flex-grow-1 min-w-0 pe-4">
                        <h4 className="bulk-cart-item__title text-truncate mb-1">
                          {item.title}
                        </h4>
                        <div className="bulk-cart-item__variant text-muted small mb-2">
                          {item.variant}
                        </div>
                        <div className="bulk-cart-item__stepper d-inline-flex align-items-center border rounded">
                          <button
                            type="button"
                            onClick={() => handleUpdateCartQty(item.id, -1)}
                            className="stepper-btn"
                            aria-label="Decrease"
                          >
                            –
                          </button>
                          <span className="stepper-val">{item.qty}</span>
                          <button
                            type="button"
                            onClick={() => handleUpdateCartQty(item.id, 1)}
                            className="stepper-btn"
                            aria-label="Increase"
                          >
                            +
                          </button>
                        </div>
                      </div>

                      <button
                        type="button"
                        className="btn btn-link text-muted p-0 text-decoration-none fs-5 position-absolute top-2 end-0 lh-1"
                        onClick={() => handleRemoveItem(item.id)}
                        title="Remove item"
                      >
                        ×
                      </button>
                    </div>
                  ))
                )}
              </div>

              {/* Total items row */}
              <div className="d-flex align-items-center justify-content-between pt-2 pb-3 border-top">
                <span className="fw-medium text-secondary">Total Items</span>
                <span className="fw-bold fs-5 text-dark">
                  {totalItemsCount}
                </span>
              </div>

              {/* Checkout Button */}
              <button
                type="button"
                className="btn bulk-continue-btn w-100 py-3 text-uppercase fw-bold"
                disabled={orderItems.length === 0}
                onClick={() => setIsModalOpen(true)}
              >
                Continue to Customer Details →
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 3. BRAND & WHOLESALE STORY SECTION */}
      <section className="bulk-story-section py-5 my-4 bg-cream">
        <div className="container py-xl-3">
          <div className="row align-items-center g-4 g-lg-5">
            <div className="col-lg-6 order-2 order-lg-1">
              <span className="text-uppercase fw-bold text-olive small letter-spacing-1">
                Our Botanical Journey
              </span>
              <h2 className="display-6 fw-bold text-dark mt-2 mb-3">
                Crafted for Cafés, Chefs & Wellness Brands
              </h2>
              <p className="text-secondary mb-3 lh-lg">
                At Endless Greens, our mission is to deliver the purest bioactive essence of Ceylon spices directly to your commercial kitchen, beverage bar, or boutique wellness brand.
              </p>
              <p className="text-secondary mb-4 lh-lg">
                Using green scientific hydro-distillation and gentle botanical extraction, each bottle of <strong>Dropit Liquid Spices</strong> and <strong>Infusio Elixirs</strong> delivers unadulterated flavor, aroma, and functional properties with zero artificial preservatives.
              </p>
              <div className="row g-3 text-start">
                <div className="col-6">
                  <div className="p-3 bg-white rounded-3 border h-100">
                    <h4 className="fw-bold fs-5 mb-1 text-dark">100% Pure Ceylon</h4>
                    <p className="text-muted small mb-0">Directly sourced from organic smallholder farmers.</p>
                  </div>
                </div>
                <div className="col-6">
                  <div className="p-3 bg-white rounded-3 border h-100">
                    <h4 className="fw-bold fs-5 mb-1 text-dark">Batch Consistency</h4>
                    <p className="text-muted small mb-0">Standardized potency for precision culinary execution.</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-6 order-1 order-lg-2 text-center">
              <div className="position-relative overflow-hidden rounded-4 shadow-sm">
                <Image
                  src="/assets/images/home/endless/banner1.jpeg"
                  alt="Endless Greens Story"
                  width={640}
                  height={420}
                  className="img-fluid rounded-4 object-fit-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. BUSINESS & WHOLESALE SERVICES */}
      <section className="bulk-services-section container py-4 mb-5 d-none">
        <div className="text-center max-w-700 mx-auto mb-5">
          <span className="text-uppercase fw-bold text-olive small letter-spacing-1">
            Why Partner With Us
          </span>
          <h2 className="h3 fw-bold text-dark mt-1">
            Tailored B2B Services & Logistics
          </h2>
          <p className="text-secondary small">
            Whether you operate an artisan espresso bar, a hotel group, or a food retail brand, our wholesale solutions adapt to your volume and logistics needs.
          </p>
        </div>

        <div className="row row-cols-1 row-cols-md-2 row-cols-lg-4 g-4">
          <div className="col">
            <div className="card h-100 p-4 border rounded-3 bg-white text-center shadow-xs">
              <div className="bulk-service-icon mx-auto mb-3">
                ☕
              </div>
              <h4 className="fs-6 fw-bold mb-2">Café & Mixology Support</h4>
              <p className="text-muted small mb-0">
                Signature cocktail and specialty beverage recipes customized for your seasonal menu.
              </p>
            </div>
          </div>
          <div className="col">
            <div className="card h-100 p-4 border rounded-3 bg-white text-center shadow-xs">
              <div className="bulk-service-icon mx-auto mb-3">
                🏷️
              </div>
              <h4 className="fs-6 fw-bold mb-2">Custom Batching & White Label</h4>
              <p className="text-muted small mb-0">
                Custom bottle packaging, private labeling, and custom formulation blending available.
              </p>
            </div>
          </div>
          <div className="col">
            <div className="card h-100 p-4 border rounded-3 bg-white text-center shadow-xs">
              <div className="bulk-service-icon mx-auto mb-3">
                🔬
              </div>
              <h4 className="fs-6 fw-bold mb-2">Laboratory Certified</h4>
              <p className="text-muted small mb-0">
                Full COA (Certificate of Analysis), export certification, and international compliance.
              </p>
            </div>
          </div>
          <div className="col">
            <div className="card h-100 p-4 border rounded-3 bg-white text-center shadow-xs">
              <div className="bulk-service-icon mx-auto mb-3">
                ✈️
              </div>
              <h4 className="fs-6 fw-bold mb-2">Global Freight Dispatch</h4>
              <p className="text-muted small mb-0">
                Door-to-door domestic dispatch across Sri Lanka, and worldwide air/sea cargo options.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 5. CUSTOMER DETAILS MODAL */}
      {isModalOpen && (
        <div className="bulk-modal-backdrop">
          <div className="bulk-modal-dialog">
            <div className="bulk-modal-content card shadow-lg border-0 rounded-4">
              {/* Modal Header */}
              <div className="bulk-modal-header d-flex align-items-center justify-content-between p-4 border-bottom">
                <div>
                  <h3 className="h5 fw-bold mb-1 text-dark">
                    Complete Bulk Inquiry
                  </h3>
                  <p className="text-muted small mb-0">
                    Provide your delivery destination and contact details.
                  </p>
                </div>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setIsModalOpen(false)}
                ></button>
              </div>

              {/* Modal Body */}
              <form onSubmit={handleSendWhatsAppInquiry} className="p-4">
                {/* Local vs International Toggle */}
                <div className="mb-4">
                  <label className="form-label fw-bold small text-uppercase text-secondary mb-2">
                    Destination Type
                  </label>
                  <div className="row g-2">
                    <div className="col-6">
                      <button
                        type="button"
                        className={`btn w-100 p-2 text-start rounded-3 border d-flex align-items-center gap-2 ${
                          orderType === "local"
                            ? "btn-dark border-dark text-white fw-bold"
                            : "btn-light text-dark"
                        }`}
                        onClick={() => setOrderType("local")}
                      >
                        <span>📍</span>
                        <div>
                          <div className="small fw-bold">Local (Sri Lanka)</div>
                          <div className="text-muted extra-small">
                            Direct courier delivery
                          </div>
                        </div>
                      </button>
                    </div>
                    <div className="col-6">
                      <button
                        type="button"
                        className={`btn w-100 p-2 text-start rounded-3 border d-flex align-items-center gap-2 ${
                          orderType === "international"
                            ? "btn-dark border-dark text-white fw-bold"
                            : "btn-light text-dark"
                        }`}
                        onClick={() => setOrderType("international")}
                      >
                        <span>🌍</span>
                        <div>
                          <div className="small fw-bold">International</div>
                          <div className="text-muted extra-small">
                            Worldwide export air/sea
                          </div>
                        </div>
                      </button>
                    </div>
                  </div>
                </div>

                {/* Country dropdown if international */}
                {orderType === "international" && (
                  <div className="mb-3 animate-fade-in">
                    <label className="form-label fw-bold small text-secondary">
                      Destination Country *
                    </label>
                    <select
                      className="form-select"
                      required
                      value={formData.country}
                      onChange={(e) =>
                        setFormData({ ...formData, country: e.target.value })
                      }
                    >
                      {POPULAR_COUNTRIES.map((c, i) => (
                        <option key={i} value={c}>
                          {c}
                        </option>
                      ))}
                    </select>
                  </div>
                )}

                {/* Contact Fields */}
                <div className="row g-3 mb-3">
                  <div className="col-12 col-sm-6">
                    <label className="form-label fw-bold small text-secondary">
                      Contact Name *
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="e.g. Ruwan Silva"
                      required
                      value={formData.fullName}
                      onChange={(e) =>
                        setFormData({ ...formData, fullName: e.target.value })
                      }
                    />
                  </div>
                  <div className="col-12 col-sm-6">
                    <label className="form-label fw-bold small text-secondary">
                      Business / Café Name
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="e.g. Ceylon Specialty Bar"
                      value={formData.businessName}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          businessName: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div className="col-12 col-sm-6">
                    <label className="form-label fw-bold small text-secondary">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      className="form-control"
                      placeholder="name@business.com"
                      required
                      value={formData.email}
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                    />
                  </div>
                  <div className="col-12 col-sm-6">
                    <label className="form-label fw-bold small text-secondary">
                      WhatsApp / Phone *
                    </label>
                    <input
                      type="tel"
                      className="form-control"
                      placeholder="+94 77 123 4567"
                      required
                      value={formData.phone}
                      onChange={(e) =>
                        setFormData({ ...formData, phone: e.target.value })
                      }
                    />
                  </div>
                  <div className="col-12">
                    <label className="form-label fw-bold small text-secondary">
                      City / Shipping Location
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="e.g. Colombo, London, Sydney..."
                      value={formData.city}
                      onChange={(e) =>
                        setFormData({ ...formData, city: e.target.value })
                      }
                    />
                  </div>
                  <div className="col-12">
                    <label className="form-label fw-bold small text-secondary">
                      Special Requirements / Inquiries
                    </label>
                    <textarea
                      rows="3"
                      className="form-control"
                      placeholder="e.g. Requesting wholesale price tier, private labeling, custom bottling sizes..."
                      value={formData.notes}
                      onChange={(e) =>
                        setFormData({ ...formData, notes: e.target.value })
                      }
                    ></textarea>
                  </div>
                </div>

                {/* Summary badge */}
                <div className="p-3 bg-light rounded-3 mb-4 d-flex align-items-center justify-content-between">
                  <span className="small text-secondary">
                    Total Items in Inquiry:
                  </span>
                  <span className="fw-bold fs-6 text-dark">
                    {totalItemsCount} units across {orderItems.length} products
                  </span>
                </div>

                {/* Submit button */}
                <button
                  type="submit"
                  className="btn btn-success w-100 py-3 d-flex align-items-center justify-content-center gap-2 fw-bold text-uppercase rounded-3 shadow-sm"
                  style={{ backgroundColor: "#25D366", borderColor: "#25D366" }}
                >
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="white"
                  >
                    <path d="M20.52 3.48A11.86 11.86 0 0 0 12.03 0C5.41 0 .03 5.38.03 12c0 2.11.55 4.17 1.59 6L0 24l6.16-1.61a11.96 11.96 0 0 0 5.86 1.5h.01c6.62 0 12-5.38 12-12 0-3.2-1.25-6.2-3.51-8.41ZM12.03 21.86h-.01a9.9 9.9 0 0 1-5.04-1.37l-.36-.21-3.65.95.97-3.56-.24-.37a9.9 9.9 0 0 1-1.52-5.3c0-5.47 4.45-9.92 9.92-9.92a9.86 9.86 0 0 1 7.02 2.91 9.86 9.86 0 0 1 2.9 7.02c0 5.47-4.45 9.92-9.92 9.92Z" />
                  </svg>
                  <span>Send Inquiry via WhatsApp</span>
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
