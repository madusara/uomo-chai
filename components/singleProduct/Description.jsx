import React from "react";

export default function Description() {
  return (
    <div className="product-single__description">
      <h3 className="block-title mb-4">
        Sed do eiusmod tempor incididunt ut labore
      </h3>
      <p className="content">
        Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
      
      </p>
      <div className="row">
        <div className="col-lg-6">
          <h3 className="block-title">Why choose product?</h3>
          <ul className="list text-list">
            <li>Creat by cotton fibric with soft and smooth</li>
            <li>Simple, Configurable (e.g. size, color, etc.), bundled</li>
            <li>Downloadable/Digital Products, Virtual Products</li>
          </ul>
        </div>
        <div className="col-lg-6">
          <h3 className="block-title">Sample Number List</h3>
          <ol className="list text-list">
            <li>Create Store-specific attrittbutes on the fly</li>
            <li>Simple, Configurable (e.g. size, color, etc.), bundled</li>
            <li>Downloadable/Digital Products, Virtual Products</li>
          </ol>
        </div>
      </div>
      <h3 className="block-title mb-0">Lining</h3>
      <p className="content">100% Polyester, Main: 100% Polyester.</p>
    </div>
  );
}
