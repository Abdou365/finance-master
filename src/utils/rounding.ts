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
