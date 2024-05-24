import bem from "bem-ts";
import React from "react";
import { FaArrowDown } from "react-icons/fa";
import { IconType } from "react-icons/lib";
import { twMerge } from "tailwind-merge";
import AnimatedNumber from "../../components/AnimatedNumber";
import "./SummaryCard.scss";

const cx = bem("summary-card");

type SummaryCardProps = {
  title: string;
  result: number;
  index: number;
  icon?: IconType;
  variant?: "positive" | "negative" | "neutral";
};

const SummaryCard: React.FC<SummaryCardProps> = ({
  title,
  result,
  index,
  icon,
  variant = "neutral",
}) => {
  const Icon = icon || FaArrowDown;
  return (
    <div className={cx()}>
      <div className={cx("body")}>
        <p className={cx("text")}>{title}</p>
        <div className="flex items-baseline">
          {icon && (
            <Icon
              className={twMerge(
                variant === "negative"
                  ? "text-red-500"
                  : variant === "positive"
                  ? "text-green-500"
                  : "text-gray-500"
              )}
            />
          )}
          <AnimatedNumber
            delay={index * 1 * 1000}
            duration={1000}
            className={cx("title")}
            value={result}
            withSign
          />
        </div>
      </div>

      <div className={cx("image")}>
        <img src="" className="w-full max-h-full object-contain" alt="..." />
      </div>
    </div>
  );
};

export default SummaryCard;
