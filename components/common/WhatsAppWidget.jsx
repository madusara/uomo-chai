"use client";

import { useEffect, useState } from "react";
import { WHATSAPP_CONFIG } from "@/config/whatsapp.config";
import styles from "./WhatsAppWidget.module.scss";

export default function WhatsAppWidget() {
  const [isAnimating, setIsAnimating] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);

  useEffect(() => {
    let retriggerTimeout;
    let animationTimeout;
    let hideTooltipTimeout;

    const runCycle = () => {
      setIsAnimating(true);
      // Force class re-toggle so tooltip animation reliably restarts each cycle.
      setShowTooltip(false);

      retriggerTimeout = setTimeout(() => {
        setShowTooltip(true);
      }, 50);

      animationTimeout = setTimeout(() => {
        setIsAnimating(false);
      }, 1000);

      hideTooltipTimeout = setTimeout(() => {
        setShowTooltip(false);
      }, 5000);
    };

    const interval = setInterval(runCycle, WHATSAPP_CONFIG.animationInterval);

    return () => {
      clearInterval(interval);
      clearTimeout(retriggerTimeout);
      clearTimeout(animationTimeout);
      clearTimeout(hideTooltipTimeout);
    };
  }, []);

  const handleClick = () => {
    const whatsappUrl = `https://wa.me/${WHATSAPP_CONFIG.phoneNumber}?text=${encodeURIComponent(
      WHATSAPP_CONFIG.defaultMessage
    )}`;
    window.open(whatsappUrl, "_blank");
    setShowTooltip(false);
  };

  return (
    <div className={styles.whatsappWidget}>
      <div className={`${styles.tooltip} ${showTooltip ? styles.show : ""}`}>
        <div className={styles.tooltipContent}>
          <div className={styles.tooltipHeader}>
            <span className={styles.waveEmoji}>👋</span>
            <span className={styles.greeting}>{WHATSAPP_CONFIG.greeting}</span>
          </div>
          <p className={styles.message}>{WHATSAPP_CONFIG.contactMessage}</p>
          <p className={styles.submessage}>Let's chat - we're here to help!</p>
        </div>
        <div className={styles.tooltipArrow}></div>
      </div>

      <button
        type="button"
        className={`${styles.whatsappButton} ${isAnimating ? styles.animate : ""}`}
        onClick={handleClick}
        aria-label="Contact us on WhatsApp"
        title="Contact us on WhatsApp"
      >
        <div className={styles.pulseRing}></div>
        <svg
          className={styles.whatsappIcon}
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M20.52 3.48A11.86 11.86 0 0 0 12.03 0C5.41 0 .03 5.38.03 12c0 2.11.55 4.17 1.59 6L0 24l6.16-1.61a11.96 11.96 0 0 0 5.86 1.5h.01c6.62 0 12-5.38 12-12 0-3.2-1.25-6.2-3.51-8.41ZM12.03 21.86h-.01a9.9 9.9 0 0 1-5.04-1.37l-.36-.21-3.65.95.97-3.56-.24-.37a9.9 9.9 0 0 1-1.52-5.3c0-5.47 4.45-9.92 9.92-9.92a9.86 9.86 0 0 1 7.02 2.91 9.86 9.86 0 0 1 2.9 7.02c0 5.47-4.45 9.92-9.92 9.92Z"
            fill="white"
          />
          <path
            d="M17.47 14.38c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.17-.17.2-.35.22-.64.07-.3-.15-1.26-.46-2.4-1.48-.88-.78-1.48-1.76-1.65-2.06-.17-.3-.02-.46.13-.61.14-.13.3-.35.45-.52.15-.18.2-.3.3-.5.1-.2.05-.37-.03-.52-.07-.15-.67-1.61-.92-2.21-.24-.58-.49-.5-.67-.51-.17-.01-.37-.01-.57-.01-.2 0-.52.08-.79.37-.27.3-1.04 1.02-1.04 2.48 0 1.46 1.07 2.88 1.22 3.08.14.2 2.1 3.2 5.08 4.49.71.3 1.26.49 1.69.62.71.23 1.36.2 1.88.12.57-.08 1.76-.72 2.01-1.42.25-.69.25-1.29.17-1.41-.07-.13-.27-.2-.57-.35Z"
            fill="white"
          />
        </svg>
      </button>
    </div>
  );
}
