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
import tailwindConfig from "../../../tailwind.config";
import { useItems } from "../../store.tsx/store.ctx";
import { useMemo, useState } from "react";
import { filterByDate } from "../../utils/items.utils";
import { Listbox } from "@headlessui/react";

const ComparisonChart = () => {
  const { items } = useItems();

  const [separateBy, setSeparateBy] = useState<"day" | "month" | "year">(
    "month"
  );
  const data = useMemo(
    () =>
      filterByDate({
        name: "created_at",
        items,
        separateBy,
        limit: 10,
      }).graph,
    [items, separateBy]
  );

  const separateObj = { month: "Month", day: "Day", year: "Year" };

  return (
    <section>
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
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar
              dataKey="payment"
              fill={tailwindConfig.theme.extend.colors.primary[900]}
              stroke={tailwindConfig.theme.extend.colors.primary[900]}
              activeBar={
                <Rectangle
                  fill={tailwindConfig.theme.extend.colors.primary[500]}
                  stroke={tailwindConfig.theme.extend.colors.primary[500]}
                />
              }
            />
            <Bar
              dataKey="cashing"
              fill="transparent"
              stroke={tailwindConfig.theme.extend.colors.primary[900]}
              activeBar={<Rectangle fill="gold" stroke="purple" />}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </section>
  );
};

export default ComparisonChart;
