import { filterByDate } from "./items.utils";

const items = [
  { date: "2024-04-22", name: "John" },
  { date: "2024-04-21", name: "Emily" },
  { date: "2024-03-15", name: "Michael" },
  { date: "2024-02-10", name: "Sophia" },
  { date: "2024-01-05", name: "William" },
  { date: "2023-12-20", name: "Emma" },
  { date: "2023-11-11", name: "James" },
  { date: "2023-10-30", name: "Olivia" },
  { date: "2023-09-25", name: "Alexander" },
  { date: "2023-08-12", name: "Isabella" },
];
const expectedItems = [
  {
    "2024": [
      { date: "2024-04-22", name: "John" },
      { date: "2024-04-21", name: "Emily" },
      { date: "2024-03-15", name: "Michael" },
      { date: "2024-02-10", name: "Sophia" },
      { date: "2024-01-05", name: "William" },
    ],
  },
  {
    "2023": [
      { date: "2023-12-20", name: "Emma" },
      { date: "2023-11-11", name: "James" },
      { date: "2023-10-30", name: "Olivia" },
      { date: "2023-09-25", name: "Alexander" },
      { date: "2023-08-12", name: "Isabella" },
    ],
  },
];

describe("sort items by date", () => {
  it("sort items by date", () => {
    const it = filterByDate("date", items);
    expect(it).toBe(expectedItems);
  });
});
