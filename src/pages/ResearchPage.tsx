import React, { useState, useRef } from 'react';
import { DB, formatINR, type Stock } from '@/data/stocks';

const StockDetail: React.FC<{ stock: Stock }> = ({ stock: s }) => {
  const pos52 = ((s.p - s.w52l) / (s.w52h - s.w52l) * 100).toFixed(0);
  const isBuy = s.sc === 'buy', isSell = s.sc === 'sell';
  const tgt = isBuy ? s.p * 1.145 : s.p * 0.88;
  const sl = isBuy ? s.p * 0.918 : s.p * 1.07;

  return (
    <div className="flex-1 overflow-y-auto flex flex-col">
      {/* Hero */}
      <div className="p-5 surface-1 border-b border-b1 flex-shrink-0">
        <div className="flex items-start justify-between mb-3.5">
          <div>
            <div className="text-[28px] font-extrabold tracking-tight leading-none">{s.s}</div>
            <div className="text-[13px] text-t2 mt-1 font-medium">{s.n}</div>
          </div>
          <div className="text-right">
            <div className={`font-mono text-[28px] font-semibold leading-none ${s.u ? 'text-up' : 'text-down'}`}>₹{formatINR(s.p)}</div>
            <div className={`font-mono text-[13px] mt-1 px-2.5 py-1 rounded-lg inline-block ${s.u ? 'bg-up-dim text-up' : 'bg-down-dim text-down'}`}>
              {s.u ? '▲' : '▼'} ₹{Math.abs(s.ch).toFixed(2)} ({Math.abs(s.cp).toFixed(2)}%)
            </div>
          </div>
        </div>
        <div className="flex gap-1.5 flex-wrap mb-4">
          <span className="text-[10px] px-2.5 py-1 rounded-lg surface-3 border border-b1 text-t2 font-semibold">{s.sec}</span>
          <span className="text-[10px] px-2.5 py-1 rounded-lg surface-3 border border-b1 text-t2 font-semibold">NSE</span>
          <span className="text-[10px] px-2.5 py-1 rounded-lg surface-3 border border-b1 text-t2 font-semibold">{s.mc}</span>
          <span className={`text-[11px] px-2.5 py-1 rounded-lg font-bold ${s.sc === 'buy' ? 'bg-fs-green-dim text-fs-green' : s.sc === 'sell' ? 'bg-fs-red-dim text-fs-red' : 'bg-fs-gold-dim text-fs-gold'}`}>
            {s.sig} · {s.cf}% AI Confidence
          </span>
          {s.pledge > 0 && <span className="text-[11px] px-2.5 py-1 rounded-lg bg-fs-red-dim text-fs-red font-bold">⚠ Pledge {s.pledge}%</span>}
        </div>
        <div className="grid grid-cols-6 gap-px bg-b1 border border-b1 rounded-xl overflow-hidden">
          {[
            { l: 'Day Low', v: `₹${formatINR(s.lo)}` }, { l: 'Day High', v: `₹${formatINR(s.hi)}` },
            { l: '52W Low', v: `₹${s.w52l.toLocaleString('en-IN')}` }, { l: '52W High', v: `₹${s.w52h.toLocaleString('en-IN')}` },
            { l: 'P/E', v: `${s.pe}x` }, { l: 'P/B', v: `${s.pb}x` },
            { l: 'ROE', v: `${s.roe}%` }, { l: 'D/E', v: `${s.de}` },
            { l: 'Div Yield', v: `${s.dy}%` }, { l: 'Beta', v: `${s.beta}` },
            { l: 'Promoter', v: `${s.promo}%` }, { l: 'Pledge', v: s.pledge > 0 ? <span className="text-down">{s.pledge}%</span> : 'None' },
          ].map((stat, i) => (
            <div key={i} className="surface-1 px-3 py-2.5">
              <div className="font-mono text-[13px] font-medium mb-1">{stat.v}</div>
              <div className="text-[10px] text-t3 font-medium">{stat.l}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Analysis */}
      <div className="flex-1 p-5 flex flex-col gap-3">
        {[
          { title: 'Quantitative Analysis', dot: 'bg-fs-blue', body: `P/E of ${s.pe}x is ${s.pe > 50 ? 'premium-valued' : s.pe < 12 ? 'deeply undervalued' : 'reasonable relative to growth profile'}. Beta ${s.beta} — ${s.beta > 1.2 ? 'high systematic risk' : 'relatively stable'}. ROE ${s.roe}% ${s.roe > 25 ? 'is exceptional' : 'indicates solid capital deployment'}. 52W Position: ${pos52}% from low.` },
          { title: 'Sentiment Intelligence', dot: 'bg-fs-purple', body: isBuy ? `Positive coverage — 73% bullish in last 30 days. Institutional consensus: Overweight / Buy.` : `Coverage is ${isSell ? 'predominantly negative' : 'mixed to neutral'}. ${isSell ? 'Multiple institutional concerns flagged.' : 'Awaiting clearer catalyst.'}` },
          { title: 'SEBI & Corporate Filings', dot: 'bg-fs-gold', body: `${s.pledge > 0 ? `⚠ RED FLAG — Promoter pledging at ${s.pledge}%. ` : ''}Promoter holding ${s.promo}%${s.promo > 50 ? ' — strong alignment with shareholders' : ''}. ${s.pledge === 0 ? 'Zero pledging — balance sheet is clean.' : `Flagged — monitor closely.`}` },
        ].map((card, i) => (
          <div key={i} className="surface-2 border border-b1 rounded-2xl overflow-hidden">
            <div className="flex items-center gap-2 px-4 py-3 border-b border-b0">
              <div className={`w-2 h-2 rounded-full ${card.dot}`} />
              <div className="text-[11px] font-bold uppercase tracking-wider text-t2">{card.title}</div>
            </div>
            <div className="px-4 py-3.5 text-[13px] leading-relaxed text-t1">{card.body}</div>
          </div>
        ))}

        {/* Signal Banner */}
        <div className="surface-2 border border-b1 rounded-2xl px-5 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className={`px-4 py-2 rounded-xl text-sm font-extrabold tracking-wide
              ${s.sc === 'buy' ? 'bg-fs-green-dim text-fs-green' : s.sc === 'sell' ? 'bg-fs-red-dim text-fs-red' : 'bg-fs-gold-dim text-fs-gold'}`}>
              {s.sig}
            </div>
            <div>
              <div className="text-[17px] font-extrabold tracking-tight">{s.s}</div>
              <div className="text-xs text-t2 mt-0.5 font-medium">AI Confidence {s.cf}% · {isBuy ? '6–12' : '3'} month horizon</div>
            </div>
          </div>
          <div className="flex gap-5">
            <div><div className="font-mono text-sm font-medium text-up">₹{Math.round(tgt).toLocaleString('en-IN')}</div><div className="text-[10px] text-t3 mt-1 font-medium uppercase tracking-wider">Target</div></div>
            <div><div className="font-mono text-sm font-medium text-down">₹{Math.round(sl).toLocaleString('en-IN')}</div><div className="text-[10px] text-t3 mt-1 font-medium uppercase tracking-wider">Stop-loss</div></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export const ResearchPage: React.FC = () => {
  const [query, setQuery] = useState('');
  const [selectedStock, setSelectedStock] = useState<Stock | null>(null);
  const [showDropdown, setShowDropdown] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const hits = query.trim() ? DB.filter(s =>
    s.s.toLowerCase().includes(query.toLowerCase()) ||
    s.n.toLowerCase().includes(query.toLowerCase()) ||
    s.sec.toLowerCase().includes(query.toLowerCase())
  ).slice(0, 8) : [];

  return (
    <div className="flex flex-col flex-1 overflow-hidden">
      {/* Search */}
      <div className="px-5 py-3 surface-0 border-b border-b1 flex-shrink-0 relative">
        <div className="relative max-w-[700px] mx-auto">
          <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-t2 text-base pointer-events-none z-10">🔍</span>
          <input
            ref={inputRef}
            value={query}
            onChange={e => { setQuery(e.target.value); setShowDropdown(true); }}
            onFocus={() => setShowDropdown(true)}
            onBlur={() => setTimeout(() => setShowDropdown(false), 200)}
            className="w-full surface-2 border border-b2 rounded-xl py-3 pl-10 pr-10 text-t0 text-sm outline-none transition-all focus:border-brand focus:shadow-[0_0_0_3px_hsl(var(--brand-dim))] focus:surface-3"
            placeholder="Search 500+ NSE/BSE stocks — e.g. RELIANCE, TCS, Banking..."
          />
          {query && (
            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-t2 cursor-pointer text-xl leading-none hover:text-t0 transition-colors" onClick={() => { setQuery(''); setShowDropdown(false); }}>×</span>
          )}
          {showDropdown && hits.length > 0 && (
            <div className="absolute top-[calc(100%+6px)] left-0 right-0 surface-1 border border-b2 rounded-2xl z-50 max-h-[340px] overflow-y-auto shadow-2xl">
              {hits.map(s => (
                <div key={s.s} className="flex items-center justify-between px-4 py-3 cursor-pointer border-b border-b0 transition-colors hover:surface-2"
                  onMouseDown={() => { setSelectedStock(s); setQuery(''); setShowDropdown(false); }}>
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 surface-3 rounded-lg flex items-center justify-center text-xs font-bold text-t2 flex-shrink-0">{s.s.slice(0, 2)}</div>
                    <div>
                      <div className="flex items-center gap-1.5">
                        <span className="text-[13px] font-bold">{s.s}</span>
                        <span className={`text-[9px] px-1.5 py-0.5 rounded font-bold ${s.sc === 'buy' ? 'bg-fs-green-dim text-fs-green' : s.sc === 'sell' ? 'bg-fs-red-dim text-fs-red' : 'bg-fs-gold-dim text-fs-gold'}`}>{s.sig}</span>
                      </div>
                      <div className="text-[11px] text-t2 mt-0.5">{s.n} · {s.sec}</div>
                    </div>
                  </div>
                  <div className="text-right flex-shrink-0">
                    <div className={`font-mono text-[13px] font-medium ${s.u ? 'text-up' : 'text-down'}`}>₹{formatINR(s.p)}</div>
                    <div className={`font-mono text-[10px] px-1 rounded mt-0.5 inline-block ${s.u ? 'bg-up-dim text-up' : 'bg-down-dim text-down'}`}>{s.u ? '▲' : '▼'}{Math.abs(s.cp).toFixed(2)}%</div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Content */}
      {selectedStock ? (
        <StockDetail stock={selectedStock} />
      ) : (
        <div className="flex-1 flex flex-col items-center justify-center gap-3.5 text-t3">
          <div className="text-6xl opacity-30">📈</div>
          <div className="text-base font-bold text-t2">Search for any stock</div>
          <div className="text-[13px] text-t3 text-center max-w-[300px] leading-relaxed">
            Type a stock symbol, company name, or sector to begin your research
          </div>
        </div>
      )}
    </div>
  );
};
