import React from 'react';
import { usePortfolio } from '@/contexts/PortfolioContext';
import { PRICES, DB } from '@/data/stocks';

export const RiskPage: React.FC = () => {
  const { portfolio } = usePortfolio();
  const total = portfolio.reduce((s, h) => { const p = PRICES[h.sym] || h.avg * 1.05; return s + p * h.qty; }, 0) || 248340;

  const secM: Record<string, number> = {};
  const symM: Record<string, number> = {};
  portfolio.forEach(h => { const p = PRICES[h.sym] || h.avg * 1.05; const v = p * h.qty; secM[h.sec] = (secM[h.sec] || 0) + v; symM[h.sym] = (symM[h.sym] || 0) + v; });

  const secs = portfolio.length ? Object.entries(secM).sort((a, b) => b[1] - a[1]).slice(0, 6) : [['IT', 84123], ['Banking', 62084], ['Auto', 52340], ['Energy', 32141]] as [string, number][];
  const syms = portfolio.length ? Object.entries(symM).sort((a, b) => b[1] - a[1]).slice(0, 6) : [['INFY', 52340], ['RELIANCE', 48120], ['TATAMOTORS', 38240], ['HDFCBANK', 32140]] as [string, number][];
  const t = portfolio.length ? total : 248340;

  const topSec = secs.length ? (secs[0][1] / t) * 100 : 34;
  const topSym = syms.length ? (syms[0][1] / t) * 100 : 21;
  let sc = 35;
  if (topSec > 30) sc += 22; else if (topSec > 20) sc += 12;
  if (topSym > 20) sc += 16; else if (topSym > 10) sc += 8;
  sc = Math.min(92, Math.max(18, sc));

  const riskColor = sc > 65 ? 'hsl(var(--fs-red))' : sc > 40 ? 'hsl(var(--fs-gold))' : 'hsl(var(--fs-green))';
  const dashOffset = 440 - (sc / 100) * 440;
  const warn = (p: number) => p > 25 ? 'text-fs-red' : p > 15 ? 'text-fs-gold' : 'text-fs-green';
  const warnBg = (p: number) => p > 25 ? 'bg-fs-red' : p > 15 ? 'bg-fs-gold' : 'bg-fs-green';
  const f = (v: number) => '−₹' + Math.round(Math.abs(v)).toLocaleString('en-IN');

  return (
    <div className="flex-1 overflow-hidden" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr' }}>
      <div className="overflow-y-auto p-5 flex flex-col gap-3.5 border-r border-b1">
        {/* Risk Score Ring */}
        <div className="surface-2 border border-b1 rounded-3xl p-6 text-center relative overflow-hidden animate-fade-in-up">
          <div className="absolute -top-10 left-1/2 -translate-x-1/2 w-[200px] h-[200px] rounded-full pointer-events-none" style={{ background: 'radial-gradient(circle, rgba(255,181,71,0.08) 0%, transparent 70%)' }} />
          <div className="w-40 h-40 mx-auto mb-5 relative">
            <svg className="transform -rotate-90" width="160" height="160" viewBox="0 0 160 160">
              <circle fill="none" stroke="hsl(var(--fs-s4))" strokeWidth="12" cx="80" cy="80" r="70" />
              <circle fill="none" stroke={riskColor} strokeWidth="12" strokeLinecap="round" cx="80" cy="80" r="70"
                strokeDasharray="440" strokeDashoffset={dashOffset}
                className="transition-all duration-[1.5s]" style={{ transitionTimingFunction: 'cubic-bezier(0.16,1,0.3,1)' }} />
            </svg>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center">
              <div className="font-mono text-4xl font-semibold leading-none" style={{ color: riskColor }}>{sc}</div>
              <div className="text-[11px] text-t2 mt-1 font-medium">Risk Score</div>
            </div>
          </div>
          <div className="text-[15px] font-bold mb-2" style={{ color: riskColor }}>
            {sc > 65 ? '⚠ High Risk' : sc > 40 ? '⚡ Moderate Risk' : '✓ Low Risk'}
          </div>
          <div className="text-xs text-t2 leading-relaxed max-w-[320px] mx-auto">
            {sc > 65 ? 'Significant concentration and volatility risk. Reduce top sector positions.' : sc > 40 ? 'Moderate risk — some concentration detected. Trim overweight sectors.' : 'Well-diversified portfolio with controlled risk.'}
          </div>
        </div>

        {/* VaR */}
        <div className="surface-2 border border-b1 rounded-2xl p-4 animate-fade-in-up" style={{ animationDelay: '0.05s' }}>
          <div className="text-[13px] font-bold mb-3.5">Value at Risk (VaR) · 95% Confidence</div>
          <div className="grid grid-cols-3 gap-2 mb-3.5">
            {[{ v: f(t * 0.03), l: '1-Day' }, { v: f(t * 0.073), l: '1-Week' }, { v: f(t * 0.14), l: '1-Month' }].map(item => (
              <div key={item.l} className="surface-3 rounded-xl p-3.5 text-center border border-b0">
                <div className="font-mono text-base font-medium text-down mb-1">{item.v}</div>
                <div className="text-[10px] text-t3 font-semibold tracking-wide">{item.l}</div>
              </div>
            ))}
          </div>
          <div className="p-3 surface-3 rounded-xl text-xs text-t2 leading-relaxed border border-b0">
            <b className="text-t0">What this means:</b> 95% probability that your portfolio will not lose more than this amount on any given period.
          </div>
        </div>

        {/* Stress Tests */}
        <div className="surface-2 border border-b1 rounded-2xl p-4 animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
          <div className="text-[13px] font-bold mb-3.5">Stress Test Scenarios</div>
          {[
            { s: 'Market Correction −10%', d: 'Typical pullback', v: f(t * 0.1) },
            { s: 'Bear Market −25%', d: '2022-style sell-off', v: f(t * 0.25) },
            { s: 'Market Crash −40%', d: 'COVID 2020 level', v: f(t * 0.4) },
            { s: 'Black Swan −60%', d: '2008 crisis level', v: f(t * 0.6) },
          ].map(st => (
            <div key={st.s} className="flex items-center justify-between p-3 surface-3 rounded-xl mb-2 border border-b0 transition-all hover:border-b2">
              <div><div className="text-xs font-semibold">{st.s}</div><div className="text-[10px] text-t3 mt-0.5 font-medium">{st.d}</div></div>
              <div className="font-mono text-base font-medium text-down">{st.v}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="overflow-y-auto p-5 flex flex-col gap-3.5">
        {/* Concentration */}
        <div className="surface-2 border border-b1 rounded-2xl p-4 animate-fade-in-up">
          <div className="text-[13px] font-bold mb-3.5">Concentration Risk</div>
          <div className="text-[11px] font-bold text-t2 mb-2 uppercase tracking-wider">By Sector</div>
          {secs.map(([n, v]) => {
            const p = (v / t) * 100;
            return (
              <div key={n} className="mb-2.5">
                <div className="flex justify-between text-[11px] mb-1"><span className="text-t2 font-medium">{n}</span><span className={`font-mono font-medium ${warn(p)}`}>{p.toFixed(1)}%{p > 25 ? ' ⚠' : ''}</span></div>
                <div className="h-1 surface-4 rounded-full overflow-hidden"><div className={`h-full rounded-full ${warnBg(p)} transition-all duration-[1.2s]`} style={{ width: `${p}%`, transitionTimingFunction: 'cubic-bezier(0.16,1,0.3,1)' }} /></div>
              </div>
            );
          })}
          <div className="text-[11px] font-bold text-t2 mb-2 mt-3 uppercase tracking-wider">By Stock</div>
          {syms.map(([n, v]) => {
            const p = (v / t) * 100;
            return (
              <div key={n} className="mb-2.5">
                <div className="flex justify-between text-[11px] mb-1"><span className="text-t2 font-medium">{n}</span><span className={`font-mono font-medium ${warn(p)}`}>{p.toFixed(1)}%{p > 10 ? ' ⚠' : ''}</span></div>
                <div className="h-1 surface-4 rounded-full overflow-hidden"><div className={`h-full rounded-full ${warnBg(p)} transition-all duration-[1.2s]`} style={{ width: `${Math.min(p, 100)}%`, transitionTimingFunction: 'cubic-bezier(0.16,1,0.3,1)' }} /></div>
              </div>
            );
          })}
          <div className="mt-2 p-2.5 surface-3 rounded-lg text-[11px] text-t2">
            Recommended: max <b className="text-t0">10%</b> per stock · <b className="text-t0">25%</b> per sector
          </div>
        </div>

        {/* Metrics */}
        <div className="surface-2 border border-b1 rounded-2xl p-4 animate-fade-in-up" style={{ animationDelay: '0.05s' }}>
          <div className="text-[13px] font-bold mb-3.5">Portfolio Risk Metrics</div>
          {[
            { k: 'Weighted Beta', v: '1.08', cls: 'text-neutral-signal' },
            { k: 'Portfolio Correlation', v: '0.74 (High)', cls: 'text-neutral-signal' },
            { k: 'High-Beta Stocks (>1.2)', v: '2', cls: 'text-down' },
            { k: 'Promoter Pledge Alerts', v: '1', cls: 'text-down' },
            { k: 'Number of Sectors', v: String(new Set(portfolio.map(h => h.sec)).size || 4), cls: 'text-up' },
          ].map(d => (
            <div key={d.k} className="flex items-center justify-between py-1.5 border-b border-[rgba(255,255,255,0.025)] text-xs">
              <span className="text-t2 font-medium">{d.k}</span><span className={`font-mono font-medium ${d.cls}`}>{d.v}</span>
            </div>
          ))}
        </div>

        {/* Recommendations */}
        <div className="surface-2 border border-b1 rounded-2xl p-4 animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
          <div className="text-[13px] font-bold mb-3.5">🛡️ Risk Recommendations</div>
          {[
            { c: 'border-l-fs-green', i: '🛡️', t: 'Add a hedge — allocate 10–15% to Gold ETF or short-duration Debt Fund.' },
            { c: 'border-l-fs-blue', i: '📅', t: 'Rebalance quarterly — reset when any sector exceeds 25% of portfolio.' },
            { c: 'border-l-fs-gold', i: '📊', t: 'Target 8–12 stocks across at least 4 sectors for proper diversification.' },
          ].map((r, i) => (
            <div key={i} className={`flex gap-2.5 p-3 surface-3 rounded-xl mb-2 border-l-[3px] ${r.c} transition-transform hover:translate-x-0.5`}>
              <div className="text-lg flex-shrink-0 leading-snug">{r.i}</div>
              <div className="text-xs leading-relaxed text-t1">{r.t}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
