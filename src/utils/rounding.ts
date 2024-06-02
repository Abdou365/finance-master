/**
 * Rounds a number using different rounding methods.
 *
 * @param number - The number to be rounded.
 * @param method - The rounding method to be used. Possible values are 'standard', 'zero', 'multiple', or 'bankers'.
 * @param multiple - The multiple to be used for the 'multiple' rounding method. Defaults to 1.
 * @param decimals - The number of decimal places to round to. Defaults to 0.
 * @returns The rounded number.
 * @throws Error if an unknown rounding method is provided.
 */
export function intelligentRound(
  number: number,
  method: "standard" | "zero" | "multiple" | "bankers",
  multiple: number = 1,
  decimals: number = 0
): number {
  const factor = Math.pow(10, decimals);

  switch (method) {
    case "standard":
      return Math.round(number * factor) / factor;
    case "zero":
      return number >= 0
        ? Math.floor(number * factor) / factor
        : Math.ceil(number * factor) / factor;
    case "multiple":
      return Math.round((number * factor) / (multiple * factor)) * multiple;
    case "bankers": {
      const isHalf =
        (number * factor) % 1 === 0.5 || (number * factor) % 1 === -0.5;
      if (isHalf) {
        const isEven = Math.floor(number * factor) % 2 === 0;
        return isEven
          ? Math.floor(number * factor) / factor
          : Math.ceil(number * factor) / factor;
      } else {
        return Math.round(number * factor) / factor;
      }
    }
    default:
      throw new Error(
        "Unknown rounding method. Use 'standard', 'zero', 'multiple', or 'bankers'."
      );
  }
}

/**
 * Formats a number by adding suffixes for millions and thousands.
 * @param {number} number - The number to be formatted.
 * @returns {string} The formatted number.
 */
export function formatNumber({ number }: { number: number }): string {
  if (number > 1000000) {
    return `${(number / 1000000).toFixed(2)}M`;
  } else if (number > 1000) {
    return `${(number / 1000).toFixed(2)}K`;
  } else if (number > 1000000000) {
    return `${(number / 1000000000).toFixed(2)}B`;
  } else {
    return number.toFixed(2);
  }
}
