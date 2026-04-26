"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

const toSlug = (value = "") =>
  value
    .toString()
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");

const fallbackQuicklinks = [
  { label: "New Arrivals", slug: "new-arrivals" },
  { label: "Dresses", slug: "dresses" },
  { label: "Accessories", slug: "accessories" },
  { label: "Footwear", slug: "footwear" },
  { label: "Sweatshirt", slug: "sweatshirt" },
];

export default function SearchPopup({ collections = [] }) {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [searchKeyword, setSearchKeyword] = useState("");
  const containerRef = useRef(null);
  const router = useRouter();
  const hasCollections = Array.isArray(collections) && collections.length > 0;
  const quicklinks = hasCollections
    ? collections
        .map((item) => {
          const label = item?.name || item?.title;
          if (!label) return null;

          return {
            label,
            slug: item?.slug || toSlug(label),
          };
        })
        .filter(Boolean)
        .slice(0, 5)
    : fallbackQuicklinks;

  const handleClickOutside = (event) => {
    if (containerRef.current && !containerRef.current.contains(event.target)) {
      setIsPopupOpen(false);
    }
  };

  useEffect(() => {
    // Add event listener for clicks
    document.addEventListener("click", handleClickOutside);

    // Clean up the event listener on component unmount
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  const handleSearchSubmit = (e) => {
    e.preventDefault();

    const keyword = searchKeyword.trim();
    if (!keyword) {
      router.push("/shop");
      setIsPopupOpen(false);
      return;
    }

    const params = new URLSearchParams({ q: keyword });
    router.push(`/shop?${params.toString()}`);
    setIsPopupOpen(false);
  };

  return (
    <div
      ref={containerRef}
      className={`header-tools__item hover-container ${
        isPopupOpen ? "js-content_visible" : ""
      }`}
    >
      <div className="js-hover__open position-relative">
        <a
          onClick={() => setIsPopupOpen((pre) => !pre)}
          className="js-search-popup search-field__actor"
          href="#"
        >
          <svg
            className="d-block"
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <use href="#icon_search" />
          </svg>
          <i className="btn-icon btn-close-lg"></i>
        </a>
      </div>

      <div className="search-popup js-hidden-content">
        <form
          onSubmit={handleSearchSubmit}
          className="search-field container"
        >
          <p className="text-uppercase text-secondary fw-medium mb-4">
            What are you looking for?
          </p>
          <div className="position-relative">
            <input
              className="search-field__input search-popup__input w-100 fw-medium"
              type="text"
              name="search-keyword"
              placeholder="Search products"
              value={searchKeyword}
              onChange={(e) => setSearchKeyword(e.target.value)}
            />
            <button className="btn-icon search-popup__submit" type="submit">
              <svg
                className="d-block"
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <use href="#icon_search" />
              </svg>
            </button>
            <button
              className="btn-icon btn-close-lg search-popup__reset"
              type="reset"
              onClick={() => setSearchKeyword("")}
            ></button>
          </div>

          <div className="search-popup__results">
            <div className="sub-menu search-suggestion">
              <h6 className="sub-menu__title fs-base">Quicklinks</h6>
              <ul className="sub-menu__list list-unstyled">
                {quicklinks.map((item, index) => (
                  <li key={index} className="sub-menu__item">
                    <Link
                      href={`/shop/${item.slug}`}
                      className="menu-link menu-link_us-s"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="search-result row row-cols-5"></div>
          </div>
        </form>
        {/* <!-- /.header-search --> */}
      </div>
      {/* <!-- /.search-popup --> */}
    </div>
  );
}
