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
export default function Checkout() {
  const { cartProducts, totalPrice } = useContextElement();
  const [selectedRegion, setSelectedRegion] = useState("");
  const [idDDActive, setIdDDActive] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("bank_transfer");

  return (
    <form onSubmit={(e) => e.preventDefault()}>
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
            <div className="col-md-6">
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
          <div className="sticky-content">
            <div className="checkout__totals">
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
                      <td>${elm.price * elm.quantity}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <table className="checkout-totals">
                <tbody>
                  <tr>
                    <th>SUBTOTAL</th>
                    <td>${totalPrice}</td>
                  </tr>
                  <tr>
                    <th>SHIPPING</th>
                    <td>Free shipping</td>
                  </tr>
                  <tr>
                    <th>VAT</th>
                    <td>${totalPrice && 19}</td>
                  </tr>
                  <tr>
                    <th>TOTAL</th>
                    <td>${totalPrice && totalPrice + 19}</td>
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

            <button className="btn btn-primary btn-checkout">
              PLACE ORDER
            </button>
          </div>
        </div>
      </div>
    </form>
  );
}
