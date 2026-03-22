import React from 'react';
import { INDICES, TOP_GAINERS, TOP_LOSERS, HEATMAP_DATA, DB } from '@/data/stocks';

const SignalRow: React.FC<{ s: string; sig: string; sc: string; p: string; c: string; cf: number; onClick: () => void }> = ({ s, sig, sc, p, c, cf, onClick }) => (
  <div className="flex items-center justify-between py-2.5 border-b border-[rgba(255,255,255,0.025)] cursor-pointer transition-all hover:pl-1.5" onClick={onClick}>
    <div>
      <div className="text-[13px] font-bold flex items-center gap-1.5">
        {s}
        <span className={`text-[9px] px-1.5 py-0.5 rounded font-bold ${sc === 'buy' ? 'bg-fs-green-dim text-fs-green' : sc === 'sell' ? 'bg-fs-red-dim text-fs-red' : 'bg-fs-gold-dim text-fs-gold'}`}>
          {sig}
        </span>
      </div>
      <div className="text-[10px] text-t2 mt-0.5 font-medium">{cf}% confidence</div>
    </div>
    <div className="text-right">
      <div className={`font-mono text-[13px] font-medium ${sc === 'sell' ? 'text-down' : 'text-up'}`}>{p}</div>
      <div className={`font-mono text-[10px] px-1 rounded mt-0.5 inline-block ${sc === 'sell' ? 'bg-down-dim text-down' : 'bg-up-dim text-up'}`}>{c}</div>
    </div>
  </div>
);

export const DashboardPage: React.FC<{ onOpenStock: (sym: string) => void }> = ({ onOpenStock }) => {
  return (
    <div className="flex flex-1 overflow-hidden">
      {/* Left Panel */}
      <div className="w-[228px] surface-1 border-r border-b1 overflow-y-auto flex-shrink-0">
        <div className="p-3.5 border-b border-b0">
          <div className="text-[10px] font-bold tracking-widest uppercase text-t3 mb-3">Indices</div>
          {INDICES.map(i => (
            <div key={i.n} className="flex items-center justify-between py-2.5 border-b border-[rgba(255,255,255,0.025)] cursor-pointer hover:pl-1.5 transition-all" onClick={() => onOpenStock('')}>
              <div className="text-[13px] font-bold">{i.n}</div>
              <div className="text-right">
                <div className={`font-mono text-[13px] font-medium ${i.u ? 'text-up' : 'text-down'}`}>{i.v}</div>
                <div className={`font-mono text-[10px] ${i.u ? 'text-up' : 'text-down'}`}>{i.u ? '▲' : '▼'} {i.c}</div>
              </div>
            </div>
          ))}
        </div>
        <div className="p-3.5 border-b border-b0">
          <div className="text-[10px] font-bold tracking-widest uppercase text-t3 mb-3">Market Pulse</div>
          {[
            { k: 'FII Net', v: '+₹2,340 Cr', cls: 'text-up' },
            { k: 'DII Net', v: '−₹890 Cr', cls: 'text-down' },
            { k: 'India VIX', v: '13.24', cls: 'text-neutral-signal' },
            { k: 'USD/INR', v: '83.42', cls: '' },
            { k: 'Crude Oil', v: '$79.14', cls: 'text-down' },
            { k: 'Gold', v: '₹72,840', cls: 'text-up' },
            { k: 'Adv / Decl', v: '1,847 / 1,102', cls: '' },
          ].map(d => (
            <div key={d.k} className="flex items-center justify-between py-1.5 border-b border-[rgba(255,255,255,0.025)] text-xs">
              <span className="text-t2 font-medium">{d.k}</span>
              <span className={`font-mono font-medium ${d.cls}`}>{d.v}</span>
            </div>
          ))}
        </div>
        <div className="p-3.5">
          <div className="text-[10px] font-bold tracking-widest uppercase text-t3 mb-3">Sentiment</div>
          <div className="flex justify-between text-xs mb-1.5">
            <span className="text-t2 font-medium">Fear & Greed</span>
            <span className="font-mono font-medium text-fs-gold">61 — Greed</span>
          </div>
          <div className="h-1.5 rounded-full bg-gradient-to-r from-fs-red via-fs-gold to-fs-green relative mb-1">
            <div className="absolute -top-1 w-3.5 h-3.5 bg-foreground rounded-full border-2 border-background transform -translate-x-1/2 shadow-lg transition-all" style={{ left: '61%' }} />
          </div>
          <div className="flex justify-between text-[10px] text-t3 mt-1"><span>Fear</span><span>Neutral</span><span>Greed</span></div>
        </div>
      </div>

      {/* Center */}
      <div className="flex-1 overflow-y-auto p-5 flex flex-col gap-4">
        {/* Summary Cards */}
        <div className="grid grid-cols-4 gap-2.5 animate-fade-in-up">
          {[
            { label: 'Portfolio Value', badge: 'LIVE', val: '₹2,48,340', sub: '+₹8,420 today (+3.2%)', cls: 'text-up', glow: 'bg-[rgba(16,217,138,0.08)]' },
            { label: 'Risk Score', val: '65 / 100', sub: 'Moderate · Review IT weight', cls: 'text-neutral-signal', glow: 'bg-[rgba(255,181,71,0.08)]' },
            { label: 'Unrealised P&L', val: '+₹14,200', sub: '4 positions green', cls: 'text-up', glow: 'bg-[rgba(79,110,247,0.08)]' },
            { label: 'Active Alerts', val: '3', sub: '1 SEBI · 2 Risk', cls: 'text-down', glow: 'bg-[rgba(255,71,87,0.08)]' },
          ].map((c, i) => (
            <div key={i} className="surface-2 border border-b1 rounded-2xl p-4 relative overflow-hidden hover:border-b3 hover:-translate-y-px transition-all">
              <div className={`absolute top-0 right-0 w-20 h-20 rounded-full blur-2xl pointer-events-none ${c.glow}`} />
              <div className="text-[11px] text-t2 font-semibold mb-2.5 flex items-center justify-between">
                {c.label}
                {c.badge && <span className="text-[9px] px-1.5 py-0.5 rounded bg-brand-dim text-brand font-bold">{c.badge}</span>}
              </div>
              <div className={`font-mono text-[22px] font-semibold leading-none mb-1.5 ${c.cls}`}>{c.val}</div>
              <div className={`text-[11px] font-mono ${c.cls}`}>{c.sub}</div>
            </div>
          ))}
        </div>

        {/* Movers */}
        <div className="grid grid-cols-2 gap-3 animate-fade-in-up" style={{ animationDelay: '0.05s' }}>
          {[{ title: '↑ Top Gainers', data: TOP_GAINERS, up: true }, { title: '↓ Top Losers', data: TOP_LOSERS, up: false }].map(section => (
            <div key={section.title} className="surface-2 border border-b1 rounded-2xl overflow-hidden">
              <div className="px-4 py-3 border-b border-b0 text-xs font-bold flex items-center gap-2">
                <span className={section.up ? 'text-up' : 'text-down'}>{section.title.charAt(0)}</span> {section.title.slice(2)}
              </div>
              <div className="p-0">
                {section.data.map(m => (
                  <div key={m.s} className="flex items-center justify-between px-4 py-2.5 cursor-pointer hover:bg-[rgba(255,255,255,0.025)] transition-colors" onClick={() => onOpenStock(m.s)}>
                    <div>
                      <div className="text-xs font-bold">{m.s}</div>
                      <div className="text-[10px] text-t2 mt-0.5">{m.n}</div>
                    </div>
                    <div className="text-right">
                      <div className={`font-mono text-xs font-medium ${section.up ? 'text-up' : 'text-down'}`}>{m.p}</div>
                      <div className={`font-mono text-[10px] px-1 rounded mt-0.5 ${section.up ? 'bg-up-dim text-up' : 'bg-down-dim text-down'}`}>{m.c}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Heatmap */}
        <div className="surface-2 border border-b1 rounded-2xl p-4 animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
          <div className="flex items-center justify-between mb-3">
            <div className="text-[13px] font-bold">Sector Heatmap</div>
            <span className="text-[9px] px-1.5 py-0.5 rounded bg-fs-green-dim text-fs-green font-bold flex items-center gap-1">
              <div className="w-1 h-1 rounded-full bg-fs-green animate-pulse-dot" />Today
            </span>
          </div>
          <div className="grid grid-cols-4 gap-1.5">
            {HEATMAP_DATA.map(h => {
              const int = Math.abs(h.pct) / 1.5;
              const isUp = h.pct > 0;
              return (
                <div key={h.n} className="rounded-xl p-3 text-center cursor-pointer transition-all hover:scale-[1.02] border border-transparent"
                  style={{ background: isUp ? `rgba(16,217,138,${0.07 + int * 0.15})` : `rgba(255,71,87,${0.07 + int * 0.15})` }}>
                  <div className="text-xs font-bold">{h.n}</div>
                  <div className={`text-xs font-mono font-semibold mt-1 ${isUp ? 'text-up' : 'text-down'}`}>{h.c}</div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Right Panel */}
      <div className="w-64 surface-1 border-l border-b1 overflow-y-auto flex-shrink-0">
        <div className="p-3.5 border-b border-b0">
          <div className="text-[10px] font-bold tracking-widest uppercase text-t3 mb-3 flex items-center justify-between">
            Research Alerts <span className="text-[9px] px-1.5 py-0.5 rounded bg-fs-red-dim text-fs-red font-bold">14</span>
          </div>
          {[
            { title: 'ADANIENT — Promoter Pledge Alert', body: 'Additional 3.2% shares pledged. Cumulative at 17.8%.', time: '2 min ago', type: 'danger' as const },
            { title: 'RBI Rate Decision', body: 'Repo rate held at 6.5%. Banking sector outlook stable.', time: '47 min ago', type: 'info' as const },
            { title: 'INFY — Q3 Beat', body: 'Operating cash flow +18% YoY. Strong signal.', time: '2 hrs ago', type: 'success' as const },
          ].map((a, i) => (
            <div key={i} className={`p-2.5 rounded-xl border-l-[3px] surface-2 mb-2 text-xs leading-relaxed text-t1 transition-all hover:border-b3
              ${a.type === 'danger' ? 'border-l-fs-red bg-[rgba(255,71,87,0.04)]' : a.type === 'info' ? 'border-l-fs-blue' : 'border-l-fs-green'}`}>
              <div className="font-semibold mb-1">{a.title}</div>
              {a.body}
              <div className="text-[10px] text-t3 mt-1 flex items-center gap-1.5">
                <span>{a.time}</span>
                {a.type === 'danger' && <span className="text-[9px] px-1 py-0.5 rounded bg-fs-red-dim text-fs-red font-bold">HIGH RISK</span>}
              </div>
            </div>
          ))}
        </div>
        <div className="p-3.5">
          <div className="text-[10px] font-bold tracking-widest uppercase text-t3 mb-3">AI Signals</div>
          <SignalRow s="INFY" sig="BUY" sc="buy" p="₹1,842" c="+2.4%" cf={81} onClick={() => onOpenStock('INFY')} />
          <SignalRow s="RELIANCE" sig="BUY" sc="buy" p="₹2,948" c="+1.2%" cf={74} onClick={() => onOpenStock('RELIANCE')} />
          <SignalRow s="HDFCBANK" sig="HOLD" sc="hold" p="₹1,724" c="+0.3%" cf={68} onClick={() => onOpenStock('HDFCBANK')} />
          <SignalRow s="ADANIENT" sig="SELL" sc="sell" p="₹2,540" c="−1.4%" cf={76} onClick={() => onOpenStock('ADANIENT')} />
        </div>
      </div>
    </div>
  );
};
