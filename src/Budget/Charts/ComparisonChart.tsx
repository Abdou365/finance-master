import { Listbox } from "@headlessui/react";
import { useState } from "react";
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
import { useTheme } from "../../store.tsx/theme.ctx";
import { AccountDashboard } from "../../types/account.type";
import { CustomLegend } from "./CustomLegend";
import { CustomTooltip } from "./CustomTooltip";

const ComparisonChart = ({
  chartData,
}: {
  chartData: AccountDashboard["comparison"];
}) => {
  const { theme } = useTheme();
  const [separateBy, setSeparateBy] = useState<"day" | "month" | "year">(
    "month"
  );
  const data = chartData[separateBy] as {
    name: string;
    cashing: number;
    payment: number;
    amt: number;
  }[];

  const separateObj = { month: "Month", day: "Day", year: "Year" };

  const listboxOptionStyle =
    "py-1 px-2 hover:bg-slate-100 dark:hover:bg-primary-600 active:bg-primary-100 w-40 max-w-full";
  const optionBoxStyle =
    " border absolute p-1 mt-2 bg-gray-50 dark:bg-primary-800 dark:border-primary-600 z-10 cursor-pointer rounded shadow";
  const listBoxButtonStyle = ` border dark:border-transparent dark:bg-primary-800 p-2 dark:border-primary-600   w-40 max-w-full`;
  const ComparisonChartClassanmes =
    "bg-white dark:bg-primary-900 p-2 rounded border dark:border-primary-600";
  return (
    <section className={ComparisonChartClassanmes}>
      <div>
        <Listbox>
          <Listbox.Button className={listBoxButtonStyle}>
            {separateObj[separateBy]}{" "}
          </Listbox.Button>
          <Listbox.Options className={optionBoxStyle}>
            {["month", "day", "year"].map((value) => (
              <Listbox.Option
                className={listboxOptionStyle}
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
      <div className="h-80 flex flex-col p-2">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart width={500} height={300} data={data} maxBarSize={50}>
            <CartesianGrid
              strokeDasharray="3"
              vertical={false}
              horizontal={false}
            />
            <XAxis
              dataKey="name"
              tick={{
                fill:
                  theme === "dark"
                    ? "white"
                    : tailwindConfig.theme.extend.colors.primary[950],
                fontSize: "0.8rem",
              }}
              axisLine={false}
              tickLine={false}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{
                fill:
                  theme === "dark"
                    ? "white"
                    : tailwindConfig.theme.extend.colors.primary[950],
                fontSize: ".8rem",
              }}
            />
            <Tooltip content={CustomTooltip} />
            <Legend name="cashing" content={CustomLegend} />

            <Bar
              radius={3}
              dataKey="payment"
              fill={
                tailwindConfig.theme.extend.colors.primary[
                  theme === "light" ? 800 : 100
                ]
              }
              activeBar={
                <Rectangle
                  fill={
                    tailwindConfig.theme.extend.colors.primary[
                      theme === "light" ? 700 : 200
                    ]
                  }
                />
              }
            />
            <Bar
              dataKey="cashing"
              radius={3}
              fill={
                tailwindConfig.theme.extend.colors.primary[
                  theme === "light" ? 400 : 500
                ]
              }
              activeBar={
                <Rectangle
                  fill={
                    tailwindConfig.theme.extend.colors.primary[
                      theme === "light" ? 300 : 400
                    ]
                  }
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
