import React from "react";

export default function HowToUse({ howToUse }) {
  return (
    <div className="product-single__description">
      <div dangerouslySetInnerHTML={{ __html: howToUse }} />
    </div>
  );
}
