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
    linkText: "SHOP NOW",
    linkUrl: "/shop",
    imageSrc: "/assets/images/home/demo19/banner-1.jpg",
    badgeTitleLine1: "Infusion",
    badgeTitleLine2: "Elixirs",
    badgeSubtitle: "PURE • NATURAL • REFRESHING",
  },
  {
    id: "02",
    question: "How do I use Infusio Elixirs?",
    answer:
      "Add 20 ml of Infusio Chai Elixir to 150 ml of hot milk and stir well for a comforting hot chai. For cold drinks, pour 30 ml over chilled or iced milk for a café-style iced latte, or mix 20 ml with sparkling soda and ice for a crisp spiced beverage. Sweeten to taste.",
    linkText: "SHOP NOW",
    linkUrl: "/shop",
    imageSrc: "/assets/images/home/demo19/banner-1.jpg",
    badgeTitleLine1: "Artisanal",
    badgeTitleLine2: "Chai Elixir",
    badgeSubtitle: "AUTHENTIC • SPICED • WARMING",
  },
  {
    id: "03",
    question: "Are the ingredients natural?",
    answer:
      "Yes, absolutely. All Infusio products are brewed exclusively using single-origin Ceylon tea, whole sun-dried spices, filtered water, and natural cane sugar. We never use artificial colors, chemical preservatives, or synthetic additives.",
    linkText: "SHOP NOW",
    linkUrl: "/shop",
    imageSrc: "/assets/images/home/demo19/banner-1.jpg",
    badgeTitleLine1: "Pure",
    badgeTitleLine2: "Ingredients",
    badgeSubtitle: "ZERO CHEMICALS • REAL BOTANICALS",
  },
  {
    id: "04",
    question: "Do you offer international shipping?",
    answer:
      "We provide prompt, secure islandwide delivery across Sri Lanka within 2–3 business days. For international shipping and hospitality export inquiries, please contact us directly via WhatsApp at +94 777 530 354.",
    linkText: "SHOP NOW",
    linkUrl: "/shop",
    imageSrc: "/assets/images/home/demo19/banner-2.jpg",
    badgeTitleLine1: "Global",
    badgeTitleLine2: "Shipping",
    badgeSubtitle: "ISLANDWIDE & INTERNATIONAL",
  },
  {
    id: "05",
    question: "How long does delivery take?",
    answer:
      "Islandwide orders across Sri Lanka are dispatched via trusted third-party courier partners and delivered within 2–3 business days following order confirmation.",
    linkText: "SHOP NOW",
    linkUrl: "/shop",
    imageSrc: "/assets/images/home/demo19/banner-1.jpg",
    badgeTitleLine1: "Islandwide",
    badgeTitleLine2: "Delivery",
    badgeSubtitle: "2-3 BUSINESS DAYS ACROSS SRI LANKA",
  },
  {
    id: "06",
    question: "Can I use the Ceylon Cinnamon & Vanilla Elixir in desserts?",
    answer:
      "Absolutely! Our Ceylon Cinnamon & Vanilla Elixir can be used as a topping for desserts, smoothies, and breakfast bowls. It also works wonderfully as a glaze for baked goods and pastries.",
    linkText: "SHOP NOW",
    linkUrl: "/shop",
    imageSrc: "/assets/images/home/demo19/banner-1.jpg",
    badgeTitleLine1: "Ceylon",
    badgeTitleLine2: "Cinnamon",
    badgeSubtitle: "GOURMET • VERSATILE • PURE",
  },
  {
    id: "07",
    question: "How do I make a cup of chai?",
    answer:
      "Hot Masala Chai: Add 20 ml of Infusio Chai Elixir to 150 ml of hot milk and stir well. Alternatively, add 20 ml of Chai Elixir to 150 ml of milk and bring it to a gentle boil. Sweeten to taste.",
    linkText: "SHOP NOW",
    linkUrl: "/shop",
    imageSrc: "/assets/images/home/demo19/banner-1.jpg",
    badgeTitleLine1: "Masala Chai",
    badgeTitleLine2: "Brewing",
    badgeSubtitle: "AUTHENTIC • SPICED • WARMING",
  },
  {
    id: "08",
    question: "How do I make Iced Chai / Chai Latte?",
    answer:
      "Add 30 ml of Infusio Chai Elixir to chilled or iced milk and mix well. Sweeten according to your preference. For a stronger, spicier chai, simply add more Chai Elixir to suit your taste. For iced chai, we recommend using honey or another liquid sweetener for enhanced flavor.",
    linkText: "SHOP NOW",
    linkUrl: "/shop",
    imageSrc: "/assets/images/home/demo19/banner-2.jpg",
    badgeTitleLine1: "Iced Chai",
    badgeTitleLine2: "Latte",
    badgeSubtitle: "REFRESHING • BOLD • HANDCRAFTED",
  },
  {
    id: "09",
    question: "What makes Infusio different from other chai products?",
    answer:
      "There are many chai products available today, including powder blends, sticky chai, syrups, and concentrates. Powdered chai blends often require longer preparation times and may lose their flavor and aroma during storage. Some products also contain artificial flavors, colors, preservatives, or high levels of added sugar. Infusio Chai Elixir is brewed using Ceylon Black Tea, natural spices, water, and a small amount of cane sugar. We use minimal processing (brewing) to preserve the natural flavor, aroma, and beneficial compounds found in tea and spices. The result is a convenient, flavorful, and authentic cup of chai made with real ingredients.",
    linkText: "SHOP NOW",
    linkUrl: "/shop",
    imageSrc: "/assets/images/home/demo19/banner-1.jpg",
    badgeTitleLine1: "Small Batch",
    badgeTitleLine2: "Brewed",
    badgeSubtitle: "MINIMAL PROCESSING • REAL FLAVOR",
  },
  {
    id: "10",
    question: "How do I make a refreshing ginger drink with Infusio Ginger Elixir?",
    answer:
      "Simply add 20 ml of Infusio Ginger Elixir to 200 ml of chilled soda or sparkling water and mix well. For an extra refreshing twist, try it with lemon flavored sparkling beverages.",
    linkText: "SHOP NOW",
    linkUrl: "/shop",
    imageSrc: "/assets/images/home/demo19/banner-2.jpg",
    badgeTitleLine1: "Ginger",
    badgeTitleLine2: "Sparkler",
    badgeSubtitle: "CRISP • DIGESTIVE • SPARKLING",
  },
  {
    id: "11",
    question: "Why is Infusio Ginger Elixir different from other ginger drinks?",
    answer:
      "Infusio Ginger Elixir is made from real ginger and contains no alcohol, artificial flavors, or artificial colors. Unlike many conventional soft drinks, it retains naturally occurring gingerol the active compound in ginger that is known for its anti-inflammatory properties and digestive benefits.",
    linkText: "SHOP NOW",
    linkUrl: "/shop",
    imageSrc: "/assets/images/home/demo19/banner-2.jpg",
    badgeTitleLine1: "Real",
    badgeTitleLine2: "Gingerol",
    badgeSubtitle: "NATURAL WELLNESS • ZERO ALCOHOL",
  },
  {
    id: "12",
    question: "How should I store my elixirs?",
    answer:
      "Once opened, all Infusio Elixirs should be refrigerated to maintain freshness and quality. Since our products contain no artificial preservatives, exposure to warm temperatures may affect their flavor, aroma, and shelf life.",
    linkText: "SHOP NOW",
    linkUrl: "/shop",
    imageSrc: "/assets/images/home/demo19/banner-1.jpg",
    badgeTitleLine1: "Storage &",
    badgeTitleLine2: "Freshness",
    badgeSubtitle: "KEEP REFRIGERATED",
  },
  {
    id: "13",
    question: "Where can I purchase your products?",
    answer:
      "You can purchase our products directly through our website at www.endlesslk.com or place an order via WhatsApp at +94 777 530 354.",
    linkText: "SHOP NOW",
    linkUrl: "/shop",
    imageSrc: "/assets/images/home/demo19/banner-1.jpg",
    badgeTitleLine1: "Endless",
    badgeTitleLine2: "Greens",
    badgeSubtitle: "ONLINE & DIRECT ORDERING",
  },
  {
    id: "14",
    question: "What is Drop It?",
    answer:
      "Drop It is a range of liquid spice extracts designed to deliver authentic Sri Lankan flavors, functional plant compounds, and precise seasoning. It offers consistency, convenience, and elevated flavor for modern cooking applications.",
    linkText: "SHOP NOW",
    linkUrl: "/shop",
    imageSrc: "/assets/images/home/demo19/banner-2.jpg",
    badgeTitleLine1: "Drop It",
    badgeTitleLine2: "Extracts",
    badgeSubtitle: "AUTHENTIC SRI LANKAN EXTRACTS",
  },
  {
    id: "15",
    question: "Why should I choose Drop It instead of traditional spice powders?",
    answer:
      "Drop It Liquid Spices are highly concentrated extracts that capture the natural flavor and aroma of spices using innovative green extraction technologies. These methods avoid harsh chemicals and excessive heat, helping preserve the spices' aromatic compounds and bioactive components. As a result, Drop It products provide consistent flavor, longer lasting quality, and greater convenience compared to traditional spice powders, without requiring special storage conditions.",
    linkText: "SHOP NOW",
    linkUrl: "/shop",
    imageSrc: "/assets/images/home/demo19/banner-2.jpg",
    badgeTitleLine1: "Liquid Spice",
    badgeTitleLine2: "Extracts",
    badgeSubtitle: "GREEN EXTRACTION • MAXIMUM AROMA",
  },
  {
    id: "16",
    question: "We'd like to use your products in our café, restaurant, or hospitality business. How can we purchase?",
    answer:
      "We're always happy to collaborate with food service partners. Please contact us via WhatsApp at +94 777 530 354 to discuss wholesale purchasing and partnership opportunities.",
    linkText: "SHOP NOW",
    linkUrl: "/shop",
    imageSrc: "/assets/images/home/demo19/banner-2.jpg",
    badgeTitleLine1: "Wholesale &",
    badgeTitleLine2: "Hospitality",
    badgeSubtitle: "BARISTA & FOOD SERVICE PARTNERSHIPS",
  },
  {
    id: "17",
    question: "Do you offer private labeling or contract manufacturing?",
    answer:
      "Yes. Endless Greens offers private labeling and contract manufacturing solutions for businesses looking to develop high-quality food and beverage products tailored to their requirements. For more information, please contact us at endlessgreensgourmet@gmail.com. Or +94 777 530 354.",
    linkText: "SHOP NOW",
    linkUrl: "/shop",
    imageSrc: "/assets/images/home/demo19/banner-2.jpg",
    badgeTitleLine1: "Contract",
    badgeTitleLine2: "Manufacturing",
    badgeSubtitle: "BESPOKE PRIVATE LABEL SOLUTIONS",
  },
  {
    id: "18",
    question: "I think we could work together on something exciting. How can I get in touch?",
    answer:
      "We'd love to hear from you! Please email your inquiry to endlessgreensgourmet@gmail.com, and our team will get back to you as soon as possible.",
    linkText: "SHOP NOW",
    linkUrl: "/shop",
    imageSrc: "/assets/images/home/demo19/banner-2.jpg",
    badgeTitleLine1: "Partner",
    badgeTitleLine2: "With Us",
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
          viewBox="0 0 320 320"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M320,10 C260,50 190,120 150,200 C125,250 115,300 112,320"
            stroke="#9e805a"
            strokeWidth="1.2"
            strokeLinecap="round"
          />
          <path
            d="M290,30 C240,15 195,40 215,70 C235,95 290,30 290,30 Z"
            stroke="#9e805a"
            strokeWidth="1"
          />
          <path
            d="M225,52 C255,42 275,36 275,36"
            stroke="#9e805a"
            strokeWidth="0.7"
          />
          <path
            d="M250,75 C200,60 165,95 190,125 C215,150 250,75 250,75 Z"
            stroke="#9e805a"
            strokeWidth="1"
          />
          <path
            d="M200,98 C225,88 245,82 245,82"
            stroke="#9e805a"
            strokeWidth="0.7"
          />
          <path
            d="M195,135 C140,110 95,155 130,190 C165,225 195,135 195,135 Z"
            stroke="#9e805a"
            strokeWidth="1"
          />
          <path
            d="M145,158 C170,140 188,138 188,138"
            stroke="#9e805a"
            strokeWidth="0.7"
          />
          <path
            d="M205,105 C165,90 120,85 90,90"
            stroke="#9e805a"
            strokeWidth="0.9"
            strokeLinecap="round"
          />
          <path
            d="M125,88 C100,68 75,80 88,100 C100,120 125,88 125,88 Z"
            stroke="#9e805a"
            strokeWidth="0.9"
          />
          <path
            d="M90,90 C68,78 50,95 62,112 C74,128 90,90 90,90 Z"
            stroke="#9e805a"
            strokeWidth="0.9"
          />
        </svg>
      </div>

      <div className="container">
        <div className="faq-layout-grid">
          {/* Left Column: Header and Large Showcase Card */}
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

            {/* Large Showcase Card */}
            <div className="faq-showcase-card">
              <div className="faq-image-container">
                <Image
                  src={currentItem.imageSrc}
                  alt={`${currentItem.badgeTitleLine1} ${currentItem.badgeTitleLine2}`}
                  fill
                  sizes="(max-width: 991px) 100vw, 680px"
                  priority
                  style={{
                    opacity: isTransitioning ? 0.35 : 1,
                    transform: isTransitioning ? "scale(1.03)" : "scale(1)",
                  }}
                />
              </div>

              {/* Subtle Dark Vignette Overlay */}
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
                <span className="badge-title">
                  {currentItem.badgeTitleLine1}
                  <br />
                  {currentItem.badgeTitleLine2}
                </span>
                <span className="badge-sub">{currentItem.badgeSubtitle}</span>
              </div>
            </div>
          </div>

          {/* Right Column: Numbered Accordion List (Side by Side) */}
          <div className="faq-right-col">
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
                        <span className="faq-item-vdivider" aria-hidden="true"></span>
                        <span className="faq-item-question">{item.question}</span>

                        {/* Thin Chevron Icon */}
                        <svg
                          className="faq-chevron-icon"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="1.3"
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
                          maxHeight: isActive ? "340px" : "0px",
                          opacity: isActive ? 1 : 0,
                        }}
                      >
                        <div className="faq-item-body">
                          <p className="faq-answer-text">{item.answer}</p>

                          <div className="faq-item-inner-divider"></div>

                          <Link href={item.linkUrl} className="faq-action-link">
                            {/* Botanical Branch with Two Tea Leaves */}
                            <svg
                              className="leaf-icon"
                              viewBox="0 0 24 24"
                              fill="currentColor"
                              aria-hidden="true"
                            >
                              <path d="M17.8,2.8 C11.5,4.2 8.2,9.8 8.6,15.5 C4.5,13.2 2.8,9 3.2,5.2 C1.2,10.2 2.5,16.5 7.2,19.2 C6.2,20.8 4.8,22 4.8,22 C4.8,22 9.2,21.8 11.8,18.8 C17.8,18.2 22.2,12.5 21.8,5.8 C21.8,5.8 19.5,4.5 17.8,2.8 Z M11.2,16.8 C10.8,12.2 13.5,7.8 17.5,5.8 C17.2,9.8 14.8,14.5 11.2,16.8 Z" />
                            </svg>
                            <span className="faq-link-text">{item.linkText}</span>
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
