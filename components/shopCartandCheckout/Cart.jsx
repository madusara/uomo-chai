"use client";

import { useContextElement } from "@/context/Context";
import Link from "next/link";
import { useState } from "react";
import Image from "next/image";
import {
  calculateTotalWeightGrams,
  calculateShippingCost,
  parseWeightInGrams,
} from "@/utlis/shipping";

export default function Cart() {
  const {
    cartProducts,
    setCartProducts,
    setQuantity,
    removeItem,
    totalPrice,
  } = useContextElement();
  const [showWeightInfo, setShowWeightInfo] = useState(false);

  const totalWeightGrams = calculateTotalWeightGrams(cartProducts);
  const totalWeight = (totalWeightGrams / 1000).toFixed(2);
  const calculatedShippingCost = calculateShippingCost(totalWeightGrams);
  const orderTotal = totalPrice + calculatedShippingCost;
  return (
    <div className="shopping-cart" style={{ minHeight: "calc(100vh - 300px)" }}>
      <div className="cart-table__wrapper">
        {cartProducts.length ? (
          <>
            <table className="cart-table">
              <thead>
                <tr>
                  <th>Product</th>
                  <th></th>
                  <th>Price</th>
                  <th>Quantity</th>
                  <th>Subtotal</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {cartProducts.map((elm, i) => (
                  <tr key={i}>
                    <td>
                      <div className="shopping-cart__product-item">
                        <Image
                          loading="lazy"
                          src={elm.imgSrc || "/assets/images/products/product_0.jpg"}
                          width="120"
                          height="120"
                          alt="image"
                        />
                      </div>
                    </td>
                    <td>
                      <div className="shopping-cart__product-item__detail">
                        <h4>{elm.title}</h4>
                        <ul className="shopping-cart__product-item__options">
                          {/* <li>Color: Yellow</li> */}
                          <li>Size: {elm.size || "L"}</li>
                          <li>
                            Weight:{" "}
                            {(
                              parseWeightInGrams(
                                elm.weight ?? elm.variant_weight,
                                elm.size,
                                200
                              ) / 1000
                            ).toFixed(2)}{" "}
                            kg
                          </li>
                        </ul>
                      </div>
                    </td>
                    <td>
                      <span className="shopping-cart__product-price">
                        Rs {elm.price}
                      </span>
                    </td>
                    <td>
                      <div className="qty-control position-relative">
                        <input
                          type="number"
                          name="quantity"
                          value={elm.quantity}
                          min={1}
                          onChange={(e) => {
                            const val = parseInt(e.target.value, 10);
                            if (!isNaN(val) && val >= 1) {
                              setQuantity(elm.id, val, i);
                            }
                          }}
                          className="qty-control__number text-center"
                        />
                        <div
                          onClick={() => {
                            if (elm.quantity > 1) {
                              setQuantity(elm.id, elm.quantity - 1, i);
                            }
                          }}
                          className="qty-control__reduce"
                          style={{ cursor: elm.quantity <= 1 ? "not-allowed" : "pointer" }}
                        >
                          -
                        </div>
                        <div
                          onClick={() => setQuantity(elm.id, elm.quantity + 1, i)}
                          className="qty-control__increase"
                          style={{ cursor: "pointer" }}
                        >
                          +
                        </div>
                      </div>
                    </td>
                    <td>
                      <span className="shopping-cart__subtotal">
                        Rs {elm.price * elm.quantity}
                      </span>
                    </td>
                    <td>
                      <a
                        onClick={() => removeItem(elm.id, i)}
                        className="remove-cart"
                        style={{ cursor: "pointer" }}
                      >
                        <svg
                          width="10"
                          height="10"
                          viewBox="0 0 10 10"
                          fill="#767676"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path d="M0.259435 8.85506L9.11449 0L10 0.885506L1.14494 9.74056L0.259435 8.85506Z" />
                          <path d="M0.885506 0.0889838L9.74057 8.94404L8.85506 9.82955L0 0.97449L0.885506 0.0889838Z" />
                        </svg>
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="cart-table-footer">
              <form
                onSubmit={(e) => e.preventDefault()}
                className="position-relative bg-body"
              >
                {/* <input
                  className="form-control"
                  type="text"
                  name="coupon_code"
                  placeholder="Coupon Code"
                /> */}
                {/* <input
                  className="btn-link fw-medium position-absolute top-0 end-0 h-100 px-4"
                  type="submit"
                  defaultValue="APPLY COUPON"
                /> */}
              </form>
              <button className="btn btn-light d-none">UPDATE CART</button>
            </div>
          </>
        ) : (
          <>
            <div className="fs-20">Shop cart is empty</div>

            <button className="btn mt-3 btn-light">
              <Link href={"/shop"}>Explore Products</Link>
            </button>
          </>
        )}
      </div>
      {cartProducts.length ? (
        <div className="shopping-cart__totals-wrapper">
          <div className="sticky-content">
            <div className="shopping-cart__totals">
              <h3>Cart Totals</h3>
              <table className="cart-totals">
                <tbody>
                  <tr>
                    <th>Subtotal</th>
                    <td>Rs {totalPrice}</td>
                  </tr>
                  <tr>
                    <th>
                      <div className="d-flex align-items-center gap-2">
                        <span>Total Weight</span>
                        <div
                          className="position-relative d-inline-flex align-items-center"
                          onMouseEnter={() => setShowWeightInfo(true)}
                          onMouseLeave={() => setShowWeightInfo(false)}
                          onClick={() => setShowWeightInfo(!showWeightInfo)}
                          style={{ cursor: "pointer" }}
                        >
                          <svg
                            width="15"
                            height="15"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="#8C7A5B"
                            strokeWidth="2.2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            style={{ transition: "stroke 0.2s" }}
                          >
                            <circle cx="12" cy="12" r="10" />
                            <line x1="12" y1="16" x2="12" y2="12" />
                            <line x1="12" y1="8" x2="12.01" y2="8" />
                          </svg>

                          {showWeightInfo && (
                            <div
                              style={{
                                position: "absolute",
                                bottom: "calc(100% + 10px)",
                                left: "50%",
                                transform: "translateX(-50%)",
                                backgroundColor: "#1E1B18",
                                color: "#FAF8F4",
                                padding: "10px 14px",
                                borderRadius: "8px",
                                fontSize: "0.78rem",
                                lineHeight: 1.45,
                                width: "240px",
                                boxShadow: "0 6px 20px rgba(0,0,0,0.2)",
                                zIndex: 100,
                                pointerEvents: "none",
                              }}
                            >
                              <div
                                style={{
                                  fontWeight: "600",
                                  marginBottom: "4px",
                                  color: "#E7D8BA",
                                }}
                              >
                                Shipping Rate Details
                              </div>
                              <div>
                                • Base shipping: <strong>Rs 425</strong> (first 1 kg)
                              </div>
                              <div>
                                • Each additional 1 kg: <strong>+Rs 100</strong>
                              </div>
                              <div
                                style={{
                                  position: "absolute",
                                  top: "100%",
                                  left: "50%",
                                  transform: "translateX(-50%)",
                                  width: "0",
                                  height: "0",
                                  borderLeft: "6px solid transparent",
                                  borderRight: "6px solid transparent",
                                  borderTop: "6px solid #1E1B18",
                                }}
                              />
                            </div>
                          )}
                        </div>
                      </div>
                    </th>
                    <td>{totalWeight} kg</td>
                  </tr>
                  <tr>
                    <th>Shipping</th>
                    <td>Rs {calculatedShippingCost}</td>
                  </tr>
                  <tr>
                    <th>Total</th>
                    <td className="fw-bold">Rs {orderTotal}</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="mobile_fixed-btn_wrapper">
              <div className="button-wrapper container">
                <Link
                  href="/shop_checkout"
                  className="btn btn-primary btn-checkout d-flex align-items-center justify-content-center text-decoration-none"
                >
                  PROCEED TO CHECKOUT
                </Link>
              </div>
            </div>
          </div>
        </div>
      ) : (
        ""
      )}
    </div>
  );
}
