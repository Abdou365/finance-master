import { formatNumber, intelligentRound } from "./rounding";

describe("intelligentRound", () => {
  test("standard rounding with decimals", () => {
    expect(intelligentRound(2.555, "standard", 1, 2)).toBe(2.56);
    expect(intelligentRound(2.554, "standard", 1, 2)).toBe(2.55);
  });

  test("round towards zero with decimals", () => {
    expect(intelligentRound(2.555, "zero", 1, 2)).toBe(2.55);
    expect(intelligentRound(-2.555, "zero", 1, 2)).toBe(-2.55);
    expect(intelligentRound(2.999, "zero", 1, 2)).toBe(2.99);
    expect(intelligentRound(-2.999, "zero", 1, 2)).toBe(-2.99);
  });

  test("round to nearest multiple with decimals", () => {
    expect(intelligentRound(27.45, "multiple", 5, 2)).toBe(25);
    expect(intelligentRound(28.75, "multiple", 5, 2)).toBe(30);
    expect(intelligentRound(13.37, "multiple", 4, 2)).toBe(12);
    expect(intelligentRound(15.75, "multiple", 4, 2)).toBe(16);
  });

  test("bankers rounding with decimals", () => {
    expect(intelligentRound(2.555, "bankers", 1, 2)).toBe(2.56);
    expect(intelligentRound(2.565, "bankers", 1, 2)).toBe(2.56);
    expect(intelligentRound(1.555, "bankers", 1, 2)).toBe(1.56);
    expect(intelligentRound(-1.555, "bankers", 1, 2)).toBe(-1.56);
    expect(intelligentRound(-2.555, "bankers", 1, 2)).toBe(-2.56);
    expect(intelligentRound(2.566, "bankers", 1, 2)).toBe(2.57);
  });

  test("unknown method", () => {
    expect(() => intelligentRound(2.5, "unknown" as never)).toThrow(
      "Unknown rounding method. Use 'standard', 'zero', 'multiple', or 'bankers'."
    );
  });
});
test("formatNumber - number greater than 1000000", () => {
  expect(formatNumber({ number: 1500000 })).toBe("1.50M");
  expect(formatNumber({ number: 2500000 })).toBe("2.50M");
});

test("formatNumber - number greater than 1000", () => {
  expect(formatNumber({ number: 1500 })).toBe("1.50K");
  expect(formatNumber({ number: 2500 })).toBe("2.50K");
});

test("formatNumber - number less than or equal to 1000", () => {
  expect(formatNumber({ number: 500 })).toBe("500.00");
  expect(formatNumber({ number: 750 })).toBe("750.00");
});
