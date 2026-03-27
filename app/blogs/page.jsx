import Blog2 from "@/components/blogs/Blog2";
import Footer1 from "@/components/footers/Footer1";
import Header1 from "@/components/headers/Header1";
import React from "react";
import { getBlogsData } from "@/lib/api/home";

export const metadata = {
  title: "Blog 2 || Uomo eCommerce React Nextjs Template",
  description: "Uomo eCommerce React Nextjs Template",
};

export default async function Blogs() {
  const blogsData = await getBlogsData();

  return (
    <>
      <Header1 />
      <main className="page-wrapper">
        <Blog2 blogs={blogsData} />
      </main>
      <div className="mb-5 pb-xl-5"></div>
      <Footer1 />
    </>
  );
}
