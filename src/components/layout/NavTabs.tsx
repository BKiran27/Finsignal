import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';

const TABS = [
  { id: 'dash', icon: '📊', label: 'Overview' },
  { id: 'analyse', icon: '🔍', label: 'Research' },
  { id: 'screener', icon: '🎯', label: 'Screener' },
  { id: 'portfolio', icon: '💼', label: 'Holdings' },
  { id: 'risk', icon: '🛡️', label: 'Risk' },
  { id: 'allocator', icon: '⚖️', label: 'Allocator' },
  { id: 'advisor', icon: '🤖', label: 'Research Desk' },
];

export const NavTabs: React.FC<{ active: string; onChange: (id: string) => void }> = ({ active, onChange }) => {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <>
      {/* Desktop nav */}
      <nav className="hidden md:flex gap-0.5 surface-0 border-b border-b1 px-5 flex-shrink-0">
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

      {/* Mobile hamburger bar */}
      <div className="md:hidden flex items-center justify-between surface-0 border-b border-b1 px-4 h-11 flex-shrink-0">
        <div className="flex items-center gap-2">
          <span className="text-[13px]">{TABS.find(t => t.id === active)?.icon}</span>
          <span className="text-xs font-semibold text-t0">{TABS.find(t => t.id === active)?.label}</span>
        </div>
        <button onClick={() => setMobileOpen(!mobileOpen)} className="text-t1 p-1.5 rounded-lg hover:surface-2 transition-colors active:scale-95">
          {mobileOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile dropdown */}
      {mobileOpen && (
        <div className="md:hidden absolute top-[calc(52px+44px)] left-0 right-0 z-[100] surface-1 border-b border-b2 shadow-2xl animate-fade-in-up">
          {TABS.map(tab => (
            <button
              key={tab.id}
              onClick={() => { onChange(tab.id); setMobileOpen(false); }}
              className={`flex items-center gap-3 w-full px-5 py-3.5 text-sm font-semibold transition-all active:scale-[0.98]
                ${active === tab.id ? 'text-brand bg-brand-dim' : 'text-t1 hover:surface-2'}`}
            >
              <span className="text-base">{tab.icon}</span>
              {tab.label}
            </button>
          ))}
        </div>
      )}
    </>
  );
};
