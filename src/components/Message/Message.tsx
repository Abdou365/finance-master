import React from "react";
import { IconType } from "react-icons";
import { twMerge } from "tailwind-merge";

interface AlertMessageProps {
  title: string;
  message: string;
  color?:
    | "primary"
    | "secondary"
    | "green"
    | "red"
    | "yellow"
    | "blue"
    | "indigo"
    | "purple"
    | "pink"
    | "gray"
    | "black"
    | "white"
    | "transparent"
    | "current";
  icon?: IconType;
  className?: string;
}

const AlertMessage: React.FC<AlertMessageProps> = ({
  title,
  message,
  color = "primary",
  icon: Icon,
  className,
}) => {
  return (
    <div
      className={twMerge(
        `bg-${color}-500 bg-opacity-30 rounded  px-4 py-3 `,
        className
      )}
      role="alert"
    >
      <div>
        <p className="font-bold flex items-center">
          {Icon && <Icon className="mr-2 w-5 h-5" />}
          {title}
        </p>
        <p className="text-sm">{message}</p>
      </div>
    </div>
  );
};

export default AlertMessage;
