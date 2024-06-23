import {
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
import tailwindConfig from "../../../tailwind.config";
import { AccountExpenseRepartition } from "../../types/account.type";
import { CustomTooltip } from "./CustomTooltip";
import { CustomDetailLegend, CustomLegend } from "./CustomLegend";
import BoxComponent from "../../components/Box/BoxComponent";

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
    <BoxComponent className="chart-section flex flex-col h-1/2">
      <div className=" flex-1  flex flex-col p-2 gap-2">
        <h3 className="font-bold text-lg">Répartition des dépenses</h3>

        <ResponsiveContainer
          height={"100%"}
          minHeight={500}
          width={"100%"}
          className={
            "border dark:border-none bg-gray-50 dark:bg-primary-950 rounded"
          }
        >
          <PieChart onMouseEnter={() => {}}>
            <Pie
              data={data}
              innerRadius={"50%"}
              paddingAngle={5}
              dataKey="value"
            >
              {data.map((entry, index) => (
                <Cell
                  stroke="none"
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
            <Tooltip content={CustomTooltip} />
            <Legend content={CustomDetailLegend} />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </BoxComponent>
  );
};

export default RepartitionChart;
