import Footer1 from "@/components/footers/Footer1";

import Header1 from "@/components/headers/Header1";
import CommingSoon from "@/components/otherPages/CommingSoon";
import Faq from "@/components/otherPages/Faq";
import React from "react";

export const metadata = {
  title: "Comming Soon | endlessLk",
  description: "Explore Comming Soon on endlessLk. Discover quality products, latest collections, and secure online shopping.",
};
export default function CommingSoonPage() {
  return (
    <>
      <Header1 />
      <main className="page-wrapper">
        <div className="mb-4 pb-4"></div>
        <CommingSoon />
      </main>

      <div className="mb-5 pb-xl-5"></div>
      <Footer1 />
    </>
  );
}
