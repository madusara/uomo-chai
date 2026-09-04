"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";

const bannerData = [
  {
    imageSrc: "/assets/images/home/demo19/banner-1.jpg",
    question: "What are Infusio Elixirs?",
    quickText: "Premium syrups for every occasion.",
    answer: "Infusio Elixirs are concentrated gourmet syrups crafted using premium Ceylon tea and spices, with no artificial colors, flavors, or preservatives. They can be used to create a variety of specialty beverages, including hot and iced chai, chai lattes, cocktails, mocktails, and sparkling drinks.",
    linkText: "Shop Now",
    linkUrl: "/shop"
  },
  {
    imageSrc: "/assets/images/home/demo19/banner-2.jpg",
    question: "Discover the perfect timepiece for any occasion",
    quickText: "luxury watches collection.",
    answer: "Explore our exclusive range of premium watches designed to elevate your style. Crafted with precision and elegance, each piece tells a unique story of sophistication. Whether you're dressing for a formal event or looking for an everyday statement accessory, we have the ideal match for you.",
    linkText: "Explore Collection",
    linkUrl: "/shop"
  },
  {
    imageSrc: "/assets/images/home/demo19/banner-2.jpg",
    question: "Can I use the Ceylon Cinnamon & Vanilla Elixir in desserts?",
    quickText: "Perfect for desserts, toppings & glazes.",
    answer: "Absolutely! Our Ceylon Cinnamon & Vanilla Elixir can be used as a topping for desserts, smoothies, and breakfast bowls. It also works wonderfully as a glaze for baked goods and pastries.",
    linkText: "Explore Collection",
    linkUrl: "/shop"
  },
  {
    imageSrc: "/assets/images/home/demo19/banner-2.jpg",
    question: "Do your products contain caffeine?",
    quickText: "Naturally occurring caffeine from Ceylon tea.",
    answer: "Infusio Chai Elixir contains a small amount of naturally occurring caffeine derived from Ceylon Black Tea.",
    linkText: "Explore Collection",
    linkUrl: "/shop"
  },
  {
    imageSrc: "/assets/images/home/demo19/banner-2.jpg",
    question: "How do I make a cup of chai?",
    quickText: "Simple steps for a delicious cup of chai.",
    answer: "Hot Masala Chai. Add 20 ml of Infusio Chai Elixir to 150 ml of hot milk and stir well. Alternatively, add 20 ml of Chai Elixir to 150 ml of milk and bring it to a gentle boil. Sweeten to taste.",
    linkText: "Explore Collection",
    linkUrl: "/shop"
  },
  {
    imageSrc: "/assets/images/home/demo19/banner-2.jpg",
    question: "Iced Chai / Chai Latte",
    quickText: "Easy steps for a refreshing iced chai.",
    answer: "Add 30 ml of Infusio Chai Elixir to chilled or iced milk and mix well. Sweeten according to your preference. For a stronger, spicier chai, simply add more Chai Elixir to suit your taste. For iced chai, we recommend using honey or another liquid sweetener for enhanced flavor.",
    linkText: "Explore Collection",
    linkUrl: "/shop"
  },
  {
    imageSrc: "/assets/images/home/demo19/banner-2.jpg",
    question: "What makes Infusio different from other chai products?",
    quickText: "Real ingredients, authentic flavor, minimal processing.",
    answer: "There are many chai products available today, including powder blends, sticky chai, syrups, and concentrates. Powdered chai blends often require longer preparation times and may lose their flavor and aroma during storage. Some products also contain artificial flavors, colors, preservatives, or high levels of added sugar. Infusio Chai Elixir is brewed using Ceylon Black Tea, natural spices, water, and a small amount of cane sugar. We use minimal processing (brewing) to preserve the natural flavor, aroma, and beneficial compounds found in tea and spices. The result is a convenient, flavorful, and authentic cup of chai made with real ingredients.",
    linkText: "Explore Collection",
    linkUrl: "/shop"
  },
  {
    imageSrc: "/assets/images/home/demo19/banner-2.jpg",
    question: "How do I make a refreshing ginger drink with Infusio Ginger Elixir?",
    quickText: "Easy recipe for a refreshing ginger drink.",
    answer: "Simply add 20 ml of Infusio Ginger Elixir to 200 ml of chilled soda or sparkling water and mix well. For an extra refreshing twist, try it with lemon flavored sparkling beverages.",
    linkText: "Explore Collection",
    linkUrl: "/shop"
  },
  {
    imageSrc: "/assets/images/home/demo19/banner-2.jpg",
    question: "How should I store my elixirs?",
    quickText: "Keep opened elixirs refrigerated for freshness.",
    answer: "Once opened, all Infusio Elixirs should be refrigerated to maintain freshness and quality. Since our products contain no artificial preservatives, exposure to warm temperatures may affect their flavor, aroma, and shelf life.",
    linkText: "Explore Collection",
    linkUrl: "/shop"
  },
  {
    imageSrc: "/assets/images/home/demo19/banner-2.jpg",
    question: "Where can I purchase your products?",
    quickText: "Shop online or order directly via WhatsApp.",
    answer: "You can purchase our products directly through our website at www.endlesslk.com or place an order via WhatsApp at +94 777 530 354.",
    linkText: "Explore Collection",
    linkUrl: "/shop"
  },
  {
    imageSrc: "/assets/images/home/demo19/banner-2.jpg",
    question: "How do you deliver?",
    quickText: "Islandwide delivery across Sri Lanka in 2–3 days.",
    answer: "We partner with a trusted third-party courier service to provide islandwide delivery across Sri Lanka. Orders are typically delivered within 2–3 business days after confirmation.",
    linkText: "Explore Collection",
    linkUrl: "/shop"
  },
  {
    imageSrc: "/assets/images/home/demo19/banner-2.jpg",
    question: "Why is Infusio Ginger Elixir different from other ginger drinks?",
    quickText: "Real ginger, natural benefits, and no artificial additives.",
    answer: "Infusio Ginger Elixir is made from real ginger and contains no alcohol, artificial flavors, or artificial colors. Unlike many conventional soft drinks, it retains naturally occurring gingerol the active compound in ginger that is known for its anti-inflammatory properties and digestive benefits.",
    linkText: "Explore Collection",
    linkUrl: "/shop"
  },
  {
    imageSrc: "/assets/images/home/demo19/banner-2.jpg",
    question: "What is Drop It?",
    quickText: "Authentic Sri Lankan flavors in every drop.",
    answer: "Drop It is a range of liquid spice extracts designed to deliver authentic Sri Lankan flavors, functional plant compounds, and precise seasoning. It offers consistency, convenience, and elevated flavor for modern cooking applications.",
    linkText: "Explore Collection",
    linkUrl: "/shop"
  },
  {
    imageSrc: "/assets/images/home/demo19/banner-2.jpg",
    question: "Why should I choose Drop It instead of traditional spice powders?",
    quickText: "Concentrated flavor, lasting quality, and easy use.",
    answer: "Drop It Liquid Spices are highly concentrated extracts that capture the natural flavor and aroma of spices using innovative green extraction technologies. These methods avoid harsh chemicals and excessive heat, helping preserve the spices' aromatic compounds and bioactive components. As a result, Drop It products provide consistent flavor, longer lasting quality, and greater convenience compared to traditional spice powders, without requiring special storage conditions.",
    linkText: "Explore Collection",
    linkUrl: "/shop"
  },
  {
    imageSrc: "/assets/images/home/demo19/banner-2.jpg",
    question: "I think we could work together on something exciting. How can I get in touch?",
    quickText: "Get in touch and let's create something exciting.",
    answer: "We'd love to hear from you! Please email your inquiry to endlessgreensgourmet@gmail.com, and our team will get back to you as soon as possible.",
    linkText: "Explore Collection",
    linkUrl: "/shop"
  },
  {
    imageSrc: "/assets/images/home/demo19/banner-2.jpg",
    question: "We'd like to use your products in our café, restaurant, or hospitality business. How can we purchase?",
    quickText: "Wholesale options for cafés, restaurants & hospitality.",
    answer: "We're always happy to collaborate with food service partners. Please contact us via WhatsApp at +94 777 530 354 to discuss wholesale purchasing and partnership opportunities.",
    linkText: "Explore Collection",
    linkUrl: "/shop"
  },
  {
    imageSrc: "/assets/images/home/demo19/banner-2.jpg",
    question: "Do you offer private labeling or contract manufacturing?",
    quickText: "Private labeling & contract manufacturing solutions.",
    answer: "Yes. Endless Greens offers private labeling and contract manufacturing solutions for businesses looking to develop high-quality food and beverage products tailored to their requirements. For more information, please contact us at endlessgreensgourmet@gmail.com. Or +94 777 530 354.",
    linkText: "Explore Collection",
    linkUrl: "/shop"
  }
];

export default function Banner() {
  const [mounted, setMounted] = useState(false);
  const [initialSlide, setInitialSlide] = useState(0);

  useEffect(() => {
    // Randomly select a starting slide on page load
    setInitialSlide(Math.floor(Math.random() * bannerData.length));
    setMounted(true);
  }, []);

  const swiperOptions = {
    autoplay: {
      delay: 5000,
      disableOnInteraction: false,
    },
    slidesPerView: 1,
    modules: [Autoplay],
    loop: true,
  };

  // Prevent hydration errors by waiting for the client to mount before rendering the Swiper
  if (!mounted) {
    return <section className="banner container" style={{ minHeight: "600px", visibility: "hidden" }}></section>;
  }

  return (
    <section className="banner container">
      <Swiper 
        {...swiperOptions} 
        initialSlide={initialSlide}
        className="swiper-container js-swiper-slider"
      >
        {bannerData.map((item, index) => (
          <SwiperSlide key={index} className="bg-white">
            <div className="row">
              <div className="col-lg-7">
                <Image
                  loading="lazy"
                  src={item.imageSrc}
                  width="810"
                  height="600"
                  alt="image"
                  className="w-100 h-auto"
                />
              </div>
              <div className="col-lg-5 py-5 d-flex flex-column align-items-center justify-content-center">
                <div className="px-3 px-xl-5">
                  <h2 className="fs-30 fw-semi-bold text-uppercase mb-4">
                    {item.question}
                    <br />
                    <span className="theme-color">{item.quickText}</span>
                  </h2>
                  <p className="text-secondary mb-4">
                    {item.answer}
                  </p>
                  <p className="mb-0">
                    <Link
                      href={item.linkUrl}
                      className="btn-link btn-link_md default-underline text-uppercase fw-semi-bold fs-13"
                    >
                      {item.linkText}
                    </Link>
                  </p>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}
