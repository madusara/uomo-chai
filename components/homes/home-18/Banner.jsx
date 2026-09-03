"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";

const bannerData = [
  {
    imageSrc: "/assets/images/home/demo19/banner-1.jpg",
    preTitle: "As an official stockist of all brands, we offer",
    titleHighlight: "watches for men & ladies.",
    description: "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using ‘Content here, content here’, making it look like readable English. Many desktop publishing packages and web.",
    linkText: "Shop Now",
    linkUrl: "/shop"
  },
  {
    imageSrc: "/assets/images/home/demo19/banner-2.jpg",
    preTitle: "Discover the perfect timepiece for any occasion",
    titleHighlight: "luxury watches collection.",
    description: "Explore our exclusive range of premium watches designed to elevate your style. Crafted with precision and elegance, each piece tells a unique story of sophistication. Whether you're dressing for a formal event or looking for an everyday statement accessory, we have the ideal match for you.",
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
                    {item.preTitle}
                    <br />
                    <span className="theme-color">{item.titleHighlight}</span>
                  </h2>
                  <p className="text-secondary mb-4">
                    {item.description}
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
