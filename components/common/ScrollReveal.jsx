"use client";

import React from "react";
import { motion } from "framer-motion";

/**
 * Professional Scroll Reveal Animation Component
 * Smooth GPU-accelerated reveal animations using Framer Motion
 * 
 * Variants:
 * - 'fade-up' (Default): Elegant upward slide with opacity
 * - 'fade-down': Smooth downward slide
 * - 'fade-left': Slide from right to left
 * - 'fade-right': Slide from left to right
 * - 'zoom-in': Subtle scale-up with fade
 * - 'fade': Simple clean fade
 */
const animationVariants = {
  "fade-up": {
    hidden: { opacity: 0, y: 36 },
    visible: { opacity: 1, y: 0 },
  },
  "fade-down": {
    hidden: { opacity: 0, y: -36 },
    visible: { opacity: 1, y: 0 },
  },
  "fade-left": {
    hidden: { opacity: 0, x: 40 },
    visible: { opacity: 1, x: 0 },
  },
  "fade-right": {
    hidden: { opacity: 0, x: -40 },
    visible: { opacity: 1, x: 0 },
  },
  "zoom-in": {
    hidden: { opacity: 0, scale: 0.94 },
    visible: { opacity: 1, scale: 1 },
  },
  fade: {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  },
};

export default function ScrollReveal({
  children,
  variant = "fade-up",
  duration = 0.75,
  delay = 0,
  ease = [0.22, 1, 0.36, 1], // Custom cubic-bezier for luxury/fluid motion
  className = "",
  threshold = 0.15,
  once = true,
  as = "div",
  ...props
}) {
  const selectedVariant = animationVariants[variant] || animationVariants["fade-up"];

  const Component = motion[as] || motion.div;

  return (
    <Component
      initial="hidden"
      whileInView="visible"
      viewport={{ once, amount: threshold }}
      variants={selectedVariant}
      transition={{
        duration,
        delay,
        ease,
      }}
      className={className}
      {...props}
    >
      {children}
    </Component>
  );
}
