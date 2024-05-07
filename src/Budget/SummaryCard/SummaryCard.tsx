import bem from "bem-ts";
import React from "react";
import "./SummaryCard.scss";

const cx = bem("summary-card");

type SummaryCardProps = {
  title: string;
  result: string;
};

const SummaryCard: React.FC<SummaryCardProps> = ({ title, result }) => {
  return (
    <div className={cx()}>
      <div className={cx("body")}>
        <p className={cx("text")}>{title}</p>
        <h5 className={cx("title")}>{result}</h5>
      </div>

      <div className={cx("image")}>
        <img src="" className="w-full max-h-full object-contain" alt="..." />
      </div>
    </div>
  );
};

export default SummaryCard;
