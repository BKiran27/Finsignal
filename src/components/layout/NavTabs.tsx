import React from 'react';

const TABS = [
  { id: 'dash', icon: '📊', label: 'Overview' },
  { id: 'analyse', icon: '🔍', label: 'Research' },
  { id: 'screener', icon: '🎯', label: 'Screener' },
  { id: 'portfolio', icon: '💼', label: 'Holdings' },
  { id: 'risk', icon: '🛡️', label: 'Risk' },
  { id: 'allocator', icon: '⚖️', label: 'Allocator' },
  { id: 'advisor', icon: '🤖', label: 'Research Desk' },
];

export const NavTabs: React.FC<{ active: string; onChange: (id: string) => void }> = ({ active, onChange }) => (
  <nav className="flex gap-0.5 surface-0 border-b border-b1 px-5 flex-shrink-0">
    {TABS.map(tab => (
      <button
        key={tab.id}
        onClick={() => onChange(tab.id)}
        className={`flex items-center gap-1.5 px-3.5 h-10 text-xs font-semibold border-b-2 transition-all whitespace-nowrap select-none relative
          ${active === tab.id ? 'text-brand border-brand' : 'text-t2 border-transparent hover:text-t0'}`}
      >
        <span className="text-[13px]">{tab.icon}</span>
        {tab.label}
        {active === tab.id && (
          <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-brand to-transparent" />
        )}
      </button>
    ))}
  </nav>
);
