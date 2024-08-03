import React from "react";
import PieChartWithNeedle from "../../components/PieChartWithNeedle/PieChartWithNeedle";
import { theme } from "../../utils/tailwind";
import BoxComponent from "../../components/Box/BoxComponent";

const data = [
  { name: "Score faible 😒", value: 100 / 3, color: theme.colors.red[500] },
  { name: "Score bon 😊", value: 100 / 3, color: theme.colors.yellow[500] },
  { name: "Score très bon 😍", value: 100 / 3, color: theme.colors.green[500] },
];

type ObjectifProps = {
  completed?: number;
  length?: number;
  progress?: number;
};

export const ObjectifInfo: React.FC<ObjectifProps> = ({
  completed = 21,
  length = 21,
  progress = 0,
}) => (
  <BoxComponent className="sm:min-w-80">
    <div className="objectif__circle-progress">
      <div>
        <span className="objectif__progress-number">{completed}</span>
        <span className="objectif__progress-label">/{length}</span>
      </div>
      <span className="objectif__progress-label">Objectifs atteints</span>
    </div>
    <PieChartWithNeedle data={data} value={progress} />
  </BoxComponent>
);
