"use client";
import Link from "next/link";
import Pagination1 from "../common/Pagination1";
import { blogs13 } from "@/data/blogs";
import Image from "next/image";

export default function Blog2({ blogs = blogs13 }) {
  const ensureArray = (data) => {
    if (Array.isArray(data)) return data;
    if (data?.blogs && Array.isArray(data.blogs)) return data.blogs;
    if (data?.data && Array.isArray(data.data)) return data.data;
    return [];
  };

  const blogsData = ensureArray(blogs) || blogs13;
  return (
    <>
      <section className="blog-page-title mb-4 mb-xl-5">
        <div className="title-bg">
          <Image
            loading="lazy"
            src="/assets/images/blog_title_bg.jpg"
            width="1780"
            height="420"
            alt="image"
          />
        </div>
        <div className="container">
          <h2 className="page-title">The Blog</h2>
        </div>
      </section>
      <section className="blog-page container">
        <h2 className="d-none">The Blog</h2>
        <div className="blog-grid row row-cols-1 row-cols-md-2 row-cols-xl-3">
          {blogsData.map((elm, i) => (
            <div key={i} className="blog-grid__item">
              <div className="blog-grid__item-image">
                <Image
                  loading="lazy"
                  className="h-auto"
                  src={elm.imgSrc}
                  width="450"
                  height="400"
                  alt="image"
                />
              </div>
              <div className="blog-grid__item-detail">
                <div className="blog-grid__item-meta">
                  <span className="blog-grid__item-meta__author">
                    By {elm.author}
                  </span>
                  <span className="blog-grid__item-meta__date">{elm.date}</span>
                </div>
                <div className="blog-grid__item-title">
                  <Link href={`/blog/${elm.slug}`}>{elm.title}</Link>
                </div>
                <div className="blog-grid__item-content">
                  <p>{elm.content}</p>
                  <Link
                    href={`/blog/${elm.slug}`}
                    className="readmore-link"
                  >
                    Continue Reading
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
        <p className="mb-5 text-center fw-medium">SHOWING 36 of 497 items</p>
        <Pagination1 />

        <div className="text-center">
          <a className="btn-link btn-link_lg text-uppercase fw-medium" href="#">
            Show More
          </a>
        </div>
      </section>{" "}
    </>
  );
}
