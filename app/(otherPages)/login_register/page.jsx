import Footer1 from "@/components/footers/Footer1";

import Header1 from "@/components/headers/Header1";
import LoginRegister from "@/components/otherPages/LoginRegister";
import React from "react";

export const metadata = {
  title: "Login Register | endlessLk",
  description: "Explore Login Register on endlessLk. Discover quality products, latest collections, and secure online shopping.",
};
export default function LoginPage() {
  return (
    <>
      <Header1 />
      <main className="page-wrapper">
        <div className="mb-4 pb-4"></div>
        <LoginRegister />
      </main>

      <div className="mb-5 pb-xl-5"></div>
      <Footer1 />
    </>
  );
}
