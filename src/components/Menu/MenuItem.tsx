import React from 'react';
import { IconType } from 'react-icons/lib';
import { twMerge } from 'tailwind-merge';

export interface MenuItemProps {
  type: 'link' | 'dropdown';
  content: React.ReactNode;
  href?: string;
  icon?: IconType;
  subItems?: MenuItemProps[];
  onClick?: () => void;
}

const MenuItem: React.FC<MenuItemProps> = ({ type, content, href, icon, subItems, onClick }) => {
    const Icon = icon || "div";
    const menuItemStyle = "flex items-center gap-2 rounded px-4 py-2 cursor-pointer hover:bg-primary-100 dark:hover:bg-primary-700 transition duration-300";
  return (
    <div>
      {type === 'link' ? (
        <a
          href={href}
          className={menuItemStyle}
          onClick={onClick}
        >
          <Icon/>
          {typeof content === "string" ? <span className="text-sm font-medium">{content}</span> : <>{content}</>}
        </a>
      ) : (
        <details className="group [&_summary::-webkit-details-marker]:hidden">
          <summary className={twMerge("flex items-center justify-between ", menuItemStyle)}>
            <div className="flex items-center gap-2">
              <Icon />
              <span className="text-sm font-medium">{content}</span>
            </div>
            <span className="shrink-0 transition duration-300 group-open:-rotate-180">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </span>
          </summary>
          <ul>
            {subItems?.map((subItem, subIndex) => (
              <MenuItem key={subIndex} {...subItem} />
            ))}
          </ul>
        </details>
      )}
    </div>
  );
};

export default MenuItem;
