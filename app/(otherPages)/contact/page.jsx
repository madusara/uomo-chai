import Footer1 from "@/components/footers/Footer1";

import Header1 from "@/components/headers/Header1";
import Contact from "@/components/otherPages/Contact/Contact";
import LocationMap from "@/components/otherPages/Contact/LocationMap";
import { getCategoryData } from "@/lib/api/home";

import React from "react";

export const metadata = {
  title: "Contact | endlessLk",
  description: "Explore Contact on endlessLk. Discover quality products, latest collections, and secure online shopping.",
};
export default async function ContactPage() {
  const categoryData = await getCategoryData();
  const collections = categoryData.collections || [];

  return (
    <>
      <Header1 collections={collections} />
      <main className="page-wrapper">
        <div className="mb-4 pb-4"></div>
        <section className="contact-us container">
          <div className="mw-930">
            <h2 className="page-title">CONTACT US</h2>
          </div>
        </section>

        {/* <section className="google-map mb-5">
          <h2 className="d-none">Contact US</h2>
          <div id="map" className="google-map__wrapper">
            <LocationMap />
          </div>
        </section> */}
        <Contact />
      </main>
      <div className="mb-5 pb-xl-5"></div>
      <Footer1 collections={collections} />
    </>
  );
}
