import React from "react";
import { IconType } from "react-icons/lib";
import { TabItemComponent } from "./TabItemComponent";

export interface Tab {
  name: string;
  label?: string;
  icon?: IconType;
  content?: React.ReactNode;
}

interface TabComponentProps {
  tabs: Tab[];
  selectedTab: string;
  onSelectTab: (tabName: string) => void;
}

const TabComponent: React.FC<TabComponentProps> = ({
  tabs,
  selectedTab,
  onSelectTab,
}) => {
  const currentTab = tabs.find((tab) => tab.name === selectedTab) || tabs[0];
  return (
    <div>
      <div className="border-b dark:border-b-primary-600">
        <div className="container mx-auto">
          <ul className="flex" aria-label="Tabs">
            {tabs.map((tab) => (
              <TabItemComponent
                key={tab.name}
                tab={tab}
                onSelectTab={onSelectTab}
                selectedTab={selectedTab}
              />
            ))}
          </ul>
        </div>
      </div>

      {currentTab.content && (
        <div
          key={currentTab.name}
          className={`mt-4 ${
            selectedTab === currentTab.name ? "block" : "hidden"
          } container mx-auto`}
        >
          {currentTab.content}
        </div>
      )}
    </div>
  );
};

export default TabComponent;
