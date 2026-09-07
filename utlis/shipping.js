/**
 * Shipping Cost & Weight Utilities
 * 
 * Shipping Rate Rules:
 * - Weights < 2000g (under 2kg) = Base shipping of Rs 425
 * - Weights >= 2000g:
 *     - 2000g - 2999g = Rs 525 (1 extra step of 1000g)
 *     - 3000g - 3999g = Rs 625 (2 extra steps of 1000g)
 *     - Each additional 1000g = + Rs 100
 * - Empty cart (0g) = Rs 0
 */

export const BASE_SHIPPING_COST = 425; // Rs 425 for weight < 2000g
export const BASE_WEIGHT_GRAMS = 2000; // 2000g (2kg) threshold where step costs begin
export const STEP_WEIGHT_GRAMS = 1000; // 1000g (1kg) step size
export const STEP_COST = 100; // Rs 100 per step

/**
 * Safely parses any weight input into normalized grams.
 * Auto-detects whether the input was in kg (< 10) or grams (>= 10),
 * or extracts from size string (e.g., "100 ml", "500ml", "1L") if weight is missing.
 *
 * @param {number|string|null} rawWeight 
 * @param {string|null} sizeString 
 * @param {number} fallbackGrams 
 * @returns {number} Weight in grams
 */
export function parseWeightInGrams(rawWeight, sizeString = "", fallbackGrams = 200) {
  const num = Number(rawWeight);
  if (!isNaN(num) && num > 0) {
    // If entered as kilograms (e.g. 0.1, 0.5, 1.2), convert to grams
    if (num < 10) {
      return Math.round(num * 1000);
    }
    // Already in grams (e.g. 100, 150, 500)
    return Math.round(num);
  }

  // Attempt to extract from bottle size string if present (e.g. "100 ml" -> 100g, "1 L" -> 1000g)
  if (typeof sizeString === "string" && sizeString.trim().length > 0) {
    const clean = sizeString.trim().toLowerCase();
    if (clean.includes("l") && !clean.includes("ml")) {
      const liters = parseFloat(clean);
      if (!isNaN(liters) && liters > 0) {
        return Math.round(liters * 1000);
      }
    }
    const parsed = parseInt(clean, 10);
    if (!isNaN(parsed) && parsed > 0) {
      return parsed;
    }
  }

  return fallbackGrams;
}

/**
 * Calculates total cart weight in grams.
 *
 * @param {Array} cartProducts 
 * @returns {number} Total weight in grams
 */
export function calculateTotalWeightGrams(cartProducts) {
  if (!Array.isArray(cartProducts) || cartProducts.length === 0) {
    return 0;
  }

  return cartProducts.reduce((acc, item) => {
    const itemGrams = parseWeightInGrams(
      item?.weight ?? item?.variant_weight,
      item?.size,
      200
    );
    const qty = Math.max(1, Number(item?.quantity) || 1);
    return acc + itemGrams * qty;
  }, 0);
}

/**
 * Calculates shipping cost based on weight in grams.
 *
 * @param {number} totalWeightGrams 
 * @returns {number} Shipping cost in Rs
 */
export function calculateShippingCost(totalWeightGrams) {
  if (!totalWeightGrams || totalWeightGrams <= 0) {
    return 0;
  }

  if (totalWeightGrams < BASE_WEIGHT_GRAMS) {
    return BASE_SHIPPING_COST;
  }

  // At 2000g: floor(2000 / 1000) - 1 = 1 extra step (+ Rs 100) -> Rs 525
  // At 3000g: floor(3000 / 1000) - 1 = 2 extra steps (+ Rs 200) -> Rs 625
  const extraSteps = Math.floor(totalWeightGrams / STEP_WEIGHT_GRAMS) - 1;
  return BASE_SHIPPING_COST + Math.max(0, extraSteps) * STEP_COST;
}

/**
 * Returns a comprehensive shipping summary object for UI display and checkout payload.
 *
 * @param {Array|number} cartProductsOrWeightGrams 
 * @returns {Object}
 */
export function getShippingBreakdown(cartProductsOrWeightGrams) {
  const totalWeightGrams = Array.isArray(cartProductsOrWeightGrams)
    ? calculateTotalWeightGrams(cartProductsOrWeightGrams)
    : Number(cartProductsOrWeightGrams) || 0;

  const totalWeightKg = (totalWeightGrams / 1000).toFixed(2);
  const cost = calculateShippingCost(totalWeightGrams);
  const isBaseTier = totalWeightGrams > 0 && totalWeightGrams < BASE_WEIGHT_GRAMS;
  const extraSteps = totalWeightGrams >= BASE_WEIGHT_GRAMS
    ? Math.max(0, Math.floor(totalWeightGrams / STEP_WEIGHT_GRAMS) - 1)
    : 0;

  return {
    totalWeightGrams,
    totalWeightKg,
    shippingCost: cost,
    isBaseTier,
    extraSteps,
    baseCost: BASE_SHIPPING_COST,
    stepCost: STEP_COST,
  };
}
