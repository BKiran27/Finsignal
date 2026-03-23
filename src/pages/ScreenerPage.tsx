import React, { useState, useMemo } from 'react';
import { DB, formatINR, type Stock } from '@/data/stocks';

type SortKey = 'p' | 'cp' | 'pe' | 'pb' | 'roe' | 'de' | 'dy' | 'beta' | 'cf' | 'promo';
type SortDir = 'asc' | 'desc';

const PRESET_SCREENS: { label: string; filter: (s: Stock) => boolean; desc: string }[] = [
  { label: '💎 Value Picks', filter: s => s.pe < 15 && s.roe > 15 && s.de < 1, desc: 'P/E < 15, ROE > 15%, Low Debt' },
  { label: '🚀 Growth Monsters', filter: s => s.roe > 25 && s.sc === 'buy' && s.cf > 70, desc: 'ROE > 25%, BUY signal, High confidence' },
  { label: '🛡️ Fortress Balance Sheet', filter: s => s.de === 0 && s.pledge === 0 && s.promo > 45, desc: 'Zero debt, Zero pledge, Strong promoters' },
  { label: '💰 Dividend Kings', filter: s => s.dy > 2.5, desc: 'Dividend yield > 2.5%' },
  { label: '⚠️ Red Flags', filter: s => s.pledge > 5 || (s.de > 3 && s.roe < 10), desc: 'High pledge or high leverage + low ROE' },
  { label: '🎯 High Conviction AI', filter: s => s.cf >= 75, desc: 'AI confidence ≥ 75%' },
  { label: '📉 Beaten Down', filter: s => ((s.p - s.w52l) / (s.w52h - s.w52l)) < 0.25, desc: 'Near 52-week lows' },
  { label: '🏦 Banking Picks', filter: s => s.sec === 'Banking' && s.pe < 20, desc: 'Banking sector, P/E < 20' },
];

export const ScreenerPage: React.FC<{ onSelectStock?: (sym: string) => void }> = ({ onSelectStock }) => {
  const [activePreset, setActivePreset] = useState<number | null>(null);
  const [sortKey, setSortKey] = useState<SortKey>('cf');
  const [sortDir, setSortDir] = useState<SortDir>('desc');
  const [sectorFilter, setSectorFilter] = useState('');
  const [signalFilter, setSignalFilter] = useState('');
  const [minPE, setMinPE] = useState('');
  const [maxPE, setMaxPE] = useState('');
  const [minROE, setMinROE] = useState('');
  const [maxDE, setMaxDE] = useState('');

  const sectors = useMemo(() => [...new Set(DB.map(s => s.sec))].sort(), []);

  const filtered = useMemo(() => {
    let list = [...DB];

    if (activePreset !== null) {
      list = list.filter(PRESET_SCREENS[activePreset].filter);
    }

    if (sectorFilter) list = list.filter(s => s.sec === sectorFilter);
    if (signalFilter) list = list.filter(s => s.sc === signalFilter);
    if (minPE) list = list.filter(s => s.pe >= parseFloat(minPE));
    if (maxPE) list = list.filter(s => s.pe <= parseFloat(maxPE));
    if (minROE) list = list.filter(s => s.roe >= parseFloat(minROE));
    if (maxDE) list = list.filter(s => s.de <= parseFloat(maxDE));

    list.sort((a, b) => sortDir === 'asc' ? (a[sortKey] as number) - (b[sortKey] as number) : (b[sortKey] as number) - (a[sortKey] as number));
    return list;
  }, [activePreset, sectorFilter, signalFilter, minPE, maxPE, minROE, maxDE, sortKey, sortDir]);

  const toggleSort = (key: SortKey) => {
    if (sortKey === key) setSortDir(d => d === 'asc' ? 'desc' : 'asc');
    else { setSortKey(key); setSortDir('desc'); }
  };

  const SortHeader: React.FC<{ k: SortKey; label: string }> = ({ k, label }) => (
    <th onClick={() => toggleSort(k)}
      className="px-3 py-2.5 text-[9px] font-bold tracking-wider uppercase text-t3 text-right whitespace-nowrap cursor-pointer hover:text-t0 transition-colors select-none">
      {label} {sortKey === k ? (sortDir === 'desc' ? '▼' : '▲') : ''}
    </th>
  );

  return (
    <div className="flex-1 flex flex-col overflow-hidden">
      {/* Preset Screens */}
      <div className="px-5 py-3 surface-0 border-b border-b1 flex-shrink-0">
        <div className="flex gap-1.5 flex-wrap mb-2.5">
          {PRESET_SCREENS.map((preset, i) => (
            <button key={i} onClick={() => setActivePreset(activePreset === i ? null : i)}
              className={`px-3 py-1.5 rounded-lg text-[10.5px] font-semibold border transition-all
                ${activePreset === i ? 'bg-brand-dim border-brand text-brand' : 'border-b1 text-t2 hover:border-brand hover:text-brand'}`}>
              {preset.label}
            </button>
          ))}
        </div>

        {/* Custom Filters */}
        <div className="flex gap-2 items-end flex-wrap">
          <div className="flex flex-col">
            <label className="text-[9px] font-semibold text-t3 mb-1">Sector</label>
            <select value={sectorFilter} onChange={e => setSectorFilter(e.target.value)}
              className="surface-3 border border-b1 rounded-lg px-2.5 py-1.5 text-[11px] text-t0 outline-none appearance-none cursor-pointer min-w-[120px]">
              <option value="">All Sectors</option>
              {sectors.map(s => <option key={s}>{s}</option>)}
            </select>
          </div>
          <div className="flex flex-col">
            <label className="text-[9px] font-semibold text-t3 mb-1">Signal</label>
            <select value={signalFilter} onChange={e => setSignalFilter(e.target.value)}
              className="surface-3 border border-b1 rounded-lg px-2.5 py-1.5 text-[11px] text-t0 outline-none appearance-none cursor-pointer min-w-[100px]">
              <option value="">All</option>
              <option value="buy">BUY</option>
              <option value="hold">HOLD</option>
              <option value="sell">SELL</option>
            </select>
          </div>
          <div className="flex flex-col">
            <label className="text-[9px] font-semibold text-t3 mb-1">P/E Range</label>
            <div className="flex gap-1">
              <input value={minPE} onChange={e => setMinPE(e.target.value)} placeholder="Min" className="surface-3 border border-b1 rounded-lg px-2 py-1.5 text-[11px] outline-none w-[60px]" />
              <input value={maxPE} onChange={e => setMaxPE(e.target.value)} placeholder="Max" className="surface-3 border border-b1 rounded-lg px-2 py-1.5 text-[11px] outline-none w-[60px]" />
            </div>
          </div>
          <div className="flex flex-col">
            <label className="text-[9px] font-semibold text-t3 mb-1">Min ROE%</label>
            <input value={minROE} onChange={e => setMinROE(e.target.value)} placeholder="e.g. 15" className="surface-3 border border-b1 rounded-lg px-2 py-1.5 text-[11px] outline-none w-[70px]" />
          </div>
          <div className="flex flex-col">
            <label className="text-[9px] font-semibold text-t3 mb-1">Max D/E</label>
            <input value={maxDE} onChange={e => setMaxDE(e.target.value)} placeholder="e.g. 1" className="surface-3 border border-b1 rounded-lg px-2 py-1.5 text-[11px] outline-none w-[70px]" />
          </div>
          <div className="text-[11px] text-t2 font-mono font-medium self-end pb-1.5">{filtered.length} stocks</div>
        </div>
        {activePreset !== null && (
          <div className="mt-2 text-[10px] text-brand font-medium">{PRESET_SCREENS[activePreset].desc}</div>
        )}
      </div>

      {/* Table */}
      <div className="flex-1 overflow-auto">
        <table className="w-full text-[11px]">
          <thead className="sticky top-0 surface-0 z-10">
            <tr className="border-b border-b1">
              <th className="px-3 py-2.5 text-[9px] font-bold tracking-wider uppercase text-t3 text-left sticky left-0 surface-0">Stock</th>
              <th className="px-3 py-2.5 text-[9px] font-bold tracking-wider uppercase text-t3 text-left">Sector</th>
              <SortHeader k="p" label="Price" />
              <SortHeader k="cp" label="Chg%" />
              <SortHeader k="pe" label="P/E" />
              <SortHeader k="pb" label="P/B" />
              <SortHeader k="roe" label="ROE" />
              <SortHeader k="de" label="D/E" />
              <SortHeader k="dy" label="Div%" />
              <SortHeader k="beta" label="Beta" />
              <SortHeader k="promo" label="Promo%" />
              <SortHeader k="cf" label="AI Conf" />
              <th className="px-3 py-2.5 text-[9px] font-bold tracking-wider uppercase text-t3 text-center">Signal</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map(s => (
              <tr key={s.s} className="border-b border-[rgba(255,255,255,0.02)] hover:bg-[rgba(255,255,255,0.025)] cursor-pointer transition-colors"
                onClick={() => onSelectStock?.(s.s)}>
                <td className="px-3 py-2.5 font-bold sticky left-0 surface-0 whitespace-nowrap">
                  <div>{s.s}</div>
                  <div className="text-[9px] text-t3 font-normal mt-0.5">{s.n.slice(0, 20)}</div>
                </td>
                <td className="px-3 py-2.5 text-t2 whitespace-nowrap">{s.sec}</td>
                <td className={`px-3 py-2.5 font-mono text-right ${s.u ? 'text-up' : 'text-down'}`}>₹{formatINR(s.p)}</td>
                <td className={`px-3 py-2.5 font-mono text-right ${s.u ? 'text-up' : 'text-down'}`}>{s.cp > 0 ? '+' : ''}{s.cp.toFixed(2)}%</td>
                <td className={`px-3 py-2.5 font-mono text-right ${s.pe < 15 ? 'text-up' : s.pe > 50 ? 'text-down' : ''}`}>{s.pe}x</td>
                <td className="px-3 py-2.5 font-mono text-right">{s.pb}x</td>
                <td className={`px-3 py-2.5 font-mono text-right ${s.roe > 20 ? 'text-up' : s.roe < 10 ? 'text-down' : ''}`}>{s.roe}%</td>
                <td className={`px-3 py-2.5 font-mono text-right ${s.de > 2 ? 'text-down' : ''}`}>{s.de}</td>
                <td className={`px-3 py-2.5 font-mono text-right ${s.dy > 2 ? 'text-up' : ''}`}>{s.dy}%</td>
                <td className={`px-3 py-2.5 font-mono text-right ${s.beta > 1.3 ? 'text-down' : ''}`}>{s.beta}</td>
                <td className={`px-3 py-2.5 font-mono text-right ${s.promo > 50 ? 'text-up' : ''}`}>{s.promo}%</td>
                <td className={`px-3 py-2.5 font-mono text-right font-semibold ${s.cf >= 75 ? 'text-up' : s.cf < 55 ? 'text-down' : 'text-neutral-signal'}`}>{s.cf}%</td>
                <td className="px-3 py-2.5 text-center">
                  <span className={`text-[9px] px-2 py-0.5 rounded font-bold ${s.sc === 'buy' ? 'bg-fs-green-dim text-fs-green' : s.sc === 'sell' ? 'bg-fs-red-dim text-fs-red' : 'bg-fs-gold-dim text-fs-gold'}`}>
                    {s.sig}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
