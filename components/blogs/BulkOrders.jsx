"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useMemo } from "react";
import { WHATSAPP_CONFIG } from "@/config/whatsapp.config";
import Blogs from "@/components/homes/home-2/Blogs";
import Brands from "@/components/homes/home-2/Brands";

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
  const [activeB2bTab, setActiveB2bTab] = useState("bulk"); // 'bulk' | 'private_label' | 'rnd'
  const [modalServiceTab, setModalServiceTab] = useState("bulk");
  const [orderType, setOrderType] = useState("local"); // 'local' | 'international'
  
  // Quote Form State (matches UI reference & wireframe draft)
  const [quoteForm, setQuoteForm] = useState({
    relatedProduct: "",
    inquiryDetails: "",
    phone: "",
    email: "",
    contactName: "",
    businessName: "",
  });

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

  // B2B Tabs Specification (matches draft wireframe & high-fidelity design)
  const B2B_TABS = useMemo(
    () => [
      {
        id: "bulk",
        tabLabel: "Bulk Orders",
        eyebrow: "BULK PURCHASE",
        title: "Your Business, Our Priority",
        desc: "Purchase our ready-to-market products in bulk at special B2B pricing. Whether you are a hotel, café, restaurant, retailer, distributor, or other business, our bulk-order solutions make it easy to access our products at competitive rates while maintaining consistent quality, reliable supply, and professional service.",
        badges: [
          {
            title: "Premium Quality",
            sub: "100% pure Ceylon botanicals",
            icon: (
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
              </svg>
            ),
          },
          {
            title: "Reliable Supply",
            sub: "Continuous batch consistency",
            icon: (
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                <polyline points="22 4 12 14.01 9 11.01"></polyline>
              </svg>
            ),
          },
          {
            title: "Competitive Rates",
            sub: "Special wholesale tier pricing",
            icon: (
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="12" y1="1" x2="12" y2="23"></line>
                <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
              </svg>
            ),
          },
          {
            title: "Global Shipping",
            sub: "Door delivery & worldwide export",
            icon: (
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10"></circle>
                <line x1="2" y1="12" x2="22" y2="12"></line>
                <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
              </svg>
            ),
          },
        ],
      },
      {
        id: "private_label",
        tabLabel: "Private Label",
        eyebrow: "PRIVATE LABEL",
        title: "Bring Our Products to Market Under Your Own Brand",
        desc: "Bring our products to market under your own brand. We offer private-label solutions that allow businesses to select from our existing product range and customize the packaging and branding to suit their market. It's a convenient way to expand your product portfolio without developing a product from scratch.",
        badges: [
          {
            title: "Custom Branding",
            sub: "Tailored labels & packaging",
            icon: (
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"></path>
                <line x1="7" y1="7" x2="7.01" y2="7"></line>
              </svg>
            ),
          },
          {
            title: "Low MOQs",
            sub: "Flexible starter batch options",
            icon: (
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect>
                <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path>
              </svg>
            ),
          },
          {
            title: "Turnkey Packaging",
            sub: "Complete bottling & packing",
            icon: (
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
              </svg>
            ),
          },
          {
            title: "Certified Formulas",
            sub: "Export-grade pure botanicals",
            icon: (
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
              </svg>
            ),
          },
        ],
      },
      {
        id: "rnd",
        tabLabel: "R&D & Contract Manufacturing",
        eyebrow: "R&D & CONTRACT MANUFACTURING",
        title: "From Concept to Production",
        desc: "Have a product idea or a specific requirement? Our R&D and contract manufacturing service takes your concept from development to production. We work with businesses to research, formulate, test, refine, and manufacture customized food and beverage products, creating solutions tailored to their brand, market, and requirements.",
        badges: [
          {
            title: "Custom Formulations",
            sub: "Bespoke flavor & potency design",
            icon: (
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M10 2v7.31"></path>
                <path d="M14 2v7.31"></path>
                <path d="M8.5 2h7"></path>
                <path d="M14 9.3a6.5 6.5 0 1 1-4 0"></path>
              </svg>
            ),
          },
          {
            title: "Green Science",
            sub: "Pure hydro-distilled extraction",
            icon: (
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z"></path>
                <path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12"></path>
              </svg>
            ),
          },
          {
            title: "Lab Certified",
            sub: "Full COA & stability analysis",
            icon: (
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                <polyline points="14 2 14 8 20 8"></polyline>
                <line x1="16" y1="13" x2="8" y2="13"></line>
                <line x1="16" y1="17" x2="8" y2="17"></line>
                <polyline points="10 9 9 9 8 9"></polyline>
              </svg>
            ),
          },
          {
            title: "Scalable Output",
            sub: "Pilot trials to mass production",
            icon: (
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline>
              </svg>
            ),
          },
        ],
      },
    ],
    []
  );

  const activeTabContent = useMemo(() => {
    return B2B_TABS.find((t) => t.id === activeB2bTab) || B2B_TABS[0];
  }, [B2B_TABS, activeB2bTab]);

  // Open quote modal from button click
  const openQuoteModal = (tabId = activeB2bTab) => {
    setModalServiceTab(tabId);
    setIsModalOpen(true);
  };

  // Direct Inquiry submission (Send Inquiry Button)
  const handleQuoteDirectSubmit = (e) => {
    if (e) e.preventDefault();
    if (modalServiceTab !== "rnd" && !quoteForm.relatedProduct) {
      alert("Please select a related product.");
      return;
    }
    if (!quoteForm.inquiryDetails.trim()) {
      alert("Please enter your inquiry details.");
      return;
    }
    if (!quoteForm.phone.trim()) {
      alert("Please enter your Phone / WhatsApp number.");
      return;
    }

    setAddedNotice(
      `✓ Thank you${quoteForm.contactName ? `, ${quoteForm.contactName}` : ""}! Your quote request has been received. Our team will contact you shortly.`
    );
    setTimeout(() => setAddedNotice(null), 4000);
    setIsModalOpen(false);
    setQuoteForm({
      relatedProduct: "",
      inquiryDetails: "",
      phone: "",
      email: "",
      contactName: "",
      businessName: "",
    });
  };

  // WhatsApp Inquiry submission (WhatsApp Button)
  const handleQuoteWhatsApp = (e) => {
    if (e) e.preventDefault();
    if (modalServiceTab !== "rnd" && !quoteForm.relatedProduct) {
      alert("Please select a related product.");
      return;
    }
    if (!quoteForm.inquiryDetails.trim()) {
      alert("Please enter your inquiry details.");
      return;
    }
    if (!quoteForm.phone.trim()) {
      alert("Please enter your Phone / WhatsApp number.");
      return;
    }

    const serviceTitle =
      modalServiceTab === "private_label"
        ? "Private Label Solutions"
        : modalServiceTab === "rnd"
        ? "R&D & Contract Manufacturing"
        : "Bulk Purchase Orders";

    const message = `🌿 *ENDLESS GREENS - B2B INQUIRY*
━━━━━━━━━━━━━━━━━━━━━
📋 *Service:* ${serviceTitle}
${modalServiceTab !== "rnd" && quoteForm.relatedProduct ? `📦 *Related Product:* ${quoteForm.relatedProduct}\n` : ""}👤 *Contact Name:* ${quoteForm.contactName.trim() || "Not provided"}
🏢 *Business / Café:* ${quoteForm.businessName.trim() || "Not provided"}
📱 *Phone / WhatsApp:* ${quoteForm.phone.trim()}
${quoteForm.email.trim() ? `✉️ *Email:* ${quoteForm.email.trim()}\n` : ""}
📝 *Inquiry Details:*
${quoteForm.inquiryDetails.trim()}
━━━━━━━━━━━━━━━━━━━━━
_Sent via Endless Greens B2B Portal_`;

    const phone = WHATSAPP_CONFIG.phoneNumber || "94777530354";
    const url = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
    window.open(url, "_blank");
    setIsModalOpen(false);
    setAddedNotice("WhatsApp inquiry opened! We look forward to working with you.");
    setTimeout(() => setAddedNotice(null), 3500);
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





      {/* 2. B2B SERVICE TABS SECTION */}
      <section className="b2b-tabs-section container">
        <div className="b2b-tabs-card">
          {/* Section Intro Header (from draft wireframe) */}
          <div className="b2b-section-header">
            <h2 className="b2b-main-heading">
              Your Business. Your Brand. Your Product.
            </h2>
            <p className="b2b-main-desc">
              Whether you are looking to purchase our products in bulk, launch them under your own brand, or develop something entirely new, Endless Greens offers tailored solutions to meet your business needs.
            </p>
          </div>

          {/* Tab Navigation Buttons */}
          <div className="b2b-nav-tabs" role="tablist">
            {B2B_TABS.map((tab) => (
              <button
                key={tab.id}
                type="button"
                role="tab"
                aria-selected={activeB2bTab === tab.id}
                className={`b2b-nav-tab ${activeB2bTab === tab.id ? "active" : ""}`}
                onClick={() => setActiveB2bTab(tab.id)}
              >
                {tab.tabLabel}
              </button>
            ))}
          </div>

          {/* Active Tab Panel */}
          <div className="b2b-tab-pane" key={activeTabContent.id}>
            <div className="b2b-eyebrow">{activeTabContent.eyebrow}</div>
            <h3 className="b2b-tab-heading">{activeTabContent.title}</h3>
            <p className="b2b-tab-description">{activeTabContent.desc}</p>

            {/* GET IN TOUCH Button */}
            <div>
              <button
                type="button"
                className="b2b-btn-touch"
                onClick={() => openQuoteModal(activeTabContent.id)}
              >
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect x="2" y="4" width="20" height="16" rx="2"></rect>
                  <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
                </svg>
                <span>GET IN TOUCH</span>
                <span style={{ fontSize: "1.1em", marginLeft: "2px" }}>→</span>
              </button>
            </div>

            {/* Trust Highlights Badges */}
            <div className="b2b-trust-grid">
              {activeTabContent.badges.map((badge, idx) => (
                <div key={idx} className="b2b-trust-item">
                  <div className="b2b-trust-icon">{badge.icon}</div>
                  <div className="b2b-trust-text">
                    <div className="b2b-trust-title">{badge.title}</div>
                    <div className="b2b-trust-sub">{badge.sub}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

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



      {/* section  for the brands and */}
      <section className="py-4 my-2">
        <Blogs />
        <Brands />
      </section>
      {/* end section  */}






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
      <section className="bulk-services-section container py-4 mb-5">
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

      {/* 5. REQUEST A QUOTE MODAL (Matches UI design & draft) */}
      {isModalOpen && (
        <div
          className="b2b-modal-backdrop"
          onClick={(e) => {
            if (e.target === e.currentTarget) setIsModalOpen(false);
          }}
        >
          <div className="b2b-modal-dialog">
            {/* Close Button */}
            <button
              type="button"
              className="b2b-modal-close"
              onClick={() => setIsModalOpen(false)}
              aria-label="Close modal"
            >
              ✕
            </button>

            {/* Modal Header */}
            <div className="b2b-modal-header">
              <div className="b2b-modal-eyebrow">
                {modalServiceTab === "private_label"
                  ? "PRIVATE LABEL"
                  : modalServiceTab === "rnd"
                  ? "R&D & CONTRACT MANUFACTURING"
                  : "BULK ORDERS"}
              </div>
              <h3 className="b2b-modal-title">Request a Quote</h3>
              <p className="b2b-modal-sub">
                {modalServiceTab === "private_label"
                  ? "Tell us more about your private label requirements and our team will get back to you with the best solutions for your business."
                  : modalServiceTab === "rnd"
                  ? "Tell us more about your custom product requirement and our team will get back to you with the best solutions for your business."
                  : "Tell us more about your bulk order request and our team will get back to you with the best solutions for your business."}
              </p>
            </div>

            {/* Modal Form */}
            <form onSubmit={handleQuoteDirectSubmit}>
              <div className="row g-3">
                {/* Row 1: Related Product & Inquiry Details (Hide Related Product if coming from tab #3 R&D) */}
                {modalServiceTab !== "rnd" ? (
                  <>
                    <div className="col-12 col-md-6">
                      <div className="b2b-form-group">
                        <label className="b2b-form-label">
                          RELATED PRODUCT <span className="req">*</span>
                        </label>
                        <select
                          className="b2b-form-select"
                          value={quoteForm.relatedProduct}
                          onChange={(e) =>
                            setQuoteForm({
                              ...quoteForm,
                              relatedProduct: e.target.value,
                            })
                          }
                          required
                        >
                          <option value="">Choose product</option>
                          {normalizedProducts.map((p) => (
                            <option key={p.id} value={p.title}>
                              {p.title} ({p.filterCategory})
                            </option>
                          ))}
                          <option value="All Products / Assorted Catalog">
                            All Products / Assorted Catalog
                          </option>
                          <option value="Custom Product Request">
                            Custom Product Request
                          </option>
                        </select>
                      </div>
                    </div>
                    <div className="col-12 col-md-6">
                      <div className="b2b-form-group">
                        <label className="b2b-form-label">
                          YOUR INQUIRY DETAILS <span className="req">*</span>
                        </label>
                        <textarea
                          className="b2b-form-textarea"
                          placeholder="Tell us about your inquiry..."
                          rows="3"
                          value={quoteForm.inquiryDetails}
                          onChange={(e) =>
                            setQuoteForm({
                              ...quoteForm,
                              inquiryDetails: e.target.value,
                            })
                          }
                          required
                        />
                      </div>
                    </div>
                  </>
                ) : (
                  /* If coming from tab #3 (R&D), hide related product field as instructed */
                  <div className="col-12">
                    <div className="b2b-form-group">
                      <label className="b2b-form-label">
                        YOUR INQUIRY DETAILS <span className="req">*</span>
                      </label>
                      <textarea
                        className="b2b-form-textarea"
                        placeholder="Tell us about your custom formulation concept, target flavor profile, volumes, and requirements..."
                        rows="4"
                        value={quoteForm.inquiryDetails}
                        onChange={(e) =>
                          setQuoteForm({
                            ...quoteForm,
                            inquiryDetails: e.target.value,
                          })
                        }
                        required
                      />
                    </div>
                  </div>
                )}

                {/* Row 2: Phone/WhatsApp & Email */}
                <div className="col-12 col-md-6">
                  <div className="b2b-form-group">
                    <label className="b2b-form-label">
                      PHONE/WHATSAPP <span className="req">*</span>
                    </label>
                    <input
                      type="tel"
                      className="b2b-form-control"
                      placeholder="+94 7X XXX XXXX"
                      value={quoteForm.phone}
                      onChange={(e) =>
                        setQuoteForm({ ...quoteForm, phone: e.target.value })
                      }
                      required
                    />
                  </div>
                </div>
                <div className="col-12 col-md-6">
                  <div className="b2b-form-group">
                    <label className="b2b-form-label">EMAIL</label>
                    <input
                      type="email"
                      className="b2b-form-control"
                      placeholder="you@company.com"
                      value={quoteForm.email}
                      onChange={(e) =>
                        setQuoteForm({ ...quoteForm, email: e.target.value })
                      }
                    />
                  </div>
                </div>

                {/* Row 3: Contact Name & Business/Café Name */}
                <div className="col-12 col-md-6">
                  <div className="b2b-form-group">
                    <label className="b2b-form-label">CONTACT NAME</label>
                    <input
                      type="text"
                      className="b2b-form-control"
                      placeholder="Your name"
                      value={quoteForm.contactName}
                      onChange={(e) =>
                        setQuoteForm({
                          ...quoteForm,
                          contactName: e.target.value,
                        })
                      }
                    />
                  </div>
                </div>
                <div className="col-12 col-md-6">
                  <div className="b2b-form-group">
                    <label className="b2b-form-label">BUSINESS/CAFÉ NAME</label>
                    <input
                      type="text"
                      className="b2b-form-control"
                      placeholder="Your business or café name"
                      value={quoteForm.businessName}
                      onChange={(e) =>
                        setQuoteForm({
                          ...quoteForm,
                          businessName: e.target.value,
                        })
                      }
                    />
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="b2b-modal-actions">
                <button
                  type="submit"
                  className="b2b-btn-send"
                >
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <line x1="22" y1="2" x2="11" y2="13"></line>
                    <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
                  </svg>
                  <span>SEND INQUIRY</span>
                  <span style={{ fontSize: "1.1em", marginLeft: "2px" }}>→</span>
                </button>
                <span className="b2b-modal-or">— or —</span>
                <button
                  type="button"
                  className="b2b-btn-whatsapp"
                  onClick={handleQuoteWhatsApp}
                >
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="#25D366"
                  >
                    <path d="M20.52 3.48A11.86 11.86 0 0 0 12.03 0C5.41 0 .03 5.38.03 12c0 2.11.55 4.17 1.59 6L0 24l6.16-1.61a11.96 11.96 0 0 0 5.86 1.5h.01c6.62 0 12-5.38 12-12 0-3.2-1.25-6.2-3.51-8.41ZM12.03 21.86h-.01a9.9 9.9 0 0 1-5.04-1.37l-.36-.21-3.65.95.97-3.56-.24-.37a9.9 9.9 0 0 1-1.52-5.3c0-5.47 4.45-9.92 9.92-9.92a9.86 9.86 0 0 1 7.02 2.91 9.86 9.86 0 0 1 2.9 7.02c0 5.47-4.45 9.92-9.92 9.92Z" />
                  </svg>
                  <span>SEND INQUIRY via WHATSAPP</span>
                </button>
              </div>
            </form>

            {/* Decorative Botanical Leaf Outline SVG (matches UI design) */}
            <svg
              className="b2b-modal-leaf"
              viewBox="0 0 200 200"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M170 190 C150 140 100 90 20 80 C80 90 140 120 170 190 Z"
                stroke="#8e7c41"
                strokeWidth="1.5"
                fill="#8e7c41"
                fillOpacity="0.04"
              />
              <path
                d="M170 190 C160 120 120 70 60 40 C100 70 140 120 170 190 Z"
                stroke="#8e7c41"
                strokeWidth="1.5"
                fill="#8e7c41"
                fillOpacity="0.04"
              />
              <path
                d="M170 190 C180 130 150 60 90 20 C130 50 165 110 170 190 Z"
                stroke="#8e7c41"
                strokeWidth="1.5"
                fill="#8e7c41"
                fillOpacity="0.04"
              />
              <path
                d="M170 190 C190 140 185 80 145 35 C165 75 175 130 170 190 Z"
                stroke="#8e7c41"
                strokeWidth="1.5"
                fill="#8e7c41"
                fillOpacity="0.04"
              />
              <path
                d="M170 190 L90 70 M170 190 L120 50 M170 190 L145 35"
                stroke="#8e7c41"
                strokeWidth="1"
                strokeDasharray="2 2"
                opacity="0.6"
              />
            </svg>
          </div>
        </div>
      )}
    </div>
  );
}
