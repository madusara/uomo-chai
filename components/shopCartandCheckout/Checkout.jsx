"use client";
const countries = [
  "Australia",
  "Canada",
  "United Kingdom",
  "United States",
  "Turkey",
];
import { useContextElement } from "@/context/Context";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { apiFetch } from "@/lib/api/client";
import {
  BASE_SHIPPING_COST,
  BASE_WEIGHT_GRAMS,
  STEP_WEIGHT_GRAMS,
  STEP_COST,
  parseWeightInGrams,
  calculateTotalWeightGrams,
  calculateShippingCost,
} from "@/utlis/shipping";

export default function Checkout() {
  const {
    cartProducts,
    setCartProducts,
    setQuantity: contextSetQuantity,
    removeItem: contextRemoveItem,
    totalPrice,
    setOrderCompleted,
    setCompletedOrderData,
  } = useContextElement();

  const setQuantity = (id, quantity, index = null) => {
    if (contextSetQuantity) {
      contextSetQuantity(id, quantity, index);
    } else {
      const qty = parseInt(quantity, 10);
      if (!isNaN(qty) && qty >= 1) {
        setCartProducts((prev) =>
          prev.map((item, idx) => {
            if (index !== null) return idx === index ? { ...item, quantity: qty } : item;
            return item.id == id ? { ...item, quantity: qty } : item;
          })
        );
      }
    }
  };

  const removeItem = (id, index = null) => {
    if (contextRemoveItem) {
      contextRemoveItem(id, index);
    } else {
      setCartProducts((prev) =>
        prev.filter((item, idx) => {
          if (index !== null) return idx !== index;
          return item.id != id;
        })
      );
    }
  };
  const router = useRouter();

  const [selectedRegion, setSelectedRegion] = useState("");
  const [idDDActive, setIdDDActive] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("bank_transfer");
  const [bankSlip, setBankSlip] = useState(null);
  const [shippingOpen, setShippingOpen] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [checkoutError, setCheckoutError] = useState("");

  const [firstName, setFirstName] = useState("");
  const [city, setCity] = useState("");
  const [streetAddress, setStreetAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");

  // Dynamic weight calculation based on cart items (in grams)
  const totalWeightGrams = calculateTotalWeightGrams(cartProducts);
  const totalWeightInKg = (totalWeightGrams / 1000).toFixed(2);
  const totalWeight = totalWeightInKg;

  // Weight-based shipping cost formula:
  // < 2000g = Rs 425; 2000g-2999g = Rs 525; 3000g-3999g = Rs 625...
  const calculatedShippingCost = calculateShippingCost(totalWeightGrams);
  const extraSteps =
    totalWeightGrams >= BASE_WEIGHT_GRAMS
      ? Math.max(0, Math.floor(totalWeightGrams / STEP_WEIGHT_GRAMS) - 1)
      : 0;

  const handlePlaceOrder = async (e) => {
    e.preventDefault();

    if (cartProducts.length === 0) {
      setCheckoutError("Your shopping bag is empty. Please add items before placing an order.");
      return;
    }

    if (!firstName || !streetAddress || !phone || !city) {
      setCheckoutError("Please fill in all required billing details.");
      return;
    }

    if (paymentMethod === "bank_transfer" && !bankSlip) {
      setCheckoutError("Please attach your bank slip file before placing the order.");
      return;
    }

    setCheckoutError("");
    setIsSubmitting(true);

    try {
      const payload = {
        customer_name: firstName,
        customer_email: email,
        customer_phone: phone,
        shipping_address: streetAddress,
        city: city,
        postal_code: "",
        country: "Sri Lanka",
        items: cartProducts.map((elm) => ({
          product_id: elm.product_id || elm.id,
          product_variant_id: elm.variant_id || elm.product_variant_id || elm.id,
          quantity: elm.quantity,
        })),
        shipping_cost: calculatedShippingCost,
        payment_method: paymentMethod,
      };

      const data = await apiFetch("/checkout", {
        method: "POST",
        body: JSON.stringify(payload),
      });

      const orderData = {
        orderId: data.data.order_number,
        date: new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }),
        time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        totalAmount: data.data.total_amount,
        paymentMethod: paymentMethod === "bank_transfer" ? "Direct Bank Transfer" : paymentMethod,
        paymentStatus:
          paymentMethod === "bank_transfer"
            ? "Successful"
            : data.data?.payment_status || data.data?.status || "Confirmed",
        bankSlipName: bankSlip ? bankSlip.name : null,
        items: cartProducts,
        subtotal: totalPrice,
        shippingCost: calculatedShippingCost,
        totalWeight: totalWeight,
        totalWeightGrams: totalWeightGrams,
      };

      setCompletedOrderData(orderData);
      setOrderCompleted(true);
      if (typeof window !== "undefined") {
        try {
          localStorage.setItem("lastCompletedOrder", JSON.stringify(orderData));
        } catch (e) {
          console.error(e);
        }
      }
      
      // Clear cart
      setCartProducts([]);
      if (typeof window !== "undefined") {
        localStorage.setItem("cartList", JSON.stringify([]));
      }

      router.push("/shop_order_complete");
    } catch (err) {
      console.error(err);
      setCheckoutError(err.message || "An error occurred while processing your order. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handlePlaceOrder}>
      <div className="checkout-form">
        <div className="billing-info__wrapper">
          {/* PAYMENT METHOD SECTION - TOP OF PAGE */}
          <div className="checkout__payment-methods w-100 mb-4" style={{ width: "100%" }}>
            <h4 className="text-uppercase mb-4">PAYMENT METHOD</h4>

            {/* Direct Bank Transfer */}
            <div className="form-check mb-3">
              <input
                className="form-check-input form-check-input_fill"
                type="radio"
                name="checkout_payment_method"
                id="checkout_payment_method_1"
                checked={paymentMethod === "bank_transfer"}
                onChange={() => setPaymentMethod("bank_transfer")}
              />
              <label
                className="form-check-label w-100"
                htmlFor="checkout_payment_method_1"
              >
                Direct bank transfer
                {paymentMethod === "bank_transfer" && (
                  <>
                    <span className="option-detail d-block text-secondary mt-2 mb-3">
                      Make your payment directly into our bank account. Please use
                      your Order ID as the payment reference. Your order will not
                      be shipped until the funds have cleared in our account.
                    </span>

                    {/* OUR BANK DETAILS CONTAINER */}
                    <div
                      className="bank-details-box p-3 p-md-4 rounded border mt-3"
                      style={{
                        backgroundColor: "#f8f9fa",
                        borderColor: "#e9ecef",
                      }}
                    >
                      <h6
                        className="text-uppercase fw-bold mb-3"
                        style={{
                          letterSpacing: "0.05em",
                          fontSize: "0.85rem",
                          color: "#222",
                        }}
                      >
                        OUR BANK DETAILS
                      </h6>
                      <div className="table-responsive">
                        <table
                          className="table table-borderless table-sm mb-0"
                          style={{ fontSize: "0.875rem" }}
                        >
                          <tbody>
                            <tr>
                              <td
                                className="text-secondary ps-0 py-1"
                                style={{ width: "35%", fontWeight: "500" }}
                              >
                                Bank Name
                              </td>
                              <td className="fw-semibold py-1 text-dark">
                                Commercial Bank of Ceylon PLC
                              </td>
                            </tr>
                            <tr>
                              <td
                                className="text-secondary ps-0 py-1"
                                style={{ fontWeight: "500" }}
                              >
                                Account Name
                              </td>
                              <td className="fw-semibold py-1 text-dark">
                                Endless Greens (PVT) LTD
                              </td>
                            </tr>
                            <tr>
                              <td
                                className="text-secondary ps-0 py-1"
                                style={{ fontWeight: "500" }}
                              >
                                Account Number
                              </td>
                              <td className="fw-semibold py-1 text-dark">
                                1001040897
                              </td>
                            </tr>
                            <tr>
                              <td
                                className="text-secondary ps-0 py-1"
                                style={{ fontWeight: "500" }}
                              >
                                Branch
                              </td>
                              <td className="fw-semibold py-1 text-dark">
                                Piliyandala
                              </td>
                            </tr>
                            {/* <tr>
                              <td
                                className="text-secondary ps-0 py-1"
                                style={{ fontWeight: "500" }}
                              >
                                SWIFT Code
                              </td>
                              <td className="fw-semibold py-1 text-dark">
                                BOCALKLX
                              </td>
                            </tr> */}
                            {/* <tr>
                              <td
                                className="text-secondary ps-0 py-1"
                                style={{ fontWeight: "500" }}
                              >
                                Payment Reference
                              </td>
                              <td className="fw-semibold py-1 text-dark">
                                Use your Order ID as reference
                              </td>
                            </tr> */}
                          </tbody>
                        </table>
                      </div>

                      {/* ATTACH BANK SLIP SECTION */}
                      <div className="bank-slip-upload mt-3 pt-3 border-top">
                        <label
                          htmlFor="bank_slip_file"
                          className="form-label fw-medium text-dark mb-2"
                          style={{ fontSize: "0.875rem" }}
                        >
                          Attach Bank Slip <span className="text-danger">*</span>
                        </label>
                        <input
                          type="file"
                          className="form-control"
                          id="bank_slip_file"
                          accept=".jpg,.jpeg,.png,.pdf"
                          onChange={(e) => setBankSlip(e.target.files[0])}
                          style={{
                            fontSize: "0.875rem",
                            backgroundColor: "#fff",
                            borderColor: "#ced4da",
                          }}
                        />
                        <span
                          className="d-block text-secondary mt-1"
                          style={{ fontSize: "0.75rem" }}
                        >
                          Accepted formats: JPG, PNG, PDF (Max: 5MB)
                        </span>
                      </div>
                    </div>
                  </>
                )}
              </label>
            </div>

            {/* Check Payments */}
            <div className="form-check mb-3 d-none">
              <input
                className="form-check-input form-check-input_fill"
                type="radio"
                name="checkout_payment_method"
                id="checkout_payment_method_2"
                checked={paymentMethod === "check_payments"}
                onChange={() => setPaymentMethod("check_payments")}
              />
              <label
                className="form-check-label"
                htmlFor="checkout_payment_method_2"
              >
                Check payments
                {paymentMethod === "check_payments" && (
                  <span className="option-detail d-block text-secondary mt-2">
                    Phasellus sed volutpat orci. Fusce eget lore mauris vehicula
                    elementum gravida nec dui. Aenean aliquam varius ipsum, non
                    ultricies tellus sodales eu. Donec dignissim viverra nunc,
                    ut aliquet magna posuere eget.
                  </span>
                )}
              </label>
            </div>

            {/* Cash on Delivery */}
            <div className="form-check mb-3">
              <input
                className="form-check-input form-check-input_fill"
                type="radio"
                name="checkout_payment_method"
                id="checkout_payment_method_3"
                checked={paymentMethod === "cash_on_delivery"}
                onChange={() => setPaymentMethod("cash_on_delivery")}
              />
              <label
                className="form-check-label"
                htmlFor="checkout_payment_method_3"
              >
                Cash on delivery
                {paymentMethod === "cash_on_delivery" && (
                  <span className="option-detail d-block text-secondary mt-2">
                    Phasellus sed volutpat orci. Fusce eget lore mauris vehicula
                    elementum gravida nec dui. Aenean aliquam varius ipsum, non
                    ultricies tellus sodales eu. Donec dignissim viverra nunc,
                    ut aliquet magna posuere eget.
                  </span>
                )}
              </label>
            </div>

            {/* Paypal */}
            <div className="form-check mb-3 d-none">
              <input
                className="form-check-input form-check-input_fill"
                type="radio"
                name="checkout_payment_method"
                id="checkout_payment_method_4"
                checked={paymentMethod === "paypal"}
                onChange={() => setPaymentMethod("paypal")}
              />
              <label
                className="form-check-label"
                htmlFor="checkout_payment_method_4"
              >
                Paypal
                {paymentMethod === "paypal" && (
                  <span className="option-detail d-block text-secondary mt-2">
                    Phasellus sed volutpat orci. Fusce eget lore mauris vehicula
                    elementum gravida nec dui. Aenean aliquam varius ipsum, non
                    ultricies tellus sodales eu. Donec dignissim viverra nunc,
                    ut aliquet magna posuere eget.
                  </span>
                )}
              </label>
            </div>
          </div>

          <h4 className="mt-5">BILLING DETAILS</h4>
          <div className="row">
            <div className="col-md-12">
              <div className="form-floating my-3">
                <input
                  type="text"
                  className="form-control"
                  id="checkout_first_name"
                  placeholder="First Name"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  required
                />
                <label htmlFor="checkout_first_name">First Name *</label>
              </div>
            </div>

            <div className="col-md-12">
              <div className="form-floating my-3">
                <input
                  type="text"
                  className="form-control"
                  id="checkout_city"
                  placeholder="Town / City *"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  required
                />
                <label htmlFor="checkout_city">Town / City *</label>
              </div>
            </div>

            <div className="col-md-12">
              <div className="form-floating mt-3 mb-3">
                <input
                  type="text"
                  className="form-control"
                  id="checkout_street_address"
                  placeholder="Street Address *"
                  value={streetAddress}
                  onChange={(e) => setStreetAddress(e.target.value)}
                  required
                />
                <label htmlFor="checkout_street_address">Street Address *</label>
              </div>
            </div>

            <div className="col-md-12">
              <div className="form-floating my-3">
                <input
                  type="text"
                  className="form-control"
                  id="checkout_phone"
                  placeholder="Phone *"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  required
                />
                <label htmlFor="checkout_phone">Phone *</label>
              </div>
            </div>
            <div className="col-md-12">
              <div className="form-floating my-3">
                <input
                  type="email"
                  className="form-control"
                  id="checkout_email"
                  placeholder="Your Mail *"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <label htmlFor="checkout_email">Your Mail (Optional)</label>
              </div>
            </div>
          </div>
          <div className="col-md-12">
            <div className="mt-3">
              <textarea
                className="form-control form-control_gray"
                placeholder="Order Notes (optional)"
                cols="30"
                rows="8"
              ></textarea>
            </div>
          </div>
        </div>
        <div className="checkout__totals-wrapper">
          <div className="sticky-content w-100">
            <div
              className="checkout__totals w-100"
              style={{
                backgroundColor: "#ffffff",
                border: "1px solid #ECE7DE",
                borderRadius: "16px",
                padding: "28px 30px",
                boxShadow: "0 4px 24px rgba(28, 22, 16, 0.04)",
              }}
            >
              <h3
                className="mb-4 pb-3"
                style={{
                  fontFamily: "var(--font-heading), 'Lora', serif",
                  fontSize: "1.35rem",
                  fontWeight: "600",
                  color: "#1E1B18",
                  letterSpacing: "-0.01em",
                  borderBottom: "1px solid #ECE7DE",
                }}
              >
                Your Order
              </h3>

              {/* Table Column Labels */}
              <div
                className="d-flex justify-content-between pb-2 mb-3"
                style={{
                  borderBottom: "1px solid #ECE7DE",
                  fontSize: "0.72rem",
                  fontWeight: "600",
                  letterSpacing: "0.08em",
                  color: "#777169",
                  textTransform: "uppercase",
                }}
              >
                <span>PRODUCT</span>
                <span>SUBTOTAL</span>
              </div>

              {/* Product Items List */}
              <div className="checkout-cart-items-list mb-3">
                {cartProducts.length === 0 ? (
                  <div
                    className="text-center py-4 px-3"
                    style={{
                      backgroundColor: "#FAF8F4",
                      borderRadius: "12px",
                      border: "1px dashed #DDD6CC",
                    }}
                  >
                    <svg
                      width="32"
                      height="32"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="#A0988E"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="mb-2"
                    >
                      <circle cx="9" cy="21" r="1"></circle>
                      <circle cx="20" cy="21" r="1"></circle>
                      <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
                    </svg>
                    <p
                      style={{
                        color: "#777169",
                        fontSize: "0.9rem",
                        margin: "4px 0 10px",
                      }}
                    >
                      Your shopping bag is currently empty.
                    </p>
                    <Link
                      href="/shop-1"
                      className="btn btn-outline-primary btn-sm"
                      style={{
                        borderRadius: "6px",
                        fontSize: "0.8rem",
                        padding: "5px 14px",
                      }}
                    >
                      Continue Shopping
                    </Link>
                  </div>
                ) : (
                  cartProducts.map((elm, i) => {
                    const itemGrams = parseWeightInGrams(
                      elm.weight_grams ?? elm.weight,
                      elm.size,
                      200
                    );
                    const itemKg = (itemGrams / 1000).toFixed(2);
                    const totalItemKg = ((itemGrams * elm.quantity) / 1000).toFixed(2);

                    return (
                      <div
                        key={elm.id ? `${elm.id}-${i}` : i}
                        className="d-flex justify-content-between align-items-center py-3"
                        style={{
                          borderBottom:
                            i === cartProducts.length - 1
                              ? "none"
                              : "1px solid #F0ECE4",
                        }}
                      >
                        <div className="d-flex align-items-center gap-3">
                          <div
                            style={{
                              width: "64px",
                              height: "64px",
                              borderRadius: "8px",
                              overflow: "hidden",
                              flexShrink: 0,
                              backgroundColor: "#FAF8F4",
                              border: "1px solid #ECE7DE",
                              position: "relative",
                            }}
                          >
                            <Image
                              src={elm.imgSrc || "/assets/images/products/product_0.jpg"}
                              alt={elm.title || "Product"}
                              fill
                              sizes="64px"
                              unoptimized
                              style={{ objectFit: "cover" }}
                            />
                          </div>
                          <div>
                            <span
                              className="d-block fw-medium text-dark"
                              style={{
                                fontFamily: "var(--font-heading), 'Lora', serif",
                                fontSize: "0.98rem",
                                fontWeight: "500",
                                color: "#1E1B18",
                                lineHeight: 1.3,
                              }}
                            >
                              {elm.title}
                            </span>
                            <span
                              className="d-block mt-1"
                              style={{ fontSize: "0.78rem", color: "#777169" }}
                            >
                             {elm.size || "L"}
                            </span>
                            <span
                              className="d-block mt-1"
                              style={{ fontSize: "0.78rem", color: "#777169" }}
                            >
                              Weight: {itemKg} kg 
                            </span>

                            {/* Quantity Controls & Remove Action */}
                            <div className="d-flex align-items-center flex-wrap gap-2 mt-2">
                              <div
                                className="d-inline-flex align-items-center"
                                style={{
                                  border: "1px solid #DCD6CC",
                                  borderRadius: "6px",
                                  backgroundColor: "#FAF8F5",
                                  height: "28px",
                                  padding: "0 2px",
                                }}
                              >
                                <button
                                  type="button"
                                  onClick={() => setQuantity(elm.id, elm.quantity - 1, i)}
                                  disabled={elm.quantity <= 1}
                                  aria-label="Reduce quantity"
                                  style={{
                                    width: "24px",
                                    height: "24px",
                                    border: "none",
                                    background: "transparent",
                                    color: elm.quantity <= 1 ? "#C2BBB2" : "#1E1B18",
                                    fontSize: "15px",
                                    fontWeight: "bold",
                                    cursor: elm.quantity <= 1 ? "not-allowed" : "pointer",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    padding: 0,
                                    lineHeight: 1,
                                    transition: "all 0.15s ease",
                                  }}
                                  title={
                                    elm.quantity <= 1
                                      ? "Minimum quantity is 1 (use remove to delete)"
                                      : "Reduce quantity"
                                  }
                                >
                                  −
                                </button>
                                <input
                                  type="number"
                                  min="1"
                                  value={elm.quantity}
                                  onChange={(e) => {
                                    const val = parseInt(e.target.value, 10);
                                    if (!isNaN(val) && val >= 1) {
                                      setQuantity(elm.id, val, i);
                                    }
                                  }}
                                  aria-label="Item quantity"
                                  style={{
                                    width: "32px",
                                    height: "22px",
                                    border: "none",
                                    background: "transparent",
                                    textAlign: "center",
                                    fontSize: "0.82rem",
                                    fontWeight: "600",
                                    color: "#1E1B18",
                                    outline: "none",
                                    padding: 0,
                                    MozAppearance: "textfield",
                                  }}
                                />
                                <button
                                  type="button"
                                  onClick={() => setQuantity(elm.id, elm.quantity + 1, i)}
                                  aria-label="Increase quantity"
                                  style={{
                                    width: "24px",
                                    height: "24px",
                                    border: "none",
                                    background: "transparent",
                                    color: "#1E1B18",
                                    fontSize: "15px",
                                    fontWeight: "bold",
                                    cursor: "pointer",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    padding: 0,
                                    lineHeight: 1,
                                    transition: "all 0.15s ease",
                                  }}
                                  title="Increase quantity"
                                >
                                  +
                                </button>
                              </div>

                              <button
                                type="button"
                                onClick={() => removeItem(elm.id, i)}
                                title="Remove item"
                                style={{
                                  border: "none",
                                  background: "transparent",
                                  color: "#9A938A",
                                  padding: "2px 4px",
                                  fontSize: "0.75rem",
                                  cursor: "pointer",
                                  display: "inline-flex",
                                  alignItems: "center",
                                  gap: "3px",
                                  borderRadius: "4px",
                                  transition: "color 0.15s ease",
                                }}
                                onMouseEnter={(e) => (e.currentTarget.style.color = "#D9534F")}
                                onMouseLeave={(e) => (e.currentTarget.style.color = "#9A938A")}
                              >
                                <svg
                                  width="12"
                                  height="12"
                                  viewBox="0 0 24 24"
                                  fill="none"
                                  stroke="currentColor"
                                  strokeWidth="2"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                >
                                  <polyline points="3 6 5 6 21 6"></polyline>
                                  <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                                </svg>
                                <span>Remove</span>
                              </button>
                            </div>
                          </div>
                        </div>
                        <div
                          className="fw-medium text-end ms-2"
                          style={{
                            fontSize: "0.95rem",
                            color: "#1E1B18",
                            whiteSpace: "nowrap",
                          }}
                        >
                          <div>Rs {elm.price * elm.quantity}</div>
                          {elm.quantity > 1 && (
                            <div
                              style={{
                                fontSize: "0.72rem",
                                color: "#8C857B",
                                fontWeight: 400,
                              }}
                            >
                              Rs {elm.price} each
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  })
                )}
              </div>

              {/* Subtotal Row */}
              <div
                className="d-flex justify-content-between align-items-center py-3 mb-3"
                style={{
                  borderTop: "1px solid #ECE7DE",
                  borderBottom: "1px solid #ECE7DE",
                }}
              >
                <span
                  className="fw-semibold text-uppercase"
                  style={{
                    fontSize: "0.82rem",
                    letterSpacing: "0.05em",
                    color: "#1E1B18",
                  }}
                >
                  SUBTOTAL
                </span>
                <span
                  className="fw-semibold text-dark"
                  style={{ fontSize: "0.95rem", color: "#1E1B18" }}
                >
                  Rs {totalPrice}
                </span>
              </div>

              {/* EXPANDABLE WEIGHT-BASED SHIPPING BREAKDOWN CARD */}
              <div
                className="shipping-calculation-card mb-3 p-3"
                style={{
                  backgroundColor: "#FAF8F4",
                  border: "1px solid #EFEAE1",
                  borderRadius: "12px",
                }}
              >
                <div
                  className="d-flex justify-content-between align-items-center cursor-pointer"
                  onClick={() => setShippingOpen(!shippingOpen)}
                  style={{ cursor: "pointer", userSelect: "none" }}
                >
                  <div className="d-flex align-items-center gap-2">
                    <div
                      className="d-flex align-items-center justify-content-center rounded-circle flex-shrink-0"
                      style={{
                        width: "32px",
                        height: "32px",
                        backgroundColor: "#F3EDE3",
                        color: "#9E805A",
                      }}
                    >
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <rect x="1" y="3" width="15" height="13"></rect>
                        <polygon points="16 8 20 8 23 11 23 16 16 16 16 8"></polygon>
                        <circle cx="5.5" cy="18.5" r="2.5"></circle>
                        <circle cx="18.5" cy="18.5" r="2.5"></circle>
                      </svg>
                    </div>
                    <span
                      className="fw-semibold text-uppercase"
                      style={{
                        fontSize: "0.82rem",
                        letterSpacing: "0.05em",
                        color: "#1E1B18",
                      }}
                    >
                      SHIPPING
                    </span>
                  </div>
                  <div className="d-flex align-items-center gap-2">
                    <span
                      className="fw-bold text-dark"
                      style={{ fontSize: "0.95rem", color: "#1E1B18" }}
                    >
                      {extraSteps > 0
                        ? `Rs ${BASE_SHIPPING_COST} + Rs ${extraSteps * STEP_COST}`
                        : `Rs ${calculatedShippingCost}`}
                    </span>
                    <span
                      style={{
                        display: "inline-flex",
                        alignItems: "center",
                        justifyContent: "center",
                        transition: "transform 0.25s ease",
                        transform: shippingOpen
                          ? "rotate(180deg)"
                          : "rotate(0deg)",
                        color: "#1E1B18",
                      }}
                    >
                      <svg
                        width="14"
                        height="14"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <polyline points="6 9 12 15 18 9"></polyline>
                      </svg>
                    </span>
                  </div>
                </div>

                {shippingOpen && (
                  <div
                    className="shipping-breakdown mt-3 pt-3"
                    style={{ borderTop: "1px solid #EAE4D8" }}
                  >
                    <div
                      className="p-3 bg-white"
                      style={{
                        border: "1px solid #ECE7DE",
                        borderRadius: "10px",
                      }}
                    >
                      {/* Total Weight Row */}
                      <div
                        className="d-flex align-items-center gap-3 pb-3 mb-3"
                        style={{ borderBottom: "1px solid #F0ECE4" }}
                      >
                        <div
                          className="d-flex align-items-center justify-content-center rounded-circle flex-shrink-0"
                          style={{
                            width: "36px",
                            height: "36px",
                            backgroundColor: "#F4EFE6",
                            color: "#9E805A",
                          }}
                        >
                          <svg
                            width="17"
                            height="17"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="1.8"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path>
                            <line x1="3" y1="6" x2="21" y2="6"></line>
                            <path d="M16 10a4 4 0 0 1-8 0"></path>
                          </svg>
                        </div>
                        <div>
                          <div className="d-flex align-items-center gap-1">
                            <span
                              className="fw-medium text-dark"
                              style={{ fontSize: "0.85rem" }}
                            >
                              Total Weight
                            </span>
                            <span
                              className="text-secondary ms-1 cursor-pointer"
                              title={`Base rate up to ${BASE_WEIGHT_GRAMS / 1000}kg: Rs ${BASE_SHIPPING_COST}; +Rs ${STEP_COST} per additional ${STEP_WEIGHT_GRAMS / 1000}kg`}
                              style={{
                                fontSize: "0.75rem",
                                cursor: "help",
                                display: "inline-flex",
                                alignItems: "center",
                              }}
                            >
                              <svg
                                width="13"
                                height="13"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="#9E805A"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              >
                                <circle cx="12" cy="12" r="10"></circle>
                                <line x1="12" y1="16" x2="12" y2="12"></line>
                                <line
                                  x1="12"
                                  y1="8"
                                  x2="12.01"
                                  y2="8"
                                ></line>
                              </svg>
                            </span>
                          </div>
                          <span
                            className="d-block text-secondary mt-1"
                            style={{ fontSize: "0.8rem", color: "#6E6860" }}
                          >
                            {totalWeight} kg ({totalWeightGrams}g)
                          </span>
                        </div>
                      </div>

                      {/* Shipping Cost Row */}
                      <div className="d-flex align-items-center gap-3">
                        <div
                          className="d-flex align-items-center justify-content-center rounded-circle flex-shrink-0"
                          style={{
                            width: "36px",
                            height: "36px",
                            backgroundColor: "#F4EFE6",
                            color: "#9E805A",
                          }}
                        >
                          <svg
                            width="17"
                            height="17"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="1.8"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <rect x="1" y="3" width="15" height="13"></rect>
                            <polygon points="16 8 20 8 23 11 23 16 16 16 16 8"></polygon>
                            <circle cx="5.5" cy="18.5" r="2.5"></circle>
                            <circle cx="18.5" cy="18.5" r="2.5"></circle>
                          </svg>
                        </div>
                        <div>
                          <span
                            className="fw-medium text-dark d-block"
                            style={{ fontSize: "0.85rem" }}
                          >
                            Shipping Cost
                          </span>
                          <span
                            className="d-block text-secondary mt-1"
                            style={{ fontSize: "0.8rem", color: "#6E6860" }}
                          >
                            {totalWeightGrams <= 0
                              ? "No items in cart"
                              : totalWeightGrams < BASE_WEIGHT_GRAMS
                              ? `Rs ${BASE_SHIPPING_COST} (up to 2kg base rate)`
                              : `Rs ${BASE_SHIPPING_COST}  + Rs ${extraSteps * STEP_COST} (${extraSteps} x ${STEP_WEIGHT_GRAMS}g extra)`}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Shipping Cost Summary Line */}
              <div className="d-flex justify-content-between align-items-center py-2 mb-3">
                <span
                  className="fw-semibold text-uppercase"
                  style={{
                    fontSize: "0.8rem",
                    letterSpacing: "0.06em",
                    color: "#1E1B18",
                  }}
                >
                  SHIPPING COST
                </span>
                <span
                  className="fw-bold text-dark"
                  style={{ fontSize: "0.95rem", color: "#1E1B18" }}
                >
                  {extraSteps > 0
                    ? `Rs ${BASE_SHIPPING_COST} + Rs ${extraSteps * STEP_COST}`
                    : `Rs ${calculatedShippingCost}`}
                </span>
              </div>

              {/* TOTAL Highlight Box */}
              <div
                className="d-flex justify-content-between align-items-center p-3 mb-3"
                style={{
                  backgroundColor: "#F7F3EB",
                  border: "1px solid #EBE4D5",
                  borderRadius: "10px",
                }}
              >
                <span
                  className="fw-bold text-uppercase"
                  style={{
                    fontSize: "1rem",
                    letterSpacing: "0.05em",
                    color: "#1E1B18",
                  }}
                >
                  TOTAL
                </span>
                <span
                  className="fw-bold"
                  style={{
                    fontFamily: "var(--font-heading), 'Lora', serif",
                    fontSize: "1.38rem",
                    color: "#9E805A",
                  }}
                >
                  Rs {totalPrice + calculatedShippingCost}
                </span>
              </div>
            </div>

            <div className="policy-text my-3">
              Your personal data will be used to process your order, support
              your experience throughout this website, and for other purposes
              described in our{" "}
              <Link href="/terms" target="_blank">
                privacy policy
              </Link>
              .
            </div>

            {checkoutError && (
              <div
                className="alert alert-danger my-3 p-2 text-center"
                style={{ fontSize: "0.85rem", borderRadius: "6px" }}
              >
                {checkoutError}
              </div>
            )}

            <button
              type="submit"
              className="btn btn-primary btn-checkout d-flex align-items-center justify-content-center gap-2"
              disabled={isSubmitting || cartProducts.length === 0}
            >
              {isSubmitting ? (
                <>
                  <span
                    className="spinner-border spinner-border-sm"
                    role="status"
                    aria-hidden="true"
                  ></span>
                  PROCESSING ORDER...
                </>
              ) : (
                "PLACE ORDER"
              )}
            </button>
          </div>
        </div>
      </div>
    </form>
  );
}
