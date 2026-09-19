"use client";
import { brandImages } from "@/data/brands";
import { Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import Image from "next/image";

export default function Brands() {
  const swiperOptions = {
    autoplay: {
      delay: 3200,
      disableOnInteraction: false,
    },
    modules: [Autoplay],
    slidesPerView: 7,
    slidesPerGroup: 1,
    loop: true,
    speed: 700,
    breakpoints: {
      320: {
        slidesPerView: 2,
        spaceBetween: 20,
      },
      480: {
        slidesPerView: 3,
        spaceBetween: 24,
      },
      768: {
        slidesPerView: 4,
        spaceBetween: 30,
      },
      992: {
        slidesPerView: 5,
        spaceBetween: 36,
      },
      1200: {
        slidesPerView: 7,
        spaceBetween: 44,
      },
    },
  };

  return (
    <section className="brands-carousel container">
      <h2 className="d-none">Proudly serving </h2>
      <div className="position-relative">
        <Swiper
          className="swiper-container js-swiper-slider"
          {...swiperOptions}
        >
          {brandImages.map((elm, i) => (
            <SwiperSlide key={i} className="swiper-slide">
              <div className="brand-item" title={elm.name}>
                <Image
                  loading="lazy"
                  src={elm.src}
                  width={elm.width}
                  height={elm.height}
                  alt={elm.name || "Brand Partner"}
                  className="brand-item__image"
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}

