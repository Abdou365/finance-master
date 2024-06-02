import partition from "lodash/partition";
import sumBy from "lodash/sumBy";
import uniq from "lodash/uniq";

export const filterByDate = ({
  name,
  items,
  separateBy,
  limit,
}: {
  name: string;
  items?: Record<string, any>[];
  separateBy: "year" | "month" | "day";
  limit?: number;
}) => {
  const dates = uniq(
    items?.map((item) => {
      if (separateBy == "year") {
        return new Date(item[name]!).getFullYear().toString();
      } else if (separateBy === "month") {
        return `${new Date(item[name]!).getFullYear().toString()}-${(
          new Date(item[name]!).getMonth() + 1
        )
          .toString()
          .padStart(2, "0")}`;
      } else {
        return `${new Date(item[name]!).getFullYear().toString()}-${(
          new Date(item[name]!).getMonth() + 1
        )
          .toString()
          .padStart(2, "0")}-${(new Date(item[name]!).getDay() + 1)
          .toString()
          .padStart(2, "0")}`;
      }
    })
  )
    .sort((a: any, b: any) => {
      return new Date(b).getTime() - new Date(a).getTime();
    })
    .slice(0, limit || 5);
  const output: Record<string, any> = {};
  const formatted: {
    name: string;
    cashing: number;
    payment: number;
    amt: number;
  }[] = [];
  for (const date of dates) {
    const regex = new RegExp(date);
    const filteredItem = items?.filter((i) => regex.test(i[name]));
    const [cashingList, paymentList] = partition(filteredItem, "isExpense");
    const cashing = sumBy(cashingList, "value");
    const payment = sumBy(paymentList, "value");
    output[date] = filteredItem;
    formatted.push({ name: date, cashing, payment, amt: 0 });
  }

  return { byKey: output, graph: formatted };
};
