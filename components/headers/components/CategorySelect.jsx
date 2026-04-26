"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";

const categories = ["All Category", "Men", "Women", "Kids"];
const toSlug = (value = "") =>
  value
    .toString()
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");

export default function CategorySelect({ collections = [], onCategoryChange }) {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const containerRef = useRef(null);
  const router = useRouter();
  const [selectedCategory, setSelectedCategory] = useState("");
  const hasCollections = Array.isArray(collections) && collections.length > 0;
  const categoryItems = hasCollections
    ? [
        { label: "All Category", slug: "" },
        ...collections
          .map((item) => {
            const label = item?.name || item?.title;
            if (!label) return null;

            return {
              label,
              slug: item?.slug || toSlug(label),
            };
          })
          .filter(Boolean),
      ]
    : categories.map((label, index) => ({
        label,
        slug: index === 0 ? "" : toSlug(label),
      }));

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
  return (
    <div
      ref={containerRef}
      className={`hover-container position-relative ${
        isPopupOpen ? "js-content_visible" : ""
      }`}
    >
      <div
        className="js-hover__open"
        onClick={() => setIsPopupOpen((pre) => !pre)}
      >
        <input
          className="header-search__category search-field__actor border-0 bg-white w-100"
          type="text"
          name="search-category"
          placeholder="All Category"
          value={selectedCategory}
          readOnly
        />
      </div>
      <div className="header-search__category-list js-hidden-content mt-2">
        <ul className="search-suggestion list-unstyled">
          {categoryItems.map((category, index) => (
            <li
              onClick={() => {
                setSelectedCategory(category.label);
                setIsPopupOpen(false);

                onCategoryChange?.(category.slug);

                if (!category.slug) {
                  router.push("/shop");
                  return;
                }

                router.push(`/shop/${category.slug}`);
              }}
              key={index}
              className="search-suggestion__item js-search-select"
            >
              {category.label}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
