import React from "react";

export default function Description({ description }) {
  return (
    <div className="product-single__description">
      <div dangerouslySetInnerHTML={{ __html: description }} />
    </div>
  );
}
