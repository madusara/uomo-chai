"use client";

import React, { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";

const faqData = [
  {
    id: "01",
    question: "What are Infusio Elixirs?",
    answer:
      "Infusio Elixirs are concentrated gourmet syrups crafted using premium Ceylon tea and spices, with no artificial colors, flavors, or preservatives. They can be used to create a variety of specialty beverages, including hot and iced chai, chai lattes, cocktails, mocktails, and sparkling drinks.",
    linkText: "Shop Now",
    linkUrl: "/shop",
    imageSrc: "/assets/images/home/demo19/banner-1.jpg",
    badgeTitle: "Infusion Elixirs",
    badgeSubtitle: "PURE • NATURAL • REFRESHING",
  },
  {
    id: "02",
    question: "How do I use Infusio Elixirs?",
    answer:
      "Add 20 ml of Infusio Chai Elixir to 150 ml of hot milk and stir well for a comforting hot chai. For cold drinks, pour 30 ml over chilled or iced milk for a café-style iced latte, or mix 20 ml with sparkling soda and ice for a crisp spiced beverage. Sweeten to taste.",
    linkText: "Shop Now",
    linkUrl: "/shop",
    imageSrc: "/assets/images/home/demo19/banner-1.jpg",
    badgeTitle: "Artisanal Chai",
    badgeSubtitle: "AUTHENTIC • SPICED • WARMING",
  },
  {
    id: "03",
    question: "Are the ingredients natural?",
    answer:
      "Yes, absolutely. All Infusio products are brewed exclusively using single-origin Ceylon tea, whole sun-dried spices, filtered water, and natural cane sugar. We never use artificial colors, chemical preservatives, or synthetic additives.",
    linkText: "Shop Now",
    linkUrl: "/shop",
    imageSrc: "/assets/images/home/demo19/banner-1.jpg",
    badgeTitle: "Pure Ingredients",
    badgeSubtitle: "ZERO CHEMICALS • REAL BOTANICALS",
  },
  {
    id: "04",
    question: "Do you offer international shipping?",
    answer:
      "We provide prompt, secure islandwide delivery across Sri Lanka within 2–3 business days. For international shipping and hospitality export inquiries, please contact us directly via WhatsApp at +94 777 530 354.",
    linkText: "Shop Now",
    linkUrl: "/shop",
    imageSrc: "/assets/images/home/demo19/banner-2.jpg",
    badgeTitle: "Global Shipping",
    badgeSubtitle: "ISLANDWIDE & INTERNATIONAL",
  },
  {
    id: "05",
    question: "How long does delivery take?",
    answer:
      "Islandwide orders across Sri Lanka are dispatched via trusted third-party courier partners and delivered within 2–3 business days following order confirmation.",
    linkText: "Shop Now",
    linkUrl: "/shop",
    imageSrc: "/assets/images/home/demo19/banner-1.jpg",
    badgeTitle: "Islandwide Delivery",
    badgeSubtitle: "2-3 BUSINESS DAYS ACROSS SRI LANKA",
  },
  {
    id: "06",
    question: "Can I use the Ceylon Cinnamon & Vanilla Elixir in desserts?",
    answer:
      "Absolutely! Our Ceylon Cinnamon & Vanilla Elixir can be used as a topping for desserts, smoothies, and breakfast bowls. It also works wonderfully as a glaze for baked goods and pastries.",
    linkText: "Explore Collection",
    linkUrl: "/shop",
    imageSrc: "/assets/images/home/demo19/banner-1.jpg",
    badgeTitle: "Ceylon Cinnamon",
    badgeSubtitle: "GOURMET • VERSATILE • PURE",
  },
  {
    id: "07",
    question: "How do I make a cup of chai?",
    answer:
      "Hot Masala Chai: Add 20 ml of Infusio Chai Elixir to 150 ml of hot milk and stir well. Alternatively, add 20 ml of Chai Elixir to 150 ml of milk and bring it to a gentle boil. Sweeten to taste.",
    linkText: "Explore Collection",
    linkUrl: "/shop",
    imageSrc: "/assets/images/home/demo19/banner-1.jpg",
    badgeTitle: "Hot Masala Chai",
    badgeSubtitle: "AUTHENTIC • SPICED • WARMING",
  },
  {
    id: "08",
    question: "How do I make Iced Chai / Chai Latte?",
    answer:
      "Add 30 ml of Infusio Chai Elixir to chilled or iced milk and mix well. Sweeten according to your preference. For a stronger, spicier chai, simply add more Chai Elixir to suit your taste. For iced chai, we recommend using honey or another liquid sweetener for enhanced flavor.",
    linkText: "Explore Collection",
    linkUrl: "/shop",
    imageSrc: "/assets/images/home/demo19/banner-2.jpg",
    badgeTitle: "Iced Chai Latte",
    badgeSubtitle: "REFRESHING • BOLD • HANDCRAFTED",
  },
  {
    id: "09",
    question: "What makes Infusio different from other chai products?",
    answer:
      "There are many chai products available today, including powder blends, sticky chai, syrups, and concentrates. Powdered chai blends often require longer preparation times and may lose their flavor and aroma during storage. Some products also contain artificial flavors, colors, preservatives, or high levels of added sugar. Infusio Chai Elixir is brewed using Ceylon Black Tea, natural spices, water, and a small amount of cane sugar. We use minimal processing (brewing) to preserve the natural flavor, aroma, and beneficial compounds found in tea and spices. The result is a convenient, flavorful, and authentic cup of chai made with real ingredients.",
    linkText: "Explore Collection",
    linkUrl: "/shop",
    imageSrc: "/assets/images/home/demo19/banner-1.jpg",
    badgeTitle: "Small Batch Brewed",
    badgeSubtitle: "MINIMAL PROCESSING • REAL FLAVOR",
  },
  {
    id: "10",
    question: "How do I make a refreshing ginger drink with Infusio Ginger Elixir?",
    answer:
      "Simply add 20 ml of Infusio Ginger Elixir to 200 ml of chilled soda or sparkling water and mix well. For an extra refreshing twist, try it with lemon flavored sparkling beverages.",
    linkText: "Explore Collection",
    linkUrl: "/shop",
    imageSrc: "/assets/images/home/demo19/banner-2.jpg",
    badgeTitle: "Ginger Elixir",
    badgeSubtitle: "CRISP • DIGESTIVE • SPARKLING",
  },
  {
    id: "11",
    question: "Why is Infusio Ginger Elixir different from other ginger drinks?",
    answer:
      "Infusio Ginger Elixir is made from real ginger and contains no alcohol, artificial flavors, or artificial colors. Unlike many conventional soft drinks, it retains naturally occurring gingerol the active compound in ginger that is known for its anti-inflammatory properties and digestive benefits.",
    linkText: "Explore Collection",
    linkUrl: "/shop",
    imageSrc: "/assets/images/home/demo19/banner-2.jpg",
    badgeTitle: "Real Gingerol",
    badgeSubtitle: "NATURAL WELLNESS • ZERO ALCOHOL",
  },
  {
    id: "12",
    question: "How should I store my elixirs?",
    answer:
      "Once opened, all Infusio Elixirs should be refrigerated to maintain freshness and quality. Since our products contain no artificial preservatives, exposure to warm temperatures may affect their flavor, aroma, and shelf life.",
    linkText: "Explore Collection",
    linkUrl: "/shop",
    imageSrc: "/assets/images/home/demo19/banner-1.jpg",
    badgeTitle: "Storage & Care",
    badgeSubtitle: "KEEP REFRIGERATED",
  },
  {
    id: "13",
    question: "Where can I purchase your products?",
    answer:
      "You can purchase our products directly through our website at www.endlesslk.com or place an order via WhatsApp at +94 777 530 354.",
    linkText: "Shop Online",
    linkUrl: "/shop",
    imageSrc: "/assets/images/home/demo19/banner-1.jpg",
    badgeTitle: "Endless Greens",
    badgeSubtitle: "ONLINE & DIRECT ORDERING",
  },
  {
    id: "14",
    question: "What is Drop It?",
    answer:
      "Drop It is a range of liquid spice extracts designed to deliver authentic Sri Lankan flavors, functional plant compounds, and precise seasoning. It offers consistency, convenience, and elevated flavor for modern cooking applications.",
    linkText: "Explore Collection",
    linkUrl: "/shop",
    imageSrc: "/assets/images/home/demo19/banner-2.jpg",
    badgeTitle: "Drop It Spices",
    badgeSubtitle: "AUTHENTIC SRI LANKAN EXTRACTS",
  },
  {
    id: "15",
    question: "Why should I choose Drop It instead of traditional spice powders?",
    answer:
      "Drop It Liquid Spices are highly concentrated extracts that capture the natural flavor and aroma of spices using innovative green extraction technologies. These methods avoid harsh chemicals and excessive heat, helping preserve the spices' aromatic compounds and bioactive components. As a result, Drop It products provide consistent flavor, longer lasting quality, and greater convenience compared to traditional spice powders, without requiring special storage conditions.",
    linkText: "Explore Collection",
    linkUrl: "/shop",
    imageSrc: "/assets/images/home/demo19/banner-2.jpg",
    badgeTitle: "Liquid Spice Extracts",
    badgeSubtitle: "GREEN EXTRACTION • MAXIMUM AROMA",
  },
  {
    id: "16",
    question: "We'd like to use your products in our café, restaurant, or hospitality business. How can we purchase?",
    answer:
      "We're always happy to collaborate with food service partners. Please contact us via WhatsApp at +94 777 530 354 to discuss wholesale purchasing and partnership opportunities.",
    linkText: "Explore Collection",
    linkUrl: "/shop",
    imageSrc: "/assets/images/home/demo19/banner-2.jpg",
    badgeTitle: "Wholesale & Hospitality",
    badgeSubtitle: "BARISTA & FOOD SERVICE PARTNERSHIPS",
  },
  {
    id: "17",
    question: "Do you offer private labeling or contract manufacturing?",
    answer:
      "Yes. Endless Greens offers private labeling and contract manufacturing solutions for businesses looking to develop high-quality food and beverage products tailored to their requirements. For more information, please contact us at endlessgreensgourmet@gmail.com. Or +94 777 530 354.",
    linkText: "Explore Collection",
    linkUrl: "/shop",
    imageSrc: "/assets/images/home/demo19/banner-2.jpg",
    badgeTitle: "Contract Manufacturing",
    badgeSubtitle: "BESPOKE PRIVATE LABEL SOLUTIONS",
  },
  {
    id: "18",
    question: "I think we could work together on something exciting. How can I get in touch?",
    answer:
      "We'd love to hear from you! Please email your inquiry to endlessgreensgourmet@gmail.com, and our team will get back to you as soon as possible.",
    linkText: "Explore Collection",
    linkUrl: "/shop",
    imageSrc: "/assets/images/home/demo19/banner-2.jpg",
    badgeTitle: "Partner With Us",
    badgeSubtitle: "CREATE SOMETHING EXCITING",
  },
];

export default function Banner() {
  const [mounted, setMounted] = useState(false);
  const [activeId, setActiveId] = useState(faqData[0].id);
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const currentItem = useMemo(() => {
    return faqData.find((item) => item.id === activeId) || faqData[0];
  }, [activeId]);

  const handleItemClick = (id) => {
    if (activeId === id) return;
    setIsTransitioning(true);
    setActiveId(id);
    setTimeout(() => {
      setIsTransitioning(false);
    }, 380);
  };

  if (!mounted) {
    return (
      <section
        className="faq-banner-section"
        style={{ minHeight: "650px", visibility: "hidden" }}
      ></section>
    );
  }

  return (
    <section className="faq-banner-section" id="faq-section">
      {/* Botanical Tea Branch Watermark in Top Right */}
      <div className="faq-botanical-watermark" aria-hidden="true">
        <svg
          viewBox="0 0 260 260"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M260,10 C210,40 160,100 130,170 C110,215 100,260 98,260"
            stroke="#8c6d46"
            strokeWidth="1.4"
            strokeLinecap="round"
          />
          <path
            d="M240,25 C200,10 165,30 180,55 C195,78 240,25 240,25 Z"
            stroke="#8c6d46"
            strokeWidth="1.2"
            fill="none"
          />
          <path
            d="M190,38 C215,30 230,26 230,26"
            stroke="#8c6d46"
            strokeWidth="0.8"
          />
          <path
            d="M210,65 C170,55 140,85 160,110 C180,132 210,65 210,65 Z"
            stroke="#8c6d46"
            strokeWidth="1.2"
            fill="none"
          />
          <path
            d="M170,85 C190,75 205,68 205,68"
            stroke="#8c6d46"
            strokeWidth="0.8"
          />
          <path
            d="M165,115 C120,95 85,130 115,160 C145,188 165,115 165,115 Z"
            stroke="#8c6d46"
            strokeWidth="1.2"
            fill="none"
          />
          <path
            d="M125,135 C145,120 160,118 160,118"
            stroke="#8c6d46"
            strokeWidth="0.8"
          />
          <path
            d="M175,90 C140,75 105,70 80,75"
            stroke="#8c6d46"
            strokeWidth="1"
            strokeLinecap="round"
          />
          <path
            d="M110,73 C90,55 70,65 80,82 C90,98 110,73 110,73 Z"
            stroke="#8c6d46"
            strokeWidth="1"
            fill="none"
          />
          <path
            d="M80,75 C60,65 45,80 55,95 C65,108 80,75 80,75 Z"
            stroke="#8c6d46"
            strokeWidth="1"
            fill="none"
          />
        </svg>
      </div>

      <div className="container">
        <div className="row g-4 g-xl-5 align-items-center">
          {/* Left Column: Header and Dynamic Showcase Card */}
          <div className="col-lg-5">
            <div className="faq-left-col">
              {/* Header Block */}
              <div className="faq-header-block">
                <div className="faq-overline-wrap">
                  <span className="faq-overline">Frequently Asked Questions</span>
                  <span className="faq-overline-line"></span>
                </div>
                <h2 className="faq-main-title">
                  Your Questions,
                  <br />
                  Our Answers
                </h2>
                <p className="faq-subtext">
                  Find quick answers to common questions about our infusion
                  elixirs, ingredients, brewing, and more.
                </p>
              </div>

              {/* Dynamic Showcase Card */}
              <div className="faq-showcase-card">
                <div className="faq-image-container">
                  <Image
                    src={currentItem.imageSrc}
                    alt={currentItem.badgeTitle}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 45vw, 550px"
                    priority
                    style={{
                      opacity: isTransitioning ? 0.35 : 1,
                      transform: isTransitioning ? "scale(1.03)" : "scale(1)",
                    }}
                  />
                </div>

                {/* Dark Vignette Overlay for Text Legibility */}
                <div className="faq-card-overlay"></div>

                {/* Corner Topic Badge */}
                <div
                  className="faq-card-badge"
                  style={{
                    opacity: isTransitioning ? 0 : 1,
                    transform: isTransitioning
                      ? "translateY(5px)"
                      : "translateY(0)",
                  }}
                >
                  <span className="badge-tag">PREMIUM QUALITY</span>
                  <span className="badge-title">{currentItem.badgeTitle}</span>
                  <span className="badge-sub">{currentItem.badgeSubtitle}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Exact 5 Visible Initially + Smooth Scroll for Others */}
          <div className="col-lg-7">
            <div className="faq-accordion-scroll-container">
              <div className="faq-accordion-list">
                {faqData.map((item, index) => {
                  const isActive = activeId === item.id;
                  const formattedNumber = String(index + 1).padStart(2, "0");

                  return (
                    <div
                      key={item.id}
                      className={`faq-accordion-item ${isActive ? "is-active" : ""}`}
                    >
                      <button
                        type="button"
                        className="faq-item-header"
                        onClick={() => handleItemClick(item.id)}
                        aria-expanded={isActive}
                        aria-controls={`faq-collapse-${item.id}`}
                      >
                        <span className="faq-item-number">{formattedNumber}</span>
                        <span className="faq-item-divider">|</span>
                        <span className="faq-item-question">{item.question}</span>

                        {/* Chevron Icon */}
                        <svg
                          className="faq-chevron-icon"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          aria-hidden="true"
                        >
                          <polyline points="6 9 12 15 18 9"></polyline>
                        </svg>
                      </button>

                      {/* Collapsible Content */}
                      <div
                        id={`faq-collapse-${item.id}`}
                        className="faq-item-collapse"
                        style={{
                          maxHeight: isActive ? "320px" : "0px",
                          opacity: isActive ? 1 : 0,
                        }}
                      >
                        <div className="faq-item-body">
                          <p className="faq-answer-text">{item.answer}</p>

                          <div className="faq-item-inner-divider"></div>

                          <Link href={item.linkUrl} className="faq-action-link">
                            {/* Botanical Tea Leaf Icon */}
                            <svg
                              className="leaf-icon"
                              viewBox="0 0 24 24"
                              fill="currentColor"
                              aria-hidden="true"
                            >
                              <path d="M17,8C8,10 5.9,16.17 3.82,21.34L5.71,22L6.66,19.7C7.14,19.87 7.64,20 8,20C19,20 22,3 22,3C21,5 14,5.25 9,6.25C4,7.25 2,11.5 2,13.5C2,15.5 3.75,17.25 3.75,17.25C7,8 17,8 17,8Z" />
                            </svg>
                            <span>{item.linkText}</span>
                            <span className="arrow-icon">→</span>
                          </Link>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
