import { groupBy, sumBy } from "lodash";
import { useMemo } from "react";
import { Cell, Pie, PieChart, ResponsiveContainer } from "recharts";
import { useItems } from "../../store.tsx/store.ctx";
import tailwindConfig from "../../../tailwind.config";

const COLORS = [
  tailwindConfig.theme.extend.colors.primary[300],
  tailwindConfig.theme.extend.colors?.primary[500],
  tailwindConfig.theme.extend.colors?.primary[700],
  tailwindConfig.theme.extend.colors?.primary[900],
];

const RepartitionChart = () => {
  const { items } = useItems();
  const chartData = useMemo(() => {
    const expenseItems = items.filter((i) => i.isExpense);
    const itemsbyCategory = groupBy(expenseItems, "category");
    const categories = Object.keys(itemsbyCategory);

    return [...categories].map((value) => {
      return { name: value, value: sumBy(itemsbyCategory[value], "value") };
    });
  }, [items]);

  return (
    <div className="chart-section flex flex-col bg-primary-100 rounded-xl h-1/2 py-6">
      <div className=" flex-1  flex flex-col p-2 gap-2">
        <h3>Réparttion des dépenses</h3>

        <ResponsiveContainer
          height={"100%"}
          width={"100%"}
          className={"border bg-primary-200 rounded"}
        >
          <PieChart onMouseEnter={() => {}}>
            <Pie
              data={chartData}
              innerRadius={40}
              // outerRadius={120}
              // fill="#8884d8"
              paddingAngle={5}
              dataKey="value"
            >
              {chartData.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default RepartitionChart;
