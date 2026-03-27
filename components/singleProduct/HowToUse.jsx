import React from "react";

export default function HowToUse({ howToUse }) {
  // If no content is provided, show a message or return null
  if (!howToUse || howToUse.trim() === "") {
    return <div className="product-single__description">No how-to-use information available</div>;
  }

  return (
    <div className="product-single__description">
      <div dangerouslySetInnerHTML={{ __html: howToUse }} />
    </div>
  );
}
