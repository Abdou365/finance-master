import React, { ReactNode } from "react";

interface ButtonProps extends React.HTMLAttributes<HTMLButtonElement> {
  color?:
    | "black"
    | "white"
    | "gray"
    | "red"
    | "orange"
    | "yellow"
    | "green"
    | "teal"
    | "blue"
    | "indigo"
    | "purple"
    | "primary"
    | "secondary"
    | "pink";
  variant?: "solid" | "outlined" | "link";
  size?: "small" | "medium" | "large";
  children: ReactNode;
}

const Button: React.FC<ButtonProps> = ({
  color = "primary",
  variant = "solid",
  size = "medium",
  children,
  ...props
}) => {
  const classes = `btn-${color} btn-${color}-${variant} btn-${size} flex items-center justify-center gap-2 px-4 py-2  font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-${color}-500`;

  return (
    <button {...props} className={classes}>
      {children}
    </button>
  );
};

export default Button;
