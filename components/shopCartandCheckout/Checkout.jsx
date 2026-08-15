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
import { useRouter } from "next/navigation";

export default function Checkout() {
  const {
    cartProducts,
    totalPrice,
    setOrderCompleted,
    setCompletedOrderData,
  } = useContextElement();
  const router = useRouter();

  const [selectedRegion, setSelectedRegion] = useState("");
  const [idDDActive, setIdDDActive] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("bank_transfer");
  const [bankSlip, setBankSlip] = useState(null);
  const [shippingOpen, setShippingOpen] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [checkoutError, setCheckoutError] = useState("");

  // Dynamic weight calculation based on cart items (defaulting to 2.40 kg if demo)
  const totalWeight =
    cartProducts && cartProducts.length > 0
      ? cartProducts
          .reduce(
            (acc, elm) => acc + (elm.weight || 1.2) * (elm.quantity || 1),
            0
          )
          .toFixed(2)
      : "2.40";

  // Dynamic weight-based shipping cost calculation (Weight * Shipping Rate per kg)
  const calculatedShippingCost =
    cartProducts && cartProducts.length > 0
      ? Math.round(parseFloat(totalWeight) * 5)
      : 12;

  const handlePlaceOrder = async (e) => {
    e.preventDefault();

    if (paymentMethod === "bank_transfer" && !bankSlip) {
      setCheckoutError("Please attach your bank slip file before placing the order.");
      return;
    }

    setCheckoutError("");
    setIsSubmitting(true);

    try {
      // Simulate backend API response for order placement
      await new Promise((resolve) => setTimeout(resolve, 1500));

      const orderData = {
        orderId: `ORD-${Math.floor(10000 + Math.random() * 90000)}`,
        date: new Date().toLocaleDateString(),
        totalAmount: (totalPrice || 2000) + calculatedShippingCost + 19,
        paymentMethod: paymentMethod === "bank_transfer" ? "Direct Bank Transfer" : paymentMethod,
        bankSlipName: bankSlip ? bankSlip.name : null,
        items: cartProducts,
      };

      setCompletedOrderData(orderData);
      setOrderCompleted(true);
      router.push("/shop_order_complete");
    } catch (err) {
      setCheckoutError("An error occurred while processing your order. Please try again.");
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
                                Bank of Ceylon
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
                                Your Company (Pvt) Ltd
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
                                1234 5678 9012
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
                                Colombo 07 Branch
                              </td>
                            </tr>
                            <tr>
                              <td
                                className="text-secondary ps-0 py-1"
                                style={{ fontWeight: "500" }}
                              >
                                SWIFT Code
                              </td>
                              <td className="fw-semibold py-1 text-dark">
                                BOCALKLX
                              </td>
                            </tr>
                            <tr>
                              <td
                                className="text-secondary ps-0 py-1"
                                style={{ fontWeight: "500" }}
                              >
                                Payment Reference
                              </td>
                              <td className="fw-semibold py-1 text-dark">
                                Use your Order ID as reference
                              </td>
                            </tr>
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
            <div className="form-check mb-3">
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
            <div className="form-check mb-3">
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
                />
                <label htmlFor="checkout_first_name">First Name</label>
              </div>
            </div>

            <div className="col-md-12">
              <div className="form-floating my-3">
                <input
                  type="text"
                  className="form-control"
                  id="checkout_city"
                  placeholder="Town / City *"
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
                />
                <label htmlFor="checkout_company_name">Street Address *</label>
              </div>
            </div>

            <div className="col-md-12">
              <div className="form-floating my-3">
                <input
                  type="text"
                  className="form-control"
                  id="checkout_phone"
                  placeholder="Phone *"
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
                />
                <label htmlFor="checkout_email">Your Mail *</label>
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
            <div className="checkout__totals w-100">
              <h3>Your Order</h3>
              <table className="checkout-cart-items">
                <thead>
                  <tr>
                    <th>PRODUCT</th>
                    <th>SUBTOTAL</th>
                  </tr>
                </thead>
                <tbody>
                  {cartProducts.map((elm, i) => (
                    <tr key={i}>
                      <td>
                        {elm.title} x {elm.quantity}
                      </td>
                      <td>Rs {elm.price * elm.quantity}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <table className="checkout-totals mb-2">
                <tbody>
                  <tr>
                    <th>SUBTOTAL</th>
                    <td>${totalPrice || 2000}</td>
                  </tr>
                </tbody>
              </table>

              {/* EXPANDABLE WEIGHT-BASED SHIPPING BREAKDOWN */}
              <div
                className="shipping-calculation-card mb-3 p-3 rounded-3"
                style={{
                  backgroundColor: "#f7f5ff",
                  border: "1px solid #eae5f7",
                  borderRadius: "10px",
                }}
              >
                <div
                  className="d-flex justify-content-between align-items-center cursor-pointer"
                  onClick={() => setShippingOpen(!shippingOpen)}
                  style={{ cursor: "pointer", userSelect: "none" }}
                >
                  <span
                    className="fw-semibold text-uppercase"
                    style={{ fontSize: "0.875rem", letterSpacing: "0.03em" }}
                  >
                    SHIPPING
                  </span>
                  <div className="d-flex align-items-center gap-2">
                    <span
                      className="fw-bold text-dark"
                      style={{ fontSize: "0.95rem" }}
                    >
                      ${calculatedShippingCost}
                    </span>
                    <span
                      className="text-secondary"
                      style={{
                        fontSize: "0.75rem",
                        display: "inline-block",
                        transition: "transform 0.2s ease",
                        transform: shippingOpen
                          ? "rotate(180deg)"
                          : "rotate(0deg)",
                      }}
                    >
                      ▲
                    </span>
                  </div>
                </div>

                {shippingOpen && (
                  <div
                    className="shipping-breakdown mt-3 pt-2"
                    style={{ borderTop: "1px solid #e6e0f5" }}
                  >
                    {/* Total Weight Box */}
                    <div
                      className="p-3 mb-2 rounded-3 bg-white d-flex align-items-center justify-content-between"
                      style={{
                        padding: "0.75rem 1rem",
                        backgroundColor: "#ffffff",
                        border: "1px solid #efecf9",
                        borderRadius: "8px",
                      }}
                    >
                      <div className="d-flex align-items-center gap-3">
                        <div
                          className="d-flex align-items-center justify-content-center rounded-circle flex-shrink-0"
                          style={{
                            width: "36px",
                            height: "36px",
                            backgroundColor: "#f0edfd",
                            color: "#6c5ce7",
                          }}
                        >
                          <svg
                            width="18"
                            height="18"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
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
                              title="Shipping is calculated: Total Weight * Shipping Rate per kg"
                              style={{ fontSize: "0.8rem", cursor: "help" }}
                            >
                              <svg
                                width="14"
                                height="14"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="#6c5ce7"
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
                            className="text-secondary d-block"
                            style={{ fontSize: "0.8rem", fontWeight: "600" }}
                          >
                            {totalWeight} kg
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Shipping Cost Box */}
                    <div
                      className="p-3 rounded-3 bg-white d-flex align-items-center justify-content-between"
                      style={{
                        padding: "0.75rem 1rem",
                        backgroundColor: "#ffffff",
                        border: "1px solid #efecf9",
                        borderRadius: "8px",
                      }}
                    >
                      <div className="d-flex align-items-center gap-3">
                        <div
                          className="d-flex align-items-center justify-content-center rounded-circle flex-shrink-0"
                          style={{
                            width: "36px",
                            height: "36px",
                            backgroundColor: "#f0edfd",
                            color: "#6c5ce7",
                          }}
                        >
                          <svg
                            width="18"
                            height="18"
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
                        <div>
                          <span
                            className="fw-medium text-dark d-block"
                            style={{ fontSize: "0.85rem" }}
                          >
                            Shipping Cost
                          </span>
                          <span
                            className="text-secondary d-block"
                            style={{ fontSize: "0.75rem" }}
                          >
                            Calculated based on total weight
                          </span>
                        </div>
                      </div>
                      <span
                        className="fw-bold text-dark ms-2"
                        style={{ fontSize: "0.9rem" }}
                      >
                        ${calculatedShippingCost}
                      </span>
                    </div>
                  </div>
                )}
              </div>

              <table className="checkout-totals">
                <tbody>
                  <tr>
                    <th>VAT</th>
                    <td>${totalPrice ? 19 : 19}</td>
                  </tr>
                  <tr>
                    <th>TOTAL</th>
                    <td>
                      $
                      {(totalPrice || 2000) + calculatedShippingCost + 19}
                    </td>
                  </tr>
                </tbody>
              </table>
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
              disabled={isSubmitting}
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
