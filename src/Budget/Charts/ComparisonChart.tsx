import { Listbox } from "@headlessui/react";
import { useMemo, useState } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  Rectangle,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { ContentType } from "recharts/types/component/Tooltip";
import tailwindConfig from "../../../tailwind.config";
import { ItemType } from "../../types/item.type";
import { filterByDate } from "../../utils/items.utils";
import { CustomTooltip } from "./CustomTooltip";
import { CustomLegend } from "./CustomLegend";

const ComparisonChart = ({ items }: { items: ItemType[] }) => {
  const [separateBy, setSeparateBy] = useState<"day" | "month" | "year">(
    "month"
  );
  const data = useMemo(
    () =>
      filterByDate({
        name: "date",
        items,
        separateBy,
        limit: 10,
      }).graph,
    [items, separateBy]
  );

  const separateObj = { month: "Month", day: "Day", year: "Year" };

  return (
    <section className="bg-white p-2 rounded border">
      <div>
        <Listbox>
          <Listbox.Button className={" border p-2  w-40 max-w-full"}>
            {" "}
            {separateObj[separateBy]}{" "}
          </Listbox.Button>
          <Listbox.Options
            className={
              " border absolute p-1 bg-gray-50 z-10 cursor-pointer rounded shadow"
            }
          >
            {["month", "day", "year"].map((value) => (
              <Listbox.Option
                className={
                  "py-1 px-2 hover:bg-slate-100 active:bg-primary-100 w-40 max-w-full"
                }
                key={value}
                value={value}
                onClick={() => setSeparateBy(value)}
              >
                {separateObj[value]}
              </Listbox.Option>
            ))}
          </Listbox.Options>
        </Listbox>
      </div>
      <div className="  h-80 flex flex-col p-2">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart width={500} height={300} data={data}>
            <CartesianGrid strokeDasharray="3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip content={CustomTooltip} />
            <Legend name="cashing" content={CustomLegend} />
            <Bar
              radius={3}
              dataKey="payment"
              fill={tailwindConfig.theme.extend.colors.primary[800]}
              activeBar={
                <Rectangle
                  fill={tailwindConfig.theme.extend.colors.primary[700]}
                />
              }
            />
            <Bar
              dataKey="cashing"
              radius={3}
              fill={tailwindConfig.theme.extend.colors.primary[400]}
              activeBar={
                <Rectangle
                  fill={tailwindConfig.theme.extend.colors.primary[300]}
                />
              }
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </section>
  );
};

export default ComparisonChart;
