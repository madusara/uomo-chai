"use client";
import Link from "next/link";
import Pagination1 from "../common/Pagination1";
import { blogs13 } from "@/data/blogs";
import Image from "next/image";
import { useState } from "react";

export default function BulkOrders({ blogs = blogs13 }) {
  const INITIAL_VISIBLE_ITEMS = 9;
  const LOAD_MORE_COUNT = 9;

  const ensureArray = (data) => {
    if (Array.isArray(data)) return data;
    if (data?.blogs && Array.isArray(data.blogs)) return data.blogs;
    if (data?.data && Array.isArray(data.data)) return data.data;
    return [];
  };

  const blogsData = ensureArray(blogs) || blogs13;
  const [visibleCount, setVisibleCount] = useState(INITIAL_VISIBLE_ITEMS);

  const totalItems = blogsData.length;
  const currentItems = Math.min(visibleCount, totalItems);
  const visibleBlogs = blogsData.slice(0, currentItems);

  const handleShowMore = (e) => {
    e.preventDefault();
    setVisibleCount((prev) => Math.min(prev + LOAD_MORE_COUNT, totalItems));
  };

  return (
    <>
      <section className="bulk-hero-banner">
        <div className="container">
          <div className="bulk-hero-banner__content">
            <nav className="bulk-hero-banner__breadcrumb" aria-label="breadcrumb">
              <Link href="/">HOME</Link>
              <span className="sep">/</span>
              <span className="current">BULK PURCHASE</span>
            </nav>
            <h1 className="bulk-hero-banner__title">BULK PURCHASE</h1>
            <p className="bulk-hero-banner__desc">
              Curated quantities for cafés, retailers, hospitality
              <br className="d-none d-sm-inline" /> and growing businesses.
            </p>
            <div className="bulk-hero-banner__accent" />
          </div>
        </div>
      </section>
      <section className="blog-page container">
        <h2 className="d-none">The Blog</h2>
        <div className="blog-grid row row-cols-1 row-cols-md-2 row-cols-xl-3">
          {visibleBlogs.map((elm, i) => (
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
        <p className="mb-5 text-center fw-medium">
          SHOWING {currentItems} of {totalItems} items
        </p>
        <Pagination1 current={currentItems} total={totalItems} />

        <div className="text-center">
          <a
            className="btn-link btn-link_lg text-uppercase fw-medium"
            href="#"
            onClick={handleShowMore}
          >
            Show More
          </a>
        </div>
      </section>{" "}
    </>
  );
}
