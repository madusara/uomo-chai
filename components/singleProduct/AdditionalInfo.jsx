import React from "react";

export default function AdditionalInfo() {
  return (
    <div className="product-single__addtional-info">
      <div className="item">
        <label className="h6">Size</label>
        <span>200ml, 500ml, 1l</span>
      </div>
      <div className="item">
        <label className="h6">Packaging</label>
        <span>Glass Bottle</span>
      </div>
      <div className="item">
        <label className="h6">Storage</label>
        <span>Store in a cool, dry place</span>
      </div>
      <div className="item">
        <label className="h6">Expiry</label>
        <span>15 months</span>
      </div>
      <div className="item">
        <label className="h6">Ingredients</label>
        <span>Sugar, Water, Citric Acid, Natural Flavors, Color, Preservative</span>
      </div>
    </div>
  );
}
