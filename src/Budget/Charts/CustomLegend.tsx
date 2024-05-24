import { LegendProps } from "recharts";
import { ContentType } from "recharts/types/component/DefaultLegendContent";
import { twJoin } from "tailwind-merge";
import { intelligentRound } from "../../utils/rounding";

export const CustomLegend: React.FC<LegendProps> = ({ payload }) => {
  return (
    <div className="flex space-x-4">
      {payload &&
        payload.map((entry, index) => (
          <div key={`item-${index}`} className="flex items-center space-x-2">
            <div
              className={twJoin(`w-4 h-4 rounded`)}
              style={{ backgroundColor: entry.color }}
            ></div>
            <span className="text-sm">{entry.value}</span>
          </div>
        ))}
    </div>
  );
};
export const CustomDetailLegend: React.FC<ContentType> = ({ payload }) => {
  return (
    <table>
      <tbody>
        {payload &&
          payload.map((entry, index) => (
            <tr key={`item-${index}`} className="">
              <td>
                <div
                  className=" h-3 w-3 rounded"
                  style={{ background: entry.color }}
                ></div>
              </td>
              <td className="text-sm w-full px-1">{entry.value}</td>
              <td className="text-sm text-right">
                {intelligentRound(
                  entry?.payload?.percent * 100,
                  "standard",
                  1,
                  0
                )}
                %
              </td>
            </tr>
          ))}
      </tbody>
    </table>
  );
};
