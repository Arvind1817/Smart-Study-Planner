import React from 'react';
import { TabType } from '../types';

interface BottomNavBarProps {
  currentTab: TabType;
  onSelectTab: (tab: TabType) => void;
  unreadTasksCount?: number;
}

export const BottomNavBar: React.FC<BottomNavBarProps> = ({
  currentTab,
  onSelectTab,
}) => {
  const tabs: { id: TabType; label: string; icon: string; filledIcon?: string }[] = [
    { id: 'home', label: 'Home', icon: 'dashboard' },
    { id: 'timetable', label: 'Timetable', icon: 'calendar_today' },
    { id: 'tasks', label: 'Tasks', icon: 'check_circle' },
    { id: 'analytics', label: 'Analytics', icon: 'insights' },
  ];

  return (
    <nav
      aria-label="Bottom Navigation"
      className="fixed bottom-0 left-0 w-full z-50 flex justify-around items-center px-4 py-2 max-w-md mx-auto bg-surface border-t border-outline-variant/30 shadow-[0_-4px_16px_rgba(15,23,42,0.04)] left-1/2 -translate-x-1/2"
    >
      {tabs.map((tab) => {
        const isActive = currentTab === tab.id;
        return (
          <button
            key={tab.id}
            onClick={() => onSelectTab(tab.id)}
            type="button"
            className={`flex flex-col items-center justify-center px-3 py-1.5 rounded-xl transition-all duration-150 active:scale-95 cursor-pointer ${
              isActive
                ? 'bg-primary-fixed text-on-primary-fixed font-semibold shadow-xs'
                : 'text-on-surface-variant hover:bg-surface-container'
            }`}
          >
            <span
              className="material-symbols-outlined text-[22px]"
              style={isActive ? { fontVariationSettings: "'FILL' 1" } : undefined}
            >
              {tab.icon}
            </span>
            <span className={`text-[10px] mt-0.5 tracking-wider ${isActive ? 'font-bold' : 'font-medium'}`}>
              {tab.label}
            </span>
          </button>
        );
      })}
    </nav>
  );
};
