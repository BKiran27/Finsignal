import React, { useState, useCallback } from 'react';
import { INDICES, TOP_GAINERS, TOP_LOSERS, HEATMAP_DATA, DB } from '@/data/stocks';
import { streamDeepResearch } from '@/lib/streamChat';
import { AIResponseRenderer } from '@/components/AIResponseRenderer';
import { CurrencyWidget } from '@/components/CurrencyWidget';
import { toast } from 'sonner';

const SignalRow: React.FC<{ s: string; sig: string; sc: string; p: string; c: string; cf: number; onClick: () => void }> = ({ s, sig, sc, p, c, cf, onClick }) => (
  <div className="flex items-center justify-between py-2.5 border-b border-[rgba(255,255,255,0.025)] cursor-pointer transition-all hover:pl-1.5 active:scale-[0.99]" onClick={onClick}>
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

/* ── AI Market Intelligence Widget ── */
const MarketIntelligence: React.FC = () => {
  const [analysis, setAnalysis] = useState('');
  const [loading, setLoading] = useState(false);
  const [activeQuery, setActiveQuery] = useState('');

  const runQuery = useCallback(async (label: string, query: string) => {
    setLoading(true);
    setAnalysis('');
    setActiveQuery(label);
    let accumulated = '';
    try {
      await streamDeepResearch({
        messages: [{ role: 'user', content: query }],
        mode: 'macro-outlook',
        onDelta: (text) => { accumulated += text; setAnalysis(accumulated); },
        onDone: () => setLoading(false),
        onError: (err) => { toast.error(err); setLoading(false); },
      });
    } catch { setLoading(false); }
  }, []);

  const QUERIES = [
    { label: '🌍 Global Macro', query: 'Comprehensive global macro outlook and its impact on Indian markets. Cover Fed, ECB, China, commodity prices, and capital flows.' },
    { label: '🇮🇳 India Outlook', query: 'India macro pulse: GDP, inflation, fiscal deficit, RBI policy outlook, and market valuation context. Where are we in the cycle?' },
    { label: '🔄 Sector Rotation', query: 'Which sectors to overweight and underweight in Indian markets right now? Provide sector rotation strategy with catalysts and timelines.' },
    { label: '⚡ Today\'s Strategy', query: 'Market strategy for today: key levels for NIFTY, sector bias, top 3 stock ideas with entry/target/SL. What to watch.' },
  ];

  return (
    <div className="surface-2 border border-b1 rounded-2xl overflow-hidden animate-fade-in-up" style={{ animationDelay: '0.15s' }}>
      <div className="px-4 py-3 border-b border-b0 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-brand animate-pulse-dot" />
          <span className="text-xs font-bold">AI Market Intelligence</span>
        </div>
        <span className="text-[9px] px-2 py-0.5 rounded bg-brand-dim text-brand font-bold">LIVE</span>
      </div>
      <div className="p-3">
        <div className="flex gap-1.5 flex-wrap mb-3">
          {QUERIES.map(q => (
            <button key={q.label} onClick={() => runQuery(q.label, q.query)} disabled={loading}
              className={`px-2.5 py-1.5 rounded-lg text-[10px] font-semibold border transition-all active:scale-95
                ${activeQuery === q.label && loading ? 'bg-brand-dim border-brand text-brand' : 'border-b1 text-t2 hover:border-brand hover:text-brand'}
                disabled:opacity-40`}>
              {q.label}
            </button>
          ))}
        </div>
        {analysis ? (
          <div className="surface-3 border border-b0 rounded-xl p-3 max-h-[280px] overflow-y-auto">
            <AIResponseRenderer content={analysis} loading={loading} />
          </div>
        ) : (
          <div className="surface-3 border border-b0 rounded-xl p-4 text-center text-t3 text-[11px]">
            Click any button above for AI-powered market intelligence
          </div>
        )}
      </div>
    </div>
  );
};

export const DashboardPage: React.FC<{ onOpenStock: (sym: string) => void }> = ({ onOpenStock }) => {
  const buyCount = DB.filter(s => s.sc === 'buy').length;
  const sellCount = DB.filter(s => s.sc === 'sell').length;
  const holdCount = DB.filter(s => s.sc === 'hold').length;
  const avgConfidence = (DB.reduce((s, x) => s + x.cf, 0) / DB.length).toFixed(0);
  const highConviction = DB.filter(s => s.cf >= 75);

  return (
    <div className="flex flex-1 overflow-hidden flex-col md:flex-row">
      {/* Left Panel - Hidden on mobile, shown as top strip */}
      <div className="hidden md:block w-[228px] surface-1 border-r border-b1 overflow-y-auto flex-shrink-0">
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
            { k: '10Y G-Sec', v: '7.12%', cls: '' },
            { k: 'RBI Repo', v: '6.50%', cls: '' },
          ].map(d => (
            <div key={d.k} className="flex items-center justify-between py-1.5 border-b border-[rgba(255,255,255,0.025)] text-xs">
              <span className="text-t2 font-medium">{d.k}</span>
              <span className={`font-mono font-medium ${d.cls}`}>{d.v}</span>
            </div>
          ))}
        </div>
        <div className="p-3.5 border-b border-b0">
          <div className="text-[10px] font-bold tracking-widest uppercase text-t3 mb-3">AI Signal Summary</div>
          <div className="flex gap-2 mb-2">
            <div className="flex-1 surface-3 rounded-lg p-2 text-center border border-b0">
              <div className="font-mono text-lg font-bold text-up">{buyCount}</div>
              <div className="text-[9px] text-t3 font-medium">BUY</div>
            </div>
            <div className="flex-1 surface-3 rounded-lg p-2 text-center border border-b0">
              <div className="font-mono text-lg font-bold text-neutral-signal">{holdCount}</div>
              <div className="text-[9px] text-t3 font-medium">HOLD</div>
            </div>
            <div className="flex-1 surface-3 rounded-lg p-2 text-center border border-b0">
              <div className="font-mono text-lg font-bold text-down">{sellCount}</div>
              <div className="text-[9px] text-t3 font-medium">SELL</div>
            </div>
          </div>
          <div className="text-[10px] text-t3 text-center">Avg Confidence: <span className="text-brand font-mono font-bold">{avgConfidence}%</span></div>
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
      <div className="flex-1 overflow-y-auto p-3 md:p-5 flex flex-col gap-3 md:gap-4">
        {/* Mobile: Indices Strip */}
        <div className="md:hidden flex gap-2 overflow-x-auto pb-1 -mx-1 px-1 scrollbar-none">
          {INDICES.map(i => (
            <div key={i.n} className="surface-2 border border-b1 rounded-xl px-3 py-2 flex-shrink-0 min-w-[120px]">
              <div className="text-[10px] font-bold text-t2">{i.n}</div>
              <div className={`font-mono text-xs font-medium ${i.u ? 'text-up' : 'text-down'}`}>{i.v}</div>
              <div className={`font-mono text-[9px] ${i.u ? 'text-up' : 'text-down'}`}>{i.u ? '▲' : '▼'} {i.c}</div>
            </div>
          ))}
        </div>

        {/* Mobile: Signal summary */}
        <div className="md:hidden grid grid-cols-3 gap-2">
          <div className="surface-2 border border-b1 rounded-xl p-2.5 text-center">
            <div className="font-mono text-lg font-bold text-up">{buyCount}</div>
            <div className="text-[9px] text-t3 font-medium">BUY</div>
          </div>
          <div className="surface-2 border border-b1 rounded-xl p-2.5 text-center">
            <div className="font-mono text-lg font-bold text-neutral-signal">{holdCount}</div>
            <div className="text-[9px] text-t3 font-medium">HOLD</div>
          </div>
          <div className="surface-2 border border-b1 rounded-xl p-2.5 text-center">
            <div className="font-mono text-lg font-bold text-down">{sellCount}</div>
            <div className="text-[9px] text-t3 font-medium">SELL</div>
          </div>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-2.5 animate-fade-in-up">
          {[
            { label: 'Portfolio Value', badge: 'LIVE', val: '₹2,48,340', sub: '+₹8,420 (+3.2%)', cls: 'text-up', glow: 'bg-[rgba(16,217,138,0.08)]' },
            { label: 'Risk Score', val: '65 / 100', sub: 'Moderate', cls: 'text-neutral-signal', glow: 'bg-[rgba(255,181,71,0.08)]' },
            { label: 'Unrealised P&L', val: '+₹14,200', sub: '4 green', cls: 'text-up', glow: 'bg-[rgba(79,110,247,0.08)]' },
            { label: 'Active Alerts', val: '3', sub: '1 SEBI · 2 Risk', cls: 'text-down', glow: 'bg-[rgba(255,71,87,0.08)]' },
          ].map((c, i) => (
            <div key={i} className="surface-2 border border-b1 rounded-2xl p-3 md:p-4 relative overflow-hidden hover:border-b3 hover:-translate-y-px transition-all active:scale-[0.98]">
              <div className={`absolute top-0 right-0 w-20 h-20 rounded-full blur-2xl pointer-events-none ${c.glow}`} />
              <div className="text-[10px] md:text-[11px] text-t2 font-semibold mb-2 flex items-center justify-between">
                {c.label}
                {c.badge && <span className="text-[9px] px-1.5 py-0.5 rounded bg-brand-dim text-brand font-bold">{c.badge}</span>}
              </div>
              <div className={`font-mono text-lg md:text-[22px] font-semibold leading-none mb-1 ${c.cls}`}>{c.val}</div>
              <div className={`text-[10px] md:text-[11px] font-mono ${c.cls}`}>{c.sub}</div>
            </div>
          ))}
        </div>

        {/* Economic Dashboard */}
        <div className="grid grid-cols-3 md:grid-cols-6 gap-1.5 md:gap-2 animate-fade-in-up" style={{ animationDelay: '0.03s' }}>
          {[
            { l: 'GDP Growth', v: '6.8%', s: 'Q3 FY26', c: 'text-up' },
            { l: 'CPI', v: '4.87%', s: 'Feb 2026', c: 'text-neutral-signal' },
            { l: 'IIP', v: '5.2%', s: 'Jan 2026', c: 'text-up' },
            { l: 'PMI Mfg', v: '56.4', s: 'Expansion', c: 'text-up' },
            { l: 'Forex', v: '$648B', s: '+$4.2B', c: 'text-up' },
            { l: 'Fiscal', v: '5.1%', s: 'of GDP', c: 'text-neutral-signal' },
          ].map(d => (
            <div key={d.l} className="surface-2 border border-b1 rounded-xl p-2.5 md:p-3 text-center hover:border-b3 transition-all">
              <div className={`font-mono text-sm md:text-[15px] font-bold ${d.c}`}>{d.v}</div>
              <div className="text-[9px] md:text-[10px] text-t2 font-semibold mt-0.5">{d.l}</div>
              <div className="text-[8px] md:text-[9px] text-t3 mt-0.5">{d.s}</div>
            </div>
          ))}
        </div>

        {/* Movers */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 animate-fade-in-up" style={{ animationDelay: '0.05s' }}>
          {[{ title: '↑ Top Gainers', data: TOP_GAINERS, up: true }, { title: '↓ Top Losers', data: TOP_LOSERS, up: false }].map(section => (
            <div key={section.title} className="surface-2 border border-b1 rounded-2xl overflow-hidden">
              <div className="px-4 py-3 border-b border-b0 text-xs font-bold flex items-center gap-2">
                <span className={section.up ? 'text-up' : 'text-down'}>{section.title.charAt(0)}</span> {section.title.slice(2)}
              </div>
              <div className="p-0">
                {section.data.map(m => (
                  <div key={m.s} className="flex items-center justify-between px-4 py-2.5 cursor-pointer hover:bg-[rgba(255,255,255,0.025)] active:scale-[0.99] transition-all" onClick={() => onOpenStock(m.s)}>
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

        {/* AI Market Intelligence */}
        <MarketIntelligence />

        {/* Currency Comparison */}
        <CurrencyWidget />

        {/* Heatmap */}
        <div className="surface-2 border border-b1 rounded-2xl p-3 md:p-4 animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
          <div className="flex items-center justify-between mb-3">
            <div className="text-[13px] font-bold">Sector Heatmap</div>
            <span className="text-[9px] px-1.5 py-0.5 rounded bg-fs-green-dim text-fs-green font-bold flex items-center gap-1">
              <div className="w-1 h-1 rounded-full bg-fs-green animate-pulse-dot" />Today
            </span>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-1.5">
            {HEATMAP_DATA.map(h => {
              const int = Math.abs(h.pct) / 1.5;
              const isUp = h.pct > 0;
              return (
                <div key={h.n} className="rounded-xl p-2.5 md:p-3 text-center cursor-pointer transition-all hover:scale-[1.02] active:scale-[0.98] border border-transparent"
                  style={{ background: isUp ? `rgba(16,217,138,${0.07 + int * 0.15})` : `rgba(255,71,87,${0.07 + int * 0.15})` }}>
                  <div className="text-[11px] md:text-xs font-bold">{h.n}</div>
                  <div className={`text-[10px] md:text-xs font-mono font-semibold mt-0.5 ${isUp ? 'text-up' : 'text-down'}`}>{h.c}</div>
                </div>
              );
            })}
          </div>
        </div>

        {/* High Conviction Picks */}
        <div className="surface-2 border border-b1 rounded-2xl overflow-hidden animate-fade-in-up" style={{ animationDelay: '0.12s' }}>
          <div className="px-4 py-3 border-b border-b0 flex items-center justify-between">
            <div className="text-xs font-bold">🎯 High Conviction AI Picks</div>
            <span className="text-[9px] px-1.5 py-0.5 rounded bg-brand-dim text-brand font-bold">{highConviction.length}</span>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-px bg-b0">
            {highConviction.slice(0, 6).map(s => (
              <div key={s.s} className="surface-1 p-3 cursor-pointer hover:bg-[rgba(255,255,255,0.03)] active:scale-[0.98] transition-all" onClick={() => onOpenStock(s.s)}>
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-xs font-bold">{s.s}</span>
                  <span className={`text-[9px] px-1.5 py-0.5 rounded font-bold ${s.sc === 'buy' ? 'bg-fs-green-dim text-fs-green' : 'bg-fs-gold-dim text-fs-gold'}`}>{s.sig}</span>
                </div>
                <div className="text-[10px] text-t2 mb-1">{s.sec} · {s.mc}</div>
                <div className="flex items-center justify-between">
                  <span className={`font-mono text-[11px] font-medium ${s.u ? 'text-up' : 'text-down'}`}>₹{s.p.toLocaleString('en-IN')}</span>
                  <span className="font-mono text-[10px] text-brand font-bold">{s.cf}%</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Mobile: Market Pulse */}
        <div className="md:hidden surface-2 border border-b1 rounded-2xl p-3">
          <div className="text-[10px] font-bold tracking-widest uppercase text-t3 mb-2">Market Pulse</div>
          <div className="grid grid-cols-2 gap-x-4 gap-y-1">
            {[
              { k: 'FII Net', v: '+₹2,340 Cr', cls: 'text-up' },
              { k: 'DII Net', v: '−₹890 Cr', cls: 'text-down' },
              { k: 'VIX', v: '13.24', cls: 'text-neutral-signal' },
              { k: 'USD/INR', v: '83.42', cls: '' },
              { k: 'Crude', v: '$79.14', cls: 'text-down' },
              { k: 'Gold', v: '₹72,840', cls: 'text-up' },
            ].map(d => (
              <div key={d.k} className="flex items-center justify-between py-1 text-[11px]">
                <span className="text-t2">{d.k}</span>
                <span className={`font-mono font-medium ${d.cls}`}>{d.v}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right Panel - Hidden on mobile */}
      <div className="hidden lg:block w-64 surface-1 border-l border-b1 overflow-y-auto flex-shrink-0">
        <div className="p-3.5 border-b border-b0">
          <div className="text-[10px] font-bold tracking-widest uppercase text-t3 mb-3 flex items-center justify-between">
            Research Alerts <span className="text-[9px] px-1.5 py-0.5 rounded bg-fs-red-dim text-fs-red font-bold">14</span>
          </div>
          {[
            { title: 'ADANIENT — Promoter Pledge Alert', body: 'Additional 3.2% shares pledged. Cumulative at 17.8%. SEBI monitoring.', time: '2 min ago', type: 'danger' as const },
            { title: 'RBI Rate Decision', body: 'Repo rate held at 6.5%. Neutral stance maintained. Banking outlook stable.', time: '47 min ago', type: 'info' as const },
            { title: 'INFY — Q3 Beat', body: 'Operating cash flow +18% YoY. Margin expansion to 21.3%. Strong signal.', time: '2 hrs ago', type: 'success' as const },
            { title: 'US Fed Minutes', body: 'Hawkish tilt — 2 rate cuts in 2026 vs 4 expected. USD strengthening.', time: '4 hrs ago', type: 'info' as const },
            { title: 'TATASTEEL — Debt Concern', body: 'UK operations continue to bleed. D/E at 2.8x. Monitoring closely.', time: '5 hrs ago', type: 'danger' as const },
          ].map((a, i) => (
            <div key={i} className={`p-2.5 rounded-xl border-l-[3px] surface-2 mb-2 text-xs leading-relaxed text-t1 transition-all hover:border-b3
              ${a.type === 'danger' ? 'border-l-fs-red' : a.type === 'success' ? 'border-l-fs-green' : 'border-l-fs-blue'}`}>
              <div className="font-bold text-t0 mb-0.5">{a.title}</div>
              <div className="text-t2 mb-1">{a.body}</div>
              <div className="text-t3 text-[10px]">{a.time}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
