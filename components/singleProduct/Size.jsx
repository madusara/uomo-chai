"use client";

import React, { useEffect, useId } from "react";
import tippy from "tippy.js";

export default function Size({ sizes, selectedSize, onSizeChange }) {
  const idBase = useId().replace(/:/g, "");

  useEffect(() => {
    tippy("[data-tippy-content]");
  }, []);

  const normalizedSizes = Array.isArray(sizes)
    ? sizes
        .map((size) =>
          typeof size === "string"
            ? size
            : size?.size || size?.label || size?.name || ""
        )
        .filter(Boolean)
    : [];

  const displaySizes = normalizedSizes.length > 0 ? normalizedSizes : ["500ml", "200ml"];

  return (
    <>
      {displaySizes.map((size, index) => (
        <React.Fragment key={index}>
          <input
            type="radio"
            name={`size-${idBase}`}
            id={`swatch-${idBase}-${index + 1}`}
            checked={selectedSize === size}
            onChange={() => onSizeChange(size)}
          />

          <label
            className="swatch js-swatch"
            htmlFor={`swatch-${idBase}-${index + 1}`}
            aria-label={size}
            data-bs-toggle="tooltip"
            data-bs-placement="top"
            data-tippy-content={size}
          >
            {size}
          </label>
        </React.Fragment>
      ))}
    </>
  );
}