import React from "react";
import { twMerge } from "tailwind-merge";
import "./Box.scss";

type ColorOption =
  | "red"
  | "blue"
  | "primary"
  | "green"
  | "yellow"
  | "purple"
  | "pink"
  | "orange"
  | "teal"
  | "indigo";

interface BoxProps {
  color?: ColorOption;
  size?: "small" | "medium" | "large";
  children?: React.ReactNode;
  content?: string;
  variant?: "colored" | "outlined" | "simple";
  className?: string;
}

const BoxComponent: React.FC<BoxProps> = ({
  color = "indigo",
  size = "small",
  children,
  content,
  variant = "simple",
  className: classNames,
}) => {
  // Step 1: Define Tailwind Color Enum

  const boxClassNames = () => {
    if (variant === "simple") {
      return "lk--box-" + variant + "-" + size;
    }
    return `lk--box lk--box-${color}-${variant}-${size}`;
  };

  return (
    <div className={twMerge(`lk--box ${boxClassNames()} ${classNames}`)}>
      {children || content}
    </div>
  );
};

export default BoxComponent;
