"use client";

import React, { useEffect } from "react";
import tippy from "tippy.js";

export default function Size({ sizes, selectedSize, onSizeChange }) {
  useEffect(() => {
    tippy("[data-tippy-content]");
  }, []);

  const displaySizes = sizes && sizes.length > 0 ? sizes : ["500ml", "200ml"];

  return (
    <>
      {displaySizes.map((size, index) => (
        <React.Fragment key={index}>
          <input
            type="radio"
            name="size"
            id={`swatch-${index + 1}`}
            checked={selectedSize === size}
            onChange={() => onSizeChange(size)}
          />

          <label
            className="swatch js-swatch"
            htmlFor={`swatch-${index + 1}`}
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