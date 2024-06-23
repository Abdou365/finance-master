import React from 'react';
import { Tab } from './TabComponent';
import { twMerge } from 'tailwind-merge';

export const TabItemComponent: React.FC<{ tab: Tab; onSelectTab: (tabName: string) => void; selectedTab: string; }> = ({ tab, onSelectTab, selectedTab }) => {
    const Icon = () => {
        if (tab.icon) {
            return <tab.icon className="h-5 w-5" aria-hidden="true" />;
        }
        return null;
    };
    return <li
        key={tab.name}
        onClick={(e) => {
            e.preventDefault();
            onSelectTab(tab.name);
        }}
        className={twMerge(`inline-flex shrink-0 items-center gap-2 border-b-2 p-4 text-sm font-medium `, 
            selectedTab === tab.name 
            ? 'border-primary-600 text-primary-600 dark:text-primary-300 dark:border-primary-300' 
            : 'border-transparent text-gray-500 hover:border-primary-300 hover:text-primary-500 dark:hover:text-gray-100 dark:text-gray-300 '
        )}
        aria-current={selectedTab === tab.name ? 'page' : undefined}
    >
        <Icon />
        {tab.label || tab.name}
    </li>;
};
