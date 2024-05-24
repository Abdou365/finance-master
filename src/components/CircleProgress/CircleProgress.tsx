import React, { useState, useEffect } from "react";
import "./CircleProgress.scss"; // Import SCSS file for styles

interface CircleProgressProps {
  size: number;
  strokeWidth: number;
  progress: number;
}

const CircleProgress: React.FC<CircleProgressProps> = ({
  size,
  strokeWidth,
  progress,
}) => {
  const radius = size / 2 - strokeWidth / 2;
  const circumference = 2 * Math.PI * radius;
  const [offset, setOffset] = useState(circumference);

  useEffect(() => {
    const newOffset = circumference - (progress / 100) * circumference;
    setOffset(newOffset);
  }, [circumference, progress, size, strokeWidth]);

  return (
    <svg
      className="circle-progress"
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
    >
      <circle
        className="circle-progress-background stroke-current"
        cx={size / 2}
        cy={size / 2}
        r={size / 2 - strokeWidth / 2}
        strokeWidth={strokeWidth}
      />
      <circle
        className="circle-progress-progress stroke-current"
        cx={size / 2}
        cy={size / 2}
        r={size / 2 - strokeWidth / 2}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeDasharray={2 * Math.PI * (size / 2 - strokeWidth / 2)}
        strokeDashoffset={offset}
      />
      <text
        x="50%"
        y="50%"
        className="circle-progress-text"
        dominantBaseline="middle"
        textAnchor="middle"
      >
        {`${progress}%`}
      </text>
    </svg>
  );
};

export default CircleProgress;
