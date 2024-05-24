import React from "react";
import CircleProgress from "../../components/CircleProgress/CircleProgress";
import { intelligentRound } from "../../utils/rounding";

type ObjectifProps = {
  completed?: number;
  length?: number;
  progress?: number;
};

export const ObjectifInfo: React.FC<ObjectifProps> = ({
  completed = 21,
  length = 21,
  progress = 75,
}) => (
  <div className="objectif__info">
    <div className="objectif__circle-progress">
      <div>
        <span className="objectif__progress-number">{completed}</span>
        <span className="objectif__progress-label">/{length}</span>
      </div>
      <span className="objectif__progress-label">Budget respecté</span>
    </div>
    <div>
      <CircleProgress
        size={200}
        strokeWidth={10}
        progress={intelligentRound(progress, "standard", 1, 0)}
      />
    </div>
  </div>
);
