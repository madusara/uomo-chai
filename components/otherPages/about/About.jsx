import Image from "next/image";
import React from "react";

export default function About() {
  return (
    <section className="about-us container">
      <div className="mw-930">
        <h2 className="page-title">ABOUT EndlessLk</h2>
      </div>
      <div className="about-us__content pb-5 mb-5">
        <p className="mb-5">
          <Image
            style={{ height: "fit-content" }}
            loading="lazy"
            className="w-100 h-auto d-block"
            src="/assets/images/about/about-1.jpg"
            width="1410"
            height="550"
            alt="image"
          />
        </p>
        <div className="mw-930">
          <h3 className="mb-4">OUR STORY</h3>
          <p className="fs-6 fw-medium mb-4">
            Endless Greens is a women owned Sri Lankan company rooted in a
            passion for plants, science, and heritage. Inspired by the
            comforting aroma of tea factories surrounding our hometown, our
            journey began with tea infusions and evolved into purposeful
            plant-based innovation. Our journey is rooted in a deep belief that
            Sri Lanka&apos;s tea, spices, herbs, and diverse botanicals shaped
            by unique biological and environmental conditions carry exceptional
            nutraceutical and wellness value.
          </p>
          <p className="mb-4">
            Inspired by our rich heritage of spices and Ayurveda, we began with
            tea infusions and evolved into developing innovative, plant-based
            solutions under our brand Infusio. By combining traditional
            knowledge with modern food science and advanced extraction
            technologies, we transform natural goodness into convenient,
            high-quality products for today&apos;s world. Dropit Liquid Spices
            are our way of adding value to Sri Lankan cuisine preserving
            authentic flavors while making cooking simpler, cleaner, and more
            consistent.
          </p>
          <div className="row mb-3">
            <div className="col-md-6">
              <h5 className="mb-3">Our Mission</h5>
              <p className="mb-3">
                Our mission is to bring the authentic flavor, aroma, and
                functional benefits of Sri Lankan botanicals to global kitchens
                without compromising their origin or integrity. We are committed
                to responsible sourcing, working closely with local farmers to
                encourage Good Agricultural Practices and sustainable
                cultivation.
              </p>
            </div>
            <div className="col-md-6">
              <h5 className="mb-3">Our Vision</h5>
              <p className="mb-3">
                As a purpose driven business, we actively empower women and
                support local communities, creating opportunities for growth
                through collaboration and innovation. At Endless Greens, our
                goal is simple yet meaningful: to take the essence of Sri Lanka
                to the world honoring our roots while shaping the future of
                food.
              </p>
            </div>
          </div>
        </div>
        <div className="mw-930 d-lg-flex align-items-lg-center">
          <div className="image-wrapper col-lg-6">
            <Image
              style={{ height: "fit-content" }}
              className="h-auto"
              loading="lazy"
              src="/assets/images/about/about-2.jpg"
              width="450"
              height="500"
              alt="image"
            />
          </div>
          <div className="content-wrapper col-lg-6 px-lg-4">
            <h5 className="mb-3">The Company</h5>
            <p>
              Endless Greens is a women-owned Sri Lankan company driven by a
              passion for plants, science, and heritage. Inspired by the aroma
              of tea factories surrounding our hometown, our journey began with
              tea infusions and evolved into purposeful plant-based innovation.
            </p>
            <p>
              Rooted in Sri Lanka’s rich heritage of tea, spices, herbs, and
              Ayurveda, we combine traditional knowledge with modern food
              science and advanced extraction technologies to create
              high-quality, convenient products under our brand Infusio.
            </p>
            <p>
              Our Dropit Liquid Spices enhance authentic Sri Lankan flavors
              while making cooking simpler, cleaner, and more consistent. We are
              committed to responsible sourcing, supporting local farmers, and
              empowering communities—bringing the true essence of Sri Lanka to
              the world.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
