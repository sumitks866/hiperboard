import React, { ReactElement, ReactNode } from "react";
import Tab, { ITabProps } from "./Tab";

interface IProps {
  children: ReactNode;
  activeTab: string | number;
  onSelect: (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    tabKey: string | number
  ) => void;
}

export default function HorizontalTabs({
  children,
  activeTab,
  onSelect,
}: IProps) {
  const renderTabs = (): ReactElement[] | null | undefined => {
    return React.Children.map(children, (child) => {
      if (React.isValidElement(child) && child.type === Tab) {
        const tab = child as ReactElement<ITabProps>;
        const { tabKey } = tab.props;
        return (
          <button
            key={tabKey}
            onClick={(e) => onSelect(e, tabKey)}
            className={`flex-1 py-2 ${
              activeTab === tabKey
                ? "bg-gray-700 text-white font-semibold"
                : "bg-[#f5f5f5] border-[#f5f5f5] hover:bg-gray-200 hover:border-gray-200"
            }`}
          >
            {tab.props.title}
          </button>
        );
      }
      return null;
    });
  };

  const renderActiveTab = (): React.ReactNode => {
    return React.Children.map(children, (child) => {
      if (React.isValidElement(child) && child.type === Tab) {
        const tab = child as ReactElement<ITabProps>;
        const { tabKey } = tab.props;
        if (tabKey === activeTab) {
          return (
            <div key={tabKey} className="tab-content h-full">
              {tab.props.children}
            </div>
          );
        }
      }
      return null;
    });
  };

  return (
    <div className="horizontal-tab-wrapper w-full h-full">
      <nav className="horizontal-tab-tabs w-full flex">{renderTabs()}</nav>
      <div className="tab-content overflow-auto h-[calc(100%-35.5px)]">
        {renderActiveTab()}
      </div>
    </div>
  );
}
