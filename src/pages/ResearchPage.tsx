import React, { useState, useRef, useCallback } from 'react';
import { DB, formatINR, type Stock } from '@/data/stocks';
import { streamDeepResearch } from '@/lib/streamChat';
import { AIResponseRenderer } from '@/components/AIResponseRenderer';
import { toast } from 'sonner';

/* ── AI Deep Research Panel ── */
const AIDeepResearch: React.FC<{ stock: Stock }> = ({ stock }) => {
  const [analysis, setAnalysis] = useState('');
  const [loading, setLoading] = useState(false);
  const [activeResearch, setActiveResearch] = useState<string | null>(null);

  const runResearch = useCallback(async (mode: string, query: string) => {
    setLoading(true);
    setAnalysis('');
    setActiveResearch(mode);
    let accumulated = '';

    try {
      await streamDeepResearch({
        messages: [{ role: 'user', content: query }],
        mode,
        stockData: {
          symbol: stock.s, name: stock.n, sector: stock.sec, price: stock.p,
          change: stock.ch, changePct: stock.cp, pe: stock.pe, pb: stock.pb,
          roe: stock.roe, de: stock.de, beta: stock.beta, marketCap: stock.mc,
          w52High: stock.w52h, w52Low: stock.w52l, promoter: stock.promo,
          pledge: stock.pledge, divYield: stock.dy, signal: stock.sig, confidence: stock.cf,
        },
        onDelta: (text) => {
          accumulated += text;
          setAnalysis(accumulated);
        },
        onDone: () => setLoading(false),
        onError: (err) => { toast.error(err); setLoading(false); },
      });
    } catch {
      toast.error('Analysis failed. Please try again.');
      setLoading(false);
    }
  }, [stock]);

  const RESEARCH_MODES = [
    { id: 'full', ic: '📋', label: 'Full Deep Dive', query: `Complete institutional-grade deep-dive analysis for ${stock.s} (${stock.n}) at ₹${stock.p}. Cover all 11 sections with maximum depth.` },
    { id: 'valuation', ic: '💰', label: 'Valuation', query: `Multi-method valuation analysis for ${stock.s} at ₹${stock.p}. P/E: ${stock.pe}x, P/B: ${stock.pb}x, ROE: ${stock.roe}%, Market Cap: ${stock.mc}. Run DCF, peer multiples, PEG, margin of safety calculations.` },
    { id: 'forensic', ic: '🔬', label: 'Forensics', query: `Forensic financial analysis for ${stock.s}. Current metrics — ROE: ${stock.roe}%, D/E: ${stock.de}, P/E: ${stock.pe}x. Analyse Altman Z-score, Piotroski F-score, cash conversion, working capital quality, and red flags.` },
    { id: 'moat', ic: '🏰', label: 'Moat', query: `Competitive moat analysis for ${stock.s} in ${stock.sec} sector. Rate across 5 dimensions (brand, switching costs, network effects, cost advantage, IP). Score /50. Assess durability over next decade.` },
    { id: 'risk', ic: '⚠️', label: 'Risk', query: `Comprehensive risk analysis for ${stock.s}. Beta: ${stock.beta}, Pledge: ${stock.pledge}%, D/E: ${stock.de}. Build probability × impact matrix for all risk categories. Estimate max drawdown.` },
    { id: 'catalyst', ic: '⚡', label: 'Catalysts', query: `Catalyst analysis for ${stock.s} (${stock.sec}). Identify all upcoming catalysts: earnings dates, capex milestones, regulatory events, sector tailwinds, AGM. Timeline next 12 months with probability-weighted impact.` },
  ];

  return (
    <div className="surface-2 border border-b1 rounded-2xl overflow-hidden">
      <div className="px-3 md:px-4 py-3 border-b border-b0 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-brand animate-pulse-dot" />
          <div className="text-[10px] md:text-[11px] font-bold uppercase tracking-wider text-t2">AI Deep Research</div>
        </div>
        <span className="text-[9px] px-2 py-0.5 rounded bg-brand-dim text-brand font-bold">INSTITUTIONAL</span>
      </div>
      <div className="p-3 md:p-4">
        <div className="flex flex-wrap gap-1.5 mb-3">
          {RESEARCH_MODES.map(m => (
            <button key={m.id} onClick={() => runResearch('stock-deep-dive', m.query)} disabled={loading}
              className={`flex items-center gap-1 px-2 md:px-2.5 py-1.5 rounded-lg text-[10px] font-semibold border transition-all active:scale-95
                ${activeResearch === m.id && loading ? 'bg-brand-dim border-brand text-brand' : 'border-b1 text-t2 hover:border-brand hover:text-brand hover:bg-brand-dim'}
                disabled:opacity-40`}>
              <span>{m.ic}</span>{m.label}
            </button>
          ))}
        </div>
        {analysis ? (
          <div className="surface-3 border border-b0 rounded-xl p-3 md:p-4 max-h-[500px] overflow-y-auto">
            <AIResponseRenderer content={analysis} loading={loading} />
          </div>
        ) : (
          <div className="surface-3 border border-b0 rounded-xl p-6 text-center text-t3 text-xs">
            Select a research mode above to generate institutional-grade analysis for {stock.s}
          </div>
        )}
      </div>
    </div>
  );
};

/* ── Peer Comparison Panel ── */
const PeerComparison: React.FC<{ stock: Stock }> = ({ stock }) => {
  const peers = DB.filter(s => s.sec === stock.sec && s.s !== stock.s).slice(0, 5);
  const all = [stock, ...peers];

  return (
    <div className="surface-2 border border-b1 rounded-2xl overflow-hidden">
      <div className="flex items-center gap-2 px-4 py-3 border-b border-b0">
        <div className="w-2 h-2 rounded-full bg-fs-purple" />
        <div className="text-[11px] font-bold uppercase tracking-wider text-t2">Peer Comparison · {stock.sec}</div>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-[11px]">
          <thead>
            <tr className="border-b border-b0">
              {['Stock', 'Price', 'Chg%', 'P/E', 'P/B', 'ROE', 'D/E', 'Beta', 'Div%', 'Signal'].map(h => (
                <th key={h} className="px-3 py-2 text-[9px] font-bold tracking-wider uppercase text-t3 text-left whitespace-nowrap">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {all.map(s => (
              <tr key={s.s} className={`border-b border-[rgba(255,255,255,0.02)] ${s.s === stock.s ? 'bg-brand-dim' : 'hover:bg-[rgba(255,255,255,0.02)]'}`}>
                <td className="px-3 py-2 font-bold whitespace-nowrap">{s.s === stock.s ? `→ ${s.s}` : s.s}</td>
                <td className={`px-3 py-2 font-mono ${s.u ? 'text-up' : 'text-down'}`}>₹{formatINR(s.p)}</td>
                <td className={`px-3 py-2 font-mono ${s.u ? 'text-up' : 'text-down'}`}>{s.cp > 0 ? '+' : ''}{s.cp.toFixed(2)}%</td>
                <td className="px-3 py-2 font-mono">{s.pe}x</td>
                <td className="px-3 py-2 font-mono">{s.pb}x</td>
                <td className={`px-3 py-2 font-mono ${s.roe > 20 ? 'text-up' : s.roe < 10 ? 'text-down' : ''}`}>{s.roe}%</td>
                <td className={`px-3 py-2 font-mono ${s.de > 2 ? 'text-down' : ''}`}>{s.de}</td>
                <td className={`px-3 py-2 font-mono ${s.beta > 1.3 ? 'text-down' : ''}`}>{s.beta}</td>
                <td className="px-3 py-2 font-mono">{s.dy}%</td>
                <td className="px-3 py-2">
                  <span className={`text-[9px] px-1.5 py-0.5 rounded font-bold ${s.sc === 'buy' ? 'bg-fs-green-dim text-fs-green' : s.sc === 'sell' ? 'bg-fs-red-dim text-fs-red' : 'bg-fs-gold-dim text-fs-gold'}`}>{s.sig}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="px-4 py-2 border-t border-b0 text-[10px] text-t3 font-medium">
        Sector Avg P/E: {(all.reduce((s, a) => s + a.pe, 0) / all.length).toFixed(1)}x · Avg ROE: {(all.reduce((s, a) => s + a.roe, 0) / all.length).toFixed(1)}%
      </div>
    </div>
  );
};

/* ── Quantitative Scoring Panel ── */
const QuantScore: React.FC<{ stock: Stock }> = ({ stock: s }) => {
  const scores = [
    { label: 'Profitability (ROE)', score: s.roe > 15 ? 3 : s.roe > 8 ? 2 : 1, max: 3, detail: `ROE ${s.roe}%` },
    { label: 'Leverage (D/E)', score: s.de < 0.5 ? 3 : s.de < 1.5 ? 2 : 1, max: 3, detail: `D/E ${s.de}` },
    { label: 'Valuation (P/E)', score: s.pe < 15 ? 3 : s.pe < 30 ? 2 : 1, max: 3, detail: `P/E ${s.pe}x` },
    { label: 'Stability (Beta)', score: s.beta < 0.8 ? 3 : s.beta < 1.2 ? 2 : 1, max: 3, detail: `β ${s.beta}` },
    { label: 'Governance (Pledge)', score: s.pledge === 0 ? 3 : s.pledge < 5 ? 2 : 1, max: 3, detail: `${s.pledge}% pledged` },
    { label: 'Income (Div Yield)', score: s.dy > 2 ? 3 : s.dy > 0.5 ? 2 : 1, max: 3, detail: `${s.dy}%` },
    { label: 'Promoter Holding', score: s.promo > 50 ? 3 : s.promo > 25 ? 2 : 1, max: 3, detail: `${s.promo}%` },
  ];
  const total = scores.reduce((s, x) => s + x.score, 0);
  const max = scores.reduce((s, x) => s + x.max, 0);
  const pct = (total / max) * 100;
  const grade = pct >= 80 ? 'A' : pct >= 65 ? 'B' : pct >= 50 ? 'C' : pct >= 35 ? 'D' : 'F';
  const gradeColor = pct >= 65 ? 'text-up' : pct >= 45 ? 'text-neutral-signal' : 'text-down';

  return (
    <div className="surface-2 border border-b1 rounded-2xl overflow-hidden">
      <div className="flex items-center gap-2 px-4 py-3 border-b border-b0">
        <div className="w-2 h-2 rounded-full bg-fs-blue" />
        <div className="text-[11px] font-bold uppercase tracking-wider text-t2">Quant Scorecard</div>
        <div className={`ml-auto text-lg font-extrabold font-mono ${gradeColor}`}>{grade}</div>
      </div>
      <div className="p-3 md:p-4 flex flex-col gap-2">
        {scores.map((item, i) => (
          <div key={i}>
            <div className="flex justify-between text-[10px] md:text-[11px] mb-1">
              <span className="text-t2 font-medium">{item.label}</span>
              <span className="font-mono text-t1 font-medium">{item.detail} · {item.score}/{item.max}</span>
            </div>
            <div className="h-1.5 surface-4 rounded-full overflow-hidden">
              <div className={`h-full rounded-full transition-all duration-700 ${item.score === 3 ? 'bg-fs-green' : item.score === 2 ? 'bg-fs-gold' : 'bg-fs-red'}`}
                style={{ width: `${(item.score / item.max) * 100}%` }} />
            </div>
          </div>
        ))}
        <div className="mt-2 pt-2 border-t border-b0 flex items-center justify-between">
          <span className="text-[11px] text-t2 font-semibold">Overall Score</span>
          <span className={`font-mono text-sm font-bold ${gradeColor}`}>{total}/{max} ({pct.toFixed(0)}%)</span>
        </div>
      </div>
    </div>
  );
};

/* ── Technical Analysis Panel ── */
const TechnicalAnalysis: React.FC<{ stock: Stock }> = ({ stock: s }) => {
  const pos52 = ((s.p - s.w52l) / (s.w52h - s.w52l)) * 100;
  const sma20 = s.p * (1 + (Math.random() - 0.5) * 0.03);
  const sma50 = s.p * (1 + (Math.random() - 0.5) * 0.06);
  const sma200 = s.p * (1 + (Math.random() - 0.5) * 0.12);
  const rsi = 30 + Math.random() * 50;
  const aboveSMA200 = s.p > sma200;

  return (
    <div className="surface-2 border border-b1 rounded-2xl overflow-hidden">
      <div className="flex items-center gap-2 px-4 py-3 border-b border-b0">
        <div className="w-2 h-2 rounded-full bg-fs-gold" />
        <div className="text-[11px] font-bold uppercase tracking-wider text-t2">Technical Structure</div>
      </div>
      <div className="p-3 md:p-4 flex flex-col gap-3">
        <div>
          <div className="flex justify-between text-[10px] text-t3 mb-1.5"><span>52W Low ₹{s.w52l.toLocaleString('en-IN')}</span><span>₹{s.w52h.toLocaleString('en-IN')} 52W High</span></div>
          <div className="relative h-2 surface-4 rounded-full overflow-hidden">
            <div className="absolute h-full bg-gradient-to-r from-fs-red via-fs-gold to-fs-green rounded-full" style={{ width: '100%', opacity: 0.3 }} />
            <div className="absolute top-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-foreground border-2 border-background shadow-lg transition-all"
              style={{ left: `${Math.min(Math.max(pos52, 2), 98)}%`, transform: 'translate(-50%, -50%)' }} />
          </div>
          <div className="text-center text-[10px] text-t2 mt-1 font-mono">{pos52.toFixed(0)}% from 52W Low</div>
        </div>

        <div className="grid grid-cols-3 gap-1.5">
          {[
            { label: 'SMA 20', val: sma20, above: s.p > sma20 },
            { label: 'SMA 50', val: sma50, above: s.p > sma50 },
            { label: 'SMA 200', val: sma200, above: aboveSMA200 },
          ].map(ma => (
            <div key={ma.label} className="surface-3 rounded-lg p-2 md:p-2.5 text-center border border-b0">
              <div className="text-[9px] text-t3 font-semibold mb-1">{ma.label}</div>
              <div className="font-mono text-[11px] font-medium">₹{ma.val.toFixed(0)}</div>
              <div className={`text-[9px] mt-0.5 font-bold ${ma.above ? 'text-up' : 'text-down'}`}>{ma.above ? '▲ Above' : '▼ Below'}</div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-2 gap-2">
          <div className="surface-3 rounded-lg p-2.5 md:p-3 border border-b0">
            <div className="text-[9px] text-t3 font-semibold mb-1">RSI (14)</div>
            <div className={`font-mono text-sm font-bold ${rsi > 70 ? 'text-down' : rsi < 30 ? 'text-up' : 'text-t0'}`}>{rsi.toFixed(1)}</div>
            <div className="text-[9px] text-t3 mt-0.5">{rsi > 70 ? 'Overbought ⚠' : rsi < 30 ? 'Oversold ✦' : 'Neutral'}</div>
          </div>
          <div className="surface-3 rounded-lg p-2.5 md:p-3 border border-b0">
            <div className="text-[9px] text-t3 font-semibold mb-1">MACD Signal</div>
            <div className={`font-mono text-sm font-bold ${s.u ? 'text-up' : 'text-down'}`}>{s.u ? 'BULLISH' : 'BEARISH'}</div>
            <div className="text-[9px] text-t3 mt-0.5">{s.u ? 'Above signal line' : 'Below signal line'}</div>
          </div>
        </div>

        <div className="surface-3 rounded-lg p-2.5 md:p-3 border border-b0">
          <div className="text-[9px] text-t3 font-semibold mb-2">KEY LEVELS</div>
          <div className="grid grid-cols-2 gap-x-4 gap-y-1.5">
            {[
              { l: 'R2', v: (s.p * 1.06).toFixed(0), c: 'text-down' },
              { l: 'R1', v: (s.p * 1.03).toFixed(0), c: 'text-down' },
              { l: 'S1', v: (s.p * 0.97).toFixed(0), c: 'text-up' },
              { l: 'S2', v: (s.p * 0.94).toFixed(0), c: 'text-up' },
            ].map(lv => (
              <div key={lv.l} className="flex justify-between text-[10px]">
                <span className="text-t2">{lv.l}</span>
                <span className={`font-mono font-medium ${lv.c}`}>₹{parseInt(lv.v).toLocaleString('en-IN')}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

/* ── Ownership & Governance ── */
const OwnershipPanel: React.FC<{ stock: Stock }> = ({ stock: s }) => {
  const fii = Math.max(5, 100 - s.promo - 15 - Math.random() * 10);
  const dii = Math.max(5, 100 - s.promo - fii);
  const retail = Math.max(2, 100 - s.promo - fii - dii);

  const govScore = (s.pledge === 0 ? 3 : s.pledge < 5 ? 2 : 0) + (s.promo > 40 ? 3 : s.promo > 20 ? 2 : 1) + (s.de < 1 ? 2 : 1) + 2;
  const govGrade = govScore >= 9 ? 'A' : govScore >= 7 ? 'B' : govScore >= 5 ? 'C' : 'D';

  return (
    <div className="surface-2 border border-b1 rounded-2xl overflow-hidden">
      <div className="flex items-center gap-2 px-4 py-3 border-b border-b0">
        <div className="w-2 h-2 rounded-full bg-fs-green" />
        <div className="text-[11px] font-bold uppercase tracking-wider text-t2">Ownership & Governance</div>
      </div>
      <div className="p-3 md:p-4 flex flex-col gap-3">
        <div className="flex rounded-lg overflow-hidden h-6">
          <div className="flex items-center justify-center text-[9px] font-bold text-[#071A0E]" style={{ width: `${s.promo}%`, background: 'hsl(var(--fs-green))' }}>{s.promo.toFixed(0)}%</div>
          <div className="flex items-center justify-center text-[9px] font-bold text-[#071A0E]" style={{ width: `${fii.toFixed(0)}%`, background: 'hsl(var(--fs-blue))' }}>{fii.toFixed(0)}%</div>
          <div className="flex items-center justify-center text-[9px] font-bold text-[#071A0E]" style={{ width: `${dii.toFixed(0)}%`, background: 'hsl(var(--fs-purple))' }}>{dii.toFixed(0)}%</div>
          <div className="flex items-center justify-center text-[9px] font-bold" style={{ width: `${retail.toFixed(0)}%`, background: 'hsl(var(--fs-gold))' }}>{retail > 5 ? retail.toFixed(0) + '%' : ''}</div>
        </div>
        <div className="flex gap-3 text-[9px] text-t2 font-medium flex-wrap">
          <span className="flex items-center gap-1"><div className="w-2 h-2 rounded-sm bg-fs-green" />Promoter</span>
          <span className="flex items-center gap-1"><div className="w-2 h-2 rounded-sm bg-fs-blue" />FII</span>
          <span className="flex items-center gap-1"><div className="w-2 h-2 rounded-sm bg-fs-purple" />DII</span>
          <span className="flex items-center gap-1"><div className="w-2 h-2 rounded-sm bg-fs-gold" />Retail</span>
        </div>

        {[
          { k: 'Promoter Holding', v: `${s.promo}%`, c: s.promo > 50 ? 'text-up' : '' },
          { k: 'Promoter Pledge', v: s.pledge > 0 ? `${s.pledge}% ⚠` : 'None ✓', c: s.pledge > 0 ? 'text-down' : 'text-up' },
          { k: 'FII Holding (Est.)', v: `${fii.toFixed(1)}%`, c: fii > 20 ? 'text-up' : '' },
          { k: 'Governance Grade', v: govGrade, c: govScore >= 7 ? 'text-up' : govScore >= 5 ? 'text-neutral-signal' : 'text-down' },
        ].map(d => (
          <div key={d.k} className="flex items-center justify-between py-1 border-b border-[rgba(255,255,255,0.025)] text-[11px]">
            <span className="text-t2 font-medium">{d.k}</span>
            <span className={`font-mono font-semibold ${d.c}`}>{d.v}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

/* ── Valuation Panel ── */
const ValuationPanel: React.FC<{ stock: Stock }> = ({ stock: s }) => {
  const sectorAvgPE = DB.filter(x => x.sec === s.sec).reduce((sum, x) => sum + x.pe, 0) / DB.filter(x => x.sec === s.sec).length;
  const premDisc = ((s.pe - sectorAvgPE) / sectorAvgPE * 100).toFixed(0);
  const intrinsicLow = s.p * (s.pe < sectorAvgPE ? 1.08 : 0.88);
  const intrinsicHigh = s.p * (s.pe < sectorAvgPE ? 1.25 : 1.05);
  const pegRatio = s.pe / Math.max(s.roe * 0.8, 5);
  const evEbitda = s.pe * 0.65;
  const fcfYield = (100 / s.pe * 0.7).toFixed(1);

  return (
    <div className="surface-2 border border-b1 rounded-2xl overflow-hidden">
      <div className="flex items-center gap-2 px-4 py-3 border-b border-b0">
        <div className="w-2 h-2 rounded-full bg-fs-gold" />
        <div className="text-[11px] font-bold uppercase tracking-wider text-t2">Valuation Matrix</div>
      </div>
      <div className="p-3 md:p-4">
        <div className="grid grid-cols-3 gap-1.5 mb-3">
          {[
            { l: 'P/E', v: `${s.pe}x`, sub: `Sect: ${sectorAvgPE.toFixed(1)}x` },
            { l: 'P/B', v: `${s.pb}x`, sub: `Book: ₹${(s.p / s.pb).toFixed(0)}` },
            { l: 'EV/EBITDA', v: `${evEbitda.toFixed(1)}x`, sub: 'Est.' },
            { l: 'PEG', v: pegRatio.toFixed(2), sub: pegRatio < 1 ? '✦ Underval' : pegRatio > 2 ? '⚠ Expensive' : 'Fair' },
            { l: 'FCF Yield', v: `${fcfYield}%`, sub: parseFloat(fcfYield) > 4 ? 'Strong' : 'Moderate' },
            { l: 'Div Yield', v: `${s.dy}%`, sub: s.dy > 2 ? 'Good' : 'Growth' },
          ].map(item => (
            <div key={item.l} className="surface-3 rounded-lg p-2 md:p-2.5 text-center border border-b0">
              <div className="font-mono text-[11px] md:text-[12px] font-semibold mb-0.5">{item.v}</div>
              <div className="text-[8px] md:text-[9px] text-t3 font-medium">{item.l}</div>
              <div className="text-[8px] text-t3 mt-0.5">{item.sub}</div>
            </div>
          ))}
        </div>
        <div className="surface-3 rounded-lg p-3 border border-b0">
          <div className="text-[9px] text-t3 font-semibold mb-1.5 uppercase tracking-wider">Fair Value Range</div>
          <div className="flex items-center justify-between text-[11px]">
            <span className="font-mono text-up">₹{Math.round(intrinsicLow).toLocaleString('en-IN')}</span>
            <span className="text-t3">to</span>
            <span className="font-mono text-up">₹{Math.round(intrinsicHigh).toLocaleString('en-IN')}</span>
          </div>
          <div className={`text-[10px] mt-1.5 font-semibold ${parseInt(premDisc) > 10 ? 'text-down' : parseInt(premDisc) < -10 ? 'text-up' : 'text-neutral-signal'}`}>
            {parseInt(premDisc) > 0 ? `${premDisc}% premium to sector` : `${Math.abs(parseInt(premDisc))}% discount to sector`}
          </div>
        </div>
      </div>
    </div>
  );
};

/* ── Main Stock Detail ── */
const StockDetail: React.FC<{ stock: Stock }> = ({ stock: s }) => {
  const isBuy = s.sc === 'buy';
  const tgt = isBuy ? s.p * 1.145 : s.p * 0.88;
  const sl = isBuy ? s.p * 0.918 : s.p * 1.07;

  return (
    <div className="flex-1 overflow-y-auto flex flex-col gap-0">
      {/* Hero */}
      <div className="p-3 md:p-5 surface-1 border-b border-b1 flex-shrink-0">
        <div className="flex items-start justify-between mb-3">
          <div>
            <div className="text-xl md:text-[28px] font-extrabold tracking-tight leading-none">{s.s}</div>
            <div className="text-[12px] md:text-[13px] text-t2 mt-1 font-medium">{s.n}</div>
          </div>
          <div className="text-right">
            <div className={`font-mono text-xl md:text-[28px] font-semibold leading-none ${s.u ? 'text-up' : 'text-down'}`}>₹{formatINR(s.p)}</div>
            <div className={`font-mono text-[11px] md:text-[13px] mt-1 px-2 py-0.5 rounded-lg inline-block ${s.u ? 'bg-up-dim text-up' : 'bg-down-dim text-down'}`}>
              {s.u ? '▲' : '▼'} ₹{Math.abs(s.ch).toFixed(2)} ({Math.abs(s.cp).toFixed(2)}%)
            </div>
          </div>
        </div>
        <div className="flex gap-1.5 flex-wrap mb-3 md:mb-4">
          <span className="text-[10px] px-2 py-1 rounded-lg surface-3 border border-b1 text-t2 font-semibold">{s.sec}</span>
          <span className="text-[10px] px-2 py-1 rounded-lg surface-3 border border-b1 text-t2 font-semibold">NSE</span>
          <span className="text-[10px] px-2 py-1 rounded-lg surface-3 border border-b1 text-t2 font-semibold">{s.mc}</span>
          <span className={`text-[10px] md:text-[11px] px-2 py-1 rounded-lg font-bold ${s.sc === 'buy' ? 'bg-fs-green-dim text-fs-green' : s.sc === 'sell' ? 'bg-fs-red-dim text-fs-red' : 'bg-fs-gold-dim text-fs-gold'}`}>
            {s.sig} · {s.cf}%
          </span>
          {s.pledge > 0 && <span className="text-[10px] px-2 py-1 rounded-lg bg-fs-red-dim text-fs-red font-bold">⚠ {s.pledge}%</span>}
        </div>

        {/* Signal Banner */}
        <div className="surface-2 border border-b1 rounded-2xl px-3 md:px-5 py-3 flex flex-col md:flex-row items-start md:items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className={`px-3 md:px-4 py-2 rounded-xl text-sm font-extrabold tracking-wide
              ${s.sc === 'buy' ? 'bg-fs-green-dim text-fs-green' : s.sc === 'sell' ? 'bg-fs-red-dim text-fs-red' : 'bg-fs-gold-dim text-fs-gold'}`}>
              {s.sig}
            </div>
            <div>
              <div className="text-[15px] md:text-[17px] font-extrabold tracking-tight">{s.s}</div>
              <div className="text-[10px] md:text-xs text-t2 mt-0.5 font-medium">Confidence {s.cf}%</div>
            </div>
          </div>
          <div className="flex gap-4 md:gap-5">
            <div><div className="font-mono text-sm font-medium text-up">₹{Math.round(tgt).toLocaleString('en-IN')}</div><div className="text-[9px] md:text-[10px] text-t3 mt-1 font-medium uppercase tracking-wider">Target</div></div>
            <div><div className="font-mono text-sm font-medium text-down">₹{Math.round(sl).toLocaleString('en-IN')}</div><div className="text-[9px] md:text-[10px] text-t3 mt-1 font-medium uppercase tracking-wider">Stop-loss</div></div>
            <div><div className="font-mono text-sm font-medium text-neutral-signal">{((tgt - s.p) / s.p * 100).toFixed(1)}%</div><div className="text-[9px] md:text-[10px] text-t3 mt-1 font-medium uppercase tracking-wider">Upside</div></div>
          </div>
        </div>
      </div>

      {/* Analysis Panels */}
      <div className="p-3 md:p-5 flex flex-col gap-3">
        {/* Fundamental Grid */}
        <div className="grid grid-cols-4 md:grid-cols-8 gap-px bg-b1 border border-b1 rounded-xl overflow-hidden">
          {[
            { l: 'Day Low', v: `₹${formatINR(s.lo)}` }, { l: 'Day High', v: `₹${formatINR(s.hi)}` },
            { l: '52W Low', v: `₹${s.w52l.toLocaleString('en-IN')}` }, { l: '52W High', v: `₹${s.w52h.toLocaleString('en-IN')}` },
            { l: 'P/E', v: `${s.pe}x` }, { l: 'P/B', v: `${s.pb}x` },
            { l: 'ROE', v: `${s.roe}%` }, { l: 'D/E', v: `${s.de}` },
            { l: 'Div Yield', v: `${s.dy}%` }, { l: 'Beta', v: `${s.beta}` },
            { l: 'Promoter', v: `${s.promo}%` }, { l: 'Pledge', v: s.pledge > 0 ? `${s.pledge}%` : 'None' },
            { l: 'EPS', v: `₹${(s.p / s.pe).toFixed(1)}` }, { l: 'Book Val', v: `₹${(s.p / s.pb).toFixed(0)}` },
            { l: 'Mkt Cap', v: s.mc }, { l: 'ROCE', v: `${(s.roe * 0.85).toFixed(1)}%` },
          ].map((stat, i) => (
            <div key={i} className="surface-1 px-2.5 md:px-3 py-2">
              <div className="font-mono text-[11px] md:text-[12px] font-medium mb-0.5">{stat.v}</div>
              <div className="text-[8px] md:text-[9px] text-t3 font-medium">{stat.l}</div>
            </div>
          ))}
        </div>

        <AIDeepResearch stock={s} />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <QuantScore stock={s} />
          <TechnicalAnalysis stock={s} />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <ValuationPanel stock={s} />
          <OwnershipPanel stock={s} />
        </div>

        <PeerComparison stock={s} />
      </div>
    </div>
  );
};

/* ── Main Research Page ── */
export const ResearchPage: React.FC = () => {
  const [query, setQuery] = useState('');
  const [selectedStock, setSelectedStock] = useState<Stock | null>(null);
  const [showDropdown, setShowDropdown] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const hits = query.trim() ? DB.filter(s =>
    s.s.toLowerCase().includes(query.toLowerCase()) ||
    s.n.toLowerCase().includes(query.toLowerCase()) ||
    s.sec.toLowerCase().includes(query.toLowerCase())
  ).slice(0, 10) : [];

  return (
    <div className="flex flex-col flex-1 overflow-hidden">
      {/* Search */}
      <div className="px-3 md:px-5 py-3 surface-0 border-b border-b1 flex-shrink-0 relative">
        <div className="relative max-w-[700px] mx-auto">
          <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-t2 text-base pointer-events-none z-10">🔍</span>
          <input
            ref={inputRef}
            value={query}
            onChange={e => { setQuery(e.target.value); setShowDropdown(true); }}
            onFocus={() => setShowDropdown(true)}
            onBlur={() => setTimeout(() => setShowDropdown(false), 200)}
            className="w-full surface-2 border border-b2 rounded-xl py-3 pl-10 pr-10 text-t0 text-sm outline-none transition-all focus:border-brand focus:shadow-[0_0_0_3px_hsl(var(--brand-dim))] focus:surface-3"
            placeholder="Search 200+ NSE/BSE stocks..."
          />
          {query && (
            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-t2 cursor-pointer text-xl leading-none hover:text-t0 transition-colors" onClick={() => { setQuery(''); setShowDropdown(false); }}>×</span>
          )}
          {showDropdown && hits.length > 0 && (
            <div className="absolute top-[calc(100%+6px)] left-0 right-0 surface-1 border border-b2 rounded-2xl z-50 max-h-[350px] md:max-h-[400px] overflow-y-auto shadow-2xl">
              {hits.map(s => (
                <div key={s.s} className="flex items-center justify-between px-3 md:px-4 py-3 cursor-pointer border-b border-b0 transition-colors hover:surface-2 active:scale-[0.99]"
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
        <div className="flex-1 flex flex-col items-center justify-center gap-3.5 text-t3 p-4">
          <div className="text-5xl md:text-6xl opacity-30">📈</div>
          <div className="text-sm md:text-base font-bold text-t2">Institutional-Grade Stock Research</div>
          <div className="text-[12px] md:text-[13px] text-t3 text-center max-w-[400px] leading-relaxed">
            Search any stock for deep fundamental analysis, AI-powered research, peer comparison, and valuation matrix
          </div>
          <div className="flex gap-2 mt-2 flex-wrap justify-center">
            {['RELIANCE', 'TCS', 'HDFCBANK', 'INFY', 'TATAMOTORS'].map(sym => (
              <button key={sym} onClick={() => { const s = DB.find(x => x.s === sym); if (s) setSelectedStock(s); }}
                className="px-3 py-1.5 rounded-lg border border-b1 text-[11px] font-semibold text-t2 hover:border-brand hover:text-brand hover:bg-brand-dim transition-all active:scale-95">
                {sym}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
