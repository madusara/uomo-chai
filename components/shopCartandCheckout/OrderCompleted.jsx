"use client";

import { useContextElement } from "@/context/Context";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import {
  parseWeightInGrams,
  calculateTotalWeightGrams,
  calculateShippingCost,
  BASE_SHIPPING_COST,
  STEP_COST,
  BASE_WEIGHT_GRAMS,
  STEP_WEIGHT_GRAMS,
} from "@/utlis/shipping";

export default function OrderCompleted() {
  const { cartProducts, totalPrice, orderCompleted, setOrderCompleted, completedOrderData } =
    useContextElement();
  const router = useRouter();
  const [showDate, setShowDate] = useState(false);
  const [orderData, setOrderData] = useState(completedOrderData);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setShowDate(true);
    let current = completedOrderData;

    if (!current && typeof window !== "undefined") {
      try {
        const saved = localStorage.getItem("lastCompletedOrder");
        if (saved) {
          current = JSON.parse(saved);
          setOrderData(current);
          if (!orderCompleted) {
            setOrderCompleted(true);
          }
        }
      } catch (e) {
        console.error(e);
      }
    } else if (current) {
      setOrderData(current);
    }

    setIsLoaded(true);

    // Protection: Redirect to cart if order has not been completed and no saved order in localStorage
    if (!current && !orderCompleted && typeof window !== "undefined") {
      router.push("/shop_cart");
    }
  }, [completedOrderData, orderCompleted, router, setOrderCompleted]);

  if (!isLoaded) {
    return (
      <div className="text-center py-5">
        <p className="text-secondary">Loading order details...</p>
      </div>
    );
  }

  if (!orderCompleted && !orderData) {
    return (
      <div className="text-center py-5">
        <p className="text-secondary">Redirecting to cart...</p>
      </div>
    );
  }

  const currentOrder = orderData || completedOrderData;
  const orderId = currentOrder?.orderId || "ORD-20260912-000003";
  const orderDate =
    currentOrder?.date ||
    new Date().toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  const paymentMethodName =
    currentOrder?.paymentMethod || "Direct Bank Transfer";

  const items =
    currentOrder?.items && currentOrder.items.length > 0
      ? currentOrder.items
      : cartProducts && cartProducts.length > 0
      ? cartProducts
      : [];

  const orderSubtotal =
    currentOrder?.subtotal ??
    (items.length > 0
      ? items.reduce(
          (acc, item) =>
            acc + (Number(item.price) || 0) * (Number(item.quantity) || 1),
          0
        )
      : totalPrice || 100);

  const totalWeightGrams =
    currentOrder?.totalWeightGrams ??
    calculateTotalWeightGrams(items);

  const extraSteps =
    totalWeightGrams >= BASE_WEIGHT_GRAMS
      ? Math.max(0, Math.floor(totalWeightGrams / STEP_WEIGHT_GRAMS) - 1)
      : 0;

  const orderShippingCost =
    currentOrder?.shippingCost ??
    (items.length > 0
      ? calculateShippingCost(totalWeightGrams)
      : (currentOrder?.totalAmount && orderSubtotal
          ? Math.max(0, currentOrder.totalAmount - orderSubtotal)
          : 425));

  const displayShippingCost = `Rs ${orderShippingCost}`;

  const finalTotal =
    currentOrder?.totalAmount ??
    (orderSubtotal + (Number(orderShippingCost) || 0));

  // Determine accurate payment status & styling
  const rawPaymentStatus = (
    currentOrder?.paymentStatus ||
    currentOrder?.payment_status ||
    currentOrder?.status ||
    ""
  ).toString().toLowerCase().trim();

  const isBankTransfer =
    paymentMethodName.toLowerCase().includes("bank") ||
    paymentMethodName.toLowerCase().includes("transfer");

  const isCod =
    paymentMethodName.toLowerCase().includes("cash") ||
    paymentMethodName.toLowerCase().includes("cod");

  let displayPaymentStatus = isBankTransfer ? "Successful" : "Confirmed";
  let isPending = false;

  if (isBankTransfer) {
    displayPaymentStatus = "Successful";
    isPending = false;
  } else if (
    rawPaymentStatus === "paid" ||
    rawPaymentStatus === "completed" ||
    rawPaymentStatus === "success" ||
    rawPaymentStatus === "successful"
  ) {
    displayPaymentStatus = "Successful";
    isPending = false;
  } else if (rawPaymentStatus === "confirmed") {
    displayPaymentStatus = "Confirmed";
    isPending = false;
  } else if (
    rawPaymentStatus === "pending" ||
    rawPaymentStatus === "pending verification" ||
    rawPaymentStatus === "unpaid"
  ) {
    displayPaymentStatus = isCod ? "Pending (COD)" : "Pending";
    isPending = true;
  } else if (rawPaymentStatus) {
    displayPaymentStatus =
      rawPaymentStatus.charAt(0).toUpperCase() + rawPaymentStatus.slice(1);
    isPending =
      rawPaymentStatus.includes("pend") || rawPaymentStatus.includes("unpaid");
  } else {
    displayPaymentStatus = isCod ? "Pending (COD)" : "Confirmed";
    isPending = isCod;
  }

  return (
    <div className="order-complete">
      <div className="order-complete__message">
        <svg
          width="80"
          height="80"
          viewBox="0 0 80 80"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle cx="40" cy="40" r="40" fill="#B9A16B" />
          <path
            d="M52.9743 35.7612C52.9743 35.3426 52.8069 34.9241 52.5056 34.6228L50.2288 32.346C49.9275 32.0446 49.5089 31.8772 49.0904 31.8772C48.6719 31.8772 48.2533 32.0446 47.952 32.346L36.9699 43.3449L32.048 38.4062C31.7467 38.1049 31.3281 37.9375 30.9096 37.9375C30.4911 37.9375 30.0725 38.1049 29.7712 38.4062L27.4944 40.683C27.1931 40.9844 27.0257 41.4029 27.0257 41.8214C27.0257 42.24 27.1931 42.6585 27.4944 42.9598L33.5547 49.0201L35.8315 51.2969C36.1328 51.5982 36.5513 51.7656 36.9699 51.7656C37.3884 51.7656 37.8069 51.5982 38.1083 51.2969L40.385 49.0201L52.5056 36.8996C52.8069 36.5982 52.9743 36.1797 52.9743 35.7612Z"
            fill="white"
          />
        </svg>
        <h3>Your order is completed!</h3>
        <p>Thank you. Your order has been received and verified.</p>
      </div>

      <div className="order-info">
        <div className="order-info__item">
          <label>Order Number</label>
          <span>{orderId}</span>
        </div>
        <div className="order-info__item">
          <label>Date</label>
          {showDate && <span>{orderDate}</span>}
        </div>
        <div className="order-info__item">
          <label>Total</label>
          <span>Rs {finalTotal}</span>
        </div>
        <div className="order-info__item">
          <label>Payment Method</label>
          <span className="text-capitalize">{paymentMethodName}</span>
        </div>
      </div>

      <div className="checkout__totals-wrapper">
        <div className="checkout__totals w-100">
          <h3>ORDER DETAILS</h3>
          <table className="checkout-cart-items w-100">
            <thead>
              <tr>
                <th style={{ textAlign: "left" }}>PRODUCT</th>
                <th style={{ textAlign: "right" }}>SUBTOTAL</th>
              </tr>
            </thead>
            <tbody>
              {items.map((elm, i) => {
                const itemGrams = parseWeightInGrams(
                  elm.weight_grams ?? elm.weight,
                  elm.size,
                  200
                );
                const itemKg = (itemGrams / 1000).toFixed(2);

                return (
                  <tr key={i}>
                    <td style={{ padding: "14px 0" }}>
                      <div className="d-flex align-items-start gap-3">
                        <div
                          style={{
                            width: "76px",
                            height: "76px",
                            borderRadius: "10px",
                            overflow: "hidden",
                            flexShrink: 0,
                            backgroundColor: "#FAF8F4",
                            border: "1px solid #ECE7DE",
                            position: "relative",
                          }}
                        >
                          <Image
                            src={
                              elm.imgSrc ||
                              "/assets/images/products/product_0.jpg"
                            }
                            alt={elm.title || "Product"}
                            fill
                            sizes="76px"
                            unoptimized
                            style={{ objectFit: "cover" }}
                          />
                        </div>
                        <div>
                          <span
                            className="d-block fw-medium text-dark"
                            style={{ fontSize: "0.95rem", lineHeight: 1.3 }}
                          >
                            {elm.title}
                          </span>
                          {elm.size && (
                            <span
                              className="d-block text-secondary mt-1"
                              style={{ fontSize: "0.8rem", color: "#777169" }}
                            >
                              Size: {elm.size}
                            </span>
                          )}
                          <span
                            className="d-block text-secondary mt-1"
                            style={{ fontSize: "0.8rem", color: "#777169" }}
                          >
                            Weight: {itemKg} kg
                          </span>
                          <span
                            className="d-block text-secondary mt-1"
                            style={{ fontSize: "0.8rem", color: "#777169" }}
                          >
                            × {elm.quantity}
                          </span>
                        </div>
                      </div>
                    </td>
                    <td
                      style={{
                        textAlign: "right",
                        verticalAlign: "middle",
                        fontWeight: "600",
                        fontSize: "0.95rem",
                      }}
                    >
                      Rs {elm.price * elm.quantity}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          <table className="checkout-totals w-100">
            <tbody>
              <tr>
                <th>SUBTOTAL</th>
                <td style={{ textAlign: "right" }}>Rs {orderSubtotal}</td>
              </tr>
              <tr>
                <th>SHIPPING COST</th>
                <td style={{ textAlign: "right" }}>{displayShippingCost}</td>
              </tr>
              <tr>
                <th style={{ verticalAlign: isBankTransfer ? "top" : "middle", paddingTop: isBankTransfer ? "14px" : "auto" }}>
                  PAYMENT STATUS
                </th>
                <td style={{ textAlign: "right", padding: "10px 0" }}>
                  <div className="d-flex flex-column align-items-end gap-2">
                    <span
                      style={{
                        display: "inline-flex",
                        alignItems: "center",
                        gap: "6px",
                        padding: "5px 14px",
                        borderRadius: "20px",
                        fontSize: "0.82rem",
                        fontWeight: "600",
                        letterSpacing: "0.02em",
                        backgroundColor: isPending ? "#FEF3C7" : "#DCFCE7",
                        color: isPending ? "#92400E" : "#166534",
                        border: isPending ? "1px solid #FDE68A" : "1px solid #BBF7D0",
                      }}
                    >
                      <span
                        style={{
                          width: "7px",
                          height: "7px",
                          borderRadius: "50%",
                          backgroundColor: isPending ? "#D97706" : "#16A34A",
                          display: "inline-block",
                        }}
                      />
                      {displayPaymentStatus}
                    </span>

                    {/* {isBankTransfer && (
                      <div
                        className="d-flex align-items-start gap-2 mt-1 text-start"
                        style={{
                          backgroundColor: "#F0F9FF",
                          border: "1px solid #BAE6FD",
                          borderRadius: "8px",
                          padding: "8px 12px",
                          maxWidth: "340px",
                          fontSize: "0.82rem",
                          color: "#0369A1",
                          lineHeight: 1.4,
                        }}
                      >
                        <svg
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="#0284C7"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          style={{ flexShrink: 0, marginTop: "2px" }}
                        >
                          <circle cx="12" cy="12" r="10" />
                          <line x1="12" y1="16" x2="12" y2="12" />
                          <line x1="12" y1="8" x2="12.01" y2="8" />
                        </svg>
                        <span>
                          We will contact you after referring to your order as soon as possible.
                        </span>
                      </div>
                    )} */}
                  </div>
                </td>
              </tr>
              <tr>
                <th>TOTAL</th>
                <td style={{ textAlign: "right" }} className="fw-bold">
                  Rs {finalTotal}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
