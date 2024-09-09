import React from "react";
import { IconBaseProps, IconType } from "react-icons/lib";
import { twJoin } from "tailwind-merge";

interface BadgeProps {
  variant?:
    | "primary"
    | "secondary"
    | "success"
    | "danger"
    | "warning"
    | "info"
    | "light"
    | "dark";
  children: React.ReactNode;
  icon?: IconType;
  className?: string;
}

const badgeClasses: { [key: string]: string } = {
  primary:
    "bg-primary-200 text-primary-800 dark:bg-primary-700 dark:text-primary-200",
  secondary:
    "bg-secondary-200 text-secondary-800 dark:bg-secondary-700 dark:text-secondary-200",
  success: "bg-green-200 text-green-800 dark:bg-green-700 dark:text-green-200",
  danger: "bg-red-200 text-red-800 dark:bg-red-700 dark:text-red-200",
  warning:
    "bg-yellow-200 text-yellow-800 dark:bg-yellow-700 dark:text-yellow-200",
  info: "bg-blue-200 text-blue-800 dark:bg-blue-700 dark:text-blue-200",
  light: "bg-gray-200 text-gray-800 dark:bg-gray-700 dark:text-gray-200",
  dark: "bg-zinc-800 text-zinc-200 dark:bg-zinc-200 dark:text-zinc-800",
};

const Badge: React.FC<BadgeProps> = ({
  variant: variant = "primary",
  children,
  icon,
  className,
}) => {
  const Icon = icon ? (props: IconBaseProps) => icon(props) : null;

  return (
    <span
      className={twJoin(
        className,
        `inline-flex gap-1 whitespace-nowrap rounded-[0.27rem] px-[0.65em] pb-[0.25em] pt-[0.35em] text-center  align-baseline text-[0.75em] font-bold leading-none`,
        badgeClasses[variant]
      )}
    >
      {icon && <Icon />}
      {children}
    </span>
  );
};

export default Badge;
