import React from 'react';

interface Tab {
  id: string;
  label: string;
  icon: string;
}

const tabs: Tab[] = [
  { id: 'dash', label: 'Dashboard', icon: '📊' },
  { id: 'surveillance', label: 'Surveillance', icon: '📡' },
  { id: 'debate', label: 'Agent Debate', icon: '🤖' },
  { id: 'analyse', label: 'Research', icon: '🔬' },
  { id: 'chart', label: 'Chart', icon: '📈' },
  { id: 'screener', label: 'Screener', icon: '🎯' },
  { id: 'portfolio', label: 'Holdings', icon: '💼' },
  { id: 'risk', label: 'Risk', icon: '⚠️' },
  { id: 'allocator', label: 'Allocator', icon: '⚖️' },
  { id: 'advisor', label: 'Advisor', icon: '💡' },
  { id: 'account', label: 'Account', icon: '👤' },
];

export const NavTabs: React.FC<{ active: string; onChange: (tab: string) => void }> = ({ active, onChange }) => {
  return (
    <div className="border-b border-b1 surface-1 overflow-x-auto px-4 flex gap-1">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => onChange(tab.id)}
          className={`px-4 py-3 text-sm font-medium whitespace-nowrap border-b-2 transition-all ${
            active === tab.id
              ? 'border-brand text-brand'
              : 'border-transparent text-t2 hover:text-t1'
          }`}
        >
          <span className="mr-1">{tab.icon}</span>
          {tab.label}
        </button>
      ))}
    </div>
  );
};