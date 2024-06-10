import React from "react";
import { IconBaseProps, IconType } from "react-icons/lib";
import { twMerge } from "tailwind-merge";

interface BadgeProps {
  type?:
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
}

const badgeClasses: { [key: string]: string } = {
  primary:
    "bg-primary-100 text-primary-700 dark:bg-primary-700 dark:text-primary-200",
  secondary:
    "bg-secondary-100 text-secondary-800 dark:bg-[#202124] dark:text-secondary-400",
  success:
    "bg-success-100 text-success-700 dark:bg-green-950 dark:text-success-500/80",
  danger:
    "bg-danger-100 text-danger-700 dark:bg-[#2c0f14] dark:text-danger-500",
  warning:
    "bg-warning-100 text-warning-800 dark:bg-[#2e2005] dark:text-warning-500",
  info: "bg-info-100 text-info-800 dark:bg-[#11242a] dark:text-info-500",
  light: "bg-neutral-50 text-zinc-600 dark:bg-surface dark:text-neutral-100",
  dark: "bg-neutral-800 text-zinc-100 dark:bg-neutral-800",
};

const Badge: React.FC<BadgeProps> = ({ type = "primary", children, icon }) => {
  const Icon = icon ? (props: IconBaseProps) => icon(props) : null;
  return (
    <span
      className={twMerge(
        `inline-flex gap-1 whitespace-nowrap rounded-[0.27rem] px-[0.65em] pb-[0.25em] pt-[0.35em] text-center align-baseline text-[0.75em] font-bold leading-none ${badgeClasses[type]}`
      )}
    >
      {icon && <Icon />}
      {children}
    </span>
  );
};

export default Badge;
