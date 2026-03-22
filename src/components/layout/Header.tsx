import React from 'react';
import { TICKS } from '@/data/stocks';

export const Header: React.FC<{ onSignOut: () => void; userName?: string }> = ({ onSignOut, userName }) => {
  const tickerHTML = TICKS.map(t => (
    <div key={t.n} className={`flex items-center gap-1.5 px-4 h-[52px] border-r border-b0 whitespace-nowrap`}>
      <span className="text-[10px] text-t2 font-semibold tracking-wide">{t.n}</span>
      <span className={`font-mono text-xs font-medium ${t.u ? 'text-up' : 'text-down'}`}>{t.p}</span>
      <span className={`font-mono text-[10px] px-1 rounded ${t.u ? 'bg-up-dim text-up' : 'bg-down-dim text-down'}`}>
        {t.u ? '▲' : '▼'}{t.c}
      </span>
    </div>
  ));

  return (
    <header className="h-[52px] flex items-center surface-0 border-b border-b1 flex-shrink-0 relative z-50" style={{ backdropFilter: 'blur(20px)' }}>
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-brand to-transparent" />
      <div className="absolute bottom-[-1px] left-0 right-0 h-px bg-gradient-to-r from-transparent via-brand-dim to-transparent" />
      
      <div className="flex items-center gap-2.5 px-5 h-full border-r border-b1 whitespace-nowrap">
        <div className="w-7 h-7 rounded-lg bg-brand flex items-center justify-center flex-shrink-0">
          <svg viewBox="0 0 14 14" fill="none" width="14" height="14"><path d="M7 1L1 4.5v5L7 13l6-3.5v-5L7 1z" fill="#031A14"/><circle cx="7" cy="7" r="1.8" fill="rgba(255,255,255,.5)"/></svg>
        </div>
        <span className="font-serif text-base text-brand">FinSignal Capital</span>
        <span className="text-[9px] font-bold text-brand tracking-widest uppercase ml-1 px-1.5 py-0.5 rounded bg-brand-dim">PRO</span>
      </div>

      <div className="flex-1 overflow-hidden relative">
        <div className="absolute top-0 bottom-0 left-0 w-8 z-10 pointer-events-none bg-gradient-to-r from-[hsl(222,30%,6%)] to-transparent" />
        <div className="absolute top-0 bottom-0 right-0 w-8 z-10 pointer-events-none bg-gradient-to-l from-[hsl(222,30%,6%)] to-transparent" />
        <div className="flex animate-ticker-scroll w-max">
          {tickerHTML}{tickerHTML}
        </div>
      </div>

      <div className="flex items-center border-l border-b1">
        <div className="flex items-center gap-1.5 px-4 h-[52px] text-[11px] text-t2 font-medium border-r border-b1">
          <div className="w-1.5 h-1.5 rounded-full bg-fs-green animate-pulse-dot shadow-[0_0_8px_hsl(var(--fs-green)/0.2)]" />
          NSE · Live
        </div>
        {userName && (
          <div className="flex items-center gap-2 px-4 h-[52px] text-[11px] text-t2 border-r border-b1">
            <div className="w-6 h-6 rounded-md surface-4 flex items-center justify-center text-[10px] font-bold text-t1 border border-b2">
              {userName.charAt(0).toUpperCase()}
            </div>
            <span className="font-medium">{userName}</span>
          </div>
        )}
        <button onClick={onSignOut} className="h-[52px] px-4 flex items-center text-t2 hover:text-t0 transition-colors text-xs font-medium">
          Sign Out
        </button>
      </div>
    </header>
  );
};
