import Blog3 from "@/components/blogs/Blog3";
import BlogDetails from "@/components/blogs/BlogDetails";
import Footer1 from "@/components/footers/Footer1";

import Header1 from "@/components/headers/Header1";
import { allBlogs } from "@/data/blogs";
import { getBlogDetails } from "@/lib/api/home";
import React from "react";

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const data = await getBlogDetails(slug);
  const seo = data?.seo;

  return {
    title: seo?.title ?? "Blog | Site name",
    description: seo?.description ?? "",
    keywords: seo?.keywords ?? "",
  };
}

export default async function BlogDetailsPage(props) {
  const params = await props.params;
  const slug = params.slug;
  const res = await getBlogDetails(slug);
  const blog = res?.success ? (res.blog || res.data || allBlogs[0]) : allBlogs[0];

  return (
    <>
      <Header1 />
      <main className="page-wrapper">
        <div className="mb-4 pb-4"></div>
        <BlogDetails blog={blog} />
      </main>
      <div className="mb-5 pb-xl-5"></div>
      <Footer1 />
    </>
  );
}
