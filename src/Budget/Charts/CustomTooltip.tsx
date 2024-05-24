import { TooltipProps } from "recharts/types/component/Tooltip";
import { intelligentRound } from "../../utils/rounding";
import {
  NameType,
  ValueType,
} from "recharts/types/component/DefaultTooltipContent";

export const CustomTooltip: React.FC<TooltipProps<ValueType, NameType>> = ({
  active,
  payload,
  label,
}) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white rounded p-3 shadow-xl">
        <p className="font-bold">{label}</p>
        {payload.map((entry, index) => (
          <p className="text-sm" key={`item-${index}`}>
            {entry.name}:{" "}
            <span style={{ color: entry.color }} className="font-bold">
              {intelligentRound(entry.value as number, "standard", 1, 2)}€
            </span>
          </p>
        ))}
      </div>
    );
  }

  return null;
};
