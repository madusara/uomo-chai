import Blog2 from "@/components/blogs/Blog2";
import Footer1 from "@/components/footers/Footer1";
import Header1 from "@/components/headers/Header1";
import React from "react";
import { getBlogsData, getCategoryData } from "@/lib/api/home";

export async function generateMetadata() {
  const blogsData = await getBlogsData();
  const blogList = blogsData.blogs || [];
  const dynamicBlogTitles = blogList.map(b => b.title).join(", ");
  
  return {
    title: "Wellness & Spice Journal | Endless Greens Blog",
    description: `Explore our latest stories: ${blogList[0]?.title || 'Botanical innovations'}. Deep dives into Ceylon tea heritage, spice science, and plant-based wellness.`,
    keywords: [
      "Ceylon tea stories",
      "Spice health benefits",
      "Ayurvedic lifestyle blog",
      "Plant-based food science",
      "Masala Chai heritage",
      "Endless Greens articles",
      dynamicBlogTitles
    ].join(", "),
    openGraph: {
      title: "Endless Greens Journal | Stories of Heritage & Science",
      description: "Articles on the functional benefits of Sri Lankan botanicals.",
      type: "website",
    }
  };
}

export default async function Blogs() {
  const [blogsData, categoryData] = await Promise.all([
    getBlogsData(),
    getCategoryData(),
  ]);
  const blogList = blogsData.blogs || [];
  const collections = categoryData.collections || [];

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Blog",
    "name": "Endless Greens Wellness Journal",
    "description": "Educational articles about Sri Lankan spices, tea infusions, and plant-based innovation.",
    "publisher": {
      "@type": "Organization",
      "name": "Endless Greens"
    },
    "blogPost": blogList.map((post) => ({
      "@type": "BlogPosting",
      "headline": post.title,
      "image": post.imgSrc,
      "datePublished": post.date,
      "author": {"@type": "Person", "name": post.author},
      "url": `https://endlesslk.com/blogs/${post.slug}`
    }))
  };

return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Header1 collections={collections} />
      <main className="page-wrapper">
        <h1 className="visually-hidden">Endless Greens Wellness & Spice Blog</h1>
        <Blog2 blogs={blogsData} />
      </main>
      <div className="mb-5 pb-xl-5"></div>
      <Footer1 collections={collections} />
    </>
  );
}