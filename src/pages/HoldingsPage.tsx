import React, { useState } from 'react';
import { usePortfolio } from '@/contexts/PortfolioContext';
import { PRICES, SECTORS, formatINR } from '@/data/stocks';
import { toast } from 'sonner';

export const HoldingsPage: React.FC = () => {
  const { portfolio, addPosition, removePosition } = usePortfolio();
  const [sym, setSym] = useState('');
  const [qty, setQty] = useState('');
  const [avg, setAvg] = useState('');
  const [sec, setSec] = useState('');

  const handleAdd = () => {
    const s = sym.trim().toUpperCase();
    const q = parseFloat(qty);
    const a = parseFloat(avg);
    if (!s || !q || !a || isNaN(q) || isNaN(a)) { toast.error('Please fill all fields'); return; }
    addPosition({ sym: s, qty: q, avg: a, sec: sec || 'Others' });
    setSym(''); setQty(''); setAvg(''); setSec('');
    toast.success(`${s} added to portfolio`);
  };

  const rows = portfolio.map((h, i) => {
    const p = PRICES[h.sym] || h.avg * (1 + (Math.random() - 0.4) * 0.14);
    const val = p * h.qty, cost = h.avg * h.qty, pnl = val - cost, pct = (pnl / cost) * 100;
    return { h, i, p, val, cost, pnl, pct };
  });

  const inv = rows.reduce((s, r) => s + r.cost, 0);
  const cur = rows.reduce((s, r) => s + r.val, 0);
  const totalPnl = cur - inv;
  const totalPct = inv > 0 ? (totalPnl / inv) * 100 : 0;

  const COLORS = ['#4F6EF7', '#10D98A', '#9B6BFF', '#FFB547', '#FF4757', '#06B6D4', '#EC4899', '#F97316'];

  return (
    <div className="flex flex-1 overflow-hidden" style={{ display: 'grid', gridTemplateColumns: '300px 1fr' }}>
      {/* Left */}
      <div className="surface-1 border-r border-b1 flex flex-col overflow-hidden">
        <div className="p-4 border-b border-b1 flex-shrink-0">
          <div className="text-[13px] font-bold flex items-center gap-1.5 mb-3.5">
            <span className="text-base">+</span> Add Position
          </div>
          <input value={sym} onChange={e => setSym(e.target.value)} className="w-full surface-3 border border-b1 rounded-xl px-3.5 py-2.5 text-t0 text-[13px] outline-none mb-2 transition-colors focus:border-brand" placeholder="Symbol — e.g. RELIANCE" />
          <div className="grid grid-cols-2 gap-2 mb-2">
            <div><div className="text-[11px] text-t2 font-semibold mb-1">Quantity</div><input value={qty} onChange={e => setQty(e.target.value)} type="number" className="w-full surface-3 border border-b1 rounded-xl px-3 py-2.5 text-t0 text-[13px] outline-none transition-colors focus:border-brand" placeholder="Qty" /></div>
            <div><div className="text-[11px] text-t2 font-semibold mb-1">Avg Price (₹)</div><input value={avg} onChange={e => setAvg(e.target.value)} type="number" className="w-full surface-3 border border-b1 rounded-xl px-3 py-2.5 text-t0 text-[13px] outline-none transition-colors focus:border-brand" placeholder="0.00" /></div>
          </div>
          <select value={sec} onChange={e => setSec(e.target.value)} className="w-full surface-3 border border-b1 rounded-xl px-3 py-2.5 text-t0 text-[13px] outline-none mb-2.5 transition-colors focus:border-brand appearance-none cursor-pointer">
            <option value="">— Select Sector —</option>
            {SECTORS.map(s => <option key={s}>{s}</option>)}
          </select>
          <button onClick={handleAdd} className="w-full py-2.5 bg-brand rounded-xl font-bold text-sm text-primary-foreground transition-all hover:opacity-90 hover:-translate-y-px active:translate-y-0">
            Add to Portfolio
          </button>
        </div>
        <div className="px-4 py-3 border-t border-b1 flex-shrink-0">
          <div className="text-[10px] font-bold tracking-widest uppercase text-t3">
            Holdings <span className="text-brand font-normal">{portfolio.length}</span>
          </div>
        </div>
        <div className="flex-1 overflow-y-auto">
          {portfolio.length === 0 ? (
            <div className="p-10 text-center text-t3 text-xs leading-relaxed">No positions yet.<br />Add your first holding above.</div>
          ) : (
            rows.map((r, i) => (
              <div key={i} className="flex items-center px-4 py-3 border-b border-b0 cursor-pointer hover:bg-[rgba(255,255,255,0.02)] transition-colors gap-2.5">
                <div className="w-9 h-9 rounded-lg flex items-center justify-center text-[11px] font-bold flex-shrink-0 border border-b1"
                  style={{ background: `${COLORS[i % COLORS.length]}22`, color: COLORS[i % COLORS.length], borderColor: `${COLORS[i % COLORS.length]}33` }}>
                  {r.h.sym.slice(0, 2)}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-[13px] font-bold">{r.h.sym}</div>
                  <div className="text-[10px] text-t2 mt-0.5 font-medium">{r.h.qty} shares · {r.h.sec}</div>
                </div>
                <div className="text-right">
                  <div className={`font-mono text-[13px] font-medium ${r.pnl >= 0 ? 'text-up' : 'text-down'}`}>₹{Math.round(r.val).toLocaleString('en-IN')}</div>
                  <div className={`font-mono text-[10px] mt-0.5 ${r.pnl >= 0 ? 'text-up' : 'text-down'}`}>{r.pnl >= 0 ? '+' : ''}₹{Math.round(r.pnl).toLocaleString('en-IN')}</div>
                </div>
                <button onClick={(e) => { e.stopPropagation(); removePosition(r.i); }} className="text-t3 text-lg cursor-pointer p-1 rounded hover:text-fs-red hover:bg-fs-red-dim transition-colors flex-shrink-0">×</button>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Right */}
      <div className="overflow-y-auto p-5 flex flex-col gap-3.5">
        <div className="grid grid-cols-3 gap-2.5">
          <div className="surface-2 border border-b1 rounded-2xl p-4"><div className="font-mono text-[22px] font-semibold leading-none mb-1.5">₹{Math.round(inv).toLocaleString('en-IN')}</div><div className="text-[11px] text-t2 font-semibold">Total Invested</div></div>
          <div className="surface-2 border border-b1 rounded-2xl p-4"><div className={`font-mono text-[22px] font-semibold leading-none mb-1.5 ${totalPnl >= 0 ? 'text-up' : 'text-down'}`}>₹{Math.round(cur).toLocaleString('en-IN')}</div><div className="text-[11px] text-t2 font-semibold">Current Value</div></div>
          <div className="surface-2 border border-b1 rounded-2xl p-4">
            <div className={`font-mono text-[22px] font-semibold leading-none mb-1.5 ${totalPnl >= 0 ? 'text-up' : 'text-down'}`}>{totalPnl >= 0 ? '+' : ''}₹{Math.abs(Math.round(totalPnl)).toLocaleString('en-IN')}</div>
            <div className="text-[11px] text-t2 font-semibold">Total P&L</div>
            <div className={`font-mono text-[11px] mt-1.5 ${totalPnl >= 0 ? 'text-up' : 'text-down'}`}>{totalPnl >= 0 ? '+' : ''}{totalPct.toFixed(2)}%</div>
          </div>
        </div>

        <div className="surface-2 border border-b1 rounded-2xl overflow-hidden">
          <div className="px-4 py-3 border-b border-b1 text-xs font-bold">Holdings Detail</div>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr>
                  {['Symbol', 'Sector', 'Qty', 'Avg Price', 'Current', 'Value', 'P&L', 'Return'].map(h => (
                    <th key={h} className="px-3.5 py-2 text-[10px] font-bold tracking-wider uppercase text-t3 border-b border-b0 text-left">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {rows.map(r => (
                  <tr key={r.i} className="hover:bg-[rgba(255,255,255,0.02)]">
                    <td className="px-3.5 py-3 text-xs font-bold border-b border-[rgba(255,255,255,0.025)]">{r.h.sym}</td>
                    <td className="px-3.5 py-3 text-xs text-t2 border-b border-[rgba(255,255,255,0.025)]">{r.h.sec}</td>
                    <td className="px-3.5 py-3 font-mono text-[11px] text-right border-b border-[rgba(255,255,255,0.025)]">{r.h.qty}</td>
                    <td className="px-3.5 py-3 font-mono text-[11px] text-right border-b border-[rgba(255,255,255,0.025)]">₹{r.h.avg.toLocaleString('en-IN')}</td>
                    <td className={`px-3.5 py-3 font-mono text-[11px] text-right border-b border-[rgba(255,255,255,0.025)] ${r.pnl >= 0 ? 'text-up' : 'text-down'}`}>₹{r.p.toLocaleString('en-IN', { maximumFractionDigits: 0 })}</td>
                    <td className="px-3.5 py-3 font-mono text-[11px] text-right border-b border-[rgba(255,255,255,0.025)]">₹{Math.round(r.val).toLocaleString('en-IN')}</td>
                    <td className={`px-3.5 py-3 font-mono text-[11px] text-right border-b border-[rgba(255,255,255,0.025)] ${r.pnl >= 0 ? 'text-up' : 'text-down'}`}>{r.pnl >= 0 ? '+' : ''}₹{Math.round(r.pnl).toLocaleString('en-IN')}</td>
                    <td className={`px-3.5 py-3 font-mono text-[11px] text-right border-b border-[rgba(255,255,255,0.025)] ${r.pct >= 0 ? 'text-up' : 'text-down'}`}>{r.pct >= 0 ? '+' : ''}{r.pct.toFixed(1)}%</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};
