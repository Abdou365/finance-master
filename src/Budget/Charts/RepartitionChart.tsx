import { Cell, Pie, PieChart, ResponsiveContainer } from "recharts";
import tailwindConfig from "../../../tailwind.config";
import { AccountExpenseRepartition } from "../../types/account.type";

const COLORS = [
  tailwindConfig.theme.extend.colors.primary[300],
  tailwindConfig.theme.extend.colors?.primary[500],
  tailwindConfig.theme.extend.colors?.primary[700],
  tailwindConfig.theme.extend.colors?.primary[900],
];

const RepartitionChart = ({ data }: { data?: AccountExpenseRepartition[] }) => {
  if (!data) {
    return <div>...chargement</div>;
  }
  return (
    <div className="chart-section flex flex-col bg-white border rounded h-1/2 py-6">
      <div className=" flex-1  flex flex-col p-2 gap-2">
        <h3>Réparttion des dépenses</h3>

        <ResponsiveContainer
          height={"100%"}
          width={"100%"}
          className={"border bg-gray-50 rounded"}
        >
          <PieChart onMouseEnter={() => {}}>
            <Pie data={data} innerRadius={40} paddingAngle={5} dataKey="value">
              {data.map((entry, index) => (
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
